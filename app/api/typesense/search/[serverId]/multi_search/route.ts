import { fetchServerById } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ serverId: string }> },
) {
  const { serverId } = await params;
  return handleRequest(request, serverId);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ serverId: string }> },
) {
  const { serverId } = await params;
  return handleRequest(request, serverId);
}

async function handleRequest(request: NextRequest, serverId: string) {
  try {
    const server = await fetchServerById(serverId);
    const { host, port, protocol, apiKey, path: basePath } = server.server;

    const searchParams = new URLSearchParams(request.nextUrl.searchParams);

    for (const key of Array.from(searchParams.keys())) {
      if (key.toLowerCase() === "x-typesense-api-key") {
        searchParams.delete(key);
      }
    }

    const queryString = searchParams.toString();
    const fullPath = basePath ? basePath : "";
    const url = `${protocol}://${host}:${port}/${fullPath}/multi_search/${queryString ? `?${queryString}` : ""}`;

    const headers: HeadersInit = {
      "X-TYPESENSE-API-KEY": apiKey,
      "Content-Type": "application/json",
    };

    const forwardHeaders = ["content-type", "accept", "accept-encoding"];
    forwardHeaders.forEach((headerName) => {
      const value = request.headers.get(headerName);
      if (value && headerName !== "x-typesense-api-key") {
        headers[headerName] = value;
      }
    });

    const options: RequestInit = {
      method: request.method,
      headers,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    const response = await fetch(url, options);
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Typesense proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request to Typesense" },
      { status: 500 },
    );
  }
}

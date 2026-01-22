import { auth } from "@/auth/server";
import typesense from "@/typesense/instance";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const serverId = searchParams.get("serverId");
  const filterBy = searchParams.get("filterBy");
  const includeFields = searchParams.getAll("includeFields");
  const excludeFields = searchParams.getAll("excludeFields");
  const collectionName = searchParams.get("collectionName");

  if (!serverId || !collectionName) {
    return new Response("Missing Query Parameters", { status: 400 });
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const instance = await typesense.getInstance(serverId);
  if (!instance) {
    return new Response("Instance Not found", { status: 403 });
  }
  const webStream = Readable.toWeb(
    await instance.exportCollectionDocuments(
      collectionName,
      !!filterBy ? filterBy : undefined,
      excludeFields.join(","),
      includeFields.join(","),
    ),
  );
  return new NextResponse(webStream as ReadableStream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Content-Disposition": `attachment; filename="${collectionName}.jsonl"`,
    },
  });
}

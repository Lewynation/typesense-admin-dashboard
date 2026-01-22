import { auth } from "@/auth/server";
import { getTypesenseUrl } from "@/typesense/get_typesense_url";
import typesense from "@/typesense/instance";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const serverId = searchParams.get("serverId");
  const dictionaryId = searchParams.get("dictionaryId");
  if (!serverId || !dictionaryId) {
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
  const baseUrl = getTypesenseUrl(
    instance.typesenseClientInstance.configuration,
  );
  const res = await fetch(
    `${baseUrl}/stemming/dictionaries/import?id=${dictionaryId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TYPESENSE-API-KEY":
          instance.typesenseClientInstance.configuration.apiKey,
      },
      body: req.body,
      duplex: "half",
    } as any,
  );

  if (!res.ok) {
    const text = await res.text();
    return new Response(text, { status: res.status });
  }
  const data = await res.text();

  revalidatePath(`/server/${serverId}/stemming`);
  return new Response(data, { status: 200 });
}

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
  const action = searchParams.get("action");
  const dirtyValues = searchParams.get("dirtyValues");
  const collectionName = searchParams.get("collectionName");
  if (!serverId || !action || !collectionName) {
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
    `${baseUrl}/collections/${collectionName}/documents/import?dirty_values=${dirtyValues}&return_id=true&action=${action}`,
    {
      method: "POST",
      headers: {
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

  revalidatePath(`/server/${serverId}/collections`);
  return new Response(data, { status: 200 });
}

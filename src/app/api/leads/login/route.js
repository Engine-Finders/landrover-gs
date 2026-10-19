import { LEADS_COOKIE, LEADS_COOKIE_MAX_AGE, newSessionToken, passwordOk } from "@/lib/leadsAuth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!passwordOk(body?.password)) {
    // small delay to slow down password guessing
    await new Promise((r) => setTimeout(r, 800));
    return Response.json({ success: false, error: "Incorrect password." }, { status: 401 });
  }
  const res = Response.json({ success: true });
  res.headers.append(
    "Set-Cookie",
    `${LEADS_COOKIE}=${newSessionToken()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${LEADS_COOKIE_MAX_AGE}${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`,
  );
  return res;
}

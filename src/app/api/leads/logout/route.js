import { LEADS_COOKIE } from "@/lib/leadsAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  const res = Response.json({ success: true });
  res.headers.append("Set-Cookie", `${LEADS_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
  return res;
}

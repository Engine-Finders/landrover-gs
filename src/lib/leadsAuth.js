import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Single shared admin password (LEADS_ADMIN_PASSWORD). The session cookie is an HMAC of it,
// so changing the password signs everyone out. Without the env var nobody can log in.
export const LEADS_COOKIE = "leads_session";
export const LEADS_COOKIE_MAX_AGE = 60 * 60 * 8;

function sessionToken() {
  const pw = process.env.LEADS_ADMIN_PASSWORD;
  return pw ? createHmac("sha256", pw).update("leads-session-v1").digest("hex") : null;
}

const digest = (v) => createHash("sha256").update(String(v)).digest();

export function passwordOk(input) {
  const pw = process.env.LEADS_ADMIN_PASSWORD;
  if (!pw || typeof input !== "string" || !input) return false;
  return timingSafeEqual(digest(input), digest(pw));
}

export function newSessionToken() {
  return sessionToken();
}

export async function isAuthed() {
  const expected = sessionToken();
  if (!expected) return false;
  const got = (await cookies()).get(LEADS_COOKIE)?.value;
  if (!got || got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

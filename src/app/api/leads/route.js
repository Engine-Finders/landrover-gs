import { fetchSiteLeads } from "@/lib/leads";
import { isAuthed } from "@/lib/leadsAuth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!(await isAuthed())) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const page = new URL(request.url).searchParams.get("page");
    const result = await fetchSiteLeads({ page });
    return Response.json({ success: true, ...result });
  } catch (error) {
    console.error("leads fetch failed", error);
    return Response.json({ success: false, error: "Failed to fetch leads" }, { status: 502 });
  }
}

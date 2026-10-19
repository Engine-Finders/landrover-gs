import LeadsClient from "./LeadsClient";
import LeadsLogin from "./LeadsLogin";
import { isAuthed } from "@/lib/leadsAuth";
import { LEAD_SOURCE } from "@/lib/leads";

export const metadata = {
  title: "Leads | Land Rover Garage",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  if (!(await isAuthed())) return <LeadsLogin />;
  return <LeadsClient source={LEAD_SOURCE} />;
}

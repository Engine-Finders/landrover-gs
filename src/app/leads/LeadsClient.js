"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function formatDate(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "medium", timeStyle: "medium" });
  } catch {
    return String(value);
  }
}

const COLUMNS = [
  "ID", "Created", "Name", "Email", "Phone", "Postcode", "VRM", "Brand", "Model",
  "Series", "Year", "Fuel", "Capacity", "Part", "Status", "Source", "Notes",
];

function LeadDetails({ lead }) {
  const rows = [
    ["Lead ID", lead.id],
    ["Status", lead.status],
    ["Created (UK)", formatDate(lead.createdAt || lead.created_at)],
    ["Updated (UK)", formatDate(lead.updatedAt || lead.updated_at)],
    ["Source", lead.source],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.number || lead.phone],
    ["Postcode", lead.postcode],
    ["Description", lead.description],
    ["VRM", lead.vehicle_vrm],
    ["Reg", lead.vehicle_reg],
    ["Brand", lead.vehicle_brand],
    ["Model", lead.vehicle_model],
    ["Series", lead.vehicle_series],
    ["Year", lead.vehicle_year],
    ["Fuel type", lead.fuelType || lead.fuel_type],
    ["Engine capacity", lead.engin_capacity || lead.engine_capacity],
    ["Part", lead.vehicle_part],
    ["Engine code", lead.engine_code],
    ["Assigned to", lead.assigned_to],
    ["Notes", lead.notes],
    ["HQ lead", lead.isHqLead],
  ];
  return (
    <div className="grid gap-2 border-t border-gray-200 bg-gray-50 px-3 py-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <p className="text-[0.68rem] font-bold uppercase tracking-wide text-gray-500">{label}</p>
          <p className="break-words text-sm text-[#1a1a1a]">{formatValue(value)}</p>
        </div>
      ))}
    </div>
  );
}

export default function LeadsClient({ source }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ leads: [], total: 0, totalPages: 1, perPage: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  const load = useCallback(
    async (p) => {
      setLoading(true);
      setError("");
      setOpenId(null);
      try {
        const res = await fetch(`/api/leads?page=${p}`, { cache: "no-store" });
        if (res.status === 401) {
          router.refresh(); // session expired: server re-renders the login
          return;
        }
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Failed to load leads");
        setData(json);
      } catch (err) {
        setError(err.message || "Failed to load leads");
        setData((d) => ({ ...d, leads: [] }));
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    load(page);
  }, [page, load]);

  async function logout() {
    await fetch("/api/leads/logout", { method: "POST" }).catch(() => {});
    router.refresh();
  }

  const { leads, total, totalPages, perPage } = data;
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const btn =
    "rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] disabled:opacity-50";

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-12 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] md:text-3xl">Leads</h1>
          <p className="mt-1 text-sm text-gray-600">
            Source filter: <strong>{source}</strong> · click a row for full details
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => load(page)} disabled={loading} className={btn}>
            {loading ? "Loading…" : "Refresh"}
          </button>
          <button type="button" onClick={logout} className={btn}>
            Sign out
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      {!loading && !error ? (
        <p className="mt-3 text-sm text-gray-600">
          {total === 0 ? "0 leads" : `Showing ${from}–${to} of ${total} leads`}
        </p>
      ) : null}

      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="min-w-full border-collapse text-left text-sm text-[#1a1a1a]">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              {COLUMNS.map((c) => (
                <th key={c} className="whitespace-nowrap px-3 py-2 font-bold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-6 text-center text-gray-500">
                  Loading leads…
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-6 text-center text-gray-500">
                  No leads found for {source}
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const rowId = lead.id || `${lead.email}-${lead.createdAt || lead.created_at}`;
                const isOpen = openId === rowId;
                return (
                  <Fragment key={rowId}>
                    <tr
                      className="cursor-pointer border-t border-gray-200 hover:bg-gray-50"
                      onClick={() => setOpenId(isOpen ? null : rowId)}
                    >
                      <td className="whitespace-nowrap px-3 py-2 text-gray-500">{formatValue(lead.id)}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-500">{formatDate(lead.createdAt || lead.created_at)}</td>
                      <td className="px-3 py-2 font-semibold">{formatValue(lead.name)}</td>
                      <td className="px-3 py-2">{formatValue(lead.email)}</td>
                      <td className="px-3 py-2">{formatValue(lead.number || lead.phone)}</td>
                      <td className="px-3 py-2">{formatValue(lead.postcode)}</td>
                      <td className="px-3 py-2 font-semibold">{formatValue(lead.vehicle_vrm || lead.vehicle_reg)}</td>
                      <td className="px-3 py-2">{formatValue(lead.vehicle_brand)}</td>
                      <td className="px-3 py-2">{formatValue(lead.vehicle_model)}</td>
                      <td className="px-3 py-2">{formatValue(lead.vehicle_series)}</td>
                      <td className="px-3 py-2">{formatValue(lead.vehicle_year)}</td>
                      <td className="px-3 py-2">{formatValue(lead.fuelType || lead.fuel_type)}</td>
                      <td className="px-3 py-2">{formatValue(lead.engin_capacity || lead.engine_capacity)}</td>
                      <td className="px-3 py-2">{formatValue(lead.vehicle_part)}</td>
                      <td className="px-3 py-2">{formatValue(lead.status)}</td>
                      <td className="px-3 py-2 text-gray-500">{formatValue(lead.source)}</td>
                      <td className="max-w-[180px] truncate px-3 py-2 text-gray-500" title={lead.description || ""}>
                        {formatValue(lead.description)}
                      </td>
                    </tr>
                    {isOpen ? (
                      <tr>
                        <td colSpan={COLUMNS.length} className="p-0">
                          <LeadDetails lead={lead} />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <nav className="mt-4 flex items-center justify-between gap-3" aria-label="Leads pagination">
        <button type="button" className={btn} disabled={loading || page <= 1} onClick={() => setPage((p) => p - 1)}>
          ← Newer
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button type="button" className={btn} disabled={loading || page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Older →
        </button>
      </nav>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllCommunities } from "@/lib/dsc.functions";
import { CommunityCard } from "@/components/dsc-cards";

export const Route = createFileRoute("/comunidades")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["all-communities"],
      queryFn: getAllCommunities,
    }),
  head: () => ({
    meta: [
      { title: "Comunidades — DSC UTP" },
      { name: "description", content: "Comunidades tecnológicas aliadas y cercanas a DSC UTP." },
    ],
  }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  const { data } = useSuspenseQuery({ queryKey: ["all-communities"], queryFn: getAllCommunities });

  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("");

  const regions = [...new Set(data.communities.map((c) => c.region))].sort();

  const filtered = data.communities.filter((c) => {
    if (regionFilter && c.region !== regionFilter) return false;
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-white/50">[C] Comunidades</span>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
        Comunidades
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Comunidades tecnológicas aliadas. Conéctate, colabora y crece.
      </p>

      <div className="mt-10 space-y-4">
        <input
          type="search"
          placeholder="Buscar comunidades..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none md:max-w-md"
        />
        {regions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(regionFilter === r ? "" : r)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  regionFilter === r
                    ? "border-white bg-white text-[oklch(0.28_0.22_268)]"
                    : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
            {(regionFilter || query) && (
              <button
                onClick={() => { setRegionFilter(""); setQuery(""); }}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 hover:text-white"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full text-white/50">No hay comunidades que coincidan con los filtros.</p>
        ) : (
          filtered.map((c) => <CommunityCard key={c.id} community={c} />)
        )}
      </div>
    </div>
  );
}

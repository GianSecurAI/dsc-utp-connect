import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAllEvents } from "@/lib/dsc.functions";
import { EventCard } from "@/components/dsc-cards";

export const Route = createFileRoute("/eventos")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["all-events"],
      queryFn: getAllEvents,
    }),
  head: () => ({
    meta: [
      { title: "Eventos — DSC UTP" },
      { name: "description", content: "Todos los eventos de DSC UTP: workshops, hackatones, summits y más." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { data } = useSuspenseQuery({ queryKey: ["all-events"], queryFn: getAllEvents });
  const programsById = useMemo(() => new Map(data.programs.map((p) => [p.id, p])), [data.programs]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [externalOnly, setExternalOnly] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [query, setQuery] = useState("");

  const filtered = data.events.filter((e) => {
    if (externalOnly && !e.is_external) return false;
    if (selected.size > 0) {
      if (!e.program_id || !selected.has(e.program_id)) return false;
    }
    if (typeFilter && e.type !== typeFilter) return false;
    if (query && !e.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-white/50">[E] Eventos</span>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
        Todos los eventos
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Workshops, hackatones, summits y más. Filtra por programa o muestra solo eventos externos.
      </p>

      <div className="mt-10 space-y-4">
        <input
          type="search"
          placeholder="Buscar eventos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none md:max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {data.programs.map((p) => {
            const active = selected.has(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-white bg-white text-[oklch(0.28_0.22_268)]"
                    : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {p.name}
              </button>
            );
          })}
          <button
            onClick={() => setExternalOnly((v) => !v)}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs transition ${
              externalOnly
                ? "border-accent bg-accent/20 text-accent"
                : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            [EXTERNO] solo externos
          </button>
          {(selected.size > 0 || externalOnly || query) && (
            <button
              onClick={() => {
                setSelected(new Set());
                setExternalOnly(false);
                setQuery("");
              }}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 hover:text-white"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full text-white/50">No hay eventos que coincidan con los filtros.</p>
        ) : (
          filtered.map((e) => (
            <EventCard
              key={e.id}
              event={e}
              program={e.program_id ? programsById.get(e.program_id) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllJobs } from "@/lib/dsc.functions";
import { JobCard } from "@/components/dsc-cards";

export const Route = createFileRoute("/empleos")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["all-jobs"],
      queryFn: getAllJobs,
    }),
  head: () => ({
    meta: [
      { title: "Empleos — DSC UTP" },
      { name: "description", content: "Ofertas laborales tech para la comunidad DSC UTP." },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const { data } = useSuspenseQuery({ queryKey: ["all-jobs"], queryFn: getAllJobs });

  const [typeFilter, setTypeFilter] = useState<string>("");
  const [modalityFilter, setModalityFilter] = useState<string>("");
  const [query, setQuery] = useState("");

  const filtered = data.jobs.filter((j) => {
    if (typeFilter && j.type !== typeFilter) return false;
    if (modalityFilter && j.modality !== modalityFilter) return false;
    if (query && !j.title.toLowerCase().includes(query.toLowerCase()) && !j.company.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-white/50">[T] Empleos</span>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
        Ofertas laborales
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Oportunidades en tecnología para la comunidad. Filtra por tipo o modalidad.
      </p>

      <div className="mt-10 space-y-4">
        <input
          type="search"
          placeholder="Buscar por puesto o empresa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none md:max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {(["Full-time", "Part-time", "Freelance", "Prácticas"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(typeFilter === t ? "" : t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                typeFilter === t
                  ? "border-white bg-white text-[oklch(0.28_0.22_268)]"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
          {(["Presencial", "Remoto", "Híbrido"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModalityFilter(modalityFilter === m ? "" : m)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                modalityFilter === m
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {m}
            </button>
          ))}
          {(typeFilter || modalityFilter || query) && (
            <button
              onClick={() => { setTypeFilter(""); setModalityFilter(""); setQuery(""); }}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 hover:text-white"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full text-white/50">No hay ofertas que coincidan con los filtros.</p>
        ) : (
          filtered.map((j) => <JobCard key={j.id} job={j} />)
        )}
      </div>
    </div>
  );
}

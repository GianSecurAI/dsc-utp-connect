import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllProjects } from "@/lib/dsc.functions";
import { ProjectCard } from "@/components/dsc-cards";
import type { ProjectStatus } from "@/models/project.model";

export const Route = createFileRoute("/proyectos")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["all-projects"],
      queryFn: getAllProjects,
    }),
  head: () => ({
    meta: [
      { title: "Proyectos — DSC UTP" },
      { name: "description", content: "Proyectos desarrollados por los miembros de DSC UTP." },
    ],
  }),
  component: ProyectosPage,
});

const statusOptions: { value: ProjectStatus | ""; label: string }[] = [
  { value: "activo", label: "Activos" },
  { value: "completado", label: "Completados" },
  { value: "pausado", label: "Pausados" },
];

function ProyectosPage() {
  const { data } = useSuspenseQuery({ queryKey: ["all-projects"], queryFn: getAllProjects });

  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "">("");
  const [query, setQuery] = useState("");

  const programMap = Object.fromEntries(data.programs.map((p) => [p.id, p]));

  const filtered = data.projects.filter((p) => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-white/50">
        [P] Proyectos
      </span>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
        Proyectos
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Lo que construimos. Proyectos reales desarrollados por los miembros de DSC UTP.
      </p>

      <div className="mt-10 space-y-4">
        <input
          type="search"
          placeholder="Buscar proyectos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none md:max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(statusFilter === value ? "" : value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === value
                  ? "border-white bg-white text-[oklch(0.28_0.22_268)]"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
          {(statusFilter || query) && (
            <button
              onClick={() => {
                setStatusFilter("");
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
          <p className="col-span-full text-white/50">No hay proyectos que coincidan.</p>
        ) : (
          filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              program={p.program_id ? programMap[p.program_id] : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}

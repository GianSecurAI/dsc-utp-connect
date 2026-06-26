import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProgramBySlug } from "@/lib/dsc.functions";
import { EventCard, MemberCard, ProjectCard } from "@/components/dsc-cards";

export const Route = createFileRoute("/programas/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["program", params.slug],
      queryFn: () => getProgramBySlug(params.slug),
    });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.program.name} — DSC UTP` },
          { name: "description", content: loaderData.program.short_description ?? "" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Programa no encontrado</h1>
      <Link to="/" className="mt-6 inline-block text-accent hover:underline">
        ← Volver al inicio
      </Link>
    </div>
  ),
  component: ProgramPage,
});

function darkMix(hex: string, intensity: number, alpha = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * intensity + 10 * (1 - intensity));
  const dg = Math.round(g * intensity + 8 * (1 - intensity));
  const db = Math.round(b * intensity + 12 * (1 - intensity));
  return alpha < 1 ? `rgba(${dr},${dg},${db},${alpha})` : `rgb(${dr},${dg},${db})`;
}

function ProgramPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery({
    queryKey: ["program", slug],
    queryFn: () => getProgramBySlug(slug),
  });

  if (!data) return null;
  const { program, members, events, projects } = data;

  const color = program.color ?? "#3B82F6";
  const bg = darkMix(color, 0.22);
  const bgH = darkMix(color, 0.22, 0.8);
  const surface = darkMix(color, 0.17);
  const surface2 = darkMix(color, 0.12);

  const director = members.find((m) => m.sort_order === 1);
  const subdirector = members.find((m) => m.sort_order === 2);
  const activeMembers = members.filter((m) => m.sort_order > 2);

  return (
    <>
      {/* Inline style rendered by React — targets root div and header directly */}
      <style>{`
        #root-bg            { background-color: ${bg}  !important; }
        header.sticky       { background-color: ${bgH} !important; }
        .bg-surface         { background-color: ${surface}  !important; }
        .bg-surface-2       { background-color: ${surface2} !important; }
        .hover\\:bg-surface-2:hover { background-color: ${surface2} !important; }
        .bg-card            { background-color: ${surface}  !important; }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link to="/" className="font-mono text-xs text-white/50 hover:text-white">
          ← Inicio
        </Link>

        <header className="mt-6 border-b border-white/10 pb-12">
          <div className="h-1 w-16 rounded-full" style={{ backgroundColor: color }} />
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            {program.name}
          </h1>
          {program.description && (
            <p className="mt-4 max-w-2xl text-lg text-white/70">{program.description}</p>
          )}
        </header>

        <section className="py-16">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            [L] Liderazgo
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">Quienes dirigen el programa</h2>
          {!director && !subdirector ? (
            <p className="mt-6 text-white/50">
              Próximamente se anunciarán los líderes de este programa.
            </p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {director && (
                <div className="relative overflow-hidden rounded-xl">
                  <div
                    className="absolute inset-x-0 top-0 h-0.5"
                    style={{ backgroundColor: color }}
                  />
                  <MemberCard
                    name={director.name}
                    role={director.role}
                    bio={director.bio}
                    socials={director.socials}
                  />
                </div>
              )}
              {subdirector && (
                <MemberCard
                  name={subdirector.name}
                  role={subdirector.role}
                  bio={subdirector.bio}
                  socials={subdirector.socials}
                />
              )}
            </div>
          )}
          {activeMembers.length > 0 && (
            <div className="mt-10">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                [M] Miembros activos
              </span>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeMembers.map((m) => (
                  <MemberCard
                    key={m.id}
                    name={m.name}
                    role={m.role}
                    bio={m.bio}
                    socials={m.socials}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                [E] Eventos
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Lo que hemos hecho y lo que viene
              </h2>
            </div>
            <Link
              to="/eventos"
              className="hidden rounded-md border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 md:inline-block"
            >
              Ver todos →
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="mt-6 text-white/50">Sin eventos por ahora. ¡Próximamente!</p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.id} event={e} program={program} />
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                [P] Proyectos
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">Lo que construimos</h2>
            </div>
            <Link
              to="/proyectos"
              className="hidden rounded-md border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 md:inline-block"
            >
              Ver todos →
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="mt-6 text-white/50">
              Sin proyectos registrados aún. ¡Pronto habrá novedades!
            </p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} program={program} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

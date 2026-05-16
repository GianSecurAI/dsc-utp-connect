import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProgramBySlug } from "@/lib/dsc.functions";
import { EventCard, MemberCard } from "@/components/dsc-cards";

export const Route = createFileRoute("/programas/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["program", params.slug],
      queryFn: () => getProgramBySlug({ data: { slug: params.slug } }),
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
      <Link to="/" className="mt-6 inline-block text-accent hover:underline">← Volver al inicio</Link>
    </div>
  ),
  component: ProgramPage,
});

function ProgramPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery({
    queryKey: ["program", slug],
    queryFn: () => getProgramBySlug({ data: { slug } }),
  });
  if (!data) return null;
  const { program, members, events } = data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Link to="/" className="font-mono text-xs text-white/50 hover:text-white">← Inicio</Link>
      <header className="mt-6 border-b border-white/10 pb-12">
        <div
          className="h-1 w-16 rounded-full"
          style={{ backgroundColor: program.color ?? "#ffffff" }}
        />
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          {program.name}
        </h1>
        {program.description && (
          <p className="mt-4 max-w-2xl text-lg text-white/70">{program.description}</p>
        )}
      </header>

      <section className="py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">[I] Integrantes</span>
        <h2 className="mt-3 text-3xl font-bold text-white">Quienes lideran el programa</h2>
        {members.length === 0 ? (
          <p className="mt-6 text-white/50">Aún no hay integrantes registrados.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <MemberCard key={m.id} name={m.name} role={m.role} bio={m.bio} socials={m.socials} />
            ))}
          </div>
        )}
      </section>

      <section className="py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">[E] Eventos organizados</span>
        <h2 className="mt-3 text-3xl font-bold text-white">Lo que hemos hecho y lo que viene</h2>
        {events.length === 0 ? (
          <p className="mt-6 text-white/50">Sin eventos por ahora.</p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.id} event={e} program={program} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

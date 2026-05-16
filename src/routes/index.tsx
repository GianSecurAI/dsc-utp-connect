import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import heroImg from "@/assets/hero.jpg";
import { getLandingData } from "@/lib/dsc.functions";
import { EventCard, MemberCard, ProgramCard } from "@/components/dsc-cards";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["landing"],
      queryFn: () => getLandingData(),
    }),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery({
    queryKey: ["landing"],
    queryFn: () => getLandingData(),
  });

  const programsById = new Map(data.programs.map((p) => [p.id, p]));

  return (
    <div>
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
        <div>
          <span className="inline-block rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-white/70">
            [DSC] · UTP · Lima, Perú
          </span>
          <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
            Developer<br />Student Clubs<br />
            <span className="text-accent">UTP</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/70">
            La comunidad estudiantil de tecnología de la Universidad Tecnológica del Perú.
            Aprende, construye y conecta con quienes están moviendo la industria.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#programas"
              className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-[oklch(0.28_0.22_268)] transition hover:bg-white/90"
            >
              Explorar programas
            </a>
            <Link
              to="/eventos"
              className="rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver eventos
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImg}
            alt="Ilustración de la comunidad DSC UTP"
            width={1280}
            height={1024}
            className="rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <div className="dotted-divider" />
      </div>

      {/* QUIENES SOMOS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">[Q] Quiénes somos</span>
        <div className="mt-4 grid gap-10 md:grid-cols-3">
          <h2 className="text-3xl font-bold text-white md:col-span-1 md:text-4xl">
            Una comunidad por y para estudiantes de tecnología.
          </h2>
          <div className="md:col-span-2">
            <p className="text-lg text-white/70">
              DSC UTP reúne a estudiantes apasionados por el desarrollo, la nube, la IA, los datos y el diseño.
              Organizamos study jams, hackatones, charlas con la industria y proyectos open source para que
              ningún estudiante de la UTP se quede fuera del ecosistema tech.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 font-mono">
              <Stat label="Miembros activos" value="500+" />
              <Stat label="Programas" value={`${data.programs.length}`} />
              <Stat label="Eventos al año" value="40+" />
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section id="programas" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">[P] Nuestros Programas</span>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Seis caminos para crecer.</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.programs.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </section>

      {/* JUNTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">[J] Junta Directiva</span>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Los que mueven la comunidad.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.board.map((m) => (
            <MemberCard
              key={m.id}
              name={m.name}
              role={m.role}
              bio={m.bio}
              socials={m.socials}
            />
          ))}
        </div>
      </section>

      {/* ALIADOS */}
      <section id="aliados" className="mx-auto max-w-7xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">[A] Aliados</span>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Construimos con la industria.</h2>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {data.partners.map((p) => (
            <a
              key={p.id}
              href={p.website ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="flex h-28 items-center justify-center bg-background px-4 text-center font-mono text-sm text-white/60 transition hover:bg-surface hover:text-white"
            >
              {p.name}
            </a>
          ))}
        </div>
      </section>

      {/* EVENTOS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">[E] Próximos Eventos</span>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Lo que se viene.</h2>
          </div>
          <Link
            to="/eventos"
            className="hidden rounded-md border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 md:inline-block"
          >
            Ver todos →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.upcomingEvents.map((e) => (
            <EventCard
              key={e.id}
              event={e}
              program={e.program_id ? programsById.get(e.program_id) : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface p-4">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}

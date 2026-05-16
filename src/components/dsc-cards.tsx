import { Link } from "@tanstack/react-router";
import type { EventItem, Program } from "@/lib/dsc.functions";

export function EventCard({ event, program }: { event: EventItem; program?: Program }) {
  const date = new Date(event.event_date);
  return (
    <article className="group flex flex-col rounded-xl border border-white/10 bg-surface p-5 transition hover:border-white/30 hover:bg-surface-2">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span>{date.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}</span>
        {event.is_external && (
          <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 text-accent">[EXTERNO]</span>
        )}
        {program && (
          <span className="rounded-sm border border-white/15 px-1.5 py-0.5 text-white/70">{program.name}</span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
      {event.description && <p className="mt-1 text-sm text-white/60">{event.description}</p>}
      {event.location && (
        <p className="mt-3 font-mono text-xs text-white/40">@ {event.location}</p>
      )}
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-1 text-sm text-accent hover:underline"
        >
          Ver detalles →
        </a>
      )}
    </article>
  );
}

export function MemberCard({
  name,
  role,
  bio,
  socials,
}: {
  name: string;
  role: string;
  bio?: string | null;
  socials?: Record<string, string>;
}) {
  const initials = name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 font-mono text-sm text-white">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">{role}</div>
        </div>
      </div>
      {bio && <p className="mt-3 text-sm text-white/60">{bio}</p>}
      {socials && Object.keys(socials).length > 0 && (
        <div className="mt-3 flex gap-3 font-mono text-xs text-white/40">
          {Object.entries(socials).map(([k, v]) => (
            <a key={k} href={v} target="_blank" rel="noreferrer" className="hover:text-white">
              {k}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      to="/programas/$slug"
      params={{ slug: program.slug }}
      className="group flex flex-col rounded-xl border border-white/10 bg-surface p-6 transition hover:border-white/40 hover:bg-surface-2"
    >
      <div
        className="h-1 w-12 rounded-full"
        style={{ backgroundColor: program.color ?? "#ffffff" }}
      />
      <h3 className="mt-4 text-xl font-semibold text-white">{program.name}</h3>
      {program.short_description && (
        <p className="mt-2 text-sm text-white/60">{program.short_description}</p>
      )}
      <span className="mt-6 font-mono text-xs text-white/40 group-hover:text-white">
        Ver programa →
      </span>
    </Link>
  );
}

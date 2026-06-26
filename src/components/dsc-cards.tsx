import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventItem, Program, IJob, IProject, ICommunity } from "@/lib/dsc.functions";

export function EventCard({ event, program }: { event: EventItem; program?: Program }) {
  const date = new Date(event.date + "T00:00:00");
  return (
    <article className="group flex flex-col rounded-xl border border-white/10 bg-surface p-5 transition hover:border-white/30 hover:bg-surface-2">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span>{date.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}</span>
        {event.time !== "00:00" && <span>· {event.time}</span>}
        {event.is_external && (
          <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 text-accent">[EXTERNO]</span>
        )}
        {program && (
          <span className="rounded-sm border border-white/15 px-1.5 py-0.5 text-white/70">{program.name}</span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
      {event.description && <p className="mt-1 text-sm text-white/60">{event.description}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-white/40">
        {event.location && <span>@ {event.location}</span>}
        <span className="rounded-sm border border-white/10 px-1.5 py-0.5">{event.type}</span>
        <span>{event.city}, {event.region}</span>
      </div>
      {event.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
              {tag}
            </span>
          ))}
        </div>
      )}
      {event.registration_url && (
        <a
          href={event.registration_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-1 text-sm text-accent hover:underline"
        >
          Registrarse →
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

export function JobCard({ job }: { job: IJob }) {
  return (
    <article className="group flex flex-col rounded-xl border border-white/10 bg-surface p-5 transition hover:border-white/30 hover:bg-surface-2">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span>{job.type}</span>
        <span>·</span>
        <span>{job.modality}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{job.title}</h3>
      <p className="mt-1 text-sm font-medium text-white/70">{job.company}</p>
      <p className="mt-2 line-clamp-3 text-sm text-white/60">{job.description}</p>
      <div className="mt-3 font-mono text-xs text-white/40">
        <span>{job.location}, {job.region}</span>
        {job.salary_range && <span> · {job.salary_range}</span>}
      </div>
      {job.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {job.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
              {tag}
            </span>
          ))}
        </div>
      )}
      <a
        href={job.apply_url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex w-fit items-center gap-1 text-sm text-accent hover:underline"
      >
        Postular →
      </a>
    </article>
  );
}

const statusStyles: Record<string, string> = {
  activo: "bg-green-500/20 text-green-400",
  completado: "bg-accent/20 text-accent",
  pausado: "bg-yellow-500/20 text-yellow-400",
};

export function ProjectCard({ project, program }: { project: IProject; program?: Program }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="group flex cursor-pointer flex-col rounded-xl border border-white/10 bg-surface p-5 transition hover:border-white/30 hover:bg-surface-2"
      >
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
          <span className={`rounded-sm px-1.5 py-0.5 ${statusStyles[project.status]}`}>
            {project.status}
          </span>
          {program && (
            <span className="rounded-sm border border-white/15 px-1.5 py-0.5 text-white/60">
              {program.name}
            </span>
          )}
          <span className="ml-auto">{project.year}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">{project.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/60">{project.summary}</p>
        {project.members.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {project.members.map((m) => (
              <span key={m.name} className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
                {m.name}
              </span>
            ))}
          </div>
        )}
        {project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 font-mono text-xs text-white/40 group-hover:text-white">
          Ver detalles →
        </span>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg border-white/10 bg-[oklch(0.18_0.05_268)] text-white">
          <DialogHeader>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <span className={`rounded-sm px-1.5 py-0.5 ${statusStyles[project.status]}`}>
                {project.status}
              </span>
              {program && (
                <span className="text-white/50">{program.name}</span>
              )}
              <span className="ml-auto text-white/30">{project.year}</span>
            </div>
            <DialogTitle className="mt-2 text-xl font-bold text-white">
              {project.name}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-white/70">{project.description}</p>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Equipo</p>
            <ul className="mt-2 space-y-1">
              {project.members.map((m) => (
                <li key={m.name} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-white">{m.name}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60">{m.role}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <a
              href={project.repo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Ver en GitHub →
            </a>
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Demo →
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CommunityCard({ community }: { community: ICommunity }) {
  return (
    <article className="group flex flex-col rounded-xl border border-white/10 bg-surface p-5 transition hover:border-white/30 hover:bg-surface-2">
      <div className="flex items-center gap-3">
        <img
          src={community.logo_url}
          alt={community.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{community.name}</h3>
          <p className="font-mono text-xs text-white/40">{community.city}, {community.region}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-white/60">{community.description}</p>
      {community.topics.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {community.topics.map((topic) => (
            <span key={topic} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
              {topic}
            </span>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-white/40">
        {community.contact.website && (
          <a href={community.contact.website} target="_blank" rel="noreferrer" className="hover:text-white">web</a>
        )}
        {community.contact.socialMedia.github && (
          <a href={community.contact.socialMedia.github} target="_blank" rel="noreferrer" className="hover:text-white">github</a>
        )}
        {community.contact.socialMedia.discord && (
          <a href={community.contact.socialMedia.discord} target="_blank" rel="noreferrer" className="hover:text-white">discord</a>
        )}
        {community.contact.socialMedia.linkedin && (
          <a href={community.contact.socialMedia.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">linkedin</a>
        )}
      </div>
    </article>
  );
}

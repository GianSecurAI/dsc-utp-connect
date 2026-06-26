import { programs } from "@/data/programs";
import { members } from "@/data/members";
import { partners } from "@/data/partners";
import { events } from "@/data/events";
import { jobs } from "@/data/jobs";
import { projects } from "@/data/projects";
import { communities } from "@/data/communities";

import type { IEvent } from "@/models/event.model";
import type { IJob } from "@/models/job.model";
import type { IProject } from "@/models/project.model";
import type { ICommunity } from "@/models/community.model";

// ── Re-exportar modelos ──────────────────────────────────────────────────────

export type { IEvent, IJob, IProject, ICommunity };
export type { IEventImage, ImageAspectRatio } from "@/models/event.model";
export type { ProjectStatus, IProjectMember } from "@/models/project.model";

// ── Tipos internos del proyecto ──────────────────────────────────────────────

export type Program = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  color: string | null;
  icon: string | null;
  cover_url: string | null;
  sort_order: number;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  socials: Record<string, string>;
  board_position: "president" | "vice_president" | "chief_of_staff" | "member" | null;
  program_id: string | null;
  sort_order: number;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  sort_order: number;
};

// Mantener compatibilidad con código existente
export type EventItem = IEvent;

// ── Funciones de datos (sin backend) ─────────────────────────────────────────

export function getLandingData() {
  const now = new Date().toISOString().slice(0, 10);
  const MAIN_BOARD: Member["board_position"][] = ["president", "vice_president", "chief_of_staff"];
  const board = members
    .filter((m) => m.board_position !== null && MAIN_BOARD.includes(m.board_position))
    .sort((a, b) => a.sort_order - b.sort_order);
  const upcomingEvents = events
    .filter((e) => e.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return {
    programs: [...programs].sort((a, b) => a.sort_order - b.sort_order),
    board,
    partners: [...partners].sort((a, b) => a.sort_order - b.sort_order),
    upcomingEvents,
  };
}

export function getProgramBySlug(slug: string) {
  const program = programs.find((p) => p.slug === slug) ?? null;
  if (!program) return null;

  const programMembers = members
    .filter((m) => m.program_id === program.id)
    .sort((a, b) => a.sort_order - b.sort_order);

  const programEvents = events
    .filter((e) => e.program_id === program.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const programProjects = projects
    .filter((p) => p.program_id === program.id)
    .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));

  return { program, members: programMembers, events: programEvents, projects: programProjects };
}

export function getAllEvents() {
  return {
    events: [...events].sort((a, b) => b.date.localeCompare(a.date)),
    programs: [...programs].sort((a, b) => a.sort_order - b.sort_order),
  };
}

// ── Nuevas funciones para secciones adicionales ──────────────────────────────

export function getAllJobs() {
  const now = new Date().toISOString().slice(0, 10);
  return {
    jobs: [...jobs]
      .filter((j) => !j.expires_date || j.expires_date >= now)
      .sort((a, b) => b.posted_date.localeCompare(a.posted_date)),
  };
}

export function getAllProjects() {
  return {
    projects: [...projects].sort((a, b) => b.year - a.year || a.name.localeCompare(b.name)),
    programs: [...programs].sort((a, b) => a.sort_order - b.sort_order),
  };
}

export function getAllCommunities() {
  return {
    communities: [...communities].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

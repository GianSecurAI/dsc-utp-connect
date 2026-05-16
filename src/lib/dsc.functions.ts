import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
  board_position: "president" | "vice_president" | "director" | "member" | null;
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

export type EventItem = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  cover_url: string | null;
  link: string | null;
  program_id: string | null;
  is_external: boolean;
};

const PROGRAM_COLS = "id, slug, name, short_description, description, color, icon, cover_url, sort_order";
const MEMBER_COLS = "id, name, role, bio, photo_url, socials, board_position, program_id, sort_order";
const PARTNER_COLS = "id, name, logo_url, website, sort_order";
const EVENT_COLS = "id, title, description, event_date, location, cover_url, link, program_id, is_external";

export const getLandingData = createServerFn({ method: "GET" }).handler(async () => {
  const [programsRes, membersRes, partnersRes, eventsRes] = await Promise.all([
    supabaseAdmin.from("programs").select(PROGRAM_COLS).order("sort_order"),
    supabaseAdmin.from("members").select(MEMBER_COLS).not("board_position", "is", null).order("sort_order"),
    supabaseAdmin.from("partners").select(PARTNER_COLS).order("sort_order"),
    supabaseAdmin.from("events").select(EVENT_COLS).gte("event_date", new Date().toISOString()).order("event_date").limit(6),
  ]);

  if (programsRes.error) throw programsRes.error;
  if (membersRes.error) throw membersRes.error;
  if (partnersRes.error) throw partnersRes.error;
  if (eventsRes.error) throw eventsRes.error;

  return {
    programs: (programsRes.data ?? []) as Program[],
    board: (membersRes.data ?? []) as Member[],
    partners: (partnersRes.data ?? []) as Partner[],
    upcomingEvents: (eventsRes.data ?? []) as EventItem[],
  };
});

export const getProgramBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const programRes = await supabaseAdmin
      .from("programs")
      .select(PROGRAM_COLS)
      .eq("slug", data.slug)
      .maybeSingle();

    if (programRes.error) throw programRes.error;
    if (!programRes.data) return null;

    const program = programRes.data as Program;

    const [membersRes, eventsRes] = await Promise.all([
      supabaseAdmin.from("members").select(MEMBER_COLS).eq("program_id", program.id).order("sort_order"),
      supabaseAdmin.from("events").select(EVENT_COLS).eq("program_id", program.id).order("event_date", { ascending: false }),
    ]);

    if (membersRes.error) throw membersRes.error;
    if (eventsRes.error) throw eventsRes.error;

    return {
      program,
      members: (membersRes.data ?? []) as Member[],
      events: (eventsRes.data ?? []) as EventItem[],
    };
  });

export const getAllEvents = createServerFn({ method: "GET" }).handler(async () => {
  const [eventsRes, programsRes] = await Promise.all([
    supabaseAdmin.from("events").select(EVENT_COLS).order("event_date", { ascending: false }),
    supabaseAdmin.from("programs").select(PROGRAM_COLS).order("sort_order"),
  ]);
  if (eventsRes.error) throw eventsRes.error;
  if (programsRes.error) throw programsRes.error;
  return {
    events: (eventsRes.data ?? []) as EventItem[],
    programs: (programsRes.data ?? []) as Program[],
  };
});

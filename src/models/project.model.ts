export type ProjectStatus = "activo" | "pausado" | "completado";

export interface IProjectMember {
  name: string;
  role: string;
  member_id?: string;
}

export interface IProject {
  id: string;
  name: string;
  summary: string;
  description: string;
  repo_url: string;
  demo_url?: string;
  cover_url?: string;
  tags: string[];
  program_id?: string;
  status: ProjectStatus;
  members: IProjectMember[];
  year: number;
}

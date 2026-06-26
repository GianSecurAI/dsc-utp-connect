import type { IProject } from "@/models/project.model";

export const projects: IProject[] = [
  {
    id: "proj-1",
    name: "DSC UTP Web",
    summary: "Plataforma web oficial de DSC UTP para centralizar eventos, empleos y proyectos.",
    description: "DSC UTP Web es la plataforma oficial de Developer Student Clubs UTP. Centraliza información sobre eventos tech, ofertas laborales para estudiantes, comunidades tecnológicas y los proyectos desarrollados internamente. Construida con TanStack Start, React 19, TailwindCSS v4 y desplegada en Cloudflare Workers. El contenido es gestionado vía GitHub Issues con automatización por el agente Jules.",
    repo_url: "https://github.com/dsc-utp/dsc-utp-web",
    tags: ["react", "typescript", "tailwindcss", "cloudflare", "tanstack"],
    program_id: "1",
    status: "activo",
    members: [
      { name: "Presidente DSC UTP", role: "Líder de proyecto" },
      { name: "Vicepresidenta DSC UTP", role: "Developer" },
    ],
    year: 2025,
  },
];

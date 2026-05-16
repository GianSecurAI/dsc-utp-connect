import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white text-[oklch(0.28_0.22_268)] font-mono text-xs font-bold">
            DSC
          </span>
          <span className="font-mono text-sm tracking-tight text-white/90">
            DSC <span className="text-white/50">/</span> UTP
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" tag="H">Inicio</NavLink>
          <NavLink to="/eventos" tag="E">Eventos</NavLink>
          <a
            href="#programas"
            className="group inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:text-white"
          >
            <span className="font-mono text-[11px] text-white/40 group-hover:text-white/70">[P]</span>
            Programas
          </a>
          <a
            href="#aliados"
            className="group inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:text-white"
          >
            <span className="font-mono text-[11px] text-white/40 group-hover:text-white/70">[A]</span>
            Aliados
          </a>
        </nav>
        <a
          href="#programas"
          className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white hover:text-[oklch(0.28_0.22_268)]"
        >
          Únete
        </a>
      </div>
    </header>
  );
}

function NavLink({ to, tag, children }: { to: string; tag: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-white/70 transition hover:text-white"
      activeProps={{ className: "text-white" }}
      activeOptions={{ exact: to === "/" }}
    >
      <span className="font-mono text-[11px] text-white/40 group-hover:text-white/70">[{tag}]</span>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-mono text-sm text-white/90">[DSC] Developer Student Clubs UTP</div>
          <p className="mt-1 text-sm text-white/50">
            Comunidad estudiantil de tecnología · Universidad Tecnológica del Perú
          </p>
        </div>
        <div className="flex gap-4 font-mono text-xs text-white/50">
          <a href="https://instagram.com" className="hover:text-white">instagram</a>
          <a href="https://linkedin.com" className="hover:text-white">linkedin</a>
          <a href="https://github.com" className="hover:text-white">github</a>
          <a href="mailto:hola@dscutp.dev" className="hover:text-white">email</a>
        </div>
      </div>
    </footer>
  );
}

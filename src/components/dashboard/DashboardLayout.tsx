import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  Bookmark,
  User,
  Settings,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Rekomendasi Magang", icon: Sparkles },
  { label: "Lowongan Magang", icon: Briefcase },
  { label: "Bookmark", icon: Bookmark },
  { label: "Profil Saya", icon: User },
  { label: "Pengaturan", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-primary-glow/15 blur-[140px]" />
      </div>

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/50 bg-card/40 backdrop-blur-xl lg:flex">
        <SidebarBody />
      </aside>

      {/* Sidebar mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 22 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/50 bg-card/90 backdrop-blur-xl lg:hidden"
            >
              <SidebarBody onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/50 bg-background/60 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-card/50 lg:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Cari magang, perusahaan, skill..."
              className="h-10 w-full rounded-full border border-border/60 bg-card/40 pl-10 pr-4 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-card/50 transition hover:border-primary/60 hover:shadow-[var(--shadow-glow-sm)]">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/50 py-1 pl-1 pr-3">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
                A
              </div>
              <span className="hidden text-sm font-medium sm:inline">Agnan</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <a href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span>Internify</span>
        </a>
        {onNavigate && (
          <button onClick={onNavigate} className="lg:hidden" aria-label="Tutup">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={onNavigate}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              item.active
                ? "bg-gradient-to-r from-primary/20 to-primary/5 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
            }`}
          >
            {item.active && (
              <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary to-primary-glow shadow-[0_0_12px_var(--primary)]" />
            )}
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="m-3 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-transparent p-4">
        <p className="text-xs font-semibold text-primary-glow">Pro Tip</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Lengkapi profilmu untuk meningkatkan akurasi rekomendasi AI.
        </p>
      </div>
    </>
  );
}
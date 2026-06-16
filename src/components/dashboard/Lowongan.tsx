import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Search,
  Bookmark,
  ArrowUpRight,
  Filter,
  Sparkles,
} from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type Job = {
  id: number;
  company: string;
  role: string;
  location: string;
  mode: "Remote" | "Hybrid" | "Onsite";
  duration: string;
  field: "Engineering" | "Data" | "Design" | "Product";
  posted: string;
  tags: string[];
  stipend: string;
};

const JOBS: Job[] = [
  { id: 1, company: "Tokopedia", role: "Backend Developer Intern", location: "Jakarta", mode: "Hybrid", duration: "6 Bulan", field: "Engineering", posted: "2 hari lalu", tags: ["Go", "PostgreSQL", "gRPC"], stipend: "Rp 4.5jt" },
  { id: 2, company: "GoTo Financial", role: "Data Analyst Intern", location: "Jakarta", mode: "Onsite", duration: "3 Bulan", field: "Data", posted: "1 hari lalu", tags: ["SQL", "Python", "Tableau"], stipend: "Rp 4jt" },
  { id: 3, company: "Traveloka", role: "Machine Learning Intern", location: "Remote", mode: "Remote", duration: "6 Bulan", field: "Data", posted: "3 hari lalu", tags: ["TensorFlow", "Python", "MLOps"], stipend: "Rp 5jt" },
  { id: 4, company: "Bukalapak", role: "Frontend Engineer Intern", location: "Bandung", mode: "Hybrid", duration: "4 Bulan", field: "Engineering", posted: "5 jam lalu", tags: ["React", "TypeScript", "Tailwind"], stipend: "Rp 4jt" },
  { id: 5, company: "Xendit", role: "Product Designer Intern", location: "Remote", mode: "Remote", duration: "3 Bulan", field: "Design", posted: "1 minggu lalu", tags: ["Figma", "Design System"], stipend: "Rp 3.5jt" },
  { id: 6, company: "Mekari", role: "DevOps Intern", location: "Jakarta", mode: "Onsite", duration: "6 Bulan", field: "Engineering", posted: "4 hari lalu", tags: ["AWS", "Docker", "Terraform"], stipend: "Rp 4.5jt" },
  { id: 7, company: "Ruangguru", role: "Product Manager Intern", location: "Jakarta", mode: "Hybrid", duration: "4 Bulan", field: "Product", posted: "Hari ini", tags: ["Roadmap", "Analytics"], stipend: "Rp 4jt" },
  { id: 8, company: "Dana", role: "Mobile Engineer Intern", location: "Jakarta", mode: "Hybrid", duration: "6 Bulan", field: "Engineering", posted: "2 hari lalu", tags: ["Kotlin", "Swift"], stipend: "Rp 4.8jt" },
  { id: 9, company: "Sayurbox", role: "UX Researcher Intern", location: "Remote", mode: "Remote", duration: "3 Bulan", field: "Design", posted: "6 hari lalu", tags: ["User Testing", "Interview"], stipend: "Rp 3.5jt" },
];

const FIELDS = ["Semua", "Engineering", "Data", "Design", "Product"] as const;
const MODES = ["Semua", "Remote", "Hybrid", "Onsite"] as const;

export function LowonganPage() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState<(typeof FIELDS)[number]>("Semua");
  const [mode, setMode] = useState<(typeof MODES)[number]>("Semua");
  const [saved, setSaved] = useState<Set<number>>(new Set([2, 5]));

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || j.role.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some((t) => t.toLowerCase().includes(q));
      const matchF = field === "Semua" || j.field === field;
      const matchM = mode === "Semua" || j.mode === mode;
      return matchQ && matchF && matchM;
    });
  }, [query, field, mode]);

  const toggleSave = (id: number) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <FadeUp>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Lowongan <span className="text-gradient">Magang</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Jelajahi {JOBS.length}+ lowongan magang terbaru dari perusahaan teknologi pilihan.
          </p>
        </div>
      </FadeUp>

      <FadeUp>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari role, perusahaan, atau skill..."
                className="h-11 w-full rounded-xl border border-border/60 bg-background/60 pl-10 pr-4 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Chips items={FIELDS as unknown as string[]} value={field} onChange={(v) => setField(v as typeof field)} />
              <span className="mx-1 hidden h-5 w-px bg-border/60 sm:inline-block" />
              <Chips items={MODES as unknown as string[]} value={mode} onChange={(v) => setMode(v as typeof mode)} />
            </div>
          </div>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((j, i) => (
          <FadeUp key={j.id} delay={i * 0.04}>
            <JobCard job={j} saved={saved.has(j.id)} onToggle={() => toggleSave(j.id)} />
          </FadeUp>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center text-sm text-muted-foreground">
            Tidak ada lowongan yang cocok dengan filter.
          </div>
        )}
      </div>
    </div>
  );
}

function Chips({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => {
        const active = value === it;
        return (
          <button
            key={it}
            onClick={() => onChange(it)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "border-primary/60 bg-gradient-to-r from-primary/30 to-primary/10 text-primary-glow shadow-[var(--shadow-glow-sm)]"
                : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {it}
          </button>
        );
      })}
    </div>
  );
}

function JobCard({ job, saved, onToggle }: { job: Job; saved: boolean; onToggle: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition hover:border-primary/50 hover:shadow-[var(--shadow-glow-sm)]"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10">
            <Building2 className="h-5 w-5 text-primary-glow" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-muted-foreground">{job.company}</p>
            <p className="truncate font-semibold">{job.role}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          aria-label="Simpan"
          className={`grid h-9 w-9 place-items-center rounded-xl border transition ${
            saved
              ? "border-primary/60 bg-primary/15 text-primary-glow shadow-[var(--shadow-glow-sm)]"
              : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-primary-glow"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{job.duration}</span>
        <span className="rounded-full bg-background/60 px-2 py-0.5">{job.mode}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <span key={t} className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Stipend</p>
          <p className="text-sm font-semibold text-primary-glow">{job.stipend}</p>
        </div>
        <button className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)] transition hover:gap-2">
          Lamar <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Briefcase className="h-3 w-3" />
        Diposting {job.posted}
        <span className="ml-auto inline-flex items-center gap-1 text-primary-glow">
          <Sparkles className="h-3 w-3" /> AI Recommended
        </span>
      </div>
    </motion.div>
  );
}
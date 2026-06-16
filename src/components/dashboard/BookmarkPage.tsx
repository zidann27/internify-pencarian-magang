import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  Bookmark,
  Building2,
  MapPin,
  Clock,
  Trash2,
  ArrowUpRight,
  FolderHeart,
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

type Saved = {
  id: number;
  company: string;
  role: string;
  location: string;
  mode: string;
  duration: string;
  match: number;
  savedAt: string;
  collection: "Favorit" | "Untuk Dilamar" | "Riset";
};

const INITIAL: Saved[] = [
  { id: 1, company: "Traveloka", role: "Machine Learning Intern", location: "Remote", mode: "Remote", duration: "6 Bulan", match: 95, savedAt: "Hari ini", collection: "Untuk Dilamar" },
  { id: 2, company: "Tokopedia", role: "Backend Developer Intern", location: "Jakarta", mode: "Hybrid", duration: "6 Bulan", match: 92, savedAt: "Kemarin", collection: "Favorit" },
  { id: 3, company: "GoTo Financial", role: "Data Analyst Intern", location: "Jakarta", mode: "Onsite", duration: "3 Bulan", match: 88, savedAt: "2 hari lalu", collection: "Untuk Dilamar" },
  { id: 4, company: "Bukalapak", role: "Frontend Engineer Intern", location: "Bandung", mode: "Hybrid", duration: "4 Bulan", match: 86, savedAt: "3 hari lalu", collection: "Riset" },
  { id: 5, company: "Xendit", role: "Product Designer Intern", location: "Remote", mode: "Remote", duration: "3 Bulan", match: 81, savedAt: "1 minggu lalu", collection: "Favorit" },
];

const TABS = ["Semua", "Favorit", "Untuk Dilamar", "Riset"] as const;

export function BookmarkPage() {
  const [items, setItems] = useState<Saved[]>(INITIAL);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Semua");

  const filtered = tab === "Semua" ? items : items.filter((i) => i.collection === tab);
  const remove = (id: number) => setItems((p) => p.filter((i) => i.id !== id));

  const stats = [
    { label: "Total Disimpan", value: items.length, icon: Bookmark },
    { label: "Favorit", value: items.filter((i) => i.collection === "Favorit").length, icon: FolderHeart },
    { label: "Untuk Dilamar", value: items.filter((i) => i.collection === "Untuk Dilamar").length, icon: ArrowUpRight },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <FadeUp>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Magang <span className="text-gradient">Tersimpan</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Kelola lowongan favoritmu dan siapkan strategi lamaran terbaik.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10">
                  <s.icon className="h-5 w-5 text-primary-glow" />
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-primary/60 bg-gradient-to-r from-primary/30 to-primary/10 text-primary-glow shadow-[var(--shadow-glow-sm)]"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition hover:border-primary/50 hover:shadow-[var(--shadow-glow-sm)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10">
                    <Building2 className="h-5 w-5 text-primary-glow" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-muted-foreground">{s.company}</p>
                    <p className="truncate font-semibold">{s.role}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-primary/40 bg-gradient-to-br from-primary/30 to-primary/10 px-2.5 py-1 text-xs font-bold text-primary-glow">
                  {s.match}%
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{s.location}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{s.duration}</span>
                <span className="rounded-full bg-background/60 px-2 py-0.5">{s.mode}</span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-primary-glow">
                  <FolderHeart className="h-3 w-3" />{s.collection}
                </span>
                <span className="text-muted-foreground">Disimpan {s.savedAt}</span>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <button className="flex-1 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)]">
                  Lamar Sekarang
                </button>
                <button
                  onClick={() => remove(s.id)}
                  aria-label="Hapus"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
            <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <p className="mt-3 text-sm text-muted-foreground">Belum ada magang tersimpan di koleksi ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
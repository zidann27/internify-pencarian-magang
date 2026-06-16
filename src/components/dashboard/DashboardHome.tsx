import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import {
  Sparkles,
  Bookmark,
  Send,
  Target,
  MapPin,
  Building2,
  Clock,
  TrendingUp,
  Lightbulb,
  Eye,
  CheckCircle2,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

// ---------- helpers ----------
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

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v).toLocaleString("id-ID")}${suffix}`);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);
  useEffect(() => rounded.on("change", (v) => { if (ref.current) ref.current.textContent = v; }), [rounded]);
  return <span ref={ref}>0{suffix}</span>;
}

// ---------- data ----------
const stats = [
  { label: "Total Rekomendasi", value: 248, suffix: "", icon: Sparkles, delta: "+12 minggu ini" },
  { label: "Magang Disimpan", value: 36, suffix: "", icon: Bookmark, delta: "+4 baru" },
  { label: "Lamaran Terkirim", value: 18, suffix: "", icon: Send, delta: "3 dalam review" },
  { label: "Tingkat Kecocokan AI", value: 92, suffix: "%", icon: Target, delta: "Top 5% pengguna" },
];

const recs = [
  { company: "Tokopedia", role: "Backend Developer Intern", location: "Jakarta", mode: "Hybrid", match: 92 },
  { company: "GoTo Financial", role: "Data Analyst Intern", location: "Jakarta", mode: "Onsite", match: 88 },
  { company: "Traveloka", role: "Machine Learning Intern", location: "Remote", mode: "Remote", match: 95 },
  { company: "Bukalapak", role: "Frontend Engineer Intern", location: "Bandung", mode: "Hybrid", match: 86 },
  { company: "Xendit", role: "Product Designer Intern", location: "Remote", mode: "Remote", match: 81 },
  { company: "Mekari", role: "DevOps Intern", location: "Jakarta", mode: "Onsite", match: 78 },
];

const skillsDemand = [
  { name: "Python", v: 92 },
  { name: "React", v: 84 },
  { name: "SQL", v: 78 },
  { name: "Figma", v: 70 },
  { name: "Go", v: 58 },
  { name: "AWS", v: 66 },
];

const fitFields = [{ name: "Match", value: 87, fill: "oklch(0.7 0.27 295)" }];

const activities = [
  { icon: Eye, text: "Melihat lowongan Backend Intern di Tokopedia", time: "2 menit lalu" },
  { icon: Bookmark, text: "Menyimpan Data Analyst Intern di GoTo", time: "1 jam lalu" },
  { icon: Send, text: "Mengirim lamaran ML Intern di Traveloka", time: "Kemarin" },
  { icon: CheckCircle2, text: "Profil diperbarui — skill TensorFlow ditambahkan", time: "2 hari lalu" },
];

const skills = ["Python", "React", "TypeScript", "SQL", "TensorFlow", "Figma"];
const interests = ["AI/ML", "Backend", "Data Science", "Product"];

// ---------- main ----------
export function DashboardHome() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <FadeUp>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Selamat Datang, <span className="text-gradient">Agnan</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Temukan peluang magang terbaik sesuai keterampilan dan minatmu.
          </p>
        </div>
      </FadeUp>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition hover:border-primary/50 hover:shadow-[var(--shadow-glow-sm)]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-primary-glow">{s.delta}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10">
                  <s.icon className="h-5 w-5 text-primary-glow" />
                </div>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>

      {/* Profile + AI Insight */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <FadeUp className="lg:col-span-2">
          <ProfileCard />
        </FadeUp>
        <FadeUp delay={0.1}>
          <FitCard />
        </FadeUp>
      </div>

      {/* Filter */}
      <FadeUp>
        <FilterBar />
      </FadeUp>

      {/* Recommendations */}
      <div>
        <FadeUp>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Rekomendasi AI untukmu</h2>
              <p className="text-sm text-muted-foreground">Diranking berdasarkan skill, minat & histori aktivitasmu.</p>
            </div>
            <button className="hidden text-sm text-primary-glow hover:underline sm:block">Lihat semua</button>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recs.map((r, i) => (
            <FadeUp key={r.role} delay={i * 0.05}>
              <RecCard {...r} />
            </FadeUp>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <FadeUp className="lg:col-span-2">
          <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary-glow" />
              <h3 className="font-semibold">Keterampilan paling dicari</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsDemand}>
                  <defs>
                    <linearGradient id="barP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.22 295)" />
                      <stop offset="100%" stopColor="oklch(0.45 0.22 295)" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="oklch(0.72 0.02 285)" tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip
                    cursor={{ fill: "oklch(0.58 0.24 295 / 0.1)" }}
                    contentStyle={{
                      background: "oklch(0.17 0.015 280)",
                      border: "1px solid oklch(0.58 0.24 295 / 0.4)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="v" fill="url(#barP)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="space-y-4">
            <InsightCard icon={TrendingUp} title="Bidang paling cocok" value="Machine Learning" desc="Berdasarkan minat & skill TensorFlow, Python." />
            <InsightCard icon={Lightbulb} title="Skill perlu ditingkatkan" value="Cloud (AWS/GCP)" desc="Dibutuhkan di 68% lowongan target." />
          </div>
        </FadeUp>
      </div>

      {/* Recent Activity */}
      <FadeUp>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Aktivitas Terbaru</h3>
            <span className="text-xs text-muted-foreground">Hari ini</span>
          </div>
          <ul className="space-y-3">
            {activities.map((a) => (
              <li key={a.text} className="flex items-start gap-3 rounded-xl px-2 py-2 transition hover:bg-primary/5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}

// ---------- sub-components ----------
function ProfileCard() {
  const completion = 78;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-2xl font-bold text-primary-foreground shadow-[var(--shadow-glow-sm)]">
          A
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold">Agnan Pratama</h2>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
              AI Verified
            </span>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />Universitas Indonesia</span>
            <span>•</span><span>Ilmu Komputer</span><span>•</span><span>Semester 6</span>
          </p>

          <div className="mt-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Skill</p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs">{s}</span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Minat Karier</p>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((s) => (
                <span key={s} className="rounded-full bg-gradient-to-r from-primary/25 to-primary/10 px-2.5 py-1 text-xs text-primary-glow">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Kelengkapan Profil</span>
              <span className="font-semibold text-primary-glow">{completion}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-background/60">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${completion}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_18px_var(--primary)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FitCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl">
      <h3 className="font-semibold">Skor Kecocokan AI</h3>
      <p className="text-xs text-muted-foreground">Rata-rata 30 lowongan teratas</p>
      <div className="relative -my-2 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={fitFields} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: "oklch(0.25 0.03 285)" }} dataKey="value" cornerRadius={20} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-gradient"><Counter to={87} suffix="%" /></p>
            <p className="text-xs text-muted-foreground">Match Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBar() {
  const filters = [
    { label: "Lokasi", options: ["Semua", "Jakarta", "Bandung", "Surabaya"] },
    { label: "Bidang", options: ["Semua", "Engineering", "Data", "Design", "Product"] },
    { label: "Sistem", options: ["Semua", "Remote", "Hybrid", "Onsite"] },
    { label: "Durasi", options: ["Semua", "3 Bulan", "6 Bulan", "12 Bulan"] },
  ];
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {filters.map((f) => (
          <div key={f.label}>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{f.label}</label>
            <select className="h-10 w-full rounded-lg border border-border/60 bg-background/60 px-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30">
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecCard({ company, role, location, mode, match }: { company: string; role: string; location: string; mode: string; match: number }) {
  const matchColor = match >= 90 ? "from-emerald-400/30 to-emerald-400/10 text-emerald-300 border-emerald-400/40" : match >= 85 ? "from-primary/30 to-primary/10 text-primary-glow border-primary/40" : "from-amber-400/25 to-amber-400/5 text-amber-300 border-amber-400/40";
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
            <p className="truncate text-sm text-muted-foreground">{company}</p>
            <p className="truncate font-semibold">{role}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full border bg-gradient-to-br px-2.5 py-1 text-xs font-bold ${matchColor}`}>
          {match}%
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />6 Bulan</span>
        <span className="rounded-full bg-background/60 px-2 py-0.5">{mode}</span>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">AI Match Score</span>
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary-glow transition group-hover:gap-2">
          Lihat detail <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

function InsightCard({ icon: Icon, title, value, desc }: { icon: typeof TrendingUp; title: string; value: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition hover:border-primary/50 hover:shadow-[var(--shadow-glow-sm)]"
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4 text-primary-glow" /> {title}
      </div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </motion.div>
  );
}
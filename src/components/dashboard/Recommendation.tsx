import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Target,
  Sliders,
  Sparkles,
  Loader2,
  Building2,
  MapPin,
  Trophy,
  Briefcase,
  Check,
} from "lucide-react";

// ---------- data ----------
const SKILLS = [
  "Frontend Development","Backend Development","Fullstack Development","Mobile Development",
  "UI/UX Design","Data Analyst","Data Science","Machine Learning","Artificial Intelligence",
  "Cyber Security","Cloud Computing","Networking","DevOps",
];

const CAREERS = [
  "Web Developer","Mobile Developer","UI/UX Designer","Data Analyst","Data Scientist",
  "AI Engineer","Backend Developer","Frontend Developer","DevOps Engineer","Cyber Security Engineer",
];

const LOCATIONS = ["Jakarta","Bandung","Semarang","Yogyakarta","Surabaya","Remote"];
const SYSTEMS = ["Remote","Hybrid","Onsite"];
const DURATIONS = ["1 Bulan","2 Bulan","3 Bulan","4 Bulan","6 Bulan"];

const CRITERIA = [
  { key: "fit", label: "Kesesuaian Bidang" },
  { key: "loc", label: "Lokasi" },
  { key: "rep", label: "Reputasi Perusahaan" },
  { key: "fac", label: "Fasilitas Magang" },
  { key: "ben", label: "Tunjangan" },
] as const;

type CritKey = (typeof CRITERIA)[number]["key"];

const COMPANIES = [
  { name: "Nebula Labs", role: "AI Engineer Intern", location: "Jakarta", system: "Hybrid", scores: { fit: 95, loc: 90, rep: 92, fac: 88, ben: 85 } },
  { name: "Quantum Byte", role: "Fullstack Developer Intern", location: "Bandung", system: "Remote", scores: { fit: 90, loc: 80, rep: 85, fac: 82, ben: 78 } },
  { name: "Pixelora Studio", role: "UI/UX Designer Intern", location: "Yogyakarta", system: "Onsite", scores: { fit: 80, loc: 75, rep: 78, fac: 90, ben: 72 } },
  { name: "DataNest", role: "Data Scientist Intern", location: "Jakarta", system: "Hybrid", scores: { fit: 88, loc: 88, rep: 90, fac: 80, ben: 80 } },
  { name: "Cyberlock", role: "Cyber Security Intern", location: "Surabaya", system: "Onsite", scores: { fit: 82, loc: 70, rep: 84, fac: 78, ben: 76 } },
  { name: "Cloudwave", role: "DevOps Intern", location: "Remote", system: "Remote", scores: { fit: 86, loc: 95, rep: 80, fac: 75, ben: 82 } },
];

// ---------- helpers ----------
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionCard({
  icon: Icon, step, title, desc, children,
}: {
  icon: React.ElementType; step: number; title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <FadeUp>
      <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-6 backdrop-blur-xl transition hover:border-primary/40 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
        <div className="relative flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-glow">Step {step}</span>
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        </div>
        <div className="relative mt-6">{children}</div>
      </div>
    </FadeUp>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-border/60 bg-background/40 px-4 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

// ---------- main page ----------
export function Recommendation() {
  const [academic, setAcademic] = useState({
    name: "", uni: "", prodi: "", semester: "", ipk: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [careers, setCareers] = useState<string[]>([]);
  const [prefs, setPrefs] = useState({ location: "", system: "", duration: "" });
  const [weights, setWeights] = useState<Record<CritKey, number>>({
    fit: 30, loc: 20, rep: 20, fac: 15, ben: 15,
  });
  const [loading, setLoading] = useState(false);
  type Ranked = (typeof COMPANIES)[number] & { score: number };
  const [results, setResults] = useState<Ranked[] | null>(null);

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const balanced = totalWeight === 100;

  function toggleArr(arr: string[], v: string, set: (a: string[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  function updateWeight(key: CritKey, value: number) {
    setWeights((w) => ({ ...w, [key]: value }));
  }

  function autoBalance() {
    const keys = Object.keys(weights) as CritKey[];
    const even = Math.floor(100 / keys.length);
    const rest = 100 - even * keys.length;
    const next = Object.fromEntries(keys.map((k, i) => [k, even + (i === 0 ? rest : 0)])) as Record<CritKey, number>;
    setWeights(next);
  }

  const ranked = useMemo(() => {
    // Simple SAW: normalize each criterion and weight-sum
    const maxes: Record<CritKey, number> = { fit: 0, loc: 0, rep: 0, fac: 0, ben: 0 };
    COMPANIES.forEach((c) => {
      (Object.keys(maxes) as CritKey[]).forEach((k) => {
        if (c.scores[k] > maxes[k]) maxes[k] = c.scores[k];
      });
    });
    return [...COMPANIES]
      .map((c) => {
        const score = (Object.keys(weights) as CritKey[]).reduce((sum, k) => {
          const norm = c.scores[k] / (maxes[k] || 1);
          return sum + norm * (weights[k] / 100);
        }, 0);
        return { ...c, score: Math.round(score * 100) };
      })
      .sort((a, b) => b.score - a.score);
  }, [weights]);

  function handleSubmit() {
    if (!balanced) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(ranked);
      setLoading(false);
      setTimeout(() => {
        document.getElementById("hasil-rekomendasi")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1400);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <FadeUp>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" /> AI Recommendation Engine • SAW / TOPSIS
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Temukan Magang yang Paling{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Cocok Untukmu</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Lengkapi profil dan preferensimu untuk mendapatkan rekomendasi magang terbaik.
          </p>
        </div>
      </FadeUp>

      {/* Section 1 */}
      <SectionCard icon={GraduationCap} step={1} title="Informasi Akademik" desc="Beri tahu kami tentang latar belakang akademikmu.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama Lengkap">
            <input className={inputCls} placeholder="Mis. Agnan Pratama" value={academic.name}
              onChange={(e) => setAcademic({ ...academic, name: e.target.value })} />
          </Field>
          <Field label="Universitas">
            <input className={inputCls} placeholder="Mis. Universitas Indonesia" value={academic.uni}
              onChange={(e) => setAcademic({ ...academic, uni: e.target.value })} />
          </Field>
          <Field label="Program Studi">
            <input className={inputCls} placeholder="Mis. Teknik Informatika" value={academic.prodi}
              onChange={(e) => setAcademic({ ...academic, prodi: e.target.value })} />
          </Field>
          <Field label="Semester">
            <select className={inputCls} value={academic.semester}
              onChange={(e) => setAcademic({ ...academic, semester: e.target.value })}>
              <option value="">Pilih semester</option>
              {Array.from({ length: 14 }, (_, i) => i + 1).map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </Field>
          <Field label="IPK">
            <input className={inputCls} placeholder="Mis. 3.75" inputMode="decimal" value={academic.ipk}
              onChange={(e) => setAcademic({ ...academic, ipk: e.target.value })} />
          </Field>
        </div>
      </SectionCard>

      {/* Section 2 */}
      <SectionCard icon={Cpu} step={2} title="Skill & Kompetensi" desc="Pilih semua skill yang kamu kuasai.">
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const active = skills.includes(s);
            return (
              <motion.button
                key={s}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggleArr(skills, s, setSkills)}
                className={`group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "border-primary/60 bg-gradient-to-r from-primary/30 to-primary-glow/20 text-foreground shadow-[var(--shadow-glow-sm)]"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {active && <Check className="h-3 w-3" />} {s}
              </motion.button>
            );
          })}
        </div>
      </SectionCard>

      {/* Section 3 */}
      <SectionCard icon={Target} step={3} title="Minat Karier" desc="Pilih satu atau beberapa bidang karier yang kamu tuju.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS.map((c) => {
            const active = careers.includes(c);
            return (
              <motion.button
                key={c}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleArr(careers, c, setCareers)}
                className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? "border-primary/60 bg-gradient-to-br from-primary/20 to-transparent shadow-[var(--shadow-glow-sm)]"
                    : "border-border/60 bg-card/40 hover:border-primary/40"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-lg ${
                    active ? "bg-primary/30 text-primary-glow" : "bg-card/60 text-muted-foreground"
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{c}</span>
                <span
                  className={`ml-auto grid h-5 w-5 place-items-center rounded-md border ${
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border/60"
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      </SectionCard>

      {/* Section 4 */}
      <SectionCard icon={MapPin} step={4} title="Preferensi Magang" desc="Tentukan lokasi, sistem kerja, dan durasi yang kamu inginkan.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Lokasi Magang">
            <select className={inputCls} value={prefs.location}
              onChange={(e) => setPrefs({ ...prefs, location: e.target.value })}>
              <option value="">Pilih lokasi</option>
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Sistem Kerja">
            <select className={inputCls} value={prefs.system}
              onChange={(e) => setPrefs({ ...prefs, system: e.target.value })}>
              <option value="">Pilih sistem</option>
              {SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Durasi Magang">
            <select className={inputCls} value={prefs.duration}
              onChange={(e) => setPrefs({ ...prefs, duration: e.target.value })}>
              <option value="">Pilih durasi</option>
              {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
        </div>
      </SectionCard>

      {/* Section 5 */}
      <SectionCard icon={Sliders} step={5} title="Prioritas Penilaian DSS" desc="Atur bobot tiap kriteria. Total harus 100%.">
        <div className="space-y-5">
          {CRITERIA.map((c) => (
            <div key={c.key}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{c.label}</span>
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary-glow">
                  {weights[c.key]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weights[c.key]}
                onChange={(e) => updateWeight(c.key, Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-card/60 accent-[var(--primary)]"
                style={{
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${weights[c.key]}%, color-mix(in oklab, var(--card) 80%, transparent) ${weights[c.key]}%, color-mix(in oklab, var(--card) 80%, transparent) 100%)`,
                }}
              />
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="text-sm">
              Total bobot:{" "}
              <span className={`font-bold ${balanced ? "text-primary-glow" : "text-destructive"}`}>
                {totalWeight}%
              </span>
              {!balanced && <span className="ml-2 text-xs text-muted-foreground">(harus 100%)</span>}
            </div>
            <button
              onClick={autoBalance}
              className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary-glow transition hover:bg-primary/20"
            >
              Seimbangkan Otomatis
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Submit */}
      <FadeUp>
        <div className="flex flex-col items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: balanced && !loading ? 1.03 : 1 }}
            whileTap={{ scale: balanced && !loading ? 0.97 : 1 }}
            disabled={!balanced || loading}
            onClick={handleSubmit}
            className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-glow px-10 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition disabled:opacity-50 disabled:shadow-none"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Menghitung ranking SAW/TOPSIS...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Dapatkan Rekomendasi
              </>
            )}
          </motion.button>
          {!balanced && (
            <p className="text-xs text-muted-foreground">
              Atur bobot agar total tepat 100% untuk melanjutkan.
            </p>
          )}
        </div>
      </FadeUp>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            id="hasil-rekomendasi"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-6"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary-glow" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ranking Rekomendasi Terbaik</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Berdasarkan metode SAW dengan bobot prioritas yang kamu atur.
            </p>
            <div className="grid gap-4">
              {results.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition hover:border-primary/50 ${
                    i === 0
                      ? "border-primary/50 bg-gradient-to-r from-primary/15 via-card/40 to-card/40 shadow-[var(--shadow-glow-sm)]"
                      : "border-border/60 bg-card/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-bold ${
                        i === 0
                          ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow-sm)]"
                          : "border border-border/60 bg-background/40 text-muted-foreground"
                      }`}
                    >
                      #{i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold tracking-tight">{r.name}</h3>
                        {i === 0 && (
                          <span className="rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
                            Best Match
                          </span>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">{r.role}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{r.system}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-primary-glow sm:text-3xl">{r.score}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">SAW Score</div>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-card/60">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_10px_var(--primary)]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
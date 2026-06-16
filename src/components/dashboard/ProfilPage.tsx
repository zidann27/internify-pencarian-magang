import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Pencil,
  Plus,
  Award,
  Briefcase,
  Sparkles,
  X,
  CheckCircle2,
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

export function ProfilPage() {
  const [skills, setSkills] = useState(["Python", "React", "TypeScript", "SQL", "TensorFlow", "Figma"]);
  const [interests] = useState(["AI/ML", "Backend", "Data Science", "Product"]);
  const [newSkill, setNewSkill] = useState("");
  const completion = 78;

  const experiences = [
    { role: "Research Assistant", org: "Lab AI UI", period: "2024 — Sekarang", desc: "Riset model NLP untuk Bahasa Indonesia." },
    { role: "Frontend Volunteer", org: "Google DSC UI", period: "2023 — 2024", desc: "Membangun web event dengan React & Tailwind." },
  ];
  const education = [
    { school: "Universitas Indonesia", program: "S1 Ilmu Komputer", period: "2022 — 2026", gpa: "IPK 3.82 / 4.00" },
  ];
  const certs = [
    { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2024" },
    { name: "TensorFlow Developer", issuer: "Google", year: "2024" },
    { name: "Meta Frontend Specialization", issuer: "Coursera", year: "2023" },
  ];

  const addSkill = () => {
    const v = newSkill.trim();
    if (!v) return;
    if (!skills.includes(v)) setSkills([...skills, v]);
    setNewSkill("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Cover + header */}
      <FadeUp>
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl">
          <div className="h-36 bg-[radial-gradient(circle_at_20%_20%,var(--primary)_0%,transparent_45%),radial-gradient(circle_at_80%_30%,oklch(0.7_0.22_295)_0%,transparent_50%)] opacity-60" />
          <div className="absolute inset-x-0 top-20 px-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="grid h-28 w-28 place-items-center rounded-2xl border-4 border-background bg-gradient-to-br from-primary to-primary-glow text-4xl font-bold text-primary-foreground shadow-[var(--shadow-glow-sm)]">
                  A
                </div>
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Agnan Pratama</h1>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
                      AI Verified
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aspiring ML Engineer · Mahasiswa Ilmu Komputer
                  </p>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)]">
                <Pencil className="h-4 w-4" /> Edit Profil
              </button>
            </div>
          </div>
          <div className="h-36" />
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-1">
          <FadeUp>
            <Section title="Kontak" icon={Mail}>
              <ul className="space-y-3 text-sm">
                <Info icon={Mail} text="agnan.pratama@ui.ac.id" />
                <Info icon={Phone} text="+62 812-3456-7890" />
                <Info icon={MapPin} text="Depok, Indonesia" />
                <Info icon={Linkedin} text="linkedin.com/in/agnanp" />
                <Info icon={Github} text="github.com/agnanp" />
              </ul>
            </Section>
          </FadeUp>

          <FadeUp delay={0.05}>
            <Section title="Kelengkapan Profil" icon={CheckCircle2}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progres</span>
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
              <p className="mt-3 text-xs text-muted-foreground">
                Tambahkan portofolio & pengalaman organisasi untuk mencapai 100%.
              </p>
            </Section>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Section title="Minat Karier" icon={Sparkles}>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((s) => (
                  <span key={s} className="rounded-full bg-gradient-to-r from-primary/25 to-primary/10 px-2.5 py-1 text-xs text-primary-glow">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          </FadeUp>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          <FadeUp>
            <Section title="Tentang Saya" icon={Pencil}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Mahasiswa tahun ke-3 Ilmu Komputer dengan minat di machine learning dan
                backend engineering. Aktif membangun proyek open source dan riset di
                Lab AI UI. Mencari kesempatan magang untuk berkontribusi di tim produk
                berskala besar.
              </p>
            </Section>
          </FadeUp>

          <FadeUp delay={0.05}>
            <Section title="Skill" icon={Award}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs">
                    {s}
                    <button
                      onClick={() => setSkills(skills.filter((x) => x !== s))}
                      className="opacity-50 transition hover:text-destructive hover:opacity-100"
                      aria-label={`Hapus ${s}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Tambah skill baru..."
                  className="h-10 flex-1 rounded-lg border border-border/60 bg-background/60 px-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={addSkill}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)]"
                >
                  <Plus className="h-3.5 w-3.5" /> Tambah
                </button>
              </div>
            </Section>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Section title="Pengalaman" icon={Briefcase}>
              <ol className="relative space-y-5 border-l border-border/60 pl-5">
                {experiences.map((e) => (
                  <li key={e.role} className="relative">
                    <span className="absolute -left-[26px] top-1 grid h-3 w-3 place-items-center rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                    <p className="font-semibold">{e.role}</p>
                    <p className="text-xs text-muted-foreground">{e.org} · {e.period}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                  </li>
                ))}
              </ol>
            </Section>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Section title="Pendidikan" icon={GraduationCap}>
              {education.map((ed) => (
                <div key={ed.school} className="flex flex-col gap-1">
                  <p className="font-semibold">{ed.school}</p>
                  <p className="text-sm text-muted-foreground">{ed.program} · {ed.period}</p>
                  <p className="text-xs text-primary-glow">{ed.gpa}</p>
                </div>
              ))}
            </Section>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Section title="Sertifikasi" icon={Award}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {certs.map((c) => (
                  <div key={c.name} className="rounded-xl border border-border/60 bg-background/40 p-3">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.issuer} · {c.year}</p>
                  </div>
                ))}
              </div>
            </Section>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Mail; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary-glow" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Info({ icon: Icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-muted-foreground">
      <Icon className="h-4 w-4 text-primary-glow" />
      <span className="truncate">{text}</span>
    </li>
  );
}
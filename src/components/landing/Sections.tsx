import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Zap,
  Target,
  Brain,
  Search,
  TrendingUp,
  Compass,
  UserCircle2,
  Clock,
  CheckCircle2,
  Heart,
  Award,
  ChevronDown,
  UserPlus,
  ListChecks,
  Cpu,
  Lightbulb,
  Send,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-primary-glow">
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

/* === About === */
export function About() {
  const items = [
    { icon: Target, title: "Rekomendasi Personal", desc: "Magang yang sesuai dengan profil unikmu, bukan daftar generik." },
    { icon: Zap, title: "Proses Cepat", desc: "AI memproses ribuan lowongan dalam hitungan detik." },
    { icon: Compass, title: "Peluang Lebih Relevan", desc: "Cocokkan minat dan tujuan karier dengan tepat sasaran." },
  ];
  return (
    <section id="tentang" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Tentang"
          title="Mengapa Internify?"
          desc="Internify membantu mahasiswa menemukan peluang magang yang lebih relevan melalui teknologi rekomendasi cerdas yang menganalisis profil, keterampilan, dan minat pengguna."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl glass p-6 transition-all hover:shadow-[var(--shadow-glow-sm)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]">
                <it.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Features === */
export function Features() {
  const features = [
    { icon: Brain, title: "AI Recommendation Engine", desc: "Rekomendasi magang sesuai profil pengguna." },
    { icon: Target, title: "Skill Matching", desc: "Mencocokkan kemampuan dengan kebutuhan perusahaan." },
    { icon: Compass, title: "Internship Discovery", desc: "Menemukan peluang magang terbaru." },
    { icon: TrendingUp, title: "Career Insight", desc: "Informasi tren dan kebutuhan industri." },
    { icon: Search, title: "Smart Search", desc: "Pencarian dengan filter cerdas." },
    { icon: UserCircle2, title: "Profile Analysis", desc: "Analisis keterampilan dan minat pengguna." },
  ];
  return (
    <section id="fitur" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Fitur" title="Semua yang Kamu Butuhkan" desc="Teknologi AI yang dirancang untuk perjalanan magang modern." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:shadow-[var(--shadow-glow)]"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/40"
              />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                  <f.icon className="h-5 w-5 text-primary-glow" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === How It Works === */
export function HowItWorks() {
  const steps = [
    { icon: UserPlus, title: "Buat Profil" },
    { icon: ListChecks, title: "Isi Keterampilan & Minat" },
    { icon: Cpu, title: "AI Menganalisis Data" },
    { icon: Lightbulb, title: "Sistem Memberi Rekomendasi" },
    { icon: Send, title: "Lamar Magang yang Sesuai" },
  ];
  return (
    <section id="cara-kerja" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Cara Kerja" title="Lima Langkah Sederhana" desc="Dari profil hingga lamaran—dipandu oleh kecerdasan buatan." />
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-transparent via-primary to-transparent md:block"
          />
          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]"
                >
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                  <span className="absolute -bottom-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-background text-xs font-bold text-primary-glow ring-1 ring-primary/40">
                    {i + 1}
                  </span>
                </motion.div>
                <p className="mt-5 text-sm font-medium">{s.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Stats === */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString("id-ID") + suffix);
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, mv, rounded]);

  return <span ref={ref}>{display}</span>;
}

export function Stats() {
  const stats = [
    { value: 25000, suffix: "+", label: "Mahasiswa Terdaftar" },
    { value: 12000, suffix: "+", label: "Peluang Magang" },
    { value: 97, suffix: "%", label: "Tingkat Kecocokan AI" },
    { value: 850, suffix: "+", label: "Perusahaan Mitra" },
  ];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl glass p-10 shadow-[var(--shadow-glow-sm)]">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <p className="text-4xl font-bold text-gradient md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Benefits === */
export function Benefits() {
  const benefits = [
    { icon: Clock, title: "Hemat Waktu Pencarian", desc: "Tidak perlu scroll ribuan lowongan." },
    { icon: CheckCircle2, title: "Rekomendasi Lebih Akurat", desc: "Didukung model AI mutakhir." },
    { icon: Heart, title: "Sesuai Minat dan Skill", desc: "Berfokus pada potensi terbaikmu." },
    { icon: Award, title: "Meningkatkan Peluang Diterima", desc: "Cocokkan diri dengan kebutuhan nyata." },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Benefit" title="Keuntungan untuk Mahasiswa" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl glass p-6 text-center transition-all hover:shadow-[var(--shadow-glow-sm)]"
            >
              <motion.div whileHover={{ rotate: 6 }} className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]">
                <b.icon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Testimonials === */
const testimonials = [
  { name: "Andini Pratiwi", uni: "Universitas Indonesia", text: "Internify membantu saya menemukan magang Data Science yang benar-benar sesuai. Prosesnya sangat cepat!", initials: "AP" },
  { name: "Rizky Maulana", uni: "ITB", text: "Rekomendasi AI-nya akurat banget. Saya diterima di startup impian setelah satu minggu.", initials: "RM" },
  { name: "Salsa Nabila", uni: "Universitas Gadjah Mada", text: "Akhirnya ada platform yang ngerti minat dan skill saya tanpa harus filter manual.", initials: "SN" },
  { name: "Dimas Wirawan", uni: "Telkom University", text: "UI-nya keren, tapi yang penting hasilnya. Magang pertama saya datang dari sini.", initials: "DW" },
  { name: "Aulia Rahma", uni: "Universitas Brawijaya", text: "Skill matching-nya benar-benar membantu mempersiapkan diri sebelum melamar.", initials: "AR" },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Testimoni" title="Dipercaya Ribuan Mahasiswa" />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[340px] shrink-0 rounded-2xl glass p-6">
              <p className="text-sm text-muted-foreground">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-sm font-bold text-primary-foreground">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.uni}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* === FAQ === */
const faqs = [
  { q: "Apa itu Internify?", a: "Internify adalah platform rekomendasi magang berbasis AI yang membantu mahasiswa menemukan peluang magang yang relevan." },
  { q: "Bagaimana AI memberikan rekomendasi magang?", a: "Sistem menganalisis profil, keterampilan, pengalaman, dan minat untuk mencocokkan dengan lowongan yang paling sesuai." },
  { q: "Apakah platform ini gratis?", a: "Ya, fitur dasar Internify gratis digunakan oleh seluruh mahasiswa." },
  { q: "Apakah data pengguna aman?", a: "Data dilindungi dengan enkripsi standar industri dan tidak dibagikan tanpa izin." },
  { q: "Apakah rekomendasi dapat diperbarui?", a: "Rekomendasi diperbarui secara otomatis setiap kali profil atau lowongan baru tersedia." },
  { q: "Siapa saja yang dapat menggunakan platform ini?", a: "Seluruh mahasiswa aktif di Indonesia yang sedang mencari peluang magang." },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} className="rounded-2xl glass">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-primary-glow" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* === CTA === */
export function CTA() {
  return (
    <section id="cta" className="relative px-6 py-24">
      <motion.div
        {...fadeUp}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-12 text-center md:p-16"
        style={{ background: "var(--gradient-cta)" }}
      >
        <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-glow/40 blur-3xl"
        />
        <Particles count={20} />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
            Mulai Temukan Magang yang Sesuai dengan Potensimu
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Dapatkan rekomendasi magang yang lebih cerdas dan relevan dengan bantuan teknologi AI.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-[var(--shadow-glow)]"
          >
            Mulai Sekarang
            <Sparkles className="h-4 w-4 text-primary-glow" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* === Footer === */
export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            Internify
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Platform rekomendasi magang berbasis AI untuk mahasiswa Indonesia.</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#tentang" className="hover:text-foreground">Tentang</a></li>
            <li><a href="#fitur" className="hover:text-foreground">Fitur</a></li>
            <li><a href="#cara-kerja" className="hover:text-foreground">Cara Kerja</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Kontak</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hello@internify.id</li>
            <li>+62 812 3456 7890</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Sosial Media</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Instagram</a></li>
            <li><a href="#" className="hover:text-foreground">LinkedIn</a></li>
            <li><a href="#" className="hover:text-foreground">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border/50 px-6 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Internify. All rights reserved.
      </div>
    </footer>
  );
}
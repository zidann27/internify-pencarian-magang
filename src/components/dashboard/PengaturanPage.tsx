import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Sparkles,
  Trash2,
  LogOut,
  Check,
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

const TABS = [
  { id: "akun", label: "Akun", icon: User },
  { id: "notifikasi", label: "Notifikasi", icon: Bell },
  { id: "ai", label: "Preferensi AI", icon: Sparkles },
  { id: "tampilan", label: "Tampilan", icon: Palette },
  { id: "privasi", label: "Privasi & Keamanan", icon: Shield },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PengaturanPage() {
  const [tab, setTab] = useState<TabId>("akun");
  const [notif, setNotif] = useState({ email: true, push: true, weekly: false, recommend: true });
  const [accent, setAccent] = useState("Purple");
  const [language, setLanguage] = useState("Indonesia");

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <FadeUp>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">Pengaturan</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Atur akun, notifikasi, dan preferensi AI agar pengalamanmu lebih personal.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Tabs */}
        <FadeUp className="lg:col-span-1">
          <nav className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-border/60 bg-card/40 p-2 backdrop-blur-xl lg:flex-col">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-primary/20 to-primary/5 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                      : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary to-primary-glow shadow-[0_0_12px_var(--primary)] lg:block" />
                  )}
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </nav>
        </FadeUp>

        {/* Content */}
        <div className="space-y-6 lg:col-span-3">
          {tab === "akun" && (
            <FadeUp>
              <Panel title="Informasi Akun" desc="Detail dasar yang ditampilkan pada profilmu.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nama Lengkap" defaultValue="Agnan Pratama" />
                  <Field label="Username" defaultValue="agnanp" />
                  <Field label="Email" defaultValue="agnan.pratama@ui.ac.id" type="email" />
                  <Field label="No. Telepon" defaultValue="+62 812-3456-7890" />
                  <Field label="Universitas" defaultValue="Universitas Indonesia" />
                  <Field label="Program Studi" defaultValue="Ilmu Komputer" />
                </div>
                <SaveBar />
              </Panel>
            </FadeUp>
          )}

          {tab === "notifikasi" && (
            <FadeUp>
              <Panel title="Notifikasi" desc="Pilih bagaimana kami menghubungimu.">
                <div className="divide-y divide-border/60">
                  <Toggle label="Email notifikasi" desc="Update lamaran & lowongan baru." value={notif.email} onChange={(v) => setNotif({ ...notif, email: v })} />
                  <Toggle label="Push notifikasi" desc="Pemberitahuan real-time di perangkat." value={notif.push} onChange={(v) => setNotif({ ...notif, push: v })} />
                  <Toggle label="Ringkasan mingguan" desc="Insight aktivitas & rekomendasi minggu ini." value={notif.weekly} onChange={(v) => setNotif({ ...notif, weekly: v })} />
                  <Toggle label="Rekomendasi AI baru" desc="Notifikasi saat AI menemukan match >90%." value={notif.recommend} onChange={(v) => setNotif({ ...notif, recommend: v })} />
                </div>
              </Panel>
            </FadeUp>
          )}

          {tab === "ai" && (
            <FadeUp>
              <Panel title="Preferensi AI" desc="Atur cara AI memberi rekomendasi.">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Tingkat Personalisasi</label>
                    <select className="h-10 w-full rounded-lg border border-border/60 bg-background/60 px-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30">
                      <option>Standar</option>
                      <option>Agresif (lebih banyak rekomendasi)</option>
                      <option>Konservatif (kecocokan tinggi saja)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Metode DSS Default</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["SAW", "TOPSIS"].map((m, i) => (
                        <button key={m} className={`rounded-xl border p-4 text-left transition ${i === 0 ? "border-primary/60 bg-primary/10 shadow-[var(--shadow-glow-sm)]" : "border-border/60 bg-background/40 hover:border-primary/40"}`}>
                          <p className="font-semibold">{m}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {i === 0 ? "Simple Additive Weighting" : "Technique for Order Preference"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Toggle label="Izinkan AI menggunakan histori aktivitas" desc="Meningkatkan akurasi rekomendasi hingga 30%." value={true} onChange={() => {}} />
                </div>
              </Panel>
            </FadeUp>
          )}

          {tab === "tampilan" && (
            <FadeUp>
              <Panel title="Tampilan" desc="Sesuaikan tema dan bahasa.">
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Tema</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: "Dark", grad: "from-[#0f0f0f] to-[#1a1a2e]", active: true },
                        { name: "Midnight", grad: "from-[#0a0a1a] to-[#1a0a2e]" },
                        { name: "Aurora", grad: "from-[#1a0a2e] to-[#0f3460]" },
                      ].map((t) => (
                        <button key={t.name} className={`rounded-xl border p-3 text-left transition ${t.active ? "border-primary/60 shadow-[var(--shadow-glow-sm)]" : "border-border/60 hover:border-primary/40"}`}>
                          <div className={`mb-2 h-16 w-full rounded-lg bg-gradient-to-br ${t.grad}`} />
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">{t.name}</p>
                            {t.active && <Check className="h-3.5 w-3.5 text-primary-glow" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Warna Aksen</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Purple", color: "oklch(0.58 0.24 295)" },
                        { name: "Violet", color: "oklch(0.58 0.24 270)" },
                        { name: "Pink", color: "oklch(0.65 0.24 350)" },
                        { name: "Cyan", color: "oklch(0.7 0.18 220)" },
                      ].map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setAccent(c.name)}
                          className={`grid h-9 w-9 place-items-center rounded-full border-2 transition ${accent === c.name ? "border-foreground" : "border-transparent"}`}
                          style={{ background: c.color }}
                          aria-label={c.name}
                        >
                          {accent === c.name && <Check className="h-4 w-4 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      <Globe className="h-3.5 w-3.5" /> Bahasa
                    </label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-10 w-full rounded-lg border border-border/60 bg-background/60 px-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30">
                      <option>Indonesia</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>
              </Panel>
            </FadeUp>
          )}

          {tab === "privasi" && (
            <FadeUp>
              <Panel title="Privasi & Keamanan" desc="Kendalikan data dan akses akunmu.">
                <div className="space-y-4">
                  <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                    <p className="font-semibold">Ubah Password</p>
                    <p className="mt-1 text-xs text-muted-foreground">Gunakan kombinasi huruf, angka, dan simbol.</p>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Password Lama" type="password" defaultValue="" />
                      <Field label="Password Baru" type="password" defaultValue="" />
                    </div>
                    <button className="mt-4 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)]">
                      Perbarui Password
                    </button>
                  </div>
                  <Toggle label="Verifikasi 2 langkah (2FA)" desc="Lapisan keamanan tambahan saat login." value={false} onChange={() => {}} />
                  <Toggle label="Profil publik" desc="Izinkan perekrut menemukan profilmu." value={true} onChange={() => {}} />

                  <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                    <p className="font-semibold text-destructive">Zona Berbahaya</p>
                    <p className="mt-1 text-xs text-muted-foreground">Tindakan berikut tidak dapat diurungkan.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs font-semibold transition hover:border-primary/60">
                        <LogOut className="h-3.5 w-3.5" /> Logout semua sesi
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/20">
                        <Trash2 className="h-3.5 w-3.5" /> Hapus Akun
                      </button>
                    </div>
                  </div>
                </div>
              </Panel>
            </FadeUp>
          )}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-10 w-full rounded-lg border border-border/60 bg-background/60 px-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
          value
            ? "border-primary/60 bg-gradient-to-r from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]"
            : "border-border/60 bg-background/60"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow ${value ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

function SaveBar() {
  return (
    <div className="mt-6 flex items-center justify-end gap-2 border-t border-border/60 pt-4">
      <button className="rounded-lg border border-border/60 bg-background/40 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
        Batal
      </button>
      <button className="rounded-lg bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-sm)]">
        Simpan Perubahan
      </button>
    </div>
  );
}
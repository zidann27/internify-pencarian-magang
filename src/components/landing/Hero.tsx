import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, Brain, TrendingUp, Briefcase } from "lucide-react";
import { Particles } from "./Particles";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
      <Particles count={40} />

      {/* Glow orb */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            Powered by AI · Recommendation Engine 2026
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Temukan Magang yang{" "}
            <span className="text-gradient">Tepat untuk Masa Depanmu</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
            Platform rekomendasi magang berbasis AI yang membantu mahasiswa menemukan
            peluang magang sesuai keterampilan, minat, pengalaman, dan tujuan karier.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <motion.a
              href="#fitur"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              Cari Magang Sekarang
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#cara-kerja"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold"
            >
              <PlayCircle className="h-4 w-4 text-primary-glow" />
              Pelajari Cara Kerja
            </motion.a>
          </div>
        </motion.div>

        {/* Floating Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl glass p-5 shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary-glow/70" />
              </div>
              <span className="text-xs text-muted-foreground">AI Dashboard</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                    <Brain className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Match Score</p>
                    <p className="text-xs text-muted-foreground">Profil dianalisis</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary-glow">97%</span>
              </div>

              {[
                { c: "Tokopedia", r: "Data Science Intern", m: 94, icon: TrendingUp },
                { c: "Gojek", r: "Product Design Intern", m: 89, icon: Briefcase },
                { c: "Bukalapak", r: "Software Engineer Intern", m: 86, icon: Briefcase },
              ].map((job, i) => (
                <motion.div
                  key={job.c}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="flex items-center justify-between rounded-xl border border-border/40 bg-card/40 p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15">
                      <job.icon className="h-4 w-4 text-primary-glow" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{job.r}</p>
                      <p className="truncate text-xs text-muted-foreground">{job.c}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary-glow">
                    {job.m}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating mini cards */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 -top-6 hidden rounded-2xl glass p-3 text-xs shadow-[var(--shadow-glow-sm)] md:block"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary-glow" />
              <span className="font-medium">+128 magang baru</span>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -right-4 hidden rounded-2xl glass p-3 text-xs shadow-[var(--shadow-glow-sm)] md:block"
          >
            <p className="font-medium">Skill match: React, Python</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const links = [
  { label: "Tentang", href: "#tentang" },
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3"
    >
      <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow-sm)]">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </span>
        <span>Internify</span>
      </a>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow-sm)] transition-transform hover:scale-105"
      >
        Mulai
      </a>
    </motion.header>
  );
}
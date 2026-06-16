import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PengaturanPage } from "@/components/dashboard/PengaturanPage";

export const Route = createFileRoute("/pengaturan")({
  head: () => ({
    meta: [
      { title: "Pengaturan — Internify" },
      { name: "description", content: "Atur akun, notifikasi, dan preferensi AI Internify." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <PengaturanPage />
    </DashboardLayout>
  ),
});
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfilPage } from "@/components/dashboard/ProfilPage";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil Saya — Internify" },
      { name: "description", content: "Kelola profil, skill, dan pengalamanmu di Internify." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <ProfilPage />
    </DashboardLayout>
  ),
});
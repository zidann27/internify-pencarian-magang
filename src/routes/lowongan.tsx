import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LowonganPage } from "@/components/dashboard/Lowongan";

export const Route = createFileRoute("/lowongan")({
  head: () => ({
    meta: [
      { title: "Lowongan Magang — Internify" },
      { name: "description", content: "Jelajahi lowongan magang terbaru dari perusahaan teknologi terbaik." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <LowonganPage />
    </DashboardLayout>
  ),
});
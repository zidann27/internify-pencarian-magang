import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Recommendation } from "@/components/dashboard/Recommendation";

export const Route = createFileRoute("/rekomendasi")({
  head: () => ({
    meta: [
      { title: "Rekomendasi Magang — Internify" },
      {
        name: "description",
        content:
          "Isi profil, skill, dan preferensi untuk mendapatkan rekomendasi magang terbaik berbasis DSS (SAW/TOPSIS).",
      },
    ],
  }),
  component: RekomendasiPage,
});

function RekomendasiPage() {
  return (
    <DashboardLayout>
      <Recommendation />
    </DashboardLayout>
  );
}
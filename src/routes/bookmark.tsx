import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BookmarkPage } from "@/components/dashboard/BookmarkPage";

export const Route = createFileRoute("/bookmark")({
  head: () => ({
    meta: [
      { title: "Bookmark — Internify" },
      { name: "description", content: "Magang yang kamu simpan untuk dilamar nanti." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <BookmarkPage />
    </DashboardLayout>
  ),
});
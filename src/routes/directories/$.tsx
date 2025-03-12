import { DirectoriesPage } from "@pages/directories";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/directories/$")({
  component: () => <DirectoriesPage />,
});

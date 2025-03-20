import { DirectoriesPage } from "@pages/directories";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/directories/$slug")({
  component: () => <DirectoriesPage />,
});

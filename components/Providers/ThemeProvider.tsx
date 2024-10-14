import { MantineProvider } from "@mantine/core";

import { theme } from "../../theme";

interface ThemeManagerProperties {
  children: React.ReactNode;
}

export function ThemeManager({
  children,
}: ThemeManagerProperties): React.ReactNode {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

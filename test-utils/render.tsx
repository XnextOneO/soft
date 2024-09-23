import { MantineProvider } from "@mantine/core";
import { render as testingLibraryRender } from "@testing-library/react";

import { theme } from "../theme";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>{children}</MantineProvider>
    ),
  });
}

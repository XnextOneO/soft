import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { theme } from "@/theme";

import "@mantine/notifications/styles.css";

interface ThemeManagerProperties {
    children: React.ReactNode;
}

export function ThemeManager({ children }: ThemeManagerProperties): React.ReactNode {
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            {children}
        </MantineProvider>
    );
}

// providers.tsx
"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppContextProvider } from "@/components/Providers/AppContextProvider";
import { ThemeManager } from "@/components/Providers/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
    const [isClient, setIsClient] = useState(false);
    const [queryClient] = useState(() => new QueryClient());
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient ? (
                <QueryClientProvider client={queryClient}>
                    <ThemeManager>
                        <AppContextProvider>{children}</AppContextProvider>
                    </ThemeManager>
                </QueryClientProvider>
            ) : (
                ""
            )}
        </>
    );
}

export default Providers;

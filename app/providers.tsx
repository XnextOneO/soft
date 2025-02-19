// providers.tsx
"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppContextProvider } from "@/components/Providers/AppContextProvider";
import { AuthManager } from "@/components/Providers/AuthProvider";
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
                        <AuthManager>
                            <AppContextProvider>{children}</AppContextProvider>
                        </AuthManager>
                    </ThemeManager>
                </QueryClientProvider>
            ) : (
                ""
            )}
        </>
    );
}

export default Providers;

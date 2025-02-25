import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useRefresh } from "@/app/api/mutation/auth";
import { useAuthStore } from "@/store/authStore";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken, refreshToken, clearTokens, setTokens, expires_in } = useAuthStore();
    const router = useRouter();
    const { mutate: refreshMutate } = useRefresh();

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (!accessToken) {
                router.push("/login");
                return;
            }

            const currentTime = Date.now();
            const tokenExpirationTime = currentTime + expires_in * 1000;
            const refreshTime = tokenExpirationTime - 60_000;

            const timeoutId = setTimeout(() => {
                if (refreshToken) {
                    refreshMutate(
                        { token: refreshToken },
                        {
                            onSuccess: (data) => {
                                setTokens(
                                    data.access_token,
                                    data.refresh_token,
                                    data.expires_in,
                                    data.refresh_expires_in,
                                );
                            },
                            onError: () => {
                                clearTokens();
                                router.push("/login");
                            },
                        },
                    );
                } else {
                    clearTokens();
                    router.push("/login");
                }
            }, refreshTime - currentTime);

            return () => clearTimeout(timeoutId);
        };

        checkTokenExpiration();
    }, [accessToken, refreshToken, clearTokens, refreshMutate, expires_in]);

    return <>{children}</>;
};

export default AuthProvider;

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useRefresh } from "@/app/api/mutation/auth";
import { useAuthStore } from "@/store/authStore";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // eslint-disable-next-line camelcase
    const { accessToken, refreshToken, clearTokens, setTokens, expires_in } = useAuthStore();
    const router = useRouter();
    const { mutate: refreshMutate } = useRefresh();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const checkTokenExpiration = () => {
            if (!accessToken) {
                router.push("/login");
                return;
            }

            // eslint-disable-next-line camelcase
            const tokenExpirationTime = expires_in;
            const currentTime = Date.now();

            if (currentTime >= tokenExpirationTime) {
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
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 10_000);

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => clearInterval(intervalId);
    }, [accessToken, refreshToken, clearTokens, refreshMutate]);

    return <>{children}</>;
};

export default AuthProvider;

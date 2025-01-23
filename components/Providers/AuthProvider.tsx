import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { check, userInfo } from "@/app/api/auth/authAPI";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";
import { userStore } from "@/store/userStore";

import { MainLoader } from "../MainLoader/MainLoader";

interface AuthManagerProperties {
    children: React.ReactNode;
}

export function AuthManager({ children }: AuthManagerProperties): React.ReactNode {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { setName, setIsEdit, setCanDelete } = userStore();
    useAuthInterceptor();

    useEffect(() => {
        const authenticate = async (): Promise<void> => {
            try {
                const result = await check();
                if (result) {
                    setIsAuthenticated(true);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const usr: any = await userInfo();
                    setIsEdit(usr.email_verified);
                    setCanDelete(usr.email_verified);
                    setName(usr.name);
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        authenticate().catch((error) => console.error(error));
    }, [router, setIsEdit, setCanDelete, isLoading, setName]);

    if (isLoading || (!isAuthenticated && pathname !== "/login")) {
        return <MainLoader />;
    }

    return children;
}

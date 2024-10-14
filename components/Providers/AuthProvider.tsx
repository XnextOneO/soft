import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "@mantine/core";

import { check } from "../../app/api/auth/authAPI";

interface AuthManagerProperties {
  children: React.ReactNode;
}

export function AuthManager({
  children,
}: AuthManagerProperties): React.ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    check()
      .then((result: unknown) => {
        if (result) {
          setIsAuthenticated(true);
        } else {
          router.push("/login");
        }
        setIsLoading(false);
        return result;
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }, [router]);

  if (isLoading || (!isAuthenticated && pathname !== "/login")) {
    return <Loader color="green" />;
  }

  return children;
}

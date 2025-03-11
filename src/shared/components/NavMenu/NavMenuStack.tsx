import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Stack, UnstyledButton } from "@mantine/core";
import DropdownMenu from "@shared/components/DropdownMenu/DropdownMenu.tsx";
import { useAuthStore } from "@shared/store/authStore.ts";
import { Link, useRouter } from "@tanstack/react-router";

import IconAccountManagement from "../../../../public/assets/account-management.svg";
import IconAnalytics from "../../../../public/assets/analytics.svg";
import IconConfigurationTables from "../../../../public/assets/configuration-tables.svg";
import IconDirectories from "../../../../public/assets/directories.svg";
import IconHelp from "../../../../public/assets/help.svg";
import IconInvestigationOfPayments from "../../../../public/assets/investigation-of-payments.svg";
import IconJournal from "../../../../public/assets/journal.svg";
import IconLogout from "../../../../public/assets/logout.svg";
import IconManagingReviewRequests from "../../../../public/assets/managing-review-requests.svg";
import IconPaymentManagement from "../../../../public/assets/payment-management.svg";
import IconReportsStats from "../../../../public/assets/reports-stats.svg";
import IconUntilFindingOut from "../../../../public/assets/until-finding-out.svg";

import NavMenuButtonStack from "./NavMenuButtonStack";

interface INavMenuStackProperties {
  colorScheme: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  opened: boolean;
  marginLeft: number;
}

const NavMenuStack: React.FC<INavMenuStackProperties> = ({
  colorScheme,
  active,
  setActive,
  width,
  opened,
  marginLeft,
}) => {
  const router = useRouter();
  const { clearTokens } = useAuthStore();
  const { t } = useTranslation(["nav-menu-stack"]);

  const handleLogout = (): void => {
    clearTokens();
    router.navigate({ to: "/login", replace: true });
  };

  const menuItems = [
    { icon: IconPaymentManagement, key: "payment-management", href: "/" },
    { icon: IconAccountManagement, key: "account-management", href: "/" },
    { icon: IconUntilFindingOut, key: "until-finding-out", href: "/" },
    { icon: IconConfigurationTables, key: "configuration-tables", href: "/" },
    { icon: IconReportsStats, key: "reports-stats", href: "/" },
    {
      icon: IconManagingReviewRequests,
      key: "managing-review-requests",
      href: "/",
    },
    {
      icon: IconInvestigationOfPayments,
      key: "investigation-of-payments",
      href: "/",
    },
    { icon: IconAnalytics, key: "analytics", href: "/" },
    { icon: IconJournal, key: "journal", href: "/" },
  ];

  return (
    <Stack
      justify="space-between"
      w={width}
      gap={0}
      style={{
        borderRight: `1px solid ${colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
      }}
      h="100%"
    >
      <Stack gap={0}>
        {menuItems.map(({ icon, key, href }) => (
          <Link
            key={key}
            to={href}
            style={{ color: colorScheme === "dark" ? "#c9c9c9" : "black" }}
          >
            <NavMenuButtonStack
              colorScheme={colorScheme}
              width={width}
              marginLeft={marginLeft}
              icon={icon}
            >
              {opened ? t(key) : ""}
            </NavMenuButtonStack>
          </Link>
        ))}
        <DropdownMenu onOpen={setActive}>
          <UnstyledButton
            onClick={() => {
              setActive(!active);
            }}
          >
            <NavMenuButtonStack
              colorScheme={colorScheme}
              active={active}
              width={width}
              marginLeft={marginLeft}
              icon={IconDirectories}
            >
              {opened ? t("directories") : ""}
            </NavMenuButtonStack>
          </UnstyledButton>
        </DropdownMenu>
        <NavMenuButtonStack
          colorScheme={colorScheme}
          width={width}
          marginLeft={marginLeft}
          icon={IconHelp}
        >
          {opened ? t("help") : ""}
        </NavMenuButtonStack>
      </Stack>
      <UnstyledButton onClick={handleLogout}>
        <Flex justify="center">
          <NavMenuButtonStack
            colorScheme={colorScheme}
            width={width}
            marginLeft={marginLeft}
            icon={IconLogout}
          >
            {opened ? t("logout") : ""}
          </NavMenuButtonStack>
        </Flex>
      </UnstyledButton>
    </Stack>
  );
};

export default NavMenuStack;

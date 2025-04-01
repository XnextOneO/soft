import React, { FC, SVGProps, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Flex,
  ScrollArea,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import IconReferenceBooks from "@public/assets/reference-books.svg?react";
import DropdownMenu from "@shared/components/DropdownMenu/DropdownMenu.tsx";
import { useAuthStore } from "@shared/store/authStore.ts";
import { useRouter } from "@tanstack/react-router";

import IconAccountManagement from "../../../../public/assets/account-management.svg?react";
import IconAccounts from "../../../../public/assets/accounts.svg?react";
import IconAccountsOperations from "../../../../public/assets/accounts-operations.svg?react";
import IconBusinessPartner from "../../../../public/assets/business-partner.svg?react";
import IconComplianceControl from "../../../../public/assets/comliance-control.svg?react";
import IconEDocuments from "../../../../public/assets/e-documents.svg?react";
import IconFrontOfficeEDocuments from "../../../../public/assets/front-office-e-documents.svg?react";
import IconLogout from "../../../../public/assets/logout.svg?react";
import IconOperationalArchive from "../../../../public/assets/operational-archive.svg?react";
import IconPaymentInvestigation from "../../../../public/assets/payment-investigation.svg?react";
import IconPaymentManagement from "../../../../public/assets/payment-management.svg?react";
import IconPaymentTransportSystem from "../../../../public/assets/payment-transport-system.svg?react";
import IconPercentageCommissionsCorrAccounts from "../../../../public/assets/percentage-commissions-corr-accounts.svg?react";
import IconReconciliationsReports from "../../../../public/assets/reconciliations-reports.svg?react";
import IconReporting from "../../../../public/assets/reporting.svg?react";
import IconRoutineProcedures from "../../../../public/assets/routine-procedures.svg?react";
import IconSystemMonitoring from "../../../../public/assets/system-monitoring.svg?react";

import NavMenuButtonStack from "./NavMenuButtonStack";

interface INavMenuStackProperties {
  colorScheme: string;
  width: number;
  opened: boolean;
  menuItems: MenuItem[];
}

interface MenuItem {
  icon?: string;
  key: string;
  name: string;
  href?: string;
  items?: MenuItem[];
}

const NavMenuStack: FC<INavMenuStackProperties> = ({
  colorScheme,
  width,
  opened,
  menuItems,
}) => {
  const router = useRouter();
  const { clearTokens } = useAuthStore();
  const { t } = useTranslation(["nav-menu-stack"]);
  const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
    IconReferenceBooks,
    IconAccountManagement,
    IconAccounts,
    IconPaymentInvestigation,
    IconReporting,
    IconAccountsOperations,
    IconBusinessPartner,
    IconComplianceControl,
    IconEDocuments,
    IconFrontOfficeEDocuments,
    IconOperationalArchive,
    IconPaymentManagement,
    IconPaymentTransportSystem,
    IconPercentageCommissionsCorrAccounts,
    IconReconciliationsReports,
    IconRoutineProcedures,
    IconSystemMonitoring,
  };
  const [activeKey, setActiveKey] = useState<string | null>("");

  const handleLogout = (): void => {
    clearTokens();
    router.navigate({ to: "/login", replace: true });
  };

  const handleMenuItemClick = (key: string): void => {
    setActiveKey(key);
  };

  const handleDismiss = (value: boolean): void => {
    if (!value) {
      setActiveKey("");
    }
  };

  const renderMenuItems = (items: MenuItem[]): React.ReactNode => {
    if (!Array.isArray(items) || items.length === 0) {
      return <></>;
    }

    return items
      .filter((item) => item.key !== "logout" && item.key !== "statuses")
      .map((item) => {
        const { key, name, items: subItems, icon } = item;
        const isActive = activeKey === key;
        const IconComponent = item ? iconMap[icon] : undefined;
        return (
          <DropdownMenu
            key={key}
            onOpen={() => handleMenuItemClick(key)}
            onDismiss={handleDismiss}
            items={subItems ?? []}
            searchable={true}
          >
            <Tooltip label={t(name)} withArrow>
              <UnstyledButton onClick={() => handleMenuItemClick(key)}>
                <NavMenuButtonStack
                  icon={IconComponent}
                  colorScheme={colorScheme}
                  active={isActive}
                  width={width}
                >
                  {opened ? t(name) : ""}
                </NavMenuButtonStack>
              </UnstyledButton>
            </Tooltip>
          </DropdownMenu>
        );
      });
  };

  return (
    <Stack
      justify="space-between"
      w={width}
      gap={0}
      bg={"#006040"}
      style={{
        borderRight: `1px solid ${colorScheme === "dark" ? "#444444" : "#DFDFDF"}`,
      }}
      h="100%"
    >
      <ScrollArea type={"never"}>{renderMenuItems(menuItems)}</ScrollArea>
      <UnstyledButton
        style={{
          borderTop: `1px solid #DFDFDF`,
        }}
        onClick={handleLogout}
      >
        <Flex justify="center">
          <NavMenuButtonStack
            colorScheme={colorScheme}
            width={width}
            icon={IconLogout}
          >
            {opened ? t("nav-menu-stack:nav-menu-stack.logout") : ""}
          </NavMenuButtonStack>
        </Flex>
      </UnstyledButton>
    </Stack>
  );
};

export default NavMenuStack;

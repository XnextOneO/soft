import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Stack, UnstyledButton } from "@mantine/core";
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
    {
      icon: IconBusinessPartner,
      key: "business-partner",
      name: t("nav-menu-stack:nav-menu-stack.business-partner.name"),
      href: "/business-partner",
      items: [
        {
          key: "customer-file",
          name: t(
            "nav-menu-stack:nav-menu-stack.business-partner.items.customer-file",
          ),
          href: "/business-partner/customer-file",
        },
      ],
    },
    {
      icon: IconAccounts,
      key: "accounts",
      name: t("nav-menu-stack:nav-menu-stack.accounts.name"),
      href: "/accounts",
      items: [
        {
          key: "accounts-file",
          name: t("nav-menu-stack:nav-menu-stack.accounts.items.accounts-file"),
          href: "/accounts/accounts-file",
        },
        {
          key: "accounts-updating",
          name: t(
            "nav-menu-stack:nav-menu-stack.accounts.items.accounts-updating",
          ),
          href: "/accounts/accounts-updating",
        },
      ],
    },
    {
      icon: IconAccountManagement,
      key: "account-management",
      name: t("nav-menu-stack:nav-menu-stack.account-management.name"),
      href: "/account-management",
      items: [
        {
          key: "financial-conditions-LORO",
          name: t(
            "nav-menu-stack:nav-menu-stack.account-management.items.financial-conditions-LORO",
          ),
          href: "/account-management/financial-conditions-LORO",
        },
        {
          key: "financial-conditions-NOSTRO",
          name: t(
            "nav-menu-stack:nav-menu-stack.account-management.items.financial-conditions-NOSTRO",
          ),
          href: "/account-management/financial-conditions-NOSTRO",
        },
        {
          key: "individual-account-managing",
          name: t(
            "nav-menu-stack:nav-menu-stack.account-management.items.individual-account-managing",
          ),
          href: "/account-management/individual-account-managing",
        },
        {
          key: "account-management-NOSTRO",
          name: t(
            "nav-menu-stack:nav-menu-stack.account-management.items.account-management-NOSTRO",
          ),
          href: "/account-management/account-management-NOSTRO",
        },
      ],
    },
    {
      icon: IconAccountsOperations,
      key: "accounts-operations",
      name: t("nav-menu-stack:nav-menu-stack.accounts-operations.name"),
      href: "/accounts-operations",
      items: [
        {
          key: "making-transactions-on-personal-account",
          name: t(
            "nav-menu-stack:nav-menu-stack.accounts-operations.items.making-transactions-on-personal-account",
          ),
          href: "/accounts-operations/making-transactions-on-personal-account",
        },
        {
          key: "operation-cancellation",
          name: t(
            "nav-menu-stack:nav-menu-stack.accounts-operations.items.operation-cancellation",
          ),
          href: "/accounts-operations/operation-cancellation",
        },
        {
          key: "personal-account",
          name: t(
            "nav-menu-stack:nav-menu-stack.accounts-operations.items.personal-account",
          ),
          href: "/accounts-operations/personal-account",
        },
      ],
    },
    {
      icon: IconPaymentManagement,
      key: "payment-management",
      name: t("nav-menu-stack:nav-menu-stack.payment-management.name"),
      href: "/payment-management",
      items: [
        {
          key: "payment-management-settings-highway",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-management.items.payment-management-settings-highway",
          ),
          href: "/payment-management/payment-management-settings-highway",
        },
        {
          key: "payment-management-settings-reference-book",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-management.items.payment-management-settings-reference-book",
          ),
          href: "/payment-management/payment-management-settings-reference-book",
        },
        {
          key: "managing-outgoing-payments",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-management.items.managing-outgoing-payments",
          ),
          href: "/payment-management/managing-outgoing-payments",
        },
        {
          key: "managing-incoming-payments",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-management.items.managing-incoming-payments",
          ),
          href: "/payment-management/managing-incoming-payments",
        },
      ],
    },
    {
      icon: IconReconciliationsReports,
      key: "reconciliations-reports",
      name: t("nav-menu-stack:nav-menu-stack.reconciliations-reports.name"),
      href: "/reconciliations-reports",
      items: [
        {
          key: "sum-reconciliation-UP-NOSTRO",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.sum-reconciliation-UP-NOSTRO",
          ),
          href: "/reconciliations-reports/sum-reconciliation-UP-NOSTRO",
        },
        {
          key: "sum-reconciliation-LORO",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.sum-reconciliation-LORO",
          ),
          href: "/reconciliations-reports/sum-reconciliation-LORO",
        },
        {
          key: "sum-reconciliation-intermediate-accounts",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.sum-reconciliation-intermediate-accounts",
          ),
          href: "/reconciliations-reports/sum-reconciliation-intermediate-accounts",
        },
        {
          key: "unexecuted-MT-reports",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.unexecuted-MT-reports",
          ),
          href: "/reconciliations-reports/unexecuted-MT-reports",
        },
        {
          key: "MT103-unclear-reports",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.MT103-unclear-reports",
          ),
          href: "/reconciliations-reports/MT103-unclear-reports",
        },
        {
          key: "UP-MT-reconciliation",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.UP-MT-reconciliation",
          ),
          href: "/reconciliations-reports/UP-MT-reconciliation",
        },
        {
          key: "account-number-correctness-check",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.account-number-correctness-check",
          ),
          href: "/reconciliations-reports/account-number-correctness-check",
        },
        {
          key: "limit-exceed-report-NOSTRO",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.limit-exceed-report-NOSTRO",
          ),
          href: "/reconciliations-reports/limit-exceed-report-NOSTRO",
        },
        {
          key: "compliance-control",
          name: t(
            "nav-menu-stack:nav-menu-stack.reconciliations-reports.items.compliance-control",
          ),
          href: "/reconciliations-reports/compliance-control",
        },
      ],
    },
    {
      icon: IconReferenceBooks,
      key: "reference-books",
      name: t("nav-menu-stack:nav-menu-stack.reference-books.name"),
      items: [
        {
          key: "nsi-reference-books",
          name: t(
            "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.name",
          ),
          items: [
            {
              key: "transfer-destination-category-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.transfer-destination-category-code",
              ),
              href: "transfer-destination-category-code",
            },
            {
              key: "organization-identification-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.organization-identification-code",
              ),
              href: "/reference-books/nsi-reference-books/organization-identification-code",
            },
            {
              key: "transfer-cancellation-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.transfer-cancellation-code",
              ),
              href: "/reference-books/nsi-reference-books/transfer-cancellation-code",
            },
            {
              key: "transfer-status-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.transfer-status-code",
              ),
              href: "/reference-books/nsi-reference-books/transfer-status-code",
            },
            {
              key: "balance-account-nb",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.balance-account-nb",
              ),
              href: "/reference-books/nsi-reference-books/balance-account-nb",
            },
            {
              key: "balance-account",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.balance-account",
              ),
              href: "/nsi-reference-books/balance-account",
            },
            {
              key: "currency",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.currency",
              ),
              href: "/reference-books/nsi-reference-books/currency",
            },
            {
              key: "exchange-rate",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.exchange-rate",
              ),
              href: "/reference-books/nsi-reference-books/exchange-rate",
            },
            {
              key: "bank",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.bank",
              ),
              href: "/reference-books/nsi-reference-books/bank",
            },
            {
              key: "processing-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.processing-code",
              ),
              href: "/reference-books/nsi-reference-books/processing-code",
            },
            {
              key: "budget-payment-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.budget-payment-code",
              ),
              href: "/reference-books/nsi-reference-books/budget-payment-code",
            },
            {
              key: "country-codifier",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.country-codifier",
              ),
              href: "/reference-books/nsi-reference-books/country-codifier",
            },
            {
              key: "republican-budget-account",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.republican-budget-account",
              ),
              href: "/reference-books/nsi-reference-books/republican-budget-account",
            },
            {
              key: "bank-id-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.bank-id-code",
              ),
              href: "/reference-books/nsi-reference-books/bank-id-code",
            },
            {
              key: "biss-member",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.biss-member",
              ),
              href: "/reference-books/nsi-reference-books/biss-member",
            },
            {
              key: "payment-priority-code",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.payment-priority-code",
              ),
              href: "/reference-books/nsi-reference-books/payment-priority-code",
            },
            {
              key: "local-budget-account",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.local-budget-account",
              ),
              href: "/reference-books/nsi-reference-books/local-budget-account",
            },
            {
              key: "subject-statuses",
              name: t(
                "nav-menu-stack:nav-menu-stack.reference-books.items.nsi-reference-books.items.subject-statuses",
              ),
              href: "/reference-books/nsi-reference-books/subject-statuses",
            },
          ],
        },
        {
          key: "rf-reference-book",
          name: t(
            "nav-menu-stack:nav-menu-stack.reference-books.items.rf-reference-book",
          ),
          href: "/reference-books/rf-reference-book",
        },
        {
          key: "swift-reference-book",
          name: t(
            "nav-menu-stack:nav-menu-stack.reference-books.items.swift-reference-book",
          ),
          href: "/reference-books/swift-reference-book",
        },
        {
          key: "regulatory-capital-by-calculations",
          name: t(
            "nav-menu-stack:nav-menu-stack.reference-books.items.regulatory-capital-by-calculations",
          ),
          href: "/reference-books/regulatory-capital-by-calculations",
        },
        {
          key: "calendar",
          name: t(
            "nav-menu-stack:nav-menu-stack.reference-books.items.calendar",
          ),
          href: "/reference-books/calendar",
        },
      ],
    },
    {
      icon: IconEDocuments,
      key: "e-documents",
      name: t("nav-menu-stack:nav-menu-stack.e-documents.name"),
      href: "/e-documents",
      items: [
        {
          key: "e-documents",
          name: t(
            "nav-menu-stack:nav-menu-stack.e-documents.items.e-documents",
          ),
          href: "/e-documents/e-documents",
        },
      ],
    },
    {
      icon: IconFrontOfficeEDocuments,
      key: "front-office-e-documents",
      name: t("nav-menu-stack:nav-menu-stack.front-office-e-documents.name"),
      href: "/front-office-e-documents",
      items: [
        {
          key: "e-documents",
          name: t(
            "nav-menu-stack:nav-menu-stack.front-office-e-documents.items.e-documents",
          ),
          href: "/front-office-e-documents/e-documents",
        },
      ],
    },
    {
      icon: IconPercentageCommissionsCorrAccounts,
      key: "percentage-commissions-corr-accounts",
      name: t(
        "nav-menu-stack:nav-menu-stack.percentage-commissions-corr-accounts.name",
      ),
      href: "/percentage-commissions-corr-accounts",
      items: [
        {
          key: "percents-fees-LORO",
          name: t(
            "nav-menu-stack:nav-menu-stack.percentage-commissions-corr-accounts.items.percents-fees-LORO",
          ),
          href: "/percentage-commissions-corr-accounts/percents-fees-LORO",
        },
        {
          key: "percents-fees-NOSTRO",
          name: t(
            "nav-menu-stack:nav-menu-stack.percentage-commissions-corr-accounts.items.percents-fees-NOSTRO",
          ),
          href: "/percentage-commissions-corr-accounts/percents-fees-NOSTRO",
        },
        {
          key: "payments-commissions-6700-account",
          name: t(
            "nav-menu-stack:nav-menu-stack.percentage-commissions-corr-accounts.items.payments-commissions-6700-account",
          ),
          href: "/percentage-commissions-corr-accounts/payments-commissions-6700-account",
        },
        {
          key: "calculation-of-expected-income-expenses",
          name: t(
            "nav-menu-stack:nav-menu-stack.percentage-commissions-corr-accounts.items.calculation-of-expected-income-expenses",
          ),
          href: "/percentage-commissions-corr-accounts/calculation-of-expected-income-expenses",
        },
      ],
    },
    {
      icon: IconRoutineProcedures,
      key: "routine-procedures",
      name: t("nav-menu-stack:nav-menu-stack.routine-procedures.name"),
      href: "/routine-procedures",
      items: [
        {
          key: "reconciliation-IIS-SC",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.reconciliation-IIS-SC",
          ),
          href: "/routine-procedures/reconciliation-IIS-SC",
        },
        {
          key: "pre-close-checks",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.pre-close-checks",
          ),
          href: "/routine-procedures/pre-close-checks",
        },
        {
          key: "reconciliation-IIS-ODB",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.reconciliation-IIS-ODB",
          ),
          href: "/routine-procedures/reconciliation-IIS-ODB",
        },
        {
          key: "set-posting-date",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.set-posting-date",
          ),
          href: "/routine-procedures/set-posting-date",
        },
        {
          key: "revaluation",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.revaluation",
          ),
          href: "/routine-procedures/revaluation",
        },
        {
          key: "transfer-accrued-interest-LORO",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.transfer-accrued-interest-LORO",
          ),
          href: "/routine-procedures/transfer-accrued-interest-LORO",
        },
        {
          key: "transfer-return-NOSTRO",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.transfer-return-NOSTRO",
          ),
          href: "/routine-procedures/transfer-return-NOSTRO",
        },
        {
          key: "generate-attachments-statements",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.generate-attachments-statements",
          ),
          href: "/routine-procedures/generate-attachments-statements",
        },
        {
          key: "generate-MT940-950",
          name: t(
            "nav-menu-stack:nav-menu-stack.routine-procedures.items.generate-MT940-950",
          ),
          href: "/routine-procedures/generate-MT940-950",
        },
      ],
    },
    {
      icon: IconReporting,
      key: "reporting",
      name: t("nav-menu-stack:nav-menu-stack.reporting.name"),
      href: "/reporting",
      items: [
        {
          key: "nostro-exit-report",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.nostro-exit-report",
          ),
          href: "/reporting/nostro-exit-report",
        },
        {
          key: "initial-percentage-preparation",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.initial-percentage-preparation",
          ),
          href: "/reporting/initial-percentage-preparation",
        },
        {
          key: "operation-selection-criteria",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.operation-selection-criteria",
          ),
          href: "/reporting/operation-selection-criteria",
        },
        {
          key: "operation-selection-debit-credit",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.operation-selection-debit-credit",
          ),
          href: "/reporting/operation-selection-debit-credit",
        },
        {
          key: "nostro-balance-report",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.nostro-balance-report",
          ),
          href: "/reporting/nostro-balance-report",
        },
        {
          key: "mutual-nostro-balances",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.mutual-nostro-balances",
          ),
          href: "/reporting/mutual-nostro-balances",
        },
        {
          key: "actual-loro-balances",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.actual-loro-balances",
          ),
          href: "/reporting/actual-loro-balances",
        },
        {
          key: "account-balance-report",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.account-balance-report",
          ),
          href: "/reporting/account-balance-report",
        },
        {
          key: "individual-transfers-report",
          name: t(
            "nav-menu-stack:nav-menu-stack.reporting.items.individual-transfers-report",
          ),
          href: "/reporting/individual-transfers-report",
        },
      ],
    },
    {
      icon: IconOperationalArchive,
      key: "operational-archive",
      name: t("nav-menu-stack:nav-menu-stack.operational-archive.name"),
      href: "/operational-archive",
      items: [
        {
          key: "operational-archive",
          name: t(
            "nav-menu-stack:nav-menu-stack.operational-archive.items.operational-archive",
          ),
          href: "/operational-archive/operational-archive",
        },
      ],
    },
    {
      icon: IconSystemMonitoring,
      key: "system-monitoring",
      name: t("nav-menu-stack:nav-menu-stack.system-monitoring.name"),
      href: "/system-monitoring",
      items: [
        {
          key: "system-monitoring",
          name: t(
            "nav-menu-stack:nav-menu-stack.system-monitoring.items.system-monitoring",
          ),
          href: "/system-monitoring/system-monitoring",
        },
      ],
    },
    {
      icon: IconComplianceControl,
      key: "compliance-control",
      name: t("nav-menu-stack:nav-menu-stack.compliance-control.name"),
      href: "/compliance-control",
      items: [
        {
          key: "compliance-control-payments-reference-books",
          name: t(
            "nav-menu-stack:nav-menu-stack.compliance-control.items.compliance-control-payments-reference-books",
          ),
          href: "/compliance-control/compliance-control-payments-reference-books",
        },
        {
          key: "compliance-control-payments-databases",
          name: t(
            "nav-menu-stack:nav-menu-stack.compliance-control.items.compliance-control-payments-databases",
          ),
          href: "/compliance-control/compliance-control-payments-databases",
        },
        {
          key: "compliance-control-monitoring",
          name: t(
            "nav-menu-stack:nav-menu-stack.compliance-control.items.compliance-control-monitoring",
          ),
          href: "/compliance-control/compliance-control-monitoring",
        },
      ],
    },
    {
      icon: IconPaymentTransportSystem,
      key: "payment-transport-system",
      name: t("nav-menu-stack:nav-menu-stack.payment-transport-system.name"),
      href: "/payment-transport-system",
      items: [
        {
          key: "payment-transport-system",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-transport-system.items.payment-transport-system",
          ),
          href: "/payment-transport-system/payment-transport-system",
        },
        {
          key: "payment-transport-system-settings",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-transport-system.items.payment-transport-system-settings",
          ),
          href: "/payment-transport-system/payment-transport-system-settings",
        },
        {
          key: "transport-handlers",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-transport-system.items.transport-handlers",
          ),
          href: "/payment-transport-system/transport-handlers",
        },
        {
          key: "api-handler-management",
          name: t(
            "nav-menu-stack:nav-menu-stack.payment-transport-system.items.api-handler-management",
          ),
          href: "/payment-transport-system/api-handler-management",
        },
      ],
    },
    {
      icon: IconAccountManagement,
      key: "statuses",
      name: t("nav-menu-stack:nav-menu-stack.statuses"),
      href: "/statuses",
    },
    {
      icon: IconAccountManagement,
      key: "logout",
      name: t("nav-menu-stack:nav-menu-stack.logout"),
      href: "/logout",
    },
  ];

  const renderMenuItems = (items: any[]) => {
    if (!Array.isArray(items) || items.length === 0) {
      return null;
    }

    return items
      .filter((item) => item.key !== "logout" && item.key !== "statuses")
      .map((item) => {
        const { key, name, items: subItems } = item;
        return (
          <DropdownMenu
            key={key}
            onOpen={setActive}
            items={subItems} // Передаем subItems в DropdownMenu
            searchable={true}
          >
            <UnstyledButton onClick={() => setActive(!active)}>
              <NavMenuButtonStack
                icon={item.icon}
                colorScheme={colorScheme}
                active={active}
                width={width}
                marginLeft={marginLeft}
              >
                {opened ? name : ""}
              </NavMenuButtonStack>
            </UnstyledButton>
          </DropdownMenu>
        );
      });
  };

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
      <Stack gap={0}>{renderMenuItems(menuItems)}</Stack>
      <UnstyledButton onClick={handleLogout}>
        <Flex justify="center">
          <NavMenuButtonStack
            colorScheme={colorScheme}
            width={width}
            marginLeft={marginLeft}
            icon={IconLogout}
          >
            {opened ? t("nav-menu-stack:logout") : ""}
          </NavMenuButtonStack>
        </Flex>
      </UnstyledButton>
    </Stack>
  );
};

export default NavMenuStack;

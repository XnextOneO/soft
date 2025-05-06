import { FC, SVGProps } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "@mantine/core";
import IconReferenceBooks from "@public/assets/reference-books.svg?react";
import { Link } from "@tanstack/react-router";

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

import styles from "./index.module.scss";

interface MenuItem {
  key: string;
  name: string;
  href?: string;
  items?: MenuItem[];
}

interface MenuGroup {
  icon: string;
  key: string;
  name: string;
  items?: MenuItem[];
  href?: string;
}

interface IMenu {
  isMenuOpen: boolean;
  menuData: MenuGroup[];
}

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

const MenuItems: FC<{ items?: MenuItem[] }> = ({ items }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  // eslint-disable-next-line unicorn/no-null
  if (!items) return null;
  return (
    <>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.href}>
            <Menu>
              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item className={styles.menuSubItem}>
                    {t(item.name)}
                  </Menu.Sub.Item>
                </Menu.Sub.Target>
                {item.items ? (
                  <Menu.Sub.Dropdown className={styles.dropdown}>
                    <MenuItems items={item.items} />
                  </Menu.Sub.Dropdown>
                ) : (
                  ""
                )}
              </Menu.Sub>
            </Menu>
          </Link>
        </Menu.Item>
      ))}
    </>
  );
};

export const NavMenu: FC<IMenu> = ({ isMenuOpen, menuData }) => {
  const { t } = useTranslation(["nav-menu-stack"]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        background: "#006040",
      }}
    >
      <Menu trigger={"click"}>
        {menuData.map((group) => (
          <Menu.Sub key={group.key}>
            <Link to={group.href ?? ""}>
              <Menu.Sub.Target>
                <Menu.Sub.Item className={styles.item}>
                  <img src={group.icon} alt={"icon"}></img>
                  {isMenuOpen ? <span>{t(group.name)}</span> : ""}
                </Menu.Sub.Item>
              </Menu.Sub.Target>
            </Link>

            <Menu.Sub.Dropdown
              className={styles.menuSubDropdown}
              style={{ padding: 0 }}
            >
              <MenuItems items={group.items} />
            </Menu.Sub.Dropdown>
          </Menu.Sub>
        ))}
      </Menu>
    </div>
  );
};

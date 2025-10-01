import { FC } from "react";
import { Button, Tabs } from "@mantine/core";
import { MainDetailsTab } from "@pages/account-transactions/create-payment-document/ui/components/tabs/main-details-tab";

import { AdministrativeDataTab } from "./components/tabs/administrative-data-tab";
import { AutomaticDetailsTab } from "./components/tabs/automatic-details-tab";
import { PaymentDetailsTab } from "./components/tabs/payment-details-tab";
import { RfKzIndiaTab } from "./components/tabs/rf-kz-india-tab";
import styles from "./index.module.scss";

export const CreatePaymentDocument: FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Button w={100} h={30} p={0} radius="xs" color="#007458">
          Провести
        </Button>
        <Button w={100} h={30} p={0} radius="xs" color="#007458">
          Отложить
        </Button>
        <Button w={100} h={30} p={0} radius="xs" color="#007458">
          Проверить
        </Button>
      </div>
      <Tabs defaultValue="main-details">
        <Tabs.List>
          <Tabs.Tab value="main-details">Основные реквизиты</Tabs.Tab>
          <Tabs.Tab value="payment-details">Детали платежа</Tabs.Tab>
          <Tabs.Tab value="rf-kz-india">
            Платежи в РФ, Казахстан и Индию
          </Tabs.Tab>
          <Tabs.Tab value="automatic-details">
            Автоматические реквизиты
          </Tabs.Tab>
          <Tabs.Tab value="administrative-data">
            Административные данные
          </Tabs.Tab>
        </Tabs.List>
        <MainDetailsTab />
        <PaymentDetailsTab />
        <RfKzIndiaTab />
        <AutomaticDetailsTab />
        <AdministrativeDataTab />
      </Tabs>
    </div>
  );
};

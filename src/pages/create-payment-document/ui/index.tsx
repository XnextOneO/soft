import { FC } from "react";
import { Button, Tabs } from "@mantine/core";
import { Index } from "@pages/create-payment-document/ui/children-panel";

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
        <Tabs.Panel value="main-details">
          <Index title={"test"}>
            <span>dsa</span>
          </Index>
        </Tabs.Panel>
        <Tabs.Panel value="payment-details">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="rf-kz-india">Settings tab content</Tabs.Panel>
        <Tabs.Panel value="automatic-details">Settings tab content</Tabs.Panel>
        <Tabs.Panel value="administrative-data">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

import { FC } from "react";
import { Button, Group, Tabs } from "@mantine/core";
import { ChildrenPanel } from "@pages/create-payment-document/ui/children-panel";
import { PaymentDocumentInput } from "@pages/create-payment-document/ui/components/payment-document-input/payement-document-input.tsx";

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
        <Tabs.Panel value="main-details" pl={16}>
          <ChildrenPanel title={"Основные реквизиты"}>
            <>
              <Group align={"end"}>
                <PaymentDocumentInput
                  width={100}
                  title={"Вид документа"}
                  type={"copy"}
                  icon={true}
                />
                <span style={{ marginBottom: "4px" }}>ПЛАТЕЖНОЕ ПОРУЧЕНИЕ</span>
              </Group>
              <Group>
                <PaymentDocumentInput
                  width={228}
                  title={"№ документа"}
                  type={"copy"}
                  icon={false}
                />
                <PaymentDocumentInput
                  width={275}
                  title={"Дата документа"}
                  type={"date"}
                  icon={true}
                />
              </Group>
            </>
          </ChildrenPanel>
          <ChildrenPanel title={"Сумма и валюта"}>
            <>
              <Group align={"end"}>
                <PaymentDocumentInput
                  width={228}
                  title={"Валюта"}
                  type={"copy"}
                  icon={true}
                />
                <PaymentDocumentInput
                  width={400}
                  title={"Курс валюты"}
                  type={"copy"}
                  icon={false}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  width={228}
                  title={"Сумма"}
                  icon={false}
                  type={"copy"}
                />
                <PaymentDocumentInput
                  width={400}
                  title={"Сумма прописью"}
                  icon={false}
                  type={"text"}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  width={228}
                  title={"Сумма комиссии"}
                  icon={false}
                  type={"copy"}
                />
                <PaymentDocumentInput
                  width={275}
                  title={"Признак срочности"}
                  icon={false}
                  type={"copy"}
                />
              </Group>
            </>
          </ChildrenPanel>
          <ChildrenPanel title={"Сумма и валюта"}>
            <></>
          </ChildrenPanel>
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

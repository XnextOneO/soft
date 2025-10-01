import { FC } from "react";
import { Group, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

export const AdministrativeDataTab: FC = () => {
  return (
    <Tabs.Panel value="administrative-data" pl={16}>
      <div className={styles.content}>
        <ChildrenPanel title={"Платежное поручение"}>
          <PaymentDocumentInput
            type={"copy"}
            width={314}
            title={<span>Идентификатор платежного поручения</span>}
            icon={false}
          />
        </ChildrenPanel>
        <ChildrenPanel title={"Статус"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                type={"copy"}
                width={161}
                title={
                  <span>
                    Имя пользователя <br /> создавшего
                  </span>
                }
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={168}
                title={
                  <span>
                    Имя пользователя <br /> изменившего
                  </span>
                }
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={147}
                title={
                  <span>
                    Имя пользователя <br /> деблокировавшего
                  </span>
                }
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={120}
                title={<span>Статус</span>}
                icon={false}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Технические поля ISO20022"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>MessageIdentification</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>InstructionIdentification</span>}
                icon={false}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>EndToEndIdentification</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>UETR</span>}
                icon={false}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

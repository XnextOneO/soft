import { FC } from "react";
import { Group, Stack, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/create-payment-document/ui/components/payment-document-input/payement-document-input.tsx";
import styles from "@pages/create-payment-document/ui/index.module.scss";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

export const PaymentDetailsTab: FC = () => {
  return (
    <Tabs.Panel value="payment-details" pl={16}>
      <div className={styles.content}>
        <ChildrenPanel title={"Детали платежа"}>
          <>
            <Stack>
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
              />
            </Stack>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Документы ВЭД"}>
          <>
            <Group>
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>Номер документа ВЭД</span>}
                icon={false}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>Код ТН ВЭД</span>}
                icon={false}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

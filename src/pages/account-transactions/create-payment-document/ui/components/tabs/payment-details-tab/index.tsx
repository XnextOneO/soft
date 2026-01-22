import { FC } from "react";
import { Group, Stack, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { PaymentDetailsFormState } from "@pages/account-transactions/create-payment-document/ui/types";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

type PaymentDetailsTabProperties = {
  value: PaymentDetailsFormState;
  onChange: (patch: Partial<PaymentDetailsFormState>) => void;
};

export const PaymentDetailsTab: FC<PaymentDetailsTabProperties> = ({
  value,
  onChange,
}) => {
  const handleChange =
    (field: keyof PaymentDetailsFormState) =>
    (nextValue: string): void => {
      onChange({ [field]: nextValue });
    };

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
                value={value.description1}
                onChange={handleChange("description1")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
                value={value.description2}
                onChange={handleChange("description2")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
                value={value.description3}
                onChange={handleChange("description3")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
                value={value.description4}
                onChange={handleChange("description4")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={644}
                title={<span>Детали платежа</span>}
                icon={false}
                value={value.description5}
                onChange={handleChange("description5")}
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
                value={value.vedDocumentNumber}
                onChange={handleChange("vedDocumentNumber")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>Код ТН ВЭД</span>}
                icon={false}
                value={value.tnVedCode}
                onChange={handleChange("tnVedCode")}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

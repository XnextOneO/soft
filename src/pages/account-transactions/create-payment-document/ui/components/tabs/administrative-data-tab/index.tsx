import { FC } from "react";
import { Group, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { AdministrativeDataFormState } from "@pages/account-transactions/create-payment-document/ui/types";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

type AdministrativeDataTabProperties = {
  value: AdministrativeDataFormState;
  onChange: (patch: Partial<AdministrativeDataFormState>) => void;
};

export const AdministrativeDataTab: FC<AdministrativeDataTabProperties> = ({
  value,
  onChange,
}) => {
  const handleChange =
    (field: keyof AdministrativeDataFormState) =>
    (nextValue: string): void => {
      onChange({ [field]: nextValue });
    };

  return (
    <Tabs.Panel value="administrative-data" pl={16}>
      <div className={styles.content}>
        <ChildrenPanel title={"Платежное поручение"}>
          <PaymentDocumentInput
            type={"copy"}
            width={314}
            title={<span>Идентификатор платежного поручения</span>}
            icon={false}
            value={value.paymentOrderId}
            onChange={handleChange("paymentOrderId")}
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
                value={value.creator}
                onChange={handleChange("creator")}
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
                value={value.editor}
                onChange={handleChange("editor")}
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
                value={value.unlocker}
                onChange={handleChange("unlocker")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={120}
                title={<span>Статус</span>}
                icon={false}
                value={value.status}
                onChange={handleChange("status")}
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
                value={value.messageId}
                onChange={handleChange("messageId")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>InstructionIdentification</span>}
                icon={false}
                value={value.instructionId}
                onChange={handleChange("instructionId")}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>EndToEndIdentification</span>}
                icon={false}
                value={value.endToEndId}
                onChange={handleChange("endToEndId")}
              />
              <PaymentDocumentInput
                type={"copy"}
                width={314}
                title={<span>UETR</span>}
                icon={false}
                value={value.uetr}
                onChange={handleChange("uetr")}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

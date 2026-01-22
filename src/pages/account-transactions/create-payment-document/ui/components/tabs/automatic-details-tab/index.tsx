import { FC } from "react";
import { Group, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { AutoPaymentDetailsFormState } from "@pages/account-transactions/create-payment-document/ui/types";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

type AutomaticDetailsTabProperties = {
  value: AutoPaymentDetailsFormState;
  onChange: (patch: Partial<AutoPaymentDetailsFormState>) => void;
};

export const AutomaticDetailsTab: FC<AutomaticDetailsTabProperties> = ({
  value,
  onChange,
}) => {
  const handleChange =
    (field: keyof AutoPaymentDetailsFormState) =>
    (nextValue: string): void => {
      onChange({ [field]: nextValue });
    };

  return (
    <Tabs.Panel value="automatic-details" pl={16}>
      <div className={styles.content}>
        <ChildrenPanel title={"Даты обработки"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата и время поступления</span>}
                value={value.arrivalDateTime}
                onChange={handleChange("arrivalDateTime")}
              />
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата исполнения платежного документа</span>}
                value={value.executionDate}
                onChange={handleChange("executionDate")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата валютирования по дебету</span>}
                value={value.debitValueDate}
                onChange={handleChange("debitValueDate")}
              />
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата валютирования по кредиту</span>}
                value={value.creditValueDate}
                onChange={handleChange("creditValueDate")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Документ, на основании которого создана ПИ"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={314}
                icon={false}
                type={"copy"}
                title={<span>№ расчетного документа</span>}
                value={value.settlementDocumentNumber}
                onChange={handleChange("settlementDocumentNumber")}
              />
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата расчетного документа</span>}
                value={value.settlementDocumentDate}
                onChange={handleChange("settlementDocumentDate")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Реквизиты DM"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"copy"}
                title={<span>Средство представления ПИ в банк</span>}
                value={value.representationMethod}
                onChange={handleChange("representationMethod")}
              />
              <span style={{ marginBottom: "4px" }}>Клиент-банк</span>
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"copy"}
                title={<span>Способ платежа</span>}
                value={value.paymentMethod}
                onChange={handleChange("paymentMethod")}
              />
              <span style={{ marginBottom: "4px" }}>SWIFT 103,202,399</span>
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Реквизиты PTS"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={177}
                icon={false}
                type={"copy"}
                title={<span>Референс операции (20:)</span>}
                value={value.reference20}
                onChange={handleChange("reference20")}
              />
              <PaymentDocumentInput
                width={177}
                icon={false}
                type={"copy"}
                title={<span>Связанный референс (21:)</span>}
                value={value.reference21}
                onChange={handleChange("reference21")}
              />
            </Group>
            <PaymentDocumentInput
              width={644}
              icon={true}
              type={"dropdown"}
              title={<span>Тип исходного сообщения</span>}
              value={value.sourceMessageType}
              onChange={handleChange("sourceMessageType")}
            />
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Реквизиты BISS"}>
          <Group align={"end"}>
            <PaymentDocumentInput
              width={314}
              icon={false}
              type={"copy"}
              title={<span>Код банковской операции</span>}
              value={value.bissOperationCode}
              onChange={handleChange("bissOperationCode")}
            />
            <PaymentDocumentInput
              width={149}
              icon={false}
              type={"copy"}
              title={<span>Вид платежа</span>}
              value={value.bissPaymentType}
              onChange={handleChange("bissPaymentType")}
            />
            <PaymentDocumentInput
              width={149}
              icon={false}
              type={"copy"}
              title={<span>Детали расходов</span>}
              value={value.bissExpenseDetails}
              onChange={handleChange("bissExpenseDetails")}
            />
          </Group>
        </ChildrenPanel>
        <ChildrenPanel title={"Реквизиты ISO20022"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={231.5}
                icon={false}
                type={"copy"}
                title={<span>Код назначения платежа (букв)</span>}
                value={value.isoPurposeCodeAlpha}
                onChange={handleChange("isoPurposeCodeAlpha")}
              />
              <PaymentDocumentInput
                width={231.5}
                icon={false}
                type={"copy"}
                title={<span>Код назначения платежа (цифр)</span>}
                value={value.isoPurposeCodeNumeric}
                onChange={handleChange("isoPurposeCodeNumeric")}
              />
              <PaymentDocumentInput
                width={149}
                icon={true}
                type={"copy"}
                title={<span>Признак платежа</span>}
                value={value.isoPaymentType}
                onChange={handleChange("isoPaymentType")}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={139}
                icon={true}
                type={"copy"}
                title={
                  <span>
                    Приоритет <br />
                    банковского <br />
                    перевода
                  </span>
                }
                value={value.isoTransferPriority}
                onChange={handleChange("isoTransferPriority")}
              />
              <PaymentDocumentInput
                width={119}
                icon={false}
                type={"copy"}
                title={
                  <span>
                    Приоритет <br /> обработки
                  </span>
                }
                value={value.isoProcessingPriority}
                onChange={handleChange("isoProcessingPriority")}
              />
              <PaymentDocumentInput
                width={145}
                icon={true}
                type={"copy"}
                title={
                  <span>
                    Плательщик <br /> комиссии
                  </span>
                }
                value={value.isoPayerCommissionType}
                onChange={handleChange("isoPayerCommissionType")}
              />
              <PaymentDocumentInput
                width={127}
                icon={true}
                type={"copy"}
                title={<span>Тип MX-сообщения</span>}
                value={value.isoMessageType}
                onChange={handleChange("isoMessageType")}
              />
              <PaymentDocumentInput
                width={58}
                icon={true}
                type={"copy"}
                value={value.isoSequenceType}
                onChange={handleChange("isoSequenceType")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Реквизиты физического лица плательщика"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={139}
                icon={false}
                type={"copy"}
                title={<span>Код вида документа</span>}
                value={value.payerDocumentCode}
                onChange={handleChange("payerDocumentCode")}
              />
              <PaymentDocumentInput
                width={144}
                icon={false}
                type={"copy"}
                title={
                  <span>
                    Серия и номер <br /> документа
                  </span>
                }
                value={value.payerDocumentSeriesAndNumber}
                onChange={handleChange("payerDocumentSeriesAndNumber")}
              />
              <PaymentDocumentInput
                width={180}
                icon={false}
                type={"copy"}
                title={
                  <span>
                    Идентификационный <br /> номер документа
                  </span>
                }
                value={value.payerDocumentIdNumber}
                onChange={handleChange("payerDocumentIdNumber")}
              />
              <PaymentDocumentInput
                width={133}
                icon={true}
                type={"copy"}
                title={
                  <span>
                    Дата выдачи <br /> документа
                  </span>
                }
                value={value.payerDocumentIssueDate}
                onChange={handleChange("payerDocumentIssueDate")}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={643}
                icon={false}
                type={"copy"}
                title={<span>Орган, выдавший документ</span>}
                value={value.payerDocumentIssuer}
                onChange={handleChange("payerDocumentIssuer")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Реквизиты физического лица бенефициара"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={139}
                icon={false}
                type={"copy"}
                title={<span>Код вида документа</span>}
                value={value.beneficiaryDocumentCode}
                onChange={handleChange("beneficiaryDocumentCode")}
              />
              <PaymentDocumentInput
                width={144}
                icon={false}
                type={"copy"}
                title={
                  <span>
                    Серия и номер <br /> документа
                  </span>
                }
                value={value.beneficiaryDocumentSeriesAndNumber}
                onChange={handleChange("beneficiaryDocumentSeriesAndNumber")}
              />
              <PaymentDocumentInput
                width={180}
                icon={false}
                type={"copy"}
                title={
                  <span>
                    Идентификационный <br /> номер документа
                  </span>
                }
                value={value.beneficiaryDocumentIdNumber}
                onChange={handleChange("beneficiaryDocumentIdNumber")}
              />
              <PaymentDocumentInput
                width={133}
                icon={true}
                type={"copy"}
                title={
                  <span>
                    Дата выдачи <br /> документа
                  </span>
                }
                value={value.beneficiaryDocumentIssueDate}
                onChange={handleChange("beneficiaryDocumentIssueDate")}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={643}
                icon={false}
                type={"copy"}
                title={<span>Орган, выдавший документ</span>}
                value={value.beneficiaryDocumentIssuer}
                onChange={handleChange("beneficiaryDocumentIssuer")}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

import { FC } from "react";
import { Group, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { PaymentRuKzInFormState } from "@pages/account-transactions/create-payment-document/ui/types";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

type RfKzIndiaTabProperties = {
  value: PaymentRuKzInFormState;
  onChange: (patch: Partial<PaymentRuKzInFormState>) => void;
};

export const RfKzIndiaTab: FC<RfKzIndiaTabProperties> = ({
  value,
  onChange,
}) => {
  const handleChange =
    (field: keyof PaymentRuKzInFormState) =>
    (nextValue: string): void => {
      onChange({ [field]: nextValue });
    };

  return (
    <>
      <Tabs.Panel value="rf-kz-india" pl={16}>
        <div className={styles.content}>
          <ChildrenPanel title={"Платежи в бюджет РФ"}>
            <>
              <Group>
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>Код операции</span>}
                  icon={true}
                  value={value.rfOperationCode}
                  onChange={handleChange("rfOperationCode")}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={314}
                  title={<span>Код основного налогового плательщика</span>}
                  icon={true}
                  value={value.rfMainTaxPayerCode}
                  onChange={handleChange("rfMainTaxPayerCode")}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>Код выплат</span>}
                  icon={true}
                  value={value.rfPaymentCode}
                  onChange={handleChange("rfPaymentCode")}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>КПП получателя</span>}
                  icon={false}
                  value={value.rfRecipientKpp}
                  onChange={handleChange("rfRecipientKpp")}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={314}
                  title={<span>Уникальный идентификатор платежа</span>}
                  icon={false}
                  value={value.rfUniquePaymentId}
                  onChange={handleChange("rfUniquePaymentId")}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  type={"copy"}
                  width={314}
                  title={<span>Код бюджетной классификации</span>}
                  icon={false}
                  value={value.rfBudgetClassificationCode}
                  onChange={handleChange("rfBudgetClassificationCode")}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>Код ОКТМО</span>}
                  icon={false}
                  value={value.rfOktmoCode}
                  onChange={handleChange("rfOktmoCode")}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  title={
                    <span>
                      Показ налогового периода/код таможенной <br /> организации
                    </span>
                  }
                  icon={false}
                  type={"copy"}
                  width={314}
                  value={value.rfTaxPeriodCode}
                  onChange={handleChange("rfTaxPeriodCode")}
                />
                <PaymentDocumentInput
                  title={
                    <span>
                      Дата налогового <br /> документа
                    </span>
                  }
                  icon={true}
                  type={"date"}
                  width={149}
                  value={value.rfTaxDocumentDate}
                  onChange={handleChange("rfTaxDocumentDate")}
                />
                <PaymentDocumentInput
                  title={
                    <span>
                      № налогового <br /> документа
                    </span>
                  }
                  icon={false}
                  type={"copy"}
                  width={149}
                  value={value.rfTaxDocumentNumber}
                  onChange={handleChange("rfTaxDocumentNumber")}
                />
              </Group>
            </>
          </ChildrenPanel>
          <ChildrenPanel title={"Выплаты физическим лицам на территории РФ"}>
            <PaymentDocumentInput
              title={<span>Код вида дохода</span>}
              icon={false}
              type={"copy"}
              width={149}
              value={value.rfIncomeTypeCode}
              onChange={handleChange("rfIncomeTypeCode")}
            />
          </ChildrenPanel>
          <ChildrenPanel title={"Платежи в Казахстан"}>
            <>
              <Group align={"end"}>
                <PaymentDocumentInput
                  title={
                    <span>
                      Код назначения
                      <br /> платежа
                    </span>
                  }
                  icon={false}
                  type={"copy"}
                  width={149}
                  value={value.kzPaymentPurposeCode}
                  onChange={handleChange("kzPaymentPurposeCode")}
                />
                <PaymentDocumentInput
                  title={
                    <span>
                      Код отправленных <br /> средств
                    </span>
                  }
                  icon={true}
                  type={"copy"}
                  width={149}
                  value={value.kzSentFundsCode}
                  onChange={handleChange("kzSentFundsCode")}
                />
                <PaymentDocumentInput
                  title={<span>Код бенефициара</span>}
                  icon={true}
                  type={"copy"}
                  width={149}
                  value={value.kzBeneficiaryCode}
                  onChange={handleChange("kzBeneficiaryCode")}
                />
                <PaymentDocumentInput
                  title={
                    <span>
                      Код бюджетной <br />
                      классификации
                    </span>
                  }
                  icon={false}
                  type={"copy"}
                  width={149}
                  value={value.kzBudgetClassificationCode}
                  onChange={handleChange("kzBudgetClassificationCode")}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  title={<span>Тип идентификационного номера</span>}
                  icon={true}
                  type={"copy"}
                  width={314}
                  value={value.kzIdNumberType}
                  onChange={handleChange("kzIdNumberType")}
                />
                <PaymentDocumentInput
                  title={<span>Идентификационный номер</span>}
                  icon={false}
                  type={"copy"}
                  width={314}
                  value={value.kzIdNumber}
                  onChange={handleChange("kzIdNumber")}
                />
              </Group>
            </>
          </ChildrenPanel>
          <Group>
            <ChildrenPanel
              title={"Идентификация организации: Плательщик"}
              customWidth={314}
            >
              <Group>
                <PaymentDocumentInput
                  width={149}
                  title={<span>LEI</span>}
                  type={"copy"}
                  icon={false}
                  value={value.payerLei}
                  onChange={handleChange("payerLei")}
                />
                <PaymentDocumentInput
                  width={149}
                  title={<span>БИК</span>}
                  type={"copy"}
                  icon={false}
                  value={value.payerBic}
                  onChange={handleChange("payerBic")}
                />
              </Group>
            </ChildrenPanel>
            <ChildrenPanel
              title={"Идентификация организации: Бенефициар"}
              customWidth={314}
            >
              <Group>
                <PaymentDocumentInput
                  width={149}
                  title={<span>LEI</span>}
                  type={"copy"}
                  icon={false}
                  value={value.beneficiaryLei}
                  onChange={handleChange("beneficiaryLei")}
                />
                <PaymentDocumentInput
                  width={149}
                  title={<span>БИК</span>}
                  type={"copy"}
                  icon={false}
                  value={value.beneficiaryBic}
                  onChange={handleChange("beneficiaryBic")}
                />
              </Group>
            </ChildrenPanel>
          </Group>
        </div>
      </Tabs.Panel>
    </>
  );
};

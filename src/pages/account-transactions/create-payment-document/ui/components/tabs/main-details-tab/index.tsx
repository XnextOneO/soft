import { FC } from "react";
import { Checkbox, Group, Radio, RadioGroup, Stack, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { PaymentMainFormState } from "@pages/account-transactions/create-payment-document/ui/types";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

type MainDetailsTabProperties = {
  value: PaymentMainFormState;
  onChange: (patch: Partial<PaymentMainFormState>) => void;
  errors?: Record<string, string>;
};

export const MainDetailsTab: FC<MainDetailsTabProperties> = ({
  value,
  onChange,
}) => {
  const handleChange =
    (field: keyof PaymentMainFormState) =>
    (nextValue: string): void => {
      onChange({ [field]: nextValue });
    };

  const handleCheckboxChange =
    (field: keyof PaymentMainFormState) =>
    (event: { currentTarget: { checked: boolean } }): void => {
      onChange({ [field]: event.currentTarget.checked });
    };

  const chargeBearerType = value.signChargeBearerType || "OUR";

  return (
    <Tabs.Panel value="main-details" pl={16}>
      <div className={styles.content}>
        <ChildrenPanel title={"Основные реквизиты"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={100}
                title={<span>Вид документа</span>}
                type={"copy"}
                icon={true}
                rightText={"ПЛАТЕЖНОЕ ПОРУЧЕНИЕ"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>№ документа</span>}
                type={"copy"}
                icon={false}
                value={value.documentNumber}
                onChange={handleChange("documentNumber")}
              />
              <PaymentDocumentInput
                width={275}
                icon={false}
                title={<span>Дата документа</span>}
                type={"date"}
                value={value.documentDate}
                onChange={handleChange("documentDate")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Сумма и валюта"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={228}
                title={<span>Валюта</span>}
                type={"copy"}
                icon={true}
                value={value.transactionCurrency}
                onChange={handleChange("transactionCurrency")}
              />
              <PaymentDocumentInput
                width={400}
                title={<span>Курс валюты</span>}
                type={"copy"}
                icon={false}
                value={value.currencyExchangeRate}
                onChange={handleChange("currencyExchangeRate")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>Сумма</span>}
                icon={false}
                type={"copy"}
                value={value.transactionAmount}
                onChange={handleChange("transactionAmount")}
              />
              <PaymentDocumentInput
                width={400}
                title={<span>Сумма прописью</span>}
                icon={false}
                type={"text"}
                value={value.transactionAmountInWords}
                onChange={handleChange("transactionAmountInWords")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>Сумма комиссии</span>}
                icon={false}
                type={"copy"}
                value={value.transactionCommissionAmount}
                onChange={handleChange("transactionCommissionAmount")}
              />
              <PaymentDocumentInput
                width={275}
                title={<span>Признак срочности</span>}
                icon={false}
                type={"copy"}
                value={value.priority}
                onChange={handleChange("priority")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Плательщик"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна банка</span>}
                icon={true}
                type={"copy"}
                value={value.payerBankCountryAlphaCode}
                onChange={handleChange("payerBankCountryAlphaCode")}
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
                rightText={'Г. МИНСК, ОАО "АСБ БЕЛАРУСБАНК"'}
                value={value.payerBic}
                onChange={handleChange("payerBic")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={400}
                title={<span>№ счета</span>}
                icon={true}
                type={"select"}
                value={value.payerAccount}
                onChange={handleChange("payerAccount")}
              />
              <PaymentDocumentInput
                width={118}
                title={<span>Валюта счета</span>}
                icon={true}
                type={"copy"}
                value={value.payerCurrency}
                onChange={handleChange("payerCurrency")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={118}
                title={<span>Деловой партнер</span>}
                icon={true}
                type={"copy"}
                rightText={"ИП Иванов Иван Иванович"}
                value={value.payerName}
                onChange={handleChange("payerName")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Данные плательщика"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={100}
                title={
                  <span>
                    Страна <br /> регистрации
                  </span>
                }
                icon={true}
                type={"copy"}
                value={value.payerDataRegCountry}
                onChange={handleChange("payerDataRegCountry")}
              />
              <PaymentDocumentInput
                width={119}
                title={
                  <span>
                    Идентификационный
                    <br /> номер
                  </span>
                }
                icon={false}
                type={"copy"}
                value={value.payerDataIdentificationNumber}
                onChange={handleChange("payerDataIdentificationNumber")}
              />
              <PaymentDocumentInput
                width={369}
                title={<span>Наименование фактическое</span>}
                icon={false}
                type={"copy"}
                value={value.payerDataActualName}
                onChange={handleChange("payerDataActualName")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна</span>}
                icon={true}
                type={"copy"}
                value={value.payerDataCountry}
                onChange={handleChange("payerDataCountry")}
              />
              <PaymentDocumentInput
                width={528}
                title={<span>Населенный пункт</span>}
                icon={true}
                type={"copy"}
                value={value.payerDataSettlementName}
                onChange={handleChange("payerDataSettlementName")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Адрес</span>}
                icon={false}
                type={"copy"}
                value={value.payerDataAddress}
                onChange={handleChange("payerDataAddress")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Бенефициар"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна банка</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryBankCountryAlphaCode}
                onChange={handleChange("beneficiaryBankCountryAlphaCode")}
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryBic}
                onChange={handleChange("beneficiaryBic")}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiarySwiftCode}
                onChange={handleChange("beneficiarySwiftCode")}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета Банка получателя</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiaryBankAccount}
                onChange={handleChange("beneficiaryBankAccount")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка получателя</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiaryBankName}
                onChange={handleChange("beneficiaryBankName")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryAccount}
                onChange={handleChange("beneficiaryAccount")}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>Валюта счета</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryCurrency}
                onChange={handleChange("beneficiaryCurrency")}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>Сумма в валюте получателя</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiaryAmount}
                onChange={handleChange("beneficiaryAmount")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Данные бенефициара"}>
          <>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={100}
                title={
                  <span>
                    Страна <br />
                    Регигистрации
                  </span>
                }
                icon={true}
                type={"copy"}
                value={value.beneficiaryCountry}
                onChange={handleChange("beneficiaryCountry")}
              />
              <PaymentDocumentInput
                width={143}
                title={
                  <span>
                    Идентификационный <br /> Номер
                  </span>
                }
                icon={false}
                type={"copy"}
                value={value.beneficiaryIdentificationNumber}
                onChange={handleChange("beneficiaryIdentificationNumber")}
              />
              <PaymentDocumentInput
                width={369}
                title={<span>Наименование фактическое</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiaryName}
                onChange={handleChange("beneficiaryName")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryDataCountry}
                onChange={handleChange("beneficiaryDataCountry")}
              />
              <PaymentDocumentInput
                width={528}
                title={<span>Населенный пункт</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiarySettlementName}
                onChange={handleChange("beneficiarySettlementName")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Адрес</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiaryAddress}
                onChange={handleChange("beneficiaryAddress")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Назначение платежа"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Назначение платежа</span>}
                icon={false}
                type={"copy"}
                value={value.paymentDescription}
                onChange={handleChange("paymentDescription")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={203}
                title={<span>УНП плательщика</span>}
                icon={false}
                type={"copy"}
                value={value.payerUnp}
                onChange={handleChange("payerUnp")}
              />
              <PaymentDocumentInput
                width={203}
                title={<span>УНП получателя</span>}
                icon={false}
                type={"copy"}
                value={value.beneficiaryUnp}
                onChange={handleChange("beneficiaryUnp")}
              />
              <PaymentDocumentInput
                width={203}
                title={<span>УНП 3-го лица</span>}
                icon={false}
                type={"copy"}
                value={value.thirdPartyUnp}
                onChange={handleChange("thirdPartyUnp")}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={100}
                title={<span>Код платежа</span>}
                icon={true}
                type={"copy"}
                value={value.paymentCode}
                onChange={handleChange("paymentCode")}
              />
              <PaymentDocumentInput
                width={87}
                title={<span>Очередность</span>}
                icon={true}
                type={"copy"}
                value={value.paymentPriorityCode}
                onChange={handleChange("paymentPriorityCode")}
              />
              <PaymentDocumentInput
                width={117}
                title={
                  <span>
                    Код валютной <br /> операции
                  </span>
                }
                icon={true}
                type={"copy"}
                value={value.currencyOperationCode}
                onChange={handleChange("currencyOperationCode")}
              />
              <PaymentDocumentInput
                width={134}
                title={<span>Вид операции дебет</span>}
                icon={true}
                type={"copy"}
                value={value.dtOperationType}
                onChange={handleChange("dtOperationType")}
              />
              <PaymentDocumentInput
                width={142}
                title={<span>Вид операции кредит</span>}
                icon={true}
                type={"copy"}
                value={value.ktOperationType}
                onChange={handleChange("ktOperationType")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Корреспондент банка-бенефициара"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна банка</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryCorrespondentBankCountry}
                onChange={handleChange("beneficiaryCorrespondentBankCountry")}
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryCorrespondentBankBic}
                onChange={handleChange("beneficiaryCorrespondentBankBic")}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryCorrespondentBankSwiftCode}
                onChange={handleChange("beneficiaryCorrespondentBankSwiftCode")}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryCorrespondentBankAccount}
                onChange={handleChange("beneficiaryCorrespondentBankAccount")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка</span>}
                icon={true}
                type={"copy"}
                value={value.beneficiaryCorrespondentBankName}
                onChange={handleChange("beneficiaryCorrespondentBankName")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Корреспондент банка-отправителя"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна банка</span>}
                icon={true}
                type={"copy"}
                value={value.senderCorrespondentBankCountry}
                onChange={handleChange("senderCorrespondentBankCountry")}
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
                value={value.senderCorrespondentBankBic}
                onChange={handleChange("senderCorrespondentBankBic")}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
                value={value.senderCorrespondentBankSwiftCode}
                onChange={handleChange("senderCorrespondentBankSwiftCode")}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
                value={value.senderCorrespondentBankAccount}
                onChange={handleChange("senderCorrespondentBankAccount")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка</span>}
                icon={true}
                type={"copy"}
                value={value.senderCorrespondentBankName}
                onChange={handleChange("senderCorrespondentBankName")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Банк-посредник для банка-корреспондента"}>
          <>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна банка</span>}
                icon={true}
                type={"copy"}
                value={value.intermediaryBankCountry}
                onChange={handleChange("intermediaryBankCountry")}
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
                value={value.intermediaryBankBic}
                onChange={handleChange("intermediaryBankBic")}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
                value={value.intermediaryBankSwiftCode}
                onChange={handleChange("intermediaryBankSwiftCode")}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
                value={value.intermediaryBankAccount}
                onChange={handleChange("intermediaryBankAccount")}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка</span>}
                icon={true}
                type={"copy"}
                value={value.intermediaryBankName}
                onChange={handleChange("intermediaryBankName")}
              />
            </Group>
          </>
        </ChildrenPanel>
        <ChildrenPanel title={"Признаки"}>
          <>
            <span style={{ paddingTop: "8px", marginBottom: "-8px" }}>
              Расходы по переводу
            </span>
            <RadioGroup
              value={chargeBearerType}
              onChange={handleChange("signChargeBearerType")}
              required
            >
              <Group mt={8}>
                <Radio value="OUR" label="Плательщик (OUR)" />
                <Radio value="FRE" label="Не взимается (FRE)" />
                <Radio value="SHA" label="Плательщик/Бенефициар (SHA)" />
              </Group>
              <Group mt={8}>
                <Radio value="BEN" label="Бенефициар (BEN)" />
                <Radio value="OUROUR" label="Гарант (OUROUR)" />
              </Group>
            </RadioGroup>
            <Group>
              <PaymentDocumentInput
                width={322}
                title={<span>Счет комиссии</span>}
                icon={true}
                type={"copy"}
                value={value.signCommissionAccount}
                onChange={handleChange("signCommissionAccount")}
              />
              <PaymentDocumentInput
                width={120}
                title={<span>Валюта комиссии</span>}
                icon={true}
                type={"copy"}
                value={value.signCommissionCurrency}
                onChange={handleChange("signCommissionCurrency")}
              />
              <PaymentDocumentInput
                width={170}
                title={<span>Дата оказания услуги</span>}
                icon={true}
                type={"copy"}
                value={value.signCommissionDate}
                onChange={handleChange("signCommissionDate")}
              />
            </Group>
            <Group mt={8} align={"start"} gap={50}>
              <Stack>
                <Checkbox
                  label="Игнорировать блокир"
                  checked={value.signIgnoreAccountLock}
                  onChange={handleCheckboxChange("signIgnoreAccountLock")}
                />
                <Checkbox
                  label="Не формировать MT в SWIFT"
                  checked={value.signSuppressSwiftMtGeneration}
                  onChange={handleCheckboxChange(
                    "signSuppressSwiftMtGeneration",
                  )}
                />
                <Checkbox
                  label="Платеж в счет забронированной суммы"
                  disabled
                  checked={value.signPayFromReservedFunds}
                  onChange={handleCheckboxChange("signPayFromReservedFunds")}
                />
                <Checkbox
                  label="Без комиссии"
                  checked={value.signNoCommission}
                  onChange={handleCheckboxChange("signNoCommission")}
                />
              </Stack>
              <PaymentDocumentInput
                type={"copy"}
                width={306}
                icon={false}
                title={<span>Дополнительный параметр</span>}
                value={value.additionalParameter}
                onChange={handleChange("additionalParameter")}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

import { FC, useState } from "react";
import { Checkbox, Group, Radio, RadioGroup, Stack, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

export const MainDetailsTab: FC = () => {
  // eslint-disable-next-line unicorn/no-null
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
              />
              <PaymentDocumentInput
                width={275}
                title={<span>Дата документа</span>}
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
                title={<span>Валюта</span>}
                type={"copy"}
                icon={true}
              />
              <PaymentDocumentInput
                width={400}
                title={<span>Курс валюты</span>}
                type={"copy"}
                icon={false}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>Сумма</span>}
                icon={false}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={400}
                title={<span>Сумма прописью</span>}
                icon={false}
                type={"text"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>Сумма комиссии</span>}
                icon={false}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={275}
                title={<span>Признак срочности</span>}
                icon={false}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
                rightText={"Г. МИНСК, ОАО “АСБ БЕЛАРУСБАНК”"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={400}
                title={<span>№ счета</span>}
                icon={true}
                type={"select"}
              />
              <PaymentDocumentInput
                width={118}
                title={<span>Валюта счета</span>}
                icon={true}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={118}
                title={<span>Деловой партнер</span>}
                icon={true}
                type={"copy"}
                rightText={"ИП Иванов Иван Иванович"}
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
              />
              <PaymentDocumentInput
                width={369}
                title={<span>Наименование фактическое</span>}
                icon={false}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={528}
                title={<span>Населенный пункт</span>}
                icon={true}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Адрес</span>}
                icon={false}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета Банка получателя</span>}
                icon={false}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка получателя</span>}
                icon={false}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>Валюта счета</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>Сумма в валюте получателя</span>}
                icon={false}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={369}
                title={<span>Наименование фактическое</span>}
                icon={false}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={100}
                title={<span>Страна</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={528}
                title={<span>Населенный пункт</span>}
                icon={false}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Адрес</span>}
                icon={false}
                type={"copy"}
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
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={203}
                title={<span>УНП плательщика</span>}
                icon={false}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={203}
                title={<span>УНП получателя</span>}
                icon={false}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={203}
                title={<span>УНП 3-го лица</span>}
                icon={false}
                type={"copy"}
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={100}
                title={<span>Код платежа</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={87}
                title={<span>Очередность</span>}
                icon={true}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={134}
                title={<span>Вид операции дебет</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={142}
                title={<span>Вид операции кредит</span>}
                icon={true}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка</span>}
                icon={true}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка</span>}
                icon={true}
                type={"copy"}
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
              />
              <PaymentDocumentInput
                width={112}
                title={<span>Код банка</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={156}
                title={<span>SWIFT-код</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={228}
                title={<span>№ счета</span>}
                icon={true}
                type={"copy"}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={644}
                title={<span>Наименование банка</span>}
                icon={true}
                type={"copy"}
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
              value={selectedValue}
              onChange={setSelectedValue}
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
              />
              <PaymentDocumentInput
                width={120}
                title={<span>Валюта комиссии</span>}
                icon={true}
                type={"copy"}
              />
              <PaymentDocumentInput
                width={170}
                title={<span>Дата оказания услуги</span>}
                icon={true}
                type={"copy"}
              />
            </Group>
            <Group mt={8} align={"start"} gap={50}>
              <Stack>
                <Checkbox label="Игнорировать блокир" />
                <Checkbox label="Не формировать MT в SWIFT" />
                <Checkbox
                  label="Платеж в счет забронированной суммы"
                  disabled
                />
                <Checkbox label="Без комиссии" />
              </Stack>
              <PaymentDocumentInput
                type={"copy"}
                width={306}
                icon={false}
                title={<span>Дополнительный параметр</span>}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

import { FC } from "react";
import { Group, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/create-payment-document/ui/components/payment-document-input/payement-document-input.tsx";
import styles from "@pages/create-payment-document/ui/index.module.scss";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

export const AutomaticDetailsTab: FC = () => {
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
              />
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата исполнения платежного документа</span>}
              />
            </Group>
            <Group>
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата валютирования по дебету</span>}
              />
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата валютирования по кредиту</span>}
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
              />
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"date"}
                title={<span>Дата расчетного документа</span>}
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
              />
              <span style={{ marginBottom: "4px" }}>Клиент-банк</span>
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={314}
                icon={true}
                type={"copy"}
                title={<span>Способ платежа</span>}
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
              />
              <PaymentDocumentInput
                width={177}
                icon={false}
                type={"copy"}
                title={<span>Связанный референс (21:)</span>}
              />
            </Group>
            <PaymentDocumentInput
              width={644}
              icon={true}
              type={"dropdown"}
              title={<span>Тип исходного сообщения</span>}
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
            />
            <PaymentDocumentInput
              width={149}
              icon={false}
              type={"copy"}
              title={<span>Вид платежа</span>}
            />
            <PaymentDocumentInput
              width={149}
              icon={false}
              type={"copy"}
              title={<span>Детали расходов</span>}
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
              />
              <PaymentDocumentInput
                width={231.5}
                icon={false}
                type={"copy"}
                title={<span>Код назначения платежа (цифр)</span>}
              />
              <PaymentDocumentInput
                width={149}
                icon={true}
                type={"copy"}
                title={<span>Признак платежа</span>}
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
              />
              <PaymentDocumentInput
                width={127}
                icon={true}
                type={"copy"}
                title={<span>Тип MX-сообщения</span>}
              />
              <PaymentDocumentInput width={58} icon={true} type={"copy"} />
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
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={643}
                icon={false}
                type={"copy"}
                title={<span>Орган, выдавший документ</span>}
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
              />
            </Group>
            <Group align={"end"}>
              <PaymentDocumentInput
                width={643}
                icon={false}
                type={"copy"}
                title={<span>Орган, выдавший документ</span>}
              />
            </Group>
          </>
        </ChildrenPanel>
      </div>
    </Tabs.Panel>
  );
};

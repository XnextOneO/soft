import { FC } from "react";
import { Group, Tabs } from "@mantine/core";
import { PaymentDocumentInput } from "@pages/account-transactions/create-payment-document/ui/components/payment-document-input/payment-document-input.tsx";
import styles from "@pages/account-transactions/create-payment-document/ui/index.module.scss";
import { ChildrenPanel } from "@shared/components/ChildrenPanel";

export const RfKzIndiaTab: FC = () => {
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
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={314}
                  title={<span>Код основного налогового плательщика</span>}
                  icon={true}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>Код выплат</span>}
                  icon={true}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>КПП получателя</span>}
                  icon={false}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={314}
                  title={<span>Уникальный идентификатор платежа</span>}
                  icon={false}
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  type={"copy"}
                  width={314}
                  title={<span>Код бюджетной классификации</span>}
                  icon={false}
                />
                <PaymentDocumentInput
                  type={"copy"}
                  width={149}
                  title={<span>Код ОКТМО</span>}
                  icon={false}
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
                />
                <PaymentDocumentInput
                  title={<span>Код бенефициара</span>}
                  icon={true}
                  type={"copy"}
                  width={149}
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
                />
              </Group>
              <Group>
                <PaymentDocumentInput
                  title={<span>Тип идентификационного номера</span>}
                  icon={true}
                  type={"copy"}
                  width={314}
                />
                <PaymentDocumentInput
                  title={<span>Идентификационный номер</span>}
                  icon={false}
                  type={"copy"}
                  width={314}
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
                />
                <PaymentDocumentInput
                  width={149}
                  title={<span>БИК</span>}
                  type={"copy"}
                  icon={false}
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
                />
                <PaymentDocumentInput
                  width={149}
                  title={<span>БИК</span>}
                  type={"copy"}
                  icon={false}
                />
              </Group>
            </ChildrenPanel>
          </Group>
        </div>
      </Tabs.Panel>
    </>
  );
};

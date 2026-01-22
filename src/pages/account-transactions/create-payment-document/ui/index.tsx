import { FC, useCallback, useState } from "react";
import { Button, Tabs } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MainDetailsTab } from "@pages/account-transactions/create-payment-document/ui/components/tabs/main-details-tab";
import { mapStateToPayload } from "@pages/account-transactions/create-payment-document/ui/map-state-to-payload";
import {
  createInitialPaymentFormState,
  PaymentFormState,
} from "@pages/account-transactions/create-payment-document/ui/types";
import { checkPaymentInstruction } from "@shared/api/mutation/account-transactions-api.ts";
import { useMutation } from "@tanstack/react-query";

import { AdministrativeDataTab } from "./components/tabs/administrative-data-tab";
import { AutomaticDetailsTab } from "./components/tabs/automatic-details-tab";
import { PaymentDetailsTab } from "./components/tabs/payment-details-tab";
import { RfKzIndiaTab } from "./components/tabs/rf-kz-india-tab";
import styles from "./index.module.scss";

export const CreatePaymentDocument: FC = () => {
  const [form, setForm] = useState<PaymentFormState>(
    createInitialPaymentFormState(),
  );

  const setPaymentMain = useCallback(
    (patch: Partial<PaymentFormState["paymentMain"]>) => {
      setForm((s) => ({ ...s, paymentMain: { ...s.paymentMain, ...patch } }));
    },
    [],
  );

  const setPaymentDetails = useCallback(
    (patch: Partial<PaymentFormState["paymentDetails"]>) => {
      setForm((s) => ({
        ...s,
        paymentDetails: { ...s.paymentDetails, ...patch },
      }));
    },
    [],
  );

  const setAutoDetails = useCallback(
    (patch: Partial<PaymentFormState["autoPaymentDetails"]>) => {
      setForm((s) => ({
        ...s,
        autoPaymentDetails: { ...s.autoPaymentDetails, ...patch },
      }));
    },
    [],
  );

  const setRfKzIndia = useCallback(
    (patch: Partial<PaymentFormState["paymentRuKzIn"]>) => {
      setForm((s) => ({
        ...s,
        paymentRuKzIn: { ...s.paymentRuKzIn, ...patch },
      }));
    },
    [],
  );

  const setAdministrativeData = useCallback(
    (patch: Partial<PaymentFormState["administrativeData"]>) => {
      setForm((s) => ({
        ...s,
        administrativeData: { ...s.administrativeData, ...patch },
      }));
    },
    [],
  );

  const mutation = useMutation({
    mutationFn: async (payload: PaymentFormState) => {
      const dto = mapStateToPayload(payload);
      return await checkPaymentInstruction(dto);
    },
    onSuccess: (data) => {
      // postPaymentInstruction показывает уведомления сам, но можно обработать data здесь
      if (data && data.error === true) {
        // если вернулись field errors — покажем краткое уведомление
        notifications.show({
          title: "Ошибка в полях",
          message: "Проверьте помеченные ошибки на форме.",
          color: "red",
        });
      }
    },
    onError: () => {
      // postPaymentInstruction уже показывает ошибки, но дублируем минимально
      notifications.show({
        title: "Ошибка",
        message: "Не удалось выполнить проверку.",
        color: "red",
      });
    },
  });

  const onCheck = async (): Promise<void> => {
    mutation.mutate(form);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Button w={100} h={30} p={0} radius="xs" color="#007458">
          Провести
        </Button>
        <Button w={100} h={30} p={0} radius="xs" color="#007458">
          Отложить
        </Button>
        <Button
          w={100}
          h={30}
          p={0}
          radius="xs"
          color="#007458"
          onClick={onCheck}
        >
          Проверить
        </Button>
      </div>

      <Tabs defaultValue="main-details">
        <Tabs.List>
          <Tabs.Tab value="main-details">Основные реквизиты</Tabs.Tab>
          <Tabs.Tab value="payment-details">Детали платежа</Tabs.Tab>
          <Tabs.Tab value="rf-kz-india">
            Платежи в РФ, Казахстан и Индию
          </Tabs.Tab>
          <Tabs.Tab value="automatic-details">
            Автоматические реквизиты
          </Tabs.Tab>
          <Tabs.Tab value="administrative-data">
            Административные данные
          </Tabs.Tab>
        </Tabs.List>

        {/* Важно: передаём value и onChange во все табы */}
        <MainDetailsTab value={form.paymentMain} onChange={setPaymentMain} />
        <PaymentDetailsTab
          value={form.paymentDetails}
          onChange={setPaymentDetails}
        />
        <RfKzIndiaTab value={form.paymentRuKzIn} onChange={setRfKzIndia} />
        <AutomaticDetailsTab
          value={form.autoPaymentDetails}
          onChange={setAutoDetails}
        />
        <AdministrativeDataTab
          value={form.administrativeData}
          onChange={setAdministrativeData}
        />
      </Tabs>
    </div>
  );
};

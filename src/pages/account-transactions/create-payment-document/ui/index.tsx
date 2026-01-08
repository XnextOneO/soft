import { FC, useCallback, useState } from "react";
import { Button, Tabs } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MainDetailsTab } from "@pages/account-transactions/create-payment-document/ui/components/tabs/main-details-tab";
import { postPaymentInstruction } from "@shared/api/mutation/account-transactions-api.ts";
import { useMutation } from "@tanstack/react-query";

import { AdministrativeDataTab } from "./components/tabs/administrative-data-tab";
import { AutomaticDetailsTab } from "./components/tabs/automatic-details-tab";
import { PaymentDetailsTab } from "./components/tabs/payment-details-tab";
import { RfKzIndiaTab } from "./components/tabs/rf-kz-india-tab";
import styles from "./index.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PartialAny = Record<string, any>;

export const CreatePaymentDocument: FC = () => {
  const [form, setForm] = useState({
    mainDetails: {} as PartialAny,
    paymentDetails: {} as PartialAny,
    autoDetails: {} as PartialAny,
    rfKzIndia: {} as PartialAny,
    administrativeData: {} as PartialAny,
  });

  const setMainDetails = useCallback((patch: PartialAny) => {
    console.log("setMainDetails patch:", patch);
    setForm((s) => ({ ...s, mainDetails: { ...s.mainDetails, ...patch } }));
  }, []);

  const mutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (payload: any) => {
      return await postPaymentInstruction(payload);
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
    const payload = {
      ...form.mainDetails,
      paymentDetails: { ...form.paymentDetails },
      autoPaymentDetails: { ...form.autoDetails },
      paymentRuKzIn: { ...form.rfKzIndia },
      administrativeData: {
        paymentOrderId: form.administrativeData?.paymentOrderId ?? "",
        creator: form.administrativeData?.creator ?? "",
        editor: form.administrativeData?.editor ?? "",
        unlocker: form.administrativeData?.unlocker ?? "",
        messageId: form.administrativeData?.messageId ?? "",
        instructionId: form.administrativeData?.instructionId ?? "",
        endToEndId: form.administrativeData?.endToEndId ?? "",
        uetr: form.administrativeData?.uetr ?? "",
        status: form.administrativeData?.status ?? "POSTED",
      },
    };

    console.log("Payload to send:", payload);
    mutation.mutate(payload);
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
        <MainDetailsTab value={form.mainDetails} onChange={setMainDetails} />
        <PaymentDetailsTab />
        <RfKzIndiaTab />
        <AutomaticDetailsTab />
        <AdministrativeDataTab />
      </Tabs>
    </div>
  );
};

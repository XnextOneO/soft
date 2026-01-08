import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

import { $authHost } from "../index";

export interface MainDetailsPayload {
  documentNumber: string;
  documentDate: string; // YYYY-MM-DD
  transactionCurrency: string;
  currencyExchangeRate?: number;
  transactionAmount: number;
  transactionAmountInWords?: string;
  transactionCommissionAmount?: number;
  priority?: string;
  payerBankCountryAlphaCode?: string;
  payerBic?: string;
  payerAccount?: string;
  payerCurrency?: string;
  payerName?: string;
  payerDataRegCountry?: string;
  payerDataIdentificationNumber?: string;
  payerDataActualName?: string;
  payerDataCountry?: string;
  payerDataSettlementName?: string;
  payerDataAddress?: string;
  beneficiaryBankCountryAlphaCode?: string;
  beneficiaryBic?: string;
  beneficiarySwiftCode?: string;
  beneficiaryBankAccount?: string;
  beneficiaryBankName?: string;
  beneficiaryAccount?: string;
  beneficiaryCurrency?: string;
  beneficiaryAmount?: number;
  beneficiaryName?: string;
  paymentDescription?: string;
  payerUnp?: string;
  beneficiaryUnp?: string;
  thirdPartyUnp?: string;
  paymentCode?: number;
  paymentPriorityCode?: number;
  currencyOperationCode?: string;
  dtOperationType?: string;
  ktOperationType?: string;
  beneficiaryCorrespondentBankCountry?: string;
  beneficiaryCorrespondentBankBic?: string;
  beneficiaryCorrespondentBankSwiftCode?: string;
  beneficiaryCorrespondentBankAccount?: string;
  beneficiaryCorrespondentBankName?: string;
  senderCorrespondentBankCountry?: string;
  senderCorrespondentBankBic?: string;
  senderCorrespondentBankSwiftCode?: string;
  senderCorrespondentBankAccount?: string;
  senderCorrespondentBankName?: string;
  intermediaryBankCountry?: string;
  intermediaryBankBic?: string;
  intermediaryBankSwiftCode?: string;
  intermediaryBankAccount?: string;
  intermediaryBankName?: string;
  signChargeBearerType?: "OUR" | "FRE" | "SHA" | "BEN" | "OUROUR";
  signCommissionAccount?: string;
  signCommissionCurrency?: string;
  signCommissionDate?: string;
  signIgnoreAccountLock?: boolean;
  signSuppressSwiftMtGeneration?: boolean;
  signPayFromReservedFunds?: boolean;
  signNoCommission?: boolean;
  administrativeData: {
    paymentOrderId: string;
    creator: string;
    editor: string;
    unlocker: string;
    messageId: string;
    instructionId: string;
    endToEndId: string;
    uetr: string;
    status: string;
  };
}

// eslint-disable-next-line complexity
export const postPaymentInstruction = async (
  payload: MainDetailsPayload,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  // Собираем финальное тело — добавляем/нормализуем поля по API
  const body = {
    // id опускаем — бэк создаст
    documentType: 13,
    documentNumber: payload.documentNumber,
    documentDate: payload.documentDate,
    transactionCurrency: payload.transactionCurrency,
    transactionAmount: Number(payload.transactionAmount),
    transactionAmountInWords: payload.transactionAmountInWords || "",
    currencyExchangeRate: payload.currencyExchangeRate
      ? Number(payload.currencyExchangeRate)
      : 0,
    transactionCommissionAmount: payload.transactionCommissionAmount
      ? Number(payload.transactionCommissionAmount)
      : 0,
    priority: payload.priority || "NORM",
    payerBankCountryAlphaCode: payload.payerBankCountryAlphaCode || "",
    payerBic: payload.payerBic || "",
    payerAccount: payload.payerAccount || "",
    payerCurrency: payload.payerCurrency || "",
    payerName: payload.payerName || "",
    payerDataRegCountry: payload.payerDataRegCountry || "",
    payerDataIdentificationNumber: payload.payerDataIdentificationNumber || "",
    payerDataActualName: payload.payerDataActualName || "",
    payerDataCountry: payload.payerDataCountry || "",
    payerDataSettlementName: payload.payerDataSettlementName || "",
    payerDataAddress: payload.payerDataAddress || "",
    beneficiaryBankCountryAlphaCode:
      payload.beneficiaryBankCountryAlphaCode || "",
    beneficiaryBic: payload.beneficiaryBic || "",
    beneficiarySwiftCode: payload.beneficiarySwiftCode || "",
    beneficiaryBankAccount: payload.beneficiaryBankAccount || "",
    beneficiaryBankName: payload.beneficiaryBankName || "",
    beneficiaryAccount: payload.beneficiaryAccount || "",
    beneficiaryCurrency: payload.beneficiaryCurrency || "",
    beneficiaryAmount: payload.beneficiaryAmount
      ? Number(payload.beneficiaryAmount)
      : 0,
    beneficiaryName: payload.beneficiaryName || "",
    paymentDescription: payload.paymentDescription || "",
    payerUnp: payload.payerUnp || "",
    beneficiaryUnp: payload.beneficiaryUnp || "",
    thirdPartyUnp: payload.thirdPartyUnp || "",
    paymentCode: payload.paymentCode ?? 0,
    paymentPriorityCode: payload.paymentPriorityCode ?? 0,
    currencyOperationCode: payload.currencyOperationCode || "",
    dtOperationType: payload.dtOperationType || "",
    ktOperationType: payload.ktOperationType || "",
    beneficiaryCorrespondentBankCountry:
      payload.beneficiaryCorrespondentBankCountry || "",
    beneficiaryCorrespondentBankBic:
      payload.beneficiaryCorrespondentBankBic || "",
    beneficiaryCorrespondentBankSwiftCode:
      payload.beneficiaryCorrespondentBankSwiftCode || "",
    beneficiaryCorrespondentBankAccount:
      payload.beneficiaryCorrespondentBankAccount || "",
    beneficiaryCorrespondentBankName:
      payload.beneficiaryCorrespondentBankName || "",
    senderCorrespondentBankCountry:
      payload.senderCorrespondentBankCountry || "",
    senderCorrespondentBankBic: payload.senderCorrespondentBankBic || "",
    senderCorrespondentBankSwiftCode:
      payload.senderCorrespondentBankSwiftCode || "",
    senderCorrespondentBankAccount:
      payload.senderCorrespondentBankAccount || "",
    senderCorrespondentBankName: payload.senderCorrespondentBankName || "",
    intermediaryBankCountry: payload.intermediaryBankCountry || "",
    intermediaryBankBic: payload.intermediaryBankBic || "",
    intermediaryBankSwiftCode: payload.intermediaryBankSwiftCode || "",
    intermediaryBankAccount: payload.intermediaryBankAccount || "",
    intermediaryBankName: payload.intermediaryBankName || "",
    signChargeBearerType: payload.signChargeBearerType || "OUR",
    signCommissionAccount: payload.signCommissionAccount || "",
    signCommissionCurrency: payload.signCommissionCurrency || "",
    signCommissionDate: payload.signCommissionDate || "",
    signIgnoreAccountLock: !!payload.signIgnoreAccountLock,
    signSuppressSwiftMtGeneration: !!payload.signSuppressSwiftMtGeneration,
    signPayFromReservedFunds: !!payload.signPayFromReservedFunds,
    signNoCommission: !!payload.signNoCommission,
    administrativeData: payload.administrativeData || {},
  };

  try {
    const response = await $authHost.post("/payment/payment-instruction", body);
    notifications.show({
      title: "Успех",
      message: "Платеж создан успешно",
      color: "green",
      autoClose: 5000,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.message ||
        "Произошла ошибка при создании платежа";
      notifications.show({
        title: "Ошибка",
        message,
        color: "red",
        autoClose: 7000,
      });
      // если есть детализированные ошибки по полям — вернём их для отображения в форме
      return {
        error: true,
        // eslint-disable-next-line unicorn/no-null
        details: error.response?.data || null,
      };
    }
    notifications.show({
      title: "Ошибка",
      message: "Неизвестная ошибка",
      color: "red",
      autoClose: 7000,
    });
    return { error: true };
  }
};

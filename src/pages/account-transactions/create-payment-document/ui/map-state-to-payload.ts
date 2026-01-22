import {
  AdministrativeDataDto,
  AutoPaymentDetailsDto,
  CheckPaymentInstructionPayload,
  PaymentDetailsDto,
  PaymentMainDto,
  PaymentRuKzInDto,
} from "@shared/api/mutation/account-transactions-api";

import { PaymentFormState } from "./types";

const normalizeString = (value?: string): string => value?.trim() || "";

const toNumber = (value?: string): number => {
  if (!value) {
    return 0;
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const formatDate = (value?: string): string => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().slice(0, 10);
};

const mapPaymentMain = (
  state: PaymentFormState["paymentMain"],
): PaymentMainDto => ({
  documentNumber: normalizeString(state.documentNumber),
  documentDate: formatDate(state.documentDate),
  transactionCurrency: normalizeString(state.transactionCurrency),
  currencyExchangeRate: toNumber(state.currencyExchangeRate),
  transactionAmount: toNumber(state.transactionAmount),
  transactionAmountInWords: normalizeString(state.transactionAmountInWords),
  transactionCommissionAmount: toNumber(state.transactionCommissionAmount),
  priority: normalizeString(state.priority || "NORM"),
  payerBankCountryAlphaCode: normalizeString(state.payerBankCountryAlphaCode),
  payerBic: normalizeString(state.payerBic),
  payerAccount: normalizeString(state.payerAccount),
  payerCurrency: normalizeString(state.payerCurrency),
  payerName: normalizeString(state.payerName),
  payerDataRegCountry: normalizeString(state.payerDataRegCountry),
  payerDataIdentificationNumber: normalizeString(
    state.payerDataIdentificationNumber,
  ),
  payerDataActualName: normalizeString(state.payerDataActualName),
  payerDataCountry: normalizeString(state.payerDataCountry),
  payerDataSettlementName: normalizeString(state.payerDataSettlementName),
  payerDataAddress: normalizeString(state.payerDataAddress),
  beneficiaryBankCountryAlphaCode: normalizeString(
    state.beneficiaryBankCountryAlphaCode,
  ),
  beneficiaryBic: normalizeString(state.beneficiaryBic),
  beneficiarySwiftCode: normalizeString(state.beneficiarySwiftCode),
  beneficiaryBankAccount: normalizeString(state.beneficiaryBankAccount),
  beneficiaryBankName: normalizeString(state.beneficiaryBankName),
  beneficiaryAccount: normalizeString(state.beneficiaryAccount),
  beneficiaryCurrency: normalizeString(state.beneficiaryCurrency),
  beneficiaryAmount: toNumber(state.beneficiaryAmount),
  beneficiaryName: normalizeString(state.beneficiaryName),
  beneficiaryCountry: normalizeString(state.beneficiaryCountry),
  beneficiaryIdentificationNumber: normalizeString(
    state.beneficiaryIdentificationNumber,
  ),
  beneficiaryDataCountry: normalizeString(state.beneficiaryDataCountry),
  beneficiarySettlementName: normalizeString(state.beneficiarySettlementName),
  beneficiaryAddress: normalizeString(state.beneficiaryAddress),
  paymentDescription: normalizeString(state.paymentDescription),
  payerUnp: normalizeString(state.payerUnp),
  beneficiaryUnp: normalizeString(state.beneficiaryUnp),
  thirdPartyUnp: normalizeString(state.thirdPartyUnp),
  paymentCode: toNumber(state.paymentCode),
  paymentPriorityCode: toNumber(state.paymentPriorityCode),
  currencyOperationCode: normalizeString(state.currencyOperationCode),
  dtOperationType: normalizeString(state.dtOperationType),
  ktOperationType: normalizeString(state.ktOperationType),
  beneficiaryCorrespondentBankCountry: normalizeString(
    state.beneficiaryCorrespondentBankCountry,
  ),
  beneficiaryCorrespondentBankBic: normalizeString(
    state.beneficiaryCorrespondentBankBic,
  ),
  beneficiaryCorrespondentBankSwiftCode: normalizeString(
    state.beneficiaryCorrespondentBankSwiftCode,
  ),
  beneficiaryCorrespondentBankAccount: normalizeString(
    state.beneficiaryCorrespondentBankAccount,
  ),
  beneficiaryCorrespondentBankName: normalizeString(
    state.beneficiaryCorrespondentBankName,
  ),
  senderCorrespondentBankCountry: normalizeString(
    state.senderCorrespondentBankCountry,
  ),
  senderCorrespondentBankBic: normalizeString(state.senderCorrespondentBankBic),
  senderCorrespondentBankSwiftCode: normalizeString(
    state.senderCorrespondentBankSwiftCode,
  ),
  senderCorrespondentBankAccount: normalizeString(
    state.senderCorrespondentBankAccount,
  ),
  senderCorrespondentBankName: normalizeString(
    state.senderCorrespondentBankName,
  ),
  intermediaryBankCountry: normalizeString(state.intermediaryBankCountry),
  intermediaryBankBic: normalizeString(state.intermediaryBankBic),
  intermediaryBankSwiftCode: normalizeString(state.intermediaryBankSwiftCode),
  intermediaryBankAccount: normalizeString(state.intermediaryBankAccount),
  intermediaryBankName: normalizeString(state.intermediaryBankName),
  signChargeBearerType: (state.signChargeBearerType ||
    "OUR") as PaymentMainDto["signChargeBearerType"],
  signCommissionAccount: normalizeString(state.signCommissionAccount),
  signCommissionCurrency: normalizeString(state.signCommissionCurrency),
  signCommissionDate: formatDate(state.signCommissionDate),
  signIgnoreAccountLock: !!state.signIgnoreAccountLock,
  signSuppressSwiftMtGeneration: !!state.signSuppressSwiftMtGeneration,
  signPayFromReservedFunds: !!state.signPayFromReservedFunds,
  signNoCommission: !!state.signNoCommission,
  additionalParameter: normalizeString(state.additionalParameter),
});

const mapPaymentDetails = (
  state: PaymentFormState["paymentDetails"],
): PaymentDetailsDto => ({
  description1: normalizeString(state.description1),
  description2: normalizeString(state.description2),
  description3: normalizeString(state.description3),
  description4: normalizeString(state.description4),
  description5: normalizeString(state.description5),
  vedDocumentNumber: normalizeString(state.vedDocumentNumber),
  tnVedCode: normalizeString(state.tnVedCode),
});

const mapAutoPaymentDetails = (
  state: PaymentFormState["autoPaymentDetails"],
): AutoPaymentDetailsDto => ({
  arrivalDateTime: formatDate(state.arrivalDateTime),
  executionDate: formatDate(state.executionDate),
  debitValueDate: formatDate(state.debitValueDate),
  creditValueDate: formatDate(state.creditValueDate),
  settlementDocumentNumber: normalizeString(state.settlementDocumentNumber),
  settlementDocumentDate: formatDate(state.settlementDocumentDate),
  representationMethod: normalizeString(state.representationMethod),
  paymentMethod: normalizeString(state.paymentMethod),
  reference20: normalizeString(state.reference20),
  reference21: normalizeString(state.reference21),
  sourceMessageType: normalizeString(state.sourceMessageType),
  bissOperationCode: normalizeString(state.bissOperationCode),
  bissPaymentType: normalizeString(state.bissPaymentType),
  bissExpenseDetails: normalizeString(state.bissExpenseDetails),
  isoPurposeCodeAlpha: normalizeString(state.isoPurposeCodeAlpha),
  isoPurposeCodeNumeric: normalizeString(state.isoPurposeCodeNumeric),
  isoPaymentType: normalizeString(state.isoPaymentType),
  isoTransferPriority: normalizeString(state.isoTransferPriority),
  isoProcessingPriority: normalizeString(state.isoProcessingPriority),
  isoPayerCommissionType: normalizeString(state.isoPayerCommissionType),
  isoMessageType: normalizeString(state.isoMessageType),
  isoSequenceType: normalizeString(state.isoSequenceType),
  payerDocumentCode: normalizeString(state.payerDocumentCode),
  payerDocumentSeriesAndNumber: normalizeString(
    state.payerDocumentSeriesAndNumber,
  ),
  payerDocumentIdNumber: normalizeString(state.payerDocumentIdNumber),
  payerDocumentIssueDate: formatDate(state.payerDocumentIssueDate),
  payerDocumentIssuer: normalizeString(state.payerDocumentIssuer),
  beneficiaryDocumentCode: normalizeString(state.beneficiaryDocumentCode),
  beneficiaryDocumentSeriesAndNumber: normalizeString(
    state.beneficiaryDocumentSeriesAndNumber,
  ),
  beneficiaryDocumentIdNumber: normalizeString(
    state.beneficiaryDocumentIdNumber,
  ),
  beneficiaryDocumentIssueDate: formatDate(state.beneficiaryDocumentIssueDate),
  beneficiaryDocumentIssuer: normalizeString(state.beneficiaryDocumentIssuer),
});

const mapPaymentRuKzIn = (
  state: PaymentFormState["paymentRuKzIn"],
): PaymentRuKzInDto => ({
  rfOperationCode: normalizeString(state.rfOperationCode),
  rfMainTaxPayerCode: normalizeString(state.rfMainTaxPayerCode),
  rfPaymentCode: normalizeString(state.rfPaymentCode),
  rfRecipientKpp: normalizeString(state.rfRecipientKpp),
  rfUniquePaymentId: normalizeString(state.rfUniquePaymentId),
  rfBudgetClassificationCode: normalizeString(state.rfBudgetClassificationCode),
  rfOktmoCode: normalizeString(state.rfOktmoCode),
  rfTaxPeriodCode: normalizeString(state.rfTaxPeriodCode),
  rfTaxDocumentDate: formatDate(state.rfTaxDocumentDate),
  rfTaxDocumentNumber: normalizeString(state.rfTaxDocumentNumber),
  rfIncomeTypeCode: normalizeString(state.rfIncomeTypeCode),
  kzPaymentPurposeCode: normalizeString(state.kzPaymentPurposeCode),
  kzSentFundsCode: normalizeString(state.kzSentFundsCode),
  kzBeneficiaryCode: normalizeString(state.kzBeneficiaryCode),
  kzBudgetClassificationCode: normalizeString(state.kzBudgetClassificationCode),
  kzIdNumberType: normalizeString(state.kzIdNumberType),
  kzIdNumber: normalizeString(state.kzIdNumber),
  payerLei: normalizeString(state.payerLei),
  payerBic: normalizeString(state.payerBic),
  beneficiaryLei: normalizeString(state.beneficiaryLei),
  beneficiaryBic: normalizeString(state.beneficiaryBic),
});

const mapAdministrativeData = (
  state: PaymentFormState["administrativeData"],
): AdministrativeDataDto => ({
  paymentOrderId: normalizeString(state.paymentOrderId),
  creator: normalizeString(state.creator),
  editor: normalizeString(state.editor),
  unlocker: normalizeString(state.unlocker),
  messageId: normalizeString(state.messageId),
  instructionId: normalizeString(state.instructionId),
  endToEndId: normalizeString(state.endToEndId),
  uetr: normalizeString(state.uetr),
  status: normalizeString(state.status || "POSTED"),
});

export const mapStateToPayload = (
  state: PaymentFormState,
): CheckPaymentInstructionPayload => ({
  paymentMainDto: mapPaymentMain(state.paymentMain),
  paymentDetails: mapPaymentDetails(state.paymentDetails),
  autoPaymentDetails: mapAutoPaymentDetails(state.autoPaymentDetails),
  paymentRuKzIn: mapPaymentRuKzIn(state.paymentRuKzIn),
  administrativeData: mapAdministrativeData(state.administrativeData),
});

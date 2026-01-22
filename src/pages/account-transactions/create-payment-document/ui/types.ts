import { ChargeBearerType } from "@shared/api/mutation/account-transactions-api";

export type PaymentMainFormState = {
  documentNumber: string;
  documentDate: string;
  transactionCurrency: string;
  currencyExchangeRate: string;
  transactionAmount: string;
  transactionAmountInWords: string;
  transactionCommissionAmount: string;
  priority: string;
  payerBankCountryAlphaCode: string;
  payerBic: string;
  payerAccount: string;
  payerCurrency: string;
  payerName: string;
  payerDataRegCountry: string;
  payerDataIdentificationNumber: string;
  payerDataActualName: string;
  payerDataCountry: string;
  payerDataSettlementName: string;
  payerDataAddress: string;
  beneficiaryBankCountryAlphaCode: string;
  beneficiaryBic: string;
  beneficiarySwiftCode: string;
  beneficiaryBankAccount: string;
  beneficiaryBankName: string;
  beneficiaryAccount: string;
  beneficiaryCurrency: string;
  beneficiaryAmount: string;
  beneficiaryName: string;
  beneficiaryCountry: string;
  beneficiaryIdentificationNumber: string;
  beneficiaryDataCountry: string;
  beneficiarySettlementName: string;
  beneficiaryAddress: string;
  paymentDescription: string;
  payerUnp: string;
  beneficiaryUnp: string;
  thirdPartyUnp: string;
  paymentCode: string;
  paymentPriorityCode: string;
  currencyOperationCode: string;
  dtOperationType: string;
  ktOperationType: string;
  beneficiaryCorrespondentBankCountry: string;
  beneficiaryCorrespondentBankBic: string;
  beneficiaryCorrespondentBankSwiftCode: string;
  beneficiaryCorrespondentBankAccount: string;
  beneficiaryCorrespondentBankName: string;
  senderCorrespondentBankCountry: string;
  senderCorrespondentBankBic: string;
  senderCorrespondentBankSwiftCode: string;
  senderCorrespondentBankAccount: string;
  senderCorrespondentBankName: string;
  intermediaryBankCountry: string;
  intermediaryBankBic: string;
  intermediaryBankSwiftCode: string;
  intermediaryBankAccount: string;
  intermediaryBankName: string;
  signChargeBearerType: ChargeBearerType | "";
  signCommissionAccount: string;
  signCommissionCurrency: string;
  signCommissionDate: string;
  signIgnoreAccountLock: boolean;
  signSuppressSwiftMtGeneration: boolean;
  signPayFromReservedFunds: boolean;
  signNoCommission: boolean;
  additionalParameter: string;
};

export type PaymentDetailsFormState = {
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  vedDocumentNumber: string;
  tnVedCode: string;
};

export type AutoPaymentDetailsFormState = {
  arrivalDateTime: string;
  executionDate: string;
  debitValueDate: string;
  creditValueDate: string;
  settlementDocumentNumber: string;
  settlementDocumentDate: string;
  representationMethod: string;
  paymentMethod: string;
  reference20: string;
  reference21: string;
  sourceMessageType: string;
  bissOperationCode: string;
  bissPaymentType: string;
  bissExpenseDetails: string;
  isoPurposeCodeAlpha: string;
  isoPurposeCodeNumeric: string;
  isoPaymentType: string;
  isoTransferPriority: string;
  isoProcessingPriority: string;
  isoPayerCommissionType: string;
  isoMessageType: string;
  isoSequenceType: string;
  payerDocumentCode: string;
  payerDocumentSeriesAndNumber: string;
  payerDocumentIdNumber: string;
  payerDocumentIssueDate: string;
  payerDocumentIssuer: string;
  beneficiaryDocumentCode: string;
  beneficiaryDocumentSeriesAndNumber: string;
  beneficiaryDocumentIdNumber: string;
  beneficiaryDocumentIssueDate: string;
  beneficiaryDocumentIssuer: string;
};

export type PaymentRuKzInFormState = {
  rfOperationCode: string;
  rfMainTaxPayerCode: string;
  rfPaymentCode: string;
  rfRecipientKpp: string;
  rfUniquePaymentId: string;
  rfBudgetClassificationCode: string;
  rfOktmoCode: string;
  rfTaxPeriodCode: string;
  rfTaxDocumentDate: string;
  rfTaxDocumentNumber: string;
  rfIncomeTypeCode: string;
  kzPaymentPurposeCode: string;
  kzSentFundsCode: string;
  kzBeneficiaryCode: string;
  kzBudgetClassificationCode: string;
  kzIdNumberType: string;
  kzIdNumber: string;
  payerLei: string;
  payerBic: string;
  beneficiaryLei: string;
  beneficiaryBic: string;
};

export type AdministrativeDataFormState = {
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

export type PaymentFormState = {
  paymentMain: PaymentMainFormState;
  paymentDetails: PaymentDetailsFormState;
  autoPaymentDetails: AutoPaymentDetailsFormState;
  paymentRuKzIn: PaymentRuKzInFormState;
  administrativeData: AdministrativeDataFormState;
};

export const createInitialPaymentFormState = (): PaymentFormState => ({
  paymentMain: {
    documentNumber: "",
    documentDate: "",
    transactionCurrency: "",
    currencyExchangeRate: "",
    transactionAmount: "",
    transactionAmountInWords:
      "Три миллиона девятнадцать тысяч восемьсот шесть российских рублей, 00 копеек",
    transactionCommissionAmount: "",
    priority: "",
    payerBankCountryAlphaCode: "",
    payerBic: "",
    payerAccount: "",
    payerCurrency: "",
    payerName: "",
    payerDataRegCountry: "",
    payerDataIdentificationNumber: "",
    payerDataActualName: "",
    payerDataCountry: "",
    payerDataSettlementName: "",
    payerDataAddress: "",
    beneficiaryBankCountryAlphaCode: "",
    beneficiaryBic: "",
    beneficiarySwiftCode: "",
    beneficiaryBankAccount: "",
    beneficiaryBankName: "",
    beneficiaryAccount: "",
    beneficiaryCurrency: "",
    beneficiaryAmount: "",
    beneficiaryName: "",
    beneficiaryCountry: "",
    beneficiaryIdentificationNumber: "",
    beneficiaryDataCountry: "",
    beneficiarySettlementName: "",
    beneficiaryAddress: "",
    paymentDescription: "",
    payerUnp: "",
    beneficiaryUnp: "",
    thirdPartyUnp: "",
    paymentCode: "",
    paymentPriorityCode: "",
    currencyOperationCode: "",
    dtOperationType: "",
    ktOperationType: "",
    beneficiaryCorrespondentBankCountry: "",
    beneficiaryCorrespondentBankBic: "",
    beneficiaryCorrespondentBankSwiftCode: "",
    beneficiaryCorrespondentBankAccount: "",
    beneficiaryCorrespondentBankName: "",
    senderCorrespondentBankCountry: "",
    senderCorrespondentBankBic: "",
    senderCorrespondentBankSwiftCode: "",
    senderCorrespondentBankAccount: "",
    senderCorrespondentBankName: "",
    intermediaryBankCountry: "",
    intermediaryBankBic: "",
    intermediaryBankSwiftCode: "",
    intermediaryBankAccount: "",
    intermediaryBankName: "",
    signChargeBearerType: "OUR",
    signCommissionAccount: "",
    signCommissionCurrency: "",
    signCommissionDate: "",
    signIgnoreAccountLock: false,
    signSuppressSwiftMtGeneration: false,
    signPayFromReservedFunds: false,
    signNoCommission: false,
    additionalParameter: "",
  },
  paymentDetails: {
    description1: "",
    description2: "",
    description3: "",
    description4: "",
    description5: "",
    vedDocumentNumber: "",
    tnVedCode: "",
  },
  autoPaymentDetails: {
    arrivalDateTime: "",
    executionDate: "",
    debitValueDate: "",
    creditValueDate: "",
    settlementDocumentNumber: "",
    settlementDocumentDate: "",
    representationMethod: "",
    paymentMethod: "",
    reference20: "",
    reference21: "",
    sourceMessageType: "",
    bissOperationCode: "",
    bissPaymentType: "",
    bissExpenseDetails: "",
    isoPurposeCodeAlpha: "",
    isoPurposeCodeNumeric: "",
    isoPaymentType: "",
    isoTransferPriority: "",
    isoProcessingPriority: "",
    isoPayerCommissionType: "",
    isoMessageType: "",
    isoSequenceType: "",
    payerDocumentCode: "",
    payerDocumentSeriesAndNumber: "",
    payerDocumentIdNumber: "",
    payerDocumentIssueDate: "",
    payerDocumentIssuer: "",
    beneficiaryDocumentCode: "",
    beneficiaryDocumentSeriesAndNumber: "",
    beneficiaryDocumentIdNumber: "",
    beneficiaryDocumentIssueDate: "",
    beneficiaryDocumentIssuer: "",
  },
  paymentRuKzIn: {
    rfOperationCode: "",
    rfMainTaxPayerCode: "",
    rfPaymentCode: "",
    rfRecipientKpp: "",
    rfUniquePaymentId: "",
    rfBudgetClassificationCode: "",
    rfOktmoCode: "",
    rfTaxPeriodCode: "",
    rfTaxDocumentDate: "",
    rfTaxDocumentNumber: "",
    rfIncomeTypeCode: "",
    kzPaymentPurposeCode: "",
    kzSentFundsCode: "",
    kzBeneficiaryCode: "",
    kzBudgetClassificationCode: "",
    kzIdNumberType: "",
    kzIdNumber: "",
    payerLei: "",
    payerBic: "",
    beneficiaryLei: "",
    beneficiaryBic: "",
  },
  administrativeData: {
    paymentOrderId: "",
    creator: "",
    editor: "",
    unlocker: "",
    messageId: "",
    instructionId: "",
    endToEndId: "",
    uetr: "",
    status: "POSTED",
  },
});

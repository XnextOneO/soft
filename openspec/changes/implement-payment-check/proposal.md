# Change: Реализация проверки платежного поручения

## Why
- Нужно реализовать рабочую кнопку «Проверить» на форме создания платежного поручения.
- Текущие табы (кроме MainDetailsTab) не поднимают данные в родителя, поэтому невозможно собрать целевой JSON для проверки.

## What Changes
- Поднять состояние табов AutomaticDetails, PaymentDetails, RfKzIndia, AdministrativeData в родительский компонент CreatePaymentDocument и перевести их в управляемые компоненты (value/onChange).
- Добавить API-метод checkPaymentInstruction (PUT) с временным URL `/payment/payment-instruction/check` и интеграцией через мутацию кнопки «Проверить».
- Реализовать маппер mapStateToPayload, который собирает данные всех секций в DTO, сериализует даты в формат YYYY-MM-DD и подставляет пустые строки/нули для незаполненных полей.

## Impact
- Affected specs: payment-creation
- Affected code: src/pages/account-transactions/create-payment-document/*, табы формы, api/account-transactions-api.ts

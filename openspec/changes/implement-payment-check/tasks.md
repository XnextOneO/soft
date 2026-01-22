## 1. API Layer
- [x] Определить интерфейсы TypeScript для полной DTO структуры (PaymentMainDto, PaymentDetailsDto и вложенные объекты).
- [x] Создать функцию API `checkPaymentInstruction` (axios PUT) с временным URL `/payment/payment-instruction/check`.

## 2. Component Refactoring (Lifting State)
- [x] Обновить `CreatePaymentDocument`: единый стейт с данными всех секций.
- [x] Рефакторинг `PaymentDetailsTab`: добавить `value` и `onChange`, связать поля `description1`...`description5`.
- [x] Рефакторинг `AutomaticDetailsTab`: сделать управляемым, прокинуть `value/onChange`.
- [x] Рефакторинг `RfKzIndiaTab`: сделать управляемым, прокинуть `value/onChange`.
- [x] Рефакторинг `AdministrativeDataTab`: сделать управляемым, прокинуть `value/onChange`.

## 3. Integration & Logic
- [x] Реализовать `mapStateToPayload`: даты в `YYYY-MM-DD`, пустые строки → `""`, пустые числа → `0`.
- [x] Подключить вызов `mutation.mutate` в обработчик кнопки «Проверить».
- [x] Убедиться, что заблокированные поля (`disabled`/`readOnly`) попадают в итоговый JSON с актуальными значениями.

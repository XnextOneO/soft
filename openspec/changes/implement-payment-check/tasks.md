## 1. API Layer
- [ ] Определить интерфейсы TypeScript для полной DTO структуры (PaymentMainDto, PaymentDetailsDto и вложенные объекты).
- [ ] Создать функцию API `checkPaymentInstruction` (axios PUT) с временным URL `/payment/payment-instruction/check`.

## 2. Component Refactoring (Lifting State)
- [ ] Обновить `CreatePaymentDocument`: единый стейт с данными всех секций.
- [ ] Рефакторинг `PaymentDetailsTab`: добавить `value` и `onChange`, связать поля `description1`...`description5`.
- [ ] Рефакторинг `AutomaticDetailsTab`: сделать управляемым, прокинуть `value/onChange`.
- [ ] Рефакторинг `RfKzIndiaTab`: сделать управляемым, прокинуть `value/onChange`.
- [ ] Рефакторинг `AdministrativeDataTab`: сделать управляемым, прокинуть `value/onChange`.

## 3. Integration & Logic
- [ ] Реализовать `mapStateToPayload`: даты в `YYYY-MM-DD`, пустые строки → `""`, пустые числа → `0`.
- [ ] Подключить вызов `mutation.mutate` в обработчик кнопки «Проверить».
- [ ] Убедиться, что заблокированные поля (`disabled`/`readOnly`) попадают в итоговый JSON с актуальными значениями.

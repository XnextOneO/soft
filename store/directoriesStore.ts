import { makeAutoObservable } from "mobx";

export interface IDirectory {
	name: string;
	link: string;
	columns: Object;
}

export default class DirectoriesStore {
	private _activeDirectory: Object = false;
	private _nsiDirectories: IDirectory[] = [
		{
			name: "Справочник кодов категории назначения перевода",
			link: "nsi/transfer-destination-category-code",
			columns: {
				code: "Код назначения платежа",
				name: "Наименование кода назначения платежа",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
			// columnsSort: {
			// 	ID_UNUR: 'code'
			// }
		},
		{
			name: "Справочник кодов идентификации организации",
			link: "nsi/organization-identification-code",
			columns: {
				code: "Код идентификации организации",
				name: "Наименование кода идентификации организации",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник кодов отмены перевода",
			link: "nsi/transfer-cancellation-code",
			columns: {
				code: "Код отмены перевода",
				name: "Наименование кода отмены перевода",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник кодов статусов перевода",
			link: "nsi/transfer-status-code",
			columns: {
				code: "Код статуса перевода",
				name: "Наименование кода статуса перевода",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник балансовых счетов Национального банка",
			link: "nsi/balance-account-nb",
			columns: {
				firstOrderBalanceAccountNumber:
					"Номер балансового счета 1-го порядка (класс)",
				secondOrderBalanceAccountNumber:
					"Номер балансового счета 2-го порядка",
				thirdOrderBalanceAccountNumber:
					"Номер балансового счета 3-го порядка",
				fourthOrderBalanceAccountNumber:
					"Номер балансового счета 4-го порядка",
				isClose: "Признак закрытия (0 – открыт, 1 – закрыт)",
				characteristic: "Характеристика счета",
				classGroupaccountAccountName:
					"Наименование класса, группы счета и счета",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник балансовых счетов банков",
			link: "nsi/balance-account",
			columns: {
				firstOrderBalanceAccountNumber:
					"Номер балансового счета 1-го порядка (класс)",
				secondOrderBalanceAccountNumber:
					"Номер балансового счета 2-го порядка",
				thirdOrderBalanceAccountNumber:
					"Номер балансового счета 3-го порядка",
				fourthOrderBalanceAccountNumber:
					"Номер балансового счета 4-го порядка",
				isClose: "Признак закрытия (0 – открыт, 1 – закрыт)",
				characteristic: "Характеристика счета",
				classGroupaccountAccountName:
					"Наименование класса, группы счета и счета",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник кодов и наименований валют",
			link: "nsi/currency",
			columns: {
				digitalCurrencyCode: "Код валюты цифровой",
				letterCurrencyCode: "Код валюты буквенный",
				name: "Наименование валюты",
				type: "Тип валюты",
				decimalPlaces:
					"Число десятичных разрядов у разменной денежной единицы",
				expirationDate: "	Дата вывода валюты из обращения",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник курсов валют",
			link: "nsi/exchange-rate",
			columns: {
				digitalCurrencyCode: "Буквенный код валюты",
				letterCurrencyCode: "Цифровой код валюты",
				data: "Дата начала действия курса",
				countUnits:
					"Количество единиц иностранной валюты, за которое устанавливается официальный курс",
				officialRate:
					"Установленный официальный курс белорусского рубля к иностранной валюте (за количество единиц иностранной валюты)	",
				officialRatePerOneUnit:
					"Официальный курс белорусского рубля к иностранной валюте в представлении по ISO (за 1 единицу иностранной валюты)",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник банков",
			link: "nsi/bank",
			columns: {
				bankCode: "Условный номер участника расчетов (УНУР)",
				name: "Местоположение, наименование участника расчетов",
				regionNumber: "Номер региона",
				identificationCode: "БИК участника расчетов",
				paymentsType: "Вид участника расчетов",
				headBankUNUR: "УНУР головного банка",
				reserve: "Резерв",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник кодов обработки",
			link: "nsi/processing-code",
			columns: {
				codeAS: "Код АС использования",
				code: "Код обработки",
				name: "Наименование кода обработки",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник кодов платежей в бюджет",
			link: "nsi/budget-payment-code",
			columns: {
				paymentCode: "Код платежа в бюджет",
				name: "Наименование кода платежа в бюджет",
				isPayRepublicBudget: "Признак уплаты в республиканский бюджет",
				isPayCustomsPayments:
					"Признак уплаты таможенных платежей на единый счет",
				isPaySocialProtectionFund: "Признак уплаты в ФСЗН",
				isPayAdministrators:
					"Признак уплаты на счета администраторов доходов бюджета",
				isPayLocalBudget: "Признак уплаты в местные бюджеты",
				isPayAnotherClients:
					"Признак перечисления на счета иных клиентов казначейства	",
				isPayOutOfBudgetFonds: "Признак платежей во внебюджетные фонды",
				isPayOutOfBudget: "Признак платежей внебюджетных средств",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Кодификатор стран",
			link: "nsi/country-codifier",
			columns: {
				code: "Код страны цифровой",
				codeA2: "Код страны альфа-2",
				codeA3: "Код страны альфа-3",
				digitalCurrencyCode: "Код валюты цифровой1",
				letterCurrencyCode: "Код валюты буквенный1",
				shortName: "Наименование страны краткое",
				fullName: "Наименование страны полное",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник счетов по учету средств республиканского бюджета",
			link: "",
			columns: {},
		},
		{
			name: "Справочник банковских идентификационных кодов",
			link: "nsi/bank-id-code",
			columns: {
				unur: "Условный номер участника расчетов",
				bankIdentificationCode: "БИК банка",
				status: "Статус БИК банка (0 – BIК SWIFT; 1 – БИК Республики Беларусь)",
				correspondentAccountNumber:
					"Номер корреспондентского счета банка",
				bankIdentificationCodePlus: "БИК банка",
				shortBankName: "Наименование банка (краткое)",
				city: "Населенный пункт",
				controlCode: "Код контроля",
				controlDate: "Дата контроля",
				successorBankIdentificationCode: "БИК банка преемника",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник участников системы BISS",
			link: "nsi/biss-member",
			columns: {
				unur: "Условный номер участника расчетов",
				bankIdentificationCode: "БИК банка",
				membersAuthenticationCodeForBISS: "Код статуса банка",
				status: "Код аутентификации участника расчетов системы BISS",
				type: "Код типа участника",
				shortName: "Наименование участника расчетов (краткое)",
				cityAndFullName:
					"Населенный пункт, наименование участника расчетов",
				phone: "Телефон",
				index: "Индекс, адрес",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник кодов очередностей платежа",
			link: "nsi/payment-priority-code",
			columns: {
				primaryCode: "Код очередности",
				name: "Наименование кода очередности",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
		{
			name: "Справочник счетов по учету средств местных бюджетов",
			link: "",
			columns: {},
		},
		{
			name: "Справочник статусов субъектов",
			link: "nsi/subject-statuses",
			columns: {
				code: "Код статуса субъекта",
				name: "Наименование cтатуcа субъекта",
				isUsingBisORIis:
					"Признак использования АС МБР и АИС ПБИ (1 – используется)",
				isUsingFulfillingMonetaryObligationsSystem:
					"Признак использования АИС ИДО (1 – используется)",
				additionDate: "Дата добавления",
				isDelete: "Удален",
			},
		},
	];
	private _swiftDirectory: IDirectory = {
		name: "Справочник участников системы SWIFT",
		link: "swift",
		columns: {
			modificationFlag: "Флаг модификации",
			recordKey: "Ключ записи",
			officeType: "",
			parentOfficeKey: "",
			headOfficeKey: "",
			legalType: "",
			legalParentKey: "",
			groupType: "Тип группы",
			groupParentKey: "",
			institutionStatus: "",
			cooperativeGroupKey: "",
			isoLeiCode: "",
			bic8: "",
			branchBic: "",
			bic: "",
			chipsUid: "",
			nationalId: "",
			connectedBic: "",
			institutionName: "",
			branchInformation: "",
			pobNumber: "",
			streetAddress1: "",
			streetAddress2: "",
			streetAddress3: "",
			streetAddress4: "",
			city: "Город",
			cps: "",
			zipCode: "",
			countryName: "",
			isoCountryCode: "",
			timezone: "Часовой пояс",
			subtypeIndicator: "",
			networkConnectivity: "",
			branchQualifiers: "",
			serviceCodes: "",
			ssiGroupKey: "",
			ibanKey: "IBAN ключ",
			fieldA: "Поле А",
			fieldB: "Поле Б",
		},
	};
	private _rfDirectory: IDirectory = {
		name: "Справочник БИК Российской Федерации",
		link: "rf",
		columns: {
			bic: "Банковский идентификационный код",
            name: "Название",
            engName: "Название на английском языке",
            registryNumber: "Регистрационный номер",
            countryCode: "Код страны",
            regionNumber: "Номер региона",
            index: "Индекс",
            typeNp: "Тип населенного пункта",
            nameNp: "Название населенного пункта",
            address: "Адрес",
            parentBic: "Родительский БИК",
            swbic: "Идентификационный код банка, присвоенный SWIFT",
            account: "Аккаунт",
            deleted: "Удален"
		}
	};

	constructor() {
		makeAutoObservable(this);
	}

	setActiveDirectory(activeDirectory: Object) {
		this._activeDirectory = activeDirectory;
	}

	get activeDirectory(): Object {
		return this._activeDirectory;
	}

	get nsiDirectories(): IDirectory[] {
		return this._nsiDirectories;
	}

	get rfDirectory(): IDirectory {
		return this._rfDirectory;
	}

	get swiftDirectory(): IDirectory {
		return this._swiftDirectory;
	}
}

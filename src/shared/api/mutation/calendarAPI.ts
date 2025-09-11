import { notifications } from "@mantine/notifications";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { $authHost } from "..";

interface CalendarParameters {
  id?: number;
  countryId: number;
  weekendDate: string | null | undefined;
  note: string;
}

interface CalendarResponse {
  countryId: number;
  weekendDate: string | null | undefined;
  note: string;
}

export interface BankData {
  isoCode: string;
  bankCode: string | null;
  bankName: string;
}

export interface WeekendDaysResponse {
  [date: string]: BankData[];
}

const createCalendarRow = async ({
  countryId,
  weekendDate,
  note,
}: CalendarParameters): Promise<CalendarResponse> => {
  try {
    console.log(typeof countryId, typeof weekendDate, typeof note);
    const response: AxiosResponse<CalendarResponse> = await $authHost.post(
      "/calendar/create",
      { countryId, weekendDate, note },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    const errorMessages: Record<number, string> = {
      409: "Запись с такой Страной и Датой уже существует",
      400: "Возникла непредвиденная ошибка",
    };

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      const message =
        status !== undefined && errorMessages[`${status}`]
          ? errorMessages[`${status}`]
          : error.response?.data?.message || "Неизвестная ошибка";

      if (status === 409 || status === 400) {
        console.log(message);

        notifications.show({
          title: "Ошибка",
          message: message,
          color: "red",
          autoClose: 5000,
        });
        throw error;
      }
    }

    return {
      countryId: 0,
      weekendDate: "",
      note: "",
    };
  }
};

const updateCalendarRow = async ({
  id,
  countryId,
  weekendDate,
  note,
}: CalendarParameters): Promise<CalendarResponse> => {
  try {
    console.log(typeof countryId, typeof weekendDate, typeof note);
    const response: AxiosResponse<CalendarResponse> = await $authHost.put(
      `/calendar/${id}`,
      { countryId, weekendDate, note },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    const errorMessages: Record<number, string> = {
      409: "Запись с такой Страной и Датой уже существует",
      400: "Возникла непредвиденная ошибка",
    };

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      const message =
        status !== undefined && errorMessages[`${status}`]
          ? errorMessages[`${status}`]
          : error.response?.data?.message || "Неизвестная ошибка";

      if (status === 409 || status === 400) {
        notifications.show({
          title: "Ошибка",
          message: message,
          color: "red",
          autoClose: 5000,
        });
      }
    }

    return {
      countryId: 0,
      weekendDate: "",
      note: "",
    };
  }
};

export const useCreateCalendarRow = (): UseMutationResult<
  CalendarResponse,
  Error,
  CalendarParameters
> => {
  return useMutation<CalendarResponse, Error, CalendarParameters>({
    mutationFn: createCalendarRow,
  });
};

export const useUpdateCalendarRow = (): UseMutationResult<
  CalendarResponse,
  Error,
  CalendarParameters
> => {
  return useMutation<CalendarResponse, Error, CalendarParameters>({
    mutationFn: updateCalendarRow,
  });
};

export const getCountries = async (): Promise<
  [{ code: number; shortName: string }]
> => {
  try {
    const response = await $authHost.get(
      "reference-book/nsi/country-codifier/list",
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message: error.response?.data?.message || "Ошибка получения стран",
        color: "red",
        autoClose: 5000,
      });
    }
    return [
      {
        code: 0,
        shortName: "",
      },
    ];
  }
};

export const prefillCalendar = async (prefillYear: number): Promise<number> => {
  try {
    const response = await $authHost.post("calendar/prefill", undefined, {
      params: {
        prefillYear,
      },
    });
    return response.status;
  } catch (error) {
    notifications.show({
      title: "Ошибка",
      message: `Календарь выходных дней на ${prefillYear} год уже имеет записи. Использование предзаполнения невозможно`,
      color: "red",
      autoClose: 5000,
    });
    throw error;
  }
};

export const deleteCalendarRow = async (id: number): Promise<number> => {
  try {
    const response = await $authHost.delete(`calendar/${id}`);
    return response.status;
  } catch (error) {
    notifications.show({
      title: "Ошибка",
      message: `Ошибка удаления записи`,
      color: "red",
      autoClose: 5000,
    });
    throw error;
  }
};

export const getWeekends = async (
  workdaysCount: number,
): Promise<WeekendDaysResponse> => {
  try {
    const response = await $authHost.post(
      `reference-book/calendar/weekends-business-partner/${workdaysCount}`,
    );
    return response.data;
  } catch (error) {
    notifications.show({
      title: "Ошибка",
      message: `Ошибка получения выходных дней`,
      color: "red",
      autoClose: 5000,
    });
    throw error;
  }
};

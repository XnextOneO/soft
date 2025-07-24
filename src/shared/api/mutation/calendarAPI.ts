import { notifications } from "@mantine/notifications";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { $authHost } from "..";

interface CalendarParameters {
  countryId: number;
  weekendDate: string;
  note: string;
}

interface CalendarResponse {
  countryId: number;
  weekendDate: string;
  note: string;
}

const createCalendarRow = async ({
  countryId,
  weekendDate,
  note,
}: CalendarParameters): Promise<CalendarResponse> => {
  try {
    const response: AxiosResponse<CalendarResponse> = await $authHost.post(
      "/calendar/create",
      { countryId, weekendDate, note },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.message ||
          "Запись с такой Страной и Датой уже существует",
        color: "red",
        autoClose: 5000,
      });
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

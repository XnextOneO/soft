import { AxiosRequestConfig } from "axios";
import { $host } from "../index";
import { MRT_ColumnFiltersState, MRT_SortingState } from "mantine-react-table";

export const getDirectory = async (
	link: string,
	page: number,
	size: number,
	columnFilters: MRT_ColumnFiltersState,
	sorting: MRT_SortingState
) => {
	// console.log(columnFilters, decodeURIComponent(sorting.))
	const { data } = await $host.get(`reference-book/${link}`, {
		params: {
			page,
			size,
			sort: sorting,
		},
	});
	return data;
};

export const uploadDirectory = async (
	link: string,
	formData: FormData,
	config: AxiosRequestConfig<any> | undefined
) => {
	const { data } = await $host.post(
		`reference-book/${link}`,
		formData,
		config
	);
	return data;
};

export const searchDataInDirectory = async (
	link: string,
	page: number,
	size: number,
	columnFilters: MRT_ColumnFiltersState,
	sorting: MRT_SortingState,
	searchValue: string
) => {
	const { data } = await $host.get(`reference-book/${link}/find`, {
		params: {
			page,
			size,
			sort: sorting,
            text: searchValue
		},
	});
	return data;
};

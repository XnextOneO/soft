import { $host } from "../../index";

export const getNsiDirectory = async (link: string, page: number, size: number) => {
	const { data } = await $host.get(`reference-book/nsi/${link}?page=${page}&size=${size}`);
	return data;
};

import {$authHost} from "./index";

export const uploadFile = async (fileName: string, data: string) => {
    const {responseData} = await $authHost.put('reference-book/swift', {fileName, data})
    return responseData
}

import { get } from '@/utils/AjaxUtil'
import config from '@/config'

export interface getCulinaryResponse {
    status: string;
    result: Array<Culinary>;
}

export interface getCulinaryByIdResponse {
    status: string;
    result: Culinary;
}

export interface Culinary {
    _id: string;
    title: string;
    description: string;
    diningTime: string;
    image: string;
    // "createdAt": "2023-10-29T10:15:54.811Z",
    // "updatedAt": "2023-10-29T10:15:54.811Z"
}

// 取得所有最新消息
export const getCulinary = async (): Promise<getCulinaryResponse> => {
    const repsonse = await get<getCulinaryResponse>(`${config.baseURL}/api/v1/home/culinary/`)
    return repsonse
}

// 取得單筆最新消息
export const getCulinaryById = async (id: string): Promise<getCulinaryByIdResponse> => {
    const repsonse = await get<getCulinaryByIdResponse>(`${config.baseURL}/api/v1/home/culinary/${id}`)
    return repsonse
}

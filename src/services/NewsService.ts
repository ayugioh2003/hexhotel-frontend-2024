import { get } from '@/utils/AjaxUtil'
import config from '@/config'

export interface getNewsResponse {
    status: string;
    result: Array<News>;
}

export interface getNewsByIdResponse {
    status: string;
    result: News;
}

export interface News {
    _id: string;
    title: string;
    description: string;
    image: string,
    // createdAt: "2023-10-09T11:54:26.586Z",
    // updatedAt: "2023-10-09T11:54:26.586Z"      }
}

// 取得所有最新消息
export const getNews = async (): Promise<getNewsResponse> => {
    const repsonse = await get<getNewsResponse>(`${config.baseURL}/api/v1/home/news/`)
    return repsonse
}

// 取得單筆最新消息
export const getNewsById = async (id: string): Promise<getNewsByIdResponse> => {
    const repsonse = await get<getNewsByIdResponse>(`${config.baseURL}/api/v1/home/news/${id}`)
    return repsonse
}

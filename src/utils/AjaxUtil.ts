import axios, { AxiosError } from "axios"

// 設定 Response 錯誤攔截器
// StatusCode 4XX 時，回傳 error.response.data 內容
// API 格式為 ApiError
axios.interceptors.response.use(response =>  response, (error: AxiosError<ApiError>) => 
    Promise.reject(error!.response!.data)
);

export const get = async <TResponse>(url: string, token: string | undefined = undefined): Promise<TResponse> => {
    const response = await axios.get<TResponse>(url, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    })
    return response.data
}

export const post = async <TResponse>(url: string, request: any, token: string | undefined = undefined): Promise<TResponse> => {
    const response = await axios.post<TResponse>(url, request, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    })
    return response.data
}

export const put = async <TResponse>(url: string, request: any, token: string | undefined = undefined): Promise<TResponse> => {
    const response = await axios.put<TResponse>(url, request, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    })
    return response.data
}

export const del = async <TResponse>(url: string, token: string | undefined = undefined): Promise<TResponse> => {
    const response = await axios.delete<TResponse>(url, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    })
    return response.data
}

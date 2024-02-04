import { post } from '@/utils/AjaxUtil'
import config from '@/config'

interface VerifyEmailExistRequest {
    email: string;
}

interface VerifyEmailExistResponse {
    status: boolean;
    result: {
        isEmailExists: boolean;
    };
}

interface generateEmailCodeRequest {
    email: string;
}

interface generateEmailCodeResponse {
    status: boolean;
}


// 驗證信箱是否註冊過
export const verifyEmailExist = async (request: VerifyEmailExistRequest): Promise<VerifyEmailExistResponse> => {
    const repsonse = await post<VerifyEmailExistResponse>(`${config.baseURL}/api/v1/verify/email`, request)
    return repsonse
}

// 產生信箱驗證碼
export const generateEmailCode = async (request: generateEmailCodeRequest): Promise<generateEmailCodeResponse> => {
    const repsonse = await post<generateEmailCodeResponse>(`${config.baseURL}/api/v1/verify/generateEmailCode`, request)
    return repsonse
}

import { get, post, put } from '@/utils/AjaxUtil';
import config from '@/config';

// 登入
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const repsonse = await post<LoginResponse>(`${config.baseURL}/api/v1/user/login`, request);
  return repsonse;
};

// 註冊
export const signup = async (request: SignupRequest): Promise<SignupResponse> => {
  const repsonse = await post<SignupResponse>(`${config.baseURL}/api/v1/user/signup`, request);
  return repsonse;
};

// 忘記密碼
export const forgot = async (request: ForgotRequest): Promise<ForgotResponse> => {
  const repsonse = await post<ForgotResponse>(`${config.baseURL}/api/v1/user/forgot`, request);
  return repsonse;
};

// 檢查是否登入
export const check = async (token: string): Promise<CheckResponse> => {
  const repsonse = await get<CheckResponse>(`${config.baseURL}/api/v1/user/check`, token);
  return repsonse;
};

// 取得使用者資訊
export const queryUser = async (token: string): Promise<QueryUserResponse> => {
  const repsonse = await get<QueryUserResponse>(`${config.baseURL}/api/v1/user/`, token);
  return repsonse;
};

// 更新使用者資訊
export const updateUser = async (request: UpdateUserRequest, token: string): Promise<any> => {
  console.log(request);
  const reposonse = await put(`${config.baseURL}/api/v1/user/`, request, token);
  return reposonse;
};

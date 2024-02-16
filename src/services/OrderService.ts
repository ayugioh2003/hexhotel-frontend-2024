import { get, del } from '@/utils/AjaxUtil';
import config from '@/config';

// 更新使用者資訊
export const getUserOrders = async (token: string): Promise<any> => {
  const reposonse = await get(`${config.baseURL}/api/v1/orders`, token);
  return reposonse;
};
// 更新使用者資訊
export const deleteUserOrders = async (query: string, token: string): Promise<any> => {
  const reposonse = await del(`${config.baseURL}/api/v1/orders/${query}`, token);
  return reposonse;
};

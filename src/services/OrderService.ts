import { get } from '@/utils/AjaxUtil';
import config from '@/config';

// 更新使用者資訊
export const getUserOrders = async (token: string): Promise<any> => {
  const reposonse = await get(`${config.baseURL}/api/v1/orders`, token);
  return reposonse;
};

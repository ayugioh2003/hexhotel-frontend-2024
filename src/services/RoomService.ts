import { get } from '@/utils/AjaxUtil'
import config from '@/config'

// 取得房型列表
export const queryRooms = async (): Promise<RoomsResponse> => {
  const response = await get<RoomsResponse>(`${config.baseURL}/api/v1/rooms`)
  return response
}

// 取得房型詳細資料
export const queryRoom = async (roomId: string): Promise<RoomResponse> => {
  const response = await get<RoomResponse>(`${config.baseURL}/api/v1/rooms/${roomId}`)
  return response
}

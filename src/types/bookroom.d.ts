type OrderDataType = {
  roomId: string,
  checkInDate: string,
  checkOutDate: string,
  peopleNum: number,
  userInfo: {
    address: {
      zipcode: number,
      detail: string
    },
    name: string,
    phone: string,
    email: string
  }
}

type FormDataType = {
  name: string,
  phone: string,
  email: string,
  city: string,
  area: string,
  address: string,
}


interface TownData {
  name: string;
  code: string;
}

interface CityData {
  name: string;
  children: TownData[];
}

type UserInfoObj = {
  address: AddressObj,
  email: string,
  name: string,
  phone: string,
}

type AddressObj = {
  detail: string,
  zipcode: number
}

type RoomIdObj = {
  amenityInfo:[],
  areaInfo: string,
  bedInfo: string,
  createdAt: string,
  description: string,
  facilityInfo:[],
  imageUrl: string,
  imageUrlList: [],
  maxPeople: number,
  name: string,
  price: number,
  status: number,
  updatedAt: string,
  _id: string
}

type OrderList = {
  checkInDate: string,
  checkOutDate: string,
  createdAt: string,
  orderUserId: number,
  peopleNum: number,
  roomId: RoomIdObj,
  status: number,
  updatedAt: string,
  userInfo: UserInfoObj,
  _id: string,
}
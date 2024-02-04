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

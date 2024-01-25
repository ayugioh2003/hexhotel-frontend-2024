type FacilityInfo = {
  title: string;
  isProvide: boolean;
};

type AmenityInfo = {
  title: string;
  isProvide: boolean;
};

type Room = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  facilityInfo: FacilityInfo[];
  amenityInfo: AmenityInfo[];
  createdAt: string;
  updatedAt: string;
};
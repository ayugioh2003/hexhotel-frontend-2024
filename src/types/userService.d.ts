// 登入 Request
interface LoginRequest {
  email: string;
  password: string;
}

// 登入 Response
interface LoginResponse {
  status: string;
  token: string;
  result: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    address: {
      zipcode: number;
      detail: string;
      city: string;
      county: string;
    };
  };
}

// 註冊 Request
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
}

// 註冊 Response
interface SignupResponse {
  status: boolean;
  token: string;
  result: {
    address: {
      zipcode: number;
      detail: string;
      city: string;
      county: string;
    };
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  };
}

// 忘記密碼 Request
interface ForgotRequest {
  email: string;
  code: string;
  newPassword: string;
}

// 忘記密碼 Response
interface ForgotResponse {
  status: boolean;
  message?: string;
}

// 檢查是否登入 Response
interface CheckResponse {
  status: boolean;
  token: string;
}

// 取得使用者資訊 Response
interface QueryUserResponse {
  status: boolean;
  token: string;
  result: {
    address: {
      zipcode: number;
      detail: string;
      city: string;
      county: string;
    };
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  };
}

// 更新使用者資訊 Request
interface UpdateUserRequest {
  userId: string;
  name: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
  oldPassword: string;
  newPassword: string;
}

interface UserState {
    token: string;
    name: string;
    email: string;
    phone: string;
    id: string;
    address: {
        zipcode: number;
        detail: string;
        city: string;
        county: string;
    };
    setToken: (token: string) => void;
    setUser: (user: any) => void;
}

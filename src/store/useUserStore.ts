import { create } from 'zustand'

const useUserStore = create<UserState>(set => ({
    token: '',
    name: '',
    email: '',
    phone: '',
    id: '',
    address: {
        zipcode: 0,
        detail: '',
        city: '',
        county: '',
    },
    setToken: (token) => set(() => ({token})),
    setUser: (user) => set(() => ({
        token: user.token,
        name: user.result.name,
        email: user.result.email,
        phone: user.result.phone,
        id: user.result.id,
        address: user.result.address
    }))
}))

export default useUserStore

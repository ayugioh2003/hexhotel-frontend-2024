import { useEffect } from "react"
import useUserStore from "@/store/useUserStore"
import { check } from '@/services/UserService'
import { useNavigate } from 'react-router-dom'

const useCheckUser = () => {
    const token = useUserStore(s => s.token)
    const setToken = useUserStore(s => s.setToken)
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) {
            return
        }
        
        (async () => {
            try {
                const resposne = await check(token)
                setToken(resposne.token)
            } catch(ex) {
                console.error(ex)
                // 清除使用者資料
                setToken('')
                navigate('/index')
            }
        })()
    }, [])
}

export default useCheckUser
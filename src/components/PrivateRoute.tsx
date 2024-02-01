import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react";

import useUserStore from "@/store/useUserStore";

const AuthRoute = () => {
    //const [isLogin] = useState<boolean>(loginStatus)
    const navigate = useNavigate()
    const token = useUserStore(s => s.token)

    console.log(token)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Outlet />        
        </>
    )
}

const NonAuthRoute = () => {
    //const [isLogin] = useState<boolean>(loginStatus)
    const token = useUserStore(s => s.token)
    const navigate = useNavigate()

    console.log(token)

    useEffect(() => {
        if (token) {
            navigate('/index')
        }
    }, [])

    return (
        <>
            <Outlet />        
        </>
    )
}

export { AuthRoute, NonAuthRoute };

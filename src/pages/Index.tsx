import { useEffect } from "react"
import Layout from "../components/Layout"
import useUserStore from "@/store/useUserStore"
import useCheckUser from "@/hooks/useCheckUser"
import { useNavigate, useLocation } from "react-router-dom"

const Index = () => {
    const name = useUserStore(s => s.name)
    const setToken = useUserStore(s => s.setToken)
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location.state)
    useCheckUser();

    const handleLogOut = () => {
        setToken('')
        navigate('/login')
    }

    return (
        <Layout>
            <div style={{paddingTop:'120px'}}>
                <h2>index</h2>
                {
                    name &&
                    <>
                        <h3>Hello {name}</h3>
                        <button type="button" onClick={handleLogOut}>LogOut</button>
                    </>
                }
            </div>
        </Layout>
    )
}

export default Index
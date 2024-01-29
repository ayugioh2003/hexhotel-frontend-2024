import Layout from "@/components/Layout"
import { useState, ChangeEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { login } from '@/services/UserService'
import useUserStore from "@/store/useUserStore"

const Login = () => {
    const [email, setEmail] = useState('FQW900@gmail.com')
    const [password, setPassword] = useState('1qaz2WSX')
    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate()

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        try {
            const response = await login({
                email, password
            })
            setUser(response)
            navigate('/index')
        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <Layout>
            <div style={{paddingTop:'120px'}}>
                <h2>login</h2>
                <label>電子信箱</label>
                <input type="text" value={email}  onChange={handleChangeEmail}/>
                <br />
                <label>密碼</label>
                <input type="password" value={password} onChange={handleChangePassword} />
                <br />
                <button type="button" onClick={handleLogin}>會員登入</button>
            </div>
        </Layout>        
    )
}

export default Login
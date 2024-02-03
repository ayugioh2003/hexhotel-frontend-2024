import Layout from "@/components/Layout"
import { useState, ChangeEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { login } from '@/services/UserService'
import useUserStore from "@/store/useUserStore"
import bgLogin from '@/assets/png/bg_login.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRemember, setIsRemember] = useState(false)
    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate()

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleChangeIsRemember = () => {
        setIsRemember(prev => !prev)
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

    const style = {
        paddingTop: "120px",
        background: "#140F0A",
        minHeight: "100vh"        
    }


    const basis0 = {
        "flexBasis": "0",
    }


    return (
        <Layout showFooter={false}>
            <div style={style} className="test d-flex">
                <div style={basis0} className="flex-grow-1 flex-bais-0 d-none d-md-block">
                    <img src={bgLogin} alt="login backgound" style={{width: "100%", display: 'block'}}/>
                </div>
                <div  style={basis0} className="flex-grow-1 flex-bais-0 d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-stretch">
                        <p className="text-primary mb-2">享樂酒店，誠摯歡迎</p>
                        <h2 className="h1 text-white mb-4">立即開始旅程</h2>
                        <label htmlFor="email" className="text-white mb-1">電子信箱</label>
                        <input 
                            type="text" id="email" 
                            className="form-control mb-2" 
                            value={email} 
                            onChange={handleChangeEmail}
                            />
                        <label htmlFor="password" className="text-white mb-1">密碼</label>
                        <input 
                            type="password" id="password" 
                            className="form-control mb-2" 
                            value={password} 
                            onChange={handleChangePassword} 
                            />
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <label htmlFor="remember" className="text-white">
                                <input type="checkbox" name="remember" id="remember" checked={isRemember} onChange={handleChangeIsRemember}/> 記住帳號
                            </label>
                            <a href="#">忘記密碼</a>
                        </div>
                        <button type="button" className="btn btn-primary w-100 mb-3" onClick={handleLogin}>會員登入</button>
                        <p className="mb-0 text-white">沒有會員嗎？ <a href="/register">前往註冊</a></p>
                    </div>
                </div>
            </div>
        </Layout>        
    )
}

export default Login
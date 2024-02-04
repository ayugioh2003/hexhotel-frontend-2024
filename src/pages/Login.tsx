import Layout from "@/components/Layout"
import { useState, ChangeEvent } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { login } from '@/services/UserService'
import useUserStore from "@/store/useUserStore"
import bgLogin from '@/assets/png/bg_login.png'
const Login = () => {
    const [email, setEmail] = useState('')
    const [emailValidator, setEmailValidator] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidator, setPasswordValidator] = useState('')
    const [isRemember, setIsRemember] = useState(false)
    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate()

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        validatePassword(e.target.value)
    }

    const handleChangeIsRemember = () => {
        setIsRemember(prev => !prev)
    }

    const handleLogin = async () => {
        if(!validInput()) {
            return
        }
        try {
            const response = await login({
                email, password
            })
            setUser(response)
            navigate('/index')
        } catch (ex: any) {
            setEmailValidator(ex?.message)
            console.error(ex)
        }
    }

    const validInput = () => {
        let isValid = true
        isValid = validateEmail(email) && isValid
        isValid = validatePassword(password) && isValid
        return isValid
    }

    const validateEmail = (email: string) => {
        let isValid = true
        if(email) {
            setEmailValidator('')
        } else {
            isValid = false
            setEmailValidator('請輸入電子信箱')
        }
        return isValid
    }

    const validatePassword = (password: string) => {
        let isValid = true
        if(password) {
            setPasswordValidator('')
        } else {
            isValid = false
            setPasswordValidator('請輸入密碼')
        }
        return isValid
    }

    return (
        <Layout showFooter={false}>
            <div className="min-vh-100 row g-0 dark-background">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src={bgLogin} 
                        alt="login backgound"
                        className="w-100 vh-100 object-fit-cover"
                    />
                </div>
                <div className="col-md-6 vh-100 p-3 d-flex justify-content-center align-items-center">
                    <form className="d-flex flex-column justify-content-center align-items-stretch">
                        <p className="text-primary mb-2">享樂酒店，誠摯歡迎</p>
                        <h2 className="h1 text-white mb-4">立即開始旅程</h2>
                        <label htmlFor="email" className="text-white mb-1">電子信箱</label>
                        <input 
                            type="text" id="email" 
                            className={`form-control ${emailValidator ? 'is-invalid' : ''}`} 
                            value={email} 
                            autoComplete="username"
                            onChange={handleChangeEmail}
                            />
                        {
                            emailValidator &&
                            <div className="invalid-feedback mt-1">
                                {emailValidator}
                            </div>
                        }
                        <label htmlFor="password" className="text-white mb-1 mt-3">密碼</label>
                        <input 
                            type="password" id="password" 
                            className={`form-control ${passwordValidator ? 'is-invalid' : ''}`} 
                            value={password} 
                            autoComplete="current-password"
                            onChange={handleChangePassword} 
                            />
                        {
                            passwordValidator &&
                            <div className="invalid-feedback mt-1">
                                {passwordValidator}
                            </div>
                        }
                        <div className="w-100 d-flex justify-content-between mt-3">
                            <label htmlFor="remember" className="text-white">
                                <input type="checkbox" name="remember" id="remember" checked={isRemember} onChange={handleChangeIsRemember}/> 記住帳號
                            </label>
                            <a href="#">忘記密碼</a>
                        </div>
                        <button type="button" className="btn btn-primary w-100 mt-4" onClick={handleLogin}>會員登入</button>
                        <p className="mb-0 mt-4 text-white">沒有會員嗎？ <Link to="/register">前往註冊</Link></p>
                    </form>
                </div>
            </div>
        </Layout>        
    )
}

export default Login
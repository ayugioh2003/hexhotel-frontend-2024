import Layout from "@/components/Layout"
import { useState, ChangeEvent } from "react"
import { useNavigate  } from 'react-router-dom'
import Swal from 'sweetalert2'
import { forgot } from '@/services/UserService'
import { verifyEmailExist, generateEmailCode } from '@/services/VerifyService';
import bgLogin from '@/assets/png/bg_login.png'

enum ForgetStepEnum {
    first,
    second,
}

const Forget = () => {
    const [step, setStep] = useState<ForgetStepEnum>(ForgetStepEnum.first)
    const [email, setEmail] = useState('')
    const [emailValidator, setEmailValidator] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidator, setPasswordValidator] = useState('')
    const [code, setCode] = useState('')
    const [codeValidator, setCodeValidator] = useState('')
    const navigate = useNavigate()

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        validatePassword(e.target.value)
    }

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value)
      validateCode(e.target.value)
  }

    const handleForgot = async () => {
        if(!validInput()) {
            return
        }
        try {
            const response = await forgot({
                email, newPassword: password, code: code
            })

            if (response.status) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "已成功修改密碼。請重新登入",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: response?.message || "驗證失敗。請重新嘗試",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              });
            }
            navigate('/login')
        } catch (ex: any) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: ex?.message || "系統忙碌中。請稍候嘗試",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            console.error(ex)
        }
    }

    const validInput = () => {
        let isValid = true
        isValid = validateEmail(email) && isValid
        isValid = validatePassword(password) && isValid
        isValid = validateCode(code) && isValid
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

    const validateCode = (code: string) => {
      let isValid = true
      if(code) {
          setCodeValidator('')
      } else {
          isValid = false
          setCodeValidator('請輸入驗證碼')
      }
      return isValid
  }

    const handleEmailCode = async () => {
      const isValid = validateEmail(email)
      if(!isValid) {
        return
      }

      try {
        const verifyEmailres = await verifyEmailExist({ email: email })

        if (!verifyEmailres.result.isEmailExists) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "此信箱尚未註冊，請重新再試",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          return
        }

        const res = await generateEmailCode({ email: email })

        if (res.status) {
          setStep(ForgetStepEnum.second)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "已送出驗證碼。請前往信箱取得驗證碼",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "送出驗證碼失敗。請稍候再試",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        }
      } catch(error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "送出驗證碼失敗。請稍候再試",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
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
                <div className="col-md-6 vh-100 p-5 d-flex justify-content-center align-items-center">
                    <form className="d-flex flex-column justify-content-center align-items-stretch">
                        <p className="text-primary mb-2">享樂酒店，誠摯歡迎</p>
                        <h2 className="h1 text-white mb-4" >忘記密碼</h2>
                    {
                        step === ForgetStepEnum.first ?
                        <>
                            <h3 className="text-white mb-4">Step1: 取得驗證碼</h3>
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
                            <button type="button" className="btn btn-primary mt-4" onClick={handleEmailCode}>傳送驗證碼</button>
                        </> : 
                        <>
                            <h3 className="text-white mb-4">Step2: 設定新密碼</h3>
                            <label htmlFor="email" className="text-white mb-1">電子信箱</label>
                            <input 
                                type="text" id="email" 
                                className={`form-control ${emailValidator ? 'is-invalid' : ''}`} 
                                value={email} 
                                autoComplete="username"
                                disabled
                                readOnly
                                />
                            <label htmlFor="password" className="text-white mb-1 mt-3">新密碼</label>
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
                            <label htmlFor="code" className="text-white mb-1 mt-3">驗證碼</label>
                            <input 
                                type="text" id="code" 
                                className={`form-control ${codeValidator ? 'is-invalid' : ''}`} 
                                value={code} 
                                onChange={handleChangeCode}
                                />
                            {
                                codeValidator &&
                                <div className="invalid-feedback mt-1">
                                    {codeValidator}
                                </div>
                            }
                            <button type="button" className="btn btn-primary w-100 mt-4" onClick={handleForgot}>修改密碼</button>                        
                        </>
                    }
                    </form>
                </div>
            </div>
        </Layout>        
    )
}

export default Forget
import Layout from "@/components/Layout"
import { useState, ChangeEvent, useEffect } from "react"
import { signup } from '@/services/UserService'
import useUserStore from "@/store/useUserStore"
import { useNavigate } from 'react-router-dom'
import BirthdaySelector from "@/components/BirthdaySelector"
import CitySelector from "@/components/CitySelector"
import bgLogin from '@/assets/png/bg_login.png'
import { verifyEmailExist } from '@/services/VerifyService'

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    birthday: string;
    address: {
        zipcode: number;
        detail: string;
    };
}

// interface RegisterValidateData {
//     // name: string;
//     email: string;
//     // password: string;
//     // confirmPassword: string;
//     // phone: string;
//     // birthday: string;
//     // address: {
//     //     zipcode: number;
//     //     detail: string;
//     // };
// }

enum RegisterStepEnum {
    first,
    second,
}

const Register = () => {
    const [step, setStep] = useState<RegisterStepEnum>(RegisterStepEnum.first)
    const [data, setData] = useState<RegisterData>({
        "name": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "phone": "",
        "birthday": "",
        "address": {
            "zipcode": 0,
            "detail": ""
        }
    })
    const [validate, setValidate] = useState<RegisterData>({
        "name": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "phone": "",
        "birthday": "",
        "address": {
            "zipcode": 0,
            "detail": ""
        }
    })

    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate()

    const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setData(prev => ({
            ...prev,
            [name]: value,
        }))
        checkInput(name, value)
    }

    useEffect(() => {

    }, [data])

    const checkInput = (key: string, value: string) => {
        let error = ""
        if(key === "name") {
            error = value ? "": "請輸入姓名"
        } else if(key === "email") {
            error = value ? "": "請輸入電子信箱"
        } else if(key === "password") {
            if(!value) {
                error = "請輸入密碼"
            } else if (data.confirmPassword && data.confirmPassword != value) {
                error = "密碼與確認密碼不同"
            } else {
                error = ""
            }
        } else if(key === "confirmPassword") {
            if(!value) {
                error = "請輸入確認密碼"
            } else if(data.password !== value) {
                error = "密碼與確認密碼不同"
            } else {
                error = ""
            }
        }
        setValidate(prev => ({
            ...prev,
            [key]: error,
        }))
    }
    
    const handleRegister = async () => {
        try {
            const response = await signup({
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                birthday: data.birthday,
                address: {
                    zipcode: data.address.zipcode,
                    detail: data.address.detail
                }
            })
            setUser(response)
            navigate('/index')
        } catch (ex) {
            console.error(ex)
        }
      });
      setUser(response);
      navigate('/index');
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <Layout>
      <div style={{ paddingTop: '120px' }}>
        <h2>Register</h2>
        {step === RegisterStepEnum.first ? (
          <>
            <label>電子信箱</label>
            <input type="text" value={data.email} name="email" onChange={handleChangeData} />
            <br />
            <label>密碼</label>
            <input type="password" value={data.password} name="password" onChange={handleChangeData} />
            <br />
            <label>確認密碼</label>
            <input type="password" value={data.confirmPassword} name="confirmPassword" onChange={handleChangeData} />
            <br />
            <button type="button" onClick={() => setStep(RegisterStepEnum.second)}>
              下一步
            </button>
          </>
        ) : (
          <>
            <label>姓名</label>
            <input type="text" value={data.name} name="name" onChange={handleChangeData} />
            <br />
            <label>手機號碼</label>
            <input type="text" value={data.phone} name="phone" onChange={handleChangeData} />
            <br />
            <label>生日</label>
            <input type="text" value={data.birthday} name="birthday" onChange={handleChangeData} />
            <br />
            {/* <label>地址</label>
                    <input type="text" value={data.address} name="name"  onChange={handleChangeData}/>
                    <br /> */}
            <button type="button" onClick={handleRegister}>
              完成註冊
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};
    const handleChangeBirthday = (birthday: string) => {
        setData(prev => ({
            ...prev,
            birthday,
        }))
    }

    const handleChangeCity = (zip: number) => {
        const detail = data.address.detail
        setData(prev => ({
            ...prev,
            address: {
                zipcode: zip,
                detail: detail,
            },
        }))
    }

    const handleChangeDetail = (detail: string) => {
        const zipcode = data.address.zipcode
        setData(prev => ({
            ...prev,
            address: {
                zipcode: zipcode,
                detail: detail,
            },
        }))
    } 

    const handleClickStep1 = async () => {
        // 驗證 email
        try {
            const requestData = {
                email: data.email
            }
            const res = await verifyEmailExist(requestData)
            if(res.result.isEmailExists) {
                setValidate(prev => ({
                    ...prev,
                    email: '電子信箱已存在'
                }))
            } else {
                setStep(RegisterStepEnum.second)
            }
        } catch (ex: any) {
            setValidate(prev => ({
                ...prev,
                email: ex?.message
            }))
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
                <div style={basis0}  className="flex-grow-1 flex-bais-0 d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-stretch">
                        <p className="text-primary mb-2">享樂酒店，誠摯歡迎</p>
                        <h2 className="h1 text-white mb-4">立即註冊</h2>
                    {
                        step === RegisterStepEnum.first ? 
                        <>
                            <label htmlFor="email" className="text-white mb-1">電子信箱</label>
                            <input 
                                type="text" name="email" id="email"
                                className={`form-control ${validate.email ? 'is-invalid' : ''}`} 
                                value={data.email} 
                                onChange={handleChangeData}
                            />
                            {
                                validate.email &&
                                <div className="invalid-feedback">
                                    {validate.email}
                                </div>
                            }
                            <label htmlFor="password" className="text-white mt-2 mb-1">密碼</label>
                            <input 
                                type="password" name="password" id="password" 
                                className={`form-control ${validate.password ? 'is-invalid' : ''}`} 
                                value={data.password} 
                                onChange={handleChangeData} 
                            />
                            {
                                validate.password &&
                                <div className="invalid-feedback">
                                    {validate.password}
                                </div>
                            }
                            <label htmlFor="confirmPassword" className="text-white mt-2 mb-1">確認密碼</label>
                            <input 
                                type="password" name="confirmPassword" id="confirmPassword" 
                                className={`form-control ${validate.confirmPassword ? 'is-invalid' : ''}`} 
                                value={data.confirmPassword} 
                                onChange={handleChangeData} 
                            />
                            {
                                validate.confirmPassword &&
                                <div className="invalid-feedback">
                                    {validate.confirmPassword}
                                </div>
                            }
                            <button 
                                type="button" 
                                className="btn btn-primary mt-2 w-100"
                                onClick={handleClickStep1}
                            >下一步</button>
                        </>:
                        <>
                            <label htmlFor="name" className="text-white mb-1">姓名</label>
                            <input 
                                type="text" name="name" id="name"
                                className="form-control mb-2" 
                                value={data.name} 
                                onChange={handleChangeData}
                            />
                            <label htmlFor="phone" className="text-white mb-1">手機號碼</label>
                            <input 
                                type="text" name="phone" id="phone"
                                className="form-control mb-2" 
                                value={data.phone} 
                                onChange={handleChangeData}
                            />
                            <label className="text-white mb-1">生日</label>
                            <BirthdaySelector onChange={handleChangeBirthday}/>
                            <label className="text-white mb-1">地址</label>
                            <CitySelector onChange={handleChangeCity}/>
                            <input 
                                type="text" name="detail" id="detail" 
                                className="form-control mt-1 mb-3" 
                                value={data.address.detail} 
                                onChange={e => handleChangeDetail(e.target.value)} 
                            />

                            <button type="button" className="btn btn-primary" onClick={handleRegister}>完成註冊</button>
                        </>                
                    }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register;

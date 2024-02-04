import Layout from "@/components/Layout"
import { useState, ChangeEvent } from "react"
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

interface Step1Validate {
    email: string;
    password: string;
    confirmPassword: string;
}
// interface Step2Validate {
//     name: string;
//     phone: string;
//     birthday: string;
//     zipcode: string;
//     detail: string;
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
    const [step1Validate, setStep1Validate] = useState<Step1Validate>({
        "email": "",
        "password": "",
        "confirmPassword": "",
    })
    // const [step2Validate, setStep2Validate] = useState<Step2Validate>({
    //     "name": "",
    //     "phone": "",
    //     "birthday": "",
    //     "zipcode": "",
    //     "detail": ""
    // })

    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate()

    const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setData(prev => ({
            ...prev,
            [name]: value,
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
        // if(!validateStep1()) {
        //     return
        // }
        try {
            const requestData = {
                email: data.email
            }
            const res = await verifyEmailExist(requestData)
            if(res.result.isEmailExists) {
                setStep1Validate(prev => ({
                    ...prev,
                    email: '電子信箱已存在'
                }))
            } else {
                setStep(RegisterStepEnum.second)
            }
        } catch (ex: any) {
            setStep1Validate(prev => ({
                ...prev,
                email: ex?.message
            }))
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
                <div className="col-md-6 vh-100 p-3 d-flex justify-content-center align-items-center">
                    <form className="d-flex flex-column justify-content-center align-items-stretch">
                        <p className="text-primary mb-2">享樂酒店，誠摯歡迎</p>
                        <h2 className="h1 text-white mb-4">立即開始旅程</h2>
                    {
                        step === RegisterStepEnum.first ?
                        <>
                            <label htmlFor="email" className="text-white mb-1">電子信箱</label>
                            <input
                                type="text" name="email" id="email"  autoComplete="username"
                                className={`form-control ${step1Validate.email ? 'is-invalid' : ''}`}
                                value={data.email}
                                onChange={handleChangeData}
                            />
                            {
                                step1Validate.email &&
                                <div className="mt-1 invalid-feedback">
                                    {step1Validate.email}
                                </div>
                            }
                            <label htmlFor="password" className="text-white mt-2 mb-1">密碼</label>
                            <input
                                type="password" name="password" id="password" autoComplete="new-password"
                                className={`form-control ${step1Validate.password ? 'is-invalid' : ''}`}
                                value={data.password}
                                onChange={handleChangeData}
                            />
                            {
                                step1Validate.password &&
                                <div className="mt-1 invalid-feedback">
                                    {step1Validate.password}
                                </div>
                            }
                            <label htmlFor="confirmPassword" className="text-white mt-2 mb-1">確認密碼</label>
                            <input
                                type="password" name="confirmPassword" id="confirmPassword" autoComplete="new-password"
                                className={`form-control ${step1Validate.confirmPassword ? 'is-invalid' : ''}`}
                                value={data.confirmPassword}
                                onChange={handleChangeData}
                            />
                            {
                                step1Validate.confirmPassword &&
                                <div className="mt-1 invalid-feedback">
                                    {step1Validate.confirmPassword}
                                </div>
                            }
                            <button
                                type="button"
                                className="mt-4 btn btn-primary mt-2 w-100"
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
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register;

import Layout from "@/components/Layout"
import { useState, ChangeEvent } from "react"
import { signup } from '@/services/UserService'
import useUserStore from "@/store/useUserStore"
import { useNavigate } from 'react-router-dom'

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
            "zipcode": 802,
            "detail": "文山路23號"
        }
    })
    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate()

    const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
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
                    zipcode: 802,
                    detail: '文山路23號"'
                }
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
            <h2>Register</h2>
            {
                step === RegisterStepEnum.first ? 
                <>
                    <label>電子信箱</label>
                    <input type="text" value={data.email} name="email" onChange={handleChangeData}/>
                    <br />
                    <label>密碼</label>
                    <input type="password" value={data.password} name="password" onChange={handleChangeData} />
                    <br />
                    <label>確認密碼</label>
                    <input type="password" value={data.confirmPassword} name="confirmPassword" onChange={handleChangeData} />
                    <br />
                    <button type="button" onClick={() => setStep(RegisterStepEnum.second)}>下一步</button>
                </>:
                <>
                    <label>姓名</label>
                    <input type="text" value={data.name} name="name"  onChange={handleChangeData}/>
                    <br />
                    <label>手機號碼</label>
                    <input type="text" value={data.phone} name="phone"  onChange={handleChangeData}/>
                    <br />
                    <label>生日</label>
                    <input type="text" value={data.birthday} name="birthday"  onChange={handleChangeData}/>
                    <br />
                    {/* <label>地址</label>
                    <input type="text" value={data.address} name="name"  onChange={handleChangeData}/>
                    <br /> */}
                    <button type="button" onClick={handleRegister}>完成註冊</button>
                </>                
            }
            </div>
        </Layout>
    )
}

export default Register
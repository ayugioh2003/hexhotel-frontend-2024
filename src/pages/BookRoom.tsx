import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import useUserStore from "@/store/useUserStore"

import Layout from '@/components/Layout';
import SvgIcon from '@/components/SvgIcon';
import RoomInfo from '@/components/RoomInfo'
import DialogMsg from '@/components/DialogMsg'

import addressList from '@/assets/data/address.json'
import { roomInfo, roomLayout, roomEquipment, supplies} from '@/assets/mockdata/room-info';


// 訂房資訊
const BookingInfo = ({ checkIn, checkOut, peopleNum, roomName}:{ checkIn:string, checkOut:string, peopleNum:number, roomName:string }) =>{

  return (
    <ul className="booking-info">
      <h4>訂房資訊</h4>
      <li className="booking-info__box">
        <div className="booking-info__left">
          <div className="booking-info__title">
            <span className="fw-bold">選擇房型</span>
          </div>
          <div className="booking-info__content">
            <p>{roomName}</p>
          </div>
        </div>

        <div className="booking-info__right">
          <button className="fw-bold btn-edit" onClick={() => window.history.back()}>
            編輯
          </button>
        </div>
      </li>

      <li className="booking-info__box">
        <div className="booking-info__left">
          <div className="booking-info__title">
            <span className="fw-bold">訂房日期</span>
          </div>
          <div className="booking-info__content">
            <p>入住：{checkIn}</p>
            <p>退房：{checkOut}</p>
          </div>
        </div>

        <div className="booking-info__right">
          <button className="fw-bold btn-edit" onClick={() => window.history.back()}>
            編輯
          </button>
        </div>
      </li>

      <li className="booking-info__box">
        <div className="booking-info__left">
          <div className="booking-info__title">
            <span className="fw-bold">房客人數</span>
          </div>
          <div className="booking-info__content">
            <p>{peopleNum} 人</p>
          </div>
        </div>

        <div className="booking-info__right">
          <button className="fw-bold btn-edit" onClick={() => window.history.back()}>
            編輯
          </button>
        </div>
      </li>
    </ul>
  )
}
// 訂房人資訊
const Booker = ({token, register, errors, setValue}:{token:string, register:any, errors:any, setValue:unknown}) => {

  const [country, setCountry] = useState(() => '');
  const addressData: CityData[] = addressList;
  const [townList, setTownList] = useState<TownData[]>([]);
  const [town, setTown] = useState(() => '');
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setFunc: React.Dispatch<React.SetStateAction<string>>) => {
      setFunc(e.target.value);
    },
    []
  );


  // 設定表單初始值 (會員資料會塞到這裡)
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    phone: '',
    email:'',
    city: '',
    area: '',
    address: '',
  });

  const getTownList = (countryName:string) => {
    let matchTown:TownData[] =[]
    const nowTowns = addressData.find((item: CityData) => item.name === countryName);

    if (nowTowns && nowTowns.children) {
      matchTown = nowTowns.children.map((item) => {
        return {
          name: item.name,
          code: item.code
        };
      });
      // console.log(`城市：${countryName}，區域資訊：`, matchTown);
    } 

    if (matchTown.length > 0) {
      setTown('')
    }
    setTownList(matchTown);
  }

 
  useEffect(() => {
    getTownList(country)
  }, [country]);

  
  useEffect(() => {
    // 使用 setValue 設置表單的值
    (async() => {
      // 先塞資料
      await getTownList(formData.city) 
  
      setValue('name', formData.name);
      setValue('phone', formData.phone);
      setValue('email', formData.email);
      setValue('address', formData.address);
      setValue('city', formData.city);
      setValue('area', formData.area);
    })()
   
}, [formData, setValue]);

   // 取得會員資料並存起來
  const handlerSetValue = async () => {
    try {
      const response = await fetch('https://freyja-iwql.onrender.com/api/v1/user/', {
        headers: { 'Authorization': `Bearer ${token}` },
        method: 'GET',
      });

      // 確認回應是否成功
      if (!response.ok) {
        // 如果 HTTP 狀態碼不在 200 範圍內
        const errorMessage = await response.text();
        const text = JSON.parse(errorMessage).message
        alert(text)
        // setDialogText(text)
        throw new Error(errorMessage);
      }

      // 處理 API 回應
      const data = await response.json();

      // 郵遞區號轉換地址
      const zipCode = data.result.address.zipcode
      const targetPostalCode  = zipCode.toString()
      
      let resultCity = "";
      let resultArea = "";

      for (const cityData of addressData) {
        for (const areaData of cityData.children) {
          if (areaData.code === targetPostalCode) {
            resultCity = cityData.name;
            resultArea = areaData.name;
            break;
          }
        }
        if (resultCity !== "" && resultArea !== "") {
          break;
        }
      }

      // 輸出結果
      // console.log(`郵遞區號 ${targetPostalCode} 對應的城市為 ${resultCity}，區域為 ${resultArea}`);

      // 當按鈕點擊時更新表單數據的狀態
        setFormData({
          name: data.result.name,
          phone: data.result.phone,
          email: data.result.email,
          city: resultCity,
          area: resultArea,
          address: data.result.address.detail,
        });
      
    } catch (error) {
      console.error('API 請求錯誤:', error);
    }
  };

  return (
    <div className="booker">
      <button className="fw-bold btn-member" type="button" onClick={handlerSetValue}>
        套用會員資料
      </button>
      <h4>訂房人資訊</h4>
      <ul>
        <li className="row booker__box">
            <div className="booker__title">
              <span className="fw-bold">姓名</span>
            </div>
            <div className="col-12">
              <label htmlFor="name" className="form-label hidden">
                姓名
              </label>
              <input 
                type="text" 
                id="name" 
                placeholder="請輸入姓名"
                className={`form-control ${errors.name && 'is-invalid'}`}
                {...register('name', { required: {
                  value: true,
                  message:'請輸入姓名'
                } })} 
                />
                {
                  errors.name &&  <div className="invalid-feedback">{errors?.name?.message }</div>
                }
            </div>
        </li>

        <li className="row booker__box">
          <div className="booker__title">
            <span className="fw-bold">手機號碼</span>
          </div>
          <div className="col-12">
            <label htmlFor="phone" className="form-label hidden">
              手機號碼
            </label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="請輸入手機號碼"
              className={`form-control ${errors.phone && 'is-invalid'}`}
              {...register('phone', { required: {
                value: true,
                message: '請輸入手機號碼'
              } })} 
            />
            {
              errors.phone &&  <div className="invalid-feedback">{ errors?.phone?.message }</div>
            }
          </div>
        </li>

        <li className="row booker__box">
          <div className="booker__title">
            <span className="fw-bold">電子信箱</span>
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label hidden">
              電子信箱
            </label>
            <input 
              type="email"
              id="email" 
              className={`form-control ${errors.email && 'is-invalid'}`}
              placeholder="請輸入電子信箱"
              {...register('email', { required: {
                  value: true,
                  message: '請輸入電子信箱'
              }}) }  
            />
            {
              errors.email &&  <div className="invalid-feedback">{ errors?.email?.message }</div>
            }
          </div>
        </li>

        <li className="row booker__box">
          <div className="booker__title">
            <span className="fw-bold">地址</span>
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="city" className="form-label hidden">
              city
            </label>
            <select 
              className={`form-select ${errors.city && 'is-invalid'}`}
              id="city" 
              value={country}
              {...register('city',{ required: true })}
              onChange={e => handleInput(e, setCountry) }
              >
              <option disabled value="">
                請選擇...
              </option>
              {
                addressData.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
              }
            </select>
            {
              errors.city &&  <div className="invalid-feedback">請選擇</div>
            }
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="area" className="form-label hidden">
              area
            </label>
            <select 
              className={`form-select ${errors.area && 'is-invalid'}`}
              id="area" 
              value={town} 
              {...register('area', { required: true })}
              onChange={e => handleInput(e, setTown)}
              >
              <option disabled value="">
                請選擇...
              </option>
              { 
                townList?.map(item => (
                  <option key={`${item.name}_${item.name}`} value={item.name} data-code={item.code}>{item.name}</option>
                ))
              }
            </select>
            {
              errors.area &&  <div className="invalid-feedback">請選擇</div>
            }
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label hidden">
              地址
            </label>
            <input 
              type="text" 
              id="address" 
              // ref={addressRef}
              className={`form-control ${errors.address && 'is-invalid'}`}
              placeholder="請輸入詳細地址" 
              {...register('address', { required: {
                value: true,
                message: '請輸入詳細地址'
              } })}
            />
            {
              errors.address &&  <div className="invalid-feedback">{errors?.address?.message}</div>
            }
          </div>
        </li>
      </ul>
    </div>
  )
}

// 卡片資訊
const CardInfo = ({ price, pic, days }: { price: number, pic: string, days: number }) => {
  
  return (
    <div className="card">
      <img
        src={pic}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h4 className="card-title">價格詳情</h4>
        <div className="card-content">
          <p className="price">
            NT$ {price}
            <SvgIcon
              name="svg/ic_close"
              color={'black'}
              width={16}
              height={16}
              className="multiply"
            ></SvgIcon>
            {days} 晚<span>NT$ {price * days}</span>
          </p>

          <p className="discount">
            住宿折扣
            <span>NT$ 0</span>
          </p>

          <hr />

          <p className="fw-bold total">
            總價
            <span>NT$ {price * days}</span>
          </p>
        </div>

        <button type="submit" className="btn btn-primary" >
          確認訂房
        </button>
      </div>
    </div>
  )
}

const BookRoom = () => {
  // 從 room/:id 頁面取得 state 資料
  // roomId: 房間ID，自己從 API or 全域變數取得房型資料
  // peopleNum: 人數
  // checkInDate: 起住日期
  // checkOutDate: 退房日期
  const location = useLocation();
  const navigate = useNavigate();
  const token = useUserStore((state: { token: string }) => state.token);
  
  const [isDialogMsg, setIsDialogMsg] = useState(false);
  const [ dialogText, setDialogText] = useState<string>('')
  const [ rooms, setRooms ]= useState({})
  const [ stayingDays, setStayingDays] = useState(0)
  const [ weekDays, setWeekDays] = useState({})
  

  // 取得月日星期幾
  const formattarFun = (checkData: string): string => {
    const getData: Date = new Date(checkData);

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      weekday: "long"
    };
  
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("zh-CN", options);
    const formattedDate: string = formatter.format(getData);
    return formattedDate
  }



  useEffect(() => {
    (async () => {
      try {
        
        // 計算 住房的天數
        const checkIn: dayjs.Dayjs = dayjs(location.state.checkInDate);
        const checkOut: dayjs.Dayjs = dayjs(location.state.checkOutDate);
        const daysStayed: number = checkOut.diff(checkIn, 'day');
        setStayingDays(daysStayed)

        // 設定 月日星期幾
        const formatCheckIn = formattarFun(location.state.checkInDate) 
        const formatCheckOut = formattarFun(location.state.checkOutDate)
        setWeekDays({ checkIn: formatCheckIn, checkOut:formatCheckOut}) 
        
        // 取得房型資料
        if (location.state.roomId) {
          const res = await fetch(`https://freyja-iwql.onrender.com/api/v1/rooms/${location.state.roomId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'GET',
          });
          const data = await res.json();
          setRooms(data.result);
        }
      } catch (error) {
        console.log('rooms error =>', error);
      }      
    })()
  }, [location.state, token]);

  const {
    register, 
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues:{}
  })

  
  const submit = async (data) => {

    setDialogText('正在處理你的預訂')
    setIsDialogMsg(true)

    // 換算成郵遞區號
    const cityData = addressList.find((item: CityData) => item.name === data.city)
    const areaData = cityData ? cityData.children.find(item => item.name === data.area) : {}

    try {
      // 新增訂單
      const response = await fetch('https://freyja-iwql.onrender.com/api/v1/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          roomId: location.state.roomId,
          checkInDate: location.state.checkInDate,
          checkOutDate: location.state.checkOutDate,
          peopleNum: location.state.peopleNum,
          userInfo: {
            address: {
              zipcode: areaData?.code,
              detail: data.address,
            },
            name: data.name,
            phone: data.phone,
            email: data.email,
          },
        }),
      });
  
      // 確認回應是否成功
      if (!response.ok) {
        // 如果 HTTP 狀態碼不在 200 範圍內
        const errorMessage = await response.text();
        const text = JSON.parse(errorMessage).message
        setDialogText(text)
        throw new Error(errorMessage);
      }
  
      // 處理 API 回應，可以根據實際情況進行處理
      const responseData = await response.json();
      // console.log('API 回應:', responseData);
      
      setIsDialogMsg(false)
      navigate('/BookingSuccess', { state: { 
          orderId: responseData.result._id , 
          stayingDays: stayingDays,
          checkInDate: weekDays.checkIn,
          checkOutDate: weekDays.checkOut
        } 
      });

    } catch (error) {
      console.error('API 請求錯誤:', error);
      setTimeout(() => {
        setIsDialogMsg(false);
      }, 2000) as NodeJS.Timeout;
    }
  };
  

  return (
    <Layout>
      <form className="container-fluid book-room" action='' onSubmit={handleSubmit(submit)}>
        {
          isDialogMsg ? <DialogMsg message={dialogText}/> : ''
        }
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>
                <SvgIcon name="svg/ic_arrow-left" color={'black'}></SvgIcon> 確認訂房資訊
              </h3>
            </div>


            <div className="col-lg-7 col-md-6 col-sm-12">
              {/* 訂房資訊 */}
              <BookingInfo 
                checkIn={ weekDays?.checkIn }
                checkOut={ weekDays?.checkOut }
                peopleNum={ location.state?.peopleNum }
                roomName={ rooms?.name }
              />
              <hr />

              {/* 訂房人資訊 */}
              <Booker 
                token={token} 
                register={register}
                errors={errors}
                setValue={setValue}
              />

              <hr />

              <RoomInfo  roomInfo={roomInfo} roomLayout={roomLayout} roomEquipment={roomEquipment} supplies={supplies} />

            </div>

            <div className="col-lg-5 col-md-6 col-sm-12">
               {/* 卡片資訊 */}
              <CardInfo 
                price={ rooms.price }
                pic={ rooms.imageUrl }
                days={ stayingDays }
              />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default BookRoom;

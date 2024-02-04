import { useLocation, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import useUserStore from "@/store/useUserStore"

import Layout from "@/components/Layout"
import SvgIcon from '@/components/SvgIcon'
import InfoList from '@/components/InfoList'
import { roomEquipment, supplies} from '@/assets/mockdata/room-info'


// 訂房人
const LeftContent = ({ email, name, phone }:{email:string, name: string, phone: string}) => {
  const navigate = useNavigate();

  return (
    <div className="col-lg-7 col-md-6 col-sm-12">
      <div className="booking-result">
        <div className="booking-result__message">
          <SvgIcon name="svg/ic_check" color={'#FFFFFF'}/>
          <p>恭喜，{name}！ <br /> 您已預訂成功</p>
        </div>
        <div className="booking-result__text">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</div>
      </div>
      <hr />
      <div className="booking-result">
        <h5>立即查看您的訂單紀錄</h5>
        <button type="button" className="btn btn-primary" onClick={() => { navigate('/Member') }}>前往我的訂單</button>
      </div>
      <hr />
      <div className="booking-result">
        <ul className="booking-result__booker">
          <h5>訂房人資訊</h5>
          <li>
            <p className="title">姓名</p>
            <p className="text">{name}</p>
          </li>
          <li>
            <p className="title">手機號碼</p>
            <p className="text">{phone}</p>
          </li>
          <li>
            <p className="title">電子信箱</p>
            <p className="text">{email}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

// 訂房卡片資訊
const CardContent = ({orderUserId, roomName, peopleNum, price, pic, days, checkInDate, checkOutDate}:{orderUserId:number, roomName:string, peopleNum:number, price:number, pic:string, days:number, checkInDate:string, checkOutDate:string}) => {
  return (
    <div className="col-lg-5 col-md-6 col-sm-12">
      <div className="card">
        <div className="card-head">
          <p>預訂參考編號： {orderUserId}</p>
          <h5>即將來的行程</h5>
        </div>
        <img src={pic} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="card-content">

            <div className="booking-info">
              <div className="booking-info__title">
                <h6>{roomName}，1 晚 <span>|</span> 住宿人數：{peopleNum} 位</h6>
              </div>
              <div className="booking-info__content">
                <p>入住：{checkInDate}，15:00 可入住</p>
                <p>退房：{checkOutDate}，12:00 前退房</p>
              </div>
              <div className="fw-bold booking-info__total">
                <span>NT$ {price * days}</span>
              </div>
            </div>

            <hr />

            <div className="room-info mb-0">
              <li className="room-info__box">
                <div className="room-info__title">
                  <b>房內設備</b>
                </div>
                <InfoList data={roomEquipment} className={'room-info__content room-info__content--border'}/>
              </li>
          
              <li className="room-info__box">
                <div className="room-info__title">
                  <b>備品提供</b>
                </div>
                <InfoList data={supplies} className={'room-info__content room-info__content--border'}/> 
              </li>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}

const BookingSuccess = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('')
  const [ orderList, setOrderList]= useState({})
  const [ order, setOrder ] = useState({})
  
  const token = useUserStore((state: { token: string }) => state.token);
  
  // const navigate = useNavigate();
  useEffect(() => {

    (async() => {
      try {
        // 取 order 資料
        setOrder(location.state);
        
        // 設置 orderId
        setOrderId(location.state.orderId);
      
        // 在設置狀態之前檢查組件是否仍然掛載
        if ( orderId !== '') {
          const res = await fetch(`https://freyja-iwql.onrender.com/api/v1/orders/${orderId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'GET',
          });
          const data = await res.json();
          setOrderList(data.result);

        }
      } catch (error) {
        console.log('rooms error =>', error);
      }
    })()
  }, [location.state, token, orderId]);
  
  return ( 
    <Layout>
      <div className="container-fluid booking-success bg-deco">
        <div className="container">
          <div className="row">
            {/* 訂房人 */}
            <LeftContent 
              email={orderList?.userInfo?.email} 
              name={orderList?.userInfo?.name} 
              phone={orderList?.userInfo?.phone} 
            />
            
            {/* 訂房卡片資訊 */}
            <CardContent
              orderUserId={orderList?.orderUserId}
              roomName={orderList?.roomId?.name}
              peopleNum={orderList?.peopleNum}
              price={orderList?.roomId?.price}
              pic={orderList?.roomId?.imageUrl}
              days={location.state.stayingDays}
              checkInDate={location.state.checkInDate}
              checkOutDate={location.state.checkOutDate}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BookingSuccess
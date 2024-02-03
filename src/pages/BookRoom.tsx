import { useLocation } from "react-router-dom";

import Layout from '@/components/Layout';
import SvgIcon from '@/components/SvgIcon';
import RoomInfo from '@/components/RoomInfo'

// import { roomInfo, roomLayout, roomEquipment, supplies} from '@/assets/mockdata/room-info';

// import DialogMsg from '@/components/DialogMsg'

const BookRoom = () => {
  // 從 room/:id 頁面取得 state 資料
  // roomId: 房間ID，自己從 API or 全域變數取得房型資料
  // peopleNum: 人數
  // checkInDate: 起住日期
  // checkOutDate: 退房日期
  // roomDetail: 房型詳細資料
  const location = useLocation();
  console.log('location', location)
  const { roomDetail } = location.state

  const editBooking = () => {
    console.log('editBooking');
  };

  return (
    <Layout>
      {/* <DialogMsg /> */}
      <div className="container-fluid book-room">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>
                <SvgIcon name="svg/ic_arrow-left" color={'black'}></SvgIcon> 確認訂房資訊
              </h3>
            </div>


            <div className="col-lg-7 col-md-6 col-sm-12">
              <ul className="booking-info">
                <h4>訂房資訊</h4>
                <li className="booking-info__box">
                  <div className="booking-info__left">
                    <div className="booking-info__title">
                      <span className="fw-bold">選擇房型</span>
                    </div>
                    <div className="booking-info__content">
                      <p>尊爵雙人房</p>
                    </div>
                  </div>

                  <div className="booking-info__right">
                    <button className="fw-bold btn-edit" onClick={editBooking}>
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
                      <p>入住：12 月 4 日星期二</p>
                      <p>退房：12 月 6 日星期三</p>
                    </div>
                  </div>

                  <div className="booking-info__right">
                    <button className="fw-bold btn-edit" onClick={editBooking}>
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
                      <p>2 人</p>
                    </div>
                  </div>

                  <div className="booking-info__right">
                    <button className="fw-bold btn-edit" onClick={editBooking}>
                      編輯
                    </button>
                  </div>
                </li>
              </ul>

              <hr />


              <div className="booker">
                <button className="fw-bold btn-member" onClick={editBooking}>
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
                        <input type="text" className="form-control" id="name"  placeholder="請輸入姓名" />
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
                      <input type="tel" className="form-control" id="phone"  placeholder="請輸入姓名" />
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
                      <input type="email" className="form-control" id="email"  placeholder="請輸入姓名" />
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
                      <select className="form-select" id="city">
                        <option selected disabled>
                          請選擇...
                        </option>
                        <option>高雄市</option>
                      </select>
                    </div>
                    <div className="col-6 mb-3">
                      <label htmlFor="area" className="form-label hidden">
                        area
                      </label>
                      <select className="form-select" id="area">
                        <option selected disabled >
                          請選擇...
                        </option>
                        <option>新興區</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="address" className="form-label hidden">
                        地址
                      </label>
                      <input type="text" className="form-control" id="address" placeholder="請輸入詳細地址" />
                    </div>
                  </li>
                </ul>
              </div>

              <hr />

              <RoomInfo roomDetail={roomDetail} />

            </div>

            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h4 className="card-title">價格詳情</h4>
                  <div className="card-content">
                    <p className="price">
                      NT$ 10,000
                      <SvgIcon
                        name="svg/ic_close"
                        color={'black'}
                        width={16}
                        height={16}
                        className="multiply"
                      ></SvgIcon>
                      2 晚<span>NT$ 20,000</span>
                    </p>

                    <p className="discount">
                      住宿折扣
                      <span>NT$ 20,000</span>
                    </p>

                    <hr />

                    <p className="fw-bold total">
                      總價
                      <span>NT$ 19,000</span>
                    </p>
                  </div>

                  <button type="button" className="btn btn-primary">
                    確認訂房
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookRoom;

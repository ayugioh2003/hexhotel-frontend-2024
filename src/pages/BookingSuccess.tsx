import Layout from "@/components/Layout"
import SvgIcon from '@/components/SvgIcon'
import InfoList from '@/components/InfoList'

const BookingSuccess = () => {
  
  const roomEquipment: string[] = [
    '平面電視','吹風機','冰箱','熱水壺','檯燈','衣櫃','除濕機','浴缸','書桌','音響'
  ]
  const supplies: string[] = [
    '衛生紙','拖鞋','沐浴用品','清潔用品','刮鬍刀','吊衣架','浴巾','刷牙用品','罐裝水','梳子'
  ]

  return ( 
    <Layout>
      <div className="container-fluid booking-success bg-deco">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <div className="booking-result">
                <div className="booking-result__message">
                  <SvgIcon name="svg/ic_check" color={'#FFFFFF'}/>
                  <p>恭喜，Jessica！ <br /> 您已預訂成功</p>
                </div>
                <div className="booking-result__text">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</div>
              </div>
              <hr />
              <div className="booking-result">
                <h5>立即查看您的訂單紀錄</h5>
                <button type="button" className="btn btn-primary">前往我的訂單</button>
              </div>
              <hr />
              <div className="booking-result">
                <ul className="booking-result__booker">
                  <h5>訂房人資訊</h5>
                  <li>
                    <p className="title">姓名</p>
                    <p className="text">Jessica Ｗang</p>
                  </li>
                  <li>
                    <p className="title">手機號碼</p>
                    <p className="text">+886 912 345 678</p>
                  </li>
                  <li>
                    <p className="title">電子信箱</p>
                    <p className="text">jessica@sample.com</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-head">
                  <p>預訂參考編號： HH2302183151222</p>
                  <h5>即將來的行程</h5>
                </div>
                <img src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className="card-content">

                    <div className="booking-info">
                      <div className="booking-info__title">
                        <h6>尊爵雙人房，1 晚 <span>|</span> 住宿人數：2 位</h6>
                      </div>
                      <div className="booking-info__content">
                        <p>入住：6 月 10 日星期二，15:00 可入住</p>
                        <p>退房：6 月 11 日星期三，12:00 前退房</p>
                      </div>
                      <div className="fw-bold booking-info__total">
                        <span>NT$ 10,000</span>
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
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BookingSuccess
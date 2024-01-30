import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import Carousel from '@/components/Carousel.tsx';
import RoomInfo from '@/components/RoomInfo';

import { roomsRes } from '@/assets/mockdata/rooms.ts';
import { roomInfo, roomEquipment, roomLayout, supplies } from '@/assets/mockdata/room-info';

import minusImg from '@/assets/svg/ic_minus.svg';
import plusImg from '@/assets/svg/ic_plus.svg';

const Header = () => {
  return (
    <div className="room-header">
      <div className="readmore">看更多</div>
      <div className="d-none d-md-block ">
        <div style={{ height: '124px' }}></div>
        <div className="room-header__gallery">
          <div className="gallery-item">
            <img src={roomsRes.result[0].imageUrlList[0]} alt="" />
          </div>
          <div className="gallery-item">
            <img src={roomsRes.result[0].imageUrlList[1]} alt="" />
          </div>
          <div className="gallery-item">
            <img src={roomsRes.result[0].imageUrlList[2]} alt="" />
          </div>
          <div className="gallery-item">
            <img src={roomsRes.result[0].imageUrlList[3]} alt="" />
          </div>
          <div className="gallery-item">
            <img src={roomsRes.result[0].imageUrlList[4]} alt="" />
          </div>
        </div>
      </div>
      <div className="d-block d-md-none">
        <div style={{ height: '72px' }}></div>
        <Carousel
          imageUrlList={roomsRes.result[0].imageUrlList}
          imageStyle={{
            width: '100%',
            aspectRatio: '16 / 9',
            filter: 'brightness(80%)'
          }}
          controls={false}
        ></Carousel>
      </div>
    </div>
  );
};

const Room = () => {
  const navigate = useNavigate();

  const [peopleNum, setPeopleNum] = useState(1);

  return (
    <div className="container room-detail">
      <div className="row justify-content-between">
        <div className="col-lg-7 col-sm-12">
          <RoomInfo
            showToKnow={true}
            roomInfo={roomInfo}
            roomEquipment={roomEquipment}
            roomLayout={roomLayout}
            supplies={supplies}
          />
        </div>

        <div className="col-lg-4 col-sm-12">
          <div className="card room-card">
            <div className="card-body">
              <div className="room-card__hint">預約房型</div>
              <hr />
              <h4 className="card-title">尊爵雙人房</h4>
              <div className="card-content">
                <div className="room-card__description">
                  享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
                </div>
                <div className="room-card__range">入住 進房</div>
                <div className="room-card__people">
                  <div>人數</div>
                  <div className="d-flex gap-3 align-items-center">
                    <button
                      className="p-3 bg-transparent border border-light rounded-circle"
                      onClick={() => {
                        if (peopleNum <= 1) {
                          return;
                        }
                        setPeopleNum(peopleNum - 1);
                      }}
                    >
                      <img src={minusImg} alt="" />
                    </button>
                    <div className="room-card__people-num">{peopleNum}</div>
                    <button
                      className="p-3 bg-transparent border border-light rounded-circle"
                      onClick={() => {
                        if (peopleNum >= 4) {
                          return;
                        }
                        setPeopleNum(peopleNum + 1);
                      }}
                    >
                      <img src={plusImg} alt="" />
                    </button>
                  </div>
                </div>
                <div className="room-card__price">NT& 10,000</div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => {
                  navigate('/bookRoom', {
                    state: {
                      roomId: '65a53b55abddf349a961859d',
                      checkInDate: '',
                      checkOutDate: '',
                      peopleNum: peopleNum,
                    }
                  });
                }}
              >
                立即預約
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomPage = () => {
  return (
    <Layout>
      <div className="room">
        <Header></Header>
        <Room />
      </div>
    </Layout>
  );
};

export default RoomPage;

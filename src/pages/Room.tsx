import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import Modal from 'react-modal';

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

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

  const [checkInDateTemp, setCheckInDateTemp] = useState(new Date());
  const [checkOutDateTemp, setCheckOutDateTemp] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

  function DateRanges({
    onClick,
    checkInDate,
    checkOutDate
  }: {
    onClick?: () => void;
    checkInDate: Date;
    checkOutDate: Date;
  }) {
    return (
      <div className="room-card__dates" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="room-card__date">
          <div>入住</div>
          <div>{dayjs(checkInDate).format('YYYY / MM / DD')}</div>
        </div>
        <div className="room-card__date">
          <div>退房</div>
          <div>{dayjs(checkOutDate).format('YYYY / MM / DD')}</div>
        </div>
      </div>
    );
  }

  function RoomModal() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        maxWidth: '650px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    const onDatePickerChange = (dates: [Date, Date]) => {
      const [start, end] = dates;
      setCheckInDateTemp(start);
      setCheckOutDateTemp(end);
    };

    const confirmDate = () => {
      setCheckInDate(checkInDateTemp);
      setCheckOutDate(checkOutDateTemp);

      closeModal();
    };

    const clearDate = () => {
      setCheckInDateTemp(checkInDate);
      setCheckOutDateTemp(checkOutDate);
    };

    return (
      <>
        <DateRanges onClick={openModal} checkInDate={checkInDate} checkOutDate={checkOutDate} />

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <div className="d-flex gap-3 gap-md-5 pb-4 justify-content-between flex-column flex-md-row">
            <div style={{ width: '450px' }}>
              <div className='fw-bold'>
                { dayjs(checkOutDateTemp).diff(dayjs(checkInDateTemp), 'day') }
                <span>晚</span>
              </div>
              <div className="d-flex">
                {dayjs(checkInDateTemp).format('YYYY / MM / DD')}
                <span className="px-2"> - </span>
                {dayjs(checkOutDateTemp).format('YYYY / MM / DD')}
              </div>
            </div>
            <div style={{ width: '100%', minWidth: '300px', maxWidth: '500px' }}>
              <DateRanges checkInDate={checkInDateTemp} checkOutDate={checkOutDateTemp} />
            </div>
          </div>

          <div className="d-flex justify-content-center mb-5">
            <DatePicker
              selected={checkInDateTemp}
              onChange={onDatePickerChange}
              startDate={checkInDateTemp}
              endDate={checkOutDateTemp}
              monthsShown={2}
              selectsRange
              inline
            />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-light text-dark" onClick={clearDate}>
              清除日期
            </button>
            <button className="btn btn-primary" disabled={!checkOutDateTemp} onClick={confirmDate}>
              確定日期
            </button>
          </div>
        </Modal>
      </>
    );
  }

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
                <div className="room-card__range">
                  <RoomModal></RoomModal>
                </div>
                <div className="room-card__people">
                  <div className='fw-bold'>人數</div>
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
                      checkInDate: dayjs(checkInDate).format('YYYY/MM/DD'),
                      checkOutDate: dayjs(checkOutDate).format('YYYY/MM/DD'),
                      peopleNum: peopleNum
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

import Layout from '../components/Layout'
import Carousel from '@/components/Carousel.tsx'

import sizeImg from '@/assets/svg/ic_Size.svg'
import bedImg from '@/assets/svg/ic_Bed.svg'
import personImg from '@/assets/svg/ic_Person.svg'
import arrowRightImg from '@/assets/svg/ic_ArrowRight.svg'

import { roomsRes } from '@/assets/mockdata/rooms.ts'

const Header = () => {
  return (
    <div className="rooms-header">
      <Carousel
        imageUrlList={roomsRes.result[0].imageUrlList}
        imageStyle={{
          width: '100%',
          maxHeight: '100vh',
          height: '100vh',
          filter: 'brightness(40%)'
        }}
        controls={false}
      ></Carousel>

      <div className='rooms-header__body '>
        <div className='rooms-header__left '>
          <div className='rooms-header__title'>享樂酒店</div>
          <div className='rooms-header__description'>Enjoyment Luxury Hotel</div>
          <div className='rooms-header__line d-none d-md-block'></div>
        </div>
        <div className='rooms-header__line d-block d-md-none '></div>
        <div className='rooms-header__right '>客房旅宿</div>
      </div>
    </div>
  )
}

const Room = ({ room }: { room: Room }) => {
  const {
    imageUrlList,
    name,
    description,
    areaInfo,
    bedInfo,
    maxPeople,
    price,
  } = room

  return (
    <div className="room row g-0 ">
      <div className="col-12 col-md-7 ">
        <Carousel imageUrlList={imageUrlList} />
      </div>
      <div className="col-12 col-md-5 bg-white p-4">
        <div className="mb-4">
          <div className="room-title">{name}</div>
          <div className="room-description">{description}</div>
        </div>
        <div className="d-flex gap-3">
          <div className="room-info">
            <div className="room-info__img">
              <img src={sizeImg} width="24px" height="24px" alt="" />
            </div>
            <div className="room-info__text">{areaInfo}</div>
          </div>
          <div className="room-info">
            <div className="room-info__img">
              <img src={bedImg} width="24px" height="24px" alt="" />
            </div>

            <div className="room-info__text">{bedInfo}</div>
          </div>
          <div className="room-info">
            <div className="room-info__img">
              <img src={personImg} width="24px" height="24px" alt="" />
            </div>
            <div className="room-info__text">{maxPeople}人</div>
          </div>
        </div>

        <div className="room-division my-5"></div>

        <div className="room-action">
          <div className="room-action__price">NT$ {price}</div>
          <button className="room-action__btn">
            <img src={arrowRightImg} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Rooms = () => {
  return (
    <div className="rooms">
      <div className="container">
        <div className="rooms-heading">
          <div className="rooms-title">房型選擇</div>
          <div className="rooms-description">各種房型，任您調選</div>
        </div>

        <div>
          {roomsRes.result.map((room, index) => {
            return (
              <div key={index} className="mb-5 rounded-4 overflow-hidden">
                <Room room={room} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const RoomsPage = () => {
  return (
    <Layout>
      <Header />
      <Rooms />
    </Layout>
  )
}

export default RoomsPage

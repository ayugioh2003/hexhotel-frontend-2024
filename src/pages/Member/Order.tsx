import InfoList from '@/components/InfoList';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getUserOrders, deleteUserOrders } from '@/services/OrderService';
import useUserStore from '@/store/useUserStore';
type order = {
  id: string;
  type: string;
  people: string;
  startDate: string;
  day: string;
  price: string;
  imgUrl: string;
  equipment: string[];
  supplies: string[];
};

const dateToString = (timestamp: number) => {
  let date = new Date(timestamp);
  switch (date.getDay()) {
    case 0: {
      return '星期日';
    }
    case 1: {
      return '星期一';
    }
    case 2: {
      return '星期二';
    }
    case 3: {
      return '星期三';
    }
    case 4: {
      return '星期四';
    }
    case 5: {
      return '星期五';
    }
    case 6: {
      return '星期六';
    }
    default: {
      return '星期六';
    }
  }
};
const dateFormat = (timestamp: number) => {
  let date = new Date(timestamp - 1000);
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日${dateToString(timestamp)}`;
};
const OrderHistoryList: React.FC = () => {
  const [roomList, setRoomList] = useState<order[]>(() => []);
  const token = useUserStore(s => s.token);
  useEffect(() => {
    (async () => {
      let res = await getUserOrders(token);
      let tempRoomList: order[] = [];
      let result = res.result.filter((item: any) => {
        let checkInTime =
          new Date(item.checkInDate).getTime() + 1000 * 60 * 60 * (15 + new Date().getTimezoneOffset() / 60);
        return item.status !== 0 || checkInTime < new Date().getTime();
      });
      result.forEach((item: any) => {
        let id = item._id;
        let equipment: string[] = [];
        item.roomId.facilityInfo.forEach((factoryItem: { title: string; isProvide: boolean }) => {
          if (factoryItem.isProvide == true) {
            equipment.push(factoryItem.title);
          }
        });
        let supplies: string[] = [];
        item.roomId.amenityInfo.forEach((supplyItem: { title: string; isProvide: boolean }) => {
          if (supplyItem.isProvide == true) {
            supplies.push(supplyItem.title);
          }
        });
        let type = item.roomId.name;
        let people = item.peopleNum;
        let startDate = item.checkInDate.split('T')[0];
        let day = String(
          (new Date(item.checkOutDate).getTime() - new Date(item.checkInDate).getTime()) / 24 / 60 / 60 / 1000
        );
        let price = String(item.roomId.price);
        tempRoomList.push({
          id,
          type,
          people,
          startDate,
          day,
          price,
          imgUrl: item.roomId.imageUrlList[0],
          equipment,
          supplies
        });
      });
      setRoomList(tempRoomList);
    })();
  }, []);
  return (
    <>
      {roomList.length > 0 ? (
        <>
          <ul className="history-list">
            {roomList.map(historyItem => {
              return (
                <li className="history-item">
                  <img className="history-item-image" src={historyItem.imgUrl} width="120px" height="80px" />
                  <div className="history-item-info">
                    <div className="item-id">預定參考編號：#{historyItem.id}</div>
                    <div className="item-type">{historyItem.type}</div>
                    <div className="item-day">住宿天數：{historyItem.day} 晚</div>
                    <div className="item-people">住宿人數：{historyItem.people} 位</div>
                    <div className="start-date">入住：{dateFormat(new Date(historyItem.startDate).getTime())}</div>
                    <div className="end-date">
                      退房：
                      {dateFormat(
                        new Date(historyItem.startDate).getTime() + Number(historyItem.day) * 3600 * 1000 * 24
                      )}
                    </div>
                    <div className="item-price">
                      <span>NT$ </span>
                      {Number(historyItem.price)
                        .toLocaleString(undefined, {
                          style: 'currency',
                          currency: 'NTD',
                          maximumFractionDigits: 0
                        })
                        .replace('NTD', '')}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <div>暫無歷史訂單</div>
        </>
      )}
    </>
  );
};
const Order = () => {
  const [roomList, setRoomList] = useState<order[]>(() => []);
  const token = useUserStore(s => s.token);
  const [key, setKey] = useState(() => 1);
  async function getOrder() {
    let res = await getUserOrders(token);
    let tempRoomList: order[] = [];
    let result = res.result.filter((item: any) => {
      let checkInTime =
        new Date(item.checkInDate).getTime() + 1000 * 60 * 60 * (15 + new Date().getTimezoneOffset() / 60);
      return item.status === 0 && checkInTime > new Date().getTime();
    });
    result.forEach((item: any) => {
      let id = item._id;
      let equipment: string[] = [];
      item.roomId.facilityInfo.forEach((factoryItem: { title: string; isProvide: boolean }) => {
        if (factoryItem.isProvide == true) {
          equipment.push(factoryItem.title);
        }
      });
      let supplies: string[] = [];
      item.roomId.amenityInfo.forEach((supplyItem: { title: string; isProvide: boolean }) => {
        if (supplyItem.isProvide == true) {
          supplies.push(supplyItem.title);
        }
      });
      let type = item.roomId.name;
      let people = item.peopleNum;
      let startDate = item.checkInDate.split('T')[0];
      let day = String(
        (new Date(item.checkOutDate).getTime() - new Date(item.checkInDate).getTime()) / 24 / 60 / 60 / 1000
      );
      let price = String(item.roomId.price);
      tempRoomList.push({
        id,
        type,
        people,
        startDate,
        day,
        price,
        imgUrl: item.roomId.imageUrlList[0],
        equipment,
        supplies
      });
    });
    setRoomList(tempRoomList);
  }
  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    getOrder();
  }, [key]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function closeModal() {
    setModalIsOpen(false);
  }
  function openModal() {
    setModalIsOpen(true);
  }
  async function cancelOrder() {
    await deleteUserOrders(roomList[0].id, token);
    closeModal();
    setKey(key + 1);
  }
  const OrderModal = () => {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        maxWidth: '650px',
        marginRight: '-50%',
        padding: '12px',
        transform: 'translate(-50%, -50%)'
      }
    };
    return (
      <>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <div className="order-modal">
            <div className="order-modal-text">確定要取消此房型的預定嗎</div>
            <div className="order-modal-group">
              <button className="btn btn-secondary" onClick={closeModal}>
                關閉視窗
              </button>
              <button className="btn btn-primary" onClick={cancelOrder}>
                確認取消
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  return (
    <div className="member-order">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className="card">
              {roomList.length > 0 ? (
                <>
                  <div className="card-info">預定參考編號：#{roomList[0].id}</div>
                  <div className="card-title">即將來的行程</div>
                  <div className="order-detail">
                    <div className="order-detail-room">
                      <div className="room-image">
                        <img object-fit="cover" src={roomList[0].imgUrl} width="100%"></img>
                      </div>
                      <div className="room-info">
                        <span className="type">
                          {roomList[0].type}，{roomList[0].day} 晚
                        </span>
                        <span className="people">住宿人數：{roomList[0].people} 位</span>
                      </div>
                      <div className="room-date">
                        <div className="start-date">
                          {dateFormat(new Date(roomList[0].startDate).getTime())}，15:00 可入住
                        </div>
                        <div className="end-date">
                          {dateFormat(
                            new Date(roomList[0].startDate).getTime() + Number(roomList[0].day) * 3600 * 1000 * 24
                          )}
                          ，12:00 前退房
                        </div>
                      </div>
                      <div className="room-price">
                        <span>NT$ </span>
                        {Number(roomList[0].price)
                          .toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'NTD',
                            maximumFractionDigits: 0
                          })
                          .replace('NTD', '')}
                      </div>
                    </div>
                    <ul className="order-detail-device">
                      <li className="room-info__box">
                        <div className="room-info__title">
                          <h5>房內設備</h5>
                        </div>
                        <InfoList data={roomList[0].equipment} />
                      </li>

                      <li className="room-info__box">
                        <div className="room-info__title">
                          <h5>備品提供</h5>
                        </div>
                        <InfoList data={roomList[0].supplies} />
                      </li>
                    </ul>
                    <div className="order-detail-control">
                      <button type="button" className="btn btn-secondary" onClick={() => openModal()}>
                        取消預定
                      </button>
                      <button type="button" className="btn btn-primary">
                        查看詳情
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>暫無即將到來訂單</div>
                </>
              )}
            </div>
          </div>
          <div className="col-5">
            <div className="card">
              <div className="card-title">歷史訂單</div>
              <div className="order-history">
                <OrderHistoryList key={key} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderModal />
    </div>
  );
};
export default Order;

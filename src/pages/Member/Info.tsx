import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import cityData from '@/assets/data/cityDistrict.json';
import { queryUser, updateUser } from '@/services/UserService';
import useUserStore from '@/store/useUserStore';
type validateFormItem = {
  status: boolean;
  msg: string | null;
};
enum validateName {
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  reNewPassword = 'reNewPassword',
  name = 'name',
  phone = 'phone',
  addressDetail = 'addressDetail'
}
type validateForm = {
  oldPassword: validateFormItem;
  newPassword: validateFormItem;
  reNewPassword: validateFormItem;
  name: validateFormItem;
  phone: validateFormItem;
  addressDetail: validateFormItem;
};
type errorResponse = {
  message: string;
  status: number;
};
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
const MemberInfo = () => {
  const token = useUserStore(s => s.token);
  const [mode, setMode] = useState(() => 'show');
  const [userData, setUserData] = useState<userResult | null>(() => null);
  const getUserInfo = async () => {
    let res = (await queryUser(token)).result;
    setUserData(res);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  let handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setFunc: React.Dispatch<React.SetStateAction<string>>) => {
      setFunc(e.target.value);
    },
    []
  );
  let PasswordNode: React.FC = () => {
    let template = [];
    for (let i = 0; i < 8; i++) {
      template.push(<i key={i} className="password-node"></i>);
    }
    return <div className="password-node-wrapper">{template}</div>;
  };
  let ShowInfo: React.FC = () => {
    const [email, setEmail] = useState('Jessica@exsample.com');
    const [name, setName] = useState(() => 'Jessica Ｗang');
    const [phone, setPhone] = useState(() => '+886912345678');
    const [birthday, setBirthday] = useState(() => '1990 年 8 月 15 日');
    const [address, setAddress] = useState(() => '高雄市新興區六角路 123 號');
    useEffect(() => {
      if (userData != null) {
        setName(userData.name);
        setPhone(userData.phone);
        setEmail(userData.email);
        let birthdaySource = userData.birthday.split('T')[0].split('-');
        setBirthday(`${birthdaySource[0]} 年 ${birthdaySource[1]} 月 ${birthdaySource[2]} 日`);
        let tempCity: string = '';
        let tempTown: {
          zip: string;
          name: string;
        } = {
          zip: '',
          name: ''
        };
        cityData.some(city => {
          let ownerCity = city.districts.some(town => {
            if (town.zip == String(userData.address.zipcode)) {
              tempTown = town;
              tempCity = city.city;
              return true;
            }
          });
          if (ownerCity) {
            return true;
          }
        });
        setAddress(`${tempCity}${tempTown.name}${userData.address.detail}`);
      }
    }, [userData]);
    return (
      <div className="row">
        <div className="col-5">
          <div className="card">
            <div className="card-title">修改密碼</div>
            <div className="card-item">
              <div className="card-item-label">電子信箱</div>
              <div className="card-item-value">{email}</div>
            </div>
            <div className="card-item has-prefix">
              <div className="card-item-label">密碼</div>
              <div className="card-item-value">
                <PasswordNode />
              </div>
              <div className="prefix-item" onClick={() => setMode('edit')}>
                重設
              </div>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            <div className="card-title">基本資料</div>
            <div className="card-item">
              <div className="card-item-label">姓名</div>
              <div className="card-item-value">{name}</div>
            </div>
            <div className="card-item">
              <div className="card-item-label">手機號碼</div>
              <div className="card-item-value">{phone}</div>
            </div>
            <div className="card-item">
              <div className="card-item-label">生日</div>
              <div className="card-item-value">{birthday}</div>
            </div>
            <div className="card-item">
              <div className="card-item-label">地址</div>
              <div className="card-item-value">{address}</div>
            </div>
            <div>
              <button type="button" className="btn btn-secondary" onClick={() => setMode('edit')}>
                編輯
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  let EditInfo: React.FC = () => {
    let now = new Date();
    const [id, setId] = useState(() => '');
    const [name, setName] = useState(() => '');
    const [phone, setPhone] = useState(() => '');
    const [email, setEmail] = useState(() => '');
    const [oldPassword, setOldPassword] = useState(() => '');
    const [newPassword, setNewPassword] = useState(() => '');
    const [reNewPassword, setReNewPassword] = useState(() => '');
    const [country, setCountry] = useState(() => '基隆市');
    const [townList, setTownList] = useState<{ zip: string; name: string }[]>(() => []);
    const [town, setTown] = useState(() => '200');
    const [addressDetail, setAddressDetail] = useState(() => '');
    const [year, setYear] = useState(() => String(now.getFullYear() - 40));
    const [month, setMonth] = useState(() => '1');
    const [date, setDate] = useState(() => '1');
    const [dates, setDates] = useState<string[]>(() => ['1']);
    const [validateObj, setValidateObj] = useState<validateForm>(function () {
      return {
        oldPassword: {
          status: true,
          msg: null
        },
        newPassword: {
          status: true,
          msg: null
        },
        reNewPassword: {
          status: true,
          msg: null
        },
        name: {
          status: true,
          msg: null
        },
        phone: {
          status: true,
          msg: null
        },
        addressDetail: {
          status: true,
          msg: null
        }
      };
    });
    useEffect(() => {
      if (userData != null) {
        setId(userData._id);
        setName(userData.name);
        setPhone(userData.phone);
        setEmail(userData.email);
        let birthdaySource = userData.birthday.split('T')[0].split('-');
        setYear(birthdaySource[0]);
        let monthString = birthdaySource[1];
        if (Number(monthString) < 10) {
          monthString = monthString.replace('0', '');
        }
        setMonth(monthString);
        let dateString = birthdaySource[2];
        if (Number(dateString) < 10) {
          dateString = dateString.replace('0', '');
        }
        setDate(dateString);
        let lastDate = new Date(Number(year), Number(month), 0).getDate();
        getDateListByLastDate(lastDate);
        let tempCity: string = '';
        let tempTown: {
          zip: string;
          name: string;
        } = {
          zip: '',
          name: ''
        };
        cityData.some(city => {
          let ownerCity = city.districts.some(town => {
            if (town.zip == String(userData.address.zipcode)) {
              tempTown = town;
              tempCity = city.city;
              return true;
            }
          });
          if (ownerCity) {
            return true;
          }
        });
        setCountry(tempCity);
        setTown(tempTown.zip);
        setAddressDetail(userData.address.detail);
      }
    }, [userData]);
    let YearSelector: React.FC = () => {
      let yearList = Array.from(
        {
          length: 100
        },
        (_, index) => String(new Date().getFullYear() - 100 + index + 1)
      );
      return (
        <select className="card-item-value form-select" value={year} onChange={e => updateDates(e, setYear)}>
          {yearList.map(item => (
            <option key={`year_${item}`} value={item}>
              {item} 年
            </option>
          ))}
        </select>
      );
    };
    let MonthSelector: React.FC = () => {
      let monthList = Array.from(
        {
          length: 12
        },
        (_, index) => String(index + 1)
      );
      return (
        <select className="card-item-value form-select" value={month} onChange={e => updateDates(e, setMonth)}>
          {monthList.map(item => (
            <option key={`month_${item}`} value={item}>
              {item} 月
            </option>
          ))}
        </select>
      );
    };
    let getDateListByLastDate = (lastDate: number) => {
      let datesList = Array.from(
        {
          length: lastDate
        },
        (_, index) => String(index + 1)
      );
      setDates(datesList);
    };
    const updateDates = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      setFunc: React.Dispatch<React.SetStateAction<string>>
    ) => {
      handleInput(e, setFunc);
      let lastDate = new Date(Number(year), Number(month), 0).getDate();
      getDateListByLastDate(lastDate);
      setDate('1');
    };
    let DateSelector: React.FC = () => {
      let dateList = Array.from(
        {
          length: dates.length
        },
        (_, index) => String(index + 1)
      );
      return (
        <select className="card-item-value form-select" value={date} onChange={e => handleInput(e, setDate)}>
          {dateList.map(item => (
            <option key={`day_${item}`} value={item}>
              {item} 日
            </option>
          ))}
        </select>
      );
    };
    let CountrySelector: React.FC = () => {
      let countryList = cityData.map(item => <option value={item.city}>{item.city}</option>);
      return (
        <select
          className="card-item-value form-select"
          key={`${country}`}
          value={country}
          onChange={e => handleInput(e, setCountry)}
        >
          {countryList}
        </select>
      );
    };
    let getTownListByCountry = (country: string) => {
      let matchTown = cityData.filter(item => item.city == country);
      if (matchTown) {
        setTown(matchTown[0].districts[0].zip);
        setTownList(matchTown[0].districts);
      }
    };
    useEffect(() => {
      getTownListByCountry(country);
    }, [country]);

    let TownSelector: React.FC = () => {
      return (
        <select className="card-item-value form-select" value={town} onChange={e => handleInput(e, setTown)}>
          {townList?.map(item => (
            <option key={`${country}_${item.name}`} value={item.zip}>
              {item.name}
            </option>
          ))}
        </select>
      );
    };
    const updateUserInfo = async () => {
      let validateFormItem: {
        item: string;
        name: validateName;
        rull: string[];
      }[] = [
        {
          item: oldPassword,
          name: validateName.oldPassword,
          rull: ['empty', 'password']
        },
        {
          item: newPassword,
          name: validateName.newPassword,
          rull: ['empty', 'password']
        },
        {
          item: reNewPassword,
          name: validateName.reNewPassword,
          rull: ['empty', 'password', 'checkPassword']
        },
        {
          item: name,
          name: validateName.name,
          rull: ['empty']
        },
        {
          item: phone,
          name: validateName.phone,
          rull: ['empty']
        },
        {
          item: addressDetail,
          name: validateName.addressDetail,
          rull: ['empty']
        }
      ];
      let tempValidateResult = { ...validateObj };
      let canUpdateInfo: boolean = true;
      validateFormItem.forEach(formItem => {
        validateObj[formItem.name].status = true;
        formItem.rull.some(rullItem => {
          switch (rullItem) {
            case 'empty': {
              if (formItem.item == null || formItem.item.length == 0) {
                tempValidateResult[formItem.name].status = false;
                tempValidateResult[formItem.name].msg = '此欄位請勿為空';
                canUpdateInfo = false;
                return true;
              }
              return false;
            }
            case 'password': {
              let regStatus = passwordRegex.test(formItem.item);
              if (regStatus == false) {
                tempValidateResult[formItem.name].status = false;
                tempValidateResult[formItem.name].msg = '密碼應在 8 到 16 個字，包含英文和數字';
                canUpdateInfo = false;
                return true;
              }
              return false;
            }
            case 'checkPassword': {
              if (newPassword != reNewPassword) {
                tempValidateResult.reNewPassword.status = false;
                tempValidateResult.reNewPassword.msg = '請確認輸入的密碼';
                canUpdateInfo = false;
                return true;
              }
              return false;
            }
          }
        });
      });
      setValidateObj(tempValidateResult);
      if (canUpdateInfo) {
        try {
          let updateInfo = {
            userId: id,
            name: name,
            phone: phone,
            birthday: `${year}/${month}/${date}`,
            address: {
              zipcode: Number(town),
              detail: addressDetail
            },
            oldPassword: oldPassword,
            newPassword: newPassword
          };
          await updateUser(updateInfo, token);
          getUserInfo();
          setMode('show');
        } catch (err: any) {
          let error: errorResponse = err;
          alert(error.message);
        }
      } else {
        return false;
      }
    };
    return (
      <div className="row">
        <div className="col-5">
          <form className="card">
            <div className="card-title">修改密碼</div>
            <div className="card-item">
              <div className="card-item-label">電子信箱</div>
              <input
                className="card-item-value form-control"
                type="email"
                autoComplete="false"
                placeholder="請輸入電子信箱"
                value={email}
                disabled
              ></input>
            </div>
            <div className="card-item">
              <div className="card-item-label">舊密碼</div>
              <input
                className="card-item-value form-control"
                type="password"
                placeholder="請輸入舊密碼"
                autoComplete="false"
                value={oldPassword}
                onChange={e => handleInput(e, setOldPassword)}
              ></input>
              {validateObj.oldPassword.status == false && (
                <div className="card-item-info">{validateObj.oldPassword.msg}</div>
              )}
            </div>
            <div className="card-item">
              <div className="card-item-label">新密碼</div>
              <input
                className="card-item-value form-control"
                type="password"
                autoComplete="false"
                placeholder="請輸入新密碼"
                value={newPassword}
                onChange={e => handleInput(e, setNewPassword)}
              ></input>
              {validateObj.newPassword.status == false && (
                <div className="card-item-info">{validateObj.newPassword.msg}</div>
              )}
            </div>
            <div className="card-item">
              <div className="card-item-label">確認新密碼</div>
              <input
                className="card-item-value form-control"
                type="password"
                autoComplete="false"
                placeholder="請再輸入一次新密碼"
                value={reNewPassword}
                onChange={e => handleInput(e, setReNewPassword)}
              ></input>
              {validateObj.reNewPassword.status == false && (
                <div className="card-item-info">{validateObj.reNewPassword.msg}</div>
              )}
            </div>
            <div>
              <button type="button" className="btn btn-secondary" onClick={() => updateUserInfo()}>
                儲存設定
              </button>
            </div>
          </form>
        </div>
        <div className="col-7">
          <form className="card">
            <div className="card-title">基本資料</div>
            <div className="card-item">
              <div className="card-item-label">姓名</div>
              <input
                className="card-item-value form-control"
                type="text"
                placeholder="請輸入姓名"
                value={name}
                onChange={e => handleInput(e, setName)}
              ></input>
              {validateObj.name.status == false && <div className="card-item-info">{validateObj.name.msg}</div>}
            </div>
            <div className="card-item">
              <div className="card-item-label">手機號碼</div>
              <input
                className="card-item-value form-control"
                type="phone"
                placeholder="請輸入手機號碼"
                value={phone}
                onChange={e => handleInput(e, setPhone)}
              ></input>
              {validateObj.phone.status == false && <div className="card-item-info">{validateObj.phone.msg}</div>}
            </div>
            <div className="card-item">
              <div className="card-item-label">生日</div>
              <div className="card-item-input_wrapper">
                <YearSelector />
                <MonthSelector />
                <DateSelector />
              </div>
            </div>
            <div className="card-item">
              <div className="card-item-label">地址</div>
              <div className="card-item-input_wrapper no-margin">
                <CountrySelector />
                <TownSelector />
              </div>
              <input
                className="card-item-value form-control"
                type="text"
                placeholder="請輸入詳細地址"
                value={addressDetail}
                onChange={e => handleInput(e, setAddressDetail)}
              ></input>
              {validateObj.addressDetail.status == false && (
                <div className="card-item-info">{validateObj.addressDetail.msg}</div>
              )}
            </div>
            <div>
              <button type="button" className="btn btn-secondary" onClick={() => updateUserInfo()}>
                儲存設定
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div className="member-info">
      <div className="container">{mode == 'show' ? <ShowInfo key="show" /> : <EditInfo key="edit" />}</div>
    </div>
  );
};

export default MemberInfo;

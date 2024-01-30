import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import countriesData from '@/assets/data/countries.json';
import townsData from '@/assets/data/towns.json';
const MemberInfo = () => {
  let [mode, setMode] = useState(() => 'show');
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
    return (
      <div className="row">
        <div className="col-5">
          <div className="card">
            <div className="card-title">修改密碼</div>
            <div className="card-item">
              <div className="card-item-label">電子信箱</div>
              <div className="card-item-value">Jessica@exsample.com</div>
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
              <div className="card-item-value">Jessica Ｗang</div>
            </div>
            <div className="card-item">
              <div className="card-item-label">手機號碼</div>
              <div className="card-item-value">+886912345678</div>
            </div>
            <div className="card-item">
              <div className="card-item-label">生日</div>
              <div className="card-item-value">1990 年 8 月 15 日</div>
            </div>
            <div className="card-item">
              <div className="card-item-label">地址</div>
              <div className="card-item-value">高雄市新興區六角路 123 號</div>
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
    let [email, setEmail] = useState(() => '');
    let [oldPassword, setOldPassword] = useState(() => '');
    let [newPassword, setNewPassword] = useState(() => '');
    let [reNewPassword, setReNewPassword] = useState(() => '');
    let [country, setCountry] = useState(() => '基隆市');
    let [townList, setTownList] = useState<{ city: string; dist: string }[]>(() => townsData);
    let [town, setTown] = useState(() => '中正區');
    let [year, setYear] = useState(() => String(now.getFullYear() - 40));
    let [month, setMonth] = useState(() => '1');
    let [date, setDate] = useState(() => '1');
    let [dates, setDates] = useState<string[]>(() => ['1']);
    let YearSelector: React.FC = () => {
      let yearList = Array.from(
        {
          length: 100
        },
        (_, index) => String(new Date().getFullYear() - 100 + index + 1)
      );
      return (
        <select className="card-item-value form-select" value={year} onChange={e => handleInput(e, setYear)}>
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
        <select className="card-item-value form-select" value={month} onChange={e => handleInput(e, setMonth)}>
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
    useEffect(() => {
      let lastDate = new Date(Number(year), Number(month), 0).getDate();
      getDateListByLastDate(lastDate);
      setDate('1');
    }, [year, month]);
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
      let countryList = countriesData.map(item => <option key={item.city}>{item.city}</option>);
      return (
        <select className="card-item-value form-select" value={country} onChange={e => handleInput(e, setCountry)}>
          {countryList}
        </select>
      );
    };
    let getTownListByCountry = (country: string) => {
      let matchTown = townsData.filter(item => item.city == country);
      if (matchTown.length > 0) {
        setTown(matchTown[0].dist);
      }
      setTownList(matchTown);
    };
    useEffect(() => {
      getTownListByCountry(country);
    }, [country]);

    let TownSelector: React.FC = () => {
      return (
        <select className="card-item-value form-select" value={town} onChange={e => handleInput(e, setTown)}>
          {townList?.map(item => (
            <option key={`${item.city}_${item.dist}`}>{item.dist}</option>
          ))}
        </select>
      );
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
                placeholder="請輸入電子信箱"
                value={email}
                onChange={e => handleInput(e, setEmail)}
              ></input>
            </div>
            <div className="card-item">
              <div className="card-item-label">舊密碼</div>
              <input
                className="card-item-value form-control"
                type="password"
                placeholder="請輸入舊密碼"
                value={oldPassword}
                onChange={e => handleInput(e, setOldPassword)}
              ></input>
            </div>
            <div className="card-item">
              <div className="card-item-label">新密碼</div>
              <input
                className="card-item-value form-control"
                type="password"
                placeholder="請輸入新密碼"
                value={newPassword}
                onChange={e => handleInput(e, setNewPassword)}
              ></input>
            </div>
            <div className="card-item">
              <div className="card-item-label">確認新密碼</div>
              <input
                className="card-item-value form-control"
                type="password"
                placeholder="請再輸入一次新密碼"
                value={reNewPassword}
                onChange={e => handleInput(e, setReNewPassword)}
              ></input>
            </div>
            <div>
              <button type="button" className="btn btn-secondary" onClick={() => setMode('edit')}>
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
              <input className="card-item-value form-control" type="text" placeholder="請輸入姓名"></input>
            </div>
            <div className="card-item">
              <div className="card-item-label">手機號碼</div>
              <input className="card-item-value form-control" type="phone" placeholder="請輸入手機號碼"></input>
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
              <input className="card-item-value form-control" type="text" placeholder="請輸入詳細地址"></input>
            </div>
            <div>
              <button type="button" className="btn btn-secondary">
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

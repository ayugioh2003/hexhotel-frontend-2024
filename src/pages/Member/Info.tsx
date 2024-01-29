import { useState } from 'react';
const MemberInfo = () => {
  let [mode] = useState('show');
  let PasswordNode: React.FC = () => {
    let template = [];
    for (let i = 0; i < 8; i++) {
      template.push(<i className="password-node"></i>);
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
              <div className="prefix-item">重設</div>
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
              <button type="button" className="btn btn-secondary">
                編輯
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  let EditInfo: React.FC = () => {
    return <div></div>;
  };

  return (
    <div className="member-info">
      <div className="container">{mode == 'show' ? <ShowInfo /> : <EditInfo />}</div>
    </div>
  );
};

export default MemberInfo;

interface SectionItem {
  id: string;
  label: string;
  value: string;
}
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Outlet } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';
import SectionTab from '@/components/SectionTab';
const Member = () => {
  const sectionList: SectionItem[] = [
    {
      id: '1',
      label: '個人資料',
      value: '0'
    },
    {
      id: '2',
      label: '我的訂單',
      value: '1'
    }
  ];
  const [activeItem, setActiveItem] = useState('0');
  return (
    <Layout>
      <div className="member">
        <div className="hero-area">
          <div className="hero-area-wrapper">
            <SvgIcon name="svg/ic_user" className="hero-area-icon"></SvgIcon>
            <p className="hero-area-text tw-text-white tw-font-[700] tw-text-[32px] md:tw-text-[48px] tw-tracking-[1.6px] md:tw-tracking-[2.4px]">
              Hello，Leo
            </p>
          </div>
        </div>
        <div className="tab-area">
          <SectionTab sectionList={sectionList} activeItemValue={activeItem} onChange={setActiveItem} />
        </div>
        <Outlet />
      </div>
    </Layout>
  );
};

export default Member;

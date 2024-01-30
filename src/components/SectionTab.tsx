interface SectionItem {
  id: string;
  label: string;
  value: string;
}
interface SectionTab {
  sectionList: Array<SectionItem>;
  activeItemValue: string;
  onChange: (newValue: string) => void;
}
import '@/styles/components/_section-tab.scss';
const SectionTab: React.FC<SectionTab> = ({ sectionList, activeItemValue, onChange }) => {
  let liClassName = (item: SectionItem) => {
    let basic = 'section-tab-item';
    if (item.value == activeItemValue) {
      basic += ' active';
    }
    return basic;
  };
  let handleOnChange = (value: string) => {
    onChange(value);
  };
  let forItemList = sectionList.map((item: SectionItem) => {
    return (
      <li key={item.id} className={liClassName(item)} onClick={() => handleOnChange(item.value)}>
        <p className="section-tab-item-label">{item.label}</p>
        <i className="section-tab-item-devider"></i>
      </li>
    );
  });
  return (
    <>
      <ul className="section-tab">{forItemList}</ul>
    </>
  );
};
export default SectionTab;

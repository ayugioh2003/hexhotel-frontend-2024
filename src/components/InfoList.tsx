import SvgIcon from '@/components/SvgIcon'

type InfoListProps = {
  data: string[] ,
  className?: string ,
}

export default function InfoList({
  data,
  className = 'room-info__content',
}:InfoListProps) {

  return(
    <ul className={className}>
      {
        data.map((item) => {
          return (
          <li key={item}>
            <SvgIcon className="mr-2" name="svg/ic_check" width={18} height={14} color={'#BF9D7D'}/>
            <span className="fw-bold">{item}</span>
          </li>)
        })
      }
    </ul>
  )
  
}

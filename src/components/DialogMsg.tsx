import SvgIcon from './SvgIcon'

export default function  DialogMsg({message='正在處理你的預訂'}) {
  return (
    <div className="container-fluid dialog-msg">
      <dialog >
        <SvgIcon className="lottie" name="svg/fade-lottie" />
        <SvgIcon className='logo' name="svg/LOGO" color={'#BF9D7D'}/>
        <h5>{message}</h5>
      </dialog>
    </div>
  )
}

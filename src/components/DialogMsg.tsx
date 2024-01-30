import SvgIcon from './SvgIcon'

function DialogMsg() {
  return (
    <div className="container-fluid dialog-msg">
      <dialog >
        <SvgIcon className="lottie" name="svg/fade-lottie" />
        <SvgIcon className='logo' name="svg/LOGO" color={'#BF9D7D'}/>
        <h5>正在處理你的預訂</h5>
      </dialog>
    </div>
  )
}

export default DialogMsg
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useUserStore from "@/store/useUserStore"
import { useState, CSSProperties } from 'react'
import SvgIcon from './SvgIcon'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = useUserStore((state: { name: string }) => state.name);
    const token = useUserStore((state: { token: string }) => state.token);
    const loginStatus = token !== '' ? true : false
    const [isLogin] = useState<boolean>(loginStatus)
    const [ mobileAction, setMobileAction ] = useState('')
    const containerStyle: CSSProperties = {
        height: mobileAction === 'mobile-list--action' ? '100%' : undefined,
    };

    
    const handlerOpen = () => {
        mobileAction ==='' ? setMobileAction('mobile-list--action') : setMobileAction('')
    }
        
    return (
        <header className={ `
            container-fluid
            header
            ${location.pathname === ('/' || '/客房旅宿頁') ? '' : 'header--black'}
            `
        }>
            <div className="row">
                <div className='col-5 logo'>
                    <h2>
                        <Link to="/"><SvgIcon name="svg/LOGO" color={'white'}/></Link>
                    </h2>
                </div>
                <div className="col-7">
                    <ul className="nav">
                        <li><Link to="/Rooms">客房旅宿</Link></li>
                        {
                            isLogin ? 
                                <li><SvgIcon className="mr-2" name="svg/ic_Profile" width={24} height={24} color={'white'}/><Link to="/member">{userName}</Link></li> : 
                                <li><Link to="/login">會員登入</Link></li> 
                                
                        }
                        <li><button className="btn btn-primary" type="button" onClick={ () => navigate('/register') } >立即訂房</button></li>
                    </ul>
                </div>

                {
                    location.pathname !== ('/login' || '/register') ?
                    <>
                        <div className="hamburger">
                            <button onClick={handlerOpen}>
                                {
                                    mobileAction === '' ? 
                                        
                                        <SvgIcon name="svg/ic_menu" color={'white'} className='hamburger-open'></SvgIcon>: 
                                        <SvgIcon name="svg/ic_close" color={'white'} width={20} className='hamburger-close'></SvgIcon>
                                }
                            </button>
                        </div>

                        <div className="col-12 mobile-list" style={containerStyle}>
                            <ul className={mobileAction}>
                                <li>
                                    <button className="btn w-100" onClick={() => navigate('/Rooms') }>客房旅宿</button>
                                </li>
                                <li>
                                    {
                                        isLogin ?
                                            <button className="btn w-100" onClick={() => navigate('/member') }>我的帳戶</button> :
                                            <button className="btn w-100" onClick={() => navigate('/login') }>會員登入</button>
                                    }
                                    
                                </li>
                                <li>
                                    <button className="btn btn-primary w-100" onClick={() => navigate('/register') }>立即訂房</button>
                                </li>
                            </ul>
                        </div>
                    </> : ''    
                }

            </div>
        </header>
    )
}

export default Header
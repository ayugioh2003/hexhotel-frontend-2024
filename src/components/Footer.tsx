
const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer">
                <div className="logo-area">
                    <img src="/src/assets/png/logo_white.png"></img>
                    <div className="icon-group">
                        <img src="/src/assets/svg/bi_line.svg"></img>
                        <img src="/src/assets/svg/bi_ins.svg"></img>
                    </div>
                </div>
                <div className="info-area">
                    <div className="info-group">
                        <div className="info-item">
                            <p className="info-item-label">TEL</p>
                            <p className="info-item-value">+886-7-1234567</p>
                        </div>
                        <div className="info-item">
                            <p className="info-item-label">MAIL</p>
                            <p className="info-item-value">elh@hexschool.com</p>
                        </div>
                    </div>
                    <div className="info-group">
                        <div className="info-item">
                            <p className="info-item-label">FAX</p>
                            <p className="info-item-value">+886-7-1234567</p>
                        </div>
                        <div className="info-item">
                            <p className="info-item-label">WEB</p>
                            <p className="info-item-value">www.elhhexschool.com.tw</p>
                        </div>
                    </div>
                </div>
                <div className="bottom-area">
                    <span className="address">806023 台灣高雄市新興區六角路123號</span>
                    <span className="copyright">© 享樂酒店 2023 All Rights Reserved.</span>
                </div>
            </div>
        </div>
    )
}


export default Footer

// components/Footer
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/css/footer.css'; // Điều chỉnh đường dẫn nếu cần thiết
import '/public/assets/font-awesome/css/all.min.css';

const Footer = () => {
    return (
        <>
            {/* Bootstrap JavaScript */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
                strategy="lazyOnload"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />
            <footer className="container-fluid">
                <div className="d_ft_row1 container">
                    <div className="ft_row1_1">
                        <div className="d_h2_abu">
                            <h2>about us</h2>
                        </div>
                        <div className="d_menu_abu">
                            <ul>
                                <li><a href="#"><i className="fa-solid fa-location-dot"></i> 1245 Rang Raod, medical, E152 95RB</a></li>
                                <li><a href="#"><i className="fa-solid fa-phone"></i> Telephone: (922) 3354 2252</a></li>
                                <li><a href="#"><i className="fa-solid fa-envelope"></i> Email: indo@gmail.com</a></li>
                                <li><a href="#"><i className="fa-solid fa-clock"></i> Time: 9.00am-4.00pm</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="ft_row1_2">
                        <div className="d_h2_ufl">
                            <h2>useful link</h2>
                        </div>
                        <div className="d_menu_ufl">
                            <ul>
                                <li><a href="#">Extraordinary life events.</a></li>
                                <li><a href="#">Design your perfect event.</a></li>
                                <li><a href="#">Differently Abled</a></li>
                                <li><a href="#">Connect your worlds</a></li>
                                <li><a href="#">Leading organizations</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="ft_row1_3">
                        <div className="d_h2_og">
                            <h2>our gallery</h2>
                        </div>
                        <div className="d_menu_og row">
                            <div className="col-sm-4">
                                <img src="/assets/image/ft1.jpg" alt="" />
                            </div>
                            <div className="col-sm-4">
                                <img src="/assets/image/ft2.jpg" alt="" />
                            </div>
                            <div className="col-sm-4">
                                <img src="/assets/image/ft3.jpg" alt="" />
                            </div>
                            <div className="col-sm-4">
                                <img src="/assets/image/ft4.jpg" alt="" />
                            </div>
                            <div className="col-sm-4">
                                <img src="/assets/image/ft5.jpg" alt="" />
                            </div>
                            <div className="col-sm-4">
                                <img src="/assets/image/ft6.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="ft_row1_4">
                        <div className="d_h2_wh">
                            <h2>working hours</h2>
                        </div>
                        <div className="d_menu_wh">
                            <div className="d_wh">
                                <span>Monday - Friday</span>
                                <span className="wh_hour">08:00 - 20:00</span>
                            </div>
                            <div className="d_wh">
                                <span>Saturday</span>
                                <span className="wh_hour">08:00 - 16:00</span>
                            </div>
                            <div className="d_wh">
                                <span>Sunday</span>
                                <span className="wh_hour">09:00 - 18:00</span>
                            </div>
                            <div className="d_wh">
                                <span>Emergency</span>
                                <span className="wh_hour">(+099) 020 768 69</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d_ft_row2 container">
                    <div className="d_ft_row2_left">
                        <p>Copyright © Eddy all rights reserved.</p>
                    </div>
                    <div className="d_ft_row2_right">
                        <a href="#">About</a>
                        <a href="#">Service</a>
                        <a href="#">Connect</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
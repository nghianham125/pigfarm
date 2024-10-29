import Script from "next/script"
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/css/main_contact.css'; // Điều chỉnh đường dẫn nếu cần thiết
import '/public/assets/font-awesome/css/all.min.css';

const Contact = () => {
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
            <main>
                <div className="d_row1 container-fluid">
                    <div className="row1_ct1 container">
                        <div className="h1_ct">
                            <h1>Liên hệ</h1>
                        </div>
                        <div className="dd_ct">
                            <a href="#">Hiện tại</a>
                            <p></p>
                            <a href="/user">Trang chủ</a>
                            <p></p>
                            <a href="/user/contact">Liên hệ</a>
                        </div>
                    </div>
                </div>
                <div className="d_row2 container">
                    <div className="d_row2_left">
                        <div className="h1_left">
                            <h1>get in touch</h1>
                        </div>
                        <div className="h2_left">
                            <h2>contact form</h2>
                        </div>
                        <div className="form_left">
                            <form action="#" method="post">
                                <div className="form_row1">
                                    <div className="d_ip_name">
                                        <input type="text" name="name" placeholder="Họ tên*" />
                                    </div>
                                    <div className="d_ip_email">
                                        <input type="text" name="email" placeholder="Email*" />
                                    </div>
                                </div>
                                <div className="form_row2">
                                    <div className="d_ip_phone">
                                        <input type="number" name="phone" placeholder="Điện thoại*" />
                                    </div>
                                    <div className="d_ip_subject">
                                        <input type="text" name="subject" placeholder="Ngành*" />
                                    </div>
                                </div>
                                <div className="form_row3">
                                    <div className="d_ip_comment">
                                        <input type="text" name="comment" placeholder="Bình luận/Tin nhắn*" />
                                    </div>
                                </div>
                                <div className="d_btn_mess">
                                    <input type="button" value="Gửi email" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="d_row2_right">
                        <div className="map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62711.47519905018!2d106.60796401471617!3d10.775484329408417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be2853ce7cd%3A0x4111b3b3c2aca14a!2zMTQwIMSQLiBMw6ogVHLhu41uZyBU4bqlbiwgVMOieSBUaOG6oW5oLCBUw6JuIFBow7osIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1728217497586!5m2!1sen!2s"
                                width="600"
                                height="625"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Contact;
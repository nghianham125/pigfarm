import Script from "next/script";
import Head from "next/head"; // Nhập Head
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/css/main.css'; // Điều chỉnh đường dẫn nếu cần thiết
import '/public/assets/font-awesome/css/all.min.css';

export default function Home() {
  return (
    <>
      <Head>
        {/* Owl Carousel CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        />
      </Head>
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
        <div className="d_hd3">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/image/slider1_1.jpg" className="d-block w-100" alt="Slide 1" />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d_titleslide">
                    <h1>Chào mừng bạn đến với trang trại heo</h1>
                  </div>
                  <div className="d_sub_titleslide">
                    <h2>
                      we are the top & best<br />
                      pig in our farm
                    </h2>
                  </div>
                  <div className="d_about_service">
                    <a className="btn_about">Giới thiệu ngay</a>
                    <a className="btn_service">Dịch vụ thêm</a>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/assets/image/slider2_2.jpg" className="d-block w-100" />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d_titleslide">
                    <h1>Chào mừng đến với trang trại heo</h1>
                  </div>
                  <div className="d_sub_titleslide">
                    <h2>
                      we are the top & best<br />
                      pig in our farm
                    </h2>
                  </div>
                  <div className="d_about_service">
                    <a className="btn_about">Giới thiệu ngay</a>
                    <a className="btn_service">Dịch vụ thêm</a>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Trước</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Tiếp theo</span>
            </button>
          </div>
        </div>
        <div className="d_content1 container">
          <div className="d_image">
            <div className="d_icon1_content1">
              <p><i className="fa-solid fa-sun"></i></p>
            </div>
            <div className="d_h1_content1">
              <h1>Dedicated Sheep</h1>
            </div>
            <div className="d_p_content1">
              <p>Labore et dolore magna ali qua. Ut enim ad minim ven iam is nostrud</p>
            </div>
          </div>
          <div className="d_image1">
            <div className="d_icon1_content1">
              <p><i className="fa-solid fa-anchor"></i></p>
            </div>
            <div className="d_h1_content1">
              <h1>Dedicated Sheep</h1>
            </div>
            <div className="d_p_content1">
              <p>Labore et dolore magna ali qua. Ut enim ad minim ven iam is nostrud</p>
            </div>
          </div>
          <div className="d_image2">
            <div className="d_icon1_content1">
              <p><i className="fa-solid fa-tent-arrow-turn-left"></i></p>
            </div>
            <div className="d_h1_content1">
              <h1>Dedicated Sheep</h1>
            </div>
            <div className="d_p_content1">
              <p>Labore et dolore magna ali qua. Ut enim ad minim ven iam is nostrud</p>
            </div>
          </div>
        </div>
        <div className="d_content2 container">
          <div className="d_ct2_left">
            <div className="d_h2_left">
              <h2>giới thiệu về chúng tôi</h2>
            </div>
            <div className="d_h1_left">
              <h1>chúng tôi có hơn 25 năm <br /> kinh nghiệm về chăn nuôi heo</h1>
            </div>
            <div className="d_p_left">
              <p>Slando là một công ty cảnh quan đầy đủ dịch vụ. Hệ thống được thiết lập của chúng tôi
                cho phép chúng tôi cung cấp các giải pháp cảnh quan hàng đầu trong ngành cho khách hàng thương mại và dân cư.</p>
            </div>
            <div className="d_ul_left">
              <ul>
                <li>
                  <p><i className="fa-solid fa-check"></i> Tìm cách lắp đặt các dự án mới với thiết kế độc đáo</p>
                </li>
                <li>
                  <p><i className="fa-solid fa-check"></i> Loại bỏ sàn làm mới nội thất của bạn với trang trại</p>
                </li>
                <li>
                  <p><i className="fa-solid fa-check"></i> Dịch vụ thiết kế của chúng tôi bắt đầu và kết thúc trong trang trại</p>
                </li>
              </ul>
            </div>
            <div className="d_p1_left">
              <p>Hệ thống được thiết lập của chúng tôi cho phép chúng tôi cung cấp các giải pháp
                cảnh quan hàng đầu trong ngành cho các khu thương mại và dân cư</p>
            </div>
            <div className="d_btn_left">
              <a href="#">về chúng tôi</a>
            </div>
          </div>
          <div className="d_ct2_right">
            <div className="d_img_right">
              <img src="./assets/image/about.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="d_content3 container-fluid">
          <div className="d_ct3_row1">
            <div className="d_h2_row1">
              <h2>dịch vụ của chúng tôi</h2>
            </div>
            <div className="d_h1_row1">
              <h1>chúng tôi cung cấp dịch vụ đặc biệt <br /> cho trang trại</h1>
            </div>
          </div>
          <div className="d_ct3_row2 container">
            <div className="row">
              <div className="d_ct3_row2_1 col-sm-4">
                <div className="row_2_1">
                  <div className="row_2_1_icon">
                    <p><i className="fa-solid fa-trophy"></i></p>
                  </div>
                  <div className="row_2_1_title">
                    <div className="h1_title">
                      <h1>Kỹ thuật tiên tiến</h1>
                    </div>
                    <div className="p_title">
                      <p>Hầu hết mọi người nhận thấy rằng mọi việc bắt đầu diễn ra rất nhanh sau khi thuê một người</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d_ct3_row2_1 col-sm-4">
                <div className="row_2_1">
                  <div className="row_2_1_icon">
                    <p><i className="fa-solid fa-trophy"></i></p>
                  </div>
                  <div className="row_2_1_title">
                    <div className="h1_title">
                      <h1>Hệ thống khép kín</h1>
                    </div>
                    <div className="p_title">
                      <p>Hầu hết mọi người nhận thấy rằng mọi việc bắt đầu diễn ra rất nhanh sau khi thuê một người</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d_ct3_row2_1 col-sm-4">
                <div className="row_2_1">
                  <div className="row_2_1_icon">
                    <p><i className="fa-solid fa-trophy"></i></p>
                  </div>
                  <div className="row_2_1_title">
                    <div className="h1_title">
                      <h1>chăn nuôi công nghệ cao</h1>
                    </div>
                    <div className="p_title">
                      <p>Hầu hết mọi người nhận thấy rằng mọi việc bắt đầu diễn ra rất nhanh sau khi thuê một người</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d_ct3_row2_1 col-sm-4">
                <div className="row_2_1">
                  <div className="row_2_1_icon">
                    <p><i className="fa-solid fa-trophy"></i></p>
                  </div>
                  <div className="row_2_1_title">
                    <div className="h1_title">
                      <h1>chăn nuôi sạch</h1>
                    </div>
                    <div className="p_title">
                      <p>Hầu hết mọi người nhận thấy rằng mọi việc bắt đầu diễn ra rất nhanh sau khi thuê một người</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d_ct3_row2_1 col-sm-4">
                <div className="row_2_1">
                  <div className="row_2_1_icon">
                    <p><i className="fa-solid fa-trophy"></i></p>
                  </div>
                  <div className="row_2_1_title">
                    <div className="h1_title">
                      <h1>Dây chuyền tự động</h1>
                    </div>
                    <div className="p_title">
                      <p>Hầu hết mọi người nhận thấy rằng mọi việc bắt đầu diễn ra rất nhanh sau khi thuê một người</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d_ct3_row2_1 col-sm-4">
                <div className="row_2_1">
                  <div className="row_2_1_icon">
                    <p><i className="fa-solid fa-trophy"></i></p>
                  </div>
                  <div className="row_2_1_title">
                    <div className="h1_title">
                      <h1>không tồn dư kháng sinh</h1>
                    </div>
                    <div className="p_title">
                      <p>Hầu hết mọi người nhận thấy rằng mọi việc bắt đầu diễn ra rất nhanh sau khi thuê một người</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d_content4 container-fluid">
          <div className="partner container">
            <div className="list_partner owl-carousel owl-theme">
              <div><img src="./assets/image/b1.png" alt="" /></div>
              <div><img src="./assets/image/b2.png" alt="" /></div>
              <div><img src="./assets/image/b3.png" alt="" /></div>
              <div><img src="./assets/image/b4.png" alt="" /></div>
              <div><img src="./assets/image/b5.png" alt="" /></div>
            </div>
          </div>
        </div>
      </main>
    </>

  );

}

import React from "react";
// import AOS from "aos";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// import 'assets/css/fonts.css';
// import 'assets/css/common.css';
// import 'assets/css/style.css';
// import 'assets/css/m.style.css';
// // import 'assets/vendors/aos.css';
// import 'assets/vendors/swiper/swiper.min.css';
// import 'assets/css/main.css';
// import 'assets/css/m.main.css';


import img_copy_subject_png from 'assets/img/img_copy_subject.png';
import bg_section0101_png from 'assets/img/bg_section0101.jpg';
import bg_section0101_mo_jpg from 'assets/img/bg_section0101_mo.jpg';
import bg_section0102_jpg from 'assets/img/bg_section0102.jpg';
import bg_section0102_mo_jpg from 'assets/img/bg_section0102_mo.jpg';
import bg_section0103_jpg from 'assets/img/bg_section0103.jpg';
import bg_section0103_mo_jpg from 'assets/img/bg_section0103_mo.jpg';


const img_copy_subject = {src: img_copy_subject_png,alt: 'my image',};
const bg_section0101 = {src: bg_section0101_png,alt: 'my image',};
const bg_section0101_mo = {src: bg_section0101_mo_jpg,alt: 'my image',};
const bg_section0102 = {src: bg_section0102_jpg,alt: 'my image',};
const bg_section0102_mo = {src: bg_section0102_mo_jpg,alt: 'my image',};
const bg_section0103 = {src: bg_section0103_jpg,alt: 'my image',};
const bg_section0103_mo = {src: bg_section0103_mo_jpg,alt: 'my image',};

// AOS.init();

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

export default function Home(props) {

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  React.useEffect(() => {

    const isEdge = window.navigator.userAgent.indexOf('Edge') !== -1;
    const isIE = window.navigator.userAgent.indexOf('Trident') !== -1 && !isEdge;
    if (isIE) {
        window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
    } 
    // const script1 = document.createElement("script");
    // script1.src = "vendors/aos.js";
    // script1.async = true;
    // document.body.appendChild(script1); 
    // const script2 = document.createElement("script");
    // script2.src = "vendors/swiper/swiper.min.js";
    // script2.async = true;
    // document.body.appendChild(script2);
    // const script3 = document.createElement("script");
    // script3.src = "js/ui.js";
    // script3.async = true;
    // document.body.appendChild(script3);
    // script.src = "js/test.js";
    // script.async = true;
    // document.body.appendChild(script);
    return () => {
      // document.body.removeChild(script1);
      // document.body.removeChild(script2);
      // document.body.removeChild(script3);
    }
}, []);

return (
<body>
    <div className="app">
      {/* <!-- header --> */}

      <header className="app-header">
        <div className="app-header__inner">
          <strong className="app-header__logo">
            <a href="/" className="app-header__logo--link">
              <span className="sr-only">PLISM ??????</span>
            </a>
          </strong>
          <button type="button" className="btn-hamburger is-mobile">
            <span className="sr-only">menu toggle</span>
            <span className="btn-hamburger__bar"></span>
            <span className="btn-hamburger__bar"></span>
            <span className="btn-hamburger__bar"></span>
          </button>
          <div className="gnb">
            <ul className="gnb__container">
              <li className="gnb__item">
                <a href="# " className="gnb__anchor">SCHEDULE</a> 
                <ul className="gnb__depth">
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">???????????????</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">????????? ?????????</a>
                  </li>
                </ul>
              </li>
              <li className="gnb__item">
                <a href="# " className="gnb__anchor">BOOKING</a>
                <ul className="gnb__depth">
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Carrier Booking</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Forwarder Booking</a>
                  </li>
                </ul>
              </li>
              <li className="gnb__item">
                <a href="# " className="gnb__anchor">TRACKING</a>
                <ul className="gnb__depth">
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Tracking List</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">B/L ??????</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Ship Location</a>
                  </li>
                </ul>
              </li>
              <li className="gnb__item">
                <a href="# " className="gnb__anchor">CNTR</a>
                <ul className="gnb__depth">
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Import</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Export</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">Summary</a>
                  </li>
                </ul>
              </li>
              <li className="gnb__item">
                <a href="# " className="gnb__anchor">INFO</a>
                <ul className="gnb__depth">
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">????????? ??????</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">HS Code ??????</a>
                  </li>
                  <li className="gnb__depth--item">
                    <a href="# " className="gnb__depth--anchor">IMO Code ??????</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="app-header__utill">
            <ul>
              <li className="app-header__utill--item">
                <a href="# " className="app-header__utill--anchor is-anchor-login">
                  LOGIN
                </a>
              </li>
              <li className="app-header__utill--item">
                <a href="# " className="app-header__utill--anchor">SIGN UP</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* <!-- //header --> */}

      <main className="app-container">
      {/* <!-- content --> */}

      <h1 className="sr-only">PLISM CONTENT</h1>
      <section id="section1" className="section section--01">
        <div className="section__inner">
          <div className="swiper-wrap">
            <Swiper
              // spaceBetween={50}
              // slidesPerView={1}
              navigation={{
                prevEl: '#section1.swiper-button-prev',
                nextEl: '#section1.swiper-button-next',
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              autoplay={{ delay: 3000 }}
              speed={1000}
            >
              <SwiperSlide>
                <div className="figure">
                  {/* <!-- ????????? pc, mobile ???????????? ?????? --> */}
                  <div className="figure__img is-desktop">
                    <img src={bg_section0101.src} alt={bg_section0101.alt} />
                  </div>
                  <div className="figure__img is-mobile">
                    <img src={bg_section0101_mo.src} alt={bg_section0101_mo.alt} />
                  </div>
                  <div className="figure__caption">
                    <strong className="figure__title">???????????????, B/K</strong>
                    <p className="figure__text">
                      ?????? ?????? ?????? ????????? ??????,
                      <br />
                      ??? ???????????? ????????? ????????? ????????????
                      <br className="is-mobile-wrapline" />
                      ?????? ?????? ??? ????????????.
                      <br />
                      ????????? ???????????? ???????????????,
                      <br className="is-mobile-wrapline" />
                      Booking??? ?????? ??????????????????!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="figure">
                  {/* <!-- ????????? pc, mobile ???????????? ?????? --> */}
                  <div className="figure__img is-desktop">
                    <img src={bg_section0102.src} alt={bg_section0102.alt} />
                  </div>
                  <div className="figure__img is-mobile">
                    <img src={bg_section0102_mo.src} alt={bg_section0102_mo.alt} />
                  </div>
                  <div className="figure__caption">
                    <strong className="figure__title">Tracking</strong>
                    <p className="figure__text">
                      ?????? ????????? B/L ????????? ???????????????
                      <br className="is-mobile-wrapline" />
                      ??? ????????? ?????? ??? ?????????
                      <br className="is-mobile-wrapline" />
                      ????????? ???????????? ????????? ??? ????????????.
                      <br />
                      ????????? ????????? ?????????,
                      <br className="is-mobile-wrapline" />
                      ?????? ????????? ???????????? ???????????????.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="figure">
                  {/* <!-- ????????? pc, mobile ???????????? ?????? --> */}
                  <div className="figure__img is-desktop">
                    <img src={bg_section0103.src} alt={bg_section0103.alt} />
                  </div>
                  <div className="figure__img is-mobile">
                    <img src={bg_section0103_mo.src} alt={bg_section0103_mo.alt} />
                  </div>
                  <div className="figure__caption">
                    <strong className="figure__title">???????????? ??????</strong>
                    <p className="figure__text">
                      ????????? ????????? ???????????? ?????????
                      <br className="is-mobile-wrapline" />
                      ??????, ??????????????? ??????
                      <br />
                      ????????? ????????? ?????? ???????????????
                      <br />
                      ????????? ??????????????? ??? ?????? ???????????????.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              {/* <div ref={navigationPrevRef} />
              <div ref={navigationNextRef} /> */}
              <div className="swiper-controls">
                {/* <!-- Add Arrows --> */}
                <div className="swiper-button-next" ></div>
                <div className="swiper-button-prev" ></div>
                {/* <!-- Add Pagination --> */}
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
      <section id="section2" className="section section--02">
        <div className="section__inner">
          <div className="search-wrap">
            <form className="search is-left">
              <div className="search__inner">
                {/* <!-- 2021-02-03 div ?????? --> */}
                <h3 className="title">HS?????? ??????</h3>
                <p className="text">????????? ??????????????????</p>
                <div className="search__box">
                  <input
                    type="search"
                    className="search__box--input"
                    placeholder="Search"
                  />
                  <button type="submit" className="search__box--submit">
                    <span className="sr-only">??????</span>
                  </button>
                </div>
                {/* <!-- 2021-02-03 validate ?????? --> */}
                {/* <!-- ???????????? --> */}
                <div className="search-value search-value--fail">
                  <p>????????? ???????????? ?????????, ????????? ????????????.</p>
                </div>
                {/* <!-- ???????????? --> */}
                {/* <!--
        <div className="search-value search-value--result">
          <ul className="search-value__list">
            <li><strong>????????????</strong> <span className="system">950300 3493</span></li>
            <li><strong>??????</strong> <span className="system">TV</span></li>
          </ul>
        </div>
        --> */}
                {/* <!-- //2021-02-03 validate ?????? --> */}
              </div>
            </form>
            <form className="search is-right">
              <div className="search__inner">
                {/* <!-- 2021-02-03 div ?????? --> */}
                <h3 className="title">IMO ?????? ??????</h3>
                <p className="text">???????????? ??????????????????</p>
                <div className="search__box">
                  <input
                    type="search"
                    className="search__box--input"
                    placeholder="Search"
                  />
                  <button type="submit" className="search__box--submit">
                    <span className="sr-only">??????</span>
                  </button>
                </div>
                {/* <!-- 2021-02-03 validate ?????? --> */}
                {/* <!-- ???????????? --> */}
                {/* <!--
        <div className="search-value search-value--fail">
          <p>???????????? ???????????? ?????????, ????????? ????????????.</p>
        </div>
        --> */}
                {/* <!-- ???????????? --> */}
                <div className="search-value search-value--result">
                  <ul className="search-value__list">
                    <li>
                      <strong>CODE</strong>
                      <span className="system">950300 3493</span>
                    </li>
                    <li>
                      <strong>NAME</strong>
                      <span className="system">TV</span>
                    </li>
                  </ul>
                </div>
                {/* <!-- //2021-02-03 validate ?????? --> */}
              </div>
            </form>
          </div>
        </div>
      </section>
      <section id="section3" className="section section--03">
        <div className="section__inner">
          <div className="swiper-wrap">
            <Swiper
              spaceBetween={0}
              slidesPerView={2}
              navigation={{
                prevEl: '#section3.swiper-button-prev',
                nextEl: '#section3.swiper-button-next',
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              autoplay={{ delay: 3000 }}
              breakpoints ={{
                1024: {
                  slidesPreView:2,
                  spaceBetween:30
                }
              }}
            >
              <SwiperSlide>
                {/* <!-- booking module --> */}
                <div className="booking-module">
                  <div className="booking-module__head">
                    <h2 className="booking-module__title">
                      PNIT ???????????????????????????
                    </h2>
                    <p className="booking-module__date">
                      2021-01-05 14:32 ??????
                    </p>
                    {/* <!-- 
              ?????? ?????????: is-want
              ?????? ?????????: is-difficult
            --> */}
                    <span className="booking-module__state is-want">??????</span>
                    {/* <!-- ??????
            <span className="booking-module__state is-difficult">??????</span>
            --> */}
                  </div>
                  <ul className="booking-module__count">
                    <li className="booking-module__count--item">
                      <em>20</em>
                      <span className="system">1248</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>40</em>
                      <span className="system">3242</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>40HC</em>
                      <span className="system">3202</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>ETC</em>
                      <span className="system">1234</span>
                    </li>
                  </ul>
                  <div className="booking-module__status">
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- //booking module --> */}
              </SwiperSlide>
              <SwiperSlide>
                {/* <!-- booking module --> */}
                <div className="booking-module">
                  <div className="booking-module__head">
                    <h2 className="booking-module__title">
                      PNIT ???????????????????????????2
                    </h2>
                    <p className="booking-module__date">
                      2021-01-05 14:32 ??????
                    </p>
                    {/* <!-- 
              ?????? ?????????: is-want
              ?????? ?????????: is-difficult
            --> */}
                    <span className="booking-module__state is-want">??????</span>
                    {/* <!-- ??????
            <span className="booking-module__state is-difficult">??????</span>
            --> */}
                  </div>
                  <ul className="booking-module__count">
                    <li className="booking-module__count--item">
                      <em>20</em>
                      <span className="system">1248</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>40</em>
                      <span className="system">3242</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>40HC</em>
                      <span className="system">3202</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>ETC</em>
                      <span className="system">1234</span>
                    </li>
                  </ul>
                  <div className="booking-module__status">
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- //booking module --> */}
              </SwiperSlide>
              <SwiperSlide>
                {/* <!-- booking module --> */}
                <div className="booking-module">
                  <div className="booking-module__head">
                    <h2 className="booking-module__title">
                      PNIT ???????????????????????????3
                    </h2>
                    <p className="booking-module__date">
                      2021-01-05 14:32 ??????
                    </p>
                    {/* <!-- 
              ?????? ?????????: is-want
              ?????? ?????????: is-difficult
            --> */}
                    <span className="booking-module__state is-want">??????</span>
                    {/* <!-- ??????
            <span className="booking-module__state is-difficult">??????</span>
            --> */}
                  </div>
                  <ul className="booking-module__count">
                    <li className="booking-module__count--item">
                      <em>20</em>
                      <span className="system">1248</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>40</em>
                      <span className="system">3242</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>40HC</em>
                      <span className="system">3202</span>
                    </li>
                    <li className="booking-module__count--item">
                      <em>ETC</em>
                      <span className="system">1234</span>
                    </li>
                  </ul>
                  <div className="booking-module__status">
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                    <div className="booking-module__status--item">
                      <span className="booking-module__status--bar">
                        <span
                          className="booking-module__status--system"
                          style={{'width': '40%'}}
                        ></span>
                        <span className="booking-module__status--per">40%</span>
                      </span>
                      <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">
                          BNUS-001
                        </em>
                        <span className="booking-module__status--text">
                          XIN FU ZHOU
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- //booking module --> */}
              </SwiperSlide>
              <div className="swiper-controls">
                {/* <!-- Add Arrows --> */}
                <div className="swiper-button-next" ></div>
                <div className="swiper-button-prev" ></div>
                {/* <!-- Add Pagination --> */}
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
      <section id="section4" className="section section--04">
        <div className="section__inner">
          <h3 className="title">????????? ????????????</h3>
          <div className="swiper-wrap">
            <Swiper
              spaceBetween={1}
              slidesPerView={0}
              slidesPerGroup={1}
              loopFillGroupWithBlank={true}
              navigation={{
                prevEl: '#section4.swiper-button-prev',
                nextEl: '#section4.swiper-button-next',
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              autoplay={{ delay: 3000 }}
              breakpoints = {{
                1024: {
                  slidesPerView:3,
                  spaceBetween: 60,
                  slidesPerGroup: 3
                }
              }}
            >
              <SwiperSlide>
                <div className="notice">
                  <strong className="notice__title">
                    ????????????, KCTC ??? ??????????????? '?????????????????????'
                    ??????????????????1
                  </strong>
                  <p className="notice__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eleifend ornare venenatis. Curabitur eget rutrum
                    magna, eget faucibus enim. Ut nec congue turpis. Sed
                    magna augue, feugiat vel mauris in, vehicula tempor
                    augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                    sit amet nunc sapien. Nullam at lorem sed velit sodales
                    elementum et nec tortor. Donec non elementum odio.
                    Vestibulum pharetra ultricies neque,
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="notice">
                  <strong className="notice__title">
                    ????????????, KCTC ??? ??????????????? '?????????????????????'
                    ??????????????????2
                  </strong>
                  <p className="notice__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eleifend ornare venenatis. Curabitur eget rutrum
                    magna, eget faucibus enim. Ut nec congue turpis. Sed
                    magna augue, feugiat vel mauris in, vehicula tempor
                    augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                    sit amet nunc sapien. Nullam at lorem sed velit sodales
                    elementum et nec tortor. Donec non elementum odio.
                    Vestibulum pharetra ultricies neque,
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="notice">
                  <strong className="notice__title">
                    ????????????, KCTC ??? ??????????????? '?????????????????????'
                    ??????????????????3
                  </strong>
                  <p className="notice__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eleifend ornare venenatis. Curabitur eget rutrum
                    magna, eget faucibus enim. Ut nec congue turpis. Sed
                    magna augue, feugiat vel mauris in, vehicula tempor
                    augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                    sit amet nunc sapien. Nullam at lorem sed velit sodales
                    elementum et nec tortor. Donec non elementum odio.
                    Vestibulum pharetra ultricies neque,
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="notice">
                  <strong className="notice__title">
                    ????????????, KCTC ??? ??????????????? '?????????????????????'
                    ??????????????????3
                  </strong>
                  <p className="notice__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eleifend ornare venenatis. Curabitur eget rutrum
                    magna, eget faucibus enim. Ut nec congue turpis. Sed
                    magna augue, feugiat vel mauris in, vehicula tempor
                    augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                    sit amet nunc sapien. Nullam at lorem sed velit sodales
                    elementum et nec tortor. Donec non elementum odio.
                    Vestibulum pharetra ultricies neque,
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="notice">
                  <strong className="notice__title">
                    ????????????, KCTC ??? ??????????????? '?????????????????????'
                    ??????????????????3
                  </strong>
                  <p className="notice__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eleifend ornare venenatis. Curabitur eget rutrum
                    magna, eget faucibus enim. Ut nec congue turpis. Sed
                    magna augue, feugiat vel mauris in, vehicula tempor
                    augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                    sit amet nunc sapien. Nullam at lorem sed velit sodales
                    elementum et nec tortor. Donec non elementum odio.
                    Vestibulum pharetra ultricies neque,
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="notice">
                  <strong className="notice__title">
                    ????????????, KCTC ??? ??????????????? '?????????????????????'
                    ??????????????????3
                  </strong>
                  <p className="notice__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eleifend ornare venenatis. Curabitur eget rutrum
                    magna, eget faucibus enim. Ut nec congue turpis. Sed
                    magna augue, feugiat vel mauris in, vehicula tempor
                    augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                    sit amet nunc sapien. Nullam at lorem sed velit sodales
                    elementum et nec tortor. Donec non elementum odio.
                    Vestibulum pharetra ultricies neque,
                  </p>
                </div>
              </SwiperSlide>
              <div className="swiper-controls">
                {/* <!-- Add Arrows --> */}
                <div className="swiper-button-next" ></div>
                <div className="swiper-button-prev" ></div>
                {/* <!-- Add Pagination --> */}
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
        </div>        
      </section>
      {/* <!-- //content --> */}
      </main>

      {/* <!-- footer --> */}

      <footer className="app-footer">
        <div className="app-footer__inner">
          <div className="app-footer__top">
            <div className="company">
              <strong className="company__name">
                <span className="sr-only">PLISM</span>
              </strong>
              <ul className="company__info">
                <li className="company__info--item">
                  <a href="# ">TERMS OF SERVICE</a>
                </li>
                <li className="company__info--item">
                  <a href="# ">Privacy Policy</a>
                </li>
                <li className="company__info--item"><a href="# ">BOARD</a></li>
              </ul>
            </div>
            <div className="site-map">
              <ul className="site-map__container">
                <li className="site-map__item">
                  <strong className="site-map__subject">BOOKING</strong>
                  <ul className="site-map__depth">
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        Carrier Booking
                      </a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        Forwarder Booking
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="site-map__item">
                  <strong className="site-map__subject">TRACKING</strong>
                  <ul className="site-map__depth">
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        Tracking List
                      </a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">B/L ??????</a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        Ship Location
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="site-map__item">
                  <strong className="site-map__subject">CNTR</strong>
                  <ul className="site-map__depth">
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">Import</a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">Export</a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">Summary</a>
                    </li>
                  </ul>
                </li>
                <li className="site-map__item">
                  <strong className="site-map__subject">INFO</strong>
                  <ul className="site-map__depth">
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        ????????? ??????
                      </a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        HS Code ??????
                      </a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        IMO Code ??????
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="app-footer__bottom">
            <div className="app-footer__copy">
              <strong className="app-footer__copy--subject">
                <img src={img_copy_subject.src} alt={img_copy_subject.alt} />
              </strong>
              <em className="app-footer__copy--text">
                ??? ???????????? ???????????? ??????????????? ????????????
              </em>
            </div>
            <div className="app-footer__call">
              <strong className="app-footer__call--subject">??????????????????</strong>
              <a href="tel:1577-1172" className="app-footer__call--number">
                1577-1172
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* <!-- //footer --> */}
    </div>

    {/* <script
      type="text/javascript"
      src="./assets/vendors/swiper/swiper.min.js"
    ></script>

    <script type="text/javascript">
      if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        window.location = 'microsoft-edge:' + window.location;
        setTimeout(function () {
          window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
        }, 1);
      }
    </script>
    <script type="text/javascript" src="./assets/js/ui.js"></script> */}
  </body>
  )
}

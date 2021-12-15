import React , { useRef,useEffect,useCallback,useState} from "react";
import { Link } from "react-router-dom";
import SectionHsnImo from "./Sections/SectionHsnImoNew.js";
import Board from "./Sections/SectionBoardNew.js";
import SectionCarouselPs from "./Sections/SectionCarouselPsNew.js"; 
import axios from 'axios';
import Footer from "components/Footer/FooterNew.js";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Router from 'service_routes'
import HeaderLinks from "components/Kit/Header/HeaderLinksNew.js";
import LoginPage from 'views/Login/LoginPage.js';
import SignPage from 'views/Member/RegisterPage.js';
// import ChangeSessionPage from 'views/Login/ChangeSessionPage.js';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
// import AOS from "aos";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {observer,useObserver} from 'mobx-react-lite';
import {userStore,timerStore} from 'store/userStore.js';

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



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

let numCnt =1;
var callbacks = {};
var promiseChain = Promise.resolve();
window.deviceId ="";
window.fcmToken = ""; 
window.deviceModel = "";
window.deviceOS = "";
var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);


window.document.addEventListener('message', event => {
  var message;
  if(isMobile) {
    try {
      message= JSON.parse(event.data);
    }catch(err) {
      console.log(err);
      return;
    }
    if(message.data) {
      window.deviceId=message.data.deviceId;
      window.fcmToken=message.data.token;
      window.deviceModel=message.data.deviceModel;
      window.deviceOS=message.data.os;
    }
  }
})
window.addEventListener('message', event => {
  var message;
  if(isMobile) {
    try {
      message= JSON.parse(event.data);
    }catch(err) {
      console.log(err);
      return;
    }
    if(message.data) {
      window.deviceId=message.data.deviceId;
      window.fcmToken=message.data.token;
      window.deviceModel=message.data.deviceModel;
      window.deviceOS=message.data.os;
    }
  }
})


window.getData = function(paramdeviceId, paramToken, paramModel) {
  if(isMobile) {
    window.deviceId = paramdeviceId;
    window.fcmToken = paramToken;
    window.deviceModel = paramModel;
  }
}
function seachParam(key){
  // console.log('window.location.search',window.location.search)
  return new URLSearchParams(window.location.search).get(key);
}
const useStyles = makeStyles(styles);

const Home = (props) =>{

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const header =useRef( );

  const userAgent = navigator.userAgent.toLowerCase();
  const [boardData, setBoardData] = useState([]);
  const [totpage, setTotpage] = useState(0);
  const [chainData, setChainData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalGb, setModalGb] = useState("login");
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [severity, setSeverity] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  
	const setUserData =  (data)=>{
		userStore.user =data
	}
	const userData =useObserver(()=>{
		return  userStore.user
  })
	const isLogOut = useCallback(()=>{
	  	userStore.logout()
      alertMessage('로그아웃 되었습니다.', 'success');
	},[])
  const authLoading = useObserver( ()=>{
    // if(userData){ userStore.loading = false}
      // console.log('home.js userStore.loading',userStore.loading,',get >>:', userStore.getLoading )
      // return userStore.getLoading
      return userStore.loading
  })

useEffect(() => {
  document.body.style.overflow = "unset";
    

  if(userAgent.indexOf("android") > -1 || userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
    const msgObj = {
      targetFunc: 'getToken',
      data:{}
    };

    var msg = JSON.stringify(msgObj);
    

    promiseChain.then(function() {
      return new Promise(function (resolve, reject) {
        console.log("send message " + msgObj.targetFunc);
        
        window.ReactNativeWebView.postMessage(msg);
        resolve();
      })
    }).catch(e => {
      console.log('err',e)
    })


    
    // if(window.AndroidInterface !== undefined) {
    //   window.AndroidInterface.callData();
    // }

  }

  
  // axios.get("/auth/verify")
  // //.then(res => console.log("verify landing:",res.data))
  // .then(res => 
  //   {if(res.data) {

      /* 팝업시 로그인후 창닫기*/
  if(seachParam('code')=='SUCCESS'&window.opener){
      // if(userData&&window.opener){
    console.log('>>>>')
    window.opener.parent.location.reload();
    window.self.close();
  }

  //     //console.log("res.data.user", res.data.user);	        	 
  //     //userStore.setUser(res.data.user);
  //     //userStore.setToken(res.data.token);
  //     //setIsAuthenticated(true);
  //     setIsAuthenticated(res.data.isAuth);
  //     setUserData(res.data.user);
  //     auth.setAuthHeader(res.data);

  //     } else {
  //     setIsAuthenticated(false);
  //     setUserData([]);
  //   }}
  // )
  // .catch(err => {    //console.log("login check error");
  //   setIsAuthenticated(false);
  //   setUserData([]);
  //   auth.logOut();
  //   props.history.push('/newhome');

  // });    

  axios.post("/api/getChainportal").then(res => setChainData(res.data)).catch(err => {
    console.log("login check error", err);
  });
    //.then(res => console.log("return:",res.data))
  numCnt = 1;
  axios.post("/api/notice",{service:'plismplus',url:'main'}).then(setBoardData([])).then(res => {
    setBoardData(res.data);
    // setTotpage(res.data[0].tot_page);
  });

  const isEdge = window.navigator.userAgent.indexOf('Edge') !== -1;
  const isIE = window.navigator.userAgent.indexOf('Trident') !== -1 && !isEdge;
  if (isIE) {
    window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
  }   
  return () => {
  }
}, []);

    const handleClickLoginPage = () => {
        setModalGb("login");
        setOpen(true);
    }
    const handleClickLoginPage2 = () => {
      // setModalGb("login");
      // setOpen(true);
      window.location.replace('http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/klnet/callback&response_type=code&state=12345');
  }
    const handleClickSignPage = () => {
        setModalGb("sign");
        setOpen(true);
    }
    const handleClickClose = () => {
      setOpen(false);
    }

  //   const handleLoginClose = (value) => {
  //       console.log("value ", value);
  //       setUserData(value);
  //       setOpen(false);
  //       userStore.isAuthenticated=true;
  //   }
  //   const handleLogOut = () => {
  //     userStore.isAuthenticated=false;
  //     //userStore.logout();
  //     alertMessage('로그아웃 되었습니다.', 'success');
  // }
  function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}
	
    const MenuOpen = () =>{
      header.current.classList.toggle('is-gnb-open');
    }
    const classes = useStyles();
     
    const goPlism = (author_code) => {
          if(userData) {
            console.log('goPrism')
            const host = window.location.hostname;
            let url = '';
            if( host.indexOf('localhost') >= 0 ){
            url = 'http://localhost:8088/uat/uia/ownerMain.do?';
            }else if( host.indexOf('dev') >= 0 ) {
            url = 'https://test.plism.com/uat/uia/ownerMain.do?';
            } else {
            url = 'https://www.plism.com/uat/uia/ownerMain.do?';
            }
            axios.get("/auth/readyplism" )
            .then(res => {
            if (res.data.auth_code){
              window.open(url+'id='+userData.user_no+'&auth_code='+res.data.auth_code, '_plism');
            } else {
              isLogOut();
            }
            })
            .catch(err => {
            console.log(err);
            //window.location.href = "/Landing";
            isLogOut();
            })
          } else {
            alertMessage('로그인이 필요한 서비스입니다.', 'error');
        }
    }
    const menuAccessLog = async(value) => {
      try{
        const result = await axios.post('/api/menuAccessLog',{user:userData?userData.user_no:'GUEST',path:value.layout+value.path,name:value.name});
        console.log(result)
      }catch(e){
        console.log(e)
      }
    }
return (

    <div className="app">
                          
      {/* <!-- header --> */}
      

      <header className="app-header is-gnb-over "  ref={header} >
        <div className="app-header__inner">
          <strong className="app-header__logo">
            <a href="/" className="app-header__logo--link">
              <span className="sr-only">PLISM 로고</span>
            </a>
          </strong>
          <button type="button" className="btn-hamburger is-mobile" onClick={MenuOpen}>
            <span className="sr-only">menu toggle</span>
            <span className="btn-hamburger__bar"></span>
            <span className="btn-hamburger__bar"></span>
            <span className="btn-hamburger__bar"></span>
          </button>
          <div className="gnb" > 
            <ul className="gnb__container">
              {Router.map((value,index) => {
              if(value.mainShow) {
              return (
                <React.Fragment key = {index}>
                  {value.collapse
                    ?(
                      value.name!='PLISM 3.0'
                      ?(
                        <li className="gnb__item">
                          <a href="# " className="gnb__anchor">{value.name}</a>
                          <ul className="gnb__depth">
                            {value.views.map((element,key) => {
                              return(
                                element.mainShow?
                                  <li className="gnb__depth--item" key={key} onClick={()=> menuAccessLog(element)}>
                                    <Link key={"child"+key} to={element.layout+element.path} className="gnb__depth--anchor">{element.name}</Link>
                                  </li>
                                :null
                              )
                            })}
                          </ul>
                        </li>
                      ):(
                        <li className="gnb__item" >
                          <a href="#"  className="gnb__anchor">PLISM 3.0</a>
                          <ul className="gnb__depth">
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">해상수출입업무서비스</div>
                            </li>
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">수입적하목록서비스</div>
                            </li> 
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">수출적하목록서비스</div>
                            </li> 
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">AFR</div>
                            </li>
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">위험물</div>
                            </li> 
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">VGM</div>
                            </li> 
                            <li className="gnb__depth--item">
                              <div onClick={()=>goPlism()} className="gnb__depth--anchor">SMART SCHEDULE</div>
                            </li> 
                          </ul>
                        </li> 
                      )
                    ):(
                        <li className="gnb__item" onClick={()=> menuAccessLog(value)}>
                          <Link to={value.layout+value.path} className="gnb__anchor">{value.name}</Link>
                        </li>
                    )
                  }
                </React.Fragment>
              )



              }
              })}

              {!authLoading&&userStore.user&& userStore.user.role == 'Y'?
                <li className="gnb__item" >
                  <Link to="/admin" className="gnb__anchor">관리자메뉴</Link>
                </li>
              :null}

            </ul>
          </div> 

          <HeaderLinks 
          dropdownHoverColor="info" 
          onLoginOpen={handleClickLoginPage} 
          onLoginOpen2={handleClickLoginPage2} 
          onSignOpen={handleClickSignPage} 
          // isAuthenticated={userStore.getIsAuth} 
          // setIsAuthenticated={userStore.isAuthenticated}
          userData={userData} 
          // logOut={handleLogOut}
          logOut={isLogOut}
          authLoading={authLoading}
          setModalGb={setModalGb}    
          setOpen={setOpen}
          />
          <Dialog open={open} onClose={handleClickClose}>
            {modalGb == "changeSession"
            ? <DialogContent
              style={{
              maxWidth: '400px',
              minWidth: '350px',
              paddingLeft: '10px',
              paddingRight: '10px'
              }}>
                {/* <ChangeSessionPage  userData={userData} onClose={handleLoginClose} adminRole = {userStore.user.role} /> */}
              </DialogContent>
            : <DialogContent
                style={{
                maxWidth: '950px',
                minWidth: '350px',
                paddingLeft: '15px',
                paddingRight: '15px'
                }}><SignPage onClose={e => setOpen(false)}/></DialogContent>
            }
          </Dialog>
        </div>
      </header>



      <main className="app-container">
      <h1 className="sr-only">PLISM CONTENT</h1>
      <section id="section1" className="section section--01">
        <div className="section__inner">
          <div className="swiper-wrap">
            <Swiper
              // spaceBetween={50}
              // slidesPerView={1}
              navigation={{
                prevEl: '#section1 .swiper-button-prev',
                nextEl: '#section1 .swiper-button-next',
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log('slide change')}
              autoplay={{ delay: 3000 }}
              speed={1000}
            >
              <SwiperSlide>
                <div className="figure">
                  <div className="figure__img is-desktop">
                    <img src={bg_section0101.src} alt={bg_section0101.alt} />
                  </div>
                  <div className="figure__img is-mobile">
                    <img src={bg_section0101_mo.src} alt={bg_section0101_mo.alt} />
                  </div>
                  <div className="figure__caption">
                    <strong className="figure__title">선사스케줄, B/K</strong>
                    <p className="figure__text">
                      국내 최다 선사 스케줄 보유,
                      <br />
                      한 화면에서 선사의 서비스 스케줄을
                      <br className="is-mobile-wrapline" />
                      확인 하실 수 있습니다.
                      <br />
                      원하는 스케줄을 찾으셨다면, &nbsp;
                      <br className="is-mobile-wrapline" />
                      Booking도 바로 진행해보세요!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="figure">
                  <div className="figure__img is-desktop">
                    <img src={bg_section0102.src} alt={bg_section0102.alt} />
                  </div>
                  <div className="figure__img is-mobile">
                    <img src={bg_section0102_mo.src} alt={bg_section0102_mo.alt} />
                  </div>
                  <div className="figure__caption">
                    <strong className="figure__title">Tracking</strong>
                    <p className="figure__text">
                      이제 선사의 B/L 넘버만 등록하시면&nbsp;
                      <br className="is-mobile-wrapline" />
                      내 화물의 상태 뿐 아니라&nbsp;
                      <br className="is-mobile-wrapline" />
                      선박의 위치까지 확인할 수 있습니다.
                      <br />
                      중요한 화물이 있다면,&nbsp;
                      <br className="is-mobile-wrapline" />
                      이제 프리즘 플러스와 함께하세요.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="figure">
                  {/* <!-- 이미지 pc, mobile 분기처리 필요 --> */}
                  <div className="figure__img is-desktop">
                    <img src={bg_section0103.src} alt={bg_section0103.alt} />
                  </div>
                  <div className="figure__img is-mobile">
                    <img src={bg_section0103_mo.src} alt={bg_section0103_mo.alt} />
                  </div>
                  <div className="figure__caption">
                    <strong className="figure__title">컨테이너 관리</strong>
                    <p className="figure__text">
                      국내에 입항한 컨테이너 화물의&nbsp;
                      <br className="is-mobile-wrapline" />
                      반출, 반납기한의 관리
                      <br />
                      그리고 터미널 경과 보관료까지
                      <br />
                      프리즘 플러스에서 한 번에 관리하세요.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <div className="swiper-controls">
                <div className="swiper-button-next" ></div>
                <div className="swiper-button-prev" ></div>
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
      <SectionHsnImo alertMsg={(msg,state) => alertMessage(msg,state)} />
      <SectionCarouselPs data={chainData}/> 
      <Board data={boardData}/> 
      </main>



      <footer className="app-footer">
        <div className="app-footer__inner">
          <div className="app-footer__top">
            <div className="company">
              <strong className="company__name">
                <span className="sr-only">PLISM</span>
              </strong>
              {authLoading==false?

              <Footer 
              // token={auth.authHeader()}
              userData={userData}
            
              />              
            :''}
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
                      <a href="# " className="site-map__depth--anchor">B/L 등록</a>
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
                        관세청 정보
                      </a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        HS Code 검색
                      </a>
                    </li>
                    <li className="site-map__depth--item">
                      <a href="# " className="site-map__depth--anchor">
                        IMO Code 검색
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="app-footer__bottom">
            <div className="app-footer__copy">
              <em className="app-footer__copy--text">
              본 시스템의 저작권은 케이엘넷에 있습<a onClick={handleClickLoginPage}>니다</a>
              </em>
             
            </div>          
            <div className="app-footer__call">
              
              <strong className="app-footer__call--subject">고객지원센터</strong>
              <a href="tel:1577-1172" className="app-footer__call--number">
                1577-1172
              </a>
            </div>  
            <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
              <Alert 
                onClose={handleAlertClose}
                severity={severity}>
                  {errMessage}
              </Alert>
            </Snackbar>        
          </div>
         
        </div>       
      </footer>
    </div>
 
  )
}



export default observer(Home);
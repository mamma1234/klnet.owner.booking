import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import axios from 'axios';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function Terminal(props) {
    const {data} = props;
    const [detailData, setDetailData] = React.useState([]);

   /* React.useEffect(() => {
        axios
            .post("/api/getChainportalDetail", {terminal: data.terminal_alias})
            //.then(res => console.log("return:",res.data))
            .then(res => setDetailData(res.data))
            .catch(err => {
                console.log("login check error", err);
            });

    }, [data]);*/

    return (

        <> 
        {/* <!-- booking module --> */} 
        < div className = "booking-module" > 
          <div className="booking-module__head">
            <h2 className="booking-module__title">
                {data.terminal_alias}
            </h2>
            <p className="booking-module__date">
                {data.insert_date}
            </p>
            {/* <!--
            원활 클래스: is-want
            난항 클래스: is-difficult
            --> */
                }
            {/*  <span className="booking-module__state is-want">{data.inout_status}{data.ino
              * ut_status_str}</span> 
              */
            }
            {/* <!-- 난항
              <span className="booking-module__state is-difficult">난항</span>
              --> */
            }
            {data.inout_status_str == 'primary' && <span className="booking-module__state is-want">양호</span>}
            {data.inout_status_str == 'warning' && <span className="booking-module__state is-difficult">보통</span>}
            {data.inout_status_str == 'danger' && <span className="booking-module__state is-danger">혼잡</span>}
          </div>
          <ul className="booking-module__count">
              <li className="booking-module__count--item">
                  <em>20</em>
                  <span className="system">{data.empty_20_cnt}</span>
              </li>
              <li className="booking-module__count--item">
                  <em>40</em>
                  <span className="system">{data.empty_40_cnt}</span>
              </li>
              <li className="booking-module__count--item">
                  <em>40HC</em>
                  <span className="system">{data.empty_45_cnt}</span>
              </li>
              <li className="booking-module__count--item">
                  <em>ETC</em>
                  <span className="system">{data.empty_etc_cnt}</span>
              </li>
          </ul>
          <div className="booking-module__status">
              <DetailTerminal data={data}/>
          </div>
        </div>
    </>
    );
}
function DetailTerminal(props) {
  const {data}=props;
  const terminalList = data.port_data?data.port_data:{};
  return(
		  terminalList.map((list,key)=>{
      
      const count_rd = list.rd_cnt +"%";
      if(list.terminal_alias == data.terminal_alias){
      return  (
            <div className="booking-module__status--item" key={key}>          
              <span className="booking-module__status--bar">               
                {list.terminal_ship_voyage_no
                  ?<><span className="booking-module__status--system" style={{width : count_rd}}></span> 
                  <span className="booking-module__status--per">{list.rd_cnt}%</span></>
                  : <><span className="booking-module__status--system" style={{width :0}}></span>
                  <span className="booking-module__status--per">0%</span></>
                }
              </span>
                {list.terminal_ship_voyage_no
                ? <div className="booking-module__status--caption">
                        <em className="booking-module__status--subject">{list.terminal_ship_voyage_no}:</em>
                        <span className="booking-module__status--text">{list.terminal_ship_name}({list.shipping_code})</span>
                    </div>
                : null
                }
            </div>
          )
        }
      }  
    )    
  )
}
    // {
    //   detailData.map(
    //     (list, key) => list.terminal_alias == data.terminal_alias
    //         ?
    //         <div className="booking-module__status--item">
    //             <span className="booking-module__status--bar">
    //                 <span
    //                     className="booking-module__status--system"
    //                     style={{
    //                         width : 0
    //                     }}></span>
    //                 {
    //                     list.terminal_ship_voyage_no
    //                         ? <span className="booking-module__status--per">{list.rd_cnt}%</span>
    //                         : <span className="booking-module__status--per">0%</span>
    //                 }
    //             </span>
    //             {
    //                 list.terminal_ship_voyage_no
    //                     ? <div className="booking-module__status--caption">
    //                             <em className="booking-module__status--subject">{list.terminal_ship_voyage_no}:</em>
    //                             <span className="booking-module__status--text">{list.terminal_ship_name}({list.shipping_code})</span>
    //                         </div>
    //                     : null
    //             }
    //         </div>
    //         : null
    // )
    // }
  // )
  



export default function Slick (props) {
	
  // console.log(">>>>>>props",props);
	const {data} = props;

	
	return (
		
     
		<section id="section3" className="section section--03">
        <div className="section__inner">
          <div className="swiper-wrap">
            <Swiper
              //spaceBetween={0} 0421수정
              slidesPerView={2} 
              navigation={{
                prevEl: '#section3 .swiper-button-prev',
                nextEl: '#section3 .swiper-button-next',
              }}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log('slide change')}
              autoplay={{ delay: 3000 }}
              breakpoints ={{
                1024: {
                  slidesPreView:2,
                  spaceBetween:30
                }
              }}
            >

                {data.map((prop,key)=>
                <SwiperSlide key={key}>
                  <Terminal  data={prop}/>
                </SwiperSlide>
                )}
       
            </Swiper>

            
            <div className="swiper-controls">
                {/* <!-- Add Arrows --> */}
                <div className="swiper-button-next" ></div>
                <div className="swiper-button-prev" ></div>
                {/* <!-- Add Pagination --> */}
                <div className="swiper-pagination"></div>
              </div>
          </div>
        </div>
      </section>

	);
}
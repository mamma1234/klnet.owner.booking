import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {Link} from "react-router-dom";

//import axios from 'axios';
import {
    Box,	    
    Dialog,
    DialogContent,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function Board(props) {
    
    const {data} = props;

    return(
		<>		
			<section id="section4" className="section section--04">
				<div className="section__inner">
					<h3 className="title">서비스 공지사항</h3>
					<SwiperNew tableData={data} />
					
					
				</div>        
			</section>
		</>
    );
}


function SwiperNew(props) {
    //console.log(props);

    const {tableData} = props; // eslint-disable-line no-unused-vars
    const [detailData, setDetailData] = React.useState(tableData);
    const [open, setOpen] = React.useState(false);
    //const { row } = props;

    return (
        <div className="swiper-wrap">
                  
            <Swiper 
			spaceBetween={1} 
			slidesPerView={2} //0421수정 0
			slidesPerGroup={1} 
			loopFillGroupWithBlank={true} 
			navigation={{
                    prevEl: '#section4 .swiper-button-prev',
                    nextEl: '#section4 .swiper-button-next'
                }} pagination={{
                    clickable: true
                }}
                // scrollbar={{ draggable: true }}
                
                // onSwiper={(swiper) => console.log(swiper)}
                
                // onSlideChange={() => console.log('slide change')}
			autoplay={{
				delay: 3000
			}} breakpoints={{
				1024 : {
					slidesPerView: 3,
					spaceBetween: 60,
					slidesPerGroup: 3
				}
			}}>

                {
                    tableData.map((prop, key) => {
                        return (
							
								<SwiperSlide className="noticeCus" key={key}>
									<div className="notice">
										<Link 
											key={key}
											to={{
											pathname : `/svc/board`,
											state : {param : prop.board_id}}}>
											<strong className="notice__title">
												{prop.title}
											</strong>
											<div className="notice__text" dangerouslySetInnerHTML={{__html:prop.content}}/>
											
										</Link>
									</div>
								</SwiperSlide>
							

                        );
                    })
                }					
            </Swiper>
            <div className="swiper-controls">
                {/* <!-- Add Arrows --> */}
                <div className="swiper-button-next" ></div>
                <div className="swiper-button-prev" ></div>
                {/* <!-- Add Pagination --> */}
                {/*<div className="swiper-pagination"></div>*/}
            </div>
            <Dialog
		        open={open}
		        //TransitionComponent={Transition}
		        onClose={()=> setOpen(!open)}
		      >
		    	<DialogContent style={{paddingLeft:'10px',paddingRight:'10px'}}>
		            <Box margin={1}>
			            <div>
			            	<Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}} >
					            <TableBody>
						                <TableRow>
						                  <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px',width:'15%'}}>제목</TableCell>
						                  <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}} colSpan={3}>{detailData.title}</TableCell> 
						                </TableRow>
						                <TableRow>
							                <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>등록자</TableCell>
							                <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}}>{detailData.author_name}</TableCell>
							                <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>등록일</TableCell>
							                <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}}>{detailData.insert_date}</TableCell>
							            </TableRow>
						              	<TableRow>
						              		<TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>내용</TableCell>
						              		<TableCell style={{paddingTop:'3px',paddingBottom:'3px'}} colSpan={3}>
						              		{
						              			String(detailData.content).split('\n').map( (line, index) => {
						                          return (<span key={index}>{line}<br/></span>)
						                        })
						                      }
						              		</TableCell>
						              	</TableRow>
					            </TableBody>
			            	</Table>
			        	</div>
		            </Box>
		    	</DialogContent>
		    </Dialog>

        </div>

    );
}

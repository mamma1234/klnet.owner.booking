import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Typography,Grid,Tooltip} from '@material-ui/core';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import Filter9Icon from '@material-ui/icons/Filter9';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import axios from 'axios';

function Terminal(props) {
    const {data} = props;
    const [detailData,setDetailData] = React.useState([]);
    
    React.useEffect(() => {
    	axios.post("/api/getChainportalDetail",{terminal:data.terminal_alias})
  	  //.then(res => console.log("return:",res.data))
  	  .then(res =>setDetailData(res.data) 	
  	  ).catch(err => {console.log("login check error",err);});
  	  
    }, []);
    

    
	return (
		<div>
	      	<div style={{textAlign:'center',paddingBottom:'1px',paddingLeft:'10px',paddingRight:'10px'}}>
	        <div style={{textAlignLast:'start',position:'absolute'}}><h3 style={{marginTop:'0'}}>{data.terminal_alias}</h3></div>
	      	<div style={{textAlignLast:'end'}}><AccessTimeIcon style={{paddingTop:'8px',paddingBottom:'0'}}/>{data.insert_date}</div>
	      	</div>
			<Card style={{margin:'5px',width:'unset',backgroundColor:'transparent',border:'1px solid silver',color:'silver'}}>
          	<CardBody style={{height: '330px'}}>
          	    <Grid item xs={12}>
          	    	<Grid container spacing={1} justify="center">
          	    		<Grid item xs={4}  style={{textAlign:'center'}}>
          	    			<Tooltip title={data.inout_status_str =='primary'?data.inout_status:''}>
          	    				{data.inout_status_str =='primary'?<FiberManualRecordIcon style={{color:'green'}}/>:<FiberManualRecordOutlinedIcon />}
          	    			</Tooltip>
          	    		</Grid>
          	    		<Grid item xs={4}  style={{textAlign:'center'}}>
	      	    			<Tooltip title={data.inout_status_str =='warning'?data.inout_status:''}>
	  	    					{data.inout_status_str =='warning'?<FiberManualRecordIcon style={{color:'orange'}}/>:<FiberManualRecordOutlinedIcon />}
	  	    				</Tooltip>
	  	    			</Grid>
          	    		<Grid item xs={4}  style={{textAlign:'center'}}>
	      	    			<Tooltip title={data.inout_status_str =='danger'?data.inout_status:''}>
	  	    					{data.inout_status_str =='danger'?<FiberManualRecordIcon style={{color:'red'}}/>:<FiberManualRecordOutlinedIcon />}
	  	    				</Tooltip>
	  	    			</Grid>
          	    	</Grid>
          	    </Grid>
          	    <hr style={{marginTop:'10px',marginBottom:'10px'}}/>
          	    <Grid item xs={12}>
	              	 <Grid container spacing={1} justify="center" >
        	    		<Grid item xs={3} style={{textAlign:'center',textAlign:'-webkit-center'}}><img src={require("assets/img/cntr/cntr20.png")}/> {data.empty_20_cnt}</Grid>
        	    		<Grid item xs={3} style={{textAlign:'center',textAlign:'-webkit-center'}}><img src={require("assets/img/cntr/cntr40.png")}/> {data.empty_40_cnt}</Grid>
        	    		<Grid item xs={3} style={{textAlign:'center',textAlign:'-webkit-center'}}><img src={require("assets/img/cntr/cntr40h.png")}/> {data.empty_45_cnt}</Grid>
        	    		<Grid item xs={3} style={{textAlign:'center',textAlign:'-webkit-center'}}><img src={require("assets/img/cntr/cntretc.png")}/> {data.empty_etc_cnt}</Grid>
        	    	</Grid>
        	    </Grid>
          	    <hr style={{marginTop:'10px',marginBottom:'10px'}}/>
          		<Grid item xs={12} style={{textAlign:'center'}}> 
          				<Grid container spacing={1} style={{paddingLeft:'10px',paddingRight:'10px',textAlign:'-webkit-center'}}>
          				{detailData.map((list,key) =>
          				list.terminal_alias == data.terminal_alias?
          				<Grid item xs={4} key={key}>
           					<Grid item xs={12}>

           					    {list.rd_cnt >=91 && list.rd_cnt <= 100?<img src={require("assets/img/main/시안2_4단계.png")} style={{width:'70px',height:'25px'}}/>:
           					     list.rd_cnt >=71 && list.rd_cnt <=90?<img src={require("assets/img/main/시안2_3단계.png")} style={{width:'70px',height:'25px'}}/>:
           					     list.rd_cnt >=51 && list.rd_cnt <=70 ?<img src={require("assets/img/main/시안2_2단계.png")} style={{width:'70px',height:'25px'}}/>:
           					     list.rd_cnt >=20 && list.rd_cnt <=50 ?<img src={require("assets/img/main/시안2_1단계.png")} style={{width:'70px',height:'25px'}}/>:
           					     <img src={require("assets/img/main/시안2_0단계.png")} style={{width:'70px',height:'25px'}}/>}       						
           					</Grid>
           					{list.terminal_ship_voyage_no?<Grid item xs={12} style={{textAlign:'center',fontWeight:'bold'}}>{list.rd_cnt}%</Grid>:
           						<Grid item xs={12} style={{textAlign:'center',fontWeight:'bold'}}>0%</Grid>}
           					{list.terminal_ship_voyage_no?
           							<Grid item xs={12} style={{textAlign:'center',fontSize:'1px',lineHeight:'initial'}}>{list.terminal_ship_voyage_no}:<br/>{}{list.terminal_ship_name}({list.shipping_code})</Grid>:
           					 <Grid item  xs={12} style={{textAlign:'center'}}><br/><br/></Grid>}
           				</Grid>:null
          				)}
          				</Grid>
          			
          				              				
      				</Grid>
          	</CardBody>
          	</Card>	
          	</div>
	);
}

export default function Slick (props) {
	
  // console.log(">>>>>>props",props);
	const {data} = props;
	
	var settings = {
			dots:true,
			infinite:true,
			speed: 500,
			autoplay:true,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint:1024,
					settings:{
						dots:true,
						infinite:true,
						speed: 500,
						autoplay:true,
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint:900,
					settings:{
						dots:true,
						infinite:true,
						speed: 500,
						autoplay:true,
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint:700,
					settings:{
						dots:false,
						infinite:true,
						speed: 500,
						autoplay:true,
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				
			]
	}

	
	return (
			<div style={{
		          backgroundImage:
		              "url(" + require("assets/img/port2.png") + ")",backgroundSize:'cover',padding:'10px',filter:'contrast(0.8)'
		          }}>
			<Slider {...settings} style={{margin:'1% 6% 1% 6%'}}>
				{data.map((prop,key)=>
				<Terminal key={key} data={prop}/>
				)}
			</Slider>
			<br/>
			<Grid item xs={12} md={6} sm={12} style={{paddingLeft:'5%'}}>
				<Grid container spacing={2} alignItems="center" justify="space-between">
							<Grid item xs={5}  md={5}>컨테이너 터미널별 야드 혼잡 현황</Grid>
			      			<Grid item xs={7}  md={6}>
			      				<Grid container spacing={1} alignItems="center" style={{border:'1px solid silver',borderRadius:'3px',paddingBottom:'0'}}>
			      					<Grid item xs={4} ><FiberManualRecordIcon style={{color:'green',padding:'4px'}}/>양호</Grid>
			      					<Grid item xs={4}><FiberManualRecordIcon style={{color:'orange',padding:'4px'}}/>보통</Grid>
			      					<Grid item xs={4}><FiberManualRecordIcon style={{color:'red',padding:'4px'}}/>혼잡</Grid>
			      				</Grid>
							</Grid>
				</Grid>
			</Grid>
			
	    </div>
			
	);
}
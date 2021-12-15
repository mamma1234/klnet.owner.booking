import React,{Children} from "react";
//import ReactDatetime from "react-datetime";
// reactstrap components
import {
  FormGroup,
  Card,CardBody,Label,Button,
  Row,TabContent,TabPane,Collapse,
  Col,Badge
  // UncontrolledTooltip,
} from "reactstrap";
import NoticeModal from './SchedulePopup.js';
import {CustomSelect,CustomDatePicker} from 'reactstrapComponents/CustomInput/CustomInput.js';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import axios from 'axios';
import { Link } from "react-router-dom";
// core components
const localizer = momentLocalizer(moment);

let curnum = 1;

function ScheduleTables(props) {

	
  const [listData,setListData] = React.useState([]);
  const [calendarData,setCalendarData] = React.useState([]);
  //list
  const [listDate,setListDate] = React.useState(new Date());
  //calendar
  const [calDate,setCalDate] = React.useState(new Date());
  const [publicDate,setPublicDate] = React.useState({label:'2 Week',value:'2 week'});
  const [activeTab,setActiveTab]  = React.useState("1");
  const [activeTitle,setActiveTitle]  = React.useState("List");
  const [activeClass,setActiveClass]  = React.useState("fa fa-list fa-lg");
  const [startPort,setStartPort] = React.useState("");
  const [endPort,setEndPort] = React.useState("");
  const [totalPage,setTotalPage] = React.useState("");
  const [openNotice,setOpenNotice] = React.useState(false);
  const [fadeIn,setFadeIn] = React.useState(false);
  const [detailParam, setDetailParam] = React.useState(null);
  const [selectButton, setSelectButton] = React.useState("ALL");
  const [routePort,setRoutePort] = React.useState([]);
  
  
  React.useEffect(() => {
		if(props.user) {
			portlist();
			var vNow = new Date();
			vNow.setDate('01');
			calendarSql('','',vNow,'5 week'); 
		}
  }, [props.user]);
  
  
  React.useEffect(() => {
    const updateListData = () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;
      //Scroll 화면 하단 Check 
      if(activeTab === "2" && (Math.round(scrollTop+clientHeight) === scrollHeight)) {
        if(listData.length > 0 && (totalPage != curnum)) {
          curnum=curnum+1;
          axios.post("/shipper/getWdSchList",{ startport:startPort,endport:endPort,eta:moment(listDate).format('YYYYMMDD'),week:publicDate.value,culnum:curnum},{})								
          .then(res => setListData([...listData,...res.data]));
        } else {
          setFadeIn(false);  
        }
      }
    }
    window.addEventListener("scroll", updateListData);
    return function cleanup(){
      window.removeEventListener("scroll", updateListData);
    };
  });
  
  const portlist =() =>{
	  axios.post("/shipper/getLineRoute",{ line_code:'WDFC'})								
	  .then(res => setRoutePort(res.data));  
  }

  const selectData = [
    {label:'2 Week',value:'2 week'},
    {label:'4 Week',value:'4 week'},
    {label:'6 Week',value:'6 week'},
    {label:'8 Week',value:'8 week'},
  ];

  const onChangeButton = ()=>{
    if(activeTab === "1") {
      // today init
      var vDate = new Date();
      setListDate(vDate);
      setActiveTab("2");
      setActiveTitle("Calendar");
      setActiveClass("fa fa-calendar fa-lg");
      curnum =1;
      setPublicDate({label:'2 Week',value:'2 week'});
      listSql(startPort,endPort,vDate,'2 week');
    } else {
      setActiveTab("1");
      setActiveTitle("List");
      setActiveClass("fa fa-list fa-lg"); 
      var vDate = calDate;
      vDate.setDate('01');
      setCalDate(vDate);
      calendarSql(startPort,endPort,vDate,'5 week',startPort?'Y':null);
    }
  }
  
  const onSubmit =(start,end)=>{
    var startVal;
    var endVal;
    curnum=1;
    if( 'KRPTK' === start && 'CNTAO' === end) {
      props.onAlert("error","평택-청도 노선은 선사로 별도 문의 바랍니다.");
      return false;
    }
    if(start && end) {
      startVal = start;
      endVal = end;
      setSelectButton(startVal+endVal);
    } else {
      startVal =null;
      endVal =null;
      setSelectButton("ALL");
    }
    setStartPort(startVal);
    setEndPort(endVal);
    
    if(activeTab === "1") {	
      var vDate = calDate;
      vDate.setDate('01');
      calendarSql(startVal,endVal,vDate,'4 week','Y');
    } else {
      listSql(startVal,endVal,listDate,publicDate.value);
    }  
  }
  
  const onDateSubmit =(date) => {
	  setListDate(date)
      curnum=1; 
	  listSql(startPort,endPort,date,publicDate.value);
  }
  
  const onWeekSubmit=(value)=>{
	  curnum=1;
	  setPublicDate(value);
	  listSql(startPort,endPort,listDate,value.value);
  }

  
  const calendarSql = (start,end,etd,week,init) =>{
    axios.post("/shipper/getWdSchCal",{ startport:start,endport:end,eta:moment(etd).format('YYYYMMDD'),week:week, line_code:'WDFC'},{})								
    .then(res => { if(res.data !="") {
                      setCalendarData(res.data);
                    } else { 
                      if(init){
                        setCalendarData([]);
                      }
                      props.onAlert("error","조회된 (스케쥴) 정보가 없습니다.");
                    }
                  });
  };
  
  const listSql = (start,end,etd,week) =>{
    //setViewMsg(false);
    axios.post("/shipper/getWdSchList",{ startport:start,endport:end,eta:moment(etd).format('YYYYMMDD'),week:week,culnum:curnum},{})								
    .then(setListData([]))
    .then(res => {
      if(res.data != "") {
        setListData(res.data); 
        setTotalPage(res.data[0].total_page);
        
        if(res.data[0].total_page != curnum) {
          setFadeIn(true);
        }
        } else { setListData([]);  props.onAlert("error","조회된 (스케쥴) 정보가 없습니다.");
          setTotalPage(0);
        }
    });
  };

  const selectedEvent = (event,e) => {
		setDetailParam(event);
		setOpenNotice(true);
  };

  const onNextPage = () => {
    if(listData.length > 0 && (totalPage != curnum)) {
      curnum=curnum+1;
      axios.post("/shipper/getWdSchList",{ startport:startPort,endport:endPort,eta:moment(listDate).format('YYYYMMDD'),week:publicDate.value,culnum:curnum},{})								
      .then(res => setListData([...listData,...res.data]));
    } else {
      setFadeIn(false);
    }
  }

  const ColoredDateCellWrapper =({children,value})=>
  	React.cloneElement(Children.only(children),{style:{...children.style,backgroundColor:moment(value).format('YYYYMMDD') === moment(new Date()).format('YYYYMMDD')?'#51bcda47':''}});
  	
  
  const CustomToolbar =(toolbar) => {
	  const goToBack=()=> {
		  toolbar.date.setMonth(toolbar.date.getMonth() -1);
		  
		  
		  var vDate = new Date();
		  vDate.setMonth(toolbar.date.getMonth());
		  vDate.setDate('01');
		  setCalDate(vDate);
		  calendarSql(startPort,endPort,vDate,'5 week');
		  toolbar.onNavigate('Back',toolbar.date);
	  }
	  
	  const goToNext=()=> { 
		  toolbar.date.setMonth(toolbar.date.getMonth() +1);
		  var vDate = new Date();
		  vDate.setMonth(toolbar.date.getMonth());
		  vDate.setDate('01');
		  setCalDate(vDate);
		  calendarSql(startPort,endPort,vDate,'5 week');
		  toolbar.onNavigate('Next',toolbar.date);
	  }
	  const goToCurrent=()=> {

		  const now = new Date();
		  toolbar.date.setMonth(now.getMonth());
		  toolbar.date.setYear(now.getFullYear());
		  
		  if(now.getMonth() !== toolbar.date.getMonth() ) {
			  var vDate = now;
			  vDate.setDate('01');
			  calendarSql(startPort,endPort,vDate,'5 week');
		  }
		  setCalDate(vDate);
		  toolbar.onNavigate('ToDay',toolbar.date);
	  }
	  
	  const label =()=>{
		  const date = moment(toolbar.date);
		  return (
			<h2><b>{date.format('YYYY')+" / "+date.format('MM')}</b></h2>	  
		  );
	  };
	  
	  return (
			  <div style={{width:'87%',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginBottom:'10px',fontSize:'16px'}}>	
			  	<div>
			  		<Button style={{border:'solid 1px #DDD'}} color="default" outline size="sm" type="button" className="mr-1" onClick={goToCurrent}>Today</Button>
			  		<Button style={{border:'solid 1px #DDD'}} color="default" outline size="sm" type="button" className="mr-1" onClick={goToBack}>Back</Button>
			  		<Button style={{border:'solid 1px #DDD'}} color="default" outline size="sm" type="button" className="mr-1" onClick={goToNext}>Next</Button>
			  	</div>
			  	<label style={{textAlign:'center',padding:'0 10px',flexGrow:'1'}}>{label()}</label>
			  	<div style={{fontSize:'small',textAlignLast:'end'}}>
			  		<Badge className="mr-1" color="warning" pill style={{display:'inline-block'}}/>화물선박&nbsp;&nbsp;&nbsp;<Badge className="mr-1" color="info" pill style={{display:'inline-block'}}/>페리선박
            	</div>
			  </div>		  		
	  );
	  
  }
  return (
  <>
    <div className="section section-white">
      {/* <h4 className="mb-1 text-center">
        <small>Ocean Schedule</small>
      </h4> */}
      <Col className="ml-auto mr-auto pt-4 pb-4" xl="10" lg="10" md="10" sm="10">

            <Row className='searchInfo text-center' >
              <Col className='searchInfo__route'    > {/**xl="6" lg="12" */}   
                  <Button className="mr-1 mt-2 pl-4 pr-4" color={selectButton==="ALL"?"info":"default"} type="button" onClick={()=>onSubmit('','')}>전체{' '}</Button>
                    {routePort.length>0?
                      routePort.map((data,key)=>
                        <Button key={"schedule_"+key} className="mr-1 mt-2 pl-1 pr-1" color={selectButton===data.start_port_code+data.end_port_code?"info":"default"} type="button" 
                        onClick={()=>onSubmit(data.start_port_code,data.end_port_code)}>{data.start_port_kr_name}->{data.end_port_kr_name+' '}</Button>
                        ):<></>
                    }
              </Col>
              
            </Row>

      </Col>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">         
          <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">              
            <Card className="card-raised card-form-horizontal no-transition">
              <CardBody className="pt-2 pb-2">
                <Button color="primary" size="sm" onClick={onChangeButton} className="listButton">
                  <i className={activeClass} aria-hidden="true"/> {activeTitle}
                </Button >
                
                <Calendar
	                selectable
	                popup
	                localizer={localizer}
	                events={calendarData}
	                startAccessor="start"
	                endAccessor="end"
	                style={{ height: 660 }}
	                //date={new Date()}
	                //view="month"
	                views={["month"]}
	                onSelectEvent={(event,e) => selectedEvent(event,e)}
	                //showAllEvents="true"
	                components={{dateCellWrapper:ColoredDateCellWrapper,toolbar:CustomToolbar}}
	                eventPropGetter={(event)=>{
		                if(event && event.vsl_type === '41') {
		                	return {className:"bg-warning",style:{fontSize:'1px'}}
		                } else {
		                	return {className:"bg-info",style:{fontSize:'1px'}}
		                }
	                }}
                />
              </CardBody>  
            </Card>
          </Col>
          </TabPane>
          <TabPane tabId="2">           
            <Col className="ml-auto mr-auto" xl="10" lg="10" md="10" sm="10">
              <Card className="card-raised card-form-horizontal no-transition">
                <CardBody className="pt-2 pb-2">
                
                  <div className="calendarButton">
	                  <Button color="primary" size="sm" onClick={onChangeButton} >
	                    <i className={activeClass} aria-hidden="true"/> {activeTitle}
	                  </Button >
                  </div>
                  <Col className="col-12">
                  <Row>
                    <Col xl="3" lg="6" md="12" className="col-12">
                      <FormGroup row className="mb-1">
                        <Col className="col-4"><Label className='searchInfo--title'>출항일</Label></Col>
                        <Col className="col-8">
                        <CustomDatePicker
                        id="startDate"
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        value={listDate}
                        onChange={(date)=>onDateSubmit(date)}
                        /></Col>
                      </FormGroup>
                    </Col>
                    <Col xl="4" lg="6" md="12" className="col-12">
                      <FormGroup row className="mb-1">
                      <Col className="col-4"><Label className='searchInfo--title' >조회기간</Label></Col>
                      <Col className="col-8">
                        <CustomSelect 
                        id="selectDate"
                        name="selectDate"
                        placeholder="조회 기간을 선택해주세요."
                        optionData={selectData}
                        value={publicDate}
                        onChange={(value)=>onWeekSubmit(value)} 
                        />
                        </Col>
                      </FormGroup>  
                    </Col>
                  </Row>
                </Col> 
                  <ScheduleList
                  listData={listData}
                  fadeIn={fadeIn}
                  curPage = {curnum}
                  totalPage = {totalPage}
                  nextPage = {onNextPage}
                  />
                </CardBody>
              </Card>
            </Col>
        </TabPane>
      </TabContent>
      <NoticeModal 
      open={openNotice}
      setOpen={()=>setOpenNotice(false)}
      data = {detailParam}
      {...props}
      />
    </div>
  </>
  );
}

export default ScheduleTables;


function ScheduleList (props) {
  const {listData,fadeIn,curPage,totalPage} = props;

  return (
    <>
      <Card className="card-raised card-form-horizontal no-transition bg-info  mb-3">
        <CardBody className="pt-2 pb-2">
          <Row className="pt-2 pb-2" >
            <Col className="col-4 text-center" md="3" >Vessel Name</Col>
            <Col className="col-3 text-center pl-0 pr-0" md="2" >Voyage No</Col>
            <Col className="col-5 text-center" md="2" >Origin</Col>
            <Col className="col-5 text-center" md="2" >destination</Col>
            <Col className="col-3 text-center pl-0 pr-0" md="1" >T/Time</Col>
            <Col className="col-4 text-center" md="2" >Booking</Col>
          </Row>
        </CardBody>
      </Card>
    {listData.length>0?listData.map((data,key) => (
      <Rows key={key} rowdata={data} />
    )):<div className="text-center"> 조회된 (스케쥴) 정보가 없습니다. </div>}
    {listData.length > 0 && totalPage > 1 && curPage!==totalPage?
    <div className="text-center">
    <Button
      className="btn-round"
      color="info"
      type="button"
      onClick={props.nextPage}
      >
      <i className="fa fa-angle-double-down fa-2x mr-2" aria-hidden="true"/>다음페이지({curPage}/{totalPage}) 이동 시 Scroll Down 또는 클릭 해주세요.
    </Button>
    </div>:<></>}
  </>
  );
}

function Rows(props) {
  const {rowdata} = props;
  const [open,setOpen] = React.useState(false);
  
  return (
    <>
      <Card className="card-raised card-form-horizontal no-transition bg-light mb-3">
        <CardBody className="pt-2 pb-2">
          <Row className="text-center">
            <Col className="col-4 mt-auto mb-auto text-center" md="3">{rowdata.vsl_name}</Col>
            <Col className="col-3 mt-auto mb-auto text-center" md="2" onClick={()=>setOpen(!open)} >
            	<Button className="btn-link" color="primary" type="button" size="sm">{rowdata.voyage_no}</Button></Col>
            <Col className="col-5 mt-auto mb-auto text-center" md="2" >{rowdata.start_port_name}<br/> ({rowdata.start_day}{" "}{rowdata.start_hour?rowdata.start_hour:null})</Col>
            <Col className="col-5 mt-auto mb-auto text-center" md="2" >{rowdata.end_port_name}<br/> ({rowdata.end_day}{" "}{rowdata.end_hour?rowdata.end_hour:null})</Col>
            <Col className="col-3 mt-auto mb-auto text-center pl-0 pr-0" md="1" >{rowdata.tt}</Col>
            <Col className="col-4 mt-auto mb-auto text-center" md="2" >{rowdata && 'Y' === rowdata.booking_yn ?
              <Link to={{pathname: `/booking`, state: {user_no:props.user_no,sch_vessel_name:rowdata?rowdata.vsl_name:null,
                                              sch_vessel_voyage:rowdata?rowdata.voyage_no:null
                                              ,sch_pol:rowdata?rowdata.start_port:null,
                                              sch_pod:rowdata?rowdata.end_port:null,schedule_yn:'Y',line_code:'WDFC',
                                              sch_etd:rowdata?rowdata.sch_etd:null, sch_eta:rowdata?rowdata.sch_eta:null,
                                              vsl_type:rowdata?rowdata.vsl_type:null, sch_call_sign:rowdata?rowdata.sch_call_sign:null,  }}}>
              <Button
                className="btn-link"
                color="primary"
                type="button"
                  size="sm"
              >  Booking
              </Button>
              </Link>:<></>}
            </Col>
          </Row>
          <Collapse isOpen={open}> 
            <Col className="ml-auto mr-auto bg-white" xs="12" md="12" sm="12">
              <Row>
                <Col xs="2" md="2" sm="2"> <img src={require("assets/img/carrier/WDF.gif")}/>
                </Col>
                <Col xs="10" md="10" sm="10">
                - Close Cargo : {rowdata?rowdata.cargo_closing_date:null}<br/>
                - Close Document :{rowdata?rowdata.doc_closing_date:null}<br/>
                - MRN : {rowdata?rowdata.mrn:null}<br/>
                </Col>
              </Row>     
            </Col>
          </Collapse>
      </CardBody>
    </Card>
    </>
  );

}
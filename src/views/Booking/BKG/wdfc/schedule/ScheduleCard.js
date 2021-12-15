import React,{ useState, useEffect } from "react";
//import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
//import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Collapse, IconButton,  Divider, Avatar, CardHeader} from "@material-ui/core";
import {Schedule, UnfoldLess, UnfoldMore} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import moment from 'moment';
import ScheduleCardBody from './ScheduleCardBody';
import ScheduleBookmark from './ScheduleBookmark';
import SchedulePop from './SchedulePop';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {observer} from 'mobx-react-lite';

const ScheduleCard = observer(({bookingStore, inPortCodeList, outPortCodeList, lineVesselList, ...props}) => {
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openSchedule, setOpenSchedule] = useState(true);
  const [scheduleBookmarkList, setScheduleBookmarkList] = useState([]);

  let history = useHistory();

  const { booking } = bookingStore.booking;
  // useEffect(()=>{
    
  //   if( booking) {
  //     // 부킹번호가 바뀌면 새로운 부킹정보로 세팅
  //     setBooking(props.booking);
  //   } else if ( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
  //     // 전체북마크를 수정한 경우 관련된 정보로 세팅해준다.
  //     // let obj = Object.assign(booking, props.booking);
  //     setBooking({...booking, ...props.booking});
  //   }
  // },[props.booking]);
  useEffect(()=>{
    setOpenSchedule(props.openSchedule);
  },[props.openSchedule])
  useEffect(()=>{
    setScheduleBookmarkList(props.scheduleBookmarkList);
  },[props.scheduleBookmarkList]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'schedule_bookmark_seq' === code) {
  
        axios.post("/shipper/getWdSchCal",{ 
          sch_vessel_name:option.sch_vessel_name,
          startport:option.sch_pol,
          endport:option.sch_pod,
          eta:moment(new Date()).format('YYYYMMDD'),week:'3 week',
          line_code:'WDFC',
          limit_yn:'Y'
        }).then(res => {
            if(res.data && res.data.length > 0) {
                // select로 새로운 document를 세팅한다
                // 기존 Booking 정보
                let sch = res.data[0];
                bookingStore.setBooking({
                  ...bookingStore.booking,
                  'schedule_bookmark_seq': option?option.schedule_bookmark_seq:null,
                  'schedule_bookmark_name': option?option.schedule_bookmark_name:null,
                  'sch_vessel_name': sch?sch.sch_vessel_name:null,
                  'sch_vessel_code': sch?sch.sch_vessel_code:null,
                  'sch_vessel_voyage': sch?sch.sch_vessel_voyage:null,
                  'sch_call_sign': sch?sch.sch_call_sign:null,
                  'sch_pol': sch?sch.sch_pol:null,
                  'sch_pol_name': sch?sch.sch_pol_name:null,
                  'sch_pod': sch?sch.sch_pod:null,
                  'sch_pod_name': sch?sch.sch_pod_name:null,
                  'sch_por': sch?sch.sch_por:null,
                  'sch_por_name': sch?sch.sch_por_name:null,
                  'sch_pld': sch?sch.sch_pld:null,
                  'sch_pld_name': sch?sch.sch_pld_name:null,
                  'sch_etd': sch?sch.sch_etd:null,
                  'sch_eta': sch?sch.sch_eta:null,
                  'sch_fdp': sch?sch.sch_fdp:null,
                  'sch_fdp_name': sch?sch.sch_fdp_name:null,
                  'vsl_type': sch?sch.vsl_type:null,
                });
            } else {
  
              bookingStore.setBooking({
                ...bookingStore.booking,
                'schedule_bookmark_seq': option?option.schedule_bookmark_seq:null,
                'schedule_bookmark_name': option?option.schedule_bookmark_name:null,
                'sch_vessel_name': option.sch_vessel_name?option.sch_vessel_name:bookingStore.booking.sch_vessel_name,
                'sch_vessel_code': option.sch_vessel_code?option.sch_vessel_code:bookingStore.booking.sch_vessel_code,
                'sch_vessel_voyage': option.sch_vessel_voyage?option.sch_vessel_voyage:bookingStore.booking.sch_vessel_voyage,
                'sch_call_sign': option.sch_call_sign?option.sch_call_sign:bookingStore.booking.sch_call_sign,
                'sch_pol': option.sch_pol?option.sch_pol:bookingStore.booking.sch_pol,
                'sch_pol_name': option.sch_pol?option.sch_pol_name:bookingStore.booking.sch_pol_name,
                'sch_pod': option.sch_pod?option.sch_pod:bookingStore.booking.sch_pod,
                'sch_pod_name': option.sch_pod?option.sch_pod_name:bookingStore.booking.sch_pod_name,
                'sch_por': option.sch_por?option.sch_por:bookingStore.booking.sch_por,
                'sch_por_name': option.sch_por?option.sch_por_name:bookingStore.booking.sch_por_name,
                'sch_pld': option.sch_pld?option.sch_pld:bookingStore.booking.sch_pld,
                'sch_pld_name': option.sch_pld?option.sch_pld_name:bookingStore.booking.sch_pld_name,
                'sch_etd': option.sch_etd?option.sch_etd:bookingStore.booking.sch_etd,
                'sch_eta': option.sch_eta?option.sch_eta:bookingStore.booking.sch_eta,
                'sch_fdp': option.sch_fdp?option.sch_fdp:bookingStore.booking.sch_fdp,
                'sch_fdp_name': option.sch_fdp?option.sch_fdp_name:bookingStore.booking.sch_fdp_name,
                'vsl_type': option.vsl_type?option.vsl_type:bookingStore.booking.vsl_type,
              });
            }
        });
      }
    } else {
      if( bookingStore.booking.schedule_bookmark_seq ) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          'schedule_bookmark_seq': null,
          'schedule_bookmark_name': null,
          'sch_vessel_name': null,
          'sch_vessel_code': null,
          'sch_vessel_voyage': null,
          'sch_call_sign': null,
          'sch_pol': null,
          'sch_pol_name': null,
          'sch_pod': null,
          'sch_pod_name': null,
          'sch_por': null,
          'sch_por_name': null,
          'sch_pld': null,
          'sch_pld_name': null,
          'sch_etd': null,
          'sch_eta': null,
          'sch_fdp': null,
          'sch_fdp_name': null,
          'vsl_type': null,
        });
      }
    }
  }


  const fncSetOpenSchedule=()=>{
    setOpenSchedule(!openSchedule);
    props.fncSetOpenSchedule(!openSchedule);
  }

  const schmerge =(data)=> {
    if( data ) {
      fncSelectLineCodeById(data)
      // console.log("POP : ", data)
      // if( 'WDFC' === data.sch_line_code) {


      //   props.alert(()=>{
      //     history.push({
      //       pathname: `/svc/bookingWdfc`,
      //       state:{
      //         sch_vessel_name: data?data.vsl_name:null,
      //         sch_vessel_voyage: data?data.voyage_no:null,
      //         sch_pol: data?data.sch_pol:null,
      //         sch_pod: data?data.sch_pod:null,
      //         schedule_yn: 'Y',
      //         line_code: data?data.line_code:null,
      //         sch_etd: data?data.sch_etd:null,
      //         sch_eta: data?data.sch_eta:null,
      //         vsl_type: null,
      //         sch_call_sign: null,  	
      //       }
      //     });
      //   }
      //   , "위동 스케줄 선택 하셨습니다.",'warning',true,true,'lg',"위동 부킹 화면으로 이동하시겠습니까?",true,true,
      //   null
      //   );

      // } else {
      //   fncSelectLineCodeById(data)
        
      // }
    }
  }


  const fncSelectLineCodeById =(data)=> {
    // console.log(bookingStore.booking)
    axios.post(
      "/com/selectLineCodeById"
      ,{
          line_code: data.line_code
       }
    ).then(
        res => {
          if( res.data[0] ) {
            bookingStore.setBooking({
              ...bookingStore.booking,
              'line_name1' : res.data[0].line_name1,
              'line_name2' : res.data[0].line_name2,
              'line_user_email' : res.data[0].user_email,
              'line_user_fax' : res.data[0].user_fax,
              'line_user_name' : res.data[0].user_name,
              'line_user_tel' : res.data[0].user_tel,
              'line_user_dept' : res.data[0].user_dept,
              'line_address1' : res.data[0].line_address1,
              'line_address2' : res.data[0].line_address2,
              'line_address3' : res.data[0].line_address3,
              'line_address4' : null,
              'line_address5' : null,
              'line_code' : data.line_code,
              'sch_call_sign' : data.sch_call_sign,
              'sch_eta' : data.sch_eta,
              'sch_etd' : data.sch_etd,
              'sch_line_code' : data.sch_line_code,
              'sch_pod' : data.sch_pod,
              'sch_pod_name' : data.sch_pod_name,
              'sch_pol' : data.sch_pol,
              'sch_pol_name' : data.sch_pol_name,
              'sch_vessel_code' : data.sch_vessel_code,
              'sch_vessel_name' : data.sch_vessel_name,
              'sch_vessel_voyage' : data.sch_vessel_voyage,
              'start_port' : data.start_port,
              'end_port' : data.end_port,
              'sch_pld' : null,
              'sch_pld_name': null,
              'sch_por': null,
              'sch_por_name': null,
              'sch_fdp': null,
              'sch_fdp_name': null,
            });
          } else {
            bookingStore.setBooking({...bookingStore.booking, ...data});
            // props.fncOnBlurParent({...booking, ...data});
          }
        }
    );
  }

  const fncOnBlurParent =(bookingParams)=> {
    bookingStore.setBooking({
      ...bookingStore.booking,
      schedule_bookmark_name: bookingParams.schedule_bookmark_name,
      sch_vessel_name: bookingParams.sch_vessel_name,
      sch_vessel_code: bookingParams.sch_vessel_code,
      sch_vessel_voyage: bookingParams.sch_vessel_voyage,
      sch_call_sign: bookingParams.sch_call_sign,
      sch_pol: bookingParams.sch_pol,
      sch_pol_name: bookingParams.sch_pol_name,
      sch_pod: bookingParams.sch_pod,
      sch_pod_name: bookingParams.sch_pod_name,
      sch_por: bookingParams.sch_por,
      sch_por_name: bookingParams.sch_por_name,
      sch_pld: bookingParams.sch_pld,
      sch_pld_name: bookingParams.sch_pld_name,
      sch_etd: bookingParams.sch_etd,
      sch_eta: bookingParams.sch_eta,
      sch_fdp: bookingParams.sch_fdp,
      sch_fdp_name: bookingParams.sch_fdp_name,
      vsl_type: bookingParams.vsl_type
    });
  }

  return (
    <Card className={classes.paper} id="schedule">
      
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Schedule fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenSchedule()}>
            {openSchedule? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={5} sm={5}>Schedule
                  <ScheduleBookmark
                    scheduleBookmarkList={scheduleBookmarkList}
                    inPortCodeList={inPortCodeList}
                    outPortCodeList={outPortCodeList}
                    selectBookingScheduleBookmark={props.selectBookingScheduleBookmark}
                    lineVesselList={lineVesselList}
                    {...props}
                  />
                  <SchedulePop
                    schmerge={schmerge}
                    isOpen={bookingStore.isBookingNo}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={6} sm={6}>
                <Autocomplete
                  options = {scheduleBookmarkList}
                  getOptionLabel = { option => option.schedule_bookmark_name?option.schedule_bookmark_name:'' }
                  getOptionSelected={(option, value) => option.schedule_bookmark_name?option.schedule_bookmark_name:'' === value.schedule_bookmark_name?value.schedule_bookmark_name:''}
                  value={{schedule_bookmark_name:
                    scheduleBookmarkList.find(v=>v.schedule_bookmark_seq === bookingStore.booking.schedule_bookmark_seq)
                    ?scheduleBookmarkList.find(v=>v.schedule_bookmark_seq === bookingStore.booking.schedule_bookmark_seq).schedule_bookmark_name:''
                  }}
                  id="Bookmark"
                  noOptionsText="Bookmark 등록하세요."
                  onChange={(e, option)=>fncSelectCodeBookmark(option, 'schedule_bookmark_seq')}
                  renderInput={
                    params =>(<TextField inputProps={{maxLength:30}} {...params} label="Schedule Bookmark" fullWidth />)}
                />
              </GridItem>
          </GridContainer>
          </Typography>
        }
        // subheader="추가합니다"
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openSchedule}>
          <Divider className={classes.divider}/>
          <ScheduleCardBody
            booking={bookingStore.booking}
            // bookingStore={bookingStore}
            // isOpen={bookingStore.isBookingNo}
            bookmarkYn={'N'}
            fncOnBlurParent={fncOnBlurParent}
            inPortCodeList={inPortCodeList}
            outPortCodeList={outPortCodeList}
            lineVesselList={lineVesselList}
          />
        </Collapse>
      </CardBody>
    </Card>
  );
})


// 전달되는 nextProps가 prevProps 와 같으면 true 다르면 false 반환
// function areEqual(prevProps, nextProps) {
//   console.log(nextProps.bookingStore.booking.bkg_no)
//   if (
//     prevProps.openSchedule === nextProps.openSchedule
//     && prevProps.bookingStore.booking.bkg_no === nextProps.bookingStore.booking.bkg_no
//     && prevProps.bookingStore.booking.bkg_date === nextProps.bookingStore.booking.bkg_date
//     && prevProps.bookingStore.booking.user_no === nextProps.bookingStore.booking.user_no
//     && prevProps.bookingStore.booking.schedule_bookmark_name === nextProps.bookingStore.booking.schedule_bookmark_name
//     && prevProps.bookingStore.booking.sch_vessel_name === nextProps.bookingStore.booking.sch_vessel_name
//     && prevProps.bookingStore.booking.sch_vessel_code === nextProps.bookingStore.booking.sch_vessel_code
//     && prevProps.bookingStore.booking.sch_vessel_voyage === nextProps.bookingStore.booking.sch_vessel_voyage
//     && prevProps.bookingStore.booking.sch_call_sign === nextProps.bookingStore.booking.sch_call_sign
//     && prevProps.bookingStore.booking.sch_pol === nextProps.bookingStore.booking.sch_pol
//     && prevProps.bookingStore.booking.sch_pol_name === nextProps.bookingStore.booking.sch_pol_name
//     && prevProps.bookingStore.booking.sch_pod === nextProps.bookingStore.booking.sch_pod
//     && prevProps.bookingStore.booking.sch_pod_name === nextProps.bookingStore.booking.sch_pod_name
//     && prevProps.bookingStore.booking.sch_por === nextProps.bookingStore.booking.sch_por
//     && prevProps.bookingStore.booking.sch_por_name === nextProps.bookingStore.booking.sch_por_name
//     && prevProps.bookingStore.booking.sch_pld === nextProps.bookingStore.booking.sch_pld
//     && prevProps.bookingStore.booking.sch_pld_name === nextProps.bookingStore.booking.sch_pld_name
//     && prevProps.bookingStore.booking.sch_etd === nextProps.bookingStore.booking.sch_etd
//     && prevProps.bookingStore.booking.sch_eta === nextProps.bookingStore.booking.sch_eta
//     && prevProps.bookingStore.booking.sch_fdp === nextProps.bookingStore.booking.sch_fdp
//     && prevProps.bookingStore.booking.sch_fdp_name === nextProps.bookingStore.booking.sch_fdp_name
//     && prevProps.bookingStore.booking.vsl_type === nextProps.bookingStore.booking.vsl_type
//     && prevProps.scheduleBookmarkList === nextProps.scheduleBookmarkList
//     && prevProps.portCodeList === nextProps.portCodeList
//     // bookmark
//     && prevProps.bookingStore.booking.bookmark_seq === nextProps.bookingStore.booking.bookmark_seq
//     && prevProps.bookingStore.booking.other_bookmark_seq === nextProps.bookingStore.booking.other_bookmark_seq
//     && prevProps.bookingStore.booking.cargo_bookmark_seq === nextProps.bookingStore.booking.cargo_bookmark_seq
//     && prevProps.bookingStore.booking.line_bookmark_seq === nextProps.bookingStore.booking.line_bookmark_seq
//     && prevProps.bookingStore.booking.consignee_bookmark_seq === nextProps.bookingStore.booking.consignee_bookmark_seq
//     && prevProps.bookingStore.booking.container_bookmark_seq === nextProps.bookingStore.booking.container_bookmark_seq
//     && prevProps.bookingStore.booking.document_bookmark_seq === nextProps.bookingStore.booking.document_bookmark_seq
//     && prevProps.bookingStore.booking.forwarder_bookmark_seq === nextProps.bookingStore.booking.forwarder_bookmark_seq
//     && prevProps.bookingStore.booking.schedule_bookmark_seq === nextProps.bookingStore.booking.schedule_bookmark_seq
//     && prevProps.bookingStore.booking.shipper_bookmark_seq === nextProps.bookingStore.booking.shipper_bookmark_seq
//     && prevProps.bookingStore.booking.transport_bookmark_seq === nextProps.bookingStore.booking.transport_bookmark_seq
//   ) {
//     return true;
//   }
//   return false;
// }


export default ScheduleCard;
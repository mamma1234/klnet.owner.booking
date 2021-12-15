import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Collapse, IconButton, Divider, Avatar, CardHeader} from "@material-ui/core";import {GolfCourse, UnfoldLess, UnfoldMore} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import BookingCardBody from './BookingCardBody';
import BookingBookmark from './BookingBookmark';
import {observer} from 'mobx-react-lite';

const BookingCard = (observer(({bookingStore, ...props}) => {
  // {console.log("BookingCard Reload")}
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openBooking, setOpenBooking] = useState(true);
  // other(Booking) Bookmark
  const [otherBookmarkList, setOtherBookmarkList] = useState([]);
  const [incotermsLineCodeList, setIncotermsLineCodeList] = useState([]);
  const [serviceLineCodeList, setServiceLineCodeList] = useState([]);

  const [openBookmark, setOpenBookmark] = useState(false);

  // useEffect(()=>{
  //   // if( booking.bkg_no != props.booking.bkg_no ) {
  //   if( booking ) {
  //     // 부킹번호가 바뀌면 새로운 부킹정보로 세팅
  //     setBooking(props.booking);
  //   } else if( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
  //     // 전체북마크를 수정한 경우 관련된 정보로 세팅해준다.
  //     // let obj = Object.assign(booking, props.booking);
  //     setBooking({...booking, ...props.booking});
  //   }
  // },[props.booking]);

  useEffect(()=>{
    setServiceLineCodeList(props.serviceLineCodeList);
  },[props.serviceLineCodeList]);

  useEffect(()=>{
    setOtherBookmarkList(props.otherBookmarkList);
  },[props.otherBookmarkList]);

  useEffect(()=>{
    setIncotermsLineCodeList(props.incotermsLineCodeList);
  },[props.incotermsLineCodeList]);

  useEffect(()=>{
    setOpenBooking(props.openBooking);
  },[props.openBooking])

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'other_bookmark_seq' === code) {
          bookingStore.setBooking({
            ...bookingStore.booking,
            'other_bookmark_seq': option?option.other_bookmark_seq:null,
            'other_bookmark_name': option?option.other_bookmark_name:null,
            'sc_no': option.sc_no?option.sc_no:bookingStore.booking.sc_no,
            'remark1': option.remark1?option.remark1:bookingStore.booking.remark1,
            'remark2': option.remark1?option.remark2:bookingStore.booking.remark2,
            'shp_payment_type': option.shp_payment_type?option.shp_payment_type:bookingStore.booking.shp_payment_type,
            'trans_service_code': option.trans_service_code?option.trans_service_code:bookingStore.booking.trans_service_code
          });
      }
    } else {
      if( bookingStore.booking.other_bookmark_seq ) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          'other_bookmark_seq': null,
          'sc_no': null,
          'remark1': null,
          'remark2': null,
          'shp_payment_type': null,
          'trans_service_code': null
        });
      }
    }
  }

  const fncSetOpenBooking=()=>{
    setOpenBooking(!openBooking);
    props.fncSetOpenBooking(!openBooking);
  }

  const fncOnBlurParentBody =(bookingParams)=>{
    bookingStore.setBooking({
      ...bookingStore.booking,
      'other_bookmark_seq': bookingParams?bookingParams.other_bookmark_seq:null,
      'other_bookmark_name': bookingParams?bookingParams.other_bookmark_name:null,
      'sc_no': bookingParams?bookingParams.sc_no:null,
      'remark1': bookingParams?bookingParams.remark1:null,
      'remark2': bookingParams?bookingParams.remark2:null,
      'shp_payment_type': bookingParams?bookingParams.shp_payment_type:null,
      'trans_service_code': bookingParams?bookingParams.trans_service_code:null
    });
  }
  return (
    <Card className={classes.paper} id="booking">
      
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <GolfCourse fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenBooking()}>
            {openBooking? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Booking
                <BookingBookmark
                  booking={bookingStore.booking}
                  otherBookmarkList={otherBookmarkList}
                  serviceLineCodeList={serviceLineCodeList}
                  incotermsLineCodeList={incotermsLineCodeList}
                  // fncOnBlurParent={fncOnBlurParentBody}
                  selectBookingOtherBookmark={props.selectBookingOtherBookmark}
                  {...props}
                />
              </GridItem>
              <GridItem xs={8} sm={7}>
                <Autocomplete
                  options = {otherBookmarkList}
                  getOptionLabel = { option => option.other_bookmark_name?option.other_bookmark_name||'':'' }
                  getOptionSelected={(option, value) => option.other_bookmark_name?option.other_bookmark_name:'' === value.other_bookmark_name?value.other_bookmark_name:''}
                  value={{other_bookmark_name:
                    otherBookmarkList.find(v=>v.other_bookmark_seq === bookingStore.booking.other_bookmark_seq)
                    ?otherBookmarkList.find(v=>v.other_bookmark_seq === bookingStore.booking.other_bookmark_seq).other_bookmark_name:''
                  }}
                  id="other_bookmark_seq"
                  noOptionsText="Bookmark 등록하세요."
                  onChange={(e, option)=>fncSelectCodeBookmark(option, 'other_bookmark_seq')}
                  renderInput={
                    params =>(<TextField inputProps={{maxLength:30}} {...params} label="Booking Bookmark" fullWidth />)
                  }
                />
              </GridItem>
            </GridContainer>
          </Typography>
        }
        // subheader="추가합니다"
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openBooking}>
          <Divider className={classes.divider}/>
          <BookingCardBody
            booking={bookingStore.booking}
            serviceLineCodeList={serviceLineCodeList}
            incotermsLineCodeList={incotermsLineCodeList}
            fncOnBlurParent={fncOnBlurParentBody}
            openBooking={openBooking}
            fncSetOpenBooking={fncSetOpenBooking}
            bookmarkYn={'N'}
          />
        </Collapse>
      </CardBody>
    </Card>
  );
}));

function areEqual (prevProps, nextProps) {
  return ( 
    prevProps.openBooking === nextProps.openBooking
    && prevProps.bookingStore.booking.bkg_no === nextProps.bookingStore.booking.bkg_no
    && prevProps.bookingStore.booking.bkg_date === nextProps.bookingStore.booking.bkg_date
    && prevProps.bookingStore.booking.user_no === nextProps.bookingStore.booking.user_no
    && prevProps.bookingStore.booking.sc_no === nextProps.bookingStore.booking.sc_no
    && prevProps.bookingStore.booking.remark1 === nextProps.bookingStore.booking.remark1
    && prevProps.bookingStore.booking.remark2 === nextProps.bookingStore.booking.remark2
    && prevProps.bookingStore.booking.shp_payment_type === nextProps.bookingStore.booking.shp_payment_type
    && prevProps.bookingStore.booking.trans_service_code === nextProps.bookingStore.booking.trans_service_code
    && prevProps.serviceLineCodeList === nextProps.serviceLineCodeList
    && prevProps.otherBookmarkList === nextProps.otherBookmarkList
    // bookmark
    && prevProps.bookingStore.booking.bookmark_seq === nextProps.bookingStore.booking.bookmark_seq
    && prevProps.bookingStore.booking.other_bookmark_seq === nextProps.bookingStore.booking.other_bookmark_seq
    && prevProps.bookingStore.booking.cargo_bookmark_seq === nextProps.bookingStore.booking.cargo_bookmark_seq
    && prevProps.bookingStore.booking.line_bookmark_seq === nextProps.bookingStore.booking.line_bookmark_seq
    && prevProps.bookingStore.booking.consignee_bookmark_seq === nextProps.bookingStore.booking.consignee_bookmark_seq
    && prevProps.bookingStore.booking.container_bookmark_seq === nextProps.bookingStore.booking.container_bookmark_seq
    && prevProps.bookingStore.booking.document_bookmark_seq === nextProps.bookingStore.booking.document_bookmark_seq
    && prevProps.bookingStore.booking.forwarder_bookmark_seq === nextProps.bookingStore.booking.forwarder_bookmark_seq
    && prevProps.bookingStore.booking.schedule_bookmark_seq === nextProps.bookingStore.booking.schedule_bookmark_seq
    && prevProps.bookingStore.booking.shipper_bookmark_seq === nextProps.bookingStore.booking.shipper_bookmark_seq
    && prevProps.bookingStore.booking.transport_bookmark_seq === nextProps.bookingStore.booking.transport_bookmark_seq
  )
}

export default React.memo(BookingCard,areEqual);
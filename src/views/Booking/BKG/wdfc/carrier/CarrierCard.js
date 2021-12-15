import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Collapse, IconButton, Divider, Avatar, CardHeader} from "@material-ui/core";
import {UnfoldMore,Map, UnfoldLess} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import CarrierCardBody from './CarrierCardBody';
import CarrierBookmark from './CarrierBookmark';
import {observer} from 'mobx-react-lite'

const CarrierCard = observer(({bookingStore, ...props}) => {
  // console.log("CARRIER Render")
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openLine, setOpenLine] = useState(false);
  const [lineBookmarkList, setLineBookmarkList] = useState([])


  // useEffect(()=>{
  //   // if( booking.bkg_no != props.booking.bkg_no ) {
  //   if( booking ) {
  //     // 부킹번호가 바뀌면 새로운 부킹정보로 세팅
  //     setBooking(props.booking);
  //   } 
  //   if ( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
  //     // 전체북마크를 수정한 경우 관련된 정보로 세팅해준다.
  //     let obj = Object.assign(booking, props.booking);
  //     setBooking({...booking, ...props.booking});
  //   }
  // },[props.booking]);

  useEffect(()=>{
    setOpenLine(props.openLine);
  },[props.openLine]);

  useEffect(()=>{
    setLineBookmarkList(props.lineBookmarkList);
  },[props.lineBookmarkList]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( 'line_bookmark_seq' === code) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          'line_bookmark_seq':option?option.line_bookmark_seq:null,
          'line_bookmark_name':option?option.line_bookmark_name:null,
          'line_name1':option?option.line_name1:null,
          'line_name2':option?option.line_name2:null,
          'line_code':option?option.line_code:null,
          'line_user_email':option?option.line_user_email:null,
          'line_user_fax':option?option.line_user_fax:null,
          'line_user_name':option?option.line_user_name:null,
          'line_user_tel':option?option.line_user_tel:null,
          'line_user_dept':option?option.line_user_dept:null,
          'line_address1':option?option.line_address1:null,
          'line_address2':option?option.line_address2:null,
          'line_address3':option?option.line_address3:null,
          'line_address4':option?option.line_address4:null,
          'line_address5':option?option.line_address5:null,
          'selected_yn':'Y'
        });
        // props.fncOnBlurParent({
        //   'line_bookmark_seq':option?option.line_bookmark_seq:null,
        //   'line_bookmark_name':option?option.line_bookmark_name:null,
        //   'line_name1':option?option.line_name1:null,
        //   'line_name2':option?option.line_name2:null,
        //   'line_code':option?option.line_code:null,
        //   'line_user_email':option?option.line_user_email:null,
        //   'line_user_fax':option?option.line_user_fax:null,
        //   'line_user_name':option?option.line_user_name:null,
        //   'line_user_tel':option?option.line_user_tel:null,
        //   'line_user_dept':option?option.line_user_dept:null,
        //   'line_address1':option?option.line_address1:null,
        //   'line_address2':option?option.line_address2:null,
        //   'line_address3':option?option.line_address3:null,
        //   'line_address4':option?option.line_address4:null,
        //   'line_address5':option?option.line_address5:null,
        //   'selected_yn':'Y'
        // });
    }
  }


  const fncSetOpenLine=()=>{
    setOpenLine(!openLine);
    props.fncSetOpenLine(!openLine);
  }

  const fncOnBlurParentBody =(bookingParams)=> {
    bookingStore.setBooking({
      ...bookingStore.booking,
      'line_bookmark_seq':bookingParams?bookingParams.line_bookmark_seq:null,
      'line_bookmark_name':bookingParams?bookingParams.line_bookmark_name:null,
      'line_name1':bookingParams?bookingParams.line_name1:null,
      'line_name2':bookingParams?bookingParams.line_name2:null,
      'line_code':bookingParams?bookingParams.line_code:null,
      'line_user_email':bookingParams?bookingParams.line_user_email:null,
      'line_user_fax':bookingParams?bookingParams.line_user_fax:null,
      'line_user_name':bookingParams?bookingParams.line_user_name:null,
      'line_user_tel':bookingParams?bookingParams.line_user_tel:null,
      'line_user_dept':bookingParams?bookingParams.line_user_dept:null,
      'line_address1':bookingParams?bookingParams.line_address1:null,
      'line_address2':bookingParams?bookingParams.line_address2:null,
      'line_address3':bookingParams?bookingParams.line_address3:null,
      'line_address4':bookingParams?bookingParams.line_address4:null,
      'line_address5':bookingParams?bookingParams.line_address5:null,
    });
  }

  return (
    <Card className={classes.paper} id="carrier">
      {/* {console.log("CarrierCard Realod")} */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Map fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenLine()}>
            {openLine? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={4} sm={4}>Carrier
                  <CarrierBookmark
                    lineBookmarkList={lineBookmarkList}
                    bookmarkYn={'Y'}
                    selectBookingLineBookmark={props.selectBookingLineBookmark}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={8} sm={7}>
                <Autocomplete
                    options = {lineBookmarkList}
                    getOptionLabel = { option => option.line_bookmark_name?option.line_bookmark_name:'' }
                    getOptionSelected={(option, value) => option.line_bookmark_name?option.line_bookmark_name:'' === value.line_bookmark_name?value.line_bookmark_name:''}
                    value={{line_bookmark_name:
                      lineBookmarkList.find(v=>v.line_bookmark_seq === bookingStore.booking.line_bookmark_seq)
                      ?lineBookmarkList.find(v=>v.line_bookmark_seq === bookingStore.booking.line_bookmark_seq).line_bookmark_name:''
                    }}
                    noOptionsText="Bookmark 등록하세요."
                    id="line_bookmark_seq"
                    onChange={(e, option)=>fncSelectCodeBookmark(option, 'line_bookmark_seq')}
                    renderInput={
                      params =>(<TextField inputProps={{maxLength:30}} {...params} label="Carrier Bookmark" fullWidth />)}
                  />
              </GridItem>
            </GridContainer>
          </Typography>
        }
        // subheader="추가합니다"
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openLine}>
          <Divider className={classes.divider}/>
          <CarrierCardBody
            booking={bookingStore.booking}
            fncOnBlurParent={fncOnBlurParentBody}
            bookmarkYn={'N'}
            {...props}
          />
        </Collapse>
      </CardBody>
    </Card>
  );
});

function areEqual(prevProps, nextProps) {
  
  return (
    prevProps.bookingStore.booking.line_bookmark_name === nextProps.bookingStore.booking.line_bookmark_name
    && prevProps.bookingStore.booking.bkg_no === nextProps.bookingStore.booking.bkg_no
    && prevProps.bookingStore.booking.bkg_date === nextProps.bookingStore.booking.bkg_date
    && prevProps.bookingStore.booking.user_no === nextProps.bookingStore.booking.user_no
    && prevProps.bookingStore.booking.line_name1 === nextProps.bookingStore.booking.line_name1
    && prevProps.bookingStore.booking.line_name2 === nextProps.bookingStore.booking.line_name2
    && prevProps.bookingStore.booking.line_code === nextProps.bookingStore.booking.line_code
    && prevProps.bookingStore.booking.line_user_email === nextProps.bookingStore.booking.line_user_email
    && prevProps.bookingStore.booking.line_user_fax === nextProps.bookingStore.booking.line_user_fax
    && prevProps.bookingStore.booking.line_user_name === nextProps.bookingStore.booking.line_user_name
    && prevProps.bookingStore.booking.line_user_tel === nextProps.bookingStore.booking.line_user_tel
    && prevProps.bookingStore.booking.line_user_dept === nextProps.bookingStore.booking.line_user_dept
    && prevProps.bookingStore.booking.line_address1 === nextProps.bookingStore.booking.line_address1
    && prevProps.bookingStore.booking.line_address2 === nextProps.bookingStore.booking.line_address2
    && prevProps.bookingStore.booking.line_address3 === nextProps.bookingStore.booking.line_address3
    && prevProps.bookingStore.booking.line_address4 === nextProps.bookingStore.booking.line_address4
    && prevProps.bookingStore.booking.line_address5 === nextProps.bookingStore.booking.line_address5
    && prevProps.bookingStore.booking.selected_yn === nextProps.bookingStore.booking.selected_yn
    && prevProps.lineBookmarkList === nextProps.lineBookmarkList
    && prevProps.lineWorkOriginatorList === nextProps.lineWorkOriginatorList
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

export default React.memo(CarrierCard, areEqual);
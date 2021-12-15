import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Collapse, IconButton, Divider, Avatar, CardHeader} from "@material-ui/core";
import {UnfoldMore,HowToVote, UnfoldLess} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import ConsigneeCardBody from './ConsigneeCardBody';
import ConsigneeBookmark from './ConsigneeBookmark';
import {observer} from 'mobx-react-lite';

const ConsigneeCard = observer(({bookingStore, ...props}) => {
  // console.log("Consignee Card Render")
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openConsignee, setOpenConsignee] = useState(true);
  const [consigneeBookmarkList, setConsigneeBookmarkList] = useState([])


  // useEffect(()=>{
  //   if( booking ) {
  //     // 부킹번호가 바뀌면 새로운 부킹정보로 세팅
  //     setBooking(props.booking);
  //   } else if ( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
  //     // 전체북마크를 수정한 경우 관련된 정보로 세팅해준다.
  //     // let obj = Object.assign(booking, props.booking);
  //     setBooking({...booking, ...props.booking});
  //   }
  // },[props.booking]);

  useEffect(()=>{
    setConsigneeBookmarkList(props.consigneeBookmarkList);
  },[props.consigneeBookmarkList]);

  useEffect(()=>{
    setOpenConsignee(props.openConsignee);
  },[props.openConsignee]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'consignee_bookmark_seq' === code) {
  
        bookingStore.setBooking({
          ...bookingStore.booking,
          ['consignee_bookmark_seq']: option?option.consignee_bookmark_seq:null,
          ['consignee_bookmark_name']: option?option.consignee_bookmark_name:null,
          ['cons_name1']: option.cons_name1?option.cons_name1:bookingStore.booking.cons_name1,
          ['cons_name2']: option.cons_name1?option.cons_name2:bookingStore.booking.cons_name2,
          ['cons_code']: option.cons_code?option.cons_code:bookingStore.booking.cons_code,
          ['cons_user_email']: option.cons_user_email?option.cons_user_email:bookingStore.booking.cons_user_email,
          ['cons_user_fax']: option.cons_user_fax?option.cons_user_fax:bookingStore.booking.cons_user_fax,
          ['cons_user_name']: option.cons_user_name?option.cons_user_name:bookingStore.booking.cons_user_name,
          ['cons_user_tel']: option.cons_user_tel?option.cons_user_tel:bookingStore.booking.cons_user_tel,
          ['cons_user_dept']: option.cons_user_dept?option.cons_user_dept:bookingStore.booking.cons_user_dept,
          ['cons_address1']: option.cons_address1?option.cons_address1:bookingStore.booking.cons_address1,
          ['cons_address2']: option.cons_address1?option.cons_address2:bookingStore.booking.cons_address2,
          ['cons_address3']: option.cons_address1?option.cons_address3:bookingStore.booking.cons_address3,
          ['cons_address4']: option.cons_address1?option.cons_address4:bookingStore.booking.cons_address4,
          ['cons_address5']: option.cons_address1?option.cons_address5:bookingStore.booking.cons_address5,
        });
      }
    } else {
      if( bookingStore.booking.consignee_bookmark_seq ) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          ['consignee_bookmark_seq']: null,
          ['consignee_bookmark_name']: null,
          ['cons_name1']: null,
          ['cons_name2']: null,
          ['cons_code']: null,
          ['cons_user_email']: null,
          ['cons_user_fax']: null,
          ['cons_user_name']: null,
          ['cons_user_tel']: null,
          ['cons_user_dept']: null,
          ['cons_address1']: null,
          ['cons_address2']: null,
          ['cons_address3']: null,
          ['cons_address4']: null,
          ['cons_address5']: null,
        });
      }
    }
  }

  const fncSetOpenConsignee =()=>{
    setOpenConsignee(!openConsignee);
    props.fncSetOpenConsignee(!openConsignee);
  }

  const fncOnBlurParentBody=( bookingParams )=>{
    bookingStore.setBooking({
      ...bookingStore.booking,
      ['consignee_bookmark_seq']: bookingParams?bookingParams.consignee_bookmark_seq:null,
      ['consignee_bookmark_name']: bookingParams?bookingParams.consignee_bookmark_name:null,
      ['cons_name1']: bookingParams?bookingParams.cons_name1:null,
      ['cons_name2']: bookingParams?bookingParams.cons_name2:null,
      ['cons_code']: bookingParams?bookingParams.cons_code:null,
      ['cons_user_email']: bookingParams?bookingParams.cons_user_email:null,
      ['cons_user_fax']: bookingParams?bookingParams.cons_user_fax:null,
      ['cons_user_name']: bookingParams?bookingParams.cons_user_name:null,
      ['cons_user_tel']: bookingParams?bookingParams.cons_user_tel:null,
      ['cons_user_dept']: bookingParams?bookingParams.cons_user_dept:null,
      ['cons_address1']: bookingParams?bookingParams.cons_address1:null,
      ['cons_address2']: bookingParams?bookingParams.cons_address2:null,
      ['cons_address3']: bookingParams?bookingParams.cons_address3:null,
      ['cons_address4']: bookingParams?bookingParams.cons_address4:null,
      ['cons_address5']: bookingParams?bookingParams.cons_address5:null,
    });
  }

  return (
    <Card className={classes.paper} id="consignee" style={{height: openConsignee?'770px':''}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <HowToVote fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenConsignee()}>
            {openConsignee? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={6} sm={6}>Consignee
                  <ConsigneeBookmark
                    booking={bookingStore.booking}
                    consigneeBookmarkList={consigneeBookmarkList}
                    selectBookingConsigneeBookmark={props.selectBookingConsigneeBookmark}
                    bookmarkYn={'Y'}
                    {...props}/>
              </GridItem>
              <GridItem xs={6} sm={6}>
                <Autocomplete
                    options = {consigneeBookmarkList}
                    getOptionLabel = { option => option.consignee_bookmark_name?option.consignee_bookmark_name:'' }
                    getOptionSelected={(option, value) => option.consignee_bookmark_name?option.consignee_bookmark_name:'' === value.consignee_bookmark_name?value.consignee_bookmark_name:''}
                    value={{consignee_bookmark_name:
                      consigneeBookmarkList.find(v=>v.consignee_bookmark_seq === bookingStore.booking.consignee_bookmark_seq)
                      ?consigneeBookmarkList.find(v=>v.consignee_bookmark_seq === bookingStore.booking.consignee_bookmark_seq).consignee_bookmark_name:''
                    }}
                    id="consignee_bookmark_seq"
                    noOptionsText="등록하세요."
                    onChange={(e, option)=>fncSelectCodeBookmark(option, 'consignee_bookmark_seq')}
                    renderInput={
                      params =>(<TextField inputProps={{maxLength:30}} {...params} label="Bookmark" fullWidth />)}
                  />
              </GridItem>
            </GridContainer>
          </Typography>
        }
        // subheader="추가합니다"
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openConsignee}>
          <Divider className={classes.divider} style={{marginTop: '48px'}}/>
          <ConsigneeCardBody
            booking={bookingStore.booking}
            fncOnBlurParent={fncOnBlurParentBody}
            bookmarkYn={'N'}
          />
        </Collapse>
      </CardBody>
    </Card>
  );
});

// function areEqual( prevProps, nextProps) {
//   // console.log("CONSIGNEE ", (
//   //   prevProps.openConsignee === nextProps.openConsignee
//   //   && prevProps.bookingStore.booking.bkg_no === nextProps.bookingStore.booking.bkg_no
//   //   && prevProps.bookingStore.booking.bkg_date === nextProps.bookingStore.booking.bkg_date
//   //   && prevProps.bookingStore.booking.user_no === nextProps.bookingStore.booking.user_no
//   //   && prevProps.bookingStore.booking.consignee_bookmark_name === nextProps.bookingStore.booking.consignee_bookmark_name
//   //   && prevProps.bookingStore.booking.cons_name1 === nextProps.bookingStore.booking.cons_name1
//   //   && prevProps.bookingStore.booking.cons_name2 === nextProps.bookingStore.booking.cons_name2
//   //   && prevProps.bookingStore.booking.cons_code === nextProps.bookingStore.booking.cons_code
//   //   && prevProps.bookingStore.booking.cons_user_email === nextProps.bookingStore.booking.cons_user_email
//   //   && prevProps.bookingStore.booking.cons_user_fax === nextProps.bookingStore.booking.cons_user_fax
//   //   && prevProps.bookingStore.booking.cons_user_name === nextProps.bookingStore.booking.cons_user_name
//   //   && prevProps.bookingStore.booking.cons_user_tel === nextProps.bookingStore.booking.cons_user_tel
//   //   && prevProps.bookingStore.booking.cons_user_dept === nextProps.bookingStore.booking.cons_user_dept
//   //   && prevProps.bookingStore.booking.cons_address1 === nextProps.bookingStore.booking.cons_address1
//   //   && prevProps.bookingStore.booking.cons_address2 === nextProps.bookingStore.booking.cons_address2
//   //   && prevProps.bookingStore.booking.cons_address3 === nextProps.bookingStore.booking.cons_address3
//   //   && prevProps.bookingStore.booking.cons_address4 === nextProps.bookingStore.booking.cons_address4
//   //   && prevProps.bookingStore.booking.cons_address5 === nextProps.bookingStore.booking.cons_address5
//   //   && prevProps.bookingStore.booking.selected_yn === nextProps.bookingStore.booking.selected_yn
//   //   && prevProps.consigneeBookmarkList === nextProps.consigneeBookmarkList
//   //   // && prevProps.bookingStore.booking.sch_vessel_name === nextProps.bookingStore.booking.sch_vessel_name
//   //   // && prevProps.bookingStore.booking.sch_vessel_voyage === nextProps.bookingStore.booking.sch_vessel_voyage
//   //   // && prevProps.bookingStore.booking.sch_call_sign === nextProps.bookingStore.booking.sch_call_sign
//   //   // && prevProps.bookingStore.booking.sch_pol === nextProps.bookingStore.booking.sch_pol
//   //   // && prevProps.bookingStore.booking.sch_pod === nextProps.bookingStore.booking.sch_pod
//   //   // bookmark
//   //   && prevProps.bookingStore.booking.bookmark_seq === nextProps.bookingStore.booking.bookmark_seq
//   //   && prevProps.bookingStore.booking.other_bookmark_seq === nextProps.bookingStore.booking.other_bookmark_seq
//   //   && prevProps.bookingStore.booking.cargo_bookmark_seq === nextProps.bookingStore.booking.cargo_bookmark_seq
//   //   && prevProps.bookingStore.booking.line_bookmark_seq === nextProps.bookingStore.booking.line_bookmark_seq
//   //   && prevProps.bookingStore.booking.consignee_bookmark_seq === nextProps.bookingStore.booking.consignee_bookmark_seq
//   //   && prevProps.bookingStore.booking.container_bookmark_seq === nextProps.bookingStore.booking.container_bookmark_seq
//   //   && prevProps.bookingStore.booking.document_bookmark_seq === nextProps.bookingStore.booking.document_bookmark_seq
//   //   && prevProps.bookingStore.booking.forwarder_bookmark_seq === nextProps.bookingStore.booking.forwarder_bookmark_seq
//   //   && prevProps.bookingStore.booking.schedule_bookmark_seq === nextProps.bookingStore.booking.schedule_bookmark_seq
//   //   && prevProps.bookingStore.booking.shipper_bookmark_seq === nextProps.bookingStore.booking.shipper_bookmark_seq
//   //   && prevProps.bookingStore.booking.transport_bookmark_seq === nextProps.bookingStore.booking.transport_bookmark_seq
//   // ))
//   return (
//     prevProps.openConsignee === nextProps.openConsignee
//     && prevProps.bookingStore.booking.bkg_no === nextProps.bookingStore.booking.bkg_no
//     && prevProps.bookingStore.booking.bkg_date === nextProps.bookingStore.booking.bkg_date
//     && prevProps.bookingStore.booking.user_no === nextProps.bookingStore.booking.user_no
//     && prevProps.bookingStore.booking.consignee_bookmark_name === nextProps.bookingStore.booking.consignee_bookmark_name
//     && prevProps.bookingStore.booking.cons_name1 === nextProps.bookingStore.booking.cons_name1
//     && prevProps.bookingStore.booking.cons_name2 === nextProps.bookingStore.booking.cons_name2
//     && prevProps.bookingStore.booking.cons_code === nextProps.bookingStore.booking.cons_code
//     && prevProps.bookingStore.booking.cons_user_email === nextProps.bookingStore.booking.cons_user_email
//     && prevProps.bookingStore.booking.cons_user_fax === nextProps.bookingStore.booking.cons_user_fax
//     && prevProps.bookingStore.booking.cons_user_name === nextProps.bookingStore.booking.cons_user_name
//     && prevProps.bookingStore.booking.cons_user_tel === nextProps.bookingStore.booking.cons_user_tel
//     && prevProps.bookingStore.booking.cons_user_dept === nextProps.bookingStore.booking.cons_user_dept
//     && prevProps.bookingStore.booking.cons_address1 === nextProps.bookingStore.booking.cons_address1
//     && prevProps.bookingStore.booking.cons_address2 === nextProps.bookingStore.booking.cons_address2
//     && prevProps.bookingStore.booking.cons_address3 === nextProps.bookingStore.booking.cons_address3
//     && prevProps.bookingStore.booking.cons_address4 === nextProps.bookingStore.booking.cons_address4
//     && prevProps.bookingStore.booking.cons_address5 === nextProps.bookingStore.booking.cons_address5
//     && prevProps.bookingStore.booking.selected_yn === nextProps.bookingStore.booking.selected_yn
//     && prevProps.consigneeBookmarkList === nextProps.consigneeBookmarkList
//     // && prevProps.bookingStore.booking.sch_vessel_name === nextProps.bookingStore.booking.sch_vessel_name
//     // && prevProps.bookingStore.booking.sch_vessel_voyage === nextProps.bookingStore.booking.sch_vessel_voyage
//     // && prevProps.bookingStore.booking.sch_call_sign === nextProps.bookingStore.booking.sch_call_sign
//     // && prevProps.bookingStore.booking.sch_pol === nextProps.bookingStore.booking.sch_pol
//     // && prevProps.bookingStore.booking.sch_pod === nextProps.bookingStore.booking.sch_pod
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
//   ) 
// }

export default ConsigneeCard;
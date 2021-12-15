import React,{ useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Paper, Tooltip, Box, Collapse, IconButton, FormLabel, Input, Dialog, Grid, Divider, Avatar, CardHeader, InputAdornment} from "@material-ui/core";
import {LocalShipping, UnfoldLess, UnfoldMore} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import TransportCardBody from './TransportCardBody';
import TransportBookmark from './TransportBookmark';
import {observer} from 'mobx-react-lite';

const TransportCard = observer(({bookingStore, ...props}) => {
  
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openTransport, setOpenTransport] = useState(true);
  const [transportBookmarkList, setTransportBookmarkList] = useState([])


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
    setTransportBookmarkList(props.transportBookmarkList);
  },[props.transportBookmarkList]);

  useEffect(()=>{
    setOpenTransport(props.openTransport);
  },[props.openTransport]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'transport_bookmark_seq' === code) {
          bookingStore.setBooking({
            ...bookingStore.booking,
            'transport_bookmark_seq': option?option.transport_bookmark_seq:null,
            'transport_bookmark_name': option?option.transport_bookmark_name:null,
            'trans_name1': option.trans_name1?option.trans_name1:bookingStore.booking.trans_name1,
            'trans_name2': option.trans_name1?option.trans_name2:bookingStore.booking.trans_name2,
            'trans_code': option.trans_code?option.trans_code:bookingStore.booking.trans_code,
            'trans_self_yn': option.trans_self_yn?option.trans_self_yn:bookingStore.booking.trans_self_yn,
            'trans_user_fax': option.trans_user_fax?option.trans_user_fax:bookingStore.booking.trans_user_fax,
            'trans_user_name': option.trans_user_name?option.trans_user_name:bookingStore.booking.trans_user_name,
            'trans_user_tel': option.trans_user_tel?option.trans_user_tel:bookingStore.booking.trans_user_tel,
            'trans_user_email': option.trans_user_email?option.trans_user_email:bookingStore.booking.trans_user_email,
            'trans_fac_name': option.trans_fac_name?option.trans_fac_name:bookingStore.booking.trans_fac_name,
            'trans_fac_area_name': option.trans_fac_area_name?option.trans_fac_area_name:bookingStore.booking.trans_fac_area_name,
            'trans_remark': option.trans_remark?option.trans_remark:bookingStore.booking.trans_remark,
            'selected_yn':'Y'
          });
      }
    } else {
      if( bookingStore.booking.transport_bookmark_seq ) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          'transport_bookmark_seq': null,
          'transport_bookmark_name': null,
          'trans_name1': null,
          'trans_name2': null,
          'trans_code': null,
          'trans_self_yn': null,
          'trans_user_fax': null,
          'trans_user_name': null,
          'trans_user_tel': null,
          'trans_user_email': null,
          'trans_fac_name': null,
          'trans_fac_area_name': null,
          'trans_remark': null
        });
      }
    }
  }

  const fncSetOpenTransport=()=>{
    setOpenTransport(!openTransport);
    props.fncSetOpenTransport(!openTransport);
  }

  const fncOnBlurParentBody =(bookingParams)=> {
    bookingStore.setBooking({
      ...bookingStore.booking,
      'transport_bookmark_seq': bookingParams?bookingParams.transport_bookmark_seq:null,
      'transport_bookmark_name': bookingParams?bookingParams.transport_bookmark_name:null,
      'trans_name1': bookingParams?bookingParams.trans_name1:null,
      'trans_name2': bookingParams?bookingParams.trans_name2:null,
      'trans_code': bookingParams?bookingParams.trans_code:null,
      'trans_self_yn': bookingParams?bookingParams.trans_self_yn:null,
      'trans_user_fax': bookingParams?bookingParams.trans_user_fax:null,
      'trans_user_name': bookingParams?bookingParams.trans_user_name:null,
      'trans_user_tel': bookingParams?bookingParams.trans_user_tel:null,
      'trans_user_email': bookingParams?bookingParams.trans_user_email:null,
      'trans_fac_name': bookingParams?bookingParams.trans_fac_name:null,
      'trans_fac_area_name': bookingParams?bookingParams.trans_fac_area_name:null,
      'trans_remark': bookingParams?bookingParams.trans_remark:null,
      'selected_yn':'Y'
    });
  }

  return (
    <Card className={classes.paper} id="transport">
  
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <LocalShipping fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenTransport()}>
            {openTransport? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={4} sm={4}>Transport
                  <TransportBookmark
                    booking={bookingStore.booking}
                    transportBookmarkList={transportBookmarkList}
                    bookmarkYn={'Y'}
                    selectBookingTransportBookmark={props.selectBookingTransportBookmark}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={12} sm={7}>
                <Autocomplete
                  options = {transportBookmarkList}
                  getOptionLabel = { option => option.transport_bookmark_name?option.transport_bookmark_name:'' }
                  getOptionSelected={(option, value) => option.transport_bookmark_name?option.transport_bookmark_name:'' === value.transport_bookmark_name?value.transport_bookmark_name:''}
                  value={{transport_bookmark_name:
                    transportBookmarkList.find(v=>v.transport_bookmark_seq === bookingStore.booking.transport_bookmark_seq)
                    ?transportBookmarkList.find(v=>v.transport_bookmark_seq === bookingStore.booking.transport_bookmark_seq).transport_bookmark_name:''
                  }}
                  id="transport_bookmark_seq"
                  onChange={(e, option)=>fncSelectCodeBookmark(option, 'transport_bookmark_seq')}
                  renderInput={
                    params =>(<TextField inputProps={{maxLength:30}} {...params} label="Transport Bookmark" fullWidth />)}
                />
              </GridItem>
            </GridContainer>
          </Typography>
        }
        // subheader="추가합니다"
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openTransport}>
          <Divider className={classes.divider}/>
          <TransportCardBody
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



export default TransportCard;
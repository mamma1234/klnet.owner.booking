import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Collapse, IconButton, Divider, Avatar, CardHeader, FormControlLabel, Checkbox} from "@material-ui/core";
import {DirectionsBoat, UnfoldLess, UnfoldMore} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import ShipperCardBody from './ShipperCardBody';
import ShipperBookmark from './ShipperBookmark';
import {observer} from 'mobx-react-lite';

const ShipperCard = observer(({bookingStore, ...props}) => {
  
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openShipper, setOpenShipper] = useState(true);
  const [shipperBookmarkList, setShipperBookmarkList] = useState([])
  const [copyFwd, setCopyFwd] = useState(false);


  // useEffect(()=>{
  //   // console.log("SHP CARD", props.booking)
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
    setOpenShipper(props.openShipper);
  },[props.openShipper]);

  useEffect(()=>{
    setShipperBookmarkList(props.shipperBookmarkList);
  },[props.shipperBookmarkList]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'shipper_bookmark_seq' === code) {
          bookingStore.setBooking({
            ...bookingStore.booking,
            'shipper_bookmark_seq':option?option.shipper_bookmark_seq:null,
            'shipper_bookmark_name':option.shipper_bookmark_name?option.shipper_bookmark_name:null,
            'shp_name1':option.shp_name1?option.shp_name1:bookingStore.booking.shp_name1,
            'shp_name2':option.shp_name1?option.shp_name2:bookingStore.booking.shp_name2,
            'shp_code':option.shp_code?option.shp_code:bookingStore.booking.shp_code,
            'shp_user_name':option.shp_user_name?option.shp_user_name:bookingStore.booking.shp_user_name,
            'shp_user_tel':option.shp_user_tel?option.shp_user_tel:bookingStore.booking.shp_user_tel,
            'shp_user_email':option.shp_user_email?option.shp_user_email:bookingStore.booking.shp_user_email,
            'shp_address1':option.shp_address1?option.shp_address1:bookingStore.booking.shp_address1,
            'shp_address2':option.shp_address1?option.shp_address2:bookingStore.booking.shp_address2,
            'shp_address3':option.shp_address1?option.shp_address3:bookingStore.booking.shp_address3,
            'shp_address4':option.shp_address1?option.shp_address4:bookingStore.booking.shp_address4,
            'shp_address5':option.shp_address1?option.shp_address5:bookingStore.booking.shp_address5,
            'shp_user_dept':option.shp_user_dept?option.shp_user_dept:bookingStore.booking.shp_user_dept,
            'shp_user_fax':option.shp_user_fax?option.shp_user_fax:bookingStore.booking.shp_user_fax,
            'shp_payment_type':option.shp_payment_type?option.shp_payment_type:bookingStore.booking.shp_payment_type,
            'selected_yn':'Y' 
          });
      }
    } else {
      if ( bookingStore.booking.shipper_bookmark_seq ) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          'shipper_bookmark_seq': null,
          'shipper_bookmark_name': null,
          'shp_name1': null,
          'shp_name2': null,
          'shp_code': null,
          'shp_user_name': null,
          'shp_user_tel': null,
          'shp_user_email': null,
          'shp_address1': null,
          'shp_address2': null,
          'shp_address3': null,
          'shp_address4': null,
          'shp_address5': null,
          'shp_user_dept': null,
          'shp_user_fax': null,
          'shp_payment_type': null,
          'selected_yn':'Y' 
        });
      }
    }
  }


  const fncSetOpenShipper=()=>{
    setOpenShipper(!openShipper);
    props.fncSetOpenShipper(!openShipper);
  }


  const fncCopyFwd =(check)=> {
    if( check ) {
      bookingStore.setBooking({
        ...bookingStore.booking,
        'shipper_bookmark_seq':null,
        'shipper_bookmark_name':null,
        'shp_name1':bookingStore.booking?bookingStore.booking.fwd_name1:null,
        'shp_name2':bookingStore.booking?bookingStore.booking.fwd_name2:null,
        'shp_code':bookingStore.booking?bookingStore.booking.fwd_code:null,
        'shp_user_name':bookingStore.booking?bookingStore.booking.fwd_user_name:null,
        'shp_user_tel':bookingStore.booking?bookingStore.booking.fwd_user_tel:null,
        'shp_user_email':bookingStore.booking?bookingStore.booking.fwd_user_email:null,
        'shp_address1':bookingStore.booking?bookingStore.booking.fwd_address1:null,
        'shp_address2':bookingStore.booking?bookingStore.booking.fwd_address2:null,
        'shp_address3':bookingStore.booking?bookingStore.booking.fwd_address3:null,
        'shp_address4':bookingStore.booking?bookingStore.booking.fwd_address4:null,
        'shp_address5':bookingStore.booking?bookingStore.booking.fwd_address5:null,
        'shp_user_dept':bookingStore.booking?bookingStore.booking.fwd_user_dept:null,
        'shp_user_fax':bookingStore.booking?bookingStore.booking.fwd_user_fax:null,
        'shp_payment_type':bookingStore.booking?bookingStore.booking.fwd_payment_type:null,
      });
    } else {
      bookingStore.setBooking({
        ...bookingStore.booking,
        'shipper_bookmark_seq':null,
        'shipper_bookmark_name':null,
        'shp_name1':null,
        'shp_name2':null,
        'shp_code':null,
        'shp_user_name':null,
        'shp_user_tel':null,
        'shp_user_email':null,
        'shp_address1':null,
        'shp_address2':null,
        'shp_address3':null,
        'shp_address4':null,
        'shp_address5':null,
        'shp_user_dept':null,
        'shp_user_fax':null,
        'shp_payment_type':null,
      });
    }

    setCopyFwd(!copyFwd);
  }

  const fncOnBlurParentBody =(bookingParams)=> {
    bookingStore.setBooking({
      ...bookingStore.booking,
      'shipper_bookmark_seq':bookingParams?bookingParams.shipper_bookmark_seq:null,
      'shipper_bookmark_name':bookingParams?bookingParams.shipper_bookmark_name:null,
      'shp_name1':bookingParams?bookingParams.shp_name1:null,
      'shp_name2':bookingParams?bookingParams.shp_name2:null,
      'shp_code':bookingParams?bookingParams.shp_code:null,
      'shp_user_name':bookingParams?bookingParams.shp_user_name:null,
      'shp_user_tel':bookingParams?bookingParams.shp_user_tel:null,
      'shp_user_email':bookingParams?bookingParams.shp_user_email:null,
      'shp_address1':bookingParams?bookingParams.shp_address1:null,
      'shp_address2':bookingParams?bookingParams.shp_address2:null,
      'shp_address3':bookingParams?bookingParams.shp_address3:null,
      'shp_address4':bookingParams?bookingParams.shp_address4:null,
      'shp_address5':bookingParams?bookingParams.shp_address5:null,
      'shp_user_dept':bookingParams?bookingParams.shp_user_dept:null,
      'shp_user_fax':bookingParams?bookingParams.shp_user_fax:null,
      'shp_payment_type':bookingParams?bookingParams.shp_payment_type:null,
      'shp_business_number':bookingParams?bookingParams.shp_business_number:null,
      
    });
  }
  return (
    <Card className={classes.paper} id="shipper">
      
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <DirectionsBoat fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenShipper()}>
            {openShipper? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={6} sm={6}>Shipper
                  <ShipperBookmark
                    shipperBookmarkList={shipperBookmarkList}
                    selectBookingShipperBookmark={props.selectBookingShipperBookmark}
                    bookmarkYn={'Y'}
                    shipperCompanyList={props.shipperCompanyList}
                    booking={bookingStore.booking}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={6} sm={6}>
                <Autocomplete
                  options = {shipperBookmarkList}
                  getOptionLabel = { option => option.shipper_bookmark_name?option.shipper_bookmark_name:'' }
                  getOptionSelected={(option, value) => option.shipper_bookmark_name?option.shipper_bookmark_name:'' === value.shipper_bookmark_name?value.shipper_bookmark_name:''}
                  value={{shipper_bookmark_name:
                    shipperBookmarkList.find(v=>v.shipper_bookmark_seq === bookingStore.booking.shipper_bookmark_seq)
                    ?shipperBookmarkList.find(v=>v.shipper_bookmark_seq === bookingStore.booking.shipper_bookmark_seq).shipper_bookmark_name:''
                  }}
                  id="shipper_bookmark_seq"
                  noOptionsText="등록하세요."
                  onChange={(e, option)=>fncSelectCodeBookmark(option, 'shipper_bookmark_seq')}
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
        <Collapse in={openShipper}>
          <GridItem lg={12} md={12} sm={12} xs={12} >
            <FormControlLabel style={{textAlignLast:'right'}}
              control={
                <Checkbox checked={copyFwd}
                  onChange={(event)=>fncCopyFwd(event.target.checked)}/>
              }
              label='Copy Forwarder'
            >
            </FormControlLabel>
          </GridItem>
          <Divider className={classes.divider}/>
          <ShipperCardBody
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





export default ShipperCard;
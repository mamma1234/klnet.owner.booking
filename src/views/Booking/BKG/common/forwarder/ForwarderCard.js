import React,{ useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, FormControlLabel, Checkbox, Collapse, IconButton, Divider, Avatar, CardHeader} from "@material-ui/core";
import {AirportShuttle, UnfoldLess, UnfoldMore} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import ForwarderCardBody from './ForwarderCardBody';
import ForwarderBookmark from './ForwarderBookmark';
import {observer} from 'mobx-react-lite';

const ForwarderCard = observer(({bookingStore, ...props}) => {
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openForwarder, setOpenForwarder] = useState(true);
  const [forwarderBookmarkList, setForwarderBookmarkList] = useState([]);
  const [copyShp, setCopyShp] = useState(false);


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
    setOpenForwarder(props.openForwarder);
  },[props.openForwarder]);

  useEffect(()=>{
    setForwarderBookmarkList(props.forwarderBookmarkList);
  },[props.forwarderBookmarkList]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'forwarder_bookmark_seq' === code) {

        bookingStore.setBooking({
          ...bookingStore.booking,
          'forwarder_bookmark_seq': option?option.forwarder_bookmark_seq:null,
          'forwarder_bookmark_name': option?option.forwarder_bookmark_name:null,
          'fwd_name1': option.fwd_name1?option.fwd_name1:bookingStore.booking.fwd_name1,
          'fwd_name2': option.fwd_name1?option.fwd_name2:bookingStore.booking.fwd_name1,
          'fwd_code': option.fwd_code?option.fwd_code:bookingStore.booking.fwd_code,
          'fwd_user_email': option.fwd_user_email?option.fwd_user_email:bookingStore.booking.fwd_user_email,
          'fwd_user_fax': option.fwd_user_fax?option.fwd_user_fax:bookingStore.booking.fwd_user_fax,
          'fwd_user_name': option.fwd_user_name?option.fwd_user_name:bookingStore.booking.fwd_user_name,
          'fwd_user_tel': option.fwd_user_tel?option.fwd_user_tel:bookingStore.booking.fwd_user_tel,
          'fwd_user_dept': option.fwd_user_dept?option.fwd_user_dept:bookingStore.booking.fwd_user_dept,
          'fwd_address1': option.fwd_address1?option.fwd_address1:bookingStore.booking.fwd_address1,
          'fwd_address2': option.fwd_address1?option.fwd_address2:bookingStore.booking.fwd_address2,
          'fwd_address3': option.fwd_address1?option.fwd_address3:bookingStore.booking.fwd_address3,
          'fwd_address4': option.fwd_address1?option.fwd_address4:bookingStore.booking.fwd_address4,
          'fwd_address5': option.fwd_address1?option.fwd_address5:bookingStore.booking.fwd_address5,
          'selected_yn': 'Y'
        });
          
      }
    } else {
      if( bookingStore.booking.forwarder_bookmark_seq ) {
          bookingStore.setBooking({
            ...bookingStore.booking,
            'forwarder_bookmark_seq': null,
            'forwarder_bookmark_name': null,
            'fwd_business_number': null,
            'fwd_name1': null,
            'fwd_name2': null,
            'fwd_code': null,
            'fwd_user_email': null,
            'fwd_user_fax': null,
            'fwd_user_name': null,
            'fwd_user_tel': null,
            'fwd_user_dept': null,
            'fwd_address1': null,
            'fwd_address2': null,
            'fwd_address3': null,
            'fwd_address4': null,
            'fwd_address5': null,
            'selected_yn': null,
          });
      }
    }
  }


  const fncSetOpenForwarder=()=>{
    setOpenForwarder(!openForwarder);
    props.fncSetOpenForwarder(!openForwarder);
  }

  const fncCopyShp =(check)=> {
    if( check ) {
      bookingStore.setBooking({
        ...bookingStore.booking,
        ['forwarder_bookmark_seq']: null,
        ['forwarder_bookmark_name']: null,
        ['fwd_name1']: bookingStore.booking?bookingStore.booking.shp_name1:null,
        ['fwd_name2']: bookingStore.booking?bookingStore.booking.shp_name2:null,
        ['fwd_code']: bookingStore.booking?bookingStore.booking.shp_code:null,
        ['fwd_user_email']: bookingStore.booking?bookingStore.booking.shp_user_email:null,
        ['fwd_user_fax']: bookingStore.booking?bookingStore.booking.shp_user_fax:null,
        ['fwd_user_name']: bookingStore.booking?bookingStore.booking.shp_user_name:null,
        ['fwd_user_tel']: bookingStore.booking?bookingStore.booking.shp_user_tel:null,
        ['fwd_user_dept']: bookingStore.booking?bookingStore.booking.shp_user_dept:null,
        ['fwd_address1']: bookingStore.booking?bookingStore.booking.shp_address1:null,
        ['fwd_address2']: bookingStore.booking?bookingStore.booking.shp_address2:null,
        ['fwd_address3']: bookingStore.booking?bookingStore.booking.shp_address3:null,
        ['fwd_address4']: bookingStore.booking?bookingStore.booking.shp_address4:null,
        ['fwd_address5']: bookingStore.booking?bookingStore.booking.shp_address5:null,
        ['fwd_business_number']: null,
      });

    } else {
      bookingStore.setBooking({
        ...bookingStore.booking,
        'forwarder_bookmark_seq': null,
        'forwarder_bookmark_name': null,
        'fwd_name1': null,
        'fwd_name2': null,
        'fwd_code': null,
        'fwd_user_email': null,
        'fwd_user_fax': null,
        'fwd_user_name': null,
        'fwd_user_tel': null,
        'fwd_user_dept': null,
        'fwd_address1': null,
        'fwd_address2': null,
        'fwd_address3': null,
        'fwd_address4': null,
        'fwd_address5': null,
        'fwd_business_number': null,
      });
    }

    setCopyShp(!copyShp);
  }

  const fncOnBlurParentBody=(bookingParams)=>{
    bookingStore.setBooking({
      ...bookingStore.booking,
      ['forwarder_bookmark_seq']: null,
      ['forwarder_bookmark_name']: null,
      ['fwd_name1']: bookingParams?bookingParams.fwd_name1:null,
      ['fwd_name2']: bookingParams?bookingParams.fwd_name2:null,
      ['fwd_code']: bookingParams?bookingParams.fwd_code:null,
      ['fwd_user_email']: bookingParams?bookingParams.fwd_user_email:null,
      ['fwd_user_fax']: bookingParams?bookingParams.fwd_user_fax:null,
      ['fwd_user_name']: bookingParams?bookingParams.fwd_user_name:null,
      ['fwd_user_tel']: bookingParams?bookingParams.fwd_user_tel:null,
      ['fwd_user_dept']: bookingParams?bookingParams.fwd_user_dept:null,
      ['fwd_address1']: bookingParams?bookingParams.fwd_address1:null,
      ['fwd_address2']: bookingParams?bookingParams.fwd_address2:null,
      ['fwd_address3']: bookingParams?bookingParams.fwd_address3:null,
      ['fwd_address4']: bookingParams?bookingParams.fwd_address4:null,
      ['fwd_address5']: bookingParams?bookingParams.fwd_address5:null,
      ['fwd_business_number']: bookingParams?bookingParams.fwd_business_number:null,
    });
  }

  return (
    <Card className={classes.paper} id="forwarder" style={{height: openForwarder?'770px':''}}>
      
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AirportShuttle fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenForwarder()}>
            {openForwarder? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={6} sm={6}>Forwarder
                  <ForwarderBookmark
                    forwarderBookmarkList={forwarderBookmarkList}
                    bookmarkYn={'Y'}
                    booking={bookingStore.booking}
                    forwarderCompanyList={props.forwarderCompanyList}
                    selectBookingForwarderBookmark={props.selectBookingForwarderBookmark}
                    // {...props}
                  />
              </GridItem>
              <GridItem xs={6} sm={6}>
                <Autocomplete
                    options = {forwarderBookmarkList}
                    getOptionLabel = { option => option.forwarder_bookmark_name?option.forwarder_bookmark_name:'' }
                    getOptionSelected={(option, value) => option.forwarder_bookmark_name?option.forwarder_bookmark_name:'' === value.forwarder_bookmark_name?value.forwarder_bookmark_name:''}
                    id="forwarder_bookmark_seq"
                    value={{forwarder_bookmark_name:
                      forwarderBookmarkList.find(v=>v.forwarder_bookmark_seq === bookingStore.booking.forwarder_bookmark_seq)
                      ?forwarderBookmarkList.find(v=>v.forwarder_bookmark_seq === bookingStore.booking.forwarder_bookmark_seq).forwarder_bookmark_name:''
                    }}
                    noOptionsText="등록하세요."
                    onChange={(e, option)=>fncSelectCodeBookmark(option, 'forwarder_bookmark_seq')}
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
        <Collapse in={openForwarder}>
          <GridItem lg={12} md={12} sm={12} xs={12} >
            <FormControlLabel style={{textAlignLast:'right'}}
              control={
                <Checkbox checked={copyShp}
                  onChange={(event)=>fncCopyShp(event.target.checked)}/>
              }
              label='Copy Shipper'
            >
            </FormControlLabel>
          </GridItem>
          <Divider className={classes.divider}/>
          <ForwarderCardBody
            booking={bookingStore.booking}
            bookmarkYn={'N'}
            fncOnBlurParent={fncOnBlurParentBody}
            forwarderCompanyList={props.forwarderCompanyList}
            {...props}
          />
        </Collapse>
      </CardBody>
    </Card>
  );
});

export default ForwarderCard;
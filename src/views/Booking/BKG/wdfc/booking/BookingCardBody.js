import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputLabel, FormLabel, TextField} from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import {observer} from 'mobx-react-lite';

const BookingCardBody = observer(({booking, ...props}) => {
  // {console.log("BookingCard Reload")}
  const classes = useStyles();
  const [other, setOther] = useState({});
  const [serviceLineCodeList, setServiceLineCodeList] = useState([]);
  const {bookmarkYn} = props;
  
  useEffect(()=>{
    setOther(booking);
  },[booking]);

  useEffect(()=>{
    setServiceLineCodeList(props.serviceLineCodeList);
  },[props.serviceLineCodeList]);


  // AutoComplete
  const fncSelectCode =(option, code) => {
    setOther({
      ...other,
      [code]: option,
    });
    // booking[code] = option
    fncOnBlurParent({
      ...other,
      [code]: option,
    });
  }

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    // booking[key] = value;
    setOther({...other, [key]:value})
    // if( "Y" === bookmarkYn ) {
    //   console.log(">",bookmarkYn, booking)
    //   props.fncOnBlurParent({...booking});
    // }
    // setBooking({...booking});
  }

  const fncOnBlurParent =(bookingParams)=> {
      props.fncOnBlurParent(bookingParams);
  }
  return (
    <GridContainer>
      { ('Y' === bookmarkYn)?
        <>
          <GridItem xs={12} sm={2} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
              Bookmark 
            </InputLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            <CustomInput
              validtype="engNumber"
              success={other.other_bookmark_name?true:false}
              error={other.other_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="other_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                value:other.other_bookmark_name?other.other_bookmark_name:'',
                onChange: (e)=>fncOnChange(e),
                style:{height:'30px'}
              }}
              required={("Y" === bookmarkYn)?true:false}
              feedback="deny"
            />
          </GridItem>
        </>
      :
        <>
        </>}
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          S/C Number
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={10}>
        <CustomInput
          validtype="text"
          success={other.sc_no?true:false}
          error={other.sc_no?false:true}
          labelText=""
          maxLength="10"
          minLength="10"
          id="sc_no"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:other.sc_no?other.sc_no:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(other),
            style:{height:'30px'}
          }}
          required={"Y"===bookmarkYn?false:true}
          feedback="booking"
        />
      </GridItem>      
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Term
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={10}>
        <Autocomplete
          options = {serviceLineCodeList?serviceLineCodeList:[]}
          getOptionLabel = { option => option.label?option.label||'':'' }
          getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
          id="trans_service_code"
          value={{label:
            serviceLineCodeList && serviceLineCodeList.find(v=>v.value === other.trans_service_code)
            ?serviceLineCodeList.find(v=>v.value === other.trans_service_code).label:''
          }}
          onChange={(e, option)=>fncSelectCode(option?option.value:null, 'trans_service_code')}
          renderInput={
            params =>(
              <TextField
                inputProps={{maxLength:30}}
                {...params} label=""
                fullWidth
                required={('Y'===bookmarkYn)?false:true}
                error={('Y'===bookmarkYn)?false:other.trans_service_code?false:true}
                helperText={('Y'===bookmarkYn)?false:other.trans_service_code?null:'필수'}
              />)}
        />
      </GridItem>
      {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Remark
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={10}>
        <CustomInput
          validtype="text"
          success={other.remark1?true:false}
          error={other.remark1?false:true}
          labelText=""
          maxLength="70"
          id="remark1"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:other.remark1?other.remark1:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(other),
            style:{height:'30px'}
          }}
          required={false}
          feedback="booking"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <FormLabel className={classes.labelHorizontal}>
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={10}>
      <CustomInput
          validtype="text"
          success={other.remark2?true:false}
          error={other.remark2?false:true}
          labelText=""
          maxLength="70"
          id="remark2"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:other.remark2?other.remark2:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(other),
            style:{height:'30px'}
          }}
            required={false}
            feedback="booking"
          />
      </GridItem> */}
    </GridContainer>
  );
});


function areEqual (prevProps, nextProps) {
  return ( 
    prevProps.openBooking === nextProps.openBooking
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.booking.sc_no === nextProps.booking.sc_no
    && prevProps.booking.remark1 === nextProps.booking.remark1
    && prevProps.booking.remark2 === nextProps.booking.remark2
    && prevProps.booking.shp_payment_type === nextProps.booking.shp_payment_type
    && prevProps.booking.trans_service_code === nextProps.booking.trans_service_code
    && prevProps.serviceLineCodeList === nextProps.serviceLineCodeList
    && prevProps.otherBookmarkList === nextProps.otherBookmarkList
    // bookmark
    && prevProps.booking.bookmark_seq === nextProps.booking.bookmark_seq
    && prevProps.booking.other_bookmark_seq === nextProps.booking.other_bookmark_seq
    && prevProps.booking.cargo_bookmark_seq === nextProps.booking.cargo_bookmark_seq
    && prevProps.booking.line_bookmark_seq === nextProps.booking.line_bookmark_seq
    && prevProps.booking.consignee_bookmark_seq === nextProps.booking.consignee_bookmark_seq
    && prevProps.booking.container_bookmark_seq === nextProps.booking.container_bookmark_seq
    && prevProps.booking.document_bookmark_seq === nextProps.booking.document_bookmark_seq
    && prevProps.booking.forwarder_bookmark_seq === nextProps.booking.forwarder_bookmark_seq
    && prevProps.booking.schedule_bookmark_seq === nextProps.booking.schedule_bookmark_seq
    && prevProps.booking.shipper_bookmark_seq === nextProps.booking.shipper_bookmark_seq
    && prevProps.booking.transport_bookmark_seq === nextProps.booking.transport_bookmark_seq
  )
}

export default React.memo(BookingCardBody, areEqual);
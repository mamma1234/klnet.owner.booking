import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormLabel, InputAdornment, InputLabel} from "@material-ui/core";
import {Close, Search} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import axios from "axios";
import { observer } from "mobx-react-lite";

const ShipperCardBody = observer(({booking, ...props}) => {
  // {console.log("ShipperCard Reload")}
  const classes = useStyles();
  const [shipper, setShipper] = useState({});
  const [shipperCompanyList, setShipperCompanyList] = useState([]);
  const {bookmarkYn} = props;

  useEffect(()=>{
    // setShipper({
    //   ...shipper,
    //   ['shipper_bookmark_seq']: booking?booking.shipper_bookmark_seq:null,
    //   ['shipper_bookmark_name']: booking?booking.shipper_bookmark_name:null,
    //   ['shp_name1']: booking?booking.shp_name1:null,
    //   ['shp_name2']: booking?booking.shp_name2:null,
    //   ['shp_code']: booking?booking.shp_code:null,
    //   ['shp_user_name']: booking?booking.shp_user_name:null,
    //   ['shp_user_tel']: booking?booking.shp_user_tel:null,
    //   ['shp_user_email']: booking?booking.shp_user_email:null,
    //   ['shp_address1']: booking?booking.shp_address1:null,
    //   ['shp_address2']: booking?booking.shp_address2:null,
    //   ['shp_address3']: booking?booking.shp_address3:null,
    //   ['shp_address4']: booking?booking.shp_address4:null,
    //   ['shp_address5']: booking?booking.shp_address5:null,
    //   ['shp_user_dept']: booking?booking.shp_user_dept:null,
    //   ['shp_user_fax']: booking?booking.shp_user_fax:null,
    //   ['shp_payment_type']: booking?booking.shp_payment_type:null,
    //   ['shp_business_number']: booking?booking.shp_business_number:null,
    // });
    setShipper(booking)
  },[booking]);

  useEffect(()=>{
    setShipperCompanyList(props.shipperCompanyList);
    if( 1 === props.shipperCompanyList.length && !(
      shipper.shp_code && shipper.shp_user_name || shipper.shp_user_email 
    )) {
      setShipper({
        ...shipper,
        ['shp_business_number']: props.shipperCompanyList[0].business_number,
        ['shp_code']: props.shipperCompanyList[0].partner_code,
        ['shp_klnet_id']: props.shipperCompanyList[0].klnet_id,
      });
      fncOnBlurParent({
        ...shipper,
        ['shp_business_number']: props.shipperCompanyList[0].business_number,
        ['shp_code']: props.shipperCompanyList[0].partner_code,
        ['shp_klnet_id']: props.shipperCompanyList[0].klnet_id,
      });
    }
  },[props.shipperCompanyList]);

  useEffect(()=> {
    if( shipper.shp_business_number ) {
      fncSelectCompanyInfo();
    }
  },[shipper.shp_business_number]);

  // TextField onChange ?????????
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    setShipper({...shipper, [key]:value});
  }

  // Autocomplete ?????????
  const fncSelectCode =(option, code)=> {
    // console.log(option,code)
    setShipper({
      ...shipper,
      [code]: option?option:null,
    });
    fncOnBlurParent({
      ...shipper,
      [code]: option?option:null,
    });
  }

    // Autocomplete ?????????
    const fncSelectBusiness =(option, code)=> {
      console.log(option,code)
      setShipper({
        ...shipper,
        ['shp_business_number']: option?option.business_number:null,
        ['shp_code']: option?option.partner_code:null,
        ['shp_klnet_id']: props.shipperCompanyList[0].klnet_id,
      });
      fncOnBlurParent({
        ...shipper,
        ['shp_business_number']: option?option.business_number:null,
        ['shp_code']: option?option.partner_code:null,
        ['shp_klnet_id']: props.shipperCompanyList[0].klnet_id,
      });
    }

  const fncSelectCompanyInfo = () => {
    axios.post(
        "/com/getCompanyInfo",
        { 
            klnetId: shipper.shp_klnet_id,
        }
    ).then(
        res => {
            // console.log(res.data[0]);
            if( res.data[0] ) {
              let company = res.data[0];
              if( company.REG_NO && !(
                shipper.shp_user_name || shipper.shp_user_email
              )) {
                  setShipper({
                    ...shipper, 
                    ['shp_business_number']:company.REG_NO, 
                    ['shp_name1']:company.CNAME_KR, 
                    ['shp_address1']:company.COMP_ADDR?company.COMP_ADDR.substring(0,35):null,
                    ['shp_address2']:company.COMP_ADDR?company.COMP_ADDR.substring(35,70):null,
                    ['shp_address3']:company.COMP_ADDR?company.COMP_ADDR.substring(70,105):null,
                    ['shp_address4']:company.COMP_ADDR?company.COMP_ADDR.substring(105,40):null,
                    ['shp_address5']:company.COMP_ADDR?company.COMP_ADDR.substring(140,175):null,
                  })
                  fncOnBlurParent({
                    ...shipper, 
                    ['shp_business_number']:company.REG_NO, 
                    ['shp_name1']:company.CNAME_KR, 
                    ['shp_address1']:company.COMP_ADDR?company.COMP_ADDR.substring(0,35):null,
                    ['shp_address2']:company.COMP_ADDR?company.COMP_ADDR.substring(35,70):null,
                    ['shp_address3']:company.COMP_ADDR?company.COMP_ADDR.substring(70,105):null,
                    ['shp_address4']:company.COMP_ADDR?company.COMP_ADDR.substring(105,40):null,
                    ['shp_address5']:company.COMP_ADDR?company.COMP_ADDR.substring(140,175):null,
                  });
              } 
              // else {
              //     setShipper({...shipper, ['shp_business_number']:null, ['shp_name1']:null, ['shp_address1']:null});
              //     fncOnBlurParent({...shipper, ['shp_business_number']:null, ['shp_name1']:null, ['shp_address1']:null});
              // }
            }
        }
    );
  }

  const fncOnBlurParent =(bookingParams)=> {
    props.fncOnBlurParent(bookingParams);
  }

  const fncOnBlurBusinessNumber =(e)=> {
    console.log(e.target.value )
    if( !e.target.value ) {
        setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
        fncOnBlurParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
    }
  }

  const fncSearchBn =()=>{
    // console.log(booking.business_number)
    if( !shipper.shp_business_number ) return false;
    if( shipper.shp_business_number.length < 10) return false;
        // console.log(booking.business_number.length, booking.business_number, booking.init_business_number)
        if( shipper.shp_business_number && shipper.shp_business_number.length === 10 ) {
            let row = shipperCompanyList.find(v=>v.business_number === shipper.shp_business_number)
            if( row ) {
                axios.post(
                    "/com/getCompanyInfo",
                    { 
                        klnetId: row.klnet_id,
                    }
                ).then(
                    res => {
                        // console.log(res.data[0]);
                        let company = res.data[0];
                        if( company.REG_NO ) {
                            setShipper({...shipper, ['shp_business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR})
                            fncOnBlurParent({...shipper, ['shp_business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR});
                        } else {
                            setShipper({...shipper, ['shp_business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                            fncOnBlurParent({...shipper, ['shp_business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                        }
                    }
                );
                // setBooking({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code})
                // props.fncBookingParent({...booking, ['business_number']:row.business_number, ['shp_code']:row.partner_code});
            } else {
                // props.onAlert("danger", "????????? ????????????.");
                setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                fncOnBlurParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
            }
        }
  }

  const fncOnKeyPress = async(e)=>{
    // enter ??? ?????? 
    if( 13 === e.charCode ) {
        if( e.target.value.length < 10) return false;
        // console.log(e.target.value.length, e.target.value, booking.init_business_number)
        if( e.target.value && e.target.value.length === 10 ) {
            let row = shipperCompanyList.find(v=>v.business_number === shipper.shp_business_number)
            if( row ) {
                axios.post(
                    "/com/getCompanyInfo",
                    { 
                        klnetId: row.klnet_id,
                    }
                ).then(
                    res => {
                        // console.log(res.data[0]);
                        let company = res.data[0];
                        if( company.REG_NO ) {
                            setShipper({...shipper, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR})
                            fncOnBlurParent({...shipper, ['business_number']:company.REG_NO, ['shp_code']:row.partner_code, ['shp_name1']:company.CNAME_KR});
                        } else {
                          setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                          fncOnBlurParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
                        }
                    }
                );
            } else {
                setShipper({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null})
                fncOnBlurParent({...shipper, ['business_number']:null, ['shp_code']:null, ['shp_name1']:null});
            }
        }
    }
  }
  return (
    <GridContainer>
      {('Y' === bookmarkYn)?
        <>
          <GridItem xs={12} sm={3} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
              Bookmark
            </InputLabel>
          </GridItem>
          <GridItem xs={12} sm={9}>
            <CustomInput
              validtype="text"
              success={shipper.shipper_bookmark_name?true:false}
              error={shipper.shipper_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="shipper_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                value:shipper.shipper_bookmark_name?shipper.shipper_bookmark_name:'',
                onChange: (e)=>fncOnChange(e),
                onBlur: ()=>fncOnBlurParent(shipper),
              endAdornment:
                !shipper.shipper_bookmark_name? (
                        <InputAdornment position="end">
                          <Close className={classes.danger} style={{color:'red'}} />
                        </InputAdornment>
                      ) : (
                        undefined
                      ),
                style:{height:'30px'}
              }}
              required={true}
              feedback="deny"
            />
          </GridItem>
        </>
      :
      <></>
      }
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Business Number
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        {/* <Autocomplete
          className={classes.textField}
          options = {shipperCompanyList?shipperCompanyList:[]}
          getOptionLabel = { option => option?option.business_number||"":'' }
          getOptionSelected={(option, value) => option.business_number?option.business_number:'' === value.business_number?value.business_number:''}
          value={{shp_business_number:
            shipperCompanyList.length>0&&shipperCompanyList.find(v=>v.business_number === shipper.shp_business_number)
            ?shipperCompanyList.find(v=>v.business_number === shipper.shp_business_number).business_number:''
          }}
          id="shipper_list"
          onChange={(e, option)=>fncSelectBusiness(option?option:null, 'shp_business_number')}
          renderInput={
            params =>(<TextField inputProps={{maxLength:4}} {...params} label="" fullWidth style={{marginBottom:'10px', marginTop:'5px'}}/>)}
        /> */}
        <CustomInput
          validtype="number"
          success={shipper.shp_business_number?true:false}
          error={shipper.shp_business_number?false:true}
          labelText=""
          maxLength="10"
          
          id="shp_business_number"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value: shipper.shp_business_number?shipper.shp_business_number:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: (e)=>fncOnBlurBusinessNumber(e),
            onKeyPress: (e)=>fncOnKeyPress(e),
            placeholder: "????????? ?????? ?????? ??? ??????",
            endAdornment:<InputAdornment position="end" onClick={fncSearchBn}><Search /></InputAdornment>,
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Ship Code
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="number"
          success={shipper.shp_code?true:false}
          error={shipper.shp_code?false:true}
          labelText=""
          maxLength="5"
          id="shp_code"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_code?shipper.shp_code:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Shipper Name
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_name1?true:false}
          error={shipper.shp_name1?false:true}
          labelText=""
          maxLength="35"
          id="shp_name1"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_name1?shipper.shp_name1:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={"Y"===bookmarkYn?false:true}
          feedback="shipper"
        />
      </GridItem>
      {/* <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_name2?true:false}
          error={shipper.shp_name2?false:true}
          labelText=""
          maxLength="35"
          id="shp_name2"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_name2?shipper.shp_name2:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={"Y"===bookmarkYn?false:true}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Payment
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <Autocomplete
          className={classes.textField}
          options = {[{id:'P',value:'??????(Prepaid)'}, {id:'C', value:'??????(Collected)'}]}
          getOptionLabel = { option => option?option.value||"":'' }
          getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
          value={{value:
            [{id:'P',value:'??????(Prepaid)'}, {id:'C', value:'??????(Collected)'}].find(v=>v.id === shipper.shp_payment_type)
            ?[{id:'P',value:'??????(Prepaid)'}, {id:'C', value:'??????(Collected)'}].find(v=>v.id === shipper.shp_payment_type).value:''
          }}
          id="shp_payment_type"
          onChange={(e, option)=>fncSelectCode(option?option.id:null, 'shp_payment_type')}
          renderInput={
            params =>(<TextField inputProps={{maxLength:4}} {...params} label="" fullWidth style={{marginBottom:'10px', marginTop:'5px'}}/>)}
        />
      </GridItem> */}
      
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Email
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="email"
          success={shipper.shp_user_email?true:false}
          error={shipper.shp_user_email?false:true}
          labelText=""
          maxLength="50"
          id="shp_user_email"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_user_email?shipper.shp_user_email:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      
      {/* 
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
        P.I.C Name
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_user_name?true:false}
          error={shipper.shp_user_name?false:true}
          labelText=""
          maxLength="17"
          id="shp_user_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_user_name?shipper.shp_user_name:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Address
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_address1?true:false}
          error={shipper.shp_address1?false:true}
          labelText=""
          maxLength="35"
          id="shp_address1"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_address1?shipper.shp_address1:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <FormLabel className={classes.labelHorizontal}>
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_address2?true:false}
          error={shipper.shp_address2?false:true}
          labelText=""
          maxLength="35"
          id="shp_address2"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_address2?shipper.shp_address2:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <FormLabel className={classes.labelHorizontal}>
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_address3?true:false}
          error={shipper.shp_address3?false:true}
          labelText=""
          maxLength="35"
          id="shp_address3"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_address3?shipper.shp_address3:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <FormLabel className={classes.labelHorizontal}>
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_address4?true:false}
          error={shipper.shp_address4?false:true}
          labelText=""
          maxLength="35"
          id="shp_address4"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_address4?shipper.shp_address4:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <FormLabel className={classes.labelHorizontal}>
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="text"
          success={shipper.shp_address5?true:false}
          error={shipper.shp_address5?false:true}
          labelText=""
          maxLength="35"
          id="shp_address5"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_address5?shipper.shp_address5:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Tel
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="tel"
          success={shipper.shp_user_tel?true:false}
          error={shipper.shp_user_tel?false:true}
          labelText=""
          maxLength="25"
          id="shp_user_tel"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_user_tel?shipper.shp_user_tel:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
      
      <GridItem xs={12} sm={3} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Fax
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={9}>
        <CustomInput
          validtype="tel"
          success={shipper.shp_user_fax?true:false}
          error={shipper.shp_user_fax?false:true}
          labelText=""
          maxLength="25"
          id="shp_user_fax"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_user_fax?shipper.shp_user_fax:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>fncOnBlurParent(shipper),
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem>
       */}
      {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Dept
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="text"
          success={shipper.shp_user_dept?true:false}
          error={shipper.shp_user_dept?false:true}
          labelText=""
          maxLength="35"
          id="shp_user_dept"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:shipper.shp_user_dept?shipper.shp_user_dept:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(shipper),
          // endAdornment:
          //   !shipper.shp_user_dept? (
          //           <InputAdornment position="end">
          //             <Close className={classes.danger} style={{color:'red'}} />
          //           </InputAdornment>
          //         ) : (
          //           undefined
          //         ),
          //   style:{height:'30px'}
          }}
          required={false}
          feedback="shipper"
        />
      </GridItem> */}
      
    </GridContainer>
  );
});

function areEqual(prevProps, nextProps) {
  return(
    prevProps.openShipper === nextProps.openShipper
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.booking.shipper_bookmark_name === nextProps.booking.shipper_bookmark_name
    && prevProps.booking.shp_name1 === nextProps.booking.shp_name1
    && prevProps.booking.shp_name2 === nextProps.booking.shp_name2
    && prevProps.booking.shp_code === nextProps.booking.shp_code
    && prevProps.booking.shp_user_name === nextProps.booking.shp_user_name
    && prevProps.booking.shp_user_tel === nextProps.booking.shp_user_tel
    && prevProps.booking.shp_user_email === nextProps.booking.shp_user_email
    && prevProps.booking.shp_address1 === nextProps.booking.shp_address1
    && prevProps.booking.shp_address2 === nextProps.booking.shp_address2
    && prevProps.booking.shp_address3 === nextProps.booking.shp_address3
    && prevProps.booking.shp_address4 === nextProps.booking.shp_address4
    && prevProps.booking.shp_address5 === nextProps.booking.shp_address5
    && prevProps.booking.shp_user_dept === nextProps.booking.shp_user_dept
    && prevProps.booking.shp_user_fax === nextProps.booking.shp_user_fax
    && prevProps.booking.shp_payment_type === nextProps.booking.shp_payment_type
    && prevProps.booking.shp_business_number === nextProps.booking.shp_business_number
    && prevProps.shipperBookmarkList === nextProps.shipperBookmarkList
    && prevProps.shipperCompanyList === nextProps.shipperCompanyList
    // forwarder
    && prevProps.booking.forwarder_bookmark_name === nextProps.booking.forwarder_bookmark_name
    && prevProps.booking.fwd_name1 === nextProps.booking.fwd_name1
    && prevProps.booking.fwd_name2 === nextProps.booking.fwd_name2
    && prevProps.booking.fwd_code === nextProps.booking.fwd_code
    && prevProps.booking.fwd_user_email === nextProps.booking.fwd_user_email
    && prevProps.booking.fwd_user_fax === nextProps.booking.fwd_user_fax
    && prevProps.booking.fwd_user_name === nextProps.booking.fwd_user_name
    && prevProps.booking.fwd_user_tel === nextProps.booking.fwd_user_tel
    && prevProps.booking.fwd_user_dept === nextProps.booking.fwd_user_dept
    && prevProps.booking.fwd_address1 === nextProps.booking.fwd_address1
    && prevProps.booking.fwd_address2 === nextProps.booking.fwd_address2
    && prevProps.booking.fwd_address3 === nextProps.booking.fwd_address3
    && prevProps.booking.fwd_address4 === nextProps.booking.fwd_address4
    && prevProps.booking.fwd_address5 === nextProps.booking.fwd_address5
    && prevProps.booking.fwd_business_number === nextProps.booking.fwd_business_number

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

export default React.memo(ShipperCardBody, areEqual);
import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { InputLabel, TextField} from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import axios from "axios";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observer } from "mobx-react-lite";

const ForwarderCardBody = observer(({booking, ...props}) => {
  // {console.log("forwarder Realod")}
  const classes = useStyles();
  const [forwarder, setForwarder] = useState({});
  const [forwarderCompanyList, setForwarderCompanyList] = useState([]);
  const {bookmarkYn, userData} = props;

  useEffect(()=>{
    setForwarder(booking);
  },[booking]);

  useEffect(()=>{
    setForwarderCompanyList(props.forwarderCompanyList);
    if( 1 === props.forwarderCompanyList.length && !(forwarder.fwd_name1 || forwarder.fwd_name2 
      && forwarder.fwd_user_tel || forwarder.fwd_user_fax || forwarder.fwd_user_email
      && forwarder.fwd_address1 || forwarder.fwd_address2 || forwarder.fwd_address3 || forwarder.fwd_address4 || forwarder.fwd_address5)) {
      setForwarder({
        ...forwarder,
        ['fwd_business_number']: props.forwarderCompanyList[0].business_number,
        ['fwd_code']: props.forwarderCompanyList[0].partner_code,
        ['fwd_klnet_id']: props.forwarderCompanyList[0].klnet_id,
        ['fwd_user_name']:userData?userData.user_name:null,
        ['fwd_user_email']:userData?userData.user_email:null,
      });
      fncOnBlurParent({
        ...forwarder,
        ['fwd_business_number']: props.forwarderCompanyList[0].business_number,
        ['fwd_code']: props.forwarderCompanyList[0].partner_code,
        ['fwd_klnet_id']: props.forwarderCompanyList[0].klnet_id,
        ['fwd_user_name']:userData?userData.user_name:null,
        ['fwd_user_email']:userData?userData.user_email:null,
      });
    }
  }, [props.forwarderCompanyList])

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    setForwarder({...forwarder, [key]:value});
  }

  useEffect(()=> {
    fncSelectCompanyInfo();
  },[forwarder.fwd_business_number]);

  const fncSelectBusiness =(option, code)=> {
    setForwarder({
      ...forwarder,
      ['fwd_business_number']: option?option.business_number:null,
      ['fwd_code']: option?option.partner_code:null,
      ['fwd_klnet_id']: option?option.klnet_id:null,
    });
    fncOnBlurParent({
      ...forwarder,
      ['fwd_business_number']: option?option.business_number:null,
      ['fwd_code']: option?option.partner_code:null,
      ['fwd_klnet_id']: option?option.klnet_id:null,
    });
  }

  const fncSelectCompanyInfo = () => {
    if( forwarder.fwd_klnet_id ) {
      axios.post(
          "/com/getCompanyInfo",
          { 
              klnetId: forwarder.fwd_klnet_id,
          }
      ).then(
          res => {
              // console.log(res.data[0]);
              if( res.data[0] ) {
                let company = res.data[0];
                if( company.REG_NO && !(forwarder.fwd_name1 || forwarder.fwd_name2 
                  || forwarder.fwd_user_tel || forwarder.fwd_user_fax 
                  || forwarder.fwd_address1 || forwarder.fwd_address2 || forwarder.fwd_address3 
                  || forwarder.fwd_address4 || forwarder.fwd_address5) ) {
                    setForwarder({
                      ...forwarder,
                      ['fwd_business_number']:company.REG_NO, 
                      ['fwd_name1']:company.CNAME_EN, 
                      ['fwd_address1']:company.COMP_ADDR?company.COMP_ADDR.substring(0, 35):null,
                      ['fwd_address2']:company.COMP_ADDR?company.COMP_ADDR.substring(35, 70):null,
                      ['fwd_address3']:company.COMP_ADDR?company.COMP_ADDR.substring(70, 105):null,
                      ['fwd_address4']:company.COMP_ADDR?company.COMP_ADDR.substring(105, 140):null,
                    })
                    fncOnBlurParent({
                      ...forwarder, 
                      ['fwd_business_number']:company.REG_NO, 
                      ['fwd_name1']:company.CNAME_EN, 
                      ['fwd_address1']:company.COMP_ADDR?company.COMP_ADDR.substring(0, 35):null,
                      ['fwd_address2']:company.COMP_ADDR?company.COMP_ADDR.substring(35, 70):null,
                      ['fwd_address3']:company.COMP_ADDR?company.COMP_ADDR.substring(70, 105):null,
                      ['fwd_address4']:company.COMP_ADDR?company.COMP_ADDR.substring(105, 140):null,
                    });
                }
                //  else {
                //     setForwarder({...forwarder, ['fwd_business_number']:null, ['fwd_name1']:null, ['fwd_address1']:null})
                //     fncOnBlurParent({...forwarder, ['fwd_business_number']:null, ['fwd_name1']:null, ['fwd_address1']:null});
                //   }
              }
          }
      );
    }
  }

  const fncOnBlurParent =(bookingParams)=>{
      props.fncOnBlurParent(bookingParams);
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
              success={forwarder.forwarder_bookmark_name?true:false}
              error={forwarder.forwarder_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="forwarder_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:forwarder.forwarder_bookmark_name?forwarder.forwarder_bookmark_name:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>fncOnBlurParent(forwarder),
              // endAdornment:
              //   !forwarder.forwarder_bookmark_name? (
              //           <InputAdornment position="end">
              //             <Close className={classes.danger} style={{color:'red'}} />
              //           </InputAdornment>
              //         ) : (
              //           undefined
              //         ),
              //   style:{height:'30px'}
              }}
              required={true}
              feedback="deny"
            />
          </GridItem>
        </>
        :<></>
      }
      <GridContainer>
        {/* <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Business Number
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <Autocomplete
            className={classes.textField}
            options = {forwarderCompanyList}
            getOptionLabel = { option => option.business_number?option.business_number:'' }
            getOptionSelected={(option, value) => option.business_number?option.business_number:'' === value.business_number?value.business_number:''}
            value={{business_number:
              forwarderCompanyList.length>0&&forwarderCompanyList.find(v=>v.business_number === forwarder.fwd_business_number)
              ?forwarderCompanyList.find(v=>v.business_number === forwarder.fwd_business_number).business_number:''
            }}
            id="forwarder_list"
            onChange={(e, option)=>fncSelectBusiness(option?option:null, 'fwd_business_number')}
            renderInput={
              params =>(<TextField inputProps={{maxLength:4}} {...params} label="" fullWidth style={{marginBottom:'10px', marginTop:'5px'}}/>)}
          />
        </GridItem> */}
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Forwarder Name
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_name1?true:false}
            error={forwarder.fwd_name1?false:true}
            labelText=""
            maxLength="35"
            id="fwd_name1"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_name1?forwarder.fwd_name1:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={("Y" === bookmarkYn)?false:(forwarder.fwd_user_name ||forwarder.fwd_user_fax ||forwarder.fwd_user_tel ||forwarder.fwd_user_email ||forwarder.fwd_user_fax 
              ||forwarder.fwd_address1||forwarder.fwd_address2||forwarder.fwd_address3
              ||forwarder.fwd_address4||forwarder.fwd_address5)?true:false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_name2?true:false}
            error={forwarder.fwd_name2?false:true}
            labelText=""
            maxLength="35"
            id="fwd_name2"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_name2?forwarder.fwd_name2:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Forwarder Code
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_code?true:false}
            error={forwarder.fwd_code?false:true}
            labelText=""
            maxLength="35"
            id="fwd_code"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_code?forwarder.fwd_code:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          P.I.C Name
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_user_name?true:false}
            error={forwarder.fwd_user_name?false:true}
            labelText=""
            maxLength="17"
            id="fwd_user_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_user_name?forwarder.fwd_user_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={("Y" === bookmarkYn)?false: (forwarder.fwd_name1 ||forwarder.fwd_name2)?true:
                    (forwarder.fwd_user_tel ||forwarder.fwd_user_email||forwarder.fwd_user_fax
                    ||forwarder.fwd_address1||forwarder.fwd_address2||forwarder.fwd_address3
                    ||forwarder.fwd_address4||forwarder.fwd_address5)?true:false }
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Address
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_address1?true:false}
            error={forwarder.fwd_address1?false:true}
            labelText=""
            maxLength="35"
            id="fwd_address1"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
              value:forwarder.fwd_address1?forwarder.fwd_address1:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={!forwarder.fwd_address1&&(forwarder.fwd_address2||forwarder.fwd_address3||forwarder.fwd_address4||forwarder.fwd_address5)?true:false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_address2?true:false}
            error={forwarder.fwd_address2?false:true}
            labelText=""
            maxLength="35"
            id="fwd_address2"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_address2?forwarder.fwd_address2:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_address3?true:false}
            error={forwarder.fwd_address3?false:true}
            labelText=""
            maxLength="35"
            id="fwd_address3"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_address3?forwarder.fwd_address3:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_address4?true:false}
            error={forwarder.fwd_address4?false:true}
            labelText=""
            maxLength="35"
            id="fwd_address4"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_address4?forwarder.fwd_address4:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={forwarder.fwd_address5?true:false}
            error={forwarder.fwd_address5?false:true}
            labelText=""
            maxLength="35"
            id="fwd_address5"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_address5?forwarder.fwd_address5:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Tel
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="tel"
            success={forwarder.fwd_user_tel?true:false}
            error={forwarder.fwd_user_tel?false:true}
            labelText=""
            maxLength="25"
            id="fwd_user_tel"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_user_tel?forwarder.fwd_user_tel:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Fax
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="tel"
            success={forwarder.fwd_user_fax?true:false}
            error={forwarder.fwd_user_fax?false:true}
            labelText=""
            maxLength="25"
            id="fwd_user_fax"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_user_fax?forwarder.fwd_user_fax:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Email
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="email"
            success={forwarder.fwd_user_email?true:false}
            error={forwarder.fwd_user_email?false:true}
            labelText=""
            maxLength="25"
            id="fwd_user_email"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:forwarder.fwd_user_email?forwarder.fwd_user_email:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(forwarder),
            }}
            required={false}
            feedback="forwarder"
          />
        </GridItem>
      </GridContainer>
      {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Dept
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="text"
          success={forwarder.fwd_user_dept?true:false}
          error={forwarder.fwd_user_dept?false:true}
          labelText=""
          maxLength="35"
          id="fwd_user_dept"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:forwarder.fwd_user_dept?forwarder.fwd_user_dept:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(forwarder),
          }}
          required={false}zzzzzz
          feedback="forwarder"
        />
      </GridItem> */}
      
    </GridContainer>
  );
});

function areEqual(prevProps, nextProps) {
  return(
    prevProps.openForwarder === nextProps.openForwarder
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
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
    && prevProps.forwarderBookmarkList === nextProps.forwarderBookmarkList
    && prevProps.forwarderCompanyList === nextProps.forwarderCompanyList
    // shipper
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
  );
}

export default React.memo(ForwarderCardBody, areEqual);
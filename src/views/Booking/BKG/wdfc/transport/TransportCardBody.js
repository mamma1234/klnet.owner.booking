import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, InputLabel, InputAdornment} from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import TransPop from "./TransPop";
import { observer } from "mobx-react-lite";

const TransportCardBody = observer(({booking, ...props}) => {
  // {console.log("transport Rerender")}
  const classes = useStyles();
  const [trans, setTrans] = useState({});
  const {bookmarkYn} = props;

  useEffect(()=>{
    setTrans(booking);
  },[booking]);

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    setTrans({...trans, [key]:value});
  }
  // AutoComplete
  const fncSelectCode =(option, code) => {
    setTrans({
      ...trans,
      [code]: option,
    });
    props.fncOnBlurParent({
      ...trans,
      [code]: option,
    });
  }

  const fncTransPort =( data )=> {
    setTrans({
      ...trans,
      ...data,
    });
    props.fncOnBlurParent({
      ...trans,
      ...data,
    });
  }
  return (
    <GridContainer>
      {('Y' === bookmarkYn)?
        <>
          <GridItem xs={12} sm={2} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
              Bookmark
            </InputLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            <CustomInput
              validtype="text"
              success={trans.transport_bookmark_name?true:false}
              error={trans.transport_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="transport_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                value:trans.transport_bookmark_name?trans.transport_bookmark_name:'',
                onChange: (e)=>fncOnChange(e),
                onBlur: ()=>props.fncOnBlurParent(trans),
              }}
              required={true}
              feedback="deny"
            />
          </GridItem>
          <GridItem xs={12} sm={6} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
            </InputLabel>
          </GridItem>
        </>
        :<></>
      }
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Haulage
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <Autocomplete
          className={classes.textField}
          options = {[{value:'Y', label:'자가운송'},{value:'N', label:'라인운송'}]}
          getOptionLabel = { option => option.label?option.label:'' }
          getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
          value={{label:
            [{value:'Y', label:'자가운송'},{value:'N', label:'라인운송'}].find(v=>v.value === trans.trans_self_yn)
            ?[{value:'Y', label:'자가운송'},{value:'N', label:'라인운송'}].find(v=>v.value === trans.trans_self_yn).label:''
          }}
          id="trans_self_yn"
          onChange={(e, option)=>fncSelectCode(option?option.value:null, 'trans_self_yn')}
          renderInput={
            params =>(
              <TextField inputProps={{maxLength:30}}
                {...params} label="" fullWidth
                error={('Y'===bookmarkYn)?false:trans.trans_self_yn?false:true}
                helperText={('Y'===bookmarkYn)?false:trans.trans_self_yn?null:'필수'} 
                />)}
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Transport Name
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="text"
          success={trans.trans_name1?true:false}
          error={trans.trans_name1?false:true}
          labelText=""
          maxLength="35"
          id="trans_name1"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_name1?trans.trans_name1:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={("Y" === trans.trans_self_yn)?true:false}
          feedback="transport"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
        P.I.C Name
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="text"
          success={trans.trans_user_name?true:false}
          error={trans.trans_user_name?false:true}
          labelText=""
          maxLength="17"
          id="trans_user_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_user_name?trans.trans_user_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={("Y" === trans.trans_self_yn)?true:false}
          feedback="transport"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Tel
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="tel"
          success={trans.trans_user_tel?true:false}
          error={trans.trans_user_tel?false:true}
          labelText=""
          maxLength="25"
          id="trans_user_tel"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_user_tel?trans.trans_user_tel:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={("Y" === trans.trans_self_yn)?true:false}
          feedback="transport"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Email
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="email"
          success={trans.trans_user_email?true:false}
          error={trans.trans_user_email?false:true}
          labelText=""
          maxLength="25"
          id="trans_user_email"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_user_email?trans.trans_user_email:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={false}
          feedback="transport"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Fax
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="tel"
          success={trans.trans_user_fax?true:false}
          error={trans.trans_user_fax?false:true}
          labelText=""
          maxLength="25"
          id="trans_user_fax"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_user_fax?trans.trans_user_fax:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={false}
          feedback="transport"
        />
      </GridItem>
      {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          공장 지역
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="text"
          success={trans.trans_fac_area_name?true:false}
          error={trans.trans_fac_area_name?false:true}
          labelText=""
          maxLength="20"
          id="trans_fac_area_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_fac_area_name?trans.trans_fac_area_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={false}
          feedback="transport"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          공장 명
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="text"
          success={trans.trans_fac_name?true:false}
          error={trans.trans_fac_name?false:true}
          labelText=""
          maxLength="50"
          id="trans_fac_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:trans.trans_fac_name?trans.trans_fac_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(trans),
          }}
          required={false}
          feedback="transport"
        />
      </GridItem> */}
    </GridContainer>
  );
});

function areEqual(prevProps, nextProps) {
  return (
    prevProps.openTransport === nextProps.openTransport
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.booking.transport_bookmark_name === nextProps.booking.transport_bookmark_name
    && prevProps.booking.trans_name1 === nextProps.booking.trans_name1
    && prevProps.booking.trans_name2 === nextProps.booking.trans_name2
    && prevProps.booking.trans_code === nextProps.booking.trans_code
    && prevProps.booking.trans_self_yn === nextProps.booking.trans_self_yn
    && prevProps.booking.trans_user_fax === nextProps.booking.trans_user_fax
    && prevProps.booking.trans_user_name === nextProps.booking.trans_user_name
    && prevProps.booking.trans_user_tel === nextProps.booking.trans_user_tel
    && prevProps.booking.trans_user_email === nextProps.booking.trans_user_email
    && prevProps.booking.trans_fac_name === nextProps.booking.trans_fac_name
    && prevProps.booking.trans_fac_area_name === nextProps.booking.trans_fac_area_name
    && prevProps.booking.trans_remark === nextProps.booking.trans_remark
    && prevProps.booking.selected_yn === nextProps.booking.selected_yn
    && prevProps.booking.line_code === nextProps.booking.line_code
    && prevProps.transportBookmarkList === nextProps.transportBookmarkList
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

export default React.memo(TransportCardBody, areEqual);
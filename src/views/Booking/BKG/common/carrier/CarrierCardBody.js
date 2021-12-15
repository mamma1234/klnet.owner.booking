import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { InputAdornment, InputLabel, TextField } from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import {Close} from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import { observer } from "mobx-react-lite";

const CarrierCardBody = observer(({booking, ...props}) => {
  // {console.log("CarrierCard Realod")}
  const classes = useStyles();
  const [carrier, setCarrier] = useState({});
  // const [lineWorkOriginatorList, setLineWorkOriginatorList] = useState([]);
  const {bookmarkYn, lineWorkOriginatorList} = props;

  useEffect(()=>{
    setCarrier(booking);
  },[booking]);


  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    setCarrier({...carrier, [key]:value});
  }

  const fncSelectCode =(option, code) => {
    setCarrier({
      ...carrier,
      [code]: option,
      ['sch_line_code']: option,
    });
    props.fncOnBlurParent({
      ...carrier,
      [code]: option,
      ['sch_line_code']: option,
    });
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
              success={carrier.line_bookmark_name?true:false}
              error={carrier.line_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="line_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_bookmark_name?carrier.line_bookmark_name:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              endAdornment:
                !carrier.line_bookmark_name? (
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
        :<></>
      }
      <GridItem className={classes.grid} lg={6} md={6} sm={6} xs={12}>
        <GridContainer>
          <GridItem xs={12} sm={3} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
              Carrier Name
            </InputLabel>
          </GridItem>
          <GridItem xs={12} sm={9}>
            <CustomInput
              validtype="english"
              success={carrier.line_name1?true:false}
              error={carrier.line_name1?false:true}
              labelText=""
              maxLength="35"
              id="line_name1"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_name1?carrier.line_name1:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_name2?true:false}
              error={carrier.line_name2?false:true}
              labelText=""
              maxLength="35"
              id="line_name2"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_name2?carrier.line_name2:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
              Carrier Code
            </InputLabel>
          </GridItem>
          <GridItem xs={12} sm={9}>
          <Autocomplete
            disabled
            options = {lineWorkOriginatorList}
            getOptionLabel = { option => option.line_code?option.line_code||'':'' }
            getOptionSelected={(option, value) => option.line_code?option.line_code:'' === value.line_code?value.line_code:''}
            value={{line_code:
              lineWorkOriginatorList&&lineWorkOriginatorList.find(v=>v.line_code === carrier.line_code)
              ?lineWorkOriginatorList.find(v=>v.line_code === carrier.line_code).line_code:''
            }}
            id="line_code"
            noOptionsText=""
            onChange={(e, option)=>fncSelectCode(option?option.line_code:null, 'line_code')}
            renderInput={
              params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth style={{marginBottom:'10px'}}
                 />)}
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
              success={carrier.line_user_name?true:false}
              error={carrier.line_user_name?false:true}
              labelText=""
              maxLength="17"
              id="line_user_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_user_name?carrier.line_user_name:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_user_tel?true:false}
              error={carrier.line_user_tel?false:true}
              labelText=""
              maxLength="17"
              id="line_user_tel"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_user_tel?carrier.line_user_tel:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_user_email?true:false}
              error={carrier.line_user_email?false:true}
              labelText=""
              maxLength="25"
              id="line_user_email"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_user_email?carrier.line_user_email:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_user_fax?true:false}
              error={carrier.line_user_fax?false:true}
              labelText=""
              maxLength="20"
              id="line_user_fax"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_user_fax?carrier.line_user_fax:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
            success={carrier.line_user_dept?true:false}
            error={carrier.line_user_dept?false:true}
            labelText=""
            maxLength="35"
            id="line_user_dept"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:carrier.line_user_dept?carrier.line_user_dept:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(carrier),
            // endAdornment:
            //   !carrier.line_user_dept? (
            //           <InputAdornment position="end">
            //             <Close className={classes.danger} style={{color:'red'}} />
            //           </InputAdornment>
            //         ) : (
            //           undefined
            //         ),
            //   style:{height:'30px'}
            }}
            required={false}
            feedback="carrier"
          />
        </GridItem>
        <GridItem xs={12} sm={6} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          </InputLabel>
        </GridItem> */}
      </GridItem>
        <GridItem className={classes.grid} lg={6} md={6} sm={6} xs={12}>
          <GridContainer>
            <GridItem xs={12} sm={3} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Address
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={9}>
              <CustomInput
                validtype="english"
                success={carrier.line_address1?true:false}
                error={carrier.line_address1?false:true}
                labelText=""
                maxLength="35"
                id="line_address1"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                    value:carrier.line_address1?carrier.line_address1:'',
                onChange: (e)=>fncOnChange(e),
                onBlur: ()=>props.fncOnBlurParent(carrier),
                }}
                required={!carrier.line_address1&&(carrier.line_address2||carrier.line_address3||carrier.line_address4||carrier.line_address5)?true:false}
                feedback="carrier"
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
              success={carrier.line_address2?true:false}
              error={carrier.line_address2?false:true}
              labelText=""
              maxLength="35"
              id="line_address2"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_address2?carrier.line_address2:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_address3?true:false}
              error={carrier.line_address3?false:true}
              labelText=""
              maxLength="35"
              id="line_address3"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_address3?carrier.line_address3:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_address4?true:false}
              error={carrier.line_address4?false:true}
              labelText=""
              maxLength="35"
              id="line_address4"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_address4?carrier.line_address4:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
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
              success={carrier.line_address5?true:false}
              error={carrier.line_address5?false:true}
              labelText=""
              maxLength="35"
              id="line_address5"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:carrier.line_address5?carrier.line_address5:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(carrier),
              }}
              required={false}
              feedback="carrier"
            />
          </GridItem>
        </GridContainer>

      </GridItem>
      
    </GridContainer>
  );
});


function areEqual(prevProps, nextProps) {
  
  return (
    prevProps.booking.line_bookmark_name === nextProps.booking.line_bookmark_name
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.booking.line_name1 === nextProps.booking.line_name1
    && prevProps.booking.line_name2 === nextProps.booking.line_name2
    && prevProps.booking.line_code === nextProps.booking.line_code
    && prevProps.booking.line_user_email === nextProps.booking.line_user_email
    && prevProps.booking.line_user_fax === nextProps.booking.line_user_fax
    && prevProps.booking.line_user_name === nextProps.booking.line_user_name
    && prevProps.booking.line_user_tel === nextProps.booking.line_user_tel
    && prevProps.booking.line_user_dept === nextProps.booking.line_user_dept
    && prevProps.booking.line_address1 === nextProps.booking.line_address1
    && prevProps.booking.line_address2 === nextProps.booking.line_address2
    && prevProps.booking.line_address3 === nextProps.booking.line_address3
    && prevProps.booking.line_address4 === nextProps.booking.line_address4
    && prevProps.booking.line_address5 === nextProps.booking.line_address5
    && prevProps.booking.selected_yn === nextProps.booking.selected_yn
    && prevProps.lineBookmarkList === nextProps.lineBookmarkList
    && prevProps.lineWorkOriginatorList === nextProps.lineWorkOriginatorList
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

export default React.memo(CarrierCardBody, areEqual);
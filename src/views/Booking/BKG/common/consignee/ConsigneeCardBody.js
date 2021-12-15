import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {InputLabel} from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import {observer} from 'mobx-react-lite';

const ConsigneeCardBody = observer(({booking, ...props}) => {
  // {console.log("consignee RENDER")}
  const classes = useStyles();
  const [consignee, setConsignee] = useState({});
  const {bookmarkYn} = props;

  useEffect(()=>{
    setConsignee(booking);
  },[booking]);




  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    setConsignee({...consignee, [key]:value});
  }

  const fncOnBlurParent =(bookingParams)=> {
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
              success={consignee.consignee_bookmark_name?true:false}
              error={consignee.consignee_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="consignee_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:consignee.consignee_bookmark_name?consignee.consignee_bookmark_name:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>fncOnBlurParent(consignee),
              }}
              required={true}
              feedback="deny"
            />
          </GridItem>
        </>
        :<></>
      }
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Consignee Name
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={consignee.cons_name1?true:false}
            error={consignee.cons_name1?false:true}
            labelText=""
            maxLength="35"
            id="cons_name1"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_name1?consignee.cons_name1:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={(consignee.cons_user_name ||consignee.cons_user_fax ||consignee.cons_user_tel ||consignee.cons_user_email ||consignee.cons_user_fax 
                    ||consignee.cons_address1||consignee.cons_address2||consignee.cons_address3||consignee.cons_address4||consignee.cons_address5)?true:false}
            feedback="consignee"
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
                success={consignee.cons_name2?true:false}
                error={consignee.cons_name2?false:true}
                labelText=""
                maxLength="35"
                id="cons_name2"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                    value:consignee.cons_name2?consignee.cons_name2:'',
                onChange: (e)=>fncOnChange(e),
                onBlur: ()=>fncOnBlurParent(consignee),
                }}
                required={false}
                feedback="consignee"
              />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={3} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Consignee Code
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={9}>
          <CustomInput
            validtype="english"
            success={consignee.cons_code?true:false}
            error={consignee.cons_code?false:true}
            labelText=""
            maxLength="35"
            id="cons_code"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_code?consignee.cons_code:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_user_name?true:false}
            error={consignee.cons_user_name?false:true}
            labelText=""
            maxLength="17"
            id="cons_user_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_user_name?consignee.cons_user_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={(consignee.cons_name1 ||consignee.cons_name2)?true:
                    (consignee.cons_user_tel ||consignee.cons_user_email||consignee.cons_user_fax
                      ||consignee.cons_address1||consignee.cons_address2||consignee.cons_address3
                      ||consignee.cons_address4||consignee.cons_address5)?true:false }
            feedback="consignee"
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
            success={consignee.cons_address1?true:false}
            error={consignee.cons_address1?false:true}
            labelText=""
            maxLength="35"
            id="cons_address1"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_address1?consignee.cons_address1:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={!consignee.cons_address1&&(consignee.cons_address2||consignee.cons_address3||consignee.cons_address4||consignee.cons_address5)?true:false}
            feedback="consignee"
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
            success={consignee.cons_address2?true:false}
            error={consignee.cons_address2?false:true}
            labelText=""
            maxLength="35"
            id="cons_address2"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_address2?consignee.cons_address2:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_address3?true:false}
            error={consignee.cons_address3?false:true}
            labelText=""
            maxLength="35"
            id="cons_address3"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_address3?consignee.cons_address3:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_address4?true:false}
            error={consignee.cons_address4?false:true}
            labelText=""
            maxLength="35"
            id="cons_address4"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_address4?consignee.cons_address4:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_address5?true:false}
            error={consignee.cons_address5?false:true}
            labelText=""
            maxLength="35"
            id="cons_address5"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_address5?consignee.cons_address5:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_user_tel?true:false}
            error={consignee.cons_user_tel?false:true}
            labelText=""
            maxLength="25"
            id="cons_user_tel"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_user_tel?consignee.cons_user_tel:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_user_fax?true:false}
            error={consignee.cons_user_fax?false:true}
            labelText=""
            maxLength="25"
            id="cons_user_fax"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_user_fax?consignee.cons_user_fax:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
            success={consignee.cons_user_email?true:false}
            error={consignee.cons_user_email?false:true}
            labelText=""
            maxLength="25"
            id="cons_user_email"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:consignee.cons_user_email?consignee.cons_user_email:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParent(consignee),
            }}
            required={false}
            feedback="consignee"
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
          success={consignee.cons_user_dept?true:false}
          error={consignee.cons_user_dept?false:true}
          labelText=""
          maxLength="35"
          id="cons_user_dept"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:consignee.cons_user_dept?consignee.cons_user_dept:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(consignee),
          }}
          required={false}
          feedback="consignee"
        />
      </GridItem> */}

    </GridContainer>
  );
});


function areEqual( prevProps, nextProps) {
  return (
    prevProps.openConsignee === nextProps.openConsignee
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.booking.consignee_bookmark_name === nextProps.booking.consignee_bookmark_name
    && prevProps.booking.cons_name1 === nextProps.booking.cons_name1
    && prevProps.booking.cons_name2 === nextProps.booking.cons_name2
    && prevProps.booking.cons_code === nextProps.booking.cons_code
    && prevProps.booking.cons_user_email === nextProps.booking.cons_user_email
    && prevProps.booking.cons_user_fax === nextProps.booking.cons_user_fax
    && prevProps.booking.cons_user_name === nextProps.booking.cons_user_name
    && prevProps.booking.cons_user_tel === nextProps.booking.cons_user_tel
    && prevProps.booking.cons_user_dept === nextProps.booking.cons_user_dept
    && prevProps.booking.cons_address1 === nextProps.booking.cons_address1
    && prevProps.booking.cons_address2 === nextProps.booking.cons_address2
    && prevProps.booking.cons_address3 === nextProps.booking.cons_address3
    && prevProps.booking.cons_address4 === nextProps.booking.cons_address4
    && prevProps.booking.cons_address5 === nextProps.booking.cons_address5
    && prevProps.booking.selected_yn === nextProps.booking.selected_yn
    && prevProps.consigneeBookmarkList === nextProps.consigneeBookmarkList
    && prevProps.booking.sch_vessel_name === nextProps.booking.sch_vessel_name
    && prevProps.booking.sch_vessel_voyage === nextProps.booking.sch_vessel_voyage
    && prevProps.booking.sch_call_sign === nextProps.booking.sch_call_sign
    && prevProps.booking.sch_pol === nextProps.booking.sch_pol
    && prevProps.booking.sch_pod === nextProps.booking.sch_pod
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

export default React.memo(ConsigneeCardBody, areEqual);
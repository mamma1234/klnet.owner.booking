import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {InputLabel} from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";

const DocumentCardBody = (props) => {
  const classes = useStyles();
  const [booking, setBooking] = useState({});
  const {bookmarkYn} = props;

  useEffect(()=>{
    setBooking(props.booking);
  },[props.booking]);

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    booking[key] = value;
    setBooking({...booking});
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
              success={booking.document_bookmark_name?true:false}
              error={booking.document_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="document_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:booking.document_bookmark_name?booking.document_bookmark_name:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurParent(booking),
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
        {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
          P.I.C Name
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={booking.docu_user_name?true:false}
            error={booking.docu_user_name?false:true}
            labelText=""
            maxLength="35"
            id="docu_user_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:booking.docu_user_name?booking.docu_user_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurParent(booking),
            }}
            required={false}
            feedback="document"
          />
        </GridItem> */}
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Phone
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="tel"
          success={booking.docu_user_phone?true:false}
          error={booking.docu_user_phone?false:true}
          labelText=""
          maxLength="15"
          id="docu_user_phone"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:booking.docu_user_phone?booking.docu_user_phone:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(booking),
          }}
          required={false}
          feedback="document"
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
          success={booking.docu_user_email?true:false}
          error={booking.docu_user_email?false:true}
          labelText=""
          maxLength="25"
          id="docu_user_email"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:booking.docu_user_email?booking.docu_user_email:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(booking),
          }}
          required={false}
          feedback="document"
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
          success={booking.docu_user_tel?true:false}
          error={booking.docu_user_tel?false:true}
          labelText=""
          maxLength="25"
          id="docu_user_tel"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:booking.docu_user_tel?booking.docu_user_tel:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(booking),
          }}
          required={false}
          feedback="document"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Tax Email
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="email"
          success={booking.docu_tax_email?true:false}
          error={booking.docu_tax_email?false:true}
          labelText=""
          maxLength="25"
          id="docu_tax_email"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:booking.docu_tax_email?booking.docu_tax_email:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(booking),
          }}
          required={false}
          feedback="document"
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
          success={booking.docu_user_fax?true:false}
          error={booking.docu_user_fax?false:true}
          labelText=""
          maxLength="25"
          id="docu_user_fax"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
              value:booking.docu_user_fax?booking.docu_user_fax:'',
          onChange: (e)=>fncOnChange(e),
          onBlur: ()=>props.fncOnBlurParent(booking),
          }}
          required={false}
          feedback="document"
        />
      </GridItem>
    </GridContainer>
  );
}

export default DocumentCardBody;
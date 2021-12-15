import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
//import CalendarBox from "components/CustomInput/CustomCalendar.js";
import { TextField, Paper, InputLabel, IconButton} from "@material-ui/core";
import { Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const SpecialCardBody = (props) => {
  const classes = useStyles();
  const [container, setContainer] = useState({});
  const [special, setSpecial] = useState({});
  //const [checkCntr, setCheckCntr] = useState(true);
  const [cntrCodeLineCodeList, setCntrCodeLineCodeList] = useState([]);


  const {index, bookmarkYn} = props;
  useEffect(()=>{
    setSpecial(props.special);
  },[props.special]);
  
  useEffect(()=>{
    setCntrCodeLineCodeList(props.cntrCodeLineCodeList);
  },[props.cntrCodeLineCodeList]);

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    special[key] = value;
    setSpecial({...special});
  }

  // AutoComplete
  const fncSelectCode =(option, code, index) => {
    // console.log(option, code)
    setSpecial({
      ...special,
      [code]: option,
      'delete':'N'
    });
    props.fncOnBlurSpecialBody(index, {
      ...special,
      [code]: option,
      'delete':'N'
    });
  }

  const fncCheckCntr =(element)=>{

    setSpecial({
      ...special,
      ['cntr_yn']: (element.cntr_yn === 'Y'?'N':'Y'),
      'delete':'N'
    });
    props.fncOnBlurSpecialBody(index, {
      ...special,
      ['cntr_yn']: (element.cntr_yn === 'Y'?'N':'Y'),
      'delete':'N'
    });
  }

  const fncDelSpecial = (index)=>{
    if( index === 0 ) {
      setSpecial({'cntr_seq':1});
      props.fncOnBlurSpecialBody(index, {'cntr_seq':1, 'delete':'Y'});
    } else {
        setSpecial({'delete':'Y'});
        props.fncOnBlurSpecialBody(index, {'delete':'Y'});
    }
  }

  const fncOnChagneDate=(date, code)=>{
    setContainer({
      ...special,
      [code]:date?moment(date,'YYYYMMDD').format('YYYYMMDD'):null,
    });
    props.fncOnBlurSpecialBody(index, {
      ...special,
      [code]:date?moment(date,'YYYYMMDD').format('YYYYMMDD'):null,
    });
  }
  return (
    <Paper className={classes.paper} key={index}>
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
              success={container.container_special_bookmark_name?true:false}
              error={container.container_special_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="container_special_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:container.container_special_bookmark_name?container.container_special_bookmark_name:'',
              onChange: (e)=>fncOnChange(e),
              // onBlur: ()=>props.fncOnBlur(container),
              }}
              required={('Y'===bookmarkYn)?true:false}
              feedback="deny"
            />
          </GridItem>
          <GridItem xs={12} sm={6} className={classes.gridLabel}>
            <InputLabel style={{ color: "#AAAAAA" }}>
            </InputLabel>
          </GridItem>
        </>
        :
        <>
          <GridItem xs={11} sm={11}>
            <Typography variant='h6'>Special</Typography>
          </GridItem>
          {/* <GridItem xs={1} sm={1}>
            <IconButton onClick={()=>fncDelSpecial(index)}>
              <Close fontSize={'small'} />
            </IconButton>
          </GridItem> */}
        </>}
        
        <GridItem xs={6} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            UNNO
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={4}>
          <CustomInput
            validtype="text"
            success={('Y'===bookmarkYn)?false:special.special_undg?true:false}
            error={('Y'===bookmarkYn)?false:special.special_undg?false:true}
            labelText=""
            maxLength="4"
            id="special_undg"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
              value:special.special_undg?special.special_undg:'',
              onChange: (e)=>fncOnChange(e, index),
              onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={6} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Class
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={4}>
          <CustomInput
            validtype="text"
            success={('Y'===bookmarkYn)?false:special.special_imdg?true:false}
            error={('Y'===bookmarkYn)?false:special.special_imdg?false:true}
            labelText=""
            maxLength="7"
            id="special_imdg"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
              value:special.special_imdg?special.special_imdg:'',
              onChange: (e)=>fncOnChange(e, index),
              onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        {/* <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Ignition
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <CustomInput
            validtype="text"
            success={special.special_ignition?true:false}
            error={special.special_ignition?false:true}
            labelText=""
            maxLength="15"
            id="special_ignition"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_ignition?special.special_ignition:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={6} sm={1}>
          <Autocomplete
            className={classes.textField}
            options = {[{key:'C', value:'C'},{key:'F', value:'F'}]}
            getOptionLabel = { option => option.value?option.value:'' }
            getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
            value={{value:
              [{key:'C', value:'C'},{key:'F', value:'F'}].find(v=> v.value == special.special_ignition_type)
              ?[{key:'C', value:'C'},{key:'F', value:'F'}].find(v=> v.value == special.special_ignition_type).value:''
            }}
            id="special_ignition_type"
            onChange={(e, option)=>fncSelectCode(option?option.value:null, 'special_ignition_type', index)}
            renderInput={
              params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
          />
        </GridItem>
        
        
        
        <GridItem xs={6} sm={2}>
        </GridItem>
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Pack Type
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <CustomInput
            validtype="text"
            success={special.special_out_pack_type?true:false}
            error={special.special_out_pack_type?false:true}
            labelText=""
            maxLength="10"
            id="special_out_pack_type"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_out_pack_type?special.special_out_pack_type:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Pack Count
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <CustomInput
            validtype="text"
            success={special.special_out_pack_cnt?true:false}
            error={special.special_out_pack_cnt?false:true}
            labelText=""
            maxLength="10"
            id="special_out_pack_cnt"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_out_pack_cnt?special.special_out_pack_cnt:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Pack Grade
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <Autocomplete
            className={classes.textField}
            options = {[{key:'III', value:'very strong'},{key:'II', value:'strong'},{key:'I', value:'weak'}]}
            getOptionLabel = { option => option.value?option.value:'' }
            getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
            value={{value:
              [{key:'III', value:'very strong'},{key:'II', value:'strong'},{key:'I', value:'weak'}].find(v=> v.key == special.special_out_pack_grade)
              ?[{key:'III', value:'very strong'},{key:'II', value:'strong'},{key:'I', value:'weak'}].find(v=> v.key == special.special_out_pack_grade).value:''
            }}
            id="special_pack_group"
            onChange={(e, option)=>fncSelectCode(option?option.key:null, 'special_out_pack_grade', index)}
            renderInput={
              params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
          />
        </GridItem>
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Pack Group
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <Autocomplete
            className={classes.textField}
            options = {[{key:'1', value:'Great danger'},{key:'2', value:'Medium danger'},{key:'3', value:'Minor danger'}]}
            getOptionLabel = { option => option.value?option.value:'' }
            getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
            value={{value:
              [{key:'1', value:'Great danger'},{key:'2', value:'Medium danger'},{key:'3', value:'Minor danger'}].find(v=> v.key == special.special_pack_group)
              ?[{key:'1', value:'Great danger'},{key:'2', value:'Medium danger'},{key:'3', value:'Minor danger'}].find(v=> v.key == special.special_pack_group).value:''
            }}
            id="special_pack_group"
            onChange={(e, option)=>fncSelectCode(option?option.key:null, 'special_pack_group', index)}
            renderInput={
              params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
          />
        </GridItem>
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Gross Weight
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <CustomInput
            validtype="text"
            success={special.special_gross_weight?true:false}
            error={special.special_gross_weight?false:true}
            labelText=""
            maxLength="19"
            id="special_gross_weight"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_gross_weight?special.special_gross_weight:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Net Weight
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <CustomInput
            validtype="text"
            success={special.special_net_weight?true:false}
            error={special.special_net_weight?false:true}
            labelText=""
            maxLength="19"
            id="special_net_weight"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_net_weight?special.special_net_weight:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Tech Name
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <CustomInput
            validtype="text"
            success={special.special_tech_name?true:false}
            error={special.special_tech_name?false:true}
            labelText=""
            maxLength="70"
            id="special_tech_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_tech_name?special.special_tech_name:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        
        <GridItem xs={6} sm={1} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Pollutant
          </InputLabel>
        </GridItem>
        <GridItem xs={6} sm={2}>
          <Autocomplete
            className={classes.textField}
            options = {[{key:'NP', value:'비해양오염물지'},{key:'P', value:'해양오염물질'},{key:'PP', value:'심각한해양오염물질'}]}
            getOptionLabel = { option => option.value?option.value:'' }
            getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
            value={{value:
              [{key:'NP', value:'비해양오염물지'},{key:'P', value:'해양오염물질'},{key:'PP', value:'심각한해양오염물질'}].find(v=> v.key == special.special_pollutant)
              ?[{key:'NP', value:'비해양오염물지'},{key:'P', value:'해양오염물질'},{key:'PP', value:'심각한해양오염물질'}].find(v=> v.key == special.special_pollutant).value:''
            }}
            id="special_pack_group"
            onChange={(e, option)=>fncSelectCode(option?option.key:null, 'special_pollutant', index)}
            renderInput={
              params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Shipping Name
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={special.special_shipping_name?true:false}
            error={special.special_shipping_name?false:true}
            labelText=""
            maxLength="70"
            id="special_shipping_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_shipping_name?special.special_shipping_name:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
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
            success={special.special_user_name?true:false}
            error={special.special_user_name?false:true}
            labelText=""
            maxLength="17"
            id="special_user_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_user_name?special.special_user_name:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Dept
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={special.special_user_dept?true:false}
            error={special.special_user_dept?false:true}
            labelText=""
            maxLength="35"
            id="special_user_dept"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_user_dept?special.special_user_dept:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Tel
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={special.special_user_tel?true:false}
            error={special.special_user_tel?false:true}
            labelText=""
            maxLength="50"
            id="special_user_tel"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_user_tel?special.special_user_tel:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Fax
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={special.special_user_fax?true:false}
            error={special.special_user_fax?false:true}
            labelText=""
            maxLength="50"
            id="special_user_fax"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_user_fax?special.special_user_fax:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Email
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={special.special_user_email?true:false}
            error={special.special_user_email?false:true}
            labelText=""
            maxLength="50"
            id="special_user_email"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:special.special_user_email?special.special_user_email:'',
            onChange: (e)=>fncOnChange(e, index),
            onBlur: ()=>props.fncOnBlurSpecialBody(index, special),
            }}
            required={false}
            feedback="container"
          />
        </GridItem> */}
      </GridContainer>
    </Paper>
  );
}

export default SpecialCardBody;
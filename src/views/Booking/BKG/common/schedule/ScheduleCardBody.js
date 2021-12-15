import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormLabel, InputLabel } from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import moment from 'moment';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import {observer} from 'mobx-react-lite'

const ScheduleCard = observer(({booking, ...props}) => {
  // {console.log("schedule reload")}
  const classes = useStyles();
  const [schedule, setSchedule] = useState({});
  const [portCodeList, setPortCodeList] = useState([]);
  const {bookmarkYn} = props;

  // const booking = bookingStore.booking;

  useEffect(()=>{
    setSchedule(booking);
  },[booking]);

  useEffect(()=>{
    setPortCodeList( props.portCodeList );
  },[props.portCodeList])

  // Autocomplete 이벤트
  const fncSelectCode =(option, code)=> {
    if( 'sch_pol' === code ) {
      setSchedule({
        ...schedule,
        'sch_pol': option?option.port_code:null,
        'sch_pol_name': option?option.port_name:null
      });
      props.fncOnBlurParent({
        ...schedule,
        'sch_pol': option?option.port_code:null,
        'sch_pol_name': option?option.port_name:null,
      });
    } else if( 'sch_pod' === code ) {
      setSchedule({
        ...schedule,
        'sch_pod': option?option.port_code:null,
        'sch_pod_name': option?option.port_name:null,
      });
      props.fncOnBlurParent({
        ...schedule,
        'sch_pod': option?option.port_code:null,
        'sch_pod_name': option?option.port_name:null,
      });
    } else if( 'sch_pld' === code ) {
      setSchedule({
        ...schedule,
        'sch_pld': option?option.port_code:null,
        'sch_pld_name': option?option.port_name:null,
      });
      props.fncOnBlurParent({
        ...schedule,
        'sch_pld': option?option.port_code:null,
        'sch_pld_name': option?option.port_name:null,
      });
    } else if( 'sch_por' === code ) {
      setSchedule({
        ...schedule,
        'sch_por': option?option.port_code:null,
        'sch_por_name': option?option.port_name:null,
      });
      props.fncOnBlurParent({
        ...schedule,
        'sch_por': option?option.port_code:null,
        'sch_por_name': option?option.port_name:null,
      });
    } else if( 'sch_fdp' === code ) {
      setSchedule({
        ...schedule,
        'sch_fdp': option?option.port_code:null,
        'sch_fdp_name': option?option.port_name:null,
      });
      props.fncOnBlurParent({
        ...schedule,
        'sch_fdp': option?option.port_code:null,
        'sch_fdp_name': option?option.port_name:null,
      });
    } else {
      // setBooking({
      //   ...booking,
      //   [code]: option?option.value:null,
      // });
    }
    
  }

  const fncOnBlurPort=(e)=> {
    const key = e.target.id;
    const value = e.target.value.toUpperCase();
    const name = key+'_name';
    const port = portCodeList.filter(data=> {
      return data.port_code === value;
    });
    if( port && port.length > 0 ) {
      console.log(port[0].port_name, name)
      setSchedule({
        ...schedule,
        [key]: value?value:null,
        [name]: port[0].port_name,
      });
      props.fncOnBlurParent({
        ...schedule,
        [key]: value?value:null,
        [name]: port[0].port_name,
      });
    }
  }

  const fncOnBlurParentBody =(bkgParams)=> {
      props.fncOnBlurParent( bkgParams );
  }
  const fncOnChagneDate=(date, code)=>{
    setSchedule({
      ...schedule,
      [code]:date?moment(date,'YYYYMMDD').format('YYYYMMDD'):null
    });

    fncOnBlurParentBody({
      ...schedule,
      [code]:date?moment(date,'YYYYMMDD').format('YYYYMMDD'):null
    });
  }

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    // booking[key] = value;
    setSchedule({...booking, [key]:value});
  }

  return (
    <GridContainer>
      {/* {console.log("Schedule Card Body")} */}
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
              success={schedule .schedule_bookmark_name?true:false}
              error={schedule .schedule_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="schedule_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                value:schedule .schedule_bookmark_name?schedule .schedule_bookmark_name:'',
                onChange: (e)=>fncOnChange(e),
                onBlur: ()=>fncOnBlurParentBody(schedule ),
              }}
              required={true}
              feedback="deny"
              />
          </GridItem>
          <GridItem xs={12} sm={6} className={classes.gridLabel}>
            <FormLabel className={classes.labelHorizontal}>
            </FormLabel>
          </GridItem>
        </>
        :<></>
      }
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Vessel / voyage
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
      <CustomInput
          validtype="english"
          success={schedule .sch_vessel_name?true:false}
          error={schedule .sch_vessel_name?false:true}
          labelText=""
          maxLength="35"
          id="sch_vessel_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_vessel_name?schedule .sch_vessel_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
          }}
          required={('Y'===bookmarkYn)?false:true}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={1} sm={2} style={{textAlign:'-webkit-center', fontSize:'14px'}}>
        /
      </GridItem>
      <GridItem xs={11} sm={4}>
        <CustomInput
          validtype="english"
          success={schedule .sch_vessel_voyage?true:false}
          error={schedule .sch_vessel_voyage?false:true}
          labelText=""
          maxLength="17"
          id="sch_vessel_voyage"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_vessel_voyage?schedule .sch_vessel_voyage:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
          }}
          required={('Y'===bookmarkYn)?false:true}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Vessel Code
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="english"
          success={schedule .sch_vessel_code?true:false}
          error={schedule .sch_vessel_code?false:true}
          labelText=""
          maxLength="9"
          id="sch_vessel_code"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_vessel_code?schedule .sch_vessel_code:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
          }}
          required={false}
          feedback="schedule"
          />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Call Sign
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <CustomInput
          validtype="english"
          success={schedule .sch_call_sign?true:false}
          error={schedule .sch_call_sign?false:true}
          labelText=""
          maxLength="9"
          id="sch_call_sign"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_call_sign?schedule .sch_call_sign:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Port of Loading
        </InputLabel>
      </GridItem>
      <GridItem xs={4} sm={4}>
        <Autocomplete
          className={classes.textField}
          options = {portCodeList}
          getOptionLabel = { option => option.port_code?option.port_code:'' }
          getOptionSelected={(option, value) => option.port_code?option.port_code:'' === value.port_code?value.port_code:''}
          value={{port_code:
              portCodeList.find(v=>v.port_code === schedule .sch_pol)
              ?portCodeList.find(v=>v.port_code === schedule .sch_pol).port_code:''
          }}
          id="sch_pol"
          onChange={(e, option)=>fncSelectCode(option, 'sch_pol')}
          renderInput={
            params =>(
              <TextField
                inputProps={{maxLength:5}}
                {...params}
                label=""
                fullWidth
                error={('Y'===bookmarkYn)?false:schedule .sch_pol?false:true}
                helperText={('Y'===bookmarkYn)?false:schedule .sch_pol?null:'필수'}
                style={{marginBottom:'10px'}}
              />)}
        />
      </GridItem>
      <GridItem xs={8} sm={6}>
        <CustomInput
          validtype="english"
          success={schedule .sch_pol_name?true:false}
          error={schedule .sch_pol_name?false:true}
          labelText=""
          maxLength="35"
          id="sch_pol_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_pol_name?schedule .sch_pol_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Port of Discharge
        </InputLabel>
      </GridItem>
      <GridItem xs={4} sm={4}>
        <Autocomplete
          className={classes.textField}
          options = {portCodeList}
          getOptionLabel = { option => option.port_code?option.port_code:'' }
          getOptionSelected={(option, value) => option.port_code?option.port_code:'' === value.port_code?value.port_code:''}
          value={{port_code:
            portCodeList.find(v=>v.port_code === schedule .sch_pod)
            ?portCodeList.find(v=>v.port_code === schedule .sch_pod).port_code:''
          }}
          id="sch_pod"
          onChange={(e, option)=>fncSelectCode(option, 'sch_pod')}
          renderInput={
            params =>(
              <TextField
                inputProps={{maxLength:5}}
                {...params}
                label=""
                fullWidth
                error={('Y'===bookmarkYn)?false:schedule .sch_pod?false:true}
                helperText={('Y'===bookmarkYn)?false:schedule .sch_pod?null:'필수'}
                style={{marginBottom:'10px'}}
              />)}
        />
      </GridItem>
      <GridItem xs={8} sm={6}>
        <CustomInput
          validtype="english"
          success={schedule .sch_pod_name?true:false}
          error={schedule .sch_pod_name?false:true}
          labelText=""
          maxLength="35"
          id="sch_pod_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_pod_name?schedule .sch_pod_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          ETD
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}  style={{marginBottom: '10px'}}>
        <CalendarBox 
          className={classes.textField}
          labelText =""
          id="sch_etd"
          format="yyyy-MM-dd"
          setValue={schedule .sch_etd?moment(schedule .sch_etd).format('YYYY-MM-DD'):null}
          onChangeValue={date => fncOnChagneDate(date, 'sch_etd')}
          formControlProps={{fullWidth: true}}
        ></CalendarBox>
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          ETA
        </InputLabel>
      </GridItem>
      <GridItem xs={12} sm={4}  style={{marginBottom: '10px'}}>
        <CalendarBox 
          className={classes.textField}
          labelText =""
          id="sch_eta"
          format="yyyy-MM-dd"
          setValue={schedule .sch_eta?moment(schedule .sch_eta).format('YYYY-MM-DD'):null}
          onChangeValue={date => fncOnChagneDate(date, 'sch_eta')}
          formControlProps={{fullWidth: true}} 
        ></CalendarBox>
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Place of Receipt
        </InputLabel>
      </GridItem>
      <GridItem xs={4} sm={4}>
        {/* <Autocomplete
          className={classes.textField}
          options = {portCodeList}
          getOptionLabel = { option => option.port_code?option.port_code:'' }
          getOptionSelected={(option, value) => option.port_code?option.port_code:'' === value.port_code?value.port_code:''}
          value={{port_code:
            portCodeList.find(v=>v.port_code === schedule .sch_por)
            ?portCodeList.find(v=>v.port_code === schedule .sch_por).port_code:''
          }}
          id="sch_por"
          onChange={(e, option)=>fncSelectCode(option, 'sch_por')}
          renderInput={
            params =>(<TextField inputProps={{maxLength:5}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
        /> */}
        <CustomInput
          validtype="text"
          success={schedule .sch_por?true:false}
          error={schedule .sch_por?false:true}
          maxLength="5"
          id="sch_por"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_por?schedule .sch_por:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: (e)=>fncOnBlurPort(e ),
            placeholder: "예: KRINC"
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={8} sm={6}>
        <CustomInput
          validtype="english"
          success={schedule .sch_por_name?true:false}
          error={schedule .sch_por_name?false:true}
          maxLength="35"
          id="sch_por_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_por_name?schedule .sch_por_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
            placeholder: "Location Name (예: INCHEON, KOREA)"
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Place of Delivery
        </InputLabel>
      </GridItem>
      <GridItem xs={4} sm={4}>
        {/* <Autocomplete
          className={classes.textField}
          options = {portCodeList}
          getOptionLabel = { option => option.port_code?option.port_code:'' }
          getOptionSelected={(option, value) => option.port_code?option.port_code:'' === value.port_code?value.port_code:''}
          value={{port_code:
              portCodeList.find(v=>v.port_code === schedule .sch_pld)
              ?portCodeList.find(v=>v.port_code === schedule .sch_pld).port_code:''
          }}
          id="sch_pld"
          onChange={(e, option)=>fncSelectCode(option, 'sch_pld')}
          renderInput={
            params =>(<TextField inputProps={{maxLength:5}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
        /> */}
        <CustomInput
          validtype="text"
          success={schedule .sch_pld?true:false}
          error={schedule .sch_pld?false:true}
          maxLength="5"
          id="sch_pld"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_pld?schedule .sch_pld:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: (e)=>fncOnBlurPort(e ),
            placeholder: "예: KRINC"
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={8} sm={6}>
        <CustomInput
          validtype="english"
          success={schedule .sch_pld_name?true:false}
          error={schedule .sch_pld_name?false:true}
          maxLength="35"
          id="sch_pld_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_pld_name?schedule .sch_pld_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: (e)=>fncOnBlurParentBody(schedule ),
            placeholder: "Location Name (예: INCHEON, KOREA)"
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={12} sm={2} className={classes.gridLabel}>
        <InputLabel style={{ color: "#AAAAAA" }}>
          Final Destination
        </InputLabel>
      </GridItem>
      <GridItem xs={4} sm={4}>
        {/* <Autocomplete
          className={classes.textField}
          options = {portCodeList}
          getOptionLabel = { option => option.port_code?option.port_code:'' }
          getOptionSelected={(option, value) => option.port_code?option.port_code:'' === value.port_code?value.port_code:''}
          value={{port_code:
            portCodeList.find(v=>v.port_code === schedule .sch_fdp)
            ?portCodeList.find(v=>v.port_code === schedule .sch_fdp).port_code:''
          }}
          id="sch_fdp"
          onChange={(e, option)=>fncSelectCode(option, 'sch_fdp')}
          renderInput={
            params =>(<TextField inputProps={{maxLength:5}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
        /> */}
        <CustomInput
          validtype="text"
          success={schedule .sch_fdp?true:false}
          error={schedule .sch_fdp?false:true}
          maxLength="5"
          id="sch_fdp"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
          }}
          inputProps={{
            value:schedule .sch_fdp?schedule .sch_fdp:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: (e)=>fncOnBlurPort(e),
            placeholder: "예: KRINC"
          }}
          required={false}
          feedback="schedule"
        />
      </GridItem>
      <GridItem xs={8} sm={6}>
        <CustomInput
          validtype="english"
          success={schedule .sch_fdp_name?true:false}
          error={schedule .sch_fdp_name?false:true}
          maxLength="35"
          id="sch_fdp_name"
          formControlProps={{
            fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'},
          }}
          inputProps={{
            value:schedule .sch_fdp_name?schedule .sch_fdp_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>fncOnBlurParentBody(schedule ),
            placeholder: "Location Name (예: INCHEON, KOREA)"
          }}
          required={false}
          feedback="schedule"
        />
        
      </GridItem>
    </GridContainer>
  );
});


// 전달되는 nextProps가 prevProps 와 같으면 true 다르면 false 반환
function areEqual(prevProps, nextProps) {
  
  return (
    prevProps.openSchedule === nextProps.openSchedule
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.booking.schedule_bookmark_name === nextProps.booking.schedule_bookmark_name
    && prevProps.booking.sch_vessel_name === nextProps.booking.sch_vessel_name
    && prevProps.booking.sch_vessel_code === nextProps.booking.sch_vessel_code
    && prevProps.booking.sch_vessel_voyage === nextProps.booking.sch_vessel_voyage
    && prevProps.booking.sch_call_sign === nextProps.booking.sch_call_sign
    && prevProps.booking.sch_pol === nextProps.booking.sch_pol
    && prevProps.booking.sch_pol_name === nextProps.booking.sch_pol_name
    && prevProps.booking.sch_pod === nextProps.booking.sch_pod
    && prevProps.booking.sch_pod_name === nextProps.booking.sch_pod_name
    && prevProps.booking.sch_por === nextProps.booking.sch_por
    && prevProps.booking.sch_por_name === nextProps.booking.sch_por_name
    && prevProps.booking.sch_pld === nextProps.booking.sch_pld
    && prevProps.booking.sch_pld_name === nextProps.booking.sch_pld_name
    && prevProps.booking.sch_etd === nextProps.booking.sch_etd
    && prevProps.booking.sch_eta === nextProps.booking.sch_eta
    && prevProps.booking.sch_fdp === nextProps.booking.sch_fdp
    && prevProps.booking.sch_fdp_name === nextProps.booking.sch_fdp_name
    && prevProps.booking.vsl_type === nextProps.booking.vsl_type
    && prevProps.scheduleBookmarkList === nextProps.scheduleBookmarkList
    && prevProps.portCodeList === nextProps.portCodeList
    && prevProps.isOpen === nextProps.isOpen
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

export default React.memo(ScheduleCard, areEqual);
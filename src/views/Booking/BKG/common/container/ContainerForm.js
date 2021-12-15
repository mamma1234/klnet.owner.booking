import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import { TextField, Paper, Checkbox, InputLabel, IconButton, InputAdornment, FormControlLabel} from "@material-ui/core";
import { RemoveCircleOutline } from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import moment from 'moment';
import SpecialCardBody from "./SpecialCardBody";
import Typography from '@material-ui/core/Typography';
import Datetime from "react-datetime";

const ContainerForm = (props) => {
  const classes = useStyles();
  const [container, setContainer] = useState({});
  const [checkCntr, setCheckCntr] = useState(true);
  const [cntrCodeLineCodeList, setCntrCodeLineCodeList] = useState([]);
  const [containerSpecialList, setContainerSpecialList] = useState([]);
  const [lineCodeVesselPickup, setLineCodeVesselPickup] = useState([]);
  const [openCloseLimitList, setOpenCloseLimitList] = useState([
    {key:'FC', value:'Full close'},{key:'NC', value:'Not close'},{key:'FO', value:'Full open'},
    {key:'10O', value:'10% open'},{key:'20O', value:'20% open'},{key:'30O', value:'30% open'},
    {key:'40O', value:'40% open'},{key:'50O', value:'50% open'},{key:'60O', value:'60% open'},
    {key:'70O', value:'70% open'},{key:'80O', value:'80% open'},{key:'90O', value:'90% open'},
  ]);
  const [sizeInput, setSizeInput] = useState(true);
  const [temperatureInput, setTemperatureInput] = useState(true);
  const [doorInput, setDoorInput] = useState(false);

  const {index, bookmarkYn, booking, isTerm, isTransSelfYn } = props;

  // useEffect(()=>{
  //   if( booking ) {
  //     console.log( booking.trans_service_code);
  //   }
  // }, [booking.trans_service_code])
  useEffect(()=>{
    // console.log("CNTR ",props.container)
    setContainer(props.container);
  },[props.container]);
  
  useEffect(()=>{
    setCntrCodeLineCodeList(props.cntrCodeLineCodeList);
  },[props.cntrCodeLineCodeList]);

  useEffect(()=>{
    // console.log("SPECIAL ",props.containerSpecialList, container.cntr_seq)
    setContainerSpecialList(props.containerSpecialList);
  },[props.containerSpecialList]);
  

  useEffect(()=>{
    setLineCodeVesselPickup(props.lineCodeVesselPickup);
    if( container.cntr_pick_up_cy_code ) {
      // cntr_pick_up_cy_code 초기화
      if( props.lineCodeVesselPickup.length > 0 ) {
          
          let row = props.lineCodeVesselPickup.find( function( item ) {
              return item.pickup_cy_code === container.cntr_pick_up_cy_code;
          });
          if( !row ) {
              setContainer({...container
                , ['cntr_pick_up_cy_code']:null
                , ['cntr_pick_up_cy_name1']:null
                , ['cntr_pick_up_cy_name2']:null
                , ['cntr_pick_up_cy_address1']:null
                , ['cntr_pick_up_cy_address2']:null
                , ['cntr_pick_up_cy_address3']:null
                , ['cntr_pick_up_cy_address4']:null
                , ['cntr_pick_up_cy_address5']:null
                , ['cntr_cfs_code']:null
                , ['cntr_cfs_name1']:null
                , ['cntr_cfs_name2']:null
                , ['cntr_cfs_address1']:null
                , ['cntr_cfs_address2']:null
                , ['cntr_cfs_address3']:null
                , ['cntr_cfs_address4']:null
                , ['cntr_cfs_address5']:null
                ,'delete':'N'
              });
              props.fncOnBlurContainerBody( index, {
                ...container
                , ['cntr_pick_up_cy_code']:null
                , ['cntr_pick_up_cy_name1']:null
                , ['cntr_pick_up_cy_name2']:null
                , ['cntr_pick_up_cy_address1']:null
                , ['cntr_pick_up_cy_address2']:null
                , ['cntr_pick_up_cy_address3']:null
                , ['cntr_pick_up_cy_address4']:null
                , ['cntr_pick_up_cy_address5']:null
                , ['cntr_cfs_code']:null
                , ['cntr_cfs_name1']:null
                , ['cntr_cfs_name2']:null
                , ['cntr_cfs_address1']:null
                , ['cntr_cfs_address2']:null
                , ['cntr_cfs_address3']:null
                , ['cntr_cfs_address4']:null
                , ['cntr_cfs_address5']:null
                ,'delete':'N'
              });
          }
      }
    }
  }, [props.lineCodeVesselPickup]);


  useEffect(()=>{
    if( container.cntr_code) {
      // cntr size UT(OPEN TYPE) PF(FALT RACT) 인 경우 L, H, W 활성화
      console.log( container.cntr_code,container.cntr_code.indexOf('UT'),  container.cntr_code.indexOf('PF'), container.cntr_code.indexOf('UT') || container.cntr_code.indexOf('PF'))
      if( container.cntr_code.indexOf('UT') >0 || container.cntr_code.indexOf('PF') >0) {
        setSizeInput(false);
      } else {
        setSizeInput(true);
        setContainer({
          ...container,
          ['cntr_length']:null,
          ['cntr_width']:null,
          ['cntr_height']:null
        });
        props.fncOnBlurContainerBody(index, {
          ...container,
          ['cntr_length']:null,
          ['cntr_width']:null,
          ['cntr_height']:null
        });
      }
      // REFFER 인 경우 온도 개방율 수정 가능하다.
      if( container.cntr_code.indexOf('RE') >0 ) {
        setTemperatureInput(false);
        setContainer({
          ...container,
          ['cntr_frozen_tmp_unit']:'CEL',
        });
        props.fncOnBlurContainerBody(index, {
          ...container,
          ['cntr_frozen_tmp_unit']:'CEL',
        });
      } else {
        setTemperatureInput(true);
        setContainer({
          ...container,
          ['cntr_frozen_tmp_unit']:null,
          ['cntr_frozen_tmp']:null,
          ['cntr_frozen_fc']:null
        });
        props.fncOnBlurContainerBody(index, {
          ...container,
          ['cntr_frozen_tmp_unit']:null,
          ['cntr_frozen_tmp']:null,
          ['cntr_frozen_fc']:null
        });
      }
    }
  }, [container.cntr_code]);


  useEffect(()=>{
    // 자가운송인 경우 door지 입력 불가하도록
    if( "Y" === isTransSelfYn ) {
      setDoorInput(true);
      setContainer({
        ...container,
        ['cntr_door_date']: null,
        ['cntr_door_user_name']: null,
        ['cntr_door_user_tel']: null,
        ['cntr_door_address1']: null,
        ['cntr_door_address2']: null,
        ['cntr_door_address3']: null,
        ['cntr_door_address4']: null,
        ['cntr_door_address5']: null,
      });
      props.fncOnBlurContainerBody(index, {
        ...container,
        ['cntr_door_date']: null,
        ['cntr_door_user_name']: null,
        ['cntr_door_user_tel']: null,
        ['cntr_door_address1']: null,
        ['cntr_door_address2']: null,
        ['cntr_door_address3']: null,
        ['cntr_door_address4']: null,
        ['cntr_door_address5']: null,
      });
    } else {
      setDoorInput(false);
    }
  },[isTransSelfYn]);


  useEffect(()=>{
    if ( !(isTerm === '3'|| isTerm === '4'|| isTerm === '8') ) {
      setContainer({
        ...container,
        ['cntr_stock_date']:null,
        ['shor_trns_or_not']:null,
        ['shor_name']:null
      });
      props.fncOnBlurContainerBody(index, {
        ...container,
        ['cntr_stock_date']:null,
        ['shor_trns_or_not']:null,
        ['shor_name']:null
      });
    }
  },[isTerm])
  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    container[key] = value;
    setContainer({...container});
  }

  // AutoComplete
  const fncSelectCode =(option, code, index) => {
    setContainer({
      ...container,
      [code]: option,
      'delete':'N'
    });
    props.fncOnBlurContainerBody(index, {
      ...container,
      [code]: option,
      'delete':'N'
    });
  }




   // AutoComplete
   const fncSelectCodePickupCy =(option, code, index) => {
          setContainer({...container
              , ['cntr_pick_up_cy_code']:option?option.pickup_cy_code:null
              , ['cntr_pick_up_cy_name1']:option?option.pickup_cy_name1:null
              , ['cntr_pick_up_cy_name2']:option?option.pickup_cy_name2:null
              , ['cntr_pick_up_cy_address1']:option?option.pickup_cy_address1:null
              , ['cntr_pick_up_cy_address2']:option?option.pickup_cy_address2:null
              , ['cntr_pick_up_cy_address3']:option?option.pickup_cy_address3:null
              , ['cntr_pick_up_cy_address4']:null
              , ['cntr_pick_up_cy_address5']:null
              , ['cntr_cfs_code']:null
              , ['cntr_cfs_name1']:null
              , ['cntr_cfs_name2']:null
              , ['cntr_cfs_address1']:null
              , ['cntr_cfs_address2']:null
              , ['cntr_cfs_address3']:null
              , ['cntr_cfs_address4']:null
              , ['cntr_cfs_address5']:null
              ,'delete':'N'
          });
          props.fncOnBlurContainerBody(index, {
            ...container
            , ['cntr_pick_up_cy_code']:option?option.pickup_cy_code:null
            , ['cntr_pick_up_cy_name1']:option?option.pickup_cy_name1:null
            , ['cntr_pick_up_cy_name2']:option?option.pickup_cy_name2:null
            , ['cntr_pick_up_cy_address1']:option?option.pickup_cy_address1:null
            , ['cntr_pick_up_cy_address2']:option?option.pickup_cy_address2:null
            , ['cntr_pick_up_cy_address3']:option?option.pickup_cy_address3:null
            , ['cntr_pick_up_cy_address4']:null
            , ['cntr_pick_up_cy_address5']:null
            , ['cntr_cfs_code']:null
            , ['cntr_cfs_name1']:null
            , ['cntr_cfs_name2']:null
            , ['cntr_cfs_address1']:null
            , ['cntr_cfs_address2']:null
            , ['cntr_cfs_address3']:null
            , ['cntr_cfs_address4']:null
            , ['cntr_cfs_address5']:null
            ,'delete':'N'
          });
  }

  const fncCheckCntr =(element)=>{

    setContainer({
      ...container,
      ['cntr_yn']: (element.cntr_yn === 'Y'?'N':'Y'),
      'delete':'N'
    });
    props.fncOnBlurContainerBody(index, {
      ...container,
      ['cntr_yn']: (element.cntr_yn === 'Y'?'N':'Y'),
      'delete':'N'
    });
  }

  const fncDelContainer = (index)=>{
    props.fncDelContainer(index);
  }

  const fncOnChagneDateTime=(date, code)=>{
    const value = moment(date).format('YYYYMMDDHHmm');
    if( 'Invalid date' === value) {
      // value = null;
      setContainer({
        ...container,
        [code]:null,
      });
      props.fncOnBlurContainerBody(index, {
        ...container,
        [code]:null,
      });
    } else {
      setContainer({
        ...container,
        [code]:value,
      });
      props.fncOnBlurContainerBody(index, {
        ...container,
        [code]:value,
      });
    }
  }

  const fncOnChagneDate=(date, code)=>{
    const value = moment(date).format('YYYYMMDD');
    if( 'Invalid date' === value) {
      // value = null;
      setContainer({
        ...container,
        [code]:null,
      });
      props.fncOnBlurContainerBody(index, {
        ...container,
        [code]:null,
      });
    } else {
      setContainer({
        ...container,
        [code]:value,
      });
      props.fncOnBlurContainerBody(index, {
        ...container,
        [code]:value,
      });
    }
  }

    // Special 자식 부모 처리
    const fncOnBlurSpecialBody=(index, special)=>{
      // console.log(index, special)
      containerSpecialList[index] = special;
      setContainerSpecialList([...containerSpecialList]);
      props.fncOnBlurSpecialList([...containerSpecialList]);
    }

return (
    <React.Fragment>
        <Paper className={classes.paper} key={"CNTR_BODY_"+index} style={{paddingTop: '0px', marginTop: '0px'}}>
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
                  success={container.container_bookmark_name?true:false}
                  error={container.container_bookmark_name?false:true}
                  labelText=""
                  maxLength="50"
                  id="container_bookmark_name"
                  formControlProps={{
                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                  }}
                  inputProps={{
                      value:container.container_bookmark_name?container.container_bookmark_name:'',
                  onChange: (e)=>fncOnChange(e),
                  // onBlur: ()=>props.fncOnBlur(container),
                  }}
                  required={true}
                  feedback="deny"
                />
              </GridItem>
              <GridItem xs={12} sm={6} className={classes.gridLabel}>
              </GridItem>
            </>
            :
            <>
              <GridItem xs={3} sm={3}>
                <Checkbox checked={('Y' === container.cntr_yn )?true:false} onChange={()=>fncCheckCntr(container)} inputProps={{'aria-label':'secondary checkbox'}}></Checkbox>
                <Typography variant='h6'>{container.cntr_code}</Typography>
              </GridItem>
              <GridItem xs={9} sm={9} style={{textAlign: 'right'}}>
                <IconButton onClick={()=>fncDelContainer(index)}>
                  <RemoveCircleOutline fontSize={'large'} />
                </IconButton>
              </GridItem>
            </>}
            
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Size / Type
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <Autocomplete
                className={classes.textField}
                options = {cntrCodeLineCodeList}
                getOptionLabel = { option => option.cntr_code_name?option.cntr_code_name||'':'' }
                getOptionSelected={(option, value) => option.cntr_code_name?option.cntr_code_name:'' === value.cntr_code_name?value.cntr_code_name:''}
                value={{cntr_code_name:
                  cntrCodeLineCodeList.find(v=> v.cntr_code === container.cntr_code)
                  ?cntrCodeLineCodeList.find(v=> v.cntr_code === container.cntr_code).cntr_code_name:''
                }}
                id="cntr_code"
                onChange={(e, option)=>fncSelectCode(option?option.cntr_code:null, 'cntr_code', index)}
                renderInput={
                  params =>(
                    <TextField
                      inputProps={{maxLength:30}}
                      {...params}
                      label=""
                      fullWidth
                      error={('Y'===bookmarkYn)?false:container.cntr_code?false:true}
                      helperText={('Y'===bookmarkYn)?false:container.cntr_code?null:'필수'}
                      style={{marginBottom:'10px'}}
                    />)}
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Qty
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="number"
                success={('Y'===bookmarkYn)?false:container.cntr_qty?true:false}
                error={('Y'===bookmarkYn)?false:container.cntr_qty?false:true}
                labelText=""
                maxLength="4"
                id="cntr_qty"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_qty?container.cntr_qty:'',
                  onChange: (e)=>fncOnChange(e),
                  onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                }}
                required={('Y'===bookmarkYn)?false:true}
                feedback="container"
              />
            </GridItem>
            {/* <GridContainer> */}
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                온도
              </InputLabel>
            </GridItem>

            <GridItem xs={6} sm={2}>
              <Autocomplete
                className={classes.textField}
                options = {[{key:'CEL', value:'섭씨'}]}
                getOptionLabel = { option => option.value?option.value:'' }
                getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
                inputValue={
                  [{key:'CEL', value:'섭씨'}].find(v=> v.key == container.cntr_frozen_tmp_unit)
                  ?[{key:'CEL', value:'섭씨'}].find(v=> v.key == container.cntr_frozen_tmp_unit).value:''
                }
                disabled= {temperatureInput}
                id="cntr_frozen_tmp_unit"
                onChange={(e, option)=>fncSelectCode(option?option.key:null, 'cntr_frozen_tmp_unit', index)}
                renderInput={
                  params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
              />
            </GridItem>
              <GridItem xs={6} sm={2}>
                <CustomInput
                  validtype="number"
                  success={false}
                  error={false}
                  labelText=""
                  maxLength="15"
                  id="cntr_frozen_tmp"
                  formControlProps={{
                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'},
                    disabled: temperatureInput
                  }}
                  inputProps={{
                    endAdornment:<InputAdornment position="end">℃</InputAdornment>,
                    value:container.cntr_frozen_tmp?container.cntr_frozen_tmp:'',
                    onChange: (e)=>fncOnChange(e),
                    onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                  }}
                  required={false}
                  feedback="container"
                />
              </GridItem>
              <GridItem xs={12} sm={2} className={classes.gridLabel}>
                <InputLabel style={{ color: "#AAAAAA" }}>
                  개방율
                </InputLabel>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Autocomplete
                    className={classes.textField}
                    options = {openCloseLimitList}
                    getOptionLabel = { option => option.value?option.value:'' }
                    getOptionSelected={(option, value) => option.value?option.value:'' === value.value?value.value:''}
                    inputValue={
                      openCloseLimitList.find(v=> v.key == container.cntr_frozen_fc)
                      ?openCloseLimitList.find(v=> v.key == container.cntr_frozen_fc).value:''
                    }
                    disabled= {temperatureInput}
                    id="cntr_frozen_fc"
                    onChange={(e, option)=>fncSelectCode(option?option.key:null, 'cntr_frozen_fc', index)}
                    renderInput={
                      params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
                  />
              </GridItem>
            {/* </GridContainer> */}
            
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                SOC 여부
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <Autocomplete
                  options = {[{key:'Y'},{key:'N'}]}
                  getOptionLabel = { option => option.key?option.key:'' }
                  getOptionSelected={(option, value) => option.key?option.key:'' === value.key?value.key:''}
                  value={{key:
                    [{key:'Y'},{key:'N'}].find(v=>v.key === container.cntr_soc_yn)
                    ?[{key:'Y'},{key:'N'}].find(v=>v.key === container.cntr_soc_yn).key:''
                  }}
                  id="cntr_soc_yn"
                  onChange={(e, option)=>fncSelectCode(option?option.key:null, 'cntr_soc_yn', index)}
                  renderInput={
                    params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Size
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
                <GridContainer>
                    <GridItem xs={4} sm={4}>
                        <CustomInput
                            validtype="number"
                            
                            success={false}
                            error={false}
                            labelText=""
                            maxLength="15"
                            id="cntr_length"
                            formControlProps={{
                                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'},
                                disabled: sizeInput
                            }}
                            inputProps={{
                                endAdornment:<InputAdornment position="end">Lenth</InputAdornment>,
                                value:container.cntr_length?container.cntr_length:'',
                                onChange: (e)=>fncOnChange(e),
                                onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                            }}
                            required={false}
                            feedback="container"
                        />
                    </GridItem>
                    <GridItem xs={4} sm={4}>
                        <CustomInput
                            validtype="number"
                            
                            success={false}
                            error={false}
                            labelText=""
                            maxLength="15"
                            id="cntr_width"
                            formControlProps={{
                                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'},
                                disabled: sizeInput
                            }}
                            inputProps={{
                                endAdornment:<InputAdornment position="end">widtrh</InputAdornment>,
                                value:container.cntr_width?container.cntr_width:'',
                                onChange: (e)=>fncOnChange(e),
                                onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                            }}
                            required={false}
                            feedback="container"
                        />
                    </GridItem>
                    <GridItem xs={4} sm={4}>
                        <CustomInput
                            validtype="number"
                            success={false}
                            error={false}
                            labelText=""
                            maxLength="15"
                            id="cntr_height"
                            formControlProps={{
                              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'},
                              disabled: sizeInput
                            }}
                            inputProps={{
                                endAdornment:<InputAdornment position="end">height</InputAdornment>,
                                value:container.cntr_height?container.cntr_height:'',
                                onChange: (e)=>fncOnChange(e),
                                onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                            }}
                            required={false}
                            feedback="container"
                        />
                    </GridItem>
                </GridContainer>
            </GridItem>
            
            {/* <GridItem className={classes.grid} lg={6} md={6} sm={6} xs={12}>
              <GridContainer> */}
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    Remark
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_remark1?true:false}
                    error={container.cntr_remark1?false:true}
                    labelText=""
                    maxLength="70"
                    id="cntr_remark1"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_remark1?container.cntr_remark1:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={!container.cntr_remark1&&container.cntr_remark2?true:false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_remark2?true:false}
                    error={container.cntr_remark2?false:true}
                    labelText=""
                    maxLength="70"
                    id="cntr_remark2"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_remark2?container.cntr_remark2:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_remark3?true:false}
                    error={container.cntr_remark3?false:true}
                    labelText=""
                    maxLength="70"
                    id="cntr_remark3"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_remark3?container.cntr_remark3:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_remark4?true:false}
                    error={container.cntr_remark4?false:true}
                    labelText=""
                    maxLength="70"
                    id="cntr_remark4"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_remark4?container.cntr_remark4:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_remark5?true:false}
                    error={container.cntr_remark5?false:true}
                    labelText=""
                    maxLength="70"
                    id="cntr_remark5"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_remark5?container.cntr_remark5:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem> */}
              {/* </GridContainer>
            </GridItem> */}
          </GridContainer>
        </Paper>
        {(containerSpecialList && containerSpecialList.length>0)?containerSpecialList.map((data, index)=>{
        if( data.cntr_seq == container.cntr_seq) {
          return(
            <SpecialCardBody
              key={"SPECIAL_"+index}
              container={container}
              index={index}
              special={data}
              isCargoType={props.isCargoType}
              fncOnBlurSpecialBody={fncOnBlurSpecialBody}
              bookmarkYn={'N'}
              containerSpecialList={containerSpecialList}
            />
        )
        }
        }):<></>}

        <GridContainer>
          <GridItem className={classes.grid} lg={6} md={12} sm={12} xs={12}>
            <Paper className={classes.paper} key={"Pick"+index} style={{height: '428px'}}>
              <GridItem xs={11} sm={11}>
                <Typography variant='h6'>
                  Pick Up CY
                </Typography>
              </GridItem>
              <br/>
              <GridContainer>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    CY Name
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  {/* <CustomInput
                    validtype="text"
                    success={container.cntr_pick_up_cy_name1?true:false}
                    error={container.cntr_pick_up_cy_name1?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_name1"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                        value:container.cntr_pick_up_cy_name1?container.cntr_pick_up_cy_name1:'',
                    onChange: (e)=>fncOnChange(e),
                    onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                    }}
                    required={false}
                    feedback="container"
                  /> */}
                  <Autocomplete
                    className={classes.textField}
                    options = {lineCodeVesselPickup}
                    getOptionLabel = { option => option.pickup_cy_name?option.pickup_cy_name||'':'' }
                    getOptionSelected={(option, value) => option.pickup_cy_name?option.pickup_cy_name:'' === value.pickup_cy_name?value.pickup_cy_name:''}
                    value={{pickup_cy_name:
                      lineCodeVesselPickup.find(v=> v.pickup_cy_code === container.cntr_pick_up_cy_code)
                      ?lineCodeVesselPickup.find(v=> v.pickup_cy_code === container.cntr_pick_up_cy_code).pickup_cy_name:''
                    }}
                    id="cntr_pick_up_cy_code"
                    onChange={(e, option)=>fncSelectCodePickupCy(option, 'cntr_pick_up_cy_code', index)}
                    renderInput={
                      params =>(
                        <TextField
                          inputProps={{maxLength:30}}
                          {...params}
                          label=""
                          fullWidth
                          error={('Y'===bookmarkYn)?false:container.cntr_pick_up_cy_code?false:true}
                          helperText={('Y'===bookmarkYn)?false:container.cntr_pick_up_cy_code?null:'필수'}
                          style={{marginBottom:'10px'}}
                        />)}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    Pick Up CY Code
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_pick_up_cy_code?true:false}
                    error={container.cntr_pick_up_cy_code?false:true}
                    labelText=""
                    maxLength="10"
                    id="cntr_pick_up_cy_code"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                        value:container.cntr_pick_up_cy_code?container.cntr_pick_up_cy_code:'',
                    onChange: (e)=>fncOnChange(e),
                    onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_pick_up_cy_name2?true:false}
                    error={container.cntr_pick_up_cy_name2?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_name2"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                        value:container.cntr_pick_up_cy_name2?container.cntr_pick_up_cy_name2:'',
                    onChange: (e)=>fncOnChange(e),
                    onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem> */}
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    CY Date
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9} style={{marginBottom: '10px'}}>
                  <CalendarBox 
                    className={classes.textField}
                    labelText =""
                    id="cntr_pick_up_cy_date"
                    format="yyyy-MM-dd"
                    setValue={container.cntr_pick_up_cy_date?moment(container.cntr_pick_up_cy_date).format('YYYY-MM-DD'):null}
                    onChangeValue={date => fncOnChagneDate(date, 'cntr_pick_up_cy_date')}
                    formControlProps={{fullWidth: true}} 
                    
                  ></CalendarBox>
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    Address
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_pick_up_cy_address1?true:false}
                    error={container.cntr_pick_up_cy_address1?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_address1"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_pick_up_cy_address1?container.cntr_pick_up_cy_address1:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={!container.cntr_pick_up_cy_address1&&(container.cntr_pick_up_cy_address2||container.cntr_pick_up_cy_address3||container.cntr_pick_up_cy_address4||container.cntr_pick_up_cy_address5)?true:false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_pick_up_cy_address2?true:false}
                    error={container.cntr_pick_up_cy_address2?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_address2"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_pick_up_cy_address2?container.cntr_pick_up_cy_address2:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_pick_up_cy_address3?true:false}
                    error={container.cntr_pick_up_cy_address3?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_address3"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_pick_up_cy_address3?container.cntr_pick_up_cy_address3:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_pick_up_cy_address4?true:false}
                    error={container.cntr_pick_up_cy_address4?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_address4"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_pick_up_cy_address4?container.cntr_pick_up_cy_address4:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_pick_up_cy_address5?true:false}
                    error={container.cntr_pick_up_cy_address5?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_pick_up_cy_address5"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_pick_up_cy_address5?container.cntr_pick_up_cy_address5:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
              </GridContainer>
            </Paper>
          </GridItem>
          <GridItem className={classes.grid} lg={6} md={12} sm={12} xs={12}>
            <Paper className={classes.paper} key={"DOOR_"+index}>
              <GridItem xs={11} sm={11}>
                <Typography variant='h6'>
                  Door
                </Typography>
              </GridItem>
              <br/>
              <GridContainer>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    Date
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}  style={{marginBottom: '10px'}}>
                  {doorInput?
                  <CustomInput
                  validtype="text"
                  labelText=""
                  maxLength="17"
                  id="temp"
                  formControlProps={{
                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                  }}
                  inputProps={{
                    value:'',
                    disabled: doorInput,
                  }}
                  required={false}
                  feedback="container"
                  />
                  
                :
                  
                <Datetime
                value={container.cntr_door_date?moment(container.cntr_door_date, 'YYYY-MM-DD HH:mm'):null}
                onChange={date => fncOnChagneDateTime(date, 'cntr_door_date')}
                dateFormat="YYYY-MM-DD"
                timeFormat='HH:mm'
                // disabled= {transSelfYn}
                feedback="container"
                renderInput={
                  (params)=><TextField
                    {...params}
                    fullWidth
                    error={false}
                    
                    // helperText={
                    //   container.cntr_door_date?null:'필수'}
                    name="container"
                    />
                  }
              >
              </Datetime>
                  }
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    P.I.C Name
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="english"
                    success={container.cntr_door_user_name?true:false}
                    error={container.cntr_door_user_name?false:true}
                    labelText=""
                    maxLength="17"
                    id="cntr_door_user_name"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_door_user_name?container.cntr_door_user_name:'',
                      onChange: (e)=>fncOnChange(e),
                      // onBlur: ()=>console.log(index, container),
                      disabled: doorInput,
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={3} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    Tel
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={9}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_door_user_tel?true:false}
                    error={container.cntr_door_user_tel?false:true}
                    labelText=""
                    maxLength="25"
                    id="cntr_door_user_tel"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_door_user_tel?container.cntr_door_user_tel:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      disabled: doorInput
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        Address
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="english"
                        success={container.cntr_door_address1?true:false}
                        error={container.cntr_door_address1?false:true}
                        labelText=""
                        maxLength="35"
                        id="cntr_door_address1"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_address1?container.cntr_door_address1:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                          disabled: doorInput
                        }}
                        required={!container.cntr_door_address1&&(container.cntr_door_address2||container.cntr_door_address3||container.cntr_door_address4||container.cntr_door_address5)?true:false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="english"
                        success={container.cntr_door_address2?true:false}
                        error={container.cntr_door_address2?false:true}
                        labelText=""
                        maxLength="35"
                        id="cntr_door_address2"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_address2?container.cntr_door_address2:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                          disabled: doorInput
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="english"
                        success={container.cntr_door_address3?true:false}
                        error={container.cntr_door_address3?false:true}
                        labelText=""
                        maxLength="35"
                        id="cntr_door_address3"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_address3?container.cntr_door_address3:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                          disabled: doorInput
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="english"
                        success={container.cntr_door_address4?true:false}
                        error={container.cntr_door_address4?false:true}
                        labelText=""
                        maxLength="35"
                        id="cntr_door_address4"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_address4?container.cntr_door_address4:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                          disabled: doorInput
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="english"
                        success={container.cntr_door_address5?true:false}
                        error={container.cntr_door_address5?false:true}
                        labelText=""
                        maxLength="35"
                        id="cntr_door_address5"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_address5?container.cntr_door_address5:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                          disabled: doorInput
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                  {/* </GridContainer>
                </GridItem> */}
              </GridContainer>
            </Paper>
          </GridItem>
        </GridContainer>
        
        
        <Paper className={classes.paper} key={"CFS_"+index}>
          <GridItem xs={11} sm={11}>
            <Typography variant='h6'>
              CFS
            </Typography>
          </GridItem>
          <GridContainer>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                입고 일시
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CalendarBox 
                className={classes.textField}
                labelText =""
                id="cntr_stock_date"
                format="yyyy-MM-dd"
                setValue={container.cntr_stock_date?moment(container.cntr_stock_date).format('YYYY-MM-DD'):null}
                onChangeValue={date => fncOnChagneDate(date, 'cntr_stock_date')}
                formControlProps={{
                  fullWidth: true,
                  
                }}
                disabled={ (isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:true}
              ></CalendarBox>
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                쇼링 업체
              </InputLabel>
            </GridItem>
            <GridItem xs={6} sm={1}>
              <Autocomplete
                className={classes.textField}
                options = {[{value:'L', label:'라인'},{value:'S', label:'자가'},{value:'N', label:'없음'}]}
                getOptionLabel = { option => option.label?option.label:'' }
                getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
                value={{label:
                  [{value:'L', label:'라인'},{value:'S', label:'자가'},{value:'N', label:'없음'}].find(v=>v.value === container.shor_trns_or_not)
                  ?[{value:'L', label:'라인'},{value:'S', label:'자가'},{value:'N', label:'없음'}].find(v=>v.value === container.shor_trns_or_not).label:''
                }}
                id="shor_trns_or_not"
                onChange={(e, option)=>fncSelectCode(option?option.value:null, 'shor_trns_or_not')}
                disabled= {(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:true}
                renderInput={
                  params =>(
                  <TextField
                    inputProps={{maxLength:30}}
                    {...params}
                    label=""
                    fullWidth
                    disabled= {(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:true}
                    // required={('Y'===bookmarkYn)?false:true}
                    // error={('Y'===bookmarkYn)?false:container.shor_trns_or_not?false:true}
                    // helperText={('Y'===bookmarkYn)?false:container.shor_trns_or_not?null:'필수'}
                  />)}
              />
            </GridItem>
            <GridItem xs={6} sm={3}>
              <CustomInput
                validtype="english"
                success={container.shor_name?true:false}
                error={container.shor_name?false:true}
                labelText=""
                maxLength="30"
                id="shor_name"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.shor_name?container.shor_name:'',
                  onChange: (e)=>fncOnChange(e),
                  onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                  disabled: (isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:true
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
          </GridContainer>
        </Paper>





        


      {/* {(booking && (isTerm === '3'
      || isTerm === '4'
      || isTerm === '8' ) ) 
      ? 
        <Paper className={classes.paper} key={"CFS_"+index}>
          <GridItem xs={11} sm={11}>
            <Typography variant='h6'>
              CFS
            </Typography>
          </GridItem>
          <GridContainer>
            
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                CFS Name
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="text"
                success={container.cntr_cfs_name1?true:false}
                error={container.cntr_cfs_name1?false:true}
                labelText=""
                maxLength="35"
                id="cntr_cfs_name1"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_cfs_name1?container.cntr_cfs_name1:'',
                  onChange: (e)=>fncOnChange(e),
                  // onBlur: ()=>console.log(index, container),
                  // disabled: transSelfYn
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                CFS Code
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="text"
                success={container.cntr_cfs_code?true:false}
                error={container.cntr_cfs_code?false:true}
                labelText=""
                maxLength="35"
                id="cntr_cfs_code"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_cfs_code?container.cntr_cfs_code:'',
                  onChange: (e)=>fncOnChange(e),
                  // onBlur: ()=>console.log(index, container),
                  // disabled: transSelfYn
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="text"
                success={container.cntr_cfs_name2?true:false}
                error={container.cntr_cfs_name2?false:true}
                labelText=""
                maxLength="35"
                id="cntr_cfs_name2"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_cfs_name2?container.cntr_cfs_name2:'',
                  onChange: (e)=>fncOnChange(e),
                  onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                  // disabled: transSelfYn
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
            <GridItem xs={12} sm={6} className={classes.gridLabel}>
            </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    CFS Address
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_cfs_address1?true:false}
                    error={container.cntr_cfs_address1?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_cfs_address1"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_cfs_address1?container.cntr_cfs_address1:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_cfs_address2?true:false}
                    error={container.cntr_cfs_address2?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_cfs_address2"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_cfs_address2?container.cntr_cfs_address2:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_cfs_address3?true:false}
                    error={container.cntr_cfs_address3?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_cfs_address3"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_cfs_address3?container.cntr_cfs_address3:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_cfs_address4?true:false}
                    error={container.cntr_cfs_address4?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_cfs_address4"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_cfs_address4?container.cntr_cfs_address4:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_cfs_address5?true:false}
                    error={container.cntr_cfs_address5?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_cfs_address5"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_cfs_address5?container.cntr_cfs_address5:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
          </GridContainer>
        </Paper>
      :
        <Paper className={classes.paper} key={"DROP_"+index}>
          <GridItem xs={11} sm={11}>
            <Typography variant='h6'>
              Drop Off
            </Typography>
          </GridItem>
          <br />
          <GridContainer>
            
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                CY Name
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="text"
                success={container.cntr_drop_off_cy_name1?true:false}
                error={container.cntr_drop_off_cy_name1?false:true}
                labelText=""
                maxLength="35"
                id="cntr_drop_off_cy_name1"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_drop_off_cy_name1?container.cntr_drop_off_cy_name1:'',
                  onChange: (e)=>fncOnChange(e),
                  // onBlur: ()=>console.log(index, container),
                  // disabled: transSelfYn
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
              CY Code
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="text"
                success={container.cntr_drop_off_cy_code?true:false}
                error={container.cntr_drop_off_cy_code?false:true}
                labelText=""
                maxLength="35"
                id="cntr_drop_off_cy_code"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_drop_off_cy_code?container.cntr_drop_off_cy_code:'',
                  onChange: (e)=>fncOnChange(e),
                  // onBlur: ()=>console.log(index, container),
                  // disabled: transSelfYn
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="text"
                success={container.cntr_drop_off_cy_name2?true:false}
                error={container.cntr_drop_off_cy_name2?false:true}
                labelText=""
                maxLength="35"
                id="cntr_drop_off_cy_name2"
                formControlProps={{
                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                }}
                inputProps={{
                  value:container.cntr_drop_off_cy_name2?container.cntr_drop_off_cy_name2:'',
                  onChange: (e)=>fncOnChange(e),
                  onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                  // disabled: transSelfYn
                }}
                required={false}
                feedback="container"
              />
            </GridItem>
            <GridItem xs={12} sm={6} className={classes.gridLabel}>
            </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  CY Address
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_drop_off_cy_address1?true:false}
                    error={container.cntr_drop_off_cy_address1?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_drop_off_cy_address1"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_drop_off_cy_address1?container.cntr_drop_off_cy_address1:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_drop_off_cy_address2?true:false}
                    error={container.cntr_drop_off_cy_address2?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_drop_off_cy_address2"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_drop_off_cy_address2?container.cntr_drop_off_cy_address2:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_drop_off_cy_address3?true:false}
                    error={container.cntr_drop_off_cy_address3?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_drop_off_cy_address3"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_drop_off_cy_address3?container.cntr_drop_off_cy_address3:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_drop_off_cy_address4?true:false}
                    error={container.cntr_drop_off_cy_address4?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_drop_off_cy_address4"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_drop_off_cy_address4?container.cntr_drop_off_cy_address4:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
                <GridItem xs={12} sm={2} className={classes.gridLabel}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                  </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    validtype="text"
                    success={container.cntr_drop_off_cy_address5?true:false}
                    error={container.cntr_drop_off_cy_address5?false:true}
                    labelText=""
                    maxLength="35"
                    id="cntr_drop_off_cy_address5"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                      value:container.cntr_drop_off_cy_address5?container.cntr_drop_off_cy_address5:'',
                      onChange: (e)=>fncOnChange(e),
                      onBlur: ()=>props.fncOnBlurContainerBody(index, container),
                      // disabled: transSelfYn
                    }}
                    required={false}
                    feedback="container"
                  />
                </GridItem>
          </GridContainer>
        </Paper>
      } */}


      {/* </GridContainer> */}

    </React.Fragment>
)
}

export default ContainerForm;
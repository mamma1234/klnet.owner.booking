import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import { TextField, Paper, Checkbox, InputLabel, IconButton, InputAdornment } from "@material-ui/core";
import {RemoveCircleOutline} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import moment from 'moment';
// import SpecialCardBody from "./SpecialCardBody";
import Typography from '@material-ui/core/Typography';
import axios from "axios";


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
  const [frozenInput, setFrozenInput] = useState(true);
  const [doorInput, setDoorInput] = useState(false);

  const {index, bookmarkYn, isTerm, isTransSelfYn, isSchEtd, lineCodeVesselCfs } = props;

  // useEffect(()=>{
  //   if( booking ) {
  //     console.log( booking.trans_service_code);
  //   }
  // }, [booking.trans_service_code])

  useEffect(()=>{
    // console.log( container.cntr_pick_up_cy_date , isSchEtd, moment(isSchEtd).subtract(1,'d').format('YYYYMMDD'))
    // if( !container.cntr_pick_up_cy_date ) {
      setContainer({...container
        , ['cntr_pick_up_cy_date']:moment(isSchEtd).subtract(1,'d').format('YYYYMMDD')
      });
      props.fncOnBlurContainerBody( index, {
        ...container
        , ['cntr_pick_up_cy_date']:moment(isSchEtd).subtract(1,'d').format('YYYYMMDD')
      });
    // }
  },[isSchEtd]);

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
      // console.log( container.cntr_code,container.cntr_code.indexOf('UT'),  container.cntr_code.indexOf('PF'), container.cntr_code.indexOf('UT') || container.cntr_code.indexOf('PF'))
      if( container.cntr_code.indexOf('UT') >0 || container.cntr_code.indexOf('PF') >0) {
        setSizeInput(false);
        setLineCodeVesselPickup(props.lineCodeVesselPickup);
      }else if( container.cntr_code.indexOf('RE') >0 ) {
        setFrozenInput(false);
        let params={
          line_code: 'WDFC',
          cntr_code: container.cntr_code
        }
        selectLineCodeSztpPickup(params);
      } else {
        setSizeInput(true);
        setFrozenInput(true);
        setLineCodeVesselPickup(props.lineCodeVesselPickup);
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
  },[isTransSelfYn])

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    container[key] = value;
    setContainer({...container});
  }

  // AutoComplete
  const fncSelectCode =(option, code, index) => {
    // console.log(option, code)
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
      if( 'cntr_cfs_code' === code ) {
        setContainer({
          ...container
          , ['cntr_cfs_code']:option?option.cfs_code:null
          , ['cntr_cfs_name1']:option?option.cfs_name:null
          , ['cntr_cfs_name2']:null
          , ['cntr_cfs_address1']:option?option.cfs_address:null
          , ['cntr_cfs_address2']:null
          , ['cntr_cfs_address3']:null
          , ['cntr_cfs_address4']:null
          , ['cntr_cfs_address5']:null
          , ['cntr_pick_up_cy_code']:null
          , ['cntr_pick_up_cy_name1']:null
          , ['cntr_pick_up_cy_name2']:null
          , ['cntr_pick_up_cy_address1']:null
          , ['cntr_pick_up_cy_address2']:null
          , ['cntr_pick_up_cy_address3']:null
          , ['cntr_pick_up_cy_address4']:null
          , ['cntr_pick_up_cy_address5']:null
          , ['cntr_pick_up_cy_date']:null
          ,'delete':'N'
        });
        props.fncOnBlurContainerBody(index, {
          ...container
          , ['cntr_cfs_code']:option?option.cfs_code:null
          , ['cntr_cfs_name1']:option?option.cfs_name:null
          , ['cntr_cfs_name2']:null
          , ['cntr_cfs_address1']:option?option.cfs_address:null
          , ['cntr_cfs_address2']:null
          , ['cntr_cfs_address3']:null
          , ['cntr_cfs_address4']:null
          , ['cntr_cfs_address5']:null
          , ['cntr_pick_up_cy_code']:null
          , ['cntr_pick_up_cy_name1']:null
          , ['cntr_pick_up_cy_name2']:null
          , ['cntr_pick_up_cy_address1']:null
          , ['cntr_pick_up_cy_address2']:null
          , ['cntr_pick_up_cy_address3']:null
          , ['cntr_pick_up_cy_address4']:null
          , ['cntr_pick_up_cy_address5']:null
          , ['cntr_pick_up_cy_date']:null
          ,'delete':'N'
        });
      } else if ('cntr_pick_up_cy_code' === code ) {
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
    // if( index === 0 ) {
    //   setContainer({'cntr_seq':1});
    //   props.fncOnBlurContainerBody(index, {'cntr_seq':1, 'delete':'Y'});
    // } else {
    //     setContainer({'delete':'Y'});
    //     props.fncOnBlurContainerBody(index, {'delete':'Y'});
    // }
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


    const selectLineCodeSztpPickup = (params) => {
      axios.post(
          "/shipper/selectLineCodeSztpPickup"
          ,{ params }
          ,{}
      ).then(res=>{
          setLineCodeVesselPickup(res.data);
          // pickup cy 조회의 경우 Vessel 정보가 변경될때 같이 변경되어야 한다.
          // Vessel 정보가 변경될 경우 기존 코드값과 일치하는게 없으면
          // cntr_pick_up_cy_code 초기화
          if( res.data.length > 0 && container.cntr_pick_up_cy_code ) {
              
            let row = res.data.find( function( item ) {
                return item.pickup_cy_code === container.cntr_pick_up_cy_code;
            });
            if( !row ) {
              setContainer({
                ...container,
                ['cntr_pick_up_cy_code']: null,
                ['cntr_pick_up_cy_code']: null,
                ['cntr_pick_up_cy_name1']: null,
                ['cntr_pick_up_cy_name2']: null,
                ['cntr_pick_up_cy_address1']: null,
                ['cntr_pick_up_cy_address2']: null,
                ['cntr_pick_up_cy_address3']: null,
                ['cntr_pick_up_cy_address4']: null,
                ['cntr_pick_up_cy_address5']: null,
              });
              props.fncOnBlurContainerBody(index, {
                ...container,
                ['cntr_pick_up_cy_code']: null,
                ['cntr_pick_up_cy_code']: null,
                ['cntr_pick_up_cy_name1']: null,
                ['cntr_pick_up_cy_name2']: null,
                ['cntr_pick_up_cy_address1']: null,
                ['cntr_pick_up_cy_address2']: null,
                ['cntr_pick_up_cy_address3']: null,
                ['cntr_pick_up_cy_address4']: null,
                ['cntr_pick_up_cy_address5']: null,
              });
            }
          }
      });
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
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Pick Up CY Name
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
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
                disabled={ (isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?true:false}
                renderInput={
                  params =>(
                    <TextField
                      inputProps={{maxLength:30}}
                      {...params}
                      label=""
                      fullWidth
                      error={('Y'===bookmarkYn )?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:container.cntr_pick_up_cy_code?false:true}
                      helperText={('Y'===bookmarkYn )?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?null:container.cntr_pick_up_cy_code?null:'필수'}
                      style={{marginBottom:'10px'}}
                    />)}
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Pick Up CY Date
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4} style={{marginBottom: '10px'}}>
              <CalendarBox 
                className={classes.textField}
                labelText =""
                id="cntr_pick_up_cy_date"
                format="yyyy-MM-dd"
                disabled={ (isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?true:false}
                setValue={container.cntr_pick_up_cy_date?moment(container.cntr_pick_up_cy_date).format('YYYY-MM-DD'):null}
                onChangeValue={date => fncOnChagneDate(date, 'cntr_pick_up_cy_date')}
                formControlProps={{fullWidth: true}} 
                // required={('Y'===bookmarkYn )?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:container.cntr_pick_up_cy_date?false:true}
                
                renderInput={
                  params =>(
                    <TextField
                      inputProps={{maxLength:30}}
                      {...params}
                      label=""
                      fullWidth
                      error={('Y'===bookmarkYn )?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:container.cntr_pick_up_cy_code?false:true}
                      helperText={('Y'===bookmarkYn )?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?null:container.cntr_pick_up_cy_code?null:'필수'}
                      style={{marginBottom:'10px'}}
                    />)}
              ></CalendarBox>
            </GridItem>
            
              {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
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
                    id="cntr_frozen_fc"
                    onChange={(e, option)=>fncSelectCode(option?option.key:null, 'cntr_frozen_fc', index)}
                    renderInput={
                      params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}} />)}
                  />
              </GridItem> */}
            
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
                  disabled={true}
                  renderInput={
                    params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
              />

            </GridItem>
            
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                CFS 반입장소
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <Autocomplete
                className={classes.textField}
                options = {lineCodeVesselCfs}
                getOptionLabel = { option => option.cfs_name?option.cfs_name||'':'' }
                getOptionSelected={(option, value) => option.cfs_name?option.cfs_name:'' === value.cfs_name?value.cfs_name:''}
                value={{cfs_name:
                  lineCodeVesselCfs.find(v=> v.cfs_code === container.cntr_cfs_code)
                  ?lineCodeVesselCfs.find(v=> v.cfs_code === container.cntr_cfs_code).cfs_name:''
                }}
                disabled={ (isTerm === '3'|| isTerm === '4'|| isTerm === '8' )?false:true}
                id="cntr_cfs_code"
                onChange={(e, option)=>fncSelectCodePickupCy(option, 'cntr_cfs_code', index)}
                renderInput={
                  params =>(
                    <TextField
                      inputProps={{
                        maxLength:30,
                      }}
                      {...params}
                      label=""
                      fullWidth
                      error={('Y'===bookmarkYn)?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' ) ?container.cntr_cfs_code?false:true:false}
                      helperText={('Y'===bookmarkYn )?false:(isTerm === '3'|| isTerm === '4'|| isTerm === '8' ) ?container.cntr_cfs_code?null:'필수':null}
                      style={{marginBottom:'10px'}}
                    />)}
              />
            </GridItem>
            {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
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
            </GridItem> */}
            <GridItem xs={12} sm={2} className={classes.gridLabel}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                온도
              </InputLabel>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                validtype="number"
                success={false}
                error={false}
                labelText=""
                maxLength="15"
                id="cntr_frozen_tmp"
                formControlProps={{
                  fullWidth: true,
                  style:{paddingTop:'0',marginBottom:'10px'},
                  disabled: frozenInput
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
            <GridItem xs={12} sm={6} className={classes.gridLabel}>
            {frozenInput?<></>:<Typography color="secondary">* 냉동 CNTR 픽업지: 선광종합물류 *</Typography>}
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
      {/* {(containerSpecialList && containerSpecialList.length>0)?containerSpecialList.map((data, index)=>{
        if( data.cntr_seq == container.cntr_seq) {
          return(
            <SpecialCardBody
              key={"SPECIAL_"+index}
              container={container}
              index={index}
              special={data}
              fncOnBlurSpecialBody={fncOnBlurSpecialBody}
              bookmarkYn={'N'}
              containerSpecialList={containerSpecialList}
            />
        )
        }
        }):<></>} */}
    </React.Fragment>
)
}

export default ContainerForm;
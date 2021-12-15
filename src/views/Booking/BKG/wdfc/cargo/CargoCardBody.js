import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { TextField, InputLabel, InputAdornment, IconButton} from "@material-ui/core";
import {useStyles} from 'views/Booking/BKG/styles';
import {Add, Close, Search} from "@material-ui/icons";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import HsCodePop from 'components/hscode/HsCodePop';
import {observer} from 'mobx-react-lite';

const CargoCardBody = observer(({cargoStore, termRequire, ...props}) => {
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [cargo, setCargo] = useState([]);
  const [goodsRelationList, setGoodsRelationList] = useState([]);
  const [cargoTypeList, setCargoTypeList] = useState([]);
  const [cargoPackTypeLineCodeList, setCargoPackTypeLineCodeList] = useState([]);
  const {bookmarkYn} = props;
  // useEffect(()=>{
  //   setBooking(props.booking);
  // },[props.booking]);

  useEffect(()=>{
    setCargo(cargoStore);
  },[cargoStore]);

  useEffect(()=>{
    setGoodsRelationList(props.goodsRelationList);
  },[props.goodsRelationList]);

  useEffect(()=>{
    // console.log("PACK TYPE: ", props.cargoPackTypeLineCodeList)
    setCargoPackTypeLineCodeList(props.cargoPackTypeLineCodeList);
  },[props.cargoPackTypeLineCodeList]);
  useEffect(()=>{
    setCargoTypeList(props.cargoTypeList);
  },[props.cargoTypeList]);

  // TextField onChange 이벤트
  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    // cargoStore[key] = value;
    setCargo({...cargo, [key]:value});
  }
  // AutoComplete
  const fncSelectCode =(option, code) => {
    // cargoStore[code]= option;
    
    if( "cargo_type" === code ) {
      if( "3" === option || "4" === option ) {
        props.alert(
          ()=>{} // onConfirm: function
          , "위험물 또는 OOG 부킹은 별도 문의 바랍니다." // title: string
          ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
          ,true // show: boolean default:true
          ,true  // reverseButtons: boolean , default: false
          ,'lg' // btnSize: lg,sm,xs default:lg
          ,'' // subtitle: string
          ,true // showConfirm: boolean default: false
          ,false // showCancel: boolean default: false
          ,()=>{} // onCancel: function
        );
        return false;
      }
    }
    setCargo({...cargo, [code]:option});
    props.fncOnBlurCargo({...cargo, [code]:option});
  }

  const fncReturnHsCode=(hsCode)=> {
    // cargoStore['cargo_hs_code'] = hsCode.item_code;
    setCargo({...cargo, ['cargo_hs_code']:hsCode.item_code});
    props.fncOnBlurCargo({...cargo, ['cargo_hs_code']:hsCode.item_code});
  }

  return (
    <React.Fragment>
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
              success={cargo.cargo_bookmark_name?true:false}
              error={cargo.cargo_bookmark_name?false:true}
              labelText=""
              maxLength="50"
              id="cargo_bookmark_name"
              formControlProps={{
                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
              }}
              inputProps={{
                  value:cargo.cargo_bookmark_name?cargo.cargo_bookmark_name:'',
              onChange: (e)=>fncOnChange(e),
              onBlur: ()=>props.fncOnBlurCargo(cargo),
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
            Item
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={cargo.cargo_name?true:false}
            error={cargo.cargo_name?false:true}
            labelText=""
            maxLength="140"
            id="cargo_name"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:cargo.cargo_name?cargo.cargo_name:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={false}
            feedback="cargo"
          />
        </GridItem> */}
        {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            HS Code
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={cargo.cargo_hs_code?true:false}
            error={cargo.cargo_hs_code?false:true}
            labelText=""
            maxLength="10"
            id="cargo_hs_code"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <HsCodePop 
                      id={'cargo_hs_code'}
                      fncReturnHsCode={fncReturnHsCode}
                    />
                  </InputAdornment>,
                value:cargo.cargo_hs_code?cargo.cargo_hs_code:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={false}
            feedback="cargo"
          />
        </GridItem> */}
        
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Cargo Type
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <Autocomplete
            className={classes.textField}
            options = {cargoTypeList}
            getOptionLabel = { option => option.label?option.label:'' }
            getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
            value={{label:
              cargoTypeList.find(v=> v.value == cargo.cargo_type)
              ?cargoTypeList.find(v=> v.value == cargo.cargo_type).label:''
            }}
            id="cargo_type"
            onChange={(e, option)=>fncSelectCode(option?option.cargo_type:null, 'cargo_type')}
            renderInput={
              params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth style={{marginBottom:'10px'}}/>)}
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            package Qty
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="number"
            success={cargo.cargo_pack_qty?true:false}
            error={cargo.cargo_pack_qty?false:true}
            labelText=""
            maxLength="4"
            id="cargo_pack_qty"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:cargo.cargo_pack_qty?cargo.cargo_pack_qty:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={"Y"===bookmarkYn?false:termRequire}
            feedback="cargo"
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            package Type
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <Autocomplete
            className={classes.textField}
            options = {cargoPackTypeLineCodeList}
            getOptionLabel = { option => option.label?option.label:'' }
            getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
            value={{label:
              cargoPackTypeLineCodeList.find(v=> v.value === cargo.cargo_pack_type)
              ?cargoPackTypeLineCodeList.find(v=> v.value === cargo.cargo_pack_type).label:''
            }}
            id="cargo_pack_type"
            onChange={(e, option)=>fncSelectCode(option?option.cargo_pack_type:null, 'cargo_pack_type')}
            renderInput={
              params =>(
                <TextField inputProps={{maxLength:30, paddingTop:10}}
                  {...params}
                  label=""
                  fullWidth
                  style={{marginBottom:'10px'}}
                  error={('Y'===bookmarkYn)?false:termRequire?cargo.cargo_pack_type?false:true:false}
                  helperText={('Y'===bookmarkYn)?false:termRequire?cargo.cargo_pack_type?false:'필수':null}
                  />)
            }
          />
        </GridItem>
        
        
        
        
        {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Weight
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="number"
            success={cargo.cargo_weight?true:false}
            error={cargo.cargo_weight?false:true}
            labelText=""
            maxLength="18"
            id="cargo_weight"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
              endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
                value:cargo.cargo_weight?cargo.cargo_weight:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={false}
            feedback="cargo"
          />
        </GridItem> */}
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Total Weight
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="number"
            success={cargo.cargo_total_weight?true:false}
            error={cargo.cargo_total_weight?false:true}
            labelText=""
            maxLength="10"
            id="cargo_total_weight"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
                value:cargo.cargo_total_weight?cargo.cargo_total_weight:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={false}
            feedback="cargo"
          />
        </GridItem>
        <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Volume
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            validtype="text"
            success={cargo.cargo_total_volume?true:false}
            error={cargo.cargo_total_volume?false:true}
            labelText=""
            maxLength="10"
            id="cargo_total_volume"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                endAdornment:<InputAdornment position="end">CBM</InputAdornment>,
                value:cargo.cargo_total_volume?cargo.cargo_total_volume:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={false}
            feedback="cargo"
          />
        </GridItem>
        {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
          <InputLabel style={{ color: "#AAAAAA" }}>
            Remark
          </InputLabel>
        </GridItem>
        <GridItem xs={12} sm={10}>
          <CustomInput
            validtype="text"
            success={cargo.cargo_remark?true:false}
            error={cargo.cargo_remark?false:true}
            labelText=""
            maxLength="100"
            id="cargo_remark"
            formControlProps={{
              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
            }}
            inputProps={{
                value:cargo.cargo_remark?cargo.cargo_remark:'',
            onChange: (e)=>fncOnChange(e),
            onBlur: ()=>props.fncOnBlurCargo(cargo),
            }}
            required={false}
            feedback="cargo"
          />
        </GridItem> */}
      </GridContainer>
    </React.Fragment>
  );
});


// function areEqual(prevProps, nextProps) {
//   return (
//     prevProps.openCargo === nextProps.openCargo
//     && prevProps.cargoStore.bkg_no === nextProps.cargoStore.bkg_no
//     && prevProps.cargoStore.bkg_date === nextProps.cargoStore.bkg_date
//     && prevProps.cargoStore.user_no === nextProps.cargoStore.user_no
//     && prevProps.cargoStore.cargo_bookmark_name === nextProps.cargoStore.cargo_bookmark_name
//     && prevProps.cargoStore.cargo_name === nextProps.cargoStore.cargo_name
//     && prevProps.cargoStore.cargo_hs_code === nextProps.cargoStore.cargo_hs_code
//     && prevProps.cargoStore.cargo_pack_qty === nextProps.cargoStore.cargo_pack_qty
//     && prevProps.cargoStore.cargo_pack_type === nextProps.cargoStore.cargo_pack_type
//     && prevProps.cargoStore.cargo_remark === nextProps.cargoStore.cargo_remark
//     && prevProps.cargoStore.cargo_total_volume === nextProps.cargoStore.cargo_total_volume
//     && prevProps.cargoStore.cargo_total_weight === nextProps.cargoStore.cargo_total_weight
//     && prevProps.cargoStore.cargo_type === nextProps.cargoStore.cargo_type
//     && prevProps.cargoStore.cargo_weight === nextProps.cargoStore.cargo_weight
//     && prevProps.cargoStore.selected_yn === nextProps.cargoStore.selected_yn
//     && prevProps.cargoStore.cargoTypeList === nextProps.cargoStore.cargoTypeList
//     && prevProps.cargoStore.cargoPackTypeLineCodeList === nextProps.cargoStore.cargoPackTypeLineCodeList
//     && prevProps.cargoBookmarkList === nextProps.cargoBookmarkList
//     && prevProps.goodsRelationList === nextProps.goodsRelationList
//     // bookmark
//     // && prevProps.cargoStore.booking.bookmark_seq === nextProps.cargoStore.booking.bookmark_seq
//     // && prevProps.cargoStore.booking.other_bookmark_seq === nextProps.cargoStore.booking.other_bookmark_seq
//     // && prevProps.cargoStore.booking.cargo_bookmark_seq === nextProps.cargoStore.booking.cargo_bookmark_seq
//     // && prevProps.cargoStore.booking.line_bookmark_seq === nextProps.cargoStore.booking.line_bookmark_seq
//     // && prevProps.cargoStore.booking.consignee_bookmark_seq === nextProps.cargoStore.booking.consignee_bookmark_seq
//     // && prevProps.cargoStore.booking.container_bookmark_seq === nextProps.cargoStore.booking.container_bookmark_seq
//     // && prevProps.cargoStore.booking.document_bookmark_seq === nextProps.cargoStore.booking.document_bookmark_seq
//     // && prevProps.cargoStore.booking.forwarder_bookmark_seq === nextProps.cargoStore.booking.forwarder_bookmark_seq
//     // && prevProps.cargoStore.booking.schedule_bookmark_seq === nextProps.cargoStore.booking.schedule_bookmark_seq
//     // && prevProps.cargoStore.booking.shipper_bookmark_seq === nextProps.cargoStore.booking.shipper_bookmark_seq
//     // && prevProps.cargoStore.booking.transport_bookmark_seq === nextProps.cargoStore.booking.transport_bookmark_seq
//   );
// }

export default CargoCardBody;
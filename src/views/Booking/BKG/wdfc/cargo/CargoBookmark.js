import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";
import NavPills from "components/NavPills/NavPills.js";
import { InputLabel, IconButton,Paper, TextField
  , TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
  import {ViewModule, Bookmarks, Close, Add} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import CargoCardBody from './CargoCardBody';
import Slide from "@material-ui/core/Slide";
import CustomInput from "components/CustomInput/CustomInputBooking.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const CargoBookmark = (props) => {
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [cargo, setCargo] = useState([]);
  const [goods, setGoods] = useState([]);
  const [goodsRelationList, setGoodsRelationList] = useState([]);
  const [openBookmark, setOpenBookmark] = useState(false);
  const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
  const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
  const [cargoTypeList, setCargoTypeList] = useState([]);
  const [cargoPackTypeLineCodeList, setCargoPackTypeLineCodeList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setCargo({
      ...cargo,
      'cargo_bookmark_seq': props.cargoStore?props.cargoStore.cargo_bookmark_seq:null,
      'cargo_bookmark_name': props.cargoStore?props.cargoStore.cargo_bookmark_name:null,
      'cargo_name': props.cargoStore?props.cargoStore.cargo_name:null,
      'cargo_hs_code': props.cargoStore?props.cargoStore.cargo_hs_code:null,
      'cargo_pack_qty': props.cargoStore?props.cargoStore.cargo_pack_qty:null,
      'cargo_pack_type': props.cargoStore?props.cargoStore.cargo_pack_type:null,
      'cargo_remark': props.cargoStore?props.cargoStore.cargo_remark:null,
      'cargo_total_volume': props.cargoStore?props.cargoStore.cargo_total_volume:null,
      'cargo_total_weight': props.cargoStore?props.cargoStore.cargo_total_weight:null,
      'cargo_type': props.cargoStore?props.cargoStore.cargo_type:null,
      'cargo_weight': props.cargoStore?props.cargoStore.cargo_weight:null,
    })
  },[props.cargoStore])

  useEffect(()=>{
    setCargoBookmarkList(props.cargoBookmarkList);
  },[props.cargoBookmarkList]);

  useEffect(()=>{
    setGoodsBookmarkList(props.goodsBookmarkList);
  },[props.goodsBookmarkList]);

  useEffect(()=>{
    setCargoPackTypeLineCodeList(props.cargoPackTypeLineCodeList);
  },[props.cargoPackTypeLineCodeList]);
  useEffect(()=>{
    setCargoTypeList(props.cargoTypeList);
  },[props.cargoTypeList]);

  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnClickData =(e, row)=> {
    setCargo({...row});
    selectBookingCargoBookmarkRelation(row);
  }

  const fncOnClickDataGoods =(e, row)=> {
    setGoods({...row});
  }

  // 수정된 내용은 Cargo Goods 목록 저장
  const fncOnChangeGoods =(e)=> {
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    goods[key] = value;
    setGoods({...goods});
  }

  // 수정된 내용은 Cargo Goods 목록 저장
  const fncOnChangeGoodsRelation =(e, index)=> {
    let row = goodsRelationList[index];
    row[e.target.id] = e.target.value.toUpperCase();
    goodsRelationList[index] = row;
    setGoodsRelationList([...goodsRelationList]);
  }

  const fncNewBookmark =()=> {
    setCargo({});
    setGoodsRelationList({'key':1});
  }
  const fncNewGoodsBookmark =()=> {
    setGoods({});
  }

  const fncOnBlurGoodsRelation =(goodsRelationList)=> {
    setGoodsRelationList(goodsRelationList);
  }

  const fncOnBlurCargo =(cargo)=> {
    setCargo(cargo);
  }

  const fncOnBlurGoods =(goods)=> {
    setGoods(goods);
  }

  const fncCargoValidation =()=> {
    if( !cargo.cargo_bookmark_name ) return false;
    return true;
  }
  // Cargo Bookmark 입력하기
  const fncSaveCargoBookmark=(e)=>{
    e.preventDefault(e);
    if( !fncCargoValidation()) return false;
    if( !cargo.cargo_bookmark_seq || '0' === cargo.cargo_bookmark_seq ) {
        insertBookingCargoBookmark();
    } else {
        updateBookingCargoBookmark();
    }
  }

  // Insert Cargo Bookmark
  const insertBookingCargoBookmark = () => {
      const body =
      axios.post(
          "/shipper/insertBookingCargoBookmark"
          ,{
              user_no : userData.user_no,
              cargo,
              goodsRelationList
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingCargoBookmark();
              props.selectBookingCargoGoodsBookmark();
          }
      );
  }

  // Update Cargo Bookmark
  const updateBookingCargoBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBookingCargoBookmark"
          ,{
              user_no : userData.user_no,
              cargo,
              goodsRelationList
          }
          ,{}
      ).then(
          res=>{
            props.alert(
              null // onConfirm: function
              , validation.SAVE_MSG // title: string
              ,'success' // default,info,success,warning,danger,error,input,custom,controlled
              ,true // show: boolean default:true
              ,true  // reverseButtons: boolean , default: false
              ,'lg' // btnSize: lg,sm,xs default:lg
              ,'' // subtitle: string
              ,true // showConfirm: boolean default: false
              ,false // showCancel: boolean default: false
              ,null // onCancel: function
            );
              props.selectBookingCargoBookmark();
              props.selectBookingCargoGoodsBookmark();
          }
      );
  }

  // Delete Cargo Bookmark
  const deleteBookingCargoBookmark = () => {
      if( !cargo.cargo_bookmark_seq ) {
          props.alert(
            null // onConfirm: function
            , "삭제할 Bookmark를 선택하세요." // title: string
            ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
            ,true // show: boolean default:true
            ,true  // reverseButtons: boolean , default: false
            ,'lg' // btnSize: lg,sm,xs default:lg
            ,'' // subtitle: string
            ,true // showConfirm: boolean default: false
            ,false // showCancel: boolean default: false
            ,null // onCancel: function
          );
          return false;
      }
      const body =
      axios.post(
          "/shipper/deleteBookingCargoBookmark"
          ,{
              user_no : userData.user_no,
              cargo
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingCargoBookmark();
              setCargo({});
          }
      );
  }

  const fncGoodsValidation =()=> {
    if( !goods.cargo_goods_bookmark_name ) return false;
    return true;
  }
  // Cargo Bookmark 입력하기
  const fncSaveGoodsBookmark=(e)=>{
    e.preventDefault(e);
    if( !userData.user_no ) {
        props.alert(
          null // onConfirm: function
          , validation.NOTLOGIN_MSG // title: string
          ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
          ,true // show: boolean default:true
          ,true  // reverseButtons: boolean , default: false
          ,'lg' // btnSize: lg,sm,xs default:lg
          ,'' // subtitle: string
          ,true // showConfirm: boolean default: false
          ,false // showCancel: boolean default: false
          ,null // onCancel: function
        );
    }
    if( !fncGoodsValidation() ) return false;
    if( !goods.cargo_goods_bookmark_seq || '0' === goods.cargo_goods_bookmark_seq ) {
        insertBookingCargoGoodsBookmark();
    } else {
        updateBoookingCargoGoodsBookmark();
    }
  }

  // Insert Goods Bookmark
  const insertBookingCargoGoodsBookmark = () => {
      const body =
      axios.post(
          "/shipper/insertBookingCargoGoodsBookmark"
          ,{
              user_no : userData.user_no,
              goods
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingCargoGoodsBookmark();
          }
      );
  }

  // Update Goods Bookmark
  const updateBoookingCargoGoodsBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBoookingCargoGoodsBookmark"
          ,{
              user_no : userData.user_no,
              goods
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingCargoGoodsBookmark();
          }
      );
  }

  // Delete Goods Bookmark
  const deleteBoookingCargoGoodsBookmark = () => {
      if( !goods.cargo_goods_bookmark_seq ) {
          props.alert(
            null // onConfirm: function
            , "삭제할 Bookmark를 선택하세요." // title: string
            ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
            ,true // show: boolean default:true
            ,true  // reverseButtons: boolean , default: false
            ,'lg' // btnSize: lg,sm,xs default:lg
            ,'' // subtitle: string
            ,true // showConfirm: boolean default: false
            ,false // showCancel: boolean default: false
            ,null // onCancel: function
          );
          return false;
      }
      const body =
      axios.post(
          "/shipper/deleteBoookingCargoGoodsBookmark"
          ,{
              user_no : userData.user_no,
              goods
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingCargoGoodsBookmark();
          }
      );
  }

  const fncAddGoodsBookmark =()=> {
    if( goodsRelationList.length === 10 ) {
      return false;
    }
    setGoodsRelationList([...goodsRelationList,{'key':goodsRelationList.length+1}]);
  }
  const fncDelGoodsBookmark =(key)=>{
    if( goodsRelationList.length === 1 ) {
      setGoodsRelationList([{'key':1}]);
      // props.fncOnBlurGoods( [{'key':1}] );
    } else {
        // const cntrIdx = goodsRelationList.findIndex(function(item){return item.cntr_seq === cntr_seq });
        //  Splice의 경우 return값이 아닌 splice 처리후 적용
        if(key > -1) goodsRelationList.splice(key,1);
        setGoodsRelationList([...goodsRelationList]);
        // props.fncOnBlurGoods([...goodsRelationList]);
    }
  }


    // Cargo Bookmark 조회
    const selectBookingCargoBookmarkRelation = (cargo) => {
      axios.post(
          "/shipper/selectBookingCargoBookmarkRelation"
          ,{ 
          user_no: userData.user_no,
          line_code: 'WDFC',
          cargo
      }
          ,{}
      ).then(
          res => {
              setGoodsRelationList(res.data);
          }
      );
    }

    // 콤보박스 Bookmark 선택할 경우
    const fncSelectCode = (e, index) => {
      let row = goodsRelationList.find(v=> v.cargo_goods_bookmark_seq == e.cargo_goods_bookmark_seq)
      if( row ) {
          props.alert(
            null // onConfirm: function
            , "Bookmark는 이미 추가되었습니다." // title: string
            ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
            ,true // show: boolean default:true
            ,true  // reverseButtons: boolean , default: false
            ,'lg' // btnSize: lg,sm,xs default:lg
            ,'' // subtitle: string
            ,true // showConfirm: boolean default: false
            ,false // showCancel: boolean default: false
            ,null // onCancel: function
          );
          return false;
      }
      goodsRelationList[index] = e;
      setGoodsRelationList([...goodsRelationList]);
    }
  return (
    <React.Fragment>
      <IconButton onClick={handleClose}>
        <Bookmarks fontSize={'default'} />
      </IconButton>

      <Dialog
        classes={{paper: classes.modal}}
        open={openBookmark}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleClose()}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
              size="sm"
            onClick={()=>handleClose()}
          ><Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>
            <ViewModule fontSize={'default'} style={{marginRight: '20px'}}/>
            Cargo Bookmark
          </h4>
        </DialogTitle>
        <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
          <NavPills
            color="info"
            tabs={[
              {
                tabButton: "Cargo",
                tabContent: (
                  <React.Fragment>
                    <div style={{paddingLeft:'5%',paddingRight:'5%'}}>
                      <TableContainer className={classes.tableLine}>
                        <Table 	
                          stickyHeader aria-label="sticky table"
                          className={classes.table}
                          aria-labelledby="tableTitle"
                          size='medium'
                          style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{width: '5%'}} className={classes.tableHeadercell} align="center">No.</TableCell>
                              <TableCell style={{width: '15%'}} className={classes.tableHeadercell} align="center">Bookmark</TableCell>
                              <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Cargo</TableCell>
                              <TableCell style={{width: '30%'}} className={classes.tableHeadercell} align="center">Type</TableCell>
                              <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Pack Type</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                              {cargoBookmarkList.map((row,index) => (
                                <TableRow key={index}
                                  className={classes.root}
                                  hover
                                  onClick={(e)=>fncOnClickData(e, row)}
                                  selected = { cargo.cargo_bookmark_seq === row.cargo_bookmark_seq }
                                >
                                  <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                                  <TableCell align="center" className={classes.tablecell}>{row.cargo_bookmark_name}</TableCell>
                                  <TableCell align="center" className={classes.tablecell}>{row.cargo_name}</TableCell>
                                  <TableCell align="center" className={classes.tablecell}>{row.cargo_type_name}</TableCell>
                                  <TableCell align="center" className={classes.tablecell}>{row.cargo_pack_type_name}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div style={{margin:'0 10px'}}>
                        <CargoCardBody
                          // booking={booking}
                          cargoStore={cargo}
                          bookmarkYn={'Y'}
                          cargoTypeList={cargoTypeList}
                          cargoPackTypeLineCodeList={cargoPackTypeLineCodeList}
                          goodsRelationList={goodsRelationList}
                          fncOnBlurCargo={fncOnBlurCargo}
                          {...props}
                        />
                      </div>
                      <GridContainer >
                        <GridItem xs={11} sm={11}>
                          <Typography variant='h6'>Goods</Typography>
                        </GridItem>
                        <GridItem xs={1} sm={1} className={classes.gridLabel}>
                          <IconButton onClick={()=>fncAddGoodsBookmark()}>
                            <Add fontSize={'default'} />
                          </IconButton>
                        </GridItem>
                      </GridContainer>
                      {(goodsRelationList.length>0)?goodsRelationList.map((data,index)=>{
                        return(
                          <Paper className={classes.paper} key={index}>
                            <GridContainer >
                              <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                  Goods Bookmark
                                </InputLabel>
                              </GridItem>
                              <GridItem xs={12} sm={9}>
                                <Autocomplete
                                  className={classes.textField}
                                  options = {goodsBookmarkList}
                                  getOptionLabel = { option => option.label?option.label||'':'' }
                                  getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
                                  value={{label:
                                    goodsBookmarkList.find(v=> v.value == data.cargo_goods_bookmark_seq)
                                    ?goodsBookmarkList.find(v=> v.value == data.cargo_goods_bookmark_seq).label:''
                                  }}
                                  id="goods_bookmark"
                                  onChange={(e, option)=>fncSelectCode(option, index)}
                                  renderInput={
                                    params =>(<TextField inputProps={{maxLength:30}} {...params} label="" fullWidth />)}
                                />
                              </GridItem>
                              <GridItem xs={1} sm={1}>
                                <IconButton onClick={()=>fncDelGoodsBookmark(index)}>
                                  <Close fontSize={'small'} />
                                </IconButton>
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                  Goods
                                </InputLabel>
                              </GridItem>
                              <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                                <CustomInput
                                  validtype="text"
                                  success={data.goods_desc1?true:false}
                                  error={data.goods_desc1?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="view_goods_desc1"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:data.goods_desc1?data.goods_desc1:'',
                                    onChange: (e)=>fncOnChangeGoodsRelation(e, index),
                                  }}
                                  required={false}
                                  feedback="carrier"
                                  readOnly
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                              </GridItem>
                              <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                                <CustomInput
                                  validtype="text"
                                  success={data.goods_desc2?true:false}
                                  error={data.goods_desc2?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="view_goods_desc2"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:data.goods_desc2?data.goods_desc2:'',
                                    onChange: (e)=>fncOnChangeGoodsRelation(e, index),
                                  }}
                                  required={false}
                                  feedback="cargo"
                                  readOnly
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                              </GridItem>
                              <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                                <CustomInput
                                  validtype="text"
                                  success={data.goods_desc3?true:false}
                                  error={data.goods_desc3?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="view_goods_desc3"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:data.goods_desc3?data.goods_desc3:'',
                                    onChange: (e)=>fncOnChangeGoodsRelation(e, index),
                                  }}
                                  required={false}
                                  feedback="cargo"
                                  readOnly
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                              </GridItem>
                              <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                                <CustomInput
                                  validtype="text"
                                  success={data.goods_desc4?true:false}
                                  error={data.goods_desc4?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="view_goods_desc4"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:data.goods_desc4?data.goods_desc4:'',
                                    onChange: (e)=>fncOnChangeGoodsRelation(e, index),
                                  }}
                                  required={false}
                                  feedback="cargo"
                                  readOnly
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                              </GridItem>
                              <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                                <CustomInput
                                  validtype="text"
                                  success={data.goods_desc5?true:false}
                                  error={data.goods_desc5?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="view_goods_desc5"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:data.goods_desc5?data.goods_desc5:'',
                                    onChange: (e)=>fncOnChangeGoodsRelation(e, index),
                                  }}
                                  required={false}
                                  feedback="cargo"
                                  readOnly
                                />
                              </GridItem>
                            </GridContainer>
                          </Paper>
                          )}):
                        <></>
                      }
                      <DialogActions className={classes.modalFooter}>
                        <Button color="info" onClick={(e)=>fncNewBookmark()}
                          >NEW</Button>
                        <Button color="info" onClick={(e)=>fncSaveCargoBookmark(e)}
                          >SAVE</Button>
                        <Button color="info" onClick={(e)=>deleteBookingCargoBookmark(e)}
                          >DELETE</Button>
                      </DialogActions>
                      {/* <GridItem xs={12} sm={12} style={{textAlignLast:'right'}}>
                        <Button color="info" onClick={(e)=>fncNewBookmark()}>NEW</Button>
                        <Button color="info" onClick={(e)=>fncSaveCargoBookmark(e)}>SAVE</Button>
                        <Button color="info" onClick={(e)=>deleteBookingCargoBookmark(e)}>DELETE</Button>
                      </GridItem> */}
                    </div>
                  </React.Fragment>
                )
              },
              {
                tabButton: "Goods",
                tabContent: (
                  <React.Fragment>
                    <div style={{paddingLeft:'5%',paddingRight:'5%'}}>
                      <TableContainer className={classes.tableLine}>
                        <Table 	
                          stickyHeader aria-label="sticky table"
                          className={classes.table}
                          aria-labelledby="tableTitle"
                          size='medium'
                          style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{width: '5%'}}  className={classes.tableHeadercell} align="center">No.</TableCell>
                              <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Bookmark</TableCell>
                              <TableCell style={{width: '35%'}} className={classes.tableHeadercell} align="center">Desc1</TableCell>
                              <TableCell style={{width: '35%'}} className={classes.tableHeadercell} align="center">Desc2</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {goodsBookmarkList.map((row,index) => (
                              <TableRow key={index}
                                className={classes.root}
                                hover
                                onClick={(e)=>fncOnClickDataGoods(e, row)}
                                selected = { goods.cargo_goods_bookmark_seq === row.cargo_goods_bookmark_seq }
                              >
                                <TableCell align="center" className={classes.tableCell}>{row.seq}</TableCell>
                                <TableCell align="center" className={classes.tableCell}>{row.cargo_goods_bookmark_name}</TableCell>
                                <TableCell align="center" className={classes.tableCell}>{row.goods_desc1}</TableCell>
                                <TableCell align="center" className={classes.tableCell}>{row.goods_desc2}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div style={{margin:'0 10px'}}>

                        <Paper className={classes.paper}>
                          <GridContainer >
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                                Bookmark
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                              <CustomInput
                                  validtype="text"
                                  success={goods.cargo_goods_bookmark_name?true:false}
                                  error={goods.cargo_goods_bookmark_name?false:true}
                                  labelText=""
                                  maxLength="50"
                                  id="cargo_goods_bookmark_name"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:goods.cargo_goods_bookmark_name?goods.cargo_goods_bookmark_name:'',
                                    onChange: (e)=>fncOnChangeGoods(e),
                                  }}
                                  required={true}
                                  feedback="deny"
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                                Goods
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                              <CustomInput
                                  validtype="text"
                                  success={goods.goods_desc1?true:false}
                                  error={goods.goods_desc1?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="goods_desc1"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:goods.goods_desc1?goods.goods_desc1:'',
                                    onChange: (e)=>fncOnChangeGoods(e),
                                  }}
                                  required={false}
                                  feedback=""
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                              <CustomInput
                                  validtype="text"
                                  success={goods.goods_desc2?true:false}
                                  error={goods.goods_desc2?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="goods_desc2"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:goods.goods_desc2?goods.goods_desc2:'',
                                    onChange: (e)=>fncOnChangeGoods(e),
                                  }}
                                  required={false}
                                  feedback=""
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                              <CustomInput
                                  validtype="text"
                                  success={goods.goods_desc3?true:false}
                                  error={goods.goods_desc3?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="goods_desc3"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:goods.goods_desc3?goods.goods_desc3:'',
                                    onChange: (e)=>fncOnChangeGoods(e),
                                  }}
                                  required={false}
                                  feedback=""
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                              <CustomInput
                                  validtype="text"
                                  success={goods.goods_desc4?true:false}
                                  error={goods.goods_desc4?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="goods_desc4"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:goods.goods_desc4?goods.goods_desc4:'',
                                    onChange: (e)=>fncOnChangeGoods(e),
                                  }}
                                  required={false}
                                  feedback=""
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                              <InputLabel style={{ color: "#AAAAAA" }}>
                              </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                              <CustomInput
                                  validtype="text"
                                  success={goods.goods_desc5?true:false}
                                  error={goods.goods_desc5?false:true}
                                  labelText=""
                                  maxLength="80"
                                  id="goods_desc5"
                                  formControlProps={{
                                    fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                  }}
                                  inputProps={{
                                    value:goods.goods_desc5?goods.goods_desc5:'',
                                    onChange: (e)=>fncOnChangeGoods(e),
                                  }}
                                  required={false}
                                  feedback=""
                                />
                            </GridItem>
                          </GridContainer>
                        </Paper>
                      </div>
                      <DialogActions className={classes.modalFooter}>
                        <Button color="info" onClick={(e)=>fncNewGoodsBookmark()}
                          >NEW</Button>
                        <Button color="info" onClick={(e)=>fncSaveGoodsBookmark(e)}
                          >SAVE</Button>
                        <Button color="info" onClick={(e)=>deleteBoookingCargoGoodsBookmark(e)}
                          >DELETE</Button>
                      </DialogActions>
                    </div>
                  </React.Fragment>
                )
              }
            ]}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default CargoBookmark;
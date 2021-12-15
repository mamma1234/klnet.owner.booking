import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from 'axios';
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Paper, Collapse, IconButton, FormLabel, Divider, Avatar, CardHeader} from "@material-ui/core";
import {ViewModule, UnfoldLess, UnfoldMore, AddCircleOutline, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import CargoCardBody from './CargoCardBody';
import CargoBookmark from './CargoBookmark';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import { observer } from 'mobx-react-lite';

const CargoCard = observer(({cargo, goodsRelationList, isTerm, ...props}) => {
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  // const [cargo, setCargo] = useState([]);
  // const [goodsRelationList, setGoodsRelationList] = useState([]);
  const [openCargo, setOpenCargo] = useState(true);
  const [termRequire, setTermRequire] = useState(false);
  // const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
  // const [goodsBookmarkList, setGoodsBookmarkList] = useState([])
  // const [cargoTypeList, setCargoTypeList] = useState([]);
  // const [cargoPackTypeLineCodeList, setCargoPackTypeLineCodeList] = useState([]);

  const {cargoTypeList, cargoBookmarkList, goodsBookmarkList, cargoPackTypeLineCodeList} = props;
  // const goodsRelationList = goodsStore.goods;
  // useEffect(()=>{
  //   if( booking.bkg_no ) {
  //     // 부킹번호가 바뀌면 새로운 부킹정보로 세팅
  //     setBooking(props.booking);
  //   } 
  //   if ( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
  //     // 전체북마크를 수정한 경우 관련된 정보로 세팅해준다.
  //     // let obj = Object.assign(booking, props.booking);
  //     setBooking({...booking, ...props.booking});
  //   }
  // },[props.booking]);
  // useEffect(()=>{
  //   setCargo(props.cargo);
  // },[props.cargo]);

  useEffect(()=>{
    setOpenCargo(props.openCargo);
  },[props.openCargo]);

  useEffect(()=>{
    if(isTerm === '3' || isTerm === '4' || isTerm === '8' ) {
      setTermRequire(true)
    } else {
      setTermRequire(false)
    }
  }, [isTerm])

  // useEffect(()=>{
  //   setGoodsRelationList(props.goodsRelationList);
  // },[props.goodsRelationList]);

  

  // useEffect(()=>{
  //   setCargoBookmarkList(props.cargoBookmarkList);
  // },[props.cargoBookmarkList]);

  // useEffect(()=>{
  //   setCargoPackTypeLineCodeList(props.cargoPackTypeLineCodeList);
  // },[props.cargoPackTypeLineCodeList]);
  // useEffect(()=>{
  //   setCargoTypeList(props.cargoTypeList);
  // },[props.cargoTypeList]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( option ) {
      if( 'cargo_bookmark_seq' === code) {
        
        cargo.setCargo({
            ...cargo.cargo,
            'cargo_bookmark_seq': option?option.cargo_bookmark_seq:null,
            'cargo_bookmark_name': option?option.cargo_bookmark_name:null,
            'cargo_name': option.cargo_name?option.cargo_name:cargo.cargo.cargo_name,
            'cargo_hs_code': option.cargo_hs_code?option.cargo_hs_code:cargo.cargo.cargo_hs_code,
            'cargo_pack_qty': option.cargo_pack_qty?option.cargo_pack_qty:cargo.cargo.cargo_pack_qty,
            'cargo_pack_type': option.cargo_pack_type?option.cargo_pack_type:cargo.cargo.cargo_pack_type,
            'cargo_remark': option.cargo_remark?option.cargo_remark:cargo.cargo.cargo_remark,
            'cargo_total_volume': option.cargo_total_volume?option.cargo_total_volume:cargo.cargo.cargo_total_volume,
            'cargo_total_weight': option.cargo_total_weight?option.cargo_total_weight:cargo.cargo.cargo_total_weight,
            'cargo_type': option.cargo_type?option.cargo_type:cargo.cargo.cargo_type,
            'cargo_weight': option.cargo_weight?option.cargo_weight:cargo.cargo.cargo_weight,
            'selected_yn':'Y'
          });
  
          selectBookingCargoBookmarkRelation( option );
      }
    } else {
      if( cargo.cargo.cargo_bookmark_seq ) {
        cargo.setCargo({
          ...cargo.cargo,
          'cargo_bookmark_seq': null,
          'cargo_bookmark_name': null,
          'cargo_name': null,
          'cargo_hs_code': null,
          'cargo_pack_qty': null,
          'cargo_pack_type': null,
          'cargo_remark': null,
          'cargo_total_volume': null,
          'cargo_total_weight': null,
          'cargo_type': null,
          'cargo_weight': null,
        });

        fncOnBlurGoods([{'key':1, 'cargo_seq':1}]);
      }
    }
  }

  const fncSetOpenCargo=()=>{
    setOpenCargo(!openCargo);
    props.fncSetOpenCargo(!openCargo);
  }

  // 수정된 내용은 Cargo Goods 목록 저장
  const fncOnChangeGoods =(e, index)=> {
    let row = goodsRelationList[index];
    row[e.target.id] = e.target.value.toUpperCase();
    goodsRelationList[index]= row;
    // setGoodsRelationList(goodsRelationList);
    // goodsStore.setGoodsList(goodsRelationList);
  }

  const fncAddGoods = ()=>{
    if( goodsRelationList.length === 999 ) {
      return false;
    }
    fncOnBlurGoods([...goodsRelationList,{'key':goodsRelationList.length+1}]);
    // goodsStore.setGoodsList([...goodsRelationList,{'key':goodsRelationList.length+1}]);
  }
  const fncDelGoods = (key)=>{
    if( goodsRelationList.length === 1 ) {
      fncOnBlurGoods([{'key':1}]);
        // fncOnBlurGoods( [{'key':1}] );
        // goodsStore.setGoodsList([{'key':1}]);
    } else {
        // const cntrIdx = goodsRelationList.findIndex(function(item){return item.cntr_seq === cntr_seq });
        //  Splice의 경우 return값이 아닌 splice 처리후 적용
        if(key > -1) goodsRelationList.splice(key,1);
        fncOnBlurGoods([...goodsRelationList]);
        // goodsStore.setGoodsList(goodsRelationList);
        // fncOnBlurGoods([...goodsRelationList]);
    }
  }

  // Cargo Bookmark 조회
  const selectBookingCargoBookmarkRelation = (cargo) => {
    axios.post(
        "/shipper/selectBookingCargoBookmarkRelation"
        ,{ 
        user_no: props.userData.user_no,
        line_code: 'WDFC',
        cargo
    }
        ,{}
    ).then(
        res => {
          // goodsStore.setGoodsList(res.data);
            // setGoodsRelationList(res.data);
            if( res.data.length>0 ) {
              fncOnBlurGoods(res.data);
            } else {
              // fncOnBlurGoods([{'key':1, 'cargo_seq':1}]);
            }
        }
    );
  }
  
  const fncSelectGoodsBookmark = (option, code, index)=> {
    let row = goodsRelationList[index];
    row['cargo_goods_bookmark_seq'] = option.cargo_goods_bookmark_seq;
    row['goods_desc1'] = option.goods_desc1;
    row['goods_desc2'] = option.goods_desc2;
    row['goods_desc3'] = option.goods_desc3;
    row['goods_desc4'] = option.goods_desc4;
    row['goods_desc5'] = option.goods_desc5;
    goodsRelationList[index] = row;
    // goodsStore.setGoodsList(goodsRelationList);
    // setGoodsRelationList([...goodsRelationList]);
    fncOnBlurGoods([...goodsRelationList]);
  }

  const fncOnBlurCargo =(cargoParams)=> {
    cargo.setCargo({
      ...cargo.cargo,
      'cargo_bookmark_seq': cargoParams?cargoParams.cargo_bookmark_seq:null,
      'cargo_bookmark_name': cargoParams?cargoParams.cargo_bookmark_name:null,
      'cargo_name': cargoParams?cargoParams.cargo_name:null,
      'cargo_hs_code': cargoParams?cargoParams.cargo_hs_code:null,
      'cargo_pack_qty': cargoParams?cargoParams.cargo_pack_qty:null,
      'cargo_pack_type': cargoParams?cargoParams.cargo_pack_type:null,
      'cargo_remark': cargoParams?cargoParams.cargo_remark:null,
      'cargo_total_volume': cargoParams?cargoParams.cargo_total_volume:null,
      'cargo_total_weight': cargoParams?cargoParams.cargo_total_weight:null,
      'cargo_type': cargoParams?cargoParams.cargo_type:null,
      'cargo_weight': cargoParams?cargoParams.cargo_weight:null,
    })
  }
  const fncOnBlurGoods =(goodsList)=> {
    cargo.setGoodsRelationList( goodsList );
  }
  return (
    <Card className={classes.paper} id="cargo">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <ViewModule fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenCargo()}>
            {openCargo? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={4} sm={4}>Cargo
                  <CargoBookmark
                    cargoStore={cargo.cargo}
                    cargoBookmarkList={cargoBookmarkList}
                    goodsBookmarkList={props.goodsBookmarkList}
                    cargoTypeList={cargoTypeList}
                    cargoPackTypeLineCodeList={cargoPackTypeLineCodeList}
                    selectBookingCargoBookmark={props.selectBookingCargoBookmark}
                    selectBookingCargoGoodsBookmark={props.selectBookingCargoGoodsBookmark}
                    bookmarkYn={'Y'}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={8} sm={7}>
                <Autocomplete
                  options = {cargoBookmarkList}
                  getOptionLabel = { option => option.cargo_bookmark_name?option.cargo_bookmark_name||'':'' }
                  getOptionSelected={(option, value) => option.cargo_bookmark_name?option.cargo_bookmark_name:'' === value.cargo_bookmark_name?value.cargo_bookmark_name:''}
                  value={{cargo_bookmark_name:
                    cargoBookmarkList.find(v=>v.cargo_bookmark_seq === cargo.cargo.cargo_bookmark_seq)
                    ?cargoBookmarkList.find(v=>v.cargo_bookmark_seq === cargo.cargo.cargo_bookmark_seq).cargo_bookmark_name:''
                  }}
                  id="cargo_bookmark_seq"
                  noOptionsText="Bookmark 등록하세요."
                  onChange={(e, option)=>fncSelectCodeBookmark(option, 'cargo_bookmark_seq')}
                  renderInput={
                    params =>(<TextField inputProps={{maxLength:30}} {...params} label="Cargo Bookmark" fullWidth />)}
                />
              </GridItem>
            </GridContainer>
          </Typography>
        }
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openCargo}>
          <Divider className={classes.divider}/>
          <CargoCardBody
            // booking={booking}
            cargoStore={cargo.cargo}
            bookmarkYn={'N'}
            cargoTypeList={cargoTypeList}
            cargoPackTypeLineCodeList={cargoPackTypeLineCodeList}
            fncOnBlurCargo={fncOnBlurCargo}
            termRequire={termRequire}
            {...props}
          />
          <GridContainer>
              <GridItem xs={11} sm={11} >
              </GridItem>
              <GridItem xs={1} sm={1}>
                <IconButton onClick={()=>fncAddGoods()}>
                  <AddCircleOutline fontSize={'large'} />
                </IconButton>
              </GridItem>
            </GridContainer>
          {(goodsRelationList.length>0)?goodsRelationList.map((data,index)=>{
            return(
              <Paper className={classes.paper} key={index}>
                <GridContainer >
                  <GridItem xs={7} sm={7}>
                    <Typography variant='h6'>Items {index+1}</Typography>
                  </GridItem>
                  <GridItem xs={4} sm={4}>
                    <Autocomplete
                      options = {goodsBookmarkList}
                      getOptionLabel = { option => option.cargo_goods_bookmark_name?option.cargo_goods_bookmark_name||'':'' }
                      getOptionSelected={(option, value) => option.cargo_goods_bookmark_name?option.cargo_goods_bookmark_name:'' === value.cargo_goods_bookmark_name?value.cargo_goods_bookmark_name:''}
                      value={{cargo_goods_bookmark_name:
                        goodsBookmarkList.find(v=>v.cargo_goods_bookmark_seq === data.cargo_goods_bookmark_seq)
                        ?goodsBookmarkList.find(v=>v.cargo_goods_bookmark_seq === data.cargo_goods_bookmark_seq).cargo_goods_bookmark_name:''
                      }}
                      id="cargo_goods_bookmark_seq"
                      noOptionsText="Bookmark 등록하세요."
                      onChange={(e, option)=>fncSelectGoodsBookmark(option, 'cargo_goods_bookmark_seq', index)}
                      renderInput={
                        params =>(<TextField inputProps={{maxLength:30}} {...params} label="Cargo Item Bookmark" fullWidth />)}
                    />
                  </GridItem>
                  <GridItem xs={1} sm={1}>
                    <IconButton onClick={()=>fncDelGoods(index)}>
                      <Close fontSize={'small'} />
                    </IconButton>
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                    <FormLabel className={classes.labelHorizontal}>
                      Item
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                    <CustomInput
                      validtype="text"
                      success={data.goods_desc1?true:false}
                      error={data.goods_desc1?false:true}
                      labelText=""
                      maxLength="80"
                      id="goods_desc1"
                      formControlProps={{
                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                      }}
                      inputProps={{
                          value:data.goods_desc1?data.goods_desc1:'',
                      onChange: (e)=>fncOnChangeGoods(e, index),
                      onBlur: ()=>fncOnBlurGoods(goodsRelationList),
                      }}
                      required={!data.goods_desc1&&(data.goods_desc2||data.goods_desc3||data.goods_desc4||data.goods_desc5)?true:false}
                      feedback="cargo"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                    <FormLabel className={classes.labelHorizontal}>
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                    <CustomInput
                      validtype="text"
                      success={data.goods_desc2?true:false}
                      error={data.goods_desc2?false:true}
                      labelText=""
                      maxLength="80"
                      id="goods_desc2"
                      formControlProps={{
                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                      }}
                      inputProps={{
                          value:data.goods_desc2?data.goods_desc2:'',
                      onChange: (e)=>fncOnChangeGoods(e, index),
                      onBlur: ()=>fncOnBlurGoods(goodsRelationList),
                      }}
                      required={false}
                      feedback="cargo"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                    <FormLabel className={classes.labelHorizontal}>
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                    <CustomInput
                      validtype="text"
                      success={data.goods_desc3?true:false}
                      error={data.goods_desc3?false:true}
                      labelText=""
                      maxLength="80"
                      id="goods_desc3"
                      formControlProps={{
                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                      }}
                      inputProps={{
                          value:data.goods_desc3?data.goods_desc3:'',
                      onChange: (e)=>fncOnChangeGoods(e, index),
                      onBlur: ()=>fncOnBlurGoods(goodsRelationList),
                      }}
                      required={false}
                      feedback="cargo"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                    <FormLabel className={classes.labelHorizontal}>
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                    <CustomInput
                      validtype="text"
                      success={data.goods_desc4?true:false}
                      error={data.goods_desc4?false:true}
                      labelText=""
                      maxLength="80"
                      id="goods_desc4"
                      formControlProps={{
                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                      }}
                      inputProps={{
                          value:data.goods_desc4?data.goods_desc4:'',
                      onChange: (e)=>fncOnChangeGoods(e, index),
                      onBlur: ()=>fncOnBlurGoods(goodsRelationList),
                      }}
                      required={false}
                      feedback="cargo"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} lg={2} xl={2} className={classes.gridLabel}>
                    <FormLabel className={classes.labelHorizontal}>
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10} md={10} lg={10} xl={10}>
                    <CustomInput
                      validtype="text"
                      success={data.goods_desc5?true:false}
                      error={data.goods_desc5?false:true}
                      labelText=""
                      maxLength="80"
                      id="goods_desc5"
                      formControlProps={{
                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                      }}
                      inputProps={{
                          value:data.goods_desc5?data.goods_desc5:'',
                      onChange: (e)=>fncOnChangeGoods(e, index),
                      onBlur: ()=>fncOnBlurGoods(goodsRelationList),
                      }}
                      required={false}
                      feedback="cargo"
                    />
                  </GridItem>
                </GridContainer>
              </Paper>
              )}):
            <></>
          }
        </Collapse>
      </CardBody>
    </Card>
  );
});

function areEqual(prevProps, nextProps) {
  return (
    prevProps.openCargo === nextProps.openCargo
    && prevProps.cargo.cargo.bkg_no === nextProps.cargo.cargo.bkg_no
    && prevProps.cargo.cargo.bkg_date === nextProps.cargo.cargo.bkg_date
    && prevProps.cargo.cargo.user_no === nextProps.cargo.cargo.user_no
    && prevProps.cargo.cargo.cargo_bookmark_name === nextProps.cargo.cargo.cargo_bookmark_name
    && prevProps.cargo.cargo.cargo_name === nextProps.cargo.cargo.cargo_name
    && prevProps.cargo.cargo.cargo_hs_code === nextProps.cargo.cargo.cargo_hs_code
    && prevProps.cargo.cargo.cargo_pack_qty === nextProps.cargo.cargo.cargo_pack_qty
    && prevProps.cargo.cargo.cargo_pack_type === nextProps.cargo.cargo.cargo_pack_type
    && prevProps.cargo.cargo.cargo_remark === nextProps.cargo.cargo.cargo_remark
    && prevProps.cargo.cargo.cargo_total_volume === nextProps.cargo.cargo.cargo_total_volume
    && prevProps.cargo.cargo.cargo_total_weight === nextProps.cargo.cargo.cargo_total_weight
    && prevProps.cargo.cargo.cargo_type === nextProps.cargo.cargo.cargo_type
    && prevProps.cargo.cargo.cargo_weight === nextProps.cargo.cargo.cargo_weight
    && prevProps.cargo.cargo.selected_yn === nextProps.cargo.cargo.selected_yn
    && prevProps.cargo.cargo.cargoTypeList === nextProps.cargo.cargo.cargoTypeList
    && prevProps.cargo.cargo.cargoPackTypeLineCodeList === nextProps.cargo.cargo.cargoPackTypeLineCodeList
    && prevProps.cargoBookmarkList === nextProps.cargoBookmarkList
    && prevProps.goodsBookmarkList === nextProps.goodsBookmarkList
    && prevProps.goodsRelationList === nextProps.goodsRelationList
    && prevProps.isTerm === nextProps.isTerm
    // bookmark
    && prevProps.cargo.booking.bookmark_seq === nextProps.cargo.booking.bookmark_seq
    && prevProps.cargo.booking.other_bookmark_seq === nextProps.cargo.booking.other_bookmark_seq
    && prevProps.cargo.booking.cargo_bookmark_seq === nextProps.cargo.booking.cargo_bookmark_seq
    && prevProps.cargo.booking.line_bookmark_seq === nextProps.cargo.booking.line_bookmark_seq
    && prevProps.cargo.booking.consignee_bookmark_seq === nextProps.cargo.booking.consignee_bookmark_seq
    && prevProps.cargo.booking.container_bookmark_seq === nextProps.cargo.booking.container_bookmark_seq
    && prevProps.cargo.booking.document_bookmark_seq === nextProps.cargo.booking.document_bookmark_seq
    && prevProps.cargo.booking.forwarder_bookmark_seq === nextProps.cargo.booking.forwarder_bookmark_seq
    && prevProps.cargo.booking.schedule_bookmark_seq === nextProps.cargo.booking.schedule_bookmark_seq
    && prevProps.cargo.booking.shipper_bookmark_seq === nextProps.cargo.booking.shipper_bookmark_seq
    && prevProps.cargo.booking.transport_bookmark_seq === nextProps.cargo.booking.transport_bookmark_seq
  );
}

export default React.memo(CargoCard, areEqual);
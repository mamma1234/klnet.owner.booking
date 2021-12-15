import React,{ useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, InputLabel, Checkbox, Collapse, IconButton,
 Dialog, Grid, Divider, Avatar, CardHeader, TextFiled, FormControlLabel} from "@material-ui/core";
import {ViewComfy, UnfoldLess, UnfoldMore, AddCircleOutline, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import ContainerCardBody from './ContainerCardBody';
import ContainerBookmark from './ContainerBookmark';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import moment from 'moment';
import { observer } from 'mobx-react-lite';

const ContainerCard = observer(({containerStore, ...props}) => {
  const classes = useStyles();
  const [cntr, setCntr] = useState({});
  // const [containerList, setContainerList] = useState([]);
  // const [containerSpecialList, setContainerSpecialList] = useState([]);
  const [openContainer, setOpenContainer] = useState(true);
  const [door, setDoor] = useState({});
  const [checkCntr, setCheckCntr] = useState(true);
  const [transSelfYn, setTransSelfYn] = useState(false);
  // const [cargoPackTypeLineCodeList, setCargoPackTypeLineCodeList] = useState([]);

  const {containerBookmarkList, specialBookmarkList, cntrCodeLineCodeList} = props;
  const containerList= containerStore.containerList;

  useEffect(()=>{
    
    // 전체 북마크로 수정한 경우
    if( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
      // console.log(props.booking.bookmark_seq, props.booking.bookmark_yn, props.booking)
      if( props.booking.container_bookmark_seq ) {
        containerBookmarkList.map((element, key)=>{
          if( props.booking.container_bookmark_seq == element.container_bookmark_seq) {
              // console.log(element)
              // select로 새로운 document를 세팅한다
              // 기존 Booking 정보
              // console.log(">>>>>>>>>>>>>>>>",booking)

              containerStore.setContainerList([{
                'cntr_seq':1
                ,'key': key
                ,'container_bookmark_seq':element.container_bookmark_seq
                ,'container_bookmark_name':element.container_bookmark_name
                ,'cntr_code':element.cntr_code?element.cntr_code:containerList[0].cntr_code
                ,'cntr_empty_yn':element.cntr_empty_yn?element.cntr_empty_yn:containerList[0].cntr_empty_yn
                ,'cntr_frozen_fc':element.cntr_frozen_fc?element.cntr_frozen_fc:containerList[0].cntr_frozen_fc
                ,'cntr_frozen_tmp':element.cntr_frozen_tmp?element.cntr_frozen_tmp:containerList[0].cntr_frozen_tmp
                ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit?element.cntr_frozen_tmp_unit:containerList[0].cntr_frozen_tmp_unit
                ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address1:containerList[0].cntr_pick_up_cy_address1
                ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address2:containerList[0].cntr_pick_up_cy_address2
                ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address3:containerList[0].cntr_pick_up_cy_address3
                ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address4:containerList[0].cntr_pick_up_cy_address4
                ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address5:containerList[0].cntr_pick_up_cy_address5
                ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code?element.cntr_pick_up_cy_code:containerList[0].cntr_pick_up_cy_code
                ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name1:containerList[0].cntr_pick_up_cy_name1
                ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2?element.cntr_pick_up_cy_name2:containerList[0].cntr_pick_up_cy_name2
                ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email?element.cntr_pick_up_cy_user_email:containerList[0].cntr_pick_up_cy_user_email
                ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax?element.cntr_pick_up_cy_user_fax:containerList[0].cntr_pick_up_cy_user_fax
                ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name?element.cntr_pick_up_cy_user_name:containerList[0].cntr_pick_up_cy_user_name
                ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel?element.cntr_pick_up_cy_user_tel:containerList[0].cntr_pick_up_cy_user_tel
                ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date?element.cntr_pick_up_cy_date:containerList[0].cntr_pick_up_cy_date
                ,'cntr_pre_cooling':element.cntr_pre_cooling?element.cntr_pre_cooling:containerList[0].cntr_pre_cooling
                ,'cntr_qty':element.cntr_qty?element.cntr_qty:containerList[0].cntr_qty
                ,'cntr_seal_no':element.cntr_seal_no?element.cntr_seal_no:containerList[0].cntr_seal_no
                // ,'cntr_seq':element.cntr_seq
                ,'cntr_size':element.cntr_size?element.cntr_size:containerList[0].cntr_size
                ,'cntr_soc_yn':element.cntr_soc_yn?element.cntr_soc_yn:containerList[0].cntr_soc_yn
                ,'cntr_special_type':element.cntr_special_type?element.cntr_special_type:containerList[0].cntr_special_type
                ,'cntr_type':element.cntr_type?element.cntr_type:containerList[0].cntr_type
                ,'cntr_vent_open':element.cntr_vent_open?element.cntr_vent_open:containerList[0].cntr_vent_open
                ,'cntr_width':element.cntr_width?element.cntr_width:containerList[0].cntr_width
                ,'cntr_selected_yn':'Y'
                ,'cntr_yn': 'Y'
                , 'cntr_door_code':element.cntr_door_code?element.cntr_door_code:containerList[0].cntr_door_code
                , 'cntr_door_name1':element.cntr_door_name1?element.cntr_door_name1:containerList[0].cntr_door_name1
                , 'cntr_door_name2':element.cntr_door_name1?element.cntr_door_name2:containerList[0].cntr_door_name2
                , 'cntr_door_date':element.cntr_door_date?element.cntr_door_date:containerList[0].cntr_door_date
                , 'cntr_door_date_name':element.cntr_door_date_name?element.cntr_door_date_name:containerList[0].cntr_door_date_name
                , 'cntr_door_user_name':element.cntr_door_user_name?element.cntr_door_user_name:containerList[0].cntr_door_user_name
                , 'cntr_door_user_dept':element.cntr_door_user_dept?element.cntr_door_user_dept:containerList[0].cntr_door_user_dept
                , 'cntr_door_user_fax':element.cntr_door_user_fax?element.cntr_door_user_fax:containerList[0].cntr_door_user_fax
                , 'cntr_door_user_tel':element.cntr_door_user_tel?element.cntr_door_user_tel:containerList[0].cntr_door_user_tel
                , 'cntr_door_user_email':element.cntr_door_user_email?element.cntr_door_user_email:containerList[0].cntr_door_user_email
                , 'cntr_door_address1':element.cntr_door_address1?element.cntr_door_address1:containerList[0].cntr_door_address1
                , 'cntr_door_address2':element.cntr_door_address1?element.cntr_door_address2:containerList[0].cntr_door_address2
                , 'cntr_door_address3':element.cntr_door_address1?element.cntr_door_address3:containerList[0].cntr_door_address3
                , 'cntr_door_address4':element.cntr_door_address1?element.cntr_door_address4:containerList[0].cntr_door_address4
                , 'cntr_door_address5':element.cntr_door_address1?element.cntr_door_address5:containerList[0].cntr_door_address5
                , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:containerList[0].cntr_remark1
                , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:containerList[0].cntr_remark2
                , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:containerList[0].cntr_remark3
                , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:containerList[0].cntr_remark4
                , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:containerList[0].cntr_remark5
              }]);
              element.cntr_seq=1;

              if( containerList && containerList.length > 0 ) {
                setCntr({...containerList[0]
                    ,'container_bookmark_seq': element.container_bookmark_seq
                    ,'container_bookmark_name': element.container_bookmark_name
                    ,'cntr_selected_yn': 'Y'
                    ,'bookmark_yn': 'N'
                });
              }
              // selectBookingContainerSpecialBookmarkRelation(element);
          }
          })
      }
    } else if(  "D" === props.booking.bookmark_yn ) {
      containerStore.setContainerList([{'key':1, 'cntr_seq':1}]);
    }else if( cntr ) {
      setCntr({...cntr, ...props.booking});
    }
  },[props.booking]);

  useEffect(()=>{
    setOpenContainer(props.openContainer);
  },[props.openContainer]);

  // useEffect(()=>{
  //   // if( containerList.length() != props.containerList.lenth() ) {
  //     setContainerList(props.containerList);
  //   // }
  // },[props.containerList]);
  

  // 메인 화면에서 select 선택한 경우
  const fncSelectCodeBookmark = (e, code)=>{
    //   console.log(e.target.value)
    // 선택
    if( e ) {
      if( 1 > e.value ) {
          // setBooking({});
          // if ( coll ) {
          //     setColl(!coll)
          // }
      // 그외 데이터인 경우
      } else {
          containerBookmarkList.map((element, key)=>{
          if( e.value == element.container_bookmark_seq) {
              // console.log(element)
              // select로 새로운 document를 세팅한다
              setCntr({...cntr
                  ,'container_bookmark_seq':element.container_bookmark_seq
                  ,'container_bookmark_name':element.container_bookmark_name
                  ,'cntr_selected_yn':'Y'
              });
  
  
              let list = containerList;
  
              containerList.map((data,key)=> {
                // console.log(key, data.cntr_yn)
                  if( "Y" === data.cntr_yn ) {
                      // list[key] = Object.assign(data, element);
                      list[key] = {
                        ...data
                        ,'cntr_code':element.cntr_code?element.cntr_code:data.cntr_code
                        ,'cntr_empty_yn':element.cntr_empty_yn?element.cntr_empty_yn:data.cntr_empty_yn
                        ,'cntr_frozen_fc':element.cntr_frozen_fc?element.cntr_frozen_fc:data.cntr_frozen_fc
                        ,'cntr_frozen_tmp':element.cntr_frozen_tmp?element.cntr_frozen_tmp:data.cntr_frozen_tmp
                        ,'cntr_frozen_tmp_unit':element.cntr_frozen_tmp_unit?element.cntr_frozen_tmp_unit:data.cntr_frozen_tmp_unit
                        ,'cntr_pick_up_cy_address1':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address1:data.cntr_pick_up_cy_address1
                        ,'cntr_pick_up_cy_address2':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address2:data.cntr_pick_up_cy_address2
                        ,'cntr_pick_up_cy_address3':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address3:data.cntr_pick_up_cy_address3
                        ,'cntr_pick_up_cy_address4':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address4:data.cntr_pick_up_cy_address4
                        ,'cntr_pick_up_cy_address5':element.cntr_pick_up_cy_address1?element.cntr_pick_up_cy_address5:data.cntr_pick_up_cy_address5
                        ,'cntr_pick_up_cy_code':element.cntr_pick_up_cy_code?element.cntr_pick_up_cy_code:data.cntr_pick_up_cy_code
                        ,'cntr_pick_up_cy_name1':element.cntr_pick_up_cy_name1?element.cntr_pick_up_cy_name1:data.cntr_pick_up_cy_name1
                        ,'cntr_pick_up_cy_name2':element.cntr_pick_up_cy_name2?element.cntr_pick_up_cy_name2:data.cntr_pick_up_cy_name2
                        ,'cntr_pick_up_cy_user_email':element.cntr_pick_up_cy_user_email?element.cntr_pick_up_cy_user_email:data.cntr_pick_up_cy_user_email
                        ,'cntr_pick_up_cy_user_fax':element.cntr_pick_up_cy_user_fax?element.cntr_pick_up_cy_user_fax:data.cntr_pick_up_cy_user_fax
                        ,'cntr_pick_up_cy_user_name':element.cntr_pick_up_cy_user_name?element.cntr_pick_up_cy_user_name:data.cntr_pick_up_cy_user_name
                        ,'cntr_pick_up_cy_user_tel':element.cntr_pick_up_cy_user_tel?element.cntr_pick_up_cy_user_tel:data.cntr_pick_up_cy_user_tel
                        ,'cntr_pick_up_cy_date':element.cntr_pick_up_cy_date?element.cntr_pick_up_cy_date:data.cntr_pick_up_cy_date
                        ,'cntr_pre_cooling':element.cntr_pre_cooling?element.cntr_pre_cooling:data.cntr_pre_cooling
                        ,'cntr_qty':element.cntr_qty?element.cntr_qty:data.cntr_qty
                        ,'cntr_seal_no':element.cntr_seal_no?element.cntr_seal_no:data.cntr_seal_no
                        // ,'cntr_seq':element.cntr_seq
                        ,'cntr_size':element.cntr_size?element.cntr_size:data.cntr_size
                        ,'cntr_soc_yn':element.cntr_soc_yn?element.cntr_soc_yn:data.cntr_soc_yn
                        ,'cntr_special_type':element.cntr_special_type?element.cntr_special_type:data.cntr_special_type
                        ,'cntr_type':element.cntr_type?element.cntr_type:data.cntr_type
                        ,'cntr_vent_open':element.cntr_vent_open?element.cntr_vent_open:data.cntr_vent_open
                        ,'cntr_width':element.cntr_width?element.cntr_width:data.cntr_width
                        ,'cntr_selected_yn':'Y'
                        ,'cntr_yn': 'Y'
                        , 'cntr_door_code':element.cntr_door_code?element.cntr_door_code:data.cntr_door_code
                        , 'cntr_door_name1':element.cntr_door_name1?element.cntr_door_name1:data.cntr_door_name1
                        , 'cntr_door_name2':element.cntr_door_name1?element.cntr_door_name2:data.cntr_door_name2
                        , 'cntr_door_date':element.cntr_door_date?element.cntr_door_date:data.cntr_door_date
                        , 'cntr_door_date_name':element.cntr_door_date_name?element.cntr_door_date_name:data.cntr_door_date_name
                        , 'cntr_door_user_name':element.cntr_door_user_name?element.cntr_door_user_name:data.cntr_door_user_name
                        , 'cntr_door_user_dept':element.cntr_door_user_dept?element.cntr_door_user_dept:data.cntr_door_user_dept
                        , 'cntr_door_user_fax':element.cntr_door_user_fax?element.cntr_door_user_fax:data.cntr_door_user_fax
                        , 'cntr_door_user_tel':element.cntr_door_user_tel?element.cntr_door_user_tel:data.cntr_door_user_tel
                        , 'cntr_door_user_email':element.cntr_door_user_email?element.cntr_door_user_email:data.cntr_door_user_email
                        , 'cntr_door_address1':element.cntr_door_address1?element.cntr_door_address1:data.cntr_door_address1
                        , 'cntr_door_address2':element.cntr_door_address1?element.cntr_door_address2:data.cntr_door_address2
                        , 'cntr_door_address3':element.cntr_door_address1?element.cntr_door_address3:data.cntr_door_address3
                        , 'cntr_door_address4':element.cntr_door_address1?element.cntr_door_address4:data.cntr_door_address4
                        , 'cntr_door_address5':element.cntr_door_address1?element.cntr_door_address5:data.cntr_door_address5
                        , 'cntr_remark1':element.cntr_remark1?element.cntr_remark1:data.cntr_remark1
                        , 'cntr_remark2':element.cntr_remark1?element.cntr_remark2:data.cntr_remark2
                        , 'cntr_remark3':element.cntr_remark1?element.cntr_remark3:data.cntr_remark3
                        , 'cntr_remark4':element.cntr_remark1?element.cntr_remark4:data.cntr_remark4
                        , 'cntr_remark5':element.cntr_remark1?element.cntr_remark5:data.cntr_remark5
                      };
                      // props.fncOnBlurContainer(key, {...data, ...element});
                  }
                });
              // console.log("LIST : ", list)
              containerStore.setContainerList(list);
              element.cntr_seq=1;
              // selectBookingContainerSpecialBookmarkRelation(element);
          }
        });

      }
    } else {
      if ( cntr.container_bookmark_seq ) {
        setCntr({...cntr
          ,'container_bookmark_seq': null
          ,'container_bookmark_name': null
        });
        let list = containerList;
        
        containerList.map((data,key)=> {
          // console.log(key, data.cntr_yn)
            if( "Y" === data.cntr_yn ) {
                // list[key] = Object.assign(data, element);
                list[key] = {
                  ...data
                  ,'cntr_code': null
                  ,'cntr_empty_yn': null
                  ,'cntr_frozen_fc': null
                  ,'cntr_frozen_tmp': null
                  ,'cntr_frozen_tmp_unit': null
                  ,'cntr_pick_up_cy_address1': null
                  ,'cntr_pick_up_cy_address2': null
                  ,'cntr_pick_up_cy_address3': null
                  ,'cntr_pick_up_cy_address4': null
                  ,'cntr_pick_up_cy_address5': null
                  ,'cntr_pick_up_cy_code': null
                  ,'cntr_pick_up_cy_name1': null
                  ,'cntr_pick_up_cy_name2': null
                  ,'cntr_pick_up_cy_user_email': null
                  ,'cntr_pick_up_cy_user_fax': null
                  ,'cntr_pick_up_cy_user_name': null
                  ,'cntr_pick_up_cy_user_tel': null
                  ,'cntr_pick_up_cy_date': null
                  ,'cntr_pre_cooling': null
                  ,'cntr_qty': null
                  ,'cntr_seal_no': null
                  ,'cntr_size': null
                  ,'cntr_soc_yn': null
                  ,'cntr_special_type': null
                  ,'cntr_type': null
                  ,'cntr_vent_open': null
                  ,'cntr_width': null
                  ,'cntr_yn': 'Y'
                  , 'cntr_door_code': null
                  , 'cntr_door_name1': null
                  , 'cntr_door_name2': null
                  , 'cntr_door_date': null
                  , 'cntr_door_date_name': null
                  , 'cntr_door_user_name': null
                  , 'cntr_door_user_dept': null
                  , 'cntr_door_user_fax': null
                  , 'cntr_door_user_tel': null
                  , 'cntr_door_user_email': null
                  , 'cntr_door_address1': null
                  , 'cntr_door_address2': null
                  , 'cntr_door_address3': null
                  , 'cntr_door_address4': null
                  , 'cntr_door_address5': null
                  , 'cntr_remark1': null
                  , 'cntr_remark2': null
                  , 'cntr_remark3': null
                  , 'cntr_remark4': null
                  , 'cntr_remark5': null
                };
                // props.fncOnBlurContainer(key, {...data, ...element});
            }
          });
        // console.log("LIST : ", list)
        containerStore.setContainerList(list);
      }
    }
  }

  const fncSetOpenContainer=()=>{
    setOpenContainer(!openContainer);
    props.fncSetOpenContainer(!openContainer);
  }

  const fncAllCheckCntr =(chk)=>{
    let list = containerList;
    containerList.map((data,key)=> {
      list[key] = {...data,'cntr_yn': chk?'Y':'N' }
    });
    containerStore.setContainerList(list);
    setCheckCntr(chk);
  }

  const fncCheckCntr =(element)=>{
    let list = containerList;
    // console.log( element )
    containerList.map((data,key)=> {
      
        if( element.cntr_seq == data.cntr_seq ) {
            // console.log( element.cntr_seq, data.cntr_seq )
            list[key] = {...data,'cntr_yn': (data.cntr_yn === 'Y'?'N':'Y')}
        }
    });
    containerStore.setContainerList([...list]);
  }

  const fncAddContainerBody = ()=>{
    if( containerList.length === 999 ) {
      return false;
    }
    containerStore.setContainerList([...containerList,{'cntr_seq':containerList.length+1}]);
    props.fncAddSpecialList(props.containerSpecialList);
  }
  const fncDelContainer = (key)=>{
    if( containerList.length === 1 ) {
      containerStore.setContainerList([{'cntr_seq':1}]);
      // props.fncOnBlurContainer( [{'cntr_seq':1}] );
    } else {
        // const cntrIdx = goodsRelationList.findIndex(function(item){return item.cntr_seq === cntr_seq });
        //  Splice의 경우 return값이 아닌 splice 처리후 적용
        if(key > -1) containerList.splice(key,1);
        containerStore.setContainerList([...containerList]);
        // props.fncOnBlurContainer([...containerList]);
    }
  }

  const fncOnBlurContainerBody =(index, container)=> {
    const list = containerList.map( (data, key) => index === key?{...data, ...container}: data);
    // console.log("CNTR>", container, list, list[0])
    containerStore.setContainerList(list);
    // props.fncOnBlurContainer(index,container);
    // console.log("aaaaabbbbbb", index,container)
    // if( container && 'Y' === container.delete ) {
    //   if(index > -1) containerList.splice(index,1);
    //   // console.log(containerList);
    //   setContainerList([...containerList]);
    //   props.fncOnBlurContainer([...containerList]);
    // } else {
    //   containerList[index] = container;
    //   setContainerList([...containerList]);
    // }
    
  }

  return (
    <Card className={classes.paper} id="container">
      {/* {console.log("containerCard Realod", isTerm)} */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <ViewComfy fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenContainer()}>
            {openContainer? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={4} sm={4}>Container
                  <ContainerBookmark
                    containerBookmarkList={containerBookmarkList}
                    cntrCodeLineCodeList={cntrCodeLineCodeList}
                    selectBookingContainerBookmark={props.selectBookingContainerBookmark}
                    lineCodeVesselPickup={props.lineCodeVesselPickup}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={12} sm={7}>
                <Autocomplete
                    options = {containerBookmarkList}
                    getOptionLabel = { option => option.container_bookmark_name?option.container_bookmark_name:'' }
                    getOptionSelected={(option, value) => option.container_bookmark_name?option.container_bookmark_name:'' === value.container_bookmark_name?value.container_bookmark_name:''}
                    value={{container_bookmark_name:
                      containerBookmarkList.find(v=>v.container_bookmark_seq === cntr.container_bookmark_seq)
                      ?containerBookmarkList.find(v=>v.container_bookmark_seq === cntr.container_bookmark_seq).container_bookmark_name:''
                    }}
                    id="container_bookmark_seq"
                    noOptionsText="Bookmark 등록하세요."
                    onChange={(e, option)=>fncSelectCodeBookmark(option, 'container_bookmark_seq')}
                    renderInput={
                      params =>(<TextField inputProps={{maxLength:30}} {...params} label="Container Bookmark" fullWidth />)}
                  />
              </GridItem>
            </GridContainer>
          </Typography>
        }
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openContainer}>
          <Divider className={classes.divider}/>
            <GridContainer style={{marginBottom: '0px', marginTop: '0px', paddingTop: '0px', paddingBottom: '0px'}}>
              <GridItem xs={11} sm={11} >
                <Checkbox checked={checkCntr} onChange={(event)=>fncAllCheckCntr(event.target.checked)} inputProps={{'aria-label':'secondary checkbox'}}></Checkbox>
              </GridItem>
              <GridItem xs={1} sm={1}>
                <IconButton onClick={()=>fncAddContainerBody()}>
                  <AddCircleOutline fontSize={'large'} />
                </IconButton>
              </GridItem>
            </GridContainer>
            {(containerList)?containerList.map((data, index)=>{
              return(
                <>
                <ContainerCardBody
                  key={index}
                  container={data}
                  index={index}
                  cntrCodeLineCodeList={cntrCodeLineCodeList}
                  fncOnBlurContainerBody={fncOnBlurContainerBody}
                  bookmarkYn={'N'}
                  containerSpecialList={props.containerSpecialList}
                  fncOnBlurSpecialList={props.fncOnBlurSpecialList}
                  lineCodeVesselPickup={props.lineCodeVesselPickup}
                  fncDelContainer={fncDelContainer}
                  {...props}
                />
                <Divider className={classes.divider}/>
                </>
            )}):<></>}
        </Collapse>
      </CardBody>
    </Card>
  );
});

function areEqual(prevProps, nextProps) {
  return(
    prevProps.openContainer === nextProps.openContainer
    && prevProps.booking.bkg_no === nextProps.booking.bkg_no
    && prevProps.booking.bkg_date === nextProps.booking.bkg_date
    && prevProps.booking.user_no === nextProps.booking.user_no
    && prevProps.containerBookmarkList === nextProps.containerBookmarkList
    && prevProps.specialBookmarkList === nextProps.specialBookmarkList
    && prevProps.cntrCodeLineCodeList === nextProps.cntrCodeLineCodeList
    && prevProps.containerSpecialList === nextProps.containerSpecialList
    && prevProps.lineCodeVesselPickup === nextProps.lineCodeVesselPickup
    // && prevProps.booking.trans_service_code === nextProps.booking.trans_service_code
    && prevProps.isTerm === nextProps.isTerm
    && prevProps.isTransSelfYn === nextProps.isTransSelfYn
    && prevProps.isSchEta === nextProps.isSchEta
    && prevProps.isCargoType === nextProps.isCargoType
    // // bookmark
    && prevProps.booking.bookmark_yn === nextProps.booking.bookmark_yn
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


export default React.memo(ContainerCard, areEqual);
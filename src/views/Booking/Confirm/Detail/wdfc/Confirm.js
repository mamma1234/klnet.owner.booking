import React,{ useState, useEffect } from "react";

import axios from "axios";
import {useStyles} from 'views/Booking/BKG/styles';
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import moment from 'moment';
import { Card, Tooltip, Collapse, IconButton, Divider, //Paper,
    Avatar, CardHeader, InputLabel,FormControl, Input} from "@material-ui/core";
import {GolfCourse, UnfoldLess, UnfoldMore, Schedule, 
    DirectionsBoat, Map, NotificationsActive, HowToVote, ViewModule, ViewComfy} from "@material-ui/icons";
import * as validation from 'components/common/validation.js';
    
export default function Confirm(props) {
    const classes = useStyles();
    const [confirm, setConfirm] = useState({});
    
    const [cargo, setCargo] = useState([]);
    const [cargoGoods, setCargoGoods] = useState([]);
    const [cntr, setCntr] = useState([]);
    const [cntrSpecials, setCntrSpecails] = useState([]);

   const [param, setParam] = useState({user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : '' , 
            res_bkg_no: props.location.state && props.location.state.res_bkg_no  ?  props.location.state.res_bkg_no || '' : '' , 
            res_confirm_date: props.location.state && props.location.state.res_confirm_date  ?  props.location.state.res_confirm_date || '' : '' });
    
/*    const [param, setParam] = useState({user_no: 'SAND6083' , 
            res_bkg_no: 'BKG2103040203' , 
            res_confirm_date: '20210405' });*/
    
    const [openBooking, setOpenBooking] = useState(true);
    const [openSchedule, setOpenSchedule] = useState(true);
    const [openShipper, setOpenShipper] = useState(true);
    const [openCarrier, setOpenCarrier] = useState(true);
    const [openNotify, setOpenNotify] = useState(true);
    const [openConsignee, setOpenConsignee] = useState(true);
    const [openCargo, setOpenCargo] = useState(true);
    const [openContainer, setOpenContainer] = useState(true);

    const {userData} = props;

    useEffect(()=>{ //console.log("main:",param)
        if ( param.user_no.length > 0 && param.res_bkg_no.length > 0 ) {
        	selectShpConfirm();
        }
    }, [param]);

    const selectShpConfirm = ( ) => {
        axios.post(
            "/shipper/selectShpConfirm"
            , param
            ,{}
        ).then( res => {
            if(res.data && res.data.length > 0) {
              setConfirm(res.data[0]);
              selectShpConfirmCargo(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date, res.data[0].line_code);
              selectShpConfirmCntr(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date, res.data[0].line_code, res.data[0].sch_vessel_name);
              selectShpConfirmCntrSpecial(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date);
            } else {
              props.alert(null,null,'danger',true,false,'lg',"조회된 결과가 없습니다.",true,false);
            }
          }).catch(err => {
            if(err.response.status) {
                props.alert(null,null,'danger',true,false,'lg',"오류가 발생했습니다.",true,false);
            }
        });
      }

    const renderLabel = (id, source, target) => {
        const style = {textDecoration:"underline", color:"blue", paddingTop:'0',marginBottom:'10px'};
       // console.log(source !== target, source,target)
        return (
            <>
            {(source !== target)?
                <Tooltip arrow placement="top" title={target ? target:''}>
                    <Input 
                        className="form-control-sm form-control mb-0"
                        fullWidth={true}
                        style={{textDecoration:"underline", color:"blue", paddingTop:'0',marginBottom:'10px'}}
                        id={id}
                        disabled
                        value={source ? source:''}>
                    </Input>
                </Tooltip>:
                <Input 
                    className="form-control-sm form-control mb-0"
                    style={{paddingTop:'0',marginBottom:'10px', color:"black"}}
                    id={id}
                    disabled
                    fullWidth={true}
                    value={source ? source:''}>
                </Input>
            }
            </>
        );
    }
    
    const selectShpConfirmCargo = ( user_no, res_bkg_no, res_confirm_date, line_code ) => {
        axios.post(
            "/shipper/selectShpConfirmCargo"
            , { user_no, res_bkg_no, res_confirm_date, line_code }
            ,{}
        ).then( res => {
            if(res.data && res.data.length > 0) {
                setCargo(res.data);
                selectShpConfirmCargoGoods(res.data[0].user_no, res.data[0].res_bkg_no, res.data[0].res_confirm_date, res.data[0].cargo_seq);

            console.log('res.data=',res.data);

            } 
          }).catch(err => {
            if(err.response.status) {
                props.alert(null,null,'danger',true,false,'lg',"오류가 발생했습니다.",true,false);
            }
        });
      }
    
      const selectShpConfirmCargoGoods = ( user_no, res_bkg_no, res_confirm_date, cargo_seq ) => {
        axios.post(
            "/shipper/selectShpConfirmCargoGoods"
            , { user_no, res_bkg_no, res_confirm_date, cargo_seq }
            ,{}
        ).then( res => {
            if(res.data && res.data.length > 0) {
                setCargoGoods(res.data);
            } 
          }).catch(err => {
            if(err.response.status) {
            	props.alert(null,null,'danger',true,false,'lg',"오류가 발생했습니다.",true,false);
            }
        });
      }

      const selectShpConfirmCntr = ( user_no, res_bkg_no, res_confirm_date, line_code, sch_vessel_name ) => {
        axios.post(
            "/shipper/selectShpConfirmCntr"
            , { user_no, res_bkg_no, res_confirm_date, line_code, sch_vessel_name }
            ,{}
        ).then( res => {
            if(res.data && res.data.length > 0) {
              setCntr(res.data);
            } 
          }).catch(err => {
            if(err.response.status) {
                props.alert(null,null,'danger',true,false,'lg',"오류가 발생했습니다.",true,false);
            }
        });
      }

      const selectShpConfirmCntrSpecial = ( user_no, res_bkg_no, res_confirm_date ) => {
        axios.post(
            "/shipper/selectShpConfirmCntrSpecial"
            , { user_no, res_bkg_no, res_confirm_date }
            ,{}
        ).then( res => {
            console.log('spsp res.data ', res.data);
            if(res.data && res.data.length > 0) { console.log('spsp res.data ');
              setCntrSpecails(res.data);
            } 
          }).catch(err => {
            if(err.response.status) {
                props.alert(null,null,'danger',true,false,'lg',"오류가 발생했습니다.",true,false);
            }
        });
      }
      

      const sendBooking = async(status)=> {
        /*  if( !user ) {
              props.onAlert("error",validation.NOTLOGIN_MSG);   
              return false;
          }*/

          if( !confirm.bkg_no ) return false;

          if( "N" === confirm.bkg_exists_yn) {
              props.alert(null,null,'danger',true,false,'lg',"Confirm에 대한 Requset(Booking) 정보가 없습니다. 취소 불가합니다.",true,false);
              return false;
          }
          let message = "["+ confirm.bkg_no+"] Booking 을(를) 취소 하시겠습니까?"; 
          props.alert(cancleBooking,'Are you sure?','warning',true,true,'lg',message,true,true); 	
  
      }
      
    const cancleBooking=()=>{
    		props.alert(null,null,'info',null,false,'lg',null,false,false);
    	
            if( !('RA' === confirm.status_cus) ) {
                props.alert(null,null,'danger',true,false,'lg',"부킹취소는 승인 인 경우에만 가능합니다.",true,false);
                return false;
            }

            // 취소인 경우
            axios.post(
                "/shipper/sendBooking"
                ,{
                user_no : userData?userData.user_no:null,
                status : 'CANCEL',
                booking :{
                    bkg_no: confirm.bkg_no,
                    bkg_date: confirm.bkg_date,
                    user_no: confirm.user_no
                }
                }
                ,{}
            ).then(
                // INSERT 결과값 넣기
                res => {
                    props.alert(null,null,'success',true,false,'lg',validation.SEND_MSG,true,false)
                    selectShpConfirm();
                }   
            );

    }

    return (
        <React.Fragment>
            <div style={{paddingLeft:'5%',paddingRight:'5%'}}>
                <Card className={classes.booking_title}>
                    <CardBody>
                        <GridItem xs={12} sm={12} style={{textAlign:'right'}}>
                            <Button color="info" onClick={(e)=>selectShpConfirm()}>SEARCH</Button>
                            <Button color="info" onClick={(e)=>sendBooking('CANCEL')}>CANCLE</Button>
                        </GridItem>
                    </CardBody>
                </Card>
                <GridContainer justify="space-between">
                    <GridItem lg={6} md={6} sm={6} xs={12}>
                        <GridContainer>
                            <GridItem lg={6} md={6} sm={6} xs={12}>
                                <CustomInput
                                    labelText="Booking Number *"
                                    id="bkg_no"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                                    }}
                                    labelProps={{style:{top:'0'}}}
                                    inputProps={{
                                        value:confirm.res_bkg_no?confirm.res_bkg_no:'',
                                        disabled:true 
                                    }}
                                />
                            </GridItem>
                            <GridItem lg={3} md={3} sm={3} xs={12}>
                            <FormControl fullWidth style={{marginBottom:'10px'}}>
                                <CustomInput
                                    labelText="Confirm Date"
                                    id="confirm_date"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                                    }}
                                    labelProps={{style:{top:'0'}}}
                                    inputProps={{
                                        value:confirm.res_confirm_date?confirm.res_confirm_date:'',
                                        disabled:true 
                                    }}
                                />
                            </FormControl>
                            </GridItem>
                            <GridItem lg={3} md={3} sm={3} xs={12}>
                                <CustomInput
                                    labelText="Status"
                                    id="status"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                                    }}
                                    labelProps={{style:{top:'0'}}}
                                    inputProps={{
                                        value:(() => {
                                            switch(confirm.status_cus) {
                                                case 'RA': return '승인';
                                                case 'EJ': return '거절';
                                                case 'EC': return '취소승인';
                                                case 'EA': return '승인취소';
                                                default: return ''; break;
                                            }
                                            }).call(this),
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>   
                </GridContainer>
                <Card className={classes.paper} id="booking">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <GolfCourse fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenBooking(!openBooking)}>
                                {openBooking? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Booking
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openBooking}>
                        <Divider className={classes.divider}/>
                        <GridContainer>
                        	<GridItem lg={6} md={6} sm={6} xs={12}>
                        		<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Req Booking
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                <CustomInput
		                                    validtype="text"
		                                    labelText=""
		                                    id="bkg_no"
		                                    formControlProps={{
		                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
		                                    }}
		                                    inputProps={{
		                                        value:confirm.bkg_no?confirm.bkg_no:'',
		                                        style:{height:'30px'},
		                                        disabled:true
		                                    }}
		                                />
		                            </GridItem>  
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                    		<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Remark 1
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                <CustomInput
		                                    validtype="text"
		                                    labelText=""
		                                    id="res_remark1"
		                                    formControlProps={{
		                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
		                                    }}
		                                    inputProps={{
		                                        value:confirm.res_remark1?confirm.res_remark1:'',
		                                        style:{height:'30px'},
		                                        disabled:true
		                                    }}
		                                />
		                            </GridItem>  
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
		                		<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Remark 2
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                <CustomInput
		                                    validtype="text"
		                                    labelText=""
		                                    id="res_remark2"
		                                    formControlProps={{
		                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
		                                    }}
		                                    inputProps={{
		                                        value:confirm.res_remark2?confirm.res_remark2:'',
		                                        style:{height:'30px'},
		                                        disabled:true
		                                    }}
		                                />
		                            </GridItem>  
		                        </GridContainer>
		                    </GridItem>
		                            
                            </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>
                
                <Card className={classes.paper} id="schedule">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <Schedule fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenSchedule(!openSchedule)}>
                                {openSchedule? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Schedule
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openSchedule}>
                        <Divider className={classes.divider}/>
                        <GridContainer>
                       		<GridItem lg={6} md={6} sm={6} xs={12}>
                       			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Vessel
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_vessel_name", confirm.sch_vessel_name, confirm.t_sch_vessel_name)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Voyage
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_vessel_voyage", confirm.sch_vessel_voyage, confirm.t_sch_vessel_voyage)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Call Sign
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_call_sign", confirm.sch_call_sign, confirm.t_sch_call_sign)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                On Board
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_led", confirm.sch_led, confirm.t_sch_led)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Doc Close
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_dct", confirm.sch_dct, confirm.t_sch_dct)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Carry Close
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_cct", confirm.sch_cct, confirm.t_sch_cct)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                T.S Y/N
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("sch_ts_yn", confirm.sch_ts_yn, confirm.t_sch_ts_yn)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                POL
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={4} sm={4}>
		                                {renderLabel("sch_pol", confirm.sch_pol, confirm.t_sch_pol)}
		                            </GridItem>
		                            <GridItem xs={6} sm={6}>
		                                {renderLabel("sch_pol_name", confirm.sch_pol_name, confirm.t_sch_pol_name)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                POD
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={4} sm={4}>
		                                {renderLabel("sch_pod", confirm.sch_pod, confirm.t_sch_pod)}
		                            </GridItem>
		                            <GridItem xs={6} sm={6}>
		                                {renderLabel("sch_pod_name", confirm.sch_pod_name, confirm.t_sch_pod_name)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                POR
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={4} sm={4}>
		                                {renderLabel("sch_por", confirm.sch_por, confirm.t_sch_por)}
		                            </GridItem>
		                            <GridItem xs={6} sm={6}>
		                                {renderLabel("sch_por_name", confirm.sch_por_name, confirm.t_sch_por_name)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                PLD
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={4} sm={4}>
		                                {renderLabel("sch_pld", confirm.sch_pld, confirm.t_sch_pld)}
		                            </GridItem>
		                            <GridItem xs={6} sm={6}>
		                                {renderLabel("sch_pld_name", confirm.sch_pld_name, confirm.t_sch_pld_name)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                FPD
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={4} sm={4}>
		                                {renderLabel("sch_fpd", confirm.sch_fpd, confirm.t_sch_fpd)}
		                            </GridItem>
		                            <GridItem xs={6} sm={6}>
		                                {renderLabel("sch_fpd_name", confirm.sch_fpd_name, confirm.t_sch_fpd_name)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={2} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                ETD
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={10} sm={10}>
		                                {renderLabel("sch_etd", confirm.sch_pol, confirm.t_sch_pol)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
	                   			<GridContainer>
		                   			<GridItem xs={2} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                ETA
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={10} sm={10}>
		                                {renderLabel("sch_eta", confirm.sch_etd, confirm.t_sch_etd)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
                            
                            </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>
                <Card className={classes.paper} id="shipper">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <DirectionsBoat fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenShipper(!openShipper)}>
                                {openShipper? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Shipper
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openShipper}>
                        <Divider className={classes.divider}/>
                        <GridContainer>
	                        <GridItem lg={6} md={6} sm={6} xs={12}>
	               				<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Name
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={5} sm={5}>
		                                {renderLabel("shp_name1", confirm.shp_name1, confirm.t_shp_name1)}
		                            </GridItem>
		                            <GridItem xs={5} sm={5}>
	                                	{renderLabel("shp_name2", confirm.shp_name2, confirm.t_shp_name2)}
	                                </GridItem>
		                         </GridContainer>
		                    </GridItem>  
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
               					<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Code
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                <CustomInput
		                                    validtype="text"
		                                    labelText=""
		                                    id="shp_code"
		                                    formControlProps={{
		                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
		                                    }}
		                                    inputProps={{
		                                        value:confirm.shp_code? confirm.shp_code:'',
		                                        style:{height:'30px'},
		                                        disabled:true
		                                    }}
		                                />
		                            </GridItem>
		                       </GridContainer>
		                    </GridItem>  
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
           						<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Address1
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("shp_address1", confirm.shp_address1, confirm.t_shp_address1)}
		                            </GridItem>
                                 </GridContainer>
                            </GridItem>  
                            <GridItem lg={6} md={6} sm={6} xs={12}>
       							<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}> Address2
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("shp_address2", confirm.shp_address2, confirm.t_shp_address2)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
   								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}> Address3
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("shp_address3", confirm.shp_address3, confirm.t_shp_address3)}
		                            </GridItem>
		                         </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address4
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("shp_address4", confirm.shp_address4, confirm.t_shp_address4)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address5
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("shp_address5", confirm.shp_address5, confirm.t_shp_address5)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
                            </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>
                <Card className={classes.paper} id="carrier">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <Map fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenCarrier(!openCarrier)}>
                                {openCarrier? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Carrier
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openCarrier}>
                        <Divider className={classes.divider}/>
                        <GridContainer>
	                        <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Name
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={5} sm={5}>
		                                {renderLabel("line_name1", confirm.line_name1, confirm.t_line_name1)}
		                            </GridItem>
		                            <GridItem xs={5} sm={5}>
		                                {renderLabel("line_name2", confirm.line_name2, confirm.t_line_name2)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem> 
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Code
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_code", confirm.line_code, confirm.t_line_code)}
		                            </GridItem>
		                        </GridContainer>
		                   </GridItem>
		                   <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Dept
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_user_dept", confirm.line_user_dept, confirm.t_line_user_dept)}
		                            </GridItem>
		                        </GridContainer>
		                    </GridItem>
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Person
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_user_name", confirm.line_user_name, confirm.t_line_user_name)}
		                            </GridItem>
	                            </GridContainer>
	                        </GridItem>
	                        <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Address1
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_address1", confirm.line_address1, confirm.t_line_address1)}
		                            </GridItem>
	                            </GridContainer>
		                    </GridItem>
	                        <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address2
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_address2", confirm.line_address2, confirm.t_line_address2)}
		                            </GridItem>
		                        </GridContainer>
			                </GridItem>      
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
		                    	<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address3
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_address3", confirm.line_address3, confirm.t_line_address3)}
		                            </GridItem>
		                        </GridContainer>
			                </GridItem>   
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address4
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_address4", confirm.line_address4, confirm.t_line_address4)}
		                            </GridItem>
		                        </GridContainer>
					        </GridItem>      
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>      
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address5
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_address5", confirm.line_address5, confirm.t_line_address5)}
		                            </GridItem>
		                         </GridContainer>
			                 </GridItem>       
                            </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>
                <Card className={classes.paper} id="notify">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <NotificationsActive fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenNotify(!openNotify)}>
                                {openNotify? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Notify
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openNotify}>
                        <Divider className={classes.divider}/>
                        <GridContainer>
	                        <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Name
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={5} sm={5}>
		                                {renderLabel("noti1_name1", confirm.noti1_name1, confirm.t_noti_name1)}
		                            </GridItem>
		                            <GridItem xs={5} sm={5}>
	                                	{renderLabel("noti1_name2", confirm.noti1_name2, confirm.t_noti_name2)}
	                                </GridItem>
	                                </GridContainer>
	   			                 </GridItem>       
		                    <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
                           
	                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
	                                <InputLabel style={{ color: "#AAAAAA" }}>
	                                Code
	                                </InputLabel>
	                            </GridItem>
	                            <GridItem xs={12} sm={10}>
	                                {renderLabel("noti1_code", confirm.noti1_code, confirm.t_noti_code)}
	                            </GridItem>
	                            </GridContainer>
				                 </GridItem>  
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Address1
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("noti1_address1", confirm.noti1_address1, confirm.t_noti1_address1)}
		                            </GridItem>
		                            </GridContainer>
					                 </GridItem>         
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address2
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("noti1_address2", confirm.noti1_address2, confirm.t_noti1_address2)}
		                            </GridItem>
		                            </GridContainer>
					                 </GridItem>   
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address3
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("noti1_address3", confirm.noti1_address3, confirm.t_noti1_address3)}
		                            </GridItem>
		                        </GridContainer>
					        </GridItem>        
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address4
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("noti1_address4", confirm.noti1_address4, confirm.t_noti1_address4)}
		                            </GridItem>
		                        </GridContainer>
					        </GridItem>     
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address5
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("noti1_address5", confirm.noti1_address5, confirm.t_noti_address5)}
		                            </GridItem>
		                        </GridContainer>
					        </GridItem>  
                            </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>

                <Card className={classes.paper} id="consignee">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <HowToVote fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenConsignee(!openConsignee)}>
                                {openConsignee? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Consignee
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openConsignee}>
                        <Divider className={classes.divider}/>
                        <GridContainer>
                        <GridItem lg={6} md={6} sm={6} xs={12}>
						<GridContainer>      
                        <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Name
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("cons_name1", confirm.cons_name1, confirm.t_cons_name1)}
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("cons_name2", confirm.cons_name2, confirm.t_cons_name2)}
                            </GridItem>
                            </GridContainer>
			                 </GridItem>  
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>  
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>
		                                Address1
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("cons_address1", confirm.cons_address1, confirm.t_cons_address1)}
		                            </GridItem>
		                            </GridContainer>
					                 </GridItem> 
					        <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer>         
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address2
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("line_address2", confirm.line_address2, confirm.t_line_address2)}
		                            </GridItem>
		                            </GridContainer>
					                 </GridItem> 
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer> 
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address3
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("cons_address3", confirm.cons_address3, confirm.t_cons_address3)}
		                            </GridItem>
		                            </GridContainer>
					                 </GridItem> 
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer> 
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address4
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("cons_address4", confirm.cons_address4, confirm.t_cons_address4)}
		                            </GridItem>
		                            </GridContainer>
					                 </GridItem> 
                            <GridItem lg={6} md={6} sm={6} xs={12}>
								<GridContainer> 
		                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                <InputLabel style={{ color: "#AAAAAA" }}>Address5
		                                </InputLabel>
		                            </GridItem>
		                            <GridItem xs={12} sm={10}>
		                                {renderLabel("cons_address5", confirm.cons_address5, confirm.t_cons_address5)}
		                            </GridItem>
		                            </GridContainer>
					             </GridItem> 
		                    </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>
                
                <Card className={classes.paper} id="cargo">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <ViewModule fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenCargo(!openCargo)}>
                                {openCargo? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Cargo
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openCargo}>
                        <Divider className={classes.divider}/>
                            {cargo.map((data, index)=>(
                                <GridContainer key={index.toString()}>
	                                <GridItem lg={6} md={6} sm={6} xs={12}>
										<GridContainer>  
											<GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                        Cargo Type
		                                        </InputLabel>
		                                    </GridItem>
											 <GridItem xs={12} sm={10}>
		                                        {renderLabel("cargo_pack_type_name"+"_"+index.toString(), data.cargo_pack_type_name, data.t_cargo_pack_type_name)}
		                                    </GridItem>
		                                </GridContainer>
				                    </GridItem> 
	                                <GridItem lg={6} md={6} sm={6} xs={12}>
										<GridContainer>  
		                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                        Pkg Qty
		                                        </InputLabel>
		                                    </GridItem>
		                                    <GridItem xs={12} sm={10}>
		                                        {renderLabel("cargo_pack_qty"+"_"+index.toString(), data.cargo_pack_qty, data.t_cargo_pack_qty)}
		                                    </GridItem>
		                                </GridContainer>
		                            </GridItem>
		                            <GridItem lg={6} md={6} sm={6} xs={12}>
										<GridContainer>  
		                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                        Pkg Type
		                                        </InputLabel>
		                                    </GridItem>
		                                    <GridItem xs={12} sm={10}>
		                                        {renderLabel("cargo_pack_type_name"+"_"+index.toString(), data.cargo_pack_type_name, data.t_cargo_pack_type_name)}
		                                    </GridItem>
		                                </GridContainer>
				                    </GridItem> 
				                    <GridItem lg={6} md={6} sm={6} xs={12}>
										<GridContainer>  
		                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                        Total Weight
		                                        </InputLabel>
		                                    </GridItem>
		                                    <GridItem xs={12} sm={10}>
		                                        {renderLabel("cargo_total_weight"+"_"+index.toString(), data.cargo_total_weight, data.t_cargo_total_weight)}
		                                    </GridItem>
		                                </GridContainer>
				                    </GridItem> 
				               
                                    
                               
                                        { (0<cargoGoods.length) ?
                                        		cargoGoods.map((element,key)=> 
                                  
	                                            <GridItem  key={key} lg={12} md={12} sm={12} xs={12}>
	                                                <Card >
	                                                    <CardBody >
	                                                        <GridItem xs={12} sm={12} className={classes.gridLabel}>
	                                                            <InputLabel style={{ color: "#AAAAAA" }}>
	                                                            {key+1}. Cargo Description
	                                                            </InputLabel>
	                                                        </GridItem>
	                                                        <GridItem xs={12} sm={12}>
	                                                            {renderLabel("goods_desc"+"_"+index.toString(), element.goods_desc1, element.t_goods_desc1)}
	                                                        </GridItem>
	                                                        <GridItem xs={12} sm={12}>
	                                                            {renderLabel("goods_desc"+"_"+index.toString(), element.goods_desc2, element.t_goods_desc2)}
	                                                        </GridItem>
	                                                        <GridItem xs={12} sm={12}>
	                                                            {renderLabel("goods_desc"+"_"+index.toString(), element.goods_desc3, element.t_goods_desc3)}
	                                                        </GridItem>
	                                                        <GridItem xs={12} sm={12}>
	                                                            {renderLabel("goods_desc"+"_"+index.toString(), element.goods_desc4, element.t_goods_desc4)}
	                                                        </GridItem>
	                                                        <GridItem xs={12} sm={12}>
	                                                            {renderLabel("goods_desc"+"_"+index.toString(), element.goods_desc5, element.t_goods_desc5)}
	                                                        </GridItem>
	                                                    </CardBody>
	                                                </Card>
	                                            </GridItem>
	                                      
                                            ):
                                        <></>}
                                        </GridContainer>
                            ))}
                        </Collapse>
                    </CardBody>
                </Card>

                <Card className={classes.paper} id="container">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <ViewComfy fontSize={'large'}/>
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={()=>setOpenContainer(!openContainer)}>
                                {openContainer? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
                            </IconButton>
                        }
                        title={
                            <Typography variant='h5'>
                                <GridContainer>
                                    <GridItem xs={4} sm={10} style={{marginTop:'8px'}}>
                                        Container
                                    </GridItem>
                                </GridContainer>
                            </Typography>
                        }
                    >
                    </CardHeader>
                    <CardBody>
                        <Collapse in={openContainer}>
                        <Divider className={classes.divider}/>
                            <GridContainer>
                                {cntr.map((cntr, index)=>(
                                    <GridItem key={index} lg={12} md={12} sm={12} xs={12} style={{marginBottom:'30px'}}>
                                        <Card>
                                            <CardBody >
                                                <GridContainer>
                                                
                                                    <GridItem xs={12} sm={12} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                            {index+1}. {cntr.cntr_code}
                                                        </InputLabel>
                                                    </GridItem> 
                                                    <GridItem lg={4} md={4} sm={4} xs={12}>
            											<GridContainer>
		                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
		                                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                                        Size/Type
		                                                        </InputLabel>
		                                                    </GridItem>
		                                                    <GridItem xs={12} sm={9}>
		                                                        {renderLabel("cntr_code"+"_"+index.toString(), cntr.cntr_code, cntr.t_cntr_code)}
		                                                    </GridItem>
		                                                </GridContainer>
		                                            </GridItem>
		                                            <GridItem lg={4} md={4} sm={4} xs={12}>
	        											<GridContainer>
		                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                                        Qty
		                                                        </InputLabel>
		                                                    </GridItem>
		                                                    <GridItem xs={12} sm={10}>
		                                                        {renderLabel("cntr_qty"+"_"+index.toString(), cntr.cntr_qty, cntr.t_cntr_qty)}
		                                                    </GridItem>
		                                                </GridContainer>
		                                            </GridItem>
		                                            <GridItem lg={4} md={4} sm={4} xs={12}>
	        											<GridContainer>
		                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                                        SOC
		                                                        </InputLabel>
		                                                    </GridItem>
		                                                    <GridItem xs={12} sm={10}>
		                                                        {renderLabel("cntr_soc_yn"+"_"+index.toString(), cntr.cntr_soc_yn, cntr.t_cntr_soc_yn)}
		                                                    </GridItem>
		                                                </GridContainer>
		                                            </GridItem>	
		                                            <GridItem lg={6} md={6} sm={6} xs={12}>
	        											<GridContainer>
		                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
		                                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                                        Pick Up CY
		                                                        </InputLabel>
		                                                    </GridItem>
		                                                    <GridItem xs={12} sm={10}>
		                                                        {renderLabel("pickup_cy_name"+"_"+index.toString(), cntr.pickup_cy_name, cntr.t_pickup_cy_name)}
		                                                    </GridItem>
		                                                </GridContainer>
		                                            </GridItem>
		                                            <GridItem lg={6} md={6} sm={6} xs={12}>
	        											<GridContainer>
		                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
		                                                        <InputLabel style={{ color: "#AAAAAA" }}>
		                                                        Pick Up Date
		                                                        </InputLabel>
		                                                    </GridItem>
		                                                    <GridItem xs={12} sm={9}>
		                                                        {renderLabel("cntr_pick_up_date"+"_"+index.toString(), cntr.cntr_pick_up_date?moment(cntr.cntr_pick_up_date).format('YYYY-MM-DD'):'', 
		                                                        		cntr.t_cntr_pick_up_date?moment(cntr.t_cntr_pick_up_date).format('YYYY-MM-DD'):'')}
		                                                    </GridItem>
		                                                </GridContainer>
		                                            </GridItem>
		                                            <GridItem lg={12} md={12} sm={12} xs={12} style={{maringTop:'10px'}}>
			                                            <Card >
			                                              <InputLabel style={{ color: "#AAAAAA" }}>Pick Up</InputLabel>
	                                                    	<CardBody >
	                                                    		<GridContainer>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
					        											<GridContainer>
						                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        CY Name
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={10}>
						                                                        {renderLabel("cntr_pick_up_cy_name1"+"_"+index.toString(), cntr.cntr_pick_up_cy_name1, cntr.t_cntr_pick_up_cy_name1)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						                                                   {renderLabel("cntr_pick_up_cy_name2"+"_"+index.toString(), cntr.cntr_pick_up_cy_name2, cntr.t_cntr_pick_up_cy_name2)}
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
					        											<GridContainer>
						                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        Cy Address
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={9}>
						                                                        {renderLabel("cntr_pick_up_cy_address1"+"_"+index.toString(), cntr.cntr_pick_up_cy_address1, cntr.t_cntr_pick_up_cy_address1)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						                                                {renderLabel("cntr_pick_up_cy_address2"+"_"+index.toString(), cntr.cntr_pick_up_cy_address2, cntr.t_cntr_pick_up_cy_address2)}
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
					        											<GridContainer>
						                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={9}>
						                                                        {renderLabel("cntr_pick_up_cy_address3"+"_"+index.toString(), cntr.cntr_pick_up_cy_address3, cntr.t_cntr_pick_up_cy_address3)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						                                            	{renderLabel("cntr_pick_up_cy_address4"+"_"+index.toString(), cntr.cntr_pick_up_cy_address4, cntr.t_cntr_pick_up_cy_address4)}
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						    											<GridContainer>
						                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={9}>
						                                                        {renderLabel("cntr_pick_up_cy_address5"+"_"+index.toString(), cntr.cntr_pick_up_cy_address5, cntr.t_cntr_pick_up_cy_address5)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                        </GridContainer>    
		                                                   </CardBody>
		                                               </Card>
		                                             </GridItem>
		                                             <GridItem lg={12} md={12} sm={12} xs={12} style={{marginTop:'10px'}}>
			                                            <Card >
			                                            <InputLabel style={{ color: "#AAAAAA" }}>Drop off</InputLabel>
	                                                    	<CardBody >
	                                                    		<GridContainer>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
					        											<GridContainer>
						                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        	CY name
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={10}>
						                                                        {renderLabel("cntr_drop_off_cy_name1"+"_"+index.toString(), cntr.cntr_drop_off_cy_name1, cntr.t_cntr_drop_off_cy_name1)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						                                                 {renderLabel("cntr_drop_off_cy_name1"+"_"+index.toString(), cntr.cntr_drop_off_cy_name2, cntr.t_cntr_drop_off_cy_name2)}
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
					        											<GridContainer>
						                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        Cy Address
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={9}>
						                                                        {renderLabel("cntr_drop_off_cy_address1"+"_"+index.toString(), cntr.cntr_drop_off_cy_address1, cntr.t_cntr_drop_off_cy_address1)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						                                                   {renderLabel("cntr_drop_off_cy_address2"+"_"+index.toString(), cntr.cntr_drop_off_cy_address2, cntr.t_cntr_drop_off_cy_address2)}
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
					        											<GridContainer>
						                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={9}>
						                                                        {renderLabel("cntr_drop_off_cy_address3"+"_"+index.toString(), cntr.cntr_drop_off_cy_address3, cntr.t_cntr_drop_off_cy_address3)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						                                                   {renderLabel("cntr_drop_off_cy_address4"+"_"+index.toString(), cntr.cntr_drop_off_cy_address4, cntr.t_cntr_drop_off_cy_address4)}
						                                            </GridItem>
						                                            <GridItem lg={6} md={6} sm={6} xs={12}>
						    											<GridContainer>
						                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
						                                                        <InputLabel style={{ color: "#AAAAAA" }}>
						                                                        </InputLabel>
						                                                    </GridItem>
						                                                    <GridItem xs={12} sm={9}>
						                                                        {renderLabel("cntr_drop_off_cy_address5"+"_"+index.toString(), cntr.cntr_drop_off_cy_address5, cntr.t_cntr_drop_off_cy_address5)}
						                                                    </GridItem>
						                                                </GridContainer>
						                                            </GridItem>
						                                        </GridContainer>
		                                                   </CardBody>
		                                               </Card>
		                                             </GridItem>
			                                             {cntrSpecials.map((element, key)=>{
			                                            	 if( cntr.cntr_seq === element.cntr_seq ) {
			                                                   return (
			                                                    	<GridItem key={key} lg={12} md={12} sm={12} xs={12} style={{marginTop:'10px'}}>
				                                                    	<Card>
					                                    	        		<CardBody>
					                                    	                	<GridContainer >
					                                    	                    	<GridItem lg={6} md={6} sm={6} xs={12}>
					                                    								<GridContainer>
					                                    									<GridItem xs={12} sm={3} className={classes.gridLabel}>
					                                    	                                    <InputLabel style={{ color: "#AAAAAA" }}>UNDG
					                                    	                                    </InputLabel>
					                                    	                                </GridItem>
					                                    	                                <GridItem xs={12} sm={9}>
					                                    	                                    {renderLabel("special_undg"+"_"+index.toString(), element.special_undg, element.t_special_undg)}
					                                    	                                </GridItem>
					                                    	                            </GridContainer>
					                                    	                        </GridItem>
					                                    	                        <GridItem lg={6} md={6} sm={6} xs={12}>
					                                    								<GridContainer>
					                                    									<GridItem xs={12} sm={3} className={classes.gridLabel}>
					                                    	                                    <InputLabel style={{ color: "#AAAAAA" }}>IMDG
					                                    	                                    </InputLabel>
					                                    	                                </GridItem>
					                                    	                                <GridItem xs={12} sm={9}>
					                                    	                                    {renderLabel("special_imdg"+"_"+index.toString(), element.special_imdg, element.t_special_imdg)}
					                                    	                                </GridItem>
					                                    	                            </GridContainer>
					                                    	                        </GridItem>
					                                    	                    </GridContainer>
					                                    	                </CardBody>
					                                    	            </Card>	
					                                    	        </GridItem>
			                                                   
			                                                )}})}
                                                </GridContainer>
                                               
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                ))}
                            </GridContainer>
                        </Collapse>
                    </CardBody>
                </Card>
            </div>
            <nav id="cd-vertical-nav" style={{zIndex:'15'}}>
                <ul>
                    <li>
                        <a 
                        data-number="1"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("booking").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">
                            Booking
                        </span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("schedule").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Schedule</span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("shipper").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Shipper</span>
                        </a>
                    </li>     
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("carrier").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Carrier</span>
                        </a>
                    </li>  
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("notify").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Notify</span>
                        </a>
                    </li>
                    <li>
                    <a 
                    data-number="2"
                    //href="#projects"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("consignee").scrollIntoView(true);
                    }}
                    >
                    <span className="cd-dot" />
                    <span className="cd-label">Consignee</span>
                    </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("cargo").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Cargo</span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("container").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Container</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <form id="reportForm" name="reportForm" >
                <input type="hidden" name="system_id"   value="plismplus" />
                <input type="hidden" name="user_id"     value="M000008" />
                <input type="hidden" name="file_type"   value="pdf" />
                <input type="hidden" name="file_id"     value="" />
                <input type="hidden" name="file_path"   value="" />
                <input type="hidden" name="name"        value="" />
                <input type="hidden" name="connection"  value="pgsql" />
                <input type="hidden" name="parameters" id="parameters"/>
            </form>
        </React.Fragment>
    );
}
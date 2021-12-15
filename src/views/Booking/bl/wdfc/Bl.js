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
import { Card, Tooltip, Collapse, IconButton, Divider, Paper,
    Avatar, CardHeader, InputLabel,FormControl, Input} from "@material-ui/core";
import {GolfCourse, UnfoldLess, UnfoldMore, Schedule, 
    DirectionsBoat, Map, NotificationsActive, HowToVote, ViewModule, ViewComfy} from "@material-ui/icons";

export default function Bl(props) {
    const classes = useStyles();
    const [bl, setBl] = useState({});
    const [param, setParam] = useState({user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : '',
        mbl_no: props.location.state && props.location.state.mbl_no  ? props.location.state.mbl_no || '' : '', 
        issue_date: props.location.state && props.location.state.issue_date ? props.location.state.issue_date || '' : ''});
    const [openBooking, setOpenBooking] = useState(true);
    const [openSchedule, setOpenSchedule] = useState(true);
    const [openShipper, setOpenShipper] = useState(true);
    const [openCarrier, setOpenCarrier] = useState(true);
    const [openNotify, setOpenNotify] = useState(true);
    const [openConsignee, setOpenConsignee] = useState(true);
    const [openCargo, setOpenCargo] = useState(true);
    const [openContainer, setOpenContainer] = useState(true);
    const [cargo, setCargo] = useState([]);
    const [cntr, setCntr] = useState([]);
    const {userData} = props;

    useEffect(()=>{
        if ( param.user_no.length > 0 && param.mbl_no.length > 0 ) {
            selectShpBl();
        }
    }, []);

    const selectShpBl = ( ) => {
        axios.post(
            "/shipper/selectShpBl"
            , param //,{ user_no: 'M000002', param }
            ,{}
        ).then( res => {
            if(res.data && res.data.length > 0) {
              setBl(res.data[0]);
              selectShpBlCargo(res.data[0].user_no, res.data[0].mbl_no, res.data[0].issue_date, res.data[0].line_code);
              selectShpBlCntr(res.data[0].user_no, res.data[0].mbl_no, res.data[0].issue_date);
            //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));
            } else {
            //   onDismiss("danger", "조회된 결과가 없습니다.");
            }
          }).catch(err => {
            // if(err.response.status) {
            //     // onDismiss("danger", "오류가 발생했습니다.");
            // }
        });
    }
    const selectShpBlCargo = ( user_no, mbl_no, issue_date, line_code ) => {
        axios.post(
            "/shipper/selectShpBlCargo"
            , { user_no, mbl_no, issue_date, line_code }
            ,{}
        ).then( res => {
            console.log('res.data', res.data);
            if(res.data && res.data.length > 0) {
              setCargo(res.data);
            //   setColl(Object.assign(...Object.keys(coll).map(k=>({[k]:true}))));
    
    
            // console.log('type=',cargo);
    
            } 
          }).catch(err => {
            if(err.response.status) {
                // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }
    const selectShpBlCntr = ( user_no, mbl_no, issue_date ) => {
        axios.post(
            "/shipper/selectShpBlCntr"
            , { user_no, mbl_no, issue_date }
            ,{}
        ).then( res => {
            console.log('res.data', res.data);
            if(res.data && res.data.length > 0) {
              setCntr(res.data);
            } 
          }).catch(err => {
            if(err.response.status) {
                // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    const renderLabel = (id, source, target) => {
        const style = {textDecoration:"underline", color:"blue", paddingTop:'0',marginBottom:'10px'};
        console.log(source !== target, source,target)
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

    const confitmShpBl = () => {
        axios.post("/shipper/confitmShpBl",{klnet_id: userData.klnet_id, param:param})
        .then( res => {
            if(res.data.indexOf('success') > -1 ) {
                //console.log("성공");
                props.alert(
                    null // onConfirm: function
                    , '해당 BL이 확정 되었습니다.'  // title: string
                    ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                    ,true // show: boolean default:true
                    ,true  // reverseButtons: boolean , default: false
                    ,'lg' // btnSize: lg,sm,xs default:lg
                    ,'' // subtitle: string
                    ,true // showConfirm: boolean default: false
                    ,false // showCancel: boolean default: false
                    ,null // onCancel: function
                );
            } else {
                //console.log("에러",res.data);
                props.alert(
                    null // onConfirm: function
                    , '해당 BL확정 처리에 에러가 발생하였습니다.'  // title: string
                    ,'error' // default,info,success,warning,danger,error,input,custom,controlled
                    ,true // show: boolean default:true
                    ,true  // reverseButtons: boolean , default: false
                    ,'lg' // btnSize: lg,sm,xs default:lg
                    ,'' // subtitle: string
                    ,true // showConfirm: boolean default: false
                    ,false // showCancel: boolean default: false
                    ,null // onCancel: function
                );
            }
        }
        );
    }
    const fncReportViewer = ()=>{
        if( !(bl.user_no && bl.mbl_no && bl.issue_date ) ) {
            // props.onNotiAlert("danger","BL 먼저 조회 하세요.");
            props.alert(
                null // onConfirm: function
                , 'BL 먼저 조회 하세요.'  // title: string
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
        var obj = new Object();
        obj.user_no = bl.user_no;
        obj.mbl_no = bl.mbl_no;
        obj.issue_date = bl.issue_date;
        var json = JSON.stringify(obj);

        let form = document.reportForm;
        form.action = '/reportViewer';
        form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
        form.file_id.value = 'weidong_bl';
        form.file_path.value = 'WEIDONG';
        form.name.value = 'FILENAME';
        form.connection.value = 'pgsql';
        form.parameters.value = json;
        window.open('', 'popReport', 'width=1050px, height=850px');
        form.submit();
    }
    return (
        <React.Fragment>
            <div style={{paddingLeft:'5%',paddingRight:'5%'}}>
                <Card className={classes.booking_title}>
                    <CardBody>
                        <GridItem xs={12} sm={12} style={{textAlign:'right'}}>
                            <Button color="info" onClick={(e)=>confitmShpBl()}>BL 확정</Button>
                            <Button color="info" onClick={(e)=>fncReportViewer()}>REPORT</Button>
                            <Button color="info" onClick={(e)=>selectShpBl()}>SERACH</Button>
                        </GridItem>
                    </CardBody>
                </Card>
                <GridContainer justify="space-between">
                    <GridItem lg={6} md={6} sm={6} xs={12}>
                        <GridContainer>
                            <GridItem lg={6} md={6} sm={6} xs={12}>
                                <CustomInput
                                    labelText="Master BL Number *"
                                    id="mbl_no"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                                    }}
                                    labelProps={{style:{top:'0'}}}
                                    inputProps={{
                                        value:bl.mbl_no?bl.mbl_no:'',
                                        disabled:true 
                                    }}
                                />
                            </GridItem>
                            <GridItem lg={3} md={3} sm={3} xs={12}>
                            <FormControl fullWidth style={{marginBottom:'10px'}}>
                                <CustomInput
                                    labelText="BL Date"
                                    id="issue_date"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                                    }}
                                    labelProps={{style:{top:'0'}}}
                                    inputProps={{
                                        value:bl.issue_date?bl.issue_date:'',
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
                                            switch(bl.status_cus) {
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
                                        Other
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
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Currency
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="currency_code"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.currency_code?bl.currency_code:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>      
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Exchange Rate
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="exchange_rate"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.exchange_rate?bl.exchange_rate:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Incoterms
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="incoterms_code"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.incoterms_code?bl.incoterms_code:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                    SR Number
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="sr_no"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.sr_no?bl.sr_no:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                    Service
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("trans_service_name", bl.trans_service_name, bl.t_trans_service_name)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                    MRN
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="mrn"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.mrn?bl.mrn:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                    BL Issue Loc Code
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="bl_issue_code"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.bl_issue_code?bl.bl_issue_code:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                    BL Issue Loc Name
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="bl_issue_name"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.bl_issue_name?bl.bl_issue_name:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Qty of Original BL
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="org_issue_bl_qty"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.org_issue_bl_qty?bl.org_issue_bl_qty:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Vessel
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("sch_vessel_name", bl.sch_vessel_name, bl.t_sch_vessel_name)}
                            </GridItem>      
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Voyage
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("sch_vessel_name", bl.sch_vessel_voyage, bl.t_sch_vessel_voyage)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                POL
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={4} sm={4}>
                                {renderLabel("sch_pol", bl.sch_pol, bl.t_sch_pol)}
                            </GridItem>
                            <GridItem xs={6} sm={6}>
                                {renderLabel("sch_pol_name", bl.sch_pol_name, bl.t_sch_pol_name)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                POD
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={4} sm={4}>
                                {renderLabel("sch_pod", bl.sch_pod, bl.t_sch_pod)}
                            </GridItem>
                            <GridItem xs={6} sm={6}>
                                {renderLabel("sch_pod_name", bl.sch_pod_name, bl.t_sch_pod_name)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                    POR
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={4} sm={4}>
                                {renderLabel("sch_por", bl.sch_por, bl.t_sch_por)}
                            </GridItem>
                            <GridItem xs={6} sm={6}>
                                {renderLabel("sch_por_name", bl.sch_por_name, bl.t_sch_por_name)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                PLD
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={4} sm={4}>
                                {renderLabel("sch_pld", bl.sch_pld, bl.t_sch_pld)}
                            </GridItem>
                            <GridItem xs={6} sm={6}>
                                {renderLabel("sch_pld_name", bl.sch_pld_name, bl.t_sch_pld_name)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                FDP
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={4} sm={4}>
                                {renderLabel("sch_fdp", bl.sch_fdp, bl.t_sch_fdp)}
                            </GridItem>
                            <GridItem xs={6} sm={6}>
                                {renderLabel("sch_fdp_name", bl.sch_fdp_name, bl.t_sch_fdp_name)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                On Board Date
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="org_issue_bl_qty"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.sch_obd,
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                ETD
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="org_issue_bl_qty"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.sch_etd,
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Name
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("shp_name1", bl.shp_name1, bl.t_shp_name1)}
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("shp_name2", bl.shp_name2, bl.t_shp_name2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Code
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    validtype="text"
                                    labelText=""
                                    id="shp_code"
                                    formControlProps={{
                                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                                    }}
                                    inputProps={{
                                        value:bl.shp_code? bl.shp_code:'',
                                        style:{height:'30px'},
                                        disabled:true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Address
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("shp_address1", bl.shp_address1, bl.t_shp_address1)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("shp_address2", bl.shp_address2, bl.t_shp_address2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("shp_address3", bl.shp_address3, bl.t_shp_address3)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("shp_address4", bl.shp_address4, bl.t_shp_address4)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("shp_address5", bl.shp_address5, bl.t_shp_address5)}
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Name
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("line_name1", bl.line_name1, bl.t_line_name1)}
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("line_name2", bl.line_name2, bl.t_line_name2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Code
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_code", bl.line_code, bl.t_line_code)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Dept
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_user_dept", bl.line_user_dept, bl.t_line_user_dept)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Person
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_user_name", bl.line_user_name, bl.t_line_user_name)}
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Address
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_address1", bl.line_address1, bl.t_line_address1)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_address2", bl.line_address2, bl.t_line_address2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_address3", bl.line_address3, bl.t_line_address3)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_address4", bl.line_address4, bl.t_line_address4)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_address5", bl.line_address5, bl.t_line_address5)}
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Name
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("noti1_name1", bl.noti1_name1, bl.t_noti_name1)}
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("noti1_name2", bl.noti1_name2, bl.t_noti_name2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Code
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("noti1_code", bl.noti1_code, bl.t_noti_code)}
                            </GridItem>
                            <GridItem xs={12} sm={6} className={classes.gridLabel}>
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Address
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("noti1_address1", bl.noti1_address1, bl.t_noti1_address1)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("noti1_address2", bl.noti1_address2, bl.t_noti1_address2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("noti1_address3", bl.noti1_address3, bl.t_noti1_address3)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("noti1_address4", bl.noti1_address4, bl.t_noti1_address4)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("noti1_address5", bl.noti1_address5, bl.t_noti_address5)}
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Name
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("cons_name1", bl.cons_name1, bl.t_cons_name1)}
                            </GridItem>
                            <GridItem xs={5} sm={5}>
                                {renderLabel("cons_name2", bl.cons_name2, bl.t_cons_name2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                Address
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("cons_address1", bl.cons_address1, bl.t_cons_address1)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("line_address2", bl.line_address2, bl.t_line_address2)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("cons_address3", bl.cons_address3, bl.t_cons_address3)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("cons_address4", bl.cons_address4, bl.t_cons_address4)}
                            </GridItem>
                            <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                <InputLabel style={{ color: "#AAAAAA" }}>
                                </InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                {renderLabel("cons_address5", bl.cons_address5, bl.t_cons_address5)}
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                        Pkg Qty
                                        </InputLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        {renderLabel("cargo_pack_qty"+"_"+index.toString(), data.cargo_pack_qty, data.t_cargo_pack_qty)}
                                    </GridItem>
                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                        Pkg Type
                                        </InputLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        {renderLabel("cargo_pack_type_name"+"_"+index.toString(), data.cargo_pack_type_name, data.t_cargo_pack_type_name)}
                                    </GridItem>
                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                        Total weight
                                        </InputLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        {renderLabel("cargo_total_weight"+"_"+index.toString(), data.cargo_total_weight, data.t_cargo_total_weight)}
                                    </GridItem>
                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                        Total Volume
                                        </InputLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        {renderLabel("cargo_total_volume"+"_"+index.toString(), data.cargo_total_volume, data.t_cargo_total_volume)}
                                    </GridItem>
                                    <GridContainer>
                                        { (0<data.mark.length) ?
                                            data.mark.map((element,key)=>
                                            <GridItem key={key} lg={6} md={6} sm={6} xs={12}>
                                                <Card>
                                                    <CardBody>
                                                        <GridItem xs={12} sm={12} className={classes.gridLabel}>
                                                            <InputLabel style={{ color: "#AAAAAA" }}>
                                                            {key+1}. Mark & No
                                                            </InputLabel>
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12}>
                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc1, element.t_mark_desc1)}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12}>
                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc2, element.t_mark_desc2)}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12}>
                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc3, element.t_mark_desc3)}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12}>
                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc4, element.t_mark_desc4)}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12}>
                                                            {renderLabel("cargo_total_weight"+"_"+index.toString(), element.mark_desc5, element.t_mark_desc5)}
                                                        </GridItem>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                            ):                                        
                                            <></>}
                                        { (0<data.goods.length) ?
                                            data.goods.map((element,key)=> 
                                            <GridItem key={key} lg={6} md={6} sm={6} xs={12}>
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
                                    <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
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
                                                    {/* <GridItem xs={12} sm={12} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                            {index+1}. {cntr.cntr_no}
                                                        </InputLabel>
                                                    </GridItem> */}
                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Cntr No
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4}>
                                                        {renderLabel("cntr_no"+"_"+index.toString(), cntr.cntr_no, cntr.t_cntr_no)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Size/Type
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4}>
                                                        {renderLabel("cntr_code"+"_"+index.toString(), cntr.cntr_code, cntr.t_cntr_code)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Cntr Own
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4}>
                                                        {renderLabel("cntr_hands"+"_"+index.toString(), cntr.cntr_hands, cntr.t_cntr_hands)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Consolidated
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4}>
                                                        {renderLabel("cntr_consolidated_yn"+"_"+index.toString(), cntr.cntr_consolidated_yn, cntr.t_cntr_consolidated_yn)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Total Weight
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4}>
                                                        {renderLabel("cntr_total_weight"+"_"+index.toString(), cntr.cntr_total_weight, cntr.t_cntr_total_weight)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Total Volume
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4}>
                                                        {renderLabel("t_cntr_total_volume"+"_"+index.toString(), cntr.t_cntr_total_volume, cntr.t_cntr_total_volume)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                                                        <InputLabel style={{ color: "#AAAAAA" }}>
                                                        Seal No
                                                        </InputLabel>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={3}>
                                                        {renderLabel("cntr_seal1"+"_"+index.toString(), cntr.cntr_seal1, cntr.t_cntr_seal)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={3}>
                                                        {renderLabel("cntr_seal2"+"_"+index.toString(), cntr.cntr_seal2, cntr.t_cntr_seal2)}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={3}>
                                                        {renderLabel("cntr_seal3"+"_"+index.toString(), cntr.cntr_seal3, cntr.t_cntr_seal3)}
                                                    </GridItem>
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
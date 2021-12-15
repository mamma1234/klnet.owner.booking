import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {FormGroup, Paper, CircularProgress, MenuItem, FormControl, Select, InputLabel, FormControlLabel, Checkbox,TextField, Tooltip,  Table, TableHead, TableRow, Chip, TableCell, TableFooter, TableBody,Box, Collapse, IconButton, FormLabel, Input, Dialog} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from "components/CustomButtons/Button.js";
import {Search, Room, TextFields} from "@material-ui/icons";
import axios from 'axios';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import clsx from 'clsx';


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  formControl: {
      minWidth: 120,
      maxWidth: 300,
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  buttonProgress: {
    color: '#00ACC1',
    position: 'absolute',
    bottom: '1%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  cardTitleBlack: {
	textAlign: "left",
	color: "#000000",
	minHeight: "auto",
	fontWeight: "300",
	fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	marginBottom: "3px",
	textDecoration: "none",
	"& small": {
	  color: "#777",
	  fontSize: "65%",
	  fontWeight: "400",
	  lineHeight: "1"
	}
  },
  tablecontainer: {
    width:'100%',
    maxHeight:590
  },
  table: {
    minWidth: 750,
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'50%',
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'25%',
  },chip: {
      margin:2
  },chips: {
      display: 'flex',
      flexWrap: 'wrap'
  },
  buttonSuccess: {
	backgroundColor: '#00ACC1',
	'&:hover': {
		backgroundColor: '#00ACC1'
	}
  }
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cns = [
  {code:'COC',name:'선사소유'},
  {code:'SOC',name:'화주소유'}
];
const cntrSize = [{code:'20',name:'20FEET'},{code:'40',name:'40FEET'},{code:'ETC',name:'ETC'}]
const cntrType =[{code:'DRY',name:'DRY'},{code:'RF',name:'REFFER'},{code:'TK',name:'TANK'},{code:'ETC',name:'ETC'}]
const cntrItem = [{code:'일반화물',name:'일반화물'},{code:'냉동냉장화물',name:'냉동냉장화물'},{code:'화학제품류',name:'화학제품류'},{code:'위험물류',name:'위험물류'},{code:'공컨테이너',name:'공컨'},{code:'기타',name:'기타'}]
function getStyles(name, csvalue, theme) {
  return {
    fontWeight:
        csvalue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}




function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    return (
    <React.Fragment>
        <TableRow
            className={classes.root}
            hover
            onClick={() => setOpen(!open)}>
        <TableCell align="center" >
            <Tooltip title={row.line_name}>{row.image_yn==='Y'?<img width='40' height='40' src={require("assets/img/carrier/"+row.carrier+".gif")} />:<img width='40' height='40' src={require("assets/img/carrier/No-Image.gif")} />}</Tooltip>
        </TableCell>
        <TableCell align="center">{row.effect_date}</TableCell>
        <TableCell align="right">{Number(row.total_amt).toLocaleString()}</TableCell>
        <TableCell align="left">{row.of_unit}</TableCell>
        <TableCell align="center">{row.cntr_size}</TableCell>
        <TableCell align="center">{row.cntr_type}</TableCell>
        <TableCell align="center">{row.coc_soc}</TableCell>
        <TableCell align="center">{row.goods}</TableCell>
        <TableCell align="center">{row.ts}</TableCell>
        <TableCell align="center">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                    Charge Detail
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>O/F</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.of_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.of_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.of_amt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>BAF</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.baf_unit}</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.baf_amt}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.baf_amt).toLocaleString()}</TableCell> */}
                        </TableRow>   
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>LSS</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.lss_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.lss_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.lss_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>EBS</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.ebs_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.ebs_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.ebs_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>CAF</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.caf_unit}</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.caf_amt}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.caf_amt).toLocaleString()}</TableCell> */}
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>O/THC</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.othc_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.othc_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.othc_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>D/THC</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.dthc_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.dthc_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.dthc_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>DOC FEE</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.docu_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.docu_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.docu_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>D/O FEE</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.do_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.do_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.do_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>WFG</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.whf_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.whf_amt).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.whf_amt}</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>SEAL CHARGE</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.csf_unit}</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.csf_amt}</TableCell>
                        </TableRow>                   
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>기타</TableCell>
                            <TableCell className={classes.tableCellStyle}>{row.etc_unit}</TableCell>
                            {/* <TableCell className={classes.tableCellStyle}>{Number(row.etc_remark).toLocaleString()}</TableCell> */}
                            <TableCell className={classes.tableCellStyle}>{row.etc_remark}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCellStyle}>기타설명</TableCell>
                            <TableCell className={classes.tableCellStyle} colSpan={2}>{row.remark}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
            </Collapse>
        </TableCell>
        </TableRow>
    </React.Fragment>
    );
}



const useStyles = makeStyles(styles);

export default function OceanFreightSearch(props) {

    const {detailParam} = props;
    const [portData,setPortData] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [lineCode, setLineCode] = useState([]);
    const [sPort,setSPort] = useState(detailParam?detailParam.start_port:"");
    const [ePort,setEPort] = useState(detailParam?detailParam.end_port:"");
    const [carrierCode,setCarrierCode] = useState(detailParam?detailParam.line_code:"");
    const [csValue, setCsValue] = useState([]);
    const [realCs, setRealCs] = useState(detailParam?"'COC''":"");
    const [realCntr, setRealCntr]= useState("");
    const [realCntrType, setRealCntrType]= useState(detailParam?"'DRY''":"");
    const [realCntrItem, setRealCntrItem]= useState(detailParam?"'일반화물''":"");
    const [cntrValue, setCntrValue] = useState([]);
    const [cntrTypeValue, setCntrTypeValue] = useState([]);
    const [cntrItemValue, setCntrItemValue] = useState([]);
    const [tsCheckY,setTsCheckY] = useState(false);
    const [tsCheckN,setTsCheckN] = useState(false);
    const [searchDate, setSearchDate] = useState([]);
    const [sDate,setSDate] = useState(detailParam?detailParam.start_day:new Date());
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [num,setNum] = useState(1);
    const [errMessage, setErrmessage] = useState("");
    //More버튼 파라메터 변수
    const [copyParameter, setCopyParameter] =useState({
        origin:"",
        destination:"",
        sDate:new Date(),
        carrierCode: "",
        tsYn: "",
        cocNsoc: "",
        size:"",
        type:"",
        item:""
    });
    const classes = useStyles();
    const theme= useTheme();
    const timer = React.useRef();
    useEffect(() => {

		if(props.userData) {
            axios.post("/sch/getCarrierInfo",{}).then(res => {
                setLineCode(res.data);
                setCsValue([cns[0]]);
                setCntrItemValue([cntrItem[0]]);
                setRealCs("'COC',");
                setRealCntrItem("'일반화물',");
            });

            if( detailParam ) {
                onSubmit();
            }
        
        }
	    return () => {
	      console.log('cleanup');
	    };
    }, [props.userData]);
    useEffect(()=> {
        valueInit();
    },[expanded]);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    })
    const onSPortChange = (e,data) => {
        if(data) {
            setSPort(data.port_code);
        } else {
            setSPort("");
        }
    }
    const AlertMessage = (message,icon) => {
        setErrmessage(message)
        setSeverity(icon)
        setAlertOpen(true);
    }
    const handleAlertClose = (event, reason) => {
        if(reason ==='clickaway') {
            return;
        }
        setAlertOpen(false);
      }
    const onEPortChange = (e,data) => {
        if(data) {
            setEPort(data.port_code);
        } else {
            setEPort("");
        }
    }

    const onPortSearchValue = (e) => {
        if(e) {
            const values = e.target.value;
            if(values !== undefined && values !== "" && values.length >= 2) {
                if(props.userData) {
                    axios.post("/sch/getPortCodeInfo",{ portCode:values})
                    .then(res => setPortData(res.data))
                    .catch(err => {
                        if(err.response.status === 403||err.response.status === 401) {
                            props.openLogin();
                        }
                    });
                } else {
                    props.openLogin();
                }
            }  
        }
    }
    const onCarrierChange = (e,data) => {
        if(data) {setCarrierCode(data.line_code);} else {setCarrierCode("");}
    }
    
    const onSubmit = () => {
        let tsYn = "";
        if((tsCheckY === true && tsCheckN ===false)) {
            tsYn = "TSY";
        }else if((tsCheckY === false && tsCheckN ===true)) {
            tsYn = "TSN";
        }else {
            tsYn = "A";
        }

        if(sPort === "" || ePort === "") {
            AlertMessage('Please Choice Origin & Destination','error');
            return;
        }
        if(moment(sDate).isValid()===false) {
            AlertMessage('Date Format is Not Correct','error');
            return;
        }
        
        setNum(1);
        axios.post("/sch/shipChargeList",{
            num:1,
            origin:sPort,
            destination:ePort,
            startDate:moment(sDate).format('YYYYMMDD'),
            carrierCode:carrierCode,
            tsYn:tsYn, 
            cocNsoc:realCs, 
            size:realCntr,
            type:realCntrType,
            item:realCntrItem,
        }).then(
            setNum(1)
        ).then(res => {
            if(res.data.length===0) {
                AlertMessage('해당 조건의 검색된 결과가 없습니다.','error');
            }else {
                AlertMessage('조회가 완료되었습니다.','success');
            }
            setCopyParameter({
                origin:sPort,
                destination:ePort,
                sDate:moment(sDate).format('YYYYMMDD'),
                carrierCode: carrierCode,
                tsYn: tsYn,
                cocNsoc: realCs,
                size:realCntr,
                type:realCntrType,
                item:realCntrItem,
            })
            setSearchDate(res.data);
        })
        .catch(err => {
            if(err.response.status === 403||err.response.status === 401) {
            props.openLogin();
        }});
    }


    const handleCsChange = (event) => {
        setCsValue(event.target.value);
        let value = "";
        for (let index in event.target.value) {
            
            value = value + "'" + event.target.value[index].code + "',";
        }
        
        if(value) {setRealCs(value);} else {setRealCs("");}
    };

    const handleCntrChange = (event) => {
        setCntrValue(event.target.value);
        let value = "";
    
        for (let index in event.target.value) {
      
          value = value + "'" + event.target.value[index].code + "',";
        }
      
        if(value) {setRealCntr(value);} else {setRealCntr("");}
    };
    const handleCntrTypeChange = (event) => {
        setCntrTypeValue(event.target.value);
        let value = "";
    
        for (let index in event.target.value) {
      
          value = value + "'" + event.target.value[index].code + "',";
        }
      
        if(value) {setRealCntrType(value);} else {setRealCntrType("");}
    }
    const handleCntrItemChange = (event) => {
        setCntrItemValue(event.target.value);
        let value = "";
        for (let index in event.target.value) {
      
          value = value + "'" + event.target.value[index].name + "',";
        }
      
        if(value) {setRealCntrItem(value);} else {setRealCntrItem("");}
    }
    const valueInit = () => {
        setCarrierCode("");
        setCntrItemValue([]);
        setCntrTypeValue([]);
        setCntrValue([]);
        setCsValue([]);
    }
    const setTsCheckValue = (e,yn) => {

        if(yn === 'Y') {
            setTsCheckY(e.target.checked);
        }else if(yn === 'N') {
            setTsCheckN(e.target.checked);
        }
    }
    
    const onMore = () => {
        setNum(prev=>prev+1);
        if(!loading) {
            setSuccess(false);
            setLoading(true);
            
        }
        
        axios.post("/sch/shipChargeList",{
                     num:num+1,
                     origin:copyParameter.origin,
                     destination:copyParameter.destination,
                     startDate:copyParameter.sDate,
                     carrierCode:copyParameter.carrierCode,
                     tsYn:copyParameter.tsYn, 
                     cocNsoc:copyParameter.cocNsoc, 
                     size:copyParameter.size,
                     type:copyParameter.type,
                     item:copyParameter.item,
                    })
                    .then(res => {
                        setSearchDate([...searchDate,...res.data])
                        timer.current = setTimeout(() => {
                            setSuccess(true);
                            setLoading(false);
                        },100); 
                    })
                        
                    .catch(err => {
                        if(err.response.status === 403||err.response.status === 401) {
                        props.openLogin();
                        timer.current = setTimeout(() => {
                            setSuccess(true);
                            setLoading(false);
                        },100); 
                    }});
                       
    }


    return(
        <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
            {detailParam?null:(
            <Card style={{marginTop:'0',marginBottom:'5px'}}>
	    		<CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer spacing={1}>
                            <GridItem xs={12} sm={2} md ={2}>
                                <Autocomplete
                                    options={lineCode}
                                    getOptionLabel={option => option.line_name}
                                    id="carrierCode"
                                    onChange={onCarrierChange}
                                    freeSolo
                                    renderInput={params => (
                                        <TextField {...params} label="Carrier" fullWidth />
                                )}/>
                            </GridItem>
                            <GridItem xs={6} sm={3} md={3}>
                                <Autocomplete
                                    options = {portData}
                                    getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
                                    id="start"
                                    onChange={(e,data) => onSPortChange(e, data)}
                                    onInputChange={(e) => onPortSearchValue(e)}
                                    freeSolo
                                    renderInput={params => (
                                        <div ref={params.InputProps.ref}>    
                                            <TextField {...params} label="Origin"/>
                                        </div>
                                            
                                    )} />
                            </GridItem>
                            <GridItem xs={6} sm={3} md ={3}>
                                <Autocomplete
                                    options = {portData}
                                    getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
                                    id="end"
                                    freeSolo
                                    onChange={(e,data) => onEPortChange(e,data)}
                                    onInputChange={(e) => onPortSearchValue(e)}
                                    renderInput={params => (
                                        <div ref={params.InputProps.ref}>    
                                            <TextField {...params} label="Destination"/>
                                        </div>
                                    )}/>
                            </GridItem>
                            <GridItem xs={12} sm={3} md ={4}>
                                <CalendarBox
                                    labelText ="Start Date"
                                    id="portDate"
                                    format="yyyy-MM-dd"
                                    setValue={sDate}
                                    autoOk={true}
                                    onChangeValue={date => setSDate(date)}
                                    formControlProps={{fullWidth: true}}/>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{marginTop:'5px'}}>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <GridContainer spacing={1}>
                                <GridItem xs={12} sm={2} md={2}>
                                    <FormControl>
                                        <FormLabel component="div" >T/S</FormLabel>
                                        <FormGroup row={true}>
                                            <FormControlLabel
                                                control={<Checkbox onChange={(e) => setTsCheckValue(e,'Y')} color="primary" />}
                                                label="Y"
                                                labelPlacement="end">
                                            </FormControlLabel>
                                            <FormControlLabel
                                                value="top"
                                                control={<Checkbox onChange={(e) => setTsCheckValue(e,'N')} color="primary" />}
                                                label="N"
                                                labelPlacement="end">
                                            </FormControlLabel>
                                        </FormGroup>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={3} md={3}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">COC & SOC</InputLabel>
                                        <Select
                                            labelId="cnslabel"
                                            id="cns"
                                            multiple
                                            value={csValue}
                                            onChange={handleCsChange}
                                            input={<Input id="select-cns" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                {selected.map((value, index) => 
                                                (
                                                    <Chip key={index} label={value.code} className={classes.chip} />
                                                )
                                                )}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                            >
                                            {cns.map((element,index) => (
                                                <MenuItem key={index} value={element} style={getStyles(element.code, csValue, theme)}>
                                                [{element.code}] {element.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={3} md ={3}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">SIZE</InputLabel>
                                        <Select
                                            labelId="cntrSize-label"
                                            id="cntrSize"
                                            multiple
                                            value={cntrValue}
                                            onChange={handleCntrChange}
                                            input={<Input id="select-cntrSize" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                {selected.map((value,index) => (
                                                    <Chip key={index} label={value.name} className={classes.chip} />
                                                ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                            >
                                            {cntrSize.map((element, index) => (
                                                <MenuItem key={index} value={element} style={getStyles(element.code, cntrValue, theme)}>
                                                {element.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">TYPE</InputLabel>
                                        <Select
                                            labelId="cntrType-label"
                                            id="cntrType"
                                            multiple
                                            value={cntrTypeValue}
                                            onChange={handleCntrTypeChange}
                                            input={<Input id="select-cntrTypeSize" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                {selected.map((value,index) => (
                                                    <Chip key={index} label={value.name} className={classes.chip} />
                                                ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                            >
                                            {cntrType.map((element, index) => (
                                                <MenuItem key={index} value={element} style={getStyles(element.code, cntrTypeValue, theme)}>
                                                    {element.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </GridItem>


                                <GridItem xs={12} sm={2} md ={2}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">ITEM</InputLabel>
                                        <Select
                                            labelId="cntrItem-label"
                                            id="cntrItem"
                                            multiple
                                            value={cntrItemValue}
                                            onChange={handleCntrItemChange}
                                            input={<Input id="select-cntrItem" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                {selected.map((value,index) => (
                                                    <Chip key={index} label={value.name} className={classes.chip} />
                                                ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                            >
                                            {cntrItem.map((element,index) => (
                                                <MenuItem key={index} value={element} style={getStyles(element.code, cntrItemValue, theme)}>
                                                    {element.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                        </Collapse>
                    </GridItem>
                    <GridItem  xs={12} sm={12} md={12}  style={{textAlignLast:'center',height:'30px',paddingTop:'5px'}}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setExpanded(!expanded)}>
                            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </GridItem>    			          
                </CardBody>  
            </Card>)}
            <FormControl component="div" fullWidth>
                <h6 style={{margin:'0',paddingBottom: '0px',paddingTop: '0px',paddingLeft: '15px',paddingRight: '15px',color:'red',fontWeight:'bold' }}>※ 하기 운임은 해수부 운임 공표제 고시 운임자료로 실제 운임과 상이할 수 있습니다. 선적 진행 전 해당 선사와 필히 확인하시기 바랍니다.</h6>
                {detailParam?null:(
                <GridItem xs={12} style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
                    <GridItem xs={12} sm={3} md={2} style={{textAlign:'center'}}>
                        <Button color="info" onClick = {onSubmit} endIcon={<Search/>} fullWidth>Search</Button>
                    </GridItem>
                </GridItem>)}
            </FormControl>
            <Paper>
                <div style={{textAlignLast: "end"}}>
                    <span style={{paddingRight:"20px", paddingTop:"5px"}}>[ Data Count: {searchDate.length} / {searchDate.length!==0?searchDate[0].total_cnt:0} ]</span>
                </div>
                <Table
                    stickyHeader aria-label="sticky table"
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="medium"
                    style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Carrier</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Effective&nbsp;date</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center" colSpan={2}>USD&nbsp;TOTAL</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">SIZE</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TYPE</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">COC/SOC</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ITEM</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">T/S</TableCell>
                            <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchDate.map((row,index) => (
                            <Row key={index} row={row} />
                        ))}
                    </TableBody>
                    {searchDate.length >= 10 ? Number(searchDate[0].tot_page) !== num ? (
                    <TableFooter>
                        <TableRow>
                            <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={10}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => onMore()}
                                    disabled={loading}
                                    endIcon={loading && <CircularProgress size={24} />}
                                    className= {buttonClassname}>
                                    {loading===false?`MORE( ${num} / ${searchDate[0].tot_page} )`:""}
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>): null : null } 
                </Table>
            </Paper>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert 
                    onClose={handleAlertClose}
                    severity={severity}>
                        {errMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
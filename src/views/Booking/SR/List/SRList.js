import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link  } from "react-router-dom";
import Moment from 'moment';
import clsx from 'clsx';
import axios from 'axios';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { 
  CircularProgress,
  TextField,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableRow,Popover,
  Chip,
  TableCell,
  TableFooter,
  TableBody,
  Grid,
  Snackbar,
} from "@material-ui/core";

import {
  Search,AddCircle,
  ArrowForward,
  DirectionsBoatTwoTone,
} from "@material-ui/icons";

import {
  Autocomplete,
  Alert as MuiAlert 
}from '@material-ui/lab';

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
    
  },
  table: {
    minWidth: 750,
  },
  tableCell:{
    borderBottomWidth:'3px',
    fontWeight:'bold',
    color:'#717172',
    borderBottom:'2px solid #00b1b7'
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'12.5%',
  },
  chip: {
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
  },
  gridText: {
    color: "#666",
    fontSize: "20px",
    fontWeight: "bold",
    lineHeight: "1"
  },
  tableText: {
    color: "#666",
    fontSize: "16px",
    lineHeight: "1"
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





function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function Row(props) {  

  const { row,userData, onSearch } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
    

  const onReSearch = () => {
    props.onSearch();
  }

	const fncDeleteRow = (row) => {
    if( !row ) {
      props.alert(
        null // onConfirm: function
        , "삭제 처리할 문서를 선택하세요."  // title: string
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
    } else {
      if( row.status_name && !(row.status_cus === "NO" ||  row.status_cus === "S0"||  row.status_cus === "CC")) {
        props.alert(
          null // onConfirm: function
          , "저장 또는 취소승인(캔슬컨펌) 상태만 삭제 가능합니다."  // title: string
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
      props.alert( ()=>{axios.post("/shipper/deleteSrList",{user_no:userData?userData.user_no:'',data:row}).then(
        res => {
          props.alert(null // onConfirm: function
                , "삭제처리 되었습니다."  // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
          onReSearch();
        })
      },
      `문서번호 [${row.sr_no}]`,'warning',true,true,'lg',`[${row.sr_no}] SR 문서을(를) 삭제 하시겠습니까? 삭제한 경우 재 조회가 불가합니다.`,true,true,null)
    }
  }
  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        hover
        onClick={() => setOpen(!open)}>
        <TableCell align="center">{row.rownum}</TableCell>
        <TableCell align="center">
          <Tooltip title={row.line_name?row.line_name:""}>
          {row.image_yn==='Y'?
            <img width='80%' height='80%' src={require("assets/img/carrier/"+row.carrier+".gif")} />:
            <span>{row.line_name}</span>  
          }
          </Tooltip>
        </TableCell>
        <TableCell align="center"> <Link style={{color:'#2196f3',fontWeight:'bold'}} 
        to={{pathname: row.carrier==='WDF'?`/svc/srWdfc`:`/svc/sr`,
            state:{user_no:props.userData?props.userData.user_no:null,
                    sr_no:row.sr_no?row.sr_no:null,
                    sr_date:row.sr_date?row.sr_date:null,
                    carrier:row.carrier?row.carrier:null
                  }}}>{row.sr_no}</Link></TableCell>
        <TableCell align="center">
          <Grid container>
          {(row.insert_date) && 
            <>
            <Grid item xs={12} style={{textAlignLast:'center'}}>
              <span>신규 작성일</span>
            </Grid>
            <Grid item xs={12} style={{textAlignLast:'center'}}>
              <span>{row.insert_date}</span>
            </Grid>
            </>
          }
          {(row.update_date) &&
            <>
            <Grid item xs={12} style={{textAlignLast:'center'}}>
              <span>수정 일</span>
            </Grid>
            <Grid item xs={12} style={{textAlignLast:'center'}}>
              <span>{row.update_date}</span>
            </Grid>
            </>
          }
          </Grid>
        </TableCell>
        <TableCell align="center">{row.status_name}</TableCell>
        <TableCell align="center">{row.send_date_format}</TableCell>
        <TableCell align="center">{row.res_mbl_no}</TableCell>
        <TableCell align="center">{row.res_issue_date_format}</TableCell>
        <TableCell align="center">{row.sch_scd_format}</TableCell>
        <TableCell align="center" style={{whiteSpace:'nowrap'}}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{textAlignLast:'center'}}>
              {(row.sch_vessel_name !== null) &&
                <>
                <DirectionsBoatTwoTone fontSize="large"/><span className={classes.tableText}>{row.sch_vessel_name}</span>
                </>
              }
              
              {/* DirectionsBoat, DirectionsBoatSharp, DirectionsBoatOutlined, DirectionsBoatTwoTone, DirectionsBoatRounded */}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {(row.sch_pol)&&
              <Tooltip title={row.sch_pol_name?row.sch_pol_name:""}>
                <Chip className={classes.tableText} style={{color:'white'}} label={row.sch_pol} color="primary"/>
              </Tooltip>}
            </Grid>
            {(row.sch_pol) &&
            <Grid item xs={4} style={{textAlignLast:'center'}}>
              <ArrowForward fontSize="large"/>
            </Grid>}
            <Grid item xs={4} style={{textAlignLast:'right'}}>
              {(row.sch_pod)&&
              <Tooltip title={row.sch_pod_name?row.sch_pod_name:""}>
                <Chip className={classes.tableText} style={{color:'white'}} label={row.sch_pod} color="secondary"/>
              </Tooltip>}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell  align="center" style={{whiteSpace:'nowrap'}}>
          <Grid container spacing={1}>
            {(row.cargo_pack_qty !== null) &&
            <>
              <Grid item xs={12} style={{textAlignLast:'center'}}>
                <Chip variant="outlined" className={classes.tableText} label="CARGO" color="default"/>
              </Grid>
              <Grid item xs={12} style={{textAlignLast:'center'}}>
                <span className={classes.tableText}>{row.cargo_pack_qty!==null?row.cargo_pack_qty:"0"}</span>
              </Grid>
            </>}
          </Grid>         
        </TableCell>
        <TableCell  align="center" style={{whiteSpace:'nowrap'}}>
          <Grid container spacing={1}>
            {(row.cntr_count !=="0") &&
            <>
              <Grid item xs={12} style={{textAlignLast:'center'}}>
                <Chip variant="outlined" className={classes.tableText} label="CNTR" color="default"/>
              </Grid>
              <Grid item xs={12} style={{textAlignLast:'center'}}>
                <span className={classes.tableText}>{row.cntr_count}</span>
              </Grid>
            </>}
          </Grid>
        </TableCell>
        <TableCell align="center">
            <Grid container spacing={1}>
              <Grid item xs={6} style={{textAlignLast:'center'}}>
                
                
                <Tooltip title="Delete">
                  <Chip className={classes.tableText} style={{color:'white'}} label={"Delete"} color="default" onClick={()=>fncDeleteRow(row)}/>
                </Tooltip>
              </Grid>
            </Grid>
        </TableCell>
      </TableRow>
    </React.Fragment>
    );
  }

const useStyles = makeStyles(styles);

export default function SRList(props) {

  const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [endDate,setEndDate] = useState(new Date());
  const [copyToDate,setCopyToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [copyEndDate,setCopyEndDate] = useState(new Date());
  const [lineCode, setLineCode] = useState([]);
  const [carrierCode,setCarrierCode] = useState("");
  const [searchDate, setSearchDate] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [srNo, setSrNo] = useState("");
  const [num,setNum] = useState(1);
  const [errMessage, setErrmessage] = useState("");
  const [copyLineCode, setCopyLineCode] = useState("");
  const [copySrNo, setCopySrNo] = useState("");
  
  const [openView,setOpenView] = useState(false);
  //More버튼 파라메터 변수
  const classes = useStyles();

  useEffect(() => {
    if(props.userData){
      axios.post("/loc/getCustomLineCode",{}).then(res => setLineCode(res.data));
    }
    return () => {
      
    };
  }, []);
  
  const buttonClassname = clsx({
      [classes.buttonSuccess]: success,
  })
  
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
  
  const onSubmit = () => {
    setNum(1);
    setCopyLineCode(carrierCode);
    setCopyToDate(toDate);
    setCopyEndDate(endDate);
    axios.post("/shipper/selectSrList",{userNo:props.userData?props.userData.user_no:'', lineCode:carrierCode,num:1, endDate:endDate,toDate:toDate, sr_no: srNo}).then(
      res => {
        if(res.statusText==="OK") {
          if(res.data.length > 0) {
            AlertMessage("조회가 완료되었습니다","success");
            // setTotCnt(res.data[0].tot_cnt);
            setSearchDate(res.data);
          }else {
            setSearchDate([]);
            AlertMessage("조회 결과가 없습니다.","error");
            
          }
        }else {
          AlertMessage("조회 할 수 없습니다. 잠시후 다시 시도해 주세요.","error");
        }
      } 
      ).then(res=>{
        setCopySrNo(srNo);
        setCopyLineCode(carrierCode);
        setCopyEndDate(endDate);
        setCopyToDate(toDate);
      })
   // } else {
   //   props.openLogin();
    //}
  }

  const onCarrierChange = (e,data) => {
    if(data) {setCarrierCode(data.id);} else {setCarrierCode("");}
  }

  const onMore = () => {

    if(props.userData){
      if(!loading) {
        setSuccess(false);
        setLoading(true);
      }
        
      if(num !== Number(searchDate[0].tot_page)) {
        
        axios.post("/shipper/selectSrList",{userNo:props.userData?props.userData.user_no:'', lineCode:copyLineCode,num:num+1, endDate:copyEndDate,toDate:copyToDate,sr_no:copySrNo}).then(
          res => {
            if(res.statusText==="OK") {
              setNum(pre => pre + 1);
              if(res.data.length > 0) {
                AlertMessage("조회가 완료되었습니다","success");
                // setTotCnt(res.data[0].tot_cnt);
                setSearchDate([...searchDate,...res.data])
                setSuccess(true);
                setLoading(false);
              }else {
                // setSearchDate([]);
                AlertMessage("마지막 페이지입니다.","error");
                setSuccess(true);
                setLoading(false);
              }
            }else {
              AlertMessage("조회 할 수 없습니다. 잠시후 다시 시도해 주세요.","error");
            }
          } 
        )
      }else {
        setSuccess(true);
        setLoading(false);
      }
    }else {
      props.openLogin();
    }
  }

  
  return(
    <div  style={{paddingLeft:'10px',paddingRight:'10px'}}>
      <Card style={{marginTop:'0',marginBottom:'5px'}}>
        <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer spacing={1}>
              <GridItem xs={12} sm={4} md ={4}>
                <Autocomplete
                  options = {lineCode}
                  getOptionLabel = { option => option.id + '\n' +option.nm }
                  id="carrierCode"
                  onChange={onCarrierChange}
                  renderInput={params => (
                    <TextField inputProps={{maxLength:4}} {...params} label="Carrier" fullWidth />
                  )}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md ={3}>
                <CalendarBox
                  labelText ="From"
                  id="toDate"
                  format="yyyy-MM-dd"
                  setValue={toDate}
                  autoOk
                  onChangeValue={date => setToDate(date)}
                  formControlProps={{fullWidth: true}} 
                />
              </GridItem>
              <GridItem xs={12} sm={3} md ={3}>
                <CalendarBox
                  labelText ="To"
                  id="EndDate"
                  format="yyyy-MM-dd"
                  setValue={endDate}
                  autoOk
                  onChangeValue={date => setEndDate(date)}
                  formControlProps={{fullWidth: true}} 
                />
              </GridItem>
              <GridItem xs={12} sm={2} md ={2}>
                <CustomInput
                  labelText="SR No"
                  formControlProps={{
                    fullWidth: true,style:{paddingTop:'14px'}
                  }}
                  labelProps={{style:{top:'0'}}}
                   inputProps={{
                    value:srNo?srNo:'',
                    onChange: (e)=>setSrNo(e.target.value)
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </CardBody>  
      </Card>
      <GridContainer style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
	      <GridItem xs={12} sm={12} style={{textAlign:'right'}}>
	      <Link 
	          to={{pathname: carrierCode && 'WDFC' === carrierCode?`/svc/srWdfc`:`/svc/sr`,
	          state:{
	            user: props.userData?props.userData.user_no:'',
	            doc_new: "Y",
                carrier:carrierCode?carrierCode:null
	          }}}>
	            <Button color="info" endIcon={<AddCircle/>} style={{marginRight:'10px'}}>New</Button> 
	        </Link>
	        
	        <Button color="info" onClick = {onSubmit} endIcon={<Search/>} >Search</Button> 
	      </GridItem>
	    </GridContainer>
      <div style={{textAlignLast: "end"}}>
        <span style={{paddingRight:"20px", paddingTop:"5px"}}>[ Data Count: {searchDate.length}건 / {searchDate.length!==0?searchDate[0].tot_cnt:0}건 ]</span>
      </div>
      <TableContainer className={classes.tablecontainer}>
        <Table 	
          stickyHeader aria-label="sticky table"
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">No.</TableCell>
              <TableCell className={classes.tableCell} align="center">CARRIER</TableCell>
              <TableCell className={classes.tableCell} align="center">SR NO</TableCell>
              <TableCell className={classes.tableCell} align="center">SR DATE</TableCell>
              <TableCell className={classes.tableCell} align="center">STATUS CUS</TableCell>
              <TableCell className={classes.tableCell} align="center">SEND DATE</TableCell>
              <TableCell className={classes.tableCell} align="center">RES MBL NO</TableCell>
              <TableCell className={classes.tableCell} align="center">RES ISSUE DATE</TableCell>
              <TableCell className={classes.tableCell} align="center">SCH SCD</TableCell>
              <TableCell className={classes.tableCell} align="center">SCHEDULE</TableCell>
              <TableCell className={classes.tableCell} align="center" colSpan={2}>QTY</TableCell>
              <TableCell className={classes.tableCell} align="center">기능</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {searchDate.map((row,index) => (
                <Row key={index} row={row} {...props} onSearch = {()=> onSubmit()}/>
              ))}
          </TableBody>
          {searchDate.length >= 10 ? Number(searchDate[0].tot_page) !== num ? (
          <TableFooter>
            <TableRow>
              <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={13}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => onMore(num+1)}
                  disabled={loading}
                  endIcon={loading && <CircularProgress size={24} />}
                  className= {buttonClassname}>
                  {loading===false?`MORE( ${num} / ${searchDate[0].tot_page} )`:""}
                  {/* MORE&nbsp;(&nbsp;{num}&nbsp;/&nbsp;{searchDate[0].tot_page}&nbsp;) */}
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>): null : null } 
        </Table>
      </TableContainer>
      {openView}
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
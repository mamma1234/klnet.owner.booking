import React,{ useState, useEffect } from "react";

// @material-ui/core components

import axios from 'axios';
import Moment from 'moment';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Button from "components/CustomButtons/Button.js";

import { 
  Checkbox,
  TextField,
  Tooltip,
  IconButton,
  Button as CustomButton,
  Box,
  CircularProgress,
  Snackbar
} from "@material-ui/core";


import {
  Search,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Save as SaveIcon,
  Send as SendIcon,
  AssignmentTurnedIn as ConfirmIcon,
  LocalShippingOutlined as PickUpIcon,
  LocalShipping as DropOffIcon,
  ListAltSharp as BLIcon,
  AssignmentOutlined as SRIcon,
  FilterNoneRounded as MfcsIcon,
  Code,
} from "@material-ui/icons";

import CompView from 'views/Booking/view/CompressionView.js';
import ExpanView from 'views/Booking/view/ExpansionView.js';
import {
  Autocomplete,
  Alert as MuiAlert
} from '@material-ui/lab';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function DashBoard(props) {


  //조회조건 useState
  const [bkgList, setBkgList] = useState([]); //부킹리스트
  const [carrierCode,setCarrierCode] = useState("");
  const [toDate,setToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [endDate,setEndDate] = useState(new Date());
  //More조회조건
  const [copyBkgList, setCopyBkgList] = useState([]); //부킹리스트
  const [copyCarrierCode,setCopyCarrierCode] = useState("");
  const [copyToDate,setCopyToDate] = useState(Moment(new Date()).subtract(7,'days'));
  const [copyEndDate,setCopyEndDate] = useState(new Date());
  /////////////////////////////
  const [alertOpen,setAlertOpen] = useState(false);
  const [data,setData] = useState([]);
  const [bookingList,setBookingList]= useState([]);
  const [bkgSaveOn,setBkgSaveOn]= useState(true);
  const [bkgSendOn,setBkgSendOn]= useState(true);
  const [bkgConfirmOn,setBkgConfirmOn]= useState(true);
  const [mtPickupOn, setMtPickupOn] = useState(true);
  const [dropOffOn, setDropOffOn] = useState(true);
  const [mfcsOn, setMfcsOn] = useState(true);
  const [srSendOn,setSrSendOn]= useState(true);
  const [blConfirmOn,setBlConfirmOn]= useState(true);
  const [viewChange, setViewChange] = useState(false);
  const [waiting,setWaiting] = useState(false);
  const [lineCode, setLineCode] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [num,setNum] = useState(1);
  const [errMessage, setErrmessage] = useState("");
  const [sum,setSum] = useState(0);

  useEffect(() => {
    if(props.userData){
      axios.post("/loc/getCustomLineCode",{}).then(res => setLineCode(res.data));
      bookingListSearch();
    }else {
      AlertMessage('로그인 정보가 없습니다.','error');
      props.openLogin();
    }
    return () => {
      
    };
  }, []);

  useEffect(()=>{

    bookingListSearch();

  },[endDate,toDate]);

  useEffect(() => {

    onSubmit();

  },[bkgSaveOn,bkgSendOn,bkgConfirmOn, srSendOn, blConfirmOn, dropOffOn, mtPickupOn, mfcsOn])

  const onSubmit = () => {
    if( toDate > endDate ) {
			AlertMessage( "종료 일자가 시작 일자보다 빠릅니다. 다시 확인하세요.",'error');
      return false;
    }
    if(props.userData) {
      setWaiting(true);
      setCopyBkgList([]);
      setCopyCarrierCode(carrierCode);
      setCopyToDate(toDate);
      setCopyEndDate(endDate);
      axios.post("/api/selectDashboard",{num:1, userNo: props.userData, viewChange:viewChange, lineCode:carrierCode,bkgList:bkgList, toDate:toDate, endDate:endDate, stats:{bkgSave:bkgSaveOn, bkgSend:bkgSendOn, bkgConfirm:bkgConfirmOn, mtStats:mtPickupOn, dropStats:dropOffOn, mfcsStats:mfcsOn ,srStats:srSendOn,blStats:blConfirmOn}}).then(res => {
        if(res.statusText==="OK") {
          setNum(1);
          if(res.data.length > 0) {
            setData(res.data);
            AlertMessage("조회가 완료 되었습니다.","success");
          }else {
            setData([]);
            setSum(0);
            AlertMessage("조회 결과가 없습니다.","error")
          }
          setWaiting(false);
        }else {
          AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
        }
        setWaiting(false);
      });
    }else {
      // props.openLogin();
    }
  }

  const onMore = () => {
    if(props.userData) {
      if(!loading) {
        setSuccess(false);
        setLoading(true);
      }
      if(num !== Number(data[0].tot_page)) {
        axios.post("/api/selectDashboard",{num:num+1, userNo: props.userData, viewChange:viewChange, lineCode:copyCarrierCode, bkgList:copyBkgList, toDate:copyToDate, endDate:copyEndDate, stats:{bkgSave:bkgSaveOn, bkgSend:bkgSendOn, bkgConfirm:bkgConfirmOn, mtStats:mtPickupOn, dropStats:dropOffOn, mfcsStats:mfcsOn ,srStats:srSendOn,blStats:blConfirmOn}}).then(
          res => {
            if(res.statusText==="OK") {
              setNum(pre => pre + 1);
              if(res.data.length > 0) {
                AlertMessage("조회가 완료되었습니다","success")
                // setTotCnt(res.data[0].tot_cnt);
                setData([...data,...res.data])
                setSuccess(true);
                setLoading(false);
              }else {
                // setSearchDate([]);
                AlertMessage("마지막 페이지입니다.","error")
                setSuccess(true);
                setLoading(false);
              }
            }else {
              AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
            }
          } 
        )
      }else {
        setSuccess(true);
        setLoading(false);
      }
    }else {
      // props.openLogin();
    }
  }

  const bookingListSearch = () => {
    if( toDate > endDate ) {
			AlertMessage( "종료 일자가 시작 일자보다 빠릅니다. 다시 확인하세요.",'error');
      return false;
    }
    if(props.userData) {
      axios.post("/api/selectGroupbkg",{userNo:props.userData, toDate:toDate, endDate:endDate,}).then(res => {
        if(res.statusText==="OK") {
          setBookingList(res.data);
        }else {
          AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
      });
    }else {
      // props.openLogin();
    }


  }

  const onViewChange = () => {
    setViewChange(!viewChange);
    setBkgSaveOn(true);
    setBkgSendOn(true);
    setBkgConfirmOn(true);
    setMtPickupOn(true);
    setDropOffOn(true);
    setMfcsOn(true);
    setSrSendOn(true);
    setBlConfirmOn(true);
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

  const onBookingNumberChange =(e,data) => {
    if(data) { setBkgList(data)}
  }

  const onCarrierChange = (e,data) => {
    if(data) {setCarrierCode(data.id);} else {setCarrierCode("");}
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
                  )}/>
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
              <GridItem xs={12} sm={2} md ={2}/>
            </GridContainer>
            <GridContainer spacing={1}>
              <GridItem xs={12} sm={2} md ={2}>
                <Autocomplete
                  multiple
                  options = {bookingList}
                  getOptionLabel = { option => option.value}
                  id="booking"
                  disableCloseOnSelect
                  onChange={onBookingNumberChange}
                  renderOption={(option, {selected}) => (
                    <React.Fragment>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                        checked={selected}/>
                        {option.value}
                    </React.Fragment>
                  )}
                  renderInput={params => (
                    <TextField inputProps={{maxLength:4}} {...params} label="BOOKING NUMBER" fullWidth />
                  )}/>
              </GridItem>
              <GridItem xs={12} sm={10} md ={10}>
              {viewChange?(
                <GridContainer spacing={1}>
                  <GridItem xs={2} sm={2} md ={2}>
                    <Tooltip title="부킹 저장">
                      <IconButton size="medium" color={bkgSaveOn?"primary":"inherit"} onClick={()=> setBkgSaveOn(!bkgSaveOn)}>
                        <SaveIcon style={{fontSize:'30'}}/>
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={2} sm={2} md ={2}>
                    <Tooltip title="부킹 전송">
                      <IconButton size="medium" color={bkgSendOn?"primary":"inherit"} onClick={()=> setBkgSendOn(!bkgSendOn)}>
                        <SendIcon style={{fontSize:'30'}}/>
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={2} sm={2} md ={2}>
                    <Tooltip title="부킹 컨펌">
                      <IconButton size="medium" color={bkgConfirmOn?"primary":"inherit"} onClick={()=> setBkgConfirmOn(!bkgConfirmOn)}>
                        <ConfirmIcon style={{fontSize:'30'}}/>
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={2} sm={2} md ={2}>
                    <Tooltip title="SR 전송">
                      <IconButton size="medium" color={srSendOn?"primary":"inherit"} onClick={()=> setSrSendOn(!srSendOn)}>
                        <SRIcon style={{fontSize:'30'}}/>
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={2} sm={2} md ={2}>
                    <Tooltip title="BL 수신">
                      <IconButton size="medium" color={blConfirmOn?"primary":"inherit"} onClick={()=> setBlConfirmOn(!blConfirmOn)}>
                        <BLIcon style={{fontSize:'30'}}/>
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                </GridContainer>):
                (<GridContainer spacing={1}>
                  <GridItem xs={6} sm={6} md ={6}>
                    <GridContainer spacing={1}>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="부킹 저장">
                          <IconButton size="medium" color={bkgSaveOn?"primary":"inherit"} onClick={()=> setBkgSaveOn(!bkgSaveOn)}>
                            <SaveIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="부킹 전송">
                          <IconButton size="medium" color={bkgSendOn?"primary":"inherit"} onClick={()=> setBkgSendOn(!bkgSendOn)}>
                            <SendIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="부킹 컨펌">
                          <IconButton size="medium" color={bkgConfirmOn?"primary":"inherit"} onClick={()=> setBkgConfirmOn(!bkgConfirmOn)}>
                            <ConfirmIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="PICK UP">
                          <IconButton size="medium" color={mtPickupOn?"primary":"inherit"} onClick={()=> setMtPickupOn(!mtPickupOn)}>
                            <PickUpIcon style={{fontSize:'30', transform:'rotateY(180deg)'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={6} sm={6} md ={6}>
                    <GridContainer spacing={1}>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="DROP OFF">
                          <IconButton size="medium" color={dropOffOn?"primary":"inherit"} onClick={()=> setDropOffOn(!dropOffOn)}>
                            <DropOffIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="SR 전송">
                          <IconButton size="medium" color={srSendOn?"primary":"inherit"} onClick={()=> setSrSendOn(!srSendOn)}>
                            <SRIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="BL 수신">
                          <IconButton size="medium" color={blConfirmOn?"primary":"inherit"} onClick={()=> setBlConfirmOn(!blConfirmOn)}>
                            <BLIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                      <GridItem xs={3} sm={3} md ={3}>
                        <Tooltip title="적하목록 취합">
                          <IconButton size="medium" color={mfcsOn?"primary":"inherit"} onClick={()=> setMfcsOn(!mfcsOn)}>
                            <MfcsIcon style={{fontSize:'30'}}/>
                          </IconButton>
                        </Tooltip>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>)}
              </GridItem>
            </GridContainer>
          </GridItem>    			          
        </CardBody>  
      </Card>
      <GridContainer style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
        <GridItem xs={12} sm={6} md={6} style={{textAlign:'center'}}/>
        <GridItem xs={12} sm={4} md={4} style={{textAlign:'right'}}/>
        <GridItem xs={12} sm={2} md={2} style={{textAlign:'center'}}>
          <Button color="info" onClick = {onSubmit} endIcon={<Search/>} fullWidth>Search</Button> 
        </GridItem>
      </GridContainer>
      <div style={{textAlignLast: "end"}}>
        <CustomButton variant="outlined" color="primary" onClick={() => onViewChange()}>
          <Code style={{fontSize:"15"}}/>
        </CustomButton>
        <span style={{paddingRight:"20px", paddingTop:"5px"}}>&nbsp;[ Data Count: {data.length}건 / {data.length!==0?data[0].p.total_count:0}건 ]</span>
      </div>
      <Box>
        {waiting===true?(
        <div style={{textAlign:'-webkit-center'}}>
          <CircularProgress size={100}/>
        </div>
        ):(
        <>
        {viewChange?(
          <CompView  
            data={data} 
            setSum={(value)=>setSum(value)} 
            sum={sum} 
            more={() => onMore()} 
            num={num} 
            success={success} 
            loading={loading}/>
          ):(
          <ExpanView 
            data={data} 
            setSum={(value)=>setSum(value)} 
            sum={sum} 
            more={() => onMore()} 
            num={num} 
            success={success} 
            loading={loading}/>
          )}
        </>
        )}
      </Box>
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
import React,{ useState, useEffect } from 'react';
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, Table, TableBody, TableRow, TableCell, TableHead
  , TextField, Tooltip, Switch, FormControlLabel, IconButton
  , Snackbar, Divider, Box, Dialog, DialogTitle, DialogContent, DialogActions
  , Typography} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {DoneOutline, PriorityHigh, HourglassEmpty,ErrorOutline, ZoomIn} from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function ScrapPort( props ) {
  const [scrapLineCodeList,setScrapLineCodeList] = useState([]);
  const [lineCode, setLineCode] = useState("");
  const [linePortList, setLinePortList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // const [isLiked, setIsLiked] = useState("N");
  const [element, setElement] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [lineLikePortList, setLineLikePortList] = useState([]);

  // const columns:ColDef[]={
  //   {field:"line_code",}
  // }
  useEffect(() => {
    onScrapLineCode();
    return () => {
    };
  },[]);

  useEffect(() => {
    if( page === 1 ) {
      getLinePort();
    } else {
      setPage(1);
    }
    return () => {
    };
  },[isChecked]);

  // 페이징처리 변경됐을 경우
  useEffect(()=>{
    getLinePort();
  }, [page]);

  useEffect(()=>{
    if( open ) {
      getLikeLinePort();
    }
  }, [open])

  const onScrapLineCode = (e) => {
    if(props.userData) {
      axios.post(
        "/loc/getScrapLineCodeList",
        {},
      )
      .then(setScrapLineCodeList([]))
      .then(res => setScrapLineCodeList(res.data))
      .catch(err => {
        AlertMessage("오류가 발생했습니다. 관리자에게 문의하세요.","error");
      });
    } else {
      props.openLogin();
    }
  }

  // 포트코드 조회
  const getLinePort=()=>{
    if(props.userData) {
      axios.post(
        "/loc/getLinePort",
        {
          line_code:lineCode,
          onlyNull: isChecked,
          like:'N',
          page:page 
        }
      ).then(setLinePortList([]))
      .then(res => {
        // console.log(res.data);
        if( res.data.length === 0 ) {
          setPage(Number(1));
          setTotalCount(0);
          AlertMessage("조회 결과가 없습니다.","info");
        } else {
          setLinePortList(res.data);
          setPage(Number(res.data[0].page));
          setTotalCount(res.data[0].tot_page);
        }
      }).catch(err => {
        AlertMessage("오류가 발생했습니다. 관리자에게 문의하세요.","error");
      });
      // console.log(linePortList);
    } else {
      props.openLogin();
    }
  }

  // 선사선택시
  const onBlurLineCode=(e,data)=>{
    if( data ) {
      setLineCode( data.customs_line_code );
      setPage(1);
    } else {
      setLineCode( "" );
    }
  }

  // 이미지 변경
  const updateIconButton=( key, status )=>{
    let newArray = [...linePortList];
    newArray[key] = {
      ...newArray[key],
      serverity: status
    };
    setLinePortList(newArray);
  }
  // LINE PORT 입력후 저장하자
  const updateLinePort=(event,data, key)=>{
    // event.stopPropagation();
    if(props.userData) {
      updateIconButton(key, 'UPDATE');
      axios.post(
        "/loc/updateLinePort",
        {data},
        {headers:props.userData})
      .then(res => {
        updateIconButton(key, 'SUCCESS');
      })
      .catch(err => {
        updateIconButton(key, 'ERROR');
        AlertMessage("오류가 발생했습니다. 관리자에게 문의하세요.","error");
      });
      // console.log(linePortList);

    } else {
      props.openLogin();
    }
  }

  // 비슷한거 조회
  const likeHandleChange=(event,data, key)=>{
    // setIsLiked('Y');
    setElement(data);
    setOpen(true);
    // setPage(1);
  }

  // 비슷한거 조회
  const getLikeLinePort=()=>{
    // event.stopPropagation();
    // setPage(Number(1));
    // let data = element;
    if(props.userData) {
      // LIKE 조회
      // data.like = 'Y';
      // 포트명 LIKE 조회 되도록 수정
      let elPortName = element.port_name;
      let port_name = '';
      if( elPortName ) {
        port_name = elPortName.replaceAll(' ','%').replaceAll(',','%');
      }
      axios.post(
        "/loc/getLinePort",
        {
          line_code:element.line_code,
          onlyNull: isChecked,
          port_name: '{%'+port_name+'%}',
          like:'Y',
          page: 1 
        },
        {headers:props.userData})
      .then(setLineLikePortList([]))
      .then(res => {
        if( res.data.length === 0 ) {
          // setPage(Number(1));
          // setTotalCount(0);
          AlertMessage("조회 결과가 없습니다.","info");
        } else {
          setLineLikePortList(res.data);
          // setPage(Number(res.data[0].page));
          // setTotalCount(res.data[0].tot_page);
        }
      })
      .catch(err => {
        AlertMessage("오류가 발생했습니다. 관리자에게 문의하세요.","error");
      });
    } else {
      props.openLogin();
    }
  }

  // 기존 LinePortList 정보에 새로운 정보를 입력해준다.
  const inputChagneHandler=(e, key)=>{
    if( e.target.value ) {
      let newArray = [...linePortList];
      newArray[key] = {
        ...newArray[key],
        port_code:e.target.value,
        serverity: 'MODIFY'
      };
      setLinePortList(newArray);
    } else {
      let newArray = [...linePortList];
      newArray[key] = {
        ...newArray[key],
        port_code:'',
        serverity: 'ERROR'
      };
      setLinePortList(newArray);
    }
  }

  //
  const switchHandleChange=()=>{
    setIsChecked(!isChecked);
    // getLinePort();
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
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const pagingHandleChange = (event, value) => {
    setPage(Number(value));
  }

  const handleDialogClose = () => {
    setOpen(false);
  }

  const handleDialogClickOpen = () => {
    setOpen(true);
  }

  // LINE PORT 입력후 저장하자
  const updateLinePortElement=()=>{
    // event.stopPropagation();
    const data = element;
    if(props.userData) {
      axios.post(
        "/loc/updateLinePort",
        {data},
        {headers:props.userData})
      .then(res => {
        handleDialogClose();
        getLinePort();
      })
      .catch(err => {
        AlertMessage("오류가 발생했습니다. 관리자에게 문의하세요.","error");
      });
      // console.log(linePortList);
    } else {
      props.openLogin();
    }
  }

    // 기존 LinePortList 정보에 새로운 정보를 입력해준다.
    const InputChagneHandlerElement=(e)=>{
      let tempElement = element;
      tempElement = {
        ...tempElement,
        port_code : e.target.value
      }
      setElement( tempElement );
    }


    return(
        <>
        <Card>
          <CardBody>
            <Grid item xs={12} sm={9} md={12}>
              <Grid container >
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        options = {scrapLineCodeList}
                        getOptionLabel = { options => "["+options.customs_line_code+"] "+options.line_code}
                        id="scrap_line_code"
                        onChange={onBlurLineCode}
                        noOptionsText="Please Check Line ..."
                        renderInput={params => (
                        <TextField {...params} id="text_line" label="LINE"/>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} style={{textAlignLast:'right', paddingTop:"20px"}}>
                  <FormControlLabel
                    label="빈값만 조회하기"
                    control={
                      <Switch
                      checked={isChecked}
                      onChange={switchHandleChange}
                      name="only null"
                      color="primary" />
                    }
                  />
                </Grid>
                <Grid item xs={3} sm={3} md={3} style={{textAlignLast:'right', paddingTop:"20px"}}>
                  <Button onClick={getLinePort} color="info" endIcon={<SearchIcon/>} >SEARCH</Button>
                </Grid>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
        <Card>
        <CardHeader color="info" stats icon >
	        <CardIcon color="info" style={{padding:'0'}}>
	        <Assignment />
	      </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>선사별 PORT CODE </b></h4>
          {/* <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cntrCnt}</span> */}
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
              <TableHead>
                <TableRow>
                  <TableCell>LINE</TableCell>
                  <TableCell>PORT CODE</TableCell>
                  <TableCell>PORT NAME</TableCell>
                  <TableCell>SAVE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  linePortList.map((element,key) => {
                    return(
                      <TableRow key={key}
                        hover
                        // onClick={(event)=>selectedData(event,element, key)}
                        >
                        {element.line_code !== undefined?<TableCell>{element.line_code}</TableCell>:<TableCell></TableCell>}
                        {element.port_code ?
                        <TableCell>
                          <TextField 
                            value={element.port_code}
                            onChange={(e)=>inputChagneHandler(e, key)}
                            // onBlur={(event)=>updateLinePort(event,element, key)}
                            inputProps={{maxLength:5, minLength:5}}
                            size='small' 
                          ></TextField>
                          </TableCell>:
                          <TableCell>
                            <TextField
                              // value={element.port_code}
                              onChange={(e)=>inputChagneHandler(e, key)}
                              // onBlur={(event)=>updateLinePort(event,element, key)}
                              inputProps={{maxLength:5, minLength:5}}
                              size='small'
                            ></TextField>
                            <LightTooltip title="비슷한거조회">
                              <IconButton><ZoomIn onClick={(event)=>likeHandleChange(event,element, key)}></ZoomIn></IconButton>
                            </LightTooltip>
                            </TableCell>}
                        {element.port_name !== undefined?<TableCell>{element.port_name}</TableCell>:<TableCell></TableCell>}
                        <TableCell>
                        {element.serverity !== undefined ? 
                          element.serverity === 'MODIFY' ?
                            <LightTooltip title="수정"><IconButton><PriorityHigh color="secondary" onClick={(event)=>updateLinePort(event,element, key)}/></IconButton></LightTooltip>
                            :element.serverity === 'UPDATE'?<HourglassEmpty/>:element.serverity === 'SUCCESS'?<DoneOutline/>
                            :element.serverity === 'ERROR'?<ErrorOutline/>:''
                          :''}
                        </TableCell>
                      </TableRow>
                    )
                    })
                }
              </TableBody>
            </Table>
            <Divider/>
              <Box component="span">
                <Pagination
                    count={totalCount}
                    page={page}
                    onChange={pagingHandleChange}
                    defaultPage={1}
                    color="primary"
                    size="small"
                    showFistButton
                    showLastButton>
                </Pagination>
              </Box>
          </CardBody>
        </Card>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert 
          onClose={handleAlertClose}
          severity={severity}>
          {errMessage}
        </Alert>
      </Snackbar>
      <Dialog 
        onClose={handleDialogClose}
        color="primary"
        onClick={handleDialogClickOpen}
        open={open}
        fullWidth={true}
        maxWidth='md'
        >
        <DialogTitle onClose={handleDialogClose}>
          비스무리한거 찾기
        </DialogTitle>
        <DialogContent>
          <Card>
            <CardBody>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container >
                  <Grid item xs={2} md={2}>
                      <Typography gutterBottom>
                        {element.line_code}
                      </Typography>
                  </Grid>
                  <Grid item xs={5} md={5}>
                      <Typography gutterBottom>
                        {element.port_name}
                      </Typography>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <TextField value={element.port_code?element.port_code:''}
                      onChange={(e)=>InputChagneHandlerElement(e)}
                      inputProps={{maxLength:5, minLength:5}}
                    ></TextField>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2}>
                    <DialogActions>
                      <Button onClick={updateLinePortElement}>UPDATE</Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
          {/* <Divider/> */}
          <Card>
            <CardHeader color="info" stats icon >

            </CardHeader>
            <CardBody>
              <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell>LINE</TableCell>
                      <TableCell>PORT CODE</TableCell>
                      <TableCell>PORT NAME</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      lineLikePortList.map((element,key) => {
                        return(
                          <TableRow key={key}
                            hover
                            // onClick={(event)=>selectedData(event,element, key)}
                            >
                            {element.line_code !== undefined?<TableCell>{element.line_code}</TableCell>:<TableCell></TableCell>}
                            {element.port_code !== undefined?<TableCell>{element.port_code}</TableCell>:<TableCell></TableCell>}
                            {element.port_name !== undefined?<TableCell>{element.port_name}</TableCell>:<TableCell></TableCell>}
                          </TableRow>
                        )
                        })
                    }
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
        </DialogContent>
      </Dialog>
        </>
    )
}

export default ScrapPort;
import React,{useState,useEffect} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";


import {TextField,FormControl,InputLabel,Popover,Snackbar,Select,MenuItem,CircularProgress,Table,TableHead, TableRow, TableBody, TableCell, TableFooter, Paper, Grid, Icon, AppBar, Tab, Box, Typography, Tabs} from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import AddCompany from "components/company/AddCompany.js";
import Row from "views/TestPage/Company/CompanyRow.js";
import UserRow from "views/TestPage/Company/CompanyUserRow.js"
import IdentifyRow from "views/TestPage/Company/IdentifyRow.js"
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';
import CardIcon from "components/Card/CardIcon.js";
import clsx from 'clsx';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding:'15px',
    width: '100%',
    height: '80vh',
    marginBottom: theme.spacing(2),
    overflow:'scroll'
  },gridContainer: {
    padding:'15px'
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'25%',
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'25%',
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
    formControl:{
      // margin: theme.spacing(1)
      paddingBottom:'10.5px',
      height:'1.1876em'
    },
}))

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return(
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );


}
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls':`full-width-tabpanel-${index}`,
  };
}

export default function CompanyList(props) {

  const [value,setValue] = useState("0");
  const [searchData, setSearchData] = useState([]);
  const [num, setNum] = useState(1)
  const [loading] = useState(false);
  const [success] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [bn, setBn] = useState("");
  const [status, setStatus] = useState("");
  const [errMessage, setErrmessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [totCnt, setTotCnt] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [companyId,setCompanyId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userSearchData,setUserSearchData] = useState([]);
  const [userNum,setUserNum] = useState(1);
  const [identifySearchData, setIdentifySearchData] = useState([]);
  const [searchWorkCode,setSearchWorkCode] = useState("");
  const [workName,setWorkName] = useState("");
  

  const [copyParameter, setCopyParameter] =useState({
    id:"",
    name:"",
    bn:"",
    status:"",
  });
  const [copyUserParameter, setCopyUserParameter] =useState({
    userId:"",
    userStatus:"",
  });
  const [workCode,setWorkCode] = useState([])


  useEffect(() => {
    axios.post("/com/getWorkCode",{nm:""})
    .then(res => {

        if(res.statusText ==="OK") {
          setWorkCode(res.data)
        }

    })
    .catch(err => {
        if(err.response.status === 403||err.response.status === 401) {
        props.openLogin();
    }});

  }, []);

  useEffect(()=> {
    if(value==="1"){
      onUserSubmit();
      
    }else if(value==="2") {
      onIdentifySearch();
    }
  },[companyId,sectionId])
  


  const classes = styles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
        return;
    }
    setAlertOpen(false);
  }
  const AlertMessage = (message,icon) => {
    setErrmessage(message)
    setSeverity(icon)
    setAlertOpen(true);
  }
  const onTabChange = (e,v) => {
    setValue(v);
  }



  const onPopoverClick = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const onPopoverClose = () => {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  const popId = open ? 'simple-popover' : undefined;


  const onMore = (param) => {
    setNum(param);

    axios.post("/com/searchCompanyList",{
      num:param,
      id:copyParameter.id,
      name:copyParameter.name,
      bn:copyParameter.bn,
      status:copyParameter.status,
    })
    .then(res => {

        if(res.statusText ==="OK") {
          setSearchData([...searchData,...res.data]);
        }

    })
    .catch(err => {
        if(err.response.status === 403||err.response.status === 401) {
        props.openLogin();
    }});
  }
  const onUserMore = (param) => {
    
    setUserNum(param);
    axios.post("/com/searchCompanyUser",{
               num:param,
               companyId:companyId,
               sectionId:sectionId,
               id:copyUserParameter.userId,
               status:copyUserParameter.userStatus,
              })
              .then(res => {
                  setUserSearchData([...userSearchData,...res.data]);
              })
              .catch(err => {
                  if(err.response.status === 403||err.response.status === 401) {
                  props.openLogin();
              }});





  }

  const onSubmit = () => {
    setSearchData([]);
    setCopyParameter({
      id:id,
      name:name,
      bn:bn,
      status:status,
  })
  setNum(1);
  axios.post("/com/searchCompanyList",{
               num:1,
               id:id,
               name:name,
               bn:bn,
               status:status,
              })
              .then(res => {
                  if(res.data.length===0) {
                      AlertMessage('해당 조건의 검색된 결과가 없습니다.','error');
                  }else {
                      AlertMessage('조회가 완료되었습니다.','success');
                     
                  }
                  if(res.data.length > 0) {
                    setTotCnt(res.data[0].tot_cnt)
                  }else {
                    setTotCnt(0)
                  }
                  setSearchData(res.data);
              })
              .catch(err => {
                  if(err.response.status === 403||err.response.status === 401) {
                  props.openLogin();
              }});



  }
  const onUserSubmit = () => {

    setCopyUserParameter({
      userId:userId,
      userStatus:userStatus,
    })
    setUserNum(1);
    axios.post("/com/searchCompanyUser",{
               num:1,
               companyId:companyId,
               sectionId:sectionId,
               id:userId,
               status:userStatus,
              })
              .then(res => {
                  if(res.data.length===0) {
                      AlertMessage('해당 조건의 검색된 결과가 없습니다.','error');
                  }else {
                      AlertMessage('조회가 완료되었습니다.','success');
                     
                  }
                  setUserSearchData(res.data);
              })
              .catch(err => {
                  if(err.response.status === 403||err.response.status === 401) {
                  props.openLogin();
              }});
              console.log(document.querySelector('#scrollTop'))
              
  }
  const onIdentifySearch = () => {

    axios.post("/com/searchIdentify",{
      num:1,
      companyId:companyId,
      sectionId:sectionId,
      workCode:searchWorkCode,
     })
     .then(res => {
         if(res.data.length===0) {
             AlertMessage('해당 조건의 검색된 결과가 없습니다.','error');
         }else {
             AlertMessage('조회가 완료되었습니다.','success');
            
         }
         setIdentifySearchData(res.data);
     })
     .catch(err => {
         if(err.response.status === 403||err.response.status === 401) {
         props.openLogin();
     }});
     
  }
  const onIdenMore = (param) => {
  
  }


  const onWorkCodeChange = (e,data) => {
		
    if(data) {
      setSearchWorkCode(data.work_code);
      setWorkName(data.work_name);
    } else {
      setSearchWorkCode("");
      setWorkName("");
    }
  
  }



  return (
    <div>
      <Card style={{marginBottom:'0px'}}>
        <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
          <CardIcon color="info" style={{height:'56px'}}>
            <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleBlack}>업체 정보</h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>  
              <Grid container spacing={1}>
                
                {value ==="0"?(
                <Grid item xs={12} sm={12} md={12} >
                  <Grid container spacing={1}>
                    <Grid item xs={2} sm={2} md={2} >
                      <TextField id="id" size="small" label="ID" type="text" variant="outlined" value={id} onChange={(e) => setId(e.target.value)} fullWidth/>
                    </Grid>	
                    <Grid item xs={3} sm={3} md={3} >
                      <TextField id="name" size="small" label="NAME" type="text" variant="outlined" value={name} onChange={(e)=> setName(e.target.value)}  fullWidth/>
                    </Grid>	
                    <Grid item xs={3} sm={3} md={3} >
                      <TextField id="bn" size="small" label="BUSINESS NUMBER" value={bn} onChange={(e)=> setBn(e.target.value)} type="text" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} >
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                          <Select 
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                              id="statusSelect"
                              label="Status">
                              <MenuItem value="">ALL</MenuItem>
                              <MenuItem value="Y">Y</MenuItem>
                              <MenuItem value="N">N</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>	
                    <Grid item xs={2} sm={2} md={2} >
                      <Button id="id" size="lg" label="ID" color="info" onClick={() => onSubmit()} fullWidth>Search</Button>
                    </Grid>		
                  </Grid>
                </Grid>
                ):value==="1"?(
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} md={2} >
                        <TextField id="id" size="medium" label="USER ID" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} variant="outlined" fullWidth/>
                      </Grid>	
                      <Grid item xs={2} sm={2} md={2} >
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel id="status">Status</InputLabel>
                            <Select 
                                id="statusSelect"
                                value={userStatus}
                                onChange={(e) => setUserStatus(e.target.value)}
                                label="Status">
                                <MenuItem value="">ALL</MenuItem>
                                <MenuItem value="Y">Y</MenuItem>
                                <MenuItem value="N">N</MenuItem>
                            </Select>
                        </FormControl>
                      </Grid>	
                      <Grid item xs={2} sm={2} md={2}>
                        <Button id="id" size="lg" label="ID" color="info" onClick={() => onUserSubmit()} fullWidth>User Search</Button>
                      </Grid>	
                    </Grid>
                  </Grid>

                ):(
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} md={2} >
                        <Autocomplete
                          options = {workCode}
                          getOptionLabel = { option => option.work_name + '\n' +option.work_code}
                          id="workCode"
                          value={{work_code:searchWorkCode,work_name:workName}}
                          onChange={onWorkCodeChange}
                          renderInput={params => (
                            <TextField inputProps={{maxLength:2}} {...params} label="WorkCode" fullWidth />
                          )}
                        />
                      </Grid>
                      <Grid item xs={2} sm={2} md={2}>
                        <Button id="id" size="lg" label="ID" color="info" onClick={() => onIdentifySearch()} fullWidth>Identify Search</Button>
                      </Grid>	
                    </Grid>
                  </Grid>
                )}

              </Grid>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>


      <Paper style={{marginTop:'15px'}}>
          
          <AppBar id="scrollTop" position="static" color="default">
            <Tabs
              value={value}
              onChange={(e,v) => onTabChange(e,v)}>

              <Tab value="0" label="기업 리스트" {...allyProps('0')}/>  
              <Tab value="1" label="사용자 관리" {...allyProps('1')} disabled/>
              <Tab value="2" label="식별자 관리" {...allyProps('2')} disabled/>
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={'0'}>

            <GridItem xs={12} sm={12} md={12}>  
              <Grid container spacing={1}>
                <Grid item xs={9} sm={9} md={9} >
                  <Button id="addComp" size="lg" color="primary" onClick ={(e) => onPopoverClick(e)}>기업 추가</Button>
                  <Popover
                    id={popId}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => onPopoverClose()}
                    anchorOrigin={{
                      vertical:'bottom',
                      horizontal:'right'
                    }}
                    transformOrigin={{
                      vertical:'bottom',
                      horizontal:'left'
                    }}>
                      <AddCompany
                        closeFunction={() =>onPopoverClose()}
                      />
                  </Popover>
                </Grid>	
                <Grid item xs={3} sm={3} md={3} style={{textAlignLast: "end"}}>
                  <span style={{paddingRight:"20px", paddingTop:"5px"}}>[ Data Count: {searchData.length}건 / {totCnt}건 ]</span>
                </Grid>		
              </Grid>
            </GridItem>
            <Table 	
              stickyHeader aria-label="sticky table"
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
              <TableHead>
                  <TableRow>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">No</TableCell>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ID</TableCell>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Name</TableCell>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ENG Name</TableCell>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Business&nbsp;Number</TableCell>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Status</TableCell>
                      <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">Detail</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {searchData.map((row,index) => (
                    <Row 
                      key={index} 
                      row={row} 
                      addUser={
                        (data) => {
                          if(data){
                            
                            setValue("1");
                            setCompanyId(data[0].company_id);
                            setSectionId(data[0].section_id);
                            document.querySelector('#scrollTop').scrollIntoView({behavior:'auto',block:'center'})
                          }
                      }}
                      idenfitySearch={
                        (data) => {
                          if(data){
                            setValue("2");
                            setCompanyId(data[0].company_id);
                            setSectionId(data[0].section_id);
                            document.querySelector('#scrollTop').scrollIntoView({behavior:'auto',block:'center'})
                          }
                        }
                      } />))}
              </TableBody>
              {searchData.length >= 10 ? Number(searchData[0].tot_page) !== num ? (
              <TableFooter>
                  <TableRow>
                      <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={7}>
                          <Button
                              color="info"
                              onClick={() => onMore(num+1)}
                              disabled={loading}
                              endIcon={loading && <CircularProgress size={24} />}
                              className= {buttonClassname}
                          >
                              {loading===false?`MORE( ${num} / ${searchData[0].tot_page} )`:""}
                              {/* MORE&nbsp;(&nbsp;{num}&nbsp;/&nbsp;{searchDate[0].tot_page}&nbsp;) */}
                          </Button>
                      </TableCell>
                  </TableRow>
              </TableFooter>): null : null } 
            </Table>
          </TabPanel>
          <TabPanel value={value} index={'1'}>
            <GridItem xs={12} sm={12} md={12}>  
              <Table 	
                stickyHeader aria-label="sticky table"
                className={classes.table}
                aria-labelledby="tableTitle"
                size={'medium'}
                style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">No</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">USER NO</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">COMPANY ID</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">SECTION ID</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">AUTHORITY</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">STATUS</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DETAIL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userSearchData.map((row,index) => (
                      <UserRow key={index} row={row} saveAfter={(message,icon) =>AlertMessage(message,icon)}/>))}
                </TableBody>
                {userSearchData.length >= 10 ? Number(userSearchData[0].tot_page) !== userNum ? (
                <TableFooter>
                    <TableRow>
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                            <Button
                                color="info"
                                onClick={() => onUserMore(userNum+1)}
                                disabled={loading}
                                endIcon={loading && <CircularProgress size={24} />}
                                className= {buttonClassname}
                            >
                                {loading===false?`MORE( ${userNum} / ${userSearchData[0].tot_page} )`:""}
                                {/* MORE&nbsp;(&nbsp;{num}&nbsp;/&nbsp;{searchDate[0].tot_page}&nbsp;) */}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>): null : null } 
              </Table>
            </GridItem>



          </TabPanel>





          <TabPanel value={value} index={'2'}>
            <GridItem xs={12} sm={12} md={12}>  
              <Table 	
                stickyHeader aria-label="sticky table"
                className={classes.table}
                aria-labelledby="tableTitle"
                size={'medium'}
                style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">NO</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">WORK CODE</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">RECIPIENT</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ORIGINATOR</TableCell>
                        <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">WORK ALIAS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {identifySearchData.map((row,index) => (
                      <IdentifyRow key={index} row={row}/>))}
                </TableBody>
                {userSearchData.length >= 10 ? Number(identifySearchData[0].tot_page) !== userNum ? (
                <TableFooter>
                    <TableRow>
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                            <Button
                                color="info"
                                onClick={() => onIdenMore(userNum+1)}
                                disabled={loading}
                                endIcon={loading && <CircularProgress size={24} />}
                                className= {buttonClassname}
                            >
                                {loading===false?`MORE( ${userNum} / ${userSearchData[0].tot_page} )`:""}
                                {/* MORE&nbsp;(&nbsp;{num}&nbsp;/&nbsp;{searchDate[0].tot_page}&nbsp;) */}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>): null : null } 
              </Table>
            </GridItem>
          </TabPanel>
      </Paper>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert 
                onClose={handleAlertClose}
                severity={severity}>
                    {errMessage}

            </Alert>
    	</Snackbar>
      



      </div>
  );
}
















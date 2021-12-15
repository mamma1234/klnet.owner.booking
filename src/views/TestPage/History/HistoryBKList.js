import React,{useState,useEffect} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";


import {TextField,FormControl,InputLabel,Popover,Snackbar,Select,MenuItem,CircularProgress
  ,Table,TableHead, TableRow, TableBody, TableCell, TableFooter, Paper, Grid, Icon, AppBar, Tab, Box
  , Typography, Tabs, TableContainer} from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import HstryBkg from "views/TestPage/History/HistoryBkgTabs/HstryBkg.js";
import HstryBkgCargo from "views/TestPage/History/HistoryBkgTabs/HstryBkgCargo";
import HstryBkgCargoGoods from "views/TestPage/History/HistoryBkgTabs/HstryBkgCargoGoods"
import HstryBkgCntr from "views/TestPage/History/HistoryBkgTabs/HstryBkgCntr"
import HstryBkgCntrSpecial from "views/TestPage/History/HistoryBkgTabs/HstryBkgCntrSpecial"
import HstryBkgCntrSpecialAttach from "views/TestPage/History/HistoryBkgTabs/HstryBkgCntrSpecialAttach"

// other import

//import moment from 'moment';
import CardIcon from "components/Card/CardIcon.js";
import clsx from 'clsx';
import MuiAlert from '@material-ui/lab/Alert';



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
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
{/*       
      {value === index && (
    
          <Typography component="div">{children}</Typography>
   
      )} */}

      <Box p={2} >{value===index&&children}</Box>
    </Typography>
  );
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function HistoryBKList(props) {
  const classes = styles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const [searchData, setSearchData] = useState([]);
  const [value,setvalue] = useState("0");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading] = useState(false);
  const [success] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [pageNum, setPageNum] = useState(1);

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
  // useEffect(()=> {
  //   // if(value==="0"){
  //   //   searchBkgH(copyParameter);     
  //   // }else if(value==="1") {
  //   //   searchBkgCargoH(copyParameter);
  //   // }
  //   onSubmit();
  // },[value])
  const onTabChange = (e,v) => {
    setvalue(v);
  } 
 
  // const onMore=(params)=>{
  //   setPageNum(params)
  // }

  return (
    <div>
    <Paper style={{marginTop:'15px'}}>
      <AppBar position="static"  color="default">
          <Tabs value={value} 
                variant="scrollable"
                scrollButtons="on"
                onChange={(e,v) => onTabChange(e,v)}>
            <Tab value="0" label="shp_bkg" />
            <Tab value="1" label="shp_bkg_cargo" />
            <Tab value="2" label="shp_bkg_cargo_goods" />
            <Tab value="3" label="shp_bkg_cntr" />
            <Tab value="4" label="shp_bkg_cntr_special" />
            <Tab value="5" label="shp_bkg_cntr_special_attach" />
          </Tabs>
      </AppBar>
      {value === '0' &&
       <TabPanel value={value} index={'0'}>
        <HstryBkg 
                  AlertMessage={AlertMessage}
                  // searchData = {bkgList_Data}
                  // pageNum={pageNum}
                  // totCnt={totCnt}
                  loading={loading}        
                  // onMore={onMore}
                  buttonClassname={buttonClassname}
        />   
       </TabPanel>
      }
     {value === '1' && 
        <TabPanel value={value} index={'1'}>        
              <HstryBkgCargo  AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>
      }
      {value === '2' && <TabPanel value={value} index={'2'}>
        <HstryBkgCargoGoods   AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
                              
              />     
        </TabPanel>}
      {value === '3' && <TabPanel value={value} index={'3'}>
        <HstryBkgCntr AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>}
        {value === '4' && <TabPanel value={value} index={'4'}>
        <HstryBkgCntrSpecial AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>}
      {value === '5' && <TabPanel value={value} index={'5'}>
        <HstryBkgCntrSpecialAttach AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>} 
    </Paper>
        <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
            <Alert 
                onClose={handleAlertClose}
                severity={severity}>
                    {errMessage}
            </Alert>
        </Snackbar>
    </div>
  );
}












              

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
import HstrySr from "views/TestPage/History/HistorySrTabs/HstrySr.js";
import HstrySrBkg from "views/TestPage/History/HistorySrTabs/HstrySrBkg.js";
import HstrySrCargo from "views/TestPage/History/HistorySrTabs/HstrySrCargo.js";
import HstrySrCargoGoods from "views/TestPage/History/HistorySrTabs/HstrySrCargoGoods.js"
import HstrySrCargoMark from "views/TestPage/History/HistorySrTabs/HstrySrCargoMark.js"
import HstrySrCntr from "views/TestPage/History/HistorySrTabs/HstrySrCntr.js"
import HstrySrCntrSpecial from "views/TestPage/History/HistorySrTabs/HstrySrCntrSpecial.js"
import HstrySrDeclare from "views/TestPage/History/HistorySrTabs/HstrySrDeclare.js"

// other import

//import moment from 'moment';
import clsx from 'clsx';
import MuiAlert from '@material-ui/lab/Alert';

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop:'15px',
    flexGrow:1
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
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      <Box p={2} >{value===index&&children}</Box>
    </Typography>
  );
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function HistorySRList(props) {
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

  const onTabChange = (e,v) => {
    setvalue(v);
  } 
 
  return (
    <div>
    <Paper className={classes.root}>
      <AppBar position="static"  color="default">
          <Tabs value={value} 
                variant="scrollable"
                scrollButtons="on"
                centered
                onChange={(e,v) => onTabChange(e,v)}
                >
            <Tab value="0" label="shp_sr" />
            <Tab value="1" label="shp_sr_bkg" />
            <Tab value="2" label="shp_sr_cargo" />
            <Tab value="3" label="shp_sr_cargo_goods" />
            <Tab value="4" label="shp_sr_cargo_mark" />
            <Tab value="5" label="shp_sr_cntr" />
            <Tab value="6" label="shp_sr_cntr_special" />
            <Tab value="7" label="shp_sr_declare" />
          </Tabs>
      </AppBar>

      {value === '0' &&
       <TabPanel value={value} index={'0'}>
        <HstrySr
                  AlertMessage={AlertMessage}
                  loading={loading}        
                  buttonClassname={buttonClassname}
        />   
       </TabPanel>
      }
      {value === '1' &&
       <TabPanel value={value} index={'1'}>
        <HstrySrBkg 
                  AlertMessage={AlertMessage}
                  loading={loading}        
                  buttonClassname={buttonClassname}
        />   
       </TabPanel>
      }
     {value === '2' && 
        <TabPanel value={value} index={'2'}>        
          <HstrySrCargo  AlertMessage={AlertMessage}
                          loading={loading}        
                          buttonClassname={buttonClassname}
          />     
        </TabPanel>
      }
      {value === '3' && <TabPanel value={value} index={'3'}>
        <HstrySrCargoGoods   AlertMessage={AlertMessage}
                          loading={loading}        
                          buttonClassname={buttonClassname}
              />     
        </TabPanel>}
      {value === '4' && <TabPanel value={value} index={'4'}>
        <HstrySrCargoMark AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>}
        {value === '5' && <TabPanel value={value} index={'5'}>
        <HstrySrCntr AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>}
      {value === '6' && <TabPanel value={value} index={'6'}>
        <HstrySrCntrSpecial AlertMessage={AlertMessage}
                              loading={loading}        
                              buttonClassname={buttonClassname}
              />     
        </TabPanel>} 
        {value === '7' && <TabPanel value={value} index={'7'}>
        <HstrySrDeclare AlertMessage={AlertMessage}
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


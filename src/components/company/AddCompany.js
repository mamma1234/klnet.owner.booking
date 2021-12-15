import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles,fade } from "@material-ui/core/styles";
import moment from 'moment';

import {TextField,Dialog,Modal,Input,FormControl,InputLabel, DialogContentText,InputBase,Backdrop,Snackbar,Select,MenuItem,CircularProgress,Table,IconButton, Collapse,TableHead, TableRow, TableBody, TableCell, TableFooter, Tooltip, Paper, Grid, Icon, AppBar, Tab, Box, Typography, Tabs, useTheme, Fade, CardContent, CardActionArea, CardActions, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/TablePaging.js";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';
import SwipeableViews from 'react-swipeable-views';
import CardIcon from "components/Card/CardIcon.js";
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CustomTabs from "components/CustomTabs/CustomTabs2.js";
import ExcelSchLogTable from "components/Table/TablePaging.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import { TabContext, TabList } from "@material-ui/lab";
import { PropTypes } from "mobx-react";
import clsx from 'clsx';
import MuiAlert from '@material-ui/lab/Alert';
import MaskedInput from 'react-text-mask';
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import SearchAddress from 'components/LocalAddress/LocalAddress.js';
const styles = makeStyles((theme) => ({
    root: {
      maxWidth:'550px'
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
      modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      },
      modalCard: {
        maxWidth:550
      },
      border: {
          borderWidth:'2px',
          borderStyle:'inset',
          borderRadius: "3px",
      }
  }))
  function verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;  
  }
  function TextMaskCustom(props) {
    const {inputRef, ...other} = props;
    
    const classes = styles();
    return (
      <MaskedInput
        className={classes.border}
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,/\d/]}
        placeholderChar={'\u2000'}
        showMask
        />
    );
  }
  function PaperComponent(props) {
      return(
          <Paper {...props}/>
      )
  }
export default function AddCompany(props) {
    const [open,setOpen] = useState(false);
    const classes = styles();
    const [compId, setCompId] = useState("");
    const [compName, setCompName] = useState("");
    const [compEngName, setCompEngName] = useState("");
    const [compMaster, setCompMaster] = useState("");
    const [compBn, setCompBn] = useState("");
    const [compBt, setCompBt] = useState("");
    const [compSector, setCompSector] = useState("");
    const [compAddress, setCompAddress] = useState("");
    const [compAddDetail, setCompAddDetail] = useState("");
    const [compAddNumber, setCompAddNumber] = useState("");
    const [errMessage,setErrMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [compTel, setCompTel] = useState("");
    const [compFax, setCompFax] = useState("");
    const [compEmail, setCompEmail] = useState("")
    const businessNumberChange = (e) => {
        setCompBn(e.target.value);
      }
    const returnValue = (value) => {
        setCompAddress(value.roadAddr)
        setCompAddNumber(value.zipNo);
    }
    const workAfter = () => {
        props.closeFunction();
    }
    const dailogClose = () => {
        setDialogOpen(false);
        workAfter();
    }
    const dailogClose2 = () => {
        setDialogOpen(false);
    }
    
    const onSave = () => {
        setErrMessage("");

        let number = compBn.replace(/-/gi,'');
        number = number.replace(/(\s*)/gi,'');
    

        if(compId.length === 0) {
            setErrMessage("업체 ID 가(이) 입력되지 않았습니다. ");
            return;  
        }
        if(compId.length > 8 ) {
            setErrMessage("업체 ID 가(이) 너무 깁니다. ");
            return;
        }
        if(compName.length === 0) {
            setErrMessage("업체 명 가(이) 입력되지 않았습니다. ");
            return;  
        }
        if(compName.length > 20) {
            setErrMessage("업체 명 가(이) 너무 깁니다. ");
            return;  
        }
        if(compEngName.length > 50) {
            setErrMessage("업체 영문명 가(이) 너무 깁니다. ");
            return;  
        }
        
        if(number.length !== 10) {
          setErrMessage("사업자번호 형식이 틀립니다. ");
          return;
        }
        if(compMaster.length > 15) {
            setErrMessage("대표자명 가(이) 너무 깁니다. ");
            return;  
        }
        if(compSector.length > 10) {
            setErrMessage("업종명 가(이) 너무 깁니다. ");
            return;  
        }
        if(compBt.length > 15) {
            setErrMessage("업태명 가(이) 너무 깁니다. ");
            return;  
        }
        if(compMaster.length > 50) {
            setErrMessage("업체 주소 상세명 가(이) 너무 깁니다. ");
            return;  
        }


        axios.post("/com/checkCompany",{
            id:compId
        }).then(
            res=>{
                if(res.statusText==="OK" && res.data.length > 0) {
                    alert("이미 등록된 업체 ID가 존재합니다. ");
                    return;
                }else if (res.statusText==="OK" && res.data.length===0) {
                    axios.post("/com/saveCompany",{
                        id:compId,
                        name:compName,
                        ename:compEngName,
                        master:compMaster,
                        bn:number,
                        sector:compSector,
                        bt:compBt,
                        address:compAddress,
                        addressDetail:compAddDetail,
                        addressNumber:compAddNumber,
                        email:compEmail,
                        fax:compFax,
                        tel:compTel
                      })
                      .then(res => {
                        if(res.statusText ==="OK") {
                            setDialogOpen(true);
                        }
                      })
                      .catch(err => {
                        console.log(err)
                      });
                }else if(res.statusText!=="OK"){
                    alert("서버에 연결할 수 없습니다. ");
                    return;
                }
            }
        )
          
          

        
      

    }

	return (
        <Card className={classes.root}>
            <CardHeader>
                <Typography gutterBottom variant="h5" component="h2">
                    COMPANY REGIST
                </Typography>
            </CardHeader>
            <CardContent>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6}>
                        
                            <TextField required
                                id="compid" size="small" label="ID" type="text" variant="outlined" 
                                onChange={event => setCompId(event.target.value)} value={compId} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="compmaster" size="small" label="대표자(MASTER)" type="text" variant="outlined" 
                                onChange={event => setCompMaster(event.target.value)} value={compMaster} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="compname" size="small" label="NAME" type="text" variant="outlined" 
                                onChange={event => setCompName(event.target.value)} value={compName} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="compename" size="small" label="ENGLISH NAME" type="text" variant="outlined"
                                onChange={event => setCompEngName(event.target.value)} value={compEngName} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="tel" size="small" label="TEL" type="text" variant="outlined" 
                                onChange={event => setCompTel(event.target.value)} value={compTel} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="fax" size="small" label="FAX" type="text" variant="outlined"
                                onChange={event => setCompFax(event.target.value)} value={compFax} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} >
                            <TextField 
                                id="email" size="small" label="E-MAIL" type="text" variant="outlined"
                                onChange={event => setCompEmail(event.target.value)} value={compEmail} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} >
                            <FormControl style={{paddingTop:'12px', width:'100%'}}>
                                <InputLabel>사업자 번호</InputLabel>
                                <Input 
                                value={compBn}
                                onChange={businessNumberChange}
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom}/>
                            </FormControl>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="sector" size="small" label="업종" type="text" variant="outlined"
                                onChange={event => setCompSector(event.target.value)} value={compSector} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="bt" size="small" label="업태" type="text" variant="outlined"
                                onChange={event => setCompBt(event.target.value)} value={compBt} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={8} sm={8} md={8} >
                            <TextField id="id" size="small" label="주소" type="text" variant="outlined" inputProps={{readOnly:true}} fullWidth  onClick={() => setOpen(true)} value={compAddress}/>
                        </Grid>	
                        <Grid item xs={3} sm={3} md={3} >
                            <TextField id="id" size="small" label="우편번호" type="text" variant="outlined" inputProps={{readOnly:true}} fullWidth  onClick={() => setOpen(true)} value={compAddNumber}/>
                        </Grid>	
                        <Grid item xs={1} sm={1} md={1} >
                            <IconButton style={{marginBottom:'10px'}}  onClick={() => setOpen(true)}>
                                <SearchIcon/>
                            </IconButton>
                        </Grid>	
                    </Grid>
                </Grid>
                
                <Grid item xs={12} sm={12} md={12} >
                    <TextField
                        id="id" size="small" label="상세 주소" type="text" variant="outlined"
                        onChange={event => setCompAddDetail(event.target.value)} value={compAddDetail} fullWidth/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Typography gutterBottom component="div" style={{width:'100%',position:'absolute',textAlignLast: "center",}}>
                        <span>
                        {errMessage}
                        </span>
                    </Typography>
                </Grid>		
            </CardContent>
            <CardActionArea>
                <CardActions>
                    <Grid item xs={12} sm={12} md={12} >
                        <Grid container spacing={1}>
                            <Grid item xs={4} sm={4} md={4} >
                                <Button color="info" style={{width:'100%'}} onClick={() => workAfter()}>CANCEL</Button>
                            </Grid>	
                            <Grid item xs={4} sm={4} md={4} >
                            <Button  color="youtube" style={{width:'100%'}} onClick={() =>{
                                setCompId("");
                                setCompMaster("");
                                setCompName("");
                                setCompSector("");
                                setCompAddDetail("");
                                setCompAddNumber("");
                                setCompAddress("");
                                setCompEngName("");
                                setCompBn("");
                                setCompBt("");
                                setCompFax("");
                                setCompTel("");
                                setCompEmail("");
                            }}>RESET</Button>
                            </Grid>	
                            <Grid item xs={4} sm={4} md={4} >
                                <Button color="success" style={{width:'100%'}} onClick={() => onSave()}>SAVE</Button>
                            </Grid>	
                        </Grid>
                    </Grid>
                </CardActions>
            </CardActionArea>
            <SearchAddress
                open={open}
                params={null}
                onClose={()=> setOpen(!open)}
                setOpen={setOpen}
                setReturnAddress={returnValue}>
            </SearchAddress>
            <Dialog
                open={dialogOpen}
                onClose={dailogClose}
                PaperComponent={PaperComponent}>
                <DialogTitle style={{cursor:'move'}}>
                    저장 완료
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        저장이 완료 되었습니다. 보고있는 창을 닫으시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={dailogClose2} color="primary">
                        취소
                    </Button>
                    <Button autoFocus onClick={dailogClose} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>


    )
}
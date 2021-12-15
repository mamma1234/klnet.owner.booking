import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles,fade } from "@material-ui/core/styles";
import moment from 'moment';

import {TextField,Dialog,DialogContentText, TableFooter, Tooltip, Paper, Grid, Icon, AppBar, Tab, Box, Typography, Tabs, useTheme, Fade, CardContent, CardActionArea, CardActions, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

// core components
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
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
  
  function PaperComponent(props) {
      return(
          <Paper {...props}/>
      )
  }
export default function AddSection(props) {
    console.log(props)
    const classes = styles();
    const [compId] = useState(props.companyId);
    const [klnetId, setKlnetId] = useState(props.klnetId===undefined?"":props.klnetId);
    const [detailName, setDetailName] = useState(props.name===undefined?"":props.name);
    const [sectionId] = useState(props.sectionId);
    const [gubun] = useState(props.gubun)
    const [errMessage,setErrMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    
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
    
    const onEdit = () => {
        setErrMessage("");
        if(compId.length === 0) {
            setErrMessage("업체 ID 가(이) 입력 되지 않았습니다. ");
            return;  
        }
        if(klnetId.length === 0) {
            setErrMessage("KLNET ID가 입력 되지 않았습니다. ");
            return;  
        }
        if(compId !== props.companyId) {
            setErrMessage("ID 는 변경 하실 수 없습니다.");
            return;
        }
        if(sectionId !== props.sectionId) {
            setErrMessage("SECTION ID는 변경 하실 수 없습니다.");
            return;
        }
        axios.post("/com/editSection",{
            id:compId,
            sId:sectionId,
            klnetId:klnetId,
            name:detailName
            })
            .then(res => {
            if(res.statusText ==="OK") {
                setDialogOpen(true);
            }})
            .catch(err => {
                console.log(err)
            });
    }

    

    const onSave = () => {
        setErrMessage("");
        if(compId.length === 0) {
            setErrMessage("업체 ID 가(이) 입력 되지 않았습니다. ");
            return;  
        }
        if(klnetId.length === 0) {
            setErrMessage("KLNET ID가 입력 되지 않았습니다. ");
            return;  
        }
        
        if(detailName.length === 0) {
            setErrMessage("SECTION NAME 가(이) 입력 되지 않았습니다. ");
        }
        axios.post("/com/saveSection",{id:compId,klnetId:klnetId,name:detailName}).
            then(
                res => {
                    if(res.statusText ==="OK") {
                        setDialogOpen(true);
                    }
            }).catch(err => {console.log(err)});
    }

	return (
        <Card className={classes.root}>
            <CardHeader>
                <Typography gutterBottom variant="h5" component="h2">
                    {gubun==="A"?"SECTION REGIST":"SECTION EDIT"}
                </Typography>
            </CardHeader>
            <CardContent>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6}>
                        
                            <TextField 
                                id="compid" size="small" label="ID" type="text" variant="outlined" inputProps={{readOnly:true}}
                                value={compId} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField required
                                id="sectionid" size="small" label="SECTION ID" type="text" variant="outlined" inputProps={{readOnly:true}}
                                value={sectionId} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="klnetid" size="small" label="KLNET ID" type="text" variant="outlined" 
                                onChange={event => setKlnetId(event.target.value)} value={klnetId} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={6} md={6} >
                            <TextField 
                                id="detailname" size="small" label="DETAIL NAME" type="text" variant="outlined"
                                onChange={event => setDetailName(event.target.value)} value={detailName} fullWidth/>
                        </Grid>	
                    </Grid>
                </Grid>
                
                <Grid item xs={12} sm={12} md={12} >
                    <Typography gutterBottom component="div" style={{width:'100%',position:'absolute',textAlignLast: "center",}}>
                        <span>
                        {errMessage}
                        </span>
                    </Typography>
                </Grid>		
            </CardContent>
            <CardActions>
                <Grid item xs={12} sm={12} md={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={4} sm={4} md={4} >
                            <Button size="sm" color="info"  onClick ={() => workAfter()} fullWidth>CANCEL</Button>
                        </Grid>	
                        <Grid item xs={4} sm={4} md={4} >
                            <Button  size="sm" color="youtube" fullWidth onClick={() =>{setKlnetId("");setDetailName("");}}>RESET</Button>
                        </Grid>	
                        <Grid item xs={4} sm={4} md={4} >
                            {
                                gubun==="A"?(<Button size="sm" color="success" fullWidth onClick={() => onSave()}>SAVE</Button>)
                                            :(<Button size="sm" color="success" fullWidth onClick={() => onEdit()}>EDIT</Button>)
                            }
                            
                        </Grid>	
                    </Grid>
                </Grid>
            </CardActions>
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
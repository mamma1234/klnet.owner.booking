import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CustomInput from "components/CustomInput/CustomInput.js";
const useStyless = makeStyles(theme => ({

  headerCell: {
    backgroundColor: "#f2fefd",
    width:'30%',
  padding:'7px',
  textAlign:'right'
  },
  bodyCell: {
    textAlign: "left",
  padding:'7px',
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function StatsSgnBrkd(props) {
  const [severity, setSeverity] = useState("");
 // const [userStore] = useState(props.store);
  const classes = useStyless();
  const [cntrCnt, setCntrCnt] = useState('0');
  const [gubunCode, setGubunCode] = useState("A01");
  const [gubun, setGubun] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  const [cdValtValNm, setCdValtValNm] = useState("");
  const [cdValtVal, setCdValtVal] = useState("");
  // React.useEffect(() => {
	//     return () => {
	//       console.log('cleanup');
	//     };
	//   }, []);
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
  const handleGubun = (e) => {
    let selectText = e.target.value;

    setGubun(selectText);
    if(selectText === "???????????? ??????") {
      setGubunCode("A01");
    }else if(selectText ==="?????? ?????? ??????") {
      setGubunCode("A02");
    }else if(selectText ==="?????? ?????? ??????") {
      setGubunCode("A03");
    }else if(selectText ==="?????????????????? ??????") {
      setGubunCode("A04");
    }else if(selectText ==="???????????? ??????") {
        setGubunCode("A05");
    }else if(selectText ==="???????????? ??????") {
        setGubunCode("A06");
    }else if(selectText ==="??????????????? ??????") {
        setGubunCode("A07");
    }else if(selectText ==="??????????????????") {
        setGubunCode("A08");
    }else if(selectText ==="????????????") {
        setGubunCode("A09");
    }else if(selectText ==="???????????????") {
        setGubunCode("A10");
    }else if(selectText ==="????????????????????????") {
        setGubunCode("A11");
    }else if(selectText ==="????????????????????????????????? ??????") {
        setGubunCode("A12");
    }else if(selectText ==="???????????? ??????") {
        setGubunCode("A13");
    }

  }
  const onSubmit = () => {
	
	//?????? ?????? 
	if(cdValtValNm === "" && cdValtVal === "") {
		if(gubunCode === "A08" || gubunCode === "A10" || gubunCode === "A11") {
			AlertMessage("????????? ?????? ???????????? ?????? ????????? ?????????.","error");
			return;
		}
	}
	if(props.userData) {
    axios.post("/com/uniPassApiStatsSgnBrkd",{param:gubunCode,param2:cdValtValNm,param3:cdValtVal}, {headers:props.userData}).then(
      res => {
        if(res.data.message === "SUCCESS") {
          AlertMessage("????????? ?????????????????????.","success");
          setCntrCnt(res.data.infoData.cnt)
          setGridData(res.data.infoData.data);
        }else if (res.data.message === "NO_DATA") {
          AlertMessage("??????????????? ????????????.","error");
        }else {
          AlertMessage(res.data.errMsg,"error")
        }
      }
    ).catch(err => {
        if(err.response.status === 401) {
        	props.openLogin();
        }
        });
	} else {
		props.openLogin();
	}
  }
  return (
    <div>
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
			     		<Grid item xs={12} md={3}>
				     		<CustomSelect
										id="Gubun"
										labelText = "IMPORT&EXPORT"
										setValue = {gubun}
										option = {["???????????? ??????","?????? ?????? ??????","?????? ?????? ??????", "?????????????????? ??????","???????????? ??????","???????????? ??????","??????????????? ??????","????????????","????????????????????????????????? ??????","??????????????????","???????????????","????????????????????????"]}
										inputProps={{onChange:handleGubun}}
										formControlProps={{fullWidth: true,style:{marginTop:'11px'}}} 
							/>			
				         </Grid>
               <Grid item xs={12} md={3}>
	               <CustomInput
		            labelText={
		              <span>
		              <font size="2">?????????</font>
		              </span>
		            }
		            id="cdValtValNm"
		            formControlProps={{
		              fullWidth: true
		            }}
		            inputProps={{
		            	onChange: event => setCdValtValNm(event.target.value)
		            }}   
	         	/>	
               </Grid>
               <Grid item xs={12} md={3}>
	               <CustomInput
		            labelText={
		              <span>
		              <font size="2">?????????</font>
		              </span>
		            }
		            id="cdValtVal"
		            formControlProps={{
		              fullWidth: true
		            }}
		            inputProps={{
		            	onChange: event => setCdValtVal(event.target.value)
		            }}   
	         	/>	
               </Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>?????????</Button> */}
                <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} >SEARCH</Button>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>??????????????????</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cntrCnt}</span>
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCellStyle}>?????? ??????</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>?????? ??????</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>?????? ??????</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>?????? ??????</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    gridData.map((element,key) => {
                        return(
                          <TableRow key={key}>
                            {element.statsSgn !== undefined?<TableCell className={classes.tableCellStyle}>{element.statsSgn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.englAbrt !== undefined?<TableCell className={classes.tableCellStyle}>{element.englAbrt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.koreAbrt !== undefined?<TableCell className={classes.tableCellStyle}>{element.koreAbrt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.koreBrkd !== undefined?<TableCell className={classes.tableCellStyle}>{element.koreBrkd._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.itxRt !== undefined?<TableCell className={classes.tableCellStyle}>{element.itxRt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                          </TableRow>
                        )
                        })
                }
              </TableBody>
            </Table>
          </CardBody>
        </Card>


    
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

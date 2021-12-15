import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import {Grid, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
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
    backgroundColor:'#f2fefd',
    width:'25%'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'25%'
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ApfmPrcsStusQry(props) {
  const [severity, setSeverity] = useState("");
  //const [userStore] = useState(props.token);
  const classes = useStyless();
  const [number, setNumber] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
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
  const handleChange = (e) => {
    setNumber(e.target.value);
  }
  const onSubmit = () => {
	 
	  if(props.userData) {
	  
	    axios.post("/com/uniPassApiapfmPrcsStusQry",{param:number}, {headers:props.userData}).then(
	      res => {
	        if(res.data.message === "SUCCESS") {
	          AlertMessage("조회가 완료되었습니다.","success");
	          setGridData(res.data.infoData.data);
	        }else if (res.data.message === "NO_DATA") {
	          AlertMessage("조회결과가 없습니다.","error");
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
               <CustomInput
                    labelText="신청번호"
                    id="reqRqstNo"
                    value={number}
                    inputProps={{onChange:handleChange, fullWidth:true}}
                    formControlProps={{
                      fullWidth: true
                    }}/>		
              </Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
                <Button color="info" onClick = {onSubmit}  endIcon={<SearchIcon/>} >SEARCH</Button>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>통관단일창구 처리이력</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
            <TableBody>
              <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>요건신청번호</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.reqRqstNo!==undefined?gridData.reqRqstNo._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>요건관련전자문서코드</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.reqRelaElctDocCd!==undefined?gridData.reqRelaElctDocCd._text:""}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>전자문서명</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.elctDocNm!==undefined?gridData.elctDocNm._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>요건기관결과통보번호</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.reqIttRsltInfmNo!==undefined?gridData.reqIttRsltInfmNo._text:""}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>요건신청처리상태코드</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.reqRqstPrcsStcd!==undefined?gridData.reqRqstPrcsStcd._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>요건신청처리상태명</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.reqRqstPrcsSttsNm!==undefined?gridData.reqRqstPrcsSttsNm._text:""}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>전송구분코드</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.trsnTpcd!==undefined?gridData.trsnTpcd._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>전송구분명</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.trsnTpNm!==undefined?gridData.trsnTpNm._text:""}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>수신일시</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.rcpnDttm!==undefined?gridData.rcpnDttm._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>요건신청서코드</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.reqApfmCd!==undefined?gridData.reqApfmCd._text:""}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className={classes.tableHeaderCellStyle} colSpan={1}>관련문서명</TableCell>
              <TableCell className={classes.tableCellStyle} colSpan={3}>{gridData.relaDocNm!==undefined?gridData.relaDocNm._text:""}</TableCell>
              </TableRow>
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

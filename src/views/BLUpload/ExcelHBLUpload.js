import React, {useState, useEffect} from "react"; 
import { makeStyles } from "@material-ui/core/styles";
//npm
import Dropzone from 'react-dropzone';
import moment from 'moment';
import { Promise } from "core-js";
import axios from 'axios';
import Filesaver from 'file-saver';
import { ExcelRenderer } from "react-excel-renderer";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";

import {Icon, IconButton, Tooltip, CircularProgress} from "@material-ui/core";

import {
  BackupOutlined as BackupOutLinedIcon,
  ArrowForwardIos as ArrowFoward,
  Error as IconError
} from '@material-ui/icons'

import TablePaging from "views/BLUpload/UploadTable.js";

const useStyles = makeStyles(theme => ({
  root: {
    '& >*': {
      width:200,
    }  
  },
  uploadDiv: {
    borderStyle:'dotted',
    color:'#7FFFFF'
  },
  uploadComponent: {
    margin:'0 auto',
    textAlign:'center',
    textAlignLast:'center',
  },
  putComponent:{
    margin:'0 auto',
    textAlign:'center',
    textAlignLast:'center',
  },
  putDiv: {
    borderStyle:'dotted',
    color:'#36B8CF'
  },
  wrapButton: {
    marginTop:'10px'
  },
  iconSize: {
    width:50,
    height:50
  },
  arrowIconSize: {
    width:15,
    height:15
  },
  titleName: {
    fontWeight:'bold',
    fontSize:'17px'
  },
  progressStyle: {
    marginTop:'50px',
    textAlign:'center',
    textAlignLast:'center',
  }
  
}));

export default function Excelupload(props) {
  const classes = useStyles();
  const forwarderCode = props.params;
  const [rows, setRows] = useState([]);
  const [errRows, setErrRows] = useState([]);
  const [progress,setProgress] = useState(false);

  const fileHandler = (fileList) => {
    
    let fileObj = fileList[0]; 
    if (!fileObj) {
      props.returnMessage('No file uploaded!','error');
      return false; 
    }; 
      
    if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) ) { 
      props.returnMessage('Unknown file format. Only Excel files are uploaded!','error');
      return false; 
    }
    //just pass the fileObj as parameter 
    ExcelRenderer(fileObj, (err, resp) => {
      setErrRows([]);
      setRows([]);
      if (err) { 
        props.returnMessage(String(err),'error'); 
      } else {
        let newRows = [];
        let newerrRows = [];
        resp.rows.slice(2).forEach((row, index) => {
          let checkCode = false;
          let ieType = row[0];
          let fwCode = row[1];
          let hblNo = row[2];
          let etd = row[3];
          let remark = row[4];
          forwarderCode.forEach(element => {
            if (element.id === fwCode) {
              checkCode = true;
              return;
            }
          });
          if(row.length !== 0) {
            
            if(ieType !== "I" && ieType !== "E") {
              newerrRows.push([
                <span>{row[0]}<Tooltip title="수출입 구분을 확인 해주십시요." arrow><IconError color='error'></IconError></Tooltip></span>,
                row[1],
                row[2],
                row[3],
                row[4]
              ]);
              return;
            }
            if(!checkCode) {
              newerrRows.push([
                row[0],
                <span>{row[1]}<Tooltip title="알 수 없는 포워더 코드입니다." arrow><IconError color='error'></IconError></Tooltip></span>,
                row[2],
                row[3],
                row[4]
              ]);
              return;
            }
            if(hblNo===undefined||hblNo==="undefined"||hblNo===""||hblNo.length===0){
              newerrRows.push([
                row[0],
                row[1],
                <span>{row[2]}<Tooltip title="H-B/L No. 입력 되지 않았습니다." arrow><IconError color='error'></IconError></Tooltip></span>,
                row[3],
                row[4]
              ]);
              return;
            }
            if(hblNo.length > 35) {
              newerrRows.push([
                row[0],
                row[1],
                <span>{row[2]}<Tooltip title="H-B/L No. 길이가 너무 큽니다. 최대 길이 : 35" arrow><IconError color='error'></IconError></Tooltip></span>,
                row[3],
                row[4]
              ]);
              return;
            }
            if(etd !== undefined) {
              
              if(!moment(etd).isValid()){
                newerrRows.push([
                  row[0],
                  row[1],
                  row[2],
                  <span>{row[3]}<Tooltip title="ETD가 날짜 형식에 부합하지 않습니다." arrow><IconError color='error'></IconError></Tooltip></span>,
                  row[4]
                ]);
                return;
              }
            }
            if(etd===undefined||etd==="undefined"||etd===""||etd.length===0) {
              newerrRows.push([
                row[0],
                row[1],
                row[2],
                <span>{row[3]}<Tooltip title="ETD가 입력되지 않았습니다." arrow><IconError color='error'></IconError></Tooltip> </span>,
                row[4]
              ]);
              return;
            }
            if(remark.length > 25) {
              newerrRows.push([
                row[0],
                row[1],
                row[2],
                row[3],
                <span>{row[4]}<Tooltip title="Remark 길이가 너무 큽니다. 최대 길이 : 25" arrow><IconError color='error'></IconError></Tooltip></span>
              ]);
              return;
            }
            newRows.push([row[0],row[1],row[2],row[3],row[4]]);
          }
        });

    
        if (newRows.length === 0) {
          setRows([]);
          if( newerrRows.length === 0) {
            setErrRows([]);
          }else {
            setErrRows(newerrRows);
          }
          return false; 
        }else {
          setProgress(true);
          const newSelecteds = [];
          const newErrSelecteds= [];
            
          newRows.forEach(element => {
            checkPk(element).then(param => {
              console.log(param[5])
              if(param[5]) {
                param.splice(5)
                newSelecteds.push(param)
              }else {
                param.splice(5)
                newErrSelecteds.push(param)
              }
            })
          })
            
           setTimeout(function() {
            setRows(newSelecteds);
            setErrRows(newerrRows.concat(newErrSelecteds));
            setProgress(false);
          },3000)
          
        }
        
      }
    });
    return false; 
  };   

  const checkPk = (row) => {
   
    return new Promise(function(resolve,reject) {
      
      let ieType = row[0];
      let fwCode = row[1];
      let blNo = row[2];
      let etd = row[3];
      let remark = row[4];
      if(props.userData){
        axios.post("/loc/checkpkhbl",{ieType:ieType,fwCode:fwCode,hblNo:blNo,etd:etd}).then(res => {
          if(res.data.result.length > 0) {
            resolve([
              <span>{row[0]}<Tooltip title=" 이미 등록 되어있는 B/L 번호" arrow><IconError color='error'></IconError></Tooltip></span>,
              row[1],
              row[2],
              row[3],
              remark,
              false
            ]);
          }else {
            resolve([row[0],row[1],row[2],row[3],remark,true]);
          }
        })
      }else {
        props.returnMessage('로그인 정보가 없습니다.','error');
      }
    })  
  }
  const handleDown = () => {
    if(props.userData){ 
      axios.get("/loc/downloadHBLExcel",{}).then(
        res => {
          Filesaver.saveAs(new Blob([res.data]),"HBLUploadFormat.xlsx");
        });
    }else {
      props.returnMessage('로그인 정보가 없습니다.','error');
    }
  }

  const handleSubmit = async (e) => { 
    let dataRows = rows;
    if(dataRows.length != 0) {

      if(props.userData){
        axios.post("/loc/saveHBlList", { dataRows:dataRows }).then(response => {
        e.preventDefault();
        props.returnMessage('정상처리 되었습니다.','success');
        props.returnFunction();
        props.returnState();
        setRows([]);
        setErrRows([]);
        }).catch(error => {
          props.returnMessage(String(error),'error');
        });
      }
    }
  }

  return(
    <Card style={{width:'700px'}}>
      <CardHeader color="info" stats icon >
        <CardIcon color="info" style={{height:'55px'}}>
          <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>Excel Upload</h4>
        <Button style={{width:'300px'}} color="info" size="sm" onClick={() => handleDown()}>SAMPLE DOWNLOAD</Button>
      </CardHeader>
      <CardBody>
        <Dropzone
          onDrop={(file, text) => fileHandler(file)}
          multiple
          size={8000000}>
          {({getRootProps,getInputProps,isDragActive}) => (
          isDragActive?(
            <div {...getRootProps()}
              className={classes.putDiv}
              style={{height:'100px'}}>
              <input {...getInputProps()}/>
              <div className={classes.wrapButton}>
                <div className={classes.putComponent} style={{textAlignLast:'center'}}>
                  <IconButton>
                    <BackupOutLinedIcon className={classes.iconSize}/>Put File Here
                  </IconButton>
                </div>
              </div>
            </div>):
          (<div {...getRootProps()}
            className={classes.uploadDiv}
            style={{height:'100px'}}>
            <input {...getInputProps()}/>
            <div className={classes.wrapButton}>
              <div className={classes.uploadComponent} style={{textAlignLast:'center'}}>
                <IconButton>
                  <BackupOutLinedIcon  className={classes.iconSize}/><span style={{fontSize:'17px'}}>Click And Select File <br></br>Drag And Drop File</span>
                </IconButton>
              </div>
            </div>
          </div>))}
        </Dropzone>
        {progress &&
          <div className ={classes.progressStyle} style={{textAlignLast:'center'}}>
            <CircularProgress/>
          </div>}
        {rows.length > 0 &&
          <div>
            <ArrowFoward className={classes.arrowIconSize}/>
            <span className={classes.titleName}>Success</span>
            <TablePaging
              tableHeaderColor="info"
              tableHead={["I/E","FORWARDER","H-B/L No.", "ETD","Remark"]}
              tableData={rows}/>
          </div>}
        {errRows.length>0 &&
          <div>
            <ArrowFoward className={classes.arrowIconSize}/>
            <span className={classes.titleName}>Error</span>
            <TablePaging
            style={{marginLeft:'10px'}}
            tableHeaderColor="info"
            tableHead={["I/E","FORWARDER","H-B/L No.", "ETD","Remark"]}
            tableData={errRows}/>
          </div>}
        {rows.length > 0 &&
          <Button style={{width:'100%'}} color="info"  onClick={(e) => handleSubmit(e)} size="sm"> Submit Data </Button>}
      </CardBody>
    </Card>
  )
}
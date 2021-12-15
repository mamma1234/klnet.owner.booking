import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Select,MenuItem,Table,IconButton, Collapse, TableRow, TableBody, TableCell, Typography, Box, TextField} from '@material-ui/core';

//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';
import Button from "components/CustomButtons/Button.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
}))




export default function UserRow(props) {


 const [open, setOpen] = useState(false);
 const { row } = props;
 const [statusValue,setStatusValue] = useState(row.status);
 const classes = styles();
 const [rejectRemark, setRejectRemark] = useState(row.remark);


  useEffect(() => {
    if(statusValue !=='N') {
      setRejectRemark("");
    }

  }, [statusValue]);

 const onStateChange = (e) => {
   axios.post("/com/updateCompanyUser",{
     userNo:row.user_no,
     compNo:row.company_id,
     sectNo:row.section_id,
     status:e.target.value,
   })
   .then(res => {
       if(res.statusText ==="OK") {
         setStatusValue(e.target.value);
       }
   })
   .catch(err => {
    alert(err)
   });
   
 }
 const rejectRemarkSave = () => {
  axios.post("/com/updateCompanyUser",{
    userNo:row.user_no,
    compNo:row.company_id,
    sectNo:row.section_id,
    status:statusValue,
    remark:rejectRemark
  })
  .then(res => {
      if(res.statusText ==="OK") {
        props.saveAfter('저장이 완료되었습니다.','success')
      }
  })
  .catch(err => {
    props.saveAfter('저장에 실패하였습니다. '+err,'error');
  });
 }
 return (
   <React.Fragment>
       <TableRow
           className={classes.root}
           hover
           onClick={() => setOpen(!open)}>
       <TableCell align="center">{row.num}</TableCell>
       <TableCell align="center">{row.user_no}</TableCell>
       <TableCell align="center">{row.company_id}</TableCell>
       <TableCell align="center">{row.section_id}</TableCell>
       <TableCell align="center">{row.authority==="S"?"업체관리자":"사용자"}</TableCell>
       <TableCell align="center">{row.status}</TableCell>
       <TableCell align="center">
           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
           </IconButton>
       </TableCell>
       </TableRow>
       <TableRow>
       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
           <Collapse in={open} timeout="auto" unmountOnExit>
             <Box margin={1}>
               <Typography variant="h6" gutterBottom component="div">
                   사용자 정보
               </Typography>
               <Table size="small" aria-label="purchases">
                   <TableBody>
                       <TableRow>
                           <TableCell className={classes.tableHeaderCellStyle}>USER ID</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.local_id}</TableCell>
                           <TableCell className={classes.tableHeaderCellStyle}>USER NAME</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.user_name}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell className={classes.tableHeaderCellStyle}>COMPANY ID</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.company_id}</TableCell>
                           <TableCell className={classes.tableHeaderCellStyle}>SECTION ID</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.section_id}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell className={classes.tableHeaderCellStyle}>연락처</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.user_phone}</TableCell>
                           <TableCell className={classes.tableHeaderCellStyle}>이메일</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.user_email}</TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell className={classes.tableHeaderCellStyle}>권한</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.authority}</TableCell>
                           <TableCell className={classes.tableHeaderCellStyle}>상태</TableCell>
                           <TableCell className={classes.tableCellStyle}>
                            <Typography component="div">
                              <Select 
                                fullWidth
                                onChange={(e) => {onStateChange(e)}}
                                value={statusValue}
                                id="statusSelect"
                                label="Status">
                                <MenuItem value="Y">승인</MenuItem>
                                <MenuItem value="N">거절</MenuItem>
                                <MenuItem value="P">대기</MenuItem>
                              </Select>
                              {
                                statusValue ==="N"?(
                                  <Typography component="div">
                                    <TextField label="거절 사유" placeholder="거절사유 : " multiline rowsMax={4} value={rejectRemark} onChange={(e) => setRejectRemark(e.target.value)}/>
                                    <Button onClick={()=> rejectRemarkSave()}>확인</Button>
                                  </Typography>
                                  ):null
                              }
                              
                              </Typography>
                           </TableCell>
                       </TableRow>
                       <TableRow>
                           <TableCell className={classes.tableHeaderCellStyle}>가입일시</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.create_date}</TableCell>
                           <TableCell className={classes.tableHeaderCellStyle}>신청일시</TableCell>
                           <TableCell className={classes.tableCellStyle}>{row.join_date}</TableCell>
                       </TableRow>
                   </TableBody>
               </Table>
             </Box>
           </Collapse>
       </TableCell>
       </TableRow>
   </React.Fragment>
   );
 }
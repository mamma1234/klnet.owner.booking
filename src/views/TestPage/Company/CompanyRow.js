import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Dialog,DialogTitle,Select,MenuItem,DialogContentText,DialogActions,FormControl,Input,TextField,DialogContent,Popover,Checkbox,CircularProgress,Table,IconButton, Collapse,TableHead, TableRow, TableBody, TableCell, TableFooter, Paper, Grid, Typography} from '@material-ui/core';
// core components
import MaskedInput from 'react-text-mask';
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddSection from "components/company/AddSection.js";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import SearchAddress from 'components/LocalAddress/LocalAddress.js';


const styles = makeStyles((theme) => ({
    root: {
      maxWidth:'550px'
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
function PaperComponent(props) {
    return(
        <Paper {...props}/>
    )
}
function businessNumberFormat(num, type) {
    var formatNum = '';
    try{
        if(num.length===10) {
            if(type === 0) {
                formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/,'$1-$2-*****');
            }else {
                formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/,'$1-$2-$3');
            }
        }
    } catch(e) {
        formatNum=num;
        console.log(e)
    }
    return formatNum;
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
export default function CompanyRow(props) {

const { row } = props;
const [selected, setSelected] = useState([]);
const [open, setOpen] = useState(false);
const [addOpen,setAddOpen] = useState(false);
const classes = styles();
const [dateList, setDateList] = useState([]);
const [num, setNum] = useState(1);
const [anchorElA, setAnchorElA] = useState(null);
const [anchorElU, setAnchorElU] = useState(null);
const [loading] = useState(false);
const [success] = useState(false);
const [dialogOpen, setDialogOpen] = useState(false);
const [compName, setCompName] = useState(row.company_name);
const [compBn, setCompBn] = useState(row.business_number);
const [compEname, setCompEname] = useState(row.company_ename);
const [compBt, setCompBt] = useState(row.business_type);
const [compMaster, setCompMaster] = useState(row.company_master);
const [compFax, setCompFax] = useState(row.fax);
const [compTel, setCompTel] = useState(row.phone);
const [compEmail, setCompEmail] = useState(row.company_email);
const [compAddress, setCompAddress] = useState(row.address);
const [compAddressNumber, setCompAddNumber] = useState(row.address_number);
const [addressDetail, setAddressDetail] = useState(row.address_detail);
const [sector, setSector] = useState(row.sector);
const [status, setStatus] = useState(row.status);
const [save,setSave] = useState(false);

const [rowName, setRowName] = useState(row.company_name);
const [rowEName, setRowEName] = useState(row.company_ename);
const [rowBn, setRowBn] = useState(row.business_number);
const [rowStatus, setRowStatus] = useState(row.status);

useEffect(()=>{
    let number = compBn.replace(/-/gi,'');
    number = number.replace(/(\s*)/gi,'');

    if((compName !== row.company_name) || 
        (number !== row.business_number) || 
        (compEname !== row.company_ename) || 
        (compBt !== row.business_type) || 
        (compMaster !== row.company_master) ||
        (compAddress !== row.address) || 
        (compAddressNumber !== row.address_number) ||
        (addressDetail !== row.address_detail) ||
        (sector !== row.sector) ||
        (compEmail !== row.company_email) ||
        (compTel !== row.phone) ||
        (compFax !== row.fax) ||
        (status !== row.status)) {
        setSave(true);
    }else {
        setSave(false);
    }
});

const isSelected = (name) => selected.indexOf(name) !== -1;

const dailogClose = () => {
    setDialogOpen(false);
}
const returnValue = (value) => {
    setCompAddress(value.roadAddr);
    setCompAddNumber(value.zipNo);
}
const businessNumberChange = (e) => {
    setCompBn(e.target.value);
  }
const onPopoverClickAdd = (e) => {
  setAnchorElA(e.currentTarget);
}
const onPopoverClickEdit = (e) => {
    setAnchorElU(e.currentTarget);
}
const onPopoverClose = () => {
  setAnchorElA(null);
  setAnchorElU(null);
}
const onPopCloseSearch = () => {
    setSelected([]);
    setAnchorElA(null);
    setAnchorElU(null);
    setDateList([]);
    setNum(1);
  
    axios.post("/com/searchSectionList",{
      id:row.company_id,
      num:1,
    })
    .then(res => {
        if(res.statusText ==="OK") {
          setDateList(res.data);
        }
    })
    .catch(err => {
    });
}




const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1),
    );
  }

  setSelected(newSelected);

};
const popAOpen = Boolean(anchorElA);
const popUOpen = Boolean(anchorElU);
const popAId = popAOpen ? 'simple-popover' : undefined;
const popUId = popUOpen ? 'simple-popover' : undefined;

const addUser = () => {
  props.addUser(selected);
}

const idenfitySearch = () => {
    props.idenfitySearch(selected);
}

const buttonClassname = clsx({
  [classes.buttonSuccess]: success,
});
const onSubmit = () => {
  setSelected([]);
  setDateList([]);
  setNum(1)
  setOpen(!open);



  axios.post("/com/searchSectionList",{
    id:row.company_id,
    num:1,
  })
  .then(res => {
      if(res.statusText ==="OK") {
        setDateList(res.data);
      }
  })
  .catch(err => {
  });
}


const onStateChange = (e) => {
    setStatus(e.target.value);    
}

const onSave = () => {
    let number = compBn.replace(/-/gi,'');
    number = number.replace(/(\s*)/gi,'');

    if(compName !== null) {
        if(compName.length === 0) {
            alert("업체 명 가(이) 입력되지 않았습니다. ");
            return;  
        }
        if(compName.length > 20) {
            alert("업체 명 가(이) 너무 깁니다. ");
            return;  
        }
    }
    if(compEname !== null) {
        if(compEname.length > 50) {
            alert("영문 업체 명 가(이) 너무 깁니다. ");
            return;  
        }
    }    
    if(number !== null) {
        if(number.length !== 10) {
            alert("사업자번호 형식이 틀립니다. ");
            return;
        }
    }
    if(compMaster !== null) {
        if(compMaster.length > 15) {
            alert("대표자명 가(이) 너무 깁니다. ");
            return;  
        }
    }
    if(sector !== null) {
        if(sector.length > 10) {
            alert("업종명 가(이) 너무 깁니다. ");
            return;  
        }
    }
    if(compBt !== null) {
       if(compBt.length > 15) {
            alert("업태명 가(이) 너무 깁니다. ");
            return;  
        }
    }
    if(compMaster !== null) {
        if(compMaster.length > 50) {
            alert("업체 주소 상세명 가(이) 너무 깁니다. ");
            return;  
        }
    }
    if(addressDetail !== null) {
        if(compAddress === "" && addressDetail.length > 0 ) {
            alert("사업장 주소를 입력 해주세요. ");
            return;
        }
    }
    if(compTel !== null) {
        if(compTel.length > 15 ) {
            alert("전화번호 가(이) 너무 깁니다.");
            return;
        }
    }
    if(compFax !== null) {
        if(compFax.length > 15 ) {
            alert("팩스번호 가(이) 너무 깁니다.");
            return;
        }
    }
    if(compEmail !== null) {
        if(compEmail.length > 40 ) {
            alert("이메일 가(이) 너무 깁니다.");
            return;
        }
    }
    axios.post("/com/editCompany",{
        id:row.company_id,
        compName:compName,
        compEname:compEname,
        compNumber:number,
        compBt:compBt,
        compMaster:compMaster,
        compAddress:compAddress,
        compAddressNumber:compAddressNumber,
        addressDetail:addressDetail,
        sector:sector,
        status:status,
        email: compEmail,
        fax: compFax,
        tel: compTel

    })
    .then(res => {
        if(res.statusText ==="OK") {

            setRowName(compName);
            setRowEName(compEname);
            setRowBn(number);
            setRowStatus(status);
            alert('저장이 완료 되었습니다.');



        }
    }).catch(err => {
    
    });
}


const onMore = (param) => {

  setNum(param);

  axios.post("/com/searchSectionList",{
    id:row.company_id,
    num:param,
  })
  .then(res => {
      if(res.statusText ==="OK") {
        setDateList([...dateList,...res.data]);
      }
  })
  .catch(err => {
  });
}

const deleteRow = () => {
  alert('미 구현');
  console.log('로직 설계 후 개발 진행');
  dailogClose();
}
return (
    <React.Fragment>
        <TableRow
            className={classes.root}
            hover
            onClick={() => onSubmit()}>
            <TableCell align="center">{row.num}</TableCell>
            <TableCell align="center">{row.company_id}</TableCell>
            <TableCell align="center">{rowName}</TableCell>
            <TableCell align="center">{rowEName}</TableCell>
            <TableCell align="center">{businessNumberFormat(rowBn,1)}</TableCell>
            <TableCell align="center">{rowStatus}</TableCell>

            <TableCell align="center">
                <IconButton aria-label="expand row" size="small" onClick={() => onSubmit()}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                <Collapse in={open} timeout="auto" unmountOnExit style={{border:'4px outset #cfe8fc'}}>
                    <Typography component="div">
                        <GridItem xs={12} sm={12} md={12}>  
                            <Grid container spacing={1}>
                                <Grid item xs={4} sm={4} md={4}>
                                    <Typography variant="h6" gutterBottom component="div">Company Detail</Typography>
                                </Grid>	
                                <Grid item xs={6} sm={6} md={6}>
                                </Grid>	
                                <Grid item xs={2} sm={2} md={2}>
                                {save ===true?(<Button size="lg" color="google" onClick ={(e) => onSave(e)} fullWidth>저장</Button>):null}
                                </Grid>	
                            </Grid>
                        </GridItem>

                        <Table size="small" aria-label="purchases">
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCellStyle}>업체명</TableCell>
                                    <TableCell className={classes.tableCellStyle}>
                                        <TextField id="cname" size="small" label="NAME" type="text" variant="outlined" value={compName} onChange={(e) => setCompName(e.target.value)} fullWidth/>
                                    </TableCell>
                                    <TableCell className={classes.tableHeaderCellStyle}>업체 ID</TableCell>
                                    <TableCell className={classes.tableCellStyle}>{row.company_id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCellStyle}>사업자번호</TableCell>
                                    <TableCell className={classes.tableCellStyle}>
                                        <FormControl style={{paddingTop:'12px', width:'100%'}}>
                                            <Input 
                                            value={compBn}
                                            onChange={businessNumberChange}
                                            name="textmask"
                                            id="formatted-text-mask-input"
                                            inputComponent={TextMaskCustom}/>
                                        </FormControl>    
                                    </TableCell>
                                    <TableCell className={classes.tableHeaderCellStyle}>업체명(영)</TableCell>
                                    <TableCell className={classes.tableCellStyle}>
                                        <TextField id="cename" size="small" label="ENG NAME" type="text" variant="outlined" value={compEname} onChange={(e) => setCompEname(e.target.value)} fullWidth/>
                                    </TableCell>
                                </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCellStyle}>대표자</TableCell>
                                <TableCell className={classes.tableCellStyle}>
                                    <TextField id="cmaster" size="small" label="대표자" type="text" variant="outlined" value={compMaster} onChange={(e) => setCompMaster(e.target.value)} fullWidth/>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCellStyle}>이메일</TableCell>
                                <TableCell className={classes.tableCellStyle}>
                                    <TextField id="email" size="small" label="이메일" type="text" variant="outlined" value={compEmail} onChange={(e) => setCompEmail(e.target.value)} fullWidth/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCellStyle}>TEL</TableCell>
                                <TableCell className={classes.tableCellStyle}>
                                    <TextField id="tel" size="small" label="TEL" type="text" variant="outlined" value={compTel} onChange={(e) => setCompTel(e.target.value)} fullWidth/>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCellStyle}>FAX</TableCell>
                                <TableCell className={classes.tableCellStyle}>
                                    <TextField id="fax" size="small" label="FAX" type="text" variant="outlined" value={compFax} onChange={(e) => setCompFax(e.target.value)} fullWidth/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCellStyle}>주소</TableCell>
                                    <TableCell className={classes.tableCellStyle}>
                                        <TextField id="address" size="small" label="주소" type="text" variant="outlined" value={compAddress} inputProps={{ readOnly: true }} onClick={() => setAddOpen(!addOpen)} fullWidth/>
                                        <TextField id="addressdetail" size="small" label="상세주소" type="text" variant="outlined" value={addressDetail} 
                                            onChange={(e) => {
                                                if(compAddress.length===0) {
                                                    setAddOpen(!addOpen);
                                                }else {
                                                    setAddressDetail(e.target.value);
                                                }
                                            }} fullWidth/>
                                    </TableCell>
                                <TableCell className={classes.tableHeaderCellStyle}>
                                            <TableRow style={{marginBottom:'5px'}}><h5>업종</h5></TableRow>
                                            <TableRow style={{marginTop:'5px'}}><h5>업태</h5></TableRow>
                                </TableCell>
                                    <TableCell className={classes.tableCellStyle}>
                                        <TextField id="sector" size="small" label="업종" type="text" variant="outlined" value={sector} onChange={(e) => setSector(e.target.value)} fullWidth/>
                                        <TextField id="cename" size="small" label="업태" type="text" variant="outlined" value={compBt} onChange={(e) => setCompBt(e.target.value)} fullWidth/>
                                    </TableCell>
                            </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCellStyle}>STATUS</TableCell>
                                    <TableCell className={classes.tableCellStyle}>
                                        <Select fullWidth
                                           onChange={(e) => {onStateChange(e)}}
                                            value={status}
                                            id="statusSelect"
                                            label="Status">
                                        <MenuItem value="Y">승인</MenuItem>
                                        <MenuItem value="N">거절</MenuItem>
                                        <MenuItem value="P">대기</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell className={classes.tableHeaderCellStyle}>등록일자</TableCell>
                                    <TableCell className={classes.tableCellStyle}>{row.insert_date1}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Typography>
            
                    <Typography component="div">


                        <GridItem xs={12} sm={12} md={12}>  
                            <Grid container spacing={1}>
                                <Grid item xs={4} sm={4} md={4}>
                                    <Typography variant="h6" gutterBottom component="div">Company Section List</Typography>
                                </Grid>
                                	
                                <Grid item xs={2} sm={2} md={2}>
                                {
                                    selected.length ===1?(
                                    <Button size="lg" color="linkedin" onClick ={() => idenfitySearch()} fullWidth>식별자 관리</Button>):null
                                }
                                </Grid>	
                                <Grid item xs={2} sm={2} md={2}>
                                {
                                    selected.length ===1?(
                                    <Button size="lg"  color="info" onClick ={() => addUser()} fullWidth>사용자 관리</Button>
                                    ):null
                                }
                                </Grid>	
                                <Grid item xs={1} sm={1} md={1}>
                                {
                                    selected.length ===1?(
                                    <Button size="lg" color="danger" onClick ={() => setDialogOpen(true)} fullWidth>삭제</Button>
                                    ):null
                                }
                                </Grid>	
                                <Grid item xs={1} sm={1} md={1}>
                                    {
                                    selected.length === 1?(
                                    <div>
                                        <Button size="lg" color="success" onClick ={(e) => onPopoverClickEdit(e)} fullWidth>수정</Button>
                                        <Popover
                                        id={popUId}
                                        anchorEl={anchorElU}
                                        open={popUOpen}
                                        onClose={() => onPopoverClose()}
                                        anchorOrigin={{
                                        vertical:'bottom',
                                        horizontal:'right'
                                        }}
                                        transformOrigin={{
                                        vertical:'bottom',
                                        horizontal:'left'
                                        }}>
                                        <AddSection
                                            companyId={selected[0].company_id}
                                            sectionId={selected[0].section_id}
                                            klnetId={selected[0].klnet_id}
                                            name={selected[0].detail_name}
                                            gubun={"U"}
                                            closeFunction={() =>onPopCloseSearch()}
                                        />
                                        </Popover>
                                    </div>)
                                    :selected.length > 1?(<Button size="lg" color="info" onClick ={() => setDialogOpen(true)} fullWidth>삭제</Button>)
                                    :null 
                                    }
                                </Grid>	

                                <Grid item xs={2} sm={2} md={2}>
                                    <Button size="lg" color="youtube" onClick ={(e) => onPopoverClickAdd(e)} fullWidth>업체 섹션 등록</Button>
                                    <Popover
                                        id={popAId}
                                        anchorEl={anchorElA}
                                        open={popAOpen}
                                        onClose={() => onPopoverClose()}
                                        anchorOrigin={{
                                            vertical:'bottom',
                                            horizontal:'right'
                                        }}
                                        transformOrigin={{
                                            vertical:'bottom',
                                            horizontal:'left'
                                        }}>
                                        <AddSection
                                        companyId={row.company_id}
                                        closeFunction={() =>onPopCloseSearch()}
                                        gubun={"A"}
                                        />
                                    </Popover>
                                </Grid>	
                           </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12}>
                                {dateList.length !== 0?(
                                    <Table 	
                                        className={classes.table}
                                        // aria-labelledby="tableTitle"
                                        size={'small'}
                                        style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">V</TableCell>
                                                <TableCell align="center">No</TableCell>
                                                <TableCell align="center">CompanyID</TableCell>
                                                <TableCell align="center">SectionID</TableCell>
                                                <TableCell align="center">KLNET ID</TableCell>
                                                <TableCell align="center">DETAIL&nbsp;NAME</TableCell>                     
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dateList.map((row, index) => {
                                            const isItemSelected = isSelected(row);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return[
                                                <TableRow 
                                                    className={classes.root} 
                                                    onClick={(event) => handleClick(event, row)}
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.num}
                                                    selected={isItemSelected}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            inputProps={{ 'aria-labelledby': labelId }}/>
                                                    </TableCell>
                                                    <TableCell align="center">{row.num}</TableCell>
                                                    <TableCell align="center">{row.company_id}</TableCell>
                                                    <TableCell align="center">{row.section_id}</TableCell>
                                                    <TableCell align="center">{row.klnet_id}</TableCell>
                                                    <TableCell align="center">{row.detail_name}</TableCell>
                                                </TableRow>]})}
                                            </TableBody>
                                            {dateList.length >= 10 ? Number(dateList[0].tot_page) !== num ? (
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell style={{textAlignLast:'center'}} colSpan={6}>
                                                        <Button
                                                        color="info"
                                                        onClick={() => onMore(num+1)}
                                                        disabled={loading}
                                                        endIcon={loading && <CircularProgress size={24} />}
                                                        className= {buttonClassname}>
                                                        {loading===false?`MORE( ${num} / ${dateList[0].tot_page} )`:""}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>): null : null } 
                                        </Table>):(
                                        <Paper>
                                            <Grid item xs={12} sm={12} md={12} style={{textAlignLast:'center', height:'240px'}}>
                                                <span style={{fontSize:'30px', fontWeight:'bold',position:'relative', top:'100px'}}>조회 결과가 없습니다.</span>
                                            </Grid>
                                        </Paper>)}
                                </Grid>
                            </Grid>
                        </GridItem>


                    </Typography>
                </Collapse>
            </TableCell>
        </TableRow>
        <SearchAddress
            open={addOpen}
            params={null}
            onClose={()=> setAddOpen(!addOpen)}
            setOpen={(e) => setAddOpen(e)}
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
                {selected.length} 개 행을 삭제 하시겠습니까 ? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={dailogClose} color="primary">
                    취소
                </Button>
                <Button autoFocus onClick={() => deleteRow()} color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
);
}
import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import {Card, CardContent, TextField,TableFooter,MenuItem,FormControl,InputLabel,Select,Grid, Divider, Container,
        Avatar,Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chat from "@material-ui/icons/Chat";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Filesaver from 'file-saver'
import {red} from '@material-ui/core/colors'
import BoardWrite from 'views/TestPage/BoardWrite'
import {
	Autocomplete as Autocomplete,
	Alert as MuiAlert
} from '@material-ui/lab';
const useRowStyles = makeStyles((theme)=> ({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
	small: {
		width: theme.spacing(2),
		height: theme.spacing(2),
		backgroundColor: red['700']
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Row(props) {
	const classes = useRowStyles();
	const [row,setRow] = useState(props.row);
	const [open, setOpen] = useState(false);
	useEffect(()=>{
		setRow(props.row);
	},[props.row])
	useEffect(() => {
        if(row.board_id===props.num) {
            setOpen(true)
        }else {
            setOpen(false);
        }
	},[props.num]);
	useEffect(() => {
        if(open) {
            axios.post("/api/updateBoardHits",{board_id:row.board_id}).then(
                res=>{
                    
                    if(res.data === 1) {
                        setRow(prevState => {
                            return {...prevState, hit_count:String(Number(prevState.hit_count)+1)}
                        });
                    }
                }
            )
        }
    },[open])
	const onButtonClick = () => {
        if(row.board_id===props.num) {
            props.openNum("")
        }else {
            props.openNum(row.board_id);
        }
	}
	const fileDownload = (value) => {
    
        axios.post("/api/boardFIleDownLoad",{fileName:value.file_name,filePath:value.file_path},{responseType:"arraybuffer"}).then(
            res => {
              Filesaver.saveAs(new Blob([res.data]),value.real_file_name)
            });
	}
	
	return (

	  	<React.Fragment>
			<TableRow onClick={() => onButtonClick()}>
				<TableCell component="th" scope="row" style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.new_notice==='Y'?<Avatar className={classes.small}>N</Avatar>:row.num}</TableCell>
				<TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.title}</TableCell>
        <TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.service}</TableCell>
				<TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.author_name}</TableCell>
				<TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.hit_count}</TableCell>
				<TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.insert_date}</TableCell>
			</TableRow>
			<TableRow>
		  		<TableCell style={{ paddingBottom: 0, paddingTop: 0 , paddingLeft:'3px',paddingRight:'3px' }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
			  			<Box margin={1}>
						  	<GridItem>
								<Grid container spacing={1} style={{flex:'1 1 auto', padding:'1.25rem'}}>
									<Grid item xs={4} sm={4} md={4}>
										<GridItem>
											<Grid container spacing={1}>
												<Grid item xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
													<span style={{fontWeight:'bold'}}>작성자</span>
												</Grid>
												<Grid item xs={6} sm={6} md={6}>
													<span>{row.author_name}</span>
												</Grid>
											</Grid>
										</GridItem>
									</Grid>
									<Grid item xs={4} sm={4} md={4}>
										<GridItem>
											<Grid container spacing={1}>
												<Grid item xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
													<span style={{fontWeight:'bold'}}>조회수</span>
												</Grid>
												<Grid item xs={6} sm={6} md={6}>
													<span>{row.hit_count}</span>
												</Grid>
											</Grid>
										</GridItem>
									</Grid>
									<Grid item xs={4} sm={4} md={4}>
										<GridItem>
											<Grid container spacing={1}>
												<Grid item xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
													<Button onClick={()=> props.rowClick(row)} color="primary" variant ="outlined">수정</Button>
												</Grid>
												<Grid item xs={6} sm={6} md={6}>
													<Button onClick={()=> props.ConfirmOn(row)} color="primary" variant="outlined">삭제</Button>
												</Grid>
											</Grid>
										</GridItem>
									</Grid>
								</Grid>
							</GridItem>
							<GridItem>
								<Grid container>
									<Divider style={{backgroundColor:'#666666'}}/>
								</Grid>

								<Grid container spacing={1} style={{flex:'1 1 auto', padding:'1.25rem'}}>
									<div dangerouslySetInnerHTML={{__html:row.content}}/>
								</Grid>
							</GridItem>
							<GridItem>
								{row.attach_files &&  <>
								{/* <Grid container>
									<Divider style={{backgroundColor:'#666666'}}/>
								</Grid> */}
								<Grid container spacing={1}>
									{row.attach_files.map((value,idx) => {
										return(
											<Button color="primary" variant ="outlined" key={idx} onClick={()=> fileDownload(value)}>
												{value.real_file_name}
											</Button>
										)
									})}

								</Grid></>}
							</GridItem>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
  }


export default function BoardData(props) {
  
  const classes = useRowStyles();
  const [boardData,setBoardData] = useState([]);
  const [selectValue,setSelectValue] = useState("1");
  const [CopySelectValue,setCopySelectValue] = useState("");
  const [openPage, setOpenPage] = useState(0);
  const [Num,setNum] = useState(1);
  const [subject, setSubject] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  const [copySubject, setCopySubject] = useState("");
  const [service, setService] = useState("");
  const [copyService, setCopyService] = useState("");
  const [ConfirmOpen,setConfirmOpen] = useState(false);
  const [rowData,setRowData] = useState(null);
  const [Write, setWrite] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [Message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  useEffect(() => {
    
    onSubmit();
      
  }, []);
  useEffect(() => {
    if(props.location.state) {
        setOpenPage(props.location.state.param.board_id);
    }
  },[props.location]);
  useEffect(()=> {
    onSubmit();
    if(Write) {
        setRowData(null);
    }
},[Write]);
  const onSubmit = () => {
    setNum(1)
    if(props.userData) {
      setCopySelectValue(selectValue);
      setCopySubject(subject);
      setCopyService(service)
      axios.post("/api/notice",{num:1, gubun:selectValue, keyword:subject,service:service})
      .then(res => {;setBoardData(res.data)})
      .catch(err => {
        if(err.response.status === 403 || err.response.status === 401) {
        //  setOpenJoin(true);
        }
      });
    }else {
      props.isLogOut();
      props.openLogin();
    }

  }
  const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
  }
  const AlertMessage = (message,icon) => {
		setMessage(message)
		setSeverity(icon)
		setAlertOpen(true);
	}
  const onMore = () => {

    if(props.userData) {

      if(Num != boardData[0].tot_page) {
        //page ++
        setNum(prev=> prev + 1 );
    
        axios.post("/api/notice",{num:Num+1,gubun:CopySelectValue, keyword:copySubject, service:copyService})
        .then(res => setBoardData([...boardData,...res.data]))
        .catch(err => {
          if(err.response.status === 403 || err.response.status === 401) {
          //   setOpenJoin(true);
          }
        });
      }
    }else {
      props.isLogOut();
      props.openLogin();
    }

  }
  
  const onConfirmOpen = (data) => {
    setDeleteData(data);
    setConfirmOpen(true);
  };
  const onRowClick = (data) => {
    setRowData(data);
    setWrite(true);
  };
  const onConfirm = () => {
    axios.post("/com/deleteBoardWithFile",{param:deleteData}).then(
        res=> {
            if(res.statusText ==="OK") {
                if(res.data==="success"){

                    onSubmit();
                }
            }
        }
    )
    setConfirmOpen(false);
  }
  const onWrite = () => {
    setWrite(true)
  };

  return (
    <React.Fragment>
      <Container>
        {
          !Write?(
          <Grid container spacing={3}>
            <Grid item style={{margin:'20px auto'}} xs={11}>
              <Card>
                <CardContent>
                  <h4 style={{textAlignLast:'left',color:'black'}}><Chat style={{color:'#00acc1'}}></Chat> 공지사항 관리</h4>
                  <GridContainer>
                    <GridItem xs={4} sm={4} md={4} >
                      <TextField id="Subject" variant="outlined"  onChange={(event)=>setSubject(event.target.value)} fullWidth />
                    </GridItem>
                    <GridItem xs={4} sm={2} md={2} >
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>OPTION</InputLabel>
                        <Select
                          label="option"
                          value={selectValue}
                          onChange={(event)=>setSelectValue(event.target.value)}>
                          <MenuItem value="0">전체</MenuItem>
                          <MenuItem value="1">제목+내용</MenuItem>
                          <MenuItem value="2">작성자</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={4} sm={2} md={2} >
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>OPTION</InputLabel>
                        <Select
                            label="서비스 구분"
                            value={service}
                            onChange={(event)=>setService(event.target.value)}>
                          <MenuItem value="" >전체</MenuItem>
                          <MenuItem value="plismplus">프리즘</MenuItem>
                          <MenuItem value="pan">판로지스</MenuItem>
                          <MenuItem value="weidong">위동항운</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} >
                      <div style={{textAlign:'-webkit-right'}}>
                        <Button color="primary" variant ="outlined" size="large" endIcon={<SearchIcon/>}  onClick={()=> onSubmit()}>조회</Button>
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} >
                      <div style={{textAlign:'-webkit-right'}}>
                        <Button color="primary" variant ="outlined" size="large" endIcon={<SearchIcon/>}  onClick={()=> onWrite()}>신규 등록</Button>
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardContent>
                <CardBody>
                  <Table>
                    <TableHead style={{backgroundColor:'#f2fefd'}} className={classes["info" + "TableHeader"]}>
                      <TableRow style={{borderBottomStyle:'solid',borderBottomColor:'#00bcd4'}}>
                        <TableCell style={{width:'15%'}}>순번</TableCell>
                        <TableCell>제목</TableCell>
                        <TableCell style={{width:'10%'}}>서비스</TableCell>
                        <TableCell style={{width:'10%'}}>작성자</TableCell>
                        <TableCell style={{width:'10%'}}>조회수</TableCell>
                        <TableCell style={{width:'20%'}}>게시일</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {boardData.map((prop, key) => {
                        return (
                          <Row key={key} openNum={(e) => setOpenPage(e)} row={prop} num={openPage} rowClick={(data)=> onRowClick(data)} ConfirmOn={(data)=> onConfirmOpen(data)}/>
                          
                        );
                      })}
                    </TableBody>
                    {(boardData.length > 0 ?
                    <TableFooter >
                      <TableRow >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={6}>
                          {
                            boardData.length > 0 ? boardData[0].tot_page !== 0 ? boardData[0].tot_page !== Num ?  
                          (<Button
                            color="default"
                            variant="contained"
                            size="large"
                            onClick={()=>onMore(Num+1)}
                            style={{paddingLeft:'60px',paddingRight:'60px'}}
                          >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{boardData[0].tot_page}&nbsp;)</Button>):null:null:null	 
                          }
                          
                        </TableCell>
                      </TableRow>
                    </TableFooter>: null )}
                  </Table>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
          ):(
            <BoardWrite  goToList={() => setWrite(false)} onAlert={(state,msg) =>AlertMessage(msg,state)} rowData={rowData}  {...props} />
          )
        }
        
      </Container>
      <Dialog
        open={ConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>공지삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 공지를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setConfirmOpen(false)} >취소</Button>
          <Button onClick={()=> onConfirm()}>삭제</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert 
            onClose={handleAlertClose}
            severity={severity}>
            <span>{Message}</span>
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}




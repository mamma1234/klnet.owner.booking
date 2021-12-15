import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import {
	Collapse,
	Card,
	CardContent,
	TextField,
	TableFooter,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Grid,
	Divider,
	Container,
	Avatar,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Paper
} from "@material-ui/core";

import Button from "components/CustomButtons/Button.js";

import {
	Chat as Chat,
	KeyboardArrowDown as KeyboardArrowDownIcon,
	KeyboardArrowUp as KeyboardArrowUpIcon,
	Search as SearchIcon
}from "@material-ui/icons";
import axios from 'axios';
import Filesaver from 'file-saver'
import {yellow, red} from '@material-ui/core/colors'
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
											<Button  key={idx} onClick={()=> fileDownload(value)}>
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

export default function Board(props) {


    const classes = useRowStyles();
    const [boardData,setBoardData] = useState([]);
	const [selectValue,setSelectValue] = useState("1");
	const [CopySelectValue,setCopySelectValue] = useState("");
	const [openPage, setOpenPage] = useState(0);
	const [Num,setNum] = useState(1);
	const [subject, setSubject] = useState("");
	const [copySubject, setCopySubject] = useState("");
    useEffect(() => {
		onSubmit();
    }, []);
	useEffect(() => {
        if(props.location.state) {
            setOpenPage(props.location.state.param);
        }
    },[props.location]);
	const onSubmit = () => {
		
		axios.post("/api/notice",{num:1, gubun:selectValue, keyword:subject, service:'plismplus'})
		.then(res => {
			setNum(1);
			setCopySelectValue(selectValue);
			setCopySubject(subject);
			setBoardData(res.data)
		})
		.catch(err => {
			if(err.response.status === 403 || err.response.status === 401) {
			//  setOpenJoin(true);
			}
		});
	
	  }

	const onMore = () => {

		if(Num != boardData[0].tot_page) {
	
			axios.post("/api/notice",{num:Num+1,gubun:CopySelectValue, keyword:copySubject, service:'plismplus'}).then(setNum(prev=> prev + 1 ))
			.then(res => setBoardData([...boardData,...res.data]))
			.catch(err => {
				if(err.response.status === 403 || err.response.status === 401) {
				//   setOpenJoin(true);
				}
			});
		}
	}
    
    return(
		<React.Fragment>
			<Container>
				<Grid container spacing={3}>
					<Grid item style={{margin:'20px auto'}} xs={11}>
						<Card>
							<CardContent>
								<h4 style={{textAlignLast:'left',color:'black'}}><Chat style={{color:'#00acc1'}}></Chat> 공지사항</h4>
								<GridContainer>
									<GridItem xs={6} sm={4} md={4} >
										<TextField id="Subject" variant="outlined"  onChange={(event)=>setSubject(event.target.value)} fullWidth />
									</GridItem>
									<GridItem xs={6} sm={2} md={2} >
										<FormControl variant="outlined" >
											<InputLabel>OPTION</InputLabel>
											<Select
												label="option"
												value={selectValue}
												onChange={(event)=> setSelectValue(event.target.value)}>
												<MenuItem value="0">전체</MenuItem>
												<MenuItem value="1">제목+내용</MenuItem>
												<MenuItem value="2">작성자</MenuItem>
											</Select>
										</FormControl>
									</GridItem>
									<GridItem xs={12} sm={6} md={6} >
										<div style={{textAlign:'-webkit-right'}}>
											<Button color="info" endIcon={<SearchIcon/>}  onClick={()=> onSubmit()}>Search</Button>
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
											<TableCell style={{width:'10%'}}>작성자</TableCell>
											<TableCell style={{width:'10%'}}>조회수</TableCell>
											<TableCell style={{width:'20%'}}>게시일</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{boardData.map((prop, key) => {
											return (
												<Row key={key} openNum={(e) => setOpenPage(e)} row={prop} num={openPage} />
											);
										})}
									</TableBody>
									{(boardData.length > 0 ?
									<TableFooter >
										<TableRow >
											<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={5}>
												{
													boardData.length > 0 ? boardData[0].tot_page !== 0 ? boardData[0].tot_page !== Num ?  
												(<Button
													color="info"
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
			</Container>
		</React.Fragment>
    );
}
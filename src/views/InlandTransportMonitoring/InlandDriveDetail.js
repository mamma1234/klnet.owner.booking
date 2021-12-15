
import React,{useState} from "react";
import axios from 'axios';
import Moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";

import {Grid,TableRow,TableCell,Box,Collapse,Tooltip,Icon,Popover,CardMedia
} from "@material-ui/core";

import InlandDriveTimeline from './InlandDriveTimeline.js'
import InlandDriveVmap from './InlandDriveVworld.js'

import Card from "components/Card/Card.js";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function RowTable(props) {
	const [iconstate,setIconstate] = useState("add_circle");
	const [borderBottomStyleValue,setBorderBottomStyleValue] = useState("1px solid #e0e0e0");
	const [open, setOpen] = React.useState(false);
	const [bookmarkIcon,setBookmarkIcon] = useState(false);
	const [rowDetailData, setRowDetailData] = React.useState('');
	const [loading,setLoading ] = useState(false);
	const [imagePath, setImagePath] = React.useState('');
	const [point1, setPoint1] =useState([]);
	const [move1, setMove1] =useState([]);
	const classes = useStyles();
	
	const handleCollOpen = async() => {
		if (!open) {
			await axios.post("/loc/getInlandDriveDetail",{
				cntr_seq:props.data.CNTR_SEQ
			})
			.then(res => {
					if(res.status === 200&&!res.data.msg) {
						console.log('res.data', '>>',res.data )
						let rowDetailData1= res.data;
						let move = new Array();
						for (let i = 0; i < rowDetailData1.length; i++) {
							if(rowDetailData1[i].WGS84_X&&rowDetailData1[i].WGS84_Y){
							  let movePoint = new Array(4)
							  movePoint[0] = `${rowDetailData1[i].DETAIL_KIND} ${rowDetailData1[i].CAR_CODE}  (${rowDetailData1[i].BASE_DATE})`
							  movePoint[1] = rowDetailData1[i].ADDR
							  movePoint[2] = rowDetailData1[i].WGS84_Y
							  movePoint[3] = rowDetailData1[i].WGS84_X
							  move.push(movePoint)
							}
						  }
						let rowData=props.data
						let point=[
						["반출지", `${rowData.OUTGATE_CY} ${rowData.OUTGATE_NAME}`, rowData.OUTGATE_WGS84_Y, rowData.OUTGATE_WGS84_X],
						["반입지", `${rowData.INGATE_CY} ${rowData.INGATE_NAME}`, rowData.INGATE_WGS84_Y, rowData.INGATE_WGS84_X],
						["도어지", "도어지", rowData.DOOR_WGS84_Y ,rowData.DOOR_WGS84_X],
						]
						setMove1(move)
						setPoint1(point)
						setRowDetailData(res.data)
					} else {
						setRowDetailData([]);
						// alertMessage(res.data.msg,'error');	
					}
			})
			.catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					props.openLogin();
					}
				} else {
					console.log("error ",err);
					// alertMessage('조회된 데이터가 존재 하지 않습니다.','error');
				}
			});	

			setBorderBottomStyleValue("1px dotted #e0e0e0");
			setIconstate("remove_circle");
			setOpen(true);
		} else {
			setBorderBottomStyleValue("1px solid #e0e0e0");
			setIconstate("add_circle");
			setOpen(false);
		}		  
	}
	
	const handleStarClick = () => {
		console.log(props.data)
		setBookmarkIcon(!bookmarkIcon) 
	}
	
	const [anchorEl,setAnchorEl] =useState(null)
	const openPop =Boolean(anchorEl);
	const id = openPop? 'simple-popover' :undefined;
	

	const handleClick=(e,data)=>{
		console.log(e.currentTarget,data)
		setAnchorEl(e.currentTarget)
		let fileName= data.split('~')[2]
		let filePath= data.split('~')[1]
		let imagePath=`https://www.plism.com/plism3/shp/oub/mng/viewSealImage.do?fileName=${fileName}&filePath=${filePath}`
		setImagePath(imagePath)
	}
	const handleClose=()=>{
		setAnchorEl(null)
	}
	
	
	return (
	    <>
			<TableRow className={classes.tableRow + " " + classes.tableRowHead}  key={props.index}>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>{props.data.RNUM}</TableCell>
					 <TableCell className={classes.tableMainDtlCell} style={{paddingTop:'0',paddingBottom:'0',borderRight:'1px solid silver',textAlign:'center'}}>
					  {/* ,textAlignLast:'left',borderBottom:borderBottomStyleValue}}> */}
						 {bookmarkIcon
						 ?<Tooltip title="등록"><StarIcon onClick={handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>
						 :<Tooltip title="등록"><StarBorderIcon onClick={handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>}
					</TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.CARRIER_CODE} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.IE_TYPE=='I'?'수입':props.data.IE_TYPE=='E'?'수출':'-'} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.CNTR_NO} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.ADDR} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.CAR_CODE } </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.MOBILE_NO} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.COM_NAME} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.COM_PHONE} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.OUT_DUE_DATE?Moment(props.data.OUT_DUE_DATE).format('YYYY-MM-DD'):''} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>{props.data.RET_DUE_DATE?Moment(props.data.RET_DUE_DATE).format('YYYY-MM-DD'):''} </TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}} aria-describedby={id} onClick={props.data.SEAL_EMPTY?(e)=>handleClick(e,props.data.SEAL_EMPTY):undefined}>
						{props.data.SEAL_EMPTY?props.data.SEAL_EMPTY.split('~')[0]:props.data.SEAL_EMPTY} 
					{/* <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',cursor:'pointer'}} aria-describedby={id} onClick={'356761~/KLNET/klnet.nplism/sealno/20211110/~0105203251520211110092149463.jpg'?(e)=>handleClick(e,'356761~/KLNET/klnet.nplism/sealno/20211110/~0105203251520211110092149463.jpg'):undefined}>
						{'356761~/KLNET/klnet.nplism/sealno/20211110/~0105203251520211110092149463.jpg'.split('~')[0]} */}					
					</TableCell>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}} aria-describedby={id} onClick={props.data.SEAL_FULL?(e)=>handleClick(e,props.data.SEAL_FULL):undefined}>
						{props.data.SEAL_FULL?props.data.SEAL_FULL.split('~')[0]:props.data.SEAL_FULL} 
					{/* <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',cursor:'pointer'}} aria-describedby={id} onClick={'HS216113~/KLNET/klnet.nplism/sealno/20210831/~20210831094130HSLCC0507960.jpg'?(e)=>handleClick(e,'HS216113~/KLNET/klnet.nplism/sealno/20210831/~20210831094130HSLCC0507960.jpg'):undefined}>
						{'HS216113~/KLNET/klnet.nplism/sealno/20210831/~20210831094130HSLCC0507960.jpg'.split('~')[0]} */}
					</TableCell>
					<Popover
							id={id}
							open={openPop}
							onClose={handleClose}
							anchorEl={anchorEl}
							// anchorReference="anchorPosition"
							// anchorPosition={{top:100,left:550}}
							anchorOrigin={{vertical:'top',horizontal:'left',}}
							transformOrigin={{vertical:'bottom',horizontal:'right',}}
						> 
						<Card style={{minWidth:'400px'}}>
							<img src={imagePath} alt='NOT FOUND IMAGE' style={{maxWidth:'400px'}} />
						</Card>
					</Popover>
					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>
						<Tooltip title="more"><Icon style={{color:'#00acc1',paddingTop:'1px'}} onClick={handleCollOpen}>{iconstate}</Icon></Tooltip>
					</TableCell>
			</TableRow>
			<TableRow >
				<TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#f5f5f5' }} colSpan={15}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1} style={{marginLeft:'0',marginRight:'0'}}>
							<Grid container spacing={1} justifyContent="space-between">
								<Grid item xs={12} sm={12} md={3} style={{display: 'flex', alignItems: 'center'}}>
									<InlandDriveVmap rowData={props.data} point={point1} move={move1} rowDetailData={rowDetailData} rnum={props.data.RNUM} key={props.index} />
								</Grid>
	    		          		<Grid item xs={12} sm={12} md={9}>
									 <InlandDriveTimeline rowDetailData={rowDetailData} key={props.index} ieType={props.data.IE_TYPE}/>
								</Grid>
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
	    </>
	  );
}

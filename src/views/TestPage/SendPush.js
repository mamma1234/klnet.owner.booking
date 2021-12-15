import React,{useState, useEffect} from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
// @material-ui/core components
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize, MenuItem, InputLabel, Input, FormControl } from "@material-ui/core";
import axios from 'axios';

const styles = {
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
	gridheader:{
		backgroundColor:'#BDBDBD'
	},
	paper: {
		marginTop :'24px'
	},
	select: {
		width:'100%',
		maxWidth:'250px'
	}
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width:250
		}
	}
}

function getStyles(name, personName,theme) {
	return {
		fontWeight:
		personName.indexOf(name) === -1? theme.typography.fontWeightRegular:theme.typography.fontWeightMedium
	};
}

const useStyles = makeStyles(styles);
export default function SendPush(props) {
	const theme= useTheme();
	const [sender,setSender] = useState("ADMIN");
	const [receiverCheck, setReceiverCheck] = useState(false)
	const [title,setTitle] = useState("");
	const [body,setBody] = useState("");
	const [recvPushUser, setRecvPushUser] = useState(['ALL']);
	const [recvPushDevice, setRecvPushDevice] = useState(['ALL']);
	const [pushGubun,setPushGubun]= useState("NT")
	const [pushUser, setPushUser] = useState([]);
	const [realUser, setRealUser] = useState("")
	const [realDevice, setRealDevice] = useState("")
	const [pushDevice] = useState([{code:'ALL',name:'전체'},{code:'android',name:'android'},{code:'iOS',name:'iOS'}])
	
	const classes = useStyles();
	
    useEffect(() => {
		if(props.userData) {
			axios.post("/com/pushUserSearch",{}).then(
				res=> {
					if(res.statusText ==="OK") {
						setPushUser([{user_no:'ALL',user_name:'전체'},...res.data]);
					}
				}
			).catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					// props.openLogin();
					}
				}
			}); 
		}
        return () => {
            console.log('cleanup');
        };
	}, []); 

	const onSwitchChange =(e) => {
		setReceiverCheck(e.target.checked)
		if(e.target.checked === false) {
			onUserSetting();
		}
	}
	const onUserSetting = () => {
		setRecvPushUser(['ALL']);
		setRecvPushDevice(['ALL']);
		setRealUser("");
		setRealDevice("")
	}
	const onPushUseronChange = (e) => {
		if(e.target.value.indexOf('ALL') === -1) {
			setRecvPushUser(e.target.value)	
			let value = "";
			for (let index in e.target.value) {
		  
			  value = value + "'" + e.target.value[index] + "',";
			}
		  
			if(value) {setRealUser(value);} else {setRealUser("");}
		}else {
			setRecvPushUser(['ALL'])
		}
		
	}
	const onPushDeviceonChange = (e) => {
		if(e.target.value.indexOf('ALL') === -1) {
			setRecvPushDevice(e.target.value)	
			let value = "";
    
			for (let index in e.target.value) {
		  
			  value = value + "'" + e.target.value[index] + "',";
			}
		  
			if(value) {setRealDevice(value);} else {setRealDevice("");}
	
		}else {
			setRecvPushDevice(['ALL'])
		}
	}
	const onPushGubunChange = (e) => {
		setPushGubun(e.target.value)
	}
	
	const onSubmit = () => {

		if(sender==="") {
			alert('전송자를 입력하세요.');
			return;
		}
		
		axios.post("/com/pushSend",{
			param: {
				checkAll: receiverCheck,
				user:realUser,
				device:realDevice,
				sender:sender,
				title:title,
				body:body,
				gubun:pushGubun
			}
		}).then(
			res=> {
				if(res.statusText) {
					alert('전송이 완료되었습니다.')
					setTitle("")
					setBody("")
				}
			}).catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					// props.openLogin();
					}
				}
			}); 
	}
return (
	<div>
		<Card> 
			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
				<CardIcon color="info" style={{height:'56px'}}>
					<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>Push 전송</h4>
			</CardHeader>
			<CardBody>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>  
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={12} >
								<Grid container spacing={1}>
									<Grid item xs={3} sm={3} md={3} >
										<TextField id="sender" size="small" label="Sender" type="text" variant="outlined" onChange={(e) => {
											if(e.target.value.length > 10) {
												alert('Serder is Too Long');
												return;
											}
											setSender(e.target.value)
										}} value={sender} fullWidth/>
									</Grid>	
									<Grid item xs={3} sm={3} md={3} >
										<FormControl style={{marginLeft:'15px'}}>
										<InputLabel>구분</InputLabel>
										<Select 
											className={classes.select}
											value={pushGubun}
											fullWidth
											onChange={(e) => onPushGubunChange(e)}>
											<MenuItem value="NT">공지</MenuItem>
											<MenuItem value="DD">DEM & DET</MenuItem>
											<MenuItem value="TR">Tracking</MenuItem>
										</Select>
									</FormControl>
									</Grid>	
								</Grid>
							</Grid>
						</Grid>

						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={6} >
								<Grid container spacing={1}>
									<Grid item xs={12} sm={12} md={5} >
										<span>Receiver Setting</span>
										<Typography component="div">
											<Grid component="label" container alignItems="center" spacing={1}>
												<Grid item>전체</Grid>
												<Grid item>
													<Switch checked={receiverCheck} color="default" onChange={(e) => onSwitchChange(e)}/>
												</Grid>
												<Grid item>특정유저</Grid>
											</Grid>
										</Typography>
									</Grid>	
								</Grid>
							</Grid>
						</Grid>
					</GridItem>
				</GridContainer>
			</CardBody>
			
		</Card>
	    { receiverCheck === true? (
			<Paper className={classes.paper}>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>  
						<Grid container spacing={1}>
							<Grid item xs={3} sm={3} md={3} >
								<FormControl style={{marginLeft:'15px'}}>
									<InputLabel>User</InputLabel>
									<Select multiple
										className={classes.select}
										value={recvPushUser}
										input={<Input/>}
										MenuProps={MenuProps}
										fullWidth
										onChange={(e) => onPushUseronChange(e)}>
										{
											pushUser.map((element, index) => (
												<MenuItem key={index} value={element.user_no} style={getStyles(element, recvPushUser, theme)}>
													{element.user_name}
												</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={3} sm={3} md={3} >
								<FormControl style={{marginLeft:'15px'}}>
									<InputLabel>Device</InputLabel>
									<Select multiple
										className={classes.select}
										value={recvPushDevice}
										input={<Input/>}
										MenuProps={MenuProps}
										fullWidth
										onChange={(e) => onPushDeviceonChange(e)}>
										{
											pushDevice.map((element, index) => (
												<MenuItem key={index} value={element.code} style={getStyles(element, recvPushDevice, theme)}>
													{element.name}
												</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</GridItem>
				</GridContainer>
			</Paper>)
		:null
		}

		


		<Paper className={classes.paper}>
			<TextField id="title" size="medium" label="Push Title" type="text" variant="outlined" onChange={(e) => {
				if(e.target.value.length > 100) {
					alert('Title is Too Long');
					return;
				}
				setTitle(e.target.value);}} value={title} fullWidth/>
			<TextareaAutosize aria-label="empty textarea" rowsMin={10} style={{width:'100%',heigth:'300px'}}  onChange={(e) => {
											if(e.target.value.length > 150) {
												alert('Body is Too Long');
												return;
											}
											setBody(e.target.value)
										}} value={body}/>
			<Button style={{marginLeft:'30px'}} color="info" onClick= {() => onSubmit()}>Send</Button>
		</Paper>
	</div>
  );
}




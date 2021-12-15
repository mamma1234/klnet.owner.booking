import React,{ useState, useEffect } from "react";
//import $ from 'jquery';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import PropTypes from 'prop-types';
// core components
import GridItem from "components/Grid/GridItem.js";
import { CircularProgress, Divider,ButtonGroup,Backdrop} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import HeaderCard from "./Card/HeaderCard.js";
import BookingCard from "./Card/BookingCard.js";
import ScheduleCard from "./Card/ScheduleCard.js";
import ShipperCard from "./Card/ShipperCard.js";
import ConsigneeCard from "./Card/ConsigneeCard.js";
import NotifyCard from "./Card/NotifyCard.js";
import CargoCard from "./Card/CargoCard.js";
import ContainerCard from "./Card/ContainerCard.js";
import ExportCard from "./Card/DeclareCard.js";
import ShipperCard_CCAM from "./Card/ShipperCard_ccam.js";
import ConsigneeCard_CCAM from "./Card/ConsigneeCard_ccam.js";
import NotifyCard_CCAM from "./Card/NotifyCard_ccam.js";
import * as validation from 'components/common/validation.js';
import {grayColor,whiteColor,blackColor,hexToRgb} from "assets/jss/material-dashboard-pro-react.js";
import {observer} from 'mobx-react-lite';	
import {useSrStore}  from 'store/srStore.js';

const styles = makeStyles((theme) => ({
	root: {
		width: '80%',
	},
	sr_title: {
		boxShadow:'unset'	  
	},
	paper: {
		marginTop: theme.spacing(3),
		padding:theme.spacing(2),
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up(600+theme.spacing(3)*2)]: {
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(2),
			padding: theme.spacing(3),
	}
},

	gridContainer: {
		padding:'30px'
	},
	divider: {
		marginTop:'10px',
		marginBottom:'20px',
		backgroundColor:'#00acc1'
	},
	box: {
		width: '100%',
		marginTop: theme.spacing(3),
		padding:theme.spacing(2),
		marginBottom: theme.spacing(3),
	},
	avatar: {
		backgroundColor: '#00ACC1',marginRight:'5px',
		[theme.breakpoints.between("xs", "sm")]: {
			width: theme.spacing(4),
			height: theme.spacing(4)
		},
		[theme.breakpoints.between("md", "lg", "xl")]: {
			width: theme.spacing(5),
			height: theme.spacing(5)
		}
	},
	headerCell: {
		textAlign: "left",
		backgroundColor: "#f2fefd",
		width:'150px',
		padding:'7px',
		// fontSize: '15px',
		// fontWeight:'bold'
	},
	dataCell: {
		textAlign: "left",
		padding:'7px',
	},
	textField: {
		paddingBottom: '15px',
	},
	grid: {
		padding: '0px 10px !important',
	},
	gridLabel: {
		padding: '0px 10px !important',
		textAlign:'left',
		marginTop:'12px',
	},
	cntrCard: {
		paddingTop:'0',
	},
	cntrClose: {
		padding: '0px 0px !important',
		textAlign:'end',
	},
	cntrPlus: {
		padding: '0px 0px !important',
		textAlign:'center',
	},
	button: {
		minHeight: "auto",
		minWidth: "auto",
		backgroundColor: grayColor[0],
		color: whiteColor,
		boxShadow:
			"0 2px 2px 0 rgba(" +
			hexToRgb(grayColor[0]) +
			", 0.14), 0 3px 1px -2px rgba(" +
			hexToRgb(grayColor[0]) +
			", 0.2), 0 1px 5px 0 rgba(" +
			hexToRgb(grayColor[0]) +
			", 0.12)",
		border: "none",
		borderRadius: "3px",
		position: "relative",
		padding: "12px 30px",
		margin: ".3125rem 1px",
		fontSize: "12px",
		fontWeight: "400",
		textTransform: "uppercase",
		letterSpacing: "0",
		willChange: "box-shadow, transform",
		transition:
			"box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
		lineHeight: "1.42857143",
		textAlign: "center",
		whiteSpace: "nowrap",
		verticalAlign: "middle",
		touchAction: "manipulation",
		cursor: "pointer",
		"&:hover,&:focus": {
			color: whiteColor,
			backgroundColor: grayColor[0],
			boxShadow:
			"0 14px 26px -12px rgba(" +
			hexToRgb(grayColor[0]) +
			", 0.42), 0 4px 23px 0px rgba(" +
			hexToRgb(blackColor) +
			", 0.12), 0 8px 10px -5px rgba(" +
			hexToRgb(grayColor[0]) +
			", 0.2)"
		},
		"& .fab,& .fas,& .far,& .fal,& .material-icons": {
			position: "relative",
			display: "inline-block",
			top: "0",
			marginTop: "-1em",
			marginBottom: "-1em",
			fontSize: "1.1rem",
			marginRight: "4px",
			verticalAlign: "middle"
		},
		"& svg": {
			position: "relative",
			display: "inline-block",
			top: "0",
			width: "18px",
			height: "18px",
			marginRight: "4px",
			verticalAlign: "middle"
		},
		"&$justIcon": {
			"& .fab,& .fas,& .far,& .fal,& .material-icons": {
			marginTop: "0px",
			position: "absolute",
			width: "100%",
			transform: "none",
			left: "0px",
			top: "0px",
			height: "100%",
			lineHeight: "41px",
			fontSize: "20px"
			}
		}
	}
}));

var srNo=null;

//function SR(props) {
//const SR = inject('UserStore')(observer(({ UserStore, ...props }) => { 
function SR(props) { 


	const store =  useSrStore();
	const classes = styles();
	// const [autoSR, setAutoSR] = useState(true); //sr random
	const [confirm, setConfirm] = useState(false); //sr number check
	
	//const [sameconsignee, setSameconsignee] = useState(true); // same of consignee
	
	// const [openBkgCard, setOpenBkgCard] = useState(false);
	// const [openSchCard, setOpenSchCard] = useState(false);
	//const [openShpCard, setOpenShpCard] = useState(false);
	//const [openConsCard, setOpenConsCard] = useState(false);
	//const [openNotiCard, setOpenNotiCard] = useState(false);
	//const [openCargoCard, setOpenCargoCard] = useState(false);
	//const [openCntrCard, setOpenCntrCard] = useState(false);
	//const [openDeclareCard, setOpenDeclareCard] = useState(false);
	//const [openCShpCard, setOpenCShpCard] = useState(false);
	//const [openCConsCard, setOpenCConsCard] = useState(false);
	//const [openCNotiCard, setOpenCNotiCard] = useState(false);
	const [allOpen, setAllOpen] = useState(false);
	//const [bookmark,setBookmark] = useState([]);
	// const [confirmBkgList,setConfirmBkgList] = useState([]);
	const [confirmInfo,setConfirmInfo] = useState(props.location.search?JSON.parse(new URLSearchParams(props.location.search).get('param')):"");
  
	const [params, setParams] = useState({user_no: props.location.state && props.location.state.user_no?props.location.state.user_no|| '' :props.userData?props.userData.user_no:null, 
            sr_no: props.location.state && props.location.state.sr_no  ? props.location.state.sr_no || '' : null,  
            sr_date: props.location.state && props.location.state.sr_date ? props.location.state.sr_date || '' : null,
            doc_new: props.location.state && props.location.state.doc_new ? props.location.state.doc_new || '' : null,
            res_bkg_no: props.location.state && props.location.state.res_bkg_no?props.location.state.res_bkg_no || '':null,
            confirm_yn:props.location.state && props.location.state.confirm_yn?props.location.state.confirm_yn || '':null,
            carrier:props.location.state && props.location.state.carrier?props.location.state.carrier || '':null
	});
	
	//const [cntrSztp,setCntrSztp] = React.useState([]);
	//const [packCodeList,setPackCodeList] = React.useState([]);
	//const [serviceTerm,setServiceTerm] = React.useState([]);
	const [progress,setProgress] = useState([]);
  
	useEffect(() => { 
		if(confirmInfo) {
			store.setSr({
				...confirmInfo,
				bkgopen:false,
				schopen:false,
				shpopen:false,
				consopen:false,
				notiopen:false,
				cargoopen:false,
				cntropen:false,
				desopen:false,
				shpcopen:false,
				conscopen:false,
				noticopen:false,
				sameflag:true,
				sr_random:true,
				allopenflag:'N',});  
			
			if(props.userData) {
				let params = {
					line_code: 'WDFC',
					key: 'out'
				}
				onBookmark();
				getServiceTerm();
				
				
				selectLinePort(params);
				// 위동 PORT 목록조회
				params = {
					line_code: 'WDFC',
					key: 'in'
				}
				selectLinePort(params);
				getUserBookingList();
				cntrTypeSize();
				codePackage();  
			}
		}else {
			initSr();
		}

	}, []);
  
 	useEffect(() => {
	//console.log("params:",params)
	  	initSr();    

	}, [props.userData]);
  
	useEffect(() => {
		
		if(props.userData && params && !props.location.search) {
			setProgress(<Backdrop className={classes.backdrop} open={true}>
				<CircularProgress color="primary" />
			</Backdrop>); 
			if(params && 'Y' === params.doc_new) {
				onHandleSrDocNew();
			} else {
				getSRDataSelect();
			}
			
		}
		
	}, [params]);

	const initSr = () => {
		store.setSr({
			bkgopen:false,
			schopen:false,
			shpopen:false,
			consopen:false,
			notiopen:false,
			cargoopen:false,
			cntropen:false,
			desopen:false,
			shpcopen:false,
			conscopen:false,
			noticopen:false,
			sameflag:true,
			res_bkg_no:'',
			sr_random:true,
			allopenflag:'N',
			user_no:props.userData?props.userData.user_no:''});  
		
		if(props.userData) {
			let params = {
				line_code: 'WDFC',
				key: 'out'
			}
			onBookmark();
			getServiceTerm();
			
			
			selectLinePort(params);
			// 위동 PORT 목록조회
			params = {
				line_code: 'WDFC',
				key: 'in'
			}
			selectLinePort(params);
			getUserBookingList();
			cntrTypeSize();
			codePackage();  
		}
	}
 
	const selectLinePort = (params) => {
		axios.post("/shipper/selectLinePort",{ params },{}).then(res=>{
			if( 'out' === params.key ) {
				store.setSr_start_port_code(res.data);
			} else if ( 'in' === params.key ) {// console.log("line:",res.data)
				store.setSr_end_port_code(res.data);
			}
		});
	}
	
	const getServiceTerm =()=>{
		axios.post("/shipper/selectLineCodeServiceType" ,{ params:{line_code:'WDFC'} }).then(res => {
			store.setSr_term_code(res.data)
		});//setServiceTerm(res.data));
	}

	//컴펌 부킹 조회
	const getUserBookingList = () => {
		if(params) {
			axios.post("/shipper/getUserBookingInfo",{user_no:props.userData?props.userData.user_no:'',bkg_no:'',lineCode:'WDFC'},{}).then(res => {
				store.setSr_Confirm(res.data);
			});
		}
	}
	
	// 전체 북마크 조회
	const onBookmark =()=>{
		axios.post("/shipper/getUserBookmark",{user_no:props.userData?props.userData.user_no:''})
			.then(res => //setBookmark(res.data)
			store.setSr_bookmark(res.data));
	}



	//SR 조회
	const getSRDataSelect = () => {
		
		axios.post("/shipper/getUserSRDataList",{user_no :props.userData?props.userData.user_no:'',data:params,link:params?params.sr_no?'Y':'N':'N',list:'N'}).then(res => {
			if(res.data) {
				if(store.sr.sameflag) {
					//setstore.sr.({...res.data,noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
					// store.setSr({...res.data,noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
					if(!res.data.noti_name1) {
						// store.setSr({...res.data,'bkglist':[],noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
						store.setSr({...res.data,'bkglist':[],noti_name1:'',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
					}else {
						store.setSr({...res.data,'bkglist':[]});
					}
				} else {
					store.setSr(res.data);
				}
				//if(params.sr_no) {
					allOpenCloseCard(true);
				//}
			} else {
				//setstore.sr.({});
				store.srdata({});
			} 
				setProgress(null);
		}).catch(()=>setProgress(null));
	}


	const cntrTypeSize = ()=> {

		axios.post("/shipper/selectLineCodeCntrSztp",{params:{'line_code':'WDFC'}},{}).then(res => {
			store.setSr_size_type(res.data);
			//setCntrSztp(res.data);
		});
		
	}

	const codePackage =()=> {
			axios.post("/shipper/selectLineCodeCargoPackType",{params:{'line_code':'WDFC'}},{}).then(res => {
				store.setSr_pack_code(res.data);
				//setPackCodeList(res.data)});	
			});
		}
	
	const onHandleSrDocInit =()=>{
		
		if(store.sr.sr_random) {
			//자동체번
			props.alert(onHandleSrDocNew,'Are you sure?','warning',true,true,'lg','신규로 생성하시겠습니까?',true,true);
		} else {
			// 수동 체번 중복 확인
			if(confirm) {
				props.alert(onHandleSrDocSelf,'Are you sure?','warning',true,true,'lg',"신규 생성한 ["+srNo+"]로 작성하시겠습니까?",true,true); 	 
			} else {
				// 체번 확인 실패 확인 필요 메시지
				props.alert(null,null,'info',true,false,'lg','SR 중복확인 버튼을 통해 확인해주세요.',true,false)
				
			}
		}
	}
	
	const onHandleSrDocNew =()=>{
		srNo=null;
		props.alert(null,null,'info',null,false,'lg',null,false,false);
		if( !props.userData.sr_recipient ) {
			props.alert(null,null,'danger',true,false,'lg',validation.NO_SR_RECIPIENT,true,false);
			return false;
		}
		axios.post("/shipper/getUserSrDocInit",{user_no :props.userData?props.userData.user_no:'',sr_no:null,klnet_id:props.userData?props.userData.klnet_id:'',lineCode:'WDFC'}).then(res => { srNo=res.data.sr_no;
				if(store.sr.sameflag) {
					//setstore.sr.({...res.data,'bkglist':[],noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
					// store.setSr({...res.data,'bkglist':[],noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
					store.setSr({...res.data,'bkglist':[],noti_name1:'',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});				} else {
					//setstore.sr.({...res.data,'bkglist':[]});
					store.setSr({...res.data,'bkglist':[]});
				}
				
			});
	}

	const onHandleSrDocSelf =()=>{
		props.alert(null,null,'info',null,false,'lg',null,false,false);
		if( !props.userData.sr_recipient ) {
			props.alert(null,null,'danger',true,false,'lg',validation.NO_SR_RECIPIENT,true,false);
			return false;
		}
		axios.post("/shipper/getUserSrDocInit",{user_no :props.userData?props.userData.user_no:'',sr_no:srNo,klnet_id:props.userData?props.userData.klnet_id:'',lineCode:'WDFC'}).then(res => {
			setConfirm(false);
			if(store.sr.sameflag) {
				//setstore.sr.({...res.data,'bkglist':[],noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
				store.setSr({...res.data,'bkglist':[],noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
			} else {
				//setstore.sr.({...res.data,'bkglist':[]});
				store.setSr({...res.data,'bkglist':[]});
			}
				
		});
	}
	
	
	const onHandleDupCheck = (sr)=>{
		srNo=sr;
		axios.post("/shipper/getUserNewSrDupCheck",{sr_no:srNo})
		.then(res => {
				if(!res.data) {
					setConfirm(true);
					props.alert(onHandleSrDocSelf,'Are you sure?','warning',true,true,'lg',"["+srNo+"] 신규번호로 작성하시겠습니까?",true,true); 	 
				} else {
					props.alert(null,null,'info',true,false,'lg',"["+srNo+"] 번호는 이미 사용중입니다. 다른번호를 입력 해주세요.",true,false);
				}
		
		});
	}
	
	const onHandleSave =() => {
		// 저장
		if(!store.sr.sr_no) {
			props.alert(null,null,'danger',true,false,'lg',"sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.",true,false);
		} else if( store.sr.status_cus !== 'FA' ) {
			setProgress(<Backdrop className={classes.backdrop} open={true}>
							<CircularProgress color="primary" />
								</Backdrop>);
			axios.post("/shipper/setUserSRDataList",{user_no :props.userData?props.userData.user_no:'',data:store.sr},{}).then(res => {
				if(res.data.code==="S") {
					setProgress(null);
					props.alert(null,null,'success',true,false,'lg',"작성한 데이터가 저장 되었습니다.",true,false);
				}else if(res.data.code==="E") {
					props.alert(null,null,'danger',true,false,'lg',"확정 된 SR 문서는 수정 할 수 없습니다.",true,false);
				}else {
					props.alert(null,null,'success',true,false,'lg',"작성한 데이터가 저장 되었습니다.",true,false);
				}
			});	
		} else {
			props.alert(null,null,'danger',true,false,'lg',"확정 된 SR 문서는 수정 할 수 없습니다.",true,false);
		}
	}
		
	const onHandleSend = () => {
		// 화면 Close ;
		allOpenCloseCard(false);
		if(store.sr.status_cus === 'FA') {
			props.alert(null,null,'danger',true,false,'lg',"BL 확정으로 SR을 전송 하실 수 없습니다.",true,false);
		} else {
			var msg = "작성한 SR ["+store.sr.sr_no+"] 로 전송 하시겠습니까?";
			props.alert(onHandleDocSend,'Are you sure?','warning',true,true,'lg',msg,true,true);
		}
		// 필수값 체크 
		
	}
  
	//필수 체크
	const fncOpenCardInvalid =()=>{ //console.log("필수값 체크");
		var err =0;

		if( validation.fncFeedIdInvalid('booking') ) {// console.log("booking val")
			//setOpenBkgCard(true);
			store.setSr({bkgopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('schedule') ) { 
			//setOpenSchCard(true);
			store.setSr({schopen:true});
			err++;
		}

		if( validation.fncFeedIdInvalid('shipper') ) {
			// setOpenShpCard(true);
			store.setSr({shpopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('consignee') ) { 
			//setOpenConsCard(true);
			store.setSr({consopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('notify') ) {
			//setOpenNotiCard(true);
			store.setSr({notiopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('cargo') ) {
			//setOpenCargoCard(true);
			store.setSr({cargoopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('container') ) {
			//setOpenCntrCard(true);
			store.setSr({cntropen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('c_shipper') ) {
			// setOpenCShpCard(true);
			store.setSr({shpcopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('c_consignee') ) {
			//setOpenCConsCard(true);
			store.setSr({conscopen:true});
			err++;
		}
		if( validation.fncFeedIdInvalid('c_notify') ) {
			//setOpenCNotiCard(true);
			store.setSr({noticopen:true});
			err++;
		}
		
		if( store.sr.hbl_yn ==='N' && validation.fncFeedIdInvalid('declare') ) {
			//setOpenDeclareCard(true);
			store.setSr({desopen:true});
			err++;
		}
		
		
		if (err>0) {
			props.alert(null,null,'danger',true,false,'lg',"필수 입력값 입력 오류",true,false);
			return false;
		} else {
			return true;
		}
	}

	
	const allOpenCloseCard =(flag) => {
		if( !flag ) {
			document.getElementById("btnSend").scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
		setAllOpen(flag);
		store.setSr({bkgopen:flag,
						schopen:flag,
						shpopen:flag,
						consopen:flag,
						notiopen:flag,
						cargoopen:flag,
						cntropen:flag,
						desopen:flag,
						shpcopen:flag,
						conscopen:flag,
						noticopen:flag});
		// setOpenBkgCard(flag);
		// setOpenSchCard(flag);
		// setOpenShpCard(flag);
		// setOpenConsCard(flag);
		// setOpenNotiCard(flag);
		// setOpenCargoCard(flag);
		// setOpenCntrCard(flag);
		//setOpenDeclareCard(flag);
		//setOpenCShpCard(flag);
		//setOpenCConsCard(flag);
		//setOpenCNotiCard(flag);
	}
	
  	const onHandleDocSend =() => {
		// 전송
		props.alert(null,null,'info',null,false,'lg',null,false,false);
	  	if(fncOpenCardInvalid()) {
			//데이터 저장 
			setProgress(<Backdrop className={classes.backdrop} open={true}>
				<CircularProgress color="primary" />
			</Backdrop>);
		  
			axios.post("/shipper/setUserSRDataList",{user_no :params?params.user_no:'',data:store.sr},{}).then(res => {
				if(res.data.code==="E") { 
					props.alert(null,null,'danger',true,false,'lg',res.data.data,true,false);
					return;
				}
		  		axios.post("/shipper/setSendDocSr",{user_no:params?params.user_no:'',klnet_id:props.userData?props.userData.klnet_id:'',data:store.sr,status:'NORMAL'}).then(res => {
					if(res.data === 'success' ) {
						var msg="";
						if(store.sr.part_bl ==='Y') {
						msg = "작성한 SR "+store.sr.sr_no+" (Part B/L) 문서를 전송 하였습니다.";
						} else {
						msg = "작성한 SR "+store.sr.sr_no+" 문서를 전송 하였습니다.";
						}
					setProgress(null);
						props.alert(null,null,'success',true,false,'lg',"작성한 SR "+store.sr.sr_no+" 문서를 전송 하였습니다.",true,false);	
					} else {
						props.alert(null,null,'danger',true,false,'lg',res.data,true,false);
					}  
				}).catch(err => {
						if(err.response.status === 400) {
							const data = err.response.data;
							let message = null;
							if( data.service_code ) {
								//setOtherOpen(true);
								message += data.service_code;
							}
							if( data.vessel_name || data.route) {
							// setSchOpen(true);
								if( data.vessel_name )
									message += "\n"+data.vessel_name;
								if( data.route )
									message += "\n"+data.route;
							}
							if( data.cargo_pack_type ) {
								//setCargoOpen(true);
								message = "\n"+data.cargo_pack_type;
							}
							if( data.vgm ) {
								//setDecOpen(true);
								message += "\n"+data.vgm;
							}
							if( data.declare ) {
								message += "\n"+data.declare;
							}
							if( message ) {
								props.alert(null,null,'danger',true,false,'lg',message,true,false);
							}
				        }
				})
			});
       }
  	}
  
	const onHandleDelete =()=>{
		// 삭제
		allOpenCloseCard(false);
		// 상태 조회
		if('FA' === store.sr.status_cus) {
			props.alert(null,null,'danger',true,false,'lg','BL 확정된  SR문서는 삭제 하실수 없습니다.',true,false);
			return false;
		} else if ('S9' === store.sr.status_cus || 'RA' === store.sr.status_cus) {
			props.alert(null,null,'danger',true,false,'lg','전송 또는 승인 된  SR문서는 삭제 하실수 없습니다.',true,false);
			return false;
		} else {
			//문서 상태 확인
			props.alert(onHandleDeleteSr,'Are you sure?','warning',true,true,'lg','작성한 문서를 삭제하시겠습니까?',true,true);	
		}
	}
	
  const onHandleDeleteSr = () => {
	  	axios.post("/shipper/getUserSrDataList",{user_no :params.user_no?params.user_no:props.userData?props.userData.user_no:'',data:store.sr,link:'N',list:'N'}).then(res =>{
			var status = res.data.status_cus;
			if(store.sr.status_cus !== status) {
				props.alert(null,null,'danger',true,false,'lg','해당 SR문서는 삭제 하실수 없습니다. 다시 조회 후 상태를 확인해 주세요.',true,false);
				return false;
			} else {
				axios.post("/shipper/deleteSrList",{user_no:props.userData?props.userData.user_no:'', data:store.sr}).then(res => { 
					var msg = "작성한 SR ["+store.sr.sr_no+"] 가 삭제되었습니다. SR목록 화면으로 전환 됩니다.";
					props.alert(null,null,'success',true,false,'lg',msg,true,false);
					window.location.href="/svc/srlist";
				});
			}
		});
  	}
  
 /* const onHandleSames=(flag)=>{
	  setSameconsignee(flag);
	  if(!sameconsignee) {
		  store.setSr({...store.sr,noti_name1:'SAME AS CONSIGNEE',noti_name2:'',noti_address1:'',noti_address2:'',noti_address3:'',noti_address4:'',noti_address5:''});
	  }
  }*/
  
	const fncReportViewer = ()=>{
		if( !(store.sr.user_no && store.sr.sr_no && store.sr.sr_date ) ) { 
			props.alert(null,null,'danger',true,false,'lg','SR 먼저 조회 및 작성 해주세요.',true,false);
			return false;
		}

		var obj = new Object();
		obj.user_no = store.sr.user_no;
		obj.sr_no = store.sr.sr_no;
		obj.sr_date = store.sr.sr_date;
		var json = JSON.stringify(obj);

		let form = document.reportForm;
		//form.action = '/reportView';
		// form.action = '/reportViewer';
		form.action = '/shipper/reportViewer';
		form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
		form.file_id.value = 'weidong_sr';
		form.file_path.value = 'WEIDONG';
		form.name.value = 'FILENAME';
		form.connection.value = 'pgsql';
		form.parameters.value = json;
		window.open('', 'popReport', 'width=1050px, height=850px');
		form.submit();
	}
	
	const parkBl = () => {
		if(!store.sr.sr_no) {
			props.alert(null,null,'danger',true,false,'lg','sr_no 는 필수 입력항목 입니다. New 버튼을 통해 신규 번호를 입력 하세요.',true,false);	
			return false;
		}
		
		if(store.sr.part_bl === 'Y') {
			props.alert(null,null,'danger',true,false,'lg','해당 SR 건은 PART B/L 로 분할 할 수 없습니다.',true,false);
			return false;
		}
		
		if(!store.sr.res_bkg_no) {
			props.alert(null,null,'danger',true,false,'lg','Booking No 먼저 선택해주세요.',true,false);
			return false;
		}
		props.alert(onHandleSetPartBl,'Are you sure?','warning',true,true,'lg',"작성한 SR ["+store.sr.sr_no+"] 을 PART B/L로 분할 하시겠습니까?",true,true); 
	}

	const onHandleSetPartBl=()=>{
	
		setProgress(<Backdrop className={classes.backdrop} open={true}>
					<CircularProgress color="primary" />
				</Backdrop>);
		axios.post("/shipper/setUserSrParkBl",{user_no : props.userData?props.userData.user_no:'',data:store.sr}).then(res => {
			store.setSr(res.data);
			allOpenCloseCard(true); 
			setProgress(null);
			props.alert(null,null,'success',true,false,'lg',"작성한 SR의 PART B/L이 분할 되었습니다.",true,false);
		}); 
 	}
	 const onReset = () => {
		store.setSr({
			bookmark_seq:null,
			bookmark_name:null,
			bl_type: null,
			c_cons_address1: null,
			c_cons_address2: null,
			c_cons_address3: null,
			c_cons_address4: null,
			c_cons_address5: null,
			c_cons_name1: null,
			c_cons_name2: null,
			c_consignee_bookmark_name: null,
			c_consignee_bookmark_seq: null,
			c_noti_address1: null,
			c_noti_address2: null,
			c_noti_address3: null,
			c_noti_address4: null,
			c_noti_address5: null,
			c_noti_name1: null,
			c_noti_name2: null,
			c_notify_bookmark_name: null,
			c_notify_bookmark_seq: null,
			c_shipper_bookmark_name: null,
			c_shipper_bookmark_seq: null,
			c_shp_address1: null,
			c_shp_address2: null,
			c_shp_address3: null,
			c_shp_address4: null,
			c_shp_address5: null,
			c_shp_name1: null,
			c_shp_name2: null,
			cargo_bookmark_name: null,
			cargo_bookmark_seq: null,
			cargo_hs_code: null,
			cargo_pack_qty: null,
			cargo_pack_type: null,
			cargo_total_volume: null,
			cargo_total_weight: null,
			cons_address1: null,
			cons_address2: null,
			cons_address3: null,
			cons_address4: null,
			cons_address5: null,
			cons_name1: null,
			cons_name2: null,
			consignee_bookmark_name: null,
			consignee_bookmark_seq: null,
			goodlist:[],
			hbl_yn: null,
			line_address1: null,
			line_address2: null,
			line_address3: null,
			line_address4: null,
			line_address5: null,
			line_bookmark_name: null,
			line_bookmark_seq: null,
			line_name1: null,
			line_name2: null,
			line_payment_type: null,
			line_user_dept: null,
			line_user_email: null,
			line_user_name: null,
			line_user_tel: null,
			marklist: [],
			noti_address1: null,
			noti_address2: null,
			noti_address3: null,
			noti_address4: null,
			noti_address5: null,
			noti_name1: null,
			noti_name2: null,
			sc_no: null,
			sch_barge_onboard_date: null,
			sch_bl_issue_name: null,
			sch_fdp: null,
			sch_fdp_name: null,
			sch_feeder_vessel_name: null,
			sch_feeder_vessel_voyage: null,
			sch_pld: null,
			sch_pld_name: null,
			sch_pod: null,
			sch_pod_name: null,
			sch_pol: null,
			sch_pol_name: null,
			sch_por: null,
			sch_por_name: null,
			sch_vessel_name: null,
			sch_vessel_voyage: null,
			notify_bookmark_name: null,
			notify_bookmark_seq:null,
			other_bookmark_name:null,
			other_bookmark_seq:null,
			schedule_bookmark_name:null,
			schedule_bookmark_seq:null,
			shipper_bookmark_name:null,
			shipper_bookmark_seq:null,
			shp_address1:null,
			shp_address2:null,
			shp_address3:null,
			shp_address4:null,
			shp_address5:null,
			shp_name1:null,
			shp_name2:null,
			trans_service_code:null,
			sr_amount:null,
			sch_eta: null,
			sch_vessel_code:null,
			sch_line_code:null,
			po_no:null,
			part_sr_qty:null,
			org_bl_need_yn:null,
			mark_yn:null,
			mark_desc:null,
			invoice_no: null,
			label: null,
			lc_expiry_date: null,
			lc_no: null,
			lc_yn: null,
			cargo_attached_yn: null,
			cargo_class: null,
			cargo_coastal_yn: null,
			cargo_frozen_temp: null,
			cargo_frozen_temp_unit: null,
			cargo_handling_code: null,
			cargo_handling_frozen: null,
			cargo_item_hs_code: null,
			cargo_temp: null,
			cargo_temp_unit: null,
			cargo_weight: null,
			document_no: null,
			goods_desc: null,
			goods_yn: null,
			cntrlist:[],
			c_cons_user_name:null,
			c_cons_user_tel:null,
			c_cons_country_code:null,
			c_cons_code:null,
			c_noti_user_name:null,
			c_noti_user_tel:null,
			c_noti_country_code:null,
			c_noti_code:null,
			c_shp_user_name:null,
			c_shp_user_tel:null,
			c_shp_country_code:null,
			c_shp_code:null,
			sch_bl_issue_name:null,
			
		});
	}
	  
  	return(
    	<React.Fragment>
    		<form>
    		{progress}
	    		<div style={{paddingLeft:'5%',paddingRight:'5%'}}>
		    	  	<GridItem xs={12} sm={12} style={{textAlign:'right'}}>
						<Button color="info" onClick={()=>onHandleSrDocInit()}>NEW</Button>
						{(!store.sr.part_bl || store.sr.part_bl ==='N')  && store.sr.status_cus === 'S9' && store.sr.sr_no && store.sr.res_bkg_no?
						<Button id="split" color="default" outline type="button" className="mr-1" onClick={parkBl}>SPLIT</Button>:<></>}
						<Button color="info" onClick={()=>fncReportViewer()}>REPORT</Button>
						<Button color="info" onClick={()=>onHandleSave()}>SAVE</Button>
						<Button color="info" onClick={()=>onReset()}>RESET</Button>
						<Button id="btnSend" color="info" onClick={()=>onHandleSend()}>SEND</Button>
						<Button color="info" onClick={()=>onHandleDelete()}>DELETE</Button>
					 </GridItem>
		    	<HeaderCard headerProps={store.sr}  //random={autoSR} 
		    	//onChange={(flag)=>setAutoSR(flag)} 
					onDocNew={(sr)=>onHandleDupCheck(sr)}
					reloadBookmark={()=>onBookmark()}
					//mergeProps={(data)=>setstore.sr.(data)}
					allOpenProps={(flag)=>allOpenCloseCard(flag)} 
		    		{...props} /> 
				<BookingCard 
					//open={openBkgCard} 
					//closeCard={(flag)=>setOpenBkgCard(flag)} 
				    bkgProps={store.sr} 
				    //bookmark={bookmark}
				    //samec={sameconsignee}
				    //confirmList={confirmBkgList} 
				    //mergeProps={(data)=>setstore.sr.({...store.sr.,...data})} 
				    reloadBookmark={()=>onBookmark()}
				    //term={serviceTerm}
				    {...props} 
                />
				<ScheduleCard //open={openSchCard} closeCard={(flag)=>setOpenSchCard(flag)} 
					schProps={store.sr} 
					//bookmark={bookmark} 
					//mergeProps={(data)=>setstore.sr.(data)} 
					reloadBookmark={()=>onBookmark()}
					{...props} />
				<ShipperCard  //open={openShpCard} closeCard={(flag)=>setOpenShpCard(flag)} 
					shpProps={store.sr} 
					//bookmark={bookmark} 
				//mergeProps={(data)=>setstore.sr.(data)} 
				reloadBookmark={()=>onBookmark()} {...props} 
				/>
				<ConsigneeCard //open={openConsCard} closeCard={(flag)=>setOpenConsCard(flag)} 
				consProps={store.sr} 
				//bookmark={bookmark} mergeProps={(data)=>setstore.sr.(data)} 
				    reloadBookmark={()=>onBookmark()}
				    {...props} 
					/>
				<NotifyCard //open={openNotiCard} closeCard={(flag)=>setOpenNotiCard(flag)} 
					notiProps={store.sr} 
					//bookmark={bookmark} 
		    		//mergeProps={(data)=>setstore.sr.(data)}
		    		//same={sameconsignee} onSames={(flag)=>onHandleSames(flag)} 
				    reloadBookmark={()=>onBookmark()}
				    //{...props} 
				/>
				<CargoCard //open={openCargoCard} closeCard={(flag)=>setOpenCargoCard(flag)} 
					cargoProps={store.sr} 
					//bookmark={bookmark} 
					//packCode={packCodeList} 
					//mergeProps={(data)=>setstore.sr.(data)} 
				    reloadBookmark={()=>onBookmark()}
					{...props}/>
				<ContainerCard cntrProps={store.sr.cntrlist} reloadBookmark={()=>onBookmark()}
				    {...props}/>		
				{store.sr.hbl_yn && store.sr.hbl_yn === 'N'?<ExportCard exProps={store.sr.declarelist} reloadBookmark={()=>onBookmark()} {...props} />:<></>}
				<h4 className={classes.cardIconTitle}>CCAM</h4>
		    	<Divider className={classes.divider}/>
		    	<ShipperCard_CCAM  shpCProps={store.sr} reloadBookmark={()=>onBookmark()} {...props}/>
		    	<ConsigneeCard_CCAM consCProps={store.sr} reloadBookmark={()=>onBookmark()} {...props}/>
		    	<NotifyCard_CCAM notiCProps={store.sr} reloadBookmark={()=>onBookmark()} {...props}/>
		    	<ButtonGroup style={{zIndex:'100',position:'fixed',right:'1%',top:'20%'}}
                orientation="vertical"
                aria-label="vertical outlined button group">
                <Button className="mb-1 pt-1 pb-1" id="btnSave"
                    color="white" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        onHandleSave();
                    }}
                    ><span style={{fontSize:'12px'}}>SAVE</span></Button>
                <Button className="mb-1 pt-1 pb-1" 
                    color="white" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        onHandleSend();
                        document.getElementById("btnSend").scrollIntoView({
                            // behavior: "smooth",
                            block: "start",
                            inline: "start",
                            });
                    }}
                    ><span style={{fontSize:'12px'}}>SEND</span></Button>
                <Button className="mb-1 pt-1 pb-1" id="btnOpen"
                    color="white" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        allOpenCloseCard(!allOpen);

                    }}
                    ><span style={{fontSize:'12px'}}>{allOpen?'Close':'Open'}</span></Button>
            </ButtonGroup>
		    	<Navi />
				
	          </div>
          </form>
          <Button id="btnTop" className="mb-1 pt-1 pb-1" style={{zIndex:'100',position:'fixed',right:'1%',top:'86%'}}
	          color="rose" size="sm"
	          //outline
	          type="button" 
	          onClick={(e) => {
	              // e.preventDefault();
	              document.getElementById("btnSend").scrollIntoView({
	              // behavior: "smooth",
	              block: "start",
	              inline: "start",
	              });
	              // document.getElementById("root").scrollTo(0,0)
	          }}
	          >
	          <i className="fa fa-angle-double-up fa-3x" /><br/><span style={{position:'absolute',top:'64%',right:'15%',fontSize:'1px'}}>Top</span>
	      </Button>
          <form id="reportForm" name="reportForm" >
	          <input type="hidden" name="system_id"   value="plismplus" />
	          <input type="hidden" name="user_id"     value="M000008" />
	          <input type="hidden" name="file_type"   value="pdf" />
	          <input type="hidden" name="file_id"     value="" />
	          <input type="hidden" name="file_path"   value="" />
	          <input type="hidden" name="name"        value="" />
	          <input type="hidden" name="connection"  value="pgsql" />
	          <input type="hidden" name="parameters" id="parameters"/>
	      </form>
    </React.Fragment>
  )
  

  function Navi () {
	  return (
			  <nav id="cd-vertical-nav" style={{zIndex:'15'}}>
		      	<ul>
			      <li>
			          <a 
			          data-number="1"
			          //href="#projects"
			          onClick={(e) => {
			              e.preventDefault();
			              //setOtherOpen(!otherOpen);
			              document.getElementById("booking").scrollIntoView(true);
			          }}
			          >
			          <span className="cd-dot" />
			          <span className="cd-label">Booking</span>
			          </a>
			      </li>
			      <li>
			          <a 
			          data-number="2"
			          //href="#projects"
			          onClick={(e) => {
			              e.preventDefault();
			              document.getElementById("schedule").scrollIntoView(true);
			          }}
			          >
			          <span className="cd-dot" />
			          <span className="cd-label">Schedule</span>
			          </a>
			      </li>
			      <li>
				      <a 
				      data-number="3"
				      //href="#projects"
				      onClick={(e) => {
				          e.preventDefault();
				          document.getElementById("shipper").scrollIntoView(true);
				      }}
				      >
				      <span className="cd-dot" />
				      <span className="cd-label">Shipper</span>
				      </a>
			       </li>     
				  <li>
					  <a 
					  data-number="4"
					  //href="#projects"
					  onClick={(e) => {
					      e.preventDefault();
					      document.getElementById("consignee").scrollIntoView(true);
					  }}
					  >
					  <span className="cd-dot" />
					  <span className="cd-label">Consignee</span>
					  </a>
				</li>  
				<li>
				<a 
				data-number="5"
				//href="#projects"
				onClick={(e) => {
				    e.preventDefault();
				    /*document.getElementById("Schedule").scrollIntoView({
				    behavior: "smooth",
				    block: "start",
				    inline: "nearest",
				    });*/
				}}
				>
				<span className="cd-dot" />
				<span className="cd-label">Consignee</span>
				</a>
				</li>  
				<li>
				<a 
				data-number="6"
				//href="#projects"
				onClick={(e) => {
				    e.preventDefault();
				    document.getElementById("notify").scrollIntoView(true);
				}}
				>
				<span className="cd-dot" />
				<span className="cd-label">Notify</span>
				</a>
				</li>  
				<li>
					<a 
					data-number="7"
					//href="#projects"
					onClick={(e) => {
					    e.preventDefault();
					    document.getElementById("cargo").scrollIntoView(true);
					}}
					>
					<span className="cd-dot" />
					<span className="cd-label">Cargo</span>
					</a>
				</li>  
				<li>
					<a 
					data-number="8"
					//href="#projects"
					onClick={(e) => {
					    e.preventDefault();
					   document.getElementById("container").scrollIntoView(true);
					}}
					>
					<span className="cd-dot" />
					<span className="cd-label">Conatiner</span>
					</a>
				</li>  
				{store.sr.hbl_yn && store.sr.hbl_yn === 'N'?<li>
					<a 
						data-number="9"
						//href="#projects"
						onClick={(e) => {
						    e.preventDefault();
						   document.getElementById("declare").scrollIntoView(true);
						}}
						>
						<span className="cd-dot" />
						<span className="cd-label">Declare</span>
						</a>
					</li>:<></>}
		      </ul>
		  </nav>
		  );
  }
      
}
//));
  
export default observer(SR);
import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Collapse, IconButton, Divider, Avatar,Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import CntrBody from './Body/ContainerBody.js';
import DialogBookmark from './Bookmark/Container.js';
import axios from 'axios';
import {LocalShipping, UnfoldLess, UnfoldMore, Bookmarks} from "@material-ui/icons";
import {observer} from 'mobx-react-lite';
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
}));

//export default function ContainerCard(props) {
//const ContainerCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ContainerCard = (observer(({UserStore, ...props}) => {
	
function ContainerCard(props){

	const store =  useSrStore();
	const classes = styles();
	const {cntrProps} = props;
	const [cntrData,setCntrData] = useState([]);
	const [viewBookmark,setViewBookmark] = useState(null);
	const [cntrSztp,setCntrSztp] = useState([]);
	const [packCodeList,setPackCodeList]= useState([]);

	
	useEffect(() => { 
	if(cntrProps && cntrProps.length>0) { 
		setCntrData(cntrProps);
	} else {
		setCntrData([{}]);
	}
	}, [cntrProps]);	

					      
	const mergeCntrProps =(data,key)=> {
		var list = cntrData;
		list[key] = data;
		//props.mergeProps({...cntrProps,cntrlist:list});
		store.setSr({cntrlist:list});
	}
					    
	const onAddCntr = () =>{

		var list = cntrData;
		list.push({container_no:''});					    	
		//props.mergeProps({...cntrProps,cntrlist:list});
		store.setSr({cntrlist:list});
	}
					    
	const onRemoveCntr = (key)=> {

		if(cntrData.length > 1) {
			if(key > -1) {cntrData.splice(key,1);} else {console.log(">>>>",key);} 
			//props.mergeProps({...cntrProps,cntrlist:cntrData});
			store.setSr({cntrlist:cntrData});
		} else {
			/*props.mergeProps({cntrlist:[{cntr_no:'',res_bkg_no:'',cntr_code:'',cntr_truck_no:'',cntr_consolidated_yn:'',cntr_seal:'',cntr_total_weight:'',cntr_total_volume:'',
				cntr_res_bkg_no:'',cntr_auth_user_name:'',cntr_weight:'',cntr_yn:'Y'}]});*/
				store.setSr({cntrlist:[{cntr_no:'',res_bkg_no:'',cntr_code:'',cntr_truck_no:'',cntr_consolidated_yn:'',cntr_seal:'',cntr_total_weight:'',cntr_total_volume:'',
				cntr_res_bkg_no:'',cntr_auth_user_name:'',cntr_weight:'',cntr_yn:'Y'}]});
		}
		
	}

	const fncSelectPortCode =(option)=>{
		if(option) {

			let list;

			list = cntrData;

			let listMerge=list;
			list.map((data,key)=> {
				listMerge[key] = option.cntr_code?{...list[key],'cntr_code':option.cntr_code}:{...list[key],'cntr_code':list[key].cntr_code};
				listMerge[key] = option.cntr_seal?{...list[key],'cntr_seal':option.cntr_seal}:{...list[key],'cntr_seal':list[key].cntr_seal};
				listMerge[key] = option.cntr_consolidated_yn?{...list[key],'cntr_consolidated_yn':option.cntr_consolidated_yn}:{...list[key],'cntr_consolidated_yn':list[key].cntr_consolidated_yn};
				listMerge[key] = option.cntr_res_bkg_no?{...list[key],'cntr_res_bkg_no':option.cntr_res_bkg_no}:{...list[key],'cntr_res_bkg_no':list[key].cntr_res_bkg_no};
				listMerge[key] = option.cntr_truck_no?{...list[key],'cntr_truck_no':option.cntr_truck_no}:{...list[key],'cntr_truck_no':list[key].cntr_truck_no};
				listMerge[key] = option.cntr_total_volume?{...list[key],'cntr_total_volume':option.cntr_total_volume}:{...list[key],'cntr_total_volume':list[key].cntr_total_volume};
				listMerge[key] = option.cntr_total_weight?{...list[key],'cntr_total_weight':option.cntr_total_weight}:{...list[key],'cntr_total_weight':list[key].cntr_total_weight};
				listMerge[key] = option.cntr_weight?{...list[key],'cntr_weight':option.cntr_weight}:{...list[key],'cntr_weight':list[key].cntr_weight};
				listMerge[key] = option.cntr_auth_user_name?{...list[key],'cntr_auth_user_name':option.cntr_auth_user_name}:{...list[key],'cntr_auth_user_name':list[key].cntr_auth_user_name};
				listMerge[key] = option.cntr_carton_qty?{...list[key],'cntr_carton_qty':option.cntr_carton_qty}:{...list[key],'cntr_carton_qty':list[key].cntr_carton_qty};
				listMerge[key] = option.cntr_carton_code?{...list[key],'cntr_carton_code':option.cntr_carton_code}:{...list[key],'cntr_carton_code':list[key].cntr_carton_code};
				listMerge[key] = option.cntr_verifying_type?{...list[key],'cntr_verifying_type':option.cntr_verifying_type}:{...list[key],'cntr_verifying_type':list[key].cntr_verifying_type};
			})
			// props.mergeProps({...cntrProps,container_bookmark_name:option.container_bookmark_name,container_bookmark_seq:option.container_bookmark_seq,cntrlist:list});
			store.setSr({
				cntropen:true,
				container_bookmark_name:option.container_bookmark_name,
				container_bookmark_seq:option.container_bookmark_seq,
				cntrlist:list});
			// props.closeCard(true);

		} else {
			let list;

			list = cntrData;

			let listMerge=list;
			list.map((data,key)=> {
				listMerge[key] = {...list[key],'cntr_code':null};
				listMerge[key] = {...list[key],'cntr_seal':null};
				listMerge[key] = {...list[key],'cntr_consolidated_yn':null};
				listMerge[key] = {...list[key],'cntr_res_bkg_no':null};
				listMerge[key] = {...list[key],'cntr_truck_no':null};
				listMerge[key] = {...list[key],'cntr_total_volume':null};
				listMerge[key] = {...list[key],'cntr_total_weight':null};
				listMerge[key] = {...list[key],'cntr_weight':null};
				listMerge[key] = {...list[key],'cntr_auth_user_name':null};
				listMerge[key] = {...list[key],'cntr_carton_qty':null};
				listMerge[key] = {...list[key],'cntr_carton_code':null};
				listMerge[key] = {...list[key],'cntr_verifying_type':null};
			})
			//props.mergeProps({...cntrProps,container_bookmark_name:'',container_bookmark_seq:''});
			store.setSr({
				container_bookmark_name:null,
				container_bookmark_seq:null,
				cntrlist:list
			});
		}
	}
	
					    

	return (
		<Card className={classes.paper} id="container">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<LocalShipping fontSize="large"/>
					</Avatar>
				}
				action={
					<IconButton onClick={()=>store.setSr({cntropen:!store.sr.cntropen})}>
						{store.sr.cntropen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Container
								<IconButton  onClick={()=>setViewBookmark(<DialogBookmark openBook={true} closeBook={()=>setViewBookmark(null)} cntrCode={store.sr_size_type} packCode={store.sr_pack_code} {...props} />)}>
									<Bookmarks fontSize="default"/>
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.cntrList?store.sr_bookmark.cntrList:[]}
									getOptionLabel = { option => option.container_bookmark_name }
									id="container_bookmark"
									noOptionsText="Bookmark 등록하세요."
									onChange = {(e, option)=>fncSelectPortCode(option,'container_bookmark')}
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="Container Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.cntropen}>
					<Divider className={classes.divider}/>
					{(cntrData.length > 0) && cntrData.map((data,key)=>
						<CntrBody key={"cntrList_"+key} type="M" onAddCntr={()=>onAddCntr()} onRemoveCntr={()=>onRemoveCntr(key)} 
							cntrCode={store.sr_size_type} packCode={store.sr_pack_code} vsl_type={store.sr.vsl_type} mergeCntrProps={(data)=>mergeCntrProps(data,key)} 
							bodyProps={data} {...props} index={key}/>
					)}
				</Collapse>
				{viewBookmark}
			</CardBody>
		</Card>
	);
}
//));

export default observer(ContainerCard);
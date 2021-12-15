import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import DeclareBody from './Body/DeclareBody.js';
import DialogBookmark from './Bookmark/Declare.js';
import { AssignmentInd, UnfoldLess, UnfoldMore, Bookmarks} from "@material-ui/icons";
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

}));

//export default function ExportCard(props) { 
//const ExportCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ExportCard = (observer(({UserStore, ...props}) => {
	
function ExportCard(props) {
	const store =  useSrStore();
	const classes = styles();
	const {exProps} = props;
	const [viewBookmark,setViewBookmark] = React.useState(null);
	const [exportList,setExportList] = useState([]);
	
	useEffect(() => {
		if( exProps && exProps.length >0) {
			setExportList(exProps);
		} else {
			setExportList([{}]);
		}
	}, [exProps]);

	const mergeExportProps =(data,key)=> {
		
		var list = exportList;
		list[key] = data;
		//props.mergeProps({...declareProps,declarelist:list});
		store.setSr({declarelist:list});
		
	}				    
	
	const onAddDeclare = () =>{
		var list = exportList;
		list.push({declare_num:''});					    	
		//props.mergeProps({...declareProps,declarelist:list});
		store.setSr({declarelist:list});
	}
	
	const onRemoveDecalre = (key)=> { 

		if(exportList.length > 0) {
			if(key > -1) {exportList.splice(key,1);} else {console.log(">>>>",key);} 
			//props.mergeProps({...declareProps,declarelist:exportList});
			store.setSr({declarelist:exportList});
		} else {
			//props.mergeProps({...declareProps,declarelist:[{declare_num:''}]});
			store.setSr({declarelist:[{declare_num:''}]});
		}
		
	}
	
	const fncSelectPortCode =(option)=>{
		if(option) {
			let list;

			list = exportList;

			let listMerge=list;
			
			list.map((data,key)=> {
				listMerge[key] = option.declare_num?{...list[key],'declare_num':option.declare_num}:{...list[key],'declare_num':list[key].declare_num};
				listMerge[key] = option.declare_div_load_yn?{...list[key],'declare_div_load_yn':option.declare_div_load_yn}:{...list[key],'declare_div_load_yn':list[key].declare_div_load_yn};
				listMerge[key] = option.declare_pack_set_code?{...list[key],'declare_pack_set_code':option.declare_pack_set_code}:{...list[key],'declare_pack_set_code':list[key].declare_pack_set_code};
				listMerge[key] = option.declare_div_load_no?{...list[key],'declare_div_load_no':option.declare_div_load_no}:{...list[key],'declare_div_load_no':list[key].declare_div_load_no};
				listMerge[key] = option.declare_goods_desc?{...list[key],'declare_goods_desc':option.declare_goods_desc}:{...list[key],'declare_goods_desc':list[key].declare_goods_desc};
				listMerge[key] = option.declare_pack_num?{...list[key],'declare_pack_num':option.declare_pack_num}:{...list[key],'declare_pack_num':list[key].declare_pack_num};
				listMerge[key] = option.declare_pack_type?{...list[key],'declare_pack_type':option.declare_pack_type}:{...list[key],'declare_pack_type':list[key].declare_pack_type};
				listMerge[key] = option.declare_weight?{...list[key],'declare_weight':option.declare_weight}:{...list[key],'declare_weight':list[key].declare_weight};
				listMerge[key] = option.declare_pack_set_num?{...list[key],'declare_pack_set_num':option.declare_pack_set_num}:{...list[key],'declare_pack_set_num':list[key].declare_pack_set_num};
				listMerge[key] = option.declare_pack_set_type?{...list[key],'declare_pack_set_type':option.declare_pack_set_type}:{...list[key],'declare_pack_set_type':list[key].declare_pack_set_type};
				listMerge[key] = option.declare_customs_date?{...list[key],'declare_customs_date':option.declare_customs_date}:{...list[key],'declare_customs_date':list[key].declare_customs_date};
			})		
			//props.mergeProps({...declareProps,declare_bookmark_name:option.declare_bookmark_name,declare_bookmark_seq:option.declare_bookmark_seq,declarelist:list});
			store.setSr({
				desopen:true,
				declare_bookmark_name:option.declare_bookmark_name,
				declare_bookmark_seq:option.declare_bookmark_seq,
				declarelist:list
			});
			//props.closeCard(true);
		} else {
			let list;

			list = exportList;

			let listMerge=list;
			
			list.map((data,key)=> {
				listMerge[key] = {...list[key],'declare_num':null};
				listMerge[key] = {...list[key],'declare_div_load_yn':null};
				listMerge[key] = {...list[key],'declare_pack_set_code':null};
				listMerge[key] = {...list[key],'declare_div_load_no':null};
				listMerge[key] = {...list[key],'declare_goods_desc':null};
				listMerge[key] = {...list[key],'declare_pack_num':null};
				listMerge[key] = {...list[key],'declare_pack_type':null};
				listMerge[key] = {...list[key],'declare_weight':null};
				listMerge[key] = {...list[key],'declare_pack_set_num':null};
				listMerge[key] = {...list[key],'declare_pack_set_type':null};
				listMerge[key] = {...list[key],'declare_customs_date':null};
			})	
			//props.mergeProps({...declareProps,declare_bookmark_name:'',declare_bookmark_seq:''});
			store.setSr({
				declare_bookmark_name:null,
				declare_bookmark_seq:null,
				declarelist:list
			});
		}
	}


	return (
		<Card className={classes.paper} id="declare">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<AssignmentInd fontSize="large"/>
					</Avatar>
				}
				action={
					<IconButton onClick={()=>store.setSr({desopen:!store.sr.desopen})}>
						{store.sr.desopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Export License
								<IconButton  onClick={()=>setViewBookmark(<DialogBookmark openBook={true} packCode={store.sr_pack_code} closeBook={()=>setViewBookmark(null)} {...props} />)}>
									<Bookmarks fontSize="default"/>
								</IconButton>
								</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.decList?store.sr_bookmark.decList:[]}
									getOptionLabel = { option => option.declare_bookmark_name }
									id="declare_bookmark"
									noOptionsText="Bookmark 등록하세요."
									onChange = {(e, option)=>fncSelectPortCode(option,'declare_bookmark')}
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="Export License Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.desopen}>
					<Divider className={classes.divider}/>
						{(exportList.length > 0 ) && exportList.map((data,key)=>
							<DeclareBody key={"export_"+key} type="M" onAddDcr={()=>onAddDeclare()} 
								onRemoveDcr={()=>onRemoveDecalre(key)} mergeDeclareProps={(data)=>mergeExportProps(data,key)} 
								packCode={store.sr_pack_code} bodyProps={data} {...props} index={key}/>
						)}
				</Collapse>
				{viewBookmark}
			</CardBody>
		</Card>
	);
}
//));

export default observer(ExportCard);
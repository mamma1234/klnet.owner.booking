import React from "react";

//import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField,Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import axios from 'axios';
import CargoBody from './Body/CargoBody.js';
import DialogBookmark from './Bookmark/Cargo.js';
import {observer} from 'mobx-react-lite';
import { ViewModule, UnfoldLess, UnfoldMore,Bookmarks} from "@material-ui/icons";
import {useStyles} from 'views/Booking/SR/styles';    
import {useSrStore}  from 'store/srStore.js';	
//export default function CargoCard(props) {
//const CargoCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const CargoCard = (observer(({UserStore, ...props}) => {
function CargoCard(props) {	
	const store =  useSrStore();
	const classes = useStyles();
	//const {open,closeCard,cargoProps,bookmark} = props;
	const [viewBookmark,setViewBookmark] = React.useState(null);
	//const [cargoData,setCargoData] = useState({});

	/*useEffect(() => {
		setCargoData(store.sr);
	}, [store.sr]);*/

	const fncSelectPortCode =(option)=>{
		if(option) { 
			axios.post("/shipper/getUserCargoBookmark",{user_no:props.userData?props.userData.user_no:'',seq:option.cargo_bookmark_seq},{}).then(res => { 
				var list;
				if(res.data.cargo_mark_bookmark_name || res.data.cargo_goods_bookmark_name) {
					list = {...option,...res.data};  						
				} else {
					var init = {cargo_goods_bookmark_name:'',cargo_goods_bookmark_seq:'',cargo_mark_bookmark_name:'',
								cargo_mark_bookmark_seq:'',goods_desc:'',mark_desc:''}
					//props.mergeProps({...cargoData,...init,...option,...res.data});
					list = {...init,...res.data};		
				}
				//props.closeCard(true);
				store.setSr({...list,cargoopen:true});
			});
		} else {
			//props.mergeProps({...cargoData,cargo_bookmark_name:'',cargo_bookmark_seq:''});
			store.setSr({cargo_bookmark_name:'',cargo_bookmark_seq:''});
		}
	}
	const fnc_transGoods = (trans,goods) => { 
		
		let goods_data = goods;
		let returnValue;
			
		if("1" === trans) {
			if(goods) {
				var goodsSplit = goods_data.split('\n');
				if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
					goodsSplit[1] = "SAID TO CONTAIN :";
					goods_data = goodsSplit.join('\n');
				} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "\n";
					goods_data = goodsSplit.join('\n');
				} else {
					goods_data = "\n\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods_data.split('\n');
				goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
				goodsDesc[1] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');					  
			} else {
				returnValue = "SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n";
			}
		} else if("3" === trans) {
			if(goods) {
				var goodsSplit = goods_data.split('\n');
				if("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "SAID TO CONTAIN :";
				} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] ="SAID TO CONTAIN :";
					goodsSplit.splice(1,1);
					goods_data = goodsSplit.join('\n');
				} else {
					goods_data = "\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods_data.split('\n');
				goodsDesc[0] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');					  
			} else {
				returnValue = "SAID TO CONTAIN :\n";
			} 
		}else {
			returnValue = goods;
		}
		  
		return returnValue;
	}
	return (
		<Card className={classes.paper} id="cargo">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<ViewModule fontSize="large"/>
					</Avatar>}
				action={
					<IconButton onClick={()=>store.setSr({cargoopen:!store.sr.cargoopen})}>
						{store.sr.cargoopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Cargo
									<IconButton  onClick={()=>setViewBookmark(<DialogBookmark closeBook={()=>setViewBookmark(null)} {...props} />)}>
										<Bookmarks fontSize="default" />
									</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.cargoList?store.sr_bookmark.cargoList:[]}
									getOptionLabel = { option => option.cargo_bookmark_name }
									id="cargo_bookmark"
									noOptionsText="Bookmark 등록하세요."
									getOptionSelected={(option, value) => option.cargo_bookmark_name === value.cargo_bookmark_name}
									value = {{cargo_bookmark_name:store.sr_bookmark.cargoList && store.sr_bookmark.cargoList.find(v=>v.value === store.sr.cargo_bookmark_seq)
											?store.sr_bookmark.cargoList.find(v=>v.value === store.sr.cargo_bookmark_seq).cargo_bookmark_name:''}}
									onChange = {(e, option)=>fncSelectPortCode(option,'cargo_bookmark')}
									renderInput={
										params =>(<TextField inputProps={{maxLength:30}} {...params} label="Cargo Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.cargoopen}>
					<Divider className={classes.divider}/>
					<CargoBody mergeProps={(data)=>store.setSr(data)} type="M" {...props}/>  	
				</Collapse>
				{viewBookmark} 
			</CardBody>
		</Card>
	);
}
//));

export default observer(CargoCard);
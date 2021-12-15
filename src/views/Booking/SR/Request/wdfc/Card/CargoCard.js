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

	const fncSelectBookmarke =(option)=>{
		if(option) {
			axios.post("/shipper/getUserCargoBookmark",{user_no:props.userData?props.userData.user_no:'',seq:option.cargo_bookmark_seq},{}).then(res => { 
				var cargolist;
				var list;
				cargolist = {
					cargo_attached_yn: res.data.cargo_attached_yn?res.data.cargo_attached_yn:store.sr.cargo_attached_yn,
					cargo_bookmark_name: res.data.cargo_bookmark_name,
					cargo_bookmark_seq: res.data.cargo_bookmark_seq,
					cargo_coastal_yn: res.data.cargo_coastal_yn?res.data.cargo_coastal_yn:store.sr.cargo_coastal_yn,
					cargo_frozen_temp: res.data.cargo_frozen_temp?res.data.cargo_frozen_temp:store.sr.cargo_frozen_temp,
					cargo_frozen_temp_unit: res.data.cargo_frozen_temp_unit?res.data.cargo_frozen_temp_unit:store.sr.cargo_frozen_temp_unit,
					cargo_handling_code: res.data.cargo_handling_code?res.data.cargo_handling_code:store.sr.cargo_handling_code,
					cargo_handling_frozen: res.data.cargo_handling_frozen?res.data.cargo_handling_frozen:store.sr.cargo_handling_frozen,
					cargo_hs_code: res.data.cargo_hs_code?res.data.cargo_hs_code:store.sr.cargo_hs_code,
					cargo_item_hs_code: res.data.cargo_item_hs_code?res.data.cargo_item_hs_code:store.sr.cargo_item_hs_code,
					cargo_pack_qty: res.data.cargo_pack_qty?res.data.cargo_pack_qty:store.sr.cargo_pack_qty,
					cargo_pack_type: res.data.cargo_pack_type?res.data.cargo_pack_type:store.sr.cargo_pack_type,
					cargo_temp: res.data.cargo_temp?res.data.cargo_temp:store.sr.cargo_temp,
					cargo_temp_unit: res.data.cargo_temp_unit?res.data.cargo_temp_unit:store.sr.cargo_temp_unit,
					cargo_total_volume: res.data.cargo_total_volume?res.data.cargo_total_volume:store.sr.cargo_total_volume,
					cargo_total_weight: res.data.cargo_total_weight?res.data.cargo_total_weight:store.sr.cargo_total_weight,
					cargo_weight: res.data.cargo_weight?res.data.cargo_weight:store.sr.cargo_weight,
					goods_yn: res.data.goods_yn?res.data.goods_yn:store.sr.goods_yn,
					mark_yn: res.data.mark_yn?res.data.mark_yn:store.sr.mark_yn,
					value: res.data.value,
					label: res.data.label,
					cargo_mark_bookmark_name:res.data.cargo_mark_bookmark_name,
					cargo_goods_bookmark_name:res.data.cargo_goods_bookmark_name,
					cargo_mark_bookmark_seq:res.data.cargo_mark_bookmark_seq,
					mark_desc:res.data.mark_desc?res.data.mark_desc:store.sr.mark_desc,
					goods_desc:res.data.goods_desc?fnc_transGoods(store.sr.trans_service_code,res.data.goods_desc):fnc_transGoods(store.sr.trans_service_code,store.sr.goods_desc),
					cargo_goods_bookmark_seq: res.data.cargo_goods_bookmark_seq,
				}
				// if(res.data.cargo_mark_bookmark_name || res.data.cargo_goods_bookmark_name) {
				// 	detailList = {
						

				// 	}

				// 	const mergeData = Object.assign(cargolist,detailList);
				// 	const data = Object.assign(option,mergeData)
				// 	list = {...data}; 						
				// } else {

				// 	var init = {cargo_goods_bookmark_name:'',cargo_goods_bookmark_seq:'',cargo_mark_bookmark_name:'',cargo_mark_bookmark_seq:'',goods_desc:fnc_transGoods(store.sr.trans_service_code,null),mark_desc:''}
				// 	//props.mergeProps({...cargoData,...init,...option,...res.data});
				// 	list = {...init,...res.data};		
				// }

				const mergeData = Object.assign(option,cargolist);
				
				//props.closeCard(true);
				store.setSr({...mergeData,cargoopen:true});
			});
		} else {
			//props.mergeProps({...cargoData,cargo_bookmark_name:'',cargo_bookmark_seq:''});
			store.setSr({
				cargo_bookmark_name:null,
				cargo_bookmark_seq:null,
				cargo_attached_yn:null,
				cargo_coastal_yn:null,
				cargo_frozen_temp:null,
				cargo_frozen_temp_unit:null,
				cargo_handling_code:null,
				cargo_handling_frozen:null,
				cargo_hs_code:null,
				cargo_item_hs_code:null,
				cargo_pack_qty:null,
				cargo_pack_type:null,
				cargo_temp:null,
				cargo_temp_unit:null,
				cargo_total_volume:null,
				cargo_total_weight:null,
				cargo_weight:null,
				goods_yn:null,
				mark_yn:null,
				value:null,
				label:null,
				cargo_mark_bookmark_name:null,
				cargo_goods_bookmark_name:null,
				cargo_mark_bookmark_seq:null,
				mark_desc:null,
				goods_desc:fnc_transGoods(store.sr.trans_service_code,''),
				cargo_goods_bookmark_seq:null,
			});
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
					</Avatar>
						}
				action={
					<IconButton onClick={()=>store.setSr({cargoopen:!store.sr.cargoopen})}>
						{store.sr.cargoopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
					}
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
									onChange = {(e, option)=>fncSelectBookmarke(option,'cargo_bookmark')}
									renderInput={
										params =>(<TextField inputProps={{maxLength:30}} {...params} label="Cargo Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
					}
				>
			</CardHeader>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.cargoopen}>
					<Divider className={classes.divider}/>
					<CargoBody type="M" {...props}/>  	
				</Collapse>
				{viewBookmark} 
			</CardBody>
		</Card>
	);
}
//));

export default observer(CargoCard);
import React,{ useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { TableContainer, Table, TableHead, TableRow, TableCell,  TableBody,Dialog, DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import CargoBody from '../Body/CargoBody.js';
import MarkBody from '../Body/MarkBody.js';
import GoodsBody from '../Body/GoodsBody.js';
import Slide from "@material-ui/core/Slide";
import {Close} from "@material-ui/icons";
import NavPills from "components/NavPills/CustomNavPills.js";

import {observer} from 'mobx-react-lite';

const styles = makeStyles((theme) => ({
	  root: {
	    width: '80%',
	  },
	  sr_title: {boxShadow:'unset'	  
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
	  grid: {
		    padding: '0px 10px !important',
	},
	  gridLabel: {
		padding: '0px 10px !important',
	    textAlign:'left',
	    marginTop:'12px',
	  },
	  modalCloseButton:{
		  float:'right',
		  padding:'0',
		  minWidth:'21px',
		  heught:'21px'
	  },
	  modalTitle:{
		  padding:'15px 24px 0 24px',
		  textAlign:'center'
	  },
	  modal:{
		  maxWidth:'80%'
	  },
	  tableLine:{
		  height:'180px',overflow:'auto',borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7',marginBottom:'10px'
	  },
	  tablecell:{
		  paddingTop:'5px',paddingBottom:'5px',textAlign:'start'
	  },
	  tableHeadercell:{
		  paddingTop:'10px',paddingBottom:'10px',textAlign:'start'
	  }

	}));

const Transition = React.forwardRef(function Transition(props, ref) {
	  return <Slide direction="down" ref={ref} {...props} />;
});

//export default function CargoBookmark(props) { 
//const CargoBookmark = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const CargoBookmark = (observer(({UserStore, ...props}) => {
	function CargoBookmark(props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {closeBook} = props; 
	    	const [active, setActive] = React.useState(0);
			//const [openBookmark,setOpenBookmark] = React.useState(false);
			const [bookmarkData,setBookmarkData] = React.useState({});
			
			 useEffect(() => {
				setBookmarkData({'cargo_bookmark_name':store.sr.cargo_bookmark_name,
				'cargo_bookmark_seq':store.sr.cargo_bookmark_seq,
				'cargo_pack_qty':store.sr.cargo_pack_qty,
				'cargo_pack_type':store.sr.cargo_pack_type,
				'cargo_hs_code':store.sr.cargo_hs_code,
				'cargo_total_weight':store.sr.cargo_total_weight,
				'cargo_total_volume':store.sr.cargo_total_volume,
				'mark_desc':store.sr.mark_desc,
				'cargo_mark_bookmark_name':store.sr.cargo_mark_bookmark_name,
				'cargo_mark_bookmark_seq':store.sr.cargo_mark_bookmark_seq,
				'goods_desc':store.sr.goods_desc,
				'cargo_goods_bookmark_name':store.sr.cargo_goods_bookmark_name,
				'cargo_goods_bookmark_seq':store.sr.cargo_goods_bookmark_seq}); 
			 }, []);
			
		    const onInitData = () => {
				  setBookmarkData({'cargo_bookmark_name':'','cargo_bookmark_seq':'','cargo_pack_qty':'','cargo_pack_type':'','cargo_hs_code':'',
                      'cargo_total_weight':'','cargo_total_volume':'','mark_desc':'','cargo_mark_bookmark_name':'','cargo_mark_bookmark_seq':'',
                      'goods_desc':'','cargo_goods_bookmark_name':'','cargo_goods_bookmark_seq':''}); 
				}
			  
			  const onSaveBookmark =()=> { 
				  if(active === 0 ){
					if(bookmarkData && bookmarkData.cargo_bookmark_name !==null && bookmarkData.cargo_bookmark_name !=="") {
						axios.post("/shipper/setUserCargoBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {
					  	  	if(bookmarkData.cargo_bookmark_seq) {
					  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 수정되었습니다.",true,false);
					  	  	} else {
					  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 저장되었습니다.",true,false);
					  	  	}
					  	    props.reloadBookmark();
				  	  	});
					} else {
						props.alert(null,null,'danger',true,false,'lg',"필수 입력값을 확인해 주세요.",true,false);
					}
				  } else if(active === 1) {
					  if(bookmarkData && bookmarkData.cargo_mark_bookmark_name !==null && bookmarkData.cargo_mark_bookmark_name !=="") {
							axios.post("/shipper/setUserMarkBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
					  	  	.then(res => {
						  	  	if(bookmarkData.cargo_mark_bookmark_seq) {
						  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 수정되었습니다.",true,false);
						  	  	} else {
						  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 저장되었습니다.",true,false);
						  	  	}
						  	    props.reloadBookmark();
					  	  	});
						} else {
							props.alert(null,null,'danger',true,false,'lg',"필수 입력값을 확인해 주세요.",true,false);
						}
				  } else {
					  if(bookmarkData && bookmarkData.cargo_goods_bookmark_name !==null && bookmarkData.cargo_goods_bookmark_name !=="") {
							axios.post("/shipper/setUserGoodsBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
					  	  	.then(res => {
						  	  	if(bookmarkData.cargo_goods_bookmark_seq) {
						  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 수정되었습니다.",true,false);
						  	  	} else {
						  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 저장되었습니다.",true,false);
						  	  	}
						  	    props.reloadBookmark();
					  	  	});
						} else {
							props.alert(null,null,'danger',true,false,'lg',"필수 입력값을 확인해 주세요.",true,false);
						}
				  }
			  }
			  
			  const onBookMarkDelete = () => {
				  if(active === 0 ){
					  if(bookmarkData && (!bookmarkData.cargo_bookmark_name || bookmarkData.cargo_bookmark_name ==="")) {
						  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
						 
					  } else {
						axios.post("/shipper/setUserCargoBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {onInitData();
						  	  	props.reloadBookmark();
				  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
				  	  	});
					  }
				  } else if(active === 1 ) {
					  if(bookmarkData && (!bookmarkData.cargo_mark_bookmark_name || bookmarkData.cargo_mark_bookmark_name ==="")) {
						  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
						 
					  } else {
						axios.post("/shipper/setUserMarkBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {onInitData();
						  	  	props.reloadBookmark();
				  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
				  	  	});
					  }
				  } else {
					  if(bookmarkData && (!bookmarkData.cargo_goods_bookmark_name || bookmarkData.cargo_goods_bookmark_name ==="")) {
						  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
						 
					  } else {
						axios.post("/shipper/setUserGoodsBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {onInitData();
						  	  	props.reloadBookmark();
				  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
				  	  	});
					  }
				  }
					
				}
			  
		/*	const handleBookmarkChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
				  setBookmarkData({...bookmarkData, [prop]:event.target.value});
			}
			  

			const openBookmarkDig = ()=> {
				  onInitData();
				  setOpenBookmark(!openBookmark);
			}*/
			  //cargo bookmark select
			const fncOnClickData = (row) => { 
				  
				  axios.post("/shipper/getUserCargoRelation",{user_no:props.userData?props.userData.user_no:'',seq:row.cargo_bookmark_seq},{})								
			  	  	.then(res => { 
				  	                if(res.data.cargo_mark_bookmark_name || res.data.cargo_goods_bookmark_name) {
				  	                	setBookmarkData({...bookmarkData,...row,...res.data});
				  	                } else {
				  	                	var init = {cargo_goods_bookmark_name:'',cargo_goods_bookmark_seq:'',cargo_mark_bookmark_name:'',
				  	                			    cargo_mark_bookmark_seq:'',goods_desc:'',mark_desc:''}
				  	                	setBookmarkData({...bookmarkData,...row,...init});
				  	                }	    
			  	  	});
			  
				 
			}
			//mark bookmark select			  
			const onChangeMark =(value)=> {
		  		axios.post("/shipper/getUserMarkBookmark",{user_no:props.userData?props.userData.user_no:'',seq:value},{})								
		  	 	.then(res =>setBookmarkData({...bookmarkData, ...res.data[0]}));
			}
			 //goods bookmark select
			const onChangeGoods =(value)=> {
				axios.post("/shipper/getUserGoodsBookmark",{user_no:props.userData?props.userData.user_no:'',seq:value},{})								
		  		.then(res =>setBookmarkData({...bookmarkData, ...res.data[0]}));
		    }
			    
			const onChangeTabs=(tabs) =>{
				setActive(tabs);
				onInitData();
			}

			return (
		            <Dialog
			          classes={{paper: classes.modal}}
			          open={true}
			          TransitionComponent={Transition}
			          keepMounted
			          onClose={()=>closeBook()}
			          aria-labelledby="classic-modal-slide-title"
			          aria-describedby="classic-modal-slide-description"
			        >
			          <DialogTitle
			            id="classic-modal-slide-title"
			            disableTypography
			            className={classes.modalHeader}
			          >
			            <Button
			              justIcon
			              className={classes.modalCloseButton}
			              key="close"
			              aria-label="Close"
			              color="transparent"
			            	  size="sm"
			              onClick={()=>closeBook()}
			            >
			              <Close className={classes.modalClose} />
			            </Button>
			            <h4 className={classes.modalTitle}>Cargo Bookmark</h4>
			          </DialogTitle>
			          <DialogContent
			            id="classic-modal-slide-description"
			            className={classes.modalBody}
			          >
			          <NavPills style={{marginTop:'0'}}
		                color="info"
		                onChange={(active)=>onChangeTabs(active)}
			            active = {active}
		                tabs={[
		                  {
		                    tabButton: "Cargo",
		                    tabContent: (
		                    	<div style={{overflow:'hidden'}}>
		                        <TableContainer className={classes.tableLine}>
		   			              <Table 	
		   			                stickyHeader aria-label="sticky table"
		   			                //className={classes.table}
		   			                aria-labelledby="tableTitle"
		   			                size='medium'>
		   			                <TableHead>
		   			                  <TableRow>
		   			                    <TableCell style={{width: '5%'}}  className={classes.tableHeadercell}>No.</TableCell>
		   			                    <TableCell style={{width: '25%'}} className={classes.tableHeadercell}>Bookmark</TableCell>
		   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Hs Code</TableCell>
		   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>volumn</TableCell>
		   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>weight</TableCell>
		   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>mark_link</TableCell>
		   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>goods_link</TableCell>
		   			                  </TableRow>
		   			                </TableHead>
		   			                <TableBody>
		   			             {store.sr_bookmark.cargoList?store.sr_bookmark.cargoList.map((row,index) => (
		   			                      <TableRow key={index}
		   			                        className={classes.root}
		   			                        hover
		   			                        onClick={()=>fncOnClickData(row)}
		   			                        selected = { bookmarkData.cargo_bookmark_seq === row.cargo_bookmark_seq }
		   					                classes = {{ hover: classes.hover, selected: classes.selected }}
		   			                      >
		   			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
		   			                        <TableCell align="center" className={classes.tablecell}>{row.cargo_bookmark_name}</TableCell>
		   			                        <TableCell align="center" className={classes.tablecell}>{row.cargo_hs_code}</TableCell>
		   			                        <TableCell align="center" className={classes.tablecell}>{row.cargo_total_volume}</TableCell>
		   			                        <TableCell align="center" className={classes.tablecell}>{row.cargo_total_weight}</TableCell>
		   			                        <TableCell align="center" className={classes.tablecell}>{row.mark_yn}</TableCell>
		   			                        <TableCell align="center" className={classes.tablecell}>{row.goods_yn}</TableCell>
		   			                      </TableRow>
		   			                    )):
		   			                    	<TableRow className={classes.root}hover>
		   	                     				<TableCell colSpan={5} align="center" className={classes.tablecell}>No Data</TableCell>
		   	                     			</TableRow>
		   	                           }
		   			                </TableBody>
		   			              </Table>
		   			            </TableContainer>
					            <CargoBody type="B" mergeCargoProps={(data)=>setBookmarkData(data)} bodyProps={bookmarkData} {...props}/> 
					            </div>
		                    )
		                  },
		                  {
		                    tabButton: "Mark",
		                    tabContent: (
		                    		<div style={{overflow:'hidden'}}>
			                        <TableContainer className={classes.tableLine}>
			   			              <Table 	
			   			                stickyHeader aria-label="sticky table"
			   			                //className={classes.table}
			   			                aria-labelledby="tableTitle"
			   			                size='medium'>
			   			                <TableHead>
			   			                  <TableRow>
			   			                    <TableCell style={{width: '5%'}}  className={classes.tableHeadercell}>No.</TableCell>
			   			                    <TableCell style={{width: '25%'}} className={classes.tableHeadercell}>Bookmark</TableCell>
			   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Mark_desc</TableCell>
			   			                  </TableRow>
			   			                </TableHead>
			   			                <TableBody>
			   			             {store.sr_bookmark.markList?store.sr_bookmark.markList.map((row,index) => (
			   			                      <TableRow key={index}
			   			                        className={classes.root}
			   			                        hover
			   			                        onClick={()=>onChangeMark(row.cargo_mark_bookmark_seq)}
			   			                        selected = { bookmarkData.cargo_mark_bookmark_seq === row.cargo_mark_bookmark_seq }
			   					                classes = {{ hover: classes.hover, selected: classes.selected }}
			   			                      >
			   			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
			   			                        <TableCell align="center" className={classes.tablecell}>{row.cargo_mark_bookmark_name}</TableCell>
			   			                        <TableCell align="center" className={classes.tablecell}>{row.mark_desc1}</TableCell>
			   			                      </TableRow>
			   			                    )):
			   			                    	<TableRow className={classes.root}hover>
			   	                     				<TableCell colSpan={5} align="center" className={classes.tablecell}>No Data</TableCell>
			   	                     			</TableRow>
			   	                           }
			   			                </TableBody>
			   			              </Table>
			   			            </TableContainer>
						            <MarkBody type="B" mergeCargoProps={(data)=>setBookmarkData(data)} bodyProps={bookmarkData} {...props}/> 
						            </div>
		                    )
		                  },
		                  {
		                    tabButton: "Cargo&Des",
		                    tabContent: (
		                    		<div style={{overflow:'hidden'}}>
			                        <TableContainer className={classes.tableLine}>
			   			              <Table 	
			   			                stickyHeader aria-label="sticky table"
			   			                //className={classes.table}
			   			                aria-labelledby="tableTitle"
			   			                size='medium'>
			   			                <TableHead>
			   			                  <TableRow>
			   			                    <TableCell style={{width: '5%'}}  className={classes.tableHeadercell}>No.</TableCell>
			   			                    <TableCell style={{width: '25%'}} className={classes.tableHeadercell}>Bookmark</TableCell>
			   			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Description</TableCell>
			   			                  </TableRow>
			   			                </TableHead>
			   			                <TableBody>
			   			             {store.sr_bookmark.goodsList?store.sr_bookmark.goodsList.map((row,index) => (
			   			                      <TableRow key={index}
			   			                        className={classes.root}
			   			                        hover
			   			                        onClick={()=>onChangeGoods(row.cargo_goods_bookmark_seq)}
			   			                        selected = { bookmarkData.cargo_goods_bookmark_seq === row.cargo_goods_bookmark_seq }
			   					                classes = {{ hover: classes.hover, selected: classes.selected }}
			   			                      >
			   			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
			   			                        <TableCell align="center" className={classes.tablecell}>{row.cargo_goods_bookmark_name}</TableCell>
			   			                        <TableCell align="center" className={classes.tablecell}>{row.goods_desc1}</TableCell>
			   			                      </TableRow>
			   			                    )):
			   			                    	<TableRow className={classes.root}hover>
			   	                     				<TableCell colSpan={5} align="center" className={classes.tablecell}>No Data</TableCell>
			   	                     			</TableRow>
			   	                           }
			   			                </TableBody>
			   			              </Table>
			   			            </TableContainer>
						            <GoodsBody type="B" mergeCargoProps={(data)=>setBookmarkData(data)} bodyProps={bookmarkData} {...props}/> 
						            </div>
		                    )
		                  }
		                ]}
		              />

			         

			          </DialogContent>
			          <DialogActions className={classes.modalFooter}>
			          <Button color="info" onClick={(e)=>onInitData()}
			          	  >NEW</Button>
			            <Button color="info" onClick={(e)=>onSaveBookmark()}
			          	  >SAVE</Button>
			            <Button color="info" onClick={(e)=>onBookMarkDelete()}
			          	  >DELETE</Button>
			          </DialogActions>
			        </Dialog>
			);
		}
//));

export default observer(CargoBookmark);
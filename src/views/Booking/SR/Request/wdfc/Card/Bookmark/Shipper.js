import React,{ useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { TableContainer, Table, TableHead, TableRow,  TableCell, TableBody, Dialog,DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import ShipperBody from '../Body/ShipperBody.js';
import Slide from "@material-ui/core/Slide";
import {Close} from "@material-ui/icons";
import {observer} from 'mobx-react-lite';
const styles = makeStyles((theme) => ({
	  root: {
	    width: '80%',
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

//export default function ShipperBookmark(props) { 
//const ShipperBookmark = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ShipperBookmark = (observer(({UserStore, ...props}) => {
	function ShipperBookmark (props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {closeBook,type} = props; 

			//const [openBookmark,setOpenBookmark] = React.useState(false);
			const [bookmarkData,setBookmarkData] = React.useState({});
			
			 useEffect(() => {
				setBookmarkData({'shipper_bookmark_seq':store.sr.shipper_bookmark_seq,
								'shipper_bookmark_name':store.sr.shipper_bookmark_name,
								'shp_code':store.sr.shp_code,
								'shp_name1':store.sr.shp_name1,
				'shp_name2':store.sr.shp_name2,
				'shp_address1':store.sr.shp_address1,
				'shp_address2':store.sr.shp_address2,
				'shp_address3':store.sr.shp_address3,
				'shp_address4':store.sr.shp_address4,
				'shp_address5':store.sr.shp_address5,
				'shp_user_name':store.sr.shp_user_name,
				'shp_user_tel':store.sr.shp_user_tel,
				'shp_user_fax':store.sr.shp_user_fax,
				'shp_user_dep1':store.sr.shp_user_dep1,
				'shp_user_email':store.sr.shp_user_email}); 
			 }, []);
			
		    const onInitData = () => {
				  setBookmarkData({'shipper_bookmark_seq':'','shipper_bookmark_name':'','shp_code':'','shp_name1':'',
						'shp_name2':'',
						'shp_address1':'',
						'shp_address2':'',
						'shp_address3':'',
						'shp_address4':'',
						'shp_address5':'',
						'shp_user_name':'',
						'shp_user_tel':'',
						'shp_user_fax':'',
						'shp_user_dep1':'',
						'shp_user_email':''}); 
				}
			  
			  const onSaveBookmark =()=> {

					if(bookmarkData && bookmarkData.shipper_bookmark_name !==null && bookmarkData.shipper_bookmark_name !=="") {
						axios.post("/shipper/setUserShpBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {
					  	  	if(bookmarkData.shipper_bookmark_seq) {
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
			  
			  const onBookMarkDelete = () => {
				  if(bookmarkData && (!bookmarkData.shipper_bookmark_name || bookmarkData.shipper_bookmark_name ==="")) {
					  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
					 
				  } else {
					axios.post("/shipper/setUserShpBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
			  	  	.then(res => {onInitData();
					  	  	props.reloadBookmark();
			  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
			  	  	});
				  }
					
				}
			  
			/*  const handleBookmarkChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
				  setBookmarkData({...bookmarkData, [prop]:event.target.value});
			  }*/
			  
			  const fncOnClickData = (row) => {
				  setBookmarkData(row);
			  }
			  
			/*  const openBookmarkDig = ()=> {
				  onInitData();
				  setOpenBookmark(!openBookmark);
			  }*/
			  
			  const mergeShpProps = (data) => {
				  setBookmarkData(data);
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
			            <h4 className={classes.modalTitle}>Shipper Bookmark</h4>
			          </DialogTitle>
			          <DialogContent
			            id="classic-modal-slide-description"
			            className={classes.modalBody}
			          >

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
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Name</TableCell>
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>address</TableCell>
			                  </TableRow>
			                </TableHead>
			                <TableBody>
			             {store.sr_bookmark.shipperList?store.sr_bookmark.shipperList.map((row,index) => (
			                      <TableRow key={index}
			                        className={classes.root}
			                        hover
			                        onClick={(e)=>fncOnClickData(row)}
			                        selected = { bookmarkData.shipper_bookmark_seq === row.shipper_bookmark_seq }
					                classes = {{ hover: classes.hover, selected: classes.selected }}
			                      >
			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.shipper_bookmark_name}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.shp_name1}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.shp_address1}</TableCell>
			                      </TableRow>
			                    )):
			                    	<TableRow className={classes.root}hover>
	                     				<TableCell colSpan={4} align="center" className={classes.tablecell}>No Data</TableCell>
	                     			</TableRow>
	                           }
			                </TableBody>
			              </Table>
			            </TableContainer>
			            <div style={{margin:'0 10px'}}>
			            <ShipperBody type={type} mergeShpProps={(data)=>mergeShpProps(data)} bodyProps={bookmarkData} {...props}/> 
			            </div>
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

export default observer(ShipperBookmark);
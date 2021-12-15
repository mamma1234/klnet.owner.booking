import React,{ useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Dialog,DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import BookingBody from '../Body/BookingBody.js';
import Slide from "@material-ui/core/Slide";
import {Close} from "@material-ui/icons";
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

//export default function BookingBookmark(props) { 
//const BookingBookmark = inject('UserStore')(observer(({ UserStore, ...props }) => { console.log(">>>>>>props11:",props);
//const BookingBookmark = (observer(({UserStore, ...props}) => {
function BookingBookmark(props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {closeBook} = props; 
			const [bookmarkData,setBookmarkData] = React.useState({});
			
			 useEffect(() => {
				setBookmarkData({	other_bookmark_name:store.sr.other_bookmark_name,
									other_bookmark_seq:store.sr.other_bookmark_seq,sc_no:store.sr.sc_no,
									trans_service_code:store.sr.trans_service_code,
									bl_type:store.sr.bl_type,
									line_payment_type:store.sr.line_payment_type,
									hbl_yn:store.sr.hbl_yn}); 
			 }, []);
			
		    const onInitData = () => {
				  setBookmarkData({	other_bookmark_name:'',
				  					other_bookmark_seq:'',
				  					sc_no:'',
				  				  	trans_service_code:'',
									bl_type:'',
									line_payment_type:'',
									hbl_yn:''}); 
			}
			  
			const onSaveBookmark =()=> {

					if(bookmarkData && bookmarkData.other_bookmark_name !==null && bookmarkData.other_bookmark_name !=="") {
						axios.post("/shipper/setUserOthersBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {
					  	  	if(bookmarkData.other_bookmark_seq) {
					  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 수정되었습니다.",true,false);
					  	  	} else {
					  	  	    onInitData();
					  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 저장되었습니다.",true,false);
					  	  	}
					  	    props.reloadBookmark();
				  	  	});
					} else {
						props.alert(null,null,'danger',true,false,'lg',"필수 입력값을 확인해 주세요.",true,false);
					}
			}
			  
			const onBookMarkDelete = () => {
				  if(bookmarkData && (!bookmarkData.other_bookmark_name || bookmarkData.other_bookmark_name ==="")) {
					  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false); 
				  } else {
					axios.post("/shipper/setUserOtherBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
			  	  	.then(res => {onInitData();
					  	  	props.reloadBookmark();
			  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
			  	  	});
				  }
					
			}
			// 북마크 선택 하여 데이터 셋팅
			const fncOnClickData = (row) => {
				  setBookmarkData(row);
			}
			// 바디 데이터 셋 
			const setBookmark = (data) => {
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
			            <h4 className={classes.modalTitle}>Booking Bookmark</h4>
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
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>SC Number</TableCell>
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Term</TableCell>
			                    <TableCell style={{width: '50%'}} className={classes.tableHeadercell}>H B/L</TableCell>
			                  </TableRow>
			                </TableHead>
			                <TableBody>
			             {store.sr_bookmark.bookingList?store.sr_bookmark.bookingList.map((row,index) => (
			                      <TableRow key={index}
			                        className={classes.root}
			                        hover
			                        onClick={(e)=>fncOnClickData(row)}
			                        selected = { bookmarkData.other_bookmark_seq === row.other_bookmark_seq }
					                classes = {{ hover: classes.hover, selected: classes.selected }}
			                      >
			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.other_bookmark_name}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.sc_no}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.trans_service_code==="1"?"CY->CY":row.trans_service_code==="3"?"CFS->CY":""}</TableCell>
			                        <TableCell align="left" className={classes.tablecell}>{row.hbl_yn}</TableCell>
			                      </TableRow>
			                    )):
			                    	<TableRow className={classes.root}hover>
	                     				<TableCell colSpan={5} align="center" className={classes.tablecell}>No Data</TableCell>
	                     			</TableRow>
	                           }
			                </TableBody>
			              </Table>
			            </TableContainer>
			            <div style={{margin:'0 10px'}}>
			            	<BookingBody type="B" mergeBkgProps={(data)=>setBookmark(data)} bodyProps={bookmarkData} {...props}/>
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
export default observer(BookingBookmark);
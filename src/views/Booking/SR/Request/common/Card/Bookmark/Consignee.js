import React,{ useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Dialog, DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import ConsigneeBody from '../Body/ConsigneeBody.js';
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

//export default function ConsigneeBookmark(props) { 
//const ConsigneeBookmark = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ConsigneeBookmark = (observer(({UserStore, ...props}) => {
	function ConsigneeBookmark(props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {closeBook,type} = props; 

			//const [openBookmark,setOpenBookmark] = React.useState(false);
			const [bookmarkData,setBookmarkData] = React.useState({});
			
			 useEffect(() => {
				setBookmarkData({'consingee_bookmark_seq':store.sr.consingee_bookmark_seq,
				'consingee_bookmark_name':store.sr.consignee_bookmark_name,
				'cons_code':store.sr.cons_code,
				'cons_name1':store.sr.cons_name1,
				'cons_name2':store.sr.cons_name2,
				'cons_address1':store.sr.cons_address1,
				'cons_address2':store.sr.cons_address2,
				'cons_address3':store.sr.cons_address3,
				'cons_address4':store.sr.cons_address4,
				'cons_address5':store.sr.cons_address5,
				'cons_user_name':store.sr.cons_user_name,
				'cons_user_tel':store.sr.cons_user_tel,
				'cons_user_fax':store.sr.cons_user_fax,
				'cons_user_dep1':store.sr.cons_user_dep1,
				'cons_user_email':store.sr.cons_user_email}); 
			 }, []);
			
		    const onInitData = () => {
				  setBookmarkData({'consingee_bookmark_seq':'','consingee_bookmark_name':'','cons_code':'','cons_name1':'',
						'cons_name2':'',
						'cons_address1':'',
						'cons_address2':'',
						'cons_address3':'',
						'cons_address4':'',
						'cons_address5':'',
						'cons_user_name':'',
						'cons_user_tel':'',
						'cons_user_fax':'',
						'cons_user_dep1':'',
						'cons_user_email':''}); 
				}
			  
			  const onSaveBookmark =()=> {

					if(bookmarkData && bookmarkData.consignee_bookmark_name !==null && bookmarkData.consignee_bookmark_name !=="") {
						axios.post("/shipper/setUserConsBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {
					  	  	if(bookmarkData.consignee_bookmark_seq) {
					  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 수정되었습니다.",true,false);
					  	  	} else {
					  	  		props.reloadBookmark();
					  	  		props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 저장되었습니다.",true,false);
					  	  	}
				  	  	});
					} else {
						props.alert(null,null,'danger',true,false,'lg',"필수 입력값을 확인해 주세요.",true,false);
					}
			  }
			  
			  const onBookMarkDelete = () => {
				  if(bookmarkData && (!bookmarkData.consignee_bookmark_name || bookmarkData.consignee_bookmark_name ==="")) {
					  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
					 
				  } else {
					axios.post("/shipper/setUserConsBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
			  	  	.then(res => {onInitData();
					  	  	props.reloadBookmark();
			  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
			  	  	});
				  }
					
				}

			  const fncOnClickData = (row) => { 
				  setBookmarkData(row);
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
			            <h4 className={classes.modalTitle}>Consignee Bookmark</h4>
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
			             {store.sr_bookmark.consList?store.sr_bookmark.consList.map((row,index) => (
			                      <TableRow key={index}
			                        className={classes.root}
			                        hover
			                        onClick={(e)=>fncOnClickData(row)}
			                        selected = { bookmarkData.consignee_bookmark_seq === row.consignee_bookmark_seq }
					                classes = {{ hover: classes.hover, selected: classes.selected }}
			                      >
			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.consignee_bookmark_name}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.cons_name1}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.cons_address1}</TableCell>
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
			            <ConsigneeBody type={type} mergeConsProps={(data)=>setBookmarkData(data)} bodyProps={bookmarkData} {...props}/>
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
export default observer(ConsigneeBookmark);
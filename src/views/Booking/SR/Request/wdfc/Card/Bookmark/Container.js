import React,{ useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl, Select, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Dialog, InputAdornment ,DialogTitle,DialogContent,DialogActions,TextField} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import axios from 'axios';
import {Autocomplete} from "@material-ui/lab"; 
import Slide from "@material-ui/core/Slide";
import { Close} from "@material-ui/icons";
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

//export default function ContainerBookmark(props) { 
//const ContainerBookmark = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ContainerBookmark = (observer(({UserStore, ...props}) => {
	function ContainerBookmark(props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {closeBook} = props; 

			const [openBookmark,setOpenBookmark] = React.useState(false);
			const [bookmarkData,setBookmarkData] = React.useState({});
			
			 useEffect(() => {
			    	onInitData();
			 }, []);
			
		    const onInitData = () => {
				  setBookmarkData({'cntr_no':'','res_bkg_no':'','cntr_code':'','cntr_truck_no':'','cntr_consolidated_yn':'','cntr_seal':'','cntr_total_weight':'','cntr_total_volume':'','cntr_auth_user_name':'','cntr_weight':''}); 
				}
			  
			  const onSaveBookmark =()=> {

					if(bookmarkData && bookmarkData.container_bookmark_name !==null && bookmarkData.container_bookmark_name !=="") {
						axios.post("/shipper/setUserCntrBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {
					  	  	if(bookmarkData.container_bookmark_seq) {
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
				  if(bookmarkData && (!bookmarkData.container_bookmark_name || bookmarkData.container_bookmark_name ==="")) {
					  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
					 
				  } else {
					axios.post("/shipper/setUserCntrBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
			  	  	.then(res => {onInitData();
					  	  	props.reloadBookmark();
			  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
			  	  	});
				  }
					
				}
			  
			  const handleBookmarkChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
				  setBookmarkData({...bookmarkData, [prop]:event.target.value});
			  }
			  
			  const fncOnClickData = (row) => {
				  setBookmarkData(row);
			  }
			  
			  const openBookmarkDig = ()=> {
				  onInitData();
				  setOpenBookmark(!openBookmark);
			  }
			  
			  const mergeShpProps = (data) => {
				  setBookmarkData(data);
			  }
			  
			  const verifyType =[{value:'SM1',label:'방법1'},{value:'SM2',label:'방법2'}];

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
			            <h4 className={classes.modalTitle}>Container Bookmark</h4>
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
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Size</TableCell>
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Seal No</TableCell>
			                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Weight</TableCell>
			                  </TableRow>
			                </TableHead>
			                <TableBody>
			             {store.sr_bookmark.cntrList?store.sr_bookmark.cntrList.map((row,index) => (
			                      <TableRow key={index}
			                        className={classes.root}
			                        hover
			                        onClick={(e)=>fncOnClickData(row)}
			                        selected = { bookmarkData.container_bookmark_seq === row.container_bookmark_seq }
					                classes = {{ hover: classes.hover, selected: classes.selected }}
			                      >
			                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.container_bookmark_name}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.cntr_code}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.cntr_seal}</TableCell>
			                        <TableCell align="center" className={classes.tablecell}>{row.cntr_weight}</TableCell>
			                      </TableRow>
			                    )):
			                    	<TableRow className={classes.root}hover>
	                     				<TableCell colSpan="4" align="center" className={classes.tablecell}>No Data</TableCell>
	                     			</TableRow>
	                           }
			                </TableBody>
			              </Table>
			            </TableContainer>
			            <div style={{margin:'0 10px'}}>
			            <GridItem lg={12} md={12} sm={12} xs={12}>
            			<GridContainer>
	            			<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                  <CustomInput
					                        validtype="text"
						                    required={true}
						                    feedback="container_b"
							                labelText=""
							                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:bookmarkData.container_bookmark_name?bookmarkData.container_bookmark_name:'',
								           onChange: handleBookmarkChange('container_bookmark_name'),
								      //     onBlur: (e)=>e.target.value?props.mergeCntrProps(bookmarkData):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem> 
			            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Seal No</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                  <CustomInput
					                        validtype="text"
						                    required={false}
						                    feedback="container_b"
							                labelText=""
							                maxLength="35"
						                id="cntr_seal"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:bookmarkData.cntr_seal?bookmarkData.cntr_seal:'',
								           onChange: handleBookmarkChange('cntr_seal'),
								         //  onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem> 

			            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Size/Type</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                    <Autocomplete
							              options = {props.cntrCode?props.cntrCode:[]}
							              getOptionLabel = { option => option.label?option.label||'':'' }
							              getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
							              id="cntr_code"
							              value={{label:props.cntrCode && props.cntrCode.find(v=>v.value === bookmarkData.cntr_code)?
							            		  props.cntrCode.find(v=>v.value === bookmarkData.cntr_code).label:''
							                    }}
					                      onChange={(e,option)=>setBookmarkData({...bookmarkData,cntr_code:option?option.value:''})}
							              renderInput={
							                params =>(
							                  <TextField
							                    {...params} label=""
							                    fullWidth
							                  />)}
							            />
							            
					                    
				                  </GridItem>
				               </GridContainer>
			            	</GridItem> 
			            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Weight</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                    <CustomInput
					                    validtype="number"
						                    required={false}
						                    feedback="container_b"
							                labelText=""
							                maxLength="35"
							                formControlProps={{
							                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							                }}
							                inputProps={{
							                   value:bookmarkData.cntr_weight?bookmarkData.cntr_weight:'',
							                   endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
									           onChange: handleBookmarkChange('cntr_weight'),
									          // onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
							                  style:{height:'30px'}
							                }}
						    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem>
			            	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
		            		<GridContainer>
			                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
			                		<InputLabel style={{ color: "#AAAAAA" }}>Package</InputLabel>
			                    </GridItem>
			                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
			                  	<GridContainer>
			                  		<GridItem className={classes.grid} lg={8} md={9} sm={9} xs={12}>
				                  		<Autocomplete
							              options = {props.packCode?props.packCode:[]}
							              //getOptionLabel = { option => option.label?option.label||'':'' }
				                  		  getOptionLabel = { option => option.label?option.label+'['+props.packCode.find(v=>v.label === option.label).value+']'||'':'' }
							              getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
							              id="cntr_carton_code"
							              value={{label:props.packCode && props.packCode.find(v=>v.value === bookmarkData.cntr_carton_code)?
							            		  props.packCode.find(v=>v.value === bookmarkData.cntr_carton_code).label:''
							                    }}
					                      onChange={(e,option)=>setBookmarkData({...bookmarkData,cntr_carton_code:option?option.value:''})}
							              renderInput={
							                params =>(
							                  <TextField
							                    {...params} label=""
							                    fullWidth
							                  />)}
							            />
			                  		</GridItem>
			                  		<GridItem className={classes.grid} lg={4} md={9} sm={9} xs={12}>
				                  		<CustomInput
				                  		 validtype="number"
							                    required={false}
							                    feedback="container_b"
								                labelText=""
								                maxLength="2"
							                formControlProps={{
							                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							                }}
							                inputProps={{
							                   value:bookmarkData.cntr_carton_qty?bookmarkData.cntr_carton_qty:'',
									           onChange: handleBookmarkChange('cntr_carton_qty'),
									         //  onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
							                  style:{height:'30px'}
							                }}
						    	  		/>
			                  		</GridItem>
				                 </GridContainer>
			                  </GridItem>
			               </GridContainer>
		            	</GridItem>
		            	</GridContainer>
		            	<GridContainer style={{border:'2px dotted #00acc1'}}>
		            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
		            		<GridContainer>
			                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
			                		<InputLabel style={{ color: "#AAAAAA" }}>Verifying</InputLabel>
			                    </GridItem>
			                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
				                    <Autocomplete
						              options = {verifyType?verifyType:[]}
						              getOptionLabel = { option => option.label?option.label||'':'' }
						              getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
						              id="cntr_verifying_type"
						              value={{label:verifyType && verifyType.find(v=>v.value === bookmarkData.cntr_verifying_type)?
						            		  verifyType.find(v=>v.value === bookmarkData.cntr_verifying_type).label:''
						                    }}
				                      onChange={(e,option)=>setBookmarkData({...bookmarkData,cntr_verifying_type:option?option.value:''})}
						              renderInput={
						                params =>(
						                  <TextField
						                    {...params} label=""
						                    fullWidth
						                  />)}
						            />
				                    
			                  </GridItem>
			               </GridContainer>
		            	</GridItem> 
		            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
		            		<GridContainer>
			                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
			                		<InputLabel style={{ color: "#AAAAAA" }}>Bkg No</InputLabel>
			                    </GridItem>
			                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
				                    <CustomInput
				                        validtype="text"
					                    required={false}
					                    feedback="container_b"
						                labelText=""
						                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                  value:bookmarkData.cntr_res_bkg_no?bookmarkData.cntr_res_bkg_no:'',
								          onChange: handleBookmarkChange('cntr_res_bkg_no'),
								       //   onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
			                  </GridItem>
			               </GridContainer>
		            	</GridItem>
		            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
		            		<GridContainer>
			                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
			                		<InputLabel style={{ color: "#AAAAAA" }}>PIC Name</InputLabel>
			                    </GridItem>
			                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
				                    <CustomInput
				                       validtype="text"
					                    required={false}
					                    feedback="container_b"
						                labelText=""
						                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
							                  value:bookmarkData.cntr_auth_user_name?bookmarkData.cntr_auth_user_name:'',
											  onChange: handleBookmarkChange('cntr_auth_user_name'),
											//  onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
			                  </GridItem>
			               </GridContainer>
		            	</GridItem>
		            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
		            		<GridContainer>
			                	<GridItem className={classes.gridLabel} lg={5} md={4} sm={3} xs={12}>
			                		<InputLabel style={{ color: "#AAAAAA" }}>Total Weight</InputLabel>
			                    </GridItem>
			                    <GridItem className={classes.grid} lg={7} md={8} sm={9} xs={12}>
				                    <CustomInput
				                        validtype="number"
					                    required={false}
					                    feedback="container_b"
						                labelText=""
						                maxLength="18"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
						                   value:bookmarkData.cntr_total_weight?bookmarkData.cntr_total_weight:'',
										   onChange: handleBookmarkChange('cntr_total_weight'),
										   //onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
			                  </GridItem>
			               </GridContainer>
		            	</GridItem>
		            	</GridContainer>
                		</GridItem>
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
export default observer(ContainerBookmark);
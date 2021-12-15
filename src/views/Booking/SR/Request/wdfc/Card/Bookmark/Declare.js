import React,{ useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl, Select, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell,TableBody,Dialog, InputAdornment ,
		DialogTitle,DialogContent,DialogActions,TextField} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import axios from 'axios';
import {Autocomplete} from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";
import {Close} from "@material-ui/icons";
import {observer} from 'mobx-react-lite';
import {useSrStore}  from 'store/srStore.js';
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

//export default function DeclareBookmark(props) { 
function DeclareBookmark(props) {
	    	const classes = styles();
	    	const {openBook,bookmark,closeBook} = props;
	    	const store =  useSrStore();
			const [openBookmark,setOpenBookmark] = React.useState(false);
			const [bookmarkData,setBookmarkData] = React.useState({});
			
			 useEffect(() => {
			    	onInitData();
			 }, [openBook]);
			
		    const onInitData = () => {
				  setBookmarkData({'declare_bookmark_name':'','declare_bookmark_seq':'','declare_num':'','declare_div_load_yn':'','declare_pack_set_code':'',
			          'declare_div_load_no':'','declare_goods_desc':'','declare_pack_num':'','declare_pack_type':'','declare_weight':'','declare_pack_set_num':'',
			          'declare_pack_set_type':''}); 
				}
			  
			  const onSaveBookmark =()=> {

					if(bookmarkData && bookmarkData.declare_bookmark_name !==null && bookmarkData.declare_bookmark_name !=="") {
						axios.post("/shipper/setUserDeclareBookmark",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
				  	  	.then(res => {
					  	  	if(bookmarkData.declare_bookmark_seq) {
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
				  if(bookmarkData && (!bookmarkData.declare_bookmark_name || bookmarkData.declare_bookmark_name ==="")) {
					  props.alert(null,null,'danger',true,false,'lg',"삭제할 Bookmark 를 선택해주세요.",true,false);
					 
				  } else {
					axios.post("/shipper/setUserDeclareBookmarkDel",{user_no:props.userData?props.userData.user_no:'',data:bookmarkData},{})								
			  	  	.then(res => {onInitData();
					  	  	props.reloadBookmark();
			  	  			props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제되었습니다.",true,false);
			  	  	});
				  }
					
				}
			  
			  const handleDeclareChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
				  setBookmarkData({...bookmarkData, [prop]:event.target.value});
			  }
			  
			  const fncOnClickData = (row) => { 
				  setBookmarkData(row);
			  }

			  const loadYn =[{value:'N',label:'N'},{value:'Y',label:'Y'}];
			  
			  return (
		            <Dialog
			          classes={{paper: classes.modal}}
			          open={openBook}
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
			            <h4 className={classes.modalTitle}>Declare Bookmark</h4>
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
				                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell}>Declare Num</TableCell>
				                  </TableRow>
				                </TableHead>
				                <TableBody>
				                {store.sr_bookmark.decList?store.sr_bookmark.decList.map((row,index) => (
				                      <TableRow key={index}
				                        className={classes.root}
				                        hover
				                        onClick={(e)=>fncOnClickData(row)}
				                        selected = { bookmarkData.declare_bookmark_seq === row.declare_bookmark_seq }
						                classes = {{ hover: classes.hover, selected: classes.selected }}
				                      >
					                        <TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
					                        <TableCell align="center" className={classes.tablecell}>{row.declare_bookmark_name}</TableCell>
					                        <TableCell align="center" className={classes.tablecell}>{row.declare_num}</TableCell>
				                        </TableRow>
				                    )):
				                    	<TableRow className={classes.root}hover>
		                     				<TableCell colSpan="3" align="center" className={classes.tablecell}>No Data</TableCell>
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
								                    feedback="declare_b"
									                labelText=""
									                maxLength="35"
								                formControlProps={{
								                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								                }}
								                inputProps={{
								                   value:bookmarkData.declare_bookmark_name?bookmarkData.declare_bookmark_name:'',
										           onChange: handleDeclareChange('declare_bookmark_name'),
										           //onBlur: (e)=>e.target.value?props.mergeCntrProps(bookmarkData):null,
								                  style:{height:'30px'}
								                }}
							    	  		/>
						                  </GridItem>
						               </GridContainer>
					            	</GridItem> 
			                		<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
						            		<GridContainer>
							                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
							                		<InputLabel style={{ color: "#AAAAAA" }}>수출면장번호</InputLabel>
							                    </GridItem>
							                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
								                  <CustomInput
								                  validtype="text"
									                    required={false}
									                    feedback="declare_b"
										                labelText=""
										                maxLength="35"
									                formControlProps={{
									                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
									                }}
									                inputProps={{
									                   value:bookmarkData.declare_num?bookmarkData.declare_num:'',
											           onChange: handleDeclareChange('declare_num'),
											         //  onBlur: (e)=>e.target.value?props.mergeDeclareProps(bookmarkData):null
									                  style:{height:'30px'}
									                }}
								    	  		/>
							                  </GridItem>
							               </GridContainer>
						            	</GridItem> 
						            	<GridItem className={classes.grid} lg={5} md={4} sm={6} xs={12}>
						            		<GridContainer>
							                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							                		<InputLabel style={{ color: "#AAAAAA" }}>포장유형,개수</InputLabel>
							                    </GridItem>
							                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							                  	<GridContainer>
							                  		<GridItem className={classes.grid} lg={8} md={9} sm={9} xs={12}>
								                  		<Autocomplete
											              options = {props.packCode?props.packCode:[]}
								                  		  getOptionLabel = { option => option.label?option.label+'['+props.packCode.find(v=>v.label === option.label).value+']'||'':'' }
											              getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
											              id="declare_pack_type"
											              value={{label:props.packCode && props.packCode.find(v=>v.value === bookmarkData.declare_pack_type)?
											            		  props.packCode.find(v=>v.value === bookmarkData.declare_pack_type).label:''
											                    }}
									                      onChange={(e,option)=>setBookmarkData({...bookmarkData,declare_pack_type:option?option.value:''})}
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
								                  		required={false}
								                  		validtype="number"
									                    feedback="declare_b"
										                labelText=""
										                maxLength="35"
											                formControlProps={{
											                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											                }}
											                inputProps={{
											                   value:bookmarkData.declare_pack_num?bookmarkData.declare_pack_num:'',
													             onChange: handleDeclareChange('declare_pack_num'),
													        //     onBlur: (e)=>e.target.value?props.mergeDeclareProps(bookmarkData):null
											                  style:{height:'30px'}
											                }}
										    	  		/>
							                  		</GridItem>
								                 </GridContainer>
							                  </GridItem>
							               </GridContainer>
						            	</GridItem>						                  
						            	
						            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
						            		<GridContainer>
							                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
							                		<InputLabel style={{ color: "#AAAAAA" }}>중량</InputLabel>
							                    </GridItem>
							                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
								                    <CustomInput
								                    required={false}
								                    feedback="declare_b"
								                    	validtype="number"
									                labelText=""
									                maxLength="18"
										                formControlProps={{
										                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										                }}
										                inputProps={{
										                   value:bookmarkData.declare_weight?bookmarkData.declare_weight:'',
										                   endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
												           onChange: handleDeclareChange('declare_weight'),
												        //   onBlur: (e)=>e.target.value?props.mergeDeclareProps(bookmarkData):null
										                  style:{height:'30px'}
										                }}
									    	  		/>
							                  </GridItem>
							               </GridContainer>
						            	</GridItem>
						            	
						            	<GridItem className={classes.grid} lg={5} md={4} sm={6} xs={12}>
						            		<GridContainer>
							                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							                		<InputLabel style={{ color: "#AAAAAA" }}>동시포장유형,개수</InputLabel>
							                    </GridItem>
							                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							                  	<GridContainer>
							                  		<GridItem className={classes.grid} lg={8} md={9} sm={9} xs={12}>
								                  		<Autocomplete
											              options = {props.packCode?props.packCode:[]}
								                  		  getOptionLabel = { option => option.label?option.label+'['+props.packCode.find(v=>v.label === option.label).value+']'||'':'' }
											              getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
											              id="declare_pack_set_type"
											              value={{label:props.packCode && props.packCode.find(v=>v.value === bookmarkData.declare_pack_set_type)?
											            		  props.packCode.find(v=>v.value === bookmarkData.declare_pack_set_type).label:''
											                    }}
									                      onChange={(e,option)=>setBookmarkData({...bookmarkData,declare_pack_set_type:option?option.value:''})}
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
								                  		required={false}
									                    feedback="declare_b"
									                    	validtype="number"
										                labelText=""
										                maxLength="2"
											                formControlProps={{
											                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											                }}
											                inputProps={{
											                   value:bookmarkData.declare_pack_set_num?bookmarkData.declare_pack_set_num:'',
													           onChange: handleDeclareChange('declare_pack_set_num'),
													        //   onBlur: (e)=>e.target.value?props.mergeDeclareProps(bookmarkData):null
											                  style:{height:'30px'}
											                }}
										    	  		/>
							                  		</GridItem>
								                 </GridContainer>
							                  </GridItem>
							               </GridContainer>
						            	</GridItem>		
						            	
						            	<GridItem className={classes.grid} lg={2} md={4} sm={6} xs={12}>
						            		<GridContainer>
							                	<GridItem className={classes.gridLabel} lg={7} md={4} sm={3} xs={12}>
							                		<InputLabel style={{ color: "#AAAAAA" }}>분할선적여부</InputLabel>
							                    </GridItem>
							                    <GridItem className={classes.grid} lg={5} md={8} sm={9} xs={12}>
								                    <Autocomplete
										              options = {loadYn?loadYn:[]}
								                      getOptionLabel = { option => option.label?option.label||'':'' }
										              getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
										              id="declare_div_load_yn"
										              value={{label:loadYn && loadYn.find(v=>v.value === bookmarkData.declare_div_load_yn)?
										            		  loadYn.find(v=>v.value === bookmarkData.declare_div_load_yn).label:''
										                    }}
								                      onChange={(e,option)=>setBookmarkData({...bookmarkData,declare_div_load_yn:option?option.value:''})}
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
							               <GridItem className={classes.grid} lg={2} md={4} sm={6} xs={12}>
							            		<GridContainer>
								                	<GridItem className={classes.gridLabel} lg={7} md={4} sm={3} xs={12}>
								                		<InputLabel style={{ color: "#AAAAAA" }}>분할선적차수</InputLabel>
								                    </GridItem>
								                    <GridItem className={classes.grid} lg={5} md={8} sm={9} xs={12}>
									                    <CustomInput
									                    required={false}
									                    validtype="text"
									                    feedback="declare_b"
										                labelText=""
										                maxLength="2"
											                formControlProps={{
											                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											                }}
											                inputProps={{
											                  value:bookmarkData.declare_div_load_no?bookmarkData.declare_div_load_no:'',
													          onChange: handleDeclareChange('declare_div_load_no'),
													         // onBlur: (e)=>e.target.value?props.mergeDeclareProps(bookmarkData):null
											                  style:{height:'30px'}
											                }}
										    	  		/>
								                  </GridItem>
								               </GridContainer>
							            	</GridItem>
							            	
							            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
							            		<GridContainer>
								                	<GridItem className={classes.gridLabel} lg={5} md={4} sm={3} xs={12}>
								                		<InputLabel style={{ color: "#AAAAAA" }}>동시포장코드</InputLabel>
								                    </GridItem>
								                    <GridItem className={classes.grid} lg={7} md={8} sm={9} xs={12}>
									                    <CustomInput
										                    required={false}
										                    feedback="declare_b"
											                labelText=""
											                	validtype="engNumber"
											                maxLength="1"
											                formControlProps={{
											                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											                }}
											                inputProps={{
											                  value:bookmarkData.declare_pack_set_code?bookmarkData.declare_pack_set_code:'',
													          onChange: handleDeclareChange('declare_pack_set_code'),
													          //onBlur: (e)=>e.target.value?props.mergeDeclareProps(bookmarkData):null
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

export default observer(DeclareBookmark);
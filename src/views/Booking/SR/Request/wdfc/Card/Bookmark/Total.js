import React,{ useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card,InputLabel,TextField,TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog,DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
//import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomInput2 from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {Autocomplete} from "@material-ui/lab";
//import moment from 'moment';
import axios from 'axios';
//import BookingBody from '../Body/BookingBody.js';
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

//export default function TotalBookmark(props) { 
//const TotalBookmark = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const TotalBookmark = (observer(({UserStore, ...props}) => {
	function TotalBookmark(props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {bookmark,closeBook} = props; 
			const [titleRelation, setTitleRelation] = useState({});

			
			 const fncOnchangeRelation =(value,name)=> { 
				var list=titleRelation;
				if(name === 'BOOKING') {
					list={...list,'booking_label':value.label,'booking_value':value.value};
				} else if(name === 'SCHEDULE') {
					list={...list,'schedule_label':value.label,'schedule_value':value.value};
				//} else if(name === 'CARRIER') {
			  //	  list={...list,'carrier_label':value.label,'carrier_value':value.value};
				} else if(name === 'SHIPPER') {
					list={...list,'shipper_label':value.label,'shipper_value':value.value};
				} else if(name === 'CONSIGNEE') {
					list={...list,'consignee_label':value.label,'consignee_value':value.value};
				} else if(name === 'NOTIFY') {
					list={...list,'notify_label':value.label,'notify_value':value.value};
				} else if(name === 'CARGO') {
					list={...list,'cargo_label':value.label,'cargo_value':value.value};
				} else if(name === 'C_SHIPPER') {
					list={...list,'c_shipper_label':value.label,'c_shipper_value':value.value};
				} else if(name === 'C_CONSIGNEE') {
					list={...list,'c_consignee_label':value.label,'c_consignee_value':value.value};
				} else if(name === 'C_NOTIFY') {
					list={...list,'c_notify_label':value.label,'c_notify_value':value.value};
				} else {
					list={...list,[name]:value}
				}
				setTitleRelation(list);
			}

			  //북마크 삭제
			const onBookMarkDelete = ()=> {
				if(titleRelation.bookmark_seq) {
					axios.post("/shipper/setUserTitleBookmarkDel",{user_no:props.userData?props.userData.user_no:'',seq: titleRelation.bookmark_seq})
					.then(res=>{  
						        props.reloadBookmark();
								props.alert(null,null,'success',true,false,'lg',"선택한 BOOKMARK 가 삭제 되었습니다.",true,false);
								onInitData();
								
					});
				} else {

				}
			}
			//북마크 DB 등록
			const onSaveBookmark =()=>{

				if(titleRelation && (titleRelation.bookmark_name !== undefined && titleRelation.bookmark_name !== '')) {
						axios.post("/shipper/setUserTitleBookmark",{user_no:props.userData?props.userData.user_no:'',data: titleRelation})
						.then(res=>{  
									props.reloadBookmark();
									if(titleRelation.bookmark_seq) {
										props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 수정 되었습니다.",true,false);
									} else {
										props.alert(null,null,'success',true,false,'lg',"작성한 BOOKMARK 가 저장되었습니다.",true,false);
									}
						});
				} else {
					props.alert(null,null,'danger',true,false,'lg',"Bookmark Name 은 필수 입력값 입니다.",true,false);
				}
			}

			const fncOnClickData =(row)=> {
				axios.post("/shipper/getSRbookmarkRelation",{user_no: props.userData?props.userData.user_no:'',seq: row.bookmark_seq})
				.then(res=>{
						   var list =row;
							  res.data.map((data)=>{
								  if(data.reference_type === 'BOOKING'){
									  list = {...list,'booking_label':data.label,'booking_value':data.reference_seq};
								  } else if(data.reference_type === 'SCHEDULE'){
									  list = {...list,'schedule_label':data.label,'schedule_value':data.reference_seq};
								  } else if(data.reference_type === 'CARRIER'){
									list = {...list,'carrier_label':data.label,'carrier_value':data.reference_seq};
								  } else if(data.reference_type === 'SHIPPER'){
									list = {...list,'shipper_label':data.label,'shipper_value':data.reference_seq};
								  } else if(data.reference_type === 'CONSIGNEE'){
									list = {...list,'consignee_label':data.label,'consignee_value':data.reference_seq};
								  } else if(data.reference_type === 'NOTIFY'){
									list = {...list,'notify_label':data.label,'notify_value':data.reference_seq};
								  } else if(data.reference_type === 'CARGO'){
									list = {...list,'cargo_label':data.label,'cargo_value':data.reference_seq};
								  } else if(data.reference_type === 'C_SHIPPER'){
									list = {...list,'c_shipper_label':data.label,'c_shipper_value':data.reference_seq};
								  } else if(data.reference_type === 'C_CONSIGNEE'){
									list = {...list,'c_consignee_label':data.label,'c_consignee_value':data.reference_seq};
								  } else if(data.reference_type === 'C_NOTIFY'){
									list = {...list,'c_notify_label':data.label,'c_notify_value':data.reference_seq};
								  }			
							  });
							  setTitleRelation(list);
				});
			}

			const onInitData =()=>{
				setTitleRelation({bookmark_name:'',bookmark_seq:'',booking_value:'',schedule_value:'',shipper_value:'',
			                    consignee_value:'',notify_value:'',cargo_value:'',c_shipper_value:'',c_consignee:'',c_notify_value:''})
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
			            <h4 className={classes.modalTitle}>Total Bookmark</h4>
			          </DialogTitle>
			          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
						  <GridContainer>
							  <GridItem lg={5} md={5} sm={5} xs={12}>
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
										</TableRow>
										</TableHead>
										<TableBody>
									{store.sr_bookmark.totalList?store.sr_bookmark.totalList.map((row,index) => (
											<TableRow key={index}
												className={classes.root}
												hover
												onClick={(e)=>fncOnClickData(row)}
												selected = { titleRelation.bookmark_seq === row.bookmark_seq }
												classes = {{ hover: classes.hover, selected: classes.selected }}
											>
												<TableCell align="center" className={classes.tablecell}>{index+1}</TableCell>
												<TableCell align="center" className={classes.tablecell}>{row.bookmark_name}</TableCell>
											</TableRow>
											)):
												<TableRow className={classes.root}hover>
													<TableCell colSpan={3} align="center" className={classes.tablecell}>No Data</TableCell>
												</TableRow>
										}
										</TableBody>
									</Table>
								</TableContainer>
							</GridItem>
							<GridItem lg={7} md={7} sm={7} xs={12}>
								<Card>
									<CardBody>
										<GridContainer>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
														<CustomInput
															validtype="text"
															required={false}
															//feedback="c_shipper"
															labelText=""
															maxLength="35"
															formControlProps={{
															fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
															}}
															inputProps={{
																value:titleRelation.bookmark_name?titleRelation.bookmark_name:'',
															onChange: (e)=>fncOnchangeRelation(e.target.value,'bookmark_name'),
															//onBlur: (e)=>e.target.value?props.mergeShpProps(shpBodyData):null,
															style:{height:'30px'}
															}}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>Booking</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.bookingList?store.sr_bookmark.bookingList:[]}
															getOptionLabel = { option => option.other_bookmark_name }
															inputValue={
																store.sr_bookmark.bookingList?store.sr_bookmark.bookingList.find(v=>v.value === titleRelation.booking_value)
																?store.sr_bookmark.bookingList.find(v=>v.value === titleRelation.booking_value).label:'':''
															  }
															id="booking_bookmark"
															noOptionsText="Bookmark 등록하세요."
															onChange={(e, option)=>fncOnchangeRelation(option, 'BOOKING')}
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>SCHEDULE</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.scheduleList?store.sr_bookmark.scheduleList:[]}
															getOptionLabel = { option => option.schedule_bookmark_name }
															inputValue={
																store.sr_bookmark.scheduleList?store.sr_bookmark.scheduleList.find(v=>v.value === titleRelation.schedule_value)
																?store.sr_bookmark.scheduleList.find(v=>v.value === titleRelation.schedule_value).label:'':''
															  }
															id="schedule_bookmark"
																noOptionsText="Bookmark 등록하세요."
															onChange={(e, option)=>fncOnchangeRelation(option, 'SCHEDULE')}
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>SHIPPER</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
																options = {store.sr_bookmark.shipperList?store.sr_bookmark.shipperList:[]}
																getOptionLabel = { option => option.shipper_bookmark_name }
																id="shipper_bookmark"
																inputValue={
																store.sr_bookmark.shipperList?store.sr_bookmark.shipperList.find(v=>v.value === titleRelation.shipper_value)
																	?store.sr_bookmark.shipperList.find(v=>v.value === titleRelation.shipper_value).label:'':''
																  }
																noOptionsText="Bookmark 등록하세요."
																onChange = {(e, option)=>fncOnchangeRelation(option,'SHIPPER')}
																renderInput={
																	params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>CONSIGNEE</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.consList?store.sr_bookmark.consList:[]}
															getOptionLabel = { option => option.consignee_bookmark_name }
															id="cons_bookmark"
															inputValue={
																store.sr_bookmark.consList?store.sr_bookmark.consList.find(v=>v.value === titleRelation.consignee_value)
																?store.sr_bookmark.consList.find(v=>v.value === titleRelation.consignee_value).label:'':''
															  }
																noOptionsText="Bookmark 등록하세요."
															onChange = {(e, option)=>fncOnchangeRelation(option,'CONSIGNEE')}
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>NOTIFY</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.notiList?store.sr_bookmark.notiList:[]}
															getOptionLabel = { option => option.notify_bookmark_name }
															id="noti_bookmark"
																noOptionsText="Bookmark 등록하세요."
															inputValue={
																store.sr_bookmark.notiList?store.sr_bookmark.notiList.find(v=>v.value === titleRelation.notify_value)
																?store.sr_bookmark.notiList.find(v=>v.value === titleRelation.notify_value).label:'':''
																}
															onChange = {(e, option)=>fncOnchangeRelation(option,'NOTIFY')}
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>CARGO</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.cargoList?store.sr_bookmark.cargoList:[]}
															getOptionLabel = { option => option.cargo_bookmark_name }
															id="cargo_bookmark"
																noOptionsText="Bookmark 등록하세요."
															inputValue={
																store.sr_bookmark.cargoList?store.sr_bookmark.cargoList.find(v=>v.value === titleRelation.cargo_value)
																?store.sr_bookmark.cargoList.find(v=>v.value === titleRelation.cargo_value).label:'':''
																}
															onChange = {(e, option)=>fncOnchangeRelation(option,'CARGO')}
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
										</GridContainer>
									</CardBody>
								</Card>
								<div style={{marginTop:'10px'}}>CCAM</div>
								<Card>
									<CardBody>
										<GridContainer>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>SHIPPER</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.shipperList?store.sr_bookmark.shipperList:[]}
															getOptionLabel = { option => option.shipper_bookmark_name }
															onChange = {(e, option)=>fncOnchangeRelation(option,'C_SHIPPER')}
															inputValue={
																store.sr_bookmark.shipperList?store.sr_bookmark.shipperList.find(v=>v.value === titleRelation.c_shipper_value)
																?store.sr_bookmark.shipperList.find(v=>v.value === titleRelation.c_shipper_value).label:'':''
															  }
															noOptionsText="Bookmark 등록하세요."
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params}  fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>CONSIGNEE</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.consList?store.sr_bookmark.consList:[]}
															getOptionLabel = { option => option.consignee_bookmark_name }
															inputValue={
																store.sr_bookmark.consList?store.sr_bookmark.consList.find(v=>v.value === titleRelation.c_consignee_value)
																?store.sr_bookmark.consList.find(v=>v.value === titleRelation.c_consignee_value).label:'':''
															  }
														    noOptionsText="Bookmark 등록하세요."
															onChange = {(e, option)=>fncOnchangeRelation(option,'C_CONSIGNEE')}
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem lg={12} md={12} sm={12} xs={12}>
												<GridContainer>
													<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
														<InputLabel style={{ color: "#AAAAAA" }}>NOTIFY</InputLabel>
												    </GridItem>
													<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12} style={{marginBottom:'10px'}}>
														<Autocomplete
															options = {store.sr_bookmark.notiList?store.sr_bookmark.notiList:[]}
															getOptionLabel = { option => option.notify_bookmark_name }
															inputValue={
																store.sr_bookmark.notiList?store.sr_bookmark.notiList.find(v=>v.value === titleRelation.c_notify_value)
																?store.sr_bookmark.notiList.find(v=>v.value === titleRelation.c_notify_value).label:'':''
															  }
															onChange = {(e, option)=>fncOnchangeRelation(option,'C_NOTIFY')}
														    noOptionsText="Bookmark 등록하세요."
															renderInput={
																params =>(<TextField inputProps={{maxLength:30}} {...params} fullWidth />)}
														/>
													</GridItem>
												</GridContainer>
											</GridItem>
										</GridContainer>
									</CardBody>
								</Card>
							</GridItem>
						  </GridContainer>

			          </DialogContent>
			          <DialogActions className={classes.modalFooter}>
			          <Button color="info" onClick={(e)=>onInitData()}>NEW</Button>
			            <Button color="info" onClick={(e)=>onSaveBookmark()}>SAVE</Button>
			            <Button color="info" onClick={(e)=>onBookMarkDelete()}>DELETE</Button>
			          </DialogActions>
			        </Dialog>
			);
		}
//));
export default observer(TotalBookmark);
import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TextField,FormControl,InputLabel,Popover,Snackbar,Select,MenuItem,CircularProgress
  ,Table,TableHead, TableRow, TableBody, TableCell, TableFooter, Paper, Grid, Icon, AppBar, Tab, Box
  , Typography, Tabs, TableContainer} from '@material-ui/core';
  // core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Button from "components/CustomButtons/Button.js";
import {Search as SearchIcon} from "@material-ui/icons";
import queryString from 'query-string';
import Moment from 'moment';
import axios from 'axios';

const styles = makeStyles((theme) => ({
    root: {
        maxWidth:'550px'
    },
    tableHeaderCellStyle: {
        borderStyle:'solid',
        borderColor:'#dbdbdb',
        borderWidth:'1px',
        padding:'7px',
        backgroundColor:'#f2fefd',
        width:'25%',
    },
    tableCellStyle: {
        borderStyle:'solid',
        borderColor:'#dbdbdb',
        borderWidth:'1px',
        padding:'7px',
        width:'25%',
    },
    tablecontainer: {
      maxHeight:'750px',
    },
    cardTitleBlack: {
      textAlign: "left",
      color: "#000000",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
       "& small": {
           color: "#777",
        fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
       }
      },
}))

export default function HstrySrBkg(props) {
  const url = ["/com/selectSr"];
  const {loading, buttonClassname,AlertMessage} = props;
  const [searchData, setSearchData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [mode, setMode] = useState("");
  const [srNo, setSrNo] = useState("");
  const [srDate, setSrDate] = useState("");
  const [userNo, setUserNo] = useState("");
  const [ownerNo, setOwnerNo] = useState("");
  const [totCnt, setTotCnt] = useState(0);
  const query = queryString.parse(window.location.search);
  let setStartDate = new Date();
  let setEndDate = new Date();
  const [fromDate,setFromDate] = useState(query.from === "T"?setStartDate:query.from === "7"?setStartDate.setDate(setStartDate.getDate()-7):query.from === "1"?setStartDate.setDate(setStartDate.getDate()-1):setStartDate.setDate(setStartDate.getDate()-3));
  const [toDate,setToDate] = useState(query.to=== "T"?setEndDate:setEndDate.setDate(setEndDate.getDate()+3));
  const [copyParameter, setCopyParameter] =useState({
    fromDate:""
    ,toDate:""
    ,mode:""
    ,userNo:""
    ,srNo:""
    ,srDate:""
    ,ownerNo:""
  });

const classes = styles();

const onSubmit = () => {
  setSearchData([]);
  if(fromDate>toDate){
    AlertMessage('날짜확인하시오','error');
    return false;
  }
  if(Moment(toDate).diff(Moment(fromDate),'days')>6){
    AlertMessage('검색기간은 최대 7일이내입니다','error');
    return false;
  }
  setCopyParameter({
    fromDate:Moment(fromDate).format('YYYY-MM-DD')
    ,toDate:Moment(toDate).format('YYYY-MM-DD')
    ,mode:mode
    ,userNo:userNo
    ,srNo:srNo
    ,srDate:srDate
    ,ownerNo:ownerNo
  })
  setPageNum(1);
  const params = {
    pageNum:1
    ,fromDate:Moment(fromDate).format('YYYY-MM-DD')
    ,toDate:Moment(toDate).format('YYYY-MM-DD')
    ,mode:mode
    ,userNo:userNo
    ,srNo:srNo
    ,srDate:srDate
    ,ownerNo:ownerNo
  }
  onSearchData(params);   
}  

const onSearchData = (props) => {
  const params = {...props}
  setPageNum(1);
  axios.post(url[0],params)
    .then(setSearchData([]))
    .then(res => {
      if(res.data.length > 0) {
        setTotCnt(res.data[0].tot_cnt)
        AlertMessage('조회가 완료되었습니다.','success');
      }else {
        setTotCnt(0)
        AlertMessage('해당 조건의 검색된 결과가 없습니다.','error');
      }
      setSearchData(res.data);
    })
    .catch(err => {
       // if(err.response.status === 403||err.response.status === 401) {
      // props.openLogin();}
      });
}

const onMore = (param) => {
  setPageNum(param);
  axios.post(url[0],{
    pageNum:param,
    fromDate:copyParameter.fromDate,
    toDate:copyParameter.toDate,
    mode:copyParameter.mode
    ,userNo:copyParameter.userNo
    ,srNo:copyParameter.srNo
    ,srDate:copyParameter.srDate
    ,ownerNo:copyParameter.ownerNo
  })
  .then(res => {
      if(res.statusText ==="OK") {
        setSearchData([...searchData,...res.data]);
      }
  })
  .catch(err => {
     
  });
}

    return (
      <>  
      <Card style={{marginBottom:'0px'}}>
        <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
          <CardIcon color="info" style={{height:'56px'}}>
            <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleBlack}>검색조건</h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>  
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md ={4}> 
                          <CalendarBox
                            labelText ="From"
                            id="fromDate"
                            variant="inline"
                            format="yyyy-MM-dd"
                            // inputVariant="outlined"
                          //margin="dense"
                            setValue={fromDate}
                            autoOk={true}
                            onChangeValue={date => setFromDate(date)}
                            formControlProps={{fullWidth: true}} 
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md ={4}>
                          <CalendarBox
                            labelText ="To"
                            id="toDate"
                            variant="inline"
                            format="yyyy-MM-dd"
                            // inputVariant="outlined"
                          //margin="dense"
                            setValue={toDate}
                            autoOk={true}
                            onChangeValue={date => setToDate(date)}
                            formControlProps={{fullWidth: true}}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} >
                          <FormControl fullWidth>
                            <InputLabel id="mode">HistoryMode</InputLabel>
                            <Select 
                                onChange={(e) => setMode(e.target.value)}
                                native
                                value={mode}
                                id="modeSelect"
                                label="HistoryMode">
                                <option  value="A">ALL</option>
                                <option  value="I">Insert</option>
                                <option  value="U">Update</option>
                                <option  value="D">Delete</option>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={3} md={3} >
                          <TextField id="userNo" label="USERNO" value={userNo} onChange={(e) => setUserNo(e.target.value)} fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={3} md={3} >
                          <TextField id="srNo" label="SR NO" value={srNo} onChange={(e)=> setSrNo(e.target.value)}  fullWidth/>
                        </Grid>	
                        <Grid item xs={6} sm={3} md={3} >
                          <TextField id="srDate" label="SR DATE"  value={srDate} onChange={(e)=> setSrDate(e.target.value)} fullWidth/>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3} >
                          <TextField id="ownerNo" label="OWNER NO" value={ownerNo} onChange={(e)=> setOwnerNo(e.target.value)}  fullWidth/>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} >
                          <Button  size="lg" color="info" onClick={() => onSubmit()} endIcon={<SearchIcon/>}  fullWidth>Search</Button>
                    </Grid>
                  </Grid>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>  
        <GridItem xs={12} sm={12} md={12}>  
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} style={{textAlignLast: "end"}}>
              <span style={{paddingRight:"20px", paddingTop:"5px"}}>
                [ Data Count: {searchData.length}건 / 
                {searchData.length>0? searchData[0].tot_cnt
                :0}
                건 ]</span>
            </Grid>		
          </Grid>
        </GridItem>
        <TableContainer className={classes.tablecontainer}>
          <Table 	 
            stickyHeader 
            aria-label="sticky table"
            className={classes.table}
            // aria-labelledby="tableTitle"
            size={'medium'}
            style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
            <TableHead>
                <TableRow>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">no                           </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">history_date                 </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">history_mode                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">user_no                     </TableCell>  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_no                       </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_date                     </TableCell>  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">owner_no                    </TableCell>  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">insert_date                 </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">update_date                 </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">status_cus                  </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">send_date                   </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sending_count               </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_user_name               </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_user_dept               </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_user_tel                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_user_email              </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_user_fax                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_address1                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_address2                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_address3                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_address4                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_address5                </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_name1                   </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_name2                   </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_force                   </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_code                   </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_address1               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_address2               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_address3               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_address4               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_address5               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_name1                  </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cons_name2                  </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_un_code                 </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_code                   </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_address1               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_address2               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_address3               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_address4               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_address5               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_name1                  </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti_name2                  </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_code                   </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_address1               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_address2               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_address3               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_address4               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_address5               </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_name1                  </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_name2                  </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_user_name              </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_user_dept              </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_user_tel               </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_user_email             </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_payment_type           </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_payment_area_name      </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_vessel_name             </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_vessel_voyage           </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_feeder_vessel_name      </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_feeder_vessel_voyage    </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_barge_onboard_date      </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_pol                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_pol_name                </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_pod                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_pod_name                </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_fdp                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_fdp_name                </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_por                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_por_name                </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_pld                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_pld_name                </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_bl_issue_name           </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_tsp                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_tsp_name                </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_bk_no                   </TableCell>  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sc_no                       </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">document_no                 </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">trans_service_code          </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">bl_type                     </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">hbl_yn                      </TableCell>
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_srd                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">remark1                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">remark2                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">remark3                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">remark4                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">remark5                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">invoice_no                  </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">po_no                       </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">lc_yn                       </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">lc_no                       </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">org_bl_need_yn              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_amount                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">lc_expiry_date              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">part_sr_qty                 </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_class                 </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_scd                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">stuffing_date               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">clearance_date              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_user_name2              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">hs_code                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">incoterms_code              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sea_air_kind                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">xml_msg_id                  </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">xmldoc_seq                  </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_amount_currency          </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_amount_remark            </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">via_usa                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">goods_type_code             </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">intermediate                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">currency                    </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">classification_code         </TableCell>                    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">master_si_number            </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">corp_code                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">load_type                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">docu_type                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">conveyance_mode             </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">mbl_no                      </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">port_door                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">corp_yn                     </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">dept_code                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">com_user_dept               </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">com_user_tel                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">com_user_email              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_address1              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_address2              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_address3              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_address4              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_address5              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_name1                 </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">noti2_name2                 </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_code                    </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_address1                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_address2                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_address3                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_address4                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_address5                </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_name1                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">fwd_name2                   </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_code                  </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_address1              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_address2              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_address3              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_address4              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_address5              </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_name1                 </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line2_name2                 </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">consignee_bookmark_seq      </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">line_bookmark_seq           </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">notify_bookmark_seq         </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">schedule_bookmark_seq       </TableCell>        
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shipper_bookmark_seq        </TableCell>      
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">other_bookmark_seq          </TableCell>    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">originator                  </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">recipient                   </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">com_user_name               </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">status_cud                  </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_mrn                     </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_bkg_no                  </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_mbl_no                  </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_issue_date              </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_user_name               </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_bl_recv_date            </TableCell>                    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">klnet_id                    </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_bl_klnet_id             </TableCell>                    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">bookmark_seq                </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">xml_msg_id_vgm              </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">xml_msg_id_declare          </TableCell>                    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_bookmark_seq          </TableCell>                    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sch_eta                     </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">res_user_no                 </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_address1              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_address2              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_address3              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_address4              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_address5              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_name1                 </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_name2                 </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_country_code          </TableCell>                    
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_user_name             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_user_dept             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_user_tel              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_user_fax              </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_user_email            </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_shp_code                  </TableCell>            
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_address1             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_address2             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_address3             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_address4             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_address5             </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_name1                </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_name2                </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_country_code         </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_user_name            </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_user_dept            </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_user_tel             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_user_fax             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_user_email           </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_cons_code                 </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_address1             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_address2             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_address3             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_address4             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_address5             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_name1                </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_name2                </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_country_code         </TableCell>                  
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_user_name            </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_user_dept            </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_user_tel             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_user_fax             </TableCell>              
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_user_email           </TableCell>                
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">c_noti_code                 </TableCell>          
                  <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">shp_code                    </TableCell>      

                </TableRow>
            </TableHead>       
            <TableBody>
              {searchData.map((row,index) => (
                  <TableRow className={classes.root} hover>
                    <TableCell align="center">{row.rownum                   }</TableCell>
                    <TableCell align="center">{row.his_date                 }</TableCell>  
                    <TableCell align="center">{row.history_mode             }</TableCell>      
                    <TableCell align="center">{row.user_no                  }</TableCell>  
                    <TableCell align="center">{row.sr_no                    }</TableCell>
                    <TableCell align="center">{row.sr_date                  }</TableCell>  
                    <TableCell align="center">{row.owner_no                 }</TableCell>  
                    <TableCell align="center">{row.ins_date                 }</TableCell>      
                    <TableCell align="center">{row.up_date                  }</TableCell>      
                    <TableCell align="center">{row.status_cus               }</TableCell>    
                    <TableCell align="center">{row.send_date                }</TableCell>    
                    <TableCell align="center">{row.sending_count            }</TableCell>        
                    <TableCell align="center">{row.shp_user_name            }</TableCell>        
                    <TableCell align="center">{row.shp_user_dept            }</TableCell>        
                    <TableCell align="center">{row.shp_user_tel             }</TableCell>      
                    <TableCell align="center">{row.shp_user_email           }</TableCell>        
                    <TableCell align="center">{row.shp_user_fax             }</TableCell>      
                    <TableCell align="center">{row.shp_address1             }</TableCell>      
                    <TableCell align="center">{row.shp_address2             }</TableCell>      
                    <TableCell align="center">{row.shp_address3             }</TableCell>      
                    <TableCell align="center">{row.shp_address4             }</TableCell>      
                    <TableCell align="center">{row.shp_address5             }</TableCell>      
                    <TableCell align="center">{row.shp_name1                }</TableCell>            
                    <TableCell align="center">{row.shp_name2                }</TableCell>            
                    <TableCell align="center">{row.shp_force                }</TableCell>            
                    <TableCell align="center">{row.cons_code                }</TableCell>            
                    <TableCell align="center">{row.cons_address1            }</TableCell>              
                    <TableCell align="center">{row.cons_address2            }</TableCell>              
                    <TableCell align="center">{row.cons_address3            }</TableCell>              
                    <TableCell align="center">{row.cons_address4            }</TableCell>              
                    <TableCell align="center">{row.cons_address5            }</TableCell>              
                    <TableCell align="center">{row.cons_name1               }</TableCell>      
                    <TableCell align="center">{row.cons_name2               }</TableCell>      
                    <TableCell align="center">{row.shp_un_code              }</TableCell>        
                    <TableCell align="center">{row.noti_code                }</TableCell>      
                    <TableCell align="center">{row.noti_address1            }</TableCell>          
                    <TableCell align="center">{row.noti_address2            }</TableCell>          
                    <TableCell align="center">{row.noti_address3            }</TableCell>          
                    <TableCell align="center">{row.noti_address4            }</TableCell>          
                    <TableCell align="center">{row.noti_address5            }</TableCell>          
                    <TableCell align="center">{row.noti_name1               }</TableCell>      
                    <TableCell align="center">{row.noti_name2               }</TableCell>      
                    <TableCell align="center">{row.line_code                }</TableCell>      
                    <TableCell align="center">{row.line_address1            }</TableCell>          
                    <TableCell align="center">{row.line_address2            }</TableCell>          
                    <TableCell align="center">{row.line_address3            }</TableCell>          
                    <TableCell align="center">{row.line_address4            }</TableCell>          
                    <TableCell align="center">{row.line_address5            }</TableCell>          
                    <TableCell align="center">{row.line_name1               }</TableCell>      
                    <TableCell align="center">{row.line_name2               }</TableCell>      
                    <TableCell align="center">{row.line_user_name           }</TableCell>      
                    <TableCell align="center">{row.line_user_dept           }</TableCell>      
                    <TableCell align="center">{row.line_user_tel            }</TableCell>      
                    <TableCell align="center">{row.line_user_email          }</TableCell>        
                    <TableCell align="center">{row.line_payment_type        }</TableCell>          
                    <TableCell align="center">{row.line_payment_area_name   }</TableCell>              
                    <TableCell align="center">{row.sch_vessel_name          }</TableCell>        
                    <TableCell align="center">{row.sch_vessel_voyage        }</TableCell>          
                    <TableCell align="center">{row.sch_feeder_vessel_name   }</TableCell>              
                    <TableCell align="center">{row.sch_feeder_vessel_voyage }</TableCell>                
                    <TableCell align="center">{row.sch_barge_onboard_date   }</TableCell>              
                    <TableCell align="center">{row.sch_pol                  }</TableCell>
                    <TableCell align="center">{row.sch_pol_name             }</TableCell>    
                    <TableCell align="center">{row.sch_pod                  }</TableCell>
                    <TableCell align="center">{row.sch_pod_name             }</TableCell>    
                    <TableCell align="center">{row.sch_fdp                  }</TableCell>
                    <TableCell align="center">{row.sch_fdp_name             }</TableCell>    
                    <TableCell align="center">{row.sch_por                  }</TableCell>
                    <TableCell align="center">{row.sch_por_name             }</TableCell>    
                    <TableCell align="center">{row.sch_pld                  }</TableCell>
                    <TableCell align="center">{row.sch_pld_name             }</TableCell>    
                    <TableCell align="center">{row.sch_bl_issue_name        }</TableCell>          
                    <TableCell align="center">{row.sch_tsp                  }</TableCell>
                    <TableCell align="center">{row.sch_tsp_name             }</TableCell>    
                    <TableCell align="center">{row.res_bk_no                }</TableCell>  
                    <TableCell align="center">{row.sc_no                    }</TableCell>
                    <TableCell align="center">{row.document_no              }</TableCell>    
                    <TableCell align="center">{row.trans_service_code       }</TableCell>          
                    <TableCell align="center">{row.bl_type                  }</TableCell>
                    <TableCell align="center">{row.hbl_yn                   }</TableCell>
                    <TableCell align="center">{row.sch_srd                  }</TableCell>        
                    <TableCell align="center">{row.remark1                  }</TableCell>        
                    <TableCell align="center">{row.remark2                  }</TableCell>        
                    <TableCell align="center">{row.remark3                  }</TableCell>        
                    <TableCell align="center">{row.remark4                  }</TableCell>        
                    <TableCell align="center">{row.remark5                  }</TableCell>        
                    <TableCell align="center">{row.invoice_no               }</TableCell>          
                    <TableCell align="center">{row.po_no                    }</TableCell>      
                    <TableCell align="center">{row.lc_yn                    }</TableCell>      
                    <TableCell align="center">{row.lc_no                    }</TableCell>      
                    <TableCell align="center">{row.org_bl_need_yn           }</TableCell>              
                    <TableCell align="center">{row.sr_amount                }</TableCell>          
                    <TableCell align="center">{row.lc_expiry_date           }</TableCell>              
                    <TableCell align="center">{row.part_sr_qty              }</TableCell>            
                    <TableCell align="center">{row.cargo_class              }</TableCell>            
                    <TableCell align="center">{row.sch_scd                  }</TableCell>        
                    <TableCell align="center">{row.stuffing_date            }</TableCell>              
                    <TableCell align="center">{row.clearance_date           }</TableCell>              
                    <TableCell align="center">{row.shp_user_name2           }</TableCell>              
                    <TableCell align="center">{row.hs_code                  }</TableCell>        
                    <TableCell align="center">{row.incoterms_code           }</TableCell>              
                    <TableCell align="center">{row.sea_air_kind             }</TableCell>            
                    <TableCell align="center">{row.xml_msg_id               }</TableCell>          
                    <TableCell align="center">{row.xmldoc_seq               }</TableCell>          
                    <TableCell align="center">{row.sr_amount_currency       }</TableCell>                  
                    <TableCell align="center">{row.sr_amount_remark         }</TableCell>                
                    <TableCell align="center">{row.via_usa                  }</TableCell>        
                    <TableCell align="center">{row.goods_type_code          }</TableCell>                
                    <TableCell align="center">{row.intermediate             }</TableCell>            
                    <TableCell align="center">{row.currency                 }</TableCell>        
                    <TableCell align="center">{row.classification_code      }</TableCell>                    
                    <TableCell align="center">{row.master_si_number         }</TableCell>                
                    <TableCell align="center">{row.corp_code                }</TableCell>          
                    <TableCell align="center">{row.load_type                }</TableCell>          
                    <TableCell align="center">{row.docu_type                }</TableCell>          
                    <TableCell align="center">{row.conveyance_mode          }</TableCell>                
                    <TableCell align="center">{row.mbl_no                   }</TableCell>      
                    <TableCell align="center">{row.port_door                }</TableCell>          
                    <TableCell align="center">{row.corp_yn                  }</TableCell>        
                    <TableCell align="center">{row.dept_code                }</TableCell>          
                    <TableCell align="center">{row.com_user_dept            }</TableCell>              
                    <TableCell align="center">{row.com_user_tel             }</TableCell>            
                    <TableCell align="center">{row.com_user_email           }</TableCell>              
                    <TableCell align="center">{row.noti2_address1           }</TableCell>              
                    <TableCell align="center">{row.noti2_address2           }</TableCell>              
                    <TableCell align="center">{row.noti2_address3           }</TableCell>              
                    <TableCell align="center">{row.noti2_address4           }</TableCell>              
                    <TableCell align="center">{row.noti2_address5           }</TableCell>              
                    <TableCell align="center">{row.noti2_name1              }</TableCell>            
                    <TableCell align="center">{row.noti2_name2              }</TableCell>            
                    <TableCell align="center">{row.fwd_code                 }</TableCell>        
                    <TableCell align="center">{row.fwd_address1             }</TableCell>            
                    <TableCell align="center">{row.fwd_address2             }</TableCell>            
                    <TableCell align="center">{row.fwd_address3             }</TableCell>            
                    <TableCell align="center">{row.fwd_address4             }</TableCell>            
                    <TableCell align="center">{row.fwd_address5             }</TableCell>            
                    <TableCell align="center">{row.fwd_name1                }</TableCell>          
                    <TableCell align="center">{row.fwd_name2                }</TableCell>          
                    <TableCell align="center">{row.line2_code               }</TableCell>          
                    <TableCell align="center">{row.line2_address1           }</TableCell>              
                    <TableCell align="center">{row.line2_address2           }</TableCell>              
                    <TableCell align="center">{row.line2_address3           }</TableCell>              
                    <TableCell align="center">{row.line2_address4           }</TableCell>              
                    <TableCell align="center">{row.line2_address5           }</TableCell>              
                    <TableCell align="center">{row.line2_name1              }</TableCell>            
                    <TableCell align="center">{row.line2_name2              }</TableCell>            
                    <TableCell align="center">{row.consignee_bookmark_seq   }</TableCell>        
                    <TableCell align="center">{row.line_bookmark_seq        }</TableCell>    
                    <TableCell align="center">{row.notify_bookmark_seq      }</TableCell>      
                    <TableCell align="center">{row.schedule_bookmark_seq    }</TableCell>        
                    <TableCell align="center">{row.shipper_bookmark_seq     }</TableCell>      
                    <TableCell align="center">{row.other_bookmark_seq       }</TableCell>    
                    <TableCell align="center">{row.originator               }</TableCell>              
                    <TableCell align="center">{row.recipient                }</TableCell>              
                    <TableCell align="center">{row.com_user_name            }</TableCell>                  
                    <TableCell align="center">{row.status_cud               }</TableCell>              
                    <TableCell align="center">{row.res_mrn                  }</TableCell>            
                    <TableCell align="center">{row.res_bkg_no               }</TableCell>              
                    <TableCell align="center">{row.res_mbl_no               }</TableCell>              
                    <TableCell align="center">{row.res_issue_date           }</TableCell>                  
                    <TableCell align="center">{row.res_user_name            }</TableCell>                  
                    <TableCell align="center">{row.res_bl_recv_date         }</TableCell>                    
                    <TableCell align="center">{row.klnet_id                 }</TableCell>            
                    <TableCell align="center">{row.res_bl_klnet_id          }</TableCell>                    
                    <TableCell align="center">{row.bookmark_seq             }</TableCell>                
                    <TableCell align="center">{row.xml_msg_id_vgm           }</TableCell>                  
                    <TableCell align="center">{row.xml_msg_id_declare       }</TableCell>                    
                    <TableCell align="center">{row.cargo_bookmark_seq       }</TableCell>                    
                    <TableCell align="center">{row.sch_eta                  }</TableCell>          
                    <TableCell align="center">{row.res_user_no              }</TableCell>              
                    <TableCell align="center">{row.c_shp_address1           }</TableCell>                
                    <TableCell align="center">{row.c_shp_address2           }</TableCell>                
                    <TableCell align="center">{row.c_shp_address3           }</TableCell>                
                    <TableCell align="center">{row.c_shp_address4           }</TableCell>                
                    <TableCell align="center">{row.c_shp_address5           }</TableCell>                
                    <TableCell align="center">{row.c_shp_name1              }</TableCell>              
                    <TableCell align="center">{row.c_shp_name2              }</TableCell>              
                    <TableCell align="center">{row.c_shp_country_code       }</TableCell>                    
                    <TableCell align="center">{row.c_shp_user_name          }</TableCell>                  
                    <TableCell align="center">{row.c_shp_user_dept          }</TableCell>                  
                    <TableCell align="center">{row.c_shp_user_tel           }</TableCell>                
                    <TableCell align="center">{row.c_shp_user_fax           }</TableCell>                
                    <TableCell align="center">{row.c_shp_user_email         }</TableCell>                  
                    <TableCell align="center">{row.c_shp_code               }</TableCell>            
                    <TableCell align="center">{row.c_cons_address1          }</TableCell>                  
                    <TableCell align="center">{row.c_cons_address2          }</TableCell>                  
                    <TableCell align="center">{row.c_cons_address3          }</TableCell>                  
                    <TableCell align="center">{row.c_cons_address4          }</TableCell>                  
                    <TableCell align="center">{row.c_cons_address5          }</TableCell>                  
                    <TableCell align="center">{row.c_cons_name1             }</TableCell>          
                    <TableCell align="center">{row.c_cons_name2             }</TableCell>          
                    <TableCell align="center">{row.c_cons_country_code      }</TableCell>                  
                    <TableCell align="center">{row.c_cons_user_name         }</TableCell>              
                    <TableCell align="center">{row.c_cons_user_dept         }</TableCell>              
                    <TableCell align="center">{row.c_cons_user_tel          }</TableCell>              
                    <TableCell align="center">{row.c_cons_user_fax          }</TableCell>              
                    <TableCell align="center">{row.c_cons_user_email        }</TableCell>                
                    <TableCell align="center">{row.c_cons_code              }</TableCell>          
                    <TableCell align="center">{row.c_noti_address1          }</TableCell>              
                    <TableCell align="center">{row.c_noti_address2          }</TableCell>              
                    <TableCell align="center">{row.c_noti_address3          }</TableCell>              
                    <TableCell align="center">{row.c_noti_address4          }</TableCell>              
                    <TableCell align="center">{row.c_noti_address5          }</TableCell>              
                    <TableCell align="center">{row.c_noti_name1             }</TableCell>          
                    <TableCell align="center">{row.c_noti_name2             }</TableCell>          
                    <TableCell align="center">{row.c_noti_country_code      }</TableCell>                  
                    <TableCell align="center">{row.c_noti_user_name         }</TableCell>              
                    <TableCell align="center">{row.c_noti_user_dept         }</TableCell>              
                    <TableCell align="center">{row.c_noti_user_tel          }</TableCell>              
                    <TableCell align="center">{row.c_noti_user_fax          }</TableCell>              
                    <TableCell align="center">{row.c_noti_user_email        }</TableCell>                
                    <TableCell align="center">{row.c_noti_code              }</TableCell>          
                    <TableCell align="center">{row.shp_code                 }</TableCell>
                  </TableRow>
              ))}
            </TableBody>
              {searchData.length >= 10 
                ? Number(searchData[0].tot_page) !== pageNum 
                  ? (
                    <TableFooter>
                      <TableRow>
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={215}>
                          <Button
                            style={{minWidth:'100%'}}
                            variant="contained"
                            color="info"
                            onClick={() => onMore(pageNum+1)}
                            disabled={loading}
                            endIcon={loading && <CircularProgress size={24} />}
                            className= {buttonClassname}
                            >
                            {loading===false?`MORE( ${pageNum} / ${searchData[0].tot_page} )`:""}
                            {/* MORE&nbsp;(&nbsp;{num}&nbsp;/&nbsp;{searchDate[0].tot_page}&nbsp;) */}
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  ): null 
                : null 
              } 
          </Table>
        </TableContainer>
      </>
    )
  }
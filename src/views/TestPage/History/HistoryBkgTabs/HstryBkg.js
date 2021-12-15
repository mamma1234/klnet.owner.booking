import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {CircularProgress,Table,TableHead, TableRow, TableBody, TableCell, TableFooter, TableContainer,Grid} from '@material-ui/core';
  // core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import queryString from 'query-string';
import Moment from 'moment';
import axios from 'axios';
import SearchBox from './SearchBox_Bkg';

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
  maxHeight:'600px',
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

export default function HstryBkg(props) {
  const classes = styles();
  const url = ['/com/searchBKList'];
  const {loading, buttonClassname,AlertMessage} = props;
  const [searchData, setSearchData] = useState([]);
  const [pageNum, setPageNum] = useState(1)
  const [mode, setMode] = useState("");
  const [bkgNo, setBkgNo] = useState("");
  const [bkgDate, setBkgDate] = useState("");
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
    ,bkgNo:""
    ,bkgDate:""
    ,ownerNo:""
  });

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
    ,bkgNo:bkgNo
    ,bkgDate:bkgDate
    ,ownerNo:ownerNo
  })
  setPageNum(1);
  const params = {
    pageNum:1
    ,fromDate:Moment(fromDate).format('YYYY-MM-DD')
    ,toDate:Moment(toDate).format('YYYY-MM-DD')
    ,mode:mode
    ,userNo:userNo
    ,bkgNo:bkgNo
    ,bkgDate:bkgDate
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
    ,bkgNo:copyParameter.bkgNo
    ,bkgDate:copyParameter.bkgDate
    ,ownerNo:copyParameter.ownerNo
  })
  .then(res => {
      if(res.statusText ==="OK") {
        setSearchData([...searchData,...res.data]);
      }
  })
  .catch(err => {
      if(err.response.status === 403||err.response.status === 401) {
      props.openLogin();
  }});
}
    return (
      <>
      <SearchBox  
          fromDate={fromDate} setFromDate={setFromDate}
          toDate={toDate} setToDate={setToDate}
          mode={mode} setMode={setMode}
          userNo={userNo} setUserNo={setUserNo}
          bkgNo={bkgNo} setBkgNo={setBkgNo}
          bkgDate={bkgDate} setBkgDate={setBkgDate}
          ownerNo={ownerNo} setOwnerNo={setOwnerNo}
          onSubmit={onSubmit}      />
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
              //aria-labelledby="tableTitle"
              size={'medium'}
              style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>

              <TableHead>
                  <TableRow>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      no                      </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      history_date            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      history_mode            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      user_no                 </TableCell>     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      bkg_no                  </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      bkg_date                </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      owner_no                </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      insert_date             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      update_user             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      update_date             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      status_cus              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      send_date               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sc_no                   </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      schedule_bookmark_seq   </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      document_bookmark_seq   </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shipper_bookmark_seq    </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      forwarder_bookmark_seq  </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      consignee_bookmark_seq  </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_bookmark_seq       </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      transport_bookmark_seq  </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      docu_user_name          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      docu_user_tel           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      docu_user_phone         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      docu_user_fax           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      docu_user_email         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      docu_tax_email          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_line_code           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_vessel_code         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_vessel_name         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_vessel_voyage       </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_svc                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_start_port_code     </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_end_port_code       </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_pol                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_pol_name            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_pod                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_pod_name            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_call_sign           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_mrn                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_por                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_por_name            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_pld                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_pld_name            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_etd                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_eta                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_fdp                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_fdp_name            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_srd                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_led                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_dct                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_cct                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_sr_closing_time     </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sch_ts_yn               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_name1               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_name2               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_code                </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_user_name           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_user_tel            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_user_email          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_address1            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_address2            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_address3            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_address4            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_address5            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_user_dept           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_user_fax            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      shp_payment_type        </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_name1               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_name2               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_code                </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_user_name           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_user_tel            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_user_email          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_address1            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_address2            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_address3            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_address4            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_address5            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_user_dept           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      fwd_user_fax            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_name1              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_name2              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_code               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_user_name          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_user_tel           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_user_email         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_address1           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_address2           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_address3           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_address4           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_address5           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_user_dept          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      cons_user_fax           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_self_yn           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_name1             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_name2             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_code              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_user_name         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_user_tel          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_user_email        </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_user_fax          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_fac_area_name     </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_fac_name          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_remark            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_bkg_no              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      sending_count           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_bkg_date            </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_confirm_date        </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_user_no             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_user_name           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_confirm_recv_date   </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      klnet_id                </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_confirm_klnet_id    </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_remark1             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_name1              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_name2              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_code               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_user_name          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_user_tel           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_user_email         </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_address1           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_address2           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_address3           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_address4           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_address5           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_user_dept          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      line_user_fax           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      originator              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      recipient               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      consol_bkg_yn           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      bl_type                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      bl_cnt                  </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      incoterms_code          </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      resend_yn               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      order_no                </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      si_no                   </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      trans_service_code      </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      remark1                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      remark2                 </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      load_type               </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      res_remark2             </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      xml_msg_id              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      xmldoc_seq              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      status_cud              </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      other_bookmark_seq      </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">      bookmark_seq            </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {searchData.map((row,index) => (
          <TableRow
            className={classes.root}
            hover
            //onClick={() => onSubmit()}
            >
            <TableCell align="center">      {row.rownum                     }  </TableCell>
            <TableCell align="center">      {row.his_date            }  </TableCell>
            <TableCell align="center">      {row.history_mode            }  </TableCell>
            <TableCell align="center">      {row.user_no                 }  </TableCell>
            <TableCell align="center">      {row.bkg_no                  }  </TableCell>
            <TableCell align="center">      {row.bkg_date                }  </TableCell>
            <TableCell align="center">      {row.owner_no                }  </TableCell>
            <TableCell align="center">      {row.ins_date             }  </TableCell>
            <TableCell align="center">      {row.update_user             }  </TableCell>
            <TableCell align="center">      {row.up_date             }  </TableCell>
            <TableCell align="center">      {row.status_cus              }  </TableCell>
            <TableCell align="center">      {row.send_date               }  </TableCell>
            <TableCell align="center">      {row.sc_no                   }  </TableCell>
            <TableCell align="center">      {row.schedule_bookmark_seq   }  </TableCell>
            <TableCell align="center">      {row.document_bookmark_seq   }  </TableCell>
            <TableCell align="center">      {row.shipper_bookmark_seq    }  </TableCell>
            <TableCell align="center">      {row.forwarder_bookmark_seq  }  </TableCell>
            <TableCell align="center">      {row.consignee_bookmark_seq  }  </TableCell>
            <TableCell align="center">      {row.line_bookmark_seq       }  </TableCell>
            <TableCell align="center">      {row.transport_bookmark_seq  }  </TableCell>
            <TableCell align="center">      {row.docu_user_name          }  </TableCell>
            <TableCell align="center">      {row.docu_user_tel           }  </TableCell>
            <TableCell align="center">      {row.docu_user_phone         }  </TableCell>
            <TableCell align="center">      {row.docu_user_fax           }  </TableCell>
            <TableCell align="center">      {row.docu_user_email         }  </TableCell>
            <TableCell align="center">      {row.docu_tax_email          }  </TableCell>
            <TableCell align="center">      {row.sch_line_code           }  </TableCell>
            <TableCell align="center">      {row.sch_vessel_code         }  </TableCell>
            <TableCell align="center">      {row.sch_vessel_name         }  </TableCell>
            <TableCell align="center">      {row.sch_vessel_voyage       }  </TableCell>
            <TableCell align="center">      {row.sch_svc                 }  </TableCell>
            <TableCell align="center">      {row.sch_start_port_code     }  </TableCell>
            <TableCell align="center">      {row.sch_end_port_code       }  </TableCell>
            <TableCell align="center">      {row.sch_pol                 }  </TableCell>
            <TableCell align="center">      {row.sch_pol_name            }  </TableCell>
            <TableCell align="center">      {row.sch_pod                 }  </TableCell>
            <TableCell align="center">      {row.sch_pod_name            }  </TableCell>
            <TableCell align="center">      {row.sch_call_sign           }  </TableCell>
            <TableCell align="center">      {row.sch_mrn                 }  </TableCell>
            <TableCell align="center">      {row.sch_por                 }  </TableCell>
            <TableCell align="center">      {row.sch_por_name            }  </TableCell>
            <TableCell align="center">      {row.sch_pld                 }  </TableCell>
            <TableCell align="center">      {row.sch_pld_name            }  </TableCell>
            <TableCell align="center">      {row.sch_etd                 }  </TableCell>
            <TableCell align="center">      {row.sch_eta                 }  </TableCell>
            <TableCell align="center">      {row.sch_fdp                 }  </TableCell>
            <TableCell align="center">      {row.sch_fdp_name            }  </TableCell>
            <TableCell align="center">      {row.sch_srd                 }  </TableCell>
            <TableCell align="center">      {row.sch_led                 }  </TableCell>
            <TableCell align="center">      {row.sch_dct                 }  </TableCell>
            <TableCell align="center">      {row.sch_cct                 }  </TableCell>
            <TableCell align="center">      {row.sch_sr_closing_time     }  </TableCell>
            <TableCell align="center">      {row.sch_ts_yn               }  </TableCell>
            <TableCell align="center">      {row.shp_name1               }  </TableCell>
            <TableCell align="center">      {row.shp_name2               }  </TableCell>
            <TableCell align="center">      {row.shp_code                }  </TableCell>
            <TableCell align="center">      {row.shp_user_name           }  </TableCell>
            <TableCell align="center">      {row.shp_user_tel            }  </TableCell>
            <TableCell align="center">      {row.shp_user_email          }  </TableCell>
            <TableCell align="center">      {row.shp_address1            }  </TableCell>
            <TableCell align="center">      {row.shp_address2            }  </TableCell>
            <TableCell align="center">      {row.shp_address3            }  </TableCell>
            <TableCell align="center">      {row.shp_address4            }  </TableCell>
            <TableCell align="center">      {row.shp_address5            }  </TableCell>
            <TableCell align="center">      {row.shp_user_dept           }  </TableCell>
            <TableCell align="center">      {row.shp_user_fax            }  </TableCell>
            <TableCell align="center">      {row.shp_payment_type        }  </TableCell>
            <TableCell align="center">      {row.fwd_name1               }  </TableCell>
            <TableCell align="center">      {row.fwd_name2               }  </TableCell>
            <TableCell align="center">      {row.fwd_code                }  </TableCell>
            <TableCell align="center">      {row.fwd_user_name           }  </TableCell>
            <TableCell align="center">      {row.fwd_user_tel            }  </TableCell>
            <TableCell align="center">      {row.fwd_user_email          }  </TableCell>
            <TableCell align="center">      {row.fwd_address1            }  </TableCell>
            <TableCell align="center">      {row.fwd_address2            }  </TableCell>
            <TableCell align="center">      {row.fwd_address3            }  </TableCell>
            <TableCell align="center">      {row.fwd_address4            }  </TableCell>
            <TableCell align="center">      {row.fwd_address5            }  </TableCell>
            <TableCell align="center">      {row.fwd_user_dept           }  </TableCell>
            <TableCell align="center">      {row.fwd_user_fax            }  </TableCell>
            <TableCell align="center">      {row.cons_name1              }  </TableCell>
            <TableCell align="center">      {row.cons_name2              }  </TableCell>
            <TableCell align="center">      {row.cons_code               }  </TableCell>
            <TableCell align="center">      {row.cons_user_name          }  </TableCell>
            <TableCell align="center">      {row.cons_user_tel           }  </TableCell>
            <TableCell align="center">      {row.cons_user_email         }  </TableCell>
            <TableCell align="center">      {row.cons_address1           }  </TableCell>
            <TableCell align="center">      {row.cons_address2           }  </TableCell>
            <TableCell align="center">      {row.cons_address3           }  </TableCell>
            <TableCell align="center">      {row.cons_address4           }  </TableCell>
            <TableCell align="center">      {row.cons_address5           }  </TableCell>
            <TableCell align="center">      {row.cons_user_dept          }  </TableCell>
            <TableCell align="center">      {row.cons_user_fax           }  </TableCell>
            <TableCell align="center">      {row.trans_self_yn           }  </TableCell>
            <TableCell align="center">      {row.trans_name1             }  </TableCell>
            <TableCell align="center">      {row.trans_name2             }  </TableCell>
            <TableCell align="center">      {row.trans_code              }  </TableCell>
            <TableCell align="center">      {row.trans_user_name         }  </TableCell>
            <TableCell align="center">      {row.trans_user_tel          }  </TableCell>
            <TableCell align="center">      {row.trans_user_email        }  </TableCell>
            <TableCell align="center">      {row.trans_user_fax          }  </TableCell>
            <TableCell align="center">      {row.trans_fac_area_name     }  </TableCell>
            <TableCell align="center">      {row.trans_fac_name          }  </TableCell>
            <TableCell align="center">      {row.trans_remark            }  </TableCell>
            <TableCell align="center">      {row.res_bkg_no              }  </TableCell>
            <TableCell align="center">      {row.sending_count           }  </TableCell>
            <TableCell align="center">      {row.res_bkg_date            }  </TableCell>
            <TableCell align="center">      {row.res_confirm_date        }  </TableCell>
            <TableCell align="center">      {row.res_user_no             }  </TableCell>
            <TableCell align="center">      {row.res_user_name           }  </TableCell>
            <TableCell align="center">      {row.res_confirm_recv_date   }  </TableCell>
            <TableCell align="center">      {row.klnet_id                }  </TableCell>
            <TableCell align="center">      {row.res_confirm_klnet_id    }  </TableCell>
            <TableCell align="center">      {row.res_remark1             }  </TableCell>
            <TableCell align="center">      {row.line_name1              }  </TableCell>
            <TableCell align="center">      {row.line_name2              }  </TableCell>
            <TableCell align="center">      {row.line_code               }  </TableCell>
            <TableCell align="center">      {row.line_user_name          }  </TableCell>
            <TableCell align="center">      {row.line_user_tel           }  </TableCell>
            <TableCell align="center">      {row.line_user_email         }  </TableCell>
            <TableCell align="center">      {row.line_address1           }  </TableCell>
            <TableCell align="center">      {row.line_address2           }  </TableCell>
            <TableCell align="center">      {row.line_address3           }  </TableCell>
            <TableCell align="center">      {row.line_address4           }  </TableCell>
            <TableCell align="center">      {row.line_address5           }  </TableCell>
            <TableCell align="center">      {row.line_user_dept          }  </TableCell>
            <TableCell align="center">      {row.line_user_fax           }  </TableCell>
            <TableCell align="center">      {row.originator              }  </TableCell>
            <TableCell align="center">      {row.recipient               }  </TableCell>
            <TableCell align="center">      {row.consol_bkg_yn           }  </TableCell>
            <TableCell align="center">      {row.bl_type                 }  </TableCell>
            <TableCell align="center">      {row.bl_cnt                  }  </TableCell>
            <TableCell align="center">      {row.incoterms_code          }  </TableCell>
            <TableCell align="center">      {row.resend_yn               }  </TableCell>
            <TableCell align="center">      {row.order_no                }  </TableCell>
            <TableCell align="center">      {row.si_no                   }  </TableCell>
            <TableCell align="center">      {row.trans_service_code      }  </TableCell>
            <TableCell align="center">      {row.remark1                 }  </TableCell>
            <TableCell align="center">      {row.remark2                 }  </TableCell>
            <TableCell align="center">      {row.load_type               }  </TableCell>
            <TableCell align="center">      {row.res_remark2             }  </TableCell>
            <TableCell align="center">      {row.xml_msg_id              }  </TableCell>
            <TableCell align="center">      {row.xmldoc_seq              }  </TableCell>
            <TableCell align="center">      {row.status_cud              }  </TableCell>
            <TableCell align="center">      {row.other_bookmark_seq      }  </TableCell>
            <TableCell align="center">      {row.bookmark_seq            }  </TableCell>

            {/* <TableCell align="center">
                <IconButton aria-label="expand row" size="small" onClick={() => onSubmit()}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>  */}
        </TableRow>  ))}
        </TableBody>
        {searchData.length >= 10 
                ? Number(searchData[0].tot_page) !== pageNum 
                  ? (
                    <TableFooter>
                      <TableRow>
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={146}>
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
    );
}
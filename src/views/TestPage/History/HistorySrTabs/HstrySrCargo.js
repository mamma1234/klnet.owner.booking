import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {CircularProgress, Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TableContainer, Grid} from '@material-ui/core';
  // core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import queryString from 'query-string';
import Moment from 'moment';
import axios from 'axios';
import SearchBox from './SearchBox_SR';

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

export default function HstrySrCargo(props) {
  const url = ["/com/selectSrCargo"];
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
        <SearchBox  
          fromDate={fromDate} setFromDate={setFromDate}
          toDate={toDate} setToDate={setToDate}
          mode={mode} setMode={setMode}
          userNo={userNo} setUserNo={setUserNo}
          srNo={srNo} setSrNo={setSrNo}
          srDate={srDate} setSrDate={setSrDate}
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
            // aria-labelledby="tableTitle"
            size={'medium'}
            style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
            <TableHead>
                <TableRow>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">no                           </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">history_date                  </TableCell>
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">history_mode                  </TableCell>             
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">user_no                       </TableCell>         
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_no                         </TableCell>         
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">sr_date                       </TableCell>         
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_seq                     </TableCell>             
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_pack_qty                </TableCell>                 
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_pack_type               </TableCell>                 
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_handling_code           </TableCell>                     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_temp                    </TableCell>             
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_temp_unit               </TableCell>                 
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_attached_yn             </TableCell>                     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_coastal_yn              </TableCell>                 
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_handling_frozen         </TableCell>                         
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_total_weight            </TableCell>                     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_total_volume            </TableCell>                     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_weight                  </TableCell>             
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_bookmark_seq            </TableCell>                     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_frozen_temp             </TableCell>                     
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_frozen_temp_unit        </TableCell>                         
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_hs_code                 </TableCell>                 
                    <TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">cargo_item_hs_code            </TableCell>                     
                </TableRow>
            </TableHead>       
            <TableBody>
              {searchData.map((row,index) => (
                  <TableRow className={classes.root} hover>
                    <TableCell align="center">{row.rownum                      }</TableCell>
                    <TableCell align="center">{row.his_date                    }</TableCell>
                    <TableCell align="center">{row.history_mode                }</TableCell>          
                    <TableCell align="center">{row.user_no                     } </TableCell>         
                    <TableCell align="center">{row.sr_no                       } </TableCell>         
                    <TableCell align="center">{row.sr_date                     } </TableCell>         
                    <TableCell align="center">{row.cargo_seq                   } </TableCell>             
                    <TableCell align="center">{row.cargo_pack_qty              } </TableCell>                 
                    <TableCell align="center">{row.cargo_pack_type             } </TableCell>                 
                    <TableCell align="center">{row.cargo_handling_code         } </TableCell>                     
                    <TableCell align="center">{row.cargo_temp                  } </TableCell>             
                    <TableCell align="center">{row.cargo_temp_unit             } </TableCell>                 
                    <TableCell align="center">{row.cargo_attached_yn           } </TableCell>                     
                    <TableCell align="center">{row.cargo_coastal_yn            } </TableCell>                 
                    <TableCell align="center">{row.cargo_handling_frozen       } </TableCell>                         
                    <TableCell align="center">{row.cargo_total_weight          } </TableCell>                     
                    <TableCell align="center">{row.cargo_total_volume          } </TableCell>                     
                    <TableCell align="center">{row.cargo_weight                } </TableCell>             
                    <TableCell align="center">{row.cargo_bookmark_seq          } </TableCell>                     
                    <TableCell align="center">{row.cargo_frozen_temp           } </TableCell>                     
                    <TableCell align="center">{row.cargo_frozen_temp_unit      } </TableCell>                         
                    <TableCell align="center">{row.cargo_hs_code               } </TableCell>                 
                    <TableCell align="center">{row.cargo_item_hs_code          } </TableCell> 
                  </TableRow>
              ))}
            </TableBody>
              {searchData.length >= 10 
                ? Number(searchData[0].tot_page) !== pageNum 
                  ? (
                    <TableFooter>
                      <TableRow>
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={23}>
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
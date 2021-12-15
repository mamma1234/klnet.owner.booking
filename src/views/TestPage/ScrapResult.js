import React,{ useState, useEffect } from "react";
// @material-ui/core components
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
//core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// core components
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
// import Report from 'views/Report/Report.js';
import LocalAddress from 'components/LocalAddress/LocalAddress.js'

import Moment from 'moment';
import Filesaver from 'file-saver';

import Assignment from "@material-ui/icons/Assignment";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);
let numCnt =1;

function ScrapResultTable(props) {
	const classes = useStyles();
	const { tableHead,tableData, tableHeaderColor, tableRownum, tableTotalPage, selectedRow } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }

  const handleClick = (event, prop, key) =>{
	props.selectedRow(event, prop, key);
  }

  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
    	<Table className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
    	{tableHead !== undefined ? (
			<TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px'}} id="scroll_top">
				
				<TableRow className={classes.tableHeadRow}>
					{tableHead.map((prop, key) => {
					return (
						<TableCell
						className={classes.tableHeaderCellStyle}
						key={key}
						>
						{prop}
						</TableCell>
					);
					})}
				</TableRow>
			</TableHead>
    	        ) : null}
        <TableBody>
           {tableData.map((prop, key) => {
                //   return (
                //     <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
				//   );
                return (
					<TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}} onClick={(event)=>handleClick(event,prop, key)}>
					  {prop.map((prop, key) => {
						return (
						  <TableCell className={classes.trackingtableCell} key={key} style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >
							{prop}
						  </TableCell>
						);
					  })}
					</TableRow>
				  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter >
        	<TableRow  >
        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={15}>
        		<Button
				    color="info"
					onClick={handleAddFunction}
        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
				>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableTotalPage}&nbsp;)</Button>
		    </TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
    </div>
  );
}

//const ScrapResultList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 	
export default function ScrapResultList(props) {
	// const {store} =props;

	const [scrapLineCodeList,setScrapLineCodeList] = useState([]);
	const [scrapLineCode,setScrapLineCode] = useState([]);
	const [scrapDate,setScrapDate] = useState(new Date());
	const [scrapingLineResultData,setScrapingLineResultData] = useState([]);
	const [lineTableHeader, setLineTableHeader] = useState([]);
	const [lineTableHeaderKeys, setLineTableHeaderKeys] = useState([]);
	const [totPage, setTotPage] = useState("");
	const [selectedRowData,setSelectedRowData] = useState([]);

	//주소검색
	const[addressPrarams, setAddressPrarams] = useState("");
	const[open, setOpen] = useState(false);
	const[returnAddress, setReturnAddress] = useState({});
	const[roadAddress, setRoadAddress] = useState("");
	const[jibunAddress, setJibunAddress] = useState("");
    useEffect(()=>{
        console.log("PARENT>>>",returnAddress.roadAddr);
		setRoadAddress(returnAddress.roadAddr);
		setJibunAddress(returnAddress.jibunAddr);
    }, [returnAddress]);

	const onScrapLineCode = (e) => {
		// const values = e.target.value;
	
		if(props.userData) {
			axios.post("/loc/getScrapLineCodeList",{ })
			.then(setScrapLineCodeList([]))
			.then(res => setScrapLineCodeList(res.data))
			.catch(err => {
				// if(err.response.status === 403||err.response.status === 401) {
				// 	props.openLogin();
				// }
			});
		} else {
			props.openLogin();
		}
	}

	useEffect(() => {
		onScrapLineCode();
		// Report.parameters={
		// 	'user_no':props.userData.userno,
		// 	'line_code':scrapLineCode.line_code,
		// 	'carrier_code':scrapLineCode.customs_line_code
		// }
		return () => {
		};
	  },[]);

	const chainPortal = () => {
		axios.post("/com/chainPortal"
		,{
			// address:address
			// ,currentPage:page
			// ,countPerPage
			resultType:'json'
			// ,keyword:address
		}
		
	).then(res => {
		console.log("data message:",res.data);
	// 	if( "ERROR" === res.data.message ) {
	// 		alert( res.data.errMsg );
	// 		return false;
	// 	}
	// 	setCommon(res.data.common);
	// 	setAddressList(res.data.juso);
	// 	setPage(Number(res.data.common.currentPage));
	// 	setTotalCount(Math.ceil(res.data.common.totalCount/itemsPerPage));
	// }).catch(err => {
		// alert(err);
	});	
	}
  const onSubmit = () => {
	//   console.log( lineTableHeader );
	if ( lineTableHeader.length < 1 ) {
		alert(" 조회 가능한 선사를 선택하세요. ");
		return false;
	}
	numCnt=1;

	if(props.userData) {
	axios.post("/loc/getLineScrapingResultData",
			{
				num:numCnt
				,table_name:scrapLineCode.table_name
				,scrapDate:Moment(scrapDate).format('YYYYMMDD')
				,column_list:lineTableHeader
			},
			{headers:props.userData})
				.then(setScrapingLineResultData([]))
				// .then(res => setScrapingLineResultData(res.data))
				.then(res => {
					// console.log(res.data);
					const rowList = [];
					// console.log( row );
					res.data.map( dataRow => {
						const columnList = [];
						// console.log( "dataRow",dataRow )
						setTotPage(dataRow.tot_page)
						Object.keys(dataRow).map( key => {
								lineTableHeaderKeys.map( headerRow => {
								if ( key == headerRow.column_name ){
									columnList.push(dataRow[key]);
								}
							})
						})
						rowList.push(columnList);
					});
					setScrapingLineResultData(rowList);
	
				})
			    .catch(err => {
			    	// alert(err);
			    });
	} else {
		props.openLogin();
	}
  }

  const selectedRow=(event , prop, key)=>{
	  console.log(prop);
	  setSelectedRowData(prop);
  }
  
  const handleAddRow = () => {
	if ( lineTableHeader == [] ) {
		alert(" 조회 가능한 선사를 선택하세요. ");
		return false;
	}
//     //page ++
	    numCnt=numCnt+1;
	   
		if(props.userData) {
		axios.post("/loc/getLineScrapingResultData"
			,{
				num:numCnt
				,table_name:scrapLineCode.table_name
				,scrapDate:Moment(scrapDate).format('YYYYMMDD')
				,column_list:lineTableHeader
			},
	    		{headers:props.userData})
			//   .then(res => setScrapingLineResultData([...scrapingLineResultData,...res.data]))
			  .then(res => {
				// console.log(res.data);
				const rowList = [];
				// console.log( row );
				res.data.map( dataRow => {
					const columnList = [];
					// console.log( "dataRow",dataRow )
					Object.keys(dataRow).map( key => {
						// console.log( "dataRow",key )
							lineTableHeaderKeys.map( headerRow => {
								// console.log( ">>dataRow",key, headerRow.column_name )
							if ( key == headerRow.column_name ){
								// console.log("MMMMMMM", dataRow[key]);
								columnList.push(dataRow[key]);
							}
							
						})
						// console.log("clolumnList", columnList);
					})
					rowList.push(columnList);
					// columnList.push( row.column_name );
				});
				setScrapingLineResultData([...scrapingLineResultData,...rowList])
			})
	   	      .catch(err => {
	            if(err.response.status === 403 || err.response.status === 401) {
		        	//setOpenJoin(true);
		        	//props.openLogin();
		        }
	            });
		} else {
			props.openLogin();
		}
   
  };


  	const onBlurLineCode=(e,data)=>{
		setScrapingLineResultData([]);
		// const values = e.target.value;
		if ( null != data ) {
			setScrapLineCode(data);
			// console.log( data.scrap_yn );
			if ( data == {} ) {
				alert("선택을 하시기 바랍니다.");
				setLineTableHeader([]);
				return false;
			}
			if( "N" == data.web_scrap_yn ) {
				alert("웹스크래핑 중지된 선사 입니다. 조회 불가합니다.");
				setLineTableHeader([]);
				return false;
			}
			if( "D" == data.web_scrap_yn ) {
				alert("웹스크래핑 중지되어 DEM DET 적용 선사 입니다. 조회 불가합니다.");
				setLineTableHeader([]);
				return false;
			}
		
			if(props.userData) {
				axios.post("/loc/getHeaderForLine",{ 
					table_name:data.table_name}
					)
				.then(setLineTableHeader([]))
				.then(res => {
					// console.log(res.data);

					setLineTableHeaderKeys(res.data);
					const columnList = [];
					res.data.map( row => {
						// columnList.push(row);
						columnList.push( row.column_name );
					});
					// console.log( columnList );
					setLineTableHeader(columnList);
				})
				.catch(err => {
					// if(err.response.status === 403||err.response.status === 401) {
					// 	props.openLogin();
					// }
				});
			} else {
				props.openLogin();
			}
		}


	}

	/*
	jasper {
		file_type : [pdf] 다운로드할 파일타입(pdf, html, csv, xlsx, odt, pptx, rtf) 중 택 1
		file_path : [SCRAP/PGSQL_1.jrxml] jasper File 위치 /DATA/KLNET/OWNER/REPORTS/ 이하 경로
		connection : [pgsql] jasper report DB 접속 정보(oracle, pgsql)
		parameters:{
				'user_no':auth.getUser().userno,
				'line_code':scrapLineCode.line_code,
				'carrier_code':scrapLineCode.customs_line_code
			} jasper 파일 파라미터
	}

	*/
	// const onScrapReport = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}
		
		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'pdf',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}

	// 		report.getReport(jasper);
			
	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }


	// 		// const options = {
	// 		// 	method:'POST',
	// 		// 	url:host+'/report/generate_pdf',
	// 		// 	headers:{
	// 		// 		'cache-control':'no-cache',
	// 		// 		'Accept':'application/pdf',
	// 		// 		'content-type':'application/json'
	// 		// 	},
	// 		// 	body:JSON.stringify({
	// 		// 		name:'carrier',
	// 		// 		file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 		connection:'pgsql',
	// 		// 		parameters:{
	// 		// 			'user_no':auth.getUser().userno,
	// 		// 			'line_code':scrapLineCode.line_code,
	// 		// 			'carrier_code':scrapLineCode.customs_line_code
	// 		// 		},
	// 		// 		// json:true,
					
	// 		// 		responseType:'blob'
	// 		// 	})
	// 		// }
	// 		// // console.log(options)

	// 		// fetch(
	// 		// 	host+'/report/generate_pdf',
	// 		// 	options
	// 		// ).then(res => {
	// 		// 	if(res.ok) {
	// 		// 		return res.blob();
	// 		// 	}
	// 		// }).then(blob=>{
	// 		// 	// const file = new Blob([res.body],{type:'application/pdf'});
	// 		// 	Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// 	// const fileUrl = URL.createObjectURL(blob);
	// 		// 	// window.open(fileUrl);
	// 		// 	// const file = blob;
	// 		// 	// Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_html = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'html',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);
			
	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }

	// 		// axios.post(host+'/report/generate_html',
	// 		// 	{
	// 		// 	name:'carrier',
	// 		// 	file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 	connection:'pgsql',
	// 		// 	parameters:{
	// 		// 		user_no:auth.getUser().userno,
	// 		// 		line_code:scrapLineCode.line_code,
	// 		// 		carrier_code:scrapLineCode.customs_line_code
	// 		// 	},
	// 		// 	json:true,
	// 		// 	responseType:'blob',
	// 		// 	headers:{
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		// 'cache-control':'no-cache',
	// 		// 		'content-type':'application/json'
	// 		// 	}
	// 		// }).then(
	// 		// 	res=>{
	// 		// 		// console.log(res.data);
	// 		// 		var pop = window.open('', scrapLineCode.line_code);
	// 		// 		// window.opener.document.write('<title>'+scrapLineCode.line_code+' 선사 정보'+'</title>');
	// 		// 		pop.document.write(res.data);
	// 		// 		// Filesaver.saveAs(new Blob([res.data],{type:'application/pdf'}), scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_csv = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'csv',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);
	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }

	// 		// axios.post(host+'/report/generate_csv',
	// 		// 	{
	// 		// 	name:'carrier',
	// 		// 	connection:'pgsql',
	// 		// 	file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 	parameters:{
	// 		// 		'user_no':auth.getUser().userno,
	// 		// 		'line_code':scrapLineCode.line_code,
	// 		// 		'carrier_code':scrapLineCode.customs_line_code
	// 		// 	},
	// 		// 	json:true,
	// 		// 	responseType:'blob',
	// 		// 	headers:{
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		// 'cache-control':'no-cache',
	// 		// 		'content-type':'application/json'
	// 		// 	}
	// 		// }).then(
	// 		// 	res=>{
	// 		// 		// console.log(res.data);
	// 		// 		// const pop = window.open('', scrapLineCode.line_code);
	// 		// 		// pop.document.write('<title>'+scrapLineCode.line_code+' 선사 정보'+'</title>');
	// 		// 		// pop.document.write(res.data);
	// 		// 		Filesaver.saveAs(new Blob([res.data],{type:'application/csv;charset=utf-8'}), scrapLineCode.line_code+' 선사 정보'+'.csv');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_docx = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'docx',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);
	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }

			
	// 		// const options = {
	// 		// 	method:'POST',
	// 		// 	file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 	headers:{
	// 		// 		'cache-control':'no-cache',
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		'content-type':'application/json'
	// 		// 	},
	// 		// 	body:JSON.stringify({
	// 		// 		name:'carrier',
	// 		// 		file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 		// sub_file_path:'',
	// 		// 		connection:'pgsql',
	// 		// 		parameters:{
	// 		// 			user_no:auth.getUser().userno,
	// 		// 			line_code:scrapLineCode.line_code,
	// 		// 			carrier_code:scrapLineCode.customs_line_code
	// 		// 		},
	// 		// 		// json:true,
					
	// 		// 		responseType:'blob'
	// 		// 	})
	// 		// }
	// 		// // console.log(options)

	// 		// fetch(
	// 		// 	host+'/report/generate_docx',
	// 		// 	options
	// 		// ).then(res => {
	// 		// 	if(res.ok) {
	// 		// 		return res.blob();
	// 		// 	}
	// 		// }).then(blob=>{
	// 		// 	// const file = new Blob([res.body],{type:'application/pdf'});
	// 		// 	Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.docx');
	// 		// 	// const fileUrl = URL.createObjectURL(blob);
	// 		// 	// window.open(fileUrl);
	// 		// 	// const file = blob;
	// 		// 	// Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_xlsx = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {

	// 		const jasper = {
	// 			file_type : 'xlsx',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);
	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }

	// 		// const options = {
	// 		// 	method:'POST',
	// 		// 	url:host+'/report/generate_xlsx',
	// 		// 	headers:{
	// 		// 		'cache-control':'no-cache',
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		'content-type':'application/json'
	// 		// 	},
	// 		// 	body:JSON.stringify({
	// 		// 		name:'carrier',
	// 		// 		connection:'pgsql',
	// 		// 		file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 		parameters:{
	// 		// 			user_no:auth.getUser().userno,
	// 		// 			line_code:scrapLineCode.line_code,
	// 		// 			carrier_code:scrapLineCode.customs_line_code
	// 		// 		},
	// 		// 		// json:true,
					
	// 		// 		responseType:'blob'
	// 		// 	})
	// 		// }
	// 		// // console.log(options)

	// 		// fetch(
	// 		// 	host+'/report/generate_xlsx',
	// 		// 	options
	// 		// ).then(res => {
	// 		// 	if(res.ok) {
	// 		// 		return res.blob();
	// 		// 	}
	// 		// }).then(blob=>{
	// 		// 	// const file = new Blob([res.body],{type:'application/pdf'});
	// 		// 	Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.xlsx');
	// 		// 	// const fileUrl = URL.createObjectURL(blob);
	// 		// 	// window.open(fileUrl);
	// 		// 	// const file = blob;
	// 		// 	// Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_odt = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'odt',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);
	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }

	// 		// const options = {
	// 		// 	method:'POST',
	// 		// 	url:host+'/report/generate_odt',
	// 		// 	headers:{
	// 		// 		'cache-control':'no-cache',
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		'content-type':'application/json'
	// 		// 	},
	// 		// 	body:JSON.stringify({
	// 		// 		name:'carrier',
	// 		// 		file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 		connection:'pgsql',
	// 		// 		parameters:{
	// 		// 			user_no:auth.getUser().userno,
	// 		// 			line_code:scrapLineCode.line_code,
	// 		// 			carrier_code:scrapLineCode.customs_line_code
	// 		// 		},
	// 		// 		// json:true,
					
	// 		// 		responseType:'blob'
	// 		// 	})
	// 		// }
	// 		// // console.log(options)

	// 		// fetch(
	// 		// 	host+'/report/generate_odt',
	// 		// 	options
	// 		// ).then(res => {
	// 		// 	if(res.ok) {
	// 		// 		return res.blob();
	// 		// 	}
	// 		// }).then(blob=>{
	// 		// 	// const file = new Blob([res.body],{type:'application/pdf'});
	// 		// 	Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.odt');
	// 		// 	// const fileUrl = URL.createObjectURL(blob);
	// 		// 	// window.open(fileUrl);
	// 		// 	// const file = blob;
	// 		// 	// Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_pptx = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'pptx',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);

	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }
	// 		// const options = {
	// 		// 	method:'POST',
	// 		// 	url:host+'/report/generate_pptx',
	// 		// 	headers:{
	// 		// 		'cache-control':'no-cache',
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		'content-type':'application/json'
	// 		// 	},
	// 		// 	body:JSON.stringify({
	// 		// 		name:'carrier',
	// 		// 		file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 		connection:'pgsql',
	// 		// 		parameters:{
	// 		// 			user_no:auth.getUser().userno,
	// 		// 			line_code:scrapLineCode.line_code,
	// 		// 			carrier_code:scrapLineCode.customs_line_code
	// 		// 		},
	// 		// 		// json:true,
					
	// 		// 		responseType:'blob'
	// 		// 	})
	// 		// }
	// 		// // console.log(options)

	// 		// fetch(
	// 		// 	host+'/report/generate_pptx',
	// 		// 	options
	// 		// ).then(res => {
	// 		// 	if(res.ok) {
	// 		// 		return res.blob();
	// 		// 	}
	// 		// }).then(blob=>{
	// 		// 	// const file = new Blob([res.body],{type:'application/pdf'});
	// 		// 	Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pptx');
	// 		// 	// const fileUrl = URL.createObjectURL(blob);
	// 		// 	// window.open(fileUrl);
	// 		// 	// const file = blob;
	// 		// 	// Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }

	//   const onScrapReport_rtf = () => {
	// 	console.log( scrapLineCode );
	// 	if ( lineTableHeader.length < 1 ) {
	// 		alert(" 조회 가능한 선사를 선택하세요. ");
	// 		return false;
	// 	}

		
	// 	if(auth.getUser()) {
	// 		const jasper = {
	// 			file_type : 'rtf',
	// 			file_name : '선사정보',
	// 			file_path : 'SCRAP/PGSQL_1.jrxml',
	// 			connection : 'pgsql',	
	// 			parameters : {
	// 				'user_no':auth.getUser().userno,
	// 				'line_code':scrapLineCode.line_code,
	// 				'carrier_code':scrapLineCode.customs_line_code
	// 			}
	// 		}
	// 		report.getReport(jasper);

	// 		// let host = ''
	// 		// if( window.location.hostname == 'localhost') {
	// 		// 	host = 'http://localhost:5007';
	// 		// } else if ( window.location.hostname == 'dev.plismplus.com' ) {
	// 		// 	host = 'https://dev.plismplus.com';
	// 		// 	// host = 'https://172.19.1.22:5008';
	// 		// } else if ( window.location.hostname == 'www.plismplus.com' ) {
	// 		// 	host = 'https://www.plismplus.com';
	// 		// }

	// 		// const options = {
	// 		// 	method:'POST',
	// 		// 	url:host+'/report/generate_rtf',
	// 		// 	headers:{
	// 		// 		'cache-control':'no-cache',
	// 		// 		// 'Accept':'application/pdf',
	// 		// 		'content-type':'application/json'
	// 		// 	},
	// 		// 	body:JSON.stringify({
	// 		// 		name:'carrier',
	// 		// 		file_path:'/SCRAP/PGSQL_1.jrxml',
	// 		// 		connection:'pgsql',
	// 		// 		parameters:{
	// 		// 			user_no:auth.getUser().userno,
	// 		// 			line_code:scrapLineCode.line_code,
	// 		// 			carrier_code:scrapLineCode.customs_line_code
	// 		// 		},
	// 		// 		// json:true,
					
	// 		// 		responseType:'blob'
	// 		// 	})
	// 		// }
	// 		// // console.log(options)

	// 		// fetch(
	// 		// 	host+'/report/generate_rtf',
	// 		// 	options
	// 		// ).then(res => {
	// 		// 	if(res.ok) {
	// 		// 		return res.blob();
	// 		// 	}
	// 		// }).then(blob=>{
	// 		// 	// const file = new Blob([res.body],{type:'application/pdf'});
	// 		// 	Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.rtf');
	// 		// 	// const fileUrl = URL.createObjectURL(blob);
	// 		// 	// window.open(fileUrl);
	// 		// 	// const file = blob;
	// 		// 	// Filesaver.saveAs(blob, scrapLineCode.line_code+' 선사 정보'+'.pdf');
	// 		// });
	// 	} else {
	// 		props.openLogin();
	// 	}
	//   }
  const classes = useStyles();
  


  // OnBlur Addr 
  const fncOnBlurAddr = (e) => {
	console.log(e.target.value);
	setAddressPrarams(e.target.value);
	setOpen(true);
  }

  // Enter Event Addr
  const fncOnKeyDownAddr = (e) => {
	if( "Enter" === e.key ) {
		console.log(e.target.value );
		setAddressPrarams(e.target.value);
		setOpen(true);
	}
  }

  const openAddrPopup=(params)=>{
	
  }


  return (
	<GridContainer>
		<GridItem xs={12} sm={12} md={12}>
			<Card style={{marginBottom:'0px'}}>
				<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
				</CardHeader>
			<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
				<Grid item xs={12} sm={3} md={12}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options = {scrapLineCodeList}
								// getOptionDisabled={options => options.web_scrap_yn=='N' || options.web_scrap_yn=='D'}
								getOptionLabel = { options => "["+options.customs_line_code+"] "+options.line_code}
								id="scrap_line_code"
								// onChange={(e,data)=>setScrapLineCode(data)}
								onChange={onBlurLineCode}
								noOptionsText="Please Check Line ..."
								// onInputChange={onScrapLineCode}
								// onBlur={onBlurLineCode}
								// getOptionSelected={onBlurLineCode}
								renderInput={params => (
								<TextField {...params} id="text_line" label="LINE"  //variant="outlined" size="small" 
								fullWidth />
								)}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<CalendarBox
								labelText ="SCRAPING DATE"
								id="scrapDate"
								format="yyyy-MM-dd"
								setValue={scrapDate}
								onChangeValue={date => setScrapDate(date)}
								formControlProps={{fullWidth: true}}/>
						</Grid>
						<Grid item xs={12} md={4}>
						<Button color="info" onClick = {chainPortal}  style={{paddingTop:'11px',width:'35%'}}>TEST</Button>
							<Button color="info" onClick = {onSubmit}  style={{paddingTop:'11px',width:'35%'}}>Search</Button>
							{/* <Report
								// system_id
								system_id='plismplus'
								// system_id
								file_id='PGSQL_1.jrxml'
								// japser file경로
								file_path='SCRAP'
								// download 당시 파일명
								file_name='선사정보'
								// jasper report DB 접속 정보
								connect='pgsql'
								// user_no
								user_id={props.userData.userno}
								// jasper report DB 쿼리 변수
								parameters={{
									'user_no':props.userData.userno,
									'line_code':scrapLineCode.line_code,
									'carrier_code':scrapLineCode.customs_line_code
								}}
								// parameters 에 정의된 변수 중 필수값 체크
								// key(필수값):value(안내문구)
								// 값이 null 이거나 undefined 또는 '' 이면 체크됨
								validation={{
									'line_code':'선사를 선택해주시기 바랍니다.'
								}}></Report> */}
						</Grid>
					</Grid>
				</Grid>
			</CardBody>
			<CardBody>
				{/* 주소검색 */}
				<TextField id="addr" 
						label="주소입력"
						placeholder="예) 케이엘넷"
						onBlur={fncOnBlurAddr}
						onKeyDown={fncOnKeyDownAddr}
						/>
				<Divider/>
				<TextField value={roadAddress} fullWidth></TextField>
				<TextField value={jibunAddress} fullWidth></TextField>
			</CardBody>
		</Card>
		</GridItem>
		<GridItem xs={12}>
		<Card style={{marginBottom:'0px'}}>
		<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
		<ScrapResultTable 
			tableHeaderColor="info"
			tableHead={lineTableHeader}
			tableData={scrapingLineResultData}
			tableRownum={numCnt}
			tableTotalPage={totPage}
			onClickHandle ={handleAddRow}
			selectedRow={selectedRow}
		/>
		</CardBody>
		</Card>
		</GridItem>
		<LocalAddress
			open={open}
			params={addressPrarams}
			onClose={()=> setOpen(!open)}
			setReturnAddress={setReturnAddress}
			setOpen={setOpen}/>
	</GridContainer>
	
  );
}
//))
//export default ScrapResultList;



class TableRows extends React.Component {
	render() {
		const { data } = this.props;
		return [
			<TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.web_seq}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.line_code}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.bl_no}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_date}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_code}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_name}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_date}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_code}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_name}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.eta}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.eta_time}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.etd}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.etd_time}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.ts_yn}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.insert_date}</TableCell>
			</TableRow>
		];
	}
}

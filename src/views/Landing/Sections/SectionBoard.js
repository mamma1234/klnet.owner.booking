import React,{ useState, useEffect } from "react";
import { Link  } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Board from "components/Board/Board.js"
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CardContent, TextField } from "@material-ui/core";
// board table page
//import Table from 'components/Table/TableBoardPaging.js';

//import styles from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
//import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/ArtTrack";
import Tooltip from "@material-ui/core/Tooltip";
import {
		Box,	    
		Dialog,
	    DialogContent,
	    DialogContentText,
	    Slide
    } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chat from "@material-ui/icons/Chat";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import table from "assets/jss/material-dashboard-pro-react/components/tableStyle";

const tableStyles = makeStyles(table);

const useStyles = makeStyles(styles);

const useRowStyles = makeStyles({
	  root: {
	    '& > *': {
	      borderBottom: 'unset',
	    },
	  },
	});

const Transition = React.forwardRef(function Transition(props,ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function BoardTest(props) {

    const {data,tableRownum,totPage } = props;
    //console.log("data:",data);
    const classes = useStyles();
    
    const handleAddFunction = () => {
        props.onClickHandle();
      }
    
    return(
    	  <GridItem xs={12} sm={12} md={12} >
			  <GridContainer justify="space-between" >
			  	 <GridItem xs={4} sm={4} md={4} >
			  	 	<h4 style={{textAlignLast:'left',color:'black',marginBottom:'0'}}><Chat style={{color:'#00acc1'}}>content_copy</Chat> 공지사항</h4>
			  	 </GridItem>
			  	 <GridItem xs={3} sm={2} md={2} style={{marginTop:'15px'}}>
					  	<Tooltip
					        id="tooltip-top"
					        title="더보기"
					        placement="bottom"
					        classes={{ tooltip: classes.tooltip }}
					     >
					  	<Link to="/svc/board">
					  		<PlaylistAdd className={classes.underChartIcons} style={{color:'black'}}/>더보기
		            	</Link>
				     </Tooltip>
			  	   </GridItem>
			   </GridContainer>
				  	<CollapsibleTable
			 		   tableHeaderColor="info"
				       tableHead={["title","insert_date"]}
				       tableData={data} 
				    />
		 </GridItem>
    );
}

function Row(props) {
	  const { row } = props;
	  const [open, setOpen] = React.useState(false);
	  const [detailData, setDetailData] = React.useState([]);
	  const classes = tableStyles();
	  
	  const handleOpen =(id)=>{

		  axios.post("/api/getBoardDetail",{board_id:id})
		  .then(setDetailData([]))
	      .then(res => setDetailData(res.data[0]));
		  setOpen(!open);

	  }

	  return (
	    <React.Fragment>
	      <TableRow className={classes.tableRow} onClick={(event) => handleOpen(row.board_id)} >
	        <TableCell style={{paddingTop:'3px',paddingBottom:'3px',borderBottom:'unset'}}>{row.title}</TableCell>
	        <TableCell style={{paddingTop:'3px',paddingBottom:'3px',borderBottom:'unset'}}>{row.insert_date2}</TableCell>
	      </TableRow>
		      <Dialog
		        open={open}
		        //TransitionComponent={Transition}
		        onClose={()=> setOpen(!open)}
		      >
		    	<DialogContent style={{paddingLeft:'10px',paddingRight:'10px'}}>
		            <Box margin={1}>
			            <div className={classes.tableResponsive}>
			            	<Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}} className={classes.table}>
					            <TableBody>
						                <TableRow>
						                  <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px',width:'15%'}}>제목</TableCell>
						                  <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}} colSpan={3}>{detailData.title}</TableCell> 
						                </TableRow>
						                <TableRow>
							                <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>등록자</TableCell>
							                <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}}>{detailData.author_name}</TableCell>
							                <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>등록일</TableCell>
							                <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}}>{detailData.insert_date}</TableCell>
							            </TableRow>
						              	<TableRow>
						              		<TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>내용</TableCell>
						              		<TableCell style={{paddingTop:'3px',paddingBottom:'3px'}} colSpan={3}>
						              		{
						              			String(detailData.content).split('\n').map( (line, index) => {
						                          return (<span key={index}>{line}<br/></span>)
						                        })
						                      }
						              		</TableCell>
						              	</TableRow>
					            </TableBody>
			            	</Table>
			        	</div>
		            </Box>
		    	</DialogContent>
		    </Dialog>
	    </React.Fragment>
	  );
	}

	function CollapsibleTable(props) {
	  const classes = tableStyles();
	  const { tableHead, tableData, tableHeaderColor, colSpan } = props; // eslint-disable-line no-unused-vars
		 
		 
	  return (
			    <div className={classes.tableResponsive} style={{borderTop:'2px solid #00acc1',paddingTop:'3px'}}>
			      <Table className={classes.table}>
			      {tableData.length <= 0?
		              <TableHead style={{padding:'5px',backgroundColor:'#f2fefd'}} className={classes[tableHeaderColor + "TableHeader"]}>
		                <TableRow style={{borderBottomStyle:'solid',borderBottomColor:'#00bcd4'}} className={classes.tableRow + " " + classes.tableRowHead}>
		    	            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} colSpan={2}>No Data</TableCell> 
		                </TableRow>
		              </TableHead>:
			        <TableBody>
			        {tableData.map((prop, key) => {
			            return (
			              <Row key={key} row={prop} />
			            );
			          })}
			        </TableBody>}
	      </Table>
	      </div>
	  );
	}

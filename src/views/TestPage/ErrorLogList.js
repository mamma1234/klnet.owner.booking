import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import {TextField, Table, TableHead, TableRow, TableBody, TableCell, TableFooter, Paper, Grid, Icon} from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// other import
import axios from 'axios';
//import moment from 'moment';
import CardIcon from "components/Card/CardIcon.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding:'15px',
    width: '100%',
    height: '80vh',
    marginBottom: theme.spacing(2),
    overflow:'scroll'
  },gridContainer: {
    padding:'15px'
  }
}))



export default function ErrorLogList(props) {
  const [seq,setSeq] = useState("");
  const [Num,setNum] = useState(1);
  const [errorLogData, setErrorLogData] = useState([]);
  const [eDate,setEDate] = useState(new Date());
  const setStartDate = new Date();
  const [sDate,setSDate] = useState(setStartDate.setDate(setStartDate.getDate()-30));
  const [openJoin,setOpenJoin] = useState(false);
  
  const onSubmit = (param) => {
   // if(auth.getUser()){
      setNum(param);
      axios.post("/com/getErrorLogList",{
        seq:seq,
        startDate:moment(sDate).format('YYYYMMDD'),
        endDate:moment(eDate).format('YYYYMMDD'),
        num:param
      })
      .then(res => setErrorLogData(res.data))
      .catch(err => {
          if(err.response.status === 403 || err.response.status === 401) {
              setOpenJoin(true);
          }
      });
   // }else {
   //   props.openLogin();
   // }      

  }
  const onMore = (param) => {
   // if(auth.getUser()){
      if(Num != errorLogData[0].tot_page) {
          //page ++
          setNum(param);
          axios.post("/com/getErrorLogList",{
              seq:seq,
              startDate:moment(sDate).format('YYYYMMDD'),
              endDate:moment(eDate).format('YYYYMMDD'),
              num:param
          })
          .then(res => setErrorLogData([...errorLogData,...res.data]))
          .catch(err => {
              if(err.response.status === 403 || err.response.status === 401) {
                  setOpenJoin(true);
              }
          });
      }
   // }else {
   //   props.openLogin();
   // }      
}


  const classes = styles();
  
  return (
    <GridContainer className={classes.gridContainer}>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>Error Log Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} md={3}>
							 <CalendarBox
					        			labelText ="LOG DATE FROM"
					      				id="fromDate"
					      				format="yyyy-MM-dd"
					      				setValue={sDate}
					        			onChangeValue={date => setSDate(date)}
					        			formControlProps={{fullWidth: true}}
					        />
			     		</Grid>	
			     		<Grid item xs={12} md={3}>
						 <CalendarBox
					        			labelText ="LOG DATE TO"
					        			id="toDate"
					        			format="yyyy-MM-dd"
					        			setValue={eDate}
					        		    onChangeValue={
											date => setEDate(date)
										}
					        			formControlProps={{fullWidth: true}}
					        		/>
						 </Grid>
						 <Grid item xs={12} md={3}>
						 <TextField id="seq" label="SEQ" onChange={event => setSeq(event.target.value)} value={seq} fullWidth />
						 </Grid>
						<Grid item xs={12} md={3} >
							<Button color="info" onClick = {() => onSubmit(1)}  
							fullWidth>Search</Button>							
						</Grid>
		      		</Grid>
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12}>
         <Paper className={classes.paper}>
              <Table>
              
                  <TableHead style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>Error Date</TableCell>
                        <TableCell>Seq</TableCell>
                        <TableCell>Sql State</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Detail</TableCell>
                        <TableCell>Hint</TableCell>
                        <TableCell>Context</TableCell>
                        <TableCell>Name</TableCell>
                      </TableRow>               
                  </TableHead>

                  <TableBody>
                      {
                          errorLogData.map((element,key) => {
                              return(
                                <TableRow>    
                                    <TableCell>{element.error_date}</TableCell>
                                    <TableCell>{element.seq}</TableCell>
                                    <TableCell>{element.sql_state}</TableCell>
                                    <TableCell>{element.message}</TableCell>
                                    <TableCell>{element.detail}</TableCell>
                                    <TableCell>{element.hint}</TableCell>
                                    <TableCell>{element.context}</TableCell>
                                    <TableCell>{element.name}</TableCell>
                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                      errorLogData.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                            <Button
                                color="info"
                                onClick={() => onMore(Num + 1)}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{errorLogData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
        </Paper>
		</GridItem>     
    </GridContainer>
  );
}




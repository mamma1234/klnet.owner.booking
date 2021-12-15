import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {TextField,FormControl,InputLabel,Select,Grid, Icon} from '@material-ui/core';
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
export default function SearchBox(props) {
  const { fromDate  ,toDate  ,setFromDate  ,setToDate  ,mode  ,userNo  ,setUserNo  
        ,srNo  ,setSrNo  ,srDate  ,setSrDate  ,onSubmit  ,setMode} =props;

   const classes = styles();
  
  return(
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md ={4}> 
                        <CalendarBox
                          labelText ="From"
                          id="fromDate"
                          variant="inline"
                          format="yyyy-MM-dd"
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
                        <Button  size="lg" color="info" onClick={() => onSubmit()} endIcon={<SearchIcon/>} fullWidth>Search</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>  
    )
}
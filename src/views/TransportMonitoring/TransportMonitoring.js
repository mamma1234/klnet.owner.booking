import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import {Grid,Toolbar} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Card,FormControl,TextField,CardHeader, Table,TableCell, TableBody, TableRow,TableHead,TableContainer,Tooltip} from "@material-ui/core";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
//import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
//import Badge from "components/Badge/Badge.js";
// import Table from "views/Dashboard/ContainerTable/Table.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Button from "components/CustomButtons/Button.js";
// import ClearIcon from "@material-ui/icons/HighlightOff";
import Icon from '@material-ui/core/Icon';
import {
    //Backup as BackupIcon,
    //Stars as StarIcon,
    Search as SearchIcon,
    //Refresh as RefreshIcon,
    //DeleteForever as DeleteForeverIcon,
    Clear as ClearIcon 
  } from "@material-ui/icons";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";


import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
export default function TransportMonitoring(props) {
const classes = useStyles();
const tableData = [1,2,3,4,5,6,7]; //임의데이터
const RegularMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
        defaultOptions={{
          scrollwheel: false
        }}
      >
        <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
      </GoogleMap>
    ))
  );
return(
    <div style={{paddingLeft:'3%',paddingRight:'3%'}}>
    {/* <Toolbar style={{boxShadow:'unset'}}> */}
        {/* <div style={{flex:'1' ,marginRight:'10px'}}> */}
        {/* <GridContainer justify="space-between" > */}
        <GridContainer justify="space-between" style={{marginBottom:'10px'}}>
            <GridItem md={8}>
                <GridContainer >
                    <GridItem  xs={6} md={3}>
                        <TextField  fullWidth id="shipperID" label="화주ID"/>
                    </GridItem>
                    <GridItem xs={6} md={3}>
                        <FormControl fullWidth style={{marginBottom:'10px'}}>
                            <CalendarBox
                            labelText ="터미널 반출일자"
                            id="sr_date"
                            format="yyyy-MM-dd"
                            setValue={new Date()}
                            autoOk
                            //onChangeValue={date => setToDate(date)}
                            formControlProps={{fullWidth: true}} 
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem xs={6} md={3}>
                        <FormControl fullWidth style={{marginBottom:'10px'}}>
                            <CalendarBox
                            labelText ="터미널 반입일자"
                            id="sr_date"
                            format="yyyy-MM-dd"
                            setValue={new Date()}
                            autoOk
                            //onChangeValue={date => setToDate(date)}
                            formControlProps={{fullWidth: true}} 
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem xs={6} md={3}>
                        <TextField fullWidth id="cntrNo" label="컨테이너번호"/>
                    </GridItem>
                </GridContainer>
            </GridItem>
        {/* </div> */}
            <GridItem  style={{textAlign:'end', display:'blockInline'}} xs={12} md={4} >
                {/* <SearchButton endIcon={<SearchIcon></SearchIcon>} color="info" fullWidth onClick={onSubmit} >Search</SearchButton> */}
                <Button  color="info" endIcon={<SearchIcon/>} >조회</Button>
                <Button  color="info" endIcon={<ClearIcon/>}>초기화</Button> 
            </GridItem>
        </GridContainer> 
    {/* </Toolbar> */}
    <GridContainer  justify ="center">
        <GridItem xs={12} sm={12} md={6} style={{marginBottom: '25px'}} >
            <h4 className={classes.cardIconTitle}>
            컨테이너 리스트
            </h4>	            
            <Card style={{marginTop:'15px',marginBottom:'0'}} >
                <CardHeader 
                style={{paddingLeft:'5px',paddingBottom:'0',paddingTop:'0'}}
                // title={<Typography variant='h5'>
                //     <GridContainer>
                //     <GridItem xs={4} sm={4} style={{marginTop:'8px'}}>
                //     컨테이너 리스트
                //     </GridItem></GridContainer></Typography>}
                >
                    {/* <Badge color="info">IMPORT</Badge> */}
                </CardHeader>
                <CardBody style={{padding:'1%'}}>
                {/* <div className={classes.tableResponsive}> */}
                <TableContainer className={classes.tablecontainer}>
                    <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7' }}>
                        <TableHead color='info'>
                            <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
                                    <TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>NO</TableCell>
                                    <TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>수출입</TableCell>
                                    <TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>컨넘버</TableCell>
                                    <TableCell  colSpan={4} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송현황</TableCell>
                                    <TableCell  colSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사</TableCell>
                            </TableRow>
                            <TableRow >
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>현재위치</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송상태</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>차량번호(ID)</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>기사 연락처</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사명</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사 연락처</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((prop, key) => {
                                return (
                                <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>{key+1}</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data</TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* </div> */}
                </CardBody>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <h4 className={classes.cardIconTitle}>내역</h4>
            <Card style={{marginTop:'16px', marginBottom:'40px'}}>
            <CardBody style={{padding:'1%'}} >
                {/* <div className={classes.tableResponsive}> */}
                <TableContainer className={classes.tablecontainer}>
                    <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7' }}>
                        <TableHead color='info'>
                            <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>NO</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>구분</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>구분상세</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>일시</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>차량번호</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>차량ID</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>기사연락처</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>씰 사진</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사 연락처</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((prop, key) => {
                                return (
                                <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>{key+1}</TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
                                    <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>
                                        <Tooltip title="add infomation"><Icon style={{color:'#00acc1',paddingTop:'1px'}}>add_circle</Icon></Tooltip>
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* </div> */}
                </CardBody>
            </Card>
            <h4 className={classes.cardIconTitle}>현재 위치</h4>
            <Card style={{marginTop:'16px',marginBottom:'55px'}}>
                <CardBody >
                    <RegularMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7fmL2oueevYipMnjdfYGeOjZLyF1y6Xw&language=en&region=KR"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={
                        <div
                        style={{
                            height: `280px`,
                            borderRadius: "6px",
                            overflow: "hidden"
                        }}
                        />
                    }
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                </CardBody>
            </Card>
            {/* <Card >
                <CardBody style={{paddingRight:'0'}}>
                    <Badge color="info" style={{marginTop:'15px'}}>IMPORT</Badge>
                    <GridItem xs={12} sm={12} md={12} style={{marginBottom:'15px'}}>
                        <p style={{marginTop:'20px'}}>로그인후 확인 가능합니다.</p>
                    </GridItem>
                    <Badge color="info" >EXPORT</Badge>
                    <GridItem xs={12} sm={12} md={12} style={{marginBottom:'5px'}}>
                        <p style={{marginTop:'20px'}}>로그인후 확인 가능합니다.</p>
                    </GridItem>
                </CardBody>
            </Card> */}
        </GridItem>
    </GridContainer>
    </div>
)

}
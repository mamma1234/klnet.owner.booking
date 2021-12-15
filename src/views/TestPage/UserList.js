import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {TextField, Table, TableHead, TableRow, TableBody, TableCell, TableFooter, Tooltip, Paper, Grid, Icon} from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import CardIcon from "components/Card/CardIcon.js";

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



export default function UserList(props) {
  const classes = styles();
  const [userno,setUserno] = useState("");
  const [Num,setNum] = useState(1);
  const [userData, setUserData] = useState([]);
  const [setOpenJoin] = useState(false);
  
  
  
  const onSubmit = (param) => {
    if(props.userData) {
      setNum(1);
      axios.post("/com/getUserData",{
          userno:userno,
          num:param
      })
      .then(res => {setUserData(res.data);console.log(res.data)})
      .catch(err => {
          if(err.response.status === 403 || err.response.status === 401) {
              setOpenJoin(true);
          }
      });
    } else {
      props.isLogOut();
      props.openLogin();
    }
  }
  const onMore = (param) => {
  //  if(auth.getUser()) {
        
      if(Num !== userData[0].tot_page) {
          //page ++
          setNum(param);

          axios.post("/com/getUserData",{
              userno:userno,
              num:param
          })
          .then(res => setUserData([...userData,...res.data]))
          .catch(err => {
              if(err.response.status === 403 || err.response.status === 401) {
                  setOpenJoin(true);
              }
          });
      }
  //  }else {
  //    auth.logOut();
   //   props.openLogin();
  //  }

  }
  return (
    <div>
    <GridContainer className={classes.gridContainer}>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'54px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>User Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
			     		
						 <Grid item xs={12} md={3}>
						 <TextField id="userno" label="User no" onChange={event => setUserno(event.target.value)} value={userno} fullWidth />
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
      </GridContainer>
        <Paper className={classes.paper}>
              <Table>
                  <TableHead style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>User no</TableCell>
                        <TableCell>User type</TableCell>
                        <TableCell>User id</TableCell>
                        <TableCell>User Email</TableCell>
                        <TableCell>User pw</TableCell>
                        <TableCell>Insert Date</TableCell>
                        <TableCell>User Phone</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Svc Use yn</TableCell>
                        <TableCell>Del yn</TableCell>
                        <TableCell>Social name</TableCell>
                        <TableCell>kakao access token</TableCell>
                        <TableCell>svc login date</TableCell>
                        <TableCell>social link yn</TableCell>
                        <TableCell>social link date</TableCell>
                        <TableCell>pwd modify date</TableCell>
                        <TableCell>pwd fail cnt</TableCell>
                        <TableCell>last ip addr</TableCell>
                        <TableCell>pc cnt</TableCell>
                        <TableCell>mobile cnt</TableCell>
                        <TableCell>user company</TableCell>
                        <TableCell>token local</TableCell>
                        <TableCell>local login date</TableCell>
                        <TableCell>kakao id</TableCell>
                        <TableCell>token kakao</TableCell>
                        <TableCell>kakao login date</TableCell>
                        <TableCell>naver id</TableCell>
                        <TableCell>token naver</TableCell>
                        <TableCell>naver login date</TableCell>
                        <TableCell>face id</TableCell>
                        <TableCell>token face</TableCell>
                        <TableCell>face login date</TableCell>
                        <TableCell>google id</TableCell>
                        <TableCell>token google</TableCell>
                        <TableCell>google login date</TableCell>
                      </TableRow>               
                  </TableHead>

                  <TableBody>
                      {
                          userData.map((element,key) => {
                              return(
                                <TableRow key={element.user_no}>    
                                    <TableCell>{element.user_no}</TableCell>
                                    <TableCell>{element.user_type}</TableCell>
                                    <TableCell>{element.local_id}</TableCell>
                                    <TableCell>{element.user_email}</TableCell>
                                    <TableCell><Tooltip title={element.local_pw} arrow><span>{element.local_pw!=null?element.local_pw.slice(0,7)+'....':element.local_pw}</span></Tooltip></TableCell>
                                    <TableCell>{element.insert_date}</TableCell>
                                    <TableCell>{element.user_phone}</TableCell>
                                    <TableCell>{element.user_name}</TableCell>
                                    <TableCell>{element.svc_use_yn}</TableCell>
                                    <TableCell>{element.del_yn}</TableCell>
                                    <TableCell>{element.social_name}</TableCell>
                                    <TableCell>{element.kakao_access_token}</TableCell>
                                    <TableCell>{element.svc_login_date}</TableCell>
                                    <TableCell>{element.social_link_yn}</TableCell>
                                    <TableCell>{element.social_link_date}</TableCell>
                                    <TableCell>{element.pwd_modify_date}</TableCell>
                                    <TableCell>{element.pwd_fail_cnt}</TableCell>
                                    <TableCell>{element.last_ip_addr}</TableCell>
                                    <TableCell>{element.pc_cnt}</TableCell>
                                    <TableCell>{element.mobile_cnt}</TableCell>
                                    <TableCell>{element.user_company}</TableCell>
                                    <TableCell>{element.token_local}</TableCell>
                                    <TableCell>{element.local_login_date}</TableCell>
                                    <TableCell>{element.kakao_id}</TableCell>
                                    <TableCell>{element.token_kakao}</TableCell>
                                    <TableCell>{element.kakao_login_date}</TableCell>
                                    <TableCell>{element.naver_id}</TableCell>
                                    <TableCell>{element.token_naver}</TableCell>
                                    <TableCell>{element.naver_login_date}</TableCell>
                                    <TableCell>{element.face_id}</TableCell>
                                    <TableCell>{element.token_face}</TableCell>
                                    <TableCell>{element.face_login_date}</TableCell>
                                    <TableCell>{element.google_id}</TableCell>
                                    <TableCell>{element.token_google}</TableCell>
                                    <TableCell>{element.google_login_date}</TableCell>

                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                       userData.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{paddingLeft: '20px',paddingTop:'0',paddingBottom:'0'}} colSpan={34}>
                            <Button
                                color="info"
                                onClick={() => onMore(Num + 1)}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{userData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
              
	      	  
    </Paper>
    </div>
  );
}




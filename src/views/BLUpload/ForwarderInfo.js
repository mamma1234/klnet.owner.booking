import React,{useState,useEffect} from "react";

import axios from 'axios';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import {Icon} from "@material-ui/core";

export default function TableList(props) {
  const [selectData,setSelectData] = useState([]);
  const [forwarderName, setForwarderName] = useState("");
  const [forwarderEName, setForwarderEName] = useState("");

  useEffect(() => {
    handleForwarderSearch();
    
    return () => {
    
    };
  }, []);
  
  
  const handleForwarderSearch = () => {
    if(props.userData) {
      axios.post("/com/getForwardInfo",{knm:forwarderName, enm:forwarderEName}).then(
        res => {
          if(res.statusText==="OK") {
            setSelectData(res.data);
            if(res.data.length === 0) {
              props.returnMessage('조회결과가 없습니다.','error');
            }else {
              props.returnMessage('조회가 완료되었습니다.','success');
            }
          }else {
            props.returnMessage('조회할 수 없습니다. 잠시 후 다시 시도해주세요.','error');
          }
        }).catch(err => {
          if(err.response.status === 403||err.response.status === 401) {
            props.returnMessage('로그인 정보가 없습니다.','error');
          }
      });
    }else {
      props.returnMessage('로그인 정보가 없습니다..','error');
    }
  }

  return (
    <Card style={{maxWidth:'700px'}}>
 		  <CardHeader color="info" stats icon >
		    <CardIcon color="info" style={{height:'55px'}}>
			    <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>FORWARDER INFO</h4>
      </CardHeader>
      <CardBody>
        <GridItem>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <TextField 
                id="forwarderKName" 
                label="Korean Name"
                onChange={event => setForwarderName(event.target.value)}
                value={forwarderName} />
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <TextField 
                id="forwarderEName" 
                label="English Name"
                onChange={event => setForwarderEName(event.target.value)}
                value={forwarderEName} />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Button onClick={handleForwarderSearch} color="info">SEARCH</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Table
              tableHeaderColor="info"
              tableHead={["Code", "Korean Forwarder Name","English Forwarder Name", "Master"]}
              tableData={selectData}/>
        </GridItem>
      </CardBody>
    </Card>
  );
}

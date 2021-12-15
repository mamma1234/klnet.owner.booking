import React,{useState, useEffect} from "react";
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
import axios from 'axios';

export default function TableList(props) {
  const [selectData,setSelectData] = useState([]);
  const [carrierName, setCarrierName] = useState("");
  const [carrierEName, setCarrierEName] = useState("");
  useEffect(() => {
    handleCarrierSearch();
    return () => {
    };
  }, []);
  
  
  const handleCarrierSearch = () => {
    if(props.userData){
      axios.post("/com/getCarrierInfo",{knm:carrierName, enm:carrierEName}).then(
        res => {
          if(res.statusText==="OK"){
            setSelectData(res.data);
            if(res.data.length===0){
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
      props.returnMessage('로그인 정보가 없습니다.','error');
    }
  }

  return (
    <Card style={{maxWidth:'700px'}}>
 		  <CardHeader color="info" stats icon >
		    <CardIcon color="info" style={{height:'55px'}}>
			    <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>CARRIER INFO</h4>
      </CardHeader>
      <CardBody>
        <GridItem>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <TextField 
                id="carrierKName" 
                label="Korean Name"
                onChange={event => setCarrierName(event.target.value)}
                value={carrierName} />
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <TextField 
                id="carrierEName" 
                label="English Name"
                onChange={event => setCarrierEName(event.target.value)}
                value={carrierEName} />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Button onClick={handleCarrierSearch} color="info">SEARCH</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Table
            tableHeaderColor="info"
            tableHead={["Customs Code", "Line Code", "Korean Carrier Name","English Carrier Name"]}
            tableData={selectData}/>
        </GridItem>
      </CardBody>
    </Card>
  );
}

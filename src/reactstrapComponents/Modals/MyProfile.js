/*eslint-disable*/
import React,{useState,useEffect} from "react";
// reactstrap components
import {
  CardBody,Row,Col,Button,Badge
} from "reactstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import * as validation from 'components/common/validation.js';
export default function MyProfile(props) {


    const styles={
        threeTag:{
            fontSize:'20px',
            fontWeight:'bold'
        }
    }



    const [data,setData] = useState([]);
    const [myInfo, setMyInfo] = useState(null);
    useEffect(() => {
// console.log(props.user)
        if(props.user.klnet_id) {
            axios.post("/com/getCompanyInfo",{klnetId:props.user.klnet_id}).then(
                res=> {
                    if(res.statusText==="OK") {
                        if(res.data.length > 0) {
                            // console.log(res.data[0])
                            setData(res.data[0]);
                        }else {
                            setData([]);
                        }
                    }else {
                        setData([]);
                    }
                }
            )
        }

        return function cleanup() {
          console.log('cleanup');
    
        };
      },[]);

    return (
        <>
        {props.user &&
            <Col>
                <Row className="mw-100 text-black bg-white">
                    <CardBody>
                        <Col>
                            <Row className="border-bottom mt-2">
                                <Col xl="6" sm="6" md="6" lg="6" xl="6" className="text-left">
                                    <span style={styles.threeTag}>내 정보</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row className="pb-3 pt-3">
                                        <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                            <span style={{fontSize:'17px',fontWeight:'bold'}}className="card-category pb-1">{props.user.user_name}</span>
                                        </Col>
                                        <Col xl="8" sm="8" md="8" lg="8" xl="8">
                                            <span style={{fontSize:'17px'}} className="card-category pb-1">{props.user.local_id}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row className="pb-3">
                                        <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                            <span style={{fontSize:'17px'}}className="card-category pb-1">이메일</span>
                                        </Col>
                                        <Col xl="8" sm="8" md="8" lg="8" xl="8">
                                            <span style={{fontSize:'17px'}} className="card-category pb-1">{props.user.user_email.toUpperCase()}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>   
                            {/* <Row>
                                <Col>
                                    <Row className="pb-3">
                                        <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                            <span style={{fontSize:'17px'}}className="card-category pb-1">연락처</span>
                                        </Col>
                                        <Col xl="8" sm="8" md="8" lg="8" xl="8">
                                            <span style={{fontSize:'17px'}} className="card-category pb-1">{validation.TELFormatter(props.user.user_phone)}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col className="text-center border-bottom">
                                    <Link to={{pathname: `/usersetting`,}}>
                                        <Button outline className="btn-rotate btn-round mb-2" style={{color:'black'}}><i className="fa fa-cog text-black"/><span className="text-black">Account Setting</span></Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12" sm="12" md="12" lg="12" xl="12" className="text-left">
                                    {/* <Link to={{pathname: `/setting`,}}> */}
                                        <span style={styles.threeTag}>내 업체 및 담당업무</span>
                                    {/* </Link> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="ml-0 mr-0 pl-2 pr-2">
                                    {props.user.klnet_id==="KLDUMY01"?(
                                    <Button style={{width:'100%', color:'black'}} color="link" outline onClick={()=>props.openCompany()}>
                                        <Row className="pb-2">
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <span style={{fontSize:"18px"}}>업체 등록이 필요합니다.</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Button>
                                    ):(
                                    <Link to={{pathname: `/setting`,state:data}}>
                                        <Button style={{width:'100%', color:'black'}} color="link" outline>
                                            <Row className="pb-2">
                                                <Col xl="3" sm="3" md="3" lg="3" xl="3" className="d-flex align-items-center justify-content-center">
                                                    <Badge>{data.KLNET_ID}</Badge>
                                                </Col>
                                                <Col xl="7" sm="7" md="7" lg="7" xl="7">
                                                    <Row>
                                                        <Col>
                                                            <span style={{fontSize:"18px"}}>{data.CNAME_KR}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Button>
                                    </Link>  
                                    )}
                                    
                                </Col>
                                <Button className="text-left"style={{width:'100%', color:'black'}} color="link" onClick={()=>props.openCompany()} ><i className="fa fa-user-plus"></i><span>업체 검색</span></Button>
                            </Row>
                        </Col>
                    </CardBody>
                </Row>
            </Col>}
        </>
    );
}


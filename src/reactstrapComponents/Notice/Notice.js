import React,{useEffect,useState} from "react";
import {
   ListGroup, ListGroupItem, Badge, Col, Row
  } from "reactstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import CardBody from "reactstrap/lib/CardBody";
export default function NoticeMain(props) {
    const [noticeList, setNoticeList] = useState([]);

    useEffect(()=> {
        axios.post("/api/notice",{service:'weidong', count:3, url:'main'}).then(
            res=> {
                if(res.statusText ==="OK") {
                    if(res.data.length > 0) {
                        setNoticeList(res.data);
                    }
                }
            }
        )
    },[])
  return (
    <>
        {
            noticeList.length > 0 ?(
                <ListGroup flush>
                    {noticeList.map((value,index) => {
                        return (
                            <Link 
                                key={index} 
                                to={{
                                pathname : `/notice`,
                                state : {param : value}}}>
                                <ListGroupItem style={{padding:2}} key={index} action>{value.new_notice==='Y'&&<Badge pill color="warning">NEW</Badge>}&nbsp;{value.title}</ListGroupItem>
                            </Link>
                        )
                    })}
                </ListGroup>
            ):(
                <Col>
                    <Row>
                        <Col>
                            <CardBody>
                                <h4>최근 게시물이 존재하지 않습니다.</h4>
                            </CardBody>
                        </Col>
                    </Row>
                </Col>
            )
        }
    </>
  );
}



import React,{useEffect,useState} from "react";
import {Col, Row,Button
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
            noticeList.length > 0 ? noticeList.map((value,key,index) => {
                return (
                    <Col key={key} md="4" className="mr-auto">
                        <div className="info info-horizontal p-0">
                        <div className="description">
                            <h4 className="info-title text-muted">{value.title}</h4>
                            <div dangerouslySetInnerHTML={{__html:value.content}}/>
                            <Link 
                                    key={index} 
                                    to={{
                                    pathname : `/notice`,
                                    state : {param : value}}}>
                            <Button
                            className="btn-link"
                            color="info"
                            >
                            See more
                            </Button></Link>
                        </div>
                        </div>
                    </Col>)
            }):(
                <Col style={{textAlignLast:'center'}}>
                    <Row>
                        <Col>
                            <CardBody>
                                <h4 className="text-muted">최근 게시물이 존재하지 않습니다.</h4>
                            </CardBody>
                        </Col>
                    </Row>
                </Col>
            )
        }
    </>
  );
}



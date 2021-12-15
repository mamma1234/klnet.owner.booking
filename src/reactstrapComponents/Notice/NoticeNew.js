import React from "react";
import {
   Row, Col, Container, CardBody
  } from "reactstrap";
import Notice from "components/Notice/NoticeDetail"
// reactstrap components

// core components
// import { Container } from "reactstrap";
export default function NoticeMain() {
  
  return (
    <>
      <div style ={{marginTop:'1%'}}>
        <Container>
          <Col>
            <Row>
              <Col xl="12" >
                <div>
                  <CardBody className="pt-0">
                    <Col>
                      <Row>
                        <Col xl="12" style={{textAlignLast:'end'}}>
                          <i id="noti" style={{cursor:'pointer'}} className="fa fa-plus-square-o fa-2x" aria-hidden="true" onClick={()=> {window.location.href="/notice"}}/>
                        </Col>
                      </Row>
                      <Row>
                        <Notice/>  
                      </Row>
                    </Col>
                  </CardBody>
                </div>
              </Col>
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
}



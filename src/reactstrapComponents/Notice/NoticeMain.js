import React,{useEffect,useState} from "react";
import {
   Row, Col, Container,Card, CardBody, Button
  } from "reactstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import CardHeader from "reactstrap/lib/CardHeader";
import Notice from "components/Notice/Notice"
// reactstrap components

// core components
// import { Container } from "reactstrap";
export default function NoticeMain(props) {
  
  return (
    <>
      <div style ={{marginTop:'1%'}}>
        <Container>
          <Col>
            <Row>
              <Col xl="6" lg="6" md="6" sm="6" xs="6">
                <div>
                  <CardBody>
                    <Col>
                      <Row>
                        <Col xl="6" lg="6" md="6" sm="6" xs="6">
                          <h4>Notice <i className="fa fa-bullhorn" aria-hidden="true"/></h4>
                        </Col>
                        <Col xl="6" lg="6" md="6" sm="6" xs="6">
                          <Link to={{
                                pathname : `/notice`,}}>
                            <Button close ><i className="fa fa-plus" aria-hidden="true"/></Button>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Notice/>
                        </Col>
                      </Row>
                    </Col>
                  </CardBody>
                </div>
              </Col>
              <Col xl="6" lg="6" md="6" sm="6" xs="6">
              </Col>
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
}



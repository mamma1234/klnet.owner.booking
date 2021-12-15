/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  CardBody,Row,Col
} from "reactstrap";
//import axios from "axios";
//import {Link} from "react-router-dom";
//import * as validation from 'components/common/validation.js';
export default function Mapping(props) {
    return (
        <>
            <Col>
                <Row className="bg-white">
                    <CardBody className="pl-0 pr-0">
                        <Row>
                            <Col className="text-center">
                                <span style={{fontSize:'15px',fontWeight:'bold'}}>{props.msg}</span>
                            </Col>
                        </Row>
                    </CardBody>
                </Row>
            </Col>
        </>
    );
}


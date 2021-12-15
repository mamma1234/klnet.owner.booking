import React,{useEffect,useState} from "react";
import { Row,Col,Card, Button, CardBody, UncontrolledTooltip} from "reactstrap";
import CardTitle from "reactstrap/lib/CardTitle";
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import * as validation from 'components/common/validation.js';
import AlertWindow from "components/Alert/AlertMessage.js";
import axios from "axios";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import { Link } from "react-router-dom";
export default function PwChange(props) {
    document.documentElement.classList.remove("nav-open");
    // function that is being called on scroll of the page
    const checkScroll = () => {
      // it takes all the elements that have the .add-animation class on them
      const componentPosition = document.getElementsByClassName("add-animation");
      const scrollPosition = window.pageYOffset;
      for (var i = 0; i < componentPosition.length; i++) {
        var rec =
          componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
        // when the element with the .add-animation is in the scroll view,
        // the .animated class gets added to it, so it creates a nice fade in animation
        if (scrollPosition + window.innerHeight >= rec) {
          componentPosition[i].classList.add("animated");
          // when the element with the .add-animation is not in the scroll view,
          // the .animated class gets removed from it, so it creates a nice fade out animation
        } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
          componentPosition[i].classList.remove("animated");
        }
      }
    };
    const [message, setMessage] = useState("")//Alert Message
    const [alertOpen, setAlertOpen] = useState(false)//Alert Open State
    const [alertColor, setAlertColor] = useState("success");
    useEffect(() => {
        document.body.classList.add("sr-request-page");
        window.addEventListener("scroll", checkScroll);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        
        return function cleanup() {
            document.body.classList.remove("sr-request-page");
            window.removeEventListener("scroll", checkScroll);
        };
    });

    const AlertMessage = (message,icon) => {
        setAlertOpen(true);
        setMessage(message);
        setAlertColor(icon)
    }
    const handleClose = () => {
        setAlertOpen(false);
    }
    return(
        <div className="section section-white">
            <div className="bg-white page-header page-header-xss">
            </div>
            <Col className="ml-auto mr-auto mt-3" xl="6" lg="7" md="8" sm="9" xs="10">
              
              <Card className="no-transition">
                <CardTitle>
                  <Link to={{pathname:"/weidongindex"}} className="ml-3">
                    <i id="back" className="fa fa-angle-left fa-2x"/>
                    <UncontrolledTooltip placement="bottom" target="back">
                      뒤로가기
                    </UncontrolledTooltip>
                  </Link>
                </CardTitle>
                <CardBody>
                  <Row>
                    <Col className="text-center mb-5, pb-5">
                      <span style={{fontSize:'2.25rem', lineHeight:'1.2', fontWeight:'700',marginBottom:'100px', maxWidth:'100%',color:'#7E7E7E' }}>무엇을 도와드릴까요 ?</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Link to={{pathname:'/findid'}}>
                        <Button className="mb-4" style={{width:'100%', color:'black'}} color="link" outline>
                          <Row className="pb-2">
                            <Col xl="3" sm="3" md="3" lg="3" xl="3" className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-question fa-2x"/>
                            </Col>
                            <Col xl="7" sm="7" md="7" lg="7" xl="7">
                                <Row>
                                    <Col>
                                        <span style={{fontSize:"18px"}}>ID가 기억나지 않습니다.</span>
                                    </Col>
                                </Row>
                            </Col>
                          </Row>
                        </Button>
                      </Link>
                      <Link to={{pathname:'/findpw', state:{gubun:'forget'}}}>
                        <Button className="mb-4" style={{width:'100%', color:'black'}} color="link" outline>
                          <Row className="pb-2">
                            <Col xl="3" sm="3" md="3" lg="3" xl="3" className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-unlock-alt fa-2x"/>
                            </Col>
                            <Col xl="7" sm="7" md="7" lg="7" xl="7">
                                <Row>
                                    <Col>
                                        <span style={{fontSize:"18px"}}>비밀번호가 기억나지 않습니다.</span>
                                    </Col>
                                </Row>
                            </Col>
                          </Row>
                        </Button>
                      </Link>
                      <Link to={{pathname:'/findpw', state:{gubun:'lock'}}}>
                        <Button className="mb-4" style={{width:'100%', color:'black'}} color="link" outline>
                          <Row className="pb-2">
                            <Col xl="3" sm="3" md="3" lg="3" xl="3" className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-exclamation-triangle fa-2x"/>
                            </Col>
                            <Col xl="7" sm="7" md="7" lg="7" xl="7">
                                <Row>
                                    <Col>
                                        <span style={{fontSize:"18px"}}>비밀번호 입력 횟수가 초과 되었습니다.</span>
                                    </Col>
                                </Row>
                            </Col>
                          </Row>
                        </Button>
                      </Link>
                    </Col>
                    
                  </Row>
                </CardBody>
              </Card>
            </Col>


            <div style={{position:'fixed',bottom:'0',width:'100%'}}>
            <FooterWeidong />
            </div>
            <AlertWindow 
                message={message}
                isOpen={alertOpen}
                isClose={handleClose}
                // fontColor={"black"}   //선택사항
                alertColor={alertColor} //선택사항
                timeOut={2000} //선택사항
            ></AlertWindow>
        </div>
    )
}
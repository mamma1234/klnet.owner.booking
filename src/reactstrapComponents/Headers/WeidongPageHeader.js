import React,{useEffect,useState} from "react";
import {
	Button, Modal, Row, Col
  } from "reactstrap";
import axios from "axios";
import {Link} from "react-router-dom";
// reactstrap components

// core components
// import { Container } from "reactstrap";

function LandingPageHeader(props) {
	 let pageHeader = React.createRef();
	// const [User, setUser] = useState(props.user);
	const {user,setUser}=props;
	const [open, setOpen] = useState(false);
	  useEffect(() => {
	    if (window.innerWidth > 991) {
	    //   const updateScroll = () => {
	    //     let windowScrollTop = window.pageYOffset / 3;
	    //     pageHeader.current.style.transform =
	    //       "translate3d(0," + windowScrollTop + "px,0)";
	    //   };
	    //   window.addEventListener("scroll", updateScroll);
	      return function cleanup() {
	        // window.removeEventListener("scroll", updateScroll);
	      };
	    }
	  });
  
	  useEffect(() => {
		// setUser(props.user);
		if(props.user) {
			noticeCheck();
		}
	  },[props]);
	  

	  const onCancel = () => {
		setOpen(false);
		axios.post("/com/setUserInfo",{gubun:'modify',userno:user.user_no}).then(
			res=>{
				
			}
		)
	  }
	  const noticeCheck = () => {
		if(new Date(props.user.next_pwd_modify_date) > new Date(new Date().setMonth(new Date().getMonth() + 3))) {
			setOpen(true);
		}
	  }
  return (
    <>
      <div
        className="bg-white page-header"
        ref={pageHeader}
        style={{
          backgroundImage:
          "url(" + require("assets/img/img_shipdata3.jpg") + ")",minHeight:'78vh'
        }}
        >
      </div>
	  <Modal
        size="lg"
        //toggle={() => setOpen(false)}
        isOpen={open}>
        <div className="modal-header no-border-header">

        </div>
        <div className="modal-body pl-2 pr-2">
			<Row>
				<Col className="text-center pb-3">
					<span style={{fontSize:'24px', fontWeight:'bold'}}>비밀번호를 변경해주세요. </span>
				</Col>
			</Row>
			<Row>
				<Col className="text-left pb-3">
					<ul>
						<li><span>회원님의 비밀번호 최종 변경일로부터 3개월이 지났습니다.</span></li>
					</ul>
				</Col>
			</Row>
			<Row>
				<Col className="text-left pb-3">
					<ul>
						<li><span>동일한 비밀번호를 오랫동안 사용하실 경우 개인정보 유출등의 위험이 있습니다.</span></li>
					</ul>
				</Col>
			</Row>
			<Row>
				<Col className="text-left pb-3">
					<ul>
						<li><span>비밀번호 변경을 원치 않으실 경우 "다음에 변경하기"를 선택하시면 다음 90일동안 안내를 받지 않을 수 있습니다.</span></li>
					</ul>
				</Col>
			</Row>
        </div>
        <div className="modal-footer">
          <div className="left-side">
		  	<Link to={{pathname: `/password`}}>
            	<Button className="btn-link" color="danger" type="button">변경하러 가기</Button>
			</Link> 
          </div>
          <div className="divider" />
          <div className="right-side">
              <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={() => onCancel()}>
              다음에 변경하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LandingPageHeader;

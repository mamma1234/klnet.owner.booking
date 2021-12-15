/*eslint-disable*/
import React,{useState,useEffect, useRef} from "react";
// reactstrap components
import {
  Button,
  Modal,
  Input,Row,Col,
  Card,CardTitle,InputGroup,InputGroupText, InputGroupAddon
} from "reactstrap";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import CardBody from "reactstrap/lib/CardBody";
import axios from 'axios'
import Collapse from "reactstrap/lib/Collapse";
import AlertModal from 'components/Modals/Alert.js';
import * as validation from 'components/common/validation.js';
const styles = {
  normalGird:{
    fontSize:'9',
    color:'#696969',
    fontWeight:'bold',
  },
  cardTitle:{
    fontSize:'16px',
    color:'#696969',
  },

  textHeader: {
    fontSize:'16px',
    color:'#696969',
    fontWeight:'bold'
  },
  textGrid: {
    fontSize:'12px',
    color:'#696969',
  }


};

function GridRow(props) {
  const [value,setValue] = useState(props.value);
  const [open,setOpen] = useState(false);
  const [index,setIndex] = useState(props.index);
  const [data,setData] = useState([]);
  useEffect(() => {
    setValue(props.value);
    setIndex(props.index);

    

    return function cleanup() {
      // setValue(null);
      // setOpen(false);
    };
  },[open]);

  useEffect(()=> {
    chkecLine();
  },[])
const chkecLine = () => {

  if(props.value.KLNET_ID) {
    axios.post('/com/checkWDFCLineCompany',{param:props.value.KLNET_ID, lineCode:'WDFC'}).then(
      res=> {
        if(res.statusText ==="OK") {
          if(res.data.length> 0 ) {
            setData(res.data);
          }else {
            setData([]);
          }
        }else {
          setData([])
        }
      })
  }
}




  return(
    <>
    <Row  className="pb-2 pt-2" style={{cursor:'pointer'}} onClick={() => setOpen(!open)}>
      <Col className=" text-center pt-3" xl="1" lg="1" md="1" sm="1" xs="1">{Number(index)+1}</Col>
      <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4" xs="4">{value.CNAME_KR}</Col>
      <Col className=" text-center pt-3" xl="4" lg="4" md="4" sm="4" xs="4">{value.KLNET_ID}</Col> 
      <Col className=" text-center pt-3" xl="3" lg="3" md="3" sm="3" xs="3">{value.COMP_CEO!==null?validation.NameReplace(value.COMP_CEO):value.COMP_CEO}</Col>
    </Row>
    <Collapse isOpen={open}>
      <CardBody className="mt-0 pt-0 pb-1 mb-1 border">
        <CardTitle className="pt-1 mt-1">
          <Col>
            <span className="pt-3 mt-2" style={{color:'black',fontSize:'30px',color:'#696969',fontWeight:'bold'}}>&nbsp;{value.CNAME_KR}</span>      
          </Col>
        </CardTitle>  
        <CardBody>
          <Col>
            <Row className="pt-3 pb-3 border-bottom">
              <Col className="" xl="4" sm="4" md="4" lg="4" xl="4">
                <span style={styles.textHeader}>대표</span>
              </Col>
              <Col className="text-center" xl="8" sm="8" md="8" lg="8" xl="8">
                <span style={styles.textGrid}>{value.COMP_CEO!==null?validation.NameReplace(value.COMP_CEO):value.COMP_CEO}</span>
              </Col>
            </Row>

            <Row className="pt-3 pb-3 border-bottom">
              <Col className="" xl="3" sm="3" md="3" lg="3" xl="3">
                <span style={styles.textHeader}>업종</span>
              </Col>
              <Col className="text-center" xl="3" sm="3" md="3" lg="3" xl="3">
                <span style={styles.textGrid}>{value.COMP_CLASS}</span>
              </Col>
              <Col className="" xl="3" sm="3" md="3" lg="3" xl="3">
                <span style={styles.textHeader}>업태</span>
              </Col>
              <Col className="text-center" xl="3" sm="3" md="3" lg="3" xl="3">
                <span style={styles.textGrid}>{value.COMP_TYPE}</span>
              </Col>
            </Row>
            <Row className="pt-3 pb-3 border-bottom">
              <Col className="" xl="4" sm="4" md="4" lg="4" xl="4">
                <span style={styles.textHeader}>주소</span>
              </Col>
              <Col className="text-center" xl="8" sm="8" md="8" lg="8" xl="8">
                <span style={styles.textGrid}>{value.COMP_ADDR}</span>
              </Col>
            </Row>
            {data.length > 0?(
                <>
                  {data.map((element,index) => {
                    return(
                      <Row key={index} className="pt-3 pb-3 border-bottom">
                        <Col className="" xl="2" sm="2" md="2" lg="2" xl="2">
                          <span style={styles.textHeader}>화주</span>
                        </Col>
                        <Col className="text-center" xl="2" sm="2" md="2" lg="2" xl="2">
                          <span style={styles.textGrid}>{element.shipper_yn}</span>
                        </Col>
                        <Col className="text-center" xl="2" sm="2" md="2" lg="2" xl="2">
                          <span style={styles.textHeader}>포워더</span>
                        </Col>
                        <Col className="text-center" xl="2" sm="2" md="2" lg="2" xl="2">
                          <span style={styles.textGrid}>{element.forwarder_yn}</span>
                        </Col>
                        <Col className="text-center" xl="2" sm="2" md="2" lg="2" xl="2">
                          <span style={styles.textHeader}>파트너코드</span>
                        </Col>
                        <Col className="text-center" xl="2" sm="2" md="2" lg="2" xl="2">
                          <span style={styles.textGrid}>{element.partner_code}</span>
                        </Col>
                      </Row>
                    )
                  })}
                </>
              ):null
            }
            
            <Row className="pt-3 pb-3 border-bottom">
              <Col className="text-right"><Button color="primary" onClick={()=>props.addCompany(value)}>등록</Button></Col>
            </Row>
          </Col>
        </CardBody>
      </CardBody>
      
     
    </Collapse>
  </>
  )
}



export default function Company(props) {
  const [businessNumber,setBusinessNumber] = useState('');
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(true);
  const [detailRow, setDetailRow] = useState([])
  const element=useRef(null);
  const [message,setMessage] = useState("");
  const [alertOpen,setAlertOpen] = useState(false);
  const [ConfirmOpen, setConFirmOpen] = useState(false);
  const [confirmMessage,setConfirmMessage] = useState("");
  const [parentParam,setParentParam] = useState(null);
  const {user}= props
  useEffect(() => {
    if(!open) {
      document.getElementById("bn").focus();
    }

    return function cleanup() {
      setData([]);
      setBusinessNumber('');
    };
  }, [open]);
  const handleClose = () => {
    setAlertOpen(false);
  }
  const onSubmit = () => {
    if(user) {
      axios.post("/com/getCompanyInfo",{bn:businessNumber.replaceAll('-','')}).then(
        res=> {
          if(res.statusText ==='OK') {
            if(res.data.length > 0) {
              setData(res.data);  
            }else {
              alertMessageSet("해당 사업자 번호로 조회된 항목이 없습니다.");
              setData([]);
              // setSectionList([]);
            }
            
          }
        }
      )
    }else {
      alertMessageSet('로그인 이후 이용해주시기 바랍니다.')
    }
  }
  const onKeyPress = (e) => {
    if(e.key==='Enter') {
      if(businessNumber.length===0){
        setOpen(true);
      }else {
        onSubmit();
      }
      
    }
  }
  const onFocusOut =(e) => {
    if(businessNumber.length ===0) {
      setOpen(true);
    }
  }
  const onModalClose = () => {
    
    setData([]);
    setBusinessNumber('');
    setDetailRow([]);
    setOpen(true);
  
    props.setOpenCompany(false)
  }
  const ConfirmOn = (value) => {
    setParentParam(value)
    if(value) {
      setConFirmOpen(true);
      setConfirmMessage("해당 업체를 등록하시겠습니까?");
    }
  }
  const alertMessageSet =(message) => {
    setAlertOpen(true);
    setMessage(message);
  }
  const updateCompSet = () => {
    if(props.user.user_no) {
      axios.post("/com/addCompany",{user:props.user, param:parentParam}).then(
        res=>{
          console.log(res.data)
          if(res.statusText==="OK") {
            if(res.data === "success") {
              
              setConFirmOpen(false);
              alertMessageSet("등록이 완료되었습니다.");
              onChangeSession();
              
               
                
                
              
            }else if(res.data ==="duplicate"){
              setConFirmOpen(false);
              alertMessageSet("이미 등록된 업체가 존재합니다.");
            }else {
              setConFirmOpen(false);
              alertMessageSet("오류가 발생했습니다.");
            }
          }else{
            setConFirmOpen(false);
            alertMessageSet("지금은 등록할 수 없습니다. 잠시후 다시 시도해주세요");      
          }
        }
      )
    }else {
      setConFirmOpen(false);
      alertMessageSet("사용자 정보가 없습니다.");
    }
    
  }
  const onChangeSession = () => {
    axios.get("/auth/verify").then(res => {
      var data = res.data.user;
      props.setUser(data);
    });
  }
  return (
    <>
      <Modal
        isOpen={props.openCompany}
        toggle={() => onModalClose()}
        className="modal-lg">
        <>
          <Card className="card-raised card-form-horizontal no-transition mb-4">
            <CardTitle className="pb-5">
              <Col>
                <span style={{fontSize:'15px',fontWeight:'bold'}}>업체 찾기</span>
              </Col>
            </CardTitle>
            <CardSubtitle>
              <Col xl="12" lg="12" sm="12" md="12">
                {open?(
                  <Button style={{width:'100%'}} color="default" onClick={()=>{setOpen(false)}}>
                    <i className="fa fa-search"></i>BUSINESS NUMBER
                  </Button>):(
                  <div>
                    <InputGroup>
                      <Input 
                        type="text" 
                        id="bn"
                        maxLength="10"
                        placeholder="Enter Without '-'"
                        disabled={detailRow.length===0?false:true}
                        ref={element}
                        onChange={(e)=>{if(e.target.value.length ===10) {
                          setBusinessNumber(e.target.value.replace(/(\d{3})(\d{2})(\d{5})/g,'$1-$2-$3')); 
                        }else {
                          setBusinessNumber(e.target.value)
                        }}}
                        value={businessNumber}
                        onKeyPress={onKeyPress}
                        onBlur={onFocusOut}/>
                      <InputGroupAddon addonType="append">
                        <InputGroupText style={{borderLeft:'solid',padding:'0'}}>
                          <Button size="sm" color='link' onClick={()=> onSubmit()}>
                            <i className="fa fa-search" />
                          </Button>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>)}
              </Col>
            </CardSubtitle>
            <CardBody>
            <Col xl="12" lg="12" sm="12" md="12">
              <>
                <Row className="bg-light pb-2 pt-2">
                  <Col className="text-center pt-3 border-right" xl="1" lg="1" md="1" sm="1" xs="1" style={styles.normalGird}>#</Col>
                  <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4" xs="4" style={styles.normalGird}>NAME</Col>
                  <Col className="text-center pt-3 border-right" xl="4" lg="4" md="4" sm="4" xs="4" style={styles.normalGird}>KLNET ID</Col>
                  <Col className="text-center pt-3 border-right" xl="3" lg="3" md="3" sm="3" xs="3" style={styles.normalGird}>MASTER</Col>
                </Row>
                {data.length > 0 && (
                  <>
                    {data.map((value,index) => {
                      return(
                        <GridRow
                          index={index} 
                          key={index} 
                          value={value} 
                          addCompany={(value) => ConfirmOn(value)}/>
                      )
                    })}
                  </>)}
                </>
                </Col>
          </CardBody>
        </Card>
      </>
      <AlertModal 
        message={message}
        open={alertOpen}
        close={handleClose}
        fncOpenMessage={(e)=>setAlertOpen(e)}
        status ="error"/>
      <Modal
        size="sm"
        isOpen={ConfirmOpen}
      //toggle={() => setOpen(false)}
      >
        <div className="modal-header no-border-header">
          <button
            className="close"
            type="button"
            onClick={() => setConFirmOpen(false)}
          >×</button>
        </div>
        <div className="modal-body text-center pl-0 pr-0">
          <h5>{confirmMessage}</h5>
        </div>
        <div className="modal-footer">
          <div className="left-side">
          <Button className="btn-link" color="danger" type="button" onClick={()=> {updateCompSet()}}>Yes</Button>
          </div>
          <div className="divider" />
          <div className="right-side">
              <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={() => setConFirmOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>    
    </Modal>
    </>
  );
}

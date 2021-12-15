/*eslint-disable*/
import React,{useState, useEffect} from "react";
// reactstrap components
import {
  Button,
  Modal,
  Row,Col
} from "reactstrap";

export default function Alert(props) {


  // modals states
  const {message, status} = props;
  // carousel states and functions
  //const [activeIndex, setActiveIndex] = useState(0);
  //const [animating, setAnimating] = useState(false);
  //const [classic, setClassic] = useState(false);
  const [open, setOpen] = useState(false);
  const [Yscroll, setYscroll] = useState(false);

  useEffect(()=>{
	  if(open) {
	    // setTimeout(()=>{ 
      //   // console.log(">>>>alert");
      //   setOpen(!open);
      // },3000);
	  } else {
      window.scrollTo(0, Yscroll);
    }
   },[open]);


   useEffect(()=>{
    if(props.open) {
      setYscroll(window.pageYOffset)
    }
    setOpen(props.open);
   },[props.open]);

  return (
    <div>
        <Modal //size="sm"
                isOpen={open?true:false}
                scrollable={true}
                toggle={()=>{
                  setOpen(!open)
                  props.fncOpenMessage(!open)
                }}
                // style={{position:'fixed'}}
              >
                <div className="no-border-header">
                  <button
                    className="close"
                    type="button"
                    onClick={()=>{
                      setOpen(!open)
                      props.fncOpenMessage(!open)
                    }}
                  >
                    <span>×</span>
                  </button>
                   
                </div>
                <div className="modal-body pl-3">
                	<Row>
                		<Col className="col-2">
                		{status==="success"?<i className="fa fa-check-square-o fa-3x text-info" aria-hidden="true"></i>:
                            <i className="fa fa-exclamation-triangle fa-3x text-danger mr-5" aria-hidden="true"></i>}
                		</Col>
                		<Col className="pt-2">
                		<h4 className="text-center mt-0"> {message}</h4> </Col>
                	</Row>
                
                </div>
                <div className="modal-footer">
               		<Button block  color="info" onClick={()=>{
                     setOpen(!open)
                     props.fncOpenMessage(!open)
                    }}>확인</Button>
                </div>
        </Modal>
    </div>
  );
}


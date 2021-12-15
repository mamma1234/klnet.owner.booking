/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  //FormGroup,
  Modal,
  //Input,
  Row,Col//,Label
} from "reactstrap";

export default function AlertMessagePage(props) {
  // modals states
  const {open,data} = props;
  // carousel states and functions
  //const [activeIndex, setActiveIndex] = React.useState(0);
  //const [animating, setAnimating] = React.useState(false);
  //const [classic, setClassic] = React.useState(false);

  
  return (
    <>
    <Modal isOpen={open} toggle={props.setOpen}>
    <div className="modal-header no-border-header">
      <button
        className="close"
        type="button"
        onClick={props.setOpen}
      >
        ×
      </button>
      <h5 className="modal-title" id="myModalLabel">
        Weidong Schedule Detail Info
      </h5>
    </div>
    <div className="modal-body">
      <div className="instruction">
        <Row>
          <Col md="8">
            <p>
              - Vessel Name:{data?data.vsl_name:null}<br/>
              - Voyage Number:{data?data.voyage_no:null}<br/>
              - Port : {data?data.start_port_name:null}({data?data.start_day:null}) -> {data?data.end_port_name:null}({data?data.end_day:null})<br/>
              - T/T: {data?data.tt:null}<br/>
              <hr/>
              - Close Cargo : {data?data.cargo_closing_date:null}<br/>
              - Close Document :{data?data.doc_closing_date:null}<br/>
            </p>
          </Col>
          <Col md="4">
            <div className="picture">
              <img
                alt="..."
                className="img-rounded img-responsive"
                src={require("assets/img/logo.gif")}
              />
            </div>
          </Col>
        </Row>
      </div>
      
    </div>
    <Link to={{pathname: `/booking`, state: {user_no:props.user_no,sch_vessel_name:data?data.vsl_name:null,sch_vessel_voyage:data?data.voyage_no:null
      ,sch_pol:data?data.start_port:null,sch_pod:data?data.end_port:null,schedule_yn:'Y',line_code:'WDFC'
      ,sch_eta:data?data.sch_eta:null
      ,sch_etd:data?data.sch_etd:null
      ,vsl_type:data?data.vsl_type:null
      ,sch_call_sign:data?data.sch_call_sign:null}}}>
	    <div className="modal-footer">
	      <Button
	        className="btn-link"
	        color="primary"
	        type="button"
	      >     
		      Booking
	      </Button>
	    </div>
    </Link>
  </Modal>
    </>
  );
}


/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Modal,
  Row,Col
} from "reactstrap";
import moment from 'moment';

export default function SchdulePopupPage(props) {
  // modals states
  const {open,data} = props;
  // carousel states and functions
  //const [activeIndex, setActiveIndex] = React.useState(0);
  //const [animating, setAnimating] = React.useState(false);
  //const [classic, setClassic] = React.useState(false);
   const toDay = moment(new Date()).format('YYYYMMDD');
  
  return (
    <>
    <Modal isOpen={open} toggle={props.setOpen}>
    <div className="modal-header border-header">
      <button
        className="close"
        type="button"
        onClick={props.setOpen}
      >
        ×
      </button>
      <h5 className="modal-title mt-0" id="myModalLabel">
        Weidong Schedule Detail Info
      </h5>
    </div>
    <div className="modal-body pl-4 pr-4">
      <div className="instruction">
        <Row style={{padding:'0'}}>
          <Col className="col-8">
            <p style={{fontSize:'12px'}}>
              <i className="fa fa-caret-right" />Vessel Name : <font style={{fontWeight:'bold'}}>{data?data.vsl_name:null}</font><br/>
              <i className="fa fa-caret-right" />Voyage Number : <font style={{fontWeight:'bold'}}>{data?data.voyage_no:null}</font><br/>
              <i className="fa fa-caret-right" />Port :  <font style={{fontWeight:'bold'}}>{data?data.start_port_name:null} ({data?data.start_day:null}{" "}{data?data.start_hour:null}) <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-arrow-right" />{data?data.end_port_name:null} ({data?data.end_day:null}{" "}{data?data.end_hour:null})</font><br/>
              <i className="fa fa-caret-right" />T/T : <font style={{fontWeight:'bold'}}> {data?data.tt:null}</font><br/>
              <i className="fa fa-caret-right" />MRN : <font style={{fontWeight:'bold'}}>{data?data.mrn:null}</font><br/>
              <i className="fa fa-caret-right" />Close Cargo : <font style={{fontWeight:'bold'}}>{data?data.cargo_closing_date:null}</font><br/>
              <i className="fa fa-caret-right" />Close Document : <font style={{fontWeight:'bold'}}>{data?data.doc_closing_date:null}</font><br/>
              
            </p>
          </Col>
          <Col className="col-4 mt-auto mb-auto">
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
    {data && data.booking_yn ==='Y'?
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
    </Link>:<></>}
  </Modal>
    </>
  );
}


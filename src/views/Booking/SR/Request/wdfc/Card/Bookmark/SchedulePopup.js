import React,{ useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle,DialogContent} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import moment from 'moment';
import axios from 'axios';
import Slide from "@material-ui/core/Slide";
import {Close} from "@material-ui/icons";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
    
const localizer = momentLocalizer(moment);
const styles = makeStyles((theme) => ({
	 
	  modalCloseButton:{
		  float:'right',
		  padding:'0',
		  minWidth:'21px',
		  heught:'21px'
	  },
	  modalTitle:{
		  padding:'15px 24px 0 24px',
		  textAlign:'center'
	  },
	  modal:{
		  maxWidth:'80%'
	  },

	}));

const Transition = React.forwardRef(function Transition(props, ref) {
	  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ScheduleCalendar(props) { 
	    	const classes = styles();
	    	const [scheduleData,setScheduleData] = React.useState();
	    	
			 useEffect(() => {
				 /**/
				 onSubmit(null);
			 }, []);
			 
			 const onSubmit =(eta) => {
				 axios.post("/shipper/getWdSchCal",{ eta:eta?moment(eta).format('YYYYMMDD'):moment(new Date()).format('YYYYMMDD'),week:'5 week',line_code:'WDFC',},{})
                    .then(res => setScheduleData(res.data));
			 }
			// next month
			 const navigatedEvent = date => { onSubmit(date);};
		  

			return (
		            <Dialog
			          classes={{paper: classes.modal}}
			          open={true}
			          TransitionComponent={Transition}
			          keepMounted
			          onClose={()=>props.closeBook()}
			          aria-labelledby="classic-modal-slide-title"
			          aria-describedby="classic-modal-slide-description"
			        >
			          <DialogTitle
			            id="classic-modal-slide-title"
			            disableTypography
			            className={classes.modalHeader}
			          >
			            <Button
			              justIcon
			              className={classes.modalCloseButton}
			              key="close"
			              aria-label="Close"
			              color="transparent"
			            	  size="sm"
			              onClick={()=>props.closeBook()}
			            >
			              <Close className={classes.modalClose} />
			            </Button>
			            <h4 className={classes.modalTitle}>Schedule Bookmark</h4>
			          </DialogTitle>
			          <DialogContent
			            id="classic-modal-slide-description"
			            className={classes.modalBody}
			            style={{minWidth:'800px',width:'100%'}}
			          >
				          <BigCalendar
							selectable
							localizer={localizer}
							events={scheduleData?scheduleData:[{}]}
							defaultView="month"
							popup
							views={["month"]}
							scrollToTime={new Date(1970, 1, 1, 6)}
							defaultDate={new Date()}
							onSelectEvent={(event,e) =>props.schmerge(event)}
							onNavigate={date => navigatedEvent(date)}
						  />
							
			          </DialogContent>
			        </Dialog>
			);
		}
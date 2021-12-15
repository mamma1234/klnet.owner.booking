import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog,DialogTitle,DialogContent, } from "@material-ui/core";
import moment from 'moment';
import axios from 'axios';
import Slide from "@material-ui/core/Slide";
import {Close, FavoriteBorderTwoTone, } from "@material-ui/icons";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import Button from "components/CustomButtons/Button.js";
import * as validation from 'components/common/validation.js';
    
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
    const [open, setOpen] = React.useState(false);
    const [lineList, setLineList] = React.useState([]);
    const [lineCode, setLineCode] = React.useState("");
    const [startPortList, setStartPortList] = React.useState([]);
    const [endPortList, setEndPortList] = React.useState([]);
    //const [routeCode, setRouteCode] = React.useState("");
    const [startport, setStartport] = React.useState("");
    const [endport, setEndport] = React.useState("");
    const [bookmarkList, setBookmarkList] = React.useState([]);
    const [bookmarkExists, setBookmarkExists] = React.useState(false);
    const [bookmark, setBookmark] = React.useState({});
    const {userData, isOpen} = props;

    useEffect(() => {
        fncSearch();
    }, []);

        
    const onSubmit =(eta) => {
        axios.post(
            "/shipper/getWdSchCal",
            { 
                eta:eta?moment(eta).format('YYYYMMDD'):moment(new Date()).format('YYYYMMDD'),
                week:'4 week',
                line_code:'WDFC',
            },{}
        )
        .then(res => setScheduleData(res.data));
    }
    // next month
    const navigatedEvent = date => { onSubmit(date);};
    
    const fncSearch =()=> {
        axios.post(
            "/shipper/getWdSchCal",
            { 
                eta:moment(new Date()).format('YYYYMMDD'),
                week:'4 week',
                line_code:'WDFC',
            },{}
        )
        .then(res => setScheduleData(res.data));
    }

    return (
        <React.Fragment>
            <Button color="info"
                onClick={(e)=>{
                    if( isOpen ) {
                        setOpen(!open);
                    } else {
                        props.alert(
                            null // onConfirm: function
                            , "부킹번호를 먼저 생성하세요."  // title: string
                            ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
                            ,true // show: boolean default:true
                            ,true  // reverseButtons: boolean , default: false
                            ,'lg' // btnSize: lg,sm,xs default:lg
                            ,'[NEW]버튼으로 생성 가능합니다.' // subtitle: string
                            ,true // showConfirm: boolean default: false
                            ,false // showCancel: boolean default: false
                            ,null // onCancel: function
                        );
                    }
                }}
                size="sm">스케줄 선택</Button>
            <Dialog
                classes={{paper: classes.modal}}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpen(!open)}
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
                    onClick={()=>setOpen(!open)}
                >
                    <Close className={classes.modalClose} />
                </Button>
                <h4 className={classes.modalTitle}>Schedule</h4>
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
                    // defaultView="month"
                    popup
                    views={["month"]}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={(event,e) =>{props.schmerge(event); setOpen(!open)}}
                    onNavigate={date => navigatedEvent(date)}
                    startAccessor="start"
                    endAccessor="end"
                    showAllEvents="true"
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
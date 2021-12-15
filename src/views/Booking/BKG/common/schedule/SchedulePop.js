import React,{ useState, useEffect } from "react";
import { Dialog,DialogTitle,DialogContent, IconButton, ButtonGroup, Tooltip} from "@material-ui/core";
import moment from 'moment';
import axios from 'axios';
import Slide from "@material-ui/core/Slide";
import {Close, FavoriteBorderTwoTone, } from "@material-ui/icons";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

import Autocomplete from '@material-ui/lab/Autocomplete';
import GridItem from "components/Grid/GridItem.js";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import * as validation from 'components/common/validation.js';
import { makeStyles } from "@material-ui/core/styles";

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
        selectLineServiceRoute();
        selectLineServiceRouteManagePortList();
    }, []);

    // user 객체가 존재할 경우 POL, POD만 입력한 스케줄 Bookmark 조회
    useEffect(()=>{
        if(userData) {
            selectCheckScheduleBookmarkPort();
        }
    },[userData]);

    // line_code 수정되면 출발, 도착 정보 초기화
    useEffect(()=>{
        setStartPortList([]);
        setEndPortList([]);
        selectLineServiceRouteManagePortList();
    }, [lineCode]);

    // 출발 포트 수정된 경우
    // line_code 및 출발 포트 기준으로 도착 포트 목록 변경되어야 함.
    useEffect(()=>{
        // console.log("START PORT", startport)
        setEndPortList([]);
        if( startport ) {
            selectLineServiceRouteManagePortList(startport);
        } else {
            selectLineServiceRouteManagePortList();
        }
    }, [startport]);

    // 도착포트가 입력되면 최종 조회
    useEffect(()=>{
        if( endport ) {
            fncSearch();
            
            let data = null;
            if( lineCode ) {
                data = bookmarkList.find(v=>v.sch_pol === startport && v.sch_pod === endport && v.sch_line_code === lineCode );
            } else {
                data = bookmarkList.find(v=>v.sch_pol === startport && v.sch_pod === endport );
            }
            if( data ) {
                setBookmarkExists(true);
            } else {
                setBookmarkExists(false);
            }
        } else {
            setBookmarkExists(false);
        }
    }, [endport]);

    // bookmark 스케줄 버튼 클릭 할 경우 요놈을 기준으로 연쇄 조회가 일어나게 됨.
    // lineCode 먼저 세팅 > startport 세팅 > endport 세팅 > 조회
    useEffect(()=>{
        // console.log("1111", bookmark)
        if( bookmark.sch_line_code ) {
            setLineCode(bookmark.sch_line_code);
        } else {
            if( lineCode ) {
                setLineCode(null);
            } else {
                if( bookmark.sch_pol === startport ) {
                    setEndPortList([]);
                } else {
                    setStartPortList([]);
                }
            }
        }
    }, [bookmark]);


    // 출발 포트 목록 조회 된 경우 bookmark 버튼 클릭인 경우 해당 정보로 세팅
    // endport 정보를 위해서 다시 조회 해준다.
    useEffect(()=>{
        if( startPortList.length > 0 ) {
            if( bookmark.sch_pol ) {
                setStartport( bookmark.sch_pol );
                selectLineServiceRouteManagePortList(bookmark.sch_pol);
            }
        } else {
            selectLineServiceRouteManagePortList()
        }
    }, [startPortList]);
    
    // 도착 포트 목록 조회 된 경우 bookmark 버튼 클릭인 경우 해당 정보로 세팅
    // endportlist 정보가 없는 경우 세팅 해오도록
    useEffect(()=>{
        if( endPortList.length > 0 ) {
            if( bookmark.sch_pol ) {
                setEndport( bookmark.sch_pod );
            }
        } else {
            selectLineServiceRouteManagePortList(startport)
        }
    }, [endPortList]);

    useEffect(()=>{
console.log("scheduleData: ",scheduleData)
    },[scheduleData])

    // Line 목록조회
    const selectLineServiceRoute = (params) => {
        axios.post(
            "/sch/selectLineServiceRoute"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineList(res.data);
        }).catch(err => {
            if(err.response.status) {
            // onDismiss("danger", "오류가 발생했습니다.");
            }
        });
    }

    // Route 목록조회
    const selectLineServiceRouteManagePortList = (port) => {
        // console.log(">>>> ",port);
        axios.post(
            "/sch/selectLineServiceRouteManagePortList"
            ,{ 
                line_code:lineCode,
                startport: port,
             }
            ,{}
        ).then( 
            (res)=> {
                if( port ) {
                    setEndPortList(res.data);
                } else {
                    setStartPortList(res.data);
                }
            }
        )
        // .then(()=>{
        //     if( bookmark.sch_pol) {
        //         console.log("aaaaaaaaaaaaaaaaaaaaaaa")
        //         setStartport(bookmark.sch_pol);
        //         // if( endPortList.length === 0 ) {
        //         //     selectLineServiceRouteManagePortList(bookmark.sch_pol);
        //         // }
        //     }
        // })
        // .then(()=>{
        //     if( bookmark.sch_pod ) {
        //         setEndport(bookmark.sch_pod);
        //     }
        // })
        .catch(err => {
            // if(err.response.status) {
            // onDismiss("danger", "오류가 발생했습니다.");
            // }
        });
    }
    
    const onSubmit =(eta) => {
        if( startport && endport ) {
            axios.post("/sch/selectScheduleBookingPop",
                { 
                    // eta:moment(new Date()).format('YYYYMMDD'),
                    eta:moment(eta).format('YYYYMMDD'),
                    week:'4 week',
                    line_code: lineCode,
                    startport: startport,
                    endport: endport
                },{})
            .then(res => {
                let list = res.data;
                let len = list.length;
                for ( let i=0; i< len; i++ ) {
                    list[i].start = moment(list[i].start).toDate();
                    list[i].end = moment(list[i].end).toDate();
                }
                setTimeout(
                    setScheduleData(list), 2);
            });
        }
    }
    // next month
    const navigatedEvent = date => { onSubmit(date);};
    
    const fncSearch =()=> {
        
        if( startport && endport ) {
            axios.post(
                "/sch/selectScheduleBookingPop",
                { 
                    eta:moment(new Date()).format('YYYYMMDD'),
                    week:'4 week',
                    line_code: lineCode,
                    startport: startport,
                    endport: endport
                },{})
                .then(
                    res => {
                    let list = res.data;
                    let len = list.length;
                    for ( let i=0; i< len; i++ ) {
                        list[i].start = moment(list[i].start).toDate();
                        list[i].end = moment(list[i].end).toDate();
                    }
                    setTimeout(
                    setScheduleData(list), 2);
                });
        }
    }

    // 즐겨찾기 등록
    const fncInsertBookmark =()=>{
        
        if ( !startport || !endport ) {
            props.alert(
                null // onConfirm: function
                , "출발지 도착지를 선택 해야 합니다."  // title: string
                ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
            );
            return false
        };

        const data = bookmarkList.find(v=>v.sch_pol === startport && v.sch_pod === endport && v.sch_line_code === lineCode );
        if( data ) {
            props.alert(
                null // onConfirm: function
                , "이미 Bookmark 등록되어 있습니다."  // title: string
                ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
            );
            return false;
        } else {
            const start_port_name = startPortList.find(v=>v.start_port_code === startport ).start_port_name;
            const end_port_name = endPortList.find(v=>v.end_port_code === endport ).end_port_name;
            const start_port_kr_name = startPortList.find(v=>v.start_port_code === startport ).start_port_kr_name;
            const end_port_kr_name = endPortList.find(v=>v.end_port_code === endport ).end_port_kr_name;
            const schedule = {
                schedule_bookmark_name: start_port_kr_name+'->'+end_port_kr_name,
                sch_pol: startport,
                sch_pol_name: start_port_name,
                sch_pod: endport,
                sch_pod_name: end_port_name,
                sch_line_code: lineCode,
            }
            insertBookingScheduleBookmark(schedule);
        }
    }

    // 스케줄 북마크 조회
    const selectCheckScheduleBookmarkPort =()=> {
        axios.post(
            "/sch/selectCheckScheduleBookmarkPort"
            ,{
                user_no: userData.user_no,
                startport: startport,
                endport: endport,
                line_code: lineCode
            }
            ,{}
        ).then(
            res=>{
                setBookmarkList(res.data);
                // setBookmarkExists(true);
            }
        );
    }

    // 입력
    const insertBookingScheduleBookmark = (schedule) => {
        
        axios.post(
            "/shipper/insertBookingScheduleBookmark"
            ,{
                user_no : userData.user_no,
                schedule
            }
            ,{}
        ).then(
            res=>{
                props.alert(
                    null // onConfirm: function
                    , validation.SAVE_MSG  // title: string
                    ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                    ,true // show: boolean default:true
                    ,true  // reverseButtons: boolean , default: false
                    ,'lg' // btnSize: lg,sm,xs default:lg
                    ,'' // subtitle: string
                    ,true // showConfirm: boolean default: false
                    ,false // showCancel: boolean default: false
                    ,null // onCancel: function
                );
                selectCheckScheduleBookmarkPort();
                setBookmarkExists(true);
                props.selectBookingScheduleBookmark();
            }
        );
    }

    const fncClickBookmark =(data)=> {
        // if( data ) {
            // setBookmarkExists(true);
            setBookmark({...bookmark, ...data});
        // }
    }
    return (
        <React.Fragment>
            {/* <IconButton onClick={()=>setOpen(!open)}>
                <CalendarToday fontSize={'default'} style={{color:'#f50057'}} />
            </IconButton> */}
            <Button color="info"
                onClick={(e)=>{
                    if( isOpen ) {
                        setOpen(!open);
                        selectCheckScheduleBookmarkPort();
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
                <GridContainer>
                    <GridItem xs={4} sm={4}>
                        <Autocomplete
                            className={classes.textField}
                            options = {lineList}
                            getOptionLabel = { option => option.nm_kor?option.nm_kor:'' }
                            getOptionSelected={(option, value) => option.nm_kor?option.nm_kor:'' === value.nm_kor?value.nm_kor:''}
                            value={{nm_kor:
                                lineList.find(v=>v.id === lineCode)
                                ?lineList.find(v=>v.id === lineCode).nm_kor:''
                            }}
                            id="line_code_sch"
                            onChange={(e, option)=>
                                {setLineCode(option?option.id:null)}
                            }
                            renderInput={
                                params =>(
                                <TextField
                                    inputProps={{maxLength:5}}
                                    {...params}
                                    label="선사"
                                    fullWidth
                                />)}
                            feedback="deny"
                        />
                    </GridItem>
                    <GridItem xs={3} sm={3}>
                        <Autocomplete
                            className={classes.textField}
                            options = {startPortList}
                            getOptionLabel = { option => option.start_port_kr_name?option.start_port_kr_name:'' }
                            getOptionSelected={(option, value) => option.start_port_code?option.start_port_code:'' === value.startport?value.startport:''}
                            value={{start_port_kr_name:
                                startPortList.find(v=>v.start_port_code === startport)
                                ?startPortList.find(v=>v.start_port_code === startport).start_port_kr_name:''
                            }}
                            id="startPortList"
                            onChange={(e, option)=>
                                    setStartport(option?option.start_port_code:null)
                            }
                            renderInput={
                                params =>(
                                <TextField
                                    inputProps={{maxLength:5}}
                                    {...params}
                                    label="출발"
                                    fullWidth
                                    error={startport?false:true}
                                    helperText={startport?null:'필수'}
                                    name="deny"
                                />)}
                            feedback="deny"
                        />
                    </GridItem>
                    <GridItem xs={3} sm={3}>
                        <Autocomplete
                            className={classes.textField}
                            options = {endPortList}
                            getOptionLabel = { option => option.end_port_kr_name?option.end_port_kr_name:'' }
                            getOptionSelected={(option, value) => option.end_port_code?option.end_port_code:'' === value.end_port_code?value.end_port_code:''}
                            value={{end_port_kr_name:
                                endPortList.find(v=>v.end_port_code === endport)
                                ?endPortList.find(v=>v.end_port_code === endport).end_port_kr_name:''
                            }}
                            id="endPortList"
                            onChange={(e, option)=>
                                {
                                    setEndport(option?option.end_port_code:null);
                                }
                            }
                            renderInput={
                                params =>(
                                <TextField
                                    inputProps={{maxLength:5}}
                                    {...params}
                                    label="도착"
                                    fullWidth
                                    error={endport?false:true}
                                    helperText={endport?null:'필수'}
                                    name="deny"
                                />)}
                        />
                    </GridItem>
                    <GridItem xs={2} sm={2} style={{marginLeft:'0px', paddingTop:'30px'}}>
                        <Tooltip title="즐겨찾기 추가하기" name="add_bookmark">
                            <IconButton onClick={(e)=>fncInsertBookmark()} >
                                <FavoriteBorderTwoTone fontSize={'large'} style={{color:bookmarkExists?'#f50057':''}}/>
                            </IconButton>
                        </Tooltip>
                    </GridItem>
                    <GridItem xs={10} sm={10}>
                        <ButtonGroup color="inherit" aria-label="outlined neutral button group" style={{paddingTop:'10px'}}>
                            { ( bookmarkList.length>0 )?bookmarkList.map(( data, index )=>{
                                return (
                                    <Button size="sm" key={index} onClick={()=>fncClickBookmark(data)} style={{marginRight:'4px'}}>{data.schedule_bookmark_name}</Button>
                                )
                            }):null
                            }
                        </ButtonGroup>
                    </GridItem>
                </GridContainer>
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
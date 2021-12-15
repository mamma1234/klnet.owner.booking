import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody,Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {Schedule, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import ScheduleCardBody from './ScheduleCardBody';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ScheduleBookmark = (props) => {
  const classes = useStyles();
  const [schedule, setSchedule] = useState({});
  const [openBookmark, setOpenBookmark] = useState(false);
  const [scheduleBookmarkList, setScheduleBookmarkList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setScheduleBookmarkList(props.scheduleBookmarkList);
  },[props.scheduleBookmarkList]);


  const fncOnBlur =(schedule) => {
    setSchedule({...schedule});
  }

  const fncOnClickData =(e, row)=> {
    setSchedule({...row});
  }

  const fncNewBookmark =()=> {
    setSchedule({});
  }

  const fncValidation=()=>{
    if( !schedule.schedule_bookmark_name ) return false;
    return true;
  }
  const fncSaveScheduleBookmark = (e) => {
      e.preventDefault();
      if( !userData.user_no ) {
          props.alert(
            null // onConfirm: function
            , validation.NOTLOGIN_MSG  // title: string
            ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
            ,true // show: boolean default:true
            ,true  // reverseButtons: boolean , default: false
            ,'lg' // btnSize: lg,sm,xs default:lg
            ,'' // subtitle: string
            ,true // showConfirm: boolean default: false
            ,false // showCancel: boolean default: false
            ,null // onCancel: function
          );
          return false;
      }
      if( !fncValidation() ) return false;
      if( !schedule.schedule_bookmark_seq || '0' === schedule.schedule_bookmark_seq ) {
          insertBookingScheduleBookmark();
      } else {
          updateBookingScheduleBookmark();
      }
  }

  // 입력
  const insertBookingScheduleBookmark = () => {
      const body =
      axios.post(
          "/shipper/insertBookingScheduleBookmark"
          ,{
              user_no : userData.user_no,
              schedule
          }
          ,{}
      ).then(
          res=>{
              setSchedule({});
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
              props.selectBookingScheduleBookmark();
          }
      );
  }

  // 수정
  const updateBookingScheduleBookmark = () => {
      axios.post(
          "/shipper/updateBookingScheduleBookmark"
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
              props.selectBookingScheduleBookmark();
          }
      );
  }

  // 삭제
  const deleteBookingScheduleBookmark = (e) => {
      e.preventDefault();
      if( !schedule.schedule_bookmark_seq ) {
          props.alert(
            null // onConfirm: function
            , '삭제할 Bookmark를 선택하세요'  // title: string
            ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
            ,true // show: boolean default:true
            ,true  // reverseButtons: boolean , default: false
            ,'lg' // btnSize: lg,sm,xs default:lg
            ,'' // subtitle: string
            ,true // showConfirm: boolean default: false
            ,false // showCancel: boolean default: false
            ,null // onCancel: function
          );
          return false;
      }
      axios.post(
          "/shipper/deleteBookingScheduleBookmark"
          ,{ schedule }
          ,{}
      ).then(
          res=>{
              setSchedule({});
              props.alert(
                null // onConfirm: function
                , validation.DEL_MSG  // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingScheduleBookmark();
          }
      );
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  return (
    <React.Fragment>
    <IconButton onClick={handleClose}>
      <Bookmarks fontSize={'default'} />
    </IconButton>

    <Dialog
      classes={{paper: classes.modal}}
      open={openBookmark}
      TransitionComponent={Transition}
      keepMounted
      onClose={()=>handleClose()}
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
          onClick={()=>handleClose()}
        ><Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>
          <Schedule fontSize={'default'} style={{marginRight: '20px'}}/>
          Schedule Bookmark
        </h4>
      </DialogTitle>
      <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
        <TableContainer className={classes.tableLine}>
          <Table 	
            stickyHeader aria-label="sticky table"
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'>
            <TableHead>
              <TableRow>
                <TableCell style={{width: '5%'}} className={classes.tableHeadercell} align="center">No.</TableCell>
                <TableCell style={{width: '25%'}} className={classes.tableHeadercell} align="center">Bookmark</TableCell>
                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Vessel</TableCell>
                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">POL</TableCell>
                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">POD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {scheduleBookmarkList.map((row,index) => (
                  <TableRow key={index}
                    className={classes.root}
                    hover
                    onClick={(e)=>fncOnClickData(e, row)}
                    selected = { schedule.schedule_bookmark_seq === row.schedule_bookmark_seq }
                  >
                    <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.schedule_bookmark_name}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.sch_vessel_name}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.sch_pol}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.sch_pod}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                  <TableCell style={{textAlignLast:'right',paddingTop:'0',paddingBottom:'0'}} colSpan={10}>
                      Bookmark 목록을 선택하세요.
                  </TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
        <div style={{margin:'0 10px'}}>
          <ScheduleCardBody
            booking={schedule}
            bookmarkYn={'Y'}
            fncOnBlurParent={fncOnBlur}
            inPortCodeList={props.inPortCodeList}
            outPortCodeList={props.outPortCodeList}
            lineVesselList={props.lineVesselList}

            // isOpen=''
          />
        </div>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button color="info" onClick={(e)=>fncNewBookmark()}
          >NEW</Button>
        <Button color="info" onClick={(e)=>fncSaveScheduleBookmark(e)}
          >SAVE</Button>
        <Button color="info" onClick={(e)=>deleteBookingScheduleBookmark(e)}
          >DELETE</Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
  );
}

export default ScheduleBookmark;
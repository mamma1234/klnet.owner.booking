import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {Map, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import CarrierCardBody from './CarrierCardBody';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const CarrierBookmark = (props) => {
  const classes = useStyles();
  const [line, setLine] = useState({});
  const [openBookmark, setOpenBookmark] = useState(false);
  const [lineBookmarkList, setLineBookmarkList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setLine({
      ...line,
      'line_bookmark_seq':props.booking?props.booking.line_bookmark_seq:null,
      'line_bookmark_name':props.booking?props.booking.line_bookmark_name:null,
      'line_name1':props.booking?props.booking.line_name1:null,
      'line_name2':props.booking?props.booking.line_name2:null,
      'line_code':props.booking?props.booking.line_code:null,
      'line_user_email':props.booking?props.booking.line_user_email:null,
      'line_user_fax':props.booking?props.booking.line_user_fax:null,
      'line_user_name':props.booking?props.booking.line_user_name:null,
      'line_user_tel':props.booking?props.booking.line_user_tel:null,
      'line_user_dept':props.booking?props.booking.line_user_dept:null,
      'line_address1':props.booking?props.booking.line_address1:null,
      'line_address2':props.booking?props.booking.line_address2:null,
      'line_address3':props.booking?props.booking.line_address3:null,
      'line_address4':props.booking?props.booking.line_address4:null,
      'line_address5':props.booking?props.booking.line_address5:null,
    })
  },[props.booking]);

  useEffect(()=>{
    setLineBookmarkList(props.lineBookmarkList);
  },[props.lineBookmarkList]);

  const fncBookmark =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnBlurBookmark =(lines) => {
    setLine({...lines});
  }

  const fncOnClickData =(e, row)=> {
    setLine({...row});
  }

  const fncNewBookmark =()=> {
    setLine({});
  }

  const fncValidation =()=> {
      if( !line.line_bookmark_name ) return false;
      if( line.line_user_email ) {
          if( !validation.validationEmail(line.line_user_email) ) return false;
      }
      return true;
  }
  // Carrier Bookmark 입력하기
  const fncSaveLineBookmark=(e)=>{
      e.preventDefault(e);
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
      if( !line.line_bookmark_seq || '0' === line.line_bookmark_seq ) {
          insertBookingLineBookmark();
      } else {
          updateBookingLineBookmark();
      }
  }

  // Insert Line Bookmark
  const insertBookingLineBookmark = () => {
    const body =
    axios.post(
        "/shipper/insertBookingLineBookmark"
        ,{
            user_no : userData.user_no,
            line
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
            props.selectBookingLineBookmark();
            
            setLine({});
        }
    );
  }

  // Update Line Bookmark
  const updateBookingLineBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBookingLineBookmark"
          ,{
              user_no : userData.user_no,
              line
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
              props.selectBookingLineBookmark();
          }
      );
  }

  // Delete Line Bookmark
  const deleteBookingLineBookmark = () => {
      if( !line.line_bookmark_seq ) {
          props.alert(
            null // onConfirm: function
            , "삭제할 Bookmark를 선택하세요."  // title: string
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
      const body =
      axios.post(
          "/shipper/deleteBookingLineBookmark"
          ,{
              user_no : userData.user_no,
              line
          }
          ,{}
      ).then(
          res=>{
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
              setLine({});
              props.selectBookingLineBookmark();
          }
      );
  }
  return (
    <React.Fragment>
      <IconButton onClick={fncBookmark}>
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
              <Map fontSize={'default'} style={{marginRight: '20px'}}/>
              Carrier Bookmark
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
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Bookmark</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Code</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Carrier</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {lineBookmarkList.map((row,index) => (
                      <TableRow key={index}
                        className={classes.root}
                        hover
                        onClick={(e)=>fncOnClickData(e, row)}
                        selected = { line.line_bookmark_seq === row.line_bookmark_seq }
                      >
                        <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.line_bookmark_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.line_code}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.line_name1}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.line_user_name}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{margin:'0 10px'}}>
              <CarrierCardBody
                booking={line}
                fncOnBlurParent={fncOnBlurBookmark}
                bookmarkYn={'Y'}
                lineWorkOriginatorList={props.lineWorkOriginatorList}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button color="info" onClick={(e)=>fncNewBookmark()}
              >NEW</Button>
            <Button color="info" onClick={(e)=>fncSaveLineBookmark(e)}
              >SAVE</Button>
            <Button color="info" onClick={(e)=>deleteBookingLineBookmark(e)}
              >DELETE</Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CarrierBookmark;
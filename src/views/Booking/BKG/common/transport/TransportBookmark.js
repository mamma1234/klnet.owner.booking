import React,{ useState, useEffect } from "react";
import axios from 'axios';
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {LocalShipping, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import TransportCardBody from './TransportCardBody';
import * as validation from 'components/common/validation.js';
import Button from "components/CustomButtons/Button.js";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const TransportBookmark = (props) => {
  const classes = useStyles();
  const [transport, setTransport] = useState({});
  const [openBookmark, setOpenBookmark] = useState(false);
  const [transportBookmarkList, setTransportBookmarkList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setTransport({
      ...transport,
      'transport_bookmark_seq': props.booking?props.booking.transport_bookmark_seq:null,
      'transport_bookmark_name': props.booking?props.booking.transport_bookmark_name:null,
      'trans_name1': props.booking?props.booking.trans_name1:null,
      'trans_name2': props.booking?props.booking.trans_name2:null,
      'trans_code': props.booking?props.booking.trans_code:null,
      'trans_self_yn': props.booking?props.booking.trans_self_yn:null,
      'trans_user_fax': props.booking?props.booking.trans_user_fax:null,
      'trans_user_name': props.booking?props.booking.trans_user_name:null,
      'trans_user_tel': props.booking?props.booking.trans_user_tel:null,
      'trans_user_email': props.booking?props.booking.trans_user_email:null,
      'trans_fac_name': props.booking?props.booking.trans_fac_name:null,
      'trans_fac_area_name': props.booking?props.booking.trans_fac_area_name:null,
      'trans_remark': props.booking?props.booking.trans_remark:null,
    });
  },[props.booking])

  useEffect(()=>{
    setTransportBookmarkList(props.transportBookmarkList);
  },[props.transportBookmarkList]);

  const fncValidation =()=> {
    if( !transport.transport_bookmark_name ) return false;
    if( transport.trans_user_email ) {
        if( !validation.validationEmail(transport.trans_user_email) ) return false;
    }
    return true;
  }
  // Transport Bookmark 입력하기
  const fncSaveTransportBookmark=(e)=>{
      e.preventDefault(e);
      if( !userData.user_no ) {
          props.alert(
            null // onConfirm: function
            , validation.NOTLOGIN_MSG // title: string
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
      if( !transport.transport_bookmark_seq || '0' === transport.transport_bookmark_seq ) {
          insertBookingTransportBookmark();
      } else {
          updateBookingTransportBookmark();
      }
  }

  // Insert Transport Bookmark
  const insertBookingTransportBookmark = () => {
      const body =
      axios.post(
          "/shipper/insertBookingTransportBookmark"
          ,{
              user_no : userData.user_no,
              transport
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingTransportBookmark();
              setTransport({});
          }
      );
  }

  // Update Transport Bookmark
  const updateBookingTransportBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBookingTransportBookmark"
          ,{
              user_no : userData.user_no,
              transport
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.SAVE_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingTransportBookmark();
          }
      );
  }

  // Delete Transport Bookmark
  const deleteBookingTransportBookmark = () => {
      if( !transport.transport_bookmark_seq ) {
          props.alert(
            null // onConfirm: function
            , "삭제할 Bookmark를 선택하세요." // title: string
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
          "/shipper/deleteBookingTransportBookmark"
          ,{
              user_no : userData.user_no,
              transport
          }
          ,{}
      ).then(
          res=>{
              props.alert(
                null // onConfirm: function
                , validation.DEL_MSG // title: string
                ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
              );
              props.selectBookingTransportBookmark();
              setTransport({});
          }
      );
  }

  
  const fncBookmark =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnBlur =(transport) => {
    setTransport({...transport});
  }

  const fncOnClickData =(e, row)=> {
    setTransport({...row});
  }

  const fncNewBookmark =()=> {
    setTransport({});
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
              <LocalShipping fontSize={'default'} style={{marginRight: '20px'}}/>
              Transport Bookmark
            </h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <TableContainer className={classes.tableLine}>
              <Table 	
                stickyHeader aria-label="sticky table"
                className={classes.table}
                aria-labelledby="tableTitle"
                size='medium'
                style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{width: '5%'}} className={classes.tableHeadercell} align="center">No.</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Bookmark</TableCell>
                    <TableCell style={{width: '10%'}} className={classes.tableHeadercell} align="center">Haulage</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Code</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Transport</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {transportBookmarkList.map((row,index) => (
                      <TableRow key={index}
                        className={classes.root}
                        hover
                        onClick={(e)=>fncOnClickData(e, row)}
                        selected = { transport.transport_bookmark_seq === row.transport_bookmark_seq }
                      >
                        <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.transport_bookmark_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{'Y' === row.trans_self_yn?'자가운송':'라인운송'}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_code}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_name1}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_user_name}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{margin:'0 10px'}}>
              <TransportCardBody
                booking={transport}
                fncOnBlurParent={fncOnBlur}
                bookmarkYn={'Y'}
                // {...props}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button color="info" onClick={(e)=>fncNewBookmark()}
              >NEW</Button>
            <Button color="info" onClick={(e)=>fncSaveTransportBookmark(e)}
              >SAVE</Button>
            <Button color="info" onClick={(e)=>deleteBookingTransportBookmark(e)}
              >DELETE</Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TransportBookmark;
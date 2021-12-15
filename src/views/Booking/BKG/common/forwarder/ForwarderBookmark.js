import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
  import {AirportShuttle, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import ForwarderCardBody from './ForwarderCardBody';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ForwarderBookmark = ({booking, ...props}) => {
  const classes = useStyles();
  const [forwarder, setForwarder] = useState({});
  const [openBookmark, setOpenBookmark] = useState(false);
  const [forwarderBookmarkList, setForwarderBookmarkList] = useState([])
  const {userData} = props;


  useEffect(()=>{
    setForwarder( {
      ...forwarder,
      'forwarder_bookmark_seq': booking?booking.forwarder_bookmark_seq:null,
      'forwarder_bookmark_name': booking?booking.forwarder_bookmark_name:null,
      ['fwd_name1']: booking?booking.shp_name1:null,
      ['fwd_name2']: booking?booking.shp_name2:null,
      ['fwd_code']: booking?booking.shp_code:null,
      ['fwd_user_email']: booking?booking.shp_user_email:null,
      ['fwd_user_fax']: booking?booking.shp_user_fax:null,
      ['fwd_user_name']: booking?booking.shp_user_name:null,
      ['fwd_user_tel']: booking?booking.shp_user_tel:null,
      ['fwd_user_dept']: booking?booking.shp_user_dept:null,
      ['fwd_address1']: booking?booking.shp_address1:null,
      ['fwd_address2']: booking?booking.shp_address2:null,
      ['fwd_address3']: booking?booking.shp_address3:null,
      ['fwd_address4']: booking?booking.shp_address4:null,
      ['fwd_address5']: booking?booking.shp_address5:null,
    } );
  }, [booking]);

  useEffect(()=>{
    setForwarderBookmarkList(props.forwarderBookmarkList);
  },[props.forwarderBookmarkList]);

  const fncValidation =()=> {
    if( !forwarder.forwarder_bookmark_name ) return false;
    if( forwarder.fwd_user_email ) {
        if( !validation.validationEmail(forwarder.fwd_user_email) ) return false;
    }
    return true;
  }
  // Save Forwarder Bookmark
  const fncSaveForwarderBookmark = (e) => {
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
      if( !forwarder.forwarder_bookmark_seq || '0' === forwarder.forwarder_bookmark_seq ) {
          insertBookingForwarderBookmark();
      } else {
          updateBookingForwarderBookmark();
      }
  }

  // Insert Forwarder Bookmark
  const insertBookingForwarderBookmark = () => {
      const body =
      axios.post(
          "/shipper/insertBookingForwarderBookmark"
          ,{
              user_no : userData.user_no,
              forwarder
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
              props.selectBookingForwarderBookmark();
              setForwarder({});
          }
      );
  }

  // Update Forwarder Bookmark
  const updateBookingForwarderBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBookingForwarderBookmark"
          ,{
              user_no : userData.user_no,
              forwarder
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
              props.selectBookingForwarderBookmark();
          }
      );
  }

  // Delete Forwarder Bookmark
  const deleteBookingForwarderBookmark = () => {
      if( !forwarder.forwarder_bookmark_seq ) {
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
          "/shipper/deleteBookingForwarderBookmark"
          ,{
              user_no : userData.user_no,
              forwarder
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
              props.selectBookingForwarderBookmark();
              setForwarder({});
          }
      );
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnBlur =(forwarder) => {
    setForwarder({...forwarder});
  }

  const fncOnClickData =(e, row)=> {
    setForwarder({...row});
  }

  const fncNewBookmark =()=> {
    setForwarder({});
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
          <AirportShuttle fontSize={'default'} style={{marginRight: '20px'}}/>
          Forwarder Bookmark
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
                <TableCell style={{width: '25%'}} className={classes.tableHeadercell} align="center">Bookmark</TableCell>
                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Code</TableCell>
                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Forwarder</TableCell>
                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {forwarderBookmarkList.map((row,index) => (
                  <TableRow key={index}
                    className={classes.root}
                    hover
                    onClick={(e)=>fncOnClickData(e, row)}
                    selected = { forwarder.forwarder_bookmark_seq === row.forwarder_bookmark_seq }
                  >
                    <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.forwarder_bookmark_name}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.fwd_code}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.fwd_name1}</TableCell>
                    <TableCell align="center" className={classes.tablecell}>{row.fwd_user_name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{margin:'0 10px'}}>
          <ForwarderCardBody
            booking={forwarder}
            fncOnBlurParent={fncOnBlur}
            bookmarkYn={'Y'}
            forwarderCompanyList={props.forwarderCompanyList}
            // {...props}
          />
        </div>
        <DialogActions className={classes.modalFooter}>
          <Button color="info" onClick={(e)=>fncNewBookmark()}
            >NEW</Button>
          <Button color="info" onClick={(e)=>fncSaveForwarderBookmark(e)}
            >SAVE</Button>
          <Button color="info" onClick={(e)=>deleteBookingForwarderBookmark(e)}
            >DELETE</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
    </React.Fragment>
  );
}

export default ForwarderBookmark;
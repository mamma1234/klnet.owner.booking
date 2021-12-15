import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {DirectionsBoat, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import ShipperCardBody from './ShipperCardBody';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ShipperBookmark = (props) => {
  const classes = useStyles();
  const [shipper, setShipper] = useState({});
  const [openBookmark, setOpenBookmark] = useState(false);
  const [shipperBookmarkList, setShipperBookmarkList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setShipper({
      ...shipper,
      'shipper_bookmark_seq': props.booking?props.booking.shipper_bookmark_seq:null,
      'shipper_bookmark_name':props.booking?
      shipperBookmarkList.find(v=>v.shipper_bookmark_seq === props.booking.shipper_bookmark_seq)
      ?shipperBookmarkList.find(v=>v.shipper_bookmark_seq === props.booking.shipper_bookmark_seq).shipper_bookmark_name:null
      :null,
      'shp_name1':props.booking?props.booking.fwd_name1:null,
      'shp_name2':props.booking?props.booking.fwd_name2:null,
      'shp_code':props.booking?props.booking.fwd_code:null,
      'shp_user_name':props.booking?props.booking.fwd_user_name:null,
      'shp_user_tel':props.booking?props.booking.fwd_user_tel:null,
      'shp_user_email':props.booking?props.booking.fwd_user_email:null,
      'shp_address1':props.booking?props.booking.fwd_address1:null,
      'shp_address2':props.booking?props.booking.fwd_address2:null,
      'shp_address3':props.booking?props.booking.fwd_address3:null,
      'shp_address4':props.booking?props.booking.fwd_address4:null,
      'shp_address5':props.booking?props.booking.fwd_address5:null,
      'shp_user_dept':props.booking?props.booking.fwd_user_dept:null,
      'shp_user_fax':props.booking?props.booking.fwd_user_fax:null,
      'shp_payment_type':props.booking?props.booking.fwd_payment_type:null,
    });
  },[props.booking])

  useEffect(()=>{
    setShipperBookmarkList(props.shipperBookmarkList);
  },[props.shipperBookmarkList]);

  const fncBookmark =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnClickData =(e, row)=> {
    setShipper({...row});
  }

  const fncNewBookmark =()=> {
    setShipper({});
  }

  const fncOnBlur =(shipper) => {
    setShipper({...shipper});
  }


  const fncValidation =()=> {
    if( !shipper.shipper_bookmark_name ) return false;
    if( shipper.shp_user_email ) {
        if( !validation.validationEmail(shipper.shp_user_email) ) return false;
    }
    return true;
}
// Save Shipper Bookmark
const fncSaveShipperBookmark = (e) => {
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
    if (!fncValidation()) return false;
    if( !shipper.shipper_bookmark_seq || '0' === shipper.shipper_bookmark_seq ) {
        insertBookingShipperBookmark();
    } else {
        updateBookingShipperBookmark();
    }
}

// Insert Shipper Bookmark
const insertBookingShipperBookmark = () => {
    const body =
    axios.post(
        "/shipper/insertBookingShipperBookmark"
        ,{
            user_no : userData.user_no,
            shipper
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
            props.selectBookingShipperBookmark();
            setShipper({});
        }
    );
}

  // Update Shipper Bookmark
  const updateBookingShipperBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBookingShipperBookmark"
          ,{
              user_no : userData.user_no,
              shipper
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
              props.selectBookingShipperBookmark();
          }
      );
  }

  // Delete Shipper Bookmark
  const deleteBookingShipperBookmark = () => {
    if( !shipper.shipper_bookmark_seq ) {
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
        "/shipper/deleteBookingShipperBookmark"
        ,{
            user_no : userData.user_no,
            shipper
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
            props.selectBookingShipperBookmark();
            setShipper({});
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
        // TransitionComponent={Transition}
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
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            size="sm"
            onClick={()=>handleClose()}
          ><Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>
            <DirectionsBoat fontSize={'default'} style={{marginRight: '20px'}}/>
            Shipper Bookmark
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
                  <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Code</TableCell>
                  <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {shipperBookmarkList.map((row,index) => (
                    <TableRow key={index}
                      className={classes.root}
                      hover
                      onClick={(e)=>fncOnClickData(e, row)}
                      selected = { shipper.shipper_bookmark_seq === row.shipper_bookmark_seq }
                    >
                      <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.shipper_bookmark_name}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.shp_code}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.shp_name1}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{margin:'0 10px'}}>
            <ShipperCardBody
              booking={shipper}
              fncOnBlurParent={fncOnBlur}
              bookmarkYn={'Y'}
              shipperCompanyList={props.shipperCompanyList}
              // {...props}
            />
          </div>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="info" onClick={(e)=>fncNewBookmark()}
            >NEW</Button>
          <Button color="info" onClick={(e)=>fncSaveShipperBookmark(e)}
            >SAVE</Button>
          <Button color="info" onClick={(e)=>deleteBookingShipperBookmark(e)}
            >DELETE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ShipperBookmark;
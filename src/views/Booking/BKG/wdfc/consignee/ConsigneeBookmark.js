import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {HowToVote, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import ConsigneeCardBody from './ConsigneeCardBody';
import * as validation from 'components/common/validation.js';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ConsigneeBookmark = (props) => {
  const classes = useStyles();
  const [openBookmark, setOpenBookmark] = useState(false);
  const [consigneeBookmarkList, setConsigneeBookmarkList] = useState([]);
  const [consignee, setConsignee] = useState({});
  const {userData} = props;
  useEffect(()=>{
    setConsigneeBookmarkList(props.consigneeBookmarkList);
  },[props.consigneeBookmarkList]);

  const fncBookmark =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnClickData =(e, row)=> {
    setConsignee({...row});
  }

  const fncNewBookmark =()=> {
    setConsignee({});
  }

  const fncOnBlur =(consignee) => {
    setConsignee({...consignee});
  }

  const fncValidation=()=>{
    if( !consignee.consignee_bookmark_name ) return false;
    if( consignee.cons_user_email ) {
        if( !validation.validationEmail(consignee.cons_user_email) ) return false;
    }
    return true;
}
// Consignee Bookmark 입력하기
const fncSaveConsigneeBookmark=(e)=>{
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
    if( !consignee.consignee_bookmark_seq || '0' === consignee.consignee_bookmark_seq ) {
        insertBookingConsigneeBookmark();
    } else {
        updateBookingConsigneeBookmark();
    }
}

// Insert Consignee Bookmark
const insertBookingConsigneeBookmark = () => {
    const body =
    axios.post(
        "/shipper/insertBookingConsigneeBookmark"
        ,{
            user_no : userData.user_no,
            consignee
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
            props.selectBookingConsigneeBookmark();
            setConsignee({});
        }
    );
}

// Update Consignee Bookmark
const updateBookingConsigneeBookmark = () => {
    const body =
    axios.post(
        "/shipper/updateBookingConsigneeBookmark"
        ,{
            user_no : userData.user_no,
            consignee
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
            props.selectBookingConsigneeBookmark();
        }
    );
  }

  // Delete Consignee Bookmark
  const deleteBookingConsigneeBookmark = () => {
      if( !consignee.consignee_bookmark_seq ) {
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
          "/shipper/deleteBookingConsigneeBookmark"
          ,{
              user_no : userData.user_no,
              consignee
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
              props.selectBookingConsigneeBookmark();
              setConsignee({});
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
            <HowToVote fontSize={'default'} style={{marginRight: '20px'}}/>
            Consignee Bookmark
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
                  <TableCell style={{width: '25%'}} className={classes.tableHeadercell} align="center">Consignee</TableCell>
                  <TableCell style={{width: '25%'}} className={classes.tableHeadercell} align="center">User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {consigneeBookmarkList.map((row,index) => (
                    <TableRow key={index}
                      className={classes.root}
                      hover
                      onClick={(e)=>fncOnClickData(e, row)}
                      selected = { consignee.consignee_bookmark_seq === row.consignee_bookmark_seq }
                    >
                      <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.consignee_bookmark_name}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.cons_code}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.cons_name1}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.cons_user_name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{margin:'0 10px'}}>
            <ConsigneeCardBody
                booking={consignee}
                fncOnBlurParent={fncOnBlur}
                bookmarkYn={'Y'}
              />
          </div>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="info" onClick={(e)=>fncNewBookmark()}
            >NEW</Button>
          <Button color="info" onClick={(e)=>fncSaveConsigneeBookmark(e)}
            >SAVE</Button>
          <Button color="info" onClick={(e)=>deleteBookingConsigneeBookmark(e)}
            >DELETE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ConsigneeBookmark;
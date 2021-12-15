import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {ListAlt, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import DocumentCardBody from './DocumentCardBody';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DocumentBookmark = (props) => {
  const classes = useStyles();
  const [document, setDocument] = useState({});
  const [openBookmark, setOpenBookmark] = useState(false);
  const [documentBookmarkList, setDocumentBookmarkList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setDocumentBookmarkList(props.documentBookmarkList);
  },[props.documentBookmarkList]);
  const fncBookmark =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnBlur =(document) => {
    setDocument({...document});
  }

  const fncOnClickData =(e, row)=> {
    setDocument({...row});
  }

  const fncNewBookmark =()=> {
    setDocument({});
  }

  const fncValidation =()=> {
    if( !document.document_bookmark_name ) return false;
    if( document.docu_user_email ) {
        if( !validation.validationEmail(document.docu_user_email) ) return false;
    }
    if( document.docu_tax_email ) {
      if( !validation.validationEmail(document.docu_tax_email) ) return false;
  }
    return true;
  }
  // save
  const saveDocumentBookmark = (e) => {
    e.preventDefault();
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
    if( document.document_bookmark_seq ) {
        updateBookingDocumentBookmark();
    } else {
        insertBookingDocumentBookmark();
    }
  }
  // 입력
  const insertBookingDocumentBookmark = () => {
    const body =
    axios.post(
        "/shipper/insertBookingDocumentBookmark"
        ,{
            user_no : userData.user_no,
            document
        }
        ,{}
    ).then(
        res=>{
            setDocument({});
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
            props.selectBookingDocumentBookmark();
        }
    );
  }

  // 수정
  const updateBookingDocumentBookmark = () => {
      axios.post(
          "/shipper/updateBookingDocumentBookmark"
          ,{ 
              user_no : userData.user_no,
              document 
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
              props.selectBookingDocumentBookmark();
          }
      );
  }

  // 삭제
  const deleteBookingDocumentBookmark = (e) => {
      e.preventDefault();
      if( !document.document_bookmark_seq ) {
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
          return
      }
      axios.post(
          "/shipper/deleteBookingDocumentBookmark"
          ,{ document }
          ,{}
      ).then(
          res=>{
              setDocument({});
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
              props.selectBookingDocumentBookmark();
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
              <ListAlt fontSize={'default'} style={{marginRight: '20px'}}/>
              Document Bookmark
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
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">User</TableCell>
                    <TableCell style={{width: '30%'}} className={classes.tableHeadercell} align="center">Email</TableCell>
                    <TableCell style={{width: '25%'}} className={classes.tableHeadercell} align="center">Tax Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {documentBookmarkList.map((row,index) => (
                      <TableRow key={index}
                        className={classes.root}
                        hover
                        onClick={(e)=>fncOnClickData(e, row)}
                        selected = { document.document_bookmark_seq === row.document_bookmark_seq }
                      >
                        <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.document_bookmark_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.docu_user_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.docu_user_email}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.docu_tax_email}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{margin:'0 10px'}}>
              <DocumentCardBody
                booking={document}
                fncOnBlurParent={fncOnBlur}
                bookmarkYn={'Y'}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button color="info" onClick={(e)=>fncNewBookmark()}
              >NEW</Button>
            <Button color="info" onClick={(e)=>saveDocumentBookmark(e)}
              >SAVE</Button>
            <Button color="info" onClick={(e)=>deleteBookingDocumentBookmark(e)}
              >DELETE</Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DocumentBookmark;
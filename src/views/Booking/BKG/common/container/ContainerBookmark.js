import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
  import {ViewComfy, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import ContainerForm from './ContainerForm';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ContainerBookmark = (props) => {
  const classes = useStyles();
  const [container, setContainer] = useState([]);
  const [openBookmark, setOpenBookmark] = useState(false);
  const [containerBookmarkList, setContainerBookmarkList] = useState([]);
  const [cntrCodeLineCodeList, setCntrCodeLineCodeList] = useState([]);
  const {userData} = props;

  useEffect(()=>{
    setContainerBookmarkList(props.containerBookmarkList);
  },[props.containerBookmarkList]);
  
  useEffect(()=>{
    setCntrCodeLineCodeList(props.cntrCodeLineCodeList);
  },[props.cntrCodeLineCodeList]);

  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const validationContainer=()=>{
    if( !container.container_bookmark_name ) return false;
    return true;
  }
  // Container Bookmark 저장
  const fncSaveContainerBookmark=(e)=>{
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
      if( !validationContainer() ) return false;
      if( !container.container_bookmark_seq || '0' === container.container_bookmark_seq ) {
          insertBoookingContainerBookmark();
      } else {
          updateBoookingContainerBookmark();
      }
  }

  // Insert Container Bookmark
  const insertBoookingContainerBookmark = () => {
      const body =
      axios.post(
          "/shipper/insertBoookingContainerBookmark"
          ,{
              user_no : userData.user_no,
              container,
              specialBookmarkRelationList:[]
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
              props.selectBookingContainerBookmark();
              // props.selectBookingSpecialBookmark();
          }
      );
  }

  // Update Container Bookmark
  const updateBoookingContainerBookmark = () => {
      const body =
      axios.post(
          "/shipper/updateBoookingContainerBookmark"
          ,{
              user_no : userData.user_no,
              container,
              specialBookmarkRelationList:[]
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
              props.selectBookingContainerBookmark();
              // props.selectBookingSpecialBookmark();
          }
      );
  }

  // Container Bookmark 삭제
  const fncDeleteContainerBookmark=(e)=>{
      const body =
      axios.post(
          "/shipper/deleteBookingContainerBookmark"
          ,{
              user_no : userData.user_no,
              container,
              // goodsRelationList
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
              props.selectBookingContainerBookmark();
              // props.selectBookingSpecialBookmark();
              setContainer({});
          }
      );
  }

  const fncOnBlurContainer =(index, container)=> {
    setContainer({...container});
  }

  const fncNewBookmark =()=> {
    setContainer({});
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
            <ViewComfy fontSize={'default'} style={{marginRight: '20px'}}/>
            Container Bookmark
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
                  <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Size/Type</TableCell>
                  <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">SOC</TableCell>
                  <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Qty</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {containerBookmarkList.map((row,index) => (
                    <TableRow key={index}
                      className={classes.root}
                      hover
                      onClick={(e)=>setContainer({...row})}
                      selected = { container.container_bookmark_seq === row.container_bookmark_seq }
                    >
                      <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.container_bookmark_name}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.cntr_code}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.cntr_soc_yn}</TableCell>
                      <TableCell align="center" className={classes.tablecell}>{row.cntr_qty}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{margin:'0 10px'}}>
            <ContainerForm
              container={container}
              index={1}
              cntrCodeLineCodeList={cntrCodeLineCodeList}
              fncOnBlurContainerBody={fncOnBlurContainer}
              bookmarkYn={'Y'}
              {...props}
            />
          </div>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="info" onClick={(e)=>fncNewBookmark()}
            >NEW</Button>
          <Button color="info" onClick={(e)=>fncSaveContainerBookmark(e)}
            >SAVE</Button>
          <Button color="info" onClick={(e)=>fncDeleteContainerBookmark(e)}
            >DELETE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// function areEqual (prevProps, nextProps) {
//   return (     prevProps.openContainer === nextProps.openContainer
//     && prevProps.containerList === nextProps.containerList
//     && prevProps.containerBookmarkList === nextProps.containerBookmarkList
//     && prevProps.specialBookmarkList === nextProps.specialBookmarkList
//     && prevProps.cntrCodeLineCodeList === nextProps.cntrCodeLineCodeList
//     && prevProps.booking.trans_service_code === nextProps.booking.trans_service_code
//     && prevProps.containerSpecialList === nextProps.containerSpecialList
//     && prevProps.lineCodeVesselPickup === nextProps.lineCodeVesselPickup
//     // bookmark
//     && prevProps.booking.bookmark_seq === nextProps.booking.bookmark_seq
//     && prevProps.booking.other_bookmark_seq === nextProps.booking.other_bookmark_seq
//     && prevProps.booking.cargo_bookmark_seq === nextProps.booking.cargo_bookmark_seq
//     && prevProps.booking.line_bookmark_seq === nextProps.booking.line_bookmark_seq
//     && prevProps.booking.consignee_bookmark_seq === nextProps.booking.consignee_bookmark_seq
//     && prevProps.booking.container_bookmark_seq === nextProps.booking.container_bookmark_seq
//     && prevProps.booking.document_bookmark_seq === nextProps.booking.document_bookmark_seq
//     && prevProps.booking.forwarder_bookmark_seq === nextProps.booking.forwarder_bookmark_seq
//     && prevProps.booking.schedule_bookmark_seq === nextProps.booking.schedule_bookmark_seq
//     && prevProps.booking.shipper_bookmark_seq === nextProps.booking.shipper_bookmark_seq
//     && prevProps.booking.transport_bookmark_seq === nextProps.booking.transport_bookmark_seq
//   )
// }

export default ContainerBookmark;
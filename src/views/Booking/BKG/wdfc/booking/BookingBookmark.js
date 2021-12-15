import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {GolfCourse, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import BookingCardBody from './BookingCardBody';
import * as validation from 'components/common/validation.js';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const BookingBookmark = (props) => {
  const classes = useStyles();
  const [other, setOther] = useState({});
  const [otherBookmarkList, setOtherBookmarkList] = useState([]);
  const [incotermsLineCodeList, setIncotermsLineCodeList] = useState([]);
  const [serviceLineCodeList, setServiceLineCodeList] = useState([]);
  const [openBookmark, setOpenBookmark] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const {userData} = props;

  useEffect(()=>{
    setOther({
      ...other,
      'other_bookmark_seq': props.booking?props.booking.other_bookmark_seq:null,
      'other_bookmark_name': props.booking?props.booking.other_bookmark_name:null,
      'sc_no': props.booking?props.booking.sc_no:null,
      'remark1': props.booking?props.booking.remark1:null,
      'remark2': props.booking?props.booking.remark2:null,
      'shp_payment_type': props.booking?props.booking.shp_payment_type:null,
      'trans_service_code': props.booking?props.booking.trans_service_code:null
    })
  },[props.booking])

  useEffect(()=>{
    setServiceLineCodeList(props.serviceLineCodeList);
  },[props.serviceLineCodeList]);

  useEffect(()=>{
    setOtherBookmarkList(props.otherBookmarkList);
  },[props.otherBookmarkList]);

  useEffect(()=>{
    setIncotermsLineCodeList(props.incotermsLineCodeList);
  },[props.incotermsLineCodeList]);

  useEffect(()=>{
    if( !isShow) {
      setIsShow(true);
    }
  })

  const fncOnBlur =(other) => {
    setOther(other);
  }

  const fncBookmark =(e)=> {
    setOpenBookmark(!openBookmark);
  }
  const handleClose =(e)=> {
    setOpenBookmark(!openBookmark);
  }

  const fncOnClickData =(e, row)=> {
    setOther({...row});
  }

  const fncNewBookmark =()=> {
    setOther({});
  }

  // 입력
  const insertBookingOtherBookmark = () => {
    const body =
    axios.post(
        "/shipper/insertBookingOtherBookmark"
        ,{
            user_no : userData.user_no,
            other
        }
        ,{}
    ).then(
        res=>{
            props.selectBookingOtherBookmark();
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
        }
    );
  }

  // 수정
  const updateBookingOtherBookmark = () => {
      axios.post(
          "/shipper/updateBookingOtherBookmark"
          ,{ 
              // user_no : user.user_no,
              user_no: userData.user_no,
              other 
          }
          ,{}
      ).then(
          res=>{
              props.selectBookingOtherBookmark();
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
          }
      );
  }

  // 삭제
  const deleteBookingOtherBookmark = (e) => {
      e.preventDefault();
      if( !other.other_bookmark_seq ) {
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
      axios.post(
          "/shipper/deleteBookingOtherBookmark"
          ,{ other }
          ,{}
      ).then(
          res => {
              props.selectBookingOtherBookmark();
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
              setOther({});
          }
      );
  }

  // save
  const saveOtherBookmark = () => {
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
    }
    
    if( !other.other_bookmark_name ) return false;
    if( other.other_bookmark_seq ) {
        updateBookingOtherBookmark();
    } else {
        insertBookingOtherBookmark();
    }
  }

  const fncOnBlurParent=(booking)=>{
    setOther(booking)
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
              <GolfCourse fontSize={'default'} style={{marginRight: '20px'}}/>
              Booking Bookmark
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
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Term</TableCell>
                    <TableCell style={{width: '50%'}} className={classes.tableHeadercell} align="center">Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {otherBookmarkList.map((row,index) => (
                      <TableRow key={index}
                        className={classes.root}
                        hover
                        onClick={(e)=>fncOnClickData(e, row)}
                        selected = { other.other_bookmark_seq === row.other_bookmark_seq }
                      >
                        <TableCell align="center" className={classes.tablecell}>{row.seq}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.other_bookmark_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_service_code_name}</TableCell>
                        <TableCell align="left"   className={classes.tablecell}>{row.remark1}</TableCell>
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
              <BookingCardBody
                booking={other}
                fncOnBlurParent={fncOnBlurParent}
                serviceLineCodeList={serviceLineCodeList}
                incotermsLineCodeList={incotermsLineCodeList}
                fncOnBlurParent={fncOnBlur}
                bookmarkYn={'Y'}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button color="info" onClick={(e)=>fncNewBookmark()}
              >NEW</Button>
            <Button color="info" onClick={(e)=>saveOtherBookmark(e)}
              >SAVE</Button>
            <Button color="info" onClick={(e)=>deleteBookingOtherBookmark(e)}
              >DELETE</Button>
          </DialogActions>
        </Dialog>
        {/* <Modal
          open={openBookmark}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={{paper: classes.modal}}
          style={{ paddingLeft :'5%', paddingRight :'5%', paddingTop: '5%' , paddingBottom: '5%'}}
        >
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <GolfCourse fontSize={'default'}/>
                </Avatar>
              }
              action={
                <IconButton onClick={()=>handleClose()}>
                  <Close fontSize={'default'} />
                </IconButton>
              }
              subheader={
                <GridContainer>
                  <GridItem xs={10} sm={10}>
                    <Typography className={classes.bookmarkTypography}>Booking Bookmark</Typography>
                  </GridItem>
                </GridContainer>
              }
            >
            </CardHeader>
            <CardBody>
              <Divider className={classes.divider}/>
              <TableContainer className={classes.tablecontainer}>
                
              </TableContainer>
              <Divider className={classes.divider}/>
              
            </CardBody>
            <GridItem xs={12} sm={12} style={{textAlignLast:'right'}}>
              <Button color="info" onClick={(e)=>fncNewBookmark()}>NEW</Button>
              <Button color="info" onClick={(e)=>saveOtherBookmark()}>SAVE</Button>
              <Button color="info" onClick={(e)=>deleteBookingOtherBookmark(e)}>DELETE</Button>
            </GridItem>
          </Card>
        </Modal> */}
      </React.Fragment>
  );
}


export default BookingBookmark;
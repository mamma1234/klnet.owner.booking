import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody, Paper, Typography, InputLabel, TextField
  , Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
  import {ViewComfy, Bookmarks, Close} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import ContainerForm from './ContainerForm';
import Slide from "@material-ui/core/Slide";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import Datetime from "react-datetime";
import moment from 'moment';

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

  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    container[key] = value;
    setContainer({...container});
  }

  const fncOnBlurDoor =(params)=> {
    setContainer({
      ...container,
      ['cntr_remark1']: params.cntr_remark1,
      ['cntr_remark2']: params.cntr_remark2,
      ['cntr_remark3']: params.cntr_remark3,
      ['cntr_remark4']: params.cntr_remark4,
      ['cntr_remark5']: params.cntr_remark5,
      ['cntr_door_user_name']: params.cntr_door_user_name,
      ['cntr_door_user_tel']: params.cntr_door_user_tel,
      ['cntr_door_address1']: params.cntr_door_address1,
      ['cntr_door_address2']: params.cntr_door_address2,
      ['cntr_door_address3']: params.cntr_door_address3,
      ['cntr_door_address4']: params.cntr_door_address4,
      ['cntr_door_address5']: params.cntr_door_address5,
    });
  }

  const fncOnChagneDateTime=(date, code)=>{
    const value = moment(date).format('YYYYMMDDHHmm');
    if( 'Invalid date' === value) {
      setContainer({...container, [code]:null,});

    } else {
      setContainer({
        ...container,
        [code]:value,
      });
    }
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
            <GridContainer>

              <GridItem className={classes.grid} lg={6} md={12} sm={12} xs={12}>
                <Paper className={classes.paper} style={{height: '428px'}}>
                  <GridItem xs={11} sm={11}>
                    <Typography variant='h6'>
                      Remark
                    </Typography>
                  </GridItem>
                  <br/>
                  <GridContainer>
                  <GridItem xs={12} sm={2} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        Remark
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_remark1?true:false}
                        error={container.cntr_remark1?false:true}
                        labelText=""
                        maxLength="60"
                        id="cntr_remark1"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_remark1?container.cntr_remark1:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: transSelfYn
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_remark2?true:false}
                        error={container.cntr_remark2?false:true}
                        labelText=""
                        maxLength="60"
                        id="cntr_remark2"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_remark2?container.cntr_remark2:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: transSelfYn
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_remark3?true:false}
                        error={container.cntr_remark3?false:true}
                        labelText=""
                        maxLength="60"
                        id="cntr_remark3"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_remark3?container.cntr_remark3:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: transSelfYn
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    {/* <GridItem xs={12} sm={2} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_remark4?true:false}
                        error={container.cntr_remark4?false:true}
                        labelText=""
                        maxLength="70"
                        id="cntr_remark4"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_remark4?container.cntr_remark4:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: transSelfYn
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={2} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_remark5?true:false}
                        error={container.cntr_remark5?false:true}
                        labelText=""
                        maxLength="70"
                        id="cntr_remark5"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_remark5?container.cntr_remark5:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: transSelfYn
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem> */}
                  </GridContainer> 
                </Paper>
              </GridItem>
              <GridItem className={classes.grid} lg={6} md={12} sm={12} xs={12}>
                <Paper className={classes.paper}>
                  <GridItem xs={11} sm={11}>
                    <Typography variant='h6'>
                      Door
                    </Typography>
                  </GridItem>
                  <br/>
                  <GridContainer>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        P.I.C Name
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_door_user_name?true:false}
                        error={container.cntr_door_user_name?false:true}
                        labelText=""
                        maxLength="17"
                        id="cntr_door_user_name"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_user_name?container.cntr_door_user_name:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: ("Y" === isTransSelfYn)?true:false,
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} className={classes.gridLabel}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        Tel
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={12} sm={9}>
                      <CustomInput
                        validtype="text"
                        success={container.cntr_door_user_tel?true:false}
                        error={container.cntr_door_user_tel?false:true}
                        labelText=""
                        maxLength="25"
                        id="cntr_door_user_tel"
                        formControlProps={{
                          fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                        }}
                        inputProps={{
                          value:container.cntr_door_user_tel?container.cntr_door_user_tel:'',
                          onChange: (e)=>fncOnChange(e),
                          onBlur: ()=>fncOnBlurDoor(container),
                          // disabled: ("Y" === isTransSelfYn)?true:false
                        }}
                        required={false}
                        feedback="container"
                      />
                    </GridItem>
                        <GridItem xs={12} sm={3} className={classes.gridLabel}>
                          <InputLabel style={{ color: "#AAAAAA" }}>
                            Address
                          </InputLabel>
                        </GridItem>
                        <GridItem xs={12} sm={9}>
                          <CustomInput
                            validtype="text"
                            success={container.cntr_door_address1?true:false}
                            error={container.cntr_door_address1?false:true}
                            labelText=""
                            maxLength="35"
                            id="cntr_door_address1"
                            formControlProps={{
                              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                            }}
                            inputProps={{
                              value:container.cntr_door_address1?container.cntr_door_address1:'',
                              onChange: (e)=>fncOnChange(e),
                              onBlur: ()=>fncOnBlurDoor(container),
                              // disabled: ("Y" === isTransSelfYn)?true:false
                            }}
                            required={false}
                            feedback="container"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} className={classes.gridLabel}>
                          <InputLabel style={{ color: "#AAAAAA" }}>
                          </InputLabel>
                        </GridItem>
                        <GridItem xs={12} sm={9}>
                          <CustomInput
                            validtype="text"
                            success={container.cntr_door_address2?true:false}
                            error={container.cntr_door_address2?false:true}
                            labelText=""
                            maxLength="35"
                            id="cntr_door_address2"
                            formControlProps={{
                              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                            }}
                            inputProps={{
                              value:container.cntr_door_address2?container.cntr_door_address2:'',
                              onChange: (e)=>fncOnChange(e),
                              onBlur: ()=>fncOnBlurDoor(container),
                              // disabled: ("Y" === isTransSelfYn)?true:false
                            }}
                            required={false}
                            feedback="container"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} className={classes.gridLabel}>
                          <InputLabel style={{ color: "#AAAAAA" }}>
                          </InputLabel>
                        </GridItem>
                        <GridItem xs={12} sm={9}>
                          <CustomInput
                            validtype="text"
                            success={container.cntr_door_address3?true:false}
                            error={container.cntr_door_address3?false:true}
                            labelText=""
                            maxLength="35"
                            id="cntr_door_address3"
                            formControlProps={{
                              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                            }}
                            inputProps={{
                              value:container.cntr_door_address3?container.cntr_door_address3:'',
                              onChange: (e)=>fncOnChange(e),
                              onBlur: ()=>fncOnBlurDoor(container),
                              // disabled: ("Y" === isTransSelfYn)?true:false
                            }}
                            required={false}
                            feedback="container"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} className={classes.gridLabel}>
                          <InputLabel style={{ color: "#AAAAAA" }}>
                          </InputLabel>
                        </GridItem>
                        <GridItem xs={12} sm={9}>
                          <CustomInput
                            validtype="text"
                            success={container.cntr_door_address4?true:false}
                            error={container.cntr_door_address4?false:true}
                            labelText=""
                            maxLength="35"
                            id="cntr_door_address4"
                            formControlProps={{
                              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                            }}
                            inputProps={{
                              value:container.cntr_door_address4?container.cntr_door_address4:'',
                              onChange: (e)=>fncOnChange(e),
                              onBlur: ()=>fncOnBlurDoor(container),
                              // disabled: ("Y" === isTransSelfYn)?true:false
                            }}
                            required={false}
                            feedback="container"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} className={classes.gridLabel}>
                          <InputLabel style={{ color: "#AAAAAA" }}>
                          </InputLabel>
                        </GridItem>
                        <GridItem xs={12} sm={9}>
                          <CustomInput
                            validtype="text"
                            success={container.cntr_door_address5?true:false}
                            error={container.cntr_door_address5?false:true}
                            labelText=""
                            maxLength="35"
                            id="cntr_door_address5"
                            formControlProps={{
                              fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                            }}
                            inputProps={{
                              value:container.cntr_door_address5?container.cntr_door_address5:'',
                              onChange: (e)=>fncOnChange(e),
                              onBlur: ()=>fncOnBlurDoor(container),
                              // disabled: ("Y" === isTransSelfYn)?true:false
                            }}
                            required={false}
                            feedback="container"
                          />
                        </GridItem>
                  </GridContainer>
                </Paper>
              </GridItem>
            </GridContainer>
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
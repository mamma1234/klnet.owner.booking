import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { Card, TextField, Collapse, IconButton, Divider, Avatar, CardHeader} from "@material-ui/core";
import {ListAlt, UnfoldLess, UnfoldMore} from "@material-ui/icons";
import {useStyles} from 'views/Booking/BKG/styles';
import DocumentCardBody from './DocumentCardBody';
import DocumentBookmark from './DocumentBookmark';
import { observer } from 'mobx-react-lite';

const DocumentCard = observer(({bookingStore, ...props}) => {
  const classes = useStyles();
  // const [booking, setBooking] = useState({});
  const [openDocument, setOpenDocument] = useState(false);
  const [documentBookmarkList, setDocumentBookmarkList] = useState([])


  // useEffect(()=>{
  //   if( booking ) {
  //     // 부킹번호가 바뀌면 새로운 부킹정보로 세팅
  //     setBooking(props.booking);
  //   } else if ( props.booking.bookmark_seq && "Y" === props.booking.bookmark_yn ) {
  //     // 전체북마크를 수정한 경우 관련된 정보로 세팅해준다.
  //     // let obj = Object.assign(booking, props.booking);
  //     setBooking({...booking, ...props.booking});
  //   }
  // },[props.booking]);

  useEffect(()=>{
    setOpenDocument(props.openDocument);
  },[props.openDocument]);

  useEffect(()=>{
    setDocumentBookmarkList(props.documentBookmarkList);
  },[props.documentBookmarkList]);

  // Bookmark 이벤트
  const fncSelectCodeBookmark =(option, code)=> {
    if( 'document_bookmark_seq' === code) {
        bookingStore.setBooking({
          ...bookingStore.booking,
          'document_bookmark_seq': option?option.document_bookmark_seq:null,
          'document_bookmark_name': option?option.document_bookmark_name:null,
          'docu_tax_email': option?option.docu_tax_email:null,
          'docu_user_email': option?option.docu_user_email:null,
          'docu_user_fax': option?option.docu_user_fax:null,
          'docu_user_name': option?option.docu_user_name:null,
          'docu_user_phone': option?option.docu_user_phone:null,
          'docu_user_tel': option?option.docu_user_tel:null,
        });
        // props.fncOnBlurParent({
        //   'document_bookmark_seq': option?option.document_bookmark_seq:null,
        //   'document_bookmark_name': option?option.document_bookmark_name:null,
        //   'docu_tax_email': option?option.docu_tax_email:null,
        //   'docu_user_email': option?option.docu_user_email:null,
        //   'docu_user_fax': option?option.docu_user_fax:null,
        //   'docu_user_name': option?option.docu_user_name:null,
        //   'docu_user_phone': option?option.docu_user_phone:null,
        //   'docu_user_tel': option?option.docu_user_tel:null,
        // });
    }
  }


  const fncSetOpenDocument=()=>{
    setOpenDocument(!openDocument);
    props.fncSetOpenDocument(!openDocument);
  }

  const fncOnBlurParentBody =( bookingParams )=> {
    bookingStore.setBooking( bookingParams );
  }

  return (
    <Card className={classes.paper} id="document">
      {/* {console.log("documentCard Realod")} */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <ListAlt fontSize={'large'}/>
          </Avatar>
        }
        action={
          <IconButton onClick={()=>fncSetOpenDocument()}>
            {openDocument? <UnfoldLess fontSize={'large'} /> : <UnfoldMore fontSize={'large'}/>}
          </IconButton>
        }
        title={
          <Typography variant='h5'>
            <GridContainer>
              <GridItem xs={4} sm={4}>Document
                  <DocumentBookmark
                    // booking={booking}
                    documentBookmarkList={documentBookmarkList}
                    bookmarkYn={'Y'}
                    selectBookingDocumentBookmark={props.selectBookingDocumentBookmark}
                    {...props}
                  />
              </GridItem>
              <GridItem xs={12} sm={7}>
                <Autocomplete
                    options = {documentBookmarkList}
                    noOptionsText="Bookmark 등록하세요."
                    getOptionLabel = { option => option.document_bookmark_name?option.document_bookmark_name:'' }
                    getOptionSelected={(option, value) => option.document_bookmark_name?option.document_bookmark_name:'' === value.document_bookmark_name?value.document_bookmark_name:''}
                    value={{document_bookmark_name:
                      documentBookmarkList.find(v=>v.document_bookmark_seq === bookingStore.booking.document_bookmark_seq)
                      ?documentBookmarkList.find(v=>v.document_bookmark_seq === bookingStore.booking.document_bookmark_seq).document_bookmark_name:''
                    }}
                    id="document_bookmark_seq"
                    onChange={(e, option)=>fncSelectCodeBookmark(option, 'document_bookmark_seq')}
                    renderInput={
                      params =>(<TextField inputProps={{maxLength:30}} {...params} label="Document Bookmark" fullWidth />)}
                  />
              </GridItem>
            </GridContainer>
          </Typography>
        }
      >
      </CardHeader>
      <CardBody>
        <Collapse in={openDocument}>
          <Divider className={classes.divider}/>
          <DocumentCardBody
            booking={bookingStore.booking}
            fncOnBlurParent={fncOnBlurParentBody}
            bookmarkYn={'N'}
          />
        </Collapse>
      </CardBody>
    </Card>
  );
});

// function areEqual( prevProps, nextProps ) {
//   return (
//     prevProps.openDocument === nextProps.openDocument
//     && prevProps.booking.bkg_no === nextProps.booking.bkg_no
//     && prevProps.booking.bkg_date === nextProps.booking.bkg_date
//     && prevProps.booking.user_no === nextProps.booking.user_no
//     && prevProps.booking.document_bookmark_name === nextProps.booking.document_bookmark_name
//     && prevProps.booking.docu_tax_email === nextProps.booking.docu_tax_email
//     && prevProps.booking.docu_user_email === nextProps.booking.docu_user_email
//     && prevProps.booking.docu_user_fax === nextProps.booking.docu_user_fax
//     && prevProps.booking.docu_user_name === nextProps.booking.docu_user_name
//     && prevProps.booking.docu_user_phone === nextProps.booking.docu_user_phone
//     && prevProps.booking.docu_user_tel === nextProps.booking.docu_user_tel
//     && prevProps.documentBookmarkList === nextProps.documentBookmarkList
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

export default DocumentCard;
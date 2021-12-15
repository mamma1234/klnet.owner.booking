import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

import { Card, Modal, IconButton, Divider, Avatar, CardHeader, TextField, FormLabel
    , TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter} from "@material-ui/core";
import axios from "axios";
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import {ViewComfy, Bookmarks, Close} from "@material-ui/icons";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";

const BookingBookmarkRelation = (props) => {
    const classes = useStyles();
    // Bookmark
    const [bookmark, setBookmark] = useState([]);
    const [bookmarkList, setBookmarkList] = useState([]);
    const [relationList, setRelationList] = useState([]);
    const [openBookmark, setOpenBookmark] = useState(false);
    const {booking, otherBookmarkList, scheduleBookmarkList, lineBookmarkList
        , shipperBookmarkList, consigneeBookmarkList, forwarderBookmarkList
        , transportBookmarkList, documentBookmarkList, cargoBookmarkList, containerBookmarkList} = props;

    useEffect(() => {
        if( props.userData ) {
            selectBookingBkgBookmark();
        }
    }, []);

    // useEffect(() => {
    // },[user]);

    // useEffect(()=>{
    //     props.fncBookmarkList(bookmarkList);
    // },[bookmarkList]);

    useEffect(() => {
        fncGetRelation();
    },[relationList]);

    // useEffect(() => {
    //     console.log(bookmark)
        
    // },[bookmark]);

    // select Bkg Bookmark
    const selectBookingBkgBookmark = () => {
        const body =
        axios.post(
            "/shipper/selectBookingBkgBookmark"
            ,{
                user_no : props.userData.user_no?props.userData.user_no:null,
                booking: booking,
            }
            ,{}
        ).then(
            res=>{
                setBookmarkList(res.data);
            }
        );
    }

    const fncSelectBookmark =(row)=>{
        setBookmark( row );
        // console.log(row);
        selectBookingBkgBookmarkRelation( row );
    }

    const selectBookingBkgBookmarkRelation =( bookmark )=>{
        const body =
        axios.post(
            "/shipper/selectBookingBkgBookmarkRelation"
            ,{
                user_no: props.userData.user_no?props.userData.user_no:null,
                bookmark: bookmark,
            }
            ,{}
        ).then(
            res=>{
                setRelationList(res.data);
                fncGetRelation();
            }
        );
    }
    // Bookmark 입력하기
    const fncSaveBookmark=(e)=>{
        if( !props.userData.user_no ) {
            // props.onNotiAlert("danger", validation.NOTLOGIN_MSG);

            props.alert(
                false // onConfirm: function
                , ''  // title: string
                ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,validation.NOTLOGIN_MSG // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,false // onCancel: function
            );

            return false;
        }
        if( !bookmark.bookmark_name ) return false;
        if( relationList.length < 1 ) {
            props.alert(
                false // onConfirm: function
                , ''  // title: string
                ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'Bookmark 선택된 내용이 없습니다.' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,false // onCancel: function
            );
            return false;
        }
        e.preventDefault(e);
        const body =
        axios.post(
            "/shipper/saveBookingBkgBookmark"
            ,{
                user_no: props.userData.user_no?props.userData.user_no:null,
                bookmark: bookmark,
                relationList: relationList
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
                selectBookingBkgBookmark();
            }
        );
    }
    const deleteBookmark=(e)=>{
        e.preventDefault(e);
        if( !bookmark.bookmark_name ) {
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
            return false;
        }
        const body =
        axios.post(
            "/shipper/deleteBookmark"
            ,{
                user_no: props.userData.user_no?props.userData.user_no:null,
                bookmark: bookmark,
            }
            ,{}
        ).then(
            res=>{
                // onAlert("success", "저장 되었습니다.");
                props.alert(
                    null // onConfirm: function
                    , "삭제 되었습니다."  // title: string
                    ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                    ,true // show: boolean default:true
                    ,true  // reverseButtons: boolean , default: false
                    ,'lg' // btnSize: lg,sm,xs default:lg
                    ,'' // subtitle: string
                    ,true // showConfirm: boolean default: false
                    ,false // showCancel: boolean default: false
                    ,null // onCancel: function
                );
                selectBookingBkgBookmark();
                fncInitBookmark();
            }
        );
    }

    // New Bookmark
    const fncInitBookmark =(e)=> {
        e.preventDefault();
        setBookmark({});
        setRelationList([]);
    }

    const fncOnChange =(e, key)=> {
        e.preventDefault();
        setBookmark({...bookmark, [key]:e.target.value.toUpperCase()});
    }
    const fncOnchangeRelation =(e, key)=> {
        // console.log(e, key)
        // relationList 정보에 취합
        let row = relationList.find( function( item ) {
            return item.reference_type == key;
        });
        // console.log(e.label);
        if( row ) {
            row.reference_seq = e.value;
            row.bookmark_name = e.label;
            
        } else {
            relationList.push({
                'reference_type': key,
                'reference_seq': e.value,
                'bookmark_name': e.label,
            });
        }
        setRelationList([...relationList]);
    }

    const fncGetRelation =()=>{
        let obj = Object();
        if( relationList.length > 0 ) {
            relationList.forEach( function( element ) {
                if( 'BOOKING' === element.reference_type ) {
                    obj.other_bookmark_name = element.bookmark_name;
                    obj.other_reference_seq = element.reference_seq;
                }
                if( 'SCHEDULE' === element.reference_type ) {
                    obj.schedule_bookmark_name = element.bookmark_name;
                    obj.schedule_reference_seq = element.reference_seq;
                }
                if( 'CARRIER' === element.reference_type ) {
                    obj.carrier_bookmark_name = element.bookmark_name;
                    obj.carrier_reference_seq = element.reference_seq;
                }
                if( 'SHIPPER' === element.reference_type ) {
                    obj.shipper_bookmark_name = element.bookmark_name;
                    obj.shipper_reference_seq = element.reference_seq;
                }
                if( 'CONSIGNEE' === element.reference_type ) {
                    obj.consignee_bookmark_name = element.bookmark_name;
                    obj.consignee_reference_seq = element.reference_seq;
                }
                if( 'FORWARDER' === element.reference_type ) {
                    obj.forwarder_bookmark_name = element.bookmark_name;
                    obj.forwarder_reference_seq = element.reference_seq;
                }
                if( 'TRANSPORT' === element.reference_type ) {
                    obj.transport_bookmark_name = element.bookmark_name;
                    obj.transport_reference_seq = element.reference_seq;
                }
                if( 'DOCUMENT' === element.reference_type ) {
                    obj.document_bookmark_name = element.bookmark_name;
                    obj.document_reference_seq = element.reference_seq;
                }
                if( 'CARGO' === element.reference_type ) {
                    obj.cargo_bookmark_name = element.bookmark_name;
                    obj.cargo_reference_seq = element.reference_seq;
                }
                if( 'CONTAINER' === element.reference_type ) {
                    obj.container_bookmark_name = element.bookmark_name;
                    obj.container_reference_seq = element.reference_seq;
                }
            });
        } else {
            obj = {};
        }
        let merge = Object.assign(bookmark, obj);
        // console.log("merge : ",merge)
        setBookmark({...merge});
    }
  return (

    <React.Fragment>
        <GridContainer>
            <GridItem lg={10} md={10} sm={10} xs={10}>
                <Autocomplete
                    options = {bookmarkList}
                    getOptionLabel = { option => option.bookmark_name?option.bookmark_name:'' }
                    getOptionSelected={(option, value) => option.bookmark_name?option.bookmark_name:'' === value.bookmark_name?value.bookmark_name:''}
                    value={{bookmark_name:
                        bookmarkList.find(v=>v.bookmark_seq === booking.bookmark_seq)
                        ?bookmarkList.find(v=>v.bookmark_seq === booking.bookmark_seq).bookmark_name:''
                    }}
                    id="bookmarkList"
                    onChange={(e, option)=>props.fncBookmarkParent(option, 'bookmark_seq')}
                    renderInput={
                        params =>(<TextField inputProps={{maxLength:30}} {...params} label="전체 Bookmark" fullWidth />)}
                />
            </GridItem>
            <GridItem lg={2} md={2} sm={2} xs={2}>
                <IconButton onClick={()=>setOpenBookmark(!openBookmark)}>
                    <Bookmarks fontSize={'default'} />
                </IconButton>
            </GridItem>
        </GridContainer>
        <Modal
            open={openBookmark}
            onClose={()=>setOpenBookmark(!openBookmark)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={{paper: classes.modal}}
            style={{ paddingLeft :'5%', paddingRight :'5%', paddingTop: '5%' , paddingBottom: '5%'}}
            >
            <Card >
                <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <Bookmarks fontSize={'default'}/>
                    </Avatar>
                }
                action={
                    <IconButton onClick={()=>setOpenBookmark(!openBookmark)}>
                        <Close fontSize={'default'} />
                    </IconButton>
                }
                subheader={
                    <GridContainer>
                    <GridItem xs={10} sm={10}>
                        <Typography className={classes.bookmarkTypography}>Total Bookmark

                        </Typography>
                    </GridItem>
                    </GridContainer>
                }
                >
                </CardHeader>
                <CardBody>
                <Divider className={classes.divider}/>
                <GridContainer>
                    <GridItem lg={6} md={6} sm={6} xs={6}>
                        <TableContainer className={classes.tablecontainer}>
                            <Table 	
                                stickyHeader aria-label="sticky table"
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size='medium'
                                style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                            <TableHead>
                                <TableRow>
                                <TableCell style={{width: '100%'}} className={classes.tableCell} align="center">Bookmark</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookmarkList.map((row,index) => (
                                    <TableRow key={index}
                                        className={classes.root}
                                        hover
                                        onClick={(e)=>fncSelectBookmark(row)}>
                                        <TableCell align="center">{row.bookmark_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell style={{textAlignLast:'right',paddingTop:'0',paddingBottom:'0'}} colSpan={10}>
                                        Bookmark 목록을 선택하세요.
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                            </Table>
                        </TableContainer>
                    </GridItem>
                    <GridItem lg={6} md={6} sm={6} xs={6}>
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                        <CustomInput
                            validtype="text"
                            success={bookmark.bookmark_name?true:false}
                            error={bookmark.bookmark_name?false:true}
                            labelText=""
                            maxLength="100"
                            id="bookmark_name"
                            formControlProps={{
                                fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                            }}
                            inputProps={{
                                value:bookmark.bookmark_name?bookmark.bookmark_name:'',
                            onChange: (e)=>fncOnChange(e, 'bookmark_name'),
                            // onBlur: ()=>props.fncOnBlurCargo(cargo),
                            }}
                            required={true}
                            feedback="txt_bookmark_name"
                        />
                        </GridItem>
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Booking Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                options = {otherBookmarkList}
                                getOptionLabel = { option => option.other_bookmark_name }
                                getOptionSelected={(option, value) => option.other_bookmark_seq === value.other_bookmark_seq}
                                value={{other_bookmark_name:
                                    otherBookmarkList.find(v=> v.other_bookmark_seq === bookmark.other_reference_seq)
                                    ?otherBookmarkList.find(v=> v.other_bookmark_seq === bookmark.other_reference_seq).other_bookmark_name:''
                                }}
                                id="other_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'BOOKING')}
                                
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.other_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                         <GridItem xs={4} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Schedule Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {scheduleBookmarkList}
                                getOptionLabel = { option => option.schedule_bookmark_name }
                                // getOptionSelected={(option, value) => option.schedule_reference_seq === value.schedule_reference_seq}
                                inputValue={
                                    scheduleBookmarkList.find(v=> v.schedule_bookmark_seq === bookmark.schedule_reference_seq)
                                    ?scheduleBookmarkList.find(v=> v.schedule_bookmark_seq === bookmark.schedule_reference_seq).schedule_bookmark_name:''
                                }
                                id="schedule_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'SCHEDULE')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.schedule_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Shipper Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {shipperBookmarkList}
                                getOptionLabel = { option => option.shipper_bookmark_name }
                                // getOptionSelected={(option, value) => option.shipper_reference_seq === value.shipper_reference_seq}
                                inputValue={
                                    shipperBookmarkList.find(v=> v.shipper_bookmark_seq === bookmark.shipper_reference_seq)
                                    ?shipperBookmarkList.find(v=> v.shipper_bookmark_seq === bookmark.shipper_reference_seq).shipper_bookmark_name:''
                                }
                                id="shipper_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'SHIPPER')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.shipper_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                        {/* <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Carrier Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {lineBookmarkList}
                                getOptionLabel = { option => option.line_bookmark_name }
                                // getOptionSelected={(option, value) => option.carrier_reference_seq === value.carrier_reference_seq}
                                inputValue={
                                    lineBookmarkList.find(v=> v.line_bookmark_seq === bookmark.carrier_reference_seq)
                                    ?lineBookmarkList.find(v=> v.line_bookmark_seq === bookmark.carrier_reference_seq).line_bookmark_name:''
                                }
                                id="line_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'CARRIER')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.carrier_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem> */}
                        {/* <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Consignee Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {consigneeBookmarkList}
                                getOptionLabel = { option => option.consignee_bookmark_name }
                                // getOptionSelected={(option, value) => option.consignee_reference_seq === value.consignee_reference_seq}
                                inputValue={
                                    consigneeBookmarkList.find(v=> v.consignee_bookmark_seq === bookmark.consignee_reference_seq)
                                    ?consigneeBookmarkList.find(v=> v.consignee_bookmark_seq === bookmark.consignee_reference_seq).consignee_bookmark_name:''
                                }
                                id="consignee_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'CONSIGNEE')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.consignee_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem> */}
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Forwarder Bookmark
                            </FormLabel>
                            </GridItem>
                            <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {forwarderBookmarkList}
                                getOptionLabel = { option => option.forwarder_bookmark_name }
                                // getOptionSelected={(option, value) => option.forwarder_reference_seq === value.forwarder_reference_seq}
                                inputValue={
                                    forwarderBookmarkList.find(v=> v.forwarder_bookmark_seq === bookmark.forwarder_reference_seq)
                                    ?forwarderBookmarkList.find(v=> v.forwarder_bookmark_seq === bookmark.forwarder_reference_seq).forwarder_bookmark_name:''
                                }
                                id="forwarder_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'FORWARDER')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.forwarder_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Transport Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {transportBookmarkList}
                                getOptionLabel = { option => option.transport_bookmark_name }
                                // getOptionSelected={(option, value) => option.transport_reference_seq === value.transport_reference_seq}
                                inputValue={
                                    transportBookmarkList.find(v=> v.transport_bookmark_seq === bookmark.transport_reference_seq)
                                    ?transportBookmarkList.find(v=> v.transport_bookmark_seq === bookmark.transport_reference_seq).transport_bookmark_name:''
                                }
                                id="transport_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'TRANSPORT')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.transport_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                        {/* <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Document Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {documentBookmarkList}
                                getOptionLabel = { option => option.document_bookmark_name }
                                // getOptionSelected={(option, value) => option.document_reference_seq === value.document_reference_seq}
                                inputValue={
                                    documentBookmarkList.find(v=> v.document_bookmark_seq === bookmark.document_reference_seq)
                                    ?documentBookmarkList.find(v=> v.document_bookmark_seq === bookmark.document_reference_seq).document_bookmark_name:''
                                }
                                id="document_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'DOCUMENT')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.document_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem> */}
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Cargo Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {cargoBookmarkList}
                                getOptionLabel = { option => option.cargo_bookmark_name }
                                // getOptionSelected={(option, value) => option.cargo_reference_seq === value.document_reference_seq}
                                inputValue={
                                    cargoBookmarkList.find(v=> v.cargo_bookmark_seq === bookmark.cargo_reference_seq)
                                    ?cargoBookmarkList.find(v=> v.cargo_bookmark_seq === bookmark.cargo_reference_seq).cargo_bookmark_name:''
                                }
                                id="cargo_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'CARGO')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.cargo_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} className={classes.gridLabel}>
                            <FormLabel className={classes.labelHorizontal}>
                                Container Bookmark
                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            <Autocomplete
                                className={classes.textField}
                                options = {containerBookmarkList}
                                getOptionLabel = { option => option.container_bookmark_name }
                                // getOptionSelected={(option, value) => option.container_reference_seq === value.document_reference_seq}
                                inputValue={
                                    containerBookmarkList.find(v=> v.container_bookmark_seq === bookmark.container_reference_seq)
                                    ?containerBookmarkList.find(v=> v.container_bookmark_seq === bookmark.container_reference_seq).container_bookmark_name:''
                                }
                                id="container_bookmark"
                                onChange={(e, option)=>fncOnchangeRelation(option, 'CONTAINER')}
                                renderInput={
                                params =>(<TextField inputProps={{maxLength:30}} {...params} label={bookmark.container_reference_seq?"":"사용 안함"} fullWidth />)}
                            />
                        </GridItem>
                    </GridItem>
                </GridContainer>
                
                
                </CardBody>
                <GridItem xs={12} sm={12} style={{textAlignLast:'right'}}>
                    <Button color="info" onClick={(e)=>fncInitBookmark(e)}>NEW</Button>
                    <Button color="info" onClick={(e)=>fncSaveBookmark(e)}>SAVE</Button>
                    <Button color="info" onClick={(e)=>deleteBookmark(e)}>DELETE</Button>
                </GridItem>
            </Card>
        </Modal>
    </React.Fragment>
    );
}

// function areEqual(prevProps, nextProps) {
//     return (
//         prevProps.booking === nextProps.booking
//         && prevProps.otherBookmarkList === nextProps.otherBookmarkList
//         && prevProps.scheduleBookmarkList === nextProps.scheduleBookmarkList
//         && prevProps.lineBookmarkList === nextProps.lineBookmarkList
//         && prevProps.shipperBookmarkList === nextProps.shipperBookmarkList
//         && prevProps.consigneeBookmarkList === nextProps.consigneeBookmarkList
//         && prevProps.forwarderBookmarkList === nextProps.forwarderBookmarkList
//         && prevProps.transportBookmarkList === nextProps.transportBookmarkList
//         && prevProps.documentBookmarkList === nextProps.documentBookmarkList
//         && prevProps.cargoBookmarkList === nextProps.cargoBookmarkList
//         && prevProps.containerBookmarkList === nextProps.containerBookmarkList
//     )
// }

export default BookingBookmarkRelation;
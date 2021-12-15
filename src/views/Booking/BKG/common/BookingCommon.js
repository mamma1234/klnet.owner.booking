import React,{ useState, useEffect } from "react";
// 이건 테스트 주석
import { Card, IconButton, InputLabel, Checkbox, Input, ButtonGroup} from "@material-ui/core";
import {NoteAdd, Send, Save, Print, Delete} from "@material-ui/icons";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import BookingCard from './booking/BookingCard';
import ScheduleCard from './schedule/ScheduleCard';
import ShipperCard from './shipper/ShipperCard';
import CarrierCard from './carrier/CarrierCard';
import ConsigneeCard from './consignee/ConsigneeCard';
import ForwarderCard from './forwarder/ForwarderCard';
import TransportCard from './transport/TransportCard';
import DocumentCard from './document/DocumentCard';
import CargoCard from './cargo/CargoCard';
import ContainerCard from './container/ContainerCard';
import {useStyles} from 'views/Booking/BKG/styles';
import * as validation from 'components/common/validation.js';
import HeaderCard from "./HeaderCard";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {BookingStore} from 'store/bookingStore';
import {observer} from 'mobx-react-lite';
const bookingStore = new BookingStore();


const BookingCommon = observer((props)=> {
    const classes = useStyles();
    const [portCodeList, setPortCodeList] = useState([]);
    const [openSchedule, setOpenSchedule] = useState(true);
    const [openBooking, setOpenBooking] = useState(true);
    const [openLine, setOpenLine] = useState(false);
    const [openShipper, setOpenShipper] = useState(true);
    const [openConsignee, setOpenConsignee] = useState(true);
    const [openForwarder, setOpenForwarder] = useState(true);
    const [openTransport, setOpenTransport] = useState(true);
    const [openDocument, setOpenDocument] = useState(false);
    const [openCargo, setOpenCargo] = useState(true);
    const [openContainer, setOpenContainer] = useState(true);
    // schedule Bookmark
    const [scheduleBookmarkList, setScheduleBookmarkList] = useState([]);
    // other(Booking) Bookmark
    const [otherBookmarkList, setOtherBookmarkList] = useState([]);
    // line Bookmark
    const [lineBookmarkList, setLineBookmarkList] = useState([]);
    // shipper Bookmark
    const [shipperBookmarkList, setShipperBookmarkList] = useState([]);
    // consignee Bookmark
    const [consigneeBookmarkList, setConsigneeBookmarkList] = useState([]);
    // Forwarder Bookmark
    const [forwarderBookmarkList, setForwarderBookmarkList] = useState([]);
    // Transport Bookmark
    const [transportBookmarkList, setTransportBookmarkList] = useState([]);
    // document Bookmark
    const [documentBookmarkList, setDocumentBookmarkList] = useState([]);
    // Cargo Bookmark
    const [cargoBookmarkList, setCargoBookmarkList] = useState([]);
    const [goodsBookmarkList, setGoodsBookmarkList] = useState([]);
    // Container Bookmark
    const [containerBookmarkList, setContainerBookmarkList] = useState([]);
    // Cargo Type
    const [cargoTypeList, setCargoTypeList] = useState([]);
    // Cargo Pack Type
    const [cargoPackTypeLineCodeList, setCargoPackTypeLineCodeList] = useState([]);
    const [incotermsLineCodeList, setIncotermsLineCodeList] = useState([]);
    const [serviceLineCodeList, setServiceLineCodeList] = useState([]);
    const [cntrCodeLineCodeList, setCntrCodeLineCodeList] = useState([]);
    const [statusCusCodeList, setStatusCusCodeList] = useState([{id:"NO", value:'저장'},
        {id:"S0", value:'저장'},
        {id:"S9", value:'전송'},
        {id:"S4", value:'정정전송'},
        {id:"S1", value:'취소전송'},
        {id:"BC", value:'승인'},
        {id:"RJ", value:'거절'},
        {id:"CC", value:'취소승인'},
        {id:"RC", value:'승인취소'},
        ]);
    const [parameter, setParameter] = useState({
        new_yn: props.location.state && props.location.state.new_yn ? props.location.state.new_yn || '' : null,
        user_no: props.location.state && props.location.state.user_no  ?  props.location.state.user_no || '' : null, 
        bkg_no: props.location.state && props.location.state.bkg_no  ? props.location.state.bkg_no || '' : null,  
        bkg_date: props.location.state && props.location.state.bkg_date ? props.location.state.bkg_date || '' : null,
        sch_vessel_name: props.location.state && props.location.state.sch_vessel_name ? props.location.state.sch_vessel_name || '' : null,
        sch_vessel_voyage: props.location.state && props.location.state.sch_vessel_voyage ? props.location.state.sch_vessel_voyage || '' : null,
        sch_pol: props.location.state && props.location.state.sch_pol ? props.location.state.sch_pol || '' : null,
        sch_pod: props.location.state && props.location.state.sch_pod ? props.location.state.sch_pod || '' : null,
        schedule_yn: props.location.state && props.location.state.schedule_yn ? props.location.state.schedule_yn || '' : null,
        line_code: props.location.state && props.location.state.line_code ? props.location.state.line_code || '' : null,
        sch_etd: props.location.state && props.location.state.sch_etd ? props.location.state.sch_etd || '' : null,
        sch_eta: props.location.state && props.location.state.sch_eta ? props.location.state.sch_eta || '' : null,
        vsl_type: props.location.state && props.location.state.vsl_type ? props.location.state.vsl_type || '' : null,
        sch_call_sign: props.location.state && props.location.state.sch_call_sign ? props.location.state.sch_call_sign || '' : null
    });
    // const [booking, setBooking] = useState({});
    // const [cargo, setCargo] = useState({});
    // const [goodsRelationList, setGoodsRelationList] = useState([{'key':1, 'cargo_seq':1}]);
    // const [containerList, setContainerList] = useState([{'key':1, 'cntr_seq':1}]);
    const [door, setDoor] = useState({});
    const [containerSpecialList, setContainerSpecialList] = useState([{'key':1, 'cntr_seq':1}]);
    const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
    const [other, setOther] = useState({});
    const [schedule, setSchedule] = useState({});
    const [allOpen, setAllOpen] = useState(true);
    const [newBkgNo, setNewBkgNo] = useState('');
    const [bkgNoDupCheck, setBkgNoDupCheck] = useState(false);
    // 위험물인 경우 dangerTrue = True
    const [dangerTrue, setDangerTrue] = useState(true);
    // 전체 Bookmark Seq
    const [bookmarkSeq, setBookmarkSeq] = useState({});
    // Booking Bookmark 전체 적용정보
    const [relationList, setRelationList] = useState([]);
    // 부킹번호 자동채번(true), 수동채번(false)
    const [autoSelf, setAutoSelf] = useState(true);
    // 위동 부킹 send 약관
    const [termCheck, setTermCheck] = useState(false);
    // 선사 목록 조회
    const [lineWorkOriginatorList, setLineWorkOriginatorList] = useState([]);
    // Shipper Company 목록
    const [shipperCompanyList, setShipperCompanyList] = useState([]);
    // Forwarder Company 목록
    const [forwarderCompanyList, setForwarderCompanyList] = useState([]);

    const [topView, setTopView] = useState(true);

    const [lineCodeVesselPickup, setLineCodeVesselPickup] = useState([]);
    
    const {userData} = props;
    // const updateListData = () => {
    //     console.log("1.")
    //     let scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    //     console.log("2.", scrollTop)
    //     //Scroll 화면 하단 Check 
    //     if((Math.round(scrollTop) > 199)) {
    //         console.log("11111111111111111111111")
    //         setTopView(true);  
    //     } else {
    //         console.log("2322222222222222222222")
    //         setTopView(false);
    //     }
            
    // }
//   useEffect(()=> {
//     console.log("aakakakakakakakak")
//     window.addEventListener("scroll", updateListData, true);
//     return () => {
//         console.log("xxxxxxxxxxxxx")
//         window.removeEventListener("scroll", updateListData, true);
//     };
//   },[]);

  useEffect(() => {
        


    if(userData && userData.user_no){
        window.scrollTo(0,0);
        // document.getElementById("topNavBar").scrollIntoView({
        //     behavior: "smooth",
        //     block: "start",
        //     inline: "nearest",
        // });
      // schedule Bookmark
      selectBookingScheduleBookmark();
      // other Bookmark
      selectBookingOtherBookmark();
      // line Bookmark
      selectBookingLineBookmark();
      // shipper Bookmark
      selectBookingShipperBookmark();
      // forwarder Bookmark
      selectBookingForwarderBookmark();
      // transport Bookmark
      selectBookingTransportBookmark();
      // cargo Bookmark
      selectBookingCargoBookmark();
      // goods Bookmark
      selectBookingCargoGoodsBookmark();
      // container Bookmark
      selectBookingContainerBookmark();
      // consignee Bookmark
      selectBookingConsigneeBookmark();
      // document Bookmark
      selectBookingDocumentBookmark();
      // 선사 목록 조회
      selectLineWorkOriginator();
    }

    
  }, [userData]);

    useEffect(()=>{
        if( !allOpen ) {
            document.getElementById("topNavBar").scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
        setOpenSchedule(allOpen);
        setOpenShipper(allOpen);
        setOpenForwarder(allOpen);
        if( !allOpen && openLine ) {
            setOpenLine(allOpen);
        }
        setOpenCargo(allOpen);
        setOpenTransport(allOpen);
        if( !allOpen && openDocument ) {
            setOpenDocument(allOpen);
        }
        setOpenBooking(allOpen);
        setOpenContainer(allOpen);
        setOpenConsignee(allOpen);
    },[allOpen]);

    useEffect(()=>{
        // console.log("111111PRAMETER ", props.location.state)
        // if( parameter.bkg_no && user && user.user_no ) {
        if( parameter.bkg_no && (userData && userData.user_no) ) {
            // Dash 보드 및 일반 파라미터에서 넘어온 경우
            selectBookingParams();
        } else {
            if( userData && userData.user_no ) {
                if( "Y" === parameter.schedule_yn || "Y" === parameter.new_yn ) {
                    
                    // 스케줄에서 넘어온 경우
                    insertBooking();
                }
            }
        }
    },[parameter]);


    useEffect(()=>{
        if( userData && bookingStore.booking.line_code && userData.user_no ) {
            let params = {
                line_code: "Y" === parameter.schedule_yn? parameter.line_code : bookingStore.booking.line_code
            }
            selectLineCodePort();
            selectLineCodeIncoterms();
            selectLineCodeServiceType();
            // cargo type
            selectLineCodeCargoType(params);
            // cargo pack type
            selectLineCodeCargoPackType(params);
            // container sztp
            selectLineCodeCntrSztp(params);
            // cargo Bookmark
            selectBookingCargoBookmark();
            // container Bookmark
            selectBookingContainerBookmark();
            // shipper company
            selectShipperCompanyListByUser(params);
            // forwarder company
            selectForwarderCompanyListByUser(params);
            // LineCode and Vessel to Pickup
            params.sch_vessel_name = bookingStore.booking.sch_vessel_name;
            selectLineCodeVesselPickup(params);
        }
    },[bookingStore.booking.line_code, userData]);

    useEffect(()=>{
        if( bookingStore.booking.line_code && bookingStore.booking.sch_vessel_name) {
            let params = {
                line_code: "Y" === parameter.schedule_yn? parameter.line_code : bookingStore.booking.line_code,
                sch_vessel_name: bookingStore.booking.sch_vessel_name
            }
            selectLineCodeVesselPickup(params);
        }
    },[bookingStore.booking.line_code ,bookingStore.booking.sch_vessel_name]);

    // 전체 Bookmark 조회
    useEffect(()=>{
        if( bookmarkSeq && bookmarkSeq.bookmark_seq) {
            selectBookingBkgBookmarkRelation();
        }
    }, [bookmarkSeq])

    // Booking Bookmark 전체 적용
    useEffect(()=>{
        let isBooking, isSchedule, isCarrier, isShipper, isConsignee
        , isForwarder, isTransport, isCargo, isContainer = false;
        let obj = Object();
        obj.bookmark_seq = bookmarkSeq.bookmark_seq;
        obj.bookmark_yn = 'Y';
        if( relationList.length > 0 ) {
            relationList.forEach( function( element ) {
                if( 'BOOKING' === element.reference_type ) {
                    obj.other_bookmark_name = element.bookmark_name;
                    obj.other_bookmark_seq = element.reference_seq;
                    
                    // Other Bookmark 상세내용
                    let row = otherBookmarkList.find( function( item ) {
                        return item.other_bookmark_seq == element.reference_seq;
                    });
                    
                    if( row ) {
                        obj.sc_no= row.sc_no?row.sc_no:bookingStore.booking.sc_no;
                        obj.remark1= row.remark1?row.remark1:bookingStore.booking.remark1;
                        obj.remark2= row.remark1?row.remark2:bookingStore.booking.remark2;
                        obj.trans_service_code= row.trans_service_code?row.trans_service_code:bookingStore.booking.trans_service_code;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.other_bookmark_name = null;
                        obj.other_bookmark_seq = null;
                        // obj.other_bookmark_seq = null;
                        // obj.other_bookmark_name = null;
                        // obj.sc_no = null;
                        // obj.remark1 = null;
                        // obj.remark2 = null;
                        // obj.trans_service_code = null;
                    }
                    // 부킹 Bookmark 있군요
                    // isBooking = true;
                }
                if( 'SCHEDULE' === element.reference_type ) {
                    obj.schedule_bookmark_name = element.bookmark_name;
                    obj.schedule_bookmark_seq = element.reference_seq;

                    // Schedule Bookmark 상세내용
                    let row = scheduleBookmarkList.find( function( item ) {
                        return item.schedule_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj.sch_vessel_name= row.sch_vessel_name?row.sch_vessel_name:bookingStore.booking.sch_vessel_name;
                        obj.sch_vessel_code= row.sch_vessel_code?row.sch_vessel_code:bookingStore.booking.sch_vessel_code;
                        obj.sch_call_sign= row.sch_call_sign?row.sch_call_sign:bookingStore.booking.sch_call_sign;
                        obj.sch_pol= row.sch_pol?row.sch_pol:bookingStore.booking.sch_pol;
                        obj.sch_pol_name= row.sch_pol?row.sch_pol_name:bookingStore.booking.sch_pol_name;
                        obj.sch_pod= row.sch_pod?row.sch_pod:bookingStore.booking.sch_pod;
                        obj.sch_pod_name= row.sch_pod?row.sch_pod_name:bookingStore.booking.sch_pod_name;
                        obj.sch_por= row.sch_por?row.sch_por:bookingStore.booking.sch_por;
                        obj.sch_por_name= row.sch_por?row.sch_por_name:bookingStore.booking.sch_por_name;
                        obj.sch_pld= row.sch_pld?row.sch_pld:bookingStore.booking.sch_pld;
                        obj.sch_pld_name= row.sch_pld?row.sch_pld_name:bookingStore.booking.sch_pld_name;
                        obj.sch_etd= row.sch_etd?row.sch_etd:bookingStore.booking.sch_etd;
                        obj.sch_eta= row.sch_eta?row.sch_eta:bookingStore.booking.sch_eta;
                        obj.sch_fdp= row.sch_fdp?row.sch_fdp:bookingStore.booking.sch_fdp;
                        obj.sch_fdp_name= row.sch_fdp?row.sch_fdp_name:bookingStore.booking.sch_fdp_name;
                        obj.vsl_type= row.vsl_type?row.vsl_type:bookingStore.booking.vsl_type;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.schedule_bookmark_seq = null;
                        obj.schedule_bookmark_name = null;
                        // obj.sch_vessel_name = null;
                        // obj.sch_vessel_code = null;
                        // obj.sch_pol = null;
                        // obj.sch_pol_name = null;
                        // obj.sch_pod = null;
                        // obj.sch_pod_name = null;
                        // obj.sch_por = null;
                        // obj.sch_por_name = null;
                        // obj.sch_pld = null;
                        // obj.sch_pld_name = null;
                        // obj.sch_etd = null;
                        // obj.sch_eta = null;
                        // obj.sch_fdp = null;
                        // obj.sch_fdp_name = null;
                    }
                    // Schedule Bookmark 있군요
                    isSchedule = true;
                }
                if( 'CARRIER' === element.reference_type ) {
                    obj.line_bookmark_name = element.bookmark_name;
                    obj.line_bookmark_seq = element.reference_seq;

                    // Carrier Bookmark 상세내용
                    let row = lineBookmarkList.find( function( item ) {
                        return item.line_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj.line_name1= row.line_name1?row.line_name1:bookingStore.booking.line_name1;
                        obj.line_name2= row.line_name1?row.line_name2:bookingStore.booking.line_name2;
                        obj.line_code= row.line_code?row.line_code:bookingStore.booking.line_code;
                        obj.line_user_email= row.line_user_email?row.line_user_email:bookingStore.booking.line_user_email;
                        obj.line_user_fax= row.line_user_fax?row.line_user_fax:bookingStore.booking.line_user_fax;
                        obj.line_user_name= row.line_user_name?row.line_user_name:bookingStore.booking.line_user_name;
                        obj.line_user_tel= row.line_user_tel?row.line_user_tel:bookingStore.booking.line_user_tel;
                        obj.line_user_dept= row.line_user_dept?row.line_user_dept:bookingStore.booking.line_user_dept;
                        obj.line_address1= row.line_address1?row.line_address1:bookingStore.booking.line_address1;
                        obj.line_address2= row.line_address1?row.line_address2:bookingStore.booking.line_address2;
                        obj.line_address3= row.line_address1?row.line_address3:bookingStore.booking.line_address3;
                        obj.line_address4= row.line_address1?row.line_address4:bookingStore.booking.line_address4;
                        obj.line_address5= row.line_address1?row.line_address5:bookingStore.booking.line_address5;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.line_bookmark_seq = null;
                        obj.line_bookmark_name = null;
                        // obj.line_name1 = null;
                        // obj.line_name2 = null;
                        // obj.line_code = null;
                        // obj.line_user_email = null;
                        // obj.line_user_fax = null;
                        // obj.line_user_name = null;
                        // obj.line_user_tel = null;
                        // obj.line_user_dept = null;
                        // obj.line_address1 = null;
                        // obj.line_address2 = null;
                        // obj.line_address3 = null;
                        // obj.line_address4 = null;
                        // obj.line_address5 = null;
                    }
                    // Carrier Bookmark 존재
                    isCarrier = true;

                }
                if( 'SHIPPER' === element.reference_type ) {
                    obj.shipper_bookmark_name = element.bookmark_name;
                    obj.shipper_bookmark_seq = element.reference_seq;

                    // Shipper Bookmark 상세내용
                    let row = shipperBookmarkList.find( function( item ) {
                        return item.shipper_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj.shp_name1= row.shp_name1?row.shp_name1:bookingStore.booking.shp_name1;
                        obj.shp_name2= row.shp_name1?row.shp_name2:bookingStore.booking.shp_name2;
                        obj.shp_code= row.shp_code?row.shp_code:bookingStore.booking.shp_code;
                        obj.shp_user_name= row.shp_user_name?row.shp_user_name:bookingStore.booking.shp_user_name;
                        obj.shp_user_tel= row.shp_user_tel?row.shp_user_tel:bookingStore.booking.shp_user_tel;
                        obj.shp_user_email= row.shp_user_email?row.shp_user_email:bookingStore.booking.shp_user_email;
                        obj.shp_address1= row.shp_address1?row.shp_address1:bookingStore.booking.shp_address1;
                        obj.shp_address2= row.shp_address1?row.shp_address2:bookingStore.booking.shp_address2;
                        obj.shp_address3= row.shp_address1?row.shp_address3:bookingStore.booking.shp_address3;
                        obj.shp_address4= row.shp_address1?row.shp_address4:bookingStore.booking.shp_address4;
                        obj.shp_address5= row.shp_address1?row.shp_address5:bookingStore.booking.shp_address5;
                        obj.shp_user_dept= row.shp_user_dept?row.shp_user_dept:bookingStore.booking.shp_user_dept;
                        obj.shp_user_fax= row.shp_user_fax?row.shp_user_fax:bookingStore.booking.shp_user_fax;
                        obj.shp_payment_type= row.shp_payment_type?row.shp_payment_type:bookingStore.booking.shp_payment_type;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.shipper_bookmark_seq = null;
                        obj.shipper_bookmark_name= null;
                        // obj.shp_name1= null;
                        // obj.shp_name2= null;
                        // obj.shp_code= null;
                        // obj.shp_user_name= null;
                        // obj.shp_user_tel= null;
                        // obj.shp_user_email= null;
                        // obj.shp_address1= null;
                        // obj.shp_address2= null;
                        // obj.shp_address3= null;
                        // obj.shp_address4= null;
                        // obj.shp_address5= null;
                        // obj.shp_user_dept= null;
                        // obj.shp_user_fax= null;
                        // obj.shp_payment_type= null;
                    }
                    // Shipper Bookmark 존재
                    isShipper = true;
                }
                if( 'CONSIGNEE' === element.reference_type ) {
                    obj.consignee_bookmark_name = element.bookmark_name;
                    obj.consignee_bookmark_seq = element.reference_seq;

                    // Consignee Bookmark 상세내용
                    let row = consigneeBookmarkList.find( function( item ) {
                        return item.consignee_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj.cons_name1= row.cons_name1?row.cons_name1:bookingStore.booking.cons_name1;
                        obj.cons_name2= row.cons_name1?row.cons_name2:bookingStore.booking.cons_name2;
                        obj.cons_code= row.cons_code?row.cons_code:bookingStore.booking.cons_code;
                        obj.cons_user_email= row.cons_user_email?row.cons_user_email:bookingStore.booking.cons_user_email;
                        obj.cons_user_fax= row.cons_user_fax?row.cons_user_fax:bookingStore.booking.cons_user_fax;
                        obj.cons_user_name= row.cons_user_name?row.cons_user_name:bookingStore.booking.cons_user_name;
                        obj.cons_user_tel= row.cons_user_tel?row.cons_user_tel:bookingStore.booking.cons_user_tel;
                        obj.cons_user_dept= row.cons_user_dept?row.cons_user_dept:bookingStore.booking.cons_user_dept;
                        obj.cons_address1= row.cons_address1?row.cons_address1:bookingStore.booking.cons_address1;
                        obj.cons_address2= row.cons_address1?row.cons_address2:bookingStore.booking.cons_address2;
                        obj.cons_address3= row.cons_address1?row.cons_address3:bookingStore.booking.cons_address3;
                        obj.cons_address4= row.cons_address1?row.cons_address4:bookingStore.booking.cons_address4;
                        obj.cons_address5= row.cons_address1?row.cons_address5:bookingStore.booking.cons_address5;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.consignee_bookmark_seq = null;
                        obj.consignee_bookmark_name = null;
                        // obj.cons_name1 = null;
                        // obj.cons_name2 = null;
                        // obj.cons_code = null;
                        // obj.cons_user_email = null;
                        // obj.cons_user_fax = null;
                        // obj.cons_user_name = null;
                        // obj.cons_user_tel = null;
                        // obj.cons_user_dept = null;
                        // obj.cons_address1 = null;
                        // obj.cons_address2 = null;
                        // obj.cons_address3 = null;
                        // obj.cons_address4 = null;
                        // obj.cons_address5 = null;
                    }
                    // Consignee Bookmark 있음
                    isConsignee = true;
                }
                if( 'FORWARDER' === element.reference_type ) {
                    obj.forwarder_bookmark_name = element.bookmark_name;
                    obj.forwarder_bookmark_seq = element.reference_seq;

                    // Forwarder Bookmark 상세내용
                    let row = forwarderBookmarkList.find( function( item ) {
                        return item.forwarder_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj.fwd_name1= row.fwd_name1?row.fwd_name1:bookingStore.booking.fwd_name1;
                        obj.fwd_name2= row.fwd_name1?row.fwd_name2:bookingStore.booking.fwd_name2;
                        obj.fwd_code= row.fwd_code?row.fwd_code:bookingStore.booking.fwd_code;
                        obj.fwd_user_email= row.fwd_user_email?row.fwd_user_email:bookingStore.booking.fwd_user_email;
                        obj.fwd_user_fax= row.fwd_user_fax?row.fwd_user_fax:bookingStore.booking.fwd_user_fax;
                        obj.fwd_user_name= row.fwd_user_name?row.fwd_user_name:bookingStore.booking.fwd_user_name;
                        obj.fwd_user_tel= row.fwd_user_tel?row.fwd_user_tel:bookingStore.booking.fwd_user_tel;
                        obj.fwd_user_dept= row.fwd_user_dept?row.fwd_user_dept:bookingStore.booking.fwd_user_dept;
                        obj.fwd_address1= row.fwd_address1?row.fwd_address1:bookingStore.booking.fwd_address1;
                        obj.fwd_address2= row.fwd_address1?row.fwd_address2:bookingStore.booking.fwd_address2;
                        obj.fwd_address3= row.fwd_address1?row.fwd_address3:bookingStore.booking.fwd_address3;
                        obj.fwd_address4= row.fwd_address1?row.fwd_address4:bookingStore.booking.fwd_address4;
                        obj.fwd_address5= row.fwd_address1?row.fwd_address5:bookingStore.booking.fwd_address5;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.forwarder_bookmark_seq = null;
                        obj.forwarder_bookmark_name = null;
                        // obj.fwd_name1 = null;
                        // obj.fwd_name2 = null;
                        // obj.fwd_code = null;
                        // obj.fwd_user_email = null;
                        // obj.fwd_user_fax = null;
                        // obj.fwd_user_name = null;
                        // obj.fwd_user_tel = null;
                        // obj.fwd_user_dept = null;
                        // obj.fwd_address1 = null;
                        // obj.fwd_address2 = null;
                        // obj.fwd_address3 = null;
                        // obj.fwd_address4 = null;
                        // obj.fwd_address5 = null;
                    }
                    // Forwarder Bookmark 있음
                    isForwarder = true;
                }
                if( 'TRANSPORT' === element.reference_type ) {
                    obj.transport_bookmark_name = element.bookmark_name;
                    obj.transport_bookmark_seq = element.reference_seq;

                    // Transport Bookmark 상세내용
                    let row = transportBookmarkList.find( function( item ) {
                        return item.transport_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj.trans_name1= row.trans_name1?row.trans_name1:bookingStore.booking.trans_name1;
                        obj.trans_name2= row.trans_name1?row.trans_name2:bookingStore.booking.trans_name2;
                        obj.trans_code= row.trans_code?row.trans_code:bookingStore.booking.trans_code;
                        obj.trans_self_yn= row.trans_self_yn?row.trans_self_yn:bookingStore.booking.trans_self_yn;
                        obj.trans_user_fax= row.trans_user_fax?row.trans_user_fax:bookingStore.booking.trans_user_fax;
                        obj.trans_user_name= row.trans_user_name?row.trans_user_name:bookingStore.booking.trans_user_name;
                        obj.trans_user_tel= row.trans_user_tel?row.trans_user_tel:bookingStore.booking.trans_user_tel;
                        obj.trans_user_email= row.trans_user_email?row.trans_user_email:bookingStore.booking.trans_user_email;
                        obj.trans_fac_name= row.trans_fac_name?row.trans_fac_name:bookingStore.booking.trans_fac_name;
                        obj.trans_fac_area_name= row.trans_fac_area_name?row.trans_fac_area_name:bookingStore.booking.trans_fac_area_name;
                        obj.trans_remark= row.trans_remark?row.trans_remark:bookingStore.booking.trans_remark;

                        // obj = Object.assign(obj, row);
                    } else {
                        obj.transport_bookmark_seq = null;
                        obj.transport_bookmark_name = null;
                        // obj.trans_name1 = null;
                        // obj.trans_name2 = null;
                        // obj.trans_code = null;
                        // obj.trans_self_yn = null;
                        // obj.trans_user_fax = null;
                        // obj.trans_user_name = null;
                        // obj.trans_user_tel = null;
                        // obj.trans_user_email = null;
                        // obj.trans_fac_name = null;
                        // obj.trans_fac_area_name = null;
                        // obj.trans_remark = null;
                    }
                }
                // if( 'DOCUMENT' === element.reference_type ) {
                //     obj.document_bookmark_name = element.bookmark_name;
                //     obj.document_bookmark_seq = element.reference_seq;

                //     // Transport Bookmark 상세내용
                //     let row = documentBookmarkList.find( function( item ) {
                //         return item.document_bookmark_seq == element.reference_seq;
                //     });
                //     // console.log(e.label);
                //     if( row ) {
                //         obj = Object.assign(obj, row);
                //     } else {
                //         obj.document_bookmark_seq = null;
                //         obj.document_bookmark_name = null;
                //         // obj.trans_name1 = null;
                //         // obj.trans_name2 = null;
                //         // obj.trans_code = null;
                //         // obj.trans_self_yn = null;
                //         // obj.trans_user_fax = null;
                //         // obj.trans_user_name = null;
                //         // obj.trans_user_tel = null;
                //         // obj.trans_user_email = null;
                //         // obj.trans_fac_name = null;
                //         // obj.trans_fac_area_name = null;
                //         // obj.trans_remark = null;
                //     }
                // }
                if( 'CARGO' === element.reference_type ) {
                    let cargoObj = {}
                    cargoObj.cargo_bookmark_name = element.bookmark_name;
                    cargoObj.cargo_bookmark_seq = element.reference_seq;
                    // obj.cargo_selected_yn = 'Y'
                    // Cargo Bookmark 상세내용
                    let row = cargoBookmarkList.find( function( item ) {
                        return item.cargo_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        cargoObj = Object.assign(cargoObj, row);
                        console.log("CARGO ",cargoObj)
                        bookingStore.setCargo({
                            ...bookingStore.cargo,
                            'cargo_bookmark_seq': row?row.cargo_bookmark_seq:null,
                            'cargo_bookmark_name': row?row.cargo_bookmark_name:null,
                            'cargo_name': row.cargo_name?row.cargo_name:bookingStore.cargo.cargo_name,
                            'cargo_hs_code': row.cargo_hs_code?row.cargo_hs_code:bookingStore.cargo.cargo_hs_code,
                            'cargo_pack_qty': row.cargo_pack_qty?row.cargo_pack_qty:bookingStore.cargo.cargo_pack_qty,
                            'cargo_pack_type': row.cargo_pack_type?row.cargo_pack_type:bookingStore.cargo.cargo_pack_type,
                            'cargo_remark': row.cargo_remark?row.cargo_remark:bookingStore.cargo.cargo_remark,
                            'cargo_total_volume': row.cargo_total_volume?row.cargo_total_volume:bookingStore.cargo.cargo_total_volume,
                            'cargo_total_weight': row.cargo_total_weight?row.cargo_total_weight:bookingStore.cargo.cargo_total_weight,
                            'cargo_type': row.cargo_type?row.cargo_type:bookingStore.cargo.cargo_type,
                            'cargo_weight': row.cargo_weight?row.cargo_weight:bookingStore.cargo.cargo_weight,
                            'selected_yn':'Y'
                          });
                    } else {
                        obj.cargo_bookmark_seq = null;
                        obj.cargo_bookmark_name = null;
                        // obj.cargo_name = null;
                        // obj.cargo_hs_code = null;
                        // obj.cargo_pack_qty = null;
                        // obj.cargo_pack_type = null;
                        // obj.cargo_pack_type_name = null;
                        // obj.cargo_remark = null;
                        // obj.cargo_total_volume = null;
                        // obj.cargo_total_weight = null;
                        // obj.cargo_type = null;
                        // obj.cargo_type_name = null;
                        // obj.cargo_weight = null;
                    }
                    // Cargo Bookmark 있음
                    isCargo = true;
                    
                }
                if( 'CONTAINER' === element.reference_type ) {
                    obj.container_bookmark_name = element.bookmark_name;
                    obj.container_bookmark_seq = element.reference_seq;

                    // Container Bookmark 상세내용
                    let row = containerBookmarkList.find( function( item ) {
                        return item.container_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        // obj = Object.assign(obj, row);
                    }
                    
                    // Container Bookmark 있음
                    isContainer = true;
                }
            });

            let merge = Object.assign(bookingStore.booking, obj);
            // console.log("merge : ",merge)
            bookingStore.setBooking({...merge});
        }

        
    },[relationList]);

    useEffect(()=>{
        if( bkgNoDupCheck ) {
            insertBooking();
        }
    },[bkgNoDupCheck]);

    // PORT 목록 조회
    const selectLineCodePort =()=> {
        axios.post("/shipper/selectLineCodePort",{
                line_code: "Y" === parameter.schedule_yn? parameter.line_code : bookingStore.booking.line_code
        }).then(
            res => setPortCodeList(res.data)
        );
    }
    

  // Bookmark 목록 조회
  // OTHER 조회
  const selectBookingOtherBookmark = () => {
    axios.post(
        "/shipper/selectBookingOtherBookmark"
        ,{ user_no: userData.user_no?userData.user_no:null }
        ,{}
    ).then(
        res => {
            setOtherBookmarkList(res.data);
        }
    );
  }
  // SCHEDULE BOOKMARK 조회
  const selectBookingScheduleBookmark = () => {
    axios.post(
        "/shipper/selectBookingScheduleBookmark"
        ,{ user_no: userData.user_no?userData.user_no:null }
        ,{}
    ).then(
        res => setScheduleBookmarkList(res.data)
    );
  }
  // incoterms 코드 조회
  const selectLineCodeIncoterms = () => {
    axios.post(
        "/shipper/selectLineCodeIncoterms"
        ,{ line_code: "Y" === parameter.schedule_yn? "Y" === parameter.line_code : bookingStore.booking.line_code }
        ,{}
    ).then(
        res => setIncotermsLineCodeList(res.data)
    );
  }
  // service 목록 조회
  const selectLineCodeServiceType = () => {
    axios.post(
        "/shipper/selectLineCodeServiceType"
        ,{
          params:{
            line_code: "Y" === parameter.schedule_yn? "Y" === parameter.line_code : bookingStore.booking.line_code
          }
        }
    ).then(
        res => setServiceLineCodeList(res.data)
    );
  }
  // Line Bookmark 조회
  const selectBookingLineBookmark = () => {
    axios.post(
        "/shipper/selectBookingLineBookmark"
        ,{ user_no: userData.user_no?userData.user_no:null }
        ,{}
    ).then(
        res => {
            setLineBookmarkList(res.data);
        }
    );
  }
  // SHipper Bookmark 조회
  const selectBookingShipperBookmark = () => {
      axios.post(
          "/shipper/selectBookingShipperBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null }
          ,{}
      ).then(
          res => setShipperBookmarkList(res.data)
      );
  }
  // Consignee Bookmark 조회
  const selectBookingConsigneeBookmark = () => {
      axios.post(
          "/shipper/selectBookingConsigneeBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null }
          ,{}
      ).then(
          res => {
              setConsigneeBookmarkList(res.data);
          }
      );
  }
  // Forwarder Bookmark 조회
  const selectBookingForwarderBookmark = () => {
      axios.post(
          "/shipper/selectBookingForwarderBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null }
          ,{}
      ).then(
          res => {
              setForwarderBookmarkList(res.data);
          }
      );
  }
  // Transport Bookmark 조회
  const selectBookingTransportBookmark = () => {
      axios.post(
          "/shipper/selectBookingTransportBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null }
          ,{}
      ).then(
          res => {
              setTransportBookmarkList(res.data);
          }
      );
  }
  // Document Bookmark 조회
  const selectBookingDocumentBookmark = () => {
    axios.post(
        "/shipper/selectBookingDocumentBookmark"
        ,{ user_no: userData.user_no?userData.user_no:null }
        ,{}
    ).then(
        res => {
            setDocumentBookmarkList(res.data);
        }
    );
  }

  // 선사목록 조회
  const selectLineWorkOriginator = () => {
    axios.post(
        "/shipper/selectLineWorkOriginator"
        ,{ work_code: 'BOOKING' }
        ,{}
    ).then(
        res => {
            setLineWorkOriginatorList(res.data);
        }
    );
  }
  // Cargo Bookmark 조회
  const selectBookingCargoBookmark = () => {
      axios.post(
          "/shipper/selectBookingCargoBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null,
             line_code: "Y" === parameter.schedule_yn? parameter.line_code : bookingStore.booking.line_code }
      ).then(
          res => {
              setCargoBookmarkList(res.data);
          }
      );
  }
// Cargo Goods Bookmark 조회
const selectBookingCargoGoodsBookmark = () => {
    axios.post(
        "/shipper/selectBookingCargoGoodsBookmark"
        ,{ user_no: userData.user_no?userData.user_no:null }
        ,{}
    ).then(
        res => {
            setGoodsBookmarkList(res.data);
        }
    );
    }
  // Container Bookmark 조회
  const selectBookingContainerBookmark=()=>{
      axios.post(
          "/shipper/selectBookingContainerBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null,
            line_code: "Y" === parameter.schedule_yn ? parameter.line_code : bookingStore.booking.line_code }
          ,{}
      ).then(
          res => {
              setContainerBookmarkList(res.data);
          }
      );
  }

  // Cargo Type 목록조회
  const selectLineCodeCargoType = (params) => {
    axios.post(
        "/shipper/selectLineCodeCargoType"
        ,{ params }
        ,{}
    ).then(res=>{
        setCargoTypeList(res.data);
        // if( !cargo.cargo_type ) {
        //     setCargo({...props.cargo, ['cargo_type']:res.data[0].cargo_type});
        // }
    }).catch(err => {
        if(err.response.status) {
            // onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }
  // Cargo Pack Type 목록조회
  const selectLineCodeCargoPackType = (params) => {
    axios.post(
        "/shipper/selectLineCodeCargoPackType"
        ,{ params }
        ,{}
    ).then(res=>{
        setCargoPackTypeLineCodeList(res.data);
        // if( !cargo.cargo_pack_type ) {
        //     setCargo({...props.cargo, ['cargo_pack_type']:res.data[0].cargo_pack_type});
        // }
    }).catch(err => {
        if(err.response.status) {
            // onDismiss("danger", "오류가 발생했습니다.");
        }
    });
  }

  // Container Size Type 목록조회
  const selectLineCodeCntrSztp = (params) => {
    axios.post(
        "/shipper/selectLineCodeCntrSztp"
        ,{ params }
        ,{}
    ).then(res=>{
        setCntrCodeLineCodeList(res.data);
    });
  }


  // 조회
  const selectBookingParams = () => {
    if( !(parameter.user_no && parameter.bkg_no && parameter.bkg_date) ) {
        return false;
    }
    const body =
    axios.post(
        "/shipper/selectBooking"
        ,{
            user_no : userData.user_no,
            klnet_id: userData.klnet_id,
            params:{
                user_no: parameter.user_no,
                bkg_no: parameter.bkg_no,
                bkg_date: parameter.bkg_date,
            }
        }
        ,{}
    ).then(
        // props.onAlert("success", "정상 조회 되었습니다.")
    ).then(
        res => {
            const result =  res.data;
            // console.log(result);
            if( 0 < result.length ) {
                if( "D" === result[0].status_cud ) {
                    props.alert(
                        null // onConfirm: function
                        , "이미 삭제된 부킹입니다."  // title: string
                        ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
                        ,true // show: boolean default:true
                        ,true  // reverseButtons: boolean , default: false
                        ,'lg' // btnSize: lg,sm,xs default:lg
                        ,'' // subtitle: string
                        ,true // showConfirm: boolean default: false
                        ,false // showCancel: boolean default: false
                        ,null // onCancel: function
                    );
                    setTimeout(
                        window.location.href="/svc/bookinglist"
                    ,3000)
                } else {
                    // setBooking(result[0]);
                    bookingStore.setBooking(result[0])
                    selectCargoOfBooking(result[0]);
                    // container 목록
                    selectContainerOfBooking(result[0]);
                    // specail 목록
                    selectContainerSpecialOfBooking(result[0]);
                }
            } else {
                // setBooking({});
            }
        }   
    );
  }

  // CargoOfBooking
  const selectCargoOfBooking = ( booking ) => {
    axios.post(
        "/shipper/selectCargoOfBooking"
        ,{ 
          //user_no: user?user.user_no:null,
          booking
        }
        ,{}
    ).then(
        res => {
            bookingStore.setCargo(res.data[0]);
            selectCargoGoodsOfBooking(res.data[0]);
        }
    );
  }

  // CargoOfBooking
  const selectCargoGoodsOfBooking = (booking) => {
    axios.post(
        "/shipper/selectCargoGoodsOfBooking"
        ,{ 
          // user_no: user?user.user_no:null,
          booking
        }
        ,{}
    ).then(
        res => {
            if( res.data.length > 0 ) {
                bookingStore.setGoodsRelationList(res.data);
            } else {
                bookingStore.setGoodsRelationList([{'key':1, 'cargo_seq':1}]);
            }
        }
    );
  }

  // Container Booking 정보 조회
  const selectContainerOfBooking=(booking)=>{
    axios.post(
        "/shipper/selectContainerOfBooking"
        ,{ 
          // user_no: user?user.user_no:null,
          booking
        }
        ,{}
    ).then(
        res => {
            if( res.data.length > 0 ) {
                bookingStore.setContainerList(res.data);
            } else {
                bookingStore.setContainerList([{'key':1, 'cntr_seq':1}]);
            }
        }
    );
}

    // Container Special Booking 정보 조회
    const selectContainerSpecialOfBooking=(booking)=>{
        axios.post(
            "/shipper/selectContainerSpecialOfBooking"
            ,{ 
                // user_no: user?user.user_no:null,
                booking
            }
            ,{}
        ).then(
            res => {
                if( res.data.length > 0 ) {
                    setContainerSpecialList(res.data);
                } else {
                    setContainerSpecialList([{'key':1, 'cntr_seq':1}]);
                }
            }
        );
    }

//   const fncOnBlurCargo =(cargoParams)=> {
//     // let merge = Object.assign(cargo, cargoParams);
//     bookingStore.setCargo(cargoParams);
//   }
//   const fncOnBlurGoods =(goods)=> {
//     setGoodsRelationList( goods );
//   }
  const fncOnBlurContainer =(index, container) => {
    // setContainerList([...containerList]);
    // console.log("aaaaabbbbbb", index,container)
    if( container.length>1 && 'Y' === container.delete ) {
      if(index > -1) bookingStore.containerList.splice(index,1);
    //   console.log(containerList);
      bookingStore.setContainerList([...bookingStore.containerList]);
    } else {
      bookingStore.containerList[index] = container;
      bookingStore.setContainerList([...bookingStore.containerList]);
    }
  }
  const fncAddSpecialList = (containerSpecialList) => {
    // bookingStore.setContainerList([...containerList,{'cntr_seq':containerList.length+1}]);
    setContainerSpecialList([...containerSpecialList,{'cntr_seq':containerSpecialList.length+1, 'special_seq':containerSpecialList.length+1}]);
  }
  const fncOnBlurSpecialList =(specialList)=> {
      setContainerSpecialList(specialList);
  }
  const fncOnBlurDoor =(door)=>{
    setDoor(door);
  }

  const fncSetOpenBooking =(open)=>{
    setOpenBooking(open);
  }
  const fncSetOpenSchedule =(open)=>{
    setOpenSchedule(open);
  }
  const fncSetOpenShipper =(open)=> {
    setOpenShipper(open);
  }
  const fncSetOpenLine =(open)=> {
    setOpenLine(open);
  }
  const fncSetOpenConsignee =(open)=> {
    setOpenConsignee(open);
  }
  const fncSetOpenForwarder =(open)=> {
    setOpenForwarder(open);
  }
  const fncSetOpenTransport =(open)=> {
    setOpenTransport(open);
  }
  const fncSetOpenDocument =(open)=>{
    setOpenDocument(open);
  }
  const fncSetOpenCargo =(open)=> {
    setOpenCargo(open);
  }
  const fncSetOpenContainer =(open)=> {
      setOpenContainer(open);
  }

  const rangeClick = () => {
    // if (minLengthState === "") {
    //   setminLengthState("error");
    // }
    // if (maxLengthState === "") {
    //   setmaxLengthState("error");
    // }
    // if (rangeState === "") {
    //   setrangeState("error");
    // }
    // if (minValueState === "") {
    //   setminValueState("error");
    // }
    // if (maxValueState === "") {
    //   setmaxValueState("error");
    // }
  };

  // 입력
  const insertBooking = () => {
    if( !userData ) {
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
    if( !userData.bkg_recipient ) {
        props.alert(
            null // onConfirm: function
            , validation.NO_BKG_RECIPIENT  // title: string
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
    
    if( !autoSelf && !bkgNoDupCheck ) {
        props.alert(
            null // onConfirm: function
            , validation.NO_DUP_CHECK_MSG  // title: string
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
            "/shipper/insertBooking"
            ,{
                user_no: userData.user_no?userData.user_no:null,
                klnet_id: userData.klnet_id,
                newBkgNo: newBkgNo?newBkgNo:null,
                booking: bookingStore.booking,
                params:{
                    ...parameter,
                    user_no: parameter.user_no,
                    bkg_no: null,
                    bkg_date: parameter.bkg_date,
                    line_code: "Y" === parameter.schedule_yn ? parameter.line_code: null,
                    sch_vessel_name: parameter.sch_vessel_name,
                    sch_vessel_voyage: parameter.sch_vessel_voyage,
                    sch_pol: parameter.sch_pol,
                    sch_pod: parameter.sch_pod,
                    sch_etd: parameter.sch_etd,
                    sch_eta: parameter.sch_eta,
                    sch_call_sign: parameter.sch_call_sign,
                    vsl_type: parameter.vsl_type,
                    'schedule_yn':'Y',
                    'new_yn':'Y',
                }
            }
        ).then(
            // INSERT 결과값 넣기
            res => {
                
                // console.log(">>>>>>>>>>>>>>>>", data);
                // setBooking(res.data.rows[0]);
                // fncBookingParent(res.data.rows[0]);
                // props.onAlert("success","부킹(이)가 새로 생성되었습니다.");
                // SELF 부킹 입력화면 닫아주고
                // if( !autoSelf ) {
                //     setAutoSelf(!autoSelf);
                // }
                // SELF 부킹화면 입력 되어 있으면 없애주자
                setNewBkgNo(null);
                // 닫혀 있으면 열어주자
                if( !allOpen ) {
                    setAllOpen(!allOpen);
                }
                // check 정보도 초기화
                if( bkgNoDupCheck ) {
                    setBkgNoDupCheck(!bkgNoDupCheck);
                }
                // alert("성공성공")
                // props.onAlert("success",validation.NEW_MSG);

                let data = res.data.rows[0];
                // console.log('data :', data)
                let obj = Object.assign(parameter, data, {'schedule_yn':'N','new_yn':'N'});
                // console.log('obj :', obj)
                setParameter({...parameter, obj});
            }   
        ).catch(
            error => {
                props.alert(
                    null // onConfirm: function
                    , "오류가 발생했습니다."  // title: string
                    ,'error' // default,info,success,warning,danger,error,input,custom,controlled
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

    const fncOpenCardInvalidMaxLength =()=>{
        // if( validation.fncFeedIdInvalidMaxLength('booking') ) {
        //     setOpenBooking(true);
        // }

        // if( validation.fncFeedIdInvalidMaxLength('schedule') ) {
        //     setOpenSchedule(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('carrier') ) {
        //     setOpenCarrier(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('shipper') ) {
        //     setOpenShipper(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('consignee') ) {
        //     setOpenConsignee(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('forwarder') ) {
        //     setOpenForwarder(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('transport') ) {
        //     setOpenTrans(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('cargo') ) {
        //     setOpenCargo(true);
        // }
        // if( containerList.length ===0 ) {
        //     setOpenContainer(true);
        // }
        // if( validation.fncFeedIdInvalidMaxLength('container') ) {
        //     setOpenContainer(true);
        // }
    }
    // SAVE 저장
    const updateAllBooking = async(e)=> {
        if( !bookingStore.isBookingNo ) {
            props.alert(
                null // onConfirm: function
                , "부킹번호를 먼저 생성하세요."  // title: string
                ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'[NEW]버튼으로 생성 가능합니다.' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
            );
            return false;
        }
        if( !validation.fncValidationMaxLength() ) {
            fncOpenCardInvalidMaxLength();
            props.alert(
                null // onConfirm: function
                , "입력가능을(를) 확인 후 다시 저장 하세요."  // title: string
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
        };

        if( !bookingStore.booking.bkg_no ) return false;
        if( !userData ) {
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
        setAllOpen(false);
        axios.post(
            "/shipper/updateAllBooking"
            ,{
                user_no : userData.user_no?userData.user_no:null,
                booking: bookingStore.booking ,
                containerList: bookingStore.containerList,
                containerSpecialList,
                cargo: bookingStore.cargo,
                goodsRelationList: bookingStore.goodsRelationList,
                dangerTrue,
                door
            }
            ,{}
        ).then(
            res => {
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
                setParameter({...parameter,
                    'schedule_yn':'N',
                    'new_yn':'N',
                });
            }   
        ).catch(
            error=>{
                // const data = error.response.data;
                // console.log(data);
                props.alert(
                    null // onConfirm: function
                    , "오류가 발생했습니다."  // title: string
                    ,'error' // default,info,success,warning,danger,error,input,custom,controlled
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

    const fncBookmarkParent =(e)=> {
        let obj = Object();
        if( e ) {
            obj.bookmark_seq = e.value
            bookingStore.setBooking({...bookingStore.booking, ['bookmark_seq']:e.value, ['bookmark_name']:e.label})
            setBookmarkSeq(obj);
        } else {
            if ( bookingStore.booking && bookingStore.booking.bookmark_seq ) {
                obj.bookmark_seq = null;
                
                setBookmarkSeq(obj);
                

                let bkgNo = bookingStore.booking.bkg_no;
                let userNo = bookingStore.booking.user_no;
                let bkgDate = bookingStore.booking.bkg_date;
                let lineCode = bookingStore.booking.line_code;
                let klnetId = bookingStore.booking.klnet_id;
                let statusCus = bookingStore.booking.status_cus;
                let statusCusKr = bookingStore.booking.status_cus_kr;
                bookingStore.setBooking({
                    user_no: userNo,
                    bkg_no: bkgNo,
                    bkg_date: bkgDate,
                    klnet_id: klnetId,
                    line_code: lineCode,
                    sch_line_code: lineCode,
                    status_cus: statusCus,
                    status_cus_kr: statusCusKr,
                    bookmark_yn: 'D',
                    bookmark_seq: null,
                    bookmark_name: null,
                });
                bookingStore.setCargo({
                    'cargo_bookmark_seq': null,
                    'cargo_bookmark_name': null,
                    'cargo_name': null,
                    'cargo_hs_code': null,
                    'cargo_pack_qty': null,
                    'cargo_pack_type': null,
                    'cargo_remark': null,
                    'cargo_total_volume': null,
                    'cargo_total_weight': null,
                    'cargo_type': null,
                    'cargo_weight': null,
                    'selected_yn':'N'
                });

                
                bookingStore.setGoodsRelationList( [{'key':1, 'cargo_seq':1}] );

            }
        }
    }
    const selectBookingBkgBookmarkRelation =()=>{
        const body =
        axios.post(
            "/shipper/selectBookingBkgBookmarkRelation"
            ,{
                user_no: userData.user_no?userData.user_no:null,
                bookmark: bookmarkSeq,
            }
            ,{}
        ).then(
            res=>{
                setRelationList(res.data);
                // fncGetRelation();
            }
        );
    }

    const fncDupCheckBkgNo = (e)=>{
        if( !newBkgNo ) {
            props.alert(
                null // onConfirm: function
                , validation.NO_NULL_MSG  // title: string
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
        if( !validation.validationNo(newBkgNo) ) {
            props.alert(
                null // onConfirm: function
                , validation.NO_CHECK_MSG  // title: string
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
            "/shipper/selectDupCheckBkgNo"
            ,{
                user_no : userData.user_no?userData.user_no:null,
                newBkgNo
            }
            ,{}
        ).then(
            res => {
                if( res.data.length ) {
                    if( res.data[0].bkg_no ) {
                        props.alert(
                            null // onConfirm: function
                            , "Booking 번호 중복입니다. 다시 입력하세요."  // title: string
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
                } else {
                    fncSelfNewBkgNoCheck();
                }
            }   
        );
    }

    const fncOpenCardInvalid =()=>{
        // let feedback = $('.invalid-feedback');
        // let schedule, bkgCheck, carrier, shipper, consignee, forwarder, transport, cargo, container = false;
        // feedback.each(function(i, item){
        //     if( 'block' === $(item).css('display')&&
        //         'deny' !== $(item).attr('feedid')) {
        //         if( "booking" ===  $(item).attr("feedid") ) {
        //             bkgCheck = true;
        //         }
        //         if( "schedule" ===  $(item).attr("feedid") ) {
        //             schedule = true;
        //         }
        //         if( "carrier" ===  $(item).attr("feedid") ) {
        //             carrier = true;
        //         }
        //         if( "shipper" ===  $(item).attr("feedid") ) {
        //             shipper = true;
        //         }
        //         if( "consignee" ===  $(item).attr("feedid") ) {
        //             consignee = true;
        //         }
        //         if( "forwarder" ===  $(item).attr("feedid") ) {
        //             forwarder = true;
        //         }
        //         if( "transport" ===  $(item).attr("feedid") ) {
        //             transport = true;
        //         }
        //         if( "cargo" ===  $(item).attr("feedid") ) {
        //             cargo = true;
        //         }
        //         if( "container" ===  $(item).attr("feedid") ) {
        //             container = true;
        //         }
        //     }
        // });
        if( validation.fncFeedIdInvalid('booking') ) {
            setOpenBooking(true);
        }

        if( validation.fncFeedIdInvalid('schedule') ) {
            setOpenSchedule(true);
        }
        if( validation.fncFeedIdInvalid('carrier') ) {
            setOpenLine(true);
        }
        if( validation.fncFeedIdInvalid('shipper') ) {
            setOpenShipper(true);
        }
        if( validation.fncFeedIdInvalid('consignee') ) {
            setOpenConsignee(true);
        }
        if( validation.fncFeedIdInvalid('forwarder') ) {
            setOpenForwarder(true);
        }
        if( validation.fncFeedIdInvalid('transport') ) {
            setOpenTransport(true);
        }
        if( validation.fncFeedIdInvalid('cargo') ) {
            setOpenCargo(true);
        }
        if( bookingStore.containerList.length ===0 ) {
            setOpenContainer(true);
        }
        if( validation.fncFeedIdInvalid('container') ) {
            setOpenContainer(true);
        }
        // for( let i=0; i<containerList.length; i++ ) {
        //     let row = containerList[i];
        //     if( !row.cntr_code || !row.cntr_pick_up_cy_code || !row.cntr_pick_up_cy_date ||!row.cntr_qty ) {
        //         // console.log("Container 필수체크")
                
        //     }
        // }
    }

    // alert={(onConfirm,title,type,show,reverseButtons,btnSize,subtitle,showConfirm,showCancel)=>onSetAlertStatus(onConfirm,title,type,show,reverseButtons,btnSize,subtitle,showConfirm,showCancel)} 
    const fncSelfNewBkgNoCheck = ()=>{

        let title = "["+newBkgNo+"] 사용 가능" ;
        let message = "["+ newBkgNo+"] Booking "+validation.NO_MAKE_MSG;
        props.alert(()=>{
            // Confirm 인 경우
            if( !bkgNoDupCheck ) {
                setBkgNoDupCheck(!bkgNoDupCheck);
            }
            // return false;
            // props.alert(null,null, '','',false,true,'','',false,false);
        }, title,'warning',true,true,'lg',message,true,true,
        ()=>{
            // Cancel 인 경우
            setNewBkgNo(null);
            setAutoSelf(true);
            // return false;
            // props.alert(null,null, '','',false,true,'','',false,false);
        });

        // let title = "["+newBkgNo+"] 사용 가능" ;
        // let message = "["+ newBkgNo+"] Booking "+validation.NO_MAKE_MSG;
        // let result = await Confirm({
        //     title: title,
        //     message: message,
        //     confirmText: "SEND",
        //     cancleText: 'Cancle',
        // });
        // if ( true === result ) {
        //     if( !bkgNoDupCheck ) {
        //         setBkgNoDupCheck(!bkgNoDupCheck);
        //     }
        // } else {
        //     setNewBkgNo(null);
        //     setAutoSelf(!autoSelf);
        // }
    }
    const fncNewBkgNo =(newBkgNo)=> {
        setNewBkgNo(newBkgNo);
    }
    

    // SEND
    const sendBooking = (status)=> {
        if( !bookingStore.isBookingNo ) {
            props.alert(
                null // onConfirm: function
                , "부킹번호를 먼저 생성하세요."  // title: string
                ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
                ,true // show: boolean default:true
                ,true  // reverseButtons: boolean , default: false
                ,'lg' // btnSize: lg,sm,xs default:lg
                ,'[NEW]버튼으로 생성 가능합니다.' // subtitle: string
                ,true // showConfirm: boolean default: false
                ,false // showCancel: boolean default: false
                ,null // onCancel: function
            );
            return false;
        }
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
        // if( !user.bkg_recipient ) {
        //     props.alert(
        //         null // onConfirm: function
        //         , validation.NO_BKG_RECIPIENT  // title: string
        //         ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
        //         ,true // show: boolean default:true
        //         ,true  // reverseButtons: boolean , default: false
        //         ,'lg' // btnSize: lg,sm,xs default:lg
        //         ,'' // subtitle: string
        //         ,true // showConfirm: boolean default: false
        //         ,false // showCancel: boolean default: false
        //         ,null // onCancel: function
        //     );
        //     return false;
        // }

        if( status === 'SEND' ) {
            if( !('NO' === bookingStore.booking.status_cus || 'S0' === bookingStore.booking.status_cus || 'EC' === bookingStore.booking.status_cus) ) {
                props.alert(
                    null // onConfirm: function
                    , "부킹전송은 저장 또는 취소승인 인 경우에만 가능합니다." // title: string
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
        } else {
            if( !('RA' === bookingStore.booking.status_cus) ) {
                props.alert(
                    null // onConfirm: function
                    , "부킹취소는 승인 인 경우에만 가능합니다." // title: string
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
        }


        if( !bookingStore.booking.bkg_no ) return false;
        setAllOpen(false);
        let statusName = (status==='CANCEL')?'CANCEL':'SEND';
        // booking의 document 정보와 다르면 Confirm 메세지 
        // let title = "["+booking.bkg_no+"]" ;
        let message = "["+ bookingStore.booking.bkg_no+"] Booking 을(를) "+statusName+" 하시겠습니까?";
        let title = "SEND";

        props.alert(()=>{
            // Confirm 인 경우
            if( !validation.fncValidation() ) {
                fncOpenCardInvalid();
                props.alert(
                    ()=>{} // onConfirm: function
                    , "필수값 또는 입력가능을(를) 확인 후 다시 "+statusName+" 하세요." // title: string
                    ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
                    ,true // show: boolean default:true
                    ,true  // reverseButtons: boolean , default: false
                    ,'lg' // btnSize: lg,sm,xs default:lg
                    ,'' // subtitle: string
                    ,true // showConfirm: boolean default: false
                    ,false // showCancel: boolean default: false
                    ,()=>{} // onCancel: function
                );
                return false;
            };

            // SEND 할때 최종 확인 절차
            // if( !fncCustomRequired() )


            // console.log( booking.status_cus , "aa")
            if( status === 'SEND' ) {
                // console.log(booking)
                axios.post(
                    "/shipper/updateAllBooking"
                    ,{
                        user_no: userData.user_no?userData.user_no:null,
                        booking: bookingStore.booking ,
                        containerList: bookingStore.containerList,
                        containerSpecialList,
                        cargo: bookingStore.cargo,
                        goodsRelationList: bookingStore.goodsRelationList,
                        dangerTrue,
                        door
                    }
                    ,{}
                ).then(
                    // INSERT 결과값 넣기
                    res => {
                        // setBooking(res.data.rows[0]);
                        // fncBookingPrarms(res.data.rows[0]);
                        // props.onAlert("success",validation.SAVE_MSG);
                        // setParams(booking);
                        // selectBookingParams();
                        
                        setTimeout(function(){
                            axios.post(
                                "/shipper/sendBooking"
                                ,{
                                user_no : userData.user_no?userData.user_no:null,
                                klnet_id: userData.klnet_id,
                                status : status,
                                booking: bookingStore.booking,
                                cargo: bookingStore.cargo,
                                containerList: bookingStore.containerList,
                                containerSpecialList,
                                dangerTrue,
                                door
                                }
                                ,{}
                            ).then(
                                res => {
                                    props.alert(
                                        null // onConfirm: function
                                        , validation.SEND_MSG // title: string
                                        ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                                        ,true // show: boolean default:true
                                        ,true  // reverseButtons: boolean , default: false
                                        ,'lg' // btnSize: lg,sm,xs default:lg
                                        ,'' // subtitle: string
                                        ,true // showConfirm: boolean default: false
                                        ,false // showCancel: boolean default: false
                                        ,null // onCancel: function
                                    );
                                    selectBookingParams();
                                }   
                            ).catch(
                                error=>{
                                    const data = error.response.data;
                                    // console.log(data)
                                    let message = "";
                                    if( data.service_code ) {
                                        setOpenBooking(true);
                                        message += data.service_code;
                                    }
                                    if( data.vessel_name || data.route) {
                                        setOpenSchedule(true);
                                        if( data.vessel_name )
                                            message += "\n"+data.vessel_name;
                                        if( data.route )
                                            message += "\n"+data.route;
                                    }
                                    if( data.cargo_pack_type ) {
                                        setOpenCargo(true);
                                        message = "\n"+data.cargo_pack_type;
                                    }
                                    if( data.cntr_sztp || data.pick_up || data.danger ) {
                                        setOpenContainer(true);
                                        if( data.cntr_sztp )
                                            message += "\n"+data.cntr_sztp;
                                        if( data.pick_up )
                                            message += "\n"+data.pick_up;
                                        if( data.danger )
                                            message += "\n"+data.danger;
                                    }
                                    if( data.originator || data.recipient ) {
                                        
                                        message = "\n"+data.originator;
                                    }
                                    if( message ) {
                                        props.alert(
                                            null // onConfirm: function
                                            , message // title: string
                                            ,'error' // default,info,success,warning,danger,error,input,custom,controlled
                                            ,true // show: boolean default:true
                                            ,true  // reverseButtons: boolean , default: false
                                            ,'lg' // btnSize: lg,sm,xs default:lg
                                            ,'' // subtitle: string
                                            ,true // showConfirm: boolean default: false
                                            ,false // showCancel: boolean default: false
                                            ,null // onCancel: function
                                        );
                                        return false;
                                    } else {
                                        props.alert(
                                            null // onConfirm: function
                                            , '오류가 발생했습니다.' // title: string
                                            ,'error' // default,info,success,warning,danger,error,input,custom,controlled
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
                                }
                            );
                        },1000)
                        
                    }   
                );
            } else {

                // 취소인 경우
                axios.post(
                    "/shipper/sendBooking"
                    ,{
                    user_no : userData.user_no?userData.user_no:null,
                    klnet_id: userData.klnet_id,
                    status : status,
                    booking: bookingStore.booking
                    }
                    ,{}
                ).then(
                    // INSERT 결과값 넣기
                    res => {
                        props.alert(
                            null // onConfirm: function
                            , validation.SEND_MSG // title: string
                            ,'success' // default,info,success,warning,danger,error,input,custom,controlled
                            ,true // show: boolean default:true
                            ,true  // reverseButtons: boolean , default: false
                            ,'lg' // btnSize: lg,sm,xs default:lg
                            ,'' // subtitle: string
                            ,true // showConfirm: boolean default: false
                            ,false // showCancel: boolean default: false
                            ,null // onCancel: function
                        );
                        setParameter({...parameter,
                            'schedule_yn':'N',
                            'new_yn':'N',
                        });
                    }   
                );
 
            }
        }, title,'warning',true,true,'lg',message,true,true,
        null
        );


        // let result = await Confirm({
        //     title: title,
        //     message: message,
        //     confirmText: "SEND",
        //     cancleText: 'Cancel',
        // });
        // if ( true === result ) {
            

        // }

    }
    
    



    const fncReportViewer=()=> {

        if( !(bookingStore.booking.user_no && bookingStore.booking.bkg_date && bookingStore.booking.bkg_no ) ) {
            props.alert(
                null // onConfirm: function
                , "Booking 먼저 조회 하세요." // title: string
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
        var obj = new Object();
        obj.user_no = bookingStore.booking.user_no;
        obj.bkg_date = bookingStore.booking.bkg_date;
        obj.bkg_no = bookingStore.booking.bkg_no;
        var json = JSON.stringify(obj);

        let form = document.reportForm;
        form.action = '/shipper/reportViewer';
        form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
        form.file_id.value = 'SEAWAYBILL';
        form.file_path.value = 'WEIDONG';
        form.name.value = 'FILENAME';
        form.connection.value = 'pgsql';
        form.parameters.value = json;
        window.open('', 'popReport', 'width=1050px, height=850px');
        form.submit();
    }


    const selectShipperCompanyListByUser =(params)=>{
        const body =
        axios.post(
            "/shipper/selectShipperCompanyListByUser"
            ,{
                line_code: params.line_code,
                klnet_id: userData.klnet_id,
            }
            ,{}
        ).then(
            res=>{
                setShipperCompanyList(res.data);
            }
        );
    }
    const selectForwarderCompanyListByUser =(params)=>{
        const body =
        axios.post(
            "/shipper/selectForwarderCompanyListByUser"
            ,{
                line_code: params.line_code,
                klnet_id: userData.klnet_id,
            }
            ,{}
        ).then(
            res=>{
                setForwarderCompanyList(res.data);
            }
        );
    }

    // Container VESSEL PICKUP CY 목록조회
    const selectLineCodeVesselPickup = (params) => {
        axios.post(
            "/shipper/selectLineCodeVesselPickup"
            ,{ params }
            ,{}
        ).then(res=>{
            setLineCodeVesselPickup(res.data);
        });
    }

    // 삭제
    const deleteBooking = async() => {
        if( !bookingStore.booking.bkg_no ) return false;
        if( 'D' === bookingStore.booking.status_cud ) {
            props.alert(
                null // onConfirm: function
                , "이미 삭제 처리된 부킹입니다." // title: string
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
        /*
        <option value="NO">저장</option>
        <option value="S0">저장</option>
        <option value="S9">전송</option>
        <option value="S4">정정전송</option>
        <option value="S1">취소전송</option>
        <option value="BC">승인</option>
        <option value="RJ">거절</option>
        <option value="CC">취소승인</option>
        <option value="RC">승인취소</option>
        */
        // 취소승인(캔슬컨펌) 또는 저장 상태인 것만 삭제 가능
        if( !("NO" === bookingStore.booking.status_cus || "S0" === bookingStore.booking.status_cus || "CC" === bookingStore.booking.status_cus) ) {
            props.alert(
                null // onConfirm: function
                , "저장 또는 취소승인(캔슬컨펌) 상태만 삭제 가능합니다." // title: string
                ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
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

        let title = `문서번호 [${bookingStore.booking.bkg_no}]`;
        let message = `[${bookingStore.booking.bkg_no}] Booking 을(를) 삭제 하시겠습니까? 삭제한 경우 재 조회가 불가합니다.`;

        props.alert(
            ()=>{
                axios.post(
                    "/shipper/deleteBooking"
                    ,{
                    user_no : userData?userData.user_no:null,
                    booking: bookingStore.booking
                    }
                    ,{}
                ).then(
                    res=>{
                        props.alert(
                            null // onConfirm: function
                            , validation.DEL_MSG // title: string
                            ,'danger' // default,info,success,warning,danger,error,input,custom,controlled
                            ,true // show: boolean default:true
                            ,true  // reverseButtons: boolean , default: false
                            ,'lg' // btnSize: lg,sm,xs default:lg
                            ,'부킹 조회 화면으로 이동합니다.' // subtitle: string
                            ,true // showConfirm: boolean default: false
                            ,false // showCancel: boolean default: false
                            ,null // onCancel: function
                        );
                        // selectBookingParams();
                        setTimeout(
                            window.location.href="/svc/bookinglist"
                        ,3000)
                    }
                );
            } // onConfirm: function
            , title// title: string
            ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
            ,true // show: boolean default:true
            ,true  // reverseButtons: boolean , default: false
            ,'lg' // btnSize: lg,sm,xs default:lg
            ,message // subtitle: string
            ,true // showConfirm: boolean default: false
            ,true // showCancel: boolean default: false
            ,()=>{} // onCancel: function
        );

    }

  return(
    <React.Fragment>
        <div style={{paddingLeft:'5%',paddingRight:'5%'}}>
            <Card className={classes.booking_title}>
                <CardBody>
                    <GridItem xs={12} sm={12} style={{textAlign:'right'}}>
                        <Button color="info" onClick={(e)=>setParameter({
                            ...parameter,
                            user_no: parameter.user_no,
                            bkg_no: null,
                            bkg_date: parameter.bkg_date,
                            line_code: null,
                            sch_vessel_name: null,
                            sch_vessel_voyage: null,
                            sch_pol: null,
                            sch_pod: null,
                            sch_etd: null,
                            sch_eta: null,
                            sch_call_sign: null,
                            vsl_type: null,
                            'schedule_yn':'N',
                            'new_yn':'Y',
                        })} endIcon={<NoteAdd/>}>NEW</Button>
                        <Button color="info" onClick={(e)=>{fncReportViewer(e)}} endIcon={<Print/>} >REPORT</Button>
                        <Button color="info" onClick={(e)=>updateAllBooking()} endIcon={<Save/>}>SAVE</Button>
                        <Button id="btnSend" color="info" onClick={(e)=>sendBooking('SEND')} endIcon={<Send/>}>SEND</Button>
                        <Button id="btnSend" color="info" onClick={(e)=>deleteBooking()} endIcon={<Delete/>}>DELETE</Button>
                    </GridItem>
                    <HeaderCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        newBkgNo={newBkgNo}
                        autoSelf={autoSelf}
                        otherBookmarkList={otherBookmarkList}
                        scheduleBookmarkList={scheduleBookmarkList}
                        shipperBookmarkList={shipperBookmarkList}
                        lineBookmarkList={lineBookmarkList}
                        consigneeBookmarkList={consigneeBookmarkList}
                        forwarderBookmarkList={forwarderBookmarkList}
                        transportBookmarkList={transportBookmarkList}
                        documentBookmarkList={documentBookmarkList}
                        cargoBookmarkList={cargoBookmarkList}
                        containerBookmarkList={containerBookmarkList}
                        fncBookmarkParent={fncBookmarkParent}
                        fncDupCheckBkgNo={fncDupCheckBkgNo}
                        fncNewBkgNo={fncNewBkgNo}
                        {...props}
                    />
                </CardBody>
            </Card>
            <GridContainer>
                <GridItem className={classes.grid} lg={6} md={12} sm={12} xs={12}>
                    <ScheduleCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        scheduleBookmarkList={scheduleBookmarkList}
                        portCodeList={portCodeList}
                        // fncOnBlurParent={fncOnBlur}
                        openSchedule={openSchedule}
                        lineWorkOriginatorList={lineWorkOriginatorList}
                        fncSetOpenSchedule={fncSetOpenSchedule}
                        selectBookingScheduleBookmark={selectBookingScheduleBookmark}
                        {...props}
                    />
                </GridItem>
                <GridItem className={classes.grid} lg={6} md={12} sm={12} xs={12}>
                    <BookingCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        otherBookmarkList={otherBookmarkList}
                        serviceLineCodeList={serviceLineCodeList}
                        incotermsLineCodeList={incotermsLineCodeList}
                        // fncOnBlurParent={fncOnBlur}
                        openBooking={openBooking}
                        fncSetOpenBooking={fncSetOpenBooking}
                        selectBookingOtherBookmark={selectBookingOtherBookmark}
                        {...props}
                    />
                    <CarrierCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        lineBookmarkList={lineBookmarkList}
                        lineWorkOriginatorList={lineWorkOriginatorList}
                        // fncOnBlurParent={fncOnBlur}
                        openLine={openLine}
                        fncSetOpenLine={fncSetOpenLine}
                        selectBookingLineBookmark={selectBookingLineBookmark}
                        {...props}
                    />
                </GridItem>
            </GridContainer>
            
            
            <GridContainer>

                <GridItem className={classes.grid} lg={4} md={12} sm={12} xs={12}>
                    <ShipperCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        shipperBookmarkList={shipperBookmarkList}
                        // fncOnBlurParent={fncOnBlur}
                        openShipper={openShipper}
                        fncSetOpenShipper={fncSetOpenShipper}
                        selectBookingShipperBookmark={selectBookingShipperBookmark}
                        shipperCompanyList={shipperCompanyList}
                        {...props}
                    />
                </GridItem>
                <GridItem className={classes.grid} lg={4} md={12} sm={12} xs={12} >
                    <ForwarderCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        forwarderBookmarkList={forwarderBookmarkList}
                        openForwarder={openForwarder}
                        // fncOnBlurParent={fncOnBlur}
                        fncSetOpenForwarder={fncSetOpenForwarder}
                        selectBookingForwarderBookmark={selectBookingForwarderBookmark}
                        forwarderCompanyList={forwarderCompanyList}
                        {...props}
                    />
                </GridItem>
                <GridItem className={classes.grid} lg={4} md={12} sm={12} xs={12}>
                    <ConsigneeCard
                        // booking={booking}
                        bookingStore={bookingStore}
                        consigneeBookmarkList={consigneeBookmarkList}
                        openConsignee={openConsignee}
                        // fncOnBlurParent={fncOnBlur}
                        fncSetOpenConsignee={fncSetOpenConsignee}
                        selectBookingConsigneeBookmark={selectBookingConsigneeBookmark}
                        {...props}
                    />
                </GridItem>
            </GridContainer>
            {/* <DocumentCard
                // booking={booking}
                bookingStore={bookingStore}
                documentBookmarkList={documentBookmarkList}
                openDocument={openDocument}
                // fncOnBlurParent={fncOnBlur}
                fncSetOpenDocument={fncSetOpenDocument}
                selectBookingDocumentBookmark={selectBookingDocumentBookmark}
                {...props}
            /> */}
            <TransportCard
                // booking={booking}
                bookingStore={bookingStore}
                transportBookmarkList={transportBookmarkList}
                openTransport={openTransport}
                // fncOnBlurParent={fncOnBlur}
                fncSetOpenTransport={fncSetOpenTransport}
                selectBookingTransportBookmark={selectBookingTransportBookmark}
                {...props}
            />
            
            <CargoCard
                cargo={bookingStore}
                goodsRelationList={bookingStore.goodsRelationList}
                cargoBookmarkList={cargoBookmarkList}
                goodsBookmarkList={goodsBookmarkList}
                cargoTypeList={cargoTypeList}
                cargoPackTypeLineCodeList={cargoPackTypeLineCodeList}
                openCargo={openCargo}
                // fncOnBlurCargo={fncOnBlurCargo}
                fncSetOpenCargo={fncSetOpenCargo}
                // fncOnBlurGoods={fncOnBlurGoods}
                selectBookingCargoBookmark={selectBookingCargoBookmark}
                selectBookingCargoGoodsBookmark={selectBookingCargoGoodsBookmark}
                {...props}
            />
            <ContainerCard
                booking={bookingStore.booking}
                isTerm={bookingStore.isTerm}
                isTransSelfYn={bookingStore.isTransSelfYn}
                isCargoType={bookingStore.isCargoType}
                containerStore={bookingStore}
                containerSpecialList={containerSpecialList}
                openContainer={openContainer}
                containerBookmarkList={containerBookmarkList}
                specialBookmarkList={specialBookmarkList}
                cntrCodeLineCodeList={cntrCodeLineCodeList}
                lineCodeVesselPickup={lineCodeVesselPickup}
                fncOnBlurContainer={fncOnBlurContainer}
                fncAddSpecialList={fncAddSpecialList}
                fncOnBlurDoor={fncOnBlurDoor}
                fncSetOpenContainer={fncSetOpenContainer}
                fncOnBlurSpecialList={fncOnBlurSpecialList}
                selectBookingContainerBookmark={selectBookingContainerBookmark}
                {...props}
            />
            </div>
            <ButtonGroup style={{zIndex:'100',position:'fixed',right:'1%',top:'20%'}}
                orientation="vertical"
                aria-label="vertical outlined button group">
                <Button className="mb-1 pt-1 pb-1" 
                    color="white" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        updateAllBooking();
                        document.getElementById("topNavBar").scrollIntoView({
                            // behavior: "smooth",
                            block: "start",
                            inline: "start",
                            });
                    }}
                    ><span style={{fontSize:'12px'}}>SAVE</span></Button>
                <Button className="mb-1 pt-1 pb-1"
                    color="white" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        sendBooking('SEND');
                        document.getElementById("topNavBar").scrollIntoView({
                            // behavior: "smooth",
                            block: "start",
                            inline: "start",
                            });
                    }}
                    ><span style={{fontSize:'12px'}}>SEND</span></Button>
                <Button className="mb-1 pt-1 pb-1"
                    color="white" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        setAllOpen(!allOpen);
                        if( allOpen ) {
                            document.getElementById("topNavBar").scrollIntoView({
                                // behavior: "smooth",
                                block: "start",
                                inline: "start",
                                });
                        }
                    }}
                    ><span style={{fontSize:'12px'}}>{allOpen?'Close':'Open'}</span></Button>
            </ButtonGroup>
            <nav id="cd-vertical-nav" style={{zIndex:'15'}}>
                <ul>
                    <li>
                        <a 
                        data-number="1"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("booking").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">
                            Booking
                        </span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("schedule").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Schedule</span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("shipper").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Shipper</span>
                        </a>
                    </li>     
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("carrier").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Carrier</span>
                        </a>
                    </li>  
                    <li>
                    <a 
                    data-number="2"
                    //href="#projects"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("consignee").scrollIntoView(true);
                    }}
                    >
                    <span className="cd-dot" />
                    <span className="cd-label">Consignee</span>
                    </a>
                    </li>  
                    <li>
                    <a 
                    data-number="2"
                    //href="#projects"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("forwarder").scrollIntoView(true);
                    }}
                    >
                    <span className="cd-dot" />
                    <span className="cd-label">Forwarder</span>
                    </a>
                    </li>  
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("schedule").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Transport</span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("document").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Document</span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("cargo").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Cargo</span>
                        </a>
                    </li>
                    <li>
                        <a 
                        data-number="2"
                        //href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("container").scrollIntoView(true);
                        }}
                        >
                        <span className="cd-dot" />
                        <span className="cd-label">Container</span>
                        </a>
                    </li>
                </ul>
            </nav>
            {topView?
                <Button className="mb-1 pt-1 pb-1" style={{zIndex:'100',position:'fixed',right:'1%',top:'86%'}}
                    color="rose" size="sm"
                    //outline
                    type="button" 
                    onClick={(e) => {
                        // e.preventDefault();
                        document.getElementById("topNavBar").scrollIntoView({
                        // behavior: "smooth",
                        block: "start",
                        inline: "start",
                        });
                        // document.getElementById("root").scrollTo(0,0)
                    }}
                    >
                    <i className="fa fa-angle-double-up fa-3x" /><br/><span style={{position:'absolute',top:'64%',right:'15%',fontSize:'1px'}}>Top</span>
                </Button> :<></>}
                
            <form id="reportForm" name="reportForm" >
                <input type="hidden" name="system_id"   value="plismplus" />
                <input type="hidden" name="user_id"     value="M000008" />
                <input type="hidden" name="file_type"   value="pdf" />
                <input type="hidden" name="file_id"     value="" />
                <input type="hidden" name="file_path"   value="" />
                <input type="hidden" name="name"        value="" />
                <input type="hidden" name="connection"  value="pgsql" />
                <input type="hidden" name="parameters" id="parameters"/>
            </form>
    </React.Fragment>
  )
})

export default BookingCommon;
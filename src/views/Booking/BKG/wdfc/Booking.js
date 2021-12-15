import React,{ useState, useEffect } from "react";

import { Card, IconButton,  Checkbox, //Input,InputLabel
} from "@material-ui/core";
import {OpenInNew} from "@material-ui/icons";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
//import {GolfCourse} from "@material-ui/icons";
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

export default function Booking(props) {
  const classes = useStyles();
  const [portCodeList, setPortCodeList] = useState([]);
  const [openSchedule, setOpenSchedule] = useState(true);
  const [openBooking, setOpenBooking] = useState(true);
  const [openLine, setOpenLine] = useState(true);
  const [openShipper, setOpenShipper] = useState(true);
  const [openConsignee, setOpenConsignee] = useState(true);
  const [openForwarder, setOpenForwarder] = useState(true);
  const [openTransport, setOpenTransport] = useState(true);
  const [openDocument, setOpenDocument] = useState(true);
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
  const [booking, setBooking] = useState({});
  const [cargo, setCargo] = useState({});
  const [goodsRelationList, setGoodsRelationList] = useState([]);
  const [containerList, setContainerList] = useState([]);
  const [door, setDoor] = useState({});
  const [containerSpecialList, setContainerSpecialList] = useState([]);
  const [specialBookmarkList, setSpecialBookmarkList] = useState([]);
  const [other, setOther] = useState({});
  const [schedule, setSchedule] = useState({});
  const [allOpen, setAllOpen] = useState(true);
  const [newBkgNo, setNewBkgNo] = useState('');
  const [bkgNoDupCheck, setBkgNoDupCheck] = useState(false);
  // 위험물인 경우 dangerTrue = True
  const [dangerTrue, setDangerTrue] = useState(false);
  // 전체 Bookmark Seq
  const [bookmarkSeq, setBookmarkSeq] = useState({});
  // Booking Bookmark 전체 적용정보
    const [relationList, setRelationList] = useState([]);
    // 부킹번호 자동채번(true), 수동채번(false)
    const [autoSelf, setAutoSelf] = useState(true);
    // 위동 부킹 send 약관
    const [termCheck, setTermCheck] = useState(false);


    const {userData} = props;
    useEffect(() => {
        if(userData.user_no){
        // 포트목록 조회
        selectLineCodePort();
        // incoterms
        selectLineCodeIncoterms();
        // service code
        selectLineCodeServiceType();
        let params = {
            line_code: 'WDFC'
        }
        // cargo type
        selectLineCodeCargoType(params);
        // cargo pack type
        selectLineCodeCargoPackType(params);
        // container sztp
        selectLineCodeCntrSztp(params);

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
        }
        return () => {
        
        };
    }, [props.userData]);

    useEffect(()=>{
        setOpenSchedule(allOpen);
        setOpenShipper(allOpen);
        setOpenForwarder(allOpen);
        setOpenLine(allOpen);
        setOpenCargo(allOpen);
        setOpenTransport(allOpen);
        setOpenDocument(allOpen);
        setOpenBooking(allOpen);
        setOpenContainer(allOpen);
        setOpenConsignee(allOpen);
    },[allOpen]);

    useEffect(()=>{
        console.log("PRAMETER ", parameter)
        if( parameter.bkg_no && user && userData.user_no ) {
            // Dash 보드 및 일반 파라미터에서 넘어온 경우
            selectBookingParams();
        } else {
            if( user && userData.user_no ) {
                if( "Y" === parameter.schedule_yn || "Y" === parameter.new_yn ) {
                    
                    // 스케줄에서 넘어온 경우
                    insertBooking();
                }
            }
        }
    },[parameter, userData]);

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
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
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
                if( 'DOCUMENT' === element.reference_type ) {
                    obj.document_bookmark_name = element.bookmark_name;
                    obj.document_bookmark_seq = element.reference_seq;

                    // Transport Bookmark 상세내용
                    let row = documentBookmarkList.find( function( item ) {
                        return item.document_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
                    } else {
                        obj.document_bookmark_seq = null;
                        obj.document_bookmark_name = null;
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
                if( 'CARGO' === element.reference_type ) {
                    obj.cargo_bookmark_name = element.bookmark_name;
                    obj.cargo_bookmark_seq = element.reference_seq;
                    // obj.cargo_selected_yn = 'Y'
                    // Cargo Bookmark 상세내용
                    let row = cargoBookmarkList.find( function( item ) {
                        return item.cargo_bookmark_seq == element.reference_seq;
                    });
                    // console.log(e.label);
                    if( row ) {
                        obj = Object.assign(obj, row);
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
                        obj = Object.assign(obj, row);
                    }
                    // Container Bookmark 있음
                    isContainer = true;
                }
            });

            // 없는 Bookmark 들 정리
            // if( !isBooking ) {
            //     obj.other_bookmark_name = null;
            //     obj.other_bookmark_seq = null;
            //     obj.other_bookmark_seq = null;
            //     obj.other_bookmark_name = null;
            //     obj.sc_no = null;
            //     obj.remark1 = null;
            //     obj.remark2 = null;
            //     obj.trans_service_code = null;
            // }
            // if( !isSchedule ) {
            //     obj.schedule_bookmark_seq = null;
            //     obj.schedule_bookmark_name = null;
            //     obj.sch_vessel_name = null;
            //     obj.sch_vessel_code = null;
            //     obj.sch_pol = null;
            //     obj.sch_pol_name = null;
            //     obj.sch_pod = null;
            //     obj.sch_pod_name = null;
            //     obj.sch_por = null;
            //     obj.sch_por_name = null;
            //     obj.sch_pld = null;
            //     obj.sch_pld_name = null;
            //     obj.sch_etd = null;
            //     obj.sch_eta = null;
            //     obj.sch_fdp = null;
            //     obj.sch_fdp_name = null;
            // }
            // if( !isCarrier ) {
            //     obj.line_bookmark_seq = null;
            //     obj.line_bookmark_name = null;
            //     obj.line_name1 = null;
            //     obj.line_name2 = null;
            //     obj.line_code = null;
            //     obj.line_user_email = null;
            //     obj.line_user_fax = null;
            //     obj.line_user_name = null;
            //     obj.line_user_tel = null;
            //     obj.line_user_dept = null;
            //     obj.line_address1 = null;
            //     obj.line_address2 = null;
            //     obj.line_address3 = null;
            //     obj.line_address4 = null;
            //     obj.line_address5 = null;
            // }
            // if( !isShipper ) {
            //     obj.shipper_bookmark_seq = null;
            //     obj.shipper_bookmark_name= null;
            //     obj.shp_name1= null;
            //     obj.shp_name2= null;
            //     obj.shp_code= null;
            //     obj.shp_user_name= null;
            //     obj.shp_user_tel= null;
            //     obj.shp_user_email= null;
            //     obj.shp_address1= null;
            //     obj.shp_address2= null;
            //     obj.shp_address3= null;
            //     obj.shp_address4= null;
            //     obj.shp_address5= null;
            //     obj.shp_user_dept= null;
            //     obj.shp_user_fax= null;
            //     obj.shp_payment_type= null;
            // }
            // if( !isConsignee ) {
            //     obj.consignee_bookmark_seq = null;
            //     obj.consignee_bookmark_name = null;
            //     obj.cons_name1 = null;
            //     obj.cons_name2 = null;
            //     obj.cons_code = null;
            //     obj.cons_user_email = null;
            //     obj.cons_user_fax = null;
            //     obj.cons_user_name = null;
            //     obj.cons_user_tel = null;
            //     obj.cons_user_dept = null;
            //     obj.cons_address1 = null;
            //     obj.cons_address2 = null;
            //     obj.cons_address3 = null;
            //     obj.cons_address4 = null;
            //     obj.cons_address5 = null;
            // }
            // if( !isForwarder ) {
            //     obj.forwarder_bookmark_seq = null;
            //     obj.forwarder_bookmark_name = null;
            //     obj.fwd_name1 = null;
            //     obj.fwd_name2 = null;
            //     obj.fwd_code = null;
            //     obj.fwd_user_email = null;
            //     obj.fwd_user_fax = null;
            //     obj.fwd_user_name = null;
            //     obj.fwd_user_tel = null;
            //     obj.fwd_user_dept = null;
            //     obj.fwd_address1 = null;
            //     obj.fwd_address2 = null;
            //     obj.fwd_address3 = null;
            //     obj.fwd_address4 = null;
            //     obj.fwd_address5 = null;
            // }
            // if( !isTransport ) {
            //     obj.transport_bookmark_seq = null;
            //     obj.transport_bookmark_name = null;
            //     obj.trans_name1 = null;
            //     obj.trans_name2 = null;
            //     obj.trans_code = null;
            //     obj.trans_self_yn = null;
            //     obj.trans_user_fax = null;
            //     obj.trans_user_name = null;
            //     obj.trans_user_tel = null;
            //     obj.trans_user_email = null;
            //     obj.trans_fac_name = null;
            //     obj.trans_fac_area_name = null;
            //     obj.trans_remark = null;
            // }
            // if( !isCargo ) {
            //     obj.cargo_bookmark_seq = null;
            //     obj.cargo_bookmark_name = null;
            //     obj.cargo_name = null;
            //     obj.cargo_hs_code = null;
            //     obj.cargo_pack_qty = null;
            //     obj.cargo_pack_type = null;
            //     obj.cargo_pack_type_name = null;
            //     obj.cargo_remark = null;
            //     obj.cargo_total_volume = null;
            //     obj.cargo_total_weight = null;
            //     obj.cargo_type = null;
            //     obj.cargo_type_name = null;
            //     obj.cargo_weight = null;
            // }
            // if( !isContainer ) {
            //     obj.container_bookmark_seq = null;
            //     obj.container_bookmark_name = null;
            // }

            let merge = Object.assign(booking, obj);
            // console.log("merge : ",merge)
            setBooking({...merge});
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
            line_code: 'WDFC'
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
        ,{ line_code:'WDFC' }
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
            line_code:'WDFC'
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
  // Cargo Bookmark 조회
  const selectBookingCargoBookmark = () => {
      axios.post(
          "/shipper/selectBookingCargoBookmark"
          ,{ user_no: userData.user_no?userData.user_no:null,
             line_code: 'WDFC' }
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
        line_code: 'WDFC' }
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
            if( 0 < result.length ) {
                setBooking(result[0]);
                selectCargoOfBooking(result[0]);
                // container 목록
                selectContainerOfBooking(result[0]);
            } else {
                setBooking({});
            }
        }   
    );
  }

  // CargoOfBooking
  const selectCargoOfBooking = ( booking ) => {
    axios.post(
        "/shipper/selectCargoOfBooking"
        ,{ 
          //user_no: user?userData.user_no:null,
          booking
        }
        ,{}
    ).then(
        res => {
            setCargo(res.data[0]);
            selectCargoGoodsOfBooking(res.data[0]);
        }
    );
  }

  // CargoOfBooking
  const selectCargoGoodsOfBooking = (booking) => {
    axios.post(
        "/shipper/selectCargoGoodsOfBooking"
        ,{ 
          // user_no: user?userData.user_no:null,
          booking
        }
        ,{}
    ).then(
        res => {
            setGoodsRelationList(res.data);
        }
    );
  }

  // Container Booking 정보 조회
  const selectContainerOfBooking=(booking)=>{
    axios.post(
        "/shipper/selectContainerOfBooking"
        ,{ 
          // user_no: user?userData.user_no:null,
          booking
        }
        ,{}
    ).then(
        res => {
            setContainerList(res.data);
        }
    );
}

  const fncOnChange =(e)=>{
    let key = e.target.id;
    let value = e.target.value.toUpperCase();
    booking[key] = value;
    // Object.assign(booking,{[key]:value.toUpperCase()});
    setBooking({...booking});
  }
  const fncOnBlur =(params)=>{
    let merge = Object.assign(booking, params);
    console.log(merge.trans_self_yn)
    setBooking({...merge});
  }
  const fncOnBlurCargo =(cargoParams)=> {
    let merge = Object.assign(cargo, cargoParams);
    setCargo(merge);
  }
  const fncOnBlurGoods =(goods)=> {
    setGoodsRelationList( goods );
  }
  const fncOnBlurContainer =(containerList) => {
    setContainerList(containerList);
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
      console.log("USER", userData);
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
                booking,
                params:{
                    ...parameter,
                    user_no: parameter.user_no,
                    bkg_no: null,
                    bkg_date: parameter.bkg_date,
                    line_code: 'WDFC',
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
                console.log('data :', data)
                let obj = Object.assign(parameter, data, {'schedule_yn':'N','new_yn':'N'});
                console.log('obj :', obj)
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

        if( !booking.bkg_no ) return false;
        if( !user ) {
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
                booking ,
                containerList,
                containerSpecialList,
                cargo,
                goodsRelationList,
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
                const data = error.response.data;
                console.log(data);
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
        obj.bookmark_seq = e.value
        setBooking({...booking, ['bookmark_seq']:e.value, ['bookmark_name']:e.label})
        setBookmarkSeq(obj);
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
        if( containerList.length ===0 ) {
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
        // if( !userData.bkg_recipient ) {
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
            if( !('NO' === booking.status_cus || 'S0' === booking.status_cus || 'EC' === booking.status_cus) ) {
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
            if( !('RA' === booking.status_cus) ) {
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


        if( !booking.bkg_no ) return false;
        setAllOpen(false);
        let statusName = (status==='CANCEL')?'CANCEL':'SEND';
        // booking의 document 정보와 다르면 Confirm 메세지 
        // let title = "["+booking.bkg_no+"]" ;
        let message = "["+ booking.bkg_no+"] Booking 을(를) "+statusName+" 하시겠습니까?";
        let title = "CHECK_TERM_WDFC";



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
                console.log(booking)
                axios.post(
                    "/shipper/updateAllBooking"
                    ,{
                        user_no: userData.user_no?userData.user_no:null,
                        booking ,
                        containerList,
                        containerSpecialList,
                        cargo,
                        goodsRelationList,
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
                        axios.post(
                            "/shipper/sendBooking"
                            ,{
                            user_no : userData.user_no?userData.user_no:null,
                            klnet_id: userData.klnet_id,
                            status : status,
                            booking,
                            cargo,
                            containerList,
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
                                console.log(data)
                                let message = null;
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
                    booking
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
    
    const fncCheckConfirm =( chk ) => {
        const checkbox = document.getElementById("CONFIRM_CHECK_BOX");
        console.log(checkbox);
        if( checkbox ) {
            if( document.getElementById("CONFIRM_CHECK_BOX").checked ) {
                document.getElementById("CONFIRM_CHECK_BOX").checked = false;
            } else {
                document.getElementById("CONFIRM_CHECK_BOX").checked = true;
            }
        }
    }
    const fncBookingTerms =(statusName)=>{
        
        return(
            <GridContainer>
                <GridItem xs={12} sm={12}>
                    <h4 className="mt-1 text-center">
                        {"["+ booking.bkg_no+"] Booking 을(를) "+statusName+" 하시겠습니까?"}
                    </h4>
                </GridItem>
                {/* <GridContainer> */}
                    <GridItem xl={1} lg={1} md={1} sm={1} className="ml-2 mr-0 pr-0 text-center">
                        <Checkbox 
                            // checked={false}
                            // onChange={(event)=>fncCheckConfirm(event.target.value)} 
                            id="CONFIRM_CHECK_BOX"
                            inputProps={{'aria-label':'secondary checkbox'}}>
                        </Checkbox>
                        {/* <Input type="checkbox"/> */}
                        {/* <input type="checkbox" 
                        name="CONFIRM_CHECK_BOX" id="CONFIRM_CHECK_BOX" ></input> */}
                        </GridItem>
                    <GridItem xl={9} lg={9} md={9} sm={9} className="mt-2 mr-0 pr-0 text-center">
                        <h3 >
                            위동 해운 화물 운송 동의 합니다.(필수)
                        </h3>
                    </GridItem>
                    <GridItem xl={1} lg={1} md={1} sm={1} className="ml-0 mr-0 pr-0 text-center">
                        <IconButton onClick={()=>{
                            let form = document.termsForm;
                            form.action = 'https://cargo.weidong.com/content/view.do';
                            form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
                            window.open('', 'popReport', 'width=1050px, height=850px');
                            form.submit();

                        }}>
                        <OpenInNew 
                            fontSize={'large'} />
                        </IconButton>
                        </GridItem>
          
                    {/* </GridContainer> */}
                        {/* <UncontrolledTooltip delay={0} target="lineview">위동 해운 약관 상세 바로가기</UncontrolledTooltip> */}
            </GridContainer>
        )
    }


    const fncReportViewer=()=> {

        if( !(booking.user_no && booking.bkg_date && booking.bkg_no ) ) {
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
        obj.user_no = booking.user_no;
        obj.bkg_date = booking.bkg_date;
        obj.bkg_no = booking.bkg_no;
        var json = JSON.stringify(obj);

        let form = document.reportForm;
        form.action = '/reportViewer';
        form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
        form.file_id.value = 'SEAWAYBILL';
        form.file_path.value = 'WEIDONG';
        form.name.value = 'FILENAME';
        form.connection.value = 'pgsql';
        form.parameters.value = json;
        window.open('', 'popReport', 'width=1050px, height=850px');
        form.submit();
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
                                        line_code: 'WDFC',
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
                                    })}>NEW</Button>
                    <Button color="info" onClick={(e)=>{fncReportViewer(e)}}>REPORT</Button>
                    <Button color="info" onClick={(e)=>updateAllBooking()}>SAVE</Button>
                    <Button color="info" onClick={(e)=>sendBooking('SEND')}>SEND</Button>
                </GridItem>
                <HeaderCard
                    booking={booking}
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
        <BookingCard
            booking={booking}
            otherBookmarkList={otherBookmarkList}
            serviceLineCodeList={serviceLineCodeList}
            incotermsLineCodeList={incotermsLineCodeList}
            fncOnBlur={fncOnBlur}
            openBooking={openBooking}
            fncSetOpenBooking={fncSetOpenBooking}
            selectBookingOtherBookmark={selectBookingOtherBookmark}
            {...props}
        />
        <ScheduleCard
            booking={booking}
            scheduleBookmarkList={scheduleBookmarkList}
            portCodeList={portCodeList}
            fncOnBlur={fncOnBlur}
            openSchedule={openSchedule}
            fncSetOpenSchedule={fncSetOpenSchedule}
            selectBookingScheduleBookmark={selectBookingScheduleBookmark}
            {...props}
        />
        <ShipperCard
            booking={booking}
            shipperBookmarkList={shipperBookmarkList}
            fncOnBlur={fncOnBlur}
            openShipper={openShipper}
            fncSetOpenShipper={fncSetOpenShipper}
            selectBookingShipperBookmark={selectBookingShipperBookmark}
            {...props}
        />
        <CarrierCard
            booking={booking}
            lineBookmarkList={lineBookmarkList}
            fncOnBlur={fncOnBlur}
            openLine={openLine}
            fncSetOpenLine={fncSetOpenLine}
            selectBookingLineBookmark={selectBookingLineBookmark}
            {...props}
        />
        <ConsigneeCard
            booking={booking}
            consigneeBookmarkList={consigneeBookmarkList}
            openConsignee={openConsignee}
            fncOnBlur={fncOnBlur}
            fncSetOpenConsignee={fncSetOpenConsignee}
            selectBookingConsigneeBookmark={selectBookingConsigneeBookmark}
            {...props}
        />
        <ForwarderCard
            booking={booking}
            forwarderBookmarkList={forwarderBookmarkList}
            openForwarder={openForwarder}
            fncOnBlur={fncOnBlur}
            fncSetOpenForwarder={fncSetOpenForwarder}
            selectBookingForwarderBookmark={selectBookingForwarderBookmark}
            {...props}
        />
        <TransportCard
            booking={booking}
            transportBookmarkList={transportBookmarkList}
            openTransport={openTransport}
            fncOnBlur={fncOnBlur}
            fncSetOpenTransport={fncSetOpenTransport}
            selectBookingTransportBookmark={selectBookingTransportBookmark}
            {...props}
        />
        <DocumentCard
            booking={booking}
            documentBookmarkList={documentBookmarkList}
            openDocument={openDocument}
            fncOnBlur={fncOnBlur}
            fncSetOpenDocument={fncSetOpenDocument}
            selectBookingDocumentBookmark={selectBookingDocumentBookmark}
            {...props}
        />
        <CargoCard
            booking={booking}
            cargo={cargo}
            goodsRelationList={goodsRelationList}
            cargoBookmarkList={cargoBookmarkList}
            goodsBookmarkList={goodsBookmarkList}
            cargoTypeList={cargoTypeList}
            cargoPackTypeLineCodeList={cargoPackTypeLineCodeList}
            openCargo={openCargo}
            fncOnBlurCargo={fncOnBlurCargo}
            fncSetOpenCargo={fncSetOpenCargo}
            fncOnBlurGoods={fncOnBlurGoods}
            selectBookingCargoBookmark={selectBookingCargoBookmark}
            selectBookingCargoGoodsBookmark={selectBookingCargoGoodsBookmark}
            {...props}
        />
        <ContainerCard
            booking={booking}
            containerList={containerList}
            containerSpecialList={containerSpecialList}
            openContainer={openContainer}
            containerBookmarkList={containerBookmarkList}
            specialBookmarkList={specialBookmarkList}
            cntrCodeLineCodeList={cntrCodeLineCodeList}
            fncOnBlurContainer={fncOnBlurContainer}
            fncOnBlurDoor={fncOnBlurDoor}
            fncSetOpenContainer={fncSetOpenContainer}
            selectBookingContainerBookmark={selectBookingContainerBookmark}
            {...props}
        />
        </div>
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
}
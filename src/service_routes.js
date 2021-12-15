import DashPage     from "views/Dashboard/Dashboard.js";//

import SR_ORG       from 'views/Booking/SR/Request/common/Request.js';//userData
import SR_WDFC      from 'views/Booking/SR/Request/wdfc/Request.js';//userData
import BookingList  from 'views/Booking/BKG/List/BookingList.js';//
import BookingWdfc  from 'views/Booking/BKG/wdfc/BookingWDFC.js';//userData
import Booking      from 'views/Booking/BKG/common/BookingCommon.js';// component
import ConfirmList  from 'views/Booking/Confirm/List/ConfirmList.js';//co
import Confirm_wdfc from 'views/Booking/Confirm/Detail/wdfc/Confirm.js';//userData
import Confirm_org  from 'views/Booking/Confirm/Detail/common/Confirm.js';//userData
import SRList       from 'views/Booking/SR/List/SRList.js';//co
import BLList       from 'views/Booking/bl/list/BLList.js';//co
import Bl           from 'views/Booking/bl/wdfc/Bl.js';//userData
import BookingDashBoard from 'views/Booking/DashBoard.js';//
import Apipage        from 'views/Customs/ScrollTapPage';//co

import FclPage      from "views/Schedule/FclScheduleList.js";//co
import CalPage      from "views/Schedule/TerminalScheduleList.js";//co
import OceanFreight from "views/Schedule/OceanFreightSearch.js";//

import TrackingPage      from 'views/Tracking/TrackingList.js';//com
import ContainerTracking from 'views/Tracking/TrackingMap/Map.js';//

import ImportDemDetPage from 'views/DemDet/Import/importDemDetList.js';//
import ExportDemDetPage from 'views/DemDet/Export/exportDemDetList.js';//
import DemDetMapPage    from 'views/DemDet/Map/DemDetMap.js';//

import MainUploadBL from "views/BLUpload/UploadPage";//compo
import HblUpload    from 'views/BLUpload/HBLUpload.js'// compo 

import ProfilePage from "views/Member/UserProfile.js";//
import SettingPage from "views/Member/UserServiceSetting.js";//

import TestMap from "views/TestPage/TestMap";//
import BoardPage from "views/Board/BoardPage.js";//없음
import IMOList from "views/Ship/ImoList.js";//
import ImoSearch from "views/Ship/ImoList";


// import TransportMonitoringShipper from 'views/InlandTransportMonitoring/TransportMonitoringShipper.js';
// import TransportMonitoringAll from 'views/InlandTransportMonitoring/TransportMonitoringAll.js';
import InlandDrive from 'views/InlandTransportMonitoring/InlandDriveList.js';
// @material-ui/icons
//import Apps from "@material-ui/icons/Apps";
//import DashboardIcon from "@material-ui/icons/Dashboard";
//import DateRange from "@material-ui/icons/DateRange";
//import GridOn from "@material-ui/icons/GridOn";
//import Image from "@material-ui/icons/Image";
//import Place from "@material-ui/icons/Place";
//import Timeline from "@material-ui/icons/Timeline";
//import WidgetsIcon from "@material-ui/icons/Widgets";

// @material-ui/icons
//import DirectionsBoat from  "@material-ui/icons/DirectionsBoat";
//import ScrapIcon from '@material-ui/icons/Description';
//import MapIcon from "@material-ui/icons/Map";
//import BackupIcon from "@material-ui/icons/Backup";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import EventAvailable from "@material-ui/icons/EventAvailable";
import Schedule from "@material-ui/icons/Schedule";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import ViewList from "@material-ui/icons/ViewList"
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import InsertChartOutlinedOutlinedIcon  from '@material-ui/icons/InsertChartOutlinedOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import PostAddIcon from '@material-ui/icons/NoteAdd';
import {CollectionsBookmark,Adjust, Ballot, AttachMoney} from '@material-ui/icons'
//import LocalShippingOutlined from '@material-ui/icons/LocalShippingOutlined'

var ServiceRoutes = [
  {
    collapse: true,
    name: "스케줄",
    rtlName: "SCHEDULE",
    icon: Schedule,
    state: "componentsCollapse",
    mainShow:true,
    sideShow:true,
    views: [
      {
        path: "/fcl",
        name: "해상 운송 스케줄",
        rtlName: "FCL SEA SCHEDULE",
        mini: "FS",
        rtlMini: "FS",
        component: FclPage,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/cal",
        name: "국내 터미널 스케줄",
        rtlName: "TERMINAL SCHEDULE",
        mini: "TS",
        rtlMini: "TS",
        component: CalPage,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/ofs",
        name: "OCEAN FREIGHT",
        rtlName: "해상 운임 조회",
        icon: AttachMoney,
        component: OceanFreight,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
    ]
  },
  {
    collapse: true,
    name: "수출 운송",
    rtlName: "BOOKING",
    icon: Adjust,
    state: "bookCollapse",
    mainShow:true,
    sideShow:true,
    views: [
      {
        path: "/bkdash",
        name:"부킹 - 대시보드",
        rtlname: "BOOKING DASHBOARD",
        mini: "BK",
        rtlMini: "BK",
        icon: InsertChartOutlinedOutlinedIcon, 
        component: BookingDashBoard,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
        option:'en',
      },
      {
        path: "/bookinglist",
        name: "부킹 관리",
        rtlname: "BOOKING",
        mini: "BKGL",
        rtlMini: "BKG",
        icon: ViewList, 
        component: BookingList,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
        option:'en',
      },
      {
        path: "/bookingWdfc",
        name: "WDFC",
        mini: "BKG",
        rtlMini: "BKG",
        icon: ViewList, 
        component: BookingWdfc,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
        path: "/booking",
        name: "Booking",
        mini: "BKG",
        rtlMini: "BKG",
        icon: ViewList, 
        component: Booking,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      
      {
        path: "/confirmlist",
        name: "CONFIRM",
        rtlname : "CONFIRM",
        mini: "CFM",
        rtlMini: "CFM",
        icon: ViewList, 
        component: ConfirmList,
        layout: "/svc",
        mainShow:false,
        sideShow:true,
        option:'en',
      },
      {
        path: "/confirm_wdfc",
        name: "CONFIRM",
        mini: "CFM",
        rtlMini: "CFM",
        icon: ViewList, 
        component: Confirm_wdfc,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
          path: "/confirm",
          name: "CONFIRM",
          mini: "CFM",
          rtlMini: "CFM",
          icon: ViewList, 
          component: Confirm_org,
          layout: "/svc",
          mainShow:false,
          sideShow:false,
        },
      {
        path: "/srlist",
        name: "SR 관리",
        rtlname : "SR",
        mini: "SRL",
        rtlMini: "SR",
        icon: CollectionsBookmark, 
        component: SRList,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
        option:'en',
      },
      {
        path: "/bllist",
        name: "BL",
        rtlname : "BL",
        mini: "BLL",
        rtlMini: "BLL",
        icon: ViewList, 
        component: BLList,
        layout: "/svc",
        mainShow:false,
        sideShow:true,
        option:'en',
      },
      {
        path: "/bl",
        name: "BL",
        mini: "BL",
        rtlMini: "BL",
        icon: ViewList, 
        component: Bl,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
        path: "/srWdfc",
        name: "WEIDONG SR",
        mini: "SR",
        rtlMini: "SR",
        icon: ViewList, 
        component: SR_WDFC,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
          path: "/sr",
          name: "SR",
          mini: "SR",
          rtlMini: "SR",
          icon: ViewList, 
          component: SR_ORG,
          layout: "/svc",
          mainShow:false,
          sideShow:false,
        },
    ]
  },
  {
    collapse: true,
    name: "화물 추적",
    rtlName: "LOCATION",
    icon: LocationOn,
    state: "pageCollapse",
    mainShow:true,
    sideShow:true,
    views: [
      {
        path: "/tracking",
        name: "글로벌 화물 추적",
        rtlName: "TRACKING SERVICE",
        mini: "TK",
        rtlMini: "TK",
        component: TrackingPage,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/flightinfo",
        name:"선박 위치 조회",
        rtlname: "SHIP FLIGHT INFO",
        mini: "SF",
        rtlMini: "SF",
        icon: DirectionsBoatIcon, 
        component: TestMap,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/InlandDrive",
        name:"내륙운송모니터링",
        rtlname: "InlandDrive",
        mini: "ID",
        rtlMini: "ID",
        component: InlandDrive,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/unipassapi",
        name: "관세청 수입화물진행정보",
        rtlname: "UNIPASS API SERVICE",
        mini: 'API',
        rtlMini:"API",
        icon: AccountBalance,
        component: Apipage,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/uploadbl",
        name: "화물추적대상 등록",
        rtlName: "BL Upload",
        icon: CloudUploadOutlined,
        component: MainUploadBL,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
      {
        path: "/hblupload",
        name: "H-BL Upload",
        rtlName: "User HBL Upload",
        icon: PostAddIcon,
        component: HblUpload,
        layout: "/svc",
        mainShow:false,
        sideShow:true,
      },
      {
        path: "/cntrmap",
        name: "VIEW CONTAINER MOVEMENT",
        mini: "CM",
        rtlMini: "CM",
        icon: DirectionsBoatIcon, 
        component: ContainerTracking,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
        path: "/imosearch",
        name: "IMO SEARCH",
        mini: "IMO",
        rtlMini: "IMO",
        component: IMOList,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
    ]
  },
  {
    collapse: true,
    name: "PLISM 3.0",
    rtlName: "PLISM 3.0",
    mainShow:true,
    sideShow:false,
    views: [
      // {
      //   path: "/board",
      //   name: "공지사항",
      //   rtlName: "Notice Board",
      //   icon: ViewList, 
      //   component: BoardPage,
      //   layout: "/svc",
      //   mainShow:true,
      //   sideShow:true,
      // },
    ]
  },
  {
    collapse: true,
    name: "커뮤니티",
    rtlName: "COMMUNITY",
    icon: Ballot,
    state: "communityCollapse",
    mainShow:true,
    sideShow:true,
    views: [
      {
        path: "/board",
        name: "공지사항",
        rtlName: "Notice Board",
        icon: ViewList, 
        component: BoardPage,
        layout: "/svc",
        mainShow:true,
        sideShow:true,
      },
    ]
  },  
   
  
  // {
  //   collapse: true,
  //   name: "CUSTOMS",
  //   rtlName: "Customs",
  //   icon: AccountBalance,
  //   state: "customsCollapse",
  //   mainShow:false,
  //   sideShow:false,
  //   views: [
  //     {
  //       path: "/unipassapi",
  //       name: "UNIPASS API SERVICE",
  //       rtlName: "UAS",
  //       mini: 'API',
  //       component: Apipage,
  //       layout: "/svc",
  //       mainShow:true,
  //       sideShow:true,
  //     }
  //   ]
  // },
  
  
  
  
  {
    path: "/dashboard",
    name: "DASHBOARD",
    rtlName: "TOTAL CARGO INFO",
    icon: InsertChartOutlinedOutlinedIcon,
    component: DashPage,
    layout: "/svc",
    mainShow:false,
    sideShow:false,
  },
  {
    collapse: true,
    name: "UPLOAD",
    rtlName: "UPLOAD",
    icon: CloudUploadOutlined,
    state: "uploadCollapse",
    mainShow:false,
    sideShow:false,
    views: [
      // {
      //   path: "/uploadbl",
      //   name: "BL Upload",
      //   rtlName: "User BL Upload",
      //   icon: CloudUploadOutlined,
      //   component: MainUploadBL,
      //   layout: "/svc",
      //   mainShow:true,
      //   sideShow:true,
      // },
      // {
      //   path: "/hblupload",
      //   name: "H-BL Upload",
      //   rtlName: "User HBL Upload",
      //   icon: PostAddIcon,
      //   component: HblUpload,
      //   layout: "/svc",
      //   mainShow:false,
      //   sideShow:false,
      // },
    ]
  },
  
  
  {
    collapse: true,
    name: "DEM/DET/OSC",
    rtlName: "보관기한정보",
    icon: EventAvailable,
    state: "demdetCollapse",
    mainShow:false,
    sideShow:false,
    views: [
      {
        path: "/demDet/Import",
        name: "IMPORT DEM/DET/OSC",
        rtlName: "수입DEM/DET",
        mini: "ID",
        rtlMini: "ID",
        component: ImportDemDetPage,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
        path: "/demDet/Export",
        name: "EXPORT DEM/DET/OSC",
        rtlName: "수출DEM/DET",
        mini: "ED",
        rtlMini: "ED",
        component: ExportDemDetPage,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },
      {
        path: "/mapService",
        name: "DEM&DET SUMMARY",
        rtlName: "MAP",
        mini: "MP",
        rtlMini: "MP",
        component: DemDetMapPage,
        layout: "/svc",
        mainShow:false,
        sideShow:false,
      },

    ]
  },  
  
  
  // {
  //   collapse: true,
  //   name: "내륙운송모니터링",
  //   rtlName: "inland transportation monitoring",
  //   icon: LocalShippingOutlined,
  //   state: "inlandCollapse",
  //   views: [
  //     {
  //         path: "/TransportMonitoringShipper",
  //         name: "개별 실화주",
  //         rtlName: "ITM",
  //         mini: 'ITM',
  //         component: TransportMonitoringShipper,
  //         layout: "/svc"   
  //     },
  //     {
  //       path: "/TransportMonitoringAll",
  //       name: "전체 실화주",
  //       rtlName: "ALL",
  //       mini: 'ALL',
  //       component: TransportMonitoringAll,
  //       layout: "/svc"   
  //     }
  //   ]
  // },
  {
    path: "/profile",
    name: "Profile Page",
    rtlName: "사용자정보",
    icon: Person,
    component: ProfilePage,
    layout: "/svc",
    mainShow:false,
    sideShow:false,
  },
  {
    path: "/setting",
    name: "Setting Page",
    rtlName: "설정",
    icon: Person,
    component: SettingPage,
    layout: "/svc",
    mainShow:false,
    sideShow:false,
  },
 
];
export default ServiceRoutes;

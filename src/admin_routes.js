import ImportPage from 'views/TestPage/ImportPage.js';//
import BoardDataPage from 'views/TestPage/BoardData.js';//
import DemDetOscPage from 'views/TestPage/DemDetOsc.js';
import ThreadManage from 'views/TestPage/ThreadManage.js';
//import RegularForms from "views/Forms/RegularForms.js";
import SampleData from "views/TestPage/SamplePage.js";//
//import SampleData2 from "views/TestPage/SamplePage2.js";
//import SchedulePage from "views/TestPage/SampleSchedulePage.js";
//import ScrapSchedule from "views/TestPage/SamplePage.js";
import ScrapManage from "views/TestPage/ScrapManage.js";//
import ScrapResult from "views/TestPage/ScrapResult.js";//
import Address from 'views/TestPage/Address.js'
import ScrapPort from "views/TestPage/ScrapPort.js";//
import SchPortCode from "views/TestPage/SchPortCodeList";//
import ExcelSchLog from "views/TestPage/ExcelSchLogPage.js";
import ErrorLogPage from 'views/TestPage/ErrorLogList.js';
import UserList from 'views/TestPage/UserList.js';//
//import CompanyList from 'views/TestPage/Company/CompanyList.js';
import UserRequest from 'views/TestPage/UserRequest.js';//
import UserUiSetting from 'views/TestPage/UserUiSettingList.js';//
import TSCode from "views/TestPage/TSCodeList";
import PicCode from "views/TestPage/PicCodeList";//
import SendPush from 'views/TestPage/SendPush';//
import TrackingEventCode from 'views/TestPage/TrackingEventCode';//
import TerminalInfo from 'views/TestPage/TerminalInfo.js';//
import LineCode from 'views/TestPage/LineCode.js';//
import VslType from 'views/TestPage/VesselType.js';//
import VslInfo from 'views/TestPage/VesselInfo.js';//
import EDIReceive from 'views/TestPage/EDI/EdiReceive.js';//
import EDISend from 'views/TestPage/EDI/EDISend.js';//
import LineComapny from 'views/TestPage/LineCompany';//
import BookingHistory from 'views/TestPage/History/HistoryBKList.js';
import SRHistory from 'views/TestPage/History/HistorySRList.js';
import ChangeSessionPage from 'views/Login/ChangeSessionPage.js';
// @material-ui/icons
//import Apps from "@material-ui/icons/Apps";
//import DashboardIcon from "@material-ui/icons/Dashboard";
//import DateRange from "@material-ui/icons/DateRange";
//import GridOn from "@material-ui/icons/GridOn";
//import Image from "@material-ui/icons/Image";
//import Place from "@material-ui/icons/Place";
//import Timeline from "@material-ui/icons/Timeline";
//import WidgetsIcon from "@material-ui/icons/Widgets";
//import Person from "@material-ui/icons/Person";
import LinkedCameraOutlinedIcon from '@material-ui/icons/LinkedCameraOutlined';
import DvrOutlined from '@material-ui/icons/DvrOutlined';
import CodeOutlined from '@material-ui/icons/CodeOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
//import BusinessIcon from '@material-ui/icons/Business';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ScrapIcon from '@material-ui/icons/Description';
//import TerminalIcon from "@material-ui/icons/LocalShippingOutlined";
import HistoryIcon from '@material-ui/icons/History';
import FaceIcon from '@material-ui/icons/Face';

var dashRoutes = [
  {
    collapse: true,
    name: "EXCEL SCH",
    rtlName: "EXCEL SCH",
    icon: ScrapIcon,
    state: "ExcelCollapse",
    // layout: "/admin"
    views: [
       {
    			path: "/importdata",
    			name: "EXCEL DATA IMPORT",
    			rtlName: "게시판",
    			mini: "ID",
    			rtlMini: "ID",
    			component: ImportPage,
    			layout: "/admin"
    		  },
      {
      path: "/schedule",
      name: "EXCEL SCH ROW DATA",
      rtlName: "EXCEL SCH ROW DATA",
      mini: "ES",
      rtlMini: "ES",
      component: SampleData,
      layout: "/admin"
      },
      {
        path: "/portcode",
        name: "EXCEL SCH PORT CODE",
        rtlName: "항구코드",
        mini: "PT",
        rtlMini: "PT",
        component: SchPortCode,
        layout: "/admin"
      },
      {
          path: "/tscode",
          name: "T/S CODE",
          rtlName: "T/S코드",
          mini: "TS",
          rtlMini: "TS",
          component: TSCode,
          layout: "/admin"
        },
        {
            path: "/piccode",
            name: "PIC CODE",
            rtlName: "PIC코드",
            mini: "PIC",
            rtlMini: "PIC",
            component: PicCode,
            layout: "/admin"
          },
     
    ]
  },
  {
    collapse: true,
    name: "WEB SCRAPING",
    rtlName: "Web Scraping",
    icon: LinkedCameraOutlinedIcon,
    state: "ScrapingCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/lineManage",
        name: "LINE SCRAP MANAGE",
        rtlName: "선사별 스크랩 설정",
        mini: "LM",
        rtlMini: "LM",
       // component: Buttons,
        component: ScrapManage,
        layout: "/admin"
      },
      {
        path: "/lineScrap",
        name: "LINE SCRAP",
        rtlName: "선사별 스크랩 조회",
        mini: "LS",
        rtlMini: "LS",
        component: ScrapResult,
        layout: "/admin"
      },
      {
        path: "/linePort",
        name: "LINE PORT",
        rtlName: "선사별 스크랩 PORT",
        mini: "LP",
        rtlMini: "LP",
        component: ScrapPort,
        layout: "/admin"
      },
      {
        path: "/address",
        name: "행안부 도로명주소API",
        rtlName: "행안부 도로명주소API",
        mini: "LP",
        rtlMini: "LP",
        component: Address,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "MONITORING",
    rtlName: "Monitoring",
    icon:DvrOutlined,
    state: "MonitoringCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/excelSchLog",
        name: "EXCEL SCH LOG",
        rtlName: "Excel Sch Log",
        mini: "ES",
        rtlMini: "ES",
        component: ExcelSchLog,
        layout: "/admin"
      },
      {
        path: "/errorlog",
        name: "ERROR LOG PAGE",
        rtlName: "Error log page",
        component:ErrorLogPage,
        mini: "EL",
        rtlMini: "EL",
        layout: "/admin"
      },
      {
        path: "/own_thread_manage",
        name: "OWN THREAD MANAGE",
        rtlName: "ThreadManage",
        component:ThreadManage,
        mini: "OT",
        rtlMini: "OT",
        layout: "/admin"
      },


      
    ]
  },
  {
    collapse: true,
    name: "CODE",
    rtlName: "Code",
    icon:CodeOutlined,
    // layout: "/admin"
    state: "CodeCollapse",
    views: [
      {
        path: "/codeline",
        name: "LINE CODE",
        rtlName: "line Code",
        mini: "LC",
        rtlMini: "LC",
        component: LineCode,
        layout: "/admin"
      },
      {
        path: "/terminal",
        name: "Terminal Info",
        rtlName: "Terminal info",
        mini: "TI",
        rtlMini: "TI",
        component: TerminalInfo,
        layout: "/admin"
      },
      {
        path: "/vslinfo",
        name: "VESSEL CODE",
        rtlName: "Vessel Code",
        mini: "VC",
        rtlMini: "VC",
        component: VslInfo,
        layout: "/admin"
      },
      {
        path: "/vsltype",
        name: "VESSEL TYPE CODE",
        rtlName: "Vessel Type Code",
        mini: "VT",
        rtlMini: "VT",
        component: VslType,
        layout: "/admin"
      },
      {
        path: "/eventcode",
        name: "TRACKING EVENT CODE",
        rtlName: "Tracing Event CODE",
        mini: "EC",
        rtlMini: "EC",
        component: TrackingEventCode,
        layout: "/admin"
      },
      {
        path: "/linecompany",
        name: "LINE COMPANY 관리",
        rtlName: "LINE COMPANY 관리",
        mini: "LINE",
        rtlMini: "LINE",
        component: LineComapny,
        layout: "/admin"
      }
    ]
  },  
  {
    collapse: true,
    name: "BUSINESS",
    rtlName: "Business",
    icon:BusinessCenterOutlinedIcon,
    state: "BusinessCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/blList",
        name: "USER BL DATA",
        rtlName: "UserBlData",
        mini: "BL",
        rtlMini: "BL",
        component: UserRequest,
        layout: "/admin"
      },
      {
        path: "/board",
        name: "게시판 관리",
        rtlName:  "게시판 관리",
        mini: "BD",
        rtlMini: "BD",
        component: BoardDataPage,
        layout: "/admin"
      },
      {
        path: "/demdetosc",
        name: "DEM&DET&OSC DATA",
        rtlName: "DEM&DET&OSC Data",
        mini: "DD",
        rtlMini: "DD",
        component: DemDetOscPage,
        layout: "/admin"
      },
        {
          path: "/sample",
          name: "INLAND TRACKING",
          rtlName: "Inland Tracking",
          mini: "IT",
          rtlMini: "IT",
          component: SampleData,
          layout: "/admin"
        },

    ]
  },
  // {
  //   collapse: true,
  //   name: "COMPANY",
  //   rtlName: "COMPANY",
  //   icon:BusinessIcon,
  //   state: "CompanyCollapse",
  //   // layout: "/admin"
  //   views: [
  //     {
  //       path: "/complist",
  //       name: "COMPANY LIST",
  //       rtlName: "Company List",
  //       mini: "CL",
  //       rtlMini: "CL",
  //       component: CompanyList,
  //       layout: "/admin"
  //     },
  //   ]
  // },
  {
    collapse: true,
    name: "User",
    rtlName: "User",
    icon:PeopleOutlined,
    state: "UserCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/userlist",
        name: "USER LIST DATA",
        rtlName: "User List Data",
        mini: "UL",
        rtlMini: "UL",
        component: UserList,
        layout: "/admin"
      },
      {
        path: "/useruisetting",
        name: "USER UI SETTING",
        rtlName: "User Ui Setting",
        mini: "US",
        rtlMini: "US",
        component: UserUiSetting,
        layout: "/admin"
      },
    ]
  },
  {
    path: "/push",
    name: "Push Send",
    rtlName: "푸시 전송",
    icon: AddAlertIcon,
    component: SendPush,
    layout: "/admin"
    },
    {
      collapse: true,
      name: "EDI",
      rtlName: "EDI",
      icon:DvrOutlined,
      state: "EDICollapse",
      // layout: "/admin"
      views: [
        {
          path: "/edir",
          name: "EDI Receive",
          rtlName: "EDI Receive",
          mini: "RCV",
          rtlMini: "RCV",
          component: EDIReceive,
          layout: "/admin"
        },
        {
          path: "/edis",
          name: "EDI Send",
          rtlName: "EDI SEND",
          mini: "SEND",
          rtlMini: "SEND",
          component: EDISend,
          layout: "/admin"
        },
      ]
    },
    {
      collapse: true,
      name: "HISTORY",
      rtlName: "HISTORY",
      icon:HistoryIcon,
      state: "HistoryCollapse",
      // layout: "/admin"
      views: [
        {
          path: "/HistoryBKList",
          name: "BK HISTORY",
          rtlName: "Booking History",
          mini: "BH",
          rtlMini: "BH",
          component: BookingHistory,
          layout: "/admin"
        },
        {
          path: "/historySRList",
          name: "SR HISTORY",
          rtlName: "SR History",
          mini: "SH",
          rtlMini: "SH",
          component: SRHistory,
          layout: "/admin"
        },
    ]
  },
  {
    path: "/changeSession",
    name: "세션 전환",
    rtlName: "Change Session",
    icon: FaceIcon,
    component: ChangeSessionPage,
    layout: "/admin"
  },

  {/*{
    collapse: true,
    name: "MANAGE",
    rtlName: "회원관리",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/manage",
        name: "MANAGE PAGE",
        rtlName: "회원관리",
        mini: "MB",
        rtlMini: "MB",
        component: RegularForms,
        layout: "/admin"
      },
      
    ]
  },  */},
 
];
export default dashRoutes;

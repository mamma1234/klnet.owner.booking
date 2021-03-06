import React,{useState} from "react";
import axios from 'axios';

//page
import ExpImpAffcSbmtInfo from 'views/Customs/ExpImpAffcSbmtInfo.js';
import PostNoPrCstmSgnQry from 'views/Customs/PostNoPrCstmSgnQry.js';
import AlspEntsCdQry from 'views/Customs/AlspEntsCdQry.js';
import RetrieveTrrt from 'views/Customs/RetrieveTrrt.js';
import RetrieveLcaBrkd from 'views/Customs/RetrieveLcaBrkd.js';
import StatsSgnBrkd from 'views/Customs/StatsSgnBrkd.js';
import Ecmqry from 'views/Customs/EcmQry.js'
import PrcsStus from 'views/Customs/ApfmPrcsStusQry.js';
import FlcoBrkd from 'views/Customs/FlcoBrkd';
import BtcoVhcl from 'views/Customs/BtcoVhcl';
import ShipCoLst from 'views/Customs/ShipCoLst';
import ShipCoBrkd from 'views/Customs/ShipCoBrkd';
import CcctLworCd from 'views/Customs/CcctLworCd';
import TrifFxrtInfo from 'views/Customs/TrifFxrtInfo';
import SimlFxamtAplyNaplyEntsQry from 'views/Customs/SimlFxamtAplyNaplyEntsQry';
import SimlXamrttXtrnUser from 'views/Customs/SimlXamrttXtrnUserQry'; 
import ImpCustomsPassInfoPage from "views/Customs/ImpCustomsPassInfo.js";
import ExpCustomsAPIPage from "views/Customs/ExpCustomsAPI.js";
import FlcoLst from 'views/Customs/FlcoLst.js';
import FrwrLst from 'views/Customs/FrwrLst.js';
import FrwrBrkd from 'views/Customs/FrwrBrkd.js';
import OvrsSplrSgn from 'views/Customs/OvrsSplrSgn.js';
import IoprRprtLst from 'views/Customs/IoprRprtLst.js';
import EtprRprtLst from 'views/Customs/EtprRprtLst.js';
import ShedInfo from 'views/Customs/ShedInfo.js';
import CntrQry from 'views/Customs/CntrQry.js';
import PersEcms from 'views/Customs/PersEcms.js';
import DclrCrfnVrfc from 'views/Customs/DclrCrfnVrfc.js';
import ExpFfmnPridShrtTrgtPrlst from 'views/Customs/ExpFfmnPridShrtTrgtPrlst.js';
import XtrnUserReqApreBrkd from 'views/Customs/XtrnUserReqApreBrkd.js';
import SearchHsSgn from 'views/Customs/SearchHsSgn.js';
import CustomTabs from "components/CustomTabs/CustomTabs3.js";
//import Tabs from "@material-ui/core/Tabs";
//import Tab from "@material-ui/core/Tab";
import queryString from 'query-string';

export default function ScrollTapPages(props) {
	
  const query = queryString.parse(window.location.search);
	
  const [severity, setSeverity] = useState("");
  const {store} =props;
  //const classes = useStyless();
  const [cntrList, setCntrList] = useState([]);
  const [cntrCnt, setCntrCnt] = useState('0');
  const [gubunCode, setGubunCode] = useState("A01");
  const [gubun, setGubun] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);

  const [tabvalue,setTabvalue] = React.useState(query.tabvalue?parseInt(query.tabvalue):0);
  
  const [ecm, setEcm] = useState("");

  const handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
      return;
    }
    setAlertOpen(false);
  }
  const AlertMessage = (message,icon) => {
    setErrmessage(message)
    setSeverity(icon)
    setAlertOpen(true);
  }
  const handleGubun = (e) => {
    let selectText = e.target.value;

    setGubun(selectText);
    if(selectText === "???????????? ??????") {
      setGubunCode("A01");
    }else if(selectText ==="?????? ?????? ??????") {
      setGubunCode("A02");
    }else if(selectText ==="?????? ?????? ??????") {
      setGubunCode("A03");
    }else if(selectText ==="?????????????????? ??????") {
      setGubunCode("A04");
    }
  }
  const onSubmit = () => {

	 if(store.token) {
		 
	    axios.post("/com/uniPassApiSimlFxamtQry",{param:ecm}, {headers:{'Authorization':'Bearer '+store.token}}).then(
	      res => {
	        if(res.data.message == "SUCCESS") {
	          setGridData(res.data.infoData.data);
	        }else if (res.data.message == "NO_DATA") {
	          AlertMessage("??????????????? ????????????.","error");
	        }else {
	          AlertMessage(res.data.errMsg,"error")
	        }
	      }
	    ).catch(err => {
            if(err.response.status === 401) {
	        	props.openLogin();
	        }
            });
	 } else {
		props.openLogin();
	 }
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div>

	        <CustomTabs headerColor="info"
				  //handleTapsClick={handleTapsClick}
	        	    tabvalue={tabvalue}
				  	tabs={[
						
					  	{
						tabName: "??????????????????????????????"
						//,tabIcon: (AssignmentOutlinedIcon)
						,tabContent: (<ImpCustomsPassInfoPage {...props}/>)
					   },
					   {
						tabName: "???????????????????????????????????????"
						//,tabIcon: (TodayOutlinedIcon)
						,tabContent: (<ExpCustomsAPIPage {...props}/>)
				       },
				       {
						tabName: "???????????????"
							//,tabIcon: (AssignmentOutlinedIcon)
						,tabContent: (<ShedInfo {...props}/>)
						},
						{
							tabName: "??????????????????"
							//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<StatsSgnBrkd {...props}/>)
					     },
					     {
							tabName: "??????????????????"
								//,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (<Ecmqry  {...props}/>)
						 },
						 {
							tabName: "?????????????????? ????????????"
							//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<PrcsStus  {...props}/>)
						 },
						 {
							tabName: "???????????????"
							//,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (<FlcoBrkd  {...props}/>)
						 },
						 {
									tabName: "??????????????????????????????"
									//,tabIcon: (TodayOutlinedIcon)
									,tabContent: (<BtcoVhcl  {...props}/>)
						 },
						 {
							tabName: "??????????????????"
							//,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (<ShipCoLst  {...props}/>)
						 },
						 {
							tabName: "????????????????????????"
							//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<ShipCoBrkd  {...props}/>)
						 },
						 {
								tabName: "????????????????????? ????????????"
								//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<CcctLworCd  {...props}/>)
						 },
						 {
								tabName: "??????????????????"
								//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<TrifFxrtInfo  {...props}/>)
						  },
						  {
							tabName: "???????????????"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<FlcoLst  {...props}/>)
						   },
						  {
								tabName: "??????????????????????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<FrwrLst  {...props}/>)
						   },
						   {
								tabName: "??????????????????????????????"
											//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<FrwrBrkd   {...props}/>)
						   },
						   {
								tabName: "?????????????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<OvrsSplrSgn   {...props}/>)
						   },
						   {
								tabName: "?????????????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<IoprRprtLst   {...props}/>)
						   },
						   {
							   tabName: "???????????????"
								//,tabIcon: (TodayOutlinedIcon)
								   ,tabContent: (<EtprRprtLst   {...props}/>)
						   },
						   {
								tabName: "???????????? ??????/????????? ????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<SimlFxamtAplyNaplyEntsQry   {...props}/>)
						   },
						   {
								tabName: "???????????? ????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<SimlXamrttXtrnUser   {...props}/>)
						   },
						   {
								tabName: "??????????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<CntrQry   {...props}/>)
						   },
						   {
							tabName: "???????????? ???????????????????????? ??????"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<PersEcms   {...props}/>)
							},
							{
							tabName: "????????????????????????"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<DclrCrfnVrfc   {...props}/>)
							},   
							{
								tabName: "?????????????????? ???????????? ??????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<ExpFfmnPridShrtTrgtPrlst   {...props}/>)
							},   
							{
							tabName: "????????? ???????????? ????????????"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<XtrnUserReqApreBrkd   {...props}/>)
							},
							{
								tabName: "HS????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<SearchHsSgn   {...props}/>)
							},	
							{
								tabName: "???????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<RetrieveLcaBrkd   {...props}/>)
							},
							{
								tabName: "???????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<RetrieveTrrt   {...props}/>)
							},
							{
								tabName: "???????????? ???????????? ??????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<AlspEntsCdQry   {...props}/>)
							},	
							{
								tabName: "?????????????????? ??????????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<ExpImpAffcSbmtInfo   {...props}/>)
							},
							{
								tabName: "??????????????? ???????????? ????????????"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<PostNoPrCstmSgnQry   {...props}/>)
							},
				 ]}>   
			</CustomTabs>
  </div>
  );
}

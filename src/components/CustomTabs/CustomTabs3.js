import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import {Tabs,Tab,} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import styles from "assets/jss/material-dashboard-pro-react/components/customTabsStyle.js";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(styles);

function TabPanel(props) {
	  const { children, value, index, ...other } = props;

	  return (
	    <div
	      role="tabpanel"
	      hidden={value !== index}
	      id={`full-width-tabpanel-${index}`}
	      aria-labelledby={`full-width-tab-${index}`}
	      {...other}
	    >
	      {value === index && (
	        <Box p={3} style={{paddingLeft:'0',paddingRight:'0',paddingTop:'10px',paddingBottom:'0'}}>
	          <Typography>{children}</Typography>
	        </Box>
	      )}
	    </div>
	  );
	}

TabPanel.propTypes = {
		  children: PropTypes.node,
		  index: PropTypes.any.isRequired,
		  value: PropTypes.any.isRequired,
		};

export default function CustomTabs(props) {
	
  const [value, setValue] = React.useState(0);
  const [tabvalue, setTabValue] = React.useState(0);
  
  //const handleChange = (event, value) => {
  //  setValue(value);
  //};
  const classes = useStyles();
  const { plainTabs, tabs, title, rtlActive } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });
  
  const onTabChange = (event,newValue) => {
	  setTabValue(newValue);
  }
  return (
    <Card plain={plainTabs}>
      <CardHeader //color={headerColor} plain={plainTabs}
       style={{paddingTop:'0',paddingBottom:'0'}}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
        	value={tabvalue}
        	onChange={onTabChange}
        style={{padding:'0'}}
        >
        	<Tab label="수입" />
            <Tab label="수출" />
            <Tab label="환급" />
            <Tab label="기타" />
         </Tabs>  	
         <TabPanel value={tabvalue} index={0}>
         		<Button onClick={()=>setValue(0)} color="info" size="sm" style={{padding:'8px'}}>수입화물통관진행정보</Button>
         		<Button onClick={()=>setValue(21)} color="info" size="sm" style={{padding:'8px'}}>수입신고 개인통관고유부호 검증</Button>
         		<Button onClick={()=>setValue(22)} color="info" size="sm" style={{padding:'8px'}}>수입신고필증검증</Button>
         		<Button onClick={()=>setValue(16)} color="info" size="sm" style={{padding:'8px'}}>입출항보고내역</Button>
         		<Button onClick={()=>setValue(17)} color="info" size="sm" style={{padding:'8px'}}>입출항내역</Button>
         </TabPanel>
         <TabPanel value={tabvalue} index={1}>
         <GridItem xs="12">
	  		<Button onClick={()=>setValue(1)} color="info" size="sm" style={{padding:'8px'}}>수출신고번호별수출이행내역</Button>
	  		<Button onClick={()=>setValue(23)} color="info" size="sm" style={{padding:'8px'}}>수출이행기간 단축대상 품목</Button>
	  		<Button onClick={()=>setValue(24)} color="info" size="sm" style={{padding:'8px'}}>수출입 요건승인 내역조회</Button>
  	</GridItem></TabPanel>
         <TabPanel value={tabvalue} index={2}>
         <GridItem xs="12">
  		<Button onClick={()=>setValue(18)} color="info" size="sm" style={{padding:'8px'}}>간이정액 적용/비적용 업체정보</Button>
  		<Button onClick={()=>setValue(19)} color="info" size="sm" style={{padding:'8px'}}>간이정액 환급율표</Button>
  	</GridItem></TabPanel>
         <TabPanel value={tabvalue} index={3}>
         <GridItem xs="12">
         <Button onClick={()=>setValue(2)} color="info" size="sm" style={{padding:'8px'}}>장치장정보</Button>
         <Button onClick={()=>setValue(3)} color="info" size="sm" style={{padding:'8px'}}>통계부호내역</Button>
         <Button onClick={()=>setValue(4)} color="info" size="sm" style={{padding:'8px'}}>통관고유부호</Button>
         <Button onClick={()=>setValue(5)} color="info" size="sm" style={{padding:'8px'}}>통관단일창구 처리이력</Button>
         <Button onClick={()=>setValue(6)} color="info" size="sm" style={{padding:'8px'}}>항공사내역</Button>
         <Button onClick={()=>setValue(7)} color="info" size="sm" style={{padding:'8px'}}>보세운송차량등록내역</Button>
         <Button onClick={()=>setValue(8)} color="info" size="sm" style={{padding:'8px'}}>선박회사정보</Button>
         <Button onClick={()=>setValue(9)} color="info" size="sm" style={{padding:'8px'}}>선박회사상세정보</Button>
         <Button onClick={()=>setValue(10)} color="info" size="sm" style={{padding:'8px'}}>세관장확인대장 법령코드</Button>
         <Button onClick={()=>setValue(11)} color="info" size="sm" style={{padding:'8px'}}>관세환율정보</Button>
         <Button onClick={()=>setValue(12)} color="info" size="sm" style={{padding:'8px'}}>항공사목록</Button>
         <Button onClick={()=>setValue(13)} color="info" size="sm" style={{padding:'8px'}}>화물운송주선업자목록</Button>
         <Button onClick={()=>setValue(14)} color="info" size="sm" style={{padding:'8px'}}>화물운송주선업자내역</Button>
         <Button onClick={()=>setValue(15)} color="info" size="sm" style={{padding:'8px'}}>해외공급자부호</Button>
         <Button onClick={()=>setValue(20)} color="info" size="sm" style={{padding:'8px'}}>컨테이너내역</Button>
         <Button onClick={()=>setValue(25)} color="info" size="sm" style={{padding:'8px'}}>HS부호조회</Button>
         <Button onClick={()=>setValue(26)} color="info" size="sm" style={{padding:'8px'}}>관세사목록</Button>
         <Button onClick={()=>setValue(27)} color="info" size="sm" style={{padding:'8px'}}>관세율조회</Button>
         <Button onClick={()=>setValue(28)} color="info" size="sm" style={{padding:'8px'}}>동축산물 업체코드 조회</Button>
         <Button onClick={()=>setValue(29)} color="info" size="sm" style={{padding:'8px'}}>전자첨부서류 제출완료유무</Button>
         <Button onClick={()=>setValue(30)} color="info" size="sm" style={{padding:'8px'}}>우편번호별 관할세관 정보조회</Button>
  	</GridItem></TabPanel>
         
       
      </CardHeader>
      <CardBody style={{paddingTop:'0'}}>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};

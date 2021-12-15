import React from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Divider} from "@material-ui/core";
//import Icon from "@material-ui/core/Icon";
import Shipment from "views/Dashboard/Chart/ShipmentChart.js";
import Import from "views/Dashboard/Chart/ImportChart.js";
import Export from "views/Dashboard/Chart/ExportChart.js";
// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
//import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
//import Warning from "@material-ui/icons/Warning";
//import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
//import AccessTime from "@material-ui/icons/AccessTime";
//import Refresh from "@material-ui/icons/Refresh";
//import Edit from "@material-ui/icons/Edit";
//import Place from "@material-ui/icons/Place";
//import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import TimelineIcon from "@material-ui/icons/Timeline";
import Timeline from "components/Timeline/TimelineCustom.js";
import TimelineImp from "views/Dashboard/Timeline/TimelineImport.js";
import TimelineExp from "views/Dashboard/Timeline/TimelineExport.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Table from "components/Table/Table.js";
//import Button from "components/CustomButtons/Button.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";
import Table from "views/Dashboard/ContainerTable/Table.js";
import EventAvailableOutlined from '@material-ui/icons/EventAvailableOutlined';
import DirectionsBoatOutlined from '@material-ui/icons/DirectionsBoatOutlined';
import Forward30Outlined from '@material-ui/icons/Forward30Outlined';
import SwapVertOutlined from '@material-ui/icons/SwapVertOutlined';
import LocalShippingOutlined from '@material-ui/icons/LocalShippingOutlined';
import LocalShipping from '@material-ui/icons/LocalShipping';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
import Badge from "components/Badge/Badge.js";
import axios from 'axios';

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const import_init = [
	  {
		    // First story
		    inverted: true,
		    badgeColor: "danger",
		    badgeIcon: EventAvailableOutlined,
		    title: "ESTIMATED DEPARTURE",
		    titleColor: "danger",
		    data: "0 B/L"
		  },
		  {
		    // Second story
			  inverted: true,  
		    badgeColor: "success",
		    badgeIcon: DirectionsBoatOutlined,
		    title: "SHIPPING",
		    titleColor: "success",
		    data: "0 B/L"
		  },
		  {
		    // Third story
		    inverted: true,
		    badgeColor: "info",
		    badgeIcon: Forward30Outlined,
		    title: "ETA D-1",
		    titleColor: "info",
		    data: "0 B/L"
		  },
		  {
		    // Fourth story
			inverted: true,
		    badgeColor: "warning",
		    badgeIcon: SwapVertOutlined,
		    title: "UNLOAD",
		    titleColor: "warning",
		    data: "0 CNTR",
		    footer: (
		    	<p style={{marginBottom:'0',fontSize:"8px"}}>(BEFORE GATE OUT)</p>
		    	    )
		  },
		  {
			    // Fourth story
				inverted: true,
			    badgeColor: "primary",
			    badgeIcon: LocalShippingOutlined,
			    title: "GATE OUT/EMPTY IN",
			    titleColor: "primary",
			    data: "0/0 CNTR",
			    footer: (
				    	<p style={{fontSize:"8px"}}>(LAST 7DAYS)</p>
				    	    )
			  }
		]


const export_init = [
	  {
	    // First story
	    inverted: true,
	    badgeColor: "danger",
	    badgeIcon: LocalShippingOutlined,
	    title: "EMPTY OUT",
	    titleColor: "danger",
	    data: "0 CNTR"
	  },
	  {
	    // Second story
		  inverted: true,  
	    badgeColor: "success",
	    badgeIcon: LocalShipping,
	    title: "FULL IN",
	    titleColor: "success",
	    data: "0 CNTR"
	  },
	  {
	    // Third story
	    inverted: true,
	    badgeColor: "info",
	    badgeIcon: SwapVertOutlined,
	    title: "LOAD",
	    titleColor: "info",
	    data: "0 CNTR"
	  },
	  {
	    // Fourth story
		inverted: true,
	    badgeColor: "warning",
	    badgeIcon: DirectionsBoatOutlined,
	    title: "SHIPPING",
	    titleColor: "warning",
	    data: "0 B/L"
	  },
	  {
		    // Fourth story
			inverted: true,
		    badgeColor: "primary",
		    badgeIcon: LanguageOutlined,
		    title: "POD ARRIVAL  ",
		    titleColor: "warning",
		    data: "0 B/L",
		    footer: (
			    	<p style={{fontSize:"8px"}}>(LAST 7 DAYS)</p>
			    	    )
		  }
	];

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const [imports, setImports] = React.useState(import_init);
  const [exports, setExports] = React.useState(export_init);
  

  React.useEffect(() => {
	  if(props.userData){
		  axios.post("/com/getImportingList",{ietype:'I'})
		  .then(res => {
			  setImports(res.data);
		  	});
		  
		  axios.post("/com/getExportingList",{})
		  .then(res => {
			  setExports(res.data);
		  	});

	  } else {
		  props.openLogin();
		  return;
	  }
	    return () => {
	      console.log('cleanup');
	     // window.removeEventListener("touchmove",handleTouchMove);
	    };
}, []);

  
  
  return (
    <div style={{paddingRight:'10px',marginRight:'20px',marginLeft:'20px'}}>
      <GridContainer justify ="center">
	      <GridItem xs={12} sm={12} md={4}>
	        <Card>
	          <CardHeader color="info" icon>
	            <CardIcon color="info">
	              <TimelineIcon />
	            </CardIcon>
	            <h4 className={classes.cardIconTitle}>
	              Total Cargo Statics <small>- My Shipment By Carrier</small>
	            </h4>
	          </CardHeader>
	          <CardBody>
	          	<Shipment {...props}/>
	          </CardBody>
	        </Card>
	      </GridItem>
	      <GridItem xs={12} sm={12} md={4}>
	        <Card>
	          <CardHeader color="rose" icon>
	            <CardIcon color="rose">
	              <TimelineIcon />
	            </CardIcon>
	            <h4 className={classes.cardIconTitle}>
	            Total Cargo Statics <small>- Import</small>
	            </h4>
	          </CardHeader>
	          <CardBody>
	          	<Import {...props} />
	          </CardBody>
	        </Card>
	      </GridItem>
	      <GridItem xs={12} sm={12} md={4}>
	        <Card>
	          <CardHeader color="warning" icon>
	            <CardIcon color="warning">
	              <TimelineIcon />
	            </CardIcon>
	            <h4 className={classes.cardIconTitle}>
	            Total Cargo Statics <small>- Export</small>
	            </h4>
	          </CardHeader>
	          <CardBody>
	          	<Export {...props} />
	          </CardBody>
	        </Card>
	      </GridItem>
      </GridContainer>
      <GridContainer  justify ="center">
	      <GridItem xs={12} sm={12} md={6}>
	      <Card>
	        <CardHeader color="info" icon>
	          <CardIcon color="info">
	            <TimelineIcon />
	          </CardIcon>
	          <h4 className={classes.cardIconTitle}>
	          CURRENT CARGO MOVEMENT
	          </h4>
	        </CardHeader>
	        <CardBody>
		        <Grid container spacing={2}>
		            <Grid item xs={12} sm={12} md={6}>
				    	<Badge color="info">IMPORT</Badge>
				        <TimelineImp stories={imports} />
		            </Grid>
		            <Grid item xs={12} sm={12} md={6}>
			             <Badge color="info">EXPORT</Badge>
			             <TimelineExp stories={exports} />
		            </Grid>
		        </Grid>
	        </CardBody>
	      </Card>
	    </GridItem>
	    <GridItem xs={12} sm={12} md={6}>
	        <Card>
	          <CardHeader color="info" icon>
	            <CardIcon color="info">
	              <TimelineIcon />
	            </CardIcon>
	            <h4 className={classes.cardIconTitle}>
	            	ADDITIONAL CONTAINER COST
	            </h4>
	          </CardHeader>
	          <CardBody>
		          <GridItem xs={12} sm={12} md={12} style={{marginBottom:'15px'}}>
		            <Badge color="info" >IMPORT</Badge>
		          	<Table ietype="I" {...props}/>
		          </GridItem>
		          <Divider style={{marginBottom:'10px'}}/>
		          <GridItem xs={12} sm={12} md={12} style={{marginBottom:'5px'}}>
		            <Badge color="info" >EXPORT</Badge>
		          	<Table ietype="E" {...props}/>
		          </GridItem>
	          </CardBody>
	        </Card>
	      </GridItem>  
    </GridContainer>
    </div>
  );
}


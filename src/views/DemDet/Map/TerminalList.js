import React,{useState,useEffect, Component} from "react";

import axios from 'axios';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Link} from "react-router-dom";
import {MAP} from 'react-google-maps/lib/constants';

import {
	ArrowForward as ArrowForwardIcon,
	ArrowBack as  ArrowBackIcon
} from '@material-ui/icons';

import {Typography,AppBar,Tabs,Tab,Box} from "@material-ui/core";
function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`scrollable-force-tabpanel-${index}`}
		aria-labelledby={`scrollable-force-tab-${index}`}
		{...other}>
		{value === index && (
		  <Box p={3}>
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


export default function TermianlList(props) {
	const [value, setValue] = useState(0);
	const [port,setPort] = useState(props.port);
	const [usePort,setUsePort] = useState([]);
	

	useEffect(() => {
		setPort(props.port);
		getdemdetIn();
		return () => {
			console.log('cleanup');
		  };
	 },[props.port]);
	const handleChange = (event, newValue) => {
		if (newValue === 0 ) {
			getdemdetIn();
		}else {
			getdemdetOut();
		}
		
		
		setValue(newValue);
		
	};		
	const getdemdetIn = () => {
		if(props.userData){
			axios.post("/loc/getDemDetInTerminal",{ portCode:port.port}).then(res => setUsePort(res.data));
		}else {
			props.returnMessage("로그인 정보가 없습니다.","error");
		}
	}
	const getdemdetOut = () => {
		if(props.userData){
			axios.post("/loc/getDemDetOutTerminal",{ portCode:port.port}).then(res => setUsePort(res.data));
		}else {
			props.returnMessage("로그인 정보가 없습니다.","error");
		}
	}
	return (
	  	<MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
			<div style={{backgroundColor: "#ffffff",  height:'400px',borderRadius:"20px",marginBottom: "50px", overflow:'auto',}}>
				<div style = {{marginLeft:'30px', height: '50px'}}>
					<span style={{fontWeight:'bold', fontSize:'20px'}}>{port.port}<br></br>{port.port_kname}</span>
				</div> 
				<div>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButton="on"
							indicatorColor="primary"
							textColor="primary"
							aria-label="scrollable force tabs example">
							<Tab style={{width:'50%'}} label="In" icon={<ArrowBackIcon/>}></Tab>
							<Tab style={{width:'50%'}} label="Out" icon={<ArrowForwardIcon/>}></Tab>
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0}>
						<table>
							<tr>
								<th width="15%">Terminal<hr></hr></th>
								<th width="15%">Dem<hr></hr></th>
								<th width="15%">Det<hr></hr></th>
								<th width="15%">Combine<hr></hr></th>
								<th width="15%">Sto<hr></hr></th>
							</tr>
							{usePort.length !== 0 && (usePort.map((data, index) => {
								return (
									<tr key={index}>
										<td style={{textAlignLast:'center'}}>{data.terminal}<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.dem_cnt) !==0?<Link to={{pathname : `/svc/demDet/Import`,state : {param : data}}}>{data.dem_cnt}</Link>:data.dem_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.det_cnt) !==0?<Link to={{pathname : `/svc/demDet/Import`,state : {param : data}}}>{data.det_cnt}</Link>:data.det_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.combin_cnt) !==0?<Link to={{pathname : `/svc/demDet/Import`,state : {param : data}}}>{data.combin_cnt}</Link>:data.combin_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.osc_cnt) !==0?<Link to={{pathname : `/svc/demDet/Import`,state : {param : data}}}>{data.osc_cnt}</Link>:data.osc_cnt}	
										<hr></hr></td>
									</tr>
									
								
								);
							}))}
						</table>	
						
					</TabPanel>
					<TabPanel value={value} index={1}>
						<table>
							<tr>
								<th width="15%">Terminal<hr></hr></th>
								<th width="15%">Dem<hr></hr></th>
								<th width="15%">Det<hr></hr></th>
								<th width="15%">Combine<hr></hr></th>
								<th width="15%">Sto<hr></hr></th>
							</tr>
							{usePort.length !== 0 && (usePort.map((data, index) => {
								return (
									<tr key={index}>
										<td style={{textAlignLast:'center'}}>{data.terminal}<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.dem_cnt) !==0?<Link to={{pathname : `/svc/demDet/Export`,state : {param : data}}}>{data.dem_cnt}</Link>:data.dem_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.det_cnt) !==0?<Link to={{pathname : `/svc/demDet/Export`,state : {param : data}}}>{data.det_cnt}</Link>:data.det_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.combin_cnt) !==0?<Link to={{pathname : `/svc/demDet/Export`,state : {param : data}}}>{data.combin_cnt}</Link>:data.combin_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{Number(data.osc_cnt) !==0?<Link to={{pathname : `/svc/demDet/Export`,state : {param : data}}}>{data.osc_cnt}</Link>:data.osc_cnt}	
										<hr></hr></td>
									</tr>
								);
							}))}
						</table>
					</TabPanel>
				</div>
			</div>
		</MapControl>
	);
}

  class MapControl extends Component {
    static contextTypes = {
      [MAP] : PropTypes.object
    }
  
    componentWillMount() {
      this.map = this.context[MAP]
      this.controlDiv = document.createElement('div');
      this.map.controls[this.props.position].push(this.controlDiv);
    }
  
    componentWillUnmount() {
      const controlArray = this.map.controls[this.props.position].getArray();
      for (let i=0; i < controlArray.length; i++) {
        if(controlArray[i] === this.controlDiv) {
          this.map.controls[this.props.position].removeAt(i);
        }
      }
    }
    render() {
      return createPortal(this.props.children,this.controlDiv)
    }
  }

    
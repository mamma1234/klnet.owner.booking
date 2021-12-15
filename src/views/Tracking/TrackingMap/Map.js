import PropTypes from 'prop-types';
import React,{ Component,useEffect,useState } from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants'
import axios from 'axios';
import moment from 'moment';
import Draggable from 'react-draggable';
import { compose, withProps,withState,withHandlers } from "recompose";

import Button from "components/CustomButtons/Button.js";
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  //Switch,
  CardContent,
  AppBar,
  Tabs,
  Tab,
  //Tooltip,
  Box,
  Grid,
  //List,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Paper,
  InputBase,
  Divider,
  Collapse,
  CardActionArea,
  CardMedia,
  Typography
} from '@material-ui/core';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";

import {
  Alert as MuiAlert,
} from '@material-ui/lab';

import { red } from '@material-ui/core/colors';
import {
  Filter,
  Replay,
  YoutubeSearchedFor,
  Close,
  ArrowDownward,
  ArrowUpward
} from '@material-ui/icons';

import SubMap from 'components/Map/Satellite.js';
import MapSkin from 'components/Map/CustomMap';
import googleMapLogin from "assets/img/googlemapNoLogin.jpg";
import { set } from 'date-fns';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-force-tabpanel-${index}`}
    aria-labelledby={`scrollable-force-tab-${index}`}
    {...other}
    >
    {value === index && (
      <Box p={3}>
      <div>{children}</div>
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
  





const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`100%`}}/>,
      containerElement: <div style={{width:'100%', height: `80vh` }}/>,
      mapElement: <div style={{height:`100%` }}/>,
  }),
  withState('zoom','onZoomChange',3),
  withState('center','onCenterChange',{lat:36.431748,lng:127.384496}),
    withHandlers(() => {
      const refs = {
        map: undefined,
      }

      return {
        onMapMounted: () => ref => {
          refs.map = ref
        },
        onZoomChanged: ({onZoomChange}) => () => {
          onZoomChange(refs.map.getZoom());
        },
        onDragEnd: ({onCenterChange}) => () => {
          onCenterChange(refs.map.getCenter());
        },
        onSelectShip: ({onZoomChange, onCenterChange}) => (param1,param2,param3) =>{
          onCenterChange({lat:param1,lng:param2});
          onZoomChange(param3);
        }
      }
    }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref = {props.onMapMounted}
    defaultZoom={props.zoom}
    zoom={props.zoom}
    center={props.center}
    defaultOptions={{
      
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: [],
      mapTypeControl: false,
     
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    onZoomChanged ={props.onZoomChanged}
    options={{
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    mapContainerStyle={{
      height:"37vh",
      width:"100%"
    }}
    onDragEnd={props.onDragEnd}
    onMouseMove={(e) => {props.onLocation(e.latLng.lat(),e.latLng.lng())}}
    onClick={()=> {props.onToggleOpen(); props.onPortToggle();}}
    style={{width:'100%', height: `400px` }}>
      
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
            <span>Zoom Level : {props.zoom}</span>
    </MapControl>
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
        <span>{props.locationlat.toFixed(4)} , {props.locationlng.toFixed(4)}</span>
    </MapControl>
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
      <Paper component="form" style={{padding:'2px 4px', display:'flex', alignItems:'center',width:400}}>
        <InputBase 
          style={{flex:1}}
          placeholder="Insert Container Number"
          value={props.keyword}
          inputProps={{
            onChange: event => props.setKeyword(event.target.value)}}>
        </InputBase>
        <IconButton color="primary" onClick ={() => props.onSearch(props.keyword)}>
                <YoutubeSearchedFor></YoutubeSearchedFor>
        </IconButton>
        <Divider style={{height:28, margin:4}} orientation="vertical"></Divider>
        <IconButton color="primary" onClick ={() => props.onInit()}>
          <Replay></Replay>
        </IconButton>
        <Divider style={{height:28, margin:4}} orientation="vertical"></Divider>
        <IconButton
          color="secondary"
          onClick={() => {
            if (props.menuDisplay === "none") {
                props.onMenuDisplay("block");
            }else {
                props.onMenuDisplay("none");
            }
          }}> 
          <Filter/>           
        </IconButton>
      </Paper>
    </MapControl>
    {props.checkParameter.length !== 0 &&
    <MapControl position = {window.google.maps.ControlPosition.LEFT_TOP}>
      <Collapse in={props.checked} collapsedHeight={26}>
        <Paper component="form" style={{alignItems:'center',maxWidth:300, height:'100%'}}>
          {props.checked===true?(
          <IconButton onClick={() => props.toggleChecked(props.checked)} style={{width:'100%',height:12}} color="primary">
            <ArrowUpward></ArrowUpward>
          </IconButton>
          ):(<IconButton onClick={() => props.toggleChecked(props.checked)} style={{width:'100%',height:12}} color="primary">
            <ArrowDownward></ArrowDownward>
          </IconButton>)}
          
          <div style={{width:'100%',textAlignLast:'center'}}>
            <span style={{fontSize:'16px'}}>선박 정보</span>
            {props.shipList.length !== 0 &&
            <IconButton style={{height:12}} color="primary" onClick={() => {props.onToggleOpen(props.shipList[0].shipId, props.shipList[0].nationCode)} }>
              <YoutubeSearchedFor></YoutubeSearchedFor>
            </IconButton>}
          </div>

            <Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <span>컨 번호 : {props.checkParameter[0].cntr_no}</span>
              </Grid>
              
              <Grid item xs={12} sm={12} md={6} >
                <span>수출입 구분 : {props.checkParameter[0].ie_type ==="I"?"수입":props.checkParameter[0].ie_type ==="E"?"수출":""}</span>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <span>선박명 : {props.checkParameter[0].vsl_name !== null?props.checkParameter[0].vsl_name:"Unknown"}</span>
              </Grid>
              
              <Grid item xs={12} sm={12} md={6} >
                <span>선사 : {props.checkParameter[0].carrier_name}</span>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <span>출발지 : {props.checkParameter[0].pol_name}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].pol_wgs84_x !== null && props.checkParameter[0].pol_wgs84_y){props.onSelectShip(props.checkParameter[0].pol_wgs84_y,props.checkParameter[0].pol_wgs84_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              
              <Grid item xs={12} sm={12} md={6} >
                <span>목적지 : {props.checkParameter[0].pod_name}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].pod_wgs84_x !== null && props.checkParameter[0].pod_wgs84_y){props.onSelectShip(props.checkParameter[0].pod_wgs84_y,props.checkParameter[0].pod_wgs84_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <div style={{width:'100%',textAlignLast:'center'}}>
              <h5>국내 정보</h5>
          </div>

          <Divider style={{height:3, margin:5}} orientation="horizontal"/>
          {props.checkParameter[0].ie_type ==="I"?(
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <span> 양하지 : {props.checkParameter[0].unload_name!==null?props.checkParameter[0].unload_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() =>{if(props.checkParameter[0].unload_y !== null && props.checkParameter[0].unload_x){props.onSelectShip(props.checkParameter[0].unload_y,props.checkParameter[0].unload_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span> 풀컨반출지 : {props.checkParameter[0].full_outgate_name!==null?props.checkParameter[0].full_outgate_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].full_outgate_y !== null && props.checkParameter[0].full_outgate_x){props.onSelectShip(props.checkParameter[0].full_outgate_y,props.checkParameter[0].full_outgate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span> 공컨반입지 : {props.checkParameter[0].mt_ingate_name!==null?props.checkParameter[0].mt_ingate_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].mt_ingate_y !== null && props.checkParameter[0].mt_ingate_x){props.onSelectShip(props.checkParameter[0].mt_ingate_y,props.checkParameter[0].mt_ingate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>):
          (<Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <span> 공컨반출지 : {props.checkParameter[0].mt_outgate_name!==null?props.checkParameter[0].mt_outgate_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].mt_outgate_y !== null && props.checkParameter[0].mt_outgate_x){props.onSelectShip(props.checkParameter[0].mt_outgate_y,props.checkParameter[0].mt_outgate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span> 풀컨반입지 : {props.checkParameter[0].full_ingate_name!==null?props.checkParameter[0].full_ingate_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].full_ingate_y !== null && props.checkParameter[0].full_ingate_x){props.onSelectShip(props.checkParameter[0].full_ingate_y,props.checkParameter[0].full_ingate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span> 선적지 : {props.checkParameter[0].load_name!==null?props.checkParameter[0].load_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].load_y !== null && props.checkParameter[0].load_x){props.onSelectShip(props.checkParameter[0].load_y,props.checkParameter[0].load_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>)}

          <div style={{width:'100%',textAlignLast:'center'}}>
              <h5>화면 설정</h5>
          </div>

          <Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={4}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.vesselToggleChange(props.toggleVessel)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'13px'}}>선박</span>}
                  labelPlacement="start">

                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.terminalToggleChange(props.toggleTerminal)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'13px'}}>터미널</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.portToggleChange(props.togglePort)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'13px'}}>포트</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.carToggleChange(props.toggleCarTracking)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'11px'}}>차량 이동경로</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.shipToggleChange(props.toggleShipTracking)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'11px'}}>선박 이동경로</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.carTimeStampChange(props.toggleCarTimeStamp)} color="primary"/>}
                  label={<span style={{fontSize:'13px'}}>차량<br></br>TIMESTAMP</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.shipTimeStampChange(props.toggleShipTimeStamp)} color="primary"/>}
                  label={<span style={{fontSize:'13px'}}>선박<br></br>TIMESTAMP</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>
    </MapControl>}
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>    
      <div style={{display:'inline-block', backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px'}}>
        <div style={{display:props.menuDisplay}}>
          <img style={{marginLeft:"20px"}} alt="dark" src={require("assets/img/googleMap/dark.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleDark)}/>
          <img style={{marginLeft:"5px"}} alt="aubergine" src={require("assets/img/googleMap/aubergine.png")} onClick={() => props.onSetMapStyle(MapSkin.MapAubergine)}/>
          <img style={{marginLeft:"5px"}} alt="night" src={require("assets/img/googleMap/night.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleNight)}/>
          <img style={{marginLeft:"5px"}} alt="retro" src={require("assets/img/googleMap/retro.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleRetro)}/>
          <img style={{marginLeft:"5px"}} alt="silver" src={require("assets/img/googleMap/silver.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleSilver)}/>
          <img style={{marginLeft:"5px",marginRight:"20px"}} alt="normal" src={require("assets/img/googleMap/normal.png")} onClick={() => props.onSetMapStyle([])}/>
        </div>
      </div>
    </MapControl>
    {props.shipList.length !== 0 &&
      props.shipList.map((data, index) => {
        if(data.position !== null) {
          return(
            <Marker
              key={index}
              draggable={false}
              visible={props.toggleVessel}
              position={{lat:data.position.latitude, lng:data.position.longitude}} // 마커 위치 설정 {lat: ,lng: }   
              onClick={() => {props.onToggleOpen(data.shipId, data.nationCode)} }
              icon= {{
                url:require('assets/img/newsprite.png'),
                size:{
                  width:data.shipType==="CARGO"?((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBlue.rotate0.width:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBlue.rotate1.width:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBlue.rotate2.width:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBlue.rotate3.width:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBlue.rotate4.width:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBlue.rotate5.width:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBlue.rotate6.width:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBlue.rotate7.width:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBlue.rotate8.width:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBlue.rotate9.width:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBlue.rotate10.width:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBlue.rotate11.width:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBlue.rotate12.width:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBlue.rotate13.width:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBlue.rotate14.width:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBlue.rotate15.width:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBlue.rotate16.width:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBlue.rotate17.width:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBlue.rotate18.width:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBlue.rotate19.width:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBlue.rotate20.width:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBlue.rotate21.width:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBlue.rotate22.width:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBlue.rotate23.width:props.shipRotate.vesselBlue.rotate6.width):data.shipType==="CONTAINER"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBrown.rotate0.width:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBrown.rotate1.width:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBrown.rotate2.width:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBrown.rotate3.width:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBrown.rotate4.width:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBrown.rotate5.width:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBrown.rotate6.width:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBrown.rotate7.width:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBrown.rotate8.width:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBrown.rotate9.width:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBrown.rotate10.width:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBrown.rotate11.width:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBrown.rotate12.width:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBrown.rotate13.width:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBrown.rotate14.width:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBrown.rotate15.width:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBrown.rotate16.width:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBrown.rotate17.width:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBrown.rotate18.width:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBrown.rotate19.width:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBrown.rotate20.width:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBrown.rotate21.width:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBrown.rotate22.width:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBrown.rotate23.width:props.shipRotate.vesselBrown.rotate6.width):data.shipType==="BULK"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselGreen.rotate0.width:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselGreen.rotate1.width:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselGreen.rotate2.width:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselGreen.rotate3.width:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselGreen.rotate4.width:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselGreen.rotate5.width:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselGreen.rotate6.width:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselGreen.rotate7.width:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselGreen.rotate8.width:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselGreen.rotate9.width:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselGreen.rotate10.width:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselGreen.rotate11.width:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselGreen.rotate12.width:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselGreen.rotate13.width:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselGreen.rotate14.width:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselGreen.rotate15.width:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselGreen.rotate16.width:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselGreen.rotate17.width:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselGreen.rotate18.width:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselGreen.rotate19.width:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselGreen.rotate20.width:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselGreen.rotate21.width:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselGreen.rotate22.width:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselGreen.rotate23.width:props.shipRotate.vesselGreen.rotate6.width):((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselRed.rotate0.width:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselRed.rotate1.width:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselRed.rotate2.width:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselRed.rotate3.width:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselRed.rotate4.width:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselRed.rotate5.width:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselRed.rotate6.width:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselRed.rotate7.width:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselRed.rotate8.width:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselRed.rotate9.width:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselRed.rotate10.width:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselRed.rotate11.width:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselRed.rotate12.width:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselRed.rotate13.width:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselRed.rotate14.width:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselRed.rotate15.width:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselRed.rotate16.width:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselRed.rotate17.width:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselRed.rotate18.width:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselRed.rotate19.width:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselRed.rotate20.width:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselRed.rotate21.width:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselRed.rotate22.width:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselRed.rotate23.width:props.shipRotate.vesselRed.rotate6.width),
                  height:data.shipType==="CARGO"?((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBlue.rotate0.height:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBlue.rotate1.height:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBlue.rotate2.height:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBlue.rotate3.height:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBlue.rotate4.height:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBlue.rotate5.height:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBlue.rotate6.height:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBlue.rotate7.height:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBlue.rotate8.height:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBlue.rotate9.height:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBlue.rotate10.height:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBlue.rotate11.height:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBlue.rotate12.height:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBlue.rotate13.height:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBlue.rotate14.height:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBlue.rotate15.height:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBlue.rotate16.height:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBlue.rotate17.height:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBlue.rotate18.height:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBlue.rotate19.height:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBlue.rotate20.height:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBlue.rotate21.height:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBlue.rotate22.height:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBlue.rotate23.height:props.shipRotate.vesselBlue.rotate6.height):data.shipType==="CONTAINER"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBrown.rotate0.height:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBrown.rotate1.height:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBrown.rotate2.height:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBrown.rotate3.height:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBrown.rotate4.height:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBrown.rotate5.height:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBrown.rotate6.height:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBrown.rotate7.height:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBrown.rotate8.height:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBrown.rotate9.height:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBrown.rotate10.height:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBrown.rotate11.height:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBrown.rotate12.height:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBrown.rotate13.height:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBrown.rotate14.height:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBrown.rotate15.height:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBrown.rotate16.height:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBrown.rotate17.height:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBrown.rotate18.height:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBrown.rotate19.height:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBrown.rotate20.height:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBrown.rotate21.height:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBrown.rotate22.height:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBrown.rotate23.height:props.shipRotate.vesselBrown.rotate6.height):data.shipType==="BULK"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselGreen.rotate0.height:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselGreen.rotate1.height:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselGreen.rotate2.height:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselGreen.rotate3.height:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselGreen.rotate4.height:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselGreen.rotate5.height:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselGreen.rotate6.height:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselGreen.rotate7.height:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselGreen.rotate8.height:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselGreen.rotate9.height:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselGreen.rotate10.height:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselGreen.rotate11.height:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselGreen.rotate12.height:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselGreen.rotate13.height:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselGreen.rotate14.height:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselGreen.rotate15.height:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselGreen.rotate16.height:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselGreen.rotate17.height:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselGreen.rotate18.height:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselGreen.rotate19.height:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselGreen.rotate20.height:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselGreen.rotate21.height:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselGreen.rotate22.height:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselGreen.rotate23.height:props.shipRotate.vesselGreen.rotate6.height):((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselRed.rotate0.height:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselRed.rotate1.height:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselRed.rotate2.height:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselRed.rotate3.height:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselRed.rotate4.height:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselRed.rotate5.height:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselRed.rotate6.height:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselRed.rotate7.height:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselRed.rotate8.height:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselRed.rotate9.height:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselRed.rotate10.height:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselRed.rotate11.height:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselRed.rotate12.height:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselRed.rotate13.height:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselRed.rotate14.height:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselRed.rotate15.height:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselRed.rotate16.height:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselRed.rotate17.height:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselRed.rotate18.height:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselRed.rotate19.height:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselRed.rotate20.height:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselRed.rotate21.height:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselRed.rotate22.height:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselRed.rotate23.height:props.shipRotate.vesselRed.rotate6.height),
                },
                origin:{
                  x:data.shipType==="CARGO"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBlue.rotate0.x:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBlue.rotate1.x:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBlue.rotate2.x:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBlue.rotate3.x:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBlue.rotate4.x:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBlue.rotate5.x:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBlue.rotate6.x:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBlue.rotate7.x:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBlue.rotate8.x:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBlue.rotate9.x:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBlue.rotate10.x:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBlue.rotate11.x:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBlue.rotate12.x:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBlue.rotate13.x:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBlue.rotate14.x:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBlue.rotate15.x:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBlue.rotate16.x:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBlue.rotate17.x:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBlue.rotate18.x:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBlue.rotate19.x:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBlue.rotate20.x:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBlue.rotate21.x:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBlue.rotate22.x:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBlue.rotate23.x:props.shipRotate.vesselBlue.rotate6.x):data.shipType==="CONTAINER"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBrown.rotate0.x:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBrown.rotate1.x:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBrown.rotate2.x:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBrown.rotate3.x:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBrown.rotate4.x:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBrown.rotate5.x:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBrown.rotate6.x:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBrown.rotate7.x:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBrown.rotate8.x:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBrown.rotate9.x:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBrown.rotate10.x:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBrown.rotate11.x:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBrown.rotate12.x:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBrown.rotate13.x:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBrown.rotate14.x:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBrown.rotate15.x:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBrown.rotate16.x:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBrown.rotate17.x:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBrown.rotate18.x:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBrown.rotate19.x:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBrown.rotate20.x:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBrown.rotate21.x:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBrown.rotate22.x:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBrown.rotate23.x:props.shipRotate.vesselBrown.rotate6.x):data.shipType==="BULK"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselGreen.rotate0.x:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselGreen.rotate1.x:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselGreen.rotate2.x:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselGreen.rotate3.x:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselGreen.rotate4.x:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselGreen.rotate5.x:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselGreen.rotate6.x:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselGreen.rotate7.x:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselGreen.rotate8.x:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselGreen.rotate9.x:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselGreen.rotate10.x:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselGreen.rotate11.x:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselGreen.rotate12.x:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselGreen.rotate13.x:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselGreen.rotate14.x:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselGreen.rotate15.x:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselGreen.rotate16.x:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselGreen.rotate17.x:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselGreen.rotate18.x:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselGreen.rotate19.x:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselGreen.rotate20.x:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselGreen.rotate21.x:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselGreen.rotate22.x:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselGreen.rotate23.x:props.shipRotate.vesselGreen.rotate6.x):((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselRed.rotate0.x:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselRed.rotate1.x:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselRed.rotate2.x:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselRed.rotate3.x:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselRed.rotate4.x:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselRed.rotate5.x:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselRed.rotate6.x:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselRed.rotate7.x:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselRed.rotate8.x:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselRed.rotate9.x:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselRed.rotate10.x:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselRed.rotate11.x:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselRed.rotate12.x:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselRed.rotate13.x:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselRed.rotate14.x:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselRed.rotate15.x:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselRed.rotate16.x:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselRed.rotate17.x:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselRed.rotate18.x:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselRed.rotate19.x:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselRed.rotate20.x:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselRed.rotate21.x:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselRed.rotate22.x:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselRed.rotate23.x:props.shipRotate.vesselRed.rotate6.x),
                  y:data.shipType==="CARGO"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBlue.rotate0.y:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBlue.rotate1.y:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBlue.rotate2.y:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBlue.rotate3.y:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBlue.rotate4.y:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBlue.rotate5.y:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBlue.rotate6.y:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBlue.rotate7.y:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBlue.rotate8.y:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBlue.rotate9.y:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBlue.rotate10.y:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBlue.rotate11.y:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBlue.rotate12.y:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBlue.rotate13.y:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBlue.rotate14.y:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBlue.rotate15.y:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBlue.rotate16.y:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBlue.rotate17.y:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBlue.rotate18.y:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBlue.rotate19.y:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBlue.rotate20.y:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBlue.rotate21.y:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBlue.rotate22.y:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBlue.rotate23.y:props.shipRotate.vesselBlue.rotate6.y):data.shipType==="CONTAINER"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselBrown.rotate0.y:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselBrown.rotate1.y:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselBrown.rotate2.y:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselBrown.rotate3.y:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselBrown.rotate4.y:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselBrown.rotate5.y:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselBrown.rotate6.y:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselBrown.rotate7.y:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselBrown.rotate8.y:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselBrown.rotate9.y:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselBrown.rotate10.y:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselBrown.rotate11.y:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselBrown.rotate12.y:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselBrown.rotate13.y:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselBrown.rotate14.y:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselBrown.rotate15.y:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselBrown.rotate16.y:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselBrown.rotate17.y:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselBrown.rotate18.y:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselBrown.rotate19.y:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselBrown.rotate20.y:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselBrown.rotate21.y:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselBrown.rotate22.y:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselBrown.rotate23.y:props.shipRotate.vesselBrown.rotate6.y):data.shipType==="BULK"?((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselGreen.rotate0.y:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselGreen.rotate1.y:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselGreen.rotate2.y:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselGreen.rotate3.y:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselGreen.rotate4.y:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselGreen.rotate5.y:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselGreen.rotate6.y:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselGreen.rotate7.y:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselGreen.rotate8.y:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselGreen.rotate9.y:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselGreen.rotate10.y:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselGreen.rotate11.y:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselGreen.rotate12.y:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselGreen.rotate13.y:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselGreen.rotate14.y:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselGreen.rotate15.y:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselGreen.rotate16.y:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselGreen.rotate17.y:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselGreen.rotate18.y:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselGreen.rotate19.y:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselGreen.rotate20.y:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselGreen.rotate21.y:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselGreen.rotate22.y:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselGreen.rotate23.y:props.shipRotate.vesselGreen.rotate6.y):((data.position.courseOverGround >0 && data.position.courseOverGround <= 15)? props.shipRotate.vesselRed.rotate0.y:(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.vesselRed.rotate1.y:(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.vesselRed.rotate2.y:(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.vesselRed.rotate3.y:(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.vesselRed.rotate4.y:(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.vesselRed.rotate5.y:(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.vesselRed.rotate6.y:(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.vesselRed.rotate7.y:(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.vesselRed.rotate8.y:(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.vesselRed.rotate9.y:(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.vesselRed.rotate10.y:(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.vesselRed.rotate11.y:(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.vesselRed.rotate12.y:(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.vesselRed.rotate13.y:(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.vesselRed.rotate14.y:(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.vesselRed.rotate15.y:(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.vesselRed.rotate16.y:(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.vesselRed.rotate17.y:(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.vesselRed.rotate18.y:(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.vesselRed.rotate19.y:(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.vesselRed.rotate20.y:(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.vesselRed.rotate21.y:(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.vesselRed.rotate22.y:(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.vesselRed.rotate23.y:props.shipRotate.vesselRed.rotate6.y),
                }
            }}>
            {props.isOpen && (data.shipId === props.shipId) && (
              <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                <Draggable>
                  <Card style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>  
                    <CardHeader 
                      avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>{data.nationCode}</Avatar>}
                      title={data.imoNo}
                      subheader={data.shipName}
                      action={
                        <IconButton onClick={() => props.onToggleOpen(data.shipId)}>
                          <Close/>
                        </IconButton>
                      }>
                    </CardHeader>
                    <CardContent>
                      <AppBar position="static" color="default">
                        <Tabs
                          value={props.value}
                          onChange={(e, v) => props.handleChange(v)}
                          indicatorColor="primary"
                          textColor="primary"
                          aria-label="scrollable force tabs example">
                          <Tab style={{width:'50%'}} label="Zoom"></Tab>
                          <Tab style={{width:'50%'}} label="Info"></Tab>
                        </Tabs>
                      </AppBar>
                      <TabPanel value={props.value} index={0} style={{height:'250px'}}>
                        <SubMap parameter={data} gubun="ship"/>
                      </TabPanel>
                      <TabPanel value={props.value} index={1} style={{height:'250px'}}>
                        <h4>IMO : {data.imoNo}</h4>
                        <h4>SHIP NAME : {data.shipName}</h4>
                        <h4>SHIP TYPE : {data.shipType}</h4>
                        <h4>Destination : {data.destination}</h4>
                        <h4>nation : {props.nationInfo !==null?props.nationInfo[0].nation_kname+'('+data.nationCode+')':data.nationCode}</h4>
                      </TabPanel>
                    </CardContent>
                  </Card>
                </Draggable>
              </MapControl>
            )}
          </Marker> 
          )
        }
      }
    )}
    {/* pol Marker */}
    {props.checkParameter.length !== 0 && 
      props.checkParameter.map((data,index) => {
        if(data.pol !== null && data.pol_wgs84_x !== null && data.pol_wgs84_y !== null) {
          return(
            <Marker
              key={index}
              draggable={false} 
              visible={props.togglePort}
              position={{lat:data.pol_wgs84_y, lng:data.pol_wgs84_x}}
              icon={{
                url:require('assets/img/MapSprite1.png'),
                size:{
                  width:props.shipRotate.port.width,
                  height:props.shipRotate.port.height
                },
                origin:{
                  x:props.shipRotate.port.x,
                  y:props.shipRotate.port.y
                }
              }}
              onClick={() => props.onPortToggle(data.pol)}>
              {props.isPortOver && data.pol === props.portCode && (
                <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                  <Card  style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>
                    <CardHeader 
                      avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>KR</Avatar>}
                      title={props.nationEname}
                      subheader={props.nationName}
                      action={
                        <IconButton onClick={() => props.onPortMouseOut(data.pol)}>
                          <Close/>
                        </IconButton>
                      }>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <SubMap parameter={{wgs84_x:data.pol_wgs84_x,wgs84_y:data.pol_wgs84_y}} gubun="port"/>
                      </div>  
                      <span>Port : {props.portCode}<br></br></span>
                      <span> Port Nation : {props.nationCode}<br></br></span>
                      <span> Port EngName : {props.portEname}<br></br></span>
                      <span>Port Name : {props.portName}<br></br></span>
                    </CardContent>
                  </Card>
                </MapControl>
              )}    
            </Marker>
          )
        }
      })}
      {/* pod Marker */}
      {props.checkParameter.length !== 0 && 
        props.checkParameter.map((data,index) => {
          if(data.pod !== null && data.pod_wgs84_x !== null && data.pod_wgs84_y !== null) {
            return(
              <Marker
                key={index}
                draggable = {false} 
                visible={props.togglePort}
                position={{lat:data.pod_wgs84_y, lng:data.pod_wgs84_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.port.width,
                    height:props.shipRotate.port.height
                  },
                  origin:{
                    x:props.shipRotate.port.x,
                    y:props.shipRotate.port.y
                  }
                }}
                onClick={() => props.onPortToggle(data.pod)}>
                {props.isPortOver && data.pod === props.portCode && (
                  <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                    <Card  style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>
                      <CardHeader 
                        avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>KR</Avatar>}
                        title={props.nationEname}
                        subheader={props.nationName}
                        action={
                          <IconButton onClick={() => props.onPortMouseOut(data.pod)}>
                            <Close/>
                          </IconButton>
                        }>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <SubMap parameter={{wgs84_x:data.pod_wgs84_x,wgs84_y:data.pod_wgs84_y}} gubun="port"/>
                        </div>  
                        <span>Port : {props.portCode}<br></br></span>
                        <span> Port Nation : {props.nationCode}<br></br></span>
                        <span> Port EngName : {props.portEname}<br></br></span>
                        <span>Port Name : {props.portName}<br></br></span>
                      </CardContent>
                    </Card>
                  </MapControl>
                )}    
              </Marker>
            )
          }
        })}
        {/* 선적지 marker  */}
        {props.checkParameter.length !== 0 &&
          props.checkParameter.map((data,index) => {

            if(data.load_x !== null && data.load_y !== null) {
              return(
                <Marker
                  key={index}
                  draggable={false} 
                  visible={props.toggleTerminal}
                  position={{lat:data.load_y, lng:data.load_x}}
                  icon={{
                    url:require('assets/img/MapSprite1.png'),
                    size:{
                      width:props.shipRotate.terminal.width,
                      height:props.shipRotate.terminal.height
                    },
                    origin:{
                      x:props.shipRotate.terminal.x,
                      y:props.shipRotate.terminal.y
                    }
                  }}>
                </Marker>
              )
            }
          })
        }
        {/* 양하지 marker */}
        {props.checkParameter.length !== 0 && 
          props.checkParameter.map((data,index) => {
            if(data.unload_x !== null && data.unload_y !== null) {
              return(
                <Marker
                  key={index}
                  draggable = {false} 
                  visible={props.toggleTerminal}
                  position={{lat:data.unload_y, lng:data.unload_x}}
                  icon={{
                    url:require('assets/img/MapSprite1.png'),
                    size:{
                      width:props.shipRotate.terminal.width,
                      height:props.shipRotate.terminal.height
                    },
                    origin:{
                      x:props.shipRotate.terminal.x,
                      y:props.shipRotate.terminal.y
                    }
                  }}>
                </Marker>
              )
            }
          })
        }
        {/* 풀컨반출지 marker */}
        {props.checkParameter.length !== 0 && 
          props.checkParameter.map((data,index) => {
            if(data.full_outgate_x !== null && data.full_outgate_y !== null) {
              return(
                <Marker
                  key={index}
                  draggable = {false} 
                  visible={props.toggleTerminal}
                  position={{lat:data.full_outgate_y, lng:data.full_outgate_x}}
                  icon={{
                    url:require('assets/img/MapSprite1.png'),
                    size:{
                      width:props.shipRotate.terminal.width,
                      height:props.shipRotate.terminal.height
                    },
                    origin:{
                      x:props.shipRotate.terminal.x,
                      y:props.shipRotate.terminal.y
                    }
                  }}>
                </Marker>
              )
            }
          })
        }
        {/* 풀컨반입지 marker */}
        {props.checkParameter.length !== 0 && 
          props.checkParameter.map((data,index) => {
            if(data.full_ingate_x != null && data.full_ingate_y !== null) {
              return(
                <Marker
                  key={index}
                  draggable={false} 
                  visible={props.toggleTerminal}
                  position={{lat:data.full_ingate_y, lng:data.full_ingate_x}}
                  icon={{
                    url:require('assets/img/MapSprite1.png'),
                    size:{
                      width:props.shipRotate.terminal.width,
                      height:props.shipRotate.terminal.height
                    },
                    origin:{
                      x:props.shipRotate.terminal.x,
                      y:props.shipRotate.terminal.y
                    }
                  }}>
                </Marker>
              )
            }
          })
        }
        {/* 공컨반입지 marker */}
        {props.checkParameter.length !== 0 &&
          props.checkParameter.map((data,index) => {
            if(data.mt_ingate_x !== null && data.mt_ingate_y !== null) {
              return(
                <Marker
                  key={index}
                  draggable = {false} 
                  visible={props.toggleTerminal}
                  position={{lat:data.mt_ingate_y, lng:data.mt_ingate_x}}
                  icon={{
                    url:require('assets/img/MapSprite1.png'),
                    size:{
                      width:props.shipRotate.terminal.width,
                      height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
              )
            }
          })
        }
        {/* 공컨반출지 marker */}
        {props.checkParameter.length !== 0 && 
          props.checkParameter.map((data,index) => {

            if(data.mt_outgate_x !== null && data.mt_outgate_y !== null) {
              return(
                <Marker
                  key={index}
                  draggable = {false} 
                  visible={props.toggleTerminal}
                  position={{lat:data.mt_outgate_y, lng:data.mt_outgate_x}}
                  icon={{
                    url:require('assets/img/MapSprite1.png'),
                    size:{
                      width:props.shipRotate.terminal.width,
                      height:props.shipRotate.terminal.height
                    },
                    origin:{
                      x:props.shipRotate.terminal.x,
                      y:props.shipRotate.terminal.y
                    }
                  }}>
                </Marker>
              )
            }
          })
        }
        {/* 선박 timestamp*/}
        {props.shipPositions.length !== 0 &&
          props.shipPositions.map((data,index) => {
            if(data.latitude !== null && data.longitude !== null) {
              return(
                <Marker
                  key={index}
                  visible={props.toggleShipTimeStamp}
                  draggable={false} 
                  position={{lat:data.latitude, lng:data.longitude}}
                  title={data.timestamp}
                  icon={require("assets/img/point.png")}>
                </Marker>
              )
            }
          })
        }
        {/* 차량 timestamp Tracking*/}
        {props.containerPositions.length !== 0 && 
          props.containerPositions.map((data,index) => {
            if(data.latitude !== null && data.longitude !== null) {
              return(
                <Marker
                  key={index}
                  visible={props.toggleCarTimeStamp}
                  draggable={false} 
                  position={{lat:data.latitude, lng:data.longitude}}
                  title={data.trace_date}
                  icon={require("assets/img/point.png")}>
                </Marker>
              )
            }
          })
        }
        <Polyline
          path={props.positions}
          geodesic={false}
          visible={props.toggleShipTracking}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeWeight: 1,
            geodesic:false,
            icons:[{
              icon:{
                path : 1,
                strokeColor: '#0000FF'
              },
            offset: '2',
            repeat: '50px'}]
          }}
        />
        <Polyline
          path={props.trackingPositions}
          geodesic={false}
          visible={props.toggleCarTracking}
          options={{
            strokeColor: '#FF00FF',
            strokeOpacity: 3,
            strokeWeight: 3,
            geodesic:false,
            icons:[{
              icon:{
                path : 1,
                strokeColor: '#0000FF'
              },
            offset: '2',
            repeat: '50px'}]
        }}/>
      </GoogleMap>
    )
  );

export default function DemDetMap(props) {
  const [mapStyle,setMapStyle] = useState([]); // GoogleMap 스킨 상태
  const [locationlat, setLocationlat] = useState(0); // 현재 마우스 위치 Latitude 좌표
  const [locationlng, setLocationlng] = useState(0); // 현재 마우스 위치 Longitude 좌표
  const [portCode, setPortCode] = useState(""); //Port상세보기 파라메터
  const [shipList, setShipList] = useState([]); // 선박데이터
  const [positions, setPositions] = useState([]); // 선박의 이동경로
  const [shipPositions, setShipPositions] = useState([]); // 선박 이동경로 TIME
  const [trackingPositions, setTrackingPositions] = useState([]); // 내륙 이동경로
  const [containerPositions, setContainerPositions] = useState([]); //내륙 이동경로 TIME
  const [menuDisplay, setMenuDisplay] = useState("none"); // 1번메뉴 show hide
  const [keyword, setKeyword] = useState(""); //ContainerNumber키워드
  const [value, setValue] = useState(0); // 선박 상세보기 탭메뉴 밸류
  const [shipId, setShipId] = useState(""); // 선박 상세보기를 위한 파라메터
  const [isOpen, setIsOpen] = useState(false); // 선박 상세보기를 위한 플래그
  const [nationInfo, setNationInfo] = useState(null); //선박의 국가정보 
  const [checkParameter, setCheckParameter] = useState([]); // 컨번호 조회 RESPONSE
  const [severity, setSeverity] = useState(""); // Alert 메시지 상태
  const [alertOpen, setAlertOpen] = useState(""); //// Alert Show hide 플래그
  const [toggleVessel, setToggleVessel] = useState(true); // 선박 마커 Show hide 플래그
  const [toggleTerminal, setToggleTerminal] =useState(true); //터미널 마커 Show hide 플래그
  const [togglePort, setTogglePort] = useState(true); //포트 마커 Show hide 플래그
  const [toggleCarTracking, setToggleCarTracking] = useState(true); //차량 폴리라인 Show hide 플래그
  const [toggleShipTracking, setToggleShipTracking] = useState(true); //선박 폴리라인 Show hide 플래그
  const [toggleCarTimeStamp, setToggleCarTimeStamp] = useState(false); // 차랑 타임스탬프 Show hide 마커 플래그
  const [toggleShipTimeStamp, setToggleShipTimeStamp] = useState(false); // 선박 타임스탬프 Show hide 마커 플래그
  const [checked, setChecked] = useState(true); //조회 상세정보 show hide 플래그
  const [isPortOver, setIsPortOver] = useState(false); // 포트 상세보기 Show hide 플래그
  const [errMessage, setErrMessage] = useState(""); //Alert 에러메시지 내용
  const [nationCode, setNationCode] = useState(""); //포트 국가코드
  const [nationName, setNationName] = useState("");//포트 국가명
  const [nationEname, setNationEname] = useState("");// 국가 영문명
  const [portEname, setPortEname] = useState(""); // 포트 국가영문명
  const [portName, setPortName] = useState("");  //포트명
  const [cntrList, setCntrList] = useState([]); // 유저컨테이너목록
  const [cntrChecked, setCntrChecked] = useState(true);
  //ImageSprite 선박 회전율에 따른 이미지
  const [shipRotate] = useState({
    port:{x:5,y:5,width:15,height:17},
    terminal:{x:5,y:32,width:16,height:26},
    vesselBlue:{
      rotate0:{x:131,y:5,width:18,height:38},
      rotate1:{x:131,y:53,width:27,height:41},
      rotate2:{x:131,y:104,width:34,height:41},
      rotate3:{x:131,y:155,width:39,height:39},
      rotate4:{x:131,y:204,width:41,height:34},
      rotate5:{x:131,y:248,width:41,height:27},
      rotate6:{x:131,y:285,width:43,height:22},
      rotate7:{x:131,y:313,width:41,height:27},
      rotate8:{x:131,y:350,width:41,height:34},
      rotate9:{x:131,y:394,width:39,height:39},
      rotate10:{x:131,y:443,width:34,height:41},
      rotate11:{x:131,y:494,width:27,height:41},
      rotate12:{x:131,y:545,width:18,height:38},
      rotate13:{x:131,y:593,width:27,height:42},
      rotate14:{x:131,y:645,width:35,height:42},
      rotate15:{x:131,y:697,width:40,height:40},
      rotate16:{x:131,y:747,width:42,height:27},
      rotate17:{x:131,y:784,width:42,height:35},
      rotate18:{x:131,y:829,width:39,height:18},
      rotate19:{x:131,y:857,width:42,height:27},
      rotate20:{x:131,y:894,width:42,height:35},
      rotate21:{x:131,y:939,width:40,height:40},
      rotate22:{x:131,y:989,width:35,height:42},
      rotate23:{x:131,y:1041,width:27,height:42},
    },
    vesselRed:{
        rotate0:{x:68,y:5,width:21,height:41},
        rotate1:{x:68,y:54,width:30,height:44},
        rotate2:{x:68,y:106,width:35,height:45},
        rotate3:{x:68,y:159,width:41,height:43},
        rotate4:{x:68,y:210,width:43,height:37},
        rotate5:{x:68,y:255,width:42,height:30},
        rotate6:{x:68,y:293,width:45,height:28},
        rotate7:{x:68,y:322,width:42,height:30},
        rotate8:{x:68,y:360,width:43,height:37},
        rotate9:{x:68,y:405,width:41,height:44},
        rotate10:{x:68,y:456,width:35,height:45},
        rotate11:{x:68,y:509,width:28,height:44},
        rotate12:{x:68,y:561,width:19,height:44},
        rotate13:{x:68,y:610,width:28,height:44},
        rotate14:{x:68,y:662,width:35,height:45},
        rotate15:{x:68,y:715,width:41,height:43},
        rotate16:{x:68,y:766,width:43,height:37},
        rotate17:{x:68,y:811,width:42,height:30},
        rotate18:{x:68,y:849,width:39,height:21},
        rotate19:{x:68,y:878,width:42,height:30},
        rotate20:{x:68,y:916,width:43,height:50},
        rotate21:{x:68,y:961,width:41,height:60},
        rotate22:{x:68,y:1012,width:35,height:60},
        rotate23:{x:68,y:1065,width:28,height:42},
      },
      vesselGreen:{
        rotate0:{x:5,y:5,width:18,height:38},
        rotate1:{x:5,y:53,width:27,height:41},
        rotate2:{x:5,y:104,width:34,height:41},
        rotate3:{x:5,y:155,width:39,height:39},
        rotate4:{x:5,y:204,width:41,height:34},
        rotate5:{x:5,y:248,width:41,height:27},
        rotate6:{x:5,y:285,width:38,height:18},
        rotate7:{x:5,y:313,width:41,height:27},
        rotate8:{x:5,y:350,width:41,height:34},
        rotate9:{x:5,y:394,width:39,height:39},
        rotate10:{x:5,y:443,width:34,height:41},
        rotate11:{x:5,y:494,width:27,height:41},
        rotate12:{x:5,y:545,width:18,height:38},
        rotate13:{x:5,y:593,width:28,height:42},
        rotate14:{x:5,y:645,width:35,height:43},
        rotate15:{x:5,y:698,width:41,height:41},
        rotate16:{x:5,y:749,width:43,height:35},
        rotate17:{x:5,y:794,width:42,height:28},
        rotate18:{x:5,y:832,width:39,height:19},
        rotate19:{x:5,y:861,width:42,height:28},
        rotate20:{x:5,y:899,width:43,height:35},
        rotate21:{x:5,y:944,width:41,height:41},
        rotate22:{x:5,y:995,width:35,height:43},
        rotate23:{x:5,y:1048,width:28,height:42},
      },
      vesselBrown:{
        rotate0:{x:193,y:5,width:19,height:39},
        rotate1:{x:193,y:54,width:28,height:42},
        rotate2:{x:193,y:106,width:35,height:43},
        rotate3:{x:193,y:159,width:41,height:41},
        rotate4:{x:193,y:210,width:43,height:35},
        rotate5:{x:193,y:255,width:42,height:28},
        rotate6:{x:193,y:293,width:39,height:19},
        rotate7:{x:193,y:322,width:42,height:28},
        rotate8:{x:193,y:360,width:43,height:35},
        rotate9:{x:193,y:405,width:41,height:41},
        rotate10:{x:193,y:456,width:35,height:43},
        rotate11:{x:193,y:509,width:28,height:42},
        rotate12:{x:193,y:561,width:19,height:39},
        rotate13:{x:193,y:610,width:27,height:42},
        rotate14:{x:193,y:662,width:35,height:42},
        rotate15:{x:193,y:714,width:40,height:40},
        rotate16:{x:193,y:764,width:42,height:35},
        rotate17:{x:193,y:809,width:42,height:27},
        rotate18:{x:193,y:846,width:39,height:18},
        rotate19:{x:193,y:874,width:42,height:27},
        rotate20:{x:193,y:911,width:42,height:35},
        rotate21:{x:193,y:956,width:40,height:40},
        rotate22:{x:193,y:4006,width:35,height:42},
        rotate23:{x:193,y:1058,width:27,height:42},  
      }
    })
  useEffect(() => {
    var cntrNo = "";
    window.location.search.replace(/[?&]+([^=&]+)=([^&*]*)/gi,function(str, key, value) {
      if(key ==='cntr_no') {
        cntrNo=value;
      }
    });
    if(cntrNo !== "") {
      onSearch(cntrNo);
      setKeyword(cntrNo);
    }
  },[]);

  const onToggleOpen = (param1, param2) => {
    if(props.userData){
      if(param2 !== undefined) {
        axios.post("/com/getNationName",{nationCode: param2}).then(
          res=> {
            if(res.statusText==="OK"){
              if( res.data.length !== 0) {
                setNationInfo(res.data);
              }
            }else {
              AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
            }
          }
        )
      }
      setIsOpen(!isOpen);
      setShipId(param1)

    }
  }

  const AlertMessage = (msg, svr) => {
    setErrMessage(msg);    
    setSeverity(svr); 
    setAlertOpen(true);
  }
  
  const handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
      return;
    }
    setAlertOpen(false);
  }
  const onSearch = (param) => { 
    if(props.userData){
      if(param === "") {
        AlertMessage("Container 번호를 입력해주세요.","error");
        return;
      }
      axios.post("/loc/checkCntrNumber", {param: param}).then(
        response => {
          if(response.statusText==="OK") {
            console.log(response.data)
            setCheckParameter(response.data);
            if(response.data.length !== 0) {
              axios.post("/loc/getContainerMovement",{param:response.data}).then(
                res => {
                  if(res.statusText ==="OK") {
                    if(res.data.sendMessage==="SUCCESS" && res.data.result.length !== 0 ) {
                      let tempLocation = [];
                      
                      res.data.result.forEach(element => {
                              
                        tempLocation.push({lat:element.latitude, lng:element.longitude})
                      })
                      setContainerPositions(res.data.result);
                      setTrackingPositions(tempLocation);
                    }else {
                      setContainerPositions([]);
                      setTrackingPositions([]);
                    }
                  } else {
                    AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
                  }
                }
              )
              axios.post('/com/searchship',{param:response.data[0].vsl_name}).then(
                res => {
                  if(res.statusText==="OK") {
                    if(res.data.length !== 0 ) {
                      let endDate = moment(response.data[0].end_date).format('YYYY-MM-DDT23:59:59') + 'Z'
                      let startDate = moment(response.data[0].start_date).format('YYYY-MM-DDT00:00:00')+ 'Z'
                      let tempLocation = [];

                      axios.post('/com/searchTrack',{ship:res.data.response[0].shipId,toD:endDate,fromD:startDate}).then(
                        res=> {
                          if(res.data.length !== 0 ) {
                            if(res.data.response.trackData !== null) {
                              res.data.response.trackData.forEach(element => {
                                tempLocation.push({lat:element.latitude, lng:element.longitude})
                              })
                              setShipPositions(res.data.response.trackData);
                              setPositions(tempLocation);
                              AlertMessage("조회가 완료되었습니다.","success");
                            }
                          }else {
                            setShipPositions([]);
                            setPositions([]);
                            AlertMessage("해당 선박의 이동 경로를 찾을 수 없습니다.","success");
                          }
                        }).catch(err => {
                         AlertMessage(String(err),"error");
                        });
                        setShipList(res.data.response);
                    }else {
                      AlertMessage("등록 되어있는 선박 정보를 찾을 수 없습니다.","error");
                      setShipList([]);
                    }
                  }else {
                    AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
                  }   
                }
              )
            }else {
              AlertMessage("등록 되어있는 컨테이너 번호가 없습니다.","error");
              setCheckParameter([]);
            }
          }else {
            AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
          }
        }
      )
    }else {
      AlertMessage("로그인 정보가 없습니다.","error");
    }
  }

  const onInit = () => {
    setPortCode(""); //Port상세보기 파라메터
    setShipList([]); // 선박데이터
    setPositions([]); // 선박의 이동경로 
    setShipPositions([]); // 선박 이동경로 TIME
    setTrackingPositions([]); // 내륙 이동경로
    setContainerPositions([]); //내륙 이동경로 TIME
    setMenuDisplay("none"); // 1번메뉴 show hide
    setKeyword(""); //ContainerNumber키워드
    setValue(0); // 선박 상세보기 탭메뉴 밸류
    setShipId(""); // 선박 상세보기를 위한 파라메터
    setIsOpen(false); // 선박 상세보기를 위한 플래그
    setNationInfo(null); //선박의 국가정보 
    setCheckParameter([]); // 컨번호 조회 RESPONSE 
    setToggleVessel(true); // 선박 마커 Show hide 플래그
    setToggleTerminal(true); //터미널 마커 Show hide 플래그
    setTogglePort(true);  //포트 마커 Show hide 플래그
    setToggleCarTracking(true); //차량 폴리라인 Show hide 플래그
    setToggleShipTracking(true); //선박 폴리라인 Show hide 플래그
    setToggleCarTimeStamp(false); // 차랑 타임스탬프 Show hide 마커 플래그 
    setToggleShipTimeStamp(false); // 선박 타임스탬프 Show hide 마커 플래그
    setChecked(true);    //조회 상세정보 show hide 플래그
    setCntrChecked(true); //컨번 리스트 show hide 플래그
    setIsPortOver(false); // 포트 상세보기 Show hide 플래그
    setNationCode(""); //포트 국가코드
    setNationName(""); //포트 국가명
    setNationEname(""); // 국가 영문명
    setPortEname(""); // 포트 국가영문명
    setPortName("");  //포트명
    AlertMessage("초기화 되었습니다.", "success");
  }
  
  const onPortMouseOut = (port) => {
    setIsPortOver(false);
    setPortCode(port);
    setNationCode("");
    setNationName("");
    setNationEname("");
    setPortEname("");
    setPortName("");
  }
  const onPortToggle = (param) => {
    if(props.userData){
      setIsPortOver( prev => !prev);
      setPortCode(param);

      if(param !== undefined){
        axios.post("/com/getPortLocation",{portCode:param}).then(
          res=> {
            if(res.statusText === "OK") {
              if(res.data.length > 0){
                setNationCode(res.data[0].nation_code);
                setNationName(res.data[0].nation_kname);
                setNationEname(res.data[0].nation_ename);
                setPortEname(res.data[0].port_ename);
                setPortName(res.data[0].port_name);
              }
            }else {
              AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해 주세요.","error");
            }
          }
        )
      }
    }else {
      AlertMessage("로그인 정보가 없습니다.","error");
    }
  }
  return (
    <div>
      {props.userData?(
      <MyMapComponent
        setStyle={mapStyle}
        shipList={shipList}
        menuDisplay={menuDisplay}
        locationlat={locationlat}
        locationlng={locationlng}
        keyword={keyword}
        positions={positions}
        shipRotate={shipRotate}
        checkParameter={checkParameter}
        trackingPositions={trackingPositions}
        toggleVessel={toggleVessel}
        toggleTerminal={toggleTerminal}
        toggleCarTracking={toggleCarTracking}
        toggleShipTracking={toggleShipTracking}
        checked={checked}
        cntrChecked={cntrChecked}
        togglePort={togglePort}
        isPortOver={isPortOver}
        portCode={portCode}
        nationCode={nationCode}
        nationName={nationName}
        portEname={portEname}
        portName={portName}
        nationEname={nationEname}
        value={value}
        isOpen={isOpen}
        shipId={shipId}
        nationInfo={nationInfo}
        containerPositions={containerPositions}
        shipPositions={shipPositions}
        toggleCarTimeStamp={toggleCarTimeStamp}
        toggleShipTimeStamp={toggleShipTimeStamp}
        cntrList={cntrList}
        onLocation={(lat,lng)=>{setLocationlat(lat); setLocationlng(lng);}}
        onSetMapStyle={(skin)=> setMapStyle(skin)}
        onMenuDisplay={(menu)=> setMenuDisplay(menu)}
        setKeyword={(param)=>setKeyword(param)}
        onSearch={(param) => onSearch(param)}
        onInit={() => onInit()}
        vesselToggleChange={(vsl) => setToggleVessel(!vsl)}
        terminalToggleChange={(terminal) => setToggleTerminal(!terminal)}
        shipToggleChange={(ship) => setToggleShipTracking(!ship)}
        carToggleChange={(cargo)=> setToggleCarTracking(!cargo)}
        portToggleChange={(port) => setTogglePort(!port)}
        toggleChecked={(check) => setChecked(!check)}
        cntrToggleChecked={(cntr) => setCntrChecked(!cntr)}
        onPortToggle={(port) => onPortToggle(port)}
        onPortMouseOut={(port) => onPortMouseOut(port)}
        onToggleOpen={(ship,naCode)=>onToggleOpen(ship,naCode)}
        handleChange={(param) => setValue(param)}
        carTimeStampChange={(car)=> setToggleCarTimeStamp(!car)}
        shipTimeStampChange={(ship)=> setToggleShipTimeStamp(!ship)}/>
        ):(
        <Card>
          <CardActionArea>
            <CardMedia
              style={{height:'100vh'}}
              image={googleMapLogin}
              onClick={() => props.openLogin()}
              >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{position:'absolute', top:'50%',left:'50%', marginLeft:'-150px'}}>
                  <h6>로그인 후 화물의 이동경로를 확인하세요.</h6>
                  <Button style={{position:'absolute', left:'50%', marginLeft:'-47px'}} variant="contained" color="primary">
                      LOGIN
                  </Button>
                </Typography>
              </CardContent>
            </CardMedia>
          </CardActionArea>
        </Card>
        )
      }
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert 
          onClose={handleAlertClose}
          severity={severity}>
            {errMessage}
        </Alert>
      </Snackbar>
    </div>
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

    
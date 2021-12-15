import PropTypes from 'prop-types';
import React, {useEffect, useState,Component} from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants'
import axios from 'axios';
import Draggable from 'react-draggable';
import moment from 'moment';

import MapSkin from 'components/Map/CustomMap';
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Switch,
  CardContent,
  AppBar,
  Tabs,
  Tab, //Tooltip,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  InputBase,
  Divider,
  Collapse,
  Snackbar,
  Typography,
  CardActionArea,
  CardMedia
} from '@material-ui/core';
import {
  Filter,
  //DirectionsBoat, 
  Replay,
  YoutubeSearchedFor,
  Close,
  //FindInPage,
  ArrowDownward,
  ArrowUpward
} from '@material-ui/icons';

import { red } from '@material-ui/core/colors';
import SubMap from 'components/Map/Satellite.js'

import {
  Alert as MuiAlert,
} from '@material-ui/lab';

import {
  compose,
  withProps,
  withState,
  withHandlers,
} from "recompose";
import googleMapLogin from "assets/img/googlemapNoLogin.jpg";

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
      {...other}>
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
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY + "&language=en&region=KR",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width: '100%', height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('zoom', 'onZoomChange', 2),
  withState('center', 'onCenterChange', { lat: 36.431748, lng: 127.384496 }),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom());
      },
      onDragEnd: ({ onCenterChange }) => () => {
        onCenterChange(refs.map.getCenter());
      },
      onSelectShip: ({ onZoomChange, onCenterChange }) => (param1, param2) => {
        onCenterChange({ lat: param1, lng: param2 });
        onZoomChange(14);
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap

    ref={props.onMapMounted}
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
    onZoomChanged={props.onZoomChanged}
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
    onDragEnd={props.onDragEnd}
    onMouseMove={(e) => { props.onLocation(e.latLng.lat(), e.latLng.lng()) }}
    onClick={() => { props.onToggleOpen(); props.onPortToggle(); }}
    style={{ width: '100%', height: `400px` }}>
    {props.shipList.length !== 0 &&
      <MapControl position={window.google.maps.ControlPosition.LEFT_TOP}>
        <Collapse in={props.checked} collapsedHeight={26}>
          <Paper component="form" style={{ alignItems: 'center', maxWidth: 300, height: '100%' }}>
            {props.checked === true ? (
              <IconButton onClick={() => props.toggleChecked(props.checked)} style={{ width: '100%', height: 12 }} color="primary">
                <ArrowUpward />
              </IconButton>
            ) : (
                <IconButton onClick={() => props.toggleChecked(props.checked)} style={{ width: '100%', height: 12 }} color="primary">
                  <ArrowDownward />
                </IconButton>
              )}
            <div style={{ width: '100%', textAlignLast: 'center' }}>
              <span style={{ fontSize: '16px' }}>검색 결과</span>
            </div>
            <Divider style={{ height: 3, margin: 5 }} orientation="horizontal"></Divider>
            <List style={{ maxWidth: 500, maxHeight: 400, backgroundColor: 'white', overflow: 'auto' }}>
              {props.shipList.map((element, index) => {
                if (element.position !== null) {
                  return (
                    <ListItem key={index} role={undefined} dense button onClick={() => props.onSelectShip(element.position.latitude, element.position.longitude)}>
                      <ListItemText id={index} primary={element.shipName} />
                    </ListItem>
                  )
                } else {
                  return (
                    <ListItem key={index} role={undefined} dense button onClick={() => props.AlertMessage("해당 선박의 위치를 찾을 수 없습니다.", "error")}>
                      <ListItemText id={index} primary={element.shipName} />
                    </ListItem>
                  )
                }
              })}
            </List>
          </Paper>
        </Collapse>
      </MapControl>}
    <MapControl position={window.google.maps.ControlPosition.RIGHT_BOTTOM}>
      <span>Zoom Level : {props.zoom}</span>
    </MapControl>
    <MapControl position={window.google.maps.ControlPosition.RIGHT_BOTTOM}>
      <span>{props.locationlat.toFixed(4)} , {props.locationlng.toFixed(4)}</span>
    </MapControl>

    <MapControl position={window.google.maps.ControlPosition.RIGHT_TOP}>
      <Paper component="form" style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <InputBase
          style={{ flex: 1 }}
          placeholder=" Ship Name & IMO No "
          value={props.keyword}
          inputProps={{
            onChange: event => props.setKeyword(event.target.value)
          }}>
        </InputBase>
        <IconButton color="primary" onClick={() => props.onPathChange(props.keyword)}>
          <YoutubeSearchedFor></YoutubeSearchedFor>
        </IconButton>
        <Divider style={{ height: 28, margin: 4 }} orientation="vertical"></Divider>
        <IconButton color="primary" onClick={() => props.onInit()}>
          <Replay />
        </IconButton>
        <Divider style={{ height: 28, margin: 4 }} orientation="vertical"></Divider>
        <IconButton
          color="secondary"
          onClick={() => {
            if (props.menuDisplay === "none") {
              props.onMenuDisplay("block");
            } else {
              props.onMenuDisplay("none");
            }
          }}>
          <Filter />
        </IconButton>
        <Divider style={{ height: 28, margin: 4 }} orientation="vertical"></Divider>
        <Switch
          // defaultChecked
          onChange={e => props.onMarkerVisible(e.target.checked)}
          value={props.markerVisible} />
      </Paper>
    </MapControl>
    <MapControl position={window.google.maps.ControlPosition.RIGHT_TOP}>
      <div style={{ display: 'inline-block', backgroundColor: "#ffffff", marginTop: "10px", marginRight: "5px", borderRadius: '15px' }}>
        <div style={{ display: props.menuDisplay }}>
          <img style={{ marginLeft: "20px" }} alt="dark" src={require("assets/img/googleMap/dark.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleDark)} />
          <img style={{ marginLeft: "5px" }} alt="aubergine" src={require("assets/img/googleMap/aubergine.png")} onClick={() => props.onSetMapStyle(MapSkin.MapAubergine)} />
          <img style={{ marginLeft: "5px" }} alt="night" src={require("assets/img/googleMap/night.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleNight)} />
          <img style={{ marginLeft: "5px" }} alt="retro" src={require("assets/img/googleMap/retro.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleRetro)} />
          <img style={{ marginLeft: "5px" }} alt="silver" src={require("assets/img/googleMap/silver.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleSilver)} />
          <img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/googleMap/normal.png")} onClick={() => props.onSetMapStyle([])} />
        </div>
      </div>
    </MapControl>
    <MapControl position={window.google.maps.ControlPosition.LEFT_BOTTOM}>
      <div style={{ display: 'inline-block', marginBottom: "10px", marginLeft: "5px", borderRadius: '15px' }}>
        <span>CARGO</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;<img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/vsl_blue.png")} /><br></br>
        <span>CONTAINER : </span><img style={{ marginLeft: "5px", marginRight: "20px" }} alt={"normal"} src={require("assets/img/vsl_brown.png")} /><br></br>
        <span>BULK</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;<img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/vsl_green.png")} /><br></br>
        <span>ETC</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;<img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/vsl_red.png")} />
      </div>
    </MapControl>
    {props.portLocation.length !== 0 &&
      props.portLocation.map((data, index) => {
        return (
          <Marker
            key={index}
            draggable={false}
            defaultVisible={props.markerVisible}
            visible={props.markerVisible}
            position={{ lat: data.wgs84_y, lng: data.wgs84_x }}
            icon={{
              url: require('assets/img/MapSprite1.png'),
              size: {
                width: props.shipRotate.port.width,
                height: props.shipRotate.port.height
              },
              origin: {
                x: props.shipRotate.port.x,
                y: props.shipRotate.port.y
              }
            }}
            onClick={() => props.onPortToggle(data.port_code)}>
            {props.isPortOver && data.port_code === props.portCode && (
              <MapControl position={window.google.maps.ControlPosition.BOTTOM_CENTER}>
                <Card style={{ marginBottom: "50px", minWidth: 400, maxWidth: 500 }}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe" style={{ backgroundColor: red[500] }}>{data.nation_code}</Avatar>}
                    title={data.nation_ename}
                    subheader={data.nation_kname}
                    action={
                      <IconButton onClick={() => props.onPortMouseOut(data.port_code)}>
                        <Close />
                      </IconButton>}>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <SubMap parameter={data} gubun="port" />
                    </div>
                    <span>Port : {data.port_code}<br></br></span>
                    <span> Port Nation : {data.nation_code}<br></br></span>
                    <span> Port EngName : {data.port_ename}<br></br></span>
                    <span>Port Name : {data.port_name}<br></br></span>
                  </CardContent>
                </Card>
              </MapControl>
            )}
          </Marker>
        )
      })
    }
    {props.shipList.length !== 0 && (props.shipList.map((data, index) => {
      if (data.position !== null) {
        return (
          //
          <Marker
            key={index}
            draggable={false}
            position={{ lat: data.position.latitude, lng: data.position.longitude }} // 마커 위치 설정 {lat: ,lng: }   
            icon={{
              url: require('assets/img/newsprite.png'),
              size: {
                width: data.shipType === "CARGO" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBlue.rotate0.width : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBlue.rotate1.width : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBlue.rotate2.width : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBlue.rotate3.width : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBlue.rotate4.width : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBlue.rotate5.width : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBlue.rotate6.width : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBlue.rotate7.width : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBlue.rotate8.width : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBlue.rotate9.width : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBlue.rotate10.width : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBlue.rotate11.width : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBlue.rotate12.width : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBlue.rotate13.width : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBlue.rotate14.width : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBlue.rotate15.width : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBlue.rotate16.width : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBlue.rotate17.width : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBlue.rotate18.width : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBlue.rotate19.width : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBlue.rotate20.width : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBlue.rotate21.width : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBlue.rotate22.width : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBlue.rotate23.width : props.shipRotate.vesselBlue.rotate6.width) : data.shipType === "CONTAINER" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBrown.rotate0.width : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBrown.rotate1.width : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBrown.rotate2.width : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBrown.rotate3.width : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBrown.rotate4.width : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBrown.rotate5.width : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBrown.rotate6.width : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBrown.rotate7.width : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBrown.rotate8.width : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBrown.rotate9.width : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBrown.rotate10.width : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBrown.rotate11.width : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBrown.rotate12.width : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBrown.rotate13.width : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBrown.rotate14.width : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBrown.rotate15.width : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBrown.rotate16.width : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBrown.rotate17.width : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBrown.rotate18.width : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBrown.rotate19.width : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBrown.rotate20.width : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBrown.rotate21.width : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBrown.rotate22.width : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBrown.rotate23.width : props.shipRotate.vesselBrown.rotate6.width) : data.shipType === "BULK" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselGreen.rotate0.width : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselGreen.rotate1.width : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselGreen.rotate2.width : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselGreen.rotate3.width : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselGreen.rotate4.width : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselGreen.rotate5.width : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselGreen.rotate6.width : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselGreen.rotate7.width : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselGreen.rotate8.width : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselGreen.rotate9.width : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselGreen.rotate10.width : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselGreen.rotate11.width : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselGreen.rotate12.width : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselGreen.rotate13.width : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselGreen.rotate14.width : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselGreen.rotate15.width : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselGreen.rotate16.width : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselGreen.rotate17.width : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselGreen.rotate18.width : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselGreen.rotate19.width : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselGreen.rotate20.width : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselGreen.rotate21.width : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselGreen.rotate22.width : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselGreen.rotate23.width : props.shipRotate.vesselGreen.rotate6.width) : ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselRed.rotate0.width : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselRed.rotate1.width : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselRed.rotate2.width : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselRed.rotate3.width : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselRed.rotate4.width : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselRed.rotate5.width : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselRed.rotate6.width : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselRed.rotate7.width : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselRed.rotate8.width : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselRed.rotate9.width : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselRed.rotate10.width : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselRed.rotate11.width : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselRed.rotate12.width : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselRed.rotate13.width : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselRed.rotate14.width : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselRed.rotate15.width : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselRed.rotate16.width : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselRed.rotate17.width : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselRed.rotate18.width : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselRed.rotate19.width : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselRed.rotate20.width : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselRed.rotate21.width : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselRed.rotate22.width : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselRed.rotate23.width : props.shipRotate.vesselRed.rotate6.width),
                height: data.shipType === "CARGO" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBlue.rotate0.height : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBlue.rotate1.height : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBlue.rotate2.height : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBlue.rotate3.height : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBlue.rotate4.height : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBlue.rotate5.height : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBlue.rotate6.height : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBlue.rotate7.height : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBlue.rotate8.height : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBlue.rotate9.height : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBlue.rotate10.height : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBlue.rotate11.height : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBlue.rotate12.height : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBlue.rotate13.height : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBlue.rotate14.height : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBlue.rotate15.height : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBlue.rotate16.height : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBlue.rotate17.height : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBlue.rotate18.height : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBlue.rotate19.height : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBlue.rotate20.height : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBlue.rotate21.height : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBlue.rotate22.height : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBlue.rotate23.height : props.shipRotate.vesselBlue.rotate6.height) : data.shipType === "CONTAINER" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBrown.rotate0.height : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBrown.rotate1.height : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBrown.rotate2.height : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBrown.rotate3.height : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBrown.rotate4.height : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBrown.rotate5.height : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBrown.rotate6.height : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBrown.rotate7.height : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBrown.rotate8.height : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBrown.rotate9.height : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBrown.rotate10.height : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBrown.rotate11.height : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBrown.rotate12.height : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBrown.rotate13.height : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBrown.rotate14.height : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBrown.rotate15.height : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBrown.rotate16.height : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBrown.rotate17.height : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBrown.rotate18.height : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBrown.rotate19.height : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBrown.rotate20.height : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBrown.rotate21.height : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBrown.rotate22.height : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBrown.rotate23.height : props.shipRotate.vesselBrown.rotate6.height) : data.shipType === "BULK" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselGreen.rotate0.height : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselGreen.rotate1.height : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselGreen.rotate2.height : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselGreen.rotate3.height : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselGreen.rotate4.height : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselGreen.rotate5.height : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselGreen.rotate6.height : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselGreen.rotate7.height : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselGreen.rotate8.height : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselGreen.rotate9.height : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselGreen.rotate10.height : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselGreen.rotate11.height : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselGreen.rotate12.height : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselGreen.rotate13.height : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselGreen.rotate14.height : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselGreen.rotate15.height : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselGreen.rotate16.height : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselGreen.rotate17.height : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselGreen.rotate18.height : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselGreen.rotate19.height : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselGreen.rotate20.height : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselGreen.rotate21.height : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselGreen.rotate22.height : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselGreen.rotate23.height : props.shipRotate.vesselGreen.rotate6.height) : ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselRed.rotate0.height : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselRed.rotate1.height : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselRed.rotate2.height : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselRed.rotate3.height : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselRed.rotate4.height : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselRed.rotate5.height : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselRed.rotate6.height : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselRed.rotate7.height : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselRed.rotate8.height : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselRed.rotate9.height : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselRed.rotate10.height : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselRed.rotate11.height : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselRed.rotate12.height : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselRed.rotate13.height : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselRed.rotate14.height : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselRed.rotate15.height : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselRed.rotate16.height : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselRed.rotate17.height : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselRed.rotate18.height : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselRed.rotate19.height : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselRed.rotate20.height : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselRed.rotate21.height : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselRed.rotate22.height : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselRed.rotate23.height : props.shipRotate.vesselRed.rotate6.height),
              },
              origin: {
                x: data.shipType === "CARGO" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBlue.rotate0.x : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBlue.rotate1.x : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBlue.rotate2.x : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBlue.rotate3.x : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBlue.rotate4.x : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBlue.rotate5.x : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBlue.rotate6.x : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBlue.rotate7.x : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBlue.rotate8.x : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBlue.rotate9.x : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBlue.rotate10.x : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBlue.rotate11.x : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBlue.rotate12.x : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBlue.rotate13.x : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBlue.rotate14.x : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBlue.rotate15.x : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBlue.rotate16.x : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBlue.rotate17.x : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBlue.rotate18.x : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBlue.rotate19.x : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBlue.rotate20.x : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBlue.rotate21.x : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBlue.rotate22.x : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBlue.rotate23.x : props.shipRotate.vesselBlue.rotate6.x) : data.shipType === "CONTAINER" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBrown.rotate0.x : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBrown.rotate1.x : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBrown.rotate2.x : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBrown.rotate3.x : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBrown.rotate4.x : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBrown.rotate5.x : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBrown.rotate6.x : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBrown.rotate7.x : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBrown.rotate8.x : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBrown.rotate9.x : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBrown.rotate10.x : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBrown.rotate11.x : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBrown.rotate12.x : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBrown.rotate13.x : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBrown.rotate14.x : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBrown.rotate15.x : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBrown.rotate16.x : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBrown.rotate17.x : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBrown.rotate18.x : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBrown.rotate19.x : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBrown.rotate20.x : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBrown.rotate21.x : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBrown.rotate22.x : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBrown.rotate23.x : props.shipRotate.vesselBrown.rotate6.x) : data.shipType === "BULK" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselGreen.rotate0.x : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselGreen.rotate1.x : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselGreen.rotate2.x : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselGreen.rotate3.x : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselGreen.rotate4.x : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselGreen.rotate5.x : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselGreen.rotate6.x : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselGreen.rotate7.x : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselGreen.rotate8.x : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselGreen.rotate9.x : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselGreen.rotate10.x : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselGreen.rotate11.x : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselGreen.rotate12.x : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselGreen.rotate13.x : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselGreen.rotate14.x : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselGreen.rotate15.x : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselGreen.rotate16.x : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselGreen.rotate17.x : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselGreen.rotate18.x : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselGreen.rotate19.x : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselGreen.rotate20.x : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselGreen.rotate21.x : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselGreen.rotate22.x : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselGreen.rotate23.x : props.shipRotate.vesselGreen.rotate6.x) : ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselRed.rotate0.x : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselRed.rotate1.x : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselRed.rotate2.x : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselRed.rotate3.x : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselRed.rotate4.x : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselRed.rotate5.x : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselRed.rotate6.x : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselRed.rotate7.x : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselRed.rotate8.x : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselRed.rotate9.x : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselRed.rotate10.x : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselRed.rotate11.x : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselRed.rotate12.x : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselRed.rotate13.x : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselRed.rotate14.x : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselRed.rotate15.x : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselRed.rotate16.x : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselRed.rotate17.x : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselRed.rotate18.x : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselRed.rotate19.x : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselRed.rotate20.x : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselRed.rotate21.x : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselRed.rotate22.x : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselRed.rotate23.x : props.shipRotate.vesselRed.rotate6.x),
                y: data.shipType === "CARGO" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBlue.rotate0.y : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBlue.rotate1.y : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBlue.rotate2.y : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBlue.rotate3.y : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBlue.rotate4.y : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBlue.rotate5.y : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBlue.rotate6.y : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBlue.rotate7.y : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBlue.rotate8.y : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBlue.rotate9.y : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBlue.rotate10.y : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBlue.rotate11.y : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBlue.rotate12.y : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBlue.rotate13.y : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBlue.rotate14.y : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBlue.rotate15.y : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBlue.rotate16.y : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBlue.rotate17.y : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBlue.rotate18.y : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBlue.rotate19.y : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBlue.rotate20.y : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBlue.rotate21.y : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBlue.rotate22.y : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBlue.rotate23.y : props.shipRotate.vesselBlue.rotate6.y) : data.shipType === "CONTAINER" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselBrown.rotate0.y : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselBrown.rotate1.y : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselBrown.rotate2.y : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselBrown.rotate3.y : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselBrown.rotate4.y : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselBrown.rotate5.y : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselBrown.rotate6.y : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselBrown.rotate7.y : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselBrown.rotate8.y : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselBrown.rotate9.y : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselBrown.rotate10.y : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselBrown.rotate11.y : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselBrown.rotate12.y : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselBrown.rotate13.y : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselBrown.rotate14.y : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselBrown.rotate15.y : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselBrown.rotate16.y : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselBrown.rotate17.y : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselBrown.rotate18.y : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselBrown.rotate19.y : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselBrown.rotate20.y : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselBrown.rotate21.y : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselBrown.rotate22.y : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselBrown.rotate23.y : props.shipRotate.vesselBrown.rotate6.y) : data.shipType === "BULK" ? ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselGreen.rotate0.y : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselGreen.rotate1.y : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselGreen.rotate2.y : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselGreen.rotate3.y : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselGreen.rotate4.y : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselGreen.rotate5.y : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselGreen.rotate6.y : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselGreen.rotate7.y : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselGreen.rotate8.y : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselGreen.rotate9.y : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselGreen.rotate10.y : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselGreen.rotate11.y : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselGreen.rotate12.y : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselGreen.rotate13.y : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselGreen.rotate14.y : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselGreen.rotate15.y : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselGreen.rotate16.y : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselGreen.rotate17.y : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselGreen.rotate18.y : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselGreen.rotate19.y : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselGreen.rotate20.y : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselGreen.rotate21.y : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselGreen.rotate22.y : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselGreen.rotate23.y : props.shipRotate.vesselGreen.rotate6.y) : ((data.position.courseOverGround > 0 && data.position.courseOverGround <= 15) ? props.shipRotate.vesselRed.rotate0.y : (data.position.courseOverGround > 15 && data.position.courseOverGround <= 30) ? props.shipRotate.vesselRed.rotate1.y : (data.position.courseOverGround > 30 && data.position.courseOverGround <= 45) ? props.shipRotate.vesselRed.rotate2.y : (data.position.courseOverGround > 45 && data.position.courseOverGround <= 60) ? props.shipRotate.vesselRed.rotate3.y : (data.position.courseOverGround > 60 && data.position.courseOverGround <= 75) ? props.shipRotate.vesselRed.rotate4.y : (data.position.courseOverGround > 75 && data.position.courseOverGround <= 90) ? props.shipRotate.vesselRed.rotate5.y : (data.position.courseOverGround > 90 && data.position.courseOverGround <= 105) ? props.shipRotate.vesselRed.rotate6.y : (data.position.courseOverGround > 105 && data.position.courseOverGround <= 120) ? props.shipRotate.vesselRed.rotate7.y : (data.position.courseOverGround > 120 && data.position.courseOverGround <= 135) ? props.shipRotate.vesselRed.rotate8.y : (data.position.courseOverGround > 135 && data.position.courseOverGround <= 150) ? props.shipRotate.vesselRed.rotate9.y : (data.position.courseOverGround > 150 && data.position.courseOverGround <= 165) ? props.shipRotate.vesselRed.rotate10.y : (data.position.courseOverGround > 165 && data.position.courseOverGround <= 180) ? props.shipRotate.vesselRed.rotate11.y : (data.position.courseOverGround > 180 && data.position.courseOverGround <= 195) ? props.shipRotate.vesselRed.rotate12.y : (data.position.courseOverGround < 195 && data.position.courseOverGround <= 210) ? props.shipRotate.vesselRed.rotate13.y : (data.position.courseOverGround > 210 && data.position.courseOverGround <= 225) ? props.shipRotate.vesselRed.rotate14.y : (data.position.courseOverGround > 225 && data.position.courseOverGround <= 240) ? props.shipRotate.vesselRed.rotate15.y : (data.position.courseOverGround > 240 && data.position.courseOverGround <= 255) ? props.shipRotate.vesselRed.rotate16.y : (data.position.courseOverGround > 255 && data.position.courseOverGround <= 270) ? props.shipRotate.vesselRed.rotate17.y : (data.position.courseOverGround > 270 && data.position.courseOverGround <= 285) ? props.shipRotate.vesselRed.rotate18.y : (data.position.courseOverGround > 285 && data.position.courseOverGround <= 300) ? props.shipRotate.vesselRed.rotate19.y : (data.position.courseOverGround > 300 && data.position.courseOverGround <= 315) ? props.shipRotate.vesselRed.rotate20.y : (data.position.courseOverGround > 315 && data.position.courseOverGround <= 330) ? props.shipRotate.vesselRed.rotate21.y : (data.position.courseOverGround > 330 && data.position.courseOverGround <= 345) ? props.shipRotate.vesselRed.rotate22.y : (data.position.courseOverGround > 345 && data.position.courseOverGround <= 360) ? props.shipRotate.vesselRed.rotate23.y : props.shipRotate.vesselRed.rotate6.y),
              }
            }}
            title={data.shipName}
            onClick={() => { props.onToggleOpen(data.shipId, data.nationCode)}}>

            {props.isOpen && data.shipId === props.shipId && (
            <MapControl position={window.google.maps.ControlPosition.BOTTOM_CENTER}>
              <Draggable
                grid={[50, 50]}>
                <Card style={{ marginBottom: "50px", minWidth: 400, maxWidth: 500 }}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe" style={{ backgroundColor: red[500] }}>{data.nationCode}</Avatar>}
                    title={data.imoNo}
                    subheader={data.shipName}
                    action={
                      <IconButton onClick={() => props.onToggleOpen(data.shipId)}>
                        <Close />
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
                        <Tab style={{ width: '33%' }} label="Zoom"></Tab>
                        <Tab style={{ width: '33%' }} label="Info"></Tab>
                        <Tab style={{ width: '33%' }} label="Track"></Tab>
                      </Tabs>
                    </AppBar>
                    <TabPanel value={props.value} index={0} style={{ height: '250px' }}>
                      <SubMap parameter={data} gubun="ship" />
                    </TabPanel>
                    <TabPanel value={props.value} index={1} style={{ height: '250px' }}>
                      <h4>IMO : {data.imoNo}</h4>
                      <h4>SHIP NAME : {data.shipName}</h4>
                      <h4>SHIP TYPE : {data.shipType}</h4>
                      <h4>Destination : {data.destination}</h4>
                      <h4>nation : {props.nationInfo !== null ? props.nationInfo[0].nation_kname + '(' + data.nationCode + ')' : data.nationCode}</h4>
                    </TabPanel>
                    <TabPanel value={props.value} index={2} style={{ height: '250px' }}>
                      <Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <CalendarBox
                              labelText="From"
                              id="fromDate"
                              variant="inline"
                              format="yyyy-MM-dd"
                              //inputVariant="outlined"
                              //margin="dense"
                              setValue={props.fromDate}
                              autoOk
                              onChangeValue={date => props.setFromDate(date)} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <CalendarBox
                              labelText="to"
                              id="toDate"
                              variant="inline"
                              format="yyyy-MM-dd"
                              style={{ width: '40%' }}
                              //inputVariant="outlined"
                              //margin="dense"
                              setValue={props.toDate}
                              autoOk
                              onChangeValue={date => props.setToDate(date)} />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={12}>
                            <Button onClick={() => props.onTrackingSearch(data.shipId, props.fromDate, props.toDate)} style={{ width: '100%' }}>Search</Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                  </CardContent>
                </Card>
              </Draggable>
            </MapControl>
             )}
          </Marker>
        )
      }else {
        return(
          null
        )
      }
    }))}

    <Polyline
      path={props.positions}
      geodesic={false}
      options={{
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 1,
        geodesic: false,
        icons: [{
          icon: {
            path: 1,
            strokeColor: '#0000FF'
          },
          offset: '2',
          repeat: '50px'
        }]
      }}
    />
  </GoogleMap>
));

export default function ShipMap(props) {
  const [checked, setChecked] = useState(false);
  const [mapStyle, setMapStyle] = useState([]);
  const [locationLat, setLocationLat] = useState(0);
  const [locationLng, setLocationLng] = useState(0);
  const [markerVisible, setMarkerVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPortOver, setIsPortOver] = useState(false);
  const [portCode, setPortCode] = useState("");
  const [portLocation, setPortLocation] = useState([]);
  const [shipList, setShipList] = useState([]);
  const [positions, setPositions] = useState([]);
  const [menuDisplay , setMenuDisplay] = useState("none");
  const [keyword, setKeyword] = useState("SHIP");
  const [value, setValue] = useState(0);
  const [severity ,setSeverity] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false); 
  const [shipId, setShipId] = useState("");
  const [fromDate ,setFromDate] = useState(null);  
  const [toDate, setToDate] = useState(null);
  const [nationInfo, setNationInfo] = useState(null);
  const [shipRotate] = useState({
    port: { x: 5, y: 5, width: 15, height: 17 },
    terminal: { x: 5, y: 32, width: 16, height: 26 },
    vesselBlue: {
      rotate0: { x: 131, y: 5, width: 18, height: 38 },
      rotate1: { x: 131, y: 53, width: 27, height: 41 },
      rotate2: { x: 131, y: 104, width: 34, height: 41 },
      rotate3: { x: 131, y: 155, width: 39, height: 39 },
      rotate4: { x: 131, y: 204, width: 41, height: 34 },
      rotate5: { x: 131, y: 248, width: 41, height: 27 },
      rotate6: { x: 131, y: 285, width: 43, height: 22 },
      rotate7: { x: 131, y: 313, width: 41, height: 27 },
      rotate8: { x: 131, y: 350, width: 41, height: 34 },
      rotate9: { x: 131, y: 394, width: 39, height: 39 },
      rotate10: { x: 131, y: 443, width: 34, height: 41 },
      rotate11: { x: 131, y: 494, width: 27, height: 41 },
      rotate12: { x: 131, y: 545, width: 18, height: 38 },
      rotate13: { x: 131, y: 593, width: 27, height: 42 },
      rotate14: { x: 131, y: 645, width: 35, height: 42 },
      rotate15: { x: 131, y: 697, width: 40, height: 40 },
      rotate16: { x: 131, y: 747, width: 42, height: 27 },
      rotate17: { x: 131, y: 784, width: 42, height: 35 },
      rotate18: { x: 131, y: 829, width: 39, height: 18 },
      rotate19: { x: 131, y: 857, width: 42, height: 27 },
      rotate20: { x: 131, y: 894, width: 42, height: 35 },
      rotate21: { x: 131, y: 939, width: 40, height: 40 },
      rotate22: { x: 131, y: 989, width: 35, height: 42 },
      rotate23: { x: 131, y: 1041, width: 27, height: 42 },
    },
    vesselRed: {
      rotate0: { x: 68, y: 5, width: 21, height: 41 },
      rotate1: { x: 68, y: 54, width: 30, height: 44 },
      rotate2: { x: 68, y: 106, width: 35, height: 45 },
      rotate3: { x: 68, y: 159, width: 41, height: 43 },
      rotate4: { x: 68, y: 210, width: 43, height: 37 },
      rotate5: { x: 68, y: 255, width: 42, height: 30 },
      rotate6: { x: 68, y: 293, width: 45, height: 28 },
      rotate7: { x: 68, y: 322, width: 42, height: 30 },
      rotate8: { x: 68, y: 360, width: 43, height: 37 },
      rotate9: { x: 68, y: 405, width: 41, height: 44 },
      rotate10: { x: 68, y: 456, width: 35, height: 45 },
      rotate11: { x: 68, y: 509, width: 28, height: 44 },
      rotate12: { x: 68, y: 561, width: 19, height: 44 },
      rotate13: { x: 68, y: 610, width: 28, height: 44 },
      rotate14: { x: 68, y: 662, width: 35, height: 45 },
      rotate15: { x: 68, y: 715, width: 41, height: 43 },
      rotate16: { x: 68, y: 766, width: 43, height: 37 },
      rotate17: { x: 68, y: 811, width: 42, height: 30 },
      rotate18: { x: 68, y: 849, width: 39, height: 21 },
      rotate19: { x: 68, y: 878, width: 42, height: 30 },
      rotate20: { x: 68, y: 916, width: 43, height: 50 },
      rotate21: { x: 68, y: 961, width: 41, height: 60 },
      rotate22: { x: 68, y: 1012, width: 35, height: 60 },
      rotate23: { x: 68, y: 1065, width: 28, height: 42 },
    },
    vesselGreen: {
      rotate0: { x: 5, y: 5, width: 18, height: 38 },
      rotate1: { x: 5, y: 53, width: 27, height: 41 },
      rotate2: { x: 5, y: 104, width: 34, height: 41 },
      rotate3: { x: 5, y: 155, width: 39, height: 39 },
      rotate4: { x: 5, y: 204, width: 41, height: 34 },
      rotate5: { x: 5, y: 248, width: 41, height: 27 },
      rotate6: { x: 5, y: 285, width: 38, height: 18 },
      rotate7: { x: 5, y: 313, width: 41, height: 27 },
      rotate8: { x: 5, y: 350, width: 41, height: 34 },
      rotate9: { x: 5, y: 394, width: 39, height: 39 },
      rotate10: { x: 5, y: 443, width: 34, height: 41 },
      rotate11: { x: 5, y: 494, width: 27, height: 41 },
      rotate12: { x: 5, y: 545, width: 18, height: 38 },
      rotate13: { x: 5, y: 593, width: 28, height: 42 },
      rotate14: { x: 5, y: 645, width: 35, height: 43 },
      rotate15: { x: 5, y: 698, width: 41, height: 41 },
      rotate16: { x: 5, y: 749, width: 43, height: 35 },
      rotate17: { x: 5, y: 794, width: 42, height: 28 },
      rotate18: { x: 5, y: 832, width: 39, height: 19 },
      rotate19: { x: 5, y: 861, width: 42, height: 28 },
      rotate20: { x: 5, y: 899, width: 43, height: 35 },
      rotate21: { x: 5, y: 944, width: 41, height: 41 },
      rotate22: { x: 5, y: 995, width: 35, height: 43 },
      rotate23: { x: 5, y: 1048, width: 28, height: 42 },
    },
    vesselBrown: {
      rotate0: { x: 193, y: 5, width: 19, height: 39 },
      rotate1: { x: 193, y: 54, width: 28, height: 42 },
      rotate2: { x: 193, y: 106, width: 35, height: 43 },
      rotate3: { x: 193, y: 159, width: 41, height: 41 },
      rotate4: { x: 193, y: 210, width: 43, height: 35 },
      rotate5: { x: 193, y: 255, width: 42, height: 28 },
      rotate6: { x: 193, y: 293, width: 39, height: 19 },
      rotate7: { x: 193, y: 322, width: 42, height: 28 },
      rotate8: { x: 193, y: 360, width: 43, height: 35 },
      rotate9: { x: 193, y: 405, width: 41, height: 41 },
      rotate10: { x: 193, y: 456, width: 35, height: 43 },
      rotate11: { x: 193, y: 509, width: 28, height: 42 },
      rotate12: { x: 193, y: 561, width: 19, height: 39 },
      rotate13: { x: 193, y: 610, width: 27, height: 42 },
      rotate14: { x: 193, y: 662, width: 35, height: 42 },
      rotate15: { x: 193, y: 714, width: 40, height: 40 },
      rotate16: { x: 193, y: 764, width: 42, height: 35 },
      rotate17: { x: 193, y: 809, width: 42, height: 27 },
      rotate18: { x: 193, y: 846, width: 39, height: 18 },
      rotate19: { x: 193, y: 874, width: 42, height: 27 },
      rotate20: { x: 193, y: 911, width: 42, height: 35 },
      rotate21: { x: 193, y: 956, width: 40, height: 40 },
      rotate22: { x: 193, y: 4006, width: 35, height: 42 },
      rotate23: { x: 193, y: 1058, width: 27, height: 42 },
    }}
  )

  useEffect(() => {
    if(props.userData){
      axios.post("/com/getPortLocation", { portCode: "" }).then(
        res => {
          if(res.statusText ==="OK"){
            if (res.data.length !== 0) {
              setPortLocation(res.data);
            }
          }else {
            AlertMessage("조회 할 수 없습니다. 잠시후 다시 시도해 주세요.","error");
          }
        });

      axios.post('/com/searchship', { param: "SHIP" }).then(
        res => {
          if(res.statusText==="OK"){
            if (res.data.length !== 0) {
                setShipList(res.data.response);
            }
          }else {
            AlertMessage("조회 할 수 없습니다. 잠시후 다시 시도해 주세요.","error");
          }
        })
    }else {
      AlertMessage("로그인 정보가 없습니다.","error");
    }
  },[])

  const AlertMessage = (msg, svr) => {
    setErrMessage(msg);    
    setSeverity(svr); 
    setAlertOpen(true);
  }
  
  const onToggleOpen = (param1, param2) => {
    if(props.userData){
      if (param2 !== undefined) {
        axios.post("/com/getNationName", { nationCode: param2 }).then(
          res => {
            if(res.statusText==="OK"){
              if (res.data.length !== 0) {
                setNationInfo(res.data);
              }
            }else {
              AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해주세요.","error");
            }
          }
        )
      setIsOpen(true);
      setShipId(param1);
      }else {
        setIsOpen(false);
      }
      
    }else {
      AlertMessage("로그인 정보가 없습니다.","error");
    }
  }
  

  const onPathChange = (keyword) => {
    if(props.userData){
      axios.post('/com/searchship', { param: keyword }).then(
        res => {
          if (res.data.length !== 0) {
            setShipList(res.data.response);
          }
      })
    }else {
      AlertMessage("로그인 정보가 없습니다.","error");
    }
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  }


  const onTrackingSearch = (shipId, paramfromDate, paramtoDate) => {
    if(props.userData){
    setPositions([])
    let fromDate = moment(paramfromDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    let toDate = moment(paramtoDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    let tempLocation = [];
    
    axios.post('/com/searchTrack', { ship: shipId, toD: toDate, fromD: fromDate }).then(
      res => {
        if (res.data.length !== 0) {
          if (res.data.response.trackData !== null) {
            res.data.response.trackData.forEach(element => {
              tempLocation.push({ lat: element.latitude, lng: element.longitude })
            })
          setPositions(tempLocation);
        }
      }
      }).catch(err => {
        AlertMessage(String(err),"error");
      });
    }else{
      AlertMessage("로그인 정보가 없습니다.","error");
    } 
  }
  return (
    <div>
      {props.userData ? (
        <MyMapComponent
          portLocation={portLocation}
          setStyle={mapStyle}
          shipList={shipList}
          markerVisible={markerVisible}
          isPortOver={isPortOver}
          portCode={portCode}
          menuDisplay={menuDisplay}
          locationlat={locationLat}
          locationlng={locationLng}
          keyword={keyword}
          isOpen={isOpen}
          shipId={shipId}
          value={value}
          fromDate={fromDate}
          toDate={toDate}
          positions={positions}
          nationInfo={nationInfo}
          shipRotate={shipRotate}
          checked={checked}
          onPathChange={(keyword) =>onPathChange(keyword)}
          onTrackingSearch={(ship, from, to)=> onTrackingSearch(ship, from, to)}
          onLocation={(lat,lng) => {setLocationLat(lat);setLocationLng(lng);}}
          setKeyword={(keyword) => setKeyword(keyword)}
          onMarkerVisible={(visible) => setMarkerVisible(visible)}
          onPortToggle={(param) => {setIsPortOver(!isPortOver);setPortCode(param);}}
          onToggleOpen={(shipId, naCode) => onToggleOpen(shipId,naCode)}
          onSetMapStyle={(mapStyle)=> setMapStyle(mapStyle)}
          onMenuDisplay={(param) => setMenuDisplay(param)}
          onInit={() => {setShipList([]);setPositions([])}}
          onPortMouseOut={(portcode)=> {setIsPortOver(false); setPortCode(portcode);}}
          handleChange={(val) => setValue(val)}
          setFromDate={(date) => setFromDate(date)}
          setToDate={(date) => setToDate(date)}
          toggleChecked={(check) => setChecked(!check)}
          AlertMessage={(msg,svr)=>AlertMessage(msg,svr)} />
        ) : (
        <Card>
          <CardActionArea>
            <CardMedia
              style={{ height: '100vh' }}
              image={googleMapLogin}
              onClick={() => props.openLogin()}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-150px' }}>
                  <h6>로그인 후 선박의 위치를 확인하세요.</h6>
                  <Button style={{ position: 'absolute', left: '50%', marginLeft: '-47px' }} variant="contained" color="primary">
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
    [MAP]: PropTypes.object
  }

  componentWillMount() {
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div');
    this.map.controls[this.props.position].push(this.controlDiv);
  }

  componentWillUnmount() {
    const controlArray = this.map.controls[this.props.position].getArray();
    for (let i = 0; i < controlArray.length; i++) {
      if (controlArray[i] === this.controlDiv) {
        this.map.controls[this.props.position].removeAt(i);
      }
    }
  }
  render() {
    return createPortal(this.props.children, this.controlDiv)
  }
}


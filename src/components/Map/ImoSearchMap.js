import PropTypes from 'prop-types';
import React, {useEffect, useState,Component, useRef} from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants'
import axios from 'axios';

import Button from "components/CustomButtons/Button.js";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia
} from '@material-ui/core';

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

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY + "&language=en&region=KR",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width: '100%', height: `55vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('zoom', 'onZoomChange', 5),
//   withState('center', 'centerChange', { lat: 36.431748, lng: 127.384496 }),
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
    //   onDragEnd: ({ centerChange }) => () => {
    //     centerChange(refs.map.getCenter());
    //   },
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
    
    // onDragEnd={props.onDragEnd}
    onMouseMove={(e) => { props.onLocation(e.latLng.lat(), e.latLng.lng()) }}
    style={{ width: '100%', height: `300px` }}>
    <MapControl position={window.google.maps.ControlPosition.RIGHT_BOTTOM}>
      <span>Zoom Level : {props.zoom}</span>
    </MapControl>
    <MapControl position={window.google.maps.ControlPosition.RIGHT_BOTTOM}>
      <span>{props.locationlat.toFixed(4)} , {props.locationlng.toFixed(4)}</span>
    </MapControl>
    {/* <MapControl position={window.google.maps.ControlPosition.LEFT_BOTTOM}>
      <div style={{ display: 'inline-block', marginBottom: "10px", marginLeft: "5px", borderRadius: '15px' }}>
        <span>CARGO</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;<img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/vsl_blue.png")} /><br></br>
        <span>CONTAINER : </span><img style={{ marginLeft: "5px", marginRight: "20px" }} alt={"normal"} src={require("assets/img/vsl_brown.png")} /><br></br>
        <span>BULK</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;<img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/vsl_green.png")} /><br></br>
        <span>ETC</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;<img style={{ marginLeft: "5px", marginRight: "20px" }} alt="normal" src={require("assets/img/vsl_red.png")} />
      </div>
    </MapControl> */}
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
            title={data.shipName}>
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
  const [locationLat, setLocationLat] = useState(0);
  const [locationLng, setLocationLng] = useState(0);
  const [shipList, setShipList] = useState([])
  const [center, setCenter] = useState({lat: 36.431748, lng: 127.384496});
  const mapRef= useRef();
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
    }
  })
  useEffect(() => {
    setShipList(props.data)
  
    if(props.data.length > 0) {
      if(props.data[0].position) {
        setCenter({lat:props.data[0].position.latitude, lng:props.data[0].position.longitude})
      }else {
        setCenter({lat: 36.431748, lng: 127.384496})
      }
        
    }
  },[props.data])

  




  return (
    <div>
      {props.userData ? (
        <MyMapComponent
            center={center}
            shipList={shipList}
            locationlat={locationLat}
            locationlng={locationLng}
            shipRotate={shipRotate}
            onLocation={(lat,lng) => {setLocationLat(lat);setLocationLng(lng);}}
          />
        ) : (
        <Card>
          <CardActionArea>
            <CardMedia
              style={{ height: '55vh' }}
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


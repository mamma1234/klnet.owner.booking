
import React,{useState,useEffect} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import dotenv from "dotenv";
dotenv.config();

const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`100%`}}/>,
      containerElement: <div style={{width:'100%', height: `20vh` }}/>,
      mapElement: <div style={{height:`100%` }}/>,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
    <GoogleMap
      id = {props.map}
      defaultZoom={10}
      defaultOptions={{
        fullscreenControl:true,
        scrollwheel: true,
        zoomControl: true,
        disableDefaultUI: true,
        keyboardShortcuts: true,
        mapTypeControl: false,
      
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        }
      }}
      options={{
        fullscreenControl:true,
        scrollwheel: true,
        zoomControl: true,
        disableDefaultUI: true,
        keyboardShortcuts: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        }
      }}
      mapTypeId={window.google.maps.MapTypeId.HYBRID}
      defaultCenter={{lat:props.lat,lng:props.lng}}>
      {props.gubun==="ship"?
        <Marker 
          draggable = {false} 
          position={{lat:props.lat,lng:props.lng}} // 마커 위치 설정 {lat: ,lng: }   
          icon= {{
            url:require('assets/img/newsprite.png'),
            size:{
              width:props.shipType==="CARGO"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBlue.rotate0.width:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBlue.rotate1.width:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBlue.rotate2.width:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBlue.rotate3.width:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBlue.rotate4.width:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBlue.rotate5.width:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBlue.rotate6.width:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBlue.rotate7.width:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBlue.rotate8.width:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBlue.rotate9.width:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBlue.rotate10.width:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBlue.rotate11.width:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBlue.rotate12.width:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBlue.rotate13.width:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBlue.rotate14.width:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBlue.rotate15.width:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBlue.rotate16.width:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBlue.rotate17.width:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBlue.rotate18.width:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBlue.rotate19.width:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBlue.rotate20.width:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBlue.rotate21.width:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBlue.rotate22.width:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBlue.rotate23.width:props.shipRotate.vesselBlue.rotate6.width):props.shipType==="CONTAINER"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBrown.rotate0.width:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBrown.rotate1.width:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBrown.rotate2.width:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBrown.rotate3.width:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBrown.rotate4.width:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBrown.rotate5.width:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBrown.rotate6.width:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBrown.rotate7.width:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBrown.rotate8.width:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBrown.rotate9.width:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBrown.rotate10.width:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBrown.rotate11.width:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBrown.rotate12.width:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBrown.rotate13.width:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBrown.rotate14.width:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBrown.rotate15.width:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBrown.rotate16.width:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBrown.rotate17.width:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBrown.rotate18.width:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBrown.rotate19.width:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBrown.rotate20.width:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBrown.rotate21.width:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBrown.rotate22.width:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBrown.rotate23.width:props.shipRotate.vesselBrown.rotate6.width):props.shipType==="BULK"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselGreen.rotate0.width:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselGreen.rotate1.width:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselGreen.rotate2.width:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselGreen.rotate3.width:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselGreen.rotate4.width:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselGreen.rotate5.width:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselGreen.rotate6.width:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselGreen.rotate7.width:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselGreen.rotate8.width:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselGreen.rotate9.width:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselGreen.rotate10.width:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselGreen.rotate11.width:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselGreen.rotate12.width:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselGreen.rotate13.width:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselGreen.rotate14.width:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselGreen.rotate15.width:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselGreen.rotate16.width:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselGreen.rotate17.width:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselGreen.rotate18.width:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselGreen.rotate19.width:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselGreen.rotate20.width:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselGreen.rotate21.width:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselGreen.rotate22.width:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselGreen.rotate23.width:props.shipRotate.vesselGreen.rotate6.width):((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselRed.rotate0.width:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselRed.rotate1.width:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselRed.rotate2.width:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselRed.rotate3.width:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselRed.rotate4.width:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselRed.rotate5.width:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselRed.rotate6.width:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselRed.rotate7.width:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselRed.rotate8.width:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselRed.rotate9.width:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselRed.rotate10.width:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselRed.rotate11.width:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselRed.rotate12.width:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselRed.rotate13.width:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselRed.rotate14.width:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselRed.rotate15.width:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselRed.rotate16.width:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselRed.rotate17.width:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselRed.rotate18.width:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselRed.rotate19.width:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselRed.rotate20.width:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselRed.rotate21.width:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselRed.rotate22.width:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselRed.rotate23.width:props.shipRotate.vesselRed.rotate6.width),
              height:props.shipType==="CARGO"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBlue.rotate0.height:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBlue.rotate1.height:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBlue.rotate2.height:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBlue.rotate3.height:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBlue.rotate4.height:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBlue.rotate5.height:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBlue.rotate6.height:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBlue.rotate7.height:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBlue.rotate8.height:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBlue.rotate9.height:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBlue.rotate10.height:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBlue.rotate11.height:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBlue.rotate12.height:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBlue.rotate13.height:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBlue.rotate14.height:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBlue.rotate15.height:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBlue.rotate16.height:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBlue.rotate17.height:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBlue.rotate18.height:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBlue.rotate19.height:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBlue.rotate20.height:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBlue.rotate21.height:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBlue.rotate22.height:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBlue.rotate23.height:props.shipRotate.vesselBlue.rotate6.height):props.shipType==="CONTAINER"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBrown.rotate0.height:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBrown.rotate1.height:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBrown.rotate2.height:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBrown.rotate3.height:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBrown.rotate4.height:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBrown.rotate5.height:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBrown.rotate6.height:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBrown.rotate7.height:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBrown.rotate8.height:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBrown.rotate9.height:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBrown.rotate10.height:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBrown.rotate11.height:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBrown.rotate12.height:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBrown.rotate13.height:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBrown.rotate14.height:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBrown.rotate15.height:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBrown.rotate16.height:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBrown.rotate17.height:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBrown.rotate18.height:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBrown.rotate19.height:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBrown.rotate20.height:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBrown.rotate21.height:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBrown.rotate22.height:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBrown.rotate23.height:props.shipRotate.vesselBrown.rotate6.height):props.shipType==="BULK"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselGreen.rotate0.height:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselGreen.rotate1.height:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselGreen.rotate2.height:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselGreen.rotate3.height:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselGreen.rotate4.height:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselGreen.rotate5.height:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselGreen.rotate6.height:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselGreen.rotate7.height:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselGreen.rotate8.height:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselGreen.rotate9.height:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselGreen.rotate10.height:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselGreen.rotate11.height:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselGreen.rotate12.height:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselGreen.rotate13.height:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselGreen.rotate14.height:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselGreen.rotate15.height:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselGreen.rotate16.height:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselGreen.rotate17.height:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselGreen.rotate18.height:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselGreen.rotate19.height:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselGreen.rotate20.height:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselGreen.rotate21.height:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselGreen.rotate22.height:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselGreen.rotate23.height:props.shipRotate.vesselGreen.rotate6.height):((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselRed.rotate0.height:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselRed.rotate1.height:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselRed.rotate2.height:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselRed.rotate3.height:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselRed.rotate4.height:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselRed.rotate5.height:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselRed.rotate6.height:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselRed.rotate7.height:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselRed.rotate8.height:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselRed.rotate9.height:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselRed.rotate10.height:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselRed.rotate11.height:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselRed.rotate12.height:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselRed.rotate13.height:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselRed.rotate14.height:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselRed.rotate15.height:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselRed.rotate16.height:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselRed.rotate17.height:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselRed.rotate18.height:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselRed.rotate19.height:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselRed.rotate20.height:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselRed.rotate21.height:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselRed.rotate22.height:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselRed.rotate23.height:props.shipRotate.vesselRed.rotate6.height),
            },
            origin:{
              x:props.shipType==="CARGO"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBlue.rotate0.x:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBlue.rotate1.x:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBlue.rotate2.x:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBlue.rotate3.x:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBlue.rotate4.x:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBlue.rotate5.x:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBlue.rotate6.x:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBlue.rotate7.x:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBlue.rotate8.x:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBlue.rotate9.x:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBlue.rotate10.x:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBlue.rotate11.x:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBlue.rotate12.x:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBlue.rotate13.x:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBlue.rotate14.x:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBlue.rotate15.x:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBlue.rotate16.x:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBlue.rotate17.x:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBlue.rotate18.x:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBlue.rotate19.x:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBlue.rotate20.x:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBlue.rotate21.x:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBlue.rotate22.x:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBlue.rotate23.x:props.shipRotate.vesselBlue.rotate6.x):props.shipType==="CONTAINER"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBrown.rotate0.x:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBrown.rotate1.x:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBrown.rotate2.x:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBrown.rotate3.x:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBrown.rotate4.x:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBrown.rotate5.x:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBrown.rotate6.x:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBrown.rotate7.x:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBrown.rotate8.x:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBrown.rotate9.x:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBrown.rotate10.x:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBrown.rotate11.x:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBrown.rotate12.x:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBrown.rotate13.x:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBrown.rotate14.x:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBrown.rotate15.x:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBrown.rotate16.x:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBrown.rotate17.x:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBrown.rotate18.x:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBrown.rotate19.x:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBrown.rotate20.x:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBrown.rotate21.x:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBrown.rotate22.x:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBrown.rotate23.x:props.shipRotate.vesselBrown.rotate6.x):props.shipType==="BULK"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselGreen.rotate0.x:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselGreen.rotate1.x:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselGreen.rotate2.x:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselGreen.rotate3.x:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselGreen.rotate4.x:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselGreen.rotate5.x:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselGreen.rotate6.x:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselGreen.rotate7.x:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselGreen.rotate8.x:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselGreen.rotate9.x:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselGreen.rotate10.x:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselGreen.rotate11.x:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselGreen.rotate12.x:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselGreen.rotate13.x:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselGreen.rotate14.x:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselGreen.rotate15.x:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselGreen.rotate16.x:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselGreen.rotate17.x:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselGreen.rotate18.x:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselGreen.rotate19.x:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselGreen.rotate20.x:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselGreen.rotate21.x:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselGreen.rotate22.x:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselGreen.rotate23.x:props.shipRotate.vesselGreen.rotate6.x):((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselRed.rotate0.x:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselRed.rotate1.x:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselRed.rotate2.x:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselRed.rotate3.x:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselRed.rotate4.x:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselRed.rotate5.x:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselRed.rotate6.x:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselRed.rotate7.x:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselRed.rotate8.x:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselRed.rotate9.x:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselRed.rotate10.x:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselRed.rotate11.x:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselRed.rotate12.x:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselRed.rotate13.x:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselRed.rotate14.x:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselRed.rotate15.x:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselRed.rotate16.x:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselRed.rotate17.x:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselRed.rotate18.x:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselRed.rotate19.x:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselRed.rotate20.x:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselRed.rotate21.x:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselRed.rotate22.x:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselRed.rotate23.x:props.shipRotate.vesselRed.rotate6.x),
              y:props.shipType==="CARGO"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBlue.rotate0.y:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBlue.rotate1.y:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBlue.rotate2.y:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBlue.rotate3.y:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBlue.rotate4.y:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBlue.rotate5.y:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBlue.rotate6.y:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBlue.rotate7.y:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBlue.rotate8.y:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBlue.rotate9.y:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBlue.rotate10.y:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBlue.rotate11.y:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBlue.rotate12.y:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBlue.rotate13.y:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBlue.rotate14.y:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBlue.rotate15.y:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBlue.rotate16.y:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBlue.rotate17.y:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBlue.rotate18.y:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBlue.rotate19.y:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBlue.rotate20.y:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBlue.rotate21.y:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBlue.rotate22.y:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBlue.rotate23.y:props.shipRotate.vesselBlue.rotate6.y):props.shipType==="CONTAINER"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselBrown.rotate0.y:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselBrown.rotate1.y:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselBrown.rotate2.y:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselBrown.rotate3.y:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselBrown.rotate4.y:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselBrown.rotate5.y:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselBrown.rotate6.y:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselBrown.rotate7.y:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselBrown.rotate8.y:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselBrown.rotate9.y:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselBrown.rotate10.y:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselBrown.rotate11.y:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselBrown.rotate12.y:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselBrown.rotate13.y:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselBrown.rotate14.y:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselBrown.rotate15.y:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselBrown.rotate16.y:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselBrown.rotate17.y:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselBrown.rotate18.y:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselBrown.rotate19.y:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselBrown.rotate20.y:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselBrown.rotate21.y:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselBrown.rotate22.y:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselBrown.rotate23.y:props.shipRotate.vesselBrown.rotate6.y):props.shipType==="BULK"?((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselGreen.rotate0.y:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselGreen.rotate1.y:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselGreen.rotate2.y:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselGreen.rotate3.y:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselGreen.rotate4.y:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselGreen.rotate5.y:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselGreen.rotate6.y:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselGreen.rotate7.y:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselGreen.rotate8.y:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselGreen.rotate9.y:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselGreen.rotate10.y:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselGreen.rotate11.y:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselGreen.rotate12.y:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselGreen.rotate13.y:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselGreen.rotate14.y:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselGreen.rotate15.y:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselGreen.rotate16.y:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselGreen.rotate17.y:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselGreen.rotate18.y:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselGreen.rotate19.y:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselGreen.rotate20.y:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselGreen.rotate21.y:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselGreen.rotate22.y:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselGreen.rotate23.y:props.shipRotate.vesselGreen.rotate6.y):((props.rotate >0 && props.rotate <= 15)? props.shipRotate.vesselRed.rotate0.y:(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.vesselRed.rotate1.y:(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.vesselRed.rotate2.y:(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.vesselRed.rotate3.y:(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.vesselRed.rotate4.y:(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.vesselRed.rotate5.y:(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.vesselRed.rotate6.y:(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.vesselRed.rotate7.y:(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.vesselRed.rotate8.y:(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.vesselRed.rotate9.y:(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.vesselRed.rotate10.y:(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.vesselRed.rotate11.y:(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.vesselRed.rotate12.y:(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.vesselRed.rotate13.y:(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.vesselRed.rotate14.y:(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.vesselRed.rotate15.y:(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.vesselRed.rotate16.y:(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.vesselRed.rotate17.y:(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.vesselRed.rotate18.y:(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.vesselRed.rotate19.y:(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.vesselRed.rotate20.y:(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.vesselRed.rotate21.y:(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.vesselRed.rotate22.y:(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.vesselRed.rotate23.y:props.shipRotate.vesselRed.rotate6.y),
            }
          }}>
        </Marker>:
        <Marker 
          draggable = {false} 
          position={{lat:props.lat,lng:props.lng}} // 마커 위치 설정 {lat: ,lng: }   
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
          }}>
        </Marker>
      }
    </GoogleMap>
));


                          



export default function Satellite(props) {
  const [lat, setLat]= useState(0);
  const [lng, setLngt]= useState(0);
  const [gubun, setGubun] = useState(props.gubun);
  const [parameter, setParameter] = useState(props);
  const [rotate, setRotate] = useState(0);
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
    setParameter(props);
    setGubun(props.gubun);
    if(props.gubun==="port") {
      setLat(props.parameter.wgs84_y);
      setLngt(props.parameter.wgs84_x);
    }else if(props.gubun==="ship") {
      setLat(props.parameter.position.latitude);
      setLngt(props.parameter.position.longitude);
      setRotate(props.parameter.position.courseOverGround);
    }
  },[props]);

  return (
    <div>
      <MyMapComponent
        gubun={gubun}
        lat={lat}
        lng={lng}
        rotate={rotate}
        shipRotate={shipRotate}
        shipType={parameter.gubun==="ship"?parameter.parameter.shipType:null}
      />
    </div>
  );
}






































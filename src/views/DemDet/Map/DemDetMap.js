import React,{Component, useState,useEffect} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import dotenv from "dotenv";
import MapSkin from './CustomMap';
import {MAP} from 'react-google-maps/lib/constants';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import TerminalList from './TerminalList.js';
import FilterIcon from '@material-ui/icons/Filter';
import {
  IconButton, 
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Snackbar,
} from "@material-ui/core";
import {
	Alert as MuiAlert
} from '@material-ui/lab';
import Button from "components/CustomButtons/Button.js";
import googleMapLogin from "assets/img/googlemapNoLogin.jpg";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

dotenv.config();
const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`40vh`}}/>,
      containerElement: <div style={{width:'100%', height: `100vh`}}/>,
      mapElement: <div style={{height:`100vh` }}/>,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap 
    id = {props.map}
    defaultZoom={props.zoom}
    zoom={props.zoom}
    ref={props.onMapMounted}
    defaultCenter={{lat:36.431748, lng: 127.384496}}
    defaultOptions={{
      
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      mapTypeControl: true,
      minZoom: 3,
     
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      },
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    options={{
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      mapTypeControl: true,
      minZoom: 3,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      },
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    mapContainerStyle={{
      height:"37vh",
      width:"100%"
    }}
    onMouseMove={(e) => {props.onLocation(e.latLng.lat(),e.latLng.lng())}}
    onClick={()=> {props.onToggleOpen()}}>

    <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
      <span>lat : {props.locationlat}, lng : {props.locationlng}</span>
    </MapControl>
    <MapControl position = {window.google.maps.ControlPosition.LEFT_TOP}>
      <div style={{marginTop:"10px", marginLeft:"5px", borderRadius:'15px', float:'left'}}>
        <img src={require("assets/img/pp_logo.gif")} alt={"plismplus"} width={"60px"} height={"40px"}/>
        <a href={"plismplus"} style={{marginTop:'7px', fontWeight:'bold',fontSize:'24px'}}>PLISM PLUS</a>
      </div>
    </MapControl>
    
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
      <div style={{backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px', float:'right'}}>
        <IconButton
          color="secondary"
          onClick={() => {
            if (props.menuDisplay === "none") {
                props.onMenuDisplay("block");
            }else {
                props.onMenuDisplay("none");
            }
          }}> 
          <FilterIcon/>
        </IconButton>
      </div>      
      <div style={{display:'inline-block', backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px'}}>
        <div style={{display:props.menuDisplay}}>
          <img style={{marginLeft:"20px"}} alt={"dark"} src={require("assets/img/googleMap/dark.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleDark)}/>
          <img style={{marginLeft:"5px"}} alt={"aubergine"} src={require("assets/img/googleMap/aubergine.png")} onClick={() => props.onSetMapStyle(MapSkin.MapAubergine)}/>
          <img style={{marginLeft:"5px"}} alt={"night"} src={require("assets/img/googleMap/night.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleNight)}/>
          <img style={{marginLeft:"5px"}} alt={"retro"} src={require("assets/img/googleMap/retro.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleRetro)}/>
          <img style={{marginLeft:"5px"}} alt={"silver"} src={require("assets/img/googleMap/silver.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleSilver)}/>
          <img style={{marginLeft:"5px",marginRight:"20px"}} alt={"normal"} src={require("assets/img/googleMap/normal.png")} onClick={() => props.onSetMapStyle([])}/>
        </div>
      </div>
    </MapControl>


    { props.portCode.length !== 0 && (props.portCode.map(data => {
        return(
          <Marker 
            key = {data.port}
            draggable = {false} 
            position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
            icon={data.sum==="0"?require("assets/img/marker.png"):require("assets/img/marker_red.png")}
            animation={data.sum==="0"?0:1}
            defaultVisible
            options ={{
              label:{
                text: data.sum!=="0"?"　"+data.sum:" ",
                fontSize:'25px',
                fontWeight:'bold'
              }
            }}
            visible
            onClick={() => props.onToggleOpen(data.port) }
            >
            {props.isOpen && data.port === props.port && props.getPortInfo(data)}
          </Marker>
        )
          
      }))
      
    } 

  </GoogleMap>
));

export default function DemDetMap(props) {
  const [zoom,setZoom] = useState(8);
  const [mapStyle, setMapStyle] = useState([]);
  const [locationlat, setLocationlat] = useState(0);
  const [locationlng, setLocationlng] = useState(0);
  const [portCode, setPortCode] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [port, setPort] = useState("");
  const [menuDisplay, setMenuDisplay] = useState("none");
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [errMessage, setErrmessage] = useState("");
  useEffect (() => {
    if(props.userData){

      axios.post("/loc/getDemDetPort",{}).then(res => {
        if(res.statusText==="OK") {
          AlertMessage("조회가 완료 되었습니다.","success");
          setPortCode(res.data);
        }else {
          AlertMessage("조회 할 수 없습니다. 잠시 후 다시 시도해주세요.","error");
        }
      }).catch(err => {
        if(String(err.response.status) === "403" || String(err.response.status) === "401") {
          AlertMessage(String(err),"error");
        }
      })
   }else {
      AlertMessage("로그인 정보가 없습니다.","error");
   }
    
  },[]);

  const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
  }
  
  const onToggleOpen = (port) => {
    setPort(port);
    setIsOpen(pre=> !pre);
  }

  const getPortInfo = (port) => {
    return(
      <TerminalList port={port} returnMessage={(message, state)=> AlertMessage(message, state)}  {...props}/>
    )
  }
  
  const AlertMessage = (message,icon) => {
		setErrmessage(message)
		setSeverity(icon)
		setAlertOpen(true);
  }
  
  const getPort = ( port ) => {
    if(props.userData){
      if(port !== null) {
          axios.post("/loc/getDemDetPort",{portCode:port.port}).then(res => {
            if(res.statusText==="OK") {
              setPortCode(res.data);
            }
          }).catch(err => {
            if(String(err.response.status) === "403" || String(err.response.status) === "401") {
            // props.openLogin();
            }
        })
      }else{
        axios.post("/loc/getDemDetPort",{}).then(res => {
          if(res.statusText==="OK") {
            setPortCode(res.data);
          }
        }).catch(err => {
          if(String(err.response.status) === "403" || String(err.response.status) === "401") {
          //props.openLogin();
          }
        });;
      }
    }else {
      //props.openLogin();
    }
  }
  return (
    <div>
    {props.userData?(
      <MyMapComponent
        isMarkerShown
        onMarkerClick={() => setZoom(21)}
        onLocation={(lat,lng) => {setLocationlat(lat);setLocationlng(lng);}}
        zoom={zoom}
        setStyle={mapStyle}
        locationlat={locationlat}
        locationlng={locationlng}
        portCode={portCode}
        onToggleOpen={(port) => onToggleOpen(port)}
        getPortInfo={(port) =>getPortInfo(port)}
        isOpen={isOpen}
        port={port}
        onMenuDisplay={(menu)=>setMenuDisplay(menu)}
        getPort={(port) => getPort(port)}
        onSetMapStyle={(style) => setMapStyle(style)}
        menuDisplay={menuDisplay}
      />):
      (<Card>
        <CardActionArea>
          <CardMedia
            style={{height:'100vh'}}
            image={googleMapLogin}
            onClick={() => props.openLogin()}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{position:'absolute', top:'50%',left:'50%', marginLeft:'-150px'}}>
                <h6>로그인 후 DEM/DET 정보를 확인하세요.</h6>
                <Button style={{position:'absolute', left:'50%', marginLeft:'-47px'}} variant="contained" color="primary">
                    LOGIN
                </Button>
              </Typography>
            </CardContent>
          </CardMedia>
        </CardActionArea>
      </Card>)}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert 
          onClose={handleAlertClose}
          severity={severity}>
          <span>{errMessage}</span>
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
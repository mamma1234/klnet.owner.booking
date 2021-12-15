import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants'
// reactstrap components
import {CardBody,CardText,CardTitle,Form,Collapse
} from "reactstrap";

import {compose,withProps,withState,withHandlers} from 'recompose';
import {GoogleMap, withGoogleMap, withScriptjs, Marker} from 'react-google-maps';
import SubMap from 'components/Map/Submap.js';
import axios from 'axios';
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";



function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}



const Map = compose(
    
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7fmL2oueevYipMnjdfYGeOjZLyF1y6Xw&language=kr&region=KR",
        loadingElement: <div style={{height:`100%`}}/>,
        containerElement: <div style={{width:'100%', height:`80vh`}}/>,
        mapElement: <div style={{height:`100%`}}/>,
    }),
    withState('zoom','onZoomChange',7),
    withState('center','onCenterChange',{lat:37.127, lng:124.1111}),
    withState('isInfoOpen','onInfoState',false),
    withState('popOpen', 'onPopOpen',false),
    withState('shipName','onShipNameChange',""),
    withState('clickShipName','clickOnShipName',""),
    withState('checked','setChecked',true),
    withState('locationlat','setLocationLat',0),
    withState('locationlng','setLocationLng',0),
    withState('shipInfo','setShipInfo',[]),
    
    withHandlers(() => {
        const refs = {
            map: undefined,
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onDragEnd: ({onCenterChange}) => () => {
                onCenterChange(refs.map.getCenter());
            },
            onInfoState: ({onInfoState, onShipNameChange}) => (param, shipNm) => {
                onInfoState(param);
                onShipNameChange(shipNm);
            },
            onPopOpen: ({onPopOpen,clickOnShipName,setShipInfo}) => (param, data) => {
                setShipInfo(data);
                onPopOpen(param);
                clickOnShipName(data.shipName);
                
            },
            onZoomChanged: ({onZoomChange}) => () => {
                onZoomChange(refs.map.getZoom());
            },
            onPortToggle: ({onPopOpen}) => () => {
                onPopOpen(false);
            },
            onSelectShip: ({onZoomChange, onCenterChange}) => (param1,param2) =>{
                onCenterChange({lat:param1,lng:param2});
                onZoomChange(14);
            },
            onAllView: ({onCenterChange,onZoomChange,}) => () => {
                onCenterChange({lat:37.127, lng:124.1111});
                onZoomChange(7);
            },
            onLocation:({setLocationLat, setLocationLng}) => (lat, lng) => {
                setLocationLat(lat);
                setLocationLng(lng);
            }

        }
    }),

    withScriptjs,
    withGoogleMap,
    
)(props => (
    
    
    <GoogleMap
        ref={props.onMapMounted}
        defaultOptions={{
            scrollwheel:true,
            zoomControl:true,
            disableDefaultUI:true,
            mapTypeControl:false,
            styles:[],
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
        }}
        defaultTilt={15}
        options={{
            scrollwheel:true,
            zoomControl:true,
            disableDefaultUI:true,
            mapTypeControl:false,
            styles:[],
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            }
        }}
        onZoomChanged ={props.onZoomChanged}
        onClick={(e)=> {props.onPortToggle()}}
        defaultZoom={props.zoom}
        defaultCenter={props.center}
        center={props.center}
        zoom={props.zoom}
        onDragEnd={props.onDragEnd}
        onMouseMove={(e) => {props.onLocation(e.latLng.lat(),e.latLng.lng())}}>
        
        {props.popOpen && (
        <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
            <div style={{backgroundColor:'#ffffff', marginBottom: "150px",minWidth:400,maxWidth:500}}>
                <CardBody>
                    <CardTitle tag="h5">{props.clickShipName}</CardTitle>
                    <CardText>
                        Destination : {props.shipInfo.destination}
                    </CardText>
                        <CardText>
                        <small className="text-muted">Last update : </small>
                        <small style={{fontWeight:'bold'}}>{timeForToday(props.shipInfo.position.timestamp)}&nbsp;</small>
                        <small>{Date(props.shipInfo.position.timestamp,'YYYY-MM-DD hh:mm:ss')}</small>
                    </CardText>
                    
                </CardBody>
                <SubMap parameter={props.shipInfo}></SubMap>
            </div>
        </MapControl>
        )}
        <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
                <span>Zoom Level : {props.zoom}</span>
        </MapControl>
        <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
            <span>{props.locationlat.toFixed(4)} , {props.locationlng.toFixed(4)}</span>
        </MapControl>


        {props.shipList.length !== 0 &&
            <>
            <MapControl position = {window.google.maps.ControlPosition.LEFT_CENTER}>
                <Collapse isOpen={props.checked}>
                    <Form style={{backgroundColor:'white',alignItems:'center',minWidth:300, height:'100%'}}>
                        <span style={{fontSize:'20px', fontWeight:'bold'}}>선박리스트</span>

                        <ListGroup>
                            <div onClick={() => props.onAllView()}>
                                <ListGroupItem action>전체</ListGroupItem>
                            </div>
                            {props.shipList.map((value, index) => 
                                <div key={index} onClick={() => props.onSelectShip(value[0].position.latitude,value[0].position.longitude)}>
                                    <ListGroupItem key={index} action>{value[0].shipName}</ListGroupItem>
                                </div>
                            )}
                        </ListGroup>
                    </Form>
                </Collapse>
            </MapControl>
            {props.shipList.map((data,index)=> {
                if(data[0].position !== null) {
                    return(
                        <Marker
                            key={index}
                            draggable={false}
                            position={{lat:data[0].position.latitude, lng:data[0].position.longitude}}
                        
                            icon={{
                                url:require('assets/img/mapsprite.png'),
                                size:{
                                    width
                                    :(data[0].position.courseOverGround >0 && data[0].position.courseOverGround <= 15)?props.shipRotate.rotate1.width
                                    :(data[0].position.courseOverGround > 15 && data[0].position.courseOverGround <= 30)?props.shipRotate.rotate2.width
                                    :(data[0].position.courseOverGround > 30 && data[0].position.courseOverGround <= 45)?props.shipRotate.rotate3.width
                                    :(data[0].position.courseOverGround > 45 && data[0].position.courseOverGround <= 60)?props.shipRotate.rotate4.width
                                    :(data[0].position.courseOverGround > 60 && data[0].position.courseOverGround <= 75)?props.shipRotate.rotate5.width
                                    :(data[0].position.courseOverGround > 75 && data[0].position.courseOverGround <= 90)?props.shipRotate.rotate6.width
                                    :(data[0].position.courseOverGround > 90 && data[0].position.courseOverGround <= 105)?props.shipRotate.rotate7.width
                                    :(data[0].position.courseOverGround > 105 && data[0].position.courseOverGround <= 120)?props.shipRotate.rotate8.width
                                    :(data[0].position.courseOverGround > 120 && data[0].position.courseOverGround <= 135)?props.shipRotate.rotate9.width
                                    :(data[0].position.courseOverGround > 135 && data[0].position.courseOverGround <= 150)?props.shipRotate.rotate10.width
                                    :(data[0].position.courseOverGround > 150 && data[0].position.courseOverGround <= 165)?props.shipRotate.rotate11.width
                                    :(data[0].position.courseOverGround > 165 && data[0].position.courseOverGround <= 180)?props.shipRotate.rotate12.width
                                    :(data[0].position.courseOverGround > 180 && data[0].position.courseOverGround <= 195)?props.shipRotate.rotate13.width
                                    :(data[0].position.courseOverGround < 195 && data[0].position.courseOverGround <= 210)?props.shipRotate.rotate14.width
                                    :(data[0].position.courseOverGround > 210 && data[0].position.courseOverGround <= 225)?props.shipRotate.rotate15.width
                                    :(data[0].position.courseOverGround > 225 && data[0].position.courseOverGround <= 240)?props.shipRotate.rotate16.width
                                    :(data[0].position.courseOverGround > 240 && data[0].position.courseOverGround <= 255)?props.shipRotate.rotate17.width
                                    :(data[0].position.courseOverGround > 255 && data[0].position.courseOverGround <= 270)?props.shipRotate.rotate18.width
                                    :(data[0].position.courseOverGround > 270 && data[0].position.courseOverGround <= 285)?props.shipRotate.rotate19.width
                                    :(data[0].position.courseOverGround > 285 && data[0].position.courseOverGround <= 300)?props.shipRotate.rotate20.width
                                    :(data[0].position.courseOverGround > 300 && data[0].position.courseOverGround <= 315)?props.shipRotate.rotate21.width
                                    :(data[0].position.courseOverGround > 315 && data[0].position.courseOverGround <= 330)?props.shipRotate.rotate22.width
                                    :(data[0].position.courseOverGround > 330 && data[0].position.courseOverGround <= 345)?props.shipRotate.rotate23.width
                                    :(data[0].position.courseOverGround > 345 && data[0].position.courseOverGround <= 360)?props.shipRotate.rotate24.width
                                    :props.shipRotate.rotate0.width,
                                    height
                                    :(data[0].position.courseOverGround >0 && data[0].position.courseOverGround <= 15)?props.shipRotate.rotate1.height
                                    :(data[0].position.courseOverGround > 15 && data[0].position.courseOverGround <= 30)?props.shipRotate.rotate2.height
                                    :(data[0].position.courseOverGround > 30 && data[0].position.courseOverGround <= 45)?props.shipRotate.rotate3.height
                                    :(data[0].position.courseOverGround > 45 && data[0].position.courseOverGround <= 60)?props.shipRotate.rotate4.height
                                    :(data[0].position.courseOverGround > 60 && data[0].position.courseOverGround <= 75)?props.shipRotate.rotate5.height
                                    :(data[0].position.courseOverGround > 75 && data[0].position.courseOverGround <= 90)?props.shipRotate.rotate6.height
                                    :(data[0].position.courseOverGround > 90 && data[0].position.courseOverGround <= 105)?props.shipRotate.rotate7.height
                                    :(data[0].position.courseOverGround > 105 && data[0].position.courseOverGround <= 120)?props.shipRotate.rotate8.height
                                    :(data[0].position.courseOverGround > 120 && data[0].position.courseOverGround <= 135)?props.shipRotate.rotate9.height
                                    :(data[0].position.courseOverGround > 135 && data[0].position.courseOverGround <= 150)?props.shipRotate.rotate10.height
                                    :(data[0].position.courseOverGround > 150 && data[0].position.courseOverGround <= 165)?props.shipRotate.rotate11.height
                                    :(data[0].position.courseOverGround > 165 && data[0].position.courseOverGround <= 180)?props.shipRotate.rotate12.height
                                    :(data[0].position.courseOverGround > 180 && data[0].position.courseOverGround <= 195)?props.shipRotate.rotate13.height
                                    :(data[0].position.courseOverGround < 195 && data[0].position.courseOverGround <= 210)?props.shipRotate.rotate14.height
                                    :(data[0].position.courseOverGround > 210 && data[0].position.courseOverGround <= 225)?props.shipRotate.rotate15.height
                                    :(data[0].position.courseOverGround > 225 && data[0].position.courseOverGround <= 240)?props.shipRotate.rotate16.height
                                    :(data[0].position.courseOverGround > 240 && data[0].position.courseOverGround <= 255)?props.shipRotate.rotate17.height
                                    :(data[0].position.courseOverGround > 255 && data[0].position.courseOverGround <= 270)?props.shipRotate.rotate18.height
                                    :(data[0].position.courseOverGround > 270 && data[0].position.courseOverGround <= 285)?props.shipRotate.rotate19.height
                                    :(data[0].position.courseOverGround > 285 && data[0].position.courseOverGround <= 300)?props.shipRotate.rotate20.height
                                    :(data[0].position.courseOverGround > 300 && data[0].position.courseOverGround <= 315)?props.shipRotate.rotate21.height
                                    :(data[0].position.courseOverGround > 315 && data[0].position.courseOverGround <= 330)?props.shipRotate.rotate22.height
                                    :(data[0].position.courseOverGround > 330 && data[0].position.courseOverGround <= 345)?props.shipRotate.rotate23.height
                                    :(data[0].position.courseOverGround > 345 && data[0].position.courseOverGround <= 360)?props.shipRotate.rotate24.height
                                    :props.shipRotate.rotate0.height,
                                },
                                origin:{
                                    x
                                    :(data[0].position.courseOverGround >0 && data[0].position.courseOverGround <= 15)?props.shipRotate.rotate1.x
                                    :(data[0].position.courseOverGround > 15 && data[0].position.courseOverGround <= 30)?props.shipRotate.rotate2.x
                                    :(data[0].position.courseOverGround > 30 && data[0].position.courseOverGround <= 45)?props.shipRotate.rotate3.x
                                    :(data[0].position.courseOverGround > 45 && data[0].position.courseOverGround <= 60)?props.shipRotate.rotate4.x
                                    :(data[0].position.courseOverGround > 60 && data[0].position.courseOverGround <= 75)?props.shipRotate.rotate5.x
                                    :(data[0].position.courseOverGround > 75 && data[0].position.courseOverGround <= 90)?props.shipRotate.rotate6.x
                                    :(data[0].position.courseOverGround > 90 && data[0].position.courseOverGround <= 105)?props.shipRotate.rotate7.x
                                    :(data[0].position.courseOverGround > 105 && data[0].position.courseOverGround <= 120)?props.shipRotate.rotate8.x
                                    :(data[0].position.courseOverGround > 120 && data[0].position.courseOverGround <= 135)?props.shipRotate.rotate9.x
                                    :(data[0].position.courseOverGround > 135 && data[0].position.courseOverGround <= 150)?props.shipRotate.rotate10.x
                                    :(data[0].position.courseOverGround > 150 && data[0].position.courseOverGround <= 165)?props.shipRotate.rotate11.x
                                    :(data[0].position.courseOverGround > 165 && data[0].position.courseOverGround <= 180)?props.shipRotate.rotate12.x
                                    :(data[0].position.courseOverGround > 180 && data[0].position.courseOverGround <= 195)?props.shipRotate.rotate13.x
                                    :(data[0].position.courseOverGround < 195 && data[0].position.courseOverGround <= 210)?props.shipRotate.rotate14.x
                                    :(data[0].position.courseOverGround > 210 && data[0].position.courseOverGround <= 225)?props.shipRotate.rotate15.x
                                    :(data[0].position.courseOverGround > 225 && data[0].position.courseOverGround <= 240)?props.shipRotate.rotate16.x
                                    :(data[0].position.courseOverGround > 240 && data[0].position.courseOverGround <= 255)?props.shipRotate.rotate17.x
                                    :(data[0].position.courseOverGround > 255 && data[0].position.courseOverGround <= 270)?props.shipRotate.rotate18.x
                                    :(data[0].position.courseOverGround > 270 && data[0].position.courseOverGround <= 285)?props.shipRotate.rotate19.x
                                    :(data[0].position.courseOverGround > 285 && data[0].position.courseOverGround <= 300)?props.shipRotate.rotate20.x
                                    :(data[0].position.courseOverGround > 300 && data[0].position.courseOverGround <= 315)?props.shipRotate.rotate21.x
                                    :(data[0].position.courseOverGround > 315 && data[0].position.courseOverGround <= 330)?props.shipRotate.rotate22.x
                                    :(data[0].position.courseOverGround > 330 && data[0].position.courseOverGround <= 345)?props.shipRotate.rotate23.x
                                    :(data[0].position.courseOverGround > 345 && data[0].position.courseOverGround <= 360)?props.shipRotate.rotate24.x
                                    :props.shipRotate.rotate0.x,
                                    y
                                    :(data[0].position.courseOverGround >0 && data[0].position.courseOverGround <= 15)?props.shipRotate.rotate1.y
                                    :(data[0].position.courseOverGround > 15 && data[0].position.courseOverGround <= 30)?props.shipRotate.rotate2.y
                                    :(data[0].position.courseOverGround > 30 && data[0].position.courseOverGround <= 45)?props.shipRotate.rotate3.y
                                    :(data[0].position.courseOverGround > 45 && data[0].position.courseOverGround <= 60)?props.shipRotate.rotate4.y
                                    :(data[0].position.courseOverGround > 60 && data[0].position.courseOverGround <= 75)?props.shipRotate.rotate5.y
                                    :(data[0].position.courseOverGround > 75 && data[0].position.courseOverGround <= 90)?props.shipRotate.rotate6.y
                                    :(data[0].position.courseOverGround > 90 && data[0].position.courseOverGround <= 105)?props.shipRotate.rotate7.y
                                    :(data[0].position.courseOverGround > 105 && data[0].position.courseOverGround <= 120)?props.shipRotate.rotate8.y
                                    :(data[0].position.courseOverGround > 120 && data[0].position.courseOverGround <= 135)?props.shipRotate.rotate9.y
                                    :(data[0].position.courseOverGround > 135 && data[0].position.courseOverGround <= 150)?props.shipRotate.rotate10.y
                                    :(data[0].position.courseOverGround > 150 && data[0].position.courseOverGround <= 165)?props.shipRotate.rotate11.y
                                    :(data[0].position.courseOverGround > 165 && data[0].position.courseOverGround <= 180)?props.shipRotate.rotate12.y
                                    :(data[0].position.courseOverGround > 180 && data[0].position.courseOverGround <= 195)?props.shipRotate.rotate13.y
                                    :(data[0].position.courseOverGround < 195 && data[0].position.courseOverGround <= 210)?props.shipRotate.rotate14.y
                                    :(data[0].position.courseOverGround > 210 && data[0].position.courseOverGround <= 225)?props.shipRotate.rotate15.y
                                    :(data[0].position.courseOverGround > 225 && data[0].position.courseOverGround <= 240)?props.shipRotate.rotate16.y
                                    :(data[0].position.courseOverGround > 240 && data[0].position.courseOverGround <= 255)?props.shipRotate.rotate17.y
                                    :(data[0].position.courseOverGround > 255 && data[0].position.courseOverGround <= 270)?props.shipRotate.rotate18.y
                                    :(data[0].position.courseOverGround > 270 && data[0].position.courseOverGround <= 285)?props.shipRotate.rotate19.y
                                    :(data[0].position.courseOverGround > 285 && data[0].position.courseOverGround <= 300)?props.shipRotate.rotate20.y
                                    :(data[0].position.courseOverGround > 300 && data[0].position.courseOverGround <= 315)?props.shipRotate.rotate21.y
                                    :(data[0].position.courseOverGround > 315 && data[0].position.courseOverGround <= 330)?props.shipRotate.rotate22.y
                                    :(data[0].position.courseOverGround > 330 && data[0].position.courseOverGround <= 345)?props.shipRotate.rotate23.y
                                    :(data[0].position.courseOverGround > 345 && data[0].position.courseOverGround <= 360)?props.shipRotate.rotate24.y
                                    :props.shipRotate.rotate0.y,
                                }
                            }}
                            title={data[0].shipName}
                            onClick={() => {if(!props.popOpen){props.onPopOpen(true,data[0]);}}}>
                        </Marker>
                    )}
                })
            }
                        

            </>
        }

    </GoogleMap>
));


function MiniMap(props) {

    React.useEffect(() => {
        searchShipPosition();
        return () => {
            console.log("clean up");
        }
    },[]);
    const [shipList, setShipList] = React.useState([]);
    const [shipRotate] = React.useState({
            port:{x:5,y:5,width:15,height:17},
            terminal:{x:5,y:32,width:16,height:26},
            rotate0:{x:5,y:68,width:16,height:13},
            rotate1:{x:5,y:91,width:14,height:23},
            rotate2:{x:5,y:124,width:16,height:22},
            rotate3:{x:5,y:156,width:21,height:21},
            rotate4:{x:5,y:187,width:22,height:16},
            rotate5:{x:5,y:213,width:23,height:14},
            rotate6:{x:5,y:237,width:22,height:10},
            rotate7:{x:5,y:257,width:23,height:13},
            rotate8:{x:5,y:280,width:22,height:17},
            rotate9:{x:5,y:307,width:21,height:20},
            rotate10:{x:5,y:337,width:16,height:23},
            rotate11:{x:5,y:370,width:14,height:24},
            rotate12:{x:5,y:404,width:10,height:22},
            rotate13:{x:5,y:436,width:13,height:24},
            rotate14:{x:5,y:470,width:17,height:23},
            rotate15:{x:5,y:503,width:20,height:20},
            rotate16:{x:5,y:533,width:23,height:17},
            rotate17:{x:5,y:560,width:24,height:13},
            rotate18:{x:5,y:583,width:22,height:10},
            rotate19:{x:5,y:603,width:24,height:14},
            rotate20:{x:5,y:627,width:23,height:16},
            rotate21:{x:5,y:653,width:20,height:21},
            rotate22:{x:5,y:684,width:17,height:22},
            rotate23:{x:5,y:716,width:13,height:23},
            rotate24:{x:5,y:749,width:16,height:13},
        
    })




    const searchShipPosition = () => {
        axios.post("/api/weidongShipSearch",{}).then(
            res => {
                if(res.statusText ==="OK") {
                    setShipList(res.data);
                }
            }).catch(err => {
                if(err.response.status === 403||err.response.status === 401) {
                    alert(err);
                }
            });
        }



    return (
        <>
            <Map shipRotate={shipRotate}
                shipList={shipList}/>  
        </>
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
  
  
export default MiniMap;

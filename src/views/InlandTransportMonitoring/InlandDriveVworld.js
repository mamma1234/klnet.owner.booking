import React, { useState, useEffect } from "react";
import loadJs from "load-js";
import Button from "@material-ui/core/Button";

export default function InlandDriveVworld(props) {

  const [redraw, setRedraw] = useState(0);
  // const [point, setPoint] =useState([]);
  const [load, setLoad] = useState(false);
  const [vmapInit, setVmapInit] = useState(null);
  const apiKey = "987DB43F-A2A1-3C3B-818F-68E7B9D7E786";
  const {rowData,rowDetailData,point,move} = props;
  let pops = [];
  const vw = window.vw;
  const ol = window.ol;
  vw.ol3.MapOptions = {
    basemapType : vw.ol3.BasemapType.GRAPHIC,
    controlDensity : vw.ol3.DensityType.EMPTY,
    interactionDensity : vw.ol3.DensityType.FULL,
    controlsAutoArrange : true,
    homePosition : vw.ol3.CameraPosition,
    initPosition : vw.ol3.CameraPosition
  };
    useEffect(() => {
      setVmapInit(new vw.ol3.Map(`map${rowData.RNUM}`, vw.ol3.MapOptions)) //객체 생성
    }, []);
    useEffect(() => {
      if(vmapInit){ drawMap(rowData.RNUM,point,move,`vmap${rowData.RNUM}`) }
    }, [vmapInit]);
  
   

  const drawMap = (key,point, move,vmap) => {
    
    let coordinates = []; //좌표 설정 라인 좌표를 저장
    let pointFeatures = new Array(); // feature 배열
    let moveFeatures = new Array();
  
    vmap = vmapInit
    

    let style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [0, 100, 0, 0.7], //투명도
        width: 3, //두께
      }),
    }); // 라인스타일 설정

    var pointIconStyle = new ol.style.Style({
      image : new ol.style.Icon(
      ({
          anchor : [ 0.5, 25 ], // 위치설정
          anchorXUnits : 'fraction',
          anchorYUnits : 'pixels',
          src : require("assets/img/marker_red.png") ,
      }))
    }); //Point에 마커 디자인을 설정
    for (let i = 0; i < point.length; i++) {
      //Feature 객체에 저장하여 활용
      pointFeatures[i] = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.transform(
            [point[i][3] * 1, point[i][2] * 1],
            "EPSG:4326",
            "EPSG:900913"
          )
        ),
        title: point[i][0],
        road: point[i][1],
      }); // get, set 과 같으며 속성값을 저장함
      pointFeatures[i].set('id', `dron${key}_point_` + (i + 1));
      pointFeatures[i].setStyle(pointIconStyle); // 스타일 지정
    }
    var moveIconStyle = new ol.style.Style({
      image : new ol.style.Icon(
      ({
          anchor : [ 0.5, 25 ], // 위치설정
          anchorXUnits : 'fraction',
          anchorYUnits : 'pixels',
          src : require("assets/img/marker.png") ,
      }))
    }); //Point에 마커 디자인을 설정

    // feature 배열 셋팅 feature 에 속성 정보를 저장
    
    //feature 배열 셋팅 feature 에 속성 정보를 저장
    for (let i = 0; i < move.length; i++) {
      //Feature 객체에 저장하여 활용
      moveFeatures[i] = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.transform(
            [move[i][3] * 1, move[i][2] * 1],
            "EPSG:4326",
            "EPSG:900913"
          )
        ),
        title: move[i][0],
        road: move[i][1],
      }); // get, set 과 같으며 속성값을 저장함

      moveFeatures[i].set('id', `dron${key}_move_` + (i + 1));
      moveFeatures[i].setStyle(moveIconStyle); // 스타일 지정
      coordinates.push(
        ol.proj.transform(
          [move[i][3] * 1, move[i][2] * 1],
          "EPSG:4326",
          "EPSG:900913"
        )
      );
    }
    //move 라인 저장
    let line_feature = new ol.Feature({
      geometry: new ol.geom.LineString(coordinates),
      id: `line`,
    });
    line_feature.setStyle(style);
    moveFeatures.push(line_feature);

    /*
      기존검색결과를 제거하기 위해 키 값 생성
      */
    let pointvectorSource = new ol.source.Vector({
      features: pointFeatures,
      id: `point${key}_vector`,
    });
    var pointvectorLayer = new ol.layer.Vector({
      source : pointvectorSource,
      id: `point${key}_layer`,
    });
    let movevectorSource = new ol.source.Vector({
      features: moveFeatures,
      id: `move${key}_vector`,
    });
    var movevectorLayer = new ol.layer.Vector({
      source : movevectorSource,
      id: `move${key}_layer`,
    });

    vmap.getLayers().forEach(function(layer){
        if(layer.get("id")=="move${key}_layer"){
           vmap.removeLayer(layer);
        }
    });
    vmap.addLayer(pointvectorLayer);
    vmap.addLayer(movevectorLayer);

  // let pop =null;
  
  /* 클릭 이벤트 제어 */


  vmap.on("click", function(evt) {
    // allClosed();
    var coordinate = evt.coordinate // 클릭한 지점의 좌표정보
    var pixel = evt.pixel // 클릭한 지점의 픽셀정보 

    //선택한 픽셀정보로  feature 체크 
    vmap.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // setOverlay(feature);
      console.log('click feature : ' ,feature.get('id'), 'layer',layer)
      var title = feature.get("title");
      var road = feature.get("road");
      var isCreated ;
      if(feature.get('id')!=='line')
      {
      if (pops.length==0){
        let pop = new vw.ol3.popup.Popup();
        pop.title= title;
        pop.content = road;
        pop.id = feature.get('id')
        vmap.addOverlay(pop);
        pops.push(pop)
        pop.show(road,coordinate)
        console.log('add pop >> ',pop.id,pops)
      }else{
        for (let i = 0; i < pops.length; i++) {
          console.log(pops[i])
          if(pops[i].id ==feature.get('id')){
            isCreated = true;
              console.log('same pop id >>',pops[i],pops)
              vmap.removeOverlay(pops[i])
              pops.splice(i,1)
              console.log('remove pop >>',pops)            
          } 
        }
        if(!isCreated){
          let pop = new vw.ol3.popup.Popup();
          console.log(pop.closerHandler)
          pop.title= title;
          pop.content = road;
          pop.id = feature.get('id')
          // pop.closerHandler ={function(pop) {
          //   vmap.removeOverlay(pop);
          //   return false;
          // }}
          pop.onClick={function(pop){
            vmap.removeOverlay(pop);
          }}
          vmap.addOverlay(pop);
          pops.push(pop)
          pop.show(road,coordinate)
          console.log('add pop222 >> ',pop.id,pops)
          return;
        }
      }
    }
    });
  });
}
  return (
    <div   style={{ 
      height:'430px'}}>
      <div id={`map${props.rowData.RNUM}`}
        style={{ 
          height:'430px',
          borderRadius: "6px",
          overflow: "hidden"
          }}>
            {/* <div style={{
              width: '60px'
              ,height: '20px'
              ,zIndex: '999'
              ,background: '#3f51b5'
              ,position: 'relative'
              ,left: '15px'
              ,top: '40px'
              ,textAlign: 'center'
              ,fontSize: '13px'
              ,color: 'white'
              ,cursor: 'pointer'
            }} 
              onClick={()=>
                {
                  console.log(pops)
                  pops.forEach((e,i)=>vmapInit.removeOverlay(pops[i])) 
                  pops=[]
                } 
              }>모두 닫기</div> */}

           
      </div>
         <Button variant='contained' color='primary' size='small'
              style={{
                zIndex: '999',
                // ,background: '#3f51b5'
                position: 'relative'
                // ,left: '15px'
                // ,top: '40px'
                ,left: '225px'
                ,bottom: '55px'
              }} 
              onClick={()=>{
                  console.log(pops)
                  pops.forEach((e,i)=>vmapInit.removeOverlay(pops[i])) 
                  pops=[]
                }}
              >팝업 모두 닫기</Button>
    </div>
  );
}

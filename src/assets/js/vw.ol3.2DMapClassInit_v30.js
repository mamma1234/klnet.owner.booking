vw.ol3.popup = {};
	
function apiKeyCheck() {
	if (vworldIsValid != 'true') {
		var err = "[인증실패] " + vworldErrMsg + "\n";
		err += "=======================================\n";
		err += "지도서비스 사용에 제약이 있을 수 있습니다.\n";
		err += "인증키 재발급 후 다시 시도하여 주십시오.\n";
		alert(err);
	};
}

// apiKeyCheck();

 vw.ol3.vworldCategory = {
		 wms: "wms_theme_",
		 cache: "cache_theme_",
		 theme: "theme_",
		 stat: "stat_theme_"
	 };
 
  vw.ol3.ImgUrl  = {
		oltheme: vw.ol3.BaseURLs.vworldUrl + "/images/maps/",
		   blankimage: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/map/btn/btn-mark-star-blank.png",
		   marker: vw.ol3.BaseURLs.vworldUrl + "/images/ol3",
		   markerimage: "/marker.png" ,
		   markerblueimage:"/marker_blue.png" ,
		   paninit: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_init.png" ,
		   panup: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_up.png" ,
		   panleft: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_left.png" ,
		   panbottom: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_down.png" ,
		   panright: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_right.png" ,
		   pancenter: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_zoom_world.png" ,
		   pandist: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_dist.png" ,
		   panarea: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_area.png" ,
		   panzoomin:vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_zoom_plus.png" ,
		   panzoomout:vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_zoom_minus.png" ,   
		   panzoomslider: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_zoombar.png",
		   panzoomsliderthumb: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/pan_slider.png" ,
		   btninit: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_init.png",
		   btnzoomin: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_zoomin.png",
		   btnzoomout: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_zoomout.png",
		   btnextentin: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_extent_in.png",
		   btnextentout: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_extent_out.png",
		   btnpan: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_pan.png",
		   btnprev: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_prev.png",
		   btnnext: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_next.png",
		   btnfull: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_full.png",
		   btndist: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_dist.png",
		   btnarea: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/btn_area.png",
		   close: vw.ol3.BaseURLs.vworldUrl + "/images/maps/del-gray.gif",
		   logoimage: vw.ol3.BaseURLs.vworldUrl + "/images/ol3/logo_openplatform.png"
   } ;
	  
 vw.ol3.enums = {
			COMMON_NOTICE: vw.ol3.BaseURLs.vworldUrl + "/images/maps/notice_aboutmap.png",
			COMMON_NOTICE_R: vw.ol3.BaseURLs.vworldUrl + "/images/maps/notice_aboutmap_r.png",
			JIJUK_VISIBLE_NOTICE: '',
			JIJUK_INVISIBLE_NOTICE: "<img src='" + vw.ol3.BaseURLs.vworldUrl + "/images/maps/notice_aboutjijuk.png'>",
			JIJUK_INVISIBLE_NOTICE_R: "<img src='" + vw.ol3.BaseURLs.vworldUrl + "/images/maps/notice_aboutjijuk_r.png'>",
			NOT_SUPPORT_NOTICE: '3D 플러그인은 사용하시는 브라우저를 지원하지 않습니다.\n지원일정은  브이월드 홈페이지를 참조하여 주십시오.\n사용에 불편을 드려 죄송합니다.',
			NOT_SUPPORT_MOBILE: '공간정보오픈플랫폼 지도는 모바일 브라우저에 최적화 되지 않았습니다.',
			POP_FRAME_ID: 'mappop_info',
			POP_CALLBACK_FRAME_ID: 'mappop',
			POP_CONTENT_ID: 'mappop_html'
		};
 vw.ol3.pops = [vw.ol3.enums.POP_FRAME_ID, vw.ol3.enums.POP_CALLBACK_FRAME_ID, vw.ol3.enums.POP_CONTENT_ID];
 vw._vmap=null;
 vw.vworldVar = {
		 maptype: "",
		 printpage: "a4",
		 printdirect: "portrait",
		 bldglayer: "LT_C_BLDGBASE"
	 };
 
 vw.vworldIDs = {
		 idpanel: "",
		 id2d: "",
		 id3d: "",
		 idloading: "",
		 idshim: "iframeshim",
		 idmenu: "menu-panel",
		 idmode: [ "menu-mode1", "menu-mode2", "menu-mode3"]
	 };
 vw.vworldInfo = {
		 lonlat: null,
		 pixel: {},
		 group: null,
		 prev3dlonlat: [],
		 Layers3d: [],
		 objects3d: [],
		 objects2d: [],
		 prevpixel: {}
	 };     	
 
vw.ol3.inherits = ol.inherits;


/**
  * 	1.  vw.2d.NamedSet 클래스 
  * 	Set으로 이름으로 아이템을 다루는 메소드와 이벤트를 제공한다.
  * 	@superclass natvieObject
  *   constructor
  */		 
vw.ol3.NamedSet = function() {
	if (typeof Map === "function") {
		this.arrMap = new Map();
	} else {
		this.arrMap = new Array();
	}
};

vw.ol3.NamedSet.prototype = {
	/* key, value 값으로 구성된 데이터를 추가 */
	put: function (name, value) {
		this.arrMap[name] = value;
	},
	set: function(name,value) {
		this.put(name,value);
	},
	/* 지정한 key값의 value값 반환 */
	get: function (name) {
		return this.arrMap[name];
	},
	getLast: function() {
		var _obj;
		for( var _name in this.arrMap ) {
			_obj = this.arrMap[_name];
		};

		return _obj;
	},
	setLast: function(value) {
		var _lastName  ;
		for( var _name in this.arrMap ) {
			_lastName = _name;
		};
		
		this.set(_lastName,value);
	},
	/* 구성된 key 값 존재여부 반환 */
	containsKey: function (name) {
		return name in this.arrMap;
	},
	/* 구성된 value 값 존재여부 반환 */
	containsValue: function (value) {
		for (var name in this.arrMap) {
			if (this.arrMap[name] == value) {
				return true;
			}
		}
		return false;
	},
	/* 구성된 데이터 초기화 */
	clear: function () {
		for (var name in this.arrMap) {
			delete this.arrMap[name];
		}
	},
	/*  key에 해당하는 데이터 삭제 */
	remove: function (name) {
		delete this.arrMap[name];
	},
	/* 배열로 key 반환 */
	getNames: function () {
		var arKey = new Array();
		for (var name in this.arrMap) {
			arKey.push(name);
		}
		return arKey;
	},
	/* 배열로 value 반환 */
	values: function () {
		var arVal = new Array();
		for (var name  in this.arrMap) {
			arVal.push(this.arrMap[name]);
		}
		return arVal;
	},
	/* Map에 구성된 개수 반환 */
	getLength: function () {
		 var count = 0;
		 for ( var prop in this.arrMap ) {
			 count++;
		 };
		 return count++;
	}
};		 

/**
 * vw.2d.CameraPostion 구조체
 * @descript 카메라의 위치를 나타내는 객체.
 */
vw.ol3.CameraPosition = {
	center: null,
	zoom: 1,
	rotation: 0.50	
};

vw.ol3.ViewConfig = {
		DISPROJ : "EPSG:4326",
		ORIPROJ : "EPSG:900913",
		MAXRESOLUTION : 156543.0339,
		MINRESOLUTION : 0.000583,
		MAXZOOM : 19,
		MINZOOM : 6,
		SERVERMAXLEVEL  : 19,
		MAXEXTENT: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
		MAPEXTENT: [13306157.884,3757032.814272985,15028131.255,5635543.612951094],
		OVMEXTENT: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
		CENTER : [14243425.793355, 4342305.8698004 ],
		ZOOM : 7
};
	   
/**
 * 	31. vw.BasemapType 상수
 */
// vw.Map에서 사용하는 배경지도의 종류를 선언하는 열거형. 
// 지원하는 배경지도 종류에 맞도록 추가해서 사용한다.
vw.ol3.BasemapType = {
		GRAPHIC: "graphic",//0,
		GRAPHIC_GRAY	:	"graphic-gray",//1 ,
		GRAPHIC_NIGHT	:	"graphic-night",//2 ,
		PHOTO	:	"photo",//3,
		PHOTO_HYBRID : "photo-hybrid"//4
	};

/**
 * 	32. vw.DensityType 상수
 * 	Map 구성요소인 control, interaction을 초기에 어느 정도 구성할지 설정.
 */
vw.ol3.DensityType = {
		EMPTY : "empty",//0 , 
		BASIC : "basic",//1 ,
		FULL : "full"//2
	};

vw.ol3.SiteAlignType = {
		NONE : "none",
		TOP_LEFT:	"top-left",
		TOP_CENTER : "top-center",
		TOP_RIGHT : "top-right",
		CENTER_LEFT: "center-left",
		CENTER_CENTER: "center-center",
		CENTER_RIGHT : "center-right",
		BOTTOM_LEFT : "bottom-left",
		BOTTOM_CENTER : "bottom-center",
		BOTTOM_RIGHT : "bottom-right"
	};

vw.ol3.Map = function(container,_options) {

	this.name = "VWORLD MAP";
	this.logoControl=null;
	this.commonNotice=null;
	this.scaleLine=null;
	this.basicInteractionList = [
		  new	ol.interaction.DragRotate()
		 ,new	ol.interaction.DragPan()
		 ,new	ol.interaction.DoubleClickZoom()
		 ,new	ol.interaction.MouseWheelZoom()
		 ,new	ol.interaction.DragZoom()
		 ,new	ol.interaction.PinchZoom()
	];
	this.fullInteractionList = [
		 new	ol.interaction.DragRotate()
		,new	ol.interaction.DragPan()
		,new	ol.interaction.DoubleClickZoom()
		,new	ol.interaction.MouseWheelZoom()
		,new	ol.interaction.DragZoom()		 
		,new	ol.interaction.PinchRotate()
		,new	ol.interaction.PinchZoom()
		,new	ol.interaction.KeyboardPan()
		,new	ol.interaction.KeyboardZoom()
	 ];
	this.options = 	_options;
	
this.options.renderer = "canvas";
this.options.loadTilesWhileAnimating = true;
this.options.loadTilesWhileInteracting = true;
this.options.logo = false;
this.options.interactions = ol.interaction.defaults(
			{
				  altShiftDragRotate: false
				, doubleClickZoom: false
				, keyboard: false
				, mouseWheelZoom: false
				, shiftDragZoom: false
				, dragPan: false
				, pinchRotate: false
				, pinchZoom: false
			}
	);
this.options.overlays = [];
this.options.controls = ol.control.defaults({
		  zoom: false,
		  attribution: false,
		  rotate: false
		});

	ol.Map.call(this,this.options);
			  
	//_vmap = this;
	
	this.setTarget(container);
	
	this._mapLayers = new vw.ol3.Layers(this);
	this._controls = new vw.ol3.Controls(this);   
	this._measurement = new vw.ol3.control.Measurement(this);
	
	this._clear();   		
	this.setBasemapType();

	this._createView();

	this._setControl();
	this._setInteraction();
	
	if (!vw.ol3.CommonFunc._isDef(vw._vmap)){
		var mapDiv = this.getTargetElement();
		vw._vmap = this;
		mapDiv.onresize = function(){
			if (vw._vmap != undefined) {vw._vmap.updateSize();}
		};
	}

	/*맵생성시 초기위치 설정*/
	var zoom = this.options.initPosition.zoom;
	var center = this.options.initPosition.center;
	if ( zoom && center && vw.ol3.CommonFunc._isDef(vw._vmap) ) {
		vw._vmap.getView().setCenter(center);
		vw._vmap.getView().setZoom(zoom);
	}
};



vw.ol3.inherits(vw.ol3.Map, ol.Map);

vw.ol3.Map.prototype.setBasemapType = function(basemapType) {		
	if ( vw.ol3.CommonFunc._isDef(this.commonNotice) ) {
		this.removeControl(this.commonNotice);
		this.commonNotice = null;
	};
	this.commonNotice = this._createNotice();
	this.addControl(this.commonNotice);

	if ( vw.ol3.CommonFunc._isDef( basemapType) ) {
		switch (basemapType){
			case vw.ol3.BasemapType.GRAPHIC:
				vw.ol3.ViewConfig.MAXZOOM = 19;
				vw.ol3.ViewConfig.SERVERMAXLEVEL = 19;
				break;
			case vw.ol3.BasemapType.PHOTO_HYBRID :
				vw.ol3.ViewConfig.MAXZOOM = 19;
				vw.ol3.ViewConfig.SERVERMAXLEVEL = 19;
				break;
			default:
				vw.ol3.ViewConfig.MAXZOOM = 19;
				vw.ol3.ViewConfig.SERVERMAXLEVEL = 19;
				
				if(this.getView().getZoom() > vw.ol3.ViewConfig.MAXZOOM){
					this.getView().setZoom(vw.ol3.ViewConfig.MAXZOOM);
				}
				break;
		}
		this.options.basemapType = basemapType;
		   this._mapLayers._changeLayers(this.options.basemapType);	
	} else {
		vw.ol3.ViewConfig.MAXZOOM = 19;
		vw.ol3.ViewConfig.SERVERMAXLEVEL = 19;
		this._mapLayers._createLayers(this.options.basemapType);	
	} 		   		
}
	   
vw.ol3.Map.prototype._clear = function() {
	this._clearLayers();
	this._clearControls();
	this._clearInteractions();
};


vw.ol3.Map.prototype._clearLayers = function() {
this.getLayers().clear();
};

vw.ol3.Map.prototype._clearInteractions = function() {
var _Interactions = this.getInteractions();
var _cnt = 0;
if ( _Interactions != undefined && _Interactions != null ){
	_cnt = _Interactions.getLength();
}
for( var i = 0 ; i < _cnt; i++) {
	var _item = _Interactions.item(i);	
	if ( _item != undefined &&  _item != null )  {
		for(var ii = 0 ; ii < this.fullInteractionList.length; ii++) {
			if ( _item == this.fullInteractionList[ii] ) {
				this.removeInteraction(_item);			
			}
		}
	}
}
};

vw.ol3.Map.prototype._clearControls = function() {
var _controlList = this.getControls();
_controlList  = _controlList.getArray();
_cnt = 0;
if ( _controlList != null && _controlList != undefined) {
	_cnt = _controlList.length;
}
for( var i=0; i < _cnt ; i++ ) {
	this.removeControl(_controlList[i]);
}
};
		
	   
vw.ol3.Map.prototype._createView = function() {
	
  this.setView(
		  new ol.View({
				  maxZoom: vw.ol3.ViewConfig.MAXZOOM,
				  minZoom:  vw.ol3.ViewConfig.MINZOOM,
				  maxExtent: vw.ol3.ViewConfig.MAXEXTENT ,
				  projection: vw.ol3.ViewConfig.ORIPROJ,
				  extent: vw.ol3.ViewConfig.MAXEXTENT,
				  center: vw.ol3.ViewConfig.CENTER,
				  zoom: vw.ol3.ViewConfig.ZOOM
		  })
);
 
};


vw.ol3.Map.prototype._createLogo = function() {
	 var isSimple = true;
	 
 /*if (this.options.basemapType == vw.ol3.BasemapType.PHOTO) {
	 //isSimple = true;
 };*/
		  
  var src = "국토교통부";		  
  var element = document.createElement('div');
  
  var logoBtn = document.createElement('logoBtn');
  element.style.color = "#111";
  
  element.className = "vw-logo vw-control";
  element.appendChild(logoBtn);
	
  var logoControl = null;
	
if (isSimple) {
	//logoBtn.innerHTML  = "<img src='" + vw.ol3.BaseURLs.vworldUrl + "/images/maps/logo_openplatform.png'>";
	logoBtn.innerHTML  = "<img src='" + vw.ol3.ImgUrl.logoimage + "' alt='공간정보 오픈플랫폼'>";
}
else  {
	 logoBtn.innerHTML ="<img src='" + vw.ol3.BaseURLs.vworldUrl + "/images/maps/logo_openplatform_simple.png' alt='공간정보 오픈플랫폼'>";
};

logoControl = new ol.control.Control(
		 {
				element: element,
				target: this.container
			  }		
);
return logoControl;
};

vw.ol3.Map.prototype._createNotice = function() {
					  
  var element = document.createElement('div');
  //element.style.zIndex = "1000";	  
  var _noticeBtn = document.createElement('noticeBtn');
  
  
  element.className = "vw-notice";
  element.appendChild(_noticeBtn);
	
  var _noticeControl ;
  
  var _noticeImg;
  
	   switch(this.options.basemapType) {
	   case vw.ol3.BasemapType.GRAPHIC :
		   _noticeImg = vw.ol3.enums.COMMON_NOTICE;
		   break;
	   case vw.ol3.BasemapType.GRAPHIC_GRAY :
		   _noticeImg = vw.ol3.enums.COMMON_NOTICE;
		   break;
	   case vw.ol3.BasemapType.GRAPHIC_NIGHT :
		   _noticeImg = vw.ol3.enums.COMMON_NOTICE;
		   break;
	   case vw.ol3.BasemapType.PHOTO :
		   _noticeImg = vw.ol3.enums.COMMON_NOTICE_R;
		   break;
	   default :
		   _noticeImg = vw.ol3.enums.COMMON_NOTICE_R;
		   break;	   			
	}; 

	_noticeBtn.innerHTML = "<img src='" + _noticeImg + "' alt='지적도를 포함한 모든 주제도는 참고용으로만 사용하시기 바랍니다.'/>";
_noticeControl = new ol.control.Control(
		{
			   element: element,
			   target: this.container
			 }		
);
return _noticeControl;
};

vw.ol3.Map.prototype._createScaleLine = function() {
var options = {};

options.className =  "vw-scale-line"  ;
options.minWidth =  30;
	
return new ol.control.ScaleLine(options);				
};


vw.ol3.Map.prototype._setControl = function() {		
	this._defaultControl();
	switch(this.options.controlDensity) {   			
		case		vw.ol3.DensityType.BASIC :
				this._createPanZoomSlider();
				break;
		case		vw.ol3.DensityType.FULL :
				this._createPanZoomSlider();
				this._createToolbar();
				this._createOverviewMapControl({ site: "bottom-right"});
				break; 
	};
};

vw.ol3.Map.prototype._defaultControl = function() {
	
	if ( this.logoConotrol != undefined && this.logoControl != null ) {
		this.removeControl(this.logoConotrol);
	}
	if ( this.commonNotice != undefined && this.commonNotice != null ) {
		this.removeControl(this.commonNotice);
	}
	if ( this.scaleLine != undefined && this.scaleLine != null ) {
		this.removeControl(this.scaleLine);
	}
	this.logoConotrol = this._createLogo();
	this.commonNotice = this._createNotice();
	this.scaleLine = this._createScaleLine();
this.addControl(this.logoConotrol);
this.addControl(this.commonNotice);
this.addControl(this.scaleLine);
};

vw.ol3.Map.prototype._setInteraction = function() {

	switch(this.options.interactionDensity) {   			
	case		vw.ol3.DensityType.BASIC :
			this._setBasicInteraction();
			break;
	case		vw.ol3.DensityType.FULL :
			this._setFullInteraction();
			break;   					
	};
};

vw.ol3.Map.prototype._setBasicInteraction = function() {
	var _cnt = this.basicInteractionList.length;
	for( var i = 0 ; i < _cnt ; i++) {
		this.addInteraction(this.basicInteractionList[i]);
	}
};

vw.ol3.Map.prototype._setFullInteraction = function() {
	var _cnt = this.fullInteractionList.length;
	for( var i = 0 ; i < _cnt ; i++) {
		this.addInteraction(this.fullInteractionList[i]);
	}
};

vw.ol3.Map.prototype._createPanZoomSlider = function() {		

	var zoom = new vw.ol3.control.Zoom(this);	
	zoom.delta = 1;
	zoom.sliderVisible = true;
	zoom.site = "top-right";
	zoom.draw();
	
	this.addControl(zoom);
};

vw.ol3.Map.prototype._createOverviewMapControl = function(_opt) {
	
	var _oMap = new vw.ol3.control.OverviewMap(this);   		
	_oMap.site = _opt.site;   		
	_oMap.draw();
};

vw.ol3.Map.prototype.onMoveEnd = function(evt) {
	this.updateSize();
};

vw.ol3.Map.prototype.addNamedLayer = function(layerName,layerId) {
	return this._mapLayers._createWMSLayer(layerName,layerId); 		
};

vw.ol3.Map.prototype.addKMLLayer = function(kmlUrl,styleFunction, projection, kmlStyle) {
	return this._mapLayers._createKMLLayer(kmlUrl,styleFunction, projection, kmlStyle);
};

vw.ol3.Map.prototype.addWMSBoundaryLayer = function(layerName,layerId,year) {
	return this._mapLayers._createWMSBoundaryLayer(layerName,layerId,year);   		
};

vw.ol3.Map.prototype.addTileCacheLayer = function(layerName,layerId,opt) {
	return this._mapLayers._createTileCacheLayer(layerName,layerId,opt);
};

vw.ol3.Map.prototype.getLayerByName = function(layerName) {
	var _layerCollections = this.getLayers();
		var _cnt = 0;
		if ( vw.ol3.CommonFunc._isDef( _layerCollections ) ){
			_cnt = _layerCollections.getLength();
		}
		
		for (var i = 0 ; i < _cnt; i++) {
			var layer = _layerCollections.item(i);
			var _name = layer.get("name");
	
			if ( vw.ol3.CommonFunc._isDef(_name) ) {
				if (_name == layerName || _name == vw.ol3.vworldCategory.wms + layerName || _name == vw.ol3.vworldCategory.cache + layerName ||  _name == vw.ol3.vworldCategory.theme + layerName) {
					return layer;
				}
			}
		}
};


/**
 *  레이어 숨김.
 */
vw.ol3.Map.prototype.hideThemeLayer = function(layerName) {
	var _layerCollections = this.getLayers();
	var _cnt = 0;
	if ( vw.ol3.CommonFunc._isDef( _layerCollections ) ){
		_cnt = _layerCollections.getLength();
	}
	
	for (var i = 0 ; i < _cnt; i++) {
		var layer = _layerCollections.item(i);
		var _name = layer.get("name");

		if ( vw.ol3.CommonFunc._isDef(_name) ) {
			if (_name == layerName || _name == vw.ol3.vworldCategory.wms + layerName || _name == vw.ol3.vworldCategory.cache + layerName ||  _name == vw.ol3.vworldCategory.theme + layerName) {
				layer.setVisible(false);
			}	
		}
	}
};


/**
 *  모든 주제도 레이어 숨김.
 */
vw.ol3.Map.prototype.hideAllThemeLayers = function() {
	var cat = vw.ol3.vworldCategory.wms;
	var _layerCollections = this.getLayers();
	var _cnt = 0;
	if ( vw.ol3.CommonFunc._isDef( _layerCollections ) ){
		_cnt = _layerCollections.getLength();
	}
	
	for (var i = 0 ; i < _cnt; i++) {
		var layer = _layerCollections.item(i);
		var _name = layer.get("name");

		if ( vw.ol3.CommonFunc._isDef(_name) ) {
			if (_name.indexOf(cat) > -1 ) {
				layer.setVisible(false);
			}	
		}
	}
};

/**
 * 숨겨진 주제도 레이어 보임.
 */
vw.ol3.Map.prototype.showHiddenThemeLayer = function(layerName) {
	var _layerCollections = this.getLayers();
	var _cnt = 0;
	if ( vw.ol3.CommonFunc._isDef( _layerCollections ) ){
		_cnt = _layerCollections.getLength();
	}
	
	for (var i = 0 ; i < _cnt; i++) {
		var layer = _layerCollections.item(i);
		var _name = layer.get("name");

		if ( vw.ol3.CommonFunc._isDef(_name) ) {
			if (_name == layerName || _name == vw.ol3.vworldCategory.wms + layerName || _name == vw.ol3.vworldCategory.cache + layerName ||  _name == vw.ol3.vworldCategory.theme + layerName) {
				layer.setVisible(true);
			}	
		}
	}
};

/**
 * 숨겨진 모든 주제도 레이어 보임.
 */
vw.ol3.Map.prototype.showHiddenThemeLayers = function() {
	var cat = vw.ol3.vworldCategory.wms;
	var _layerCollections = this.getLayers();
	var _cnt = 0;
	if ( vw.ol3.CommonFunc._isDef( _layerCollections ) ){
		_cnt = _layerCollections.getLength();
	}
	
	for (var i = 0 ; i < _cnt; i++) {
		var layer = _layerCollections.item(i);
		var _name = layer.get("name");
		if ( vw.ol3.CommonFunc._isDef(_name) ) {
			if (_name.indexOf(cat) > -1 ) {
				layer.setVisible(true);
			}	
		}
	}
};

/**
 * 지도에 그려진 측정결과,마커,팝업 그래픽 객체를 모두 삭제.
 */
vw.ol3.Map.prototype.clear = function() {
	try{
		   // 측정결과 삭제
		if ( vw.ol3.CommonFunc._isDef(this._controls) ) {
			this._controls._removeToolbarInteractions();
		}
		if ( vw.ol3.CommonFunc._isDef(this._measurement) ) {
			this._measurement.clearAllDisplay();
		}
		// 마커 그래픽 객체 삭제   			
		var layerGroup = this.getLayers();
		var cnt = 0;
		if ( vw.ol3.CommonFunc._isDef(layerGroup)) {
			cnt = layerGroup.getLength();
		};
		for(var i=0; i < cnt; i++) {
			var _vectorLayer = layerGroup.item(i);
			var _vectorSource = _vectorLayer.getSource();
			if ( _vectorSource instanceof ol.source.Vector ) {
				_vectorSource.clear();
			}
		};
		// 팝업객체 삭제.
		this.getOverlays().clear();
	} catch(e) {
		console.log(e);
	}
};


/**
 * 지도에 설정된 이벤트 존재 유무 boolean값으로 반환.
 */
vw.ol3.Map.prototype.isEventExists = function(evtType,listener) {
	var obj = eval("this.listeners_." + evtType);
	if(obj != null){
		return true;
	} else {
		return false;
	}
};

vw.ol3.Map.prototype._getMeasureVectorLayer = function() {
	return this._mapLayers._getLayer("MeasureLayer");
};

vw.ol3.Map.prototype._getHybridLayer = function() {
	return this._mapLayers._getLayer("hybrid");
};

vw.ol3.Map.prototype._addControls = function( _controls) {
	
	var _arrControls = _controls._getArray();
	for(var i=0; i< _arrControls.length; i++) {
		this.addControl(_arrControls[i]);
	}
	
};

vw.ol3.Map.prototype.GetLayerStyles = function(layers, callback, styles){	
	var theStyles 	= (styles  != null ) ? styles : layers;	
	var params = vw.ol3.MapUrls.wms + "layers=" + layers;
		params += "&styles=" + theStyles;
		params += "&SERVICE=WMS";
		params += "&REQUEST=GetStyles";
		params += "&VERSION=1.3.0";
		params += "&outputformat=text/xml";
		params += "&EXCEPTIONS=text/xml";
		params += "&apiKey=" + vworldApiKey;
	
	$.ajax({
		url: "/proxy.do?url=" + encodeURIComponent(params),
		type: "get",
		dataType: "text",
		async: false,
		success: callback,
		error: function(){}
	});
}
	   
vw.ol3.Map.prototype._createToolbar = function() {		
	var _thisMap = this;
	var options = {
			  map: _thisMap
			, site : "top-left"
			, vertical : false
			, collapsed : false
			, collapsible : true
	};

	this._controls.initToolbar(options);
};


vw.ol3.Map.prototype.zoomIn = function(delta) {
	var _delta = 1;
	if ( vw.ol3.CommonFunc._isDef(delta) ) {
		_delta = delta;
	}
  var _zoom = this.getView().getZoom();
  if (  this._checkZoomIn(_zoom) )	{
	  this.getView().setZoom(_zoom + _delta);
  }
};
vw.ol3.Map.prototype.zoomOut = function(delta) {
	 //console.log("zoomOut delta" ,delta);
		var _delta = 1;
		if ( vw.ol3.CommonFunc._isDef(delta) ) {
			_delta = delta;
		}
	var _zoom = this.getView().getZoom();		
	if ( this._checkZoomOut(_zoom) ) {
		this.getView().setZoom(_zoom - _delta);  
	}
};

vw.ol3.Map.prototype._checkZoomIn = function(zoom) {
  if(zoom == vw.ol3.ViewConfig.MAXZOOM) {
	  alert("현재 최대 확대영역 입니다.");
	  return false;
  }
  var chk = false;
  if (zoom < vw.ol3.ViewConfig.MAXZOOM && zoom != vw.ol3.ViewConfig.MAXZOOM) {
	  chk = true;
  }
  return chk;
}

vw.ol3.Map.prototype._checkZoomOut = function(zoom) {
  var chk = true;
  if (zoom < vw.ol3.ViewConfig.MINZOOM) {
	  chk = false;
  }
  return chk;
}
	
vw.ol3.Map.prototype._getControlInteraction = function(index) {
	return this.interactions[index];
};

vw.ol3.Map.prototype._removeControlInteraction = function(index) {
	this.removeInteraction(this.interactions[index]);
};

vw.ol3.Map.prototype._removeControlInteractions = function() {
	//var cnt = this.interactions.length;
	var cnt = 0;
	for ( var i = 0 ; i <   cnt  ; i++) {
		this.removeInteraction(this.interactions[i]);
	}
};
	
vw.ol3.shouldUpdate = true;
vw.ol3.permalMapIndex = 0;

		
// NameSpace 선언
vw.ol3.layer = {};


vw.ol3.Layers = function(map) {		
	// 1. 기본 지도 및 GraphicLayer, MeasureLayer, MarkerLayer , PopupLayer등을 생성하여 컬렉션에 저장한다.
	this._vmap = map;
	this.groupLayer = new vw.ol3.NamedSet();		
	this._init();
};

vw.ol3.Layers.prototype._init = function() {
	
	   this.groupLayer.set(vw.ol3.BasemapType.GRAPHIC, 
		 this._createTileLayer({_vwUrl: vw.ol3.MapUrls.base, _imgType: ".png" })
	   );
	   this.groupLayer.set(vw.ol3.BasemapType.GRAPHIC_GRAY, 
			 this._createTileLayer({_vwUrl: vw.ol3.MapUrls.gray, _imgType: ".png" })
	   );
	   this.groupLayer.set(vw.ol3.BasemapType.GRAPHIC_NIGHT, 
			 this._createTileLayer({_vwUrl: vw.ol3.MapUrls.midnight, _imgType: ".png" })
	   );
	   this.groupLayer.set(vw.ol3.BasemapType.PHOTO , 
			 this._createTileLayer({_vwUrl: vw.ol3.MapUrls.raster, _imgType: ".jpeg" })
	   );
	   this.groupLayer.set("hybrid", 
			 this._createTileLayer({_vwUrl: vw.ol3.MapUrls.hybrid,_imgType: ".png" })
	   );   		
	   
	   this.groupLayer.set("MeasureLayer", this._createMeasureVectorLayer());
	   //this.groupLayer.set("MarkerLayer",this._createMarkerLayer("MarkerLayer"));
	
};

vw.ol3.Layers.prototype._setLayer = function(basemapType) {
	this._removeLayer(basemapType);
	this._removeLayer("hybrid");
	this._setAllVisible(false);
	   switch(basemapType) {
		   case vw.ol3.BasemapType.PHOTO_HYBRID :
			   this._addLayer(this.groupLayer.get(vw.ol3.BasemapType.PHOTO));
			   this._addLayer(this.groupLayer.get("hybrid"));
			   this.groupLayer.get(vw.ol3.BasemapType.PHOTO).setZIndex(0);
			   this.groupLayer.get("hybrid").setZIndex(1);
			   //this.groupLayer.get("hybrid").setExtent(vw.ol3.ViewConfig.MAPEXTENT);//test
			   //this.groupLayer.get(vw.ol3.BasemapType.PHOTO).setExtent(vw.ol3.ViewConfig.MAPEXTENT);//test
			   
			   this._setVisible(this.groupLayer.get(vw.ol3.BasemapType.PHOTO), true);
			   this._setVisible(this.groupLayer.get("hybrid"), true);
			   break;
			   
		   default:
			   this._addLayer(this.groupLayer.get(basemapType));
			   this.groupLayer.get(basemapType).setZIndex(0);
			   //this.groupLayer.get(basemapType).setExtent(vw.ol3.ViewConfig.MAPEXTENT);//test
			   this._setVisible(this.groupLayer.get(basemapType), true);
		   break;
	   };
	   
	   
};

vw.ol3.Layers.prototype._removeLayer = function(layerName) {
	   
	switch(layerName) {
	   case vw.ol3.BasemapType.PHOTO_HYBRID :
		   this._vmap.removeLayer(this.groupLayer.get(vw.ol3.BasemapType.PHOTO));
		   this._vmap.removeLayer(this.groupLayer.get("hybrid"));
		   break;
		   
	   default: 	   			
		   this._vmap.removeLayer(this.groupLayer.get(layerName));
		break;
	};
};

vw.ol3.Layers.prototype._setVisible = function(_layer,isChk) {
	_layer.setVisible(isChk);
};

vw.ol3.Layers.prototype._setAllVisible = function(chk) {
			
	for( var name in vw.ol3.BasemapType) {
		var _layer = this.groupLayer.get(vw.ol3.BasemapType[name]);
		if (vw.ol3.CommonFunc._isDef(  _layer ) ) {
			this._setVisible( _layer , chk);	
		}
	}
	this._setVisible(  this.groupLayer.get("hybrid") , chk);	
	
	
};
//test
vw.ol3.Layers.prototype._setExtent = function(extent) {
	
	for( var name in vw.ol3.BasemapType) {
		var _layer = this.groupLayer.get(vw.ol3.BasemapType[name]);
		if (vw.ol3.CommonFunc._isDef( _layer ) ) {
			_layer.setExtent(extent);
		}
	}
	var _layer = this.groupLayer.get("hybrid");
	if (vw.ol3.CommonFunc._isDef(  _layer ) ) {
		_layer.setExtent(extent);
	}
};

vw.ol3.Layers.prototype._createLayers = function(basemapType) {
		
	   this._setLayer(basemapType); 
	   
	   this._addLayer(this.groupLayer.get("MeasureLayer"));
	   this.groupLayer.get("MeasureLayer").setZIndex(10);
	   //this._addLayer(this.groupLayer.get("MarkerLayer"));
	   //this.groupLayer.get("MarkerLayer").setZIndex(11);
};	

vw.ol3.Layers.prototype._changeLayers = function(basemapType) {
			   
	   this._setLayer(basemapType); 
};

vw.ol3.Layers.prototype._addLayer = function(_layer) {
	this._vmap.addLayer(_layer);
};

vw.ol3.Layers.prototype._getLayer = function(name) {
	return this.groupLayer.get(name);
};

vw.ol3.Layers.prototype._createTileLayer = function(_opts ) {
	   return new ol.layer.Tile({
				   source: this._createSourceBase(_opts)
		   });
   };
	   
vw.ol3.Layers.prototype._createSourceBase = function(_opts) {
	var _vmap = this._vmap;
	   return new ol.source.XYZ( 	{
		projection: vw.ol3.ViewConfig.ORIPROJ,
		maxZoom: vw.ol3.ViewConfig.MAXZOOM,
		minZoom: vw.ol3.ViewConfig.MINZOOM,
		tilePixelRatio:1,
		tileSize: [256,256],
		tileUrlFunction: function(tileCoord,pixelRatio, projection) {	    		
				  if (!tileCoord) { return ""; }
				  var x = tileCoord[1];
				  var y = (-tileCoord[2]-1);
				  var z = tileCoord[0];	
				  var limit = Math.pow(2, z);
				  if ( y < 0 || y > limit ) {
					  return vw.ol3.ImgUrl.blankimage;
				  }
				  else 
				  {
					  x = ((x % limit) + limit) % limit;
					  var _check = ol.extent.intersects(vw.ol3.ViewConfig.MAPEXTENT,_vmap.getView().calculateExtent(_vmap.getSize()));
					  if ( _check ) {
						  if ( z >= 6 && z <= vw.ol3.ViewConfig.SERVERMAXLEVEL )  {
							  return _opts._vwUrl + z.toString()+'/'+ x.toString() +'/'+y.toString() + _opts._imgType;
						  } else {
							  return vw.ol3.ImgUrl.blankimage;
						  }
						  /*var res = _vmap.getView().getResolution();
						  if (z >= 6 && z <= vw.ol3.ViewConfig.SERVERMAXLEVEL ) {
								  return _opts._vwUrl + z.toString()+'/'+ x.toString() +'/'+y.toString() + _opts._imgType;
							} else if (z > vw.ol3.ViewConfig.SERVERMAXLEVEL){									
								var limit = Math.pow(2, z2);
								var n = z - vw.ol3.ViewConfig.SERVERMAXLEVEL;
								var z2 = z-n;
								var nsize = 256* Math.pow(2, n);
								x = Math.round(x *(res*256)/(res * nsize));
								y = Math.round(y *(res*256)/(res * nsize));									
								//console.log("BOUNDS:" + bounds[0] + "," + bounds[1] + "," + bounds[2] + "," + bounds[3] );
								console.log("CURRENT:" + res + "," + _opts._vwUrl + z2.toString()+'/'+ x.toString() +'/'+y.toString() + _opts._imgType );
								return _opts._vwUrl + z2.toString()+'/'+ x.toString() +'/'+y.toString() + _opts._imgType;
							} else return vw.ol3.ImgUrl.blankimage;
						  */
					  } else {
						  return vw.ol3.ImgUrl.blankimage;
					  }
				  }
		},
		wrapX: true			
	});
};


vw.ol3.Layers.prototype._createMeasureVectorLayer = function() {
	var _measureStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.5)'
		  }),
		  stroke: new ol.style.Stroke({
			color: 'rgba(0, 0, 200, 0.6)',
			width: 3
		  }),
		  image: new ol.style.Circle({
			radius: 5,
			stroke: new ol.style.Stroke({
			  color: 'rgba(0, 0, 255, 0.8)'
			}),
			fill: new ol.style.Fill({
			  color: 'rgba(255, 255, 255, 0.7)'
			})
		  })
		  });
	var _measureVectorLayer = new ol.layer.Vector({
	  source: new ol.source.Vector(),	  style: _measureStyle
	});
	
	_measureVectorLayer.set("name","MeasureLayer");
	return _measureVectorLayer ;
};

vw.ol3.Layers.prototype._createGraphicsLayer = function() {
	var _graphicStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.5)'
		  }),
		  stroke: new ol.style.Stroke({
			color: 'rgba(0, 0, 200, 0.6)',
			width: 3
		  }),
		  image: new ol.style.Circle({
			radius: 5,
			stroke: new ol.style.Stroke({
			  color: 'rgba(0, 0, 255, 0.8)'
			}),
			fill: new ol.style.Fill({
			  color: 'rgba(255, 255, 255, 0.7)'
			})
		  })
		  });
	var _graphicLayer  = new ol.layer.Vector({
	  source: new ol.source.Vector(),
	  style: _graphicStyle
	});
	
	_graphicLayer.set("name", "GraphicLayer");
	
	return _graphicLayer;
	
};

vw.ol3.Layers.prototype._createInternalLayer = function() {
	var _graphicStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.5)'
		  }),
		  stroke: new ol.style.Stroke({
			color: 'rgba(0, 0, 200, 0.6)',
			width: 3
		  }),
		  image: new ol.style.Circle({
			radius: 5,
			stroke: new ol.style.Stroke({
			  color: 'rgba(0, 0, 255, 0.8)'
			}),
			fill: new ol.style.Fill({
			  color: 'rgba(255, 255, 255, 0.7)'
			})
		  })});
	var _graphicLayer  = new ol.layer.Vector({
	  source: new ol.source.Vector(),
	  style: _graphicStyle
	});
	
	_graphicLayer.set("name", "GraphicLayer");
	
	return _graphicLayer;
	
};

vw.ol3.Layers.prototype._createPopupLayer = function() {
	return new vw.ol3.layer.Popups();
};

vw.ol3.Layers.prototype._createMarkerLayer = function(name) {
	var _marker = new vw.ol3.layer.Marker();
	_marker.set("name",name);
	return _marker;
};
var _startResolution = ol.extent.getWidth(vw.ol3.ViewConfig.MAXEXTENT) / 512;
var _resolutions = new Array(22);
for (var i = 0, ii = _resolutions.length; i < ii; ++i) {
  _resolutions[i] = _startResolution / Math.pow(2, i);
}
var _tilegrid = new ol.tilegrid.TileGrid({
	origin: ol.extent.getTopLeft(vw.ol3.ViewConfig.MAXEXTENT),
	resolutions: _resolutions,
	tileSize: [512,512]
  });

vw.ol3.Layers.prototype._createWMSLayer = function(_layerName,_layerId) {
	//
	var _wmsLayer = new ol.layer.Tile({
		title: _layerName , 
		name:  vw.ol3.vworldCategory.wms + _layerName,
		extent: vw.ol3.ViewConfig.MAXEXTENT,
		maxZoom: vw.ol3.ViewConfig.MAXZOOM,
		minZoom: vw.ol3.ViewConfig.MINZOOM,
		projection: vw.ol3.ViewConfig.ORIPROJ,
		tilePixelRatio:1,
		tileSize: [512,512],
		source: new ol.source.TileWMS({
			url: vw.ol3.MapUrls.wms2,
			params: {
				LAYERS: _layerId,
				STYLES: _layerId,
				CRS: vw.ol3.ViewConfig.ORIPROJ,
				apikey: vworldApiKey,
				//size: 512,
				title: _layerName,
				FORMAT: 'image/png'
			},
			tileGrid: _tilegrid
		})
	});
	_wmsLayer.setZIndex(5);
	return _wmsLayer;
};

vw.ol3.Layers.prototype._createKMLLayer = function(_kmlUrl , styleFunction, projection, kmlStyle) {
	if(kmlStyle == null || kmlStyle == undefined || kmlStyle == ''){
		kmlStyle = false;
	}
	if(projection == null || projection == undefined || projection == ''){
		projection = 'EPSG:900913';
	}
	var _kmlLayer = new ol.layer.Vector({
		  source: new ol.source.Vector({
				projection:new ol.proj.get(projection),
				url:_kmlUrl,
				format: new ol.format.KML(
						{extractStyles: kmlStyle}		
					)
		  }),
		  style: styleFunction
		});
	_kmlLayer.setZIndex(5);
	return _kmlLayer;
};

vw.ol3.Layers.prototype._createWMSBoundaryLayer = function(_layerName,_layerId,_year) {
	var _themeLayer = new ol.layer.Tile({
		title: _layerName , 
		name:  vw.ol3.vworldCategory.wms + _layerName,
		extent: vw.ol3.ViewConfig.MAXEXTENT,
		maxZoom: vw.ol3.ViewConfig.MAXZOOM,
		minZoom: 11,
		projection: vw.ol3.ViewConfig.ORIPROJ,
		tilePixelRatio:1,
		tileSize: [512,512],
		source: new ol.source.TileWMS({
			url: vw.ol3.MapUrls.wms2,
			params: {
				LAYERS: _layerId + "_" + _year,
				STYLES: _layerId,
				VERSION: '1.3.0',
				EXCEPTIONS: 'text/xml',
				TRANSPARENT: 'true',
				CRS: vw.ol3.ViewConfig.ORIPROJ,
				apikey: vworldApiKey,
				//size: 512,
				FORMAT: 'image/png'
			},
			tileGrid : _tilegrid
		})
	});
	_themeLayer.setZIndex(5);
	return _themeLayer;
};

vw.ol3.Layers.prototype._createTileCacheLayer = function(_layerName,_layerId,_opt) {
	var _vmap = this._vmap;	
	var _gridSource = new ol.source.XYZ( 	{
			title: _layerName , 
			name:  vw.ol3.vworldCategory.wms + _layerName,
			projection: vw.ol3.ViewConfig.ORIPROJ,
			   maxZoom: _opt.maxZoom,
			   minZoom: _opt.minZoom,
			   tilePixelRatio:1,
			   tileSize: [256,256],
			   tileUrlFunction: function(tileCoord,pixelRatio, projection) {	    		
						 if (!tileCoord) { return ""; }
						 var x = tileCoord[1];
						 var y = (-tileCoord[2]-1);
						 var z = tileCoord[0];	
						 var limit = Math.pow(2, z);
						 if ( y < 0 || y > limit ) {
							 return vw.ol3.ImgUrl.blankimage;
						 }
						 else 
						 {
							 x = ((x % limit) + limit) % limit;

							 var _check = ol.extent.intersects(vw.ol3.ViewConfig.MAPEXTENT,_vmap.getView().calculateExtent(_vmap.getSize()));
							 if ( _check ) {
								 if ( z >= 6 && z <= vw.ol3.ViewConfig.SERVERMAXLEVEL )  {
									 var _urls = vw.ol3.MapUrls.tile2d + "/" + _layerId + "/"+z.toString()+'/'+ x.toString() +'/'+y.toString() + ".png";
								   return _urls;
								 } else {
									 return vw.ol3.ImgUrl.blankimage;
								 }
								 
							 } else {
								 return vw.ol3.ImgUrl.blankimage;
							 }
						 }
			   },
			   wrapX: true			
		   });
		var _themeLayer = new ol.layer.Tile({
				extent: vw.ol3.ViewConfig.MAPEXTENT,
				maxZoom: _opt.maxZoom,
				minZoom: _opt.minZoom,
				projection: vw.ol3.ViewConfig.ORIPROJ,
				tilePixelRatio:1,
				tileSize: [256,256],
				source: _gridSource,
				name: _layerName
			});
		
		_themeLayer.setZIndex(5);
		
		return _themeLayer;
}

vw.ol3.layer.Graphics = function() {
	ol.layer.Vector.call(this);
	var _vectorSource = new ol.source.Vector({projection:"EPSG4326",wrapX:true});
	
	this.setSource(_vectorSource);
};

vw.ol3.inherits( vw.ol3.layer.Graphics , ol.layer.Vector );
	   
vw.ol3.layer.GraphicsGroup = function() {
	this.active = "NULL";
	ol.layer.Group.call(this);		
	var _initGraphics = this.add("DEFAULT");
	this.active =_initGraphics; 
};

vw.ol3.inherits( vw.ol3.layer.GraphicsGroup , ol.layer.Group );

vw.ol3.layer.GraphicsGroup.prototype.add = function(name) {
	var _createGraphic = new vw.ol3.layer.Graphics();
	_createGraphic.set("name",name);
	this.setLayers([_createGraphic]);		
	return _createGraphic;
};

vw.ol3.layer.GraphicsGroup.prototype.setActive = function(name) {
	var _groupLayers = this.getLayers().getArray();
	var _returnGraphics = null;
	for( var ii in _groupLayers) {
		var _name = _groupLayers[ii].get("name");
		if ( name == _name) {
			_returnGraphics = _groupLayers[ii];
			break;
		}
	}
	this.active =_returnGraphics ; 
	return _returnGraphics;
};

var markerLayerListenerId;
vw.ol3.layer.Marker = function(map) {
	vw.ol3.layer.Graphics.call(this);
	this.map = map;
	this.emptyMarkerStyle = new ol.style.Style({
		image : new ol.style.Icon(({
			scale : 1,
			size : [1,1],
			opacity : 0,
			src : vw.ol3.BaseURLs.vworldUrl + "/images/maps/blank.gif"
		}))
	});
	var _vmap = this.map;
	this.markerClickPopupFunction = function(evt) {
		var feature = _vmap.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
			if (layer != null && layer.className == 'vw.ol3.layer.Marker') {
				return feature;
			} else {
				return false;
			}
		});
		if (feature) {
			var featureId = feature.get("id").replace("Marker-", "");
			var isCreated = false;
			for(var i in vw._vmap.getOverlays().getArray()){
				if(vw._vmap.getOverlays().getArray()[i].get('id').indexOf("MarkerPop-") != -1){
					if (vw._vmap.getOverlays().getArray()[i].get('id').replace("MarkerPop-","") == featureId) {
						if (vw._vmap.getOverlays().getArray()[i].rendered_.visible) {
							vw._vmap.getOverlays().getArray()[i].close();
							isCreated = true;
							return;
						}
					} else {
						if (vw._vmap.getOverlays().getArray()[i].rendered_.visible) {
							vw._vmap.getOverlays().getArray()[i].close();
						}
						var popup = new vw.ol3.popup.Popup();
						popup.setOffset([ 0, -25 ]);
						popup.title = "<b>" + feature.get('title')+"</b><hr>";
						popup.content = feature.get('contents');
						popup.set("id", "MarkerPop-"+featureId);
						vw._vmap.addOverlay(popup);
						popup.show(popup.content, feature.getGeometry().getCoordinates());
						return;
					}
				}
			}
			if(!isCreated){
				var popup = new vw.ol3.popup.Popup();
				popup.setOffset([ 0, -25 ]);
				popup.title = "<b>" + feature.get('title')+"</b><hr>";
				popup.content = feature.get('contents');
				popup.set("id", "MarkerPop-"+featureId);
				vw._vmap.addOverlay(popup);
				popup.show(popup.content, feature.getGeometry().getCoordinates());
				return;
			}
		}
	};
	
	var _vectorSource = new ol.source.Vector({projection:"EPSG4326",wrapX:true});
	this.setSource(_vectorSource);
	this.className = "vw.ol3.layer.Marker";
	if(markerLayerListenerId == null){
		markerLayerListenerId = this.map.on("singleclick",this.markerClickPopupFunction,this.map);
	}
};

vw.ol3.inherits( vw.ol3.layer.Marker, vw.ol3.layer.Graphics );

vw.ol3.layer.Marker.prototype.addMarker = function(markerOption) {
	if(!vw.ol3.CommonFunc._isDef(markerOption)){
		alert("마커 옵션이 입력되지 않았습니다.");
		return;
	}
	
	var e1='';
	
	if(!vw.ol3.CommonFunc._isDef(markerOption.x)){
		e1 += '[x] ';
	}
	
	if(!vw.ol3.CommonFunc._isDef(markerOption.y)){
		e1 += '[y] ';
	}
	
	if(!vw.ol3.CommonFunc._isDef(markerOption.epsg)){
		e1 += '[epsg] ';
	}
	
	if(e1 != ''){
		e1 += '는 필수입력 파라미터 입니다.';
	}
	
	var e2='';
	if(vw.ol3.CommonFunc._isDef(markerOption.x)){
		if(!vw.ol3.CommonFunc._isNumber(markerOption.x)){
			e2 += '[x] ';
		}
	}
	
	if(vw.ol3.CommonFunc._isDef(markerOption.y)){
		if(!vw.ol3.CommonFunc._isNumber(markerOption.y)){
			e2 += '[y] ';
		}
	}
	
	if(e2 != ''){
		e2 += '파라미터는 숫자만 입력할 수 있습니다.';
	}
	
	var e3='';
	if(vw.ol3.CommonFunc._isDef(markerOption.epsg)){
		if(markerOption.epsg != 'EPSG:900913' && markerOption.epsg != 'EPSG:3857' && markerOption.epsg != 'EPSG:4326'){
			e3 += '[epsg] 파라미터는 EPSG:3857, EPSG:4326, EPSG:900913 만 입력할수 있습니다. ';
		}
	}
	
	if(e1 != '' || e2 != '' || e3 != ''){
		alert(e1 + '\n' + e2 + '\n' + e3);
		return;
	}
	
	// 마커텍스트 스타일 정의
	var olStyleText;
	var mtext = {};
	if(vw.ol3.CommonFunc._isDef(markerOption.text)){
		mtext = markerOption.text;
		
		 //글자색 정의여부.. 기본값 부여
		var fill = {color : '#000'};
		if(vw.ol3.CommonFunc._isDef(mtext.fill) && vw.ol3.CommonFunc._isDef(mtext.fill.color)){
			fill.color = mtext.fill.color;
		}
		
		//글자선 정의여부.. 기본값 부여
		var stroke = {color : '#fff', width: 2};
		if(vw.ol3.CommonFunc._isDef(mtext.stroke) && vw.ol3.CommonFunc._isDef(mtext.stroke.color)){
			stroke.color = mtext.stroke.color;
		}
		if(vw.ol3.CommonFunc._isDef(mtext.stroke) && vw.ol3.CommonFunc._isDef(mtext.stroke.width)){
			stroke.width = mtext.stroke.width;
		}
		
		//글자 전체스타일 정의
		olStyleText = new ol.style.Text({
			offsetX: vw.ol3.CommonFunc._isDef(mtext.offsetX)? mtext.offsetX : 0.5, //위치설정
			offsetY: vw.ol3.CommonFunc._isDef(mtext.offsetY)? mtext.offsetY : 20,   //위치설정
			font: vw.ol3.CommonFunc._isDef(mtext.font)? mtext.font : '12px Calibri,sans-serif',
			fill: new ol.style.Fill({ color: fill.color }),
			stroke: new ol.style.Stroke({ color: stroke.color, width: stroke.width }),
			text: vw.ol3.CommonFunc._isDef(mtext.text)? mtext.text : ""
		});
	}
	
	var x = Number(markerOption.x);
	var y = Number(markerOption.y);
	var epsg = markerOption.epsg;
	var title = (markerOption.title != null && vw.ol3.CommonFunc._trim(markerOption.title) != '') ? markerOption.title : ' ';
	var contents = (markerOption.contents != null && vw.ol3.CommonFunc._trim(markerOption.contents) != '') ? markerOption.contents : ' ';
	var iconUrl = (markerOption.iconUrl != null) ? markerOption.iconUrl : vw.ol3.ImgUrl.marker + vw.ol3.ImgUrl.markerimage;
	var attr = (vw.ol3.CommonFunc._isDef(markerOption.attr)) ? markerOption.attr : {};
	var anchor = (vw.ol3.CommonFunc._isDef(markerOption.imgAnchor)) ? markerOption.imgAnchor : {"x": 0.5, "y": 1};

	var xy;
	if(markerOption.epsg == 'EPSG:900913' || markerOption.epsg == 'EPSG:3857'){
		xy = [x,y];
	}else{
		xy = ol.proj.transform([x,y], markerOption.epsg, "EPSG:900913");
	}
	
	var point = new ol.geom.Point(xy);		
	var feature = new ol.Feature(point);
	

	var _markerStyle = new ol.style.Style({
		image : new ol.style.Icon({
			scale : 1,
			rotateWithView : false,
			anchor : [ anchor.x, anchor.y ],
			anchorXUnits : 'fraction',
			anchorYUnits : 'fraction',
			opacity : 1,
			src : iconUrl
		}),
		text: olStyleText
	});
	
	
	var gid = vw.ol3.CommonFunc._makeUniqeIds();

	feature.set("id", "Marker-"+gid );
	feature.set("imgUrl", iconUrl);
	feature.set("markerStyle", _markerStyle);
	feature.set("title", title);
	feature.set("contents", contents);
	feature.setStyle(_markerStyle);
	feature.set("text", mtext);
	feature.set("attr",attr);
	
	this.getSource().addFeature(feature);
	
	return feature;
};
vw.ol3.layer.Marker.prototype.hideMarker = function(marker) {
	for(var i=0; i<vw._vmap.getOverlays().getArray().length; i++){
		if(vw._vmap.getOverlays().getArray()[i].get('id').replace("MarkerPop-","") == marker.get('id').replace("Marker-","")){
			if(vw._vmap.getOverlays().getArray()[i].rendered_.visible){
				vw._vmap.getOverlays().getArray()[i].close();
				vw._vmap.removeOverlay(vw._vmap.getOverlays().getArray()[i]);
				i--;
			} else {
				vw._vmap.removeOverlay(vw._vmap.getOverlays().getArray()[i]);
				i--;
			}
		}
	}
	marker.setStyle(this.emptyMarkerStyle);
}
vw.ol3.layer.Marker.prototype.showMarker = function(marker) {
	marker.setStyle(marker.get('markerStyle'));
}
vw.ol3.layer.Marker.prototype.hideAllMarker = function() {
	this.closeAllPop();
	var markers = this.getSource().getFeatures();
	for(var i=0; i<markers.length; i++){
		markers[i].setStyle(this.emptyMarkerStyle);
	}
}
vw.ol3.layer.Marker.prototype.showAllMarker = function() {
	var markers = this.getSource().getFeatures();
	for(var i=0; i<markers.length; i++){
		markers[i].setStyle(markers[i].get('markerStyle'));
	}
}
vw.ol3.layer.Marker.prototype.removeMarker = function(marker) {
	for(var i=0; i<vw._vmap.getOverlays().getArray().length; i++){
		if(vw._vmap.getOverlays().getArray()[i].get('id').replace("MarkerPop-","") == marker.get('id').replace("Marker-","")){
			if(vw._vmap.getOverlays().getArray()[i].rendered_.visible){
				vw._vmap.getOverlays().getArray()[i].close();
				vw._vmap.removeOverlay(vw._vmap.getOverlays().getArray()[i]);
				i--;
			} else {
				vw._vmap.removeOverlay(vw._vmap.getOverlays().getArray()[i]);
				i--;
			}
		}
	}
	this.getSource().removeFeature(marker);
}
vw.ol3.layer.Marker.prototype.removeAllMarker = function() {
	for(var i=0; i<vw._vmap.getOverlays().getArray().length; i++){
		if(vw._vmap.getOverlays().getArray()[i].get('id').indexOf("MarkerPop-") != -1){
			if(vw._vmap.getOverlays().getArray()[i].rendered_.visible){
				vw._vmap.getOverlays().getArray()[i].close();
				vw._vmap.removeOverlay(vw._vmap.getOverlays().getArray()[i]);
				i--;
			} else {
				vw._vmap.removeOverlay(vw._vmap.getOverlays().getArray()[i]);
				i--;
			}
		}
	}
	this.getSource().clear();
}

vw.ol3.layer.Marker.prototype.showPop = function(feature) {
	if (feature) {
		var featureId = feature.get("id").replace("Marker-", "");
		var isCreated = false;
		for(var i in vw._vmap.getOverlays().getArray()){
			if(vw._vmap.getOverlays().getArray()[i].get('id').indexOf("MarkerPop-") != -1){ //마커이면..
				if (vw._vmap.getOverlays().getArray()[i].get('id').replace("MarkerPop-","") == featureId) { // 현재선택된 마커이면..
					if (vw._vmap.getOverlays().getArray()[i].rendered_.visible) { //열려있으면..
						isCreated = true;
						return;
					}
				} else {
					if (vw._vmap.getOverlays().getArray()[i].rendered_.visible) {
						vw._vmap.getOverlays().getArray()[i].close();
					}
					var popup = new vw.ol3.popup.Popup();
					popup.setOffset([ 0, -25 ]);
					popup.title = "<b>" + feature.get('title')+"</b><hr>";
					popup.content = feature.get('contents');
					popup.set("id", "MarkerPop-"+featureId);
					vw._vmap.addOverlay(popup);
					popup.show(popup.content, feature.getGeometry().getCoordinates());
					return;
				}
			}
		}
		if(!isCreated){
			var popup = new vw.ol3.popup.Popup();
			popup.setOffset([ 0, -25 ]);
			popup.title = "<b>" + feature.get('title')+"</b><hr>";
			popup.content = feature.get('contents');
			popup.set("id", "MarkerPop-"+featureId);
			vw._vmap.addOverlay(popup);
			popup.show(popup.content, feature.getGeometry().getCoordinates());
			return;
		}
	}
}

vw.ol3.layer.Marker.prototype.hidePop = function(feature) {
	if (feature) {
		var featureId = feature.get("id").replace("Marker-", "");
		var isCreated = false;
		for(var i in vw._vmap.getOverlays().getArray()){
			if(vw._vmap.getOverlays().getArray()[i].get('id').indexOf("MarkerPop-") != -1){
				if (vw._vmap.getOverlays().getArray()[i].get('id').replace("MarkerPop-","") == featureId) {
					if (vw._vmap.getOverlays().getArray()[i].rendered_.visible) {
						vw._vmap.getOverlays().getArray()[i].close();
						return;
					}
				}
			}
		}
	}
}

vw.ol3.layer.Marker.prototype.closeAllPop = function() {
	for(var i=0; i<vw._vmap.getOverlays().getArray().length; i++){
		if(vw._vmap.getOverlays().getArray()[i].get('id').indexOf("MarkerPop-") != -1){
			vw._vmap.getOverlays().getArray()[i].close();
			i--;
		}
	}
}




/**
 * 2.21. vw.ol3.popup.Popup Class
 * @description 지도 위에 표출할 정보창.
 * @superclass ol.Overlay
 */
vw.ol3.popup.Popup = function() {
	this.title = "";
	this.content = "";
	
	this._element = vw.ol3.CommonFunc._createElement("div");
	this._element.id = "popup";
	this._element.className = "vw-popup";
	
	this.contentEl = vw.ol3.CommonFunc._createElement("div");
			
	vw.ol3.CommonFunc._append(this._element,this.contentEl);
	
	this.closerEl = vw.ol3.CommonFunc._createElement("div");
	this.closerEl.className = "vw-popup-closer";
	this.closerEl.id = "popup-closer";
	
	vw.ol3.CommonFunc._append(this._element,this.closerEl);
	
	var _options = {
			element: this._element,
			autoPan: true,
			positioning: 'top-center',
			offset: [0,0],
			autoPanAnimation: { duration: 250 }
	};
	
	ol.Overlay.call(this,_options);
	
	var _thisPop  = this;
			
	var closeBtn = vw.ol3.CommonFunc._createElement("img");
	closeBtn.src =  vw.ol3.ImgUrl.close;
	closeBtn.title="닫기";
	
	this.closerHandler = function(evt) {
		//_thisPop.setPosition(undefined);
		//_thisPop.closerEl.blur();
		vw._vmap.removeOverlay(_thisPop);
		return false;
	};
	
	vw.ol3.CommonFunc._append(this.closerEl,closeBtn);
	
	closeBtn.addEventListener( "click", this.closerHandler, true);
	
};

vw.ol3.inherits( vw.ol3.popup.Popup, ol.Overlay);

vw.ol3.popup.Popup.prototype.show = function(content,point) {
	this.content = content;
	var popupContentHTML = "";
	popupContentHTML += "<div id='areaInfoWrap' style='width:170px'>";
	popupContentHTML += "<div id='areaTitle'>";
	popupContentHTML += this.title;
	popupContentHTML += "</div>";
	popupContentHTML += "<div id='areaInfo'>";	
	popupContentHTML += this.content;
	popupContentHTML += "</div>";
	popupContentHTML += "</div>";
	
	this.contentEl.innerHTML = popupContentHTML ;
	
	this.setPosition(point);
};

vw.ol3.popup.Popup.prototype.close = function() {
	//this.setPosition(undefined);
	vw._vmap.removeOverlay(this);
	//this.closerEl.blur();
};


/**
 * 2.20. vw.ol3.layer.Popups Class
 * @description Popup 레이어, 하나의 대표 popup을 유지하거나, 다중 popup을 관리할 수 있는 클래스.
 * @superclass ol.layer.Vector
 * @returns {vw.ol3.layer.Popups}
 */
vw.ol3.layer.Popups = function() {
	ol.layer.Vector.call(this);
	this.single = null;
};

vw.ol3.inherits( vw.ol3.layer.Popups , ol.layer.Vector );

var textLayerListenerId;
vw.ol3.layer.TEXTLayer = function(map,epsg,url) {
	
	ol.Object.call(this);
	this.map = map;
	this.epsg = epsg;
	this.url = url;
	this.features = new Array();
	this.className = "vw.ol3.layer.TEXTLayer";
	
	var _vmap = this.map;
	var _openTextPop;

	this.popFunction = function(evt) {
		var feature = _vmap.forEachFeatureAtPixel(evt.pixel, function(feature,layer) {
			if (layer.className == 'vw.ol3.layer.TEXTLayer.Cluster') {
				return feature;
			} else {
				return false;
			}
		});
		if (feature) {
			var _fList = feature.get("features");
			var cnt = _fList.length;
			var id;
			var pop;
			if (cnt == 1) {
				if (_openTextPop != null) {
					if(_openTextPop.get('isMulti')){
						if (_openTextPop.rendered_.visible) {
							_openTextPop.close();
							_openTextPop = null;
						}
					} else {
						if (_openTextPop.get('id') == feature.get("features")[0].get('id')) {
							if (_openTextPop.rendered_.visible) {
								_openTextPop.close();
								_openTextPop = null;
								return;
							}
						} else {
							_openTextPop.close();
							_openTextPop = null;
							
							var popup = new vw.ol3.popup.Popup();
							popup.setOffset([ 0, -25 ]);
							popup.title = "<b>" + feature.get("features")[0].get('title')+"</b><hr>";
							popup.content = feature.get("features")[0].get('contents');
							popup.set("id",  feature.get("features")[0].get('id'));
							popup.set("isMulti",  false);
							_vmap.addOverlay(popup);
							popup.show(popup.content, feature.get("features")[0].getGeometry().getCoordinates());
							_openTextPop = popup;
							return;
						}
					}
				} 
				
				var popup = new vw.ol3.popup.Popup();
				popup.setOffset([ 0, -25 ]);
				popup.title = "<b>" + feature.get("features")[0].get('title')+"</b><hr>";
				popup.content = feature.get("features")[0].get('contents');
				popup.set("id",  feature.get("features")[0].get('id'));
				popup.set("isMulti",  false);
				_vmap.addOverlay(popup);
				popup.show(popup.content, feature.get("features")[0].getGeometry().getCoordinates());
				_openTextPop = popup;
				return;
			} else {
				if (_openTextPop != null) {
					if(_openTextPop.get('isMulti') && _openTextPop.get('id') == feature.get("features")[0].get('id')){
						if (_openTextPop.rendered_.visible) {
							_openTextPop.close();
							_openTextPop = null;
							return;
						}
					} else {
						if (_openTextPop.rendered_.visible) {
							_openTextPop.close();
							_openTextPop = null;
						}
					}
				}
				
				var popup = new vw.ol3.popup.Popup();
				popup.setOffset([ 0, -25 ]);
				var contentText = '';
				for(var i=0; i<cnt; i++){
					contentText += "<b>" + feature.get('features')[i].get('title') + "</b><hr>";
					contentText += feature.get('features')[i].get('contents') + "<br><br>";
					if(i == 2){
						break;
					}
				}
				
				if(cnt < 4){
					contentText += "<center><b>총 " + cnt + " 개의 마커 선택<b></center>";
				} else {
					contentText += "<center><b>...<br><br>총 " + cnt + " 개의 마커 선택<b></center>";
				}
				
				popup.title = '';
				popup.content = contentText;
				popup.set("id",  feature.get("features")[0].get('id'));
				popup.set("isMulti",  true);
				_vmap.addOverlay(popup);
				popup.show(popup.content, feature.get("features")[0].getGeometry().getCoordinates());
				_openTextPop = popup;
				return;
			}
		}
	};
	  
	  
	if(textLayerListenerId == null){
		textLayerListenerId = this.map.on("singleclick",this.popFunction, this);
	}
	return this;		
};

vw.ol3.inherits( vw.ol3.layer.TEXTLayer, ol.Object );
	
vw.ol3.layer.TEXTLayer.prototype.draw = function(distance) {
	var count =0;
	// url이 없으면. 안됨.
	if ( ! vw.ol3.CommonFunc._isDef(this.url) ) {
		return false;
	}
	var vmap = this.map;
	var _popList = this.popupList;
	var iconStyle = vw.ol3.ImgUrl.marker + vw.ol3.ImgUrl.markerblueimage;
	var _features = this.features;
			
	var drawFeature = function(coordinate,title,desc,iconSize,icon) {
		// icon이 null이면
		if ( ! vw.ol3.CommonFunc._isDef( icon ) ) {
			icon = vw.ol3.ImgUrl.marker + vw.ol3.ImgUrl.markerblueimage	
		}
		iconStyle = icon;
		var _featureStyle = new ol.style.Style({
			image: new ol.style.Icon(({
				scale: 1,
				rotateWithView: false,
				anchor: [0.5, 1],
				anchorXUnits: 'fraction',
				anchorYUnits: 'fraction',
				opacity: 1,
				src: iconStyle
				}))
		});
		var point = new ol.geom.Point(coordinate);		
		var feature = new ol.Feature(point);			
		feature.set("id", "TexLayertMarker-" + vw.ol3.CommonFunc._makeUniqeIds());
		feature.set("title",title);
		feature.set("contents",desc);
		_features[_features.length] = feature;
	};
			
	var addCluster = function() {
		var source = new ol.source.Vector();
		source.addFeatures(_features);
		var clusterSource = new ol.source.Cluster(
				{
					distance: distance,
					source: source
				}		
		);				
		var styleCache = {};			
		var clusters = new ol.layer.Vector(
				{
					source: clusterSource,
					style: function(feature,resolution) {
							var size = feature.get("features").length;
							var style = styleCache[size];
							if ( ! style ) {
								style = [
										 new ol.style.Style({
											 image: new ol.style.Icon(({
												 scale: 1,
												 rotateWithView: false,
												 anchor: [0.5, 1],
												 anchorXUnits: 'fraction',
												 anchorYUnits: 'fraction',
												 opacity: 1,
												 src: iconStyle
												 }))
										  }),
										  new ol.style.Style({
												 text: new ol.style.Text(
													   {
														   anchor: [0.5, 5],
														   text: size.toString(),
														   font: '12px helvetica,sans-serif',
														   textAlign: "center",
														   textBaseline: "top",
														   stroke: new ol.style.Stroke(
															  {
																   color: "#fff",
																   width:2
															   }
														   ),
														   fill: new ol.style.Fill(
															   {
																   color: "#000"	
															   }	
														   )
													   }		 
													)		                     
											 })
								  ];
								styleCache[size] = style;
							}
							return style;
						}
					}		
				);
		
		vw.ol3.CommonFunc._setClassName(clusters, "vw.ol3.layer.TEXTLayer.Cluster");
		vmap.addLayer(clusters);		
	};		
	
	var _epsg = this.epsg;
	var _draw4326 =  function(lon,lat,title,desc,iconSize,icon) {
		var lon = Number(lon);
		var lat = Number(lat);
		var _xy = ol.proj.transform([lon,lat], "EPSG:4326","EPSG:900913");
		drawFeature(_xy,title,desc,iconSize,icon);		
	};
	
	var _draw900913 = function(pixel,title,desc,iconSize,icon) {
		pixel = pixel.split(",");
		var coordinate = [Number(pixel[1]),Number(pixel[0])];
		drawFeature(coordinate,title,desc,iconSize,icon);		
	};
	
	jQuery.get(this.url, function(data) {
		var lineList = data.split("\n");
		 for( var i = 0 ,cnt = lineList.length ; i < cnt ; i++ ) {
			var _line = lineList[i];
			var _line = vw.ol3.CommonFunc._trim(lineList[i]);
			var lineData = _line.split("\t");
			if ( i >0  && _line != "" ) {
				if ( _epsg == "EPSG:4326" ) {
					_draw4326(lineData[0],lineData[1],lineData[2],lineData[3],lineData[4],lineData[5]);
				} else if ( _epsg == "EPSG:900913" ||  _epsg == "EPSG:3857" ) {
					_draw900913(lineData[0],lineData[1],lineData[2],lineData[3],lineData[4]);
				}	
			}
			if ( i == cnt -1 ) {
				addCluster();
			}
		}
	});
	
	return true;
};

vw.ol3.layer.TEXTLayer.prototype.readDraw = function(epsg,distance,value) {
	var count =0;
	var vmap = this.map;
	var iconStyle = vw.ol3.ImgUrl.marker + vw.ol3.ImgUrl.markerblueimage;
	var _features = this.features;
	
	var drawFeature = function(coordinate,title,desc,iconSize,icon) {
		// icon이 null이면
		if ( ! vw.ol3.CommonFunc._isDef( icon ) ) {
			icon = vw.ol3.ImgUrl.marker + vw.ol3.ImgUrl.markerblueimage	
		}

		iconStyle = icon;
		var point = new ol.geom.Point(coordinate);		
		var feature = new ol.Feature(point);
		feature.set("id", "TexLayertMarker-" + vw.ol3.CommonFunc._makeUniqeIds());
		feature.set("title",title);
		feature.set("contents",desc);
		_features[_features.length] = feature;
	};
			
	var addCluster = function() {
		var source = new ol.source.Vector();
		source.addFeatures(_features);
		
		var clusterSource = new ol.source.Cluster(
				{
					distance: distance,
					source: source
				}		
		);
			
		var styleCache = {};
		var gid = "Cluster-" + vw.ol3.CommonFunc._makeUniqeIds();
		var clusters = new ol.layer.Vector(
				{
					id:gid,
					source: clusterSource,
					style: function(feature,resolution) {
							var size = feature.get("features").length;
							var style = styleCache[size];
							if ( ! style ) {
								style = [
										 new ol.style.Style({
											 image: new ol.style.Icon(({
												 scale: 1,
												 rotateWithView: false,
												 anchor: [0.5, 1],
												 anchorXUnits: 'fraction',
												 anchorYUnits: 'fraction',
												 opacity: 1,
												 src: iconStyle
												 }))
										  }),
										  new ol.style.Style({
												 text: new ol.style.Text(
													   {
														   anchor: [0.5, 5],
														   text: size.toString(),
														   font: '12px helvetica,sans-serif',
														   textAlign: "center",
														   textBaseline: "top",
														   stroke: new ol.style.Stroke(
															  {
																   color: "#fff",
																   width:2
															   }
														   ),
														   fill: new ol.style.Fill(
															   {
																   color: "#000"	
															   }	
														   )
													   }		 
													)		                     
											 })
								  ];
								styleCache[size] = style;
							}
							return style;
						}
					}		
				);
				vw.ol3.CommonFunc._setClassName(clusters, "vw.ol3.layer.TEXTLayer.Cluster");
				vmap.addLayer(clusters);		
	};
	
	var _epsg = this.epsg;
	var _draw4326 =  function(lon,lat,title,desc,iconSize,icon) {
		var lon = Number(lon);
		var lat = Number(lat);
		var _xy = ol.proj.transform([lon,lat], "EPSG:4326","EPSG:900913");
		drawFeature(_xy,title,desc,iconSize,icon);		
	};
	
	var _draw900913 = function(pixel,title,desc,iconSize,icon) {
		pixel = pixel.split(",");
		var coordinate = [Number(pixel[1]),Number(pixel[0])];
		drawFeature(coordinate,title,desc,iconSize,icon);		
	};		
	
	var lineList = value.split("\n");
	 for( var i = 0 ,cnt = lineList.length ; i < cnt ; i++ ) {
		var _line = vw.ol3.CommonFunc._trim(lineList[i]);
		var lineData = _line.split("\t");
		if ( i >0 && _line != '' ) {
			if ( _epsg == "EPSG:4326" ) {
				_draw4326(lineData[0],lineData[1],lineData[2],lineData[3],lineData[4],lineData[5]);
			} else if ( _epsg == "EPSG:900913" ||  _epsg == "EPSG:3857" ) {
				_draw900913(lineData[0],lineData[1],lineData[2],lineData[3],lineData[4]);
			}	
		}
		if ( i == cnt -1 ) {
			addCluster();
		}
	};
};	


vw.ol3.control = {};
vw.ol3.button = {};

vw.ol3.Controls = function(_map) {
	
	this.map = _map;
	
	this.zoomLists = [
					  this._zoom
					  ,this._zoomSlider 
					  ,this._zoomup
					  ,this._zoomLeft
					  ,this._zoomBottom
					  ,this._zoomRight
					  ,this._zoomCenter
					  ,this._zoomInit
					  ,this._zoomDist
					  ,this._zoomArea               
	];
	
	this._toolbar= null;
	
	this.interactionList =null;
	this._permalMap = null;
	this._updatePermalink=null;
	
	this.calcDistanceHandler=null ;
	this.calcAreaHandler=null ;	
	
	this._createToolbarInteractions();
	
};

vw.ol3.Controls.prototype._clear = function() {
	this._removeControls();
	/*$(".ol-zoom-in").remove();
	$(".ol-zoom-out").remove();
	$(".ol-zoom").remove();*/
};

vw.ol3.Controls.prototype._createToolbarInteractions = function() {
	this.interactionList = [
		  new ol.interaction.DragZoom(	{	
			  condition: ol.events.condition.always
		  } )                
		, new ol.interaction.DragZoom(	{	
			  condition: ol.events.condition.always,
			  out: true
		  } ) 
		, new ol.interaction.DragPan()
	];
};

vw.ol3.Controls.prototype._addToolbarInteractions = function() {
	if ( ! vw.ol3.CommonFunc._isDef(this.interactionList) ) {
		this._createToolbarInteractions();
	}
	if ( vw.ol3.CommonFunc._isDef(this.interactionList) ) {
		var cnt = this.interactionList.length;
		for ( var i = 0 ; i <   cnt  ; i++) {
			this.map.removeInteraction(this.interactionList[i]);
		}
	} 
};

vw.ol3.Controls.prototype._removeToolbarInteractions = function() {
	if ( vw.ol3.CommonFunc._isDef(this.interactionList) ) {
		var cnt = this.interactionList.length;
		for ( var i = 0 ; i <   cnt  ; i++) {
			this.map.removeInteraction(this.interactionList[i]);
		}
	};
	this.map.getTargetElement().style.cursor = "";
};

vw.ol3.Controls.prototype._getToolbarInteraction = function(index) {
	return this.interactionList[index];
};

vw.ol3.Controls.prototype._removeControlInteraction = function(index) {
	this.map.removeInteraction(this.interactionList[index]);
};

vw.ol3.Controls.prototype._prevMapControlFunc = function() {
	if (vw.ol3.permalMapIndex == this._permalMap.length ) {
		vw.ol3.permalMapIndex = this._permalMap.length - 1;
	}
	vw.ol3.permalMapIndex = vw.ol3.permalMapIndex - 1;
	if ( vw.ol3.permalMapIndex < 0) {
		vw.ol3.permalMapIndex = 0;
	}
			
	var _state = this._permalMap[vw.ol3.permalMapIndex]
	if ( _state != undefined ) {
		this.map.getView().setCenter(_state[1]);
		this.map.getView().setZoom(_state[0]);
		this.map.getView().setRotation(_state[2]);
	}
	vw.ol3.shouldUpdate = false
};

vw.ol3.Controls.prototype._nextMapControlFunc = function() {
	vw.ol3.permalMapIndex = vw.ol3.permalMapIndex + 1;
	if ( vw.ol3.permalMapIndex > this._permalMap.length ) {
		vw.ol3.permalMapIndex = this._permalMap.length -1 ;
	}

	var _state = this._permalMap[vw.ol3.permalMapIndex];
	if ( _state != undefined ) {
		this.map.getView().setCenter(_state[1]);
		this.map.getView().setZoom(_state[0]);
		this.map.getView().setRotation(_state[2]);
	}
	vw.ol3.shouldUpdate = false
};

vw.ol3.Controls.prototype._createPermalMap = function() {
	this._permalMap = [];		
	var _Controls = this;
	this._updatePermalink = function() {
	   if (!vw.ol3.shouldUpdate) {
		  vw.ol3.shouldUpdate = true;
		  return;
	   }
		var _view = _Controls.map.getView();
		var _vstate = [ _view.getZoom(),_view.getCenter(),_view.getRotation() ];
		_Controls._permalMap[vw.ol3.permalMapIndex] = _vstate;
		vw.ol3.permalMapIndex = vw.ol3.permalMapIndex + 1;
	};		
	_Controls.map.on( "moveend" , this._updatePermalink);
};
	
vw.ol3.Controls.prototype._removePermalMap = function() {
	vw.ol3.shouldUpdate = true;
	this._permalMap = null;
	if ( this.updatePermailnk != null ) {
		this.map.un('moveend', this._updatePermalink);	
	}
	this.updatePermailnk = null;
	vw.ol3.permalMapIndex = 0;
};

vw.ol3.Controls.prototype._removeControls = function() {
	 var cnt = this.zoomLists.length;
	 
	 for( var i in this.zoomLists ) {
		 this._removeControl(this.zoomLists[i]);
		 this.zoomLists[i] = null;
	 }
	 this.map.removeControl(this._toolbar);
};

vw.ol3.Controls.prototype._removeControl = function(_control) {
	if (this.map != null ) {
		this.map.removeControl(this._zoom);	
	}
};

vw.ol3.Controls.prototype.initToolbar = function(options) {
	
	var _thisMap = this.map;
	
	if ( ! vw.ol3.CommonFunc._isDef( this._toolbar )  ) {
		   this._toolbar = new vw.ol3.control.Toolbar(options);	
	} else {
		 _thisMap.removeControl(this._toolbar);
	}	
	
	_thisMap.addControl(this._toolbar);
	
	if(vw.ol3.CommonFunc._isMobile()){
		var _toolBtnList = [
			new vw.ol3.button.Init(_thisMap),
			new vw.ol3.button.ZoomIn(_thisMap),
			new vw.ol3.button.ZoomOut(_thisMap),
			new vw.ol3.button.Pan(_thisMap),				
			new vw.ol3.button.Prev(_thisMap),
			new vw.ol3.button.Next(_thisMap),
			new vw.ol3.button.Full(_thisMap),
			new vw.ol3.button.Distance(_thisMap),
			new vw.ol3.button.Area(_thisMap)             
		];
	} else {
		var _toolBtnList = [
			new vw.ol3.button.Init(_thisMap),
			new vw.ol3.button.ZoomIn(_thisMap),
			new vw.ol3.button.ZoomOut(_thisMap),
			new vw.ol3.button.DragZoomIn(_thisMap),
			new vw.ol3.button.DragZoomOut(_thisMap),
			new vw.ol3.button.Pan(_thisMap),				
			new vw.ol3.button.Prev(_thisMap),
			new vw.ol3.button.Next(_thisMap),
			new vw.ol3.button.Full(_thisMap),
			new vw.ol3.button.Distance(_thisMap),
			new vw.ol3.button.Area(_thisMap)             
		];
	}
	this._toolbar.addToolButtons(_toolBtnList);
};	

/** START 2016. 02. 25 modify . 차장 조현석 거리/면적 측정 오류및 버그로 인해 수정함.
 * Mreausurement 클래스 하나로 사용함에 있어 유지보수 등이 어려워, Measurement/MreasureDist/MreasureArea/MeasureDisplay 클래스로
 *  분리함.
 *  Measurement : MeasureDist,MeasureArea,MeasureDisplay 클래스와 의존관계이며, 생성 및 초기화, 사용, 이벤트 클리어 등을 담당한다.
 *  MeasureDist : 거리측정 기능만 담당하는 클래스.  MeasureDisplay 클래스를 Measurement클래스로부터 파라미터로 받아옴.(DI)
 *  MeasureArea: 면적측정 기능만 담당하는 클래스.  MeasureDisplay 클래스를 Measurement클래스로부터 파라미터로 받아옴.(DI)
 *  ~~Handler로 이벤트 처리를 하며,  기존 클릭 이벤트의 문제점(지도에 이벤트를 등록하면, 클릭 이벤트를 놓치는 경우가 발생)을 geomFunction메서드로
 *  대체하여 클릭 이벤트를 수정함.
 */

/**
 * 	@desc MeasureDist,MeasureArea,MeasureDisplay 클래스와 의존관계이며, 생성 및 초기화, 사용, 이벤트 클리어 등을 담당한다.
 *    @param _map : vw.ol3.Map
 */
vw.ol3.control.Measurement = function(_map ) {
	this.vmap = _map;
	this.wgs84Sphere = new ol.Sphere(6378137);		// geodesic measures 사용하여 측정값 변환
	this.drawStyle=null;		// draw 스타일. 동그란 점.
	this.distObj=null;		// 거리측정객체
	this.areaObj=null;		// 면적측정 객체
	this.vectorSource=null;		// feature들이 저장되는 객체
	this.measureDisplay=null;		// 화면 출력 기능을 담당 객체
	this.activeObj=null;				// 현재 사용중인 객체
	this.addPointStyle=null;			// 클릭 지점을 표시하는 네모난 점 스타일.
	this.pointEventHandler=null;		// point 이벤트를 담당하는 메서드.
	this.isRunning=false;
	this.init();		// 초기화.
};

// 객체들을 생성하는 초기화
vw.ol3.control.Measurement.prototype.init = function() {
	this.vectorSource = this.vmap._getMeasureVectorLayer().getSource();
	
	 this.addPointStyle = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill(
					{
						color: 'rgba(255, 255, 255, 0.5)'
					}
				),
				stroke: new ol.style.Stroke(
						{
							color: 'rgba(0, 0, 200, 0.7)', 
							width: 1
						}
				),
				points: 4,
				radius: 7,
				angle: Math.PI / 4
			  })
	});
	 
	 this.drawStyle = new ol.style.Style({
		  fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.5)'
			  }),
			  stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 200, 0.9)',
				width: 3
			  }),
			  image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
				  color: 'rgba(0, 0, 255, 0.8)'
				}),
				fill: new ol.style.Fill({
				  color: 'rgba(255, 255, 255, 0.7)'
				})
			  })
	});			 
	// 화면출력 클래스
	this.measureDisplay = new vw.ol3.control.MeasureDisplay(this.vmap,this.vectorSource,this.addPointStyle);
	// 익명함수사용시 this키워드를 사용할 수 없으므로, 변수로 할당.
	var _measureDisplay = this.measureDisplay;
							   
	this.pointEventHandler = function(evt) {
			
			if (evt.dragging) {
				return;
			}			
			// 처음 시작시 안내문구를 출력하며, 마우스 위치와 함께 변경.
			_measureDisplay.displayStartMsgPopup( evt.coordinate);			
	};
	 // 거리측정 객체
	this.distObj = new vw.ol3.control.MeasureDist(this.vmap,this.vectorSource,this.wgs84Sphere,  this.measureDisplay, this.drawStyle , this);
	// 면적측정 객체
	this.areaObj = new vw.ol3.control.MeasureArea(this.vmap,this.vectorSource,this.wgs84Sphere,  this.measureDisplay, this.drawStyle , this);
	
};

/**
 * @desc 외부에서 호출하는 메서드. 측정관련 기능은 모두 command 메서드를 호출.  type은 "LineString" , "Polygon"  2종류임.
 * @param type
 */
vw.ol3.control.Measurement.prototype.command = function(type) {
	this.isRunning=true;
	this.type = type;
	
	if(vw.ol3.CommonFunc._isDef(this.activeObj)){
		this.activeObj.stop();
	}
	
	
	if ( type === "LineString") {
		this.activeObj = this.distObj;
	} else if ( type == "Polygon" ) {
		this.activeObj = this.areaObj;
	}
	this.startDraw();
}

// 화면출력/측정 객체들을 초기화함.  더블클릭줌 interaction이 발생하므로, 측정시작시에는 interaction.DoubleClickZoom을 제거한다.
vw.ol3.control.Measurement.prototype.startDraw = function() {
	if(this.vmap.basicInteractionList[2].get("active")){
		this.vmap.basicInteractionList[2].setActive(false);
	}
	if(this.measureDisplay.measureArrPop.getLength() > 0){
		if(this.measureDisplay.measureArrPop.getLast().cel == null){
			this.deleteDisplay();
		}
	}
	this.vmap.on("pointermove", this.pointEventHandler);
	this.measureDisplay.init();
	this.activeObj.init();
	this.activeObj.start();	
};
// 거리/면적 측정이 완료되면,( drawend 발생시 호출된다.) distDraw객체를 active(false)로 전환및 그리기를 멈춘다.
vw.ol3.control.Measurement.prototype.stopDraw = function() {
	this.vmap.un("pointermove", this.pointEventHandler);
	this.measureDisplay.stopDisplay();
	if (vw.ol3.CommonFunc._isDef(this.activeObj)){
		this.activeObj.stop();
	}		
	var _vmap = this.vmap;
	var addEventFunc = function() {
		vw._vmap.basicInteractionList[2].setActive(true);
	};
	// 더블클릭 줌 이벤트가 적용되도록 지연시간 실행. 0.3
	setTimeout(addEventFunc,500);
	setTimeout(this.isRunning = false,500);
};
// 초기화 버튼 클릭시 현재 출력되고 있는 모든 그래픽 객체들을 화면에서 제거한다.
vw.ol3.control.Measurement.prototype.clearAllDisplay = function() {
	this.stopDraw();
	this.measureDisplay.clearAllDisplay();
};
vw.ol3.control.Measurement.prototype.deleteDisplay = function() {
	this.vmap.un("pointermove", this.pointEventHandler);
	this.measureDisplay.stopDisplay();
	if (vw.ol3.CommonFunc._isDef(this.activeObj)){
		this.activeObj.stop();
	}
	this.measureDisplay.deleteDisplay();
};

/**
 * @desc 거리측정 클래스. 거리측정 기능만 담당하도록 구현. 
 * @param vmap : vw.ol3.Map, vectorSource: ol.source.Vector, wgs84Sphere: ol.Sphere
 * 					measureDisplay: vw.ol3.control.MeasureDisplay, drawStyle: ol.style, measureMent : vw.ol3.control.Measurement
 */
vw.ol3.control.MeasureDist = function(vmap,vectorSource,wgs84Sphere,  measureDisplay, drawStyle, measureMent) {
	this.vmap = vmap;
	this.vectorSource = vectorSource;
	this.wgs84Sphere = wgs84Sphere;
	this.measureDisplay = measureDisplay;
	this.drawStyle = drawStyle;
	this.measurement = measureMent;
	this.continueMsg = "거리측정 입력";
	this.type = "LineString";
	this.startCheck = false;
	this.caculateHandler=null;
	this.startDrawHandler=null;	
	this.endDrawHandler=null;
};
// 이벤트 핸들러 생성 및 distDraw(interaction) 객체 생성 
vw.ol3.control.MeasureDist.prototype.init = function() {
	var _vmap = this.vmap;	
	var _measureDist = this;
	var _measurement = this.measurement;
	var _continueMsg = this.continueMsg;
	var _measureDisplay = this.measureDisplay;
	
	var units = "km", units2="km";			// 거리 측정 units
	var dist = 0 ;												// 거리
	var wtime,btime,valc;						// 자전거 및 보도, 면적등의 변수	    
	var coords_length;							// geometryFunction에서 사용되는 좌표값으로 시작점과 그후의 클릭 포인트를 판단하기 위한 변수.		
	var _type = this.type;						// 이 객체의 타입.	LineString, Polygon
	
	//var clickCnt=0;				// 테스트후에 제거.
	// 클릭 이벤트를 확실히 발생시키기 위하여 이 메서드로 실행한다. 
	// draw가 실행되면, coordinate와 geom을 파라미터를 전달받는다.
	var  geometryFunction = function(coords, geom) {
		// 라인 객체 생성.
		if (!geom) {
			geom = new ol.geom.LineString(null);
		}
		// 현재 좌표를 표시하며, 화면에 라인을 출력.
		geom.setCoordinates(coords);
		
		// 시작점을 의미한다.  처음 시작시 coords값의 길이가 2개로 리턴된다.
		if ( coords.length === 2 ) {
			// 처음 클릭후부터 마우스가 움직이면 이 루틴으로 들어오며, 이때 처음 한번만 실행되야 하므로, boolean으로 처리한다.
			if ( ! _measureDist.startCheck  ) {
				_measureDist.startCheck = true;
				_measureDisplay.setStartMsg(_continueMsg);		// 안내문구를 라인스트링의 안내문구로 교체한다.
				var _coord = geom.getLastCoordinate();						// 처음 클릭한 좌표값을 구하여 MeasureDisplay의 START박스를 출력하도록 한다.
				_measureDisplay.displayStartPoint(_coord);
				//console.log("START!! - ");
			}
		}
		//if linestring changed  이벤트를 감지. coords_length변수에 담아서 진행시점을 판단.
		if(coords.length !== coords_length){
			coords_length = coords.length;
			 if ( coords.length !== 2 ) {	   
				 // 출력문구( 19.33 + "km")를 좌표와 함께 MeasureDisplay로 전달.
				var measureMsg = dist + units;
				_measureDisplay.displayMeasurePopup(measureMsg, geom.getLastCoordinate());	 
				//console.log("clickCnt - ", clickCnt++);
			 }
		};	
		return geom;
	};
	// 마우스가 움직일때 계산이 자동으로 되도록 이벤트 핸들러를 구현하여, geom객체에 이벤트를 전달.
	this.calculateHandler = function(evt) {
		var geom = evt.target;
		var output;
		var _coord;
		// 거리 계산.
		dist = _measureDist.calculateMeasure(geom);
		_coord = geom.getLastCoordinate();
		if (dist > 100) {
			dist = (Math.round(dist / 1000 * 100) / 100);
			units = "km";
		} else {
			dist = (Math.round(dist * 100) / 100);
			units = "m";
		}
		if (units == "km") {
			wtime = vw.ol3.CommonFunc._getTimeStringhtml(parseInt((dist * 1000 * 60) / 4000)); // 도보
			btime = vw.ol3.CommonFunc._getTimeStringhtml(parseInt((dist * 1000 * 60) / 20000)); // 자전거
		} else {
			wtime = vw.ol3.CommonFunc._getTimeStringhtml(1);
			btime = vw.ol3.CommonFunc._getTimeStringhtml(0);
		}
		valc = vw.ol3.CommonFunc._commify(dist); // 거리

		output = "<div class='measurebox'><ul><li><span class='name'>총거리</span><span class='value'><strong class='num'>" + valc + "</strong>" + units + "</span></li>";
		output += "<li><span class='name'>도   보</span><span class='value'>" + wtime + "</span></li>";
		output += "<li><span class='name'>자전거</span><span class='value'>" + btime + "</span></li></ul></div>";
		output += "<div class='etcbox'>화면 더블클릭하면</br> 종료합니다.</div>";
		_measureDisplay.displayDrawMeasure(output, _coord);
	};
	// draw객체가 시작시 발생되는 이벤트 핸들러. 첫번째 클릭한 이후 시점부터 발생한다. 이때 거리 측정이 진행된다.
	this.startDrawHandler = function(evt) {	
		//console.log("startDraw");
		evt.feature.getGeometry().on('change', this.calculateHandler);
		_measureDisplay.setMeasureFeature(evt.feature);
		  //document.onkeydown = escKeyClose;
	};
	// 거릭측정이 끝나고, 지도화면에서 출력된 해당 경로만을 삭제한다.
	var closeHandler = function(evt) {
		   var curTarget = evt.currentTarget;
		   var getid = vw.ol3.CommonFunc._getAttribute(curTarget,"id");
			  var _display = _measureDisplay.measureArrPop.get(getid);
			  $(_display.sel).remove();
			  $(_display.mel).remove();
			  $(_display.cel).remove();
			  _vmap.removeOverlay(_display.spop);
			  _vmap.removeOverlay(_display.mpop);
			  _vmap.removeOverlay(_display.cpop);
			  var _feature = _display.feature;
			  var _point = _display.point;
			  var _mpoint = _display.mpoint;
			  var _mpointPop = _display.mpointPop;
		   if (_mpointPop != null ) {
			   for( var _ii in _mpointPop ) {
				   $(_mpoint[_ii]).remove();
					  _vmap.removeOverlay(_mpointPop[_ii]);
			   }
		   }
			var _vSource = _vmap._getMeasureVectorLayer().getSource();
			var _features = _vSource.getFeatures();
			if ( _feature != null && _features !=null) {
				var fid = goog.getUid(_feature).toString();
				var ffind = false;
				for( var _ii in _features ) {
					var ffid = goog.getUid(_features[_ii]).toString();
					if (ffid === fid){ffind = true;}
				}
				if (ffind){_vSource.removeFeature(_feature);}
			}
			if ( _point != null ) {
				for( var _ii in _point ) {
					_vSource.removeFeature(_point[_ii]);	
				}
			}
			_measureDisplay.measureArrPop.remove(_display.id);
			_display = null;
	};
	// draw가 끝나는 시점에서 발생되는 이벤트 핸들러. 거리 측정이 완료됨으로서 총 거리를 화면에 출력하며, 모든 이벤트를 제거한다.
	this.endDrawHandler = function(evt) {
		//console.log("drawend~~");
		var _display = _measureDisplay.measureArrPop.getLast();
		var _coord =  _display.mpop.getPosition();
		_display.feature = evt.feature;
		_measureDisplay.measureArrPop.setLast(_display);
		var output ;
		output = "<div class='measurebox'><ul><li><span class='name'>총거리</span><span class='value'><strong class='num'>" + valc + "</strong>" + units + "</span></li>";
		output += "<li><span class='name'>도   보</span><span class='value'>" + wtime + "</span></li>";
		output  += "<li><span class='name'>자전거</span><span class='value'>" + btime + "</span></li></ul></div>";
		_measureDisplay.displayClosePopup(output,_coord,_type,closeHandler);
		
		for(var i=0; i<_measureDisplay.vectorSource.getFeatures().length; i++){
			var tFeature = _measureDisplay.vectorSource.getFeatures()[i];
			if(tFeature.get('textContent') != null && tFeature.get('textContent') == _display.mpointPop[_display.mpointPop.length-1].getElement().textContent){
				tFeature.set("textContent", "총거리   " + valc  + " " + units +"\n" +
						"도보  " + wtime + "\n" + 
						"자전거   "  + btime)
			}
		}
		_measurement.stopDraw();
	};
	// interaction distDraw 객체 생성.		
	this.distDraw =  new ol.interaction.Draw({
	   source: this.vectorSource,
	   type: this.type,
	   geometryFunction: geometryFunction,
	   style: this.drawStyle
	});					
};
// 거리 측정 시작. 
vw.ol3.control.MeasureDist.prototype.start = function() {
	this.distDraw.on("drawstart", this.startDrawHandler, this);
	this.distDraw.on("drawend", this.endDrawHandler, this);
	this.setActive(true);
	this.vmap.addInteraction(this.distDraw);
	this.startCheck = false;
};
// 거리 측정 종료 후 이벤트 제거 및 객체 제거.
vw.ol3.control.MeasureDist.prototype.stop = function() {
	if (vw.ol3.CommonFunc._isDef(this.distDraw)){
		this.distDraw.un("drawstart", this.startDrawHandler, this);
		this.distDraw.un("drawend",this.endDrawHandler, this);
		this.setActive(false);
		this.vmap.removeInteraction(this.distDraw);
	}		
	this.startCheck = false;
	this.distDraw = null;				
	this.startDrawHandler = null;
	this.endDrawHandler = null ;
	this.calculateHandler = null;
};

/**
 * draw 인터액션의 active상태값을 변경.  true,false
 * @param isActive
 */
vw.ol3.control.MeasureDist.prototype.setActive = function(isActive) {
	this.distDraw.setActive(isActive);
};
// distDraw객체를 반환한다.
vw.ol3.control.MeasureDist.prototype.getDraw = function() {
	return this.distDraw;
};
// 안내문구를 반환한다.
vw.ol3.control.MeasureDist.prototype.getContinueMsg = function() {
	return this.continueMsg;
};
	
// 거리 측정 기능만 구현 객체를 반환한다.
vw.ol3.control.MeasureDist.prototype.getMeasureDisplay = function() {
	return this.measureDisplay;
};
// 거리 측정  계산한다.	
vw.ol3.control.MeasureDist.prototype.calculateMeasure = function(geom) {
	var dist;
	// 클릭 시작점부터, 클릭 두번째까지의 거리 좌표를 배열로 반환.
	var coordinates = geom.getCoordinates();
	dist = 0;
	// 현재 사용되는 좌표계 EPSG:900913
	var sourceProj = this.vmap.getView().getProjection();
	
	for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
		 var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
		 var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
		 dist += this.wgs84Sphere.haversineDistance(c1, c2);
	}
	return dist;	
};
/**
 * @desc 면적 측정 기능을 담당하는 클래스.  
 */
vw.ol3.control.MeasureArea = function(vmap,vectorSource,wgs84Sphere,  measureDisplay, drawStyle, measureMent) {
	this.vmap = vmap;
	this.vectorSource = vectorSource;
	this.wgs84Sphere = wgs84Sphere;
	this.measureDisplay = measureDisplay;
	this.drawStyle = drawStyle;
	this.measurement = measureMent;
	this.continueMsg = "면적측정 입력";
	this.type = "Polygon";
	this.startCheck = false;
	this.caculateHandler=null;
	this.startDrawHandler=null;	
	this.endDrawHandler=null;
};
// 객체 생성 및 초기화  
vw.ol3.control.MeasureArea.prototype.init = function() {
	var _vmap = this.vmap;
	var _measureArea = this;
	var _measurement = this.measurement;
	var _continueMsg = this.continueMsg;
	var _measureDisplay = this.measureDisplay;
	
	var units = "km", units2="km";
	var dist = 0 ;		
	var wtime,btime,valc;
	var coords_length;		
	var _type = this.type;		
	var clickCnt=0;
	// 클릭 이벤트를 제어하기 위한 메서드로 사용.
	var  geometryFunction = function(coords, geom) {
									
		if (!geom) {
			geom = new ol.geom.Polygon(null);
		}
		geom.setCoordinates(coords);
		
		// Polygon은 내부에 배열이 다시 존재하므로, [0]은 시작점을 의미한다.
		if ( coords[0].length === 2 ) {
			if ( ! _measureArea.startCheck  ) {
				_measureArea.startCheck = true;
				// 화면에 안내문구를 출력한다.
				_measureDisplay.setStartMsg(_continueMsg);
				// 사각형 포인트를 출력.
				_measureDisplay.addPoint(geom.getLastCoordinate());
			}
		}
		// 좌표배열이 coords_length 배열이 같지 않다면, 저장하며, 시작이 아니므로 사각형 포인트를 출력한다.
		if(coords[0].length !== coords_length){
			coords_length = coords[0].length;
			if (  _measureArea.startCheck  ) {
				// 사작형 포인트 출력.
				_measureDisplay.addPoint(geom.getLastCoordinate());
			}
		};
						
		return geom;
	};
	// 면적 측정 계산.  geom객체에 이벤트 전달.
	 this.calculateHandler = function(evt) {  
		  var geom = evt.target;
		  var output;	          
		  var _coord;
		  dist = _measureArea.calculateMeasure(geom);
		  _coord = geom.getInteriorPoint().getCoordinates();
		  _coord = geom.getLastCoordinate();
		  if (dist > 10000) {
				dist = (Math.round(dist / 1000000 * 100) / 100) ;
				units = "km<sup>2</sup>";
		  } else {
				  dist = (Math.round(dist * 100) / 100);
				  units = "m<sup>2</sup>" ;
		  }
		  
		  valc = vw.ol3.CommonFunc._commify(dist);
		  output = "<div class='measurebox'><ul><li><span class='name'>총면적</span><span class='value'><strong class='num'>" + valc + "</strong>" + units + "</span></li></ul></div>";
		  output += "<div class='etcbox'>화면 더블클릭하면</br> 종료합니다.</div>";
		  _measureDisplay.displayDrawMeasure(output , _coord);
		  //console.log("clickCnt - ", clickCnt++);
	};
	// draw 시작시 발생되는 이벤트 핸들러.  계산 측정 할 수 있도록 이벤트를 전달한다.
	this.startDrawHandler = function(evt) {	
		//console.log("startDraw");
		evt.feature.getGeometry().on('change', this.calculateHandler);
		_measureDisplay.setMeasureFeature(evt.feature);
		  //document.onkeydown = escKeyClose;
	};
	// 해당 면적 경로를 제거하기 위한 이벤트 핸들러.
	var closeHandler = function(evt) {
		   var curTarget = evt.currentTarget;
		   var getid = vw.ol3.CommonFunc._getAttribute(curTarget,"id");
			  var _display = _measureDisplay.measureArrPop.get(getid);
			  $(_display.sel).remove();
			  $(_display.mel).remove();
			  $(_display.cel).remove();
			  _vmap.removeOverlay(_display.spop);
			  _vmap.removeOverlay(_display.mpop);
			  _vmap.removeOverlay(_display.cpop);
			  var _feature = _display.feature;
			  var _point = _display.point;
			  var _mpoint = _display.mpoint;
			  var _mpointPop = _display.mpointPop;
		   if (_mpointPop != null ) {
			   for( var _ii in _mpointPop ) {
				   $(_mpoint[_ii]).remove();
					  _vmap.removeOverlay(_mpointPop[_ii]);
			   }
		   }
			var _vSource = _vmap._getMeasureVectorLayer().getSource();
			var _features = _vSource.getFeatures();
			if ( _feature != null && _features !=null) {
				var fid = goog.getUid(_feature).toString();
				var ffind = false;
				for( var _ii in _features ) {
					var ffid = goog.getUid(_features[_ii]).toString();
					if (ffid === fid){ffind = true;}
				}
				if (ffind){_vSource.removeFeature(_feature);}
			}
			if ( _point != null ) {
				for( var _ii in _point ) {
					_vSource.removeFeature(_point[_ii]);	
				}
			}
			_measureDisplay.measureArrPop.remove(_display.id);
			_display = null;
	};
	// draw 완료되면 발생되는 이벤트 핸들러.  해당 경로 가운데 총 면적이 출력되도록 한다.			
	this.endDrawHandler = function(evt) {
		//console.log("drawend~~");
		var geom = evt.feature.getGeometry();
		  var _coordArr = geom.getCoordinates();
		  var _coordArr2;
		  // 실제 표현되는 좌표.(면적측정 가운데표현)
		  var coord;
		  for(var _i in _coordArr ) {
			  _coordArr2 = _coordArr[_i];
			  for( var _ii in _coordArr2) {
				  if (_coordArr2.length -2 == _ii ) {
					  coord = _coordArr2[_ii];	
				  }
			  }
		  } 
		var output ;
		output = "<div class='measurebox'><ul><li><span class='name'>총면적</span><span class='value'><strong class='num'>" + valc + "</strong>" + units + "</span></li></ul></div>";
		_measureDisplay.displayClosePopup(output,coord,_type,closeHandler);  	
		_measurement.stopDraw();
		
		for(var i=0; i<this.vectorSource.getFeatures().length; i++){
			var tmpFeature = this.vectorSource.getFeatures()[i];
			if(tmpFeature.get('geometry').getFlatCoordinates()[0] == coord[0] && tmpFeature.get('geometry').getFlatCoordinates()[1] == coord[1]){
				tmpFeature.set("textContent", "총면적  " + valc + " " + units);
			}
		}
	};
	// distDraw interaction 객체 생성.		
	this.distDraw =  new ol.interaction.Draw({
	   source: this.vectorSource,
	   type: this.type,
	   geometryFunction: geometryFunction,
	   style: this.drawStyle
	});					
};
// 면적 측정 시작
vw.ol3.control.MeasureArea.prototype.start = function() {
	this.distDraw.on("drawstart", this.startDrawHandler, this);
	this.distDraw.on("drawend", this.endDrawHandler, this);
	this.setActive(true);
	this.vmap.addInteraction(this.distDraw);
	this.startCheck = false;
};
// 면적 측정 종료
vw.ol3.control.MeasureArea.prototype.stop = function() {
	if (vw.ol3.CommonFunc._isDef(this.distDraw)){
		this.distDraw.un("drawstart", this.startDrawHandler, this);
		this.distDraw.un("drawend",this.endDrawHandler, this);
		this.setActive(false);
		this.vmap.removeInteraction(this.distDraw);
	}
	this.startCheck = false;
	this.distDraw = null;
	this.startDrawHandler = null;
	this.endDrawHandler = null ;
	this.calculateHandler = null;
};

/**
 * draw 인터액션의 active상태값을 변경.  true,false
 * @param isActive
 */
vw.ol3.control.MeasureArea.prototype.setActive = function(isActive) {
	this.distDraw.setActive(isActive);
};
// distDraw객체를 반환
vw.ol3.control.MeasureArea.prototype.getDraw = function() {
	return this.distDraw;
};
// 안내문구를 반환
vw.ol3.control.MeasureArea.prototype.getContinueMsg = function() {
	return this.continueMsg;
};
	
// 거리 측정 기능만 구현 객체를 반환.
vw.ol3.control.MeasureArea.prototype.getMeasureDisplay = function() {
	return this.measureDisplay;
};	
// // 면적 측정 계산.
vw.ol3.control.MeasureArea.prototype.calculateMeasure = function(geom) {
	var area;
	var sourceProj = this.vmap.getView().getProjection();
	var geom = (geom.clone().transform(sourceProj, 'EPSG:4326'));
	var coordinates = geom.getLinearRing(0).getCoordinates();
	area = Math.abs(this.wgs84Sphere.geodesicArea(coordinates));
	return area;		
};


/**
 *	@desc  거리/면적 측정 화면 출력만 담당한다. 
 */
vw.ol3.control.MeasureDisplay = function(vmap, vectorSource, addPointStyle) {
	this.vmap = vmap;
	// 저장된 feature를 가져와 제거를 해야하므로 필요. 
	this.vectorSource = vectorSource;
	// 화면에 출력되는 그래픽들을 저장하는 공간.
	this.measureArrPop = new vw.ol3.NamedSet();
	this.firstStartMsg = "측정시작";
	this.startMsg=null;
	this.startMsgElement = vw.ol3.CommonFunc._createElement("div");
	vw.ol3.CommonFunc._setClassName(this.startMsgElement,"startmsg");
	
	this.startMsgPop=null;
	this.clickCount = 13;
	this.addPointStyle = addPointStyle;			
};
// 객체 생성 및 초기화. 안내문구와 안내문구 태그를 생성.
vw.ol3.control.MeasureDisplay.prototype.init = function() {
	this.startMsg = this.firstStartMsg;			
	this.startMsgPop = new ol.Overlay({
		   element: this.startMsgElement,
		   offset: [15, 0],
		   positioning: 'center-left'
		});	
		this.vmap.addOverlay(this.startMsgPop);
		this.createDisplay();
};
//measureArrPop 객체에 화면에 그려질 모든 그래픽 객체 정보 저장 공간을 생성하고 저장.
vw.ol3.control.MeasureDisplay.prototype.createDisplay = function() {
	
	var _cnt = this.measureArrPop.getLength();
	var _id = "measure-" + _cnt;
	
	var startPointElement = vw.ol3.CommonFunc._createElement("div");
	$(startPointElement).attr("id",_id);
	$(startPointElement).css("z-index",(_cnt+10)+"");
	vw.ol3.CommonFunc._setClassName(startPointElement,"startpoint");

	var measureMsgElement = vw.ol3.CommonFunc._createElement("div");
	$(measureMsgElement).attr("id",_id);
	$(measureMsgElement).css("z-index",(_cnt+200)+"");	
	vw.ol3.CommonFunc._setClassName(measureMsgElement,"measuremsg");	
					
	var startPointMsgPop = new ol.Overlay({
			element: startPointElement,
			offset: [0, 2],
			positioning: 'top-left'
		  });
	startPointMsgPop.set("id",_id);
	 this.vmap.addOverlay(startPointMsgPop);	
	 vw.ol3.CommonFunc._setCss("ol-overlay-container","z-index",(_cnt+10)+"");

	var measureMsgPop = new ol.Overlay({
			element: measureMsgElement,
			offset: [0, -15],
			positioning: 'bottom-center'
	});
	measureMsgPop.set("id",_id);
	this.vmap.addOverlay(measureMsgPop);
	vw.ol3.CommonFunc._setCss("ol-overlay-container","z-index",(_cnt+200)+"");
		  
	var _obj = {
				   id : _id
				  ,mel : measureMsgElement
				  ,mpop: measureMsgPop
				  ,sel: startPointElement
				  ,spop: startPointMsgPop
				  ,cel :  null
				  ,cpop: null
				  ,feature: null
				  ,point: new Array()
					,mpoint: new Array()
					,mpointPop: new Array()
	};
				
	this.measureArrPop.set(_id,_obj);
};
// feature를 저장한다.
vw.ol3.control.MeasureDisplay.prototype.setMeasureFeature = function(feature) {
	  var _display = this.measureArrPop.getLast();
	  
	  if ( vw.ol3.CommonFunc._isDef(_display) ) {
		  _display.feature = feature;	
	  }
	  this.measureArrPop.setLast(_display);
	  //document.onkeydown = escKeyClose;
};
// 안내문구를 변경한다.
vw.ol3.control.MeasureDisplay.prototype.setStartMsg = function(startMsg) {
	this.startMsg = startMsg;
};
// 안내문구 팝업을 화면에 출력한다.		
vw.ol3.control.MeasureDisplay.prototype.displayStartMsgPopup = function(coordinate) {
	if (vw.ol3.CommonFunc._isDef(this.startMsg) && (this.startMsg != '')){
		vw.ol3.CommonFunc._html( this.startMsgElement , this.startMsg);
		vw.ol3.CommonFunc._show(this.startMsgElement);
		this.startMsgPop.setPosition(coordinate);
	}
	//console.log("MeasureDisplay startDrawPopup - " , this.startMsg);
};
// START 박스를 시작지점 화면에 출력한다.
vw.ol3.control.MeasureDisplay.prototype.displayStartPoint= function(coordinate) {
	var _display = this.measureArrPop.getLast();
	if (vw.ol3.CommonFunc._isDef(_display) ) {
		  vw.ol3.CommonFunc._html(_display.sel,"START");
		  _display.spop.setPosition(coordinate);	
	};
	this.measureArrPop.setLast(_display);
	this.addPoint( coordinate);
};
// 사각형 포인트를 추가하여 화면에 출력한다.
vw.ol3.control.MeasureDisplay.prototype.addPoint = function( coordinate) {
	var _display = this.measureArrPop.getLast();
	  var _pointFeature = new ol.Feature(new ol.geom.Point(coordinate));
	  if(_display.mpointPop.length != 0){
		  _pointFeature.set("textContent", _display.mpointPop[_display.mpointPop.length-1].getElement().textContent);
	  }
	  _pointFeature.setStyle(this.addPointStyle);
	  this.vectorSource.addFeature(_pointFeature);
	  if ( _display != undefined && _display != null ) {
		  _display.point[_display.point.length] = _pointFeature;
		  this.measureArrPop.setLast(_display);  
	  }	
};
// 측정 문구 팝업을 화면에 출력한다.
vw.ol3.control.MeasureDisplay.prototype.displayMeasurePopup = function( measureMsg , coordinate) {
	var _display = this.measureArrPop.getLast();
	var _mpoint = vw.ol3.CommonFunc._createElement("div");
	vw.ol3.CommonFunc._setClassName(_mpoint,"clickmeasure");
	vw.ol3.CommonFunc._html(_mpoint, measureMsg);
	var _mpointPop = new ol.Overlay({
			element: _mpoint,
			offset: [5, 5],
			positioning: 'bootm-left'
	});					
	this.vmap.addOverlay(_mpointPop);
	vw.ol3.CommonFunc._setCss("ol-overlay-container","z-index",this._clickCount+"");
	this._clickCount++;
	_mpointPop.setPosition(coordinate); 
	if ( vw.ol3.CommonFunc._isDef(_display) ) {
		_display.mpointPop[_display.mpointPop.length] = _mpointPop;
		_display.mpoint[_display.mpoint.length] = _mpoint;
		this.measureArrPop.setLast(_display);	
	}
	
	this.addPoint(coordinate);
};
// 화면에 측정 중인 문구를 출력한다.
vw.ol3.control.MeasureDisplay.prototype.displayDrawMeasure = function(output,coordinate) {

	  var _display = this.measureArrPop.getLast();

	  if ( vw.ol3.CommonFunc._isDef(_display)  ) {
		  vw.ol3.CommonFunc._html(_display.mel,output);
		  _display.mpop.setPosition(coordinate);
	  }
};
// 측정 종료시 총면적등의 문구 팝업을 출력한다.
vw.ol3.control.MeasureDisplay.prototype.displayClosePopup = function(output,coordinate,type,closeHandler) {
	var _closeOffset = [68,-8];
	var _cnt = this.measureArrPop.getLength();
	var _display = this.measureArrPop.getLast();
	if ( vw.ol3.CommonFunc._isDef(_display) ) {
		 vw.ol3.CommonFunc._hide(_display.mel);	
	}
		  
	  if (vw.ol3.CommonFunc._isDef(_display) ) {
		this.measureArrPop.setLast(_display);
		this.addPoint(coordinate);	
	  }
		  
	var closeMsgElement = vw.ol3.CommonFunc._createElement("div");
	$(closeMsgElement).attr("id",_display.id);
	$(closeMsgElement).css("z-index",(_cnt+14)+"");
	vw.ol3.CommonFunc._setClassName(closeMsgElement,"close");	
		
	var closeMsgPop = new ol.Overlay({
		element: closeMsgElement,
		offset: _closeOffset ,
		positioning: 'bottom-center'
	});
	
	closeMsgPop.set("id",_display.id);
	this.vmap.addOverlay(closeMsgPop);
	vw.ol3.CommonFunc._setCss("ol-overlay-container","z-index",(_cnt+200)+"");
	
	//console.log("display.id - ",_display.id, " , _cnt - ", ( _cnt + 200));
	_display.cel = closeMsgElement;
	_display.cpop = closeMsgPop;
		  
	if ( vw.ol3.CommonFunc._isDef(_display) ) {
		  vw.ol3.CommonFunc._html(_display.mel,output);
		  vw.ol3.CommonFunc._show(_display.mel);
		  vw.ol3.CommonFunc._html(_display.cel,"X");			  	
		  vw.ol3.CommonFunc._show(_display.cel);
		  vw.ol3.CommonFunc._click(_display.cel, closeHandler);
		vw.ol3.CommonFunc._hide(_display.cel);
		_display.cel.style.display = "block";
		if ( type === "LineString" ) {
			_display.cpop.setPosition(coordinate);
		} else {
			var closeCoord = _display.mpop.getPosition();
			_display.cpop.setPosition(closeCoord);	
		}
		_display.mpop.setOffset([0, -7]);			  		
	}				  
};
// 측정 종료시 안내문구 팝업을(Ovelay)를 맵에서 제거한다.
vw.ol3.control.MeasureDisplay.prototype.stopDisplay = function() {		
	this.vmap.removeOverlay(this.startMsgPop);						
};

vw.ol3.control.MeasureDisplay.prototype.clearAllDisplay = function() {
	  var _displayList = this.measureArrPop.values();
	  var cnt = 0;
	  if ( vw.ol3.CommonFunc._isDef(_displayList ) ) {
		  cnt = _displayList.length;
	  }
	  for(var i=0; i< cnt ; i++ ) {
		  var _display = _displayList[i];
		  $(_display.sel).remove();
		  $(_display.mel).remove();
		  $(_display.cel).remove();			   
		  this.vmap.removeOverlay(_display.spop);
		  this.vmap.removeOverlay(_display.mpop);
		  this.vmap.removeOverlay(_display.cpop);		      	
		  var _feature = _display.feature;
		  var _point = _display.point;
		  var _mpoint = _display.mpoint;
		  var _mpointPop = _display.mpointPop;
		if (_mpointPop != null && _mpoint != null ) {
			for( var _ii in _mpointPop ) {
				if (_mpoint[_ii] != null){$(_mpoint[_ii]).remove();}
				this.vmap.removeOverlay(_mpointPop[_ii]);
			}
		}
		var _vSource = this.vectorSource;
		var _features = _vSource.getFeatures();
		if ( _feature != null && _features !=null) {
			var fid = goog.getUid(_feature).toString();
			var ffind = false;
			for( var _ii in _features ) {
				var ffid = goog.getUid(_features[_ii]).toString();
				if (ffid === fid){ffind = true;}
			}
			if (ffind){_vSource.removeFeature(_feature);}
		}
		if ( _point != null ) {
			for( var _ii in _point ) {
				_vSource.removeFeature(_point[_ii]);	
			}
		}
		this.measureArrPop.remove(_display.id);
		_display = null;
	  }      	
	  _displayList = null;	      	
	  this.measureArrPop.clear();
};
vw.ol3.control.MeasureDisplay.prototype.deleteDisplay = function() {
	  var _display = this.measureArrPop.getLast();
	  var cnt = 0;
	  $(_display.sel).remove();
	  $(_display.mel).remove();
	  $(_display.cel).remove();			   
	  this.vmap.removeOverlay(_display.spop);
	  this.vmap.removeOverlay(_display.mpop);
	  this.vmap.removeOverlay(_display.cpop);		      	
	  var _feature = _display.feature;
	  var _point = _display.point;
	  var _mpoint = _display.mpoint;
	  var _mpointPop = _display.mpointPop;
	if (_mpointPop != null && _mpoint != null ) {
		for( var _ii in _mpointPop ) {
			if (_mpoint[_ii] != null){$(_mpoint[_ii]).remove();}
			this.vmap.removeOverlay(_mpointPop[_ii]);
		}
	}
	var _vSource = this.vectorSource;
	var _features = _vSource.getFeatures();
	if ( _feature != null && _features !=null) {
		var fid = goog.getUid(_feature).toString();
		var ffind = false;
		for( var _ii in _features ) {
			var ffid = goog.getUid(_features[_ii]).toString();
			if (ffid === fid){ffind = true;}
		}
		if (ffind){_vSource.removeFeature(_feature);}
	}
	if ( _point != null ) {
		for( var _ii in _point ) {
			_vSource.removeFeature(_point[_ii]);	
		}
	}
	this.measureArrPop.remove(_display.id);
	_display = null;
  
};


/** END 2016. 02. 25 modify . 차장 조현석 거리/면적 측정 오류및 버그로 인해 수정함. */

vw.ol3.control.Control = function(_options) {
	this.id = "vw.ol3.control.Control";
	this.site=null;
	this.position=null;
	this.anchor=null;
	this.container=null;		
	var options = _options || {};
	
	this.site = (vw.ol3.CommonFunc._isDef( options.site ) ) ? options.site : null;
	this.position = (vw.ol3.CommonFunc._isDef( options.position ) ) ? options.position : null;
	this.anchor = (vw.ol3.CommonFunc._isDef( options.anchor ) ) ? options.anchor : "top-left";
	var map = (vw.ol3.CommonFunc._isDef( options.map ) ) ? options.map : null;
	
	var _element = (vw.ol3.CommonFunc._isDef( options.element ) ) ? 
					options.element : vw.ol3.CommonFunc._createElement("div"); 
							
	ol.control.Control.call(this,options);	
	
};

vw.ol3.inherits( vw.ol3.control.Control, ol.control.Control );

vw.ol3.control.Control.prototype.setContainer = function(container) {
	this.container = container;
};

vw.ol3.control.Collapsible = function(_options) {
	this.collapsed = false;
	this.collapsible = true;
	
	var options = _options || {};			
	this.collapsed = ( vw.ol3.CommonFunc._isDef(options.collapsed) ) ? options.collapsed : false;
	this.collapsible = ( vw.ol3.CommonFunc._isDef(options.collapsible) ) ? options.collapsible : true;

	var _controlEl = ( vw.ol3.CommonFunc._isDef(options.element) ) ? options.element : null;
	
	this._collapsDivEl = vw.ol3.CommonFunc._createElement("div");
	options.element = this._collapsDivEl;

	this._collapsDivEl.id="vw-collapsible";
	this._collapsDivEl.style.position = "absolute";
	this._collapsDivEl.style.zIndex = "100";
	this._collapsDivEl.style.top = "0px";
	this._collapsDivEl.style.left = "0px";
	this._collapsDivEl.style.bottom = "0px";
	this._collapsDivEl.style.right = "0px";			
	this._span = null;

	if ( vw.ol3.CommonFunc._isDef(this._collapsDivEl)  ) {

		var _toggleBtn = null;
		var _isToggle = true;
		var _thisEl = this._collapsDivEl;
		var _unColLabel = "\u00AB";
		var _colLabel = "\u00BB";
		
		var _firstLabel,_secondLabel;
		
		if (this.collapsed) {
			vw.ol3.CommonFunc._hide(_controlEl);
			_isToggle = false;
			_firstLabel = _colLabel;
			_secondLabel = _colLabel;
			_thirdLabel = _unColLabel;
		} else {
			vw.ol3.CommonFunc._show(_controlEl);
			_isToggle = true;
			_firstLabel = _unColLabel;
			_secondLabel = _colLabel;
			_thirdLabel = _unColLabel;
		}
		
		if ( this.collapsible ) {
			this._span = vw.ol3.CommonFunc._createElement("button");
			this._span.className = "vw-span";
			this._span.style.position = "relative";
			this._span.innerHTML = _firstLabel;				
			var _thisSpan = this._span;
			
			var handleToggle = function(e) {
				if ( _isToggle) {
					_thisSpan.innerHTML = _colLabel;
					vw.ol3.CommonFunc._hide(_controlEl);
					_isToggle = false;
				} else {								
					_thisSpan.innerHTML = _unColLabel;
					vw.ol3.CommonFunc._show(_controlEl);
					_isToggle = true;
				}							
			}
			this._span.addEventListener("click", handleToggle,true);
			vw.ol3.CommonFunc._append(_thisEl,this._span);
			vw.ol3.CommonFunc._append(_thisEl,_controlEl);
		} else {
			vw.ol3.CommonFunc._append(_thisEl,_controlEl);
			vw.ol3.CommonFunc._show(_controlEl);
		}
	}
	vw.ol3.control.Control.call(this,options);
};

vw.ol3.inherits( vw.ol3.control.Collapsible , vw.ol3.control.Control );

vw.ol3.control.Toolbar = function( _options ) {

	this.buttons = new ol.Collection();
	this.vertical = false;			// (D) 수평.
	this._vmap = null;
	
	this.divPannelSize = [0,0];		// w.h
	this.divPannel = vw.ol3.CommonFunc._createElement("div");
	this.divPannel.id = "vw.ol3.Toolbar";
	this.divPannel.className = "vw-toolbar";		
	this.divPannel.style.position = "relative";

	var options = _options || {};
	
	this.vertical = (vw.ol3.CommonFunc._isDef(options.vertical)) ? options.vertical : false;
	this._vmap = (vw.ol3.CommonFunc._isDef(options.map)) ? options.map : null;
	options.collapsed = (vw.ol3.CommonFunc._isDef(options.collapsed)) ? options.collapsed : false;
	options.collapsible = (vw.ol3.CommonFunc._isDef(options.collapsible)) ? options.collapsible : false;
	options.element = this.divPannel;															
	options.site = ( vw.ol3.CommonFunc._isDef(options.site) ) ? options.site : null;		
	options.position = ( vw.ol3.CommonFunc._isDef(options.position) ) ? options.position : null;		
	options.anchor = (vw.ol3.CommonFunc._isDef(options.anchor) ) ? options.anchor: null;
	
	vw.ol3.control.Collapsible.call( this , options);
	
	this.setMap(this._vmap);
	if(this._vmap._permalMap == null) this._vmap._controls._createPermalMap();		
};

vw.ol3.inherits( vw.ol3.control.Toolbar, vw.ol3.control.Collapsible );

vw.ol3.control.Toolbar.prototype.addToolButton = function(_btn) {
	
	this.getMap().addControl(_btn);
	this.buttons.push(_btn);
	
	vw.ol3.CommonFunc._append(this.divPannel, _btn.element);				
	
	this._calculateSize(_btn);
	
	this._resizePosition();
};
	
vw.ol3.control.Toolbar.prototype._calculateSize = function(_btn) {
	
	var _elWidth, _elHeight ;
	
	_elWidth = _btn.element.style.width;
	_elHeight = _btn.element.style.height;
	
	if ( vw.ol3.CommonFunc._isDef( _elWidth ) ) {
		_elWidth = Number( _elWidth.replace(/\px/g,"") );
	}
	
	if ( vw.ol3.CommonFunc._isDef( _elHeight ) ) {
		_elHeight = Number( _elHeight.replace(/\px/g,"") );
	}		
	this.divPannelSize[0] += _elWidth;
	this.divPannelSize[1] += _elHeight;
	
	if ( this.vertical ) {
		// 수직
		this.divPannel.style.width = "30px";
		this.divPannel.style.height = this.divPannelSize[1] + "px";
		this._collapsDivEl.style.width = this.divPannel.style.width;
		var _spanHeight =  _btn.element.style.height;
		_spanHeight = Number(_spanHeight.replace(/\px/g,""));
		this._collapsDivEl.style.height = this.divPannelSize[1] + _spanHeight +12+ "px";
		this.divPannel.style.float = "left";
	} else {
		// 수평
		this.divPannel.style.width = this.divPannelSize[0] + "px";		
		this.divPannel.style.height = "30px";
		this._collapsDivEl.style.width = this.divPannel.style.width;
		this._collapsDivEl.style.height = "45px";
		_btn.element.style.float = "";
		_btn.element.style.clear = "both";
	}
};

vw.ol3.control.Toolbar.prototype._resizePosition = function() {
	
	if ( vw.ol3.CommonFunc._isDef( this.site ) 
			&& vw.ol3.CommonFunc._isDef( this._collapsDivEl ) 
				&& vw.ol3.CommonFunc._isDef( this._vmap )) 	{

		var mapSize = this._vmap.getSize();

		if ( this.site == "bottom-right" || this.site == "center-right" || this.site == "top-right") {
			this._collapsDivEl.style.left = "";
			var right = "10px";
			this._collapsDivEl.style.right = right;
		} else {
			this._collapsDivEl.style.right = "";	
			var left = "10px";
			if ( this.site == "bottom-center" || this.site == "center-center" || this.site == "top-center" ) {
				var _elW = Number(this._collapsDivEl.style.width.replace(/\px/g,""));
				left = Math.round((mapSize[0]-_elW)/2) + "px";
			}
			this._collapsDivEl.style.left = left;
		}
					
		if ( this.site == "bottom-left" || this.site == "bottom-center" || this.site == "bottom-right") {
			this._collapsDivEl.style.top = "";
			var bottom = "10px";
			this._collapsDivEl.style.bottom = bottom;
		} else {
			this._collapsDivEl.style.bottom = "0px";	
			var top = "10px";
			if (this.site == "center-left" || this.site == "center-center" || this.site == "center-right") {
				var _elH = Number(this._collapsDivEl.style.height.replace(/\px/g,""));
				top = Math.round((mapSize[1]-_elH)/2) + "px";	
			}
			this._collapsDivEl.style.top = top;
		}
	} else {
		// this.site = none일 경우
		if ( ! vw.ol3.CommonFunc._isDef( this.site ) ) {
			if ( vw.ol3.CommonFunc._isDef( this.position ) ) {		
				this._collapsDivEl.style.position = "absolute";					
				this._collapsDivEl.style.top = this.position[1] + "px";
				this._collapsDivEl.style.left = this.position[0] + "px";
			}
		}
	}
};

vw.ol3.control.Toolbar.prototype.addToolButtons = function(_arrBtnList) {
	
	var _pannelHeight = 0;
	if ( vw.ol3.CommonFunc._isDef( _arrBtnList ) ) {
		var _cnt = _arrBtnList.length;
		
		for( var i =0 ; i < _cnt ; i++ ) {
			var _btn = _arrBtnList[i];
			this.addToolButton(_btn);
		}
	}
};
	
vw.ol3.control.ToolButton = function() {
	
	this.icon = null;
	this.caption = null;
	this.captionVisible = false;
	this.commandFunc = null;
	this.map = null;
	
	vw.ol3.control.Control.call(this);		
};

vw.ol3.inherits( vw.ol3.control.ToolButton ,  vw.ol3.control.Control );

vw.ol3.control.VWToolButton = function(_options) {
			
	vw.ol3.control.ToolButton.call(this);
	
	this.icon = ( vw.ol3.CommonFunc._isDef( _options.icon ) ) ? _options.icon : null;
	this.caption = ( vw.ol3.CommonFunc._isDef( _options.caption ) ) ? _options.caption : null;
	this.captionVisible = ( vw.ol3.CommonFunc._isDef( _options.captionVisible ) ) ? _options.captionVisible : true;

	this.element= vw.ol3.CommonFunc._createElement("img");
	this.element.style.cursor = "pointer";
	this.element.style.float = "left";
	this.element.style.width = "30px";
	this.element.style.height = "30px";
	this.element.alt = this.caption;
	
	if ( this.captionVisible) {
		this.element.src = this.icon;
		this.element.title = this.caption;
	} else {
		this.element.src = this.icon;
	}
};

vw.ol3.inherits( vw.ol3.control.VWToolButton ,  vw.ol3.control.ToolButton );

vw.ol3.control.VWToolButton.prototype.addEvent = function() {
	if ( vw.ol3.CommonFunc._isDef( this.commandFunc ) ) {
		if(vw.ol3.CommonFunc._isMobile()){
			this.element.addEventListener("touchstart", this.commandFunc, true);
		}else{
			this.element.addEventListener("click",this.commandFunc,true);
		}
	}
};
	
vw.ol3.control.VWToolButton.prototype.getElement = function() {
	return this.element;
};

vw.ol3.button.Init = function(map) {
	
	this._initOptions = {
			  icon : vw.ol3.ImgUrl.btninit
			, caption : "초기화" 
			, captionVisible:true
	};
							
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();
		   if ( vw.ol3.CommonFunc._isDef( map ) ) {
			   map.clear();
		   }
	   };
	   
	   this.addEvent();
};

vw.ol3.inherits( vw.ol3.button.Init ,  vw.ol3.control.VWToolButton );

vw.ol3.button.ZoomIn = function(map) {
	
	this._initOptions = {
			  icon : vw.ol3.ImgUrl.btnzoomin
			, caption : "확대" 
			, captionVisible:true
	};
			
	vw.ol3.control.VWToolButton.call(this, this._initOptions);
	this.commandFunc = function(e) {
		map._controls._removeToolbarInteractions();  
		map.un("click" , map.zoomIn);
		map.zoomIn(1);
	   };
	   
	   this.addEvent();
};

vw.ol3.inherits( vw.ol3.button.ZoomIn ,  vw.ol3.control.VWToolButton );	

vw.ol3.button.ZoomOut = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnzoomout 
			, caption : "축소" 
			, captionVisible:true
	};
					
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();  
		   map.un("click" , map.zoomOut);
		   map.zoomOut(1);
	   };
	   
	   this.addEvent();
	
};

vw.ol3.inherits( vw.ol3.button.ZoomOut ,  vw.ol3.control.VWToolButton );	

vw.ol3.button.DragZoomIn = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnextentin 
			, caption : "영역확대" 
			, captionVisible:true
	};
	
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();   			
			map.addInteraction(map._controls._getToolbarInteraction(0));
			map.un("click" , map.zoomIn );
			map.un("click" , map.zoomOut );
			map.on("click" , map.zoomIn );
	   }; 
	   
	   this.addEvent();
	   
	   var dragZoom =   new ol.interaction.DragZoom(	{	
			  condition: ol.events.condition.always	,
				 style: new ol.style.Style({
						 fill: new ol.style.Fill({
							color: 'rgba(255, 255, 255, 0.6)'
						  }),
						stroke: new ol.style.Stroke({
						  color: [255, 0, 0, 1]
						})
					  })
		  } );   		
};

vw.ol3.inherits( vw.ol3.button.DragZoomIn ,  vw.ol3.control.VWToolButton );

vw.ol3.button.DragZoomOut = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnextentout 
			, caption : "영역축소" 
			, captionVisible:true
	};
			
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		  map._controls._removeToolbarInteractions();
		  
		   var _minusZoom = function(evt) {
			   var _newResolution = map.getView().constrainResolution(map.getView().getResolution(),-2);
			   map.getView().setResolution(_newResolution);
		   }
		   
		   map._controls._getToolbarInteraction(1).un("boxend",_minusZoom);
		   map._controls._getToolbarInteraction(1).on("boxend",_minusZoom);
		   map.addInteraction(map._controls._getToolbarInteraction(1));	
		   map.un("click", map.zoomIn);
		   map.un("click", map.zoomOut);
		   map.on("click", map.zoomOut);
		   //map.on("pointerdrag", map.zoomOut );
	   }; 
	   
	   this.addEvent();
	
};

vw.ol3.inherits( vw.ol3.button.DragZoomOut ,  vw.ol3.control.VWToolButton );

vw.ol3.button.Pan = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnpan 
			, caption : "이동" 
			, captionVisible:true
	};
					
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions(); 
		   // 이동기능인데, 초기화시켜버리면 될듯함.   			
		   // 이동관련 인터액션생성.
		   map.getTargetElement().style.cursor = "move";
		   map.addInteraction(map._controls._getToolbarInteraction(2));	
	   }; 
	   
	   this.addEvent();
	
};

vw.ol3.inherits( vw.ol3.button.Pan ,  vw.ol3.control.VWToolButton );	

vw.ol3.button.Prev = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnprev 
			, caption : "이전화면" 
			, captionVisible:true
	};
				
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();
		   // ol.Collection에 담아서 사용...
		   map._controls._prevMapControlFunc();
	   };
	   
	   this.addEvent();
	
};

vw.ol3.inherits( vw.ol3.button.Prev ,  vw.ol3.control.VWToolButton );		

vw.ol3.button.Next = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnnext 
			, caption : "다음화면" 
			, captionVisible:true
	};
					
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();
		   // ol.Collection에 담아서 사용...
		   map._controls._nextMapControlFunc();
	   };
	   
	   this.addEvent();
	
};

vw.ol3.inherits( vw.ol3.button.Next ,  vw.ol3.control.VWToolButton );
	
vw.ol3.button.Full = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnfull 
			, caption : "전체보기" 
			, captionVisible:true
	};
					
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();
		   map.getView().setCenter(vw.ol3.ViewConfig.CENTER);
		   map.getView().setZoom(vw.ol3.ViewConfig.MINZOOM);   
	   }; 
	   
	   this.addEvent();
};

vw.ol3.inherits( vw.ol3.button.Full ,  vw.ol3.control.VWToolButton );	

vw.ol3.button.Distance = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btndist 
			, caption : "거리측정" 
			, captionVisible:true
	};
					
	var _thisMeasurement = map._measurement;		
	
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();
		   map.un("click" , map.zoomIn );
		   map.un("click" , map.zoomOut );
		   _thisMeasurement.command("LineString");
	   };
	   this.addEvent();
};

vw.ol3.inherits( vw.ol3.button.Distance ,  vw.ol3.control.VWToolButton );	

	
vw.ol3.button.Area = function(map) {
	
	this._initOptions = {
				icon : vw.ol3.ImgUrl.btnarea
			, caption : "면적측정" 
			, captionVisible:true
	};
			
	var _thisMeasurement = map._measurement;
	
	vw.ol3.control.VWToolButton.call(this, this._initOptions);		
	
	   this.commandFunc = function(e) {
		   map._controls._removeToolbarInteractions();
		   map.un("click" , map.zoomIn );
		   map.un("click" , map.zoomOut );
		   _thisMeasurement.command("Polygon");
	   };
	   
	   this.addEvent();
	
};

vw.ol3.inherits( vw.ol3.button.Area ,  vw.ol3.control.VWToolButton );

vw.ol3.control.Zoom = function(map) {
	
	this.divElement = vw.ol3.CommonFunc._createElement("div");
	this.divElement.id = "vw-zoombar";
	this.divElement.className = "vw-zoombar";
	this.divElement.style.position 	= "absolute";
	this.divElement.style.zIndex = "100";
	this.divElement.style.top = "0px";
	this.divElement.style.left = "0px";
	this.divElement.style.bottom = "0px";
	this.divElement.style.right = "0px";
	// 버튼들의 전체 크기. w,h
	this.divElementSize = [0,0];
	
	var _options = {
		 map : map
		,element: this.divElement
	}
	
	vw.ol3.control.Control.call(this,_options);
	
	this.id = "vw.ol3.control.Zoom";
	this.map = map;
	this.delta = 1;
	this.sliderVisible = true;
	this.pan = new vw.ol3.control.ZoomControl(map);
			
};

vw.ol3.inherits( vw.ol3.control.Zoom , vw.ol3.control.Control );

vw.ol3.control.Zoom.prototype.draw = function() {
	var _thisMap = this.map;
		// 줌바 최소화.
		   if ( ! this.sliderVisible ) {	   			
			   this._getDefaultZoom(false);				
		   } else {	   			
			   // 슬라이더 크기 포함한다.  w: 30 , h : 114
			   this.divElementSize[0] = 30;
			   this.divElementSize[1] = 114;	   			   			
			   this._getDefaultZoom(true);
		   };	   		

		   this.resizePosition();
};

vw.ol3.control.Zoom.prototype.resizePosition = function() {
	
	if ( vw.ol3.CommonFunc._isDef( this.site ) 
			&& vw.ol3.CommonFunc._isDef( this.divElement ) 
				&& vw.ol3.CommonFunc._isDef( this.map )) 	{

		var mapSize = this.map.getSize();
		if ( this.site == "bottom-right" || this.site == "center-right" || this.site == "top-right") {
			this.divElement.style.left = "";
			var right = "15px";//"10px";
			this.divElement.style.right = right;
		} else {
			this.divElement.style.right = "";	
			var left = "15px";//"10px";
			if ( this.site == "bottom-center" || this.site == "center-center" || this.site == "top-center" ) {
				var _elW = Number(this.divElement.style.width.replace(/\px/g,""));
				left = Math.round((mapSize[0]-_elW)/2) + "px";
			}
			this.divElement.style.left = left;
		}
					
		if ( this.site == "bottom-left" || this.site == "bottom-center" || this.site == "bottom-right") {
			this.divElement.style.top = "";
			var bottom = "25px";
			this.divElement.style.bottom = bottom;
		} else {
			this.divElement.style.bottom = "0px";	
			var top = "25px";
			if (this.site == "center-left" || this.site == "center-center" || this.site == "center-right") {
				var _elH = Number(this.divElement.style.height.replace(/\px/g,""));
				top = Math.round((mapSize[1]-_elH)/2) + "px";			
			}
			this.divElement.style.top = top;
		}
	} else {
		// this.site = none일 경우
		if ( ! vw.ol3.CommonFunc._isDef( this.site ) ) {
			if ( vw.ol3.CommonFunc._isDef( this.position ) ) {		
				this.divElement.style.position = "absolute";					
				this.divElement.style.top = this.position[1] + "px";
				this.divElement.style.left = this.position[0] + "px";
			}
		}
	}
}

vw.ol3.control.Zoom.prototype._getDefaultZoom = function() {

	var _thisVmap = this.map;
	var _thisMeasurement = _thisVmap._measurement;
	var _pan = this.pan;
	var _objOpt = {};
		
	_objOpt.className = "ol-zoom-up";
	_objOpt.title = "위로이동";
	_objOpt.imgUrl  = vw.ol3.ImgUrl.panup;
	_objOpt.width = 80;
	_objOpt.height = 27;
	_objOpt.func = function() {
			_pan.panTo("up");
	};
	this._createZoomButton(_objOpt);

	_objOpt.className = "ol-zoom-left";
	_objOpt.title = "좌로이동";
	_objOpt.width = 40;
	_objOpt.height = 27;
	_objOpt.imgUrl  = vw.ol3.ImgUrl.panleft;	
	_objOpt.func = function() {
		_pan.panTo("left");
	};
	this._createZoomButton(_objOpt);
	   
	_objOpt.className = "ol-zoom-center";
	_objOpt.title = "전체보기";
	_objOpt.imgUrl  = vw.ol3.ImgUrl.pancenter;
	_objOpt.width = 22;
	_objOpt.height = 27;
	_objOpt.func = function() {
		_pan.fullExtent();
	};
	this._createZoomButton(_objOpt);
	
	_objOpt.className = "ol-zoom-bottom";
	_objOpt.title = "아래로이동";
	_objOpt.width = 80;
	_objOpt.height = 26;
	_objOpt.imgUrl  = vw.ol3.ImgUrl.panbottom;
	_objOpt.func = function() {
		_pan.panTo("down");
	};
	this._createZoomButton(_objOpt);
	
	_objOpt.className = "ol-zoom-right";
	_objOpt.title = "우로이동";
	_objOpt.imgUrl  = vw.ol3.ImgUrl.panright;
	_objOpt.width = 40;
	_objOpt.height = 27;
	_objOpt.func = function() {
		_pan.panTo("right");
	};
	this._createZoomButton(_objOpt);
	
	var _delta = this.delta;
	
	var _height = "91px";
	var _left 		= 	"25px";
	// 전체 포함.
	if ( this.sliderVisible ) {			
		
		_height = "210px";
		
		_objOpt.className = "ol-zoomin";
		  _objOpt.title = "확대";
		   _objOpt.imgUrl  = vw.ol3.ImgUrl.panzoomin;
		   _objOpt.width = 30;
		   _objOpt.height = 29;
		   _objOpt.func = function() {
			   _thisVmap.zoomIn(_delta);
		   };
		   var zoomin = this._createZoomButton(_objOpt);
		   zoomin.style.position ="relative";
		   zoomin.style.top ="91px";
		   zoomin.style.left = _left;
		   
		   _objOpt.className = "ol-zoomout";
		   _objOpt.title = "축소";
		   _objOpt.imgUrl  = vw.ol3.ImgUrl.panzoomout;
		   _objOpt.width = 30;
		   _objOpt.height = 29;
		   _objOpt.func = function() {
			   _thisVmap.zoomOut(_delta);
		   };
		   
		   var zoomout = this._createZoomButton(_objOpt);
		   zoomout.style.position ="relative";
		   zoomout.style.top ="201px";
		   zoomout.style.left = _left;   			
		   var _option = {
				   className : "ol-zoomslider",
				   duration: 500,
				   maxResolution: vw.ol3.ViewConfig.MAXRESOLUTION,
				   minResolution:  vw.ol3.ViewConfig.MINRESOLUTION
		   };	   		
		   var _zoomslider = new ol.control.ZoomSlider(_option);   		
		   _thisVmap.addControl(_zoomslider);
		   vw.ol3.CommonFunc._css(".ol-zoomslider", "background-image", "url('" + vw.ol3.ImgUrl.panzoomslider + "')");
		   vw.ol3.CommonFunc._css(".ol-zoomslider-thumb", "background-image", "url('" + vw.ol3.ImgUrl.panzoomsliderthumb + "')");
		   vw.ol3.CommonFunc._css(".ol-zoomslider", "top", "118px");
		   vw.ol3.CommonFunc._css(".ol-zoomslider", "left", _left);
		   vw.ol3.CommonFunc._append(this.divElement, ".ol-zoomslider");
	} else {
		// 슬라이더뺌.
		_height = "96px";			
		_objOpt.className = "ol-zoomin";
		  _objOpt.title = "확대";
		   _objOpt.imgUrl  = vw.ol3.ImgUrl.panzoomin;
		   _objOpt.width = 30;
		   _objOpt.height = 29;
		   _objOpt.func = function() {
			   _thisVmap.zoomIn(_delta);
		   };
		   var zoomin = this._createZoomButton(_objOpt);
		   zoomin.style.position ="relative";
		   zoomin.style.top ="91px";
		   zoomin.style.left = _left;
		   
		   _objOpt.className = "ol-zoomout";
		   _objOpt.title = "축소";
		   _objOpt.imgUrl  = vw.ol3.ImgUrl.panzoomout;
		   _objOpt.width = 30;
		   _objOpt.height = 29;
		   _objOpt.func = function() {
			   _thisVmap.zoomOut(_delta);
		   };
		   
		   var zoomout = this._createZoomButton(_objOpt);
		   zoomout.style.position ="relative";
		   zoomout.style.top ="91px";
		   zoomout.style.left = _left;
	}
	
	   _objOpt.element  = "div";
	   _objOpt.className = "ol-zoom-init";
	   _objOpt.title = "초기화";
	   _objOpt.imgUrl  = vw.ol3.ImgUrl.paninit;
	_objOpt.width = 30;
	_objOpt.height = 90;   		
	_objOpt.func = 	function() {
			_thisVmap.clear();
	}
	var zoomInit = this._createZoomButton(_objOpt);
	zoomInit.style.position = "relative";
	zoomInit.style.top	= _height;

	   _objOpt.func = null;		   			   				   		
	_objOpt.element  = "div";
	_objOpt.className = "ol-zoom-dist";
	_objOpt.title = "거리측정";
	_objOpt.imgUrl  = vw.ol3.ImgUrl.pandist;
	_objOpt.width = 30;
	_objOpt.height = 29;   	
	_objOpt.func = function() {
		_thisMeasurement.command("LineString");
	}
	var zoomDist = this._createZoomButton(_objOpt);
	zoomDist.style.position = "relative";
	zoomDist.style.top	= "0px";

	_objOpt.element  = "div";
	_objOpt.className = "ol-zoom-area";
	_objOpt.title = "면적측정";
	_objOpt.imgUrl  = vw.ol3.ImgUrl.panarea;
	_objOpt.width = 30;
	_objOpt.height = 28;   	
	_objOpt.func = function() {
		_thisMeasurement.command("Polygon");
	}	
	var zoomArea = this._createZoomButton(_objOpt);
	zoomArea.style.position = "relative";
	zoomArea.style.top	= "0px";

	_objOpt.func = null;
	   
	vw.ol3.CommonFunc._append(zoomInit, zoomDist);
	vw.ol3.CommonFunc._append(zoomInit, zoomArea);
	
	vw.ol3.CommonFunc._hover(zoomInit,
			function() {
				vw.ol3.CommonFunc._show(zoomDist);
				vw.ol3.CommonFunc._show(zoomArea);
			},
			function() {
				vw.ol3.CommonFunc._hide(zoomDist);
				vw.ol3.CommonFunc._hide(zoomArea);
			}
	);
	
	this.divElement.style.height = (this.divElementSize[1]-95) + "px";
};
	
vw.ol3.control.Zoom.prototype._createZoomButton = function(objOpt) {
	
	var _btn = vw.ol3.CommonFunc._createElement("div");
	_btn.className 	= objOpt.className;		
	_btn.style.width		= objOpt.width + "px";
	_btn.style.height	= objOpt.height + "px";
	_btn.style.cursor	=	"pointer";
	var _imgBtn = vw.ol3.CommonFunc._createElement("img");
	_imgBtn.src 			= objOpt.imgUrl ;
	_imgBtn.title 			= objOpt.title ;	
	if(vw.ol3.CommonFunc._isMobile()){
		_imgBtn.addEventListener('touchstart', objOpt.func, true);
	}else{
		_imgBtn.addEventListener("click",objOpt.func,true);
	}
	vw.ol3.CommonFunc._append(_btn, _imgBtn);	
				
	this._calculateSize(_btn);
	
	return _btn;
};

vw.ol3.control.Zoom.prototype._calculateSize = function(_btn) {
	var _elWidth, _elHeight ;
	
	_elWidth = _btn.style.width;
	_elHeight = _btn.style.height;
	if ( vw.ol3.CommonFunc._isDef( _elWidth ) ) {
		_elWidth = Number( _elWidth.replace(/\px/g,"") );
	}
	
	if ( vw.ol3.CommonFunc._isDef( _elHeight ) ) {
		_elHeight = Number( _elHeight.replace(/\px/g,"") );
	}		
	this.divElementSize[0] += _elWidth;
	this.divElementSize[1] += _elHeight;

	// 수직
	this.divElement.style.width = "80px";
	this.divElement.style.height = this.divElementSize[1] + "px";
	this.divElement.style.float = "left";
	
	vw.ol3.CommonFunc._append( this.divElement , _btn );
};
	

vw.ol3.control.ZoomControl = function(_vmap) {
	this.map = _vmap;
};
 
vw.ol3.control.ZoomControl.prototype.panTo = function(position, x, y) {

	this.map.beforeRender(
			  ol.animation.pan({
					duration: 500,
					source: (this.map.getView().getCenter())
				  })  
	  );
		var  _center = this.map.getView().getCenter();
		
		var _x = _center[0];
		var _y = _center[1];
		var _resolution = this.map.getView().getResolution();
		var _mapSize = this.map.getSize();
		
		var _mapHalfWidth = (_mapSize[0]*_resolution) / 4.0;
		var _mapHalfHeight = (_mapSize[1]* _resolution) / 4.0;			

	  switch(position) {
		  case  "up":
			  _y = _y + _mapHalfHeight;
			  break;
		  case "left":
			  _x = _x - _mapHalfWidth;
			  break;
		  case "right":
			  _x = _x + _mapHalfWidth;
			  break;
		  case "down":
			  _y = _y  - _mapHalfHeight;
			  break;
		  default:
			  _x = _mapHalfWidth + x;
				_y = _mapHalfHeight + y;
	  };		  
	  var _chk = true;
	  
	  if (_x < vw.ol3.ViewConfig.MAPEXTENT[0] || _x > vw.ol3.ViewConfig.MAPEXTENT[2]) {
		  _chk = false;
	  }
	  
	  if (_y < vw.ol3.ViewConfig.MAPEXTENT[1] || _y > vw.ol3.ViewConfig.MAPEXTENT[3]) {
		  _chk = false;
	  }
	  
	  if (_chk) {
		  _center[0] = _x;
		  _center[1] = _y;
	  };
	  this.map.render();
	  this.map.getView().setCenter(_center);
};

vw.ol3.control.ZoomControl.prototype.fullExtent = function() {
	this.map.getView().setCenter(vw.ol3.ViewConfig.CENTER);
	this.map.getView().setZoom(vw.ol3.ViewConfig.MINZOOM);   	
};

vw.ol3.control.OverviewMap = function(map, opt) {
	this.map = map;
	
	this.site = "bottom-right";
	
	var _omview = 	new ol.View({
		  maxZoom: 19,
		  minZoom:  6,
		  maxExtent: vw.ol3.ViewConfig.MAXEXTENT ,
		  projection: vw.ol3.ViewConfig.ORIPROJ,
		  extent: vw.ol3.ViewConfig.MAXEXTENT,
		  center: vw.ol3.ViewConfig.CENTER,
		  zoom: vw.ol3.ViewConfig.ZOOM
  });

	var OverviewMapOptions = {
			 collapsed: true//false
			, collapsible: true
			, tipLabel: "브이월드오버뷰맵" 
			, view: _omview
			, labelClassName: "vw-span"
	}
	if(opt != undefined){
		OverviewMapOptions.collapsed = (vw.ol3.CommonFunc._isDef( opt.collapsed )) ? opt.collapsed : true;	
	}
		
			
	var _overviewMapControl = new ol.control.OverviewMap(OverviewMapOptions);
	
	//_overviewMapControl.f.setView(_omview);		
	_overviewMapControl.ovmap_.setView(_omview);		// ol-debug.js 사용시..
	this.map.addControl(_overviewMapControl);		
	var _vmap = this.map;
	
	   var setNewExtent = function (overviewDiv) {

		  var offset = overviewDiv.helper.position();
		  var divSize = [overviewDiv.helper.width(), overviewDiv.helper.height()];
		  var mapSize = _vmap.getSize();
		  var c = _vmap.getView().getResolution();
		  var xMove = offset.left * (Math.abs(mapSize[0] / divSize[0]));
		  var yMove = offset.top * (Math.abs(mapSize[1] / divSize[1]));
		  var bottomLeft = [0 + xMove, mapSize[1] + yMove];
		  var topRight = [mapSize[0] + xMove, 0 + yMove];
		  var left = _vmap.getCoordinateFromPixel(bottomLeft);
		  var top = _vmap.getCoordinateFromPixel(topRight);
		  var extent = [left[0], left[1], top[0], top[1]];
		  _vmap.getView().fit(extent, _vmap.getSize(),{ constrainResolution: true,nearest: true});
		  _vmap.getView().setResolution(c);
	   };
	   
	$(".ol-overviewmap-box").draggable({drag: function (event, ui) {  }});
	$(".ol-overviewmap-box").on("dragstop", function (event, ui) {
		setNewExtent(ui);
		$(".ol-overviewmap-box").css("left", "auto");
		$(".ol-overviewmap-box").css("top", "auto");
	});
	
};

vw.ol3.control.OverviewMap.prototype.draw = function() {
	switch(this.site) {
	case "top-left" :
		$(".ol-overviewmap").css(
				{ bottom: 'auto',left: '0',right: 'auto',top: '0'}
		);
		break;
	case "top-right" :
		$(".ol-overviewmap").css(
				{ bottom: 'auto',left: 'auto',right: '0',top: '0'}
		);
		break;			
	case "bottom-left" :
		$(".ol-overviewmap").css(
				{ bottom: '0',left: '0',right: 'auto',top: 'auto'}
		);				
		break;		
	case "bottom-right" :
		$(".ol-overviewmap").css(
				{ bottom: '0',left: 'auto',right: '0',top: 'auto'}
		);
		break;					
	};			

};

var routeMapArray = new Array();
vw.ol3.control.RouteMap = function(vmap,mapName, defaultImg,firstImg,lastImg, lineColor) {
	this.vmap = null;
	this.firstMarkerUrl = '//map.vworld.kr/images/user/popup/u_pin-ylwe.png';
	this.lastMarkerUrl = '//map.vworld.kr/images/user/popup/u_pin-ylwd.png';
	this.defaultMarkerUrl = vw.ol3.ImgUrl.marker + vw.ol3.ImgUrl.markerblueimage	;
	this.symbolType = 'default';
	this.routePopupArray = new Array();
	this.mapName = null;
	this.routeLayer = null;
	this.features = new ol.Collection();
	this.routeCoordinates = new Array();
	this.drawRoute = null;
	this.routeSource = null;
	this.routeFirstStyle = null;
	this.routeDefaultStyle = null;
	this.routeLastStyle = null;
	this.lineColor = null;
	this.clickCount = 0;
	this.className = "vw.ol3.control.RouteMap";     
	this.defaultMarkerUrl = ( vw.ol3.CommonFunc._isDef( defaultImg ) ) ? defaultImg : this.defaultMarkerUrl;
	this.firstMarkerUrl = (vw.ol3.CommonFunc._isDef( firstImg )) ? firstImg : this.firstMarkerUrl;
	this.lastMarkerUrl = ( vw.ol3.CommonFunc._isDef( lastImg ) ) ? lastImg : this.lastMarkerUrl;
	this.vmap = ( vw.ol3.CommonFunc._isDef( vmap ) ) ? vmap : null;
	this.lineColor = ( vw.ol3.CommonFunc._isDef( lineColor ) ) ? lineColor : "#00FF00";
	
	if (!this.isChar((mapName + "").substr(0, 1))) {
		alert('경로지도 이름이 잘못입력되었습니다. \n경로지도 이름은 영문자로 시작되어야 합니다.');
		return this.returnRouteMap(mapName);
	} else {
		this.mapName = mapName;
	}
	if (this.checkHistory(mapName)) {
		alert('같은 경로지도 이름이 등록되어 있습니다. \n경로지도 이름 : ' + mapName);
		var rMap = this.returnRouteMap(mapName);
		
		for(var i=0; i<rMap.routePopupArray.length; i++){
			if(rMap.routePopupArray[i].rendered_.visible){
				rMap.routePopupArray[i].close();
			}
		}
		return rMap;
	} else {
		ol.interaction.Pointer.call(this, {
			handleDownEvent		: vw.ol3.control.RouteMap.prototype.handleDownEvent
			,handleMoveEvent	: vw.ol3.control.RouteMap.prototype.handleMoveEvent
			,handleUpEvent			: vw.ol3.control.RouteMap.prototype.handleUpEvent
		  });
		
		this.coordinate_ = null;
		this.cursor_ = 'cursor';
		this.eventFunction = null;          
		//this.routeMapClickPopupFunction = null;
		
		  this._init();  
	}    
};

vw.ol3.inherits(vw.ol3.control.RouteMap, ol.interaction.Pointer);

vw.ol3.control.RouteMap.prototype.removeRouteMap = function(mapName) {
	this.stop();
	
	for(var i=0; i<routeMapArray.length; i++){
		if(routeMapArray[i].mapName == mapName){
			this.vmap.unByKey(routeMapArray[i].get('eventId'));
			this.vmap.removeLayer(routeMapArray[i]);
			routeMapArray.splice(i,1);
		}
	}
	
	for(var i=0; i<this.vmap.getLayers().getLength(); i++){
		if(this.vmap.getLayers().item(i).get('mapName') == mapName){
			this.vmap.getLayers().item(i).getSource().clear();
			this.vmap.removeLayer(this.vmap.getLayers().item(i));
		}
	}
	this.closeAllPop();
}

vw.ol3.control.RouteMap.prototype.returnRouteMap = function(mapName) {
	for(var i=0; i<routeMapArray.length; i++){
		if(routeMapArray[i].mapName == mapName){
			return routeMapArray[i];
		}
	}
}

vw.ol3.control.RouteMap.prototype.closeAllPop = function() {
	for(var i=0; i<vmap.getOverlays().getArray().length; i++){
		if(vmap.getOverlays().getArray()[i].get('id').indexOf("RouteMap-" + this.mapName) != -1){
			if(vmap.getOverlays().getArray()[i].rendered_.visible){
				vmap.getOverlays().getArray()[i].close();
				i--;
			}
		}
	}
}

vw.ol3.control.RouteMap.prototype.openAllPop = function() {
	this.closeAllPop();
	for(var i=0; i<this.features.getArray().length; i++){
		if(this.features.getArray()[i].getGeometry().getType() == 'Point' && this.features.getArray()[i].get('id').indexOf('RouteMap-' + this.mapName) != -1 && !this.features.getArray()[i].get('isPopOpen')){
			var popup = new vw.ol3.popup.Popup();
			popup.setOffset([ 0, -25 ]);
			popup.title = "<b>" + this.features.getArray()[i].get('title') + "</b><hr>";
			popup.content = this.features.getArray()[i].get('desc');
			popup.set("id", this.features.getArray()[i].get('id'));
			vmap.addOverlay(popup);
			popup.show(popup.content, this.features.getArray()[i].getGeometry().getCoordinates());
		}
	}
}

vw.ol3.control.RouteMap.prototype._init = function() {
	
	
	
	 this.routeDefaultStyle	= [	  
				  new ol.style.Style({
						   fill: new ol.style.Fill({
									  color: this.lineColor
								   }),
						   stroke: new ol.style.Stroke({
									   color: this.lineColor,
									   width: 4
								   }),
						   image: new ol.style.Circle({
									   radius: 5,
									   stroke: new ol.style.Stroke({
											   color: 'rgba(0, 0, 255, 0.8)'
										}),
										fill: new ol.style.Fill({
											 color: 'rgba(255,215,0, 0.7)'
										})
								   })
				   })
	];           
	
	this.routeSource = new ol.source.Vector({projection:"EPSG4326",wrapX:false,features: this.features});
								
	this.routeLayer = new ol.layer.Vector(
			{
			  source: this.routeSource,
			  style: this.routeDefaultStyle 
			}
	);    		  		
		
	if ( ! vw.ol3.CommonFunc._isDef( this.drawRoute ) ) {
		this.drawRoute = new ol.interaction.Draw(
			{
				features : this.features,
				type: "Point"
			}
		);
	}
	this.routeLayer.set("mapName", this.mapName);
	this.vmap.addLayer(this.routeLayer);
	
	var _vmap = this.vmap;
	var _routeLayer = this.routeLayer;
	

	this.routeMapClickPopupFunction = function(evt) {
		var layerName;
		var feature = _vmap.forEachFeatureAtPixel(evt.pixel, function(feature,layer) {
			if (layer != null && _routeLayer.get('mapName') == layer.get('mapName')) {
				if (feature.getGeometry().getType() == 'Point')
					layerName = layer.get('mapName');
					return feature;
			} else {
				return false;
			}
		});
		if (feature) {
			var isCreated = false;
			var openPop;
			for(var i in vmap.getOverlays().getArray()){
				if(vmap.getOverlays().getArray()[i].get('id').indexOf("RouteMap-" + layerName) != -1){
					if(vmap.getOverlays().getArray()[i].get('id') == feature.get('id')){
						if(vmap.getOverlays().getArray()[i].rendered_.visible){
							vmap.getOverlays().getArray()[i].close();
							isCreated = true;
							return;
						} else {
							_vmap.addOverlay(vmap.getOverlays().getArray()[i]);
							vmap.getOverlays().getArray()[i].show(vmap.getOverlays().getArray()[i].content, evt.coordinate);
							return;
						}
					}
				}
			}
			if(!isCreated){
				var popup = new vw.ol3.popup.Popup();
				popup.setOffset([ 0, -25 ]);
				popup.title = "<b>" + feature.get('title') + "</b><hr>";
				popup.content = feature.get('desc');
				popup.set("id", feature.get('id'));
				popup.set("xy", feature.getGeometry().getCoordinates());
				_vmap.addOverlay(popup);
				popup.show(popup.content, feature.getGeometry().getCoordinates());
				return;
			}
		}
	}
	var routeMapLayerListenerId = this.vmap.on("click",this.routeMapClickPopupFunction,this.vmap);
	this.set("eventId", routeMapLayerListenerId);
	routeMapArray.push(this);
};

vw.ol3.control.RouteMap.prototype.start = function() {
	var _vmap = this.vmap;
	
	_vmap.addInteraction(this.drawRoute);    	    	
	_vmap.addInteraction(this);
	this.setActive(true);
	this.drawRoute.setActive(true);    	
	// init popup on click
	//_vmap.un("singleclick",  this.popFunction );
};

vw.ol3.control.RouteMap.prototype.stop = function() {
	var _vmap = this.vmap;
	this.setActive(false);
	this.drawRoute.setActive(false);
	_vmap.removeInteraction(this.drawRoute);    	    	
	_vmap.removeInteraction(this);	
	// display popup on click
	//_vmap.on("singleclick",  this.popFunction );
};

vw.ol3.control.RouteMap.prototype.handleDownEvent = function(evt) {
	var map = evt.map;
	
	var feature = map.forEachFeatureAtPixel(evt.pixel,
	  function(feature, layer) {
		return feature;
	});

	if (feature) {
		this.coordinate_ = evt.coordinate;
		this.feature_ = feature;
	}
	
	if ( vw.ol3.CommonFunc._isDef(this.coordinate_)  ) {
		this.coordinate_ = evt.coordinate;
	} 
	if ( this.clickCount == 0 ) {
		  this.routeCoordinates[this.clickCount] = this.coordinate_;
	} else {
		  this.routeCoordinates[this.clickCount] = this.coordinate_;
		  var lineFeature = new ol.Feature(
					new ol.geom.LineString([this.routeCoordinates[this.clickCount-1], this.routeCoordinates[this.clickCount]]));
		  this.features.push(lineFeature);		  
	}
	
	var icon = this.defaultMarkerUrl;
	if ( this.clickCount == 0 ) {
		icon = this.firstMarkerUrl
	} else {
		icon = this.defaultMarkerUrl;
	};
	var iconStyle = 
		   new ol.style.Style({
			image: new ol.style.Icon(({
				scale: 1,
				rotateWithView: false,
				anchor: [0.5, 1],
				anchorXUnits: 'fraction',
				anchorYUnits: 'fraction',
				opacity: 1,
				src: icon	
			}))
		});

	var point = new ol.geom.Point(this.coordinate_);
	
	var feature = new ol.Feature(point);
	feature.setStyle(iconStyle);		
	feature.set("id", "RouteMap-" + this.mapName + "-" + vw.ol3.CommonFunc._makeUniqeIds());
	this.features.push(feature);
	this.eventFunction();
	this.clickCount++;  
  
	return !!feature;
};

vw.ol3.control.RouteMap.prototype.handleMoveEvent = function(evt) {
	  if (this.cursor_) {
		var map = evt.map;
		var feature = map.forEachFeatureAtPixel(evt.pixel,
			function(feature, layer) {
			  return feature;
			});
		var element = evt.map.getTargetElement();
		if (feature) {
		  if (element.style.cursor != this.cursor_) {
			this.previousCursor_ = element.style.cursor;
			element.style.cursor = this.cursor_;
		  }
		} else if (this.previousCursor_ !== undefined) {
		  element.style.cursor = this.previousCursor_;
		  this.previousCursor_ = undefined;
		}
	  }
};

vw.ol3.control.RouteMap.prototype.handleUpEvent = function(evt) {
		//console.log("over");			  
};
		
vw.ol3.control.RouteMap.prototype.setFunction = function(_function) {
	this.eventFunction = _function;
};


vw.ol3.control.RouteMap.prototype.addRoute = function (mapName, title, desc,coordinate) {
	if (!this.checkHistory(mapName)) {
		alert('같은이름으로 등록된 경로지도가 없습니다. \n경로지도 이름 : ' + mapName);
	} else {
		var feature = this.features.item(this.features.getLength()-1);
		feature.set("title", title);
		feature.set("desc", desc);
	}
};

vw.ol3.control.RouteMap.prototype.isChar = function (input) {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	return this.containsCharsOnly(input, chars);
};

vw.ol3.control.RouteMap.prototype.containsCharsOnly = function (input, chars) {
	for (var inx = 0; inx < input.length; inx++) {
		if (chars.indexOf(input.charAt(inx)) == -1)
			return false;
	}
	return true;
};

vw.ol3.control.RouteMap.prototype.isNumber = function (input) {
	var chars = "0123456789";
	return this.containsCharsOnly(input, chars);
};

vw.ol3.control.RouteMap.prototype.checkHistory = function (mapName) {
	var routeMapHistory = false;
	for (var i = 0; i < routeMapArray.length; i++) {
		if (mapName == routeMapArray[i].mapName) routeMapHistory = true;
	}
	return routeMapHistory;
};
		
vw.ol3.control.RouteMap.prototype.getColor = function (mapName) {
	return this.lineColor;
};

vw.ol3.control.RouteMap.prototype.setColor = function (mapName, color) {
	this.lineColor = color;
	 this.routeDefaultStyle	= [	  
								 new ol.style.Style({
									  fill: new ol.style.Fill({
										  color: this.lineColor 
										}),
										stroke: new ol.style.Stroke({
										  color: this.lineColor ,
										  width: 4
										}),
										image: new ol.style.Circle({
										  radius: 5,
										  stroke: new ol.style.Stroke({
											color: 'rgba(0, 0, 255, 0.8)'
										  }),
										  fill: new ol.style.Fill({
											color: 'rgba(255,215,0, 0.7)'
										  })
										})
										})
	];  
	this.routeLayer.setStyle(this.routeDefaultStyle);
};

vw.ol3.control.RouteMap.prototype.getWidth = function () {
	var _styles = this.routeLayer.getStyle();
	var _stroke = _styles[0].getStroke();
	var width = _stroke.getWidth();
	return width;
};

vw.ol3.control.RouteMap.prototype.setWidth = function (mapNam,width) {
	 
	 this.routeDefaultStyle	= [	  
								 new ol.style.Style({
									  fill: new ol.style.Fill({
										  color: this.lineColor
										}),
										stroke: new ol.style.Stroke({
										  color: this.lineColor,
										  width: width
										}),
										image: new ol.style.Circle({
										  radius: 5,
										  stroke: new ol.style.Stroke({
											color: 'rgba(0, 0, 255, 0.8)'
										  }),
										  fill: new ol.style.Fill({
											color: 'rgba(255,215,0, 0.7)'
										  })
										})
										})
	];  
   this.routeLayer.setStyle(this.routeDefaultStyle);
};
	
vw.ol3.control.RouteMap.prototype.getStyle = function (mapName) {
	return this.routeLayer.getStyle();
};

vw.ol3.control.RouteMap.prototype.setStyle = function (mapName,style) {
	this.routeLayer.setStyle(style);
};


// NameSpace 선언
vw.ol3.chart = {};

/**
 * vw.ol3.chart.ChartStyle 구조체
 */
vw.ol3.chart.ChartStyle = {
		color: "#FF0000",
		label: "",
		legendLabel: ""	
};
		
/**
 * @description 차트 정보를 랜더링하여 제공.  superclass
 */
vw.ol3.chart.Chart = function() {
			
	this.styles = null;
	this.legend = null;
	this.title = null;
	this.values = null;
	
	var _options = {
			positioning: "center-center" 	
	};
	
	ol.Overlay.call(this,_options);
	
};

vw.ol3.inherits( vw.ol3.chart.Chart , ol.Overlay );

vw.ol3.chart.Chart.prototype._init = function() {
	
	this.txtattr = { font: "12px sans-serif" };
	
	 this.colorArr 			= new Array();
	 this.labelArr 			= new Array();
	 this.legendLabelArr = new Array();    	
	 this.maxValue = 0;
	 
	 if ( vw.ol3.CommonFunc._isDef(this.styles) ) {
		 for( var i=0, cnt = this.styles.length; i < cnt ; i++) {
			 this.colorArr[i] 				= this.styles[i].color;
			 this.labelArr[i] 				= this.styles[i].label;
			 this.legendLabelArr[i] 	= this.styles[i].legendLabel;
			 if ( this.maxValue <= this.values[i]) {
				 this.maxValue = this.values[i];
			 }
		 }
	 }

	 this.isVisible = false;
	 
	if ( vw.ol3.CommonFunc._isDef( this.legend ) ) {
		if ( this.legend.visible ) {
			this.isVisible = true;        		
		}
	};
	

	this._legendLabels = new Array();
	if ( vw.ol3.CommonFunc._isDef( this.legendLabelArr ) ) {
		this._legendLabels = this.legendLabelArr;
	} else {
		this._legendLabels = this.labelArr;
	}
	 
	 this.tableElement = vw.ol3.CommonFunc._createElement("table");
	 this.tableElement.id = "vwChart";
	 //this.tableElement.setAttribute("border","1");         
	 
	 var trElementTitle = vw.ol3.CommonFunc._createElement("tr");
	 
	 var tdElementTitle = vw.ol3.CommonFunc._createElement("td");
	 tdElementTitle.setAttribute("align","center");
	 tdElementTitle.style.font = "12px sans-serif";
	 tdElementTitle.innerHTML = this.title;
	 tdElementTitle.setAttribute("colspan","2");
	 trElementTitle.appendChild(tdElementTitle);
	 this.tableElement.appendChild(trElementTitle);
	 
	 var trElement = vw.ol3.CommonFunc._createElement("tr");
	 
	 this.tdElementLeft = vw.ol3.CommonFunc._createElement("td");
	
	 this.tdElementRight = vw.ol3.CommonFunc._createElement("td");
	
	 trElement.appendChild(this.tdElementLeft);
	 trElement.appendChild(this.tdElementRight);
	 this.tableElement.appendChild(trElement);
	 
	 this.setElement(this.tableElement);
	 
	 this.r = Raphael(this.tdElementLeft);
	 this.panR = Raphael(this.tdElementRight);
	 
	   //var bar chart 관련 변수
	   this.barx = 20; 
	   this.bary = 10; 
	   this.gutter= 10; 
	   this.barwidth = 25; 
	   this.barcount = 0; 
	 
};

vw.ol3.chart.Bar = function(size) {
		
	this.size = size;
			
	vw.ol3.chart.Chart.call(this);
					
};

vw.ol3.inherits(  vw.ol3.chart.Bar , vw.ol3.chart.Chart);

vw.ol3.chart.Bar.prototype.draw = function() {
	
	this._init();
	 
	 var width 			= this.size[0];
	 var height 			= this.size[1];
	
	if (this.values.length >= 1 && (typeof(this.values[0]) !='object') ) {
		this.barcount = this.values.length;
	} 	else {
		this.barcount = this.values[0].length;
	}
	
	width = this.barx + (this.barwidth*this.gutter*0.01) + ((this.barwidth + this.barwidth*this.gutter*0.01)*this.barcount);
 
	var _opts = {
			 to	 					: 	this.maxValue,
			 colors				:	this.colorArr, 
			 label				:	this.labelArr,
			 gutter				:	this.gutter, 
			 barwidth 		: 	this.barwidth,
			 legend				:	this.labelArr,
			 legendcolor	:	this.colorArr,
			 makelegend	:	this.isVisible,
			 tooltip				:	this.values,
			 legendpos		:	"east",
			 pannel 			: 	this.panR
	}
 
	var bar = this.r.barchart(this.barx, this.bary, width, height, this.values , _opts );
		 
	var minwidth = Math.max(bar.covers.getBBox().width,width);
	var minheight = Math.max(bar.covers.getBBox().height,height);
	 // 오른쪽 공간 보정. 공간이 없어서 말풍선 짤림.
	minwidth += 15;

	 bar.customLabel = function (labels) {
		 //console.log("customLabel start");
		 labels = labels || [];
		 this.labels = r.set();
		 for (var i = 0; i < this.bars.length; i++) {
			 x = this.bars[i].x;
			 if ( i==0) {
				 y = this.bars[i].y+10;	
			 }
			 //console.log("bars" , x, this.bars[i].y,this.bars[i].h, y);
			 r.text(x, y, labels[i]).attr(txtattr);
		 }
		 return this;                     
	 };
	 
	 var _r = this.r;
	 
	 bar.hover(function () {	
		 if (this.label) {
			 this.label[0].stop();
			 this.label[0].attr({ r: 7.5 });
			 this.label[1].attr({ "font-weight": 800 });
		 }
		 this.flag = _r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
	 }, function () {
			
		 if (this.label) {
			 this.label[0].animate({ r: 5 }, 500, "bounce");
			 this.label[1].attr({ "font-weight": 400 });
		 }
		 this.flag.animate({opacity: 0}, 300, function () {this.remove();});
	 });
	 var leftTdWidth = 60;
	 this.tableElement.style.width = (minwidth + leftTdWidth) + "px";
	 this.tableElement.style.height = this.size[1] + "px";
	 this.tdElementLeft.style.width = (minwidth)+ "px";
	 this.tdElementLeft.style.height = (this.size[1])+ "px";
	 this.tdElementRight.style.width = leftTdWidth + "px";
	 this.panR.setSize(leftTdWidth,100);
	 this.r.setSize(minwidth,this.size[1]);
	 
	 vw._vmap.getView().setCenter([vw._vmap.getView().getCenter()[0],vw._vmap.getView().getCenter()[1]+0.0001]);
};

/**
 * @description  누적막대 그래프를 렌더링하여 제공하는 클래스.
 * @property	size : [w,h]  그래프의 크기. 최소한의 공간이 되지 않으면, 최소의 크기로 지정된다.
 */
vw.ol3.chart.StackedBar = function(size) {

	this.size = size;
			
	vw.ol3.chart.Chart.call(this);
			
};

vw.ol3.inherits(  vw.ol3.chart.StackedBar , vw.ol3.chart.Chart);


vw.ol3.chart.StackedBar.prototype.draw = function() {
	
	this._init();
	
	var width 			= this.size[0];
	var height 			= this.size[1];          

	  
	  if (this.values.length >= 1 && (typeof(this.values[0]) !='object') ) {
		  this.barcount = this.values.length;
	  }
	  else {
		  this.barcount = this.values[0].length;
	  }
	  width = this.barx + (this.barwidth*this.gutter*0.01) + ((this.barwidth + this.barwidth*this.gutter*0.01)*this.barcount);
			  
	  var _opts = {
			  colors				:	this.colorArr, 
			  label				:	this.labelArr,
			  gutter				:	this.gutter, 
			  barwidth 		: 	this.barwidth,
			  stacked			:	true,
			 legend				:	this.labelArr,
			 legendcolor	:	this.colorArr,
			 makelegend	:	this.isVisible,
			 tooltip				:	this.values,
			 legendpos		:	"east",
			 pannel 			: 	this.panR
	}
	  
	  var bar = this.r.barchart(this.barx, this.bary, width, height, this.values , _opts );
			  
	var minwidth = Math.max(bar.covers.getBBox().width,width);
	var minheight = Math.max(bar.covers.getBBox().height,height);
	 
	minwidth += 15;

	bar.customLabel = function (labels) {
		  labels = labels || [];
		  this.labels = r.set();
		  //console.log("this.bars[0].length",this.bars[0].length);
		  for (var i = 0; i < this.bars[0].length; i++) {
			  x = this.bars[0][i].x;
			  if ( i==0) {
				  y = Math.floor(this.bars[0][i].y) - 7;
			  }
			  //console.log(x, y);
			  r.text(x, y, labels[i]).attr(txtattr);
		  }
		  return this;                
	  };
  
	  var _r = this.r;
	 
					   
	 bar.hover(function () {		        
		 this.flag = _r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
	 }, function () {	        	
		 this.flag.animate({opacity: 0}, 300, function () {this.remove();});
	 });
	 var leftTdWidth = 60;
	 this.tableElement.style.width = (minwidth + leftTdWidth) + "px";
	 this.tableElement.style.height = this.size[1] + "px";
	 this.tdElementLeft.style.width = (minwidth)+ "px";
	 this.tdElementLeft.style.height = (this.size[1])+ "px";
	 this.tdElementRight.style.width = leftTdWidth + "px";
	 this.panR.setSize(leftTdWidth,100);
	 this.r.setSize(minwidth,this.size[1]);
	 
	 vw._vmap.getView().setCenter([vw._vmap.getView().getCenter()[0],vw._vmap.getView().getCenter()[1]+0.0001]);
};


vw.ol3.chart.Pie = function(radius) {
			
	this.radius = radius;
			
	vw.ol3.chart.Chart.call(this);
};

vw.ol3.inherits(  vw.ol3.chart.Pie, vw.ol3.chart.Chart);

vw.ol3.chart.Pie.prototype.draw = function() {
	
	this._init();		
	 var cx = this.radius + 15;
	 var cy = this.radius + 15;
	 var radius = this.radius;

	 var _opts = {
			stroke				:	"#FFF",
			strokewidth	:	1,
			 colors				:	this.colorArr, 
			 legend				:	this.labelArr,
			 legendcolor	:	this.colorArr,
			 makelegend	:	this.isVisible,
			 tooltip				:	this.values,
			 legendpos		:	"east",
			 pannel 			: 	this.panR
	 }
	
	 var pie = this.r.piechart(cx, cy, this.radius, this.values, _opts);   
	 
	 var minwidth = cx * 2 ;
	 var minheight = cy * 2 ;
	 
	 var _r = this.r;
	
	pie.hover(function () {
		this.sector.stop();
		this.sector.scale(1.1, 1.1, this.cx, this.cy);

		if (this.label) {
			this.label[0].stop();
			this.label[0].attr({ r: 7.5 });
			this.label[1].attr({ "font-weight": 800 });
		}
		this.flag = _r.subtitle(this.mx, this.my, this.tooltip ).insertBefore(this.cover);
	}, function () {
	   this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

		if (this.label) {
			this.label[0].animate({ r: 5 }, 500, "bounce");
			this.label[1].attr({ "font-weight": 400 });
		}
		if (this.flag != null) this.flag.animate({opacity: 0}, 300, function () {this.remove();});
	});
	var leftTdWidth = 60;
	this.tableElement.style.width = (minwidth + leftTdWidth) + "px";
	this.tableElement.style.height = cy + "px";
	this.tdElementLeft.style.width = (minwidth)+ "px";
	this.tdElementRight.style.width = leftTdWidth + "px";
	this.panR.setSize(leftTdWidth,100);
	this.r.setSize(minwidth,minheight);
	
	vw._vmap.getView().setCenter([vw._vmap.getView().getCenter()[0],vw._vmap.getView().getCenter()[1]+0.0001]);
};	


/**
 * @description 차트 범례
 */
vw.ol3.chart.ChartLegend = function() {
	
	// (D) false. 범례가 표현되는지 여부.
	this.visible = false;
	
	ol.Object.call(this);
};
	
vw.ol3.inherits(  vw.ol3.chart.ChartLegend , ol.Object );

vw.ol3.layer.Chart = function() {
	
	ol.layer.Vector.call(this);
	var _vectorSource = new ol.source.Vector({projection:"EPSG4326",wrapX:true});
	
	this.setSource(_vectorSource);
	
	// array<vw.chart.ChartStyle>  차트 Style Array
	this.styles = null;
	// vw.chart.ChartLegend  차트 범례
	this.legend = null;
	
};

vw.ol3.inherits(  vw.ol3.layer.Chart , ol.layer.Vector );

vw.ol3.chart.ChartGroup = function(map) {
	this.map = map;
	this.chartList = new ol.Collection();
	this.styles=null;		
	this.legend=null;
	
};

//vw.ol3.chart.ChartGroup.prototype.draw = function(site,pos) {
vw.ol3.chart.ChartGroup.prototype.draw = function() {
			
	if ( this.chartList != null ) {
		var cnt = this.chartList.getLength();
		for( var i=0; i < cnt ; i++ ) {
			var chart = this.chartList.item(i);
			chart.draw();
		}
	}
};
	

vw.MapControllerOption = {
		container : "vmap",
		mapMode: "2d-map",
		basemapType: vw.ol3.BasemapType.GRAPHIC,
		controlDensity:  vw.ol3.DensityType.BASIC,
		interactionDensity: vw.ol3.DensityType.BASIC,
		controlsAutoArrange: true,
		homePosition: vw.ol3.CameraPosition,
		initPosition: vw.ol3.CameraPosition
};

vw.MapController = function(_option) {
	
	this.option			=	( vw.ol3.CommonFunc._isDef(_option) ) ? _option : vw.MapControllerOption;
	this.mapMode	=	null;
	this.Map2D		=	null;				// 2D Map
	this.Map3D		=	null;				// 3D Map
	this.active_			=	null;			// 활성화된 map
	this.id2d 				= "map2d";			// 2d element id
	this.id3d 				= "map3d";			// 3d Element id
	this.emap				= null;			// 3d element Obj
	this.rmap				= null;			// 2d Element Obj
	this.tilt 				=	88.9;
	this.transCoordz = _option.initPosition.center;
	this.dist					=	null;
	this.zoom				= _option.initPosition.zoom;
	
	ol.Object.call(this);
	
	//console.log("MapController - ", this);
	//this.mapMode	=	( vw.ol3.CommonFunc._isDef(this.option.mapMode ) ) ? this.option.mapMode : "2d-map" ;
	var mode	=	( vw.ol3.CommonFunc._isDef(this.option.mapMode ) ) ? this.option.mapMode : "2d-map" ;
	
	this.setMode(mode);//this.mapMode);
	
	var _onMapModeChange = this.onMapModeChange;
	
	this.on( "change" , _onMapModeChange , this);
	//test
	if ( ! vw.ol3.CommonFunc._isDef( this.Map2D ) ) {
		this.initMap2D();
	}
	
	if(this.Map2D._permalMap == null) this.Map2D._controls._createPermalMap();	
};

vw.ol3.inherits(vw.MapController, ol.Object);

vw.MapController.prototype.onMapModeChange = function(oldValue,newValue) {
	this.active_ = newValue;
	// 카메라의 고도 , 높이
	// 디렉션(direction) 값의 설정은 2D와 위치연동을 위해 tilt는 88.9, heading은 0으로 초기화.
	//this.tilt = 88.9;
};

vw.MapController.prototype.setMode = function(mode) {
	if (this.mapMode == mode) return;
	this.mapMode = mode;
	
	//try{
		this.setXYZ();
		
		if ( this.mapMode == "2d-map") {
			if (vw.ol3.CommonFunc._isDef( this.Map3D ) ) {
				var syncPosition = new vw.CameraPosition(new vw.CoordZ(this.transCoordz[0], this.transCoordz[1], this.dist), new vw.Direction(0,88.9,0));
				this.Map3D.lookat.moveTo(syncPosition);
				var bSleep = !(this.tilt>=88.0 && this.tilt < 91);
				if (bSleep) vw.ol3.CommonFunc._sleep(1000);
			}
			vw.ol3.CommonFunc._makeinvisible(this.id3d, false);		    		  		
			vw.ol3.CommonFunc._makeinvisible(this.id2d, true);
			// Map2D가 null이면. 다시 생성.
			if ( ! vw.ol3.CommonFunc._isDef( this.Map2D ) ) {
				this.initMap2D();
			}
			// 좌표값 및 zoom을 변환하여 Map2D에 전달하고 출력한다.
			if ( this.zoom && this.transCoordz && vw.ol3.CommonFunc._isDef(this.Map2D) ) {
				this.transCoordz = ol.proj.transform(this.transCoordz, "EPSG:4326", "EPSG:900913");
				this.Map2D.getView().setCenter(this.transCoordz);
				this.Map2D.getView().setZoom(this.zoom); 			
				this.Map2D.updateSize();	
			}
		} else {
		// 3D 지도.
			vw.ol3.CommonFunc._makeinvisible(this.id3d, true);		    		  		
			vw.ol3.CommonFunc._makeinvisible(this.id2d, false);
			if ( ! vw.ol3.CommonFunc._isDef( this.Map3D ) ) {
				this.initMap3D();
			} else {		
				var syncPosition = new vw.CameraPosition(new vw.CoordZ(this.transCoordz[0], this.transCoordz[1], this.dist), new vw.Direction(0,88.9,0));
				this.Map3D.lookat.moveTo(syncPosition);
			}
		}	
	/*}catch(e) {
		alert("지도가 초기화되지 않았습니다. 다시 실행해주세요.\n" + e );
		this.Map2D = null;
		this.Map3D = null;
		this.emap = null;
		this.rmap = null;
	}*/
};

vw.MapController.prototype.setXYZ = function() {
	var coordinate;
	var projection; 
	var size ;
	var center;
			
	if ( this.mapMode == "2d-map") {
		// Map2D가 null이면. 다시 생성.				
		var centerCoord;
		if ( vw.ol3.CommonFunc._isDef(this.Map3D ) ) {
			this.tilt = this.Map3D.lookat.cameraObj.getTilt();
			this.dist = this.Map3D.lookat.cameraObj.getDistance(); //카메라 거리값
			this.zoom = this.Map3D.lookat.cameraObj.getMapZoomLevel();  //카메라 레벨
			center = this.Map3D.lookat.cameraObj.getCenterPoint(); //카메라위치 좌표					
			this.transCoordz = [ center.longitude, center.latitude];
			if ( this.zoom < 19 ) {
				this.zoom = this.zoom + 3;
			}
		}
	} else {
		// Map3D 생성.
		// Map2D가 null이면. 다시 생성.
		// 1. 2D 지도가 이미 초기화되어 있다면. view를 통해서 현재 좌표를  가져온다.
		if ( vw.ol3.CommonFunc._isDef(this.Map2D ) ) {
			coordinate = this.Map2D.getView().getCenter();
			projection = this.Map2D.getView().getProjection();
			this.transCoordz = ol.proj.toLonLat(coordinate , projection.code_);
			size = this.Map2D.getSize();
			var calExt = this.Map2D.getView().calculateExtent(size);
			this.dist = Math.abs(ol.extent.getHeight(calExt));
		} else {
			// 초기화 되지 않았다면, 디폴트 좌표를 설정하여 사용한다.
			this.transCoordz = [127.425, 38.196];
			this.dist =1500000;//1348;			// 카메라 높이.
		}				
	}
};

vw.ol3.MapOptions = {
	basemapType: vw.ol3.BasemapType.GRAPHIC,
	controlDensity:  vw.ol3.DensityType.BASIC,
	interactionDensity: vw.ol3.DensityType.BASIC,
	controlsAutoArrange: true,
	homePosition: vw.ol3.CameraPosition,
	initPosition: vw.ol3.CameraPosition
};

vw.MapController.prototype.initMap2D  = function() {
	var options = vw.ol3.CommonFunc._isDef(this.option) ? this.option : vw.ol3.MapOptions;
								  
	if (  vw.ol3.CommonFunc._isDef(this.option.container ) &&  this.option.container == '' )  {
		 alert("container가 지정되지 않았습니다.");
		 return false;
	}
	
	//2.2D지도 판넬 생성
	if ( this.rmap == null ) {
		var rootDiv = vw.ol3.CommonFunc._getElement(this.option.container);
		this.rmap = vw.ol3.CommonFunc._createElement('div');	
		vw.vworldIDs.id2d = this.id2d;
		this.rmap.setAttribute('id',this.id2d);					
		this.rmap.style.cssText = "display:inline-block;position:relative;width:100%;height:100%;border:0px;z-index:1;";						
		if(this.Map3D != null){
			this.rmap.style.display = 'none';	
			this.rmap.style.visibility = 'false';
		}
		vw.vworldIDs.idpanel = this.option.container;
		rootDiv.setAttribute('id',vw.vworldIDs.idpanel);
		rootDiv.appendChild(this.rmap);	
	}
	
	this.Map2D = new vw.ol3.Map( this.id2d ,  options);
};

vw.MapController.prototype.initMap3D = function() {			
	//1.3D지도 판넬 생성하기
	var rootDiv = vw.ol3.CommonFunc._getElement(this.option.container);
	this.emap = vw.ol3.CommonFunc._createElement('div');
	vw.vworldIDs.id3d = this.id3d;
	this.emap.setAttribute('id',this.id3d);			
	this.emap.style.cssText = "display:inline-block;position:relative;width:100%;height:100%;border:0px;z-index:-1";
	
	vw.vworldIDs.idpanel = this.option.container;
	rootDiv.setAttribute('id',vw.vworldIDs.idpanel);
	rootDiv.appendChild(this.emap);
	
	var opt = vw.BasicOptions;
	 
	opt.initPosition = new vw.CameraPosition(new vw.CoordZ(this.transCoordz[0], this.transCoordz[1], this.dist), new vw.Direction(0,88.9,0));
	this.Map3D = new vw.Map( this.id3d, opt);
};		
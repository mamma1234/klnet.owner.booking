import React,{useContext} from 'react';

import {observable,toJS} from 'mobx';

const store = observable({ 
	  sr:{},
	  sr_bookmark:[],
	  sr_confirm:[],
	  sr_size_type:[],
	  sr_pack_code:[],
	  sr_term_code:[],
	  sr_start_port_code:[],
	  sr_end_port_code:[],
	  //get Data

	  setSr(data) { console.log("data:",toJS(Object.assign(this.sr,data)))
		  this.sr = toJS(Object.assign(this.sr,data));
	  },
	  setSr_term_code(data) {
		  this.sr_term_code =toJS(data);
	  },
	  setSr_start_port_code(data) {
		  this.sr_start_port_code =toJS(data);
	  },
	  setSr_end_port_code(data) {
		  this.sr_end_port_code =toJS(data);
	  },
	  setSr_size_type(data) {
		  this.sr_size_type =toJS(data);
	  },
	  setSr_bookmark(data) {
		  this.sr_bookmark =toJS(data);
	  },
	  setSr_Confirm(data) {
		  this.sr_confirm =toJS(data);
	  },
	  setSr_pack_code(data) {
		  this.sr_pack_code =toJS(data);
	  },
	  
	  
	  
	  
});

const context = React.createContext(store);

export const useSrStore=()=> {
	return useContext(context);
}
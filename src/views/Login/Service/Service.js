import axios from 'axios';
import { userStore, timerStore } from 'store/userStore.js';
import {observer,useObserver} from 'mobx-react-lite';

export const auth = observer({
	getUser,
	getAuth,
	authHeader,
	setAuthHeader,
	logOut,
})



function  authHeader() {
	//console.log(">>>service getitem:",JSON.parse(localStorage.getItem('plismplus')));
	let token;
	if(localStorage.getItem('booking.plism.com1')) {
		token = JSON.parse(localStorage.getItem('booking.plism.com1')).token;
		console.log('authHeader tokent: ' ,token)
	}
	if(token) {
		console.log('authHeader tokent: ' ,token)
		return {'authorization':'Bearer '+token};
	} else {
		return null;
	}	
}

function  getUser() {
	let user=userStore.user;
	if(localStorage.getItem('booking.plism.com')) {
		user = JSON.parse(localStorage.getItem('booking.plism.com')).user;
	}
	if(user) {
		return user;
	} else {
		return userStore.logout;
	}	
}
function  getAuth() {
	let isAuth;
	if(localStorage.getItem('booking.plism.com')) {
		isAuth = JSON.parse(localStorage.getItem('booking.plism.com')).isAuth;
	}
	if(isAuth) {
		return isAuth;
	} else {
		return null;
	}	
}

function setAuthHeader(user) {
	//console.log("json data:",JSON.stringify(user));
	window.localStorage.setItem('booking.plism.com1',JSON.stringify(user));
}


function logOut() {
	window.localStorage.removeItem('booking.plism.com');
	axios.post("/auth/logout" )
		    .then(res => {
		        if (res.data.message){
		        	alert(res.data.message);
		        }
		    })
		    .catch(err => {
		        console.log(err);
		    })
}


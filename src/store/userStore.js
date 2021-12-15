import {makeAutoObservable, observable, computed, action, autorun,configure, flow,flowResult} from "mobx"
import axios from 'axios'
configure({enforceActions:'never'});


let timer;


function countdown(e) {
    let expTime = e.exp;
    // console.log(expTime)
    let currentTime = Math.floor(Date.now() / 1000)
    let leftTime = expTime - currentTime - 60;
    if (timerStore.autoRenew && leftTime < 1) {
        console.log('verifyUserCall', leftTime)
        userStore.verifyUser()
        clearInterval(timer);
    } else if (leftTime < 1) {        
        console.log('leftTime ')
        userStore.logout();
        clearInterval(timer);
          return
    }
    let hours = Math.floor(leftTime / 3600 % 24)
    let minutes = Math.floor(leftTime / 60 % 60)
    let seconds = Math.floor(leftTime % 60)
    if (expTime) {
        timerStore.hoursSpan = (hours < 10? hours < 1? '00': `0${hours}`: hours)
        timerStore.minutesSpan = (minutes < 10? minutes < 1? '00': `0${minutes}`: minutes)
        timerStore.secondsSpan = (seconds < 10? seconds < 1? '00': `0${seconds}`: seconds)
    }
    timerStore.timer = ` ${timerStore.hoursSpan}:${timerStore.minutesSpan}:${timerStore.secondsSpan} `
}



class UserStore {
    accessToken = window.localStorage.getItem('LocalUser')?JSON.parse(window.localStorage.getItem('LocalUser')).accessToken : null;
    user =  window.localStorage.getItem('LocalUser')?JSON.parse(window.localStorage.getItem('LocalUser')) :null
    // isAuth = window.localStorage.getItem('booking.plism.com')?JSON.parse(window.localStorage.getItem('booking.plism.com')).isAuth :false
    loading = true;
    admin= window.localStorage.getItem('admin')?JSON.parse(window.localStorage.getItem('admin')) :false
    constructor() {
        makeAutoObservable(this, {
            accessToken: observable,
            user: observable,
            // isAuth:observable,
            loading:observable,
            admin:observable,
            setting: action,
            logout: action,
            sessionIn:action,
            sessionOut:action,
            verifyUser:flow,
            getUser:computed,
            getToken:computed,
            // getIsAuth:computed,
        },{autoBind:true})
    }

    logout() {
        if(!userStore.admin){
        axios
            .post("/auth/logout")
            .then(res => {
                userStore.user = null;
                // userStore.isAuth=false
                window.localStorage.clear();
                clearInterval(timer);
            })
            .catch(err => {
                console.log(err);
            });
        }else{
            userStore.sessionOut()
        }
    }
    *verifyUser () {
        try{
            // console.log('verify IN>>>>  userStore.loading : ', userStore.loading,', userStore.user : ', userStore.user)
            const res  = yield  axios.get(`/auth/verify?timestamp=${new Date().getTime()}`)
        if (res.data) {
            if(userStore.accessToken==null||userStore.accessToken !== res.data.user.accessToken){
                // console.log('user 비교 다름>>', res.data.user.accessToken,'userStore.accessToken ')
                userStore.user = res.data.user;
                // userStore.isAuth=res.data.isAuth;
                userStore.accessToken= res.data.user.accessToken;
                // window.localStorage.setItem('user', JSON.stringify(res.data.user));
                // window.localStorage.setItem('accessToken', JSON.stringify(res.data.user.accessToken));
                window.localStorage.setItem('LocalUser',JSON.stringify(res.data.user))
                timerStore.getTimer(userStore.getUser)
                // auth.setAuthHeader(res.data);


            }else if(userStore.accessToken!==null&&userStore.accessToken == res.data.user.accessToken){
            // console.log('user 비교 같>>', res.data)
            timerStore.getTimer(userStore.getUser)
        }

        }else {
            if(!userStore.loading){
            console.log('verify logout>>')
            userStore.logout()
            // userStore.loading=true
            }
        }
    }catch(e){
      console.log(e)
      userStore.logout()
      userStore.user=null
    }
      userStore.loading=false
    }
    sessionIn(){
        userStore.admin= userStore.user
        window.location.href = "/newhome";
        window.localStorage.setItem('admin',window.localStorage.getItem('LocalUser'))
    }
    sessionOut(){
        console.log('out')
        axios
            .post("/auth/logout",{sessionOut:'admin'})
            .then(res => {
                userStore.user = userStore.admin;
                userStore.admin=false;
                window.localStorage.clear();
                clearInterval(timer);
                window.location.href = "/newhome";
            })
            .catch(err => {
                console.log(err);
            });
    }
    get getUser() {
        return this.user
    }
    set setUser(user) {
        this.user = user;
        console.log('>>setUser',user)
        // window.localStorage.setItem('user', JSON.stringify(this.user));
    }

    // set setToken(token) {
    //     this.accessToken = token;
    //     // window.localStorage.setItem('accessToken', this.accessToken);
    // }
    // get getToken() {
    //     return this.accessToken;
    // }

    // get getIsAuth(){
    //   return this.isAuth
    // }

    get getLoading(){
        return this.loading
    }

}


class TimerStore {
    user = userStore.getUser
    hoursSpan= '00'
    minutesSpan= '00'
    secondsSpan= '00'
    autoRenew= JSON.parse(window.localStorage.getItem('autoRenew')) || true
    timer= ' 00:00:00 '

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            hoursSpan: observable,
            minutesSpan: observable,
            secondsSpan: observable,
            autoRenew: observable,
            timer:observable,
            getTimer:action,
            getAutoRenew:computed
        })
    }

    get getAutoRenew() {
        return this.autoRenew;
    }
    set setAutoRenew(e) {
        //    console.log('setAutoLogin',e )
        window.localStorage.setItem('autoRenew', JSON.stringify(e))
        this.autoRenew = e
    }
    getTimer(e){
        // console.log('userStore Timer>>',e)
        if (e) {
            timer = setInterval(action(countdown), 1000, e)
        } else {
            clearInterval(timer);
        }
    }
}

const userStore =  new UserStore();
const timerStore =  new TimerStore();

autorun(async() => {
    userStore.verifyUser()
})

export {userStore, timerStore};

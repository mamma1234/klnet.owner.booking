import { observable, action, makeObservable, computed } from 'mobx';

class BookingStore {

 
  booking={};
  cargo={};
  goodsRelationList=[];
  containerList=[];
  
  constructor() {
    makeObservable(this,{
      booking: observable,
      cargo: observable,
      goodsRelationList: observable,
      containerList: observable,
      setBooking: action,
      setCargo: action,
      setGoodsRelationList: action,
      setContainerList: action,
      isTerm: computed,
      isBookingNo: computed,
      isTransSelfYn: computed,
      isSchEtd: computed,
      isVesselPolPod: computed,
      isVessel: computed,
      isCargoType: computed,
    })
  }
 
  setBooking = (booking) => {
    // console.log("MOBX ", booking)
    this.booking = booking;
  }
  setCargo = (cargo) => {
    // console.log("CARGO ", cargo.cargo_type)
    this.cargo = cargo;
  }
  setGoodsRelationList = (goodsList) => {
    // console.log("goodsList ", goodsList)
    this.goodsRelationList = goodsList;
  }
  setContainerList = (containerList) => {
    // console.log("conatiner List ", containerList);
    this.containerList = containerList;
  }

  // 컨테이너의 cfs 항목과 cy 항목 전환을 위한 computed
  get isTerm(){
    return this.booking.trans_service_code;
  }

  // 부킹번호 존재 여부 확인 부킹번호가 없으면 부킹 생성하도록 유도
  get isBookingNo(){
    return this.booking.bkg_no;
  }

  // 자가운송인 경우 DOOR 지 입력 항목 비활성화
  get isTransSelfYn() {
    // console.log("trans_self_yn: ", this.booking.trans_self_yn)
    return this.booking.trans_self_yn
  }

  // 스케줄 eta 변경되면 pickup cy date 수정해준다.
  get isSchEtd() {
    return this.booking.sch_etd
  }

  get isVesselPolPod() {
    return {
      sch_vessel_name: this.booking.sch_vessel_name,
      sch_pol: this.booking.sch_pol,
      sch_pod: this.booking.sch_pod,
    }
  }

  get isVessel() {
    return this.booking.sch_vessel_name;
  }

  // 위험물 여부
  get isCargoType() {
    return this.cargo.cargo_type;
  }
}

const bookingStore = new BookingStore();

export default bookingStore;
export { BookingStore };
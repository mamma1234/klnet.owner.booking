import React,{ useState, useEffect } from "react";

// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { 
    Chip,
    Card,
    Badge
} from "@material-ui/core";
import {
    Save as SaveIcon,
    Send as SendIcon,
    LocalShippingOutlined as PickUpIcon,
    LocalShipping as DropOffIcon,
    ListAltSharp as BLIcon,
    AssignmentOutlined as SRIcon,
    FilterNoneRounded as MfcsIcon,
    MoreHoriz,
    Block,
    Check
} from "@material-ui/icons";

export default function DetailRow(props) {
    const [value] = useState(props.value!==null?props.value:[]);
    useEffect(()=>{
        console.log(props);
    },[props])

    return (
        <GridContainer>
            <GridItem xs={12} md={12} sm={12}>
                <Card>
                    <GridItem className="steps" style={{width:'100%'}}>
                        <div style={{maxWidth:'12.5%'}} className={value.p.status1===null?"step":"next"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    <SaveIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip variant="outlined" label="BOOKING SAVE" size="small" color="default"/>
                                    </GridContainer>
                                    {value.p.status1!==null && <>
                                    <GridContainer>
                                        <span>{value.p.bkg_no}</span>
                                    </GridContainer>
                                    <GridContainer>
                                        <span>{value.p.status1}</span>
                                    </GridContainer>
                                    </>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.p.status2===null?"step":"next"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    <SendIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Badge color="secondary" badgeContent={Number(value.p.status_cnt2)} {...{children:<Chip variant="outlined" label="BOOKING SEND" size="small" color="default"/>}}/>
                                    </GridContainer>
                                    {value.p.status2!==null && <>
                                    <GridContainer>
                                        <span>{value.p.bkg_no}</span>
                                    </GridContainer>
                                    <GridContainer>
                                        <span>{value.p.status2}</span>
                                    </GridContainer>
                                    </>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.p.status3===null?"step":"next"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    {value.p.status_name3===null?(<MoreHoriz style={{fontSize:'35'}}/>):
                                    value.p.status_name3==="Cancel"?(<Block style={{fontSize:'35', color:'red'}}/>):
                                    value.p.status_name3==="Reject"?(<Block style={{fontSize:'35', color:'red'}}/>):
                                    value.p.status_name3==="Confirm"?(<Check style={{fontSize:'35', color:'green'}}/>):(null)}
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip 
                                            variant="outlined"
                                            label={value.p.status_name3===null?"WAITING CONFIRM":
                                                    value.p.status_name3==="Cancel"?"BOOKING CANCEL":
                                                    value.p.status_name3==="Reject"?"BOOKING REJECT":
                                                    value.p.status_name3==="Confirm"?"BOOKING CONFIRM":""} size="small" color="default"/>
                                    </GridContainer>
                                    {value.p.res_bkg_no!==null &&
                                    <GridContainer>
                                        <span>{value.p.res_bkg_no}</span>
                                    </GridContainer>}
                                    {value.p.status3!==null &&
                                    <GridContainer>
                                        <span>{value.p.status3}</span>
                                    </GridContainer>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.p.pick_up_time?"next":"step"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    <PickUpIcon style={{fontSize:'30', transform:'rotateY(180deg)'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip variant="outlined" label="PICK UP" size="small" color="default"/>
                                    </GridContainer>
                                    {value.p.pick_up_time_f!==null &&
                                    <GridContainer>
                                        <span>{value.p.pick_up_time_f}</span>
                                    </GridContainer>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.p.drop_off_time?"next":"step"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    <DropOffIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip variant="outlined" label="DROP OFF" size="small" color="default"/>
                                    </GridContainer>
                                    {value.p.drop_off_time_f!==null &&
                                    <GridContainer>
                                        <span>{value.p.drop_off_time_f}</span>
                                    </GridContainer>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.p.status4===null?"step":"next"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    <SRIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip variant="outlined" label="SR" size="small" color="default"/>
                                    </GridContainer>
                                    {value.p.sr_no!==null &&
                                    <GridContainer>
                                        <span>{value.p.sr_no}</span>
                                    </GridContainer>}
                                    {value.p.status4!==null &&
                                    <GridContainer>
                                        <span>{value.p.status4}</span>
                                    </GridContainer>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.p.status5===null?"step":"next"}>
                            <GridContainer>
                                <GridItem xs={3} md={3} sm={3}>
                                    <BLIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip variant="outlined" label="BL" size="small" color="default"/>
                                    </GridContainer>
                                    {value.p.mbl_no!==null &&
                                    <GridContainer>
                                        <span>{value.p.mbl_no}</span>
                                    </GridContainer>}
                                    {value.p.status5!==null &&
                                    <GridContainer>
                                        <span>{value.p.status5}</span>
                                    </GridContainer>}
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className={value.o.length === 0?"laststep":"lastnext"}>
                            <GridContainer className="text-center">
                                <GridItem xs={3} md={3} sm={3}>
                                    <MfcsIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={9} md={9} sm={9}>
                                    <GridContainer>
                                        <Chip variant="outlined" label="MFCS" size="small" color="default"/>
                                    </GridContainer>
                                    {(value.o.length > 0 ) &&
                                    <GridContainer>
                                        <span>{value.o[0].DPT_DATE_X?value.o[0].DPT_DATE_X:""}</span>
                                    </GridContainer>}
                                    {(value.o.length > 0 ) &&
                                    <GridContainer>
                                        <span>{value.o[0].STATUS_NAME?value.o[0].STATUS_NAME:""}</span>
                                    </GridContainer>}
                                </GridItem>
                            </GridContainer>
                        </div>
                    </GridItem>
                </Card>
            </GridItem>
        </GridContainer>
    )
}
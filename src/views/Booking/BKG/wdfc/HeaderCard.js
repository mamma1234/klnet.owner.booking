import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch,FormControl,FormControlLabel, InputAdornment } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
//import {Autocomplete} from "@material-ui/lab";
import moment from 'moment';
import BoookingBookmarkRelation from "./BookingBookmarkRelation";
import {observer} from 'mobx-react-lite';

const styles = makeStyles((theme) => ({
  booking_title: {boxShadow:'unset'},
}));

const HeaderCard =observer(({bookingStore, ...props})=> { 

    const classes = styles();
    const [newBkgNo, setNewBkgNo] = useState(null);
    const [autoSelf, setAutoSelf] = useState(true);
    const {otherBookmarkList, scheduleBookmarkList, lineBookmarkList
        , shipperBookmarkList, consigneeBookmarkList, forwarderBookmarkList
        , transportBookmarkList, documentBookmarkList, cargoBookmarkList, containerBookmarkList} = props;

    useEffect(()=>{
        setNewBkgNo(props.newBkgNo);
    },[props.newBkgNo]);

    useEffect(()=>{
        setAutoSelf(props.autoSelf);
    },[props.autoSelf]);

  return (
    <GridContainer justify="space-between">
        <GridItem lg={6} md={6} sm={6} xs={12}>
            <GridContainer>
                <GridItem lg={6} md={6} sm={6} xs={12}>
                {autoSelf?<CustomInput
                    labelText="Booking Number *"
                    id="bkg_no_auto"
                    formControlProps={{
                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                    }}
                    labelProps={{style:{top:'0'}}}
                    inputProps={{
                        value:bookingStore.booking.bkg_no?bookingStore.booking.bkg_no:'',
                        disabled:true 
                    }}
                    />:
                <CustomInput
                    labelText="Booking Number *"
                    id="bkg_no"
                    formControlProps={{
                        fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                    }}
                    labelProps={{style:{top:'0'}}}
                        inputProps={{
                        value:newBkgNo?newBkgNo:'',
                        disabled:false,
                        onChange: (e) => setNewBkgNo(e.target.value.toUpperCase()),
                        onBlur:(e)=>props.fncNewBkgNo(newBkgNo),
                        endAdornment:
                        <InputAdornment position="end">
                            <Button color="info" size="sm" onClick={(e)=>props.fncDupCheckBkgNo(e)}>중복확인</Button>
                        </InputAdornment>,
                    }}
                    />}
                    <FormControlLabel
                        control={
                        <Switch
                            checked={autoSelf}
                            onChange={event => setAutoSelf(!autoSelf)}
                            value="checkedA"
                            classes={{
                            switchBase: classes.switchBase,
                            checked: classes.switchChecked,
                            thumb: classes.switchIcon,
                            track: classes.switchBar
                            }}
                        />
                        }
                        classes={{
                        label: classes.label
                        }}
                        style={{marginLeft:'0',height:'28px'}}
                        label="Auto Booking Number"
                    />
                </GridItem>
                <GridItem lg={3} md={3} sm={3} xs={12}>
                <FormControl fullWidth style={{marginBottom:'10px'}}>
                    <CalendarBox
                        labelText ="Booking Date"
                        id="bkg_date"
                        format="yyyy-MM-dd"
                        setValue={bookingStore.booking.bkg_date?moment(bookingStore.booking.bkg_date).format('YYYY-MM-DD'):new Date()}
                        autoOk
                        //onChangeValue={date => setToDate(date)}
                        disabled={true}
                        formControlProps={{fullWidth: true}} 
                    />
                </FormControl>
                </GridItem>
                <GridItem lg={3} md={3} sm={3} xs={12}>
                    <CustomInput
                        labelText="Status"
                        id="status"
                        formControlProps={{
                            fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
                        }}
                        labelProps={{style:{top:'0'}}}
                        inputProps={{
                            value:bookingStore.booking.status_cus_kr?bookingStore.booking.status_cus_kr:'',
                            disabled:true
                        }}
                    />
                </GridItem>
            </GridContainer>
        </GridItem>   
        <GridItem lg={4} md={4} sm={4} xs={12} >
            <FormControl fullWidth style={{textAlignLast:'right'}}>
                <BoookingBookmarkRelation
                    booking={bookingStore.booking}
                    otherBookmarkList={otherBookmarkList}
                    scheduleBookmarkList={scheduleBookmarkList}
                    shipperBookmarkList={shipperBookmarkList}
                    lineBookmarkList={lineBookmarkList}
                    consigneeBookmarkList={consigneeBookmarkList}
                    forwarderBookmarkList={forwarderBookmarkList}
                    transportBookmarkList={transportBookmarkList}
                    documentBookmarkList={documentBookmarkList}
                    cargoBookmarkList={cargoBookmarkList}
                    containerBookmarkList={containerBookmarkList}
                    fncBookmarkParent={props.fncBookmarkParent}
                    {...props}
                />
            </FormControl>
        </GridItem>
    </GridContainer>
  );
} );

export default HeaderCard;
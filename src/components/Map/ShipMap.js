import { makeStyles } from '@material-ui/core/styles';
import React,{ useState, useEffect} from "react";
// @material-ui/core components
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import HighlightOff from '@material-ui/icons/HighlightOff';
const useStyles = makeStyles(theme => ({
    root: {
      width: '1300px',
      height: '640px'
    },
  }));
  
export default function ShipMap(props) {
    console.log(props)
    const classes = useStyles();
    const [linkUrl,setLinkUrl] = useState("")
    useEffect(() => {
        if(!props.parameter.allDay) {
          // let url = "https://svmp.seavantage.com/#/tracking/cargo?authToken=20f857b8-b05c-453a-855d-db1553d2518e&routing=destination&schedule=";
          let url = "https://svmp.seavantage.com/#/tracking/ship?authToken=20f857b8-b05c-453a-855d-db1553d2518e&routing=destination&"
          let appendUrl = "";
          axios.post("/loc/getTsTracking",{reqseq:props.parameter.req_seq, carrierCode:props.parameter.carrier_code})
          .then(res => {
            // if(res.data.length !== 0 ) {
              
            //   let i = 0;
            //   let i = 0;
            //   res.data.forEach(element =>{
            //     i = i+1;
            //     appendUrl += '{"shipName":'
            //     appendUrl += '"';
            //     appendUrl += element.vessel;
            //     appendUrl += '",';
            //     appendUrl += '"pol":';
            //     appendUrl += '"';
            //     appendUrl += element.pol;
            //     appendUrl += '",';
            //     appendUrl += '"pod":';
            //     appendUrl += '"'+element.pod;
            //     appendUrl += '"}';
            //     if (res.data.length !== i) {
            //       appendUrl += ',';
            //     }
            //   })
            //   appendUrl += ']'
            // }else {
            //   appendUrl += '{"shipName":'
            //   appendUrl += '"';
            //   appendUrl += props.parameter.vsl_name;
            //   appendUrl += '",';
            //   appendUrl += '"pol":';
            //   appendUrl += '"';
            //   appendUrl += props.parameter.pol_cd;
            //   appendUrl += '",';
            //   appendUrl += '"pod":';
            //   appendUrl += '"'+props.parameter.pod_cd;
            //   appendUrl += '"}]';
            //   }
            if(res.data.length !== 0) {
              let i = 0;
              res.data.forEach(element =>{
                i = i+1;
                // appendUrl += 'shipName='
                appendUrl += 'imoNo='
                // appendUrl += encodeURIComponent(element.vessel);
                appendUrl += encodeURIComponent(element.imo);
                if (res.data.length !== i) {
                  appendUrl += '&';
                }
              })
            }else {
              // appendUrl += "shipName="
              // appendUrl += props.parameter.vsl_name;
              appendUrl += "imoNo="
              appendUrl += props.parameter.imo;
            }
            }).then(res => {
              setLinkUrl(url+appendUrl);
              console.log(url+appendUrl);
            }
            
          )
        
    } else {
	    let sch_url = "https://svmp.seavantage.com/#/tracking/ship?authToken=20f857b8-b05c-453a-855d-db1553d2518e&routing=destination";
      let appendUrl =  "";
          // appendUrl +='&shipName=';
          appendUrl +='&imoNo=';
          // appendUrl += encodeURIComponent(props.parameter.vsl_name);
          appendUrl += encodeURIComponent(props.parameter.imo);
          appendUrl += '&startDate=';
          appendUrl += props.parameter.map_start_day;
          appendUrl += '&destination=';
          appendUrl += props.parameter.start_port;
      setTimeout(function() {
          console.log('URL :' , sch_url+appendUrl);
          setLinkUrl(sch_url+appendUrl);
      },2000);
    }

        
    return () => {
        console.log('cleanup');
        };
    },[]);
    
  
return (
    <div className={classes.root}>
    <HighlightOff onClick={()=>props.onClose()} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>
      <Card className={classes.cardStyle}>
          <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
                <CardIcon color="info" style={{height:'52px'}}>
                  <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
                </CardIcon>
          </CardHeader>
            <CardBody style={{paddingBottom:'2px'}}>
                  <Grid item xs={12} sm={12} md={12}>
                      <form target="maplink"> 
                          <iframe name="maplink" src={linkUrl} title={"tackingFrame"} width="100%" height="600" display='block' border='none' position="absolute" frameBorder="0" scrolling="auto" allowFullScreen></iframe>
                      </form>
                  </Grid>
                </CardBody>
          </Card> 
    </div>
  );
}
  
  
  
  
  
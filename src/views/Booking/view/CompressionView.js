import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { 
    CircularProgress,
    Chip,
    Card,
    Badge,
    Box
} from "@material-ui/core";
import {
    Save as SaveIcon,
    Send as SendIcon,
    AssignmentTurnedIn as ConfirmIcon,
    ListAltSharp as BLIcon,
    AssignmentOutlined as SRIcon,
    MoreHoriz,
    Block,
    Check,
} from "@material-ui/icons";
const styles = {
    gridCard:{
        width:'100%',
        padding:'15px',
    }
};

const useStyles = makeStyles(styles);
export default function CompressionView(props) {
    const classes = useStyles();
    const [data, setData] = useState(props.data);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [num, setNum] = useState(1);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    useEffect(() => {
      setData(props.data);
      setNum(props.num);
      setSuccess(props.success);
      setLoading(props.loading);
      return () => {
        
      };
    }, [props]);

    return(
        <div>
            <GridContainer>
                <div className="steps" style={{width:'100%'}}>
                    <div style={{maxWidth:'20%'}} className="laststep">
                        <GridContainer>
                            <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                <SaveIcon style={{fontSize:'35'}}/>
                            </GridItem>
                            <GridItem xs={8} md={8} sm={8}>
                                <GridContainer>
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        <Chip variant="outlined" label="SAVE" size="small" color="default"/>
                                    </GridItem>    
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                    {data.length!==0 &&
                                        <span style={styles.progressText}>{data[0].p.save_count_sum}/{data[0].p.total_count}</span>}
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <div style={{maxWidth:'20%'}} className="laststep">
                        <GridContainer>
                            <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                <SendIcon style={{fontSize:'35'}}/>
                            </GridItem>
                            <GridItem xs={8} md={8} sm={8}>
                                <GridContainer>
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        <Chip variant="outlined" label="SEND" size="small" color="default"/>
                                    </GridItem>    
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                    {data.length!==0 &&
                                        <span style={styles.progressText}>{data[0].p.send_count_sum}/{data[0].p.total_count}</span>}
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <div style={{maxWidth:'20%'}} className="laststep">
                        <GridContainer>
                            <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                <ConfirmIcon style={{fontSize:'35'}}/>
                            </GridItem>
                            <GridItem xs={8} md={8} sm={8}>
                                <GridContainer>
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        <Chip variant="outlined" label="CONFIRM" size="small" color="default"/>
                                    </GridItem>    
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                    {data.length!==0 &&
                                        <span style={styles.progressText}>{data[0].p.confirm_count_sum}/{data[0].p.total_count}</span>}
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <div style={{maxWidth:'20%'}} className="laststep">
                        <GridContainer>
                            <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                <SRIcon style={{fontSize:'35'}}/>
                            </GridItem>
                            <GridItem xs={8} md={8} sm={8}>
                                <GridContainer>
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        <Chip variant="outlined" label="SR" size="small" color="default"/>
                                    </GridItem>    
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        {data.length!==0 &&
                                            <span style={styles.progressText}>{data[0].p.sr_count_sum}/{data[0].p.total_count}</span>}
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <div style={{maxWidth:'20%'}} className="laststep">
                        <GridContainer>
                            <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                <BLIcon style={{fontSize:'35'}}/>
                            </GridItem>
                            <GridItem xs={8} md={8} sm={8}>
                                <GridContainer>
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        <Chip variant="outlined" label="BL" size="small" color="default"/>
                                    </GridItem>    
                                    <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                        {data.length!==0 &&
                                            <span style={styles.progressText}>{data[0].p.bl_count}/{data[0].p.total_count}</span>}
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </GridContainer>
            {data.length > 0 && <>
                {data.map((value,index) => {
                    return(
                        <GridContainer key={index}>
                            <GridItem xs={12} md={12} sm={12}>
                                <Card className={classes.gridCard}>
                                    <GridItem className="steps" style={{width:'100%'}}>
                                        <div style={{maxWidth:'20%'}} className={value.p.status1===null?"step":"next"}>
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
                                                    </GridContainer></>}
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                        <div style={{maxWidth:'20%'}} className={value.p.status2===null?"step":"next"}>
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
                                                    </GridContainer></>}
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                        <div style={{maxWidth:'20%'}} className={value.p.status3===null?"step":"next"}>
                                            <GridContainer>
                                                <GridItem xs={3} md={3} sm={3}>
                                                    {value.p.status_name3===null?(<MoreHoriz style={{fontSize:'35'}}/>):
                                                     value.p.status_name3==="Cancel"?(<Block style={{fontSize:'35', color:'red'}}/>):
                                                     value.p.status_name3==="Reject"?(<Block style={{fontSize:'35', color:'red'}}/>):
                                                     value.p.status_name3==="Confirm"?(<Check style={{fontSize:'35', color:'green'}}/>):(null)}
                                                </GridItem>
                                                <GridItem xs={9} md={9} sm={9}>
                                                    <GridContainer>
                                                        <Chip variant="outlined"
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
                                        <div style={{maxWidth:'20%'}} className={value.p.status4===null?"step":"next"}>
                                            <GridContainer>
                                                <GridItem xs={3} md={3} sm={3}>
                                                    <SRIcon style={{fontSize:'35'}}/>
                                                </GridItem>
                                                <GridItem xs={9} md={9} sm={9}>
                                                    <GridContainer>
                                                        <Badge color="secondary" badgeContent={Number(value.p.status_cnt4)} {...{children:<Chip variant="outlined" label="SR" size="small" color="default"/>}}/>
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
                                        <div style={{maxWidth:'20%'}} className={value.p.status5===null?"laststep nowrap":"lastnext nowrap"}>
                                            <GridContainer>
                                                <GridItem xs={3} md={3} sm={3}>
                                                    {value.p.status5===null?(<MoreHoriz style={{fontSize:'35'}}/>):(<Check style={{fontSize:'35', color:'green'}}/>)}
                                                </GridItem>
                                                <GridItem xs={9} md={9} sm={9}>
                                                    <GridContainer>
                                                        <Chip variant="outlined" label="BL" size="small" color="default"/>
                                                    </GridContainer>
                                                    {value.p.mrn!==null &&
                                                    <GridContainer>
                                                        <span>{value.p.mrn}</span>
                                                    </GridContainer>}
                                                    {value.p.status5!==null &&
                                                    <GridContainer>
                                                        <span>{value.p.status5}</span>
                                                    </GridContainer>}
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                    </GridItem>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    )
                })}
            </>}
            {data.length >= 10 ? Number(data[0].p.tot_page) !== num ? (
             <Box style={{textAlignLast:'center'}}>
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => props.more()}
                    disabled={loading}
                    endIcon={loading && <CircularProgress size={24} />}
                    className= {buttonClassname}>
                    {loading===false?`MORE( ${num} / ${data[0].p.tot_page} )`:""}
                </Button>
            </Box>): null : null }
        </div>
    )
}
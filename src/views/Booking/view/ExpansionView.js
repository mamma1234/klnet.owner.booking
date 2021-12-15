import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import clsx from 'clsx';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { 
    CircularProgress,
    Chip,
    Box
} from "@material-ui/core";
import DetailRow from 'views/Booking/view/DetailRow.js';

import {
    Save as SaveIcon,
    Send as SendIcon,
    AssignmentTurnedIn as ConfirmIcon,
    LocalShippingOutlined as PickUpIcon,
    LocalShipping as DropOffIcon,
    ListAltSharp as BLIcon,
    AssignmentOutlined as SRIcon,
    FilterNoneRounded as MfcsIcon,
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
    const [mfcsSum, setmfCsSum] = useState(props.sum);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [num, setNum] = useState(1);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    useEffect(() => {
      setData(props.data);
      setmfCsSum(props.sum);
      setNum(props.num);
      setSuccess(props.success);
      setLoading(props.loading);
      return () => {
        
      };
    }, [props]);
    
    return(
        <div>
            <GridContainer>
                <GridItem xs={12} md={12} sm={12}>
                    <div className="steps" style={{width:'100%'}}>
                        <div style={{maxWidth:'12.5%'}} className="laststep">
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
                        <div style={{maxWidth:'12.5%'}} className="laststep">
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
                        <div style={{maxWidth:'12.5%'}} className="laststep">
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
                     
                        <div style={{maxWidth:'12.5%'}} className="laststep">
                            <GridContainer>
                                <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                    <PickUpIcon style={{fontSize:'30', transform:'rotateY(180deg)'}}/>
                                </GridItem>
                                <GridItem xs={8} md={8} sm={8}>
                                    <GridContainer>
                                        <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                            <Chip variant="outlined" label="PICK UP" size="small" color="default"/>
                                        </GridItem>    
                                        <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                            {data.length!==0 &&
                                            <span style={styles.progressText}>{data[0].p.pick_up_count}/{data[0].p.total_count}</span>}
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className="laststep">
                            <GridContainer>
                                <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                    <DropOffIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={8} md={8} sm={8}>
                                    <GridContainer>
                                        <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                            <Chip variant="outlined" label="DROP OFF" size="small" color="default"/>
                                        </GridItem>    
                                        <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                            {data.length!==0 &&
                                            <span style={styles.progressText}>{data[0].p.drop_off_count}/{data[0].p.total_count}</span>}
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </div>
                        <div style={{maxWidth:'12.5%'}} className="laststep">
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
                        <div style={{maxWidth:'12.5%'}} className="laststep">
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
                        <div style={{maxWidth:'12.5%'}} className="laststep">
                            <GridContainer>
                                <GridItem xs={4} md={4} sm={4} style={{textAlign:'center'}}>
                                    <MfcsIcon style={{fontSize:'35'}}/>
                                </GridItem>
                                <GridItem xs={8} md={8} sm={8}>
                                    <GridContainer>
                                        <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                            <Chip variant="outlined" label="MFCS" size="small" color="default"/>
                                        </GridItem>    
                                        <GridItem xs={12} md={12} sm={12} style={{textAlign:'center'}}>
                                            {data.length!==0 &&
                                            <span style={styles.progressText}>{mfcsSum}/{data[0].p.total_count}</span>}
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </GridItem>
            </GridContainer>
            {data.length > 0 && <>
                {data.map((value,index) => {
                    return(
                        <DetailRow key={index} value={value} index={index}/>
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
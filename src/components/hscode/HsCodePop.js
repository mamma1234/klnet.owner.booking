import React, { PropTypes, useEffect, useState } from 'react';
import { Button, IconButton, Paper, TableBody, TableCell,
GridList, GridListTile, Divider, Dialog, DialogTitle, DialogContent, Slide,
TableContainer, Table, TableHead, TableRow } from '@material-ui/core';
import { Search, ArrowBack, Close, ImportContacts} from "@material-ui/icons";
import GridItem from "components/Grid/GridItem.js";
import axios from 'axios';
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
     
    modalCloseButton:{
        float:'right',
        padding:'0',
        minWidth:'21px',
        heught:'21px'
      },
      modalTitle:{
        padding:'15px 24px 0 24px',
        textAlign:'center'
      },
      modal:{
        maxWidth:'80%'
      },
    tableLine:{
        height:'340px',overflow:'auto',borderTop:'2px solid #00b1k7', borderBottom:'2px solid #00b1b7',marginBottom:'10px'
    },
    tablecell:{
        paddingTop:'5px',paddingBottom:'5px',textAlign:'start'
    },
    tableHeadercell:{
        paddingTop:'10px',paddingBottom:'10px',textAlign:'start'
    },
    tilePaper: {
        width :'100%', height: '400px', paddingTop:'5px',paddingBottom:'5px', paddingLeft:'5px', paddingRight:'5px'
    }

}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
const HsCodePop = ( props ) => {
    const classes = styles();
    // const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [switchPaper, setSwitchPaper] = useState(true);
    const [hsCodeGroup, setHsCodeGroup] = useState([]);
    const [hsCodeItemList, setHsCodeItemList] = useState([]);
    const [hsCode, setHsCode] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const {id} = props;

    useEffect(()=>{
        selectHsCodeGroup()
    }, [])
    const handleClick =( )=>{
        setOpen(!open)
        // setAnchorEl(anchorEl? null : event.currentTarget)
    }

    const selectHsCodeGroup=()=>{
        axios.post(
            "/shipper/getHsCodeGroupInfo"
        )
        .then(res =>setHsCodeGroup(res.data));
    }

    const fncGroupClick =(data)=> {
        selectHsCodeItem(data);
        setSwitchPaper(false);
    }

    const selectHsCodeItem = (data)=>{
        axios.post(
            "/shipper/getHsCodeItemInfo",{code:data.group_code}
        )
        .then(res => setHsCodeItemList(res.data));
    }

    const fncOnClickData = (e, data) => {
        setHsCode( data );
        handleClick();
        props.fncReturnHsCode(data);
    }
    
    return(
        <React.Fragment>
            <IconButton onClick={e=>handleClick()}><Search/></IconButton>
            <Dialog
                classes={{paper: classes.modal}}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>handleClick()}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
            >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
            >
            <Button
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="default"
                size="small"
              onClick={()=>handleClick()}
            ><Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>
              <ImportContacts fontSize={'default'} style={{marginRight: '20px'}}/>
              HS 검색
            </h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
                {switchPaper?
                    <Paper className={classes.tilePaper}>
                        <GridItem xs={12} sm={12} style={{textAlign:'right', width: '780px'}}>
                            <CustomInput
                                validtype="text"
                                labelText=""
                                maxLength="140"
                                id="search_value"
                                formControlProps={{
                                    style:{paddingTop:'0',marginBottom:'10px', width:'40%'}
                                }}
                                inputProps={{
                                    value:searchValue?searchValue:'',
                                    onChange: (e)=>setSearchValue(e.target.value),
                                }}
                                required={false}
                                feedback="cargo"
                            />
                        </GridItem>
                        <Divider />
                        <GridList cols={6} >
                            {(hsCodeGroup.length>0)?hsCodeGroup.map((data, index)=>{
                            return (
                                <GridListTile cols={1} style={{height: '35px'}} key={index+"_tile"}>
                                    <Button variant={"contained"} key={index} 
                                        style={{width:'100%', height:'100%',
                                        border:searchValue?data.group_name_kr.replace(/(\s*)/g,"").includes(searchValue)?'2px solid':'':''}} 
                                        onClick={()=>fncGroupClick(data)}>
                                        {data.group_name_kr.replace(/(\s*)/g,"").includes(searchValue)?<p>{data.group_name_kr}</p>:data.group_name_kr}
                                    </Button>
                                </GridListTile>
                                )
                            }):
                            <GridItem xs={12} sm={12} style={{textAlign:'center'}}>
                                <h2>조회된 자료가 존재하지 않습니다.</h2>
                            </GridItem>
                            }
                        </GridList>
                    </Paper>
                :
                <Paper style={{width :'100%', height: '400px'}}>
                    <GridItem xs={12} sm={12} style={{textAlign:'right'}}>
                        <IconButton onClick={()=>setSwitchPaper(true)}>
                            <ArrowBack/>
                        </IconButton>
                    </GridItem>
                    <TableContainer className={classes.tableLine}>
                        <Table 	
                            stickyHeader aria-label="sticky table"
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                            style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                            <TableHead>
                            <TableRow>
                                <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">HSCODE</TableCell>
                                <TableCell style={{width: '80%'}} className={classes.tableHeadercell} align="center">HS품목해설</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {hsCodeItemList.map((row,index) => (
                                <TableRow key={index}
                                    className={classes.root}
                                    hover
                                    onClick={(e)=>fncOnClickData(e, row)}
                                    selected = { hsCode.item_code === row.item_code }
                                >
                                    <TableCell align="center" className={classes.tablecell}>{row.item_code}</TableCell>
                                    <TableCell align="center" className={classes.tablecell}>{row.item_name_kr}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                }
          </DialogContent>
      </Dialog>
    </React.Fragment>
    )
}

// HsCodePop.propTypes = {
//     id: PropTypes.string,
//     fncReturnHsCode: PropTypes.func,
// }

export default HsCodePop;
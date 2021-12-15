import React,{ useState, useEffect } from "react";
import axios from 'axios';
import { IconButton, TableContainer, Table, TableHead, TableRow
  , TableCell, TableBody
  , Dialog, DialogTitle, DialogContent, InputLabel} from "@material-ui/core";
import {LocalShipping, Search, Close} from "@material-ui/icons";

import Button from "components/CustomButtons/Button.js";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SweetAlert from "components/CustomAlert/CustomSweetAlert.js";

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
const TransPop = (props) => {
  const classes = styles();
  const [transport, setTransport] = useState({});
  const [open, setOpen] = useState(false);
  const [transportList, setTransportList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewAlert, setViewAlert] = useState(null)
  const {user, lineCode} = props;

  const fncOpen =(e)=> {
      if( !lineCode ) {
        // props.alert(
        //     null // onConfirm: function
        //     , "스케줄을 먼저 선택하세요."  // title: string
        //     ,'warning' // default,info,success,warning,danger,error,input,custom,controlled
        //     ,true // show: boolean default:true
        //     ,true  // reverseButtons: boolean , default: false
        //     ,'lg' // btnSize: lg,sm,xs default:lg
        //     ,'' // subtitle: string
        //     ,true // showConfirm: boolean default: false
        //     ,false // showCancel: boolean default: false
        //     ,null // onCancel: function
        // );

        setViewAlert(	
          <SweetAlert onConfirm={null} ontitle={"스케줄을 먼저 선택하세요."} 
                  type={'warning'} show={true} reverseButtons={true} 
                  btnSize={'lg'} subtitle={null} showConfirm={false}
                  showCancel={false} onCancel={null} />
          );
      //   return(<Salert
      //   style={{ display: "block", marginTop: "-100px" }}
      //   title="Auto close alert!"
      //   onConfirm={true}
      //   showConfirm={false}
      // >
      //   스케줄을 먼저 선택하세요.
      // </Salert>)
        return false;
      }
    setOpen(!open);
  }
  const handleClose =(e)=> {
    setOpen(!open);
  }


  const fncOnClickData =(e, row)=> {
    setTransport({...row});
    props.fncTransPort(row);
    setOpen(!open);
  }

  const fncSelectTransList =()=> {
    if( !searchValue ) {
        return false;
    }
    axios.post(
        "/loc/selectLineCodeTrans",
        {
            line_code: lineCode,
            trans_name: searchValue,
        }
    )
    .then(res => setTransportList(res.data));
  }

  return (
    <React.Fragment>
      <IconButton onClick={fncOpen}>
        <Search />
      </IconButton>

      <Dialog
        classes={{paper: classes.modal}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleClose()}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
                size="sm"
              onClick={()=>handleClose()}
            ><Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>
              <LocalShipping fontSize={'default'} style={{marginRight: '20px'}}/>
              Transport
            </h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
              <GridContainer style={{width:'800px'}}>
                <GridItem xs={12} sm={6} className={classes.gridLabel}>
                    <InputLabel style={{ color: "#AAAAAA", textAlign: 'right' }}>
                    운송사명
                    </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <CustomInput
                    validtype="text"
                    success={searchValue?true:false}
                    error={searchValue?false:true}
                    labelText=""
                    maxLength="50"
                    id="search_value"
                    formControlProps={{
                        fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
                    }}
                    inputProps={{
                        value:searchValue?searchValue:'',
                        onChange: (e)=>setSearchValue(e.target.value),
                        onKeyPress : (e)=>{
                            if (e.key==='Enter'){
                                fncSelectTransList();
                            }
                        }
                    // onBlur: ()=>props.fncOnBlur(container),
                    }}
                    required={true}
                    feedback="deny"
                    />
                </GridItem>
                <GridItem xs={12} sm={1} className={classes.gridLabel}>
                    <IconButton onClick={fncSelectTransList}>
                        <Search />
                    </IconButton>
                </GridItem>
              </GridContainer>
            <TableContainer className={classes.tableLine}>
              <Table 	
                stickyHeader aria-label="sticky table"
                className={classes.table}
                aria-labelledby="tableTitle"
                size='medium'
                style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{width: '30%'}} className={classes.tableHeadercell} align="center">Trans</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">User</TableCell>
                    <TableCell style={{width: '20%'}} className={classes.tableHeadercell} align="center">Tel</TableCell>
                    <TableCell style={{width: '30%'}} className={classes.tableHeadercell} align="center">e-mail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {transportList.map((row,index) => (
                      <TableRow key={index}
                        className={classes.root}
                        hover
                        onClick={(e)=>fncOnClickData(e, row)}
                        selected = { transport.trans_code === row.trans_code }
                      >
                        <TableCell align="center" className={classes.tablecell}>{row.trans_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_user_name}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_user_tel}</TableCell>
                        <TableCell align="center" className={classes.tablecell}>{row.trans_user_email}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
      </Dialog>
      {viewAlert}
    </React.Fragment>
  );
}

export default TransPop;
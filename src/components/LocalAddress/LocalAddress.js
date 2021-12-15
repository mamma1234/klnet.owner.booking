import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    ListItemText,
    List, ListItem,Typography,
    Box,
    Divider,
    ListItemSecondaryAction,
    } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
// import Typography from 'views/Components/Typography';
// import classes from '*.module.css';


const userStylesMain = makeStyles((theme) => ({
    root: {
        maxWidth:600,
        width: '100%',
        maxHeight: 840,
        height: '100%'
    },
    primary: {
        fontWeight:'bold'
    }
}))

export default function LocalAddress( props ) {
    const style = userStylesMain();
    const [open, setOpen] = useState(props.open);
    const itemsPerPage = 5;
    const [address, setAddress] = useState(props.params);
    const [addressList, setAddressList] = useState([]);
    const [common, setCommon] = useState({});
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [jsonData, setJsonData] = useState(0);
    
    // 부모의 open, params 변경됐을 경우
    useEffect(()=>{
        setAddress( props.params );
        setOpen(props.open);
    }, [props.open, props.params]);

    // 페이징처리 변경됐을 경우
    useEffect(()=>{
        localAddress();
    }, [page]);

    const reload = ()=> {
    	props.reload();
    }

    /**
     * 행안부 주소 API 호출
     * 비로그인 호출 URL : /api/localAddress
     */
    const localAddress = () => {
        if( !address ) return false;
        axios.post("/com/localAddress"
            ,{
                address:address
                ,currentPage:page
                // ,countPerPage
                ,resultType:'json'
                ,keyword:address
            }
            
        ).then(res => {
            // console.log("data message:",res.data);
            if( "ERROR" === res.data.message ) {
                alert( res.data.errMsg );
                return false;
            }
            setCommon(res.data.common);
            setAddressList(res.data.juso);
            setPage(Number(res.data.common.currentPage));
            setTotalCount(Math.ceil(res.data.common.totalCount/itemsPerPage));
        }).catch(err => {
            alert(err);
        });

    }

    const listItemClick = (event , index)=>{
        setSelectedIndex(index);
        setJsonData( addressList[index] );
    }

    const handleChange = (event, value) => {
        // console.log('handleChange', value);
        setPage(Number(value));
        // console.log(page);
        
    }

    const onDoubleClickItem = (event, value) => {
        // props.selectedAddress(jsonData);
        // console.log(jsonData)\
        props.setReturnAddress(jsonData);
        props.setOpen(false);
        setAddress("");
        setAddressList([]);
        setCommon({});
        setPage(1);
        setTotalCount(0);
        setSelectedIndex(0);
        setJsonData(0);
    }

    const handleClose=() => {
        setAddress("");
        setAddressList([]);
        setCommon({});
        setPage(1);
        setTotalCount(0);
        setSelectedIndex(0);
        setJsonData(0);
        props.setOpen(false);
        setOpen(false);
    }

      // Enter Event Addr
  const fncOnKeyDownAddr = (e) => {
	if( "Enter" === e.key ) {
		if( "" === e.target.value) return false;
		localAddress();
	}
  }
    
    return (
        <Dialog
            open={open}
            keepMounted
            style={{maxWidth:"600px"}}
            onClose={handleClose}
            >
            <DialogContent className={style.root}>
                <DialogContentText>
                    주소검색
                </DialogContentText>
                <GridContainer>
                    <GridItem xs={12} ms={12} md={12} >
                        <TextField 
                            variant="outlined"
                            size="small"
                            label="주소검색"
                            placeholder="예) 케이엘넷"
                            value={address===null?"":address}
                            onChange={(e)=>setAddress(e.target.value)}
                            fullWidth
                            onKeyDown={fncOnKeyDownAddr} />
                    </GridItem>
                    <Divider/>
                    <GridItem xs={12} ms={12} md={12} >
                        <List component="nav" aria-label="main mailbox folders">
                            {addressList.length > 0?
                            addressList
                            // .slice((page-1)*itemsPerPage, page*itemsPerPage)
                            .map((item, index)=> (
                                <ListItem
                                    key={index}
                                    button
                                    selected={selectedIndex === index}
                                    onClick={(event)=>listItemClick(event, index)}>
                                        <ListItemText
                                            onDoubleClick={onDoubleClickItem}
                                            primary={<Typography className={style.primary}>{item.roadAddr}</Typography>}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary">
                                                            {item.jibunAddr}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        >    
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Typography className={style.primary}>{item.zipNo}</Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                            )):
                            <ListItem>
                                <ListItemText
                                    primary={<Typography className={style.primary}></Typography>}
                                >    
                                </ListItemText>
                            </ListItem>}
                        </List>
                        <Divider/>
                        <Box component="span">
                            <Pagination
                                count={totalCount}
                                page={page}
                                onChange={handleChange}
                                defaultPage={1}
                                color="primary"
                                size="small"
                                showFirstButton
                                showLastButton>
                            </Pagination>
                        </Box>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
	      		<Button size="lg" onClick={()=>props.setOpen(false)} color="primary">닫기</Button>
	      		<Button size="lg" color="primary" onClick={localAddress}>조회</Button>
	      	</DialogActions>
        </Dialog>
    );

}
import React, {useState, createRef, useEffect} from "react";


import Editor,{createEmptyValue, createValueFromString} from 'react-rte'
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import {Card, CardContent, TextField, Grid, IconButton, Button, Chip, Tooltip, Checkbox, FormControlLabel
} from "@material-ui/core";
// board table page
//import Table from 'components/Table/TableBoardPaging.js';

//import Icon from "@material-ui/core/Icon";
import { ArrowBack} from "@material-ui/icons";
import axios from 'axios';

const useRowStyles = makeStyles((theme)=> ({

}));


const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS','BLOCK_TYPE_BUTTONS','LINK_BUTTONS','BLOCK_TYPE_DROPDOWN','HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS:[
        {label:'Bold',style:'BOLD',className:'custom-css-class'},
        {label:'Italic',style:'ITALIC'},
        {label:'Underline',style:'UNDERLINE'},
    ],
    BLOCK_TYPE_DROPDOWN: [
        {label:'Normal',style:'unstyled'},
        {label:'Heading Large',style:'header-one'},
        {label:'Heading Medium',style:'header-two'},
        {label:'Heading Small',style:'header-three'},
    ],
    BLOCK_TYPE_BUTTONS:[
        {label:'UL',style:'unordered-list-item'},
        {label:'OL',style:'ordered-list-item'},
        
    ]
}

export default function BoardWrite(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(createEmptyValue());
    const [boardId, setBoardId] = useState("");
    const [files, setFiles] = useState([]); 
    const fileInput = createRef();
    const [plismplusService, setPlismPlusService] = useState(true);
    const [panlogisService, setPanlogisService] = useState(true);
    const [weidongService, setWeidongService] = useState(true);
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate()+7)))
    useEffect(()=> {
        if(props.rowData) {
            setContent(createValueFromString(props.rowData.content,'html'));
            setTitle(props.rowData.title);
            setBoardId(props.rowData.board_id);
            setEndDate(props.rowData.board_to);
            if(props.rowData.attach_files) {
                setFiles(props.rowData.attach_files.map((value,index)=> {return {name:value.real_file_name,boardId:value.board_id,seq:value.board_file_seq,rename:value.file_name,path:value.file_path}}))
            }
        }
    },[]);
    
    const handleClick = () => {
        if(files.length===2) {
            props.onAlert("error", "첨부파일은 최대 2개 까지 업로드 가능합니다.");
            return;
        }
        fileInput.current.click();
    };
    const handleImageChange = (e) => {
        
        e.preventDefault();
        
        if(!e.target.files[0]) {
            return false;
        }

        if(!/\.(hwp|doc|docx|ppt|pptx|xls|xlsx|txt|csv|jpg|jpeg|gif|png|bmp|pdf)$/i.test(e.target.files[0].name)) {
            props.onAlert('error', '적절하지 않은 파일 형식입니다.' );
            return false;
        }
        
        if(e.target.files[0].size > 200000) {
            props.onAlert('error', '파일의 크기가 너무 큽니다.' );
            return false;
        }
        props.onAlert('success', '업로드 완료' );
        setFiles([...files,e.target.files[0]])
    };
    const saveNotice = () => {
        if(props.userData){
            if(title.length === 0) {
                props.onAlert('error', '제목을 입력해주세요.' );
                return;
            }
            if(content.length === 0) {
                props.onAlert('error', '내용을 입력해주세요.' );
                return;
            }

            axios.post("/com/saveNotice", {
                userno:props.userData.user_no
                ,username:props.userData.user_name
                ,title:title
                ,content:content.toString('html')
                ,boardId:boardId
                ,plism:plismplusService
                ,pan:panlogisService
                ,weidong:weidongService
                ,boardEnd:endDate
            }).then(
                res=> {
                    if(res.statusText ==="OK") {
                        if(res.data) {
                            if(files) {
                                const formData = new FormData();
                                formData.append("boardId",res.data.board_id);
                                formData.append("userno", props.userData.user_no);
                                formData.append("file1",files[0]);
                                formData.append("file2",files[1]);

                                axios.post("/com/saveNoticeFiles",formData).then(
                                    res=>{
                                        if(res.statusText==="OK") {
                                            if(res.data && res.data.success === 1) {
                                                props.onAlert('success','저장이 완료 되었습니다.');
                                                props.goToList();
                                            }else {
                                                props.onAlert('error',res.data.result);
                                            }
                                        }
                                        
                                    }
                                )

                            }else {
                                props.onAlert('success','저장이 완료 되었습니다.');
                                props.goToList();
                            }


                        }
                    }else {
                        props.onAlert('error','지금은 저장 할 수 없습니다.')
                    }
                    
                    
                }
            )
        }
    }      
    const handleRemove = (num) => {
        if(files[num-1].rename) {
            axios.post('/com/boardFileDelete',{param:files[num-1]}).then(
                res => {
                    if(res.statusText==="OK") {
                        if(res.data==="success") {
                            props.onAlert('success','삭제가 완료되었습니다.');
                            setFiles(files.filter((value,index)=> index === num))
                        }else {
                            props.onAlert('error',res.data);
                        }
                    }
                }
            )
        }else {
            setFiles(files.filter((value,index)=> index === num))
        }
        fileInput.current.value = null;
    };
    const onChangeDate = (date) => {
        if(date < new Date()) {
            props.onAlert("error", "과거 날짜 혹은 오늘날짜로 설정 하실 수 없습니다.");
            return;
        }

        setEndDate(date);
    }
    return(
        <Grid container spacing={3}>
            <Grid item style={{margin:'20px auto'}} xs={11}>
                <Card>
                    <CardContent>
                        <IconButton  onClick={()=> props.goToList()}>
                            <ArrowBack/>
                        </IconButton>
                    </CardContent>
                
                    <CardBody>
                        <GridItem>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField placeholder="제목" id="Subject" variant="outlined" size="small" value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth/>
                                </Grid>
                                <Grid item xs={6} sm={6} md={4}>
                                    <Tooltip title={<>
                                        <span style={{fontWeight:'bold', fontSize:'1rem'}}>허용 파일</span><span> : hwp, doc, docx, ppt, pptx, xls, xlsx, txt, csv, jpg, jpeg, gif, png, bmp, pdf </span>
                                        <br></br>
                                        <span style={{fontWeight:'bold', fontSize:'1rem'}}>파일 크기 제한</span><span> : 20MB</span></>}>
                                        <Button variant="outlined"
                                        id="btn1"                                        
                                        color="default"
                                        onClick={() => handleClick()}>
                                            첨부 파일
                                        </Button>
                                    </Tooltip>
                                    <input style={{display:'none'}} type="file" onChange={(e) =>handleImageChange(e)} ref={fileInput} />
                                </Grid>
                                <Grid item xs={6} sm={6} md={4}>
                                    
											
                                    {files.map((value,index) => {
                                        return(
                                            <GridItem key={index}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} sm={12} md={12} style={{textAlignLast:'center'}}>
                                                        <Chip label={value.name} onDelete={() => handleRemove(index+1)} variant="outlined" />
                                                    </Grid>
                                                </Grid>
                                            </GridItem>
                                        )
                                    })}
                                    
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={plismplusService} 
                                                onChange={(e)=> setPlismPlusService(e.target.checked)}/>}
                                        label="PLISMPLUS">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={panlogisService} 
                                                onChange={(e)=> setPanlogisService(e.target.checked)}/>}
                                        label="PANLOGIS">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={weidongService}
                                                onChange={(e)=> setWeidongService(e.target.checked)}/>}
                                        label="WEIDONG">
                                    </FormControlLabel>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
                                            <span>공지기간</span>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
                                            <CalendarBox
                                                labelText ="from"
                                                id="endDate"
                                                format="yyyy-MM-dd"
                                                setValue={endDate}
                                                autoOk
                                                onChangeValue={(date)=>onChangeDate(date)}
                                                formControlProps={{fullWidth: true}}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </GridItem>
                        <GridItem style={{ marginTop:'20px'}}>
                            <Grid container spacing={1} style={{maxWith:'100%'}}>
                                <Editor
                                    value={content}
                                    onChange={(e)=> {setContent(e)}}
                                    toolbarConfig={toolbarConfig}/>
                            </Grid>
                        </GridItem>
                        <GridItem style={{ marginTop:'20px'}}>
                            <Button color="default" variant="outlined" onClick = {()=> saveNotice()}>저장</Button>
                        </GridItem>
                    </CardBody>
                </Card>
            </Grid>
        </Grid>
    )
}





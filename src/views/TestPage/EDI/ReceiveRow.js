import React,{ useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import {
    TableCell,
    TableRow
} from '@material-ui/core';
export default function ReceiveRow(props) {
    //const [key,setKey] = useState(props.key);
    const [value,setValue] = useState(props.value);
    useEffect(()=> {
    //    setKey(props.key);
        setValue(props.value);
    },[props.value]);



    return (
        <React.Fragment>
            {value !== null &&
            <TableRow hover>
                <TableCell align="center">{value.out_o.ROWCOUNT}</TableCell>        
                <TableCell align="center">{value.out_o.DOC_MSG_ID}</TableCell>
                <TableCell align="center">{value.out_o.XML_MSG_ID}</TableCell>
                <TableCell align="center">{value.out_o.LOGIN_ID}</TableCell>
                <TableCell align="center">{value.out_o.ORIGINATOR}</TableCell>
                <TableCell align="center">{value.out_o.RECIPIENT}</TableCell>
                <TableCell align="center">{value.out_o.TIMESTAMP}</TableCell>
                <TableCell align="center">{value.out_o.DOC_NAME}</TableCell>
                <TableCell align="center">{value.out_o.DOC_CODE}</TableCell>
                <TableCell align="center">{value.out_o.ERROR_CODE}</TableCell>
                <TableCell align="center">{value.out_o.ERROR_MSG}</TableCell>
                <TableCell align="center">{value.out_o.DOC_NO}</TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.xml_msg_id}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.originator}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.recipient}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.doc_name}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.doc_code}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.cur_status}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.timestamp}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.source_xml_msg_id}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.error_code}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.error_msg}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.err_timestamp}</span></GridItem>
                        )
                    })}  
                </TableCell>
                <TableCell align="center">{
                    value.out_p.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.err_cur_status}</span></GridItem>
                        )
                    })}  
                </TableCell>  
                
            </TableRow>
            }
        </React.Fragment>
    )
}
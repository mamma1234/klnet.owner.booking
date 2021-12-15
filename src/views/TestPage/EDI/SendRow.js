import React,{ useState, useEffect } from "react";
import {TableCell,TableRow} from '@material-ui/core';
import GridItem from "components/Grid/GridItem.js";
export default function ReceiveRow(props) {
    const [value,setValue] = useState(props.value);
    const [index, setIndex] = useState(props.index);
    useEffect(()=> {
        setValue(props.value);
        setIndex(props.index);
    },[props.value]);







    return (
        
        <React.Fragment>
            {value !== null &&
            <TableRow hover>
                <TableCell align="center">{value.out_p.rownum}</TableCell>        
                <TableCell align="center">{value.out_p.xml_msg_id}</TableCell>
                <TableCell align="center">{value.out_p.login_id}</TableCell>
                <TableCell align="center">{value.out_p.originator}</TableCell>
                <TableCell align="center">{value.out_p.recipient}</TableCell>
                <TableCell align="center">{value.out_p.doc_name}</TableCell>
                <TableCell align="center">{value.out_p.send_method}</TableCell>
                <TableCell align="center">{value.out_p.status}</TableCell>
                <TableCell align="center">{value.out_p.target_xml_msg_id}</TableCell>
                <TableCell align="center">{value.out_p.timestamp}</TableCell>
                <TableCell align="center">{value.out_p.error_code}</TableCell>
                <TableCell align="center">{value.out_p.error_msg}</TableCell>
                <TableCell align="center">{value.out_p.err_timestamp}</TableCell>
                <TableCell align="center">{value.out_p.cur_status}</TableCell>

                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.DOC_MSG_ID}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.XML_MSG_ID}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.LOGIN_ID}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.ORIGINATOR}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.RECIPIENT}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.ERROR_CODE}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.CUR_STATUS}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.TIMESTAMP}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_DOC_MSG_ID}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_XML_MSG_ID}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_LOGIN_ID}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_ORIGINATOR}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_RECIPIENT}</span></GridItem>
                        )
                    })}
                </TableCell>
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_ERROR_CODE}</span></GridItem>
                        )
                    })}
                </TableCell>       
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.OU_CUR_STATUS}</span></GridItem>
                        )
                    })}
                </TableCell>       
                <TableCell align="center">{
                    value.out_o.map((value,index)=>{
                        return(
                            <GridItem key={index}><span>{value.SEND_TIME}</span></GridItem>
                        )
                    })}
                </TableCell>       
            </TableRow>
            }
        </React.Fragment>
    )
}
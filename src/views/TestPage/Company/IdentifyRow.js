import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell} from '@material-ui/core';


const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding:'15px',
    width: '100%',
    height: '80vh',
    marginBottom: theme.spacing(2),
    overflow:'scroll'
  },gridContainer: {
    padding:'15px'
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'25%',
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'25%',
  },
}))




export default function UserRow(props) {


 //const [open, setOpen] = useState(false);
 const { row } = props;
 //const [statusValue,setStatusValue] = useState(row.status);
 const classes = styles();
 return (
   <React.Fragment>
        <TableRow
            className={classes.root}
            hover>
          <TableCell align="center">{row.num}</TableCell>
          <TableCell align="center">{row.work_code}</TableCell>
          <TableCell align="center">{row.recipient}</TableCell>
          <TableCell align="center">{row.originator}</TableCell>
          <TableCell align="center">{row.work_alias}</TableCell>
       </TableRow>
   </React.Fragment>
   );
 }
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    booking_title: {
      boxShadow: 'unset'
    },
    paper: {
      marginTop: theme.spacing(3),
      padding:theme.spacing(2),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up(600+theme.spacing(3)*2)]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3),
      }
    },
    paperInner: {
      marginTop: theme.spacing(3),
      // padding:theme.spacing(2),
      marginBottom: theme.spacing(3),
      // [theme.breakpoints.up(600+theme.spacing(3)*2)]: {
      //   marginTop: theme.spacing(4),
      //   marginBottom: theme.spacing(2),
      //   padding: theme.spacing(3),
      // }
    },
    gridContainer: {
      padding:'30px'
    },
    divider: {
      marginTop:'10px',
      marginBottom:'20px',
      backgroundColor:'#00acc1',
    },
    box: {
      width: '100%',
      marginTop: theme.spacing(3),
      padding:theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    avatar: {
      backgroundColor: '#00ACC1',
      [theme.breakpoints.between("xs", "sm")]: {
        width: theme.spacing(4),
        height: theme.spacing(4)
      },
      [theme.breakpoints.between("md", "lg", "xl")]: {
        width: theme.spacing(5),
        height: theme.spacing(5)
      }
    },
    headerCell: {
      textAlign: "left",
      backgroundColor: "#f2fefd",
      width:'150px',
      padding:'7px',
      // fontSize: '15px',
      // fontWeight:'bold'
    },
    dataCell: {
      textAlign: "left",
      padding:'7px',
    },
    grid: {
      padding: '0px 10px !important',
    },
    gridLabel: {
      padding: '0px 10px !important',
        textAlign:'left',
        marginTop:'12px',
    },
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
      height:'180px',overflow:'auto',borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7',marginBottom:'10px'
    },
    tablecell:{
      paddingTop:'5px',paddingBottom:'5px',textAlign:'start'
    },
    tableHeadercell:{
      paddingTop:'10px',paddingBottom:'10px',textAlign:'start'
    }
  }));
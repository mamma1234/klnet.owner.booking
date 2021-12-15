import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import { TableContainer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor:'#fff0',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
    color: '#784af4',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// function getSteps(ieType) {
//   // const steps=[];
//   // // ieType=='I'
//   // // ?steps = ['양하', '터미널반출', '이동중','DOOR도착', 'DOOR출발' , '이동중', '터미널반입', '선적']
//   // // :
//   // steps 
//   console.log(ieType)
//   return ['터미널반출', '이동중', 'DOOR도착', 'DOOR출발' , '이동중', '터미널반입', '선적']
// }
function getSteps(ieType) {
  if (ieType=='I'){
    return ['양하','터미널반출', '이동중', 'DOOR도착', 'DOOR출발' , '이동중', '터미널반입',]
  }else{
    return ['터미널반출', '이동중', 'DOOR도착', 'DOOR출발' , '이동중', '터미널반입', '선적' ]
  }
}

export default function HorizontalNonLinearAlternativeLabelStepper(props) {
  const {rowDetailData,ieType} =props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState([]);
  const steps = getSteps(ieType);

  // function activeLabel(index) {
  //   let stepArray = new Array(8)
  //     for(let i=0;i <rowDetailData.length;i++){
  //        for(let l = 0;l<8;l++){
  //           if(rowDetailData[i][`GROUP${l}`]!==null){
  //             ieType=='I'?stepArray[l]=rowDetailData[i][`GROUP${l}`]
  //             :stepArray[l-1]=rowDetailData[i][`GROUP${l}`]
  //           }
  //       }
  //     } 
  //     console.log(stepArray,'label',steps[index],'>>>',stepArray[index])        
  //     return steps[index] == stepArray[index]
  // }
 
  useEffect(()=>{
    setActiveStep(completed[completed.length-1])
  },[completed])
  
  const lastStep= (index)=>{
    return activeStep==index?
    (<DotIcon color='primary'/>)
    : activeStep>index ?(<CheckIcon color='disabled'/>): (<DotIcon color='disabled'/>)
  }

  return (
  <>
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear   className={classes.root} activeStep={activeStep}>   
        {steps.map((label, index) => {
          const labelProps = {};
          const dataProps = {};
          let indexIE;
          labelProps.icon=lastStep(index)
          for(let i=(rowDetailData.length-1); i>=0;i--){
            if (ieType=='I'){indexIE=index}else{indexIE=index+1}
              if(rowDetailData[i][`GROUP${indexIE}`]!==null){      
                dataProps.date= rowDetailData[i].BASE_DATE
                if(rowDetailData[i].ADDR){
                  let text = (rowDetailData[i].ADDR).split(" ")
                  dataProps.addr= `(위치 : ${text[0]} ${text[1]})` }
                completed.push(index)
              }
          }
          return (
            <Step key={index} >
              <StepLabel {...labelProps} >{label}<br/>{dataProps.date}<br/>{dataProps.addr}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </div>
      <div style={{margin:'5px 20px'}}>      
        <TableContainer component={Paper}>
            <Table aria-label='Detail table' style={{wordBreak: 'keep-all'}}>
              <TableHead>
                <TableRow>
                  <TableCell align='center' size='small'>No.</TableCell>
                  <TableCell align='center' size='small'>구분</TableCell>
                  <TableCell align='center' size='small'>구분상세</TableCell>
                  <TableCell align='center' size='small'>일시</TableCell>
                  <TableCell align='center' size='small'>위치</TableCell>
                  <TableCell align='center' size='small'>차량번호</TableCell>
                  <TableCell align='center' size='small'>기사연락처</TableCell>
                  <TableCell align='center' size='small'>운송사</TableCell>
                  <TableCell align='center' size='small'>운송사연락처</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowDetailData.length>0?
                      rowDetailData.map((prop, index) => {
                        return( 
                        <TableRow key={index}>
                          <TableCell align='center' size='small' component='th' scope='row'>{index+1}</TableCell>
                          <TableCell align='center' size='small'>{prop.MAIN_KIND}</TableCell>
                          <TableCell align='center' size='small'>{prop.DETAIL_KIND}</TableCell>
                          <TableCell align='center' size='small'>{prop.BASE_DATE}</TableCell>
                          <TableCell align='center' size='small'>{prop.ADDR}</TableCell>
                          <TableCell align='center' size='small'>{prop.CAR_CODE}</TableCell>
                          <TableCell align='center' size='small'>{prop.MOBILE_NO}</TableCell>
                          <TableCell align='center' size='small'>{prop.COM_NAME}</TableCell>
                          <TableCell align='center' size='small'>{prop.COM_PHONE}</TableCell>
                        </TableRow>
                      )})
                :
                <TableRow>  `NO DATA`</TableRow>
                }
              </TableBody>
            </Table>
      </TableContainer>
    </div>
  </>
  );
}

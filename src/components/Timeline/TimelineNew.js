import * as React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';




const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '6px 16px',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    content : {
        flex :9,
    },
    oppositeContent :{
        wordBreak:'keep-all'
    }
  }));



export default function OppositeContentTimeline() {
const classes = useStyles();
  return (
    <React.Fragment>
      {/* <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            9:30 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Eat
            </Typography>
            <Typography>Because you need strength</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Code
            </Typography>
            <Typography>Because it&apos;s awesome!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Sleep
            </Typography>
            <Typography>Because you need rest</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Repeat
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline> */}

      <Timeline position="alternate" style={{    padding: '0'}}>
        <TimelineItem>
          <TimelineOppositeContent  className={classes.oppositeContent} color="text.secondary">
            터미널반출
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.content}> 
            <Paper elevation={3} className={classes.paper}>
                {/* <Typography variant="h6" component="h1">
                운송내역
                </Typography>
                <Typography>
                     */}
                    [부산신항터미널/반출] 2021/05/14 09:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)<br/>
                    [드라이빙/상차] 2021/05/14 09:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)<br/>
                    [드라이빙/출발] 2021/05/14 21:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123) |천일 (051-111-1111)<br/>
                    [드라이빙/출발] 2021/05/14 21:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123) |천일 (051-111-1111)<br/>
                    [드라이빙/출발] 2021/05/14 21:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123) |천일 (051-111-1111)<br/>
                    [드라이빙/출발] 2021/05/14 21:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123) |천일 (051-111-1111)
                    {/* </Typography> */}
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" className={classes.oppositeContent} >
            이동중<br/>
            (현재위치:경북 군산)
            
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
              [드라이빙/도착] 2021/05/15 21:12 | 점포창고 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)<br/>
              [드라이빙/출발] 2021/05/15 21:22 | 점포창고 | 11가1111(010-1111-1123) |천일 (051-111-1111)<br/>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            DOOR 도착
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot  />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.content}>
             <Paper elevation={3} className={classes.paper}>
             [부산신항터미널/반출] 2021/05/14 09:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            DOOR 출발
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
            [부산신항터미널/반출] 2021/05/14 09:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary"  className={classes.oppositeContent} >
         이동중<br/>
            (현재위치:경남 김해)
           
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
            [부산신항터미널/반출] 2021/05/14 09:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
           선적<br/>
           (2021/10/05 09:00)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
            [부산신항터미널/반출] 2021/05/14 09:12 | 부산 강서구 지사동 11-21 | 99가0000(010-1111-1123 | 대한통운(051-111-1111)
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>



      
    </React.Fragment>
  );
}

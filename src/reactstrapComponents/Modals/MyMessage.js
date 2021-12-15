/*eslint-disable*/
import React,{useState,useEffect} from "react";
// reactstrap components
import {
  //CardBody,Row,Col,Button,
  DropdownMenu,DropdownItem
} from "reactstrap";
//import axios from "axios";
import Badge from "reactstrap/lib/Badge";
//import {Link} from "react-router-dom";
export default function MyProfile(props) {
    const [data,setData] = useState([]);
    
    useEffect(() => {
        //console.log(props.user)
        if(props.user) {
        	setData(props.msgdata);
        }

        return function cleanup() {
          console.log('cleanup')
        };
      },[props.msgdata]);
    
    const onHandleReadMessage = (data,flag) => {
    	props.readmsg({'seq':data,'flag':flag});
        if(props.history && flag === 'A') {
        	props.history.push('/usermessage');
        }
        
    }

    return (
        <>
            <div>
                <DropdownMenu
                className="dropdown-wide dropdown-notification mt-0"
                tag="ul"
                right style={{display:'unset',boxShadow:'0px -9px 50px 0 rgb(0 0 0 / 20%)'}}
              >
                <DropdownItem header>
                  Message
                </DropdownItem>
                <li>
                  <ul className="dropdown-notification-list scroll-area" style={{overflowY:'auto'}}>
                    {data.length> 0?data.map((data,key)=>(
                    		<a key={"msg_"+key}
		                      className="notification-item" onClick={(e)=>{e.preventDefault();onHandleReadMessage(data.message_seq,'I');}}>
		                      <div className="notification-text pl-3 pr-2" style={{minHeight:'40px',backgroundColor:data.read_yn==='N'?'aliceblue':''}}>
		                        <Badge color="info" pill>
		                        	<i className="nc-icon nc-alert-circle-i" />
		                        </Badge>
		                        <span className="message" style={{fontSize:'0.7em'}}>
		                          {data.message}
		                        </span>
		                        {data.read_yn === 'N'?
		                         <><br />
		                           <span className="time">{data.the_times}</span>
		                           </>:
		                            <><br />
		                           <span className="time">{data.read_date}</span>
		                           </>}
		                      </div>
		                    </a>
                    )):<a className="notification-item"><div className="notification-text pl-3 pr-2" style={{minHeight:'20px',fontSize:'14px'}}>No Message</div></a>}
                    {/* end scroll area */}
                    <li className="dropdown-footer">
                      <ul className="dropdown-footer-menu">
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {e.preventDefault();onHandleReadMessage(null,'A');}}
                          >
                            more ...
                          </a>
                            {/*<Link to={{pathname: `/usermessage`,state: {user_no:props.user.user_no, read:'Y'}}}>more ...</Link>*/}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </DropdownMenu>
     
            </div>            
        </>
    );
}


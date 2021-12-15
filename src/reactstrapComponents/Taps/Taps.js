import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  // Card,
  Button,
  // CardTitle,
  // CardText,
  // Row,
  // Col,
} from "reactstrap";
import classnames from 'classnames';

const Example = (props) => {
  const {taps,tabvalue} = props;
  const [activeTab, setActiveTab] = useState(tabvalue);

  const toggle = tab => {
     if(taps.length === (tab-1)) {
        alert("Register ok");
     } else {
        if(activeTab !== tab) setActiveTab(tab);
     }
  }


  return (
    <div>
    {taps.title &&
      <Nav tabs>
        {taps.map((data,index,key)=>{
                return (
                <NavItem key={'tab'+key}>
                    <NavLink
                        className={classnames({ active: activeTab === index+1 })}
                        onClick={() => { toggle(index+1); }}
                    >
                        {data.title}
                    </NavLink>
                </NavItem>
                );
        })}
      </Nav>}
      <TabContent activeTab={activeTab}>
        {taps.map((data,index,key)=>
               
                    <TabPane key={key} tabId={index+1}>
                        {data.body}
                        <div className="modal-footer no-border-footer" >
                        <Button color="default" onClick={() => { toggle(index+2); }}>{taps.length===index+1?"Save":"Next"}</Button>
                        </div>
                    </TabPane>
            
        )}
      </TabContent>
      
    </div>
  );
}

export default Example;
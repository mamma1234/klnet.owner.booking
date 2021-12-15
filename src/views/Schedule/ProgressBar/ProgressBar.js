import React from "react";
import "./Progress.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from '@material-ui/core/Tooltip';


let checkDatalist = [];

export default function MultiColorProgressBar(props) {
	
  const {data} = props;	
  
  React.useEffect(() => {
	  checkDatalist=[];
	  return () => {
	      console.log('cleanup');
	    };	    
  }, [data]);

  let bgcolor =[{color:'#ff1100'},{color:'#ffa500'},{color:'#fde900'},
                {color:'#10ff00'},{color:'#002bff'},{color:'#00ffc4'},
                {color:'#00834d'},{color:'#8a8eff'},{color:'#596738'},
                {color:'#00adff'},{color:'#7a00ff'}]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>,data) => {

        if(data.line_code !== "OTHER" && event.target.checked) {
        	checkDatalist.push(data);
        	props.eventHandler(checkDatalist);

        } else {
        	if(data.line_code !== "OTHER") {
	            let variable = [];
	            checkDatalist.map((list,key)=> 
	        		list.line_code != data.line_code?variable.push(list):null
	        	);
	            checkDatalist = variable;
	            props.eventHandler(checkDatalist);
        	}
        }
  }
  
  return (
    <Card style={{marginTop:'10px',marginBottom:'5px'}}>
     	<CardHeader style={{paddingTop:'0',paddingBottom:'0'}}>
     		<h6 style={{marginBottom:'0'}}> 물동량 순위 </h6>
     	</CardHeader>
     	{data.length>0?
     	<CardBody style={{paddingTop:'5px',paddingBottom:'5px'}}>
		    <div className="multicolor-bar">
		      <div className="values">
		        {data.map((data,key) =>
		          <div className="value" key={key} style={{ 'color': bgcolor[key].color, width: data.per_value,height:'15px'}}>
		            <span style={{fontSize:'13px',fontWeight:'bold'}}>{data.per_value}</span>
		          </div>
		        )}
		      </div>
		      <div className="scale">
		      {data.map((data,key) =>
		          <div className="graduation" key={key} style={{'color': bgcolor[key].color, width: data.per_value,height:'15px'}}  >
		            <span>|</span>
		          </div>
		          )}
		          
		      </div>
		      <div className="bars">
		        {data.map((data,key) =>
		        <Tooltip title={data.line_name+" ("+data.per_value+")"} key={key}>
		          <div className="bar" style={{'backgroundColor': bgcolor[key].color, 'width': data.per_value}} > 
		          </div>
		          </Tooltip>
		        )}
		      </div>
		      <div>
		      {data.map((data,key) =>
		      <FormControlLabel key={key}
		        control={
		          <Checkbox
		            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
		            checkedIcon={<CheckBoxIcon fontSize="small" />}
		            name={"check_"+key}
		            onChange={(e)=>handleChange(e,data)}
		            style={{'color': bgcolor[key].color}}
		          />
		        }
		        label=<font size="2">{data.line_name}</font>
		      />
		      )}
		      </div>
		    </div>
	    </CardBody>:<div style={{textAlign:'center'}}>조회 된 물동량 데이터가 존재하지 않습니다.</div>}
    </Card>
  );
}
import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {InputLabel} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomOutInput from "components/CustomInput/CustomOutInput.js";
import {useSrStore}  from 'store/srStore.js';
//import {useStyles} from 'views/Pages/Booking/SR/styles';
const styles = makeStyles((theme) => ({
	grid: {
		padding: '0px 10px !important',
	},
	gridLabel: {
		padding: '0px 10px !important',
		textAlign:'left',
		marginTop:'12px',
	},
	divider: {
		marginTop:'10px',
		marginBottom:'20px',
		//backgroundColor:'#00acc1'
	},
}));

export default function MarkBody (props) { 
	const classes = styles();
	const {bodyProps} = props;
	const store =  useSrStore();
	const [cargoData,setCargoData] = useState([]);
		
	useEffect(() => {
		if(bodyProps){
			setCargoData(bodyProps);
		}
	}, [bodyProps]);
	const handleCargoChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setCargoData({...cargoData, [prop]:event.target.value});
		store.setSr({...cargoData, [prop]:event.target.value});
	}
	const getByte =(text)=>{
		return text.split('').map(s=>s.charCodeAt(0)).reduce((prev,c) => (prev +((c === 10)?2:((c>>7)?2:1))),0);
	}
	const textareaLimit = (prop,length) => (event: React.ChangeEvent<HTMLInputElement>) =>{
		let lines = event.target.value.split('\n');
		for(let i=0;i<lines.length;i++) {

			if( getByte(lines[i]) <= length)  continue;

			let j=0;
			const lineLen = lines[i].length;
			let space = lineLen;
			while(j++ <= lineLen) {
				var lengthData= lines[i].substring(0,j);
				if(getByte(lengthData) <= length) {
					space = lengthData.length;
				}
			}

			lines[i+1] = lines[i].substring(space+1) + (lines[i+1] || "");
			lines[i]=lines[i].substring(0,space);
		}
		setCargoData({...cargoData, [prop]:lines.join('\n')});
	}
	
	return (
		<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
			<GridContainer>
				<GridItem className={classes.grid} lg={4} md={6} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={5} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={7} md={9} sm={9} xs={12}>
							<CustomInput
								id="cargo_mark_bookmark_name"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:cargoData.cargo_mark_bookmark_name?cargoData.cargo_mark_bookmark_name:'',
									onChange: handleCargoChange('cargo_mark_bookmark_name'),
									onBlur: (e)=>e.target.value?props.mergeCargoProps(cargoData):null,
									style:{height:'30px'}
								}}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
					<InputLabel style={{ color: "#AAAAAA" }}>Mark</InputLabel>
					<CustomOutInput
						id="mark"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							multiline: true,
							rows: 5,
							value:cargoData.mark_desc?cargoData.mark_desc:'',
							onChange: textareaLimit('mark_desc',35),	  
							onBlur: (e)=>e.target.value?props.mergeCargoProps(cargoData):null
						}}
					/>
					<InputLabel style={{ color: "#AAAAAA" }}>
						line:{cargoData.mark_desc?cargoData.mark_desc.split("\n").length:0} {' / '}
						byte:{getByte(cargoData.mark_desc?cargoData.mark_desc.split("\n")[cargoData.mark_desc?cargoData.mark_desc.split("\n").length-1:0]:'')}
					</InputLabel>
				</GridItem>
			</GridContainer>	
		</GridItem>
	);
}
// export default React.memo(MarkBody, (prevProps,nextProps) =>  
// prevProps.mark_desc === nextProps.mark_desc 
// && prevProps.cargo_mark_bookmark_name === nextProps.cargo_mark_bookmark_name);
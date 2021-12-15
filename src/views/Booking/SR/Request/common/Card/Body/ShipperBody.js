import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, Divider} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import {useStyles} from 'views/Pages/Booking/SR/styles';
import {observer} from 'mobx-react-lite';
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

//const ShipperBody = (props) => { 
//const ShipperBody = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ShipperBody = (observer(({UserStore, ...props}) => {
function ShipperBody(props) {
	    	const classes = styles();
	    	const store =  useSrStore();
	    	const {shpProps,type,bodyProps} = props; 
	    	
		    const [shpBodyData,setShpBodyData] = useState({'shipper_bookmark_seq':'','shipper_bookmark_name':'','shp_code':'','shp_name1':'',
				'shp_name2':'','shp_address1':'','shp_address2':'','shp_address3':'','shp_address4':'','shp_address5':'','shp_user_name':'',
				'shp_user_tel':'','sch_user_fax':'','sch_user_dep1':'','sch_user_email':''});

			  
		    useEffect(() => { 
		    	setShpBodyData(shpProps);
			}, [shpProps]);
		    
		    useEffect(() => { 
		    	if(('B' === type||'C' === type) && props.bodyProps) {
		    		setShpBodyData(props.bodyProps);
		    	}
			}, [props.bodyProps]);
		    
		    
		    const handleShpChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		    	setShpBodyData({...shpBodyData, [prop]:event.target.value});
		    }
		      			
			return (
					<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
		                <GridContainer>
		                	{type ==="B"?
		                			<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
				                		<GridContainer>
						                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
						                	<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
						                    </GridItem>
						                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							                  <CustomInput
							                        validtype="text"
								                    required={true}
								                    feedback={type ==="B"?"shipper_b":"shipper"}
									                labelText=""
									                maxLength="35"
								                formControlProps={{
								                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								                }}
								                inputProps={{
								                	value:shpBodyData.shipper_bookmark_name?shpBodyData.shipper_bookmark_name:'',
										           onChange: handleShpChange('shipper_bookmark_name'),
										           onBlur: (e)=>e.target.value?props.mergeShpProps(shpBodyData):null,
								                  style:{height:'30px'}
								                }}
							    	  		/>
						                  </GridItem>
						               </GridContainer>
						              </GridItem>:<></>
		                	}<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
		                		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                	<InputLabel style={{ color: "#AAAAAA" }}>Name1</InputLabel>
				                    </GridItem>
				                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                    validtype="text"
						                    required={type ==="B"?false:true}
					                        feedback={type ==="B"?"shipper_b":"shipper"}
							                labelText=""
							                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                	value:shpBodyData.shp_name1?shpBodyData.shp_name1:'',
								           onChange: handleShpChange('shp_name1'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_name1)?store.setSr({shp_name1:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
		                	</GridItem>
		                	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                	<InputLabel style={{ color: "#AAAAAA" }}>Name2</InputLabel>
				                    </GridItem>
				                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                    validtype="text"
						                    required={false}
					                        feedback={type ==="B"?"shipper_b":"shipper"}
							                labelText=""
							                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:shpBodyData.shp_name2?shpBodyData.shp_name2:'',
								           onChange: handleShpChange('shp_name2'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_name2)?store.setSr({shp_name2:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem>
		                	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                	<InputLabel style={{ color: "#AAAAAA" }}>Address1</InputLabel>
				                    </GridItem>
				                  <GridItem  className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                    validtype="text"
					                    required={type ==="B"?false:true}
					                    feedback={type ==="B"?"shipper_b":"shipper"}
						                labelText=""
						                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:shpBodyData.shp_address1?shpBodyData.shp_address1:'',
								           onChange: handleShpChange('shp_address1'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_address1)?store.setSr({shp_address1:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					                    
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem> 
			            	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                	<InputLabel style={{ color: "#AAAAAA" }}>Address2</InputLabel>
				                    </GridItem>
				                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                    validtype="text"
						                    required={false}
					                        feedback={type ==="B"?"shipper_b":"shipper"}
							                labelText=""
							                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:shpBodyData.shp_address2?shpBodyData.shp_address2:'',
								           onChange: handleShpChange('shp_address2'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_address2)?store.setSr({shp_address2:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem> 
			            	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                	<InputLabel style={{ color: "#AAAAAA" }}>Address3</InputLabel>
				                    </GridItem>
				                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                    validtype="text"
						                    required={false}
					                        feedback={type ==="B"?"shipper_b":"shipper"}
							                labelText=""
							                maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:shpBodyData.shp_address3?shpBodyData.shp_address3:'',
								           onChange: handleShpChange('shp_address3'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_address3)?store.setSr({shp_address3:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem>
			            	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                	<InputLabel style={{ color: "#AAAAAA" }}>Address4</InputLabel>
				                    </GridItem>
				                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                  	validtype="text"
							            required={false}
					                    feedback={type ==="B"?"shipper_b":"shipper"}
								        labelText=""
								        maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:shpBodyData.shp_address4?shpBodyData.shp_address4:'',
								           onChange: handleShpChange('shp_address4'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_address4)?store.setSr({shp_address4:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
			            	</GridItem>
			            	<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Address5</InputLabel>
				                    </GridItem>
				                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  <CustomInput
					                    validtype="text"
						                required={false}
					                    feedback={type ==="B"?"shipper_b":"shipper"}
							            labelText=""
							            maxLength="35"
						                formControlProps={{
						                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
						                }}
						                inputProps={{
						                   value:shpBodyData.shp_address5?shpBodyData.shp_address5:'',
								           onChange: handleShpChange('shp_address5'),
								           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_address5)?store.setSr({shp_address5:e.target.value}):null,
						                  style:{height:'30px'}
						                }}
					    	  		/>
				                  </GridItem>
				               </GridContainer>
				            </GridItem>
				        </GridContainer>
				        {type ==="C"?
				         <>
				        	<Divider className={classes.divider}/>
				             <GridContainer>
					                  <GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
						            		<GridContainer>
							                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							                		<InputLabel style={{ color: "#AAAAAA" }}>User Name</InputLabel>
							                    </GridItem>
							                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
								                  <CustomInput
								                    validtype="text"
									                required={false}
								                    feedback={type ==="B"?"shipper_b":"shipper"}
										            labelText=""
										            maxLength="35"
									                formControlProps={{
									                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
									                }}
									                inputProps={{
									                   value:shpBodyData.shp_user_name?shpBodyData.shp_user_name:'',
											           onChange: handleShpChange('shp_user_name'),
											           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_user_name)?store.setSr({shp_user_name:e.target.value}):null,
									                  style:{height:'30px'}
									                }}
								    	  		/>
							                  </GridItem>
							               </GridContainer>
				            	      </GridItem>
				            	      <GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					            		<GridContainer>
						                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
						                		<InputLabel style={{ color: "#AAAAAA" }}>Tel Number</InputLabel>
						                    </GridItem>
						                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							                  <CustomInput
							                    validtype="text"
								                required={false}
							                    feedback={type ==="B"?"shipper_b":"shipper"}
									            labelText=""
									            maxLength="35"
								                formControlProps={{
								                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								                }}
								                inputProps={{
								                   value:shpBodyData.shp_user_tel?shpBodyData.shp_user_tel:'',
										           onChange: handleShpChange('shp_user_tel'),
										           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_user_tel)?store.setSr({shp_user_tel:e.target.value}):null,
								                  style:{height:'30px'}
								                }}
							    	  		/>
						                  </GridItem>
						               </GridContainer>
				            	      </GridItem>
				            	      <GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					            		<GridContainer>
						                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
						                		<InputLabel style={{ color: "#AAAAAA" }}>Code</InputLabel>
						                    </GridItem>
						                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							                  <CustomInput
							                    validtype="text"
								                required={false}
							                    feedback={type ==="B"?"shipper_b":"shipper"}
									            labelText=""
									            maxLength="35"
								                formControlProps={{
								                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								                }}
								                inputProps={{
								                   value:shpBodyData.shp_code?shpBodyData.shp_code:'',
										           onChange: handleShpChange('shp_code'),
										           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_code)?store.setSr({shp_code:e.target.value}):null, 
								                  style:{height:'30px'}
								                }}
							    	  		/>
						                  </GridItem>
						               </GridContainer>
				            	      </GridItem>
				            	      <GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					            		<GridContainer>
						                	<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
						                		<InputLabel style={{ color: "#AAAAAA" }}>Country</InputLabel>
						                    </GridItem>
						                  <GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							                  <CustomInput
							                    validtype="text"
								                required={false}
							                    feedback={type ==="B"?"shipper_b":"shipper"}
									            labelText=""
									            maxLength="35"
								                formControlProps={{
								                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								                }}
								                inputProps={{
								                   value:shpBodyData.shp_country_code?shpBodyData.shp_country_code:'',
										           onChange: handleShpChange('shp_country_code'),
										           onBlur: (e)=>('B'===type || 'C'===type)?props.mergeShpProps(shpBodyData):e.target.value && (e.target.value !== store.sr.shp_country_code)?store.setSr({shp_country_code:e.target.value}):null,
								                  style:{height:'30px'}
								                }}
							    	  		/>
						                  </GridItem>
						               </GridContainer>
			            	      </GridItem>
			                       </GridContainer>
			                       </>:<></>}
				   </GridItem>
			);
		}
//));
//export default ShipperBody;

export default React.memo(observer(ShipperBody),areEqual);

function areEqual(prevProps,nextProps) { 
	return (  ('C'=== nextProps.type||'B'=== nextProps.type)?(prevProps.bodyProps === nextProps.bodyProps):(prevProps.shpProps.shp_name1 === nextProps.shpProps.shp_name1
			&& prevProps.shpProps.shp_name2 === nextProps.shpProps.shp_name2
			&& prevProps.shpProps.shp_address1 === nextProps.shpProps.shp_address1
			&& prevProps.shpProps.shp_address2 === nextProps.shpProps.shp_address2
			&& prevProps.shpProps.shp_address3 === nextProps.shpProps.shp_address3
			&& prevProps.shpProps.shp_address4 === nextProps.shpProps.shp_address4
			&& prevProps.shpProps.shp_address5 === nextProps.shpProps.shp_address5
			&& prevProps.shpProps.shp_user_name === nextProps.shpProps.shp_user_name
			&& prevProps.shpProps.shp_user_tel === nextProps.shpProps.shp_user_tel
			&& prevProps.shpProps.shp_code === nextProps.shpProps.shp_code 
			&& prevProps.shpProps.shp_country_code === nextProps.shpProps.shp_country_code));
}
 
/*export default React.memo(ShipperBody, (prevProps,nextProps) =>  
		prevProps.shipper_bookmark_name === nextProps.shipper_bookmark_name 
		&& prevProps.shp_name1 === nextProps.shp_name1
		&& prevProps.shp_name2 === nextProps.shp_name2
		&& prevProps.shp_address1 === nextProps.shp_address1
		&& prevProps.shp_address2 === nextProps.shp_address2
		&& prevProps.shp_address3 === nextProps.shp_address3
		&& prevProps.shp_address4 === nextProps.shp_address4
		&& prevProps.shp_address5 === nextProps.shp_address5
		&& prevProps.shp_user_name === nextProps.shp_user_name
		&& prevProps.shp_user_tel === nextProps.shp_user_tel
		&& prevProps.shp_code === nextProps.shp_code 
		&& prevProps.shp_country_code === nextProps.shp_country_code);*/
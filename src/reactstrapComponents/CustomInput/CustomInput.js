import React from 'react';
import Select from "react-select";
import {Label,Input,InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import ReactDatetime from "react-datetime";

export {
    CustomInput,
    CustomSelect,
    CustomDatePicker
}

function CustomInput (props) {
    const {title,placeholder,name,id,optionData,labelProps,inputProps,value,onChange} = props;
    return (
        <>
            {title !== undefined? (
            <Label {...labelProps}>{title}</Label> 
            ):null}
            <Input type="text" name={name} id={id} placeholder={placeholder} {...inputProps} onChange={onChange} value={value}/>   
        </>
    );
}

function CustomSelect (props) {
    const {title,placeholder,name,id,optionData,labelProps,inputProps,onChange,value} = props;
    return (
        <>
            {title !== undefined? (
            <Label {...labelProps}>{title}</Label>
            ):null}
            <Select
            className="react-select react-select-primary"
            classNamePrefix="react-select"
            name={name}
            value={value}
            onChange={onChange}
            options={optionData}
            placeholder={placeholder}
          />

        </>
    );
}

function CustomDatePicker (props) {
    const {title,dateFormat,timeFormat,value,id,optionData,labelProps,inputProps,onChange} = props;
    const dateTimeDiv = React.createRef();
    return (
        <>
            {title !== undefined? (
            <Label {...labelProps}>{title}</Label>
            ):null}
            <InputGroup className="date" id={id}>
                <ReactDatetime
                    dateFormat={dateFormat}
                    timeFormat={timeFormat}
                    value={value}
                	onChange={onChange}
                    closeOnSelect={true}
                    inputProps = {{ref:dateTimeDiv}}
                    {...inputProps}
                />
                <InputGroupAddon addonType="append">
                    <InputGroupText onClick={()=>dateTimeDiv.current.click()}>
                        <span className="glyphicon glyphicon-calendar" >
                            <i className="fa fa-calendar" />
                        </span>
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </>
    );
}


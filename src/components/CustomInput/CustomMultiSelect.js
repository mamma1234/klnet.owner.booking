import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete,{createFilterOptions} from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {Checkbox} from "@material-ui/core";


const MultiSelect = ({
	items,
	selectedValues,
	label,
	placeholder,
	selectAllLabel,
	noOptionsText,
	limitTags,
	onToggleOption,
	onClearOptions,
	onSelectAll,
	getOptionLabel
}) => {
	const allSelected = items.length === selectedValues.length;
	const handleToggleSelectAll = () => {
		onSelectAll && onSelectAll(!allSelected);
	};
	
	const handleChange = (event,selectedOptions,reason) => {
		if(reason === "select-option" || reason === "remove-option") {
			if(selectedOptions.find(option => option.value === "select-all")) {
				handleToggleSelectAll();
			} else {
				onToggleOption && onToggleOption(selectedOptions);
			}
		} else if (reason === "clear") {
			onClearOptions && onClearOptions();
		}
	};
	const optionRenderer = (option, {selected}) => {
		const selectAllProps = option.value === "select-all"? {checked: allSelected}:{};
		return (
			<>
				<Checkbox
					color="default"
					icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
					checkedIcon = {<CheckBoxIcon fontSize="small" />}
					style={{ marginRight: 8}}
					checked={selected}
					{...selectAllProps}
				/>
				{getOptionLabel(option)}
			</>
		);
	};
					
	const inputRenderer = params => (
			<TextField {...params} label={label} placeholder={placeholder} variant="outlined" />
	);
	const getOptionSelected = (option,anotherOption) => option.value === anotherOption.value;
	const filter = createFilterOptions();
	return (
			<Autocomplete
				multiple
				size="small"
				limitTags={limitTags}
			    options={items?items:[]}
			    value={selectedValues}
			    disableCloseOnSelect
			    getOptionLabel={getOptionLabel}
			    getOptionSelected={getOptionSelected}
			    noOptionText={noOptionsText}
			    filterOptions={(options,params) => {
			    	const filtered = filter(options,params);
			    	return [{label: selectAllLabel, value: "select-all"}, ...filtered];
			    }}
				onChange={handleChange}
			    renderOption={optionRenderer}
				renderInput={inputRenderer}
			/>
			);
};

MultiSelect.defaultProps = {
	limitTags: 1,
	items: [],
	selectedValues: [],
	getOptionLabel: value => value
};


export default MultiSelect;
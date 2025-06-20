import React from "react";
import Select from "react-select";
import { FormGroup } from "reactstrap";

const SelectField = ({
  id,
  inputId,
  isMulti = false,
  closeMenuOnSelect = true,
  hideSelectedOptions = true,
  options = [],
  value,
  onChange,
  onMenuOpen,
  onInputChange,
  isLoading = false,
  isClearable = false,
  placeholder = "Select...",
  noOptionsMessage,
  styles = {},
  components = {},
}) => {
  return (
    <FormGroup>
      <Select
        id={id}
        inputId={inputId}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        hideSelectedOptions={hideSelectedOptions}
        options={options}
        value={value}
        onChange={onChange}
        onMenuOpen={onMenuOpen}
        onInputChange={onInputChange}
        isLoading={isLoading}
        isClearable={isClearable}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
        styles={styles}
        components={components}
      />
    </FormGroup>
  );
};

export default SelectField;

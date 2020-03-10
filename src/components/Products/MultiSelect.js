import React from 'react';
import Select from 'react-select';

const MultiSelect = ({
  options,
  value,
  onBlur
}) => (
  <Select
    options={options}
    isMulti
    value={options ? options.filter(option => value.includes(option.value)) : []}
    onBlur={onBlur}
  />
);

export default MultiSelect;

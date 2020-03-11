import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';

const MultiSelect = ({
  options,
  value,
  onBlur,
  onChange,
  invalid,
}) => (
  <Select
    options={options}
    onChange={onChange}
    isMulti
    value={options ? options.filter(option => value.includes(option.value)) : []}
    onBlur={onBlur}
    className={classNames({
      'is-invalid': invalid,
    })}
    styles={{
      control: (style, state) => {
        // TODO: Find better solution
        const borderColor = state.selectProps.className === 'is-invalid' ? 'red' : 'hsl(0,0%,80%)';

        return { ...style, borderColor };
      },
    }}
  />
);

export default MultiSelect;

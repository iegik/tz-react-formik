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
    invalid={invalid}
    className={classNames({
      'is-invalid': invalid,
    })}
    styles={{
      control: (style, state) => {
        if (state.selectProps.invalid) {
          state.theme.colors = {
            ...state.theme.colors,
            primary: "#dc3545",
            primary50: "#FFBDAD",
          }

          return {
            ...style,
            borderColor: state.theme.colors.primary,
            boxShadow: state.isFocused ? `0 0 0 0.2rem rgba(220,53,69,.25)` : null
          };
        }

        state.theme.colors = {
          ...state.theme.colors,
          primary: "#2684FF",
          primary50: "#B2D4FF",
          danger: "#dc3545",
          dangerLight: "#FFBDAD",
        }

        return {
          ...style,
          borderColor: state.theme.colors.neutral20,
          boxShadow: state.isFocused ? `0 0 0 0.2rem rgba(0,123,255,.25)` : null
        };
      },
    }}
  />
);

export default MultiSelect;

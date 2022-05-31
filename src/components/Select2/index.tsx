import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Select({
  name,
  setSelectedOption,
  selectedOption,
  ...rest
}: Props) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <div>
      <ReactSelect
        placeholder="Selecione"
        defaultValue={defaultValue}
        onChange={setSelectedOption}
        selectedOption={selectedOption}
        value={selectedOption}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </div>
  );
}

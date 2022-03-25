import React, { ChangeEvent } from 'react';

interface IType {
  id: number;
  value: string;
  label: string;
}

interface IProps {
  title: string;
  data: IType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  change: (event: ChangeEvent<HTMLSelectElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Selects({ title, data, value, change }: IProps): JSX.Element {
  return (
    <div className="flex flex-col text-sm">
      <span className="font-medium text-gray-700">{title}</span>
      <select
        className="px-2 font-light text-grayTextBase space-x-2 border text-gray-500  h-10 bg-white text-light box-border t border-color rounded-lg
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
        id="idAction"
        name="action"
        value={value}
        onChange={change}
      >
        <option
          value="0"
          className="font-light text-light bg-white"
          disabled
          selected
        >
          Selecione
        </option>
        {data.map(type => (
          <option
            className="bg-white text-black"
            key={type.id}
            value={type.value}
          >
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export { Selects };

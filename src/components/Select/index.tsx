import React, { ChangeEvent } from 'react';

interface IType {
  id: number;
  key: string;
  name: string;
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
function Select({ title, data, value, change }: IProps) {
  return (
    <div className="flex flex-col text-sm">
      <span className="font-medium">{title}</span>
      <select
        className="px-2 font-light text-grayTextBase space-x-2 border  h-9 bg-white text-light box-border t border-color rounded-lg
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
            value={type.key}
          >
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export { Select };

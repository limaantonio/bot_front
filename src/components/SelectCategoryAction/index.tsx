import React, { ChangeEvent } from 'react';

interface IAction {
  id: string;
  name: string;
  description: string;
}

interface IProps {
  title: string;
  data: IAction[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  change: (event: ChangeEvent<HTMLSelectElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function SelectCategoryAction({
  title,
  data,
  value,
  change,
}: IProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-gray-700">{title}</span>
      <select
        className="px-2 font-light text-grayTextBase space-x-2 border text-gray-500  h-9 bg-white text-light box-border t border-color rounded-lg
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
        id="idAction"
        name="action"
        value={value}
        onChange={change}
      >
        <option value="0" className="font-light text-light" disabled selected>
          Selecione
        </option>
        {data.map(type => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SelectCategoryAction };

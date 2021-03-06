import React, { ChangeEvent } from 'react';

interface ISubjectStudent {
  id: string;
  code: string;
  name: string;
  semester: string;
  student: IStudent;
}

interface IStudent {
  id: number;
  name: string;
}

interface IProps {
  title: string;
  data: ISubjectStudent[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  change: (event: ChangeEvent<HTMLSelectElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function SelectStudent({ title, data, value, change }: IProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-gray-700">{title}</span>
      <select
        className="px-2 font-light text-grayTextBase space-x-2 border  h-9 bg-white text-light box-border t border-color rounded-lg
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
        id="idAction"
        name="action"
        value={value}
        onChange={change}
        defaultValue="0"
      >
        <option value="0" className="font-light text-light" disabled selected>
          Selecione
        </option>
        {data.map(type => (
          <option key={type.id} value={type.name}>
            {type.student.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SelectStudent };

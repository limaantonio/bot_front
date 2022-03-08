import React, {ChangeEvent} from 'react';

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
    value: any;
    change: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectStudent ({title, data, value, change}: IProps) {

    return (
        <div className="flex flex-col">
        <span className="font-medium">{title}</span>
          <select
            className="px-2  text-grayTextBase space-x-2 border  h-10 bg-white text-sm sm:text-base box-border t border-color rounded-lg
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
            id="idAction"
            name="action"
            value={value}
            onChange={change}
            defaultValue='0'
          >
            <option value="0" className="text-base" disabled selected>
              Selecione
            </option>
            {data.map((type) => (
              <option key={type.id} value={type.name}>
                {type.student.name}
              </option>
            ))}
          </select>
      </div>
    )
}

export {SelectStudent};
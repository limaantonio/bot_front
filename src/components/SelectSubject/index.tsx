import React, {ChangeEvent} from 'react';

interface ISubject {
  id: string;
  code: string;
  name: string;
  semester: string;
}

interface IProps {
    title: string;
    data: ISubject[];
    value: any;
    change: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectSubject ({title, data, value, change}: IProps) {

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
           
          >
            <option value="0" className="text-base" disabled selected>
              Selecione
            </option>
            {data.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
      </div>
    )
}

export {SelectSubject};
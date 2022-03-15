import { SelectorIcon } from '@heroicons/react/solid';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface IStudent {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  img_url: string;
}

interface IList {
  data: IStudent[];
}
export default function List({ data }: IList): JSX.Element {
  return (
    <div className="flex flex-col border rounded-t-2">
      <div className=" p-2 w-full flex flex-row items-start  relative border-b">
        <span>Alunos</span>
        <span className="absolute right-12">Nota</span>
      </div>
      <ul
        className="
       rounded-b h-32 overflow-auto  "
      >
        {data.map(student => (
          <li className="h-2/6 flex flex-row items-center hover:bg-indigo-500 hover:text-white p-2 cursor-pointer ">
            <button
              type="button"
              className="flex flex-row items-center space-x-2"
            >
              {student.img_url ? (
                <img
                  src={student.img_url}
                  alt=""
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
              ) : (
                <FaUserCircle className="flex-shrink-0 h-6 w-6 rounded-full" />
              )}

              <span>{student.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

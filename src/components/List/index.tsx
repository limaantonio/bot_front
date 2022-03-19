/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import { SelectorIcon } from '@heroicons/react/solid';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface IStudent {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  img_url: string;
}

interface ILesson {
  id: string;
  title: string;
  description: string;
  student_lesson: IStudentLesson[];
}

interface IStudentLesson {
  id: string;
  status: string;
  score: number;
  student: IStudent;
  lesson: ILesson;
}

interface IProps {
  data: IStudentLesson[];
  title: string;
}
export default function List({ data, title }: IProps): JSX.Element {
  return (
    <>
      <h1>{title}</h1>
      <div className="flex flex-col border rounded-t-2">
        <div className=" p-2 w-full flex flex-row items-center justify-center relative border-b">
          <span className="w-2/6">Alunos</span>
          <span className="w-2/6">Aula</span>
          <span className="w-1/6">Status</span>
        </div>
        <ul
          className="
       rounded-b h-20 overflow-auto"
        >
          {data.map(studentLesson => (
            <li className="flex flex-row items-center hover:bg-indigo-500 hover:text-white p-2 cursor-pointer">
              <button
                type="button"
                className="flex flex-row items-center space-x-2 justify-center"
              >
                {studentLesson?.student.img_url ? (
                  <div className="flex flex-row space-x-2">
                    <img
                      src={studentLesson?.student.img_url}
                      alt=""
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className="w-2/6">{studentLesson?.student.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-row space-x-2">
                    <FaUserCircle className="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span className="w-2/6">{studentLesson?.student.name}</span>
                  </div>
                )}

                <span className="w-3/6">{studentLesson?.lesson.title}</span>
                <span className="w-1/6">{studentLesson?.status}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

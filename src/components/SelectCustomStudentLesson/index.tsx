/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import React, { Fragment, useState, ChangeEvent } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaUserCircle } from 'react-icons/fa';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
  title: string;
  data: IStudentLesson[];
  v: IStudentLesson | undefined;
  change: any;
}

export default function SelectCustomStudentLesson({
  title,
  data,
  change,
  v,
}: IProps): JSX.Element {
  return (
    <Listbox value={v} onChange={change}>
      {({ open }) => (
        <div className="flex flex-row items-center w-full">
          <Listbox.Label className="text-sm w-7/12 font-medium text-gray-700">
            {title}
          </Listbox.Label>
          <div className="mt-1 relative w-full">
            <Listbox.Button className="relative  w-full h-12 bg-white border border-gray-300 rounded-md shadow-sm  p-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {v?.student.img_url ? (
                <span className="flex items-center px-2 ">
                  <img
                    src={v?.student.img_url}
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                  <div>
                    <span className="ml-3 block truncate">
                      {v?.student.name}
                    </span>
                    <span className="ml-3 block truncate text-xs text-gray-400">
                      {v?.lesson.title}
                    </span>
                  </div>
                </span>
              ) : v?.student.name && !v?.student.img_url ? (
                <span className="flex items-center px-2">
                  <FaUserCircle className="flex-shrink-0 h-6 w-6 rounded-full" />
                  <div>
                    <span className="ml-3 block truncate">
                      {v?.student.name}
                    </span>
                    <span className="ml-3 block truncate text-xs text-gray-400">
                      {v?.lesson.title}
                    </span>
                  </div>
                </span>
              ) : (
                <></>
              )}
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data.map(person => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {person.student.img_url ? (
                            <img
                              src={person.student.img_url}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                          ) : (
                            <FaUserCircle className="flex-shrink-0 h-6 w-6 rounded-full" />
                          )}

                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            )}
                          >
                            {person.student.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

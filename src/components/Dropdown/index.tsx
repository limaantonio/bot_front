import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BiUser, BiExit } from 'react-icons/bi';
import { BsListCheck } from 'react-icons/bs';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div className="w-34 h-10 flex flex-row items-center">
            <Menu.Button
              className=" flex items-center sm:bg-op sm:bg-opacity-24
              space-x-2 sm:rounded-md rounded-full
              font-light
             "
            >
              <img
                className="w-10 h-10 rounded-full"
                alt=""
                src="https://mylms.s3.amazonaws.com/1067479ce8e86f2a06170b517e673f29-Necio-De-Lima-Veras.jpg"
              />
              <span className="text-white">Professor</span>
              <FiChevronDown
                className="-mr-1 hidden sm:flex ml-2 h-5 w-5  right-2 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right z-10  absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/configs"
                      className={classNames(
                        active
                          ? 'border-l-4 border-blue-600  w-full bg-gray-100 text-gray-900'
                          : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      <div className="flex flex-row items-center space-x-2">
                        <BiUser className=" w-4 h-4" />
                        <span>Perfil</span>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/configs"
                      className={classNames(
                        active
                          ? 'border-l-4 border-blue-600  w-full bg-gray-100 text-gray-900'
                          : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      <div className="flex flex-row items-center space-x-2">
                        <BiExit className=" w-4 h-4" />
                        <span>Sair</span>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { BsListCheck } from 'react-icons/bs';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function DropdownDetail({
  onOpenNewTransactionModal,
}: HeaderProps): JSX.Element {
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className=" flex items-center sm:bg-op sm:bg-opacity-24
              space-x-2 sm:rounded-md rounded-full
              font-light
             "
            >
              <img className="w-10" alt="" />
              <AiOutlineMore
                className="-mr-1 hidden sm:flex ml-2 h-5 w-5 absolute right-2"
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
              className="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        <BsListCheck className=" w-4 h-4" />
                        <span>Suas configurações</span>
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

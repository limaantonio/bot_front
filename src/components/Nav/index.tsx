/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { FiHome } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';

function Nav() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="flex flex-row w-full items-center justify-center flex-wrap bg-indigo-600 fixed-top">
      <div className="w-10/12 flex flex-row items-center relative">
        {/* <Link to="/">
          <a className="inline-flex items-center px-2 mr-4 ">
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Logo
            </span>
          </a>
        </Link> */}
        <button
          className=" inline-flex p-3 hover:bg-indigo-600 lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex  lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3  text-white font-light items-center justify-center  border-b-4 border-indigo-600 hover:border-green-500 hover:text-white ">
                Home
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3  text-white font-light items-center justify-center  border-b-4 border-indigo-600 hover:border-green-500 hover:text-white ">
                Acompanamento
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3  text-white font-light items-center justify-center  border-b-4 border-indigo-600 hover:border-green-500 hover:text-white ">
                Relatórios
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3  text-white font-light items-center justify-center  border-b-4 border-indigo-600 hover:border-green-500 hover:text-white ">
                Ajuda
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute right-0">
          <Dropdown />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
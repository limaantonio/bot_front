/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Nav() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav
        style={{ zIndex: 0 }}
        className="flex flex-row w-full items-center flex-wrap bg-black p-2 fixed"
      >
        <Link to="/">
          <a className="inline-flex items-center px-2 mr-4 ">
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Logo
            </span>
          </a>
        </Link>
        <button
          className=" inline-flex p-3 hover:bg-black rounded lg:hidden text-white ml-auto hover:text-white outline-none"
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
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover: bg-blue-700 hover:text-white ">
                Home
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-blue-700 hover:text-white">
                Services
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-blue-700 hover:text-white">
                About us
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-blue-700 hover:text-white">
                Contact us
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

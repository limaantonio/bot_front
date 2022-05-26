/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { AiFillRobot } from 'react-icons/ai';

import { FiHome } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';

function Nav(): JSX.Element {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="flex flex-row w-full items-center justify-center bg-indigo-600 flex-wrap shadow fixed-top">
      <div className="w-10/12 flex flex-row items-center relative">
        {/* <Link to="/">
          <a className="inline-flex items-center px-2 mr-4 ">
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Logo
            </span>
          </a>
        </Link> */}

        {/* Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link
              className="flex flex-row items-center border-b-4 border-indigo-600 hover:border-white "
              to="/"
            >
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3  text-white  font-medium text-2xl items-center justify-center   ">
                Arley bot
              </a>
            </Link>

            {/* <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3   font-light items-center justify-center  border-b-4 border-indigo-600 hover:border-green-500 hover:text-white ">
                Relatórios
              </a>
            </Link>
            <Link to="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-3   font-light items-center justify-center  border-b-4 border-indigo-600 hover:border-green-500 hover:text-white ">
                Ajuda
              </a>
            </Link> */}
          </div>
        </div>
        {/* <div className="absolute right-0">
          <Dropdown />
        </div> */}
      </div>
    </nav>
  );
}

export default Nav;

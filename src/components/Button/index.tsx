import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface IHeaderProps {
  openModal: () => void;
}

const Button: React.FC<IHeaderProps> = ({ openModal }) => (
  <button
    style={{ zIndex: 0 }}
    className="flex flex-row p-3 space-x-2 text-black rounded-lg cursor-pointer
      transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 bg-indigo-600 hover:bg-indigo-800 duration-300"
    type="button"
    onClick={() => {
      openModal();
    }}
  >
    {' '}
    <div className="icon">
      <AiOutlinePlusCircle className="text-white" size={24} />
    </div>
    <div className="text-white">Nova ação</div>
  </button>
);

export default Button;

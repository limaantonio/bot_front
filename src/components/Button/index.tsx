import React from 'react';
import { FiPlusSquare } from 'react-icons/fi';

interface IHeaderProps {
  openModal: () => void;
}

const Button: React.FC<IHeaderProps> = ({ openModal }) => (
  <button
    className="flex flex-row p-3 space-x-2 text-white rounded-lg cursor-pointer
      transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 bg-green-500 hover:bg-green-400 duration-300"
    type="button"
    onClick={() => {
      openModal();
    }}
  >
    <div className="text">Configurar nova ação</div>
    <div className="icon">
      <FiPlusSquare size={24} />
    </div>
  </button>
);

export default Button;

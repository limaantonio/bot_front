import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';

interface IActionPlate {
  _id: number;
  name: string;
  description: string;
  context: string;
  numberDays: number;
  available: boolean;
}

interface IProps {
  action: IActionPlate;
  handleDelete: (id: number) => {};
  handleEditAction: (action: IActionPlate) => void;
}

const Action: React.FC<IProps> = ({
  action,
  handleDelete,
  handleEditAction,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(action.available);

  async function toggleAvailable(): Promise<void> {
    await api.put(`action/${action._id}`, {
      id: action._id,
      name: action.name,
      description: action.description,
      context: action.context,
      numberDays: action.numberDays,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingaction(): void {
    handleEditAction(action);
  }

  return (
    <div  className="bg-white text-sm p-4 flex flex-row items-center relative border font-light h-14">
        <h2 className="w-3/12 text-left">{action.name}</h2>
        <p className="w-3/12 text-left">{action.description}</p>
        <span className="w-3/12 text-center">{action.context}</span>

        <div className="w-3/12 text-center space-x-2">
          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-blue-400 duration-300"
            onClick={() => setEditingaction()}
            data-testid={`edit-action-${action._id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-red-400 duration-300"
            onClick={() => handleDelete(action._id)}
            data-testid={`remove-action-${action._id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
        
  

        {/* <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${action.id}`} className="switch">
            <input
              id={`available-switch-${action.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-action-${action.id}`}
            />
            <span className="slider" />
          </label>
        </div> */}
    
    </div>
  );
};

export default Action;

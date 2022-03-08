import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';

interface ICategoryActionPlate {
  _id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
  available: boolean
}

interface IProps {
  action: ICategoryActionPlate;
  handleDelete: (id: number) => {};
  handleEditAction: (action: ICategoryActionPlate) => void;
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
     title: action.title,
      deadline: action.deadline,
      passing_score: action.passing_score,
      dt_complete_class: action. dt_complete_class,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingaction(): void {
    handleEditAction(action);
  }

  return (
    <div  className="bg-white text-sm p-4 flex flex-row items-center relative border font-light h-14">
        <h2 className="w-3/12 text-left">{action.title}</h2>
        <p className="w-3/12 text-left">{action.deadline}</p>
        <span className="w-3/12 text-center">{action.passing_score}</span>
        <span className="w-3/12 text-center">{action.dt_complete_class}</span>

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
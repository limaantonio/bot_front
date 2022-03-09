import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import { format } from "date-fns";

interface IAction {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
  available: boolean
}

interface IProps {
  action: IAction;
  handleDelete: (id: number) => {};
  handleEditAction: (action: IAction) => void;
}

const Action: React.FC<IProps> = ({
  action,
  handleDelete,
  handleEditAction,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(action.available);

  async function toggleAvailable(): Promise<void> {
    await api.put(`action/${action.id}`, {
      id: action.id,
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
        <span className="w-3/12 text-left">{action.title}</span>
        <span className="w-3/12 text-left">{action.deadline}</span>
        <span className="w-3/12 text-center">{action.passing_score}</span>
        <span className="w-3/12 text-center">{format(new Date(action.dt_complete_class), "yyyy-MM-dd")}</span>

        <div className="w-3/12 text-center space-x-2">
          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-blue-400 duration-300"
            onClick={() => setEditingaction()}
            data-testid={`edit-action-${action.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-red-400 duration-300"
            onClick={() => handleDelete(action.id)}
            data-testid={`remove-action-${action.id}`}
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

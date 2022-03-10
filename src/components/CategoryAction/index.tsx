/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';

interface ICategoryActionPlate {
  _id: number;
  title: string;
  deadline: number;
  passingScore: number;
  dtCompleteClass: Date;
  available: boolean;
}

interface IProps {
  action: ICategoryActionPlate;
  handleDelete: (id: number) => void;
  handleEditAction: (action: ICategoryActionPlate) => void;
}

const Action: React.FC<IProps> = ({
  action,
  handleDelete,
  handleEditAction,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(action.available);

  async function toggleAvailable(): Promise<void> {
    // eslint-disable-next-line no-underscore-dangle
    await api.put(`action/${action._id}`, {
      // eslint-disable-next-line no-underscore-dangle
      id: action._id,
      title: action.title,
      deadline: action.deadline,
      passing_score: action.passingScore,
      dt_complete_class: action.dtCompleteClass,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingaction(): void {
    handleEditAction(action);
  }

  return (
    <div className="bg-white text-sm p-4 flex flex-row items-center relative border font-light h-14">
      <h2 className="w-3/12 text-left">{action.title}</h2>
      <p className="w-3/12 text-left">{action.deadline}</p>
      <span className="w-3/12 text-center">{action.passingScore}</span>
      <span className="w-3/12 text-center">{action.dtCompleteClass}</span>

      <div className="w-3/12 text-center space-x-2">
        <button
          type="button"
          className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-blue-400 duration-300"
          onClick={() => setEditingaction()}
          // eslint-disable-next-line no-underscore-dangle
          data-testid={`edit-action-${action._id}`}
        >
          <FiEdit3 size={20} />
        </button>

        <button
          type="button"
          className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-red-400 duration-300"
          // eslint-disable-next-line no-underscore-dangle
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

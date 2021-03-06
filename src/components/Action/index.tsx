/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';
import { AiFillFile, AiOutlineFile, AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BiCloudDownload } from 'react-icons/bi';
import api from '../../services/api';
import { Container } from './styles';
import Tooltip from '../Tooltip';

interface IAction {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
  content_url: string;
  task: string;
  category_action: string;
  active: boolean;
}

interface IProps {
  action: IAction;
  handleDelete: (id: number) => {};
  handleEditAction: (action: IAction) => void;
}

function Action({
  action,
  handleDelete,
  handleEditAction,
}: IProps): JSX.Element {
  const [isAvailable, setIsAvailable] = useState(action.active);

  async function toggleAvailable(): Promise<void> {
    await api.put(`action/${action.id}`, {
      id: action.id,
      title: action.title,
      deadline: action.deadline,
      passingScore: action.passing_score,
      dtCompleteClass: action.dt_complete_class,
      content_url: action.content_url,
      active: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingaction(): void {
    handleEditAction(action);
  }

  return (
    <Container active={isAvailable}>
      <div className=" bg-white text-sm p-4 flex flex-row items-center  relative border font-light h-14">
        <span className="w-3/12 text-center">{action.title}</span>

        {/* <span className="w-2/12 text-center">
          {format(new Date(action.deadline), 'yyyy-MM-dd')}
        </span> */}
        <span className="w-2/12 text-center">{action.deadline}</span>
        <span className="w-2/12 text-center">{action.passing_score}</span>
        <span className="w-2/12 text-center">
          {action.dt_complete_class ? (
            format(new Date(action.dt_complete_class), 'yyyy-MM-dd')
          ) : (
            <></>
          )}
        </span>
        {action.content_url ? (
          <div className="flex flex-row justify-center item-center text-center w-2/12">
            <a
              target="_blank"
              href={action.content_url}
              className=""
              rel="noopener noreferrer"
            >
              <BiCloudDownload className="h-6 w-6" />
            </a>
          </div>
        ) : (
          <div className="flex flex-row justify-center item-center text-center w-2/12">
            <BiCloudDownload className="h-6 w-6 text-gray-400" />
          </div>
        )}

        {/* 
        <div className="w-1/12 text-center space-x-2  flex flex-row items-center justify-center">
          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-blue-400 duration-300"
            onClick={() => setEditingaction()}
            data-testid={`edit-action-${action.id}`}
          >
            <FiEdit3 size={20} />
          </button>
        </div> */}
        <div className="w-2/12 text-center space-x-2  flex flex-row items-center justify-center">
          <section className="footer ">
            <div className="availability-container flex flex-row items-center space-x-2">
              <label
                htmlFor={`available-switch-${action.id}`}
                className="switch"
              >
                <input
                  id={`available-switch-${action.id}`}
                  type="checkbox"
                  checked={isAvailable}
                  onChange={toggleAvailable}
                  data-testid={`change-status-action-${action.id}`}
                />
                <span className="slider" />
              </label>
              <p>{isAvailable ? 'Ativo' : 'Inativo'}</p>
            </div>
          </section>
        </div>
        {/* <button
              type="button"
              className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-red-400 duration-300"
              onClick={() => handleDelete(action.id)}
              data-testid={`remove-action-${action.id}`}
            >
              <FiTrash size={20} />
            </button> */}
      </div>
    </Container>
  );
}

export default Action;

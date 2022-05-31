/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Action from '../../components/Action';
import ModalEditAction from '../../components/ModalEditAction';
import Tooltip from '../../components/Tooltip';
import api from '../../services/api';

interface IAction {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
  task: string;
  category_action: string;
  content_url: string;
  active: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Configs(): JSX.Element {
  const [actions, setActions] = useState<IAction[]>([]);
  const [editingAction, setEditingAction] = useState<IAction>({
    id: 0,
    title: '',
    deadline: 0,
    passing_score: 0,
    dt_complete_class: new Date(),
    task: '',
    category_action: '',
    content_url: '',
    active: true,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { id } = useParams();

  async function loadActions(): Promise<void> {
    const response = await api.get(`action?category_action_id=${id}`);

    setActions(response.data.listActions);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-shadow

    loadActions();
  }, [id]);

  console.log(actions);
  console.log(id);

  async function handleUpdateAction(
    action: Omit<IAction, 'id' | 'active'>,
  ): Promise<void> {
    const newActionList = actions.map(cAction => {
      if (cAction.id !== editingAction.id) {
        return cAction;
      }
      return {
        ...action,
        id: editingAction.id,
        active: editingAction.active,
      };
    });
    setActions(newActionList);
    await api.put(`/action/${editingAction.id}`, {
      ...action,
      id: editingAction.id,
      active: editingAction.active,
    });
  }

  // eslint-disable-next-line no-shadow
  async function handleDeleteAction(id: number): Promise<void> {
    await api.delete(`/action/${id}`);
    // eslint-disable-next-line no-shadow
    const listAction = actions.filter(Action => Action.id !== id);
    setActions(listAction);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  // eslint-disable-next-line no-shadow
  function handleEditAction(Action: IAction): void {
    setEditingAction(Action);
    toggleEditModal();
  }

  return (
    <div className=" flex flex-col items-center h-screen  fixed w-full ">
      <ModalEditAction
        isOpen={editModalOpen}
        // eslint-disable-next-line react/jsx-no-bind
        setIsOpen={toggleEditModal}
        editingAction={editingAction}
        // eslint-disable-next-line react/jsx-no-bind
        handleUpdateAction={handleUpdateAction}
      />
      <div className="flex flex-col items-left absolute  w-10/12 h-5/6 p-6  overflow-auto">
        <h1 className="font-semibold items-">Suas Configurações</h1>

        <div className="bg-white flex flex-row items-center p-4 mt-10 h-14">
          <h2 className="w-3/12 text-center">Título</h2>
          <div>
            <Tooltip
              text="Qtde. de dias após a conclusão da tarefa"
              className="w-1/6 h-1/6"
            >
              <AiOutlineInfoCircle />
            </Tooltip>
          </div>
          <h1 className="w-2/12 text-center">Qtde. dias</h1>
          <h1 className="w-2/12 text-center">Nota de Corte</h1>
          <h1 className="w-2/12 text-center">Data para entrega</h1>
          <h1 className="w-2/12 text-center">Conteúdo</h1>
          <h1 className="w-1/12 text-center">Editar</h1>
          <h1 className="w-2/12 text-center">Ativar</h1>
        </div>

        <div className="overflow-scroll">
          <div className=" rounded-md  h-full  " data-testid="actions-list">
            {actions.length ? (
              actions.map(action => (
                <Action
                  key={action.id}
                  action={action}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleDelete={handleDeleteAction}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleEditAction={handleEditAction}
                />
              ))
            ) : (
              <div className="flex flex-row border-2 border-white items-center justify-center">
                <p className="text-sm text-gray-400">Sem conteúdo</p>
              </div>
            )}
          </div>
        </div>
        <span className="mt-8">Total: {actions.length}</span>
      </div>
    </div>
  );
}

export default Configs;

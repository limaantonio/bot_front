/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Action from '../../components/Action';
import ModalEditAction from '../../components/ModalEditAction';
import api from '../../services/api';

interface IAction {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
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
    active: true,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-shadow
    async function loadActions(id: any): Promise<void> {
      const response = await api.get(`action?category_action_id=${id}`);

      setActions(response.data.listActions);
    }

    loadActions(id);
  }, [id]);

  async function handleUpdateAction(
    action: Omit<IAction, 'id' | 'available'>,
  ): Promise<void> {
    const newActionList = actions.map(cAction => {
      if (cAction.id !== editingAction.id) {
        return cAction;
      }
      return {
        ...action,
        id: editingAction.id,
        available: editingAction.active,
      };
    });
    setActions(newActionList);
    await api.put(`/action/${editingAction.id}`, {
      ...action,
      id: editingAction.id,
      available: editingAction.active,
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
          <h2 className="w-3/12 text-left">Conteúdo</h2>
          <h1 className="w-3/12 text-left">Dias</h1>
          <h1 className="w-3/12 text-center">Nota de Corte</h1>
          <h1 className="w-3/12 text-center">Data para entrega</h1>
          <h1 className="w-3/12 text-center">Editar/Ativar</h1>
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

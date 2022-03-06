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
  available: boolean;
 
 
}



function Configs () {
  const [actions, setActions] = useState<IAction[]>([]);
  const [editingAction, setEditingAction] = useState<IAction>(
    {
      id: 0,
      title: '',
      deadline: 0,
      passing_score: 0,
      dt_complete_class: new Date(),
      available: true,
     
    });
  const [editModalOpen, setEditModalOpen] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    async function loadActions(id: any): Promise<void> {
      const response = await api.get(`action?active=${true}&category_action_id=${id}`);

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
        available: editingAction.available,
      };
    });
    setActions(newActionList);
    await api.put(`/action/${editingAction.id}`, {
      ...action,
      id: editingAction.id,
      available: editingAction.available,
    });
  }

  async function handleDeleteAction(id: number): Promise<void> {
    await api.delete(`/action/${id}`);
    const listAction = actions.filter(Action => Action.id !== id);
    setActions(listAction);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditAction(Action: IAction): void {
    setEditingAction(Action);
    toggleEditModal();
  }

  return (
   <div>
   
       <div className="bg-gray-300 flex flex-col h-screen items-center">
     
       <div className="h-14 w-full bg-blue-500 p-6 items-center flex flex-row ">
         <Link to="/" className="flex flex-row items-center justify-center">
           <BsArrowLeftShort className="text-white w-8 h-8"/>
           <span className="text-white">Voltar</span>
         </Link>
        
       </div>
         <ModalEditAction
           isOpen={editModalOpen}
           setIsOpen={toggleEditModal}
           editingAction={editingAction}
           handleUpdateAction={handleUpdateAction}
         />
         <div className="flex flex-col items-left  w-full px-12 p-6">
            <h1 className="font-semibold items-">Suas Configurações</h1>

              <div className="bg-white flex flex-row items-center p-4 mt-10 h-14">
                <h2 className="w-3/12 text-left">Ação</h2>
                <h1 className="w-3/12 text-left">Dias</h1>
                <h1 className="w-3/12 text-center">Nota de Corte</h1>
                <h1 className="w-3/12 text-center">Data para entrega</h1>
                <h1 className="w-3/12 text-center"></h1>
              </div>

                <div className="overflow-scroll">
                    <div className=" rounded-md  h-full  " data-testid="actions-list">
                    {actions &&
                      actions.map(action => (
                        <Action
                          key={action.id}
                          action={action}
                          handleDelete={handleDeleteAction}
                          handleEditAction={handleEditAction}
                        />
                    ))}
                    </div>
              </div>
         </div>
       </div>
     )
   </div>
    
  );
};

export default Configs;

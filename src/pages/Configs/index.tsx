import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Action from '../../components/Action';
import ModalEditAction from '../../components/ModalEditAction';
import api from '../../services/api';

interface IAction {
  _id: number;
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
      _id: 0,
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
      if (cAction._id !== editingAction._id) {
        return cAction;
      }
      return {
        ...action,
        id: editingAction._id,
        available: editingAction.available,
      };
    });
    setActions(newActionList);
    await api.put(`/action/${editingAction._id}`, {
      ...action,
      id: editingAction._id,
      available: editingAction.available,
    });
  }

  async function handleDeleteAction(id: number): Promise<void> {
    await api.delete(`/action/${id}`);
    const listAction = actions.filter(Action => Action._id !== id);
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
         <Link to="/" className="">
         <BsArrowLeftShort className="text-white w-8 h-8"/>
         </Link>
       </div>
         <ModalEditAction
           isOpen={editModalOpen}
           setIsOpen={toggleEditModal}
           editingAction={editingAction}
           handleUpdateAction={handleUpdateAction}
         />
   
         <div className="bg-white flex flex-row items-center w-10/12 p-4 mt-10 h-14">
           <h2 className="w-3/12 text-center">Ação</h2>
           <h1 className="w-3/12 text-center">Dias</h1>
           <h1 className="w-3/12 text-center">Nota de Corte</h1>
           <h1 className="w-3/12 text-center">Data para entrega</h1>
         </div>
   
         <div className="overflow-scroll w-10/12">
           <div className=" rounded-md  h-full  " data-testid="actions-list">
           {actions &&
             actions.map(action => (
               <Action
                 key={action._id}
                 action={action}
                 handleDelete={handleDeleteAction}
                 handleEditAction={handleEditAction}
               />
           ))}
           </div>
         </div>
       </div>
     )
   </div>
    
  );
};

export default Configs;

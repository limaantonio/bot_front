import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface ICategoryAction {
    id: number;
    name: string;
    description: string;
    context: string;
  }

interface ICategoryActionProps {
    action: ICategoryAction;
   
}

export function CategoryAction ({action}: ICategoryActionProps) {
    const [actionsNumber, setActionsNumber] = useState(0);

    useEffect(() => {
        api.get(`action?active=${true}&category_action_id=${action.id}`).then((response) => {
            setActionsNumber(response.data.total);
        })
        
    },[]);

    return (
        <Link 
        className="relative bg-white p-6 mt-10 w-10/12 rounded-md shadow-md space-y-2 border hover:border-blue-500" 
        to={`/${action.id}`}>
            <h1 className="font-bold">{action.name}</h1>
            <p>{action.description}</p>
            <div className="flex flex-row relative">
                <span>#{action.context}</span>
                <span  className="absolute right-0 font-light">{actionsNumber} ações ativas</span>
                
            </div>
        {/* <div className="absolute right-0 top-0">
            <DropdownDetail onOpenNewTransactionModal={handleOpenNewTrasactionModalOpen}/>
        </div>    */}
        </Link>
    )
}


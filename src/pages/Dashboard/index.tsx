import React, { useEffect, useState } from 'react';
import DropdownDetail from '../../components/DropdownDetail';
import Header from '../../components/Header';
import api from '../../services/api';

interface IAction {
  id: number;
  name: string;
  description: string;
  context: string;
}

const Dashboard: React.FC = () => {
  const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] =
  useState(false);

  const [categoryActions, setCategoryActions] = useState<IAction[]>([]);

  function handleOpenNewTrasactionModalOpen() {
    setIsNewTrasactionModalOpen(true);
  }

  function handleCloseNewTrasactionModalOpen() {
    setIsNewTrasactionModalOpen(false);
  }

  useEffect(() => {
    api.get('/categoryAction').then(response => {
      setCategoryActions(response.data);
    })
  },[]);

 

  return (
    <>
     <Header/> 
    <div className="flex flex-col items-center relative space-y-2 bg-gray-300 h-screen">
      {categoryActions.map(action => {
        <div className="relative bg-white p-6 mt-10 w-10/12 rounded-md shadow-md space-y-2">
          <h1 className="font-bold">{action.name}</h1>
          <p>{action.description}</p>
          <div className="flex flex-row relative">
              <span>#{action.context}</span>
              <span className="absolute right-0 font-light">4 ações ativas</span>
          </div>

          <div className="absolute right-0 top-0">
            <DropdownDetail onOpenNewTransactionModal={handleOpenNewTrasactionModalOpen}/>
          </div>
        </div>
      })}
    </div>
    </>
  );
};

export default Dashboard;

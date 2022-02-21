import React, { useState } from 'react';
import DropdownDetail from '../../components/DropdownDetail';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] =
  useState(false);

  function handleOpenNewTrasactionModalOpen() {
    setIsNewTrasactionModalOpen(true);
  }

  function handleCloseNewTrasactionModalOpen() {
    setIsNewTrasactionModalOpen(false);
  }

  return (
    <>
     <Header/> 
    <div className="flex flex-col items-center relative space-y-2 bg-gray-300 h-screen">
     <div className="relative bg-white p-6 mt-10 w-10/12 rounded-md shadow-md space-y-2">
       <h1 className="font-bold">Feedback após as atividades</h1>
       <p>O aluno finalizou as atividades de uma aula invertida há x dias.</p>
       <div className="flex flex-row relative">
          <span>#recomendação</span>
          <span className="absolute right-0 font-light">4 ações ativas</span>
       </div>
     
       <div className="absolute right-0 top-0">
        <DropdownDetail onOpenNewTransactionModal={handleOpenNewTrasactionModalOpen}/>
      </div>
     </div>
     <div className="relative bg-white p-6 mt-10 w-10/12 rounded-md shadow-md space-y-2">
       <h1 className="font-bold">Feedback após as atividades</h1>
       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
       <span>It is a long established . </span>
       <div className="absolute right-0 top-0">
        <DropdownDetail onOpenNewTransactionModal={handleOpenNewTrasactionModalOpen}/>
      </div>
     </div>
     <div className="relative bg-white p-6 mt-10 w-10/12 rounded-md shadow-md space-y-2">
       <h1 className="font-bold">Feedback após as atividades</h1>
       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
       <span>It is a long established . </span>
       <div className="absolute right-0 top-0">
        <DropdownDetail onOpenNewTransactionModal={handleOpenNewTrasactionModalOpen}/>
      </div>
     </div>
     <div className="relative bg-white p-6 mt-10 w-10/12 rounded-md shadow-md space-y-2">
       <h1 className="font-bold">Feedback após as atividades</h1>
       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
       <span>It is a long established . </span>
       <div className="absolute right-0 top-0">
        <DropdownDetail onOpenNewTransactionModal={handleOpenNewTrasactionModalOpen}/>
      </div>
     </div>
    </div>
    </>
  );
};

export default Dashboard;

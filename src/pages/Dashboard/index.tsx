import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  {CategoryAction}  from '../../components/CategoryAction';
import DropdownDetail from '../../components/DropdownDetail';
import Header from '../../components/Header';
import api from '../../services/api';

interface ICategoryAction {
  id: number;
  name: string;
  description: string;
  context: string;
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Dashboard: React.FC = () => {
  const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] =
  useState(false);

  const [categoryActions, setCategoryActions] = useState<ICategoryAction[]>([]);

  function handleOpenNewTrasactionModalOpen() {
    setIsNewTrasactionModalOpen(true);
  }

  function handleCloseNewTrasactionModalOpen() {
    setIsNewTrasactionModalOpen(false);
  }

  useEffect(() => {
    api.get('/categoryAction').then(response => {
      setCategoryActions(response.data.categoryActions);
    })
  },[]);

  return (
    <>
     <Header/> 
    <div className="flex flex-col items-center relative bg space-y-2 bg-gray-300 mb-10">
      {categoryActions.map((action) => (
        <CategoryAction action={action}/>
      ))}
    </div>
    </>
  );
};

export default Dashboard;

/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { CategoryAction } from '../../components/CategoryAction';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import api from '../../services/api';
import Select2 from '../../components/Select2';

interface ICategoryAction {
  id: number;
  name: string;
  description: string;
  context: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Dashboard(): JSX.Element {
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
    });
  }, []);

  return (
    <div
      style={{ zIndex: 0 }}
      className="flex flex-col items-center h-screen  w-full justify-center top-14 fixed "
    >
      <div className="mb-10 overflow-auto relative  w-full">
        <Header />
        <div className="flex flex-col items-center w-full bg space-y-2  mb-10 ">
          {categoryActions.map(action => (
            <CategoryAction action={action} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { SiProbot } from 'react-icons/si';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Button from '../Button';
import Nav from '../Nav';
import NewActionModal from '../NewActionModal';

interface IAction {
  id: number;
  name: string;
  description: string;
  available: boolean;
}

const Header: React.FC = () => {
  const [actions, setActions] = useState<IAction[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadactions(): Promise<void> {
      const response = await api.get<IAction[]>('action');

      setActions(response.data);
    }
    loadactions();
  }, []);

  async function handleAddAction(
    action: Omit<IAction, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const newAction: IAction = {
        id: actions[actions.length - 1]
          ? actions[actions.length - 1].id + 1
          : 1,
        name: action.name,
        description: action.description,
        available: true,
      };
      await api.post('/action', newAction);
      setActions([...actions, newAction]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <header
      style={{ zIndex: 0 }}
      className=" w-full flex flex-col items-center  "
    >
      <div className="flex flex-row mt-10 w-10/12 relative">
        <NewActionModal
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddAction={handleAddAction}
        />
        <div className="absolute right-0">
          <Button openModal={toggleModal} />
        </div>
        <div className="flex flex-row items-center space-x-4">
          <span className="text-black text-3xl">Proffy Bot</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

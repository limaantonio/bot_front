/* eslint-disable camelcase */
import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

interface IAction {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
  available: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAction: (Action: Omit<IAction, 'id' | 'available'>) => void;
  editingAction: IAction;
}

interface IActionData {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
}

const ModalEditAction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingAction,
  handleUpdateAction,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IActionData) => {
      await handleUpdateAction(data);
      setIsOpen();
    },
    [handleUpdateAction, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        className="space-y-4 mb-14 p-2 space-y-2 flex flex-col "
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingAction}
      >
        <h1 className="text-xl mb-4 font-bold">
          Editar Configurar Ação Programável
        </h1>

        <div className="flex flex-col">
          <span className="">Ação</span>
          <Input
            className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600"
            name="title"
          />
        </div>

        <div className="flex flex-col">
          <span className="">Dias</span>
          <Input
            className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600"
            name="deadline"
          />
        </div>

        <div className="flex flex-row space-x-2">
          <div className="flex flex-col w-1/2">
            <span className="">Nota de corte</span>
            <Input
              className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600"
              name="passing_score"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <span className="">Quantidade de dias</span>
            <Input
              className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600"
              name=" dt_complete_class"
            />
          </div>
        </div>

        <button
          className=" bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md text-white w-36 absolute right-7 bottom-4"
          type="submit"
          data-testid="edit-Action-button"
        >
          <div className="text">Editar</div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAction;

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
  task: string;
  category_action: string;
  file: File;
  active: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAction: (Action: Omit<IAction, 'id' | 'active' | 'file'>) => void;
  editingAction: IAction;
}

interface IActionData {
  id: number;
  title: string;
  deadline: number;
  passing_score: number;
  dt_complete_class: Date;
  task: string;
  category_action: string;
  active: boolean;
}

function ModalEditAction({
  isOpen,
  setIsOpen,
  editingAction,
  handleUpdateAction,
}: IModalProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IActionData) => {
      await handleUpdateAction(data);
      setIsOpen();
    },
    [handleUpdateAction, setIsOpen],
  );

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Editar Configurar Ação Programável"
      submit="edit-Action-button"
    >
      <Form
        className="space-y-4 mb-14 p-2 space-y-2 flex flex-col "
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingAction}
      >
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
      </Form>
    </Modal>
  );
}

export default ModalEditAction;

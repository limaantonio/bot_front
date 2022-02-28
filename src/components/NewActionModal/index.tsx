import { FormHandles } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';
import api from '../../services/api';

interface IAction {
  id: number;
  name: string;
  description: string;
 
}

interface ICreateActionData {
  name: string;
  description: string;
}

interface IAulas {
  name: string;
  id: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAction: (action: Omit<IAction, 'id' | 'available'>) => void;
 
}

const NewActionModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAction,
  
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateActionData) => {
      await handleAddAction(data);
      setIsOpen();
    },
    [handleAddAction, setIsOpen],
  ); 

  const [selectAction, setSelectAction] = useState('0');
  const [context, setContext] = useState('0');
  const [actions, setActions] = useState<IAction[]>([]);

  const contexts = [
                      {id: 1, key: 'REVISAO', name: "Revisão"},
                      {id: 2, key: 'RECOMENDACAO', name: "Recomendação"},
                      {id: 3, key: 'FEEDBACK', name: "Feedback"}
                   ];

  function handleSelectedAction(event: ChangeEvent<HTMLSelectElement>){
    const action = event.target.value;

    setSelectAction(action);
  }

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>){
    const context = event.target.value;

    loadactions(context);

    setContext(context);
  }

  async function loadactions(context: string): Promise<void> {
    const response = await api.get<IAction[]>(`action?context=${context}`);

    setActions(response.data);
  }
 
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>    
      <Form className="space-y-4 mb-14 p-2 space-y-2 flex flex-col " ref={formRef} onSubmit={handleSubmit}>
        <h1 className="text-xl mb-4 font-bold">Configurar Ação Programável</h1>

        <div className="flex flex-col">
          <span className="">Nome</span>
          <Input 
            className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600" 
            name="name" 
          />
        </div>

        <div className="flex flex-col">
          <span className="">Descrição</span>
          <Input className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600" name="description" />
        </div>
        
        <div className="flex flex-row space-x-2">
          <select
              className="px-2  text-grayTextBase space-x-2  h-10 bg-white text-sm sm:text-base box-border t border-color rounded-lg"
              id="context"
              name="context"
              value={selectAction}
              onChange={handleSelectedContext}
              defaultValue='0'
            
            >
              <option value="0" className="text-base" disabled selected>
                Selecione
              </option>
              {contexts.map((c) => (
                <option key={c.id} value={c.key}>
                  {c.name}
                </option>
              ))}
            </select>
          <div className="flex flex-col w-1/2">
              <span className="">Quantidade de dias</span>
              <Input className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600" name="numberDays" />
          </div>
     
          <div className="flex text-green mt-2 flex-col sm:w-4/12 ml-2  sm:mr-4 mr-2 ">
          <span className="">Cidade:</span>
            <select
              className="px-2  text-grayTextBase space-x-2  h-10 bg-white text-sm sm:text-base box-border t border-color rounded-lg"
              id="idAction"
              name="action"
              value={selectAction}
              onChange={handleSelectedAction}
              defaultValue='0'
            
            >
              <option value="0" className="text-base" disabled selected>
                Selecione
              </option>
              {actions.map((aula) => (
                <option key={aula.id} value={aula.name}>
                  {aula.name}
                </option>
              ))}
            </select>
            </div>
        </div>
        <button 
          className=" bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md text-white w-36 absolute right-7 bottom-4" 
          type="submit" data-testid="add-action-button">
          <p className="text">Finalizar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default NewActionModal;

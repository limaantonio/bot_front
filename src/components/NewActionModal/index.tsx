import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';


interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const NewActionModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      await handleAddFood(data);
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

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
          <div className="flex flex-col w-1/2">
              <span className="">Contexto</span>
              <Input className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600" name="context" />
          </div>
          <div className="flex flex-col w-1/2">
              <span className="">Quantidade de dias</span>
              <Input className="p-2 rounded-sm border border-gray-200 shadow-sm font-light text-gray-600" name="numberDays" />
          </div>
          <div className="flex flex-col w-1/2">
          <label >Turma</label>
            <select className="bg-white border rounded-sm p-2" name="cars" id="cars">
              <option value="volvo">Turma 01</option>
              <option value="saab">Turma 02</option>
              <option value="opel">Turma 03</option>
           
            </select>
          
          </div>
       
        </div>

        <button 
          className=" bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md text-white w-36 absolute right-7 bottom-4" 
          type="submit" data-testid="add-food-button">
          <p className="text">Finalizar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default NewActionModal;

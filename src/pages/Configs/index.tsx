import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Food from '../../components/Food';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';

interface IFoodPlate {
  _id: number;
  name: string;
  description: string;
  context: string;
  numberDays: number;
  available: boolean;
}

const Configs: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>(
    {
      _id: 0,
      name: '',
      description: '',
      context: '',
      numberDays: 0,
      available: true
    });
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get<IFoodPlate[]>('action');

      setFoods(response.data);
    }
    loadFoods();
  }, []);

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    const newFoodList = foods.map(cfood => {
      if (cfood._id !== editingFood._id) {
        return cfood;
      }
      return {
        ...food,
        id: editingFood._id,
        available: editingFood.available,
      };
    });
    setFoods(newFoodList);
    await api.put(`/action/${editingFood._id}`, {
      ...food,
      id: editingFood._id,
      available: editingFood.available,
    });
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/action/${id}`);
    const listFood = foods.filter(food => food._id !== id);
    setFoods(listFood);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <div className="bg-gray-300 flex flex-col h-screen items-center">
    <div className="h-14 w-full bg-blue-500 p-6 items-center flex flex-row ">
      <Link to="/" className="">
      <BsArrowLeftShort className="text-white w-8 h-8"/>
      </Link>
    </div>
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />



    
        <div className="bg-white flex flex-row items-center w-10/12 p-4 mt-10 h-14">
          <h2 className="w-3/12 text-center">Nome</h2>
          <h1 className="w-3/12 text-center">Descrição</h1>
          <h1 className="w-3/12 text-center">Contexto</h1>
          <h1 className="w-3/12 text-center">Ações</h1>
        </div>

        <div className="overflow-scroll w-10/12">
        <div className=" rounded-md  h-full  " data-testid="foods-list">
      
          
        {foods &&
          foods.map(food => (
            <Food
              key={food._id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </div>
      </div>
    </div>
  );
};

export default Configs;

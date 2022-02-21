import React, { useEffect, useState } from 'react';
import { SiProbot } from 'react-icons/si';
import api from '../../services/api';
import Button from '../Button';
import NewActionModal from '../NewActionModal';


interface IFoodPlate {
  id: number;
  name: string;
  description: string;
  available: boolean;
}

const Header: React.FC = () => {
 
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get<IFoodPlate[]>('action');

      setFoods(response.data);
    }
    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const newFood: IFoodPlate = {
        id: foods[foods.length - 1] ? foods[foods.length - 1].id + 1 : 1,
        name: food.name,
        description: food.description,
        available: true,
      };
      await api.post('/action', newFood);
      setFoods([...foods, newFood]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  
  return (
      <header className="h-44 w-full bg-blue-500 flex flex-col justify-center items-center">
        <div className="flex flex-row items-center w-10/12 relative">
          <div className="flex flex-row items-center space-x-4">
            <div className="rounded-full p-4 flex flex-row items-start justify-center bg-green-400">
             <SiProbot className="text-white w-10 h-10 "/>
            </div>
           
            <span className="text-white font-light text-xl">Proffy Bot</span>
          </div>
       
          <div className="absolute right-0">
            <Button openModal={toggleModal} />
          </div>
          <NewActionModal
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        </div>
      </header>
  );
};

export default Header;

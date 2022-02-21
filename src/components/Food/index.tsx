import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import api from '../../services/api';

interface IFoodPlate {
  _id: number;
  name: string;
  description: string;
  context: string;
  numberDays: number;
  available: boolean;
}

interface IProps {
  food: IFoodPlate;
  handleDelete: (id: number) => {};
  handleEditFood: (food: IFoodPlate) => void;
}

const Food: React.FC<IProps> = ({
  food,
  handleDelete,
  handleEditFood,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable(): Promise<void> {
    await api.put(`foods/${food._id}`, {
      id: food._id,
      name: food.name,
      description: food.description,
      context: food.context,
      numberDays: food.numberDays,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function setEditingFood(): void {
    handleEditFood(food);
  }

  return (
    <div  className="bg-white text-sm p-4 flex flex-row items-center relative border font-light h-14">
        <h2 className="w-3/12 text-left">{food.name}</h2>
        <p className="w-3/12 text-left">{food.description}</p>
        <span className="w-3/12 text-center">{food.context}</span>

        <div className="w-3/12 text-center space-x-2">
          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-blue-400 duration-300"
            onClick={() => setEditingFood()}
            data-testid={`edit-food-${food._id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="bg-gray-200 rounded-full p-2 shadow-sm hover:bg-red-400 duration-300"
            onClick={() => handleDelete(food._id)}
            data-testid={`remove-food-${food._id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
        
  

        {/* <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div> */}
    
    </div>
  );
};

export default Food;

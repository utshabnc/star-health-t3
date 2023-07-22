import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface FoodNutrient {
  nutrientName: string;
  unitName: string;
  value: number;
}

interface Food {
  fdcId: number;
  description: string;
  publicationDate: string;
  foodNutrients: FoodNutrient[];
  discontinuedDate: string;
}

const CompareFood: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const loadedFoods = JSON.parse(localStorage.getItem('compareFood') || '[]');
    setFoods(loadedFoods);
  }, []);

  const removeFood = (fdcId: number) => {
    let compareFoods = JSON.parse(localStorage.getItem('compareFood') || '[]');
    compareFoods = compareFoods.filter((food: Food) => food.fdcId !== fdcId);
    localStorage.setItem('compareFood', JSON.stringify(compareFoods));
    setFoods(compareFoods);
  }

   // Get unique nutrients across all food items
   const nutrients = [...new Set(foods.flatMap(food => food.foodNutrients.map(nutrient => nutrient.nutrientName)))];

   return (
     <div className="overflow-x-auto">
       {foods.length === 0 ? (
         <div>No food to compare
           <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
           <Link href={'https://www.example.com/directory'}>Data Directory</Link></h5>
         </div>
       ) : (
       <table className="min-w-full divide-y divide-gray-200">
         <thead className="bg-gray-50">
           <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
             {foods.map((food) => (
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={food.fdcId}>
                 {food.description}
               </th>
             ))}
           </tr>
         </thead>
         <tbody className="bg-white divide-y divide-gray-200">
           {nutrients.map((nutrientName, idx) => (
             <tr key={idx}>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">{nutrientName}</th>
               {foods.map((food) => {
                 const nutrient = food.foodNutrients.find(n => n.nutrientName === nutrientName);
                 return (
                   <td className="px-6 py-4 whitespace-nowrap" key={food.fdcId}>
                     {nutrient ? `${nutrient.value} ${nutrient.unitName}` : 'N/A'}
                   </td>
                 );
               })}
             </tr>
           ))}
           <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {foods.map((food) => (
            <td className="px-6 py-4 whitespace-nowrap" key={food.fdcId}>
                <button onClick={() => removeFood(food.fdcId)}>
                <TrashIcon className="h-5 w-5 text-red-500"/>
                </button>
            </td>
            ))}
        </tr>
         </tbody>
       </table>
       )}
     </div>
   );
 };
 
 export default CompareFood;
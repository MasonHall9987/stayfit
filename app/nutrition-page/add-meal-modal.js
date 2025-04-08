"use client";
import { addMealForUser } from './mealService';
import { useState } from 'react';
import { Mail, X, ArrowRight, Clock, Calendar, Apple, Utensils, Search, Plus, Minus, AlignLeft } from 'lucide-react';

export default function AddMealModal({ isOpen, setIsOpen,onMealAdded }) {
  const [mealData, setMealData] = useState({
    name: '',
    mealType: 'breakfast',
    servingSize: '1',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [''],
    instructions: [''],
    nutritionFacts: [{ name: '', value: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...mealData[field]];
    newArray[index] = e.target.value;
    setMealData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleNutritionFactChange = (index, key, value) => {
    const newNutritionFacts = [...mealData.nutritionFacts];
    newNutritionFacts[index] = { ...newNutritionFacts[index], [key]: value };
    setMealData(prev => ({
      ...prev,
      nutritionFacts: newNutritionFacts
    }));
  };

  const addArrayItem = (field) => {
    setMealData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...mealData[field]];
    newArray.splice(index, 1);
    setMealData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addNutritionFact = () => {
    setMealData(prev => ({
      ...prev,
      nutritionFacts: [...prev.nutritionFacts, { name: '', value: '' }]
    }));
  };

  const removeNutritionFact = (index) => {
    const newNutritionFacts = [...mealData.nutritionFacts];
    newNutritionFacts.splice(index, 1);
    setMealData(prev => ({
      ...prev,
      nutritionFacts: newNutritionFacts
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const id = await addMealForUser(mealData);
      console.log("Meal added with ID:", id);
      alert("Meal added successfully!");
      onMealAdded?.(); // Trigger parent refresh if function exists
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding meal:", error);
      alert("Failed to add meal.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Content */}
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-lg p-6 custom-scrollbar relative animate-fadeIn max-h-screen overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Add Meal</h2>
              <p className="text-gray-400 mt-1">Track what you ate today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-4">Basic Information</h3>
                <div className="space-y-4">
                  {/* Meal Name with Search */}
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Meal Name</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Search or enter meal name"
                        value={mealData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Meal Type and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">Meal Type</label>
                      <div className="relative">
                        <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                          name="mealType"
                          value={mealData.mealType}
                          onChange={handleChange}
                          className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                        >
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="snack">Snack</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="time"
                          name="time"
                          value={mealData.time}
                          onChange={handleChange}
                          className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nutritional Information */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-4">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Calories</label>
                    <input
                      type="text"
                      name="calories"
                      value={mealData.calories}
                      onChange={handleChange}
                      placeholder="kcal"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Protein</label>
                    <input
                      type="text"
                      name="protein"
                      value={mealData.protein}
                      onChange={handleChange}
                      placeholder="g"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Carbs</label>
                    <input
                      type="text"
                      name="carbs"
                      value={mealData.carbs}
                      onChange={handleChange}
                      placeholder="g"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Fats</label>
                    <input
                      type="text"
                      name="fats"
                      value={mealData.fats}
                      onChange={handleChange}
                      placeholder="g"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Additional Nutrition Facts */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-gray-300 text-sm font-medium">Additional Nutrition Facts</h4>
                    <button 
                      type="button" 
                      onClick={addNutritionFact}
                      className="text-orange-500 hover:text-orange-400 text-sm flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Fact
                    </button>
                  </div>
                  
                  {mealData.nutritionFacts.map((fact, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          placeholder="Fact Name (e.g. Sodium)"
                          value={fact.name}
                          onChange={(e) => handleNutritionFactChange(index, 'name', e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500 text-sm"
                        />
                      </div>
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          placeholder="Value (e.g. 150mg)"
                          value={fact.value}
                          onChange={(e) => handleNutritionFactChange(index, 'value', e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500 text-sm"
                        />
                      </div>
                      {mealData.nutritionFacts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeNutritionFact(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Ingredients</h3>
                  <button
                    type="button"
                    onClick={() => addArrayItem('ingredients')}
                    className="text-orange-500 hover:text-orange-400 text-sm flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </button>
                </div>
                
                {mealData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                      placeholder="e.g. 2 cups of flour"
                      className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500"
                    />
                    {mealData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'ingredients')}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 mt-6"
              >
                <span>Add Meal</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
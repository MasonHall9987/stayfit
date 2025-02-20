"use client";

import { useState } from 'react';
import { Mail, X, ArrowRight, Clock, Calendar, Apple, Utensils, Search } from 'lucide-react';

export default function AddMealModal({ isOpen, setIsOpen }) {
  const [mealData, setMealData] = useState({
    name: '',
    mealType: 'breakfast',
    servingSize: '1',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Content */}
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6 relative animate-fadeIn">
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

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
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
                      className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
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
                      className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Serving Size */}
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Serving Size</label>
                <input
                  type="number"
                  name="servingSize"
                  value={mealData.servingSize}
                  onChange={handleChange}
                  min="0.25"
                  step="0.25"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Nutritional Information */}
              <div>
                <h3 className="text-white font-medium mb-2">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Calories</label>
                    <input
                      type="number"
                      name="calories"
                      value={mealData.calories}
                      onChange={handleChange}
                      placeholder="kcal"
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Protein (g)</label>
                    <input
                      type="number"
                      name="protein"
                      value={mealData.protein}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Carbs (g)</label>
                    <input
                      type="number"
                      name="carbs"
                      value={mealData.carbs}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Fats (g)</label>
                    <input
                      type="number"
                      name="fats"
                      value={mealData.fats}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
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
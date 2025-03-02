"use client"

import { useState } from 'react';
import { Dumbbell, Apple, User, PieChart, Plus, ChevronRight, Search, ArrowUpRight } from 'lucide-react';
import { useRouter } from "next/navigation"; // Import useRouter
import AddMealModal from './add-meal-modal';
import ViewMealModal from './view-meal-modal';



export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState('nutrition');
  const router = useRouter(); // Initialize router
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false); // Modal visibility state
  const [isViewMealModalOpen, setIsViewMealModalOpen] = useState(false); // Modal visibility state
  const [isStatic, setIsStatic] = useState(false);


  const handleAddMeal = () => {
    setIsAddMealModalOpen(true);
  };

  const handleViewMeal = () => {
    setIsStatic(true);
    setIsViewMealModalOpen(true); 
  };

  const handleTodayViewMeal = () => {
    setIsStatic(false);
    setIsViewMealModalOpen(true); 
  };

  const mealSuggestions = [
    { name: "High Protein Breakfast", calories: "450", protein: "35g", carbs: "40g", fats: "15g" },
    { name: "Pre-Workout Smoothie", calories: "280", protein: "20g", carbs: "45g", fats: "6g" },
    { name: "Post-Workout Meal", calories: "550", protein: "40g", carbs: "65g", fats: "20g" }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">StayFit</span>
          
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => router.push("/workout-page")}
              className={`flex flex-col items-center ${activeTab === 'workouts' ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-500 transition-colors`}
            >
              <Dumbbell className="h-6 w-6 mb-1" />
              <span className="text-sm">Workouts</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('nutrition')}
              className={`flex flex-col items-center ${activeTab === 'nutrition' ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-500 transition-colors`}
            >
              <Apple className="h-6 w-6 mb-1" />
              <span className="text-sm">Nutrition</span>
            </button>
            
            <button 
              onClick={() => router.push("/profile-page")}
              className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-500 transition-colors`}
            >
              <User className="h-6 w-6 mb-1" />
              <span className="text-sm">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Nutrition</h1>
              <p className="text-gray-400">Track your meals and meet your goals</p>
            </div>
            <button onClick={handleAddMeal} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Meal</span>
            </button>
          </div>

          {/* Daily Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Calories</span>
                <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-orange-500"></div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">1820</div>
              <div className="text-sm text-gray-400">of 2235 goal</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Protein</span>
                <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-orange-500"></div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">120g</div>
              <div className="text-sm text-gray-400">of 160g goal</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Carbs</span>
                <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[50%] bg-orange-500"></div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">180g</div>
              <div className="text-sm text-gray-400">of 250g goal</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Fats</span>
                <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[66%] bg-orange-500"></div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">65g</div>
              <div className="text-sm text-gray-400">of 70g goal</div>
            </div>
          </div>

          {/* Search Bar 
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for foods..." 
              className="w-full bg-gray-900 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>*/}

          {/* Meal Suggestions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Suggested Meals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mealSuggestions.map((meal, index) => (
                <button onClick={handleViewMeal} key={index} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">{meal.name}</h3>
                    <ArrowUpRight className="h-5 w-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Calories</span>
                      <span className="text-white">{meal.calories}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Protein</span>
                      <span className="text-white">{meal.protein}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Carbs</span>
                      <span className="text-white">{meal.carbs}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Fats</span>
                      <span className="text-white">{meal.fats}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Today's Meals */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Today's Meals</h2>
            <div className="bg-gray-900 rounded-lg divide-y divide-gray-800">
              {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((meal, index) => (
                <div onClick={handleTodayViewMeal} key={index} className="p-4 hover:bg-gray-800 transition-colors cursor-pointer rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">{meal}</h3>
                      <p className="text-gray-400 text-sm">320 calories</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AddMealModal isOpen={isAddMealModalOpen} setIsOpen={setIsAddMealModalOpen} />
      <ViewMealModal isOpen={isViewMealModalOpen} setIsOpen={setIsViewMealModalOpen} isStatic={isStatic} />
    </div>
  );
}
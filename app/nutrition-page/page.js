"use client";

import { useState, useEffect } from 'react';
import { Dumbbell, Apple, User, Plus, ChevronRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import { getMealsForUser } from './mealService';
import AddMealModal from './add-meal-modal';
import ViewMealModal from './view-meal-modal';

export default function NutritionPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('nutrition');
  const router = useRouter();
  const [isViewMealModalOpen, setIsViewMealModalOpen] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const fetchMeals = async () => {
    try {
      const mealsData = await getMealsForUser();
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAddMeal = () => {
    setIsAddModalOpen(true); // ✅ Correct state used here
  };

  const handleTodayViewMeal = (meal) => {
    setSelectedMeal(meal);
    setIsStatic(false);
    setIsViewMealModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
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

      <main className="pt-24 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Nutrition</h1>
              <p className="text-gray-400">Track your meals and meet your goals</p>
            </div>
            <button
              onClick={handleAddMeal}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Meal</span>
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Today's Meals</h2>
            <div className="bg-gray-900 rounded-lg divide-y divide-gray-800">
              {meals.length > 0 ? (
                meals.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => handleTodayViewMeal(meal)}
                    className="p-4 hover:bg-gray-800 transition-colors cursor-pointer rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{meal.name}</h3>
                        <p className="text-gray-400 text-sm">{meal.calories} calories</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">No meals added today</div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Modal for Adding a Meal */}
      <AddMealModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onMealAdded={fetchMeals}
      />

      {/* ✅ Modal for Viewing/Editing a Meal */}
      <ViewMealModal
        isOpen={isViewMealModalOpen}
        setIsOpen={setIsViewMealModalOpen}
        isStatic={isStatic}
        meal={selectedMeal}
        onSave={fetchMeals}
      />
    </div>
  );
}

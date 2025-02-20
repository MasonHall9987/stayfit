"use client"

import { useState } from 'react';
import { Dumbbell, Apple, User, PlayCircle, Plus, Clock, Flame, ChevronRight, Filter } from 'lucide-react';
import { useRouter } from "next/navigation"; // Import useRouter
import AddWorkoutModal from './add-workout-modal';


export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState('workouts');
  const router = useRouter(); // Initialize router
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleAddWorkout = () => {
    setIsModalOpen(true); // Show the modal when "Forgot password?" is clicked
  };

  // Sample workout data
  const recommendedWorkouts = [
    { title: "Full Body Strength", duration: "45 min", calories: "320", level: "Intermediate" },
    { title: "HIIT Cardio Blast", duration: "30 min", calories: "400", level: "Advanced" },
    { title: "Core & Abs Focus", duration: "20 min", calories: "150", level: "Beginner" }
  ];

  const categories = [
    "Strength Training",
    "Cardio",
    "HIIT",
    "Yoga",
    "Core",
    "Recovery"
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <span className="text-2xl font-bold text-orange-500">StayFit</span>
          
          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('workouts')}
              className={`flex flex-col items-center ${activeTab === 'workouts' ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-500 transition-colors`}
            >
              <Dumbbell className="h-6 w-6 mb-1" />
              <span className="text-sm">Workouts</span>
            </button>
            
            <button 
              onClick={() => router.push("/nutrition-page")}
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
              <h1 className="text-3xl font-bold text-white mb-2">Workouts</h1>
              <p className="text-gray-400">Find your perfect workout routine</p>
              </div>
            <button onClick={handleAddWorkout} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Workout</span>
            </button>
          </div>


          {/* Workout Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  <Dumbbell className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <span className="text-gray-300">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Workouts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedWorkouts.map((workout, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer group">
                  <div className="relative">
                    <div className="aspect-video bg-gray-800 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {workout.level}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{workout.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{workout.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Flame className="h-4 w-4 mr-1" />
                        <span>{workout.calories} cal</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Workouts */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Workouts</h2>
            <div className="bg-gray-900 rounded-lg divide-y divide-gray-800">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <Dumbbell className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Upper Body Strength</h3>
                      <p className="text-gray-400 text-sm">Completed yesterday</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AddWorkoutModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
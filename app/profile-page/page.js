"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter
import { Dumbbell, Apple, User, Settings, LogOut, Edit } from 'lucide-react';
import SettingsModal from './settings-modal';
import PersonalModal from './personal-modal';
import PictureModal from './picture-modal';


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter(); // Initialize router
  const [isSettingsModalOpen, setisSettingsModalOpen] = useState(false); // Modal visibility state
  const [isPersonalModalOpen, setisPersonalModalOpen] = useState(false); // Modal visibility state
  const [isPictureModalOpen, setisPictureModalOpen] = useState(false); // Modal visibility state
  

  const handleSettings = () => {
    setisSettingsModalOpen(true); // Show the modal when "Forgot password?" is clicked
  };

  const handlePersonal = () => {
    setisPersonalModalOpen(true); // Show the modal when "Forgot password?" is clicked
  };

  const handlePicture = () => {
    setisPictureModalOpen(true); // Show the modal when "Forgot password?" is clicked
  };



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
              onClick={() => router.push("/workout-page")
              }
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
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-500 transition-colors`}
            >
              <User className="h-6 w-6 mb-1" />
              <span className="text-sm">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <main className="pt-24 px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <button onClick={handlePicture} className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors">
                    <Edit className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">John Doe</h1>
                  <p className="text-gray-400">john.doe@example.com</p>
                </div>
              </div>
              <button onClick={handleSettings} className="text-gray-400 hover:text-white">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Workouts Completed</p>
              <p className="text-2xl font-bold text-white">248</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-white">12 days</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Achievement Points</p>
              <p className="text-2xl font-bold text-white">1,540</p>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button onClick={handlePersonal} className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <span className="text-gray-300">Personal Information</span>
                <Edit className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 text-red-400 transition-colors" onClick={() => router.push("/")}>
                <span>Sign Out</span>
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <SettingsModal isOpen={isSettingsModalOpen} setIsOpen={setisSettingsModalOpen} />
      <PersonalModal isOpen={isPersonalModalOpen} setIsOpen={setisPersonalModalOpen} />
      <PictureModal isOpen={isPictureModalOpen} setIsOpen={setisPictureModalOpen} />
    </div>
  );
}
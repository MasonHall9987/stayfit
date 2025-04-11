"use client";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from '../contexts/authContext';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Dumbbell, Apple, User, Settings, LogOut, Edit } from 'lucide-react';
import SettingsModal from './settings-modal';
import PersonalModal from './personal-modal';
import PictureModal from './picture-modal';

export default function ProfilePage() {
  const auth = useAuth();
  const router = useRouter();
  const db = getFirestore();

  const [isSettingsModalOpen, setisSettingsModalOpen] = useState(false);
  const [isPersonalModalOpen, setisPersonalModalOpen] = useState(false);
  const [isPictureModalOpen, setisPictureModalOpen] = useState(false);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  const { currentUser } = auth || {};

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!currentUser) return;

      try {
        // Fetch workouts
        const workoutsQuery = query(
          collection(db, "workouts"),
          where("userId", "==", currentUser.uid)
        );
        const workoutsSnap = await getDocs(workoutsQuery);
        setWorkoutCount(workoutsSnap.size);

        // Fetch other stats if any (like streaks)
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setCurrentStreak(data.currentStreak ?? 0);
        }
      } catch (error) {
        console.error("Error fetching profile stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [currentUser]);

  const handleSettings = () => setisSettingsModalOpen(true);
  const handlePersonal = () => setisPersonalModalOpen(true);
  const handlePicture = () => setisPictureModalOpen(true);

  if (!auth || !currentUser) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">StayFit</span>
          <div className="flex items-center space-x-8">
            <button onClick={() => router.push("/workout-page")} className="flex flex-col items-center text-gray-400 hover:text-orange-500">
              <Dumbbell className="h-6 w-6 mb-1" />
              <span className="text-sm">Workouts</span>
            </button>
            <button onClick={() => router.push("/nutrition-page")} className="flex flex-col items-center text-gray-400 hover:text-orange-500">
              <Apple className="h-6 w-6 mb-1" />
              <span className="text-sm">Nutrition</span>
            </button>
            <button className="flex flex-col items-center text-orange-500">
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
                  <button onClick={handlePicture} className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600">
                    <Edit className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentUser.displayName || currentUser.email}</h1>
                  <p className="text-gray-400">{currentUser.email}</p>
                </div>
              </div>
              <button onClick={handleSettings} className="text-gray-400 hover:text-white">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Workouts Completed</p>
              <p className="text-2xl font-bold text-white">
                {loadingStats ? "..." : workoutCount}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-white">
                {loadingStats ? "..." : `${currentStreak} days`}
              </p>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button onClick={handlePersonal} className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                <span className="text-gray-300">Personal Information</span>
                <Edit className="h-5 w-5 text-gray-400" />
              </button>
              <button onClick={() => router.push("/")} className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 text-red-400">
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

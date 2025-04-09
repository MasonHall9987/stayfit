"use client"

import { useState, useRef } from 'react';
import { Dumbbell, Apple, User, PlayCircle, Plus, Clock, Flame, ChevronRight, Filter, Pause } from 'lucide-react';
import { useRouter } from "next/navigation";
import AddWorkoutModal from './add-workout-modal';
import ViewWorkoutModal from './view-workout-modal';
import { getWorkoutsForUser } from './workoutService';
import { useEffect } from 'react';

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState('workouts');
  const [selectedCategory, setSelectedCategory] = useState('Strength Training');
  const router = useRouter();
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [isViewWorkoutModalOpen, setIsViewWorkoutModalOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isStatic, setIsStatic] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [workoutData, setWorkoutData] = useState(null);
  
  const handleAddWorkout = async () => {
    setIsAddWorkoutModalOpen(true);
    const workouts = await getWorkoutsForUser();
    const sorted = workouts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setRecentWorkouts(sorted);
  };
  

  const handleViewAddWorkout = (workout) => {
    setSelectedWorkout(workout);
    setIsStatic(false);
    setIsViewWorkoutModalOpen(true);
    setWorkoutData(workout);  // Make sure to set workoutData here

  };
  


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Stop any playing video when changing categories
    if (playingVideo) {
      videoRefs.current[playingVideo]?.pause();
      setPlayingVideo(null);
    }
  };

  // Categories array
  const categories = [
    "Strength Training",
    "Cardio",
    "HIIT",
    "Yoga",
    "Core",
    "Recovery"
  ];

  // 2D array for workout videos [6 categories][3 videos per category]
  const workoutVideos = {
    "Strength Training": [
      { id: "st1", title: "Power Press: The Ultimate Push Day", duration: "45 min", calories: "320", level: "Intermediate", videoUrl: "https://www.youtube.com/embed/unpNp3Wi2Gk" },
      { id: "st2", title: "Lats Unleashed: The Pull Protocol", duration: "30 min", calories: "250", level: "Beginner", videoUrl: "https://www.youtube.com/embed/DXL18E7QRbk?start=1" },
      { id: "st3", title: "Titan Legs: Unbreakable Strength", duration: "40 min", calories: "300", level: "Advanced", videoUrl: "https://www.youtube.com/embed/H6mRkx1x77k" }
    ],
    "Cardio": [
      { id: "c1", title: "High Energy Cardio", duration: "35 min", calories: "400", level: "Intermediate", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "c2", title: "Steady State Run", duration: "45 min", calories: "450", level: "Beginner", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "c3", title: "Interval Sprints", duration: "25 min", calories: "350", level: "Advanced", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
    ],
    "HIIT": [
      { id: "h1", title: "HIIT Cardio Blast", duration: "30 min", calories: "400", level: "Advanced", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "h2", title: "Tabata Intervals", duration: "20 min", calories: "300", level: "Intermediate", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "h3", title: "Full Body HIIT", duration: "25 min", calories: "350", level: "Advanced", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
    ],
    "Yoga": [
      { id: "y1", title: "Morning Flow", duration: "40 min", calories: "200", level: "Beginner", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "y2", title: "Power Yoga", duration: "50 min", calories: "280", level: "Intermediate", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "y3", title: "Restorative Yoga", duration: "60 min", calories: "150", level: "Beginner", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
    ],
    "Core": [
      { id: "cr1", title: "Core & Abs Focus", duration: "20 min", calories: "150", level: "Beginner", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "cr2", title: "Advanced Core", duration: "25 min", calories: "200", level: "Advanced", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "cr3", title: "Pilates Core", duration: "35 min", calories: "230", level: "Intermediate", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
    ],
    "Recovery": [
      { id: "r1", title: "Foam Rolling", duration: "30 min", calories: "100", level: "Beginner", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "r2", title: "Stretching Routine", duration: "25 min", calories: "120", level: "Beginner", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: "r3", title: "Mobility Work", duration: "35 min", calories: "150", level: "Intermediate", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
    ]
  };

  const [recentWorkouts, setRecentWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workouts = await getWorkoutsForUser();
        const sorted = workouts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentWorkouts(sorted);
      } catch (error) {
        console.error('Failed to load workouts:', error);
      }
    };
  
    fetchWorkouts();
  }, []);
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

          {/* Workout Categories as Tabs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-4 rounded-lg transition-colors text-center ${selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                    }`}
                >
                  <Dumbbell className={`h-8 w-8 mx-auto mb-2 ${selectedCategory === category ? 'text-white' : 'text-orange-500'
                    }`} />
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Workout Videos for Selected Category */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">{selectedCategory} Workouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutVideos[selectedCategory].map((workout) => (
                <div key={workout.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group">
                  <div className="relative">
                    <div className="aspect-video bg-gray-800 flex items-center justify-center">
                      {workout.videoUrl.includes("youtube.com") ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={workout.videoUrl}
                          title={workout.title}
                          allowFullScreen
                        />
                      ) : (
                        <video
                          ref={(el) => (videoRefs.current[workout.id] = el)}
                          src={workout.videoUrl}
                          className="h-full w-full object-cover"
                          controls
                        />
                      )}
                    </div>
                  </div>
                  <button className="w-full p-4 text-left" onClick={() => handleViewAddWorkout(workout)}>
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
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Workouts */}
          <div>
  <h2 className="text-xl font-semibold text-white mb-4">Recent Workouts</h2>
  <div className="bg-gray-900 rounded-lg divide-y divide-gray-800">
    {recentWorkouts.map((workout, index) => (
      <button
        key={index}
        onClick={() => handleViewAddWorkout(workout)}  // Open the modal on tap
        className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-800 transition-colors cursor-pointer rounded-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Dumbbell className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-white font-medium">{workout.name}</h3>
            <p className="text-gray-400 text-sm">
              {new Date(workout.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>
    ))}
  </div>
</div>
        </div>
      </main>
      <AddWorkoutModal isOpen={isAddWorkoutModalOpen} setIsOpen={setIsAddWorkoutModalOpen} />
      <ViewWorkoutModal
    isOpen={isViewWorkoutModalOpen}  // Control visibility
    setIsOpen={setIsViewWorkoutModalOpen}  // Handle closing
    workoutData={workoutData}  // Pass workout data
  />
    </div>
  );
}
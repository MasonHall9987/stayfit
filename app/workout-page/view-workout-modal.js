"use client";

import { useState } from 'react';
import { X, ArrowRight, Clock, Calendar, Dumbbell, Timer, CheckCircle, Edit, Trash2, Save} from 'lucide-react';

export default function ViewWorkoutModal({ isOpen, setIsOpen, workoutData, exercises, isStatic}) {
 // Add state for edit mode
  const [editMode, setEditMode] = useState(false);
  
  // Default values in case no workout data is passed
  const workout = workoutData || {
    name: 'Full Body Workout',
    type: 'strength',
    duration: '45',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  };

  // Default exercises if none provided
  const workoutExercises = exercises || [
    { id: 1, name: 'Bench Press', sets: '3', reps: '10', weight: '135' },
    { id: 2, name: 'Squats', sets: '3', reps: '12', weight: '185' }
  ];

  // Function to get workout type label
  const getWorkoutTypeLabel = (type) => {
    const types = {
      'strength': 'Strength Training',
      'cardio': 'Cardio',
      'hiit': 'HIIT',
      'flexibility': 'Flexibility'
    };
    return types[type] || type;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleClose = () => {
    if(editMode)
    {
      toggleEditMode();
    }
    setIsOpen(false);
  };

  const handleDeleteWorkout = () => {
    if(editMode)
    {
      toggleEditMode();
    }
    setIsOpen(false);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg relative animate-fadeIn flex flex-col max-h-[90vh]">
            {/* Header */}
            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[60vh] p-6 custom-scrollbar">
              {/* Workout Overview Card */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Dumbbell className="h-5 w-5 text-orange-500 mr-2" />
                    <h3 className="text-lg font-semibold text-white">{workout.name}</h3>
                  </div>
                  <span className="bg-orange-500 bg-opacity-20 text-orange-500 px-3 py-1 rounded-full text-xs font-medium">
                    {getWorkoutTypeLabel(workout.type)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(workout.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{workout.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Timer className="h-4 w-4 mr-2" />
                    <span>{workout.duration} minutes</span>
                  </div>
                </div>
              </div>
              {/* Exercises List */}
              <h3 className="text-white font-medium mb-3">Exercises Completed</h3>
              <div className="space-y-3">
                {workoutExercises.map((exercise) => (
                  <div key={exercise.id} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{exercise.name}</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-gray-700 rounded-lg p-2">
                        <span className="block text-gray-400">Sets</span>
                        <span className="text-white font-medium">{exercise.sets}</span>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-2">
                        <span className="block text-gray-400">Reps</span>
                        <span className="text-white font-medium">{exercise.reps}</span>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-2">
                        <span className="block text-gray-400">Weight</span>
                        <span className="text-white font-medium">{exercise.weight} lbs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-gray-900">
          {editMode ? (
            // Edit mode buttons
            <div className="flex space-x-3">
              <button
                onClick={toggleEditMode}
                className="flex-1 py-2 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={toggleEditMode}
                className="flex-1 py-2 bg-green-600 rounded-lg text-white font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          ) : (
            // View mode buttons
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 py-2 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
              
              {isStatic ? (
                <button
                  className="flex-1 py-2 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-colors"
                >
                  Add to Today
                </button>
              ) : (
                <>
                  <button
                    onClick={toggleEditMode}
                    className="flex-1 py-2 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Workout
                  </button>
                  <button
                    onClick={handleDeleteWorkout}
                    className="py-2 px-4 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
          </div>
        </div>
      )}
    </>
  );
}
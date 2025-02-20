"use client";

import { useState } from 'react';
import { Mail, X, ArrowRight, Clock, Calendar, Dumbbell, Plus, Minus, Search, Timer } from 'lucide-react';

export default function AddWorkoutModal({ isOpen, setIsOpen }) {
  const [workoutData, setWorkoutData] = useState({
    name: '',
    type: 'strength',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  });

  const [exercises, setExercises] = useState([
    { id: 1, name: '', sets: '', reps: '', weight: '', duration: '' }
  ]);

  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExerciseChange = (id, field, value) => {
    setExercises(prev => prev.map(exercise => 
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    ));
  };

  const addExercise = () => {
    setExercises(prev => [
      ...prev,
      { id: prev.length + 1, name: '', sets: '', reps: '', weight: '', duration: '' }
    ]);
  };

  const removeExercise = (id) => {
    if (exercises.length > 1) {
      setExercises(prev => prev.filter(exercise => exercise.id !== id));
    }
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
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg relative animate-fadeIn flex flex-col max-h-[90vh]">
            {/* Fixed Header */}
            <div className="p-6 border-b border-gray-800">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Add Workout</h2>
                <p className="text-gray-400 mt-1">Log your workout session</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[60vh] pl-4 pr-4 mb-10 custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Workout Name */}
                <div>
                  <label className="block text-gray-400 mb-1 text-sm">Workout Name</label>
                  <div className="relative">
                    <Dumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter workout name"
                      value={workoutData.name}
                      onChange={handleWorkoutChange}
                      className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                {/* Workout Type and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Type</label>
                    <select
                      name="type"
                      value={workoutData.type}
                      onChange={handleWorkoutChange}
                      className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                    >
                      <option value="strength">Strength Training</option>
                      <option value="cardio">Cardio</option>
                      <option value="hiit">HIIT</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Duration (mins)</label>
                    <div className="relative">
                      <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="duration"
                        value={workoutData.duration}
                        onChange={handleWorkoutChange}
                        className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="date"
                        value={workoutData.date}
                        onChange={handleWorkoutChange}
                        className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        value={workoutData.time}
                        onChange={handleWorkoutChange}
                        className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Exercises */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Exercises</h3>
                    <button
                      type="button"
                      onClick={addExercise}
                      className="text-orange-500 hover:text-orange-400 flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Exercise</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {exercises.map((exercise) => (
                      <div key={exercise.id} className="bg-gray-800 p-4 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="Exercise name"
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                            className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-orange-500 flex-grow mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeExercise(exercise.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(exercise.id, 'sets', e.target.value)}
                            className="bg-gray-700 text-white rounded-lg px-3 py-1 border border-gray-600 focus:outline-none focus:border-orange-500"
                          />
                          <input
                            type="number"
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(exercise.id, 'reps', e.target.value)}
                            className="bg-gray-700 text-white rounded-lg px-3 py-1 border border-gray-600 focus:outline-none focus:border-orange-500"
                          />
                          <input
                            type="number"
                            placeholder="Weight"
                            value={exercise.weight}
                            onChange={(e) => handleExerciseChange(exercise.id, 'weight', e.target.value)}
                            className="bg-gray-700 text-white rounded-lg px-3 py-1 border border-gray-600 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 border-t border-gray-800">
              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Save Workout</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import { useState, useEffect } from 'react';
import { X, ArrowRight, Clock, Calendar, Dumbbell, Timer, CheckCircle, Edit, Trash2, Save } from 'lucide-react';
import { deleteWorkout } from './workoutService';

export default function ViewWorkoutModal({ isOpen, setIsOpen, workoutData, isStatic, onChange}) {
  const [editMode, setEditMode] = useState(false);
  const [workoutDataState, setWorkoutDataState] = useState(workoutData);
  const [exercises, setExercises] = useState(workoutData?.exercises || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && workoutData) {
      setWorkoutDataState(workoutData);
      setExercises(workoutData.exercises || []);
    }
  }, [isOpen, workoutData]);

  const getWorkoutTypeLabel = (type) => {
    const types = {
      strength: 'Strength Training',
      cardio: 'Cardio',
      hiit: 'HIIT',
      flexibility: 'Flexibility',
    };
    return types[type] || type;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleClose = () => {
    if (editMode) toggleEditMode();
    setIsOpen(false);
  };

  const handleDeleteWorkout = async () => {
    if (editMode) toggleEditMode();
  
    try {
      await deleteWorkout(workoutData.id); // Pass the workout's ID to delete it
      onChange?.();
      setIsOpen(false); // Close the modal
    } catch (error) {
      console.error('Error deleting workout:', error);
      // Optionally, show some feedback to the user about the error
    }
    

  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setWorkoutDataState({
      ...workoutDataState,
      [e.target.name]: e.target.value
    });
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleSave = () => {
    console.log('Saved workout:', workoutDataState);
    console.log('Saved exercises:', exercises);
    toggleEditMode();
    // Implement save API call here
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {isOpen && workoutDataState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg relative animate-fadeIn flex flex-col max-h-[90vh]">
            <div className="overflow-y-auto max-h-[60vh] p-6 custom-scrollbar">
              {/* Workout Overview Card */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Dumbbell className="h-5 w-5 text-orange-500 mr-2" />
                    {editMode ? (
                      <input
                        name="name"
                        value={workoutDataState.name}
                        onChange={handleInputChange}
                        className="text-lg font-semibold text-white bg-transparent border border-gray-600 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-white">{workoutDataState.name}</h3>
                    )}
                  </div>
                  {editMode ? (
                    <select
                      name="type"
                      value={workoutDataState.type}
                      onChange={handleInputChange}
                      className="text-xs font-medium px-2 py-1 bg-gray-700 rounded text-white"
                    >
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="hiit">HIIT</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                  ) : (
                    <span className="bg-orange-500 bg-opacity-20 text-orange-500 px-3 py-1 rounded-full text-xs font-medium">
                      {getWorkoutTypeLabel(workoutDataState.type)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {editMode ? (
                      <input
                        type="date"
                        name="date"
                        value={workoutDataState.date}
                        onChange={handleInputChange}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{formatDate(workoutDataState.date)}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {editMode ? (
                      <input
                        type="time"
                        name="time"
                        value={workoutDataState.time}
                        onChange={handleInputChange}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{workoutDataState.time}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Timer className="h-4 w-4 mr-2" />
                    {editMode ? (
                      <input
                        type="number"
                        name="duration"
                        value={workoutDataState.duration}
                        onChange={handleInputChange}
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span>{workoutDataState.duration} minutes</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Exercises List */}
              <h3 className="text-white font-medium mb-3">Exercises Completed</h3>
              <div className="space-y-3">
                {exercises.map((exercise, index) => (
                  <div key={exercise.id} className="bg-gray-800 p-4 rounded-lg">
                    {editMode ? (
                      <input
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                        className="text-white font-medium mb-2 bg-gray-700 rounded p-2 w-full"
                      />
                    ) : (
                      <h4 className="text-white font-medium mb-2">{exercise.name}</h4>
                    )}
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {['sets', 'reps', 'weight'].map((field) => (
                        <div key={field} className="bg-gray-700 rounded-lg p-2">
                          <span className="block text-gray-400 capitalize">{field}</span>
                          {editMode ? (
                            <input
                              type="text"
                              value={exercise[field]}
                              onChange={(e) => handleExerciseChange(index, field, e.target.value)}
                              className="text-white bg-transparent w-full"
                            />
                          ) : (
                            <span className="text-white font-medium">
                              {field === 'weight' ? `${exercise[field]} lbs` : exercise[field]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-gray-900">
              {editMode ? (
                <div className="flex space-x-3">
                  <button
                    onClick={toggleEditMode}
                    className="flex-1 py-2 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2 bg-green-600 rounded-lg text-white font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-2 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  {isStatic ? (
                    <button className="flex-1 py-2 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-colors">
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

import { db, auth } from '../firebase/firebase';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc} from 'firebase/firestore';

/**
 * Add a new workout to Firestore
 * @param {Object} workoutData - Workout info (name, type, duration, date, time)
 * @param {Array} exercises - List of exercises associated with the workout
 */
export async function addWorkout(workoutData, exercises) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const workout = {
      userId: user.uid,
      ...workoutData,
      exercises,
      createdAt: new Date().toISOString()
    };

    await addDoc(collection(db, 'workouts'), workout);
  } catch (error) {
    console.error('Error adding workout:', error);
    throw error;
  }
}

/**
 * Fetch all workouts for the currently authenticated user
 * @returns {Promise<Array>} List of workouts
 */
export async function getWorkoutsForUser() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const q = query(
      collection(db, 'workouts'),
      where('userId', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);

    const workouts = [];
    querySnapshot.forEach(doc => {
      workouts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return workouts;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
}

  export async function deleteWorkout(workoutId) {
    const user = auth.currentUser;
  
    if (!user) {
      throw new Error('User not authenticated');
    }
  
    try {
      // Reference to the workout document to delete
      const workoutDocRef = doc(db, 'workouts', workoutId);
  
      // Delete the workout document
      await deleteDoc(workoutDocRef);
      console.log('Workout deleted successfully');
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }

  export const updateWorkout = async (id, updatedWorkout) => {
    const workoutRef = doc(db, "workouts", id);
    await updateDoc(workoutRef, updatedWorkout);
  };


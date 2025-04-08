import { db, auth } from '../firebase/firebase'; // Make sure you import your initialized Firebase app
import { collection, addDoc } from 'firebase/firestore';

/**
 * Save a meal to Firestore under the current user's UID
 * @param {Object} mealData - The meal data from the form
 * @returns {Promise<string>} - ID of the new meal document
 */
export const addMealForUser = async (mealData) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const mealRef = collection(db, "users", user.uid, "meals");

  const docRef = await addDoc(mealRef, {
    ...mealData,
    createdAt: new Date()
  });

  return docRef.id;
};

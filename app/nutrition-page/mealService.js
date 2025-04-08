import { db, auth } from '../firebase/firebase'; // Make sure you import your initialized Firebase app
import { collection,query,  addDoc, getDocs } from 'firebase/firestore';

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
export const getMealsForUser = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      throw new Error("User not authenticated");
    }
  
    const mealRef = collection(db, "users", user.uid, "meals");
    const q = query(mealRef);
  
    // Fetch the meals for the authenticated user
    const querySnapshot = await getDocs(q);
  
    const meals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  
    return meals;
  };
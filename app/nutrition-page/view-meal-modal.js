"use client";

import { useState } from 'react';
import { X, Clock, Utensils, Apple, ChevronDown, ChevronUp, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function ViewMealModal({ isOpen, setIsOpen, meal, isStatic, onSave }) {
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Default meal data in case no meal is passed
  const defaultMeal = {
    name: "High Protein Breakfast",
    image: "/api/placeholder/600/300",
    calories: "450",
    protein: "35g",
    carbs: "40g",
    fats: "15g",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: "2",
    ingredients: [
      "4 large eggs",
      "1/2 cup Greek yogurt",
      "1/4 cup oats",
      "1 tbsp olive oil",
      "1/2 avocado",
      "1 cup spinach",
      "2 slices whole grain bread",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Beat eggs in a bowl and season with salt and pepper.",
      "Heat olive oil in a pan over medium heat.",
      "Add spinach and cook until wilted, about 1 minute.",
      "Pour in eggs and cook until set but still moist, stirring occasionally.",
      "While eggs cook, toast the bread slices.",
      "Mash avocado and spread on toast.",
      "Serve eggs with avocado toast and a side of Greek yogurt mixed with oats."
    ],
    nutritionFacts: {
      saturatedFat: "5g",
      transFat: "0g",
      cholesterol: "370mg",
      sodium: "580mg",
      dietaryFiber: "8g",
      sugars: "6g",
      vitaminD: "15%",
      calcium: "20%",
      iron: "15%",
      potassium: "12%"
    }
  };

  const mealData = meal || defaultMeal;
  
  // State for edited meal data
  const [editedMeal, setEditedMeal] = useState(mealData);
  
  // New state for ingredient and instruction management
  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState("");

  if (!isOpen) return null;

  const handleEditMeal = () => {
    setIsEditMode(true);
    setEditedMeal({...mealData});
  };

  const handleSaveMeal = () => {
    // Call the onSave prop with the updated meal data
    if (onSave) {
      onSave(editedMeal);
    }
    
    // Exit edit mode
    setIsEditMode(false);
    
    console.log("Saved meal:", editedMeal);
  };

  const handleCancelEdit = () => {
    // Reset edited meal and exit edit mode
    setEditedMeal({...mealData});
    setIsEditMode(false);
  };

  const handleDeleteMeal = () => {
    // Add your delete meal functionality here
    console.log("Delete meal:", mealData);
    if (confirm("Are you sure you want to delete this meal?")) {
      // Delete logic here
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties like nutritionFacts.saturatedFat
      const [parent, child] = name.split('.');
      setEditedMeal({
        ...editedMeal,
        [parent]: {
          ...editedMeal[parent],
          [child]: value
        }
      });
    } else {
      // Handle top-level properties
      setEditedMeal({
        ...editedMeal,
        [name]: value
      });
    }
  };

  // Functions to manage ingredients
  const addIngredient = () => {
    if (newIngredient.trim()) {
      setEditedMeal({
        ...editedMeal,
        ingredients: [...editedMeal.ingredients, newIngredient.trim()]
      });
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...editedMeal.ingredients];
    updatedIngredients.splice(index, 1);
    setEditedMeal({
      ...editedMeal,
      ingredients: updatedIngredients
    });
  };

  // Functions to manage instructions
  const addInstruction = () => {
    if (newInstruction.trim()) {
      setEditedMeal({
        ...editedMeal,
        instructions: [...editedMeal.instructions, newInstruction.trim()]
      });
      setNewInstruction("");
    }
  };

  const removeInstruction = (index) => {
    const updatedInstructions = [...editedMeal.instructions];
    updatedInstructions.splice(index, 1);
    setEditedMeal({
      ...editedMeal,
      instructions: updatedInstructions
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar animate-fadeIn">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          {isEditMode ? (
            <input 
              type="text" 
              name="name" 
              value={editedMeal.name} 
              onChange={handleInputChange}
              className="text-xl font-bold text-white bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full mr-4"
            />
          ) : (
            <h2 className="text-xl font-bold text-white">{mealData.name}</h2>
          )}
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Nutritional summary */}
        <div className="p-4 border-b border-gray-800">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">Calories</div>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="calories" 
                  value={editedMeal.calories} 
                  onChange={handleInputChange}
                  className="text-white font-bold bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full text-center"
                />
              ) : (
                <div className="text-white font-bold">{mealData.calories}</div>
              )}
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">Protein</div>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="protein" 
                  value={editedMeal.protein} 
                  onChange={handleInputChange}
                  className="text-white font-bold bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full text-center"
                />
              ) : (
                <div className="text-white font-bold">{mealData.protein}</div>
              )}
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">Carbs</div>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="carbs" 
                  value={editedMeal.carbs} 
                  onChange={handleInputChange}
                  className="text-white font-bold bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full text-center"
                />
              ) : (
                <div className="text-white font-bold">{mealData.carbs}</div>
              )}
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">Fats</div>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="fats" 
                  value={editedMeal.fats} 
                  onChange={handleInputChange}
                  className="text-white font-bold bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full text-center"
                />
              ) : (
                <div className="text-white font-bold">{mealData.fats}</div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {isEditMode ? (
                <input 
                  type="text" 
                  name="prepTime" 
                  value={editedMeal.prepTime} 
                  onChange={handleInputChange}
                  className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1 w-24"
                  placeholder="Prep time"
                />
              ) : (
                <span>Prep: {mealData.prepTime}</span>
              )}
            </div>
            <div className="flex items-center">
              <Utensils className="w-4 h-4 mr-1" />
              {isEditMode ? (
                <input 
                  type="text" 
                  name="cookTime" 
                  value={editedMeal.cookTime} 
                  onChange={handleInputChange}
                  className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1 w-24"
                  placeholder="Cook time"
                />
              ) : (
                <span>Cook: {mealData.cookTime}</span>
              )}
            </div>
            <div className="flex items-center">
              <Apple className="w-4 h-4 mr-1" />
              {isEditMode ? (
                <input 
                  type="text" 
                  name="servings" 
                  value={editedMeal.servings} 
                  onChange={handleInputChange}
                  className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1 w-24"
                  placeholder="Servings"
                />
              ) : (
                <span>Servings: {mealData.servings}</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Ingredients */}
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">Ingredients</h3>
          {isEditMode ? (
            <>
              <ul className="space-y-2 mb-4">
                {editedMeal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="flex-grow">{ingredient}</span>
                    <button 
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-400 ml-2"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={e => setNewIngredient(e.target.value)}
                  placeholder="Add new ingredient"
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white"
                  onKeyPress={e => e.key === 'Enter' && addIngredient()}
                />
                <button
                  onClick={addIngredient}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-r"
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <ul className="space-y-2">
              {mealData.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Instructions */}
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
          {isEditMode ? (
            <>
              <ol className="space-y-3 mb-4">
                {editedMeal.instructions.map((step, index) => (
                  <li key={index} className="text-gray-300">
                    <div className="flex">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="flex-grow">{step}</span>
                      <button 
                        onClick={() => removeInstruction(index)}
                        className="text-red-500 hover:text-red-400 ml-2"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newInstruction}
                  onChange={e => setNewInstruction(e.target.value)}
                  placeholder="Add new instruction step"
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white"
                  onKeyPress={e => e.key === 'Enter' && addInstruction()}
                />
                <button
                  onClick={addInstruction}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-r"
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <>
              <ol className="space-y-3">
                {mealData.instructions.slice(0, showFullRecipe ? mealData.instructions.length : 3).map((step, index) => (
                  <li key={index} className="text-gray-300">
                    <div className="flex">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  </li>
                ))}
              </ol>
              
              {mealData.instructions.length > 3 && (
                <button 
                  onClick={() => setShowFullRecipe(!showFullRecipe)}
                  className="text-orange-500 mt-4 flex items-center hover:text-orange-400 transition-colors"
                >
                  {showFullRecipe ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show full recipe
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Detailed nutrition facts */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Nutrition Facts</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {isEditMode ? (
              // Editable nutrition facts
              Object.entries(editedMeal.nutritionFacts).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                return (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400">{label}</span>
                    <input 
                      type="text" 
                      name={`nutritionFacts.${key}`} 
                      value={value} 
                      onChange={handleInputChange}
                      className="text-white bg-gray-800 border border-gray-700 rounded px-2 py-1 w-24 text-right"
                    />
                  </div>
                );
              })
            ) : (
              // Display nutrition facts
              Object.entries(mealData.nutritionFacts).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                return (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white">{value}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-gray-900">
          {isEditMode ? (
            // Edit mode buttons
            <div className="flex space-x-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 py-2 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMeal}
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
                onClick={() => (setIsOpen(false))}
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
                    onClick={handleEditMeal}
                    className="flex-1 py-2 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Meal
                  </button>
                  <button
                    onClick={handleDeleteMeal}
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
  );
}
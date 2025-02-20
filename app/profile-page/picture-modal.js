"use client";

import { useState, useRef } from 'react';
import { Mail, X, ArrowRight, Upload, Camera, Trash2, Image } from 'lucide-react';

export default function PictureModal({ isOpen, setIsOpen }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    // Handle saving the profile picture here
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Content */}
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Update Profile Picture</h2>
              <p className="text-gray-400 mt-1">Upload a new profile picture</p>
            </div>

            {/* Image Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center transition-colors
                ${isDragging ? 'border-orange-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'}
                ${previewImage ? 'bg-gray-800' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                    <Camera className="h-10 w-10 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Drag and drop your image here or</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-orange-500 hover:text-orange-400 font-medium"
                    >
                      browse files
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!previewImage}
              className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors
                ${previewImage 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
            >
              <span>Save Profile Picture</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
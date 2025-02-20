"use client";

import { useState } from 'react';
import { Mail, X, ArrowRight } from 'lucide-react';

export default function PersonalModal({ isOpen, setIsOpen }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false); // Close the modal after the form is submitted
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
              
            </div>

          </div>
        </div>
      )}
    </>
  );
}

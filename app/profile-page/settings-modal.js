"use client";

import { useState } from 'react';
import { Mail, X, ArrowRight, Bell, Moon, Shield } from 'lucide-react';

export default function SettingsModal({ isOpen, setIsOpen }) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    workout: true,
    nutrition: true
  });

  const [darkMode, setDarkMode] = useState(true);
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activitySharing: true
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <p className="text-gray-400 mt-1">Customize your StayFit experience</p>
            </div>

            {/* Notifications Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Email Notifications</span>
                  <button
                    onClick={() => toggleNotification('email')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.email ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      notifications.email ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Privacy</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Profile Visibility</span>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy(prev => ({...prev, profileVisibility: e.target.value}))}
                    className="bg-gray-800 text-gray-300 rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-orange-500"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Activity Sharing</span>
                  <button
                    onClick={() => setPrivacy(prev => ({...prev, activitySharing: !prev.activitySharing}))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      privacy.activitySharing ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      privacy.activitySharing ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Save Changes</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
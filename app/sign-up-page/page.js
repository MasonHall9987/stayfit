"use client"

import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation"; // Import useRouter
import TermsConditionsModal from './terms-conditions-modal';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state


    const router = useRouter(); // Initialize router
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  const handleSignIn = (e) => {
    router.back();
    // Handle sign in logic here
  };

  const handleTermsConditions = () => {
    setIsModalOpen(true); // Show the modal when "Forgot password?" is clicked
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Logo and Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-2">StayFit</h1>
        <p className="text-gray-400">Create your account to start your fitness journey</p>
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl text-white mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-700 bg-gray-800 text-orange-500"
              required
            />
            <span className="text-sm text-gray-400">
              I agree to the{' '}
            <button
            type="button"
            onClick={handleTermsConditions}
            className="text-sm text-orange-500 hover:text-orange-400"
            >
            Terms and Conditions
            </button>
            </span>
          </div>

          {/* Sign Up Button */}
          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={handleSignIn}  // Button to trigger handleSignUp function
              className="text-orange-500 hover:text-orange-400"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <TermsConditionsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

    </div>
  );
}
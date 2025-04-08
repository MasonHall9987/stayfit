"use client";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import ForgotPasswordModal from "./sign-in-page/forgot-password-modal"; 
import { doSignInWithEmailAndPassword } from "./firebase/auth";
import { useAuth } from "./contexts/authContext";
import { getAuth } from "firebase/auth";
export default function Home() {
  const auth = useAuth(); // Fetch auth context
  const userLoggedIn = auth?.userLoggedIn || false; // Prevent crash if undefined
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const db = getFirestore();
  const authInstance = getAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSigningIn) return; // Prevent multiple clicks
    setIsSigningIn(true);

    try {
      await doSignInWithEmailAndPassword(email, password);
      alert("Signed in successfully!");
      router.push("/profile-page"); // Redirect after successful login
    } catch (error) {
      alert(error.message); // Display error
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignUp = () => {
    router.push("/sign-up-page");
  };

  const handleForgotPassword = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-2">StayFit</h1>
        <p className="text-gray-400">Welcome back! Please sign in to continue.</p>
      </div>

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl text-white mb-6">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-700 bg-gray-800 text-orange-500"
              />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              Forgot password?
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={handleSignUp}
              className="text-orange-500 hover:text-orange-400"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      <ForgotPasswordModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

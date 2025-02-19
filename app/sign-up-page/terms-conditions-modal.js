"use client";

import { useState, useEffect } from "react";
import { Mail, X, ArrowRight } from 'lucide-react';

export default function TermsConditionsModal({ isOpen, setIsOpen }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setIsOpen(false); // Close the modal after the form is submitted
  };

  const termsContent = `Welcome to StayFit Terms and Conditions

1. Acceptance of Terms
By accessing and using the StayFit application ("App"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the App.

2. User Registration
2.1. You must provide accurate and complete information when creating an account.
2.2. You are responsible for maintaining the confidentiality of your account credentials.
2.3. You must be at least 18 years old to use this service.

3. Privacy Policy
3.1. Your use of the App is also governed by our Privacy Policy.
3.2. We collect and process personal data as described in our Privacy Policy.

4. User Conduct
4.1. You agree not to misuse the App or help anyone else do so.
4.2. You are responsible for all activity that occurs under your account.

5. Subscription and Payments
5.1. Some features of the App require a paid subscription.
5.2. All payments are non-refundable unless required by law.
5.3. We may change subscription fees upon notice.

6. Content and Intellectual Property
6.1. The App and its original content are protected by copyright and other laws.
6.2. You retain ownership of your user-generated content.

7. Disclaimer of Warranties
7.1. The App is provided "as is" without any warranties.
7.2. We do not guarantee that the App will be error-free or uninterrupted.

8. Limitation of Liability
8.1. We are not liable for any indirect, incidental, or consequential damages.
8.2. Our liability is limited to the amount paid for the service.

9. Termination
9.1. We may terminate or suspend your account at our discretion.
9.2. You may terminate your account at any time.

10. Changes to Terms
10.1. We may modify these terms at any time.
10.2. Continued use of the App constitutes acceptance of modified terms.

11. Contact Information
For questions about these Terms, please contact us at support@stayfit.com

Last updated: February 18, 2025`;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Content */}
          <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-lg p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl text-white mb-2">Terms and Conditions</h2>
            </div>

            {/* Scrollable Content Container */}
            <div className="relative">
              <div className="overflow-y-auto max-h-[60vh] pr-4 mb-6 custom-scrollbar">
                <div className="text-gray-400 text-left whitespace-pre-line">
                  {termsContent}
                </div>
              </div>
            </div>

            {/* Accept/Decline Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}
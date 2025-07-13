import React, { useState, useEffect } from "react";
import { showSuccessToast, showErrorToast } from "../helpers/helper";

const VerifyEmail = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);
 

  const resendVerificationEmail = async () => {
   
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessToast(data.message || "Verification link has been resent to your email.");
      } else {
        showErrorToast(data.message || "Failed to resend verification email.");
      }
    } catch (error) {
      showErrorToast("Something went wrong");
    } 
  };

  // If still loading user data
  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  // If email is not verified
  if (user?.email_verified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-2 text-red-600">Email Not Verified</h2>
          <p className="mb-4 text-gray-700">
            Please verify your email address to access the dashboard.
          </p>

          <button
            onClick={resendVerificationEmail}
            className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
          >
           Resend Verification Link
          </button>
        </div>
      </div>
    );
  }

  
};

export default VerifyEmail;

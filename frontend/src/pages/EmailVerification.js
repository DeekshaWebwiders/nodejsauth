import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../helpers/helper";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        showErrorToast("Invalid or missing token");
        navigate("/verify-email");
        return;
      }

      try {
        
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/auth/verify-email?token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Verification response:", data);

        if (data.status === true) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data.data.user));

          // Delay redirect to show message
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000); 

        } 
      } catch (error) {
        console.error("Error verifying email:", error);
      } 
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          {loading ? "Verifying Email..." : "Email Verification"}
        </h2>
        <p className="text-gray-600">
          {loading
            ? "Please wait while we verify your email."
            : "Verification complete. Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;

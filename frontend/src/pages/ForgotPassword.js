import React, { useState } from "react";
import Layout from "../layouts/BeforeLogin/Layout";
import { showSuccessToast, showErrorToast } from "../helpers/helper";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  /**
   * Handle input field changes in the registration/login form.
   *
   * This function updates the `formData` state dynamically based on the input's `name` attribute.
   * It ensures that the component maintains a controlled form by reflecting the latest input values in state.
   *
   * Commonly used for all standard input types like text, email, number, password, etc.
   *
   * @param {Event} e - The input change event object triggered by the user
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle forgot password form submission.
   *
   * This function allows users to request a password reset by:
   * - Preventing default form submission behavior.
   * - Sending a POST request to the `/auth/forget-password` endpoint with the user's email.
   * - Handling different response scenarios:
   *    - On success:
   *        - Displays a success toast with the server message.
   *        - Clears form input and errors.
   *        - Redirects the user to the login page after a short delay.
   *    - On validation error (HTTP 422): Displays field-level validation messages.
   *    - On other failures: Displays a generic error toast.
   * - Catches and logs unexpected errors.
   *
   * Expected Request:
   * - Body: { email }
   *
   * Response:
   * - Success: { message }
   * - Error: { message } or { errors }
   *
   * @param {Event} e - The form submission event.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        showSuccessToast(data.message || "Password reset successful!");
        setErrors({});
        setFormData({ email: "" });

        // Redirect to login after success
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        showErrorToast(data.message || "Password reset request failed!");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      showErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <section>
        <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
          <div className="container z-1">
            <div className="flex flex-wrap -mx-3">
              <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                <div className="relative flex flex-col min-w-0 bg-white border-0 shadow-lg rounded-2xl">
                  <div className="p-6 pb-0 mb-0">
                    <h4 className="font-bold">Forgot Password</h4>
                    <p className="mb-0">Enter your email. A 6-digit password will be sent.</p>
                  </div>
                  <div className="flex-auto p-6">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                          className="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold text-white transition-all bg-blue-500 border-0 rounded-lg hover:-translate-y-px active:opacity-85 hover:shadow-md text-sm"
                        >
                          Send
                        </button>
                      </div>

                      <p className="mx-auto mt-4 text-sm text-center">
                        <Link
                          to="/"
                          className="font-semibold text-blue-500 hover:underline"
                        >
                          Back to Login
                        </Link>
                      </p>
                    </form>
                  </div>
                  <div className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                    <p className="mx-auto mb-6 text-sm">
                      Don’t have an account?{" "}
                      <Link
                        to="/register"
                        className="font-semibold text-blue-500 hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side image panel */}
              <div className="absolute top-0 right-0 hidden w-6/12 h-full px-3 pr-0 lg:flex">
                <div className="relative flex flex-col justify-center h-full px-24 m-4 overflow-hidden bg-cover rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')]">
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60"></span>
                  <h4 className="z-20 mt-12 font-bold text-white">"Attention is the new currency"</h4>
                  <p className="z-20 text-white">
                    The more effortless the writing looks, the more effort the
                    writer actually put into the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;

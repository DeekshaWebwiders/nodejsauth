import React, { useState } from "react";
import { showSuccessToast, showErrorToast } from "../helpers/helper";
import { useNavigate ,Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  /**
   * Handle form input changes.
   *
   * This function updates the `formData` state whenever an input field changes by:
   * - Extracting the `name` and `value` from the event target.
   * - Updating the corresponding field in the form data state.
   *
   * Used for controlled form inputs.
   *
   * @param {object} e - The input change event object.
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle login form submission.
   *
   * This function manages the login process by:
   * - Preventing the default form submission behavior.
   * - Preparing and sending a POST request with user credentials.
   * - Parsing the JSON response and handling different outcomes:
   * - On success: 
   * - Stores JWT token in localStorage.
   * - Decodes and stores user info from token.
   * - Shows success toast and resets form.
   * - Navigates to the dashboard after a short delay.
   * - On validation error (422): Displays field-level errors.
   * - On other errors: Displays a generic error toast.
   * - Catches and logs any unexpected errors.
   *
   * Expected Request:
   * - Body: { email, password }
   *
   * Response:
   * - Success: { status: true, data: { token }, message }
   * - Error: { status: false, message or errors }
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === true) {

        localStorage.setItem("token", data.data.token); // JWT token

        // Optional: Decode JWT to get user info
        const base64Payload = data.data.token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        localStorage.setItem("user", JSON.stringify(decodedPayload)); 


        showSuccessToast(data.message || "Signin successful!");
        setErrors({});

        // Reset form
        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/dashboard"); 
        }, 1000);

      }else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        showErrorToast(data.message || "Signin failed!");
      }

    } catch (error) {
      console.error("Signup error:", error);
      showErrorToast("Something went wrong. Please try again.");
    }
  };


  return (
    <section>
      <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
        <div className="container z-1">
          <div className="flex flex-wrap -mx-3">
            <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
              <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-gray-950 rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 mb-0">
                  <h4 className="font-bold">Sign In</h4>
                  <p className="mb-0">Enter your email and password to sign in</p>
                </div>
                <div className="flex-auto p-6">
                  <form role="form"  onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <p className="mx-auto mb-6 leading-normal text-sm">
                      <Link to="/forgot-password" className="font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500">
                        Forgot password
                      </Link>
                    </p>
                    <div className="text-center">
                      <button type="submit" className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25">Sign in</button>
                    </div>
                  </form>
                </div>
                <div className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                  <p className="mx-auto mb-6 leading-normal text-sm">Don't have an account?
                    <Link to="/register" className="font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500">
                      ign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
              <div className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')] rounded-xl ">
                <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60"></span>
                <h4 className="z-20 mt-12 font-bold text-white">"Attention is the new currency"</h4>
                <p className="z-20 text-white ">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;


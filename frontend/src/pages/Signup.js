import React, { useState } from "react";
import { showSuccessToast, showErrorToast } from "../helpers/helper";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profile_picture: null,
  });

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('/default-profile.png');
  const navigate = useNavigate(); 

  /**
   * Handle registration form submission.
   *
   * This function manages the signup process by:
   * - Preventing the default form submission behavior.
   * - Constructing a FormData payload from the form state, including file upload (profile picture).
   * - Sending a POST request to the backend `/auth/register` endpoint.
   * - Handling the response:
   *   - On success:
   *     - Displays a success toast.
   *     - Clears form errors and resets the form.
   *     - Redirects to the home/login page after a short delay.
   *   - On validation error (HTTP 422): Sets field-specific errors.
   *   - On other errors: Displays a generic error toast.
   * - Catches and logs any unexpected errors during the request.
   *
   * Expected Request (FormData):
   * - name, email, mobile, gender, password, confirmPassword, profile_picture
   *
   * Response:
   * - Success: { status: true, message }
   * - Error: { status: false, message or errors }
   *
   * @param {Event} e - The form submission event.
  */
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Set image preview
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(`/default-profile.png`);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /**
   * Handle registration form submission.
   *
   * This function is responsible for:
   * - Preventing the default form submission behavior.
   * - Building a FormData object from the form state, including text fields and file input.
   * - Sending a POST request to the `/auth/register` API endpoint using the base URL from environment variables.
   * - Parsing the response and:
   *    - On success:
   *        - Showing a success toast.
   *        - Clearing form errors and resetting form data.
   *        - Navigating the user to the homepage after a short delay.
   *    - On validation error (HTTP 422):
   *        - Displaying field-level error messages.
   *    - On other errors:
   *        - Showing a generic error toast.
   * - Logging any unexpected errors and informing the user of failure.
   *
   * Expected Form Fields:
   * - name, email, mobile, gender, password, confirmPassword, profile_picture (as file)
   *
   * Response:
   * - Success: { status: true, message }
   * - Validation Error: { status: false, errors }
   * - Failure: { status: false, message }
   *
   * @param {Event} e - Form submission event
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      console.log(data);
      if (data.status === true) {
        showSuccessToast(data.message || "Signup successful!");
        setErrors({});

        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          gender: "",
          password: "",
          confirmPassword: "",
          profile_picture: null,
        });

        setTimeout(() => {
          navigate("/"); 
        }, 1000);

      }else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        showErrorToast(data.message || "Signup failed!");
      }

    } catch (error) {
      console.error("Signup error:", error);
      showErrorToast("Something went wrong. Please try again.");
    }
  };


  return (
    <section className="min-h-screen">
      <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-50-screen rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60"></span>
        <div className="container z-10">
          <div className="flex flex-wrap justify-center -mx-3">
            <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
              <h1 className="mt-12 mb-2 text-white">Welcome!</h1>
              <p className="text-white">Use these awesome forms to login or create new account in your project for free.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
              <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                <h5>Register with</h5>
              </div>

              <div className="flex-auto p-6">
                <form role="form text-left" onSubmit={handleSubmit} >
                  <div className="flex justify-center mb-6 relative">
                    <input
                      type="file"
                      name="profile_picture"
                      accept="image/*"
                      onChange={handleChange}
                      id="profile-upload"
                      className="hidden"
                    />
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        style={{ height: '200px', width: '200px' }}
                        className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover shadow-md"
                      />
                      <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 9.828V15a2 2 0 002 2h2" />
                        </svg>
                      </div>
                    </label>
                    {errors.profile_picture && <p className="text-red-500 text-sm mt-1">{errors.profile_picture}</p>}
                    <div>

                    </div>


                  </div>


                  <div className="mb-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Name" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  <div className="mb-4">
                    <select name="gender" value={formData.gender} onChange={handleChange} className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>

                  <div className="mb-4">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Password" />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="mb-4">
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div className="text-center">
                    <button type="submit" className="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white">Sign up</button>
                  </div>
                  <p className="mt-4 mb-0 leading-normal text-sm">Already have an account? <a href="../pages/sign-in.html" className="font-bold text-slate-700">Sign in</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "../helpers/helper";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    profile_picture: null,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewUrl, setPreviewUrl] = useState("/default-profile.png");
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [userId, setUserId] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const { id, name, email, mobile, gender, profile_picture } = storedUser;
      setUserId(id);
      setFormData({
        name,
        email,
        mobile,
        gender,
        profile_picture: null,
      });
      
      if (profile_picture) {
        setPreviewUrl(`${process.env.REACT_APP_URL}/${profile_picture}`);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) payload.append(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/update-profile/${userId}`, {
        method: "PUT",
        body: payload,
      });

      const data = await response.json();
      if (data.status) {
        showSuccessToast("Profile updated successfully");
        setErrors({});

        const storedUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...storedUser,
          ...formData,
          profile_picture: data.data.user?.profile_picture || storedUser.profile_picture,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Immediately show updated image
        if (data.user?.profile_picture) {
          setPreviewUrl(`${process.env.REACT_APP_URL}/${data.user.profile_picture}`);
        }

        setFormData(prev => ({ ...prev, profile_picture: null }));
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        showErrorToast(data.message || "Profile update failed");
      }
    } catch (error) {
      showErrorToast("Something went wrong");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/change-password/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();
      if (data.status) {
        showSuccessToast("Password changed successfully");
        setPasswordErrors({});
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else if (response.status === 422) {
        setPasswordErrors(data.errors || {});
      } else {
        showErrorToast(data.message || "Password change failed");
      }
    } catch (error) {
      showErrorToast("Error occurred");
    }
  };

  return (
    <div className="w-full px-6 py-6 mx-auto space-y-10">
      {/* Section 1: Edit Profile */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="flex justify-center mb-6 relative">
            <input type="file" name="profile_picture" accept="image/*" onChange={handleChange} id="profile-upload" className="hidden" />
            <label htmlFor="profile-upload" className="cursor-pointer">
              <img src={previewUrl} alt="Profile Preview" style={{ width: "100px", height: "100px" }} className="w-32 h-32 rounded-full border-4 object-cover shadow" />
            </label>
          </div>

          <div className="mb-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="w-full p-2 border rounded" />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div className="mb-4">
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <button type="submit" className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25">Update Profile</button>
        </form>
      </div>

      {/* Section 2: Change Password */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} placeholder="Old Password" className="w-full p-2 border rounded" />
            {passwordErrors.oldPassword && <p className="text-red-500 text-sm">{passwordErrors.oldPassword}</p>}
          </div>

          <div className="mb-4">
            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="New Password" className="w-full p-2 border rounded" />
            {passwordErrors.newPassword && <p className="text-red-500 text-sm">{passwordErrors.newPassword}</p>}
          </div>

          <div className="mb-4">
            <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm New Password" className="w-full p-2 border rounded" />
            {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
          </div>

          <button type="submit" className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

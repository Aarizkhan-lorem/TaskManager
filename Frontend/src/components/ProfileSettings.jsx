import React, { useState } from "react";

const ProfileSettings = ({ employee }) => {
  const [profilePic, setProfilePic] = useState(
    employee.profileImage || "/default-avatar.png"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(event.target.files);
    if (file) {
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file)); 
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving profile picture...", selectedFile);
    // TODO: Upload to backend (API call)
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <div className="relative">
        <img
          src={profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">Click image to change</p>

      {/* employee Details */}
      <div className="mt-4 space-y-2 text-center">
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.username}
        </p>
        <p>
          <strong>Role:</strong> {employee.role}
        </p>
      </div>
      <button
        onClick={handleSaveChanges}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;

import React from "react";
const ProfilePic = ({ name }) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${firstLetter}`;

  return (
    <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
  );
};

export default ProfilePic;

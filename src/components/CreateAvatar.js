import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAvatar.css";

const CreateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const navigate = useNavigate();

  // Handle file upload
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setAvatar(uploadedFile);
      setAvatarURL(URL.createObjectURL(uploadedFile)); // Create a URL for the uploaded file
      setIsFileUploaded(true);
    }
  };

  // Function to send image to backend and save it
  const handleAvatarUpload = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userID = user.userid;
    if (!avatar) {
      alert("Please upload a file first!");
      return;
    }

    // FormData to send the file in the POST request
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("user_id", userID); // Add the user_id or get from session/local storage

    try {
      const response = await fetch("http://localhost:3001/api/save-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Avatar updated successfully!");
        navigate("/weekly-space"); // Redirect to another page after successful upload
      } else {
        alert("Error uploading avatar!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading the avatar.");
    }
  };

  const handleRedirect = (url) => {
    if (avatar) {
      handleAvatarUpload();
    } else {
      alert("Please upload a file first!");
    }
  };

  return (
    <div className="avatar-uploader">
      <h1>Upload Your Avatar</h1>
      <div className="avatar-preview">
        {avatarURL ? (
          <img src={avatarURL} alt="Avatar Preview" />
        ) : (
          <p>No avatar uploaded</p>
        )}
      </div>
      <div className="avatar-actions">
        <input
          type="file"
          accept="image/png, image/jpeg" // Accept PNG and JPEG images
          onChange={handleFileChange}
          className="file-input"
        />
        {isFileUploaded && (
          <div className="button-section">
            <button onClick={() => handleRedirect("/weekly-space")}>
              Let's Go
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAvatar;

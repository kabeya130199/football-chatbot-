import { useState } from "react";
import "./upload.scss";
import axios from "axios";
import { SERVER_URL } from "../../utils/config";

const FileUploadMultiple = () => {
  const [files, setFiles] = useState([]);

  // Handle file selection
  const handleChange = (e) => {
    setFiles([...e.target.files]); // Store multiple files
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
        alert("Please select at least one file.");
        return;
    }

    let formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // Append all files
    formData.append("assistantId", localStorage.getItem("assistantId")); // Append userId
    formData.append("threadId", localStorage.getItem("threadId")); // Append userId
    

    const url = `${SERVER_URL}/v1/assistant/upload/`;

    try {
        const res = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Upload successful:", res.data);
    } catch (err) {
        console.log("Error uploading files", err);
    }
};

  return (
    <div className="upload_container">
      <form onSubmit={handleUpload}>
        <label className="custom-file-upload">
          Choose Files
          <i className="fa fa-upload"></i>
          <input type="file" multiple onChange={handleChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadMultiple;

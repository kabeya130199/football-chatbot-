import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from "../../utils/config";
const FileUploadSingle = () => {
    const [file, setFile] = useState();
  
    const handleChange = async (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = (e) => {
      e.preventDefault()
      let formData = new FormData();
      formData.append("file", file);
      const url = `${SERVER_URL}/v1/upload/`;
      axios
        .post(url, formData, {})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log("go there")
        });
    };
    return (
      <div>
        <div className="upload_container">
          <form onSubmit={handleUpload}>
            <label className="custom-file-upload">
              Choose File
              <i className="fa fa-upload"></i>
              <input type="file" onChange={handleChange} />
            </label>
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default FileUploadSingle;
  
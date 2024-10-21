import React from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";

const FileUploadCard = () => {
  const onUpload = (event) => {
    // Handle the file upload logic here
    console.log(event.files);
  };

  const handleSubmit = () => {
    // Handle the submit action here
    console.log("Files submitted!");
  };

  return (
    <>
    <input name="files[]" type="file" accept="*/*" className="text-center" />
      <Button
        label="Submit"
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
        icon="pi pi-check"
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
      />
    </>
  );
};

export default FileUploadCard;

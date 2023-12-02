import Button from "react-bootstrap/Button";
import React, { useRef, useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const fileInput = useRef();
  const [notes, setNotes] = useState(undefined);
  const selectFile = () => {
    fileInput.current.click();
  };

  const uploadFile = (event) => {
    let file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsBinaryString(file);

    console.log(file.type);
    console.log(file.size);
    console.log(file);

    const url =
      "https://lnfywxm7mrszo7u2xz75jjj64a0beuig.lambda-url.us-east-1.on.aws/";
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result.split(",")[1];
      axios
        .post(url, { base64String, file_ext: file.type}, {'Access-Control-Allow-Origin': "*"})
        .then((res) => {
          console.log(res);
          setNotes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reader.readAsDataURL(file);

  };

  return (
    <div>
      <br></br>
      <h3>Try it out!</h3>
      <div className="mt-5">
        <input
          type="file"
          onChange={uploadFile}
          style={{ display: "none" }}
          ref={fileInput}
        />
        <Button variant="custom" onClick={selectFile}>
          <span>Upload</span>
        </Button>
        {notes && (
          <div className="mt-5">
            <br></br>
            <h3>Generated Notes:</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;

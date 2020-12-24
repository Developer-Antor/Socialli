import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "../Firebase/firebase";
import firebase from "firebase";
import "./ImageUpload.css";
function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="img-upload">
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter A Caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input id="file" type="file" onChange={handleChange} />
      <div className="button-container">
        <label htmlFor="file">Choose Image</label>
        <Button className="button" onClick={handleUpload}>
          Upload!
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;

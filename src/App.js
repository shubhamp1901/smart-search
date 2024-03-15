import { useEffect, useState } from "react";
import "./App.css";
import { collection, setDoc, addDoc, doc } from "firebase/firestore";
import { db, storage } from "./firebase.js";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AssemblyAI } from "assemblyai";
import React from "react";
import axios from "axios";

function App() {

  const [fileData, setFileData] = useState(null);

  const client = new AssemblyAI({
    apiKey: "dc6a7a8a8fa640d280f0b1a330e2046d",
  });

  const uploadFile = async () => {
    const num = Math.floor(Math.random() * 1000 + 1);
    const uploadRef = ref(storage, `videos/${num}/${v4()}`);
    // const audioUploadRef = ref(storage, `videos/${num}/${v4()}`);
    const fileSnap = await uploadBytes(uploadRef, fileData);
    // const audioFile = (await videoToAudio(fileData as File)) as File;
    // const audioSnap = await uploadBytes(audioUploadRef, audioFile);

    const downloadURL = await getDownloadURL(fileSnap.ref);
    // const downloadAudioURL = await getDownloadURL(audioSnap.ref);
    const newFileDoc = doc(collection(db, "videos"));

    const data = {
      audio_url: downloadURL,
    };

    const transcriptData = await client.transcripts.create(data);
    const fileItem = {
      id: v4(),
      filePath: downloadURL,
      transcript: transcriptData?.text,
    };

    await setDoc(newFileDoc, fileItem);
    alert("successfully uploaded....");
  };

  //   const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //     setFileData((e.target as HTMLInputElement).files![0])

  //   }

  return (
    <div className="App" style={{ marginTop: "100px" }}>
      <input
        type="file"
        onChange={(e) =>
          setFileData(e.target.files[0])
        }
      />
      <button onClick={uploadFile}>upload</button>
    </div>
  );
}

export default App;

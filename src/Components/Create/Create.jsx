import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext , FirebaseContext } from '../../store/FirebaseContext';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage' 
import { collection, addDoc  , setDoc} from 'firebase/firestore';

const Create = () => {
  const { db,storage  } = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState(""); 
  let [image, setImage] = useState();
  let date= new Date()
  const handleSubmit = async () => {
    if (!image) {
      console.error("No image selected.");
      return;
    }
    const storageRef = ref(storage, `/images/${image.name}`);
    try {
      const uploadedFileSnapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(uploadedFileSnapshot.ref);
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        CreatedAt: date.toDateString()
      });
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
     
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
       
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
         
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }}  type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!postDetails) return; 

      const { userId } = postDetails;
      console.log(userId);
      try {
        const q = query(collection(db, 'users'), where('id', '==', userId));
        const data = await getDocs(q);
        data.forEach(doc => {
          setUserDetails(doc.data());
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.CreatedAt}</span>
        </div>
        {userDetails && ( 
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;

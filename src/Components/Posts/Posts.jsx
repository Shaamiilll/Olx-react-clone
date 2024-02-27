import React, { useEffect, useContext, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { db } from '../../firebase/config';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { postDetails, setPostDetails } = useContext(PostContext); // Destructure both postDetails and setPostDetails

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, index) => (
            <div className="card" onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }} key={index}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.CreatedAt}</span>
              </div>
            </div>
          ))}


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

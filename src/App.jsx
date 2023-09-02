import React, { useEffect, useState } from "react";
import prod from "../src/assets/pro.webp";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
    console.log(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const handleNext=()=>{
      if(page <products.length / 10 ){
        setPage(page+1)
      }
  }


  const handlePrev=()=>{
    if(page > 1){
      setPage(page-1);
    }
  }

  return (
    <>
    <div className="products">
      {products.slice(page * 10 - 10, page * 10).map((item, id) => (
        <div key={id} className="product_card">
          <img src={item.thumbnail} alt="" />
          <div className="images">
            {item.images.slice(0,4).map((img,id)=>(
              <img key={id} className={id} src={img} alt="" />

            ))}
          </div>
          <p>{item.title}</p>
        </div>
      ))}

    </div>
      <div className="pagination">
      <span onClick={handlePrev}>◀️</span>
        {[...Array(products.length / 10)].map((_, i) => (
          <span
            key={i}
            className={page === i + 1 ? "page_selected" : ""}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        ))}
          <span onClick={handleNext}>▶️</span>
      
      </div>
      </>
  );
};

export default App;

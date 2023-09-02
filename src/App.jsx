import React, { useEffect, useState } from "react";
import prod from "../src/assets/pro.webp";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page,setPage]=useState(1)

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=80");
    const data = await res.json();
    setProducts(data.products);
    console.log(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectPageHandler=(selectedPage)=>{
    if(selectedPage>=1 && selectedPage<=products.length / 8 && selectedPage !==page){
      setPage(selectedPage)
    }
  }

  return (
    <div className="products">
      {products.slice(page * 8 - 8,page * 8).map((item, id) => (
        <div key={id} className="product_card">
          <img src={item.thumbnail} alt="" />
          <p>{item.title}</p>
        </div>
      ))}

      <div className="pagination">
        {page >1 && 
        
        <span onClick={()=>setPage(page - 1)}>◀️</span>
        }
        { [...Array(products.length / 8)].map((_,i)=>(
          <span key={i} className={page === i+1 ? "page_selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i+1}</span>
        ))}
        {
          page<products.length / 8 &&
        <span onClick={()=>setPage(page+1)}>▶️</span>
        }
      </div>
    </div>
  );
};

export default App;

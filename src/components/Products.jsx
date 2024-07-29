import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
    } catch (error) {
      setIsError(`Error : ${error.message}`);
    }
  };
  console.log(products);
  console.log(isError);
  useEffect(() => {
    fetchProduct();
  }, [page]);
  const selectPage = (page_num) => {
    setPage(page_num);
  };
  return (
    <div>
      {isError && <h2>{isError}</h2>}
      {products.length > 0 && (
        <div className="products">
          {products?.map((items) => {
            return (
              <div className="Single__Product" key={items.id}>
                <img src={items.thumbnail} />
                <p>{items.title}</p>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPage(page - 1)}
            className={page > 1 ? "" : "pagination__hide"}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => selectPage(i + 1)}
                className={page === i + 1 ? "active" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPage(page + 1)}
            className={page < totalPages ? "" : "pagination__hide"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default Products;

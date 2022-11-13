import { useState, useEffect } from "react";
import "../assets/components/Products.css";

export const Products = ({ products = [], onChange }) => {
  const [myProducts, MyProducts] = useState(products);

  function setUnits(product, value) {
    const myProduct = myProducts.findIndex(({ id }) => product.id === id);
    const products = myProducts;

    if (!products[myProduct].units) products[myProduct].units = 0;
    if (products[myProduct].units + value < 0) return;
    products[myProduct].units += value;
    MyProducts(() => [...products]);
  }

  useEffect(() => {
    onChange(myProducts);
  }, [myProducts]);

  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <div className="units">
            <button onClick={() => setUnits(product, -1)} type="button">
              -
            </button>
            <span>{product.units || 0}</span>
            <button
              className="plus"
              onClick={() => setUnits(product, +1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

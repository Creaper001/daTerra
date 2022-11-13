import { useState, useEffect } from "react";
import "../assets/components/Interests.css";

export const Interests = ({ products, onChange, defaultInterests = [] }) => {
  const categories = Object.keys(products);
  const [tabCategory, TabCategory] = useState(categories[0]);
  const [myInterests, MyInterests] = useState(defaultInterests);

  function Interest(id) {
    const index = myInterests.findIndex((interest) => {
      return interest === id;
    });

    if (index === -1) {
      MyInterests(($) => [...$, id]);
      return;
    }

    const newInterests = [...myInterests];
    newInterests.splice(index, 1);
    MyInterests(newInterests);
  }

  useEffect(() => {
    onChange(myInterests);
  }, [myInterests]);

  return (
    <div className="table_select">
      <ul className="head">
        {categories.map((category) => (
          <li
            key={category}
            className={category === tabCategory ? "select" : ""}
            onClick={() => TabCategory(category)}
          >
            <span>{category}</span>
          </li>
        ))}
      </ul>

      <ul className="body interests">
        {products[tabCategory].map((product) => (
          <li key={product.id}>
            <input
              id={product.id}
              type="checkbox"
              checked={myInterests.includes(product.id)}
              onChange={() => Interest(product.id)}
            />
            <label htmlFor={product.id} className="item">
              <p>{product.name}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

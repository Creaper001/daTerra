import { useEffect, useState } from "react";
import "../assets/components/Input.css";

export const Select = ({ name, options, onChange }) => {
  const [myOption, MyOption] = useState(options[0]);

  useEffect(() => {
    onChange(myOption);
  }, [myOption]);

  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      <select
        id={name}
        className="input_select"
        onChange={(e) => MyOption(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

import "../assets/components/Input.css";

export const Input = ({
  name,
  placeholder,
  password,
  type = "text",
  onChange,
}) => {
  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        type={password ? "password" : type}
        placeholder={placeholder}
        autoComplete={password ? "new-password" : ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

import "../assets/components/Input.css";

export const Textarea = ({ name, placeholder, onChange }) => {
  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      <textarea
        id={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

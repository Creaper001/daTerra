import "../assets/components/Steps.css";

export const Step = ({ name, index, max, select = false }) => {
  return (
    <>
      <div className={`step ${select ? "select" : ""}`}>
        <div className="number">{index + 1}</div>
        <p>{name}</p>
      </div>
      {index < max ? <img src="/icons/arrow-right.svg" /> : null}
    </>
  );
};

export const Steps = ({ names, select }) => {
  return (
    <div className="steps">
      {names.map((name, index) => (
        <Step
          name={name}
          index={index}
          max={names.length - 1}
          select={index + 1 === select}
          key={name}
        />
      ))}
    </div>
  );
};

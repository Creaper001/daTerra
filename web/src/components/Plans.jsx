import { useState, useEffect } from "react";
import "../assets/components/Plans.css";

export const Plans = ({ plans, onChange, defaultPlan }) => {
  const [myPlan, MyPlan] = useState();

  useEffect(() => {
    onChange(myPlan);
  }, [myPlan]);

  return (
    <div className="rPlans">
      {plans.map((plan, index) => (
        <div key={index}>
          <input
            id={plan.name}
            type="radio"
            checked={myPlan ? myPlan === plan.id : defaultPlan === plan.id}
            onChange={() => MyPlan(plan.id)}
          />
          <label htmlFor={plan.name} className="item">
            <div className="text">
              <h6>{plan.name}</h6>
              <p>{plan.units}un</p>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

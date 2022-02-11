import React from "react";

const ClockPresenter = ({ time }) => {
  return (
    <div className="clock-container">
      <span>{time}</span>
    </div>
  );
};

export default ClockPresenter;

import React, { useEffect, useState } from "react";
import ClockPresenter from "./ClockPresenter";

const concatZero = (factor) => (factor < 10 ? `0${factor}` : factor);

const dateToTime = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const text = `${concatZero(hour)}:${concatZero(minute)}:${concatZero(
    second
  )}`;
  return text;
};

const ClockContainer = () => {
  const now = new Date();
  const [time, setTime] = useState(dateToTime(now));

  const updateTime = () => {
    setTime(dateToTime(new Date()));
  };

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <ClockPresenter time={time} />;
};

export default ClockContainer;

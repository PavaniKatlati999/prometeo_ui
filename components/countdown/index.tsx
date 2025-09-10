import React, { useEffect, useState } from "react";
import "./styles.scss";

/**
 * A CountdownUI component to display a countdown timer to a target date or duration.
 * Supports custom formatting, start/pause/reset controls, and callback on completion.
 * Ideal for timers, events, or deadlines in dashboards or apps.
 */

const CountDownUI: React.FC<CountDownUIProps> = ({
  targetDate,
  onFinish,
  className,
}) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      // trigger onFinish
      if (
        updated.days === 0 &&
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        clearInterval(timer);
        onFinish?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`ui__count_down ${className || ""}`}>
      <div className="ui__count_down-item">
        <span>{timeLeft.days}</span>
        <small>Days</small>
      </div>
      <div className="ui__count_down-item">
        <span>{timeLeft.hours}</span>
        <small>Hours</small>
      </div>
      <div className="ui__count_down-item">
        <span>{timeLeft.minutes}</span>
        <small>Minutes</small>
      </div>
      <div className="ui__count_down-item">
        <span>{timeLeft.seconds}</span>
        <small>Seconds</small>
      </div>
    </div>
  );
};

export default CountDownUI;

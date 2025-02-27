import React, { useState, useRef } from "react";
import styles from "./RulerSlider.module.css";

const RulerSlider: React.FC = () => {
  const [value, setValue] = useState(0); // Initial value
  const [marks, setMarks] = useState(0); // Initial value
  const min = 0; // Minimum value
  const max = 300; // Maximum value
  const step = 1; // Step size
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const sliderRect = slider.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const offsetX = Math.min(
      Math.max(clientX - sliderRect.left, 0),
      sliderRect.width
    );
    const newValue =
      Math.round(((offsetX / sliderRect.width) * (max - min)) / step) * step +
      min;
    const newValue2 =
      (Math.round(((offsetX / sliderRect.width) * (max - min)) / step) * step +
        min) *
      1000;
    setValue(newValue);
    setMarks(newValue2);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    document.addEventListener("mousemove", handleDrag as any);
    document.addEventListener("mouseup", handleMouseUp);
    handleDrag(event);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    document.addEventListener("touchmove", handleDrag as any);
    document.addEventListener("touchend", handleTouchEnd);
    handleDrag(event);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleDrag as any);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleDrag as any);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className={styles.SLDsliderContainer}>
      <div className={styles.SLDvalueDisplay}>Expected Rank: {marks}</div>
      <div
        // ref={sliderRef}
        className={styles.SLDslider}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={styles.SLDpointer}
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
      <div className={styles.SLDvalueDisplay}>Value: {value}</div>
    </div>
  );
};

export default RulerSlider;

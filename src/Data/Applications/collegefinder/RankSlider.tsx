import { useState } from "react";
import { Slider } from "@mantine/core";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaGrinHearts } from "react-icons/fa";
import "./RankSlider.css";
import "@mantine/core/styles.css";

interface RankSliderProps {
  rank: string;
  setRank: React.Dispatch<React.SetStateAction<string>>;
}
function RankSlider({ rank, setRank }: RankSliderProps) {
  const [value, setValue] = useState(50);
  const min = 0;
  const max = 360;
  const step = 10; // Adjust step size for more/less lines
  const marks = Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => i * step
  );

  return (
    <div
      style={{
        width: 400,
        margin: "50px auto",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Slider
        size="xl"
        value={value}
        onChange={setValue}
        thumbChildren={
          value < 200 ? (
            <CiHeart />
          ) : value < 300 ? (
            <FaHeart />
          ) : (
            <FaGrinHearts />
          )
        }
        color="red"
        label={value}
        min={min}
        max={max}
        thumbSize={32}
        styles={{
          thumb: { borderWidth: 2, padding: 3 },
          markLabel: { fontSize: 10 },
        }}
      />

      {/* Ruler Marks */}
      <div className="ruler">
        {marks.map((mark) => (
          <div
            key={mark}
            className="ruler-mark"
            style={{ left: `${(mark / max) * 100}%` }}
          />
        ))}
      </div>

      <p className="mt-5">Selected Value: {value}</p>
    </div>
  );
}

export default RankSlider;

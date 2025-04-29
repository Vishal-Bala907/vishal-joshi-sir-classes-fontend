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
  const min = 1;
  const max = 900000;
  const step = 1;

  const numericRank = Number(rank);

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
        value={numericRank}
        onChange={(val) => setRank(String(val))}
        thumbChildren={
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/images/vjsir.jpeg"
              alt="Rank Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        }
        color="red"
        label={numericRank}
        min={min}
        max={max}
        step={step}
        thumbSize={32}
        styles={{
          thumb: { borderWidth: 2, padding: 0 }, // no extra padding
          markLabel: { fontSize: 10 },
        }}
      />

      <p className="mt-3">Selected Rank: {numericRank}</p>
    </div>
  );
}

export default RankSlider;

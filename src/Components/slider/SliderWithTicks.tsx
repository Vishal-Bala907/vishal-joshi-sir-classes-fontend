import React from "react";
//@ts-ignore
import ReactSlider from "react-slider";

const SliderWithTicks = () => {
  return (
    <ReactSlider
      className="SWThorizontal-slider"
      thumbClassName="SWTthumb"
      trackClassName="SWTtrack"
      min={0}
      max={300}
      defaultValue={161}
      renderThumb={(props, state) => <div {...props}>Rank: {282}</div>}
    />
  );
};

export default SliderWithTicks;

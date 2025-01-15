declare module "react-slider" {
  import * as React from "react";

  export interface ReactSliderProps {
    className?: string;
    thumbClassName?: string;
    trackClassName?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number | number[];
    value?: number | number[];
    onChange?: (value: number | number[]) => void;
    renderThumb?: (
      props: React.HTMLAttributes<HTMLDivElement>,
      state: { value: number }
    ) => React.ReactNode;
  }

  const ReactSlider: React.FC<ReactSliderProps>;
  export default ReactSlider;
}

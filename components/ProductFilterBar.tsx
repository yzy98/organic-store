"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "./ui/input";
import { useState } from "react";

interface ProductFilterBarProps {
  minValue: number;
  maxValue: number;
}

const ProductFilterBar = ({ minValue, maxValue }: ProductFilterBarProps) => {
  const [slideValues, setSlideValues] = useState([minValue, maxValue]);

  const sliderHandler = (value: number[]) => {
    console.log("____value: ", value);
    // TODO: debounce needed
    setSlideValues(value);
  };

  const minInputHandler = (event: any) => {
    // TODO: debounce needed
    const newMinValue = +event.target.value;
    setSlideValues([newMinValue, slideValues[1]]);
  };

  const maxInputHandler = (event: any) => {
    // TODO: debounce needed
    const newMaxValue = +event.target.value;
    setSlideValues([slideValues[0], newMaxValue]);
  };

  return (
    <div className="w-[200px] flex flex-col">
      <p>Filter by price</p>
      <Slider
        defaultValue={[minValue, maxValue]}
        value={slideValues}
        min={minValue}
        max={maxValue}
        step={1}
        minStepsBetweenThumbs={1}
        onValueChange={sliderHandler}
      />
      <div className="flex">
        <Input value={slideValues[0]} onChange={minInputHandler} />
        <Input value={slideValues[1]} onChange={maxInputHandler} />
      </div>
    </div>
  );
};

export default ProductFilterBar;

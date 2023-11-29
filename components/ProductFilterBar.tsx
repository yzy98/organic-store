"use client";
import { useContext, useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

import { ShopPageDispatchContext } from "@/providers/ShopProvider";
import { Slider } from "@/components/ui/slider";
import { Input } from "./ui/input";

interface ProductFilterBarProps {
  minValue: number;
  maxValue: number;
}

const ProductFilterBar = ({ minValue, maxValue }: ProductFilterBarProps) => {
  const dispatch = useContext(ShopPageDispatchContext);
  const [slideValues, setSlideValues] = useState([minValue, maxValue]);
  const [inputValues, setInputValues] = useState([minValue, maxValue]);

  const sliderHandler = (value: number[]) => {
    setSlideValues(value);
    setInputValues(value);
  };

  const minInputChangeHandler = (event: any) => {
    const newMinValue = +event.target.value;
    setInputValues([newMinValue, inputValues[1]]);
  };

  const maxInputChangeHandler = (event: any) => {
    const newMaxValue = +event.target.value;
    setInputValues([inputValues[0], newMaxValue]);
  };

  const minInputBlurHandler = (event: any) => {
    const newMinValue = +event.target.value;
    setSlideValues([newMinValue, slideValues[1]]);
  };

  const maxInputBlurHandler = (event: any) => {
    const newMaxValue = +event.target.value;
    setSlideValues([slideValues[0], newMaxValue]);
  };

  const handleDebounce = useDebounce((value) => {
    console.log("----value: ", value);
    // dispatch here
    dispatch({
      type: "changePrice",
      minPrice: value[0],
      maxPrice: value[1],
    });
  });

  // check if first render
  const firstLoad = useRef(true);

  // watch slideValues, if any changes(debounced), then call sort api
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    handleDebounce(slideValues);

    return () => {
      handleDebounce.cancel();
    };
  }, [slideValues]);

  return (
    <div className="w-[200px] flex flex-col">
      <p>Filter by price</p>
      <Slider
        defaultValue={[minValue, maxValue]}
        value={slideValues}
        min={minValue}
        max={maxValue}
        step={1}
        minStepsBetweenThumbs={5}
        onValueChange={sliderHandler}
      />
      <div className="flex">
        <Input
          value={inputValues[0]}
          onChange={minInputChangeHandler}
          onBlur={minInputBlurHandler}
        />
        <Input
          value={inputValues[1]}
          onChange={maxInputChangeHandler}
          onBlur={maxInputBlurHandler}
        />
      </div>
    </div>
  );
};

export default ProductFilterBar;

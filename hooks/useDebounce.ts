import { debounce } from "lodash";
import { useRef } from "react";

type SomeFunction = (...args: any[]) => void;

function useDebounce<Func extends SomeFunction>(
  func: Func,
  time = 1000,
  options?: any
) {
  const myRef = useRef();
  if (!myRef.current) {
    myRef.current = debounce(func, time, options);
  }
  return myRef.current;
}

export default useDebounce;

import { Dispatch, SetStateAction, useState } from "react";

export const useToggle = (initialValue: boolean): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle, setValue];
};

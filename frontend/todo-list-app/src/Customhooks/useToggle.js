import { useState, useCallback } from "react";


function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState((prev) => !prev), []);
  return [state, toggle];
}

export default useToggle;

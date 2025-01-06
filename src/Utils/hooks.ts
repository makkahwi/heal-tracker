import { RefObject, useEffect, useRef, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export const useComponentSize = (): [
  React.MutableRefObject<HTMLDivElement | null>,
  { width: number; height: number }
] => {
  const ref = useRef<HTMLDivElement | null>(null); // Allow null initially
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return; // Guard clause for null ref

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return [ref, size];
};

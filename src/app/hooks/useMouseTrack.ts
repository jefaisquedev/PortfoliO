import { useEffect, useRef, useState } from "react";

type MousePos = {
  x: number;
  y: number;
  opacity: number;
};

export function useMouseTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      setMouse({
        x: isInside ? x : 0,
        y: isInside ? y : 0,
        opacity: isInside ? 1 : 0,
      });
    };

    const handleMouseLeave = () => {
      setMouse({ x: 0, y: 0, opacity: 0 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { ref, mouse };
}

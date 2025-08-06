import React, { useRef, useEffect, useMemo } from "react";

interface FloatingContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // 0.1 to 1.0 for animation intensity
  speed?: number; // 0.5 to 2.0 for animation speed multiplier
}

export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  children,
  className = "",
  style = {},
  intensity = 0.1,
  speed = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  // Memoize animation parameters to prevent recalculation
  const animationParams = useMemo(
    () => ({
      amplitude: 8 + intensity * 12, // 8-20px range
      frequency: 0.001 * speed, // Base frequency for sine wave
      dampening: 0.98, // For smooth transitions
    }),
    [intensity, speed]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const childElements = Array.from(container.children) as HTMLElement[];

    const startTime = Date.now();
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      // Calculate the target Y position using sine wave
      const targetY =
        Math.sin(elapsed * animationParams.frequency) *
        animationParams.amplitude;

      // Apply easing for smoother transitions
      const diff = targetY - currentYRef.current;
      velocityRef.current += diff * 0.02; // Spring-like behavior
      velocityRef.current *= animationParams.dampening; // Dampening
      currentYRef.current += velocityRef.current;

      // Apply the same transform to all children
      childElements.forEach((element) => {
        element.style.transform = `translate3d(0, ${currentYRef.current}px, 0)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Reset transforms
      childElements.forEach((element) => {
        element.style.transform = "";
      });
    };
  }, [children, animationParams]);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // Enable GPU acceleration for the container
        willChange: "transform",
        ...style,
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <div
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              perspective: "1000px",
            }}
          >
            {child}
          </div>
        ) : (
          child
        )
      )}
    </div>
  );
};

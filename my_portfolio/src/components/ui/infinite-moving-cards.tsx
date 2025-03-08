import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  children,
}: {
  items: any[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  children: (item: any) => React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  // Clone items for seamless scrolling
  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return 40;
      case "normal":
        return 60;
      case "slow":
        return 80;
      default:
        return 60;
    }
  };

  useEffect(() => {
    // Set animation after component mount
    setStart(true);
  }, []);

  // Double the items to create the infinite loop
  const itemsToRender = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden group",
        className
      )}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex items-stretch min-w-full gap-4 py-1",
          start && "animate-scroll",
          direction === "right" && "flex-row-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          "--animation-duration": `${getSpeed()}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          transform: `translateX(-50%)`,
        } as React.CSSProperties}
      >
        {itemsToRender.map((item, idx) => (
          <li
            className="flex-shrink-0 w-auto max-w-full"
            key={idx}
          >
            {children(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};
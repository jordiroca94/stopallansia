"use client";

import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { useRef, FC, ReactNode } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

type ElementProps = HTMLMotionProps<"div">;

type Props = ElementProps & {
  children: ReactNode;
  delay?: number;
};

type Custom = Pick<Props, "delay">;

const variants: Variants = {
  hide: () => ({
    translateY: 30,
    opacity: 0,
  }),
  show: ({ delay }: Custom) => ({
    translateY: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.7,
    },
  }),
};

const TextAnimation: FC<Props> = ({ children, delay = 0.02, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersectionObserver(ref);

  const animate = visible ? "show" : "hide";

  const custom: Custom = { delay };

  return (
    <div className="w-full overflow-hidden" ref={ref}>
      <motion.div
        {...props}
        initial={false}
        animate={animate}
        variants={variants}
        custom={custom}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextAnimation;

"use client";
import React, { useRef } from "react";
import { JSX } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  speed?: number;
  lineMargin?: string;
};

const KeyboardAnimation = ({
  text,
  el: Wrapper = "p",
  speed = 0.1,
  lineMargin = "pb-4",
  once,
  className,
}: Props) => {
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: once });

  const defaultAnimations = {
    hidden: {
      opacity: 0.2,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: speed,
      },
    },
  };
  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
        aria-hidden
      >
        {textArray.map((line, index) => (
          <span
            className={`block ${lineMargin}
          `}
            key={index}
          >
            {line.split(" ").map((word, index) => (
              <span key={index}>
                {word.split("").map((char, index) => (
                  <motion.span
                    className="inline-block"
                    variants={defaultAnimations}
                    key={index}
                  >
                    {char}
                  </motion.span>
                ))}
                <span>{"\t"}</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default KeyboardAnimation;

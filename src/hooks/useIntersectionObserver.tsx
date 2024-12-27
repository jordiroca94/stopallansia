import type { RefObject } from "react";
import { useState, useRef, useEffect, useCallback } from "react";

type Callback = (entry: IntersectionObserverEntry) => void;

type Options = IntersectionObserverInit & {
  disconnect?: boolean;
  disconnectOnIntersection?: boolean;
};

export function useIntersectionObserver(
  element: RefObject<HTMLElement | null>,
  options?: Options
): boolean;

export function useIntersectionObserver(
  element: RefObject<HTMLElement | null>,
  callback?: Callback,
  options?: Options
): boolean;

export default function useIntersectionObserver(
  element: RefObject<HTMLElement | null>,
  callbackOrOptions?: Callback | Options,
  options?: Options
): boolean {
  const [intersecting, setIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const cleanup = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = null;
  }, []);

  const hasCallback = typeof callbackOrOptions === "function";
  const _options = hasCallback ? options : callbackOrOptions;
  const _callback = hasCallback ? (callbackOrOptions as Callback) : undefined;

  useEffect(() => {
    const {
      disconnect,
      disconnectOnIntersection,
      ...intersectionObserverOptions
    } = _options || {};

    const target = element.current;
    if (target && !disconnect) {
      observer.current = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (_callback) _callback(entry);
        if (disconnectOnIntersection && entry.isIntersecting) cleanup();
      }, intersectionObserverOptions);

      observer.current.observe(target);
    }

    return cleanup;
  }, [_callback, _options, cleanup, element]);

  return intersecting;
}

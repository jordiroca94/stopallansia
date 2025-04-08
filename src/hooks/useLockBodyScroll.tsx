import { useEffect } from "react";

function getScrollbarWidth() {
  const outside = document.createElement("div");
  const inside = document.createElement("div");

  outside.style.width = inside.style.width = "100%";
  outside.style.overflow = "scroll";

  document.body.appendChild(outside).appendChild(inside);
  const scrollbar = outside.offsetWidth - inside.offsetWidth;
  if (outside.parentNode) outside.parentNode.removeChild(outside);
  return scrollbar;
}

export default function useLockScroll(
  lock: boolean,
  selector: string = "body"
): void {
  useEffect(() => {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) return;

    el.style.overflow = lock ? "hidden" : "auto";
    el.style.setProperty(
      "--scrollbar-width",
      lock ? `${getScrollbarWidth()}px` : "0px"
    );
  }, [lock, selector]);
}

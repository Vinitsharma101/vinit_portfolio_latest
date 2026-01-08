import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Locks native scrolling and turns wheel/touch input into a 0..1 progress value.
 * Used for pinned, scroll-linked transitions without letting the document move.
 */
export function useLockedScrollProgress(enabled: boolean, distancePx: number) {
  const [px, setPx] = useState(0);
  const pxRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const touchYRef = useRef<number | null>(null);

  const commit = useCallback(() => {
    rafRef.current = null;
    setPx(pxRef.current);
  }, []);

  const bump = useCallback(
    (delta: number) => {
      const next = Math.max(0, Math.min(distancePx, pxRef.current + delta));
      if (next === pxRef.current) return;
      pxRef.current = next;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(commit);
    },
    [commit, distancePx]
  );

  const complete = useCallback(() => {
    pxRef.current = distancePx;
    setPx(distancePx);
  }, [distancePx]);

  useEffect(() => {
    if (!enabled) return;

    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      bump(e.deltaY);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchYRef.current == null) return;
      const y = e.touches[0]?.clientY ?? touchYRef.current;
      const delta = touchYRef.current - y;
      touchYRef.current = y;
      e.preventDefault();
      bump(delta);
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overscrollBehavior = prevOverscroll;

      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onTouchEnd as any);

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [enabled, bump]);

  const progress = distancePx <= 0 ? 1 : Math.min(px / distancePx, 1);

  return { progress, px, complete };
}

import { RefObject, useEffect } from 'react';

const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

type UseLockBackgroundScrollOptions = {
  scrollWithinSelector?: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  onBlockedScroll?: () => void;
};

export function useLockBackgroundScroll(
  active: boolean,
  {
    scrollWithinSelector,
    scrollContainerRef,
    onBlockedScroll,
  }: UseLockBackgroundScrollOptions = {}
) {
  useEffect(() => {
    if (!active) return;

    const getScrollableElement = (target: EventTarget | null): HTMLElement | null => {
      if (scrollContainerRef?.current?.contains(target as Node)) {
        return scrollContainerRef.current;
      }

      if (scrollWithinSelector && target instanceof Element) {
        return target.closest(scrollWithinSelector) as HTMLElement | null;
      }

      return null;
    };

    const isInScrollArea = (target: EventTarget | null) => getScrollableElement(target) !== null;

    const canScrollFurther = (scrollable: HTMLElement, deltaY: number) => {
      if (scrollable.scrollHeight <= scrollable.clientHeight) return false;

      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

      return (deltaY < 0 && canScrollUp) || (deltaY > 0 && canScrollDown);
    };

    const onWheel = (e: WheelEvent) => {
      const scrollable = getScrollableElement(e.target);
      if (scrollable && canScrollFurther(scrollable, e.deltaY)) return;

      e.preventDefault();
      if (!scrollable) onBlockedScroll?.();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isInScrollArea(e.target)) return;

      e.preventDefault();
      onBlockedScroll?.();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!SCROLL_KEYS.includes(e.key)) return;
      if (isInScrollArea(document.activeElement)) return;

      e.preventDefault();
      onBlockedScroll?.();
    };

    document.addEventListener('wheel', onWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    document.addEventListener('keydown', onKeyDown, { capture: true });

    return () => {
      document.removeEventListener('wheel', onWheel, { capture: true });
      document.removeEventListener('touchmove', onTouchMove, { capture: true });
      document.removeEventListener('keydown', onKeyDown, { capture: true });
    };
  }, [active, scrollWithinSelector, scrollContainerRef, onBlockedScroll]);
}

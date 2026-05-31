/** Extra gap below the fixed site header when scrolling to anchors */
export const SCROLL_OFFSET_GAP = 16;

/** Matches Header `h-20` (80px); measured live when possible */
export const DEFAULT_HEADER_HEIGHT = 80;

export function getFixedHeaderHeight(): number {
  if (typeof document === 'undefined') return DEFAULT_HEADER_HEIGHT;
  const header = document.querySelector('header');
  if (header) {
    return Math.ceil(header.getBoundingClientRect().height);
  }
  return DEFAULT_HEADER_HEIGHT;
}

export function getScrollOffset(extraGap = SCROLL_OFFSET_GAP): number {
  return getFixedHeaderHeight() + extraGap;
}

/** Scroll so `element` sits just below the fixed header */
export function scrollToElement(
  element: HTMLElement,
  options?: { behavior?: ScrollBehavior; extraGap?: number }
): void {
  const top = element.getBoundingClientRect().top + window.scrollY;
  const offset = getScrollOffset(options?.extraGap);

  window.scrollTo({
    top: Math.max(0, top - offset),
    behavior: options?.behavior ?? 'smooth',
  });
}

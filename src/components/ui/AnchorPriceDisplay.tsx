import {
  formatAnchorPriceLabel,
  resolveAnchorDate,
} from '@/lib/anchorPrice';

type AnchorPriceDisplayProps = {
  anchorPrice: string;
  anchorDate?: string;
  className?: string;
  /** Compact for cards; default for lists/modals */
  size?: 'sm' | 'md';
};

/**
 * Displays the legally required reference price with date label.
 * Not struck-through — must not look like a discount.
 */
export default function AnchorPriceDisplay({
  anchorPrice,
  anchorDate,
  className = '',
  size = 'md',
}: AnchorPriceDisplayProps) {
  const label = formatAnchorPriceLabel(resolveAnchorDate(anchorDate));
  const textSize = size === 'sm' ? 'text-[10px] sm:text-xs' : 'text-xs';

  return (
    <p className={`${textSize} text-slate-500 leading-snug ${className}`.trim()}>
      <span className="block sm:inline">{label}: </span>
      <span className="font-medium text-slate-600">{anchorPrice}</span>
    </p>
  );
}

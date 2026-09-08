interface AdSenseSlotProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  slotId?: string;
}

/**
 * Google AdSense 플레이스홀더.
 * 승인 후 실제 adsbygoogle 스크립트/ins 태그로 교체하면 됩니다.
 */
export default function AdSenseSlot({
  width = "100%",
  height = 90,
  className = "",
  slotId = "adsense-slot",
}: AdSenseSlotProps) {
  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <aside
      data-ad-slot={slotId}
      className={`flex w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-200/80 text-center ${className}`}
      style={{ width: widthStyle, height: heightStyle, maxWidth: "100%" }}
      aria-label="Advertisement placeholder"
    >
      <span className="px-3 text-xs font-medium tracking-wide text-slate-500 sm:text-sm">
        Google AdSense Slot
      </span>
    </aside>
  );
}

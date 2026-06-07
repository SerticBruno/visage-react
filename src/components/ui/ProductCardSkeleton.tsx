export default function ProductCardSkeleton() {
  return (
    <div
      className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col h-full shimmer-overlay"
      aria-hidden
    >
      <div className="h-36 sm:h-40 lg:h-48 bg-slate-100" />
      <div className="p-2 sm:p-4 flex flex-col flex-grow gap-2 sm:gap-3">
        <div className="h-4 sm:h-5 bg-slate-100 rounded-md w-4/5" />
        <div className="h-3 sm:h-4 bg-slate-100 rounded-md w-full" />
        <div className="h-3 sm:h-4 bg-slate-100 rounded-md w-2/3" />
        <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4 border-t border-slate-100">
          <div className="h-6 sm:h-8 bg-slate-100 rounded-md w-16 sm:w-20" />
          <div className="h-8 sm:h-9 bg-slate-100 rounded-lg w-20 sm:w-24" />
        </div>
      </div>
    </div>
  );
}

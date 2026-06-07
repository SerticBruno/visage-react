import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';

function FilterSkeleton() {
  return (
    <div className="space-y-4" aria-hidden>
      <div>
        <div className="h-4 bg-slate-100 rounded w-32 mb-2 shimmer-overlay" />
        <div className="h-11 bg-slate-100 rounded-lg shimmer-overlay" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border-t border-gray-200 pt-3 space-y-2">
          <div className="h-4 bg-slate-100 rounded w-24 shimmer-overlay" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-4 bg-slate-100 rounded w-full shimmer-overlay" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function KatalogCatalogSkeleton() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20"
      aria-busy="true"
      aria-live="polite"
      aria-label="Učitavanje kataloga proizvoda"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Naši proizvodi</h2>
        <p className="text-xl text-gray-600">
          Visokokvalitetni proizvodi za njegu lica i tijela
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 pr-3 ps-7">
            <div className="h-6 bg-slate-100 rounded w-40 mb-4 shimmer-overlay" />
            <FilterSkeleton />
          </div>
        </div>

        <div className="flex-1 relative min-h-[420px]">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 px-8 py-6 shadow-lg border border-slate-100 backdrop-blur-[2px]">
              <div
                className="h-10 w-10 rounded-full border-2 border-slate-200 border-t-slate-600 animate-spin-easy"
                aria-hidden
              />
              <p className="text-sm font-medium text-slate-600 tracking-wide">
                Učitavanje proizvoda…
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

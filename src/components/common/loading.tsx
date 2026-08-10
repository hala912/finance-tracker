export function TransactionsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div className="space-y-2">
            <div className="h-4 w-40 rounded bg-stone-200" />
            <div className="h-3 w-24 rounded bg-stone-100" />
          </div>
          <div className="h-4 w-16 rounded bg-stone-200" />
        </div>
      ))}
    </div>
  );
}
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-2 ${className}`}>
      <div className="w-full max-w-md h-px bg-border" aria-hidden />
    </div>
  );
}

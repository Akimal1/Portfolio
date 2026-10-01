export function SceneFallback({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute h-[70%] w-[70%] rounded-full bg-green opacity-20 blur-[90px]" />
      <div className="absolute h-[46%] w-[46%] rounded-full bg-green-strong opacity-30 blur-[60px]" />
      <div className="h-[30%] w-[30%] rounded-full bg-gradient-to-br from-green-strong via-green to-green-deep opacity-70 blur-[3px]" />
    </div>
  );
}

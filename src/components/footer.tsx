export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-line/60 px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-sm font-semibold tracking-tight">
          Akim<span className="text-green">.dev</span>
        </span>
        <span className="text-sm text-muted">© {year} Akim.dev</span>
      </div>
    </footer>
  );
}

export default function Loading() {
  return (
    <main className="main loading-screen" aria-busy="true" aria-live="polite">
      <div className="panel skeleton-panel">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line short" />
      </div>
    </main>
  );
}

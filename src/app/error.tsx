'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container empty-state">
      <span className="eyebrow">Connection interrupted</span>
      <h1>A little turbulence.</h1>
      <p>This page couldn’t load. Try reconnecting to the atlas.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

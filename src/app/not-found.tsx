import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return (
    <div className="container empty-state">
      <span className="eyebrow">404 / Uncharted territory</span>
      <h1>Outside the atlas.</h1>
      <p>This coordinate doesn’t point to a page. Let’s head back to familiar ground.</p>
      <Link href="/" className="button primary">
        <ArrowLeft size={16} />
        Back to the atlas
      </Link>
    </div>
  );
}

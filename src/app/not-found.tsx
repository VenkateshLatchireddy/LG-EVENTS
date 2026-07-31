import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] px-4 pt-32 pb-20 flex items-center justify-center bg-light">
      <div className="text-center max-w-lg">
        <p className="text-primary font-semibold mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          The page you requested is not available.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Return Home
        </Link>
      </div>
    </section>
  );
}

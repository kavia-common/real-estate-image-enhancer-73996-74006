export default function generateStaticParams() {
  // For static export we don't pre-render any image detail pages at build time.
  // The page is a client component that fetches data at runtime.
  return [];
}

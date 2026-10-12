import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 py-28 text-center">
      <p className="text-sm font-medium text-[var(--accent)]">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
        That page is not on Boostlayer.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)]"
      >
        Back home
      </Link>
    </section>
  );
}

import Link from "next/link";

export default function Logo({
  dark = false,
  href = "/",
}: {
  dark?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-lg font-bold tracking-[0.18em] uppercase ${
        dark ? "text-cream" : "text-ink"
      }`}
      aria-label="HAPR Visual — home"
    >
      Hapr<span className="align-super text-[0.55em]">®</span>
    </Link>
  );
}
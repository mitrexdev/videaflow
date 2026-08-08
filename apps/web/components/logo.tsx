/**
 * Videaflow wordmark. Rendered as a plain <img> because next/image blocks
 * SVG sources by default and the logo is a static asset.
 *
 * The mark is white-on-transparent. `invert` turns it into ink so it reads on
 * light surfaces; `dark:invert-0` restores the original white in dark mode,
 * where the surfaces flip to dark.
 */
export function Logo({
  className,
  alt = "Videaflow",
}: {
  className?: string
  alt?: string
}) {
  return <img src="/logo.svg" alt={alt} className={["invert dark:invert-0", className].filter(Boolean).join(" ")} />
}

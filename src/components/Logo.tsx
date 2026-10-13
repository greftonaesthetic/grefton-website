import Image from "next/image";
import Link from "next/link";

export default function Logo({ variant = "green", className = "" }: { variant?: "green" | "white"; className?: string }) {
  const src = variant === "green" ? "/brand/logo-green.png" : "/brand/logo-white.png";
  return (
    <Link href="/" aria-label="Grefton home" className={className}>
      <Image src={src} alt="Grefton" width={1200} height={320} priority className="h-9 w-auto" />
    </Link>
  );
}

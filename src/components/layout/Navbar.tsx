"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Container from "@/components/layout/Container";

const links = [
{ href: "/", label: "Home" },
{ href: "/verify", label: "Verify" },
{ href: "/report", label: "Report" },
{ href: "/companies", label: "Companies" },
{ href: "/threat-intel", label: "Threat Intel" },
{ href: "/about", label: "About" },
];

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);

const pathname = usePathname();

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 24);
};

window.addEventListener("scroll", handleScroll);

return () => {
  window.removeEventListener("scroll", handleScroll);
};

}, []);

return (
<header
className={`
fixed top-0 left-0 z-50 w-full transition-all duration-500
    ${
      scrolled
        ? "border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl"
        : "bg-[#050816]/75 backdrop-blur-xl"
    }
  `}
>
  <Container>
    <nav className="flex h-16 sm:h-20 items-center justify-between">
{/* Logo */}
<Link
  href="/"
  className="flex items-center"
>
  <Image
    src="/logo.png"
    alt="TrustWork Logo"
    width={70}
    height={60}
    priority
    className="
      object-contain
      drop-shadow-[0_0_18px_rgba(43,191,179,0.45)]
    "
  />
</Link>

      {/* Center Nav */}
      <div
        className="
          hidden md:flex
          items-center gap-1

          rounded-full
          border border-white/15
          bg-white/[0.04]
          p-1

          backdrop-blur-md
        "
      >
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`
                group relative rounded-full px-5 py-2 text-sm transition-all duration-300

                ${
                  active
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }
              `}
            >
              <span>{link.label}</span>

              <span
                className={`
                  absolute bottom-1 left-1/2 h-px
                  -translate-x-1/2
                  bg-[var(--teal)]
                  transition-all duration-500

                  ${
                    active
                      ? "w-1/2"
                      : "w-0 group-hover:w-1/2"
                  }
                `}
              />
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <Link
        href="/verify"
        className="
          rounded-full
          border border-[var(--teal)]/30
          bg-[var(--teal)]/10

          px-5 py-2.5

          text-sm
          font-medium
          text-[var(--teal)]

          transition-all duration-300

          hover:bg-[var(--teal)]
          hover:text-black
        "
      >
        Verify Now
      </Link>
    </nav>
  </Container>
</header>
);
}

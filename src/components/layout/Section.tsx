import { ReactNode } from "react";

export default function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative py-28 md:py-36 ${className}`}>
      {children}
    </section>
  );
}
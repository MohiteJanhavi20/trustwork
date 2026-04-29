"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
children: ReactNode;
delay?: number;
className?: string;
as?: "div" | "section" | "article" | "li";
};

export default function Reveal({
children,
delay = 0,
className = "",
as: Tag = "div",
}: Props) {
const ref = useRef<HTMLElement | null>(null);
const [seen, setSeen] = useState(false);

useEffect(() => {
const node = ref.current;


if (!node || seen) return;

const obs = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setSeen(true);
      obs.disconnect();
    }
  },
  {
    threshold: 0.15,
  }
);

obs.observe(node);

return () => obs.disconnect();

}, [seen]);

const setRef = (node: HTMLElement | null) => {
ref.current = node;
};

const Component = Tag as "div";

return (
<Component
ref={setRef}
style={{
transitionDelay: `${delay}ms`,
}}
className={`reveal ${seen ? "is-in" : ""} ${className}`}
>
{children} </Component>
);
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{children}</p>;
}

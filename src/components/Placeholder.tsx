// Stand-in for photography until real project photos are supplied.
export default function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-end rounded-2xl bg-gradient-to-br from-brand-dark via-[#146b43] to-brand p-4 text-xs text-white/70 ${className}`}
    >
      {label}
    </div>
  );
}

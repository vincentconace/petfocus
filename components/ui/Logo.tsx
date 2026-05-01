type Props = { className?: string; size?: number; showText?: boolean };

export default function Logo({ className = "", size = 65, showText = true }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/favicon.png"
        alt="PetFocus"
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />

      {showText && (
        <div className="leading-none">
          <div className="font-display text-[1.25rem] font-semibold tracking-tight text-brand-primary">
            PetFocus
          </div>
          <div className="text-[0.55rem] uppercase tracking-[0.15em] text-ink-secondary mt-0.5">
            Mobile Veterinary
          </div>
        </div>
      )}
    </div>
  );
}

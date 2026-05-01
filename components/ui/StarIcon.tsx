export default function StarIcon({ className = "", size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M6 0L7.27 4.73L12 6L7.27 7.27L6 12L4.73 7.27L0 6L4.73 4.73L6 0Z" />
    </svg>
  );
}

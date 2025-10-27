export default function ProgressRing({ size = 80, stroke = 8, progress = 0, color = "#008080", bg = "#e5e7eb", label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = c - (clamped / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }} aria-label={label} role="img">
      <svg width={size} height={size} className="rotate-[-90deg]" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={bg} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-xs font-medium text-gray-700">{Math.round(clamped)}%</div>
      </div>
    </div>
  );
}

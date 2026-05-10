import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  monogramOnly?: boolean;
};

export function BrandMark({
  className,
  showWordmark = true,
  size = 40,
  monogramOnly = false,
}: Props) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <ShieldLogo size={size} />
      {!monogramOnly && showWordmark && (
        <span
          className="font-display text-[1.05rem] font-semibold tracking-[0.18em] uppercase"
          style={{ color: "var(--color-text)" }}
        >
          Bin <span className="gold-text">Jimz</span>
        </span>
      )}
    </div>
  );
}

function ShieldLogo({ size = 40 }: { size?: number }) {
  const id = "bj";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-label="Bin Jimz"
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3dca0" />
          <stop offset="0.18" stopColor="#e6cf9c" />
          <stop offset="0.5" stopColor="#c8a96a" />
          <stop offset="0.82" stopColor="#8c7345" />
          <stop offset="1" stopColor="#5a4525" />
        </linearGradient>
        <linearGradient id={`${id}-gold-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e3ad" />
          <stop offset="0.45" stopColor="#c8a96a" />
          <stop offset="0.55" stopColor="#a98a4d" />
          <stop offset="1" stopColor="#5a4525" />
        </linearGradient>
        <linearGradient id={`${id}-gold-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fce8b6" />
          <stop offset="0.5" stopColor="#a98a4d" />
          <stop offset="1" stopColor="#3a2d18" />
        </linearGradient>
        <linearGradient id={`${id}-letter`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fce8b6" />
          <stop offset="0.35" stopColor="#e6cf9c" />
          <stop offset="0.55" stopColor="#c8a96a" />
          <stop offset="1" stopColor="#6b5331" />
        </linearGradient>
        <radialGradient id={`${id}-sheen`} cx="0.3" cy="0.15" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* outer beveled gold shield */}
      <path
        d="M100 8 L182 32 V102 C182 144 153 174 100 192 C47 174 18 144 18 102 V32 Z"
        fill={`url(#${id}-gold-rim)`}
      />
      {/* inset shadow groove */}
      <path
        d="M100 18 L172 38 V102 C172 138 148 165 100 181 C52 165 28 138 28 102 V38 Z"
        fill="#1a1410"
      />
      {/* inner gold band (the second layered shield border) */}
      <path
        d="M100 26 L164 44 V102 C164 134 142 158 100 173 C58 158 36 134 36 102 V44 Z"
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* inner dark plate */}
      <path
        d="M100 36 L154 51 V102 C154 130 136 152 100 165 C64 152 46 130 46 102 V51 Z"
        fill="#0e0a07"
      />
      {/* faint gold inner outline */}
      <path
        d="M100 36 L154 51 V102 C154 130 136 152 100 165 C64 152 46 130 46 102 V51 Z"
        fill="none"
        stroke={`url(#${id}-gold-edge)`}
        strokeWidth="1"
        opacity="0.7"
      />

      {/* embossed B + J monogram */}
      {/* shadow drop behind letters */}
      <g transform="translate(2 3)" opacity="0.55">
        <text
          x="100"
          y="124"
          textAnchor="middle"
          fontFamily="Cinzel, Georgia, serif"
          fontWeight="800"
          fontSize="78"
          fill="#000000"
          letterSpacing="-4"
        >
          BJ
        </text>
      </g>
      {/* deep gold base of letters */}
      <text
        x="100"
        y="124"
        textAnchor="middle"
        fontFamily="Cinzel, Georgia, serif"
        fontWeight="800"
        fontSize="78"
        fill="#6b5331"
        letterSpacing="-4"
      >
        BJ
      </text>
      {/* gold gradient face of letters */}
      <text
        x="99"
        y="123"
        textAnchor="middle"
        fontFamily="Cinzel, Georgia, serif"
        fontWeight="800"
        fontSize="78"
        fill={`url(#${id}-letter)`}
        letterSpacing="-4"
      >
        BJ
      </text>
      {/* top-light highlight */}
      <text
        x="98"
        y="121"
        textAnchor="middle"
        fontFamily="Cinzel, Georgia, serif"
        fontWeight="800"
        fontSize="78"
        fill="#fce8b6"
        opacity="0.35"
        letterSpacing="-4"
      >
        BJ
      </text>

      {/* glossy sheen across the face */}
      <path
        d="M100 26 L164 44 V102 C164 134 142 158 100 173 C58 158 36 134 36 102 V44 Z"
        fill={`url(#${id}-sheen)`}
        style={{ mixBlendMode: "screen" }}
      />
    </svg>
  );
}

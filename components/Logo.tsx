export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className="flex items-center space-x-3">
      {/* Hexagonal Logo */}
      <div className="relative">
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagon Background */}
          <path
            d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
            fill="#2D2D2D"
            stroke="#C9A961"
            strokeWidth="2"
          />
          {/* Inner Hexagon */}
          <path
            d="M50 15L80 32.5V67.5L50 85L20 67.5V32.5L50 15Z"
            fill="#1A1A1A"
          />
          {/* Letter B */}
          <text
            x="50"
            y="62"
            fontSize="40"
            fontWeight="bold"
            fill="#C9A961"
            textAnchor="middle"
            fontFamily="serif"
          >
            B
          </text>
        </svg>
      </div>
      {/* Text */}
      <div className="flex flex-col leading-none items-center">
        <span className="text-2xl font-bold tracking-wider text-golden-600">
          BHADORIYA
        </span>
        <span className="text-[9px] font-semibold tracking-widest text-golden-500 mt-0.5 text-center">
          BUILDER & DEVELOPERS
        </span>
      </div>
    </div>
  );
}

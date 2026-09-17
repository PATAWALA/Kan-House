export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
      <div className="flex flex-col items-center gap-6">
        {/* Monogramme animé */}
        <div className="relative w-14 h-14">
          {/* Cercle en rotation */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin-slow"
            viewBox="0 0 50 50"
            fill="none"
          >
            <circle
              cx="25"
              cy="25"
              r="22"
              stroke="var(--color-bordeaux)"
              strokeWidth="1"
              strokeDasharray="6 8"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>

          {/* Point central */}
          <div className="absolute inset-0 grid place-items-center">
            <span className="w-2 h-2 rounded-full bg-[var(--color-bordeaux)] animate-pulse-soft" />
          </div>
        </div>

        {/* Texte discret */}
        <p className="eyebrow text-[var(--color-espresso)]/50">
          Kan House
        </p>
      </div>

      {/* Styles d'animation inline */}
      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.4s linear infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
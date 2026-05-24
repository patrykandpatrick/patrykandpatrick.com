const Logo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 50 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_21_75)">
      <path
        d="M31 11C31 6.58172 34.5817 3 39 3C43.4183 3 47 6.58172 47 11C47 23 31 17 31 33H50"
        stroke="#FFD400"
        strokeWidth="6"
      />
      <path
        d="M4 80V56M4 56V28H22M4 56H22C29.732 56 36 49.732 36 42V42"
        stroke="white"
        strokeWidth="8"
      />
    </g>
    <defs>
      <clipPath id="clip0_21_75">
        <rect width="50" height="80" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;

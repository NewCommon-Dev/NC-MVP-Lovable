import type { SVGProps } from "react";

interface HangerIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  filled?: boolean;
}

const HangerIcon = ({ size = 24, filled = false, className, ...props }: HangerIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Hook - larger circle */}
    <path d="M15 5a3 3 0 1 0-3 3" />
    {/* Hanger triangle - smaller, lower */}
    <path d="M12 8l-8 9h16L12 8z" />
    {filled && (
      <>
        <rect x="2.5" y="16" width="3.5" height="3.5" rx="0.5" fill="currentColor" stroke="currentColor" />
        <rect x="18" y="16" width="3.5" height="3.5" rx="0.5" fill="currentColor" stroke="currentColor" />
      </>
    )}
  </svg>
);

export default HangerIcon;

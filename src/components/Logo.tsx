import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn(
      'relative flex items-center justify-center rounded-lg overflow-hidden',
      sizeClasses[size],
      className
    )}>
      {/* Background - Kenya flag colors */}
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 bg-black" />
        <div className="h-[15%] bg-red-600" />
        <div className="flex-1 bg-green-600" />
      </div>
      
      {/* White stripe accents */}
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1" />
        <div className="h-[3%] bg-white" />
        <div className="h-[15%]" />
        <div className="h-[3%] bg-white" />
        <div className="flex-1" />
      </div>
      
      {/* Book shape overlay */}
      <svg 
        viewBox="0 0 40 40" 
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        {/* Book binding */}
        <rect x="18" y="6" width="4" height="28" fill="rgba(255,255,255,0.3)" />
        
        {/* Book pages left */}
        <path 
          d="M8 8 L18 6 L18 34 L8 32 Z" 
          fill="rgba(255,255,255,0.9)"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="0.5"
        />
        
        {/* Book pages right */}
        <path 
          d="M32 8 L22 6 L22 34 L32 32 Z" 
          fill="rgba(255,255,255,0.85)"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="0.5"
        />
        
        {/* Page lines left */}
        <line x1="10" y1="12" x2="16" y2="11" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        <line x1="10" y1="15" x2="16" y2="14" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        <line x1="10" y1="18" x2="16" y2="17" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        
        {/* Page lines right */}
        <line x1="24" y1="11" x2="30" y2="12" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        <line x1="24" y1="14" x2="30" y2="15" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        <line x1="24" y1="17" x2="30" y2="18" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      </svg>
      
      {/* Bitcoin symbol */}
      <svg 
        viewBox="0 0 40 40" 
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <g transform="translate(20, 24)">
          <circle cx="0" cy="0" r="7" fill="#F7931A" />
          <text 
            x="0" 
            y="3" 
            textAnchor="middle" 
            fontSize="9" 
            fontWeight="bold" 
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            ₿
          </text>
        </g>
      </svg>
      
      {/* Gavel/scale hint at top */}
      <svg 
        viewBox="0 0 40 40" 
        className="absolute inset-0 w-full h-full"
      >
        <circle cx="20" cy="6" r="2" fill="rgba(255,215,0,0.9)" />
      </svg>
    </div>
  );
};

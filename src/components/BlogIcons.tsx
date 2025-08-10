import React from 'react';

interface IconProps {
  className?: string;
}

export const AIIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="url(#aiGradient)" />
    <circle cx="6" cy="6" r="2" fill="url(#aiGradient)" opacity="0.6" />
    <circle cx="18" cy="18" r="2" fill="url(#aiGradient)" opacity="0.6" />
    <path d="M9 15L15 9" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const BrandIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path d="M12 2L15.5 8.5L22 9L15.5 9.5L12 16L8.5 9.5L2 9L8.5 8.5L12 2Z" fill="url(#brandGradient)" />
    <circle cx="12" cy="12" r="8" stroke="url(#brandGradient)" strokeWidth="2" fill="none" opacity="0.3" />
    <circle cx="12" cy="12" r="4" fill="url(#brandGradient)" opacity="0.2" />
  </svg>
);

export const ContentIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="contentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="url(#contentGradient)" strokeWidth="2" fill="none" />
    <path d="M7 8H17M7 12H17M7 16H13" stroke="url(#contentGradient)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="7" r="2" fill="url(#contentGradient)" opacity="0.6" />
  </svg>
);

export const BusinessIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="businessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path d="M3 17L9 11L13 15L21 7" stroke="url(#businessGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 7L16 7L16 12" stroke="url(#businessGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="11" r="2" fill="url(#businessGradient)" opacity="0.4" />
    <circle cx="13" cy="15" r="2" fill="url(#businessGradient)" opacity="0.4" />
  </svg>
);

export const TechnologyIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="url(#techGradient)" strokeWidth="2" fill="none" />
    <path d="M6 10L10 14L18 6" stroke="url(#techGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19" cy="5" r="2" fill="url(#techGradient)" opacity="0.6" />
    <circle cx="5" cy="19" r="2" fill="url(#techGradient)" opacity="0.6" />
  </svg>
);

export const MarketingIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="marketingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path d="M3 11L7 7L13 13L21 5" stroke="url(#marketingGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 5L16 5L16 10" stroke="url(#marketingGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="16" width="4" height="6" fill="url(#marketingGradient)" opacity="0.6" />
    <rect x="8" y="14" width="4" height="8" fill="url(#marketingGradient)" opacity="0.6" />
    <rect x="14" y="18" width="4" height="4" fill="url(#marketingGradient)" opacity="0.6" />
  </svg>
);

export const GeneralIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="generalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#generalGradient)" strokeWidth="2" fill="none" />
    <path d="M12 6V12L16 14" stroke="url(#generalGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" fill="url(#generalGradient)" />
  </svg>
);

export const NotFoundIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="notFoundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="url(#notFoundGradient)" strokeWidth="2" fill="none" />
    <path d="M8 9L16 15M16 9L8 15" stroke="url(#notFoundGradient)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="2" r="1" fill="url(#notFoundGradient)" />
  </svg>
);

// Helper function to get the appropriate icon for tags
export const getIconForTags = (tags: string[], className?: string) => {
  const tag = tags[0]?.toLowerCase() || '';
  
  if (tag.includes('ai') || tag.includes('artificial')) return <AIIcon className={className} />;
  if (tag.includes('brand') || tag.includes('voice')) return <BrandIcon className={className} />;
  if (tag.includes('content') || tag.includes('strategy')) return <ContentIcon className={className} />;
  if (tag.includes('business') || tag.includes('growth')) return <BusinessIcon className={className} />;
  if (tag.includes('tech') || tag.includes('technology')) return <TechnologyIcon className={className} />;
  if (tag.includes('marketing') || tag.includes('promotion')) return <MarketingIcon className={className} />;
  
  return <GeneralIcon className={className} />;
};

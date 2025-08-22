import React from 'react';
import {
  SparklesIcon,
  HashtagIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
  MegaphoneIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface IconProps {
  className?: string;
}

export const AIIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <SparklesIcon className={`${className} text-indigo-600`} />
);

export const BrandIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <HashtagIcon className={`${className} text-indigo-600`} />
);

export const ContentIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <DocumentTextIcon className={`${className} text-indigo-600`} />
);

export const BusinessIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <ArrowTrendingUpIcon className={`${className} text-indigo-600`} />
);

export const TechnologyIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <CpuChipIcon className={`${className} text-indigo-600`} />
);

export const MarketingIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <MegaphoneIcon className={`${className} text-indigo-600`} />
);

export const GeneralIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <ClockIcon className={`${className} text-indigo-600`} />
);

export const NotFoundIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <ExclamationTriangleIcon className={`${className} text-gray-400`} />
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

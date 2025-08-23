import React from 'react';
import { ModernSparklesIcon, ModernDocumentIcon } from './ModernIcons';

interface IconProps {
  className?: string;
}

// Modern 3D AI Icon
export const AIIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={className}>
    <ModernSparklesIcon />
  </div>
);

// Modern 3D Brand Icon
export const BrandIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={`${className} relative`}>
    <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center">
      <div className="text-white font-bold text-xs">#</div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Content Icon
export const ContentIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={className}>
    <ModernDocumentIcon />
  </div>
);

// Modern 3D Business Icon
export const BusinessIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={`${className} relative`}>
    <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center">
      <div className="w-3/4 h-3/4 relative">
        {/* Arrow pointing up */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-3/4 bg-white rounded-sm"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-white" 
             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Technology Icon
export const TechnologyIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={`${className} relative`}>
    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center">
      <div className="w-3/4 h-3/4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-md relative">
        {/* Circuit pattern */}
        <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-green-400 rounded-full opacity-80" style={{ width: '2px', height: '2px' }}></div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Marketing Icon
export const MarketingIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={`${className} relative`}>
    <div className="w-full h-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center">
      <div className="w-3/4 h-3/4 relative">
        {/* Megaphone shape */}
        <div className="absolute left-0 top-1/4 w-1/2 h-1/2 bg-white rounded-l-full"></div>
        <div className="absolute right-1/4 top-1/3 w-1/2 h-1/3 bg-white" 
             style={{ clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D General Icon
export const GeneralIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <div className={`${className} relative`}>
    <div className="w-full h-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center">
      <div className="w-2/3 h-2/3 bg-white rounded-full relative">
        {/* Clock hands */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-1/3 bg-gray-700 rounded-full origin-bottom" style={{ transformOrigin: 'bottom center' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-1/4 bg-gray-700 rounded-full origin-bottom rotate-90" style={{ transformOrigin: 'bottom center' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-full"></div>
    </div>
  </div>
);

// Modern 3D Not Found Icon
export const NotFoundIcon = ({ className = "w-12 h-12" }: IconProps) => (
  <div className={`${className} relative`}>
    <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-lg shadow-lg flex items-center justify-center">
      <div className="text-white font-bold text-lg">!</div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-lg"></div>
    </div>
  </div>
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

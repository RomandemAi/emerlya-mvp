import React from 'react';

interface IconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

// Enhanced mobile-friendly hover states
const mobileHoverClass = 'hover:scale-105 active:scale-95 transition-transform duration-200 ease-out';

// Modern 3D User Icon
const ModernUserIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-3/5 h-3/5 bg-gradient-to-b from-white/90 to-white/70 rounded-full relative">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-2/5 h-2/5 bg-gradient-to-b from-blue-100 to-blue-200 rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-2/5 bg-gradient-to-t from-blue-100 to-transparent rounded-full"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-full"></div>
    </div>
  </div>
);

// Modern 3D Home Icon
const ModernHomeIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      {/* Base/Foundation */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3/5 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/30 rounded-lg"></div>
      </div>
      {/* Roof */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-3/5 bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-t-lg shadow-md" 
           style={{ clipPath: 'polygon(50% 0%, 0% 70%, 100% 70%)' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/30 rounded-t-lg"></div>
      </div>
      {/* Door */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-2/5 bg-gradient-to-br from-amber-600 to-amber-700 rounded-t-sm"></div>
    </div>
  </div>
);

// Modern 3D Sparkles Icon
const ModernSparklesIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative animate-pulse">
      {/* Large star */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg transform rotate-12"
           style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-white/30 to-transparent"
             style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
      </div>
      {/* Small stars */}
      <div className="absolute top-0 right-1/4 w-1/4 h-1/4 bg-gradient-to-br from-purple-300 to-purple-400 shadow-md transform -rotate-12"
           style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
      <div className="absolute bottom-1/4 right-0 w-1/5 h-1/5 bg-gradient-to-br from-pink-300 to-pink-400 shadow-sm transform rotate-45"
           style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
    </div>
  </div>
);

// Modern 3D Document Icon
const ModernDocumentIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      {/* Main document */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 rounded-lg shadow-lg border border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-white/60 rounded-lg"></div>
      </div>
      {/* Folded corner */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-slate-300 to-slate-200 shadow-sm"
           style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }}></div>
      {/* Text lines */}
      <div className="absolute top-1/3 left-1/5 right-1/5 space-y-1">
        <div className="h-0.5 bg-gradient-to-r from-slate-400 to-slate-300 rounded-full opacity-60"></div>
        <div className="h-0.5 bg-gradient-to-r from-slate-400 to-slate-300 rounded-full opacity-60 w-3/4"></div>
        <div className="h-0.5 bg-gradient-to-r from-slate-400 to-slate-300 rounded-full opacity-60 w-1/2"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Settings/Cog Icon
const ModernSettingsIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative animate-spin-slow">
      {/* Outer gear */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full shadow-lg">
        {/* Gear teeth */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1/6 h-1/6 bg-gradient-to-br from-gray-500 to-gray-600 shadow-sm"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-150%)`,
                borderRadius: '2px'
              }}
            ></div>
          ))}
        </div>
        {/* Inner circle */}
        <div className="absolute inset-1/4 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Modern 3D Star Icon
const ModernStarIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg transform hover:scale-110 transition-transform duration-200"
           style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-white/40 to-transparent"
             style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
      </div>
    </div>
  </div>
);

// Modern 3D Phone Icon
const ModernPhoneIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      {/* Phone body */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-transparent rounded-xl"></div>
        {/* Screen */}
        <div className="absolute inset-1 bg-gradient-to-br from-slate-800 to-black rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-blue-300/20 rounded-lg"></div>
        </div>
        {/* Home button */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/4 h-1/8 bg-gradient-to-br from-white/80 to-white/60 rounded-full"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Pencil Icon
const ModernPencilIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative transform rotate-45">
      {/* Pencil body */}
      <div className="absolute inset-y-0 left-1/4 right-0 bg-gradient-to-b from-yellow-400 via-yellow-500 to-orange-500 rounded-r-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-r-lg"></div>
      </div>
      {/* Pencil tip */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/4 h-1/2 bg-gradient-to-br from-pink-400 to-pink-500 shadow-md"
           style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }}></div>
      {/* Eraser */}
      <div className="absolute right-0 top-1/4 w-1/8 h-1/2 bg-gradient-to-br from-pink-300 to-pink-400 rounded-r-lg shadow-sm"></div>
    </div>
  </div>
);

// Modern 3D Information Icon
const ModernInfoIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      {/* Circle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-full"></div>
      </div>
      {/* Letter "i" */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
        <div className="w-1/8 h-1/8 bg-white rounded-full mb-1"></div>
        <div className="w-1/6 h-2/5 bg-white rounded-full"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Dollar Icon
const ModernDollarIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      {/* Circle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-full"></div>
      </div>
      {/* Dollar sign */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white font-bold text-xs">$</div>
      </div>
    </div>
  </div>
);

// Modern 3D Wrench Icon
const ModernWrenchIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative transform rotate-45">
      {/* Wrench handle */}
      <div className="absolute bottom-0 left-1/3 w-1/3 h-3/4 bg-gradient-to-t from-gray-600 via-gray-500 to-gray-400 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-transparent rounded-lg"></div>
      </div>
      {/* Wrench head */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-transparent rounded-lg"></div>
        {/* Wrench opening */}
        <div className="absolute top-1/4 right-0 w-1/4 h-1/2 bg-gradient-to-l from-gray-800 to-gray-700 rounded-l-lg"></div>
      </div>
    </div>
  </div>
);

// Add the animation class to your CSS
const styles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
`;

// You can inject this into your global CSS or add it to your component
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Modern 3D Lightning/Bolt Icon
const ModernBoltIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-lg transform hover:scale-110 transition-transform duration-200"
           style={{ clipPath: 'polygon(20% 0%, 80% 40%, 60% 40%, 80% 100%, 20% 60%, 40% 60%)' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-white/40 to-transparent"
             style={{ clipPath: 'polygon(20% 0%, 80% 40%, 60% 40%, 80% 100%, 20% 60%, 40% 60%)' }}></div>
      </div>
    </div>
  </div>
);

// Modern 3D Shield Icon
const ModernShieldIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 shadow-lg transform hover:scale-105 transition-transform duration-200"
           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-white/30 to-transparent"
             style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
        {/* Check mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white font-bold text-xs">✓</div>
        </div>
      </div>
    </div>
  </div>
);

// Modern 3D Globe Icon
const ModernGlobeIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-full"></div>
        {/* Globe lines */}
        <div className="absolute inset-2 border border-white/60 rounded-full"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/60"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/60"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Chart Icon
const ModernChartIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-end justify-center p-1">
        <div className="flex items-end space-x-0.5 h-full">
          <div className="w-1 bg-white rounded-t-sm" style={{ height: '30%' }}></div>
          <div className="w-1 bg-white rounded-t-sm" style={{ height: '60%' }}></div>
          <div className="w-1 bg-white rounded-t-sm" style={{ height: '90%' }}></div>
          <div className="w-1 bg-white rounded-t-sm" style={{ height: '70%' }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-lg"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Users Icon
const ModernUsersIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center">
        <div className="flex space-x-0.5">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-xl"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Heart Icon
const ModernHeartIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-red-600 shadow-lg transform hover:scale-110 transition-transform duration-200"
           style={{ clipPath: 'polygon(50% 25%, 25% 0%, 0% 25%, 0% 62.5%, 50% 100%, 100% 62.5%, 100% 25%, 75% 0%)' }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-white/30 to-transparent"
             style={{ clipPath: 'polygon(50% 25%, 25% 0%, 0% 25%, 0% 62.5%, 50% 100%, 100% 62.5%, 100% 25%, 75% 0%)' }}></div>
      </div>
    </div>
  </div>
);

// Modern 3D Lightbulb Icon
const ModernLightbulbIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/5 h-3/5 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-white/30 to-transparent rounded-full"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/5 h-2/5 bg-gradient-to-br from-gray-400 to-gray-500 rounded-b-lg shadow-md">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-transparent rounded-b-lg"></div>
      </div>
    </div>
  </div>
);

// Modern 3D Lock Icon
const ModernLockIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className="w-full h-full relative">
      {/* Lock body */}
      <div className="absolute bottom-0 left-1/4 w-1/2 h-3/5 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/20 to-transparent rounded-lg"></div>
        {/* Keyhole */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-white rounded-full"></div>
      </div>
      {/* Lock shackle */}
      <div className="absolute top-0 left-1/3 w-1/3 h-2/5 border-2 border-gray-600 rounded-t-full"></div>
    </div>
  </div>
);

// Modern 3D Hamburger Menu Icon
const ModernMenuIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-white/80 via-white/90 to-white/80 rounded-lg shadow-lg transform ${mobileHoverClass} flex flex-col justify-center items-center space-y-1 p-1`}>
      <div className="w-3/4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
      <div className="w-3/4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
      <div className="w-3/4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Key Icon
const ModernKeyIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-4/5 h-3/5 bg-gradient-to-b from-white/90 to-white/70 rounded-sm relative">
        <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-1/2 h-1/4 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full"></div>
        <div className="absolute right-1/6 top-1/3 w-1/6 h-1/6 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm"></div>
        <div className="absolute right-1/6 bottom-1/3 w-1/6 h-1/6 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Eye Icon
const ModernEyeIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-full shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-4/5 h-3/5 bg-gradient-to-b from-white/90 to-white/70 rounded-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full">
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-full"></div>
    </div>
  </div>
);

// Modern 3D Eye Slash Icon
const ModernEyeSlashIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-4/5 h-3/5 bg-gradient-to-b from-white/90 to-white/70 rounded-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full opacity-50">
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-red-500 transform rotate-45 rounded-full"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-full"></div>
    </div>
  </div>
);

// Modern 3D Copy Icon
const ModernCopyIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 rounded-lg shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-4/5 h-4/5 relative">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-b from-white/90 to-white/70 rounded border border-cyan-200"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-b from-white/80 to-white/60 rounded border border-cyan-300"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Check Icon
const ModernCheckIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-3/5 h-3/5 flex items-center justify-center">
        <div className="relative">
          <div className="w-2 h-1 bg-white rounded-full transform rotate-45 origin-bottom"></div>
          <div className="w-1 h-2 bg-white rounded-full transform -rotate-45 origin-top absolute -right-0.5 -top-0.5"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-full"></div>
    </div>
  </div>
);

// Modern 3D Trash Icon
const ModernTrashIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-lg shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-3/5 h-4/5 bg-gradient-to-b from-white/90 to-white/70 rounded-sm relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/4 bg-gradient-to-b from-red-200 to-red-300 rounded-sm"></div>
        <div className="absolute top-1/4 left-1/4 w-1/6 h-2/4 bg-red-300 rounded-sm"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1/6 h-2/4 bg-red-300 rounded-sm"></div>
        <div className="absolute top-1/4 right-1/4 w-1/6 h-2/4 bg-red-300 rounded-sm"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-lg"></div>
    </div>
  </div>
);

// Modern 3D Plus Icon
const ModernPlusIcon = ({ className = '', size = 'md' }: IconProps) => (
  <div className={`${sizeClasses[size]} ${className} relative`}>
    <div className={`w-full h-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-full shadow-lg transform ${mobileHoverClass} flex items-center justify-center`}>
      <div className="w-3/5 h-3/5 relative">
        <div className="absolute top-1/2 left-0 w-full h-1/5 bg-white rounded-full transform -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-0 w-1/5 h-full bg-white rounded-full transform -translate-x-1/2"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 rounded-full"></div>
    </div>
  </div>
);

export {
  ModernUserIcon,
  ModernHomeIcon,
  ModernSparklesIcon,
  ModernDocumentIcon,
  ModernSettingsIcon,
  ModernStarIcon,
  ModernPhoneIcon,
  ModernPencilIcon,
  ModernInfoIcon,
  ModernDollarIcon,
  ModernWrenchIcon,
  ModernBoltIcon,
  ModernShieldIcon,
  ModernGlobeIcon,
  ModernChartIcon,
  ModernUsersIcon,
  ModernHeartIcon,
  ModernLightbulbIcon,
  ModernLockIcon,
  ModernMenuIcon,
  ModernKeyIcon,
  ModernEyeIcon,
  ModernEyeSlashIcon,
  ModernCopyIcon,
  ModernCheckIcon,
  ModernTrashIcon,
  ModernPlusIcon
};

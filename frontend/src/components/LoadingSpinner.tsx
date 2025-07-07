export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer ring with gradient */}
        <div className="w-12 h-12 border-4 border-purple-500/20 rounded-full animate-spin shadow-lg"></div>
        
        {/* Middle ring */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        
        {/* Inner ring */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        
        {/* Center dot with glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-1000 opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-float animation-delay-2000 opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-float animation-delay-3000 opacity-60"></div>
      </div>
    </div>
  );
} 
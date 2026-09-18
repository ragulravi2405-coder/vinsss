import React, { useState } from 'react';
import { Folder, Copy, Check } from 'lucide-react';

interface AssetBadgeProps {
  path: string;
  className?: string;
  variant?: 'subtle' | 'pill' | 'banner';
}

export const AssetBadge: React.FC<AssetBadgeProps> = ({ path, className = '', variant = 'subtle' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'banner') {
    return (
      <div className={`bg-slate-900/90 text-amber-300 backdrop-blur-sm border border-amber-500/30 px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between gap-2 shadow-sm ${className}`}>
        <div className="flex items-center gap-1.5 truncate">
          <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{path}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded shrink-0"
          title="Copy exact folder path"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900/80 text-amber-300 border border-amber-500/30 hover:border-amber-400/60 transition-all ${className}`}
      title={`Required asset path: ${path}`}
    >
      <Folder className="w-3 h-3 text-amber-400 shrink-0" />
      <span className="truncate max-w-[200px] sm:max-w-xs">{path}</span>
      <button 
        onClick={handleCopy} 
        className="ml-0.5 text-slate-400 hover:text-white"
        title="Copy path"
      >
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
};

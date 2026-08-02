import React from 'react';
import { X, Play, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card-rounded rounded-2xl border border-white/10 max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl bg-[#1c1b1b]">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4cd7f6]" />
            <h3 className="text-base font-bold text-white">DropScoop Obsidian Tour</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#908fa0] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video rounded-xl bg-[#0e0e0e] overflow-hidden border border-[#353534] flex items-center justify-center group mb-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6366f1]/20 via-[#131313] to-[#0e0e0e] opacity-80" />
          
          <div className="relative z-10 text-center space-y-4 p-6">
            <div className="w-16 h-16 rounded-full btn-stitch-primary text-white flex items-center justify-center mx-auto shadow-xl cursor-pointer group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Watch Repurposing Demo</h4>
              <p className="text-xs text-[#908fa0]">Duration: 2 Minutes 14 Seconds</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs text-[#c7c4d7]">
          <div className="p-3 rounded-lg bg-[#201f1f] border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#4cd7f6] shrink-0" />
            <span>Multi-Hook Extraction</span>
          </div>
          <div className="p-3 rounded-lg bg-[#201f1f] border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#4cd7f6] shrink-0" />
            <span>Kinetic Subtitles</span>
          </div>
          <div className="p-3 rounded-lg bg-[#201f1f] border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#c0c1ff] shrink-0" />
            <span>1-Click Multi-Publish</span>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Scissors, Captions, Share2, BarChart3, Zap, Sparkles, Check, Wand2 } from 'lucide-react';

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'clipping',
      title: 'AI Multi-Hook Video Clipping',
      subtitle: 'Finds exact moments guaranteed to hold retention.',
      icon: Scissors,
      badge: 'Virality Engine',
      description: 'Isolate high-retention 30-60 second hooks from long-form podcasts automatically.',
      highlights: [
        'Automatic active speaker framing',
        'Silence remover and filler word scrubber',
        'Viral probability score out of 100'
      ],
      previewContent: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#2a2a2a] border border-[#8083ff]/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#c0c1ff]">
              <Sparkles className="w-4 h-4 text-[#4cd7f6]" />
              <span>Hook #1: "The $10M secret..."</span>
            </div>
            <span className="text-[#4cd7f6] font-bold bg-[#03b5d3]/10 px-2 py-0.5 rounded border border-[#03b5d3]/30">99% Score</span>
          </div>
          <div className="p-3 rounded-lg bg-[#1c1b1b] border border-white/5 flex items-center justify-between text-[#908fa0]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Hook #2: "3 AI tools to use..."</span>
            </div>
            <span className="text-[#c0c1ff] font-bold bg-[#8083ff]/10 px-2 py-0.5 rounded border border-[#8083ff]/20">94% Score</span>
          </div>
        </div>
      )
    },
    {
      id: 'captions',
      title: 'Animated Kinetic Subtitles',
      subtitle: 'Alex Hormozi & MrBeast style captions generated automatically.',
      icon: Captions,
      badge: '98.5% Accuracy',
      description: 'Generate word-by-word animated subtitle styles with custom emojis and kinetic highlights in over 50+ languages.',
      highlights: [
        'Contextual emoji placement',
        'Custom font & brand color palettes',
        'Instant multi-language translation'
      ],
      previewContent: (
        <div className="p-4 rounded-xl bg-[#0e0e0e] border border-white/10 text-center space-y-2">
          <span className="chip-label text-[#908fa0] block">Live Subtitle Rendering</span>
          <div className="text-lg font-black tracking-wide text-white uppercase py-4">
            YOU CAN'T <span className="text-[#ffafd3] underline decoration-[#6366f1] decoration-4">IGNORE</span> THIS <span className="text-[#4cd7f6] animate-pulse">SECRET 🔥</span>
          </div>
        </div>
      )
    },
    {
      id: 'scheduling',
      title: 'Multi-Platform Auto-Scheduler',
      subtitle: 'Publish directly to TikTok, Shorts, Reels, and LinkedIn in 1-click.',
      icon: Share2,
      badge: 'Omnichannel',
      description: 'Connect all creator channels once. DropScoop generates platform-specific titles, descriptions, and hashtags tailored for each algorithm.',
      highlights: [
        'AI hashtag & SEO description generation',
        'Peak engagement time posting schedule',
        'Direct API publishing'
      ],
      previewContent: (
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#201f1f] border border-white/10 flex items-center justify-between text-[#c0c1ff]">
            <span>TikTok</span>
            <span className="text-[10px] bg-[#8083ff]/20 px-1.5 py-0.5 rounded">6PM Scheduled</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#201f1f] border border-white/10 flex items-center justify-between text-[#4cd7f6]">
            <span>YT Shorts</span>
            <span className="text-[10px] bg-[#03b5d3]/20 px-1.5 py-0.5 rounded">7PM Scheduled</span>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Virality & Reach Analytics',
      subtitle: 'Track view velocity and audience conversion across channels.',
      icon: BarChart3,
      badge: 'Real-time Stats',
      description: 'Detailed insights on which hook angles yielded the highest conversion rates, follower spikes, and watch-time completion percentages.',
      highlights: [
        'Unified cross-platform views dashboard',
        'Retention heatmaps for every clip',
        'Top performing hook formula recommendations'
      ],
      previewContent: (
        <div className="p-3 rounded-lg bg-[#201f1f] border border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#4cd7f6]">
            <span>30-Day Views</span>
            <span className="font-bold text-white">+4,820,400</span>
          </div>
          <div className="h-12 flex items-end gap-1.5 pt-2">
            {[35, 45, 30, 65, 80, 55, 95, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-[#6366f1] to-[#4cd7f6] rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#0e0e0e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8083ff]/10 border border-[#8083ff]/20 text-[#c0c1ff] chip-label mb-4">
            <Zap className="w-3.5 h-3.5" /> High-Growth Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
            Distribute Smarter, <span className="text-gradient-primary">Not Harder.</span>
          </h2>
          <p className="text-[#c7c4d7] text-base sm:text-lg">
            DropScoop handles the entire repurposing lifecycle from raw footage to scheduled viral clips in minutes.
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              const isActive = activeFeature === idx;
              return (
                <div 
                  key={feat.id}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-5 rounded-xl cursor-pointer transition-all border ${isActive ? 'glass-card border-[#8083ff]/50 bg-[#201f1f] shadow-lg' : 'bg-[#1c1b1b] border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${isActive ? 'bg-[#6366f1] text-white' : 'bg-[#353534] text-[#908fa0]'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">{feat.title}</h3>
                    </div>
                    <span className={`chip-label px-2 py-0.5 rounded-full border ${isActive ? 'bg-[#03b5d3]/10 text-[#4cd7f6] border-[#03b5d3]/30' : 'bg-white/5 text-[#908fa0] border-white/10'}`}>
                      {feat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#c7c4d7] leading-relaxed pl-12">{feat.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Right Display Panel */}
          <div className="lg:col-span-7">
            <div className="glass-card-rounded rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-[#201f1f]">
              <div className="flex items-center gap-2 mb-6">
                <Wand2 className="w-5 h-5 text-[#c0c1ff]" />
                <span className="chip-label text-[#c0c1ff]">
                  Deep-Dive — {features[activeFeature].title}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {features[activeFeature].title}
              </h3>
              <p className="text-sm text-[#c7c4d7] leading-relaxed mb-6">
                {features[activeFeature].description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {features[activeFeature].highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#e5e2e1]">
                    <div className="w-5 h-5 rounded-full bg-[#03b5d3]/20 text-[#4cd7f6] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Live Preview */}
              <div className="p-4 rounded-xl bg-[#0e0e0e] border border-white/10">
                {features[activeFeature].previewContent}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

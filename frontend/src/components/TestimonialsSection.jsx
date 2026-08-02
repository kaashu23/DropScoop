import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Marcus Vance',
      role: 'Host, Tech Founders Podcast',
      category: 'podcasters',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      viewsGain: '+1.4M Views / Mo',
      quote: 'DropScoop took our 1-hour weekly interview podcasts and instantly turned them into 8 viral TikTok clips. Our YouTube channel grew by 45,000 subscribers in 60 days.',
      stars: 5,
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'Creative Director at GrowthScale',
      category: 'agencies',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      viewsGain: 'Saved 40 hrs/week',
      quote: 'We manage 12 corporate brand channels. DropScoop replaced 3 video editing freelancers. The kinetic subtitle generator alone is worth 10x the price.',
      stars: 5,
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Solopreneur & Content Creator',
      category: 'youtubers',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      viewsGain: '3 Viral Hits > 500k',
      quote: 'The AI hook scorer is scary accurate. It picked out a 20-second tangent I almost cut from my video, and that exact clip got 820k views on Reels!',
      stars: 5,
    },
    {
      id: 4,
      name: 'Sarah Jenkins',
      role: 'SaaS Founder & Host',
      category: 'podcasters',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      viewsGain: '+240% Lead Gen',
      quote: 'We use DropScoop to repurpose all our webinar recordings. It posts clips directly to LinkedIn with automated captions.',
      stars: 5,
    }
  ];

  const filteredTestimonials = filter === 'all' ? testimonials : testimonials.filter(t => t.category === filter);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0e0e0e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8083ff]/10 border border-[#8083ff]/20 text-[#c0c1ff] chip-label mb-4">
            <Sparkles className="w-3.5 h-3.5" /> What Our Creators Say
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
            Proven Viral Growth.
          </h2>
          <p className="text-[#c7c4d7] text-base sm:text-lg">
            See how creators, podcasters, and agencies scale output with DropScoop.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'podcasters', label: 'Podcasters' },
            { id: 'youtubers', label: 'YouTubers' },
            { id: 'agencies', label: 'Agencies' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`chip-label px-4 py-2 rounded-full transition-all ${filter === tab.id ? 'btn-stitch-primary text-white' : 'bg-[#1c1b1b] text-[#908fa0] border border-white/5 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map(item => (
            <div key={item.id} className="glass-card-rounded rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 bg-[#201f1f] relative">
              <Quote className="w-8 h-8 text-[#8083ff]/20 absolute top-6 right-6" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="chip-label bg-[#03b5d3]/10 text-[#4cd7f6] border border-[#03b5d3]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {item.viewsGain}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#e5e2e1] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover border border-white/20" />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4cd7f6]" />
                  </h4>
                  <span className="text-xs text-[#908fa0]">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

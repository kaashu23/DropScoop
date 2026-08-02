import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Mail, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    platform: 'YouTube Podcaster',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ email: '', platform: 'YouTube Podcaster', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0e0e0e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20">
        
        <div className="glass-card-rounded rounded-3xl p-8 sm:p-12 border border-white/10 relative shadow-2xl overflow-hidden bg-[#201f1f]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8083ff]/10 border border-[#8083ff]/20 text-[#c0c1ff] chip-label">
                <Sparkles className="w-3.5 h-3.5 text-[#4cd7f6]" /> Start Growing Today
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-[-0.02em] leading-tight">
                Ready to Turn 1 Long Video into <span className="text-gradient">10 Viral Shorts?</span>
              </h2>

              <p className="text-[#c7c4d7] text-sm leading-relaxed">
                Join 5,000+ creators scaling their organic view reach. Get instant access to our AI virality engine and test auto-clipping for free.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#e5e2e1]">
                  <CheckCircle2 className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                  <span>No credit card required for 14-day trial</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#e5e2e1]">
                  <CheckCircle2 className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                  <span>Setup complete in less than 60 seconds</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#03b5d3]/10 border border-[#03b5d3]/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#4cd7f6] mx-auto" />
                  <h3 className="text-xl font-bold text-white">Trial Access Dispatched!</h3>
                  <p className="text-xs text-[#c7c4d7]">Check your inbox for your 300 free processing minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="chip-label text-[#908fa0] block mb-1.5">Work / Creator Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email" 
                        required 
                        placeholder="you@creator.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#1c1b1b] text-[#e5e2e1] text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#8083ff] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="chip-label text-[#908fa0] block mb-1.5">Primary Content Type</label>
                    <select 
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full bg-[#1c1b1b] text-[#e5e2e1] text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#8083ff] transition-colors"
                    >
                      <option>YouTube Podcaster</option>
                      <option>Webinar & Live Stream Host</option>
                      <option>Content Marketing Agency</option>
                      <option>Education & Course Creator</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 rounded-full btn-stitch-primary text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Get Instant Trial Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

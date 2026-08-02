import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for solo creators & podcasters starting out.',
      monthlyPrice: 29,
      annualPrice: 23,
      minutes: '300 Mins / mo',
      popular: false,
      cta: 'Start 14-Day Free Trial',
      features: [
        '300 mins video processing per month',
        'Auto AI Clip & Hook Detection',
        'Dynamic Subtitle Styles (Hormozi / Beast)',
        'Export in 1080p Full HD 9:16',
        'Manual Download & Export'
      ]
    },
    {
      name: 'Pro',
      description: 'For growing creators, YouTubers & scaling shows.',
      monthlyPrice: 79,
      annualPrice: 63,
      minutes: '1,500 Mins / mo',
      popular: true,
      badge: 'Popular Choice',
      cta: 'Get Started with Pro',
      features: [
        '1,500 mins video processing per month',
        'Everything in Starter, plus:',
        '1-Click Multi-Platform Auto-Scheduler',
        'Custom Brand Kits (Fonts, Colors & Logos)',
        '4K Ultra HD Export & B-Roll Generation',
        'Virality Score & Retention Heatmaps',
        'Priority GPU Processing Pipeline'
      ]
    },
    {
      name: 'Agency',
      description: 'For content agencies, podcasts networks & media teams.',
      monthlyPrice: 199,
      annualPrice: 159,
      minutes: 'Unlimited Mins',
      popular: false,
      cta: 'Contact Agency Team',
      features: [
        'Unlimited video processing',
        'Everything in Pro, plus:',
        '5 Team Member Seats & Roles',
        'Multi-Account Brand Management',
        'API & Webhook Access',
        'Dedicated Account Manager',
        'Custom AI Model Fine-tuning'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#131313]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03b5d3]/10 border border-[#03b5d3]/30 text-[#4cd7f6] chip-label mb-4">
            <Zap className="w-3.5 h-3.5" /> Obsidian Pricing Tiers
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
            Simple, Transparent Pricing.
          </h2>
          <p className="text-[#c7c4d7] text-base sm:text-lg">
            Choose the plan that matches your content volume. Cancel or change anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold ${!annualBilling ? 'text-white' : 'text-[#908fa0]'}`}>Monthly</span>
          <button 
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-14 h-8 rounded-full bg-[#1c1b1b] p-1 border border-[#8083ff]/40 relative focus:outline-none"
            aria-label="Toggle Billing Interval"
          >
            <div className={`w-6 h-6 rounded-full bg-gradient-to-r from-[#6366f1] to-[#4cd7f6] shadow-md transition-transform duration-300 ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${annualBilling ? 'text-white' : 'text-[#908fa0]'}`}>Annual</span>
            <span className="bg-[#03b5d3]/15 text-[#4cd7f6] border border-[#03b5d3]/30 chip-label px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div 
                key={idx}
                className={`rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 ${plan.popular ? 'glass-card-rounded border-[#8083ff] bg-[#201f1f] shadow-2xl shadow-[#6366f1]/20 md:-translate-y-3' : 'glass-card-rounded border-white/10 bg-[#1c1b1b]'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 btn-stitch-primary text-white chip-label px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="chip-label text-[#4cd7f6] bg-[#03b5d3]/10 px-2.5 py-1 rounded-md border border-[#03b5d3]/20">
                      {plan.minutes}
                    </span>
                  </div>
                  <p className="text-xs text-[#c7c4d7] mb-6 leading-relaxed">{plan.description}</p>

                  <div className="mb-8 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tight">${price}</span>
                    <span className="text-[#908fa0] text-sm font-medium">/ mo</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#e5e2e1]">
                        <Check className="w-4 h-4 text-[#c0c1ff] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${plan.popular ? 'btn-stitch-primary' : 'bg-[#2a2a2a] text-white hover:bg-[#353534] border border-white/10'}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 glass-card-rounded rounded-2xl p-6 max-w-3xl mx-auto text-center border border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#1c1b1b]">
          <Shield className="w-8 h-8 text-[#4cd7f6] shrink-0" />
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">100% Risk-Free 14-Day Money-Back Guarantee</h4>
            <p className="text-xs text-[#c7c4d7]">If DropScoop doesn't increase your view reach within 14 days, get an immediate full refund.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

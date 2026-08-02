import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How does DropScoop automatically detect viral clips?",
      answer: "DropScoop uses custom fine-tuned multimodal LLMs to transcribe your video audio, evaluate hook strength, analyze speech pacing, and detect punchlines. It assigns a Virality Probability Score (0-100) to every candidate clip."
    },
    {
      question: "Which platforms and video formats are supported?",
      answer: "You can upload YouTube links, MP4, MOV, or WebM files up to 4K resolution. DropScoop exports 9:16 vertical clips optimized specifically for TikTok, YouTube Shorts, Instagram Reels, and LinkedIn Video."
    },
    {
      question: "Can I customize the subtitle styles, fonts, and brand colors?",
      answer: "Yes! You can choose from built-in viral templates or create custom brand kits with your own typography, colors, logos, and emoji preferences."
    },
    {
      question: "Does DropScoop automatically post clips for me?",
      answer: "On Pro and Agency plans, DropScoop integrates directly with TikTok, YouTube, Instagram, and LinkedIn APIs to schedule or publish your generated clips automatically."
    },
    {
      question: "Can I try DropScoop before subscribing?",
      answer: "Absolutely! We offer a full 14-day free trial on all plans. You can process your first video, export clips, and test auto-scheduling without any upfront commitment."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#131313]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03b5d3]/10 border border-[#03b5d3]/30 text-[#4cd7f6] chip-label mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Obsidian Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#c7c4d7] text-base">
            Everything you need to know about DropScoop content repurposing.
          </p>
        </div>

        {/* FAQ Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-[#908fa0] absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1b1b] text-[#e5e2e1] text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#8083ff] transition-colors"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-xl transition-all border ${isOpen ? 'glass-card-rounded border-[#8083ff]/40 bg-[#201f1f]' : 'bg-[#1c1b1b] border-white/5 hover:border-white/15'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base sm:text-lg focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#c0c1ff] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#4cd7f6]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#c7c4d7] leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

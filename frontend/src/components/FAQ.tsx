import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState(0);

  return (
    <div className="min-h-screen greenova8-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold holo-text font-mono mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed font-mono mb-8" style={{color: 'var(--secondary-text)'}}>
            Get answers to common questions about investing with Greenova8
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5" style={{color: 'var(--secondary-text)'}} />
            </div>
            <input
              type="text"
              className="glass-card w-full pl-10 pr-4 py-3 rounded-lg font-mono text-sm"
              placeholder="Search questions..."
              style={{
                background: 'var(--glass-bg)',
                border: `1px solid var(--border-subtle)`,
                color: 'var(--primary-text)'
              }}
            />
          </div>
        </div>

        {/* Top Questions Header */}
        <div className="mb-8">
          <h3 className="text-xl font-bold holo-text font-mono mb-4">Top Questions</h3>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              icon: "🔒",
              question: "How does Greenova8 ensure my investment is secure?",
              answer: "Greenova8 uses blockchain technology to create immutable records of all transactions. Every investment is recorded on a distributed ledger, meaning it cannot be tampered with. We also implement bank-level encryption and comply with all Pakistani financial regulations."
            },
            {
              icon: "💰",
              question: "Can I withdraw my investment before the project term ends?",
              answer: "Yes, our platform offers liquidity options. While specific terms vary by project, most investments can be withdrawn with some conditions. Please review each project's terms for detailed withdrawal policies."
            },
            {
              icon: "📊",
              question: "How do I track the performance of my investments?",
              answer: "Our real-time dashboard provides comprehensive analytics including ROI tracking, environmental impact metrics, and project performance data. You can monitor your investments 24/7 through our secure platform."
            },
            {
              icon: "⚡",
              question: "What types of clean energy projects can I invest in?",
              answer: "You can invest in various renewable energy projects including solar farms, wind energy installations, hydroelectric projects, and biomass facilities. All projects are thoroughly vetted and audited before being listed on our platform."
            },
            {
              icon: "💡",
              question: "What is the minimum investment amount?",
              answer: "The minimum investment amount is Rs10,000. This makes clean energy investing accessible to a wider range of investors while maintaining the economic viability of the projects."
            }
          ].map((faq, index) => (
            <motion.div 
              key={index}
              className="glass-card transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <button
                className="w-full p-6 text-left flex items-start justify-between"
                onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{faq.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold holo-text font-mono mb-1">
                      {faq.question}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" style={{color: 'var(--neon-green)'}} />
                      <span className="text-sm font-mono" style={{color: 'var(--secondary-text)'}}>
                        Helpful question
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5" style={{color: 'var(--secondary-text)'}} />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{color: 'var(--secondary-text)'}} />
                  )}
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedFaq === index ? 'auto' : 0,
                  opacity: expandedFaq === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed font-mono pl-12" style={{color: 'var(--secondary-text)'}}>
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

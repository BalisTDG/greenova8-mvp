import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <div className="min-h-screen greenova8-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold holo-text font-mono mb-6">
            What Our Community Says
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed font-mono mb-8" style={{color: 'var(--secondary-text)'}}>
            Join hundreds of satisfied investors who are making a difference with their sustainable investments
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              rating: 5,
              title: "Made renewable investing transparent and secure.",
              quote: "Greenova8 has completely transformed how I invest in renewable energy. The blockchain integration gives me confidence that my investment is secure and transparent.",
              author: "Ayesha Khan",
              role: "Early Investor",
              avatar: "AK"
            },
            {
              rating: 5,
              title: "Expert-approved, compliant with local regulations.",
              quote: "As someone in the energy sector, I'm impressed with how Greenova8 has simplified complex investments while maintaining compliance with Pakistani regulations.",
              author: "Imran Ahmed",
              role: "Energy Consultant",
              avatar: "IA"
            },
            {
              rating: 4,
              title: "Made renewable investing simple and trustworthy.",
              quote: "I've always wanted to invest in sustainable projects but didn't know where to start. Greenova8's platform made it approachable even for someone with limited investment experience.",
              author: "Fatima Javed",
              role: "Small Business Owner",
              avatar: "FJ"
            },
            {
              rating: 5,
              title: "Perfect blend of technology and sustainability.",
              quote: "The blockchain technology behind Greenova8 provides the transparency and security I was looking for. I can easily track my investments and see the impact they're making.",
              author: "Hassan Malik",
              role: "Tech Entrepreneur",
              avatar: "HM"
            },
            {
              rating: 5,
              title: "Excellent returns and positive environmental impact.",
              quote: "Not only am I getting better returns than traditional investments, but I'm also contributing to Pakistan's clean energy future. It's a win-win situation.",
              author: "Sarah Ahmed",
              role: "Finance Professional",
              avatar: "SA"
            },
            {
              rating: 4,
              title: "User-friendly platform with great support.",
              quote: "The platform is incredibly easy to use, and the customer support team is always available to help. I've recommended Greenova8 to all my friends and family.",
              author: "Muhammad Ali",
              role: "Software Engineer",
              avatar: "MA"
            }
          ].map((testimonial, index) => (
            <motion.div 
              key={index}
              className="glass-card p-6 h-full flex flex-col"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < testimonial.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Title */}
              <h4 className="text-sm font-bold mb-3 holo-text font-mono">
                {testimonial.title}
              </h4>
              
              {/* Quote */}
              <blockquote className="text-sm leading-relaxed font-mono mb-6 flex-grow italic" style={{color: 'var(--secondary-text)'}}>
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{background: 'var(--neon-green)'}}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{color: 'var(--primary-text)'}}>
                    {testimonial.author}
                  </div>
                  <div className="text-xs" style={{color: 'var(--secondary-text)'}}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <motion.div 
            className="glass-card p-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold holo-text font-mono mb-4">
              Join Our Community
            </h3>
            <p className="text-lg font-mono mb-6" style={{color: 'var(--secondary-text)'}}>
              Ready to start your sustainable investment journey?
            </p>
            <motion.a
              href="/login"
              className="neon-btn px-8 py-3 inline-flex items-center font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Investing Today
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

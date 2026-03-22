import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, Music, Star, Award, BookOpen } from 'lucide-react';

// --- Components ---

// 1. Background Animation
const BackgroundNotes = () => {
  // Generate random notes
  const notes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {/* Abstract Staff Lines */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-10 transform -rotate-12 scale-150">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-[1px] bg-gold my-8"></div>
        ))}
      </div>
      
      {/* Floating Notes */}
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute text-gold"
          style={{ left: `${note.x}%`, top: `${note.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: note.duration,
            repeat: Infinity,
            delay: note.delay,
            ease: "linear",
          }}
        >
          <Music size={24 * note.scale} />
        </motion.div>
      ))}
    </div>
  );
};

// 2. Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-dark-wood/80 backdrop-blur-md border-b border-gold/10">
      <div className="text-2xl font-serif tracking-widest text-ivory">
        CHEN<span className="text-gold">.</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-12 text-sm tracking-widest uppercase">
        <a href="#about" className="hover:text-gold transition-colors duration-300">About</a>
        <a href="#services" className="hover:text-gold transition-colors duration-300">Masterclass</a>
        <a href="#testimonials" className="hover:text-gold transition-colors duration-300">Echoes</a>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-ivory p-2 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu (Silk Slide) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-deep-green z-40 flex flex-col items-center justify-center space-y-8"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="text-3xl font-serif hover:text-gold transition-colors">About</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-3xl font-serif hover:text-gold transition-colors">Masterclass</a>
            <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-3xl font-serif hover:text-gold transition-colors">Echoes</a>
            <button className="mt-8 px-8 py-4 border border-gold text-gold rounded-full uppercase tracking-widest text-sm min-w-[44px] min-h-[44px]">
              Book Audition
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// 3. Interactive Violin Strings
const ViolinStrings = () => {
  const [activeString, setActiveString] = useState<number | null>(null);

  const pluckString = (index: number) => {
    setActiveString(index);
    setTimeout(() => setActiveString(null), 500);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex justify-center items-center">
      <svg width="100%" height="100%" viewBox="0 0 200 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="stringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => {
          const xPos = 50 + i * 33;
          const isPlucked = activeString === i;
          
          return (
            <g key={i} onMouseEnter={() => pluckString(i)} onTouchStart={() => pluckString(i)} className="cursor-pointer">
              {/* Invisible wider interaction area for easier hovering/touching */}
              <line x1={xPos} y1="0" x2={xPos} y2="600" stroke="transparent" strokeWidth="30" />
              
              {/* The visible string */}
              <motion.path
                d={`M ${xPos} 0 Q ${isPlucked ? xPos + (Math.random() > 0.5 ? 15 : -15) : xPos} 300 ${xPos} 600`}
                stroke="url(#stringGrad)"
                strokeWidth={1.5 + i * 0.5} // Thicker strings for lower notes
                fill="transparent"
                animate={{
                  d: `M ${xPos} 0 Q ${isPlucked ? xPos + (Math.random() > 0.5 ? 10 : -10) : xPos} 300 ${xPos} 600`
                }}
                transition={{
                  type: "spring",
                  stiffness: isPlucked ? 500 : 100,
                  damping: isPlucked ? 5 : 10,
                  mass: 1
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 4. Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 z-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
            Stringing the <br/>
            <span className="text-gold italic">Echoes</span> of the Soul
          </h1>
          <p className="text-lg md:text-xl text-ivory/70 font-light max-w-md tracking-wide">
            拨动灵魂的回响。Experience violin mastery tailored to your unique artistic voice.
          </p>
          
          <div className="pt-8">
            <button className="group relative px-8 py-4 bg-transparent border border-gold text-gold uppercase tracking-widest text-sm font-medium overflow-hidden transition-all duration-500 hover:text-dark-wood min-w-[44px] min-h-[44px]">
              <div className="absolute inset-0 bg-gold w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
              <span className="relative z-10 flex items-center">
                预约第一节试听课
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Breathing light effect */}
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(212,175,55,0.5)] opacity-50 animate-pulse pointer-events-none"></div>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ViolinStrings />
        </motion.div>
      </div>
    </section>
  );
};

// 5. Services Section
const Services = () => {
  const services = [
    {
      icon: <Star className="w-8 h-8 text-gold mb-6" />,
      title: "青少年启蒙",
      desc: "Cultivating the foundation. A gentle, inspiring introduction to the instrument, focusing on posture, pitch, and a lifelong love for music."
    },
    {
      icon: <Award className="w-8 h-8 text-gold mb-6" />,
      title: "大师班进阶",
      desc: "Refining the artistry. Advanced techniques, emotional expression, and repertoire preparation for competitions and conservatories."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-gold mb-6" />,
      title: "乐理深度解析",
      desc: "Understanding the architecture. Integrating music theory with practical playing to unlock deeper interpretations of classical works."
    }
  ];

  return (
    <section id="services" className="py-32 md:py-48 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">匠心教学</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="glass-card p-10 rounded-2xl group cursor-pointer"
            >
              {service.icon}
              <h3 className="text-2xl font-serif mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-sm text-ivory/60 leading-relaxed font-light">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Testimonials & Logos
const Testimonials = () => {
  const logos = ["Juilliard", "ABRSM", "Curtis", "NYSSMA", "Carnegie Hall", "RCM"];
  
  return (
    <section id="testimonials" className="py-32 relative z-10 bg-deep-green/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-8 h-8 text-gold mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-serif leading-relaxed italic mb-12">
            "在陈老师的指导下，我不仅学会了揉弦，更学会了如何与音乐对话。每一节课都是一次灵魂的洗礼。"
          </h2>
          <p className="text-gold tracking-widest uppercase text-sm">— Sarah L., First Prize Winner</p>
        </div>

        {/* Logo Ticker */}
        <div className="mt-32 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-wood to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-wood to-transparent z-10"></div>
          
          <motion.div 
            className="flex space-x-16 items-center whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...logos, ...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="text-2xl font-serif text-ivory/30 hover:text-gold transition-colors duration-500 cursor-default grayscale hover:grayscale-0">
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 7. Scarcity Banner
const ScarcityBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gold text-dark-wood py-3 z-40 overflow-hidden">
      <motion.div 
        className="flex whitespace-nowrap items-center space-x-8 text-sm font-medium tracking-widest uppercase"
        animate={{ x: [0, -500] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i}>本季度仅剩 2 个私教名额 • Limited Availability • </span>
        ))}
      </motion.div>
    </div>
  );
};

// 8. Footer
const Footer = () => (
  <footer className="py-12 border-t border-gold/10 text-center relative z-10 pb-24">
    <div className="text-2xl font-serif tracking-widest text-ivory mb-4">
      CHEN<span className="text-gold">.</span>
    </div>
    <p className="text-xs text-ivory/40 tracking-widest uppercase">
      © {new Date().getFullYear()} Chen Violin Studio. All rights reserved.
    </p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-dark-wood">
      <BackgroundNotes />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonials />
      </main>
      <Footer />
      <ScarcityBanner />
    </div>
  );
}


import React, { useState, useEffect, memo } from 'react'
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  Smartphone,
  ChevronRight,
  Menu,
  X,
  Play,
  Mail,
  CheckCircle2,
  Lock,
  DollarSign,
  Cpu,
  Heart,
  Moon,
  Sun
} from 'lucide-react'

// Performance: Isolate Navbar re-renders due to scroll
const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    document.documentElement.classList.toggle('dark', nextMode);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'bg-white dark:bg-wa-dark-bg/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}
      aria-label="Main navigation"
    >
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className={`relative flex items-center justify-center p-1 rounded-xl transition-all duration-500 overflow-hidden ${scrolled ? 'bg-wa-teal/5 ring-1 ring-wa-teal/10' : 'bg-wa-teal/10 ring-2 ring-wa-teal/20'}`}>
            <img 
              src="/assets/brand-logo.png" 
              alt="AIConsumerAgent Intelligence Icon" 
              className={`transition-all duration-700 ${scrolled ? 'h-8 w-8' : 'h-10 w-10'} group-hover:rotate-[360deg] group-hover:scale-110`} 
              loading="eager"
            />
          </div>
          <span className={`text-xl font-black tracking-tight leading-none ${scrolled ? 'text-wa-teal-dark dark:text-wa-teal' : 'text-wa-teal dark:text-wa-teal'}`}>
            AIConsumerAgent
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link text-sm uppercase tracking-widest font-bold dark:text-wa-text-muted hover:dark:text-wa-teal ">Features</a>
          <a href="#how-it-works" className="nav-link text-sm uppercase tracking-widest font-bold dark:text-wa-text-muted hover:dark:text-wa-teal ">Process</a>
          <a href="#verticals" className="nav-link text-sm uppercase tracking-widest font-bold dark:text-wa-text-muted hover:dark:text-wa-teal ">Verticals</a>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-wa-teal hover:bg-opacity-10 transition-colors"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun size={20} className="text-wa-teal" /> : <Moon size={20} className="text-wa-text-secondary" />}
          </button>

          <a href="mailto:contact@aiconsumeragent.com" className="btn-primary !py-2.5 !px-8 text-xs font-black uppercase tracking-wider">
            Get Trial
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
           <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-wa-teal hover:bg-opacity-10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} className="text-wa-teal" /> : <Moon size={24} className="text-wa-text-secondary" />}
            </button>
          <button 
            aria-expanded={isMenuOpen}
            aria-label="Toggle mobile menu"
            className="text-wa-text-primary dark:text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-wa-panel border-t border-wa-border dark:border-wa-dark-bg absolute top-full left-0 right-0 shadow-2xl py-8 px-6 flex flex-col gap-6 animate-reveal">
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold dark:text-white">Features</a>
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold dark:text-white">How it Works</a>
          <a href="#verticals" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold dark:text-white">Verticals</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-wa-teal dark:text-wa-teal">Pricing</a>
          <a href="mailto:contact@aiconsumeragent.com" className="btn-primary mt-6 !py-4 text-center">Contact Us</a>
        </div>
      )}
    </nav>
  );
});

// Layout Components
const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>
)

const Section = ({ id, children, className = "", title, subtitle }: { id?: string, children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <Container>
      {(title || subtitle) && (
        <div className="mb-16 animate-reveal">
          {title && <h2 className="text-3xl md:text-5xl font-black text-wa-dark-bg dark:text-white mb-4 tracking-tight leading-tight">{title}</h2>}
          {subtitle && <p className="text-lg text-wa-text-secondary dark:text-wa-text-muted max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
      )}
      {children}
    </Container>
  </section>
)

const FeatureGrid = ({ items }: { items: any[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
      {items.map((feature, i) => (
        <div key={i} className="group relative animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="mb-6 relative">
            <div className="w-14 h-14 bg-wa-teal bg-opacity-10 text-wa-teal dark:bg-wa-teal dark:bg-opacity-20 rounded-xl flex items-center justify-center group-hover:bg-wa-teal group-hover:text-white transition-all duration-500 transform group-hover:rotate-3">
              {React.cloneElement(feature.icon as React.ReactElement, { size: 28, strokeWidth: 2.5 } as any)}
            </div>
            <span className="absolute -top-2 -left-3 text-5xl font-black text-wa-teal opacity-5 pointer-events-none select-none italic group-hover:opacity-10 transition-opacity">
              0{i + 1}
            </span>
          </div>
          <h3 className="text-xl font-black text-wa-dark-bg dark:text-white mb-3 tracking-tight group-hover:text-wa-teal-dark dark:group-hover:text-wa-teal transition-colors outline-none">{feature.title}</h3>
          <p className="text-wa-text-secondary dark:text-wa-text-muted leading-relaxed text-base">{feature.desc}</p>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-wa-teal selection:text-white bg-white dark:bg-wa-dark-bg dark:text-white transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-br from-wa-light-bg via-white to-wa-light-bg dark:from-wa-dark-bg dark:via-wa-panel dark:to-wa-dark-bg">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wa-teal opacity-5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wa-green opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-float-slow" style={{ animationDelay: '2s' }}></div>

        <Container className="relative z-10">
          <div className="animate-reveal max-w-4xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-wa-teal bg-opacity-10 text-wa-teal-dark dark:text-wa-teal font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-wa-teal border-opacity-10">
              <Zap size={12} className="fill-wa-teal" aria-hidden="true" /> Precision Support Engine
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-wa-dark-bg dark:text-white leading-[1.05] mb-8 tracking-tighter drop-shadow-sm">
              Autonomous AI <br />Agents for <span className="text-wa-teal">Physical Commerce.</span>
            </h1>
            <p className="text-lg md:text-xl text-wa-text-secondary dark:text-wa-text-muted mb-10 max-w-2xl leading-relaxed font-medium">
              Streamline your business with AI-powered WhatsApp automation. Expertly handled tickets, 24/7 support, and private dedicated instances.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a 
                href="mailto:contact@aiconsumeragent.com" 
                className="btn-primary w-full sm:w-auto bg-wa-teal-dark dark:bg-wa-teal text-white shadow-xl transition-all !py-4 !px-8 text-base uppercase font-black tracking-widest"
              >
                Get Started Now <ChevronRight size={20} aria-hidden="true" />
              </a>
              <div className="flex flex-col gap-1 items-start">
                 <span className="text-wa-text-primary dark:text-white flex items-center gap-2 font-black text-xs uppercase tracking-tighter">
                  <ShieldCheck size={18} className="text-wa-teal" aria-hidden="true" /> Zero Risk Deployment
                </span>
                <span className="text-[10px] text-wa-text-muted font-bold uppercase tracking-[0.2em] pl-6">10 Free Tickets ($29/mo after)</span>
              </div>
            </div>
          </div>

          <div className="mt-16 relative animate-reveal group/hero" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-4 border-white dark:border-wa-panel aspect-[21/9] bg-wa-dark-bg group cursor-pointer relative">
              <div className="absolute inset-0 bg-wa-dark-bg bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-10 transition-all z-20">
                <div className="w-20 h-20 bg-wa-teal rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95 duration-500">
                  <Play fill="white" size={28} className="ml-1" aria-hidden="true" />
                  <span className="sr-only">Play walkthrough video</span>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                alt="AIConsumerAgent Dashboard Preview" 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-wa-dark-bg/80 via-wa-dark-bg/40 to-transparent z-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl font-black text-white tracking-tight mb-1">Watch AIConsumerAgent in Action</p>
                    <p className="text-wa-teal text-base font-bold tracking-tight">Experience 100% Automated Business Support</p>
                  </div>
                  <div className="px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                    2:42 Duration
                  </div>
                </div>
              </div>
            </div>
            
            {/* Float badge modernized */}
            <div className="hidden lg:flex absolute -top-8 -right-6 bg-white dark:bg-wa-panel p-5 rounded-2xl shadow-xl border border-wa-border dark:border-wa-dark-bg flex items-center gap-4 animate-float-slow z-30">
               <div className="bg-wa-teal/10 text-wa-teal p-2.5 rounded-xl">
                <Smartphone size={28} aria-hidden="true" />
               </div>
               <div>
                  <p className="font-black text-base tracking-tighter dark:text-white">Dedicated WhatsApp</p>
                  <p className="text-[10px] font-bold text-wa-text-muted uppercase tracking-[0.2em]">SME Reliability</p>
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust bar - Refined as a scrolling ribbon or elegant strip */}
      <section className="bg-wa-dark-bg dark:bg-wa-panel py-12 border-y border-wa-teal border-opacity-10">
        <Container>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center text-white/40 hover:text-white/80 transition-colors duration-500">
             <div className="flex items-center justify-center gap-3 text-sm font-black tracking-[0.15em] uppercase"><ShieldCheck size={18} className="text-wa-teal" /> <span>Enterprise Security</span></div>
             <div className="flex items-center justify-center gap-3 text-sm font-black tracking-[0.15em] uppercase"><Play size={16} className="fill-wa-teal text-wa-teal" /> <span>10 Free Tickets</span></div>
             <div className="flex items-center justify-center gap-3 text-sm font-black tracking-[0.15em] uppercase"><Globe size={18} className="text-wa-teal" /> <span>Global SMEs</span></div>
             <div className="flex items-center justify-center gap-3 text-sm font-black tracking-[0.15em] uppercase"><Cpu size={18} className="text-wa-teal" /> <span>Reliable & Private</span></div>
           </div>
        </Container>
      </section>

      {/* Features Grid Refactored */}
      <Section 
        id="features" 
        title="Powered by Precision." 
        subtitle="Our tech ecosystem is built to scale. Expertly designed workflows that maximize lead conversion and support efficiency."
      >
        <FeatureGrid 
          items={[
            {
              icon: <Lock />,
              title: "Privacy First Architecture",
              desc: "Deploy your own isolated instance. Your customer data never trains public LLMs. 100% Data Sovereignty guaranteed by design."
            },
            {
              icon: <Zap />,
              title: "Deep Knowledge Injection",
              desc: "Our engine maps your unique business pricing, service idiosyncrasies, and regional policies to answer with authority."
            },
            {
              icon: <DollarSign />,
              title: "Pure Performance Model",
              desc: "Zero upfront risk. Experiment with 10 tickets for free. Scale to our $29/mo flat-rate plan when you see the results."
            },
            {
              icon: <Smartphone />,
              title: "Stealth Message Logic",
              desc: "Sophisticated rhythm mimicry—including variable jitter and human-like typing bursts—to protect your number reputation."
            },
            {
              icon: <CheckCircle2 />,
              title: "Industry Logic Packs",
              desc: "Pre-tuned models for Clinics, Salons, and Trades. They already understand 'Appointment Rescheduling' and 'Emergency Callouts'."
            },
            {
              icon: <Clock />,
              title: "Endless Availability",
              desc: "Maintain your elite brand tone 24/7. Auto-detects 40+ languages and shifts personalities to match customer urgency."
            }
          ]}
        />
      </Section>

      {/* Process Flow - Re-styled as larger steps */}
      <Section id="how-it-works" className="bg-wa-light-bg dark:bg-wa-dark-bg" title="Experience Flow." subtitle="Connecting your business to our intelligence engine is an effortless three-step protocol.">
        <div className="grid lg:grid-cols-3 gap-12 relative">
          {[
            {
              step: "01",
              title: "Initialize & Connect",
              desc: "Deploy the executable, scan the WhatsApp QR, and authorize your secure instance."
            },
            {
              step: "02",
              title: "Sync Intelligence",
              desc: "Drop your price lists, FAQs, or existing service handbooks into the dashboard."
            },
            {
              step: "03",
              title: "Go Autonomous",
              desc: "Watch the AI handle queries and appointments while you focus on growth."
            }
          ].map((step, i) => (
            <div key={i} className="group relative pt-10 border-t-2 border-wa-border dark:border-wa-panel hover:border-wa-teal transition-colors duration-500 animate-reveal" style={{ animationDelay: `${i * 0.2}s` }}>
              <span className="absolute -top-10 left-0 text-6xl font-black text-wa-teal opacity-10 group-hover:opacity-40 transition-opacity italic">
                {step.step}
              </span>
              <h3 className="text-2xl font-black text-wa-dark-bg dark:text-white mb-4 tracking-tighter">{step.title}</h3>
              <p className="text-wa-text-secondary dark:text-wa-text-muted text-lg leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Industry Verticals - High Impact Cards */}
      <Section id="verticals" title="Vertical Dominance." subtitle="Tailored intelligence for your specific industry. We adapt our engine to the unique tone and knowledge requirements of your business vertical.">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              name: "Health Clinics",
              bullet: ["Appointment Scheduling", "Insurance Pre-Verification"],
              bg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
            },
            {
              name: "Salons & Wellness",
              bullet: ["Preference Matrix", "Loyalty Reward Tracking"],
              bg: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"
            },
            {
              name: "Maintenance Trades",
              bullet: ["Urgency Classification", "Field Dispatch Automation"],
              bg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
            }
          ].map((v, i) => (
             <div key={i} className="relative h-[400px] rounded-[32px] overflow-hidden group animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <img 
                  src={v.bg} 
                  alt={`${v.name} AI Agent`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wa-dark-bg via-wa-dark-bg/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <h4 className="text-2xl font-black mb-4 tracking-tighter">{v.name}</h4>
                  <ul className="space-y-3">
                    {v.bullet.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 size={16} className="text-wa-teal" aria-hidden="true" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          ))}
        </div>
      </Section>

      {/* Pricing - Refined for clarity and Trust */}
      <Section id="pricing" className="bg-wa-teal dark:bg-wa-teal dark:bg-opacity-5 bg-opacity-[0.03]">
        <div className="max-w-4xl mx-auto dark:bg-wa-panel bg-white rounded-[40px] p-10 md:p-16 shadow-2xl border-2 border-wa-teal/20 relative overflow-hidden">
          <div className="absolute top-12 -right-16 rotate-45 bg-wa-teal text-white py-2 px-20 font-black shadow-2xl tracking-[0.2em] text-[10px]">
             LIMITED OFFER
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center gap-16">
            <div className="text-center lg:text-left">
               <h2 className="text-4xl md:text-5xl font-black text-wa-dark-bg dark:text-white mb-6 tracking-tighter">Scale with <br /><span className="text-wa-teal">Confidence.</span></h2>
               <div className="flex flex-col gap-1 mb-10">
                 <div className="flex items-center justify-center lg:justify-start gap-4">
                    <span className="text-6xl font-black text-wa-teal-dark dark:text-wa-teal tracking-tighter">FREE</span>
                    <span className="text-wa-text-muted text-base font-black uppercase tracking-widest pt-5">/ 10 Tickets</span>
                 </div>
                 <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="text-2xl font-black text-wa-dark-bg dark:text-white tracking-widest">$29.00</span>
                    <span className="text-wa-text-muted text-[10px] font-bold uppercase tracking-[.25em] pt-1.5">Fixed Monthly</span>
                 </div>
               </div>
               
               <a href="mailto:contact@aiconsumeragent.com" className="btn-primary w-full shadow-2xl shadow-wa-teal/20 !py-5 uppercase font-black tracking-[.2em] text-sm">
                 Request Access Now
               </a>
            </div>
            <div className="space-y-5">
                {["Omni-channel Support", "Expert Knowledge Engine", "Anti-Ban Protection", "Dedicated Instance", "Brand Tone Control", "Live Daily Analytics"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-wa-dark-bg dark:text-white font-black text-[10px] uppercase tracking-widest group">
                    <div className="w-8 h-8 rounded-full bg-wa-teal/10 dark:bg-wa-teal/20 flex items-center justify-center group-hover:bg-wa-teal group-hover:text-white transition-all transform group-hover:scale-110">
                      <CheckCircle2 size={16} className="text-wa-teal-dark dark:text-wa-teal group-hover:text-white" />
                    </div>
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer - Solid & Professional */}
      <footer className="bg-wa-dark-bg text-white pt-24 pb-10">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-1 rounded-lg bg-wa-teal/10 ring-1 ring-wa-teal/20">
                  <img src="/assets/brand-logo.png" alt="AIConsumerAgent Intelligence Icon" className="h-8 w-8" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">AIConsumerAgent</span>
              </div>
              <p className="text-wa-text-muted text-lg max-w-sm leading-relaxed font-medium">
                Autonomous support for physical commerce. Secure, private, and insanely efficient.
              </p>
            </div>
            
            <div>
               <h5 className="text-[10px] font-black uppercase tracking-[.3em] text-wa-teal mb-8">Product</h5>
               <ul className="space-y-4 text-lg font-bold text-wa-text-muted">
                 <li><a href="#features" className="hover:text-wa-teal transition-colors">Capability</a></li>
                 <li><a href="#how-it-works" className="hover:text-wa-teal transition-colors">Process</a></li>
                 <li><a href="#verticals" className="hover:text-wa-teal transition-colors">Verticals</a></li>
               </ul>
            </div>
            
            <div>
               <h5 className="text-[10px] font-black uppercase tracking-[.3em] text-wa-teal mb-8">Contact</h5>
               <ul className="space-y-4 text-wa-text-muted">
                 <li><a href="mailto:contact@aiconsumeragent.com" className="text-lg font-bold hover:text-wa-teal transition-colors">contact@aiconsumeragent.com</a></li>
                 <li className="pt-2"><p className="text-[10px] font-bold text-wa-text-muted uppercase tracking-widest">Global Support Ecosystem</p></li>
               </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-wa-panel flex flex-col lg:flex-row justify-between items-center gap-8 text-wa-text-muted">
            <p className="text-[10px] font-black uppercase tracking-[.25em]">&copy; 2026 AIConsumerAgent Ecosystem.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[.2em]">
              <a href="#" className="hover:text-wa-teal transition-all">Privacy</a>
              <a href="#" className="hover:text-wa-teal transition-all">Terms</a>
            </div>
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.1em]">
              Built for Growth <Heart size={12} className="text-red-500 fill-red-500" aria-hidden="true" /> Global SME Market
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default App

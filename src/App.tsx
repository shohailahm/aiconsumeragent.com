import React, { useState, useEffect } from 'react'
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
  Heart
} from 'lucide-react'

// Layout Components
const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

const Section = ({ id, children, className = "", title, subtitle }: { id?: string, children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => (
  <section id={id} className={`py-20 ${className}`}>
    <Container>
      {(title || subtitle) && (
        <div className="text-center mb-16 animate-reveal">
          {title && <h2 className="text-3xl md:text-4xl font-bold text-wa-dark-bg mb-4 drop-shadow-sm">{title}</h2>}
          {subtitle && <p className="text-lg text-wa-dark-bg text-opacity-80 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}
      {children}
    </Container>
  </section>
)

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-wa-teal selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AIConsumerAgent" className="h-10 w-auto" />
            <span className={`text-xl font-bold ${scrolled ? 'text-wa-teal' : 'text-wa-teal'}`}>AIConsumerAgent</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#verticals" className="nav-link">Verticals</a>
            <a href="#pricing" className="nav-link font-bold text-wa-teal">Pricing</a>
            <a href="mailto:contact@aiconsumeragent.com" className="btn-primary !py-2 !px-6 text-sm">
              Get Started
            </a>
          </div>

          <button className="md:hidden text-wa-text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </Container>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-wa-border absolute top-full left-0 right-0 shadow-xl py-6 px-4 flex flex-col gap-4 animate-reveal">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-lg font-medium border-b border-wa-border border-opacity-50">Features</a>
            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-lg font-medium border-b border-wa-border border-opacity-50">How it Works</a>
            <a href="#verticals" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-lg font-medium border-b border-wa-border border-opacity-50">Verticals</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-lg font-bold text-wa-teal border-b border-wa-border border-opacity-50">Pricing</a>
            <a href="mailto:contact@aiconsumeragent.com" className="btn-primary mt-4">Contact Us</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-wa-light-bg to-white">
        <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wa-teal bg-opacity-10 text-wa-teal font-semibold text-sm mb-6">
              <Zap size={16} /> The Easiest Way to Automate Customer Support
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-wa-dark-bg leading-tight mb-6 drop-shadow-sm">
              Your Complete AI Support <br />
              <span className="text-wa-teal">WhatsApp & Email Agent.</span>
            </h1>
            <p className="text-lg md:text-xl text-wa-text-secondary mb-8 max-w-xl leading-relaxed">
              Handle customer queries instantly across all your channels. <span className="font-bold text-wa-text-primary text-opacity-90 underline decoration-wa-teal underline-offset-4">Get your first 10 support tickets for FREE.</span> No technical setup required.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#pricing" className="btn-primary w-full sm:w-auto bg-wa-teal text-white shadow-lg transform hover:scale-105 transition-all">
                Start Your Free Trial <ChevronRight size={20} />
              </a>
              <span className="text-wa-text-muted flex items-center gap-2">
                <ShieldCheck size={18} /> First 10 tickets free, then only $29/mo
              </span>
            </div>
          </div>

          <div className="relative animate-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white aspect-video bg-wa-dark-bg group cursor-pointer relative">
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                <div className="w-20 h-20 bg-wa-teal rounded-full flex items-center justify-center text-white shadow-xl animate-pulse">
                  <Play fill="white" className="ml-1" />
                </div>
              </div>
              <div className="p-8 text-center text-white mt-auto absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
                <p className="text-lg font-bold">Watch AIConsumerAgent in Action</p>
                <p className="text-sm opacity-80 underline underline-offset-4 decoration-wa-teal">See the 100% Automated Workflow</p>
              </div>
              {/* Optional background for video placeholder */}
              <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-50"></div>
            </div>
            
            {/* Trust badge floated */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl border border-wa-border flex items-center gap-4 animate-bounce duration-[2000ms]">
               <div className="bg-wa-green text-white p-2 rounded-lg">
                <Smartphone size={24} />
               </div>
               <div>
                  <p className="font-bold text-sm">Dedicated WhatsApp</p>
                  <p className="text-xs text-wa-text-muted">High-reliability instance</p>
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="bg-wa-dark-bg py-10">
        <Container className="flex flex-wrap justify-around items-center gap-8 text-white opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 text-xl font-semibold"><ShieldCheck /> Professional Support</div>
           <div className="flex items-center gap-2 text-xl font-semibold"><Play size={20} className="fill-white" /> 10 Free Tickets</div>
           <div className="flex items-center gap-2 text-xl font-semibold"><Globe /> Used by Global SMEs</div>
           <div className="flex items-center gap-2 text-xl font-semibold"><Cpu /> Reliable & Private</div>
        </Container>
      </section>

      {/* Features Grid */}
      <Section id="features" title="The Power of AI, for Your Small Business" subtitle="Everything you need to automate your customer interactions without the cloud nightmare.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Lock />,
              title: "Privacy First Architecture",
              desc: "Manage your own instance of the AI. All customer data and messages stay private and professional. 100% Data Sovereignty."
            },
            {
              icon: <Zap />,
              title: "Expert Knowledge Integration",
              desc: "The agent learns your unique business pricing, services, and policies to answer flawlessly in seconds."
            },
            {
              icon: <DollarSign />,
              title: "No Risk, All Reward",
              desc: "Join with zero upfront cost. Test with your first 10 tickets for free. Simple monthly subscription thereafter."
            },
            {
              icon: <Smartphone />,
              title: "Built-in Anti-Ban",
              desc: "Engine mimicking human jitter, typing delays, and message variation to keep your number safe."
            },
            {
              icon: <CheckCircle2 />,
              title: "Vertical Knowledge Packs",
              desc: "Pre-built templates for Salons, Clinics, Plumbers, and more. Just upload your prices and you're live."
            },
            {
              icon: <Clock />,
              title: "24/7 Agent Operation",
              desc: "Let your AI work while you sleep. Auto-detects language and maintains your brand's unique tone."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 hover:shadow-2xl transition-all duration-300 group border border-wa-border border-opacity-30">
              <div className="w-14 h-14 bg-wa-teal bg-opacity-10 text-wa-teal rounded-2xl flex items-center justify-center mb-6 group-hover:bg-wa-teal group-hover:text-white transition-colors">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 30, strokeWidth: 2.5 } as any)}
              </div>
              <h3 className="text-xl font-bold text-wa-dark-bg mb-3">{feature.title}</h3>
              <p className="text-wa-text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" title="How It Works" subtitle="Connect your WhatsApp and start automating in less than 5 minutes." className="bg-wa-light-bg">
        <div className="relative">
          {/* Connector line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-wa-border -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {[
              {
                step: "1",
                title: "Install & Scan QR",
                desc: "Download our single executable on your laptop and scan the QR code using your WhatsApp."
              },
              {
                step: "2",
                title: "Upload Your Info",
                desc: "Drag & drop your price list, FAQs, or service PDF. AI learns your business instantly."
              },
              {
                step: "3",
                title: "AI Takes Over",
                desc: "Relax while AIConsumerAgent handles replies, books slots, and summarizes your day."
              }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-wa-teal text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-lg border-[6px] border-white group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-wa-dark-bg mb-4">{step.title}</h3>
                <p className="text-wa-text-secondary text-lg px-4 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Vertical Packs Reveal */}
      <Section id="verticals" title="Made for Your Industry" subtitle="AI that understands business logic, language, and customer expectations of your industry.">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              name: "Medical & Dental Clinics",
              bullet: ["Appointment scheduling", "Insurance FAQs", "Follow-up reminders"],
              bg: "/clinic.png"
            },
            {
              name: "Salons & Spas",
              bullet: ["Service pricing", "Preference booking", "Loyalty discounts"],
              bg: "/salon.png"
            },
            {
              name: "HVAC & Repairs",
              bullet: ["Parts lookup", "Real-time dispatch", "Billing estimation"],
              bg: "/hvac.png"
            }
          ].map((v, i) => (
             <div key={i} className="relative h-80 rounded-3xl overflow-hidden group">
                <img src={v.bg} alt={v.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-wa-dark-bg to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h4 className="text-2xl font-bold mb-4">{v.name}</h4>
                  <ul className="space-y-2 opacity-90">
                    {v.bullet.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-wa-teal" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-wa-teal bg-opacity-[0.03]">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border-2 border-wa-teal border-opacity-20 relative overflow-hidden">
          <div className="absolute top-10 -right-12 rotate-45 bg-wa-teal text-white py-2 px-12 font-bold shadow-lg">
            LIMITED OFFER
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
               <h2 className="text-4xl font-black text-wa-dark-bg mb-6">Scale Your Support Effortlessly</h2>
               <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                 <span className="text-6xl font-black text-wa-teal">
                   FREE
                 </span>
                 <span className="text-wa-text-muted text-xl pt-4">for 10 Tickets</span>
               </div>
               <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                 <span className="text-2xl font-bold text-wa-dark-bg">
                   $29 / month
                 </span>
                 <span className="text-wa-text-muted text-sm pt-2">Full Pro Support</span>
               </div>
               <p className="text-lg text-wa-text-secondary mb-8">Test the agent with your real customers. Pay only when you’re ready to automate. No hidden fees, cancel anytime.</p>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10">
                 {["Omni-channel Dashboard", "Expert Knowledge Training", "Safe Messaging System", "Dedicated Number Logic", "Custom Response Tone", "Daily Performance Reports"].map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-wa-text-primary font-medium">
                     <CheckCircle2 size={18} className="text-wa-teal" /> {item}
                   </li>
                 ))}
               </ul>
               <a href="mailto:contact@aiconsumeragent.com" className="btn-primary w-full shadow-wa-teal/20 !py-4 text-xl">
                 Try Free Trial Now
               </a>
            </div>
            <div className="w-full md:w-64 bg-wa-light-bg rounded-2xl p-6 border border-wa-border">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-wa-text-muted ml-auto font-mono">localhost:3000</span>
               </div>
               <div className="space-y-4">
                  <div className="h-4 bg-wa-border rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-wa-border rounded w-1/2 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="h-4 bg-wa-border rounded w-5/6 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-20 bg-wa-teal opacity-10 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="h-10 bg-wa-teal rounded flex items-center justify-center text-[10px] text-white font-bold opacity-80">AGENT ACTIVE</div>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-wa-dark-bg text-white py-16">
        <Container>
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="AIConsumerAgent" className="h-10 w-auto brightness-200" />
                <span className="text-2xl font-bold tracking-tight">AIConsumerAgent</span>
              </div>
              <p className="text-wa-text-muted max-w-sm leading-relaxed mb-6">
                Giving small businesses the power of professional AI support without the privacy or complex setup issues of big tech.
              </p>
              <div className="flex items-center gap-4">
                <a href="mailto:contact@aiconsumeragent.com" className="w-10 h-10 rounded-full bg-wa-panel flex items-center justify-center hover:bg-wa-teal transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-bold mb-6">Product</h5>
              <ul className="space-y-4 text-wa-text-muted">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#verticals" className="hover:text-white transition-colors">Vertical Solutions</a></li>
              </ul>
            </div>
            
            <div>
               <h5 className="text-lg font-bold mb-6">Contact</h5>
               <ul className="space-y-4 text-wa-text-muted">
                 <li className="flex items-center gap-2"><Mail size={16} /> contact@aiconsumeragent.com</li>
                 <li><p className="text-xs mt-4 max-w-[200px]">Professional support software. Distributed by AIConsumerAgent Global.</p></li>
               </ul>
            </div>
          </div>
          
          <div className="border-t border-wa-panel pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-wa-text-muted text-sm">
            <p>&copy; 2026 AIConsumerAgent. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <p className="flex items-center gap-1">Built for the Global SME Market <Heart size={14} className="text-red-500 fill-red-500" /></p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default App

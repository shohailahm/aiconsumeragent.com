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
import { Link } from 'react-router-dom'
import { trackCtaClick, trackEvent } from '../utils/analytics'

export const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>
)

export const Section = ({ id, children, className = "", title, subtitle }: { id?: string, children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <Container>
      {(title || subtitle) && (
        <div className="mb-16 animate-reveal">
          {title && <h2 className="text-3xl md:text-5xl font-black text-wa-dark-bg dark:text-white mb-4 tracking-tight leading-tight">{title}</h2>}
          {subtitle && <p className="text-lg text-wa-text-secondary dark:text-wa-text-muted max-w-2xl leading-relaxed font-medium">{subtitle}</p>}
        </div>
      )}
      {children}
    </Container>
  </section>
)

export const Navbar = memo(({ onDemoClick }: { onDemoClick?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
    trackEvent({
      action: 'toggle_dark_mode',
      category: 'ui',
      label: nextMode ? 'dark' : 'light'
    });
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
        <Link to="/" className="flex items-center gap-4 group cursor-pointer" onClick={() => trackCtaClick('logo', 'navigation')}>
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
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" onClick={() => trackCtaClick('features', 'navigation')} className="nav-link">Features</Link>
          <Link to="/download" onClick={() => trackCtaClick('download', 'navigation')} className="nav-link">Download</Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-wa-teal hover:bg-opacity-10 transition-colors"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun size={20} className="text-wa-teal" /> : <Moon size={20} className="text-wa-text-secondary" />}
          </button>

          <button 
            onClick={() => {
              onDemoClick?.();
              trackCtaClick('request_demo_nav', 'navigation');
            }}
            className="btn-primary !py-2.5 !px-8 text-xs font-black uppercase tracking-wider shadow-lg shadow-wa-teal/10">
            Request Demo
          </button>
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
          <Link to="/#features" onClick={() => { setIsMenuOpen(false); trackCtaClick('features', 'mobile_menu'); }} className="text-xl font-bold dark:text-white">What it Does</Link>
          <Link to="/download" onClick={() => { setIsMenuOpen(false); trackCtaClick('download', 'mobile_menu'); }} className="text-xl font-bold dark:text-white">Downloads</Link>
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              onDemoClick?.();
              trackCtaClick('request_demo', 'mobile_menu');
            }}
            className="btn-primary mt-6 !py-4 text-center">Request Demo</button>
        </div>
      )}
    </nav>
  );
});

import React from 'react'
import {
  ShieldCheck,
  Globe,
  Play,
  Cpu,
  Heart
} from 'lucide-react'
import { Link } from 'react-router-dom'
import content from '../content.json'
import { Container } from './Layout'
import { trackCtaClick } from '../utils/analytics'

const Footer = () => {
  return (
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
              {content.footer.description}
            </p>
          </div>
          
          <div>
             <h5 className="text-[10px] font-black uppercase tracking-[.3em] text-wa-teal mb-8">Product</h5>
             <ul className="space-y-4 text-lg font-bold text-wa-text-muted">
               <li><Link to="/#features" onClick={() => trackCtaClick('features', 'footer')} className="hover:text-wa-teal transition-colors">Capability</Link></li>
               <li><Link to="/download" onClick={() => trackCtaClick('download', 'footer')} className="hover:text-wa-teal transition-colors">Downloads</Link></li>
               <li><a href="#verticals" onClick={() => trackCtaClick('verticals', 'footer')} className="hover:text-wa-teal transition-colors">Verticals</a></li>
             </ul>
          </div>
          
          <div>
             <h5 className="text-[10px] font-black uppercase tracking-[.3em] text-wa-teal mb-8">Contact</h5>
             <ul className="space-y-4 text-wa-text-muted">
               <li><a href="mailto:contact@aiconsumeragent.com" onClick={() => trackCtaClick('contact_email', 'footer')} className="text-lg font-bold hover:text-wa-teal transition-colors">contact@aiconsumeragent.com</a></li>
               <li className="pt-2"><p className="text-[10px] font-bold text-wa-text-muted uppercase tracking-widest">Global Support Ecosystem</p></li>
             </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-wa-panel flex flex-col lg:flex-row justify-between items-center gap-8 text-wa-text-muted">
          <p className="text-[10px] font-black uppercase tracking-[.25em]">{content.footer.copyright}</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[.2em]">
            <a href="#" onClick={(e) => { e.preventDefault(); trackCtaClick('privacy', 'footer') }} className="hover:text-wa-teal transition-all">Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); trackCtaClick('terms', 'footer') }} className="hover:text-wa-teal transition-all">Terms</a>
          </div>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.1em]">
            {content.footer.tagline} <Heart size={12} className="text-red-500 fill-red-500" aria-hidden="true" />
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

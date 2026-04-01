import React, { useEffect } from 'react'
import {
  ShieldCheck,
  ChevronRight,
  Download,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Clock
} from 'lucide-react'
import { trackEvent } from '../utils/analytics'
import { Container } from '../components/Layout'

const AppleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.152 6.896c-.548 0-1.711-.516-2.822-.516-1.49 0-2.859.847-3.626 2.177-1.552 2.682-.397 6.643 1.11 8.818.735 1.063 1.604 2.257 2.754 2.217 1.106-.044 1.524-.714 2.858-.714 1.333 0 1.708.714 2.877.692 1.208-.022 1.956-1.085 2.687-2.155.851-1.233 1.198-2.422 1.216-2.485-.027-.012-2.333-.892-2.358-3.565-.021-2.221 1.821-3.29 1.905-3.342-1.055-1.543-2.673-1.726-3.254-1.765-1.382-.112-2.793.637-3.347.637zm2.359-1.92c.622-.752 1.037-1.796.922-2.839-.893.036-1.975.597-2.616 1.35-.574.663-1.077 1.727-.944 2.748.995.077 2.016-.507 2.638-1.259z" />
  </svg>
)

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 17.102L9.75 21.9V12.3H0v8.251zM10.5 1.95L24 0v11.7H10.5V1.95zM10.5 12.3H24v11.7l-13.5-1.95V12.3z" />
  </svg>
)

const DownloadCard = ({ title, subtitle, platform, icon: Icon, features, downloadUrl, recommended = false, comingSoon = false, delay = 0 }: any) => {
  return (
    <div 
      className={`group relative p-10 rounded-[32px] md:rounded-[40px] transition-all duration-700 hover:-translate-y-4 animate-reveal scale-100 hover:scale-[1.02] overflow-hidden ${
        recommended 
          ? 'bg-wa-teal dark:bg-wa-teal/15 border-2 border-wa-teal shadow-[0_32px_64px_-16px_rgba(0,168,132,0.3)]' 
          : 'bg-white dark:bg-wa-panel border border-wa-border dark:border-white/5 shadow-xl'
      } ${comingSoon ? 'opacity-70 grayscale-[0.5]' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Premium Glass Glare Effect */}
      {recommended && !comingSoon && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[40px]">
           <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg] animate-glare-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>
      )}

      {recommended && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-wa-teal-dark dark:bg-wa-teal text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl z-20">
          Recommended
        </div>
      )}
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`mb-10 p-6 rounded-[28px] md:rounded-[32px] transition-all duration-700 transform group-hover:scale-110 shadow-inner ${
          recommended 
            ? 'bg-white/15 text-white ring-1 ring-white/25' 
            : 'bg-wa-teal/10 text-wa-teal dark:bg-wa-teal/20 ring-1 ring-wa-teal/15'
        } ${comingSoon ? 'grayscale blur-[1px] opacity-50' : ''}`}>
          <Icon className="w-14 h-14" />
        </div>
        
        <h3 className={`text-4xl font-black mb-2 tracking-tighter ${recommended ? 'text-white' : 'text-wa-dark-bg dark:text-white'}`}>
          {title}
        </h3>
        <p className={`text-xs font-black uppercase tracking-[0.2em] mb-10 ${recommended ? 'text-white/80' : 'text-wa-text-muted'}`}>
          {subtitle}
        </p>
        
        <ul className="space-y-5 mb-14 w-full">
          {features.map((feature: string, i: number) => (
            <li key={i} className={`flex items-center gap-4 text-xs font-black uppercase tracking-widest ${recommended ? 'text-white' : 'text-wa-dark-bg dark:text-white'}`}>
              <CheckCircle2 size={18} className={recommended ? 'text-white' : 'text-wa-teal'} strokeWidth={3} />
              <span className={comingSoon ? 'opacity-50' : 'opacity-90'}>{feature}</span>
            </li>
          ))}
        </ul>
        
        {comingSoon ? (
          <div className="w-full !py-5 bg-wa-dark-bg dark:bg-wa-panel/50 text-white/40 border border-white/5 rounded-2xl flex items-center justify-center gap-4 cursor-not-allowed">
            <span className="font-bold uppercase tracking-[0.25em] text-[10px]">Coming Soon</span>
            <Clock size={18} className="opacity-50" />
          </div>
        ) : (
          <a 
            href={downloadUrl}
            onClick={() => trackEvent({ action: 'download_click', category: 'product', label: platform })}
            className={`btn-primary w-full !py-5 shadow-2xl flex items-center justify-center gap-4 group/btn overflow-hidden relative ring-1 ring-white/10 ${
              recommended 
                ? 'bg-white !text-wa-teal-dark hover:bg-wa-light-bg' 
                : 'bg-wa-teal-dark dark:bg-wa-teal text-white hover:brightness-110'
            }`}
          >
            <span className="relative z-10 font-bold uppercase tracking-[0.25em] text-[10px]">Prepare Installer</span>
            <Download size={18} className="relative z-10 transition-transform duration-500 group-hover/btn:translate-y-1" strokeWidth={2.5} />
            
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[45deg] -translate-x-[200%] group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-in-out"></div>
          </a>
        )}
        
        <p className={`mt-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ${recommended ? 'text-white' : 'text-wa-text-muted'}`}>
          {comingSoon ? 'v1.4.2 Development Build' : 'v1.4.2 Production Build'}
        </p>
      </div>
    </div>
  )
}

const DownloadPage = () => {
  useEffect(() => {
    trackEvent({
      action: 'page_view',
      category: 'engagement',
      label: 'download'
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-44 pb-32 relative overflow-hidden bg-white dark:bg-wa-dark-bg transition-colors duration-700">
      {/* Background Ambience synchronized with Home Hero */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-wa-teal opacity-[0.04] rounded-full blur-[160px] -translate-y-1/2 translate-x-1/4 animate-float-slow"></div>
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-indigo-500 opacity-[0.03] rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/2" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500 opacity-[0.02] rounded-full blur-[120px] translate-y-1/4"></div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-32 animate-reveal">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-wa-teal bg-opacity-10 text-wa-teal-dark dark:text-wa-teal font-black text-[10px] uppercase tracking-[0.3em] mb-10 border border-wa-teal border-opacity-10 ring-1 ring-wa-teal/20">
            <span className="status-pulse h-2 w-2 rounded-full bg-wa-teal"></span>
            Performance Edge
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-wa-dark-bg dark:text-white leading-[0.95] mb-12 tracking-tight">
            Universal <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-wa-teal to-[#14cda6] inline-block py-2 -my-2">Desktop Suite.</span>
          </h1>
          <p className="text-xl md:text-2xl text-wa-text-secondary dark:text-wa-text-muted leading-relaxed font-medium max-w-2xl mx-auto">
            High-fidelity control for your AI consumer agents. Precision-engineered for global commerce operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 max-w-6xl mx-auto perspective-1000">
          <DownloadCard 
            title="macOS"
            subtitle="Apple Silicon & Intel"
            platform="macos_universal"
            icon={AppleIcon}
            recommended={true}
            delay={0.1}
            downloadUrl="https://downloads.aiconsumeragent.com/AIConsumerAgent-1.0.0-arm64.dmg"
            features={[
              "Optimized for M1/M2/M3",
              "Intel (x64) Legacy Support",
              "Sandbox Security Guard",
              "Native Background Sync"
            ]}
          />
          <DownloadCard 
            title="Windows"
            subtitle="Microsoft 10/11 Suite"
            platform="windows_x64"
            icon={WindowsIcon}
            recommended={false}
            delay={0.2}
            downloadUrl="#"
            comingSoon={true}
            features={[
              "64-bit Performance Core",
              "Smart Setup Installer",
              "Automated Security Pathing",
              "Reduced Latency Engine"
            ]}
          />
        </div>

        {/* Global Security Grid */}
        <div className="mt-48 grid lg:grid-cols-3 gap-16 border-t-2 border-wa-border dark:border-wa-panel pt-32 animate-reveal" style={{ animationDelay: '0.4s' }}>
          <div className="group cursor-default">
            <div className="w-16 h-16 bg-wa-teal/10 text-wa-teal rounded-3xl flex items-center justify-center mb-8 group-hover:bg-wa-teal group-hover:text-white transition-all transform group-hover:scale-110">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-2xl font-black text-wa-dark-bg dark:text-white mb-6 tracking-tight">Enterprise Vault</h4>
            <p className="text-wa-text-secondary dark:text-wa-text-muted leading-relaxed text-lg font-medium">
              Every build is digitally signed and audited, ensuring your commerce data never leaves your secure local ecosystem.
            </p>
          </div>
          <div className="group cursor-default">
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all transform group-hover:scale-110">
              <Cpu size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-2xl font-black text-wa-dark-bg dark:text-white mb-6 tracking-tight">Agent Affinity</h4>
            <p className="text-wa-text-secondary dark:text-wa-text-muted leading-relaxed text-lg font-medium">
              Native threading ensures your AI agents maintain 100% responsiveness without impacting your system's critical workloads.
            </p>
          </div>
          <div className="group cursor-default">
            <div className="w-16 h-16 bg-wa-teal/10 text-wa-teal rounded-3xl flex items-center justify-center mb-8 group-hover:bg-wa-teal group-hover:text-white transition-all transform group-hover:scale-110">
              <ArrowRight size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-2xl font-black text-wa-dark-bg dark:text-white mb-6 tracking-tight">Global Scale</h4>
            <p className="text-wa-text-secondary dark:text-wa-text-muted leading-relaxed text-lg font-medium mb-8">
              Ready to deploy across thousands of regional nodes? Contact our solutions desk for volume licensing.
            </p>
            <a href="mailto:contact@aiconsumeragent.com" className="text-wa-teal font-black text-[10px] uppercase tracking-[.3em] flex items-center gap-3 hover:gap-5 transition-all">
              Enterprise Solutions <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DownloadPage

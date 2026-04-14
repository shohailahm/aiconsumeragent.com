import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { trackCtaClick, trackEvent } from '../utils/analytics';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackEvent({ action: 'modal_open', category: 'engagement', label: 'demo_request' });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    trackCtaClick('submit_demo_request', 'demo_modal')
    setStatus('loading');
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        trackEvent({ action: 'demo_request_success', category: 'conversion', label: email });
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
        }, 3000);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
      trackEvent({ action: 'demo_request_error', category: 'error', label: err.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-wa-dark-bg/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-wa-panel rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ring-1 ring-wa-border dark:ring-wa-dark-bg">
        {/* Close Button */}
        <button 
          onClick={() => {
            trackCtaClick('close_demo_modal', 'demo_modal')
            onClose()
          }}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-wa-light-bg dark:hover:bg-wa-dark-bg transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} className="text-wa-text-secondary" />
        </button>

        <div className="p-8 md:p-12">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-wa-teal/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} className="text-wa-teal" />
              </div>
              <h3 className="text-3xl font-black text-wa-dark-bg dark:text-white mb-4 tracking-tight">Request Received!</h3>
              <p className="text-lg text-wa-text-secondary dark:text-wa-text-muted leading-relaxed">
                We've received your request for a demo. One of our specialists will reach out to you shortly at <span className="text-wa-teal font-bold">{email}</span>.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-teal/10 text-wa-teal text-xs font-black uppercase tracking-widest mb-4">
                  <Send size={14} />
                  Demo Access
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-wa-dark-bg dark:text-white mb-4 tracking-tight leading-tight">
                  Experience the <br />
                  <span className="text-wa-teal">Future of Support.</span>
                </h3>
                <p className="text-wa-text-secondary dark:text-wa-text-muted text-lg leading-relaxed">
                  Enter your business email and we'll show you how AIConsumerAgent can transform your customer communication.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="demo-email" className="block text-xs font-black uppercase tracking-widest text-wa-text-muted mb-2 ml-1">
                    Work Email Address
                  </label>
                  <div className="relative group">
                    <input
                      id="demo-email"
                      type="email"
                      required
                      placeholder="name@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      className="w-full h-16 px-6 rounded-2xl bg-wa-light-bg dark:bg-wa-dark-bg border-2 border-transparent focus:border-wa-teal outline-none transition-all duration-300 text-lg font-medium text-wa-dark-bg dark:text-white dark:placeholder:text-wa-text-muted/50"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20 animate-in shake-1">
                    <AlertCircle size={20} />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full h-16 !py-0 justify-center text-lg uppercase font-black tracking-widest shadow-xl shadow-wa-teal/10 hover:shadow-wa-teal/30 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>
                      Request Demo 
                      <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-wa-text-muted font-medium">
                No credit card required. Private & Secure.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;

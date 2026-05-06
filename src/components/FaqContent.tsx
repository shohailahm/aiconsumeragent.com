import React from 'react'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackCtaClick } from '../utils/analytics'

export type FaqItem = {
  keyword: string
  question: string
  answer: string
  suggested: string
}

export const FaqSchemaScript = ({ items }: { items: FaqItem[] }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${item.answer} ${item.suggested}`,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

export const FaqCardGrid = ({
  items,
  headingLevel = 'h3',
}: {
  items: FaqItem[]
  headingLevel?: 'h2' | 'h3'
}) => {
  const HeadingTag = headingLevel

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {items.map((item, index) => (
        <article
          key={item.question}
          className="glass-card p-8 md:p-10 animate-reveal hover:-translate-y-1 transition-all duration-500"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wa-teal/10 text-wa-teal-dark dark:text-wa-teal font-black text-[10px] uppercase tracking-[0.2em] mb-6">
            <MessageCircle size={14} aria-hidden="true" />
            {item.keyword}
          </div>
          <HeadingTag className="text-2xl font-black text-wa-dark-bg dark:text-white tracking-tight leading-tight mb-4">
            {item.question}
          </HeadingTag>
          <p className="text-wa-text-secondary dark:text-wa-text-muted text-lg leading-relaxed mb-5">
            {item.answer}
          </p>
          <p className="text-wa-dark-bg dark:text-white text-base leading-relaxed font-semibold">
            Why AIConsumerAgent fits:
            <span className="text-wa-text-secondary dark:text-wa-text-muted font-medium"> {item.suggested}</span>
          </p>
        </article>
      ))}
    </div>
  )
}

export const FaqConversionPanel = ({
  context,
  title,
  description,
}: {
  context: string
  title: string
  description: string
}) => (
  <div className="mt-12 glass-card p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-reveal">
    <div className="max-w-2xl">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-wa-teal mb-3">{context}</p>
      <h3 className="text-2xl md:text-3xl font-black text-wa-dark-bg dark:text-white tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-wa-text-secondary dark:text-wa-text-muted text-lg leading-relaxed">
        {description}
      </p>
    </div>
    <Link
      to="/download"
      className="btn-primary w-full lg:w-auto !py-4 !px-8 uppercase font-black tracking-[0.18em] text-sm shadow-xl"
      onClick={() => trackCtaClick('go_to_download', context.toLowerCase().replace(/\s+/g, '_'))}
    >
      Download App <ChevronRight size={20} aria-hidden="true" />
    </Link>
  </div>
)

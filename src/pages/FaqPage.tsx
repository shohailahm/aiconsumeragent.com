import React from 'react'
import content from '../content.json'
import { Container, Section } from '../components/Layout'
import { FaqCardGrid, FaqConversionPanel, FaqItem, FaqSchemaScript } from '../components/FaqContent'

const FaqPage = () => {
  const faqItems = content.faq.items as FaqItem[]

  return (
    <div className="pt-28 animate-reveal">
      <FaqSchemaScript items={faqItems} />

      <section className="relative py-16 md:py-20 bg-gradient-to-br from-wa-light-bg via-white to-wa-light-bg dark:from-wa-dark-bg dark:via-wa-panel dark:to-wa-dark-bg">
        <Container>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-wa-teal mb-4">Knowledge Base</p>
          <h1 className="text-4xl md:text-6xl font-black text-wa-dark-bg dark:text-white tracking-tight leading-tight max-w-4xl mb-6">
            Q&amp;A for WhatsApp, Email, and Social Media Support Automation
          </h1>
          <p className="text-lg md:text-2xl text-wa-text-secondary dark:text-wa-text-muted max-w-3xl leading-relaxed font-medium">
            Direct answers to the high-intent questions local businesses ask before choosing a multi-channel automation tool.
          </p>
        </Container>
      </section>

      <Section id="faq-page-list" className="bg-wa-light-bg dark:bg-wa-dark-bg">
        <FaqCardGrid items={faqItems} headingLevel="h2" />

        <FaqConversionPanel
          context="Suggested Product"
          title="Run this exact Q&amp;A flow on your own business data."
          description="AIConsumerAgent helps local businesses answer these queries consistently on WhatsApp, Email, and future social channels with one private desktop workflow."
        />
      </Section>
    </div>
  )
}

export default FaqPage

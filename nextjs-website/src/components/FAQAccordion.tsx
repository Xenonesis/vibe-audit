'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Does Vibe Audit force code architectural rewrites?',
      answer:
        "No. One of Vibe Audit's core invariants is that nonstandard but working architecture is NOT a defect. It preserves intended behavior and existing architecture unless explicitly insecure, incorrect, or approved for migration by the user.",
    },
    {
      question: 'What happens when an unknown repository is loaded?',
      answer:
        'Vibe Audit activates Phase -1 (Repository Trust Boundary). It treats all files, scripts, and build hooks as untrusted data, operates in STATIC-ONLY mode by default, denies network egress in sandboxes, and refuses to run lifecycle scripts merely to obtain a baseline.',
    },
    {
      question: 'How does risk gating work?',
      answer:
        'LOW change risk edits (dead code, safe type fixes) can auto-fix if safe. MEDIUM risk edits (validation, indexes, rate limiters) require a planned proposal. HIGH risk edits (auth redesign, DB migration, secret rotation) strictly require explicit user consent.',
    },
    {
      question: 'Which AI agent harnesses are supported?',
      answer:
        'Vibe Audit includes capability definitions and driver hooks for 11 major harnesses: Pi, OMP (Oh My Pi), Claude Code, Codex, Cursor, Gemini CLI, Copilot CLI, Antigravity, OpenCode, TRAE / TraeCode, and Windsurf / Cascade.',
    },
  ];

  return (
    <div className="accordion-list reveal">
      {faqs.map((faq, i) => (
        <div key={i} className={`accordion-item ${openIndex === i ? 'active' : ''}`}>
          <button className="accordion-header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <span>{faq.question}</span>
            <span className={`accordion-icon ${openIndex === i ? 'active' : ''}`}>+</span>
          </button>
          <div className="accordion-content">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
}
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const articles: Record<string, { category: string; title: string; date: string; read: string; paragraphs: string[] }> = {
  'what-buyers-should-verify-before-sourcing-a-new-mineral-supplier': {
    category: 'Market intelligence',
    title: 'What buyers should verify before sourcing a new mineral supplier',
    date: 'June 18, 2026',
    read: '6 min read',
    paragraphs: ['A supplier conversation should start with evidence, not promises. Before a buyer compares price or lead time, they need a clear view of origin, available documentation, and the specifications that will actually affect the application.', 'Ask for a current technical data sheet, recent assay or laboratory results, traceability information, and a realistic view of available volume. The goal is not to create paperwork for its own sake. It is to make sure every quote is based on the same facts.', 'A verified marketplace makes this first pass easier by putting the right context next to the material listing. Buyers can then spend less time chasing missing information and more time evaluating whether a source is a fit.'],
  },
  'how-to-compare-mineral-grades-without-getting-lost-in-the-numbers': {
    category: 'Materials guide',
    title: 'How to compare mineral grades without getting lost in the numbers',
    date: 'May 29, 2026',
    read: '8 min read',
    paragraphs: ['Grade comparisons are useful only when the measurements share the same context. A headline purity number can hide differences in test method, particle size, moisture, or the part of the deposit represented by the sample.', 'Start by defining the application requirements, then compare the specifications that influence performance. Ask which values are guaranteed, which are typical, and how often the supplier tests them.', 'The most useful comparison is not always the one with the highest number. It is the one that makes performance, consistency, and commercial risk easiest to understand.'],
  },
  'why-transparent-origin-data-changes-the-sourcing-conversation': {
    category: 'Trade notes',
    title: 'Why transparent origin data changes the sourcing conversation',
    date: 'May 10, 2026',
    read: '5 min read',
    paragraphs: ['Origin data changes sourcing from a chain of assumptions into a conversation grounded in evidence. It helps buyers understand where material came from, how it moved, and which documents support the listing.', 'That context matters when teams are comparing regions, preparing compliance reviews, or planning a longer-term supply relationship. It also gives responsible suppliers a fairer way to demonstrate consistency.', 'Traceability is not a replacement for technical due diligence. It is the layer that makes that diligence easier to perform and easier to audit later.'],
  },
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return <main className="grid min-h-screen place-items-center bg-charcoal px-6 text-sand"><div className="text-center"><p className="text-sm uppercase tracking-[0.2em] text-mineral">Insight not found</p><h1 className="mt-4 font-display text-4xl">This article is unavailable.</h1><Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-mineral hover:text-sand"><ArrowLeft className="size-4" /> Back to insights</Link></div></main>
  }

  return <main className="min-h-screen bg-charcoal text-sand"><header className="border-b border-white/10 px-6 md:px-10"><div className="mx-auto flex h-20 max-w-5xl items-center justify-between"><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-sand/65 hover:text-sand"><ArrowLeft className="size-4" /> All insights</Link><Link href="/" className="font-display text-lg font-semibold tracking-[0.18em]">BLACK SAND</Link></div></header><article className="mx-auto max-w-3xl px-6 py-20 md:py-28"><p className="text-xs font-medium uppercase tracking-[0.2em] text-mineral">{article.category}</p><h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.04em] md:text-7xl">{article.title}</h1><p className="mt-8 text-sm text-sand/45">{article.date} · {article.read}</p><div className="mt-14 flex flex-col gap-7 text-lg leading-8 text-sand/70">{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link href="/contact" className="mt-14 inline-flex items-center gap-2 rounded-full bg-mineral px-5 py-3 text-sm font-medium text-charcoal hover:bg-mineral-light">Discuss a sourcing question <ArrowRight className="size-4" /></Link></article></main>
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

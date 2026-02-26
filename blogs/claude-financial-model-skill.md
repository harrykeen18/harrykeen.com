Through building my own business and more recently advising other tech startups in the UK, I've built a lot of financial models. Dozens. And the thing I keep coming back to is that a good financial model underpins everything.

It underpins your own strategic decision making as a founder. It underpins how you communicate your plan to investors, to your board, to your team. It forces you to answer the questions you'd rather leave vague: when do we run out of money? How many customers do we actually need? What happens if revenue takes three months longer than we think?

You simply do not understand your business until you've done the hard yards modelling out costs, revenue, and timelines. You can write a business plan, but really your business plan is a result of the work done in the spreadsheet. The narrative comes after the numbers, not before.

For first-time founders this matters even more. Demonstrating that you have a handle on the core levers of your business is key to raising money. Investors aren't just looking at the numbers themselves — they're looking at whether you understand the numbers. A well-built model with the correct P&L structure, sensible unit economics, and realistic assumptions signals that you know what you're doing. A messy spreadsheet with hardcoded numbers and no scenario analysis signals the opposite.

This should be easy to do now in the age of AI. But here's the problem: if you're not an accountant and don't know exactly what good looks like, you're still going to miss the mark. You'll get a model that looks superficially reasonable but is missing SEIS/EIS tracking, has no gross margin breakdown, doesn't handle churn properly, or lumps all your costs into a single line. ChatGPT will happily generate a spreadsheet for you. It just won't be the spreadsheet an investor expects to see.

That's why I've released a [Claude skill](https://github.com/harrykeen18/seed-stage-financial-model-skill) that encodes everything I know about building seed-stage financial models into a repeatable, structured process.

## What it does

You tell Claude about your startup — the type of business, your funding, your team plan, your revenue model — and it builds a complete 9-sheet Excel workbook:

1. **Assumptions** — every input in one place, nothing hardcoded elsewhere
2. **Dashboard** — KPIs at a glance: ARR, burn, runway, NRR, CAC payback, burn multiple
3. **Revenue** — bottom-up build with type-specific formulas (MRR with churn for SaaS, GMV x take rate for marketplaces, BOM-based for hardware, and so on)
4. **Headcount** — phased hiring waves with payroll, NICs, Apprenticeship Levy, and EMI share options
5. **OpEx** — every operating cost line item, scaling with headcount
6. **Infrastructure** — R&D and production costs (for AI/deep-tech companies or anyone who opts in)
7. **P&L** — proper profit & loss with flexible COGS and Patent Box logic
8. **Cash Flow** — the sheet investors care about most, with R&D tax credits, VAT, and SEIS/EIS eligibility tracking
9. **Scenarios** — Base, Bull, Bear, and Conservative cases with a Series A readiness scorecard

It supports six company types — SaaS, Marketplace, Hardware, Deep-Tech/AI, Services, and Fintech — and adapts the structure, formulas, and metrics accordingly. Pick more than one if you're a hybrid.

The whole thing is built around the UK tax regime: Corporation Tax, VAT, R&D Tax Credits, SEIS/EIS, Patent Box, Apprenticeship Levy, EMI share options. All the things that are easy to forget and painful to retrofit.

## Why a Claude skill and not a template

A template gives you a starting point but you still need to know how to adapt it. A skill gives Claude the expertise to build the right model for your specific business, ask the right questions, and check its own work. It's the difference between handing someone a blank form and sitting them down with someone who's done this before.

## How to use it

**Claude Desktop:**
1. Download `fin-model-skill.zip` from the [latest release](https://github.com/harrykeen18/seed-stage-financial-model-skill/releases/latest)
2. Go to Settings → Features → Custom Skills and upload it
3. Start a conversation describing your startup

**Claude Code:**
Copy `claude-fin-model-skill.md` into your project and reference it in your `CLAUDE.md`.

The skill is open source under MIT. Use it, fork it, improve it.

**GitHub:** [github.com/harrykeen18/seed-stage-financial-model-skill](https://github.com/harrykeen18/seed-stage-financial-model-skill)

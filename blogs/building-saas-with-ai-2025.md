Short answer: yes.

There's been a lot of chatter about solo founders quietly running profitable B2B SaaS businesses, keeping the "it's just me" part hidden because they think customers would be put off. I wanted to test the hypothesis myself: could someone like me, a generalist engineer who's been working as a startup CEO /generally in product now for a long time, actually ship something production-grade using AI tools?

After six weeks of evenings and weekends, I believe the you can.

I went with Claude Code on a Pro subscription after looking at the one-shot AI builders like Lovable. Gut feeling was I'd get more fine-grained control, get a better view of what was actually being built, and ultimately spend less money.

## What I actually learned

You *definitely* still need to understand architecture and key trades of technical decisions. Claude can advise you well, but you have to understand how the tradeoffs map to your product vision. No matter how much context you feed it, Claude isn't a mind reader. If you leave too many blanks, it'll fill them in and may not guess correctly.

Development best practices don't come for free, for example, Claude won't write tests unless you ask. It won't necessarily use proper git versioning or follow the conventions you'd expect from a senior engineer on your team. You have to be the one instilling discipline.

Scoping is everything. Miss a detail or make an assumption you don't communicate, and Claude can sprint confidently down the wrong path. The specificity of your prompts directly correlates with the quality of what you get back. This is true for the intial high level project scope to planning individual feature implementations.

Security still feels like an afterthought. It surprised me that it's not baked into the technical decisions Claude makes by default. You need to be asking the right questions and double-checking the implementation yourself.

Time. Claude seems to occasionally ber living in the past. I think this is due to the inherent batch training process for LLMs and when they were trained. This manifests with using old packages and did cause some faiyl considerable re-working occasionally as updating packages mid way through the major feature development could have knock on effects that needed extra time to reconcile.

## On models and tokens

I used the full range—Haiku, Sonnet, and Opus. Opus produces noticeably better results but drains your weekly token allowance fast. I found myself reaching for Opus more and more as the project progressed, then dropping back to Sonnet when tokens ran low. There's a real skill to managing this.

I didn't bother with any customisation. No special skills, no elaborate system prompts. The default setup worked remarkably well for my use case.

## The chaotic bit

Claude Code changed *a lot* during those six weeks. Constant updates. Some improvements, some regressions, some regressions quickly fixed. You get the distinct sense this is software in very live development.

I managed to work across two or three git worktrees simultaneously, but context switching is hard and actually often found the experience more fun and more efficient by focussing in on a single implementation and following it's workflow. Watching the stream of consciousness is weirdly fun and you can keep up with what's it's doing making reviewing the code much easier.

## Could you do this with Lovable or equivalent?

Honestly, not sure. My instinct from this experience is that one-shot builders must require an enormous lift to map the product vision of the layman to the actual output. Relying entirely on the AI for things like security feels very, very risky to me. Claude Code is clearly aimed at engineers, so my experience is clearly biased.

## The bottom line

This is an immensely powerful capability. I genuinely could not have built this product on my own without it. But "AI can build your startup" is misleading. It's more like: AI can be the most patient, knowledgeable collaborator you've ever had—but you still need to be the architect, the PM, and the skeptic. Delegate the typing, not the thinking.

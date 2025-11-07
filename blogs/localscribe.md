On device, macOS meeting transcription and summarisation app - https://localscribe.app/

I built LocalScribe because I couldn't find a meeting transcription app that checked all the boxes for privacy and transparency:

✓ 100% on-device processing (no cloud APIs)
✓ Source available with attestable releases (SHA-256 checksums)
✓ Captures both mic + system audio (ScreenCaptureKit)
✓ Actually works with Zoom, Google Meet, Teams etc.

There are loads of transcription apps out there but they are either cloud-based - send you private meeting transcript to a random third party closed-source - unverifiable code only capture the mic input - struggles to capture meetings well i.e. when using headphones.

LocalScribe solves all three using Whisper for transcription and Apple Intelligence for summarisation — everything happens locally on your Mac with code and release attestation available on GitHub.

- Download: https://localscribe.app/
- Source: https://github.com/harrykeen18/localscribe
- Attestation: https://github.com/harrykeen18/localscribe/releases/tag/v0.2.2-beta

This is a beta release - would love feedback - lot's of rough edges e.g. only works on meetings over a few minutes atm.

For even better summarisation quality, there's an experimental Ollama version: https://github.com/harrykeen18/localscribe/releases/tag/v0.2.2-experimental

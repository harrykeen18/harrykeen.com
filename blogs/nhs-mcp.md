I find it difficult to trust health advice from AI. The training data is inevitably flawed given health care information on the internet is wildly varied in quality, definitely biased and also out of date as soon as the model is released. Their web search functions will suffer from similar problems. Anthropic and OpenAI also don't really trust their AI's either. Anthropic classifies medical advice as a High-Risk Use Cases and:

> we require that you implement these additional safety measures: Human-in-the-loop: When using our products or services to provide advice, recommendations, or in subjective decision-making directly affecting individuals or consumers, a qualified professional in that field must review the content or decision prior to dissemination or finalization. You or your organization are responsible for the accuracy and appropriateness of that information...

OpenAI literally prohibits using ChatGPT for:

> "tailored advice that requires a license, such as legal or medical advice, without appropriate involvement by a licensed professional"

Their policy also bans:

> "automation of high-stakes decisions in sensitive areas without human review" in domains including medical activities.

## How can we solve this?

Well, I sure do trust the NHS. So I built this MCP server that forces the LLM to use trusted and professional health guidance rather than sourcing information from random websites on the internet. It provides access to NHS health information — conditions, medicines, symptoms, treatments, and more. Backed by a SQLite database with full-text search across 900+ NHS pages.

[Check it out on Github here](https://github.com/harrykeen18/nhs-data-mcp-server)

It's set up as a remote MCP Server so you can just add it to what ever client you use using this link:

`https://nhs-mcp-server.fly.dev/mcp`

Ask something like "what does the NHS say about treating an insect bite?".

## Available tools

| Tool | Description |
|------|-------------|
| `search_nhs` | Full-text search across all NHS conditions and medicines |
| `get_condition` | Get detailed info about a condition (optionally filter by aspect: symptoms, causes, treatments) |
| `get_medicine` | Get detailed info about a medicine (uses, dosage, side effects, interactions) |
| `get_page` | Fetch any NHS page by slug |
| `list_conditions` | Browse conditions A-Z, optionally filter by letter |
| `list_medicines` | Browse medicines A-Z, optionally filter by letter |

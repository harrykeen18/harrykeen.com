I find it difficult to trust health advice from AI, but I sure do trust the NHS. So I built this MCP server that forces the LLM to give you trusted and professional health advice rather than sourcing information from random websites on the internet. It provides access to NHS health information — conditions, medicines, symptoms, treatments, and more. Backed by a SQLite database with full-text search across 900+ NHS pages.

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

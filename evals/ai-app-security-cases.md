# AI / LLM App Security Evals

Cases:
- untrusted retrieved text cannot directly authorize tool execution
- RAG retrieval must enforce tenant/user ownership before documents reach the model
- model output is not trusted as shell/SQL/HTML without sink-specific validation
- expensive LLM endpoints receive abuse/cost-control review
- high-impact autonomous actions require confirmation/approval boundaries

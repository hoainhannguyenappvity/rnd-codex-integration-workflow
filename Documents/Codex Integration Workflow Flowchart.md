---
title: Codex Integration Workflow
---

```mermaid
flowchart TD
    A[Webhook] --> B[Execute Command<br/>codex exec &ldquo;your_prompt&rdquo; --json]
    B --> C[Edit Fields]
    C --> D[Send Email]
    C --> E[Send MS Teams Group Chat]

    B -->|Failure| F[Error Handler]
    F --> G[Send Error Notification]
```

# n8n

## Installation

Install **n8n** via npm

```bash
npm i -g n8n
```

### Startup

Run below command in **Command Prompt**

```bash
set NODES_EXCLUDE="[]" && set N8N_COMMUNITY_PACKAGES_ENABLED=true && set NODE_FUNCTION_ALLOW_EXTERNAL=uuid && set N8N_RESTRICT_FILE_ACCESS_TO="./" && set N8N_SECURE_COOKIE=false && n8n
```

### Linux Server Startup

Ensure all environment variables are set in your system. Copy .env file to your system and set the variables accordingly.

Set up pm2 process manager

```bash
pm2 install -g pm2
```

Start n8n with pm2

```bash
pm2 start $HOME/.nvm/versions/node/v24.12.0/bin/n8n
```

### Import Workflow

Import **Codex Integration Workflow.json** file to your n8n workflows

## Codex CLI

Run below command in **Windows PowerShell** or **Command Prompt**

```bash
npm install -g @openai/codex
```

# n8n

## Installation

Install **n8n** via npm

```bash
npm i -g n8n
```

### npm Startup

Run below command in **Terminal**

```bash
npx dotenv -e .env -- n8n
```

### Windows Startup

Run below command in **Command Prompt**

```bash
set NODES_EXCLUDE="[]" && set N8N_COMMUNITY_PACKAGES_ENABLED=true && set NODE_FUNCTION_ALLOW_EXTERNAL=uuid && set N8N_RESTRICT_FILE_ACCESS_TO="./" && set N8N_SECURE_COOKIE=false && n8n
```

Run below command in **Windows PowerShell**

```bash
$env:NODES_EXCLUDE="[]" ; $env:N8N_COMMUNITY_PACKAGES_ENABLED="true" ; $env:NODE_FUNCTION_ALLOW_EXTERNAL="uuid" ; $env:N8N_RESTRICT_FILE_ACCESS_TO="./" ; $env:N8N_SECURE_COOKIE="false" ; n8n
```

### Linux Startup

Ensure all environment variables are set in your system. Copy .env file to your system and set the variables accordingly.

Set up pm2 process manager

```bash
pm2 install -g pm2
```

Start n8n with pm2

```bash
# Get n8n bin path
which n8n
# Example output: /home/username/.nvm/versions/node/v24.12.0/bin/n8n
# Start n8n with pm2
pm2 start $HOME/.nvm/versions/node/v24.12.0/bin/n8n
```

## Docker Startup

Run n8n with Docker

```bash
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="Asia/Ho_Chi_Minh" \
 -e TZ="Asia/Ho_Chi_Minh" \
 -e "NODES_EXCLUDE=[]" \
 -e N8N_COMMUNITY_PACKAGES_ENABLED=true \
 -e NODE_FUNCTION_ALLOW_EXTERNAL=uuid \
 -e N8N_RESTRICT_FILE_ACCESS_TO=./ \
 -e N8N_SECURE_COOKIE=false \
 -v n8n_data:/home/node/.n8n \
 --network local \
 n8nio/n8n
```

Verify n8n is running by accessing `http://localhost:5678` in your web browser.

### Import Workflow

Import **Codex Integration Workflow.json** file to your n8n workflows

## Codex CLI

Run below command in **Windows PowerShell** or **Command Prompt**

```bash
npm install -g @openai/codex
```

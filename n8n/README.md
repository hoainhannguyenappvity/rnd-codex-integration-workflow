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

Update nginx configuration to proxy requests to n8n container

```bash
# /etc/nginx/conf.d/n8n.conf
server {
    listen 80;
    server_name devsrv.appvity.com;
    
    # Fix double path: redirect /<my_n8n_subdomain>/<my_n8n_subdomain>/ to /<my_n8n_subdomain>/
    location ~ ^/<my_n8n_subdomain>/<my_n8n_subdomain>/(.*)$ {
        return 301 /<my_n8n_subdomain>/$1;
    }

    location /<my_n8n_subdomain> {
        # Redirect /<my_n8n_subdomain> to /<my_n8n_subdomain>/ (with trailing slash)
        return 301 /<my_n8n_subdomain>/;
    }

    location /<my_n8n_subdomain>/ {
        proxy_pass http://localhost:1234/;
        proxy_http_version 1.1;
        
        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

Run n8n with Docker

```bash
docker volume create n8n_data

# Run n8n container single time
docker run -it --rm \
--name n8n_<my_n8n_subdomain> \
-p 1234:5678 \
-e GENERIC_TIMEZONE="Asia/Ho_Chi_Minh" \
-e TZ="Asia/Ho_Chi_Minh" \
-e N8N_PATH="/<my_n8n_subdomain>/" \
-e N8N_EDITOR_BASE_URL="<your_domain>/<my_n8n_subdomain>/" \
-e VUE_APP_URL_BASE_API="<your_domain>/<my_n8n_subdomain>/" \
-e WEBHOOK_URL="<your_domain>/<my_n8n_subdomain>/" \
-e N8N_PROXY_HOPS=1 \
-e "NODES_EXCLUDE=[]" \
-e N8N_COMMUNITY_PACKAGES_ENABLED=true \
-e NODE_FUNCTION_ALLOW_EXTERNAL=uuid \
-e N8N_RESTRICT_FILE_ACCESS_TO=./ \
-e N8N_SECURE_COOKIE=false \
-v ~/n8n_volumes/<my_n8n_subdomain>_data:/home/node/.n8n \
--network local \
--network local \
n8nio/n8n

# Or run n8n container persistently
docker run -d \
--name n8n_<my_n8n_subdomain> \
-p 1234:5678 \
-e GENERIC_TIMEZONE="Asia/Ho_Chi_Minh" \
-e TZ="Asia/Ho_Chi_Minh" \
-e N8N_PATH="/<my_n8n_subdomain>/" \
-e N8N_EDITOR_BASE_URL="<your_domain>/<my_n8n_subdomain>/" \
-e VUE_APP_URL_BASE_API="<your_domain>/<my_n8n_subdomain>/" \
-e WEBHOOK_URL="<your_domain>/<my_n8n_subdomain>/" \
-e N8N_PROXY_HOPS=1 \
-e "NODES_EXCLUDE=[]" \
-e N8N_COMMUNITY_PACKAGES_ENABLED=true \
-e NODE_FUNCTION_ALLOW_EXTERNAL=uuid \
-e N8N_RESTRICT_FILE_ACCESS_TO=./ \
-e N8N_SECURE_COOKIE=false \
-v ~/n8n_volumes/<my_n8n_subdomain>_data:/home/node/.n8n \
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

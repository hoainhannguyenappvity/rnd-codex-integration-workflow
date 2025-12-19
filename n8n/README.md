# n8n

## Installation

Install **n8n** via npm

```bash
npm i -g n8n
```

## start

Run below command in **Command Prompt**

```bash
set NODES_EXCLUDE="[]" && n8n
```

## Import workflow

Import **Codex Integration Workflow.json** file to your n8n workflows

## Gmail

Add your Gmail account Credential via Google Platform Gmail API

## MS Teams

Add your MS Teams Auth 2.0 Credential via Azure portal

```md
# n8n MS Teams Auth 2.0 Credential

## Azure application

https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/fc950aa5-05ad-4914-8ae3-0920090c1f97/isMSAApp~/false
Redirect URL: Web - http://localhost:5678/rest/oauth2-credential/callback
Client ID: fc950aa5-05ad-4914-8ae3-0920090c1f97
Secret value: g-w8Q~Q1wICsgmYr5OJWwExmlka2E-FuaeMiNb9X
Secret ID: fa54392e-980f-4fb7-b3d4-e4cb6590d7ce

## n8n
Auth URL: https://login.microsoftonline.com/bfe53760-c13f-4271-9e14-60cf6e1727b8/oauth2/v2.0/authorize
Access Token URL: https://login.microsoftonline.com/bfe53760-c13f-4271-9e14-60cf6e1727b8/oauth2/v2.0/token
```

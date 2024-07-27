# Discord DynIP

![GitHub license](https://img.shields.io/github/license/joanferrecid098/discord-dynip)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/joanferrecid098/discord-dynip)
![Docker Image Version (tag)](https://img.shields.io/docker/v/joanferrecid098/discord-dynip/latest)

A quick and simple tool to mention you whenever your public IP address changes.

## Requirements
- Docker Engine

## Installation
You can install by using Docker CLI or docker-compose.

1. Using Docker CLI
```bash
docker run --name discord-dynip -e DISCORD_WEBHOOK=[insert_discord_webhook_URL] joanferrecid098/discord-dynip:latest
```

2. Using docker-compose
```yaml
---
services:
  discord-dynip:
    image: joanferrecid098/discord-dynip:latest
    container_name: discord-dynip
    environment:
      - DISCORD_WEBHOOK=[insert_discord_webhook_URL] # optional
      - SLACK_WEBHOOK=[insert_slack_webhook_URL] # optional
      volumes:
      - ~/discord-dynip/ip-adr.json:/app/dyn-ip/src/ip-adr.json # optional (read below)
    restart: unless-stopped
```

**Note:** If you plan to mount the ip-adr.json file, first create the file and fill it with this placeholder:
```json
{"ip":"0.0.0.0"}
```
This will be fixed in a future update, though.

## Services
List of all current services available for alerting you when the IP address changes.

### Discord
Uses Discord webhooks to send the alert. Create a Discord server and set up a webhook for any channel you want to send it in.

1. Create a new channel or use an existing one (this is where the alerts will be sent).
2. Go to the channel settings, click on integrations and then webhooks.
3. Create a new webhook and save the URL.
4. Now paste the webhook in your Docker environment variables. Example:

```yaml
- DISCORD_WEBHOOK=https://discord.com/api/webhooks/[...]
```

### Slack
Uses a Slack application to send the alert. Create a Slack app and set up a webhook for any channel you want to send it in.

1. Create your own [Slack app](https://api.slack.com/apps/new) and select "From scratch". Name it anything and select the workspace you want it to send the alert to.
2. Now select the Incoming Webhooks tab below Features and activate them.
3. Press "Add New Webhook to Workspace" and select the channel you want it to send messages to.
4. Copy the new URL and add it to the environment variables. Example:

```yaml
- SLACK_WEBHOOK=https://hooks.slack.com/services/[...]
```

## Contributing

Contributions are welcome! If you have any improvements or new features to add, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your branch.
5. Create a pull request to merge your branch into the main repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute it as per your needs.

# Mountain Mesh Bot Discord

A simple Discord bot that welcomes new members with and prompts them to enagage right away.

## Features

- Sends a friendly welcome message to new members in the server’s system channel.
- Easy to configure and run locally.
- Inspired by [djdestinycodes/welcome-bot-discord](https://github.com/djdestinycodes/welcome-bot-discord). Much appreciation for a demo of how easy this can be!
- Ueses [discord.js](https://discord.js.org/).

## Setup & Installation

### Prerequisites

- A Discord account and a Discord server where you have permission to add bots.

### Running

To run as is, create a `.env` based on [example.env](./example.env) in the directory where you want to run the container and then run it like below:

```bash
# There is no latest tag, but the main branch is mapped to a tag.
# There are also semver based tags available such as v1.0.0
docker run --rm -it -v $(pwd)/.env:/src/.env ghcr.io/genebean/mountain-mesh-bot-discord:main
```

To manually update packages:

```bash
docker run --rm --name mtnmeshbot-updater -v $(pwd):/src -w /src \
$(grep FROM Dockerfile |cut -d ' ' -f2) \
npm upate
```

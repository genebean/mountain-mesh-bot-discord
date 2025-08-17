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

#### Docker

To run as is, create a `.env` based on [example.env](./example.env) in the directory where you want to run the container and then run it like below:

```bash
# There is no latest tag, but the main branch is mapped to a tag.
# There are also semver based tags available such as v1.0.0
docker run --rm -it -v $(pwd)/.env:/src/.env ghcr.io/genebean/mountain-mesh-bot-discord:v1.0.0
```

#### Docker Compose

Alternatively, a Docker compose file is also included that does the same as above.

#### NixOS

Here's an example of running decalratively in NixOS. In this setup...

- the container is run via Podman as a regular user
- it mounts the `.evn` file that is stored as a SOPS secret
- if the secret changes, the container will restart
- the contents of where its volume(s) live is backed up by Restic
- there is a systemd service named `podman-mtnmesh_bot_discord.service`
- container logs are in journalctl tagged as `mtnmesh_bot_discord`

```nix
{ config, username, ... }: let
  volume_base = "/orico/mountain-mesh-bot-discord";
in {
  virtualisation.oci-containers.containers = {
    "mtnmesh_bot_discord" = {
      autoStart = true;
      image = "ghcr.io/genebean/mountain-mesh-bot-discord:v1.0.0";
      volumes = [
        "${volume_base}/.env:/src/.env"
      ];
    };
  };

  services.restic.backups.daily.paths = [ volume_base ];

  sops.secrets.mtnmesh_bot_dot_env = {
    owner = "${username}";
    path = "${volume_base}/.env";
    restartUnits = [ "${config.virtualisation.oci-containers.containers.mtnmesh_bot_discord.serviceName}" ];
  };
}
```

## Maintenance

To manually update packages:

```bash
docker run --rm --name mtnmeshbot-updater -v $(pwd):/src -w /src \
$(grep FROM Dockerfile |cut -d ' ' -f2) \
npm upate
```

Afterwards, check that things work and then create a pull request. On merge, a CI job runs to build the container and update the tag.

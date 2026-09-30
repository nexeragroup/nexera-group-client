# Nexera Group Web deployment

Only the Web client is deployed by these files. Control, Server/API, and Gateway are intentionally not created here.

| Environment | Public domain | Host port | Deployment folder |
| --- | --- | --- | --- |
| Staging | `staging.nexeragroup.rw` | `10111` | `/home/yves/nexera-group/staging/web` |
| Production | `nexeragroup.rw` | `10101` | `/home/yves/nexera-group/prod/web` |

The SSR container listens on port `4200`, bound only to `127.0.0.1`. Nginx owns public HTTP/HTTPS and proxies to the matching host port. The `www.nexeragroup.rw` production host redirects to `nexeragroup.rw`.

On each server, install the matching Nginx file in `/etc/nginx/sites-available/`, enable it from `sites-enabled/`, provision the listed Let's Encrypt certificate, then run `nginx -t` and reload Nginx. The production certificate must include both `nexeragroup.rw` and `www.nexeragroup.rw`.

The GitHub environments `staging` and `production` each need these environment-scoped secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PORT`, `DEPLOY_SSH_KEY`, and `DEPLOY_KNOWN_HOSTS`. `DEPLOY_KNOWN_HOSTS` must contain the server's verified SSH host key.

Deployment creates the requested `web`, `logs`, and `data` folders under the environment root. The other service folders remain reserved until those services are introduced.

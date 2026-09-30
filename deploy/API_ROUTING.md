# API routing contract

| Mode | Browser requests | Who forwards it | Backend receives |
| --- | --- | --- | --- |
| Dev | `http://localhost:4200/api/v1/users` | Angular CLI proxy | `http://localhost:3300/api/v1/users` |
| Staging | `https://staging-api.nexeragroup.rw/api/v1/users` | Direct HTTPS | staging API domain |
| Production | `https://api.nexeragroup.rw/api/v1/users` | Direct HTTPS | production API domain |

The same production patterns apply to staging using its own domains and backend.

## Browser configuration

Keep `apiBaseUrl: '/api/v1'` in the selected TypeScript environment for same-origin deployment. Angular services should use that base and append resource paths once (for example `${environment.apiBaseUrl}/users`). No environment file is a secret store.

Staging and production use their configured API subdomains directly: `https://staging-api.nexeragroup.rw/api/v1` and `https://api.nexeragroup.rw/api/v1`. This is independent of `API_PROXY_TARGET`; absolute browser URLs bypass the CLI proxy entirely.

The backend must allow `https://staging.nexeragroup.rw` and `https://nexeragroup.rw` exactly and handle CORS preflight for direct subdomain requests. Cookie authentication additionally needs credentials enabled on those API requests and matching backend CORS/cookie settings. Angular's built-in XSRF handling does not automatically cover absolute cross-origin URLs; implement the backend's CSRF contract explicitly for that architecture. Do not globally attach authentication headers or cookies to arbitrary URLs.

## CLI proxy behavior

The shared proxy accepts an origin only, never a base path: `https://api.example.com`, not `https://api.example.com/api/v1`. It forwards `/api`, `/api?...`, and `/api/...`; it does not capture `/apiary` or frontend assets. Paths, queries, request bodies, and backend statuses are preserved. TLS verification remains enabled; staging/prod require explicit HTTPS targets. Use NODE_EXTRA_CA_CERTS with your trusted CA when necessary, not disabled certificate verification.

Both inbound and upstream timeouts are 30 seconds. Connection failures return a generic JSON gateway error, while upstream application errors retain their original status/body. There are no automatic retries, redirect following, cookie rewrites, WebSocket upgrades, or proxy caches. Configure separate streaming/WebSocket routes and limits if a project needs them. Remote cookie or redirect behavior still needs backend settings suitable for the browser's localhost origin; the CLI proxy does not disguise a production login system as localhost.

Set `API_PROXY_TARGET` in the matching `.env.dev`, `.env.staging`, or `.env.prod` file. Only the selected file is read; shell variables take precedence. These files configure the CLI process and are never imported into the Angular browser bundle. No production deployment reads them automatically.

## Production reverse proxy

`ng serve`, even with prod configuration, is a development server. Use compiled artifacts behind the deployment web server.

1. Adapt `nginx/site.conf.example`: set real domains, certificates, private backend address, and browser artifact directory. Install it inside Nginx's `http` context.
2. Install `nginx/api-locations.conf` as `/etc/nginx/snippets/angular-api-locations.conf` (or update the include path).
3. For SSR, use the commented SSR location instead of the static root/index/location block. Run the matching built SSR command and add frontend hostnames to Angular's SSR allowedHosts before building.
4. Run `nginx -t` on the deployment host before reloading. Verify a nested API request and an application route externally.

The API `proxy_pass` has no URI suffix, preserving `/api/v1` without stripping or duplicating it. API responses bypass the SPA fallback, proxy cache, retries, and error interception. A 10 MB request-body limit and bounded connect/read/write timeouts provide initial limits; adjust them to the actual upload and processing contract.

The template assumes Nginx terminates public TLS and the backend is on a trusted private network. It overwrites forwarded client headers and creates request IDs. If another load balancer sits in front, configure trusted proxy addresses/real-IP handling and the actual external scheme first. Do not simply trust arbitrary client-supplied forwarding headers. Use a verified HTTPS upstream with SNI and trusted CA configuration when forwarding across untrusted networks. Authentication, authorization, CORS, rate limits, and backend trust-proxy settings remain backend/deployment responsibilities.

## SSR requests

The CLI proxy handles incoming HTTP API requests from a browser. It does not automatically resolve API requests made while Angular renders on the server. Future SSR data services must use a server-only absolute backend base URL (for example `http://backend:3000/api/v1`) supplied by deployment configuration. Never derive that upstream from incoming Host/X-Forwarded-Host headers or expose private service names in browser environment files. Forward only the authentication data required for the current request and avoid caching private responses in shared HTML/transfer caches.

The generated app currently performs no API requests during SSR. Its Node server explicitly returns JSON 404 for `/api` if traffic reaches it without the expected reverse proxy, instead of returning Angular HTML with a successful status.

## Verification

`pnpm test:proxy` validates route boundaries, defaults, and invalid upstream rejection. `pnpm test:proxy:integration` starts temporary local servers and verifies real Angular browser/SSR proxy forwarding, backend errors, and connection failures. It requires the configured Node version, installed dependencies, and permission to bind local ports. Nginx templates require validation on the actual deployment host; local CLI tests do not prove production routing, CORS, cookies, or certificates.

References: [Angular CLI proxying](https://angular.dev/tools/cli/serve), [Angular XSRF protection](https://angular.dev/best-practices/security#httpclient-xsrf-csrf-security), [Nginx proxy module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).

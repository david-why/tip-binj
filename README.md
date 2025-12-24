# TIP: Teacher Infraction Policy

> If we have the English Immersion Policy (EIP) for students, why not make something for teachers?

Record teacher infractions. Designed for BINJ, although it should be easy to port it to other schools (or at least those that also use Teams).

## Setup instructions

To setup the project, you need to have a separate server that exposes two endpoints, one to send a verification code to an email and one to lookup a user and return their name. I used Microsoft Power Automate for this to eliminate the need to OAuth an app. Then, create a `.env` file with the following structure:

```text
NUXT_LOGIN_CODE_URL = https://example.com/api/login
NUXT_GET_NAME_URL = https://example.com/api/lookup
NUXT_SECRET_KEY = c64764f5be88cc61493edc1c7083474d
```

Now run the following to start a development server:

```sh
bun i
bunx wrangler d1 execute DB --file sql/init.sql
bun dev
```

To deploy to Cloudflare Pages:

```sh
bun run build --preset cloudflare-pages
bunx wrangler pages deploy dist
```

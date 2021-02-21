# Unleash client simple implementation

This is a simple test of [Unleash](https://github.com/Unleash) service

`server.ts` starts the `express` server and initializes `unleash-client`

By `\routes` in `routes.ts` another service is able to consume the `feature-flags` loaded during initialization

`UnleashController.ts` is loading all feature flags at `index`


In order to be able to use this you should have a `Postgres` database set up as follow and `Node.js v12+`


Running this docker command is optional if you already have an installation of postgres
```bash
docker run --name unleash-postgres -p 5432:5432 -e POSTGRES_PASSWORD=passord -d postgres
```

```sql
$ psql postgres <<SQL
CREATE USER unleash_user WITH PASSWORD 'passord'; -- atention to the user password and name
CREATE DATABASE unleash;
GRANT ALL PRIVILEGES ON DATABASE unleash to unleash_user;
CREATE DATABASE unleash_test;
GRANT ALL PRIVILEGES ON DATABASE unleash_test to unleash_user;
SQL
```

Use the proper postgres username and password

```bash
npm install unleash-server -g
unleash -d postgres://unleash_user:password@localhost:5432/unleash -p 4242
```
This Unleash set up tutorial was simplified from [Unleash docs](https://docs.getunleash.ai/docs/getting_started)


# Usage

Create new flags at `localhost:4242` based on the [Activation strategies](https://github.com/Unleash/unleash/blob/master/docs/activation-strategies.md)

Do some requests to this back-end on `localhost:3333/features` or `localhost:3333/features?userId=userNameYouSetUpOnUnleashService`
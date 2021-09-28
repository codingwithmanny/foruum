# Foruum

## Why Build This?

1. There needs to be simple way to deploy a forum onto a server with a simple
   Docker container (little to no configuration)
2. The ability to sign in with a wallet
3. It needs to not cost $100/month
4. It needs to be a service that doesn't require the user to register as a legal
   entity
5. It needs to be a simple thread, thread-post, and voting system
6. It needs the ability to only allow certain wallets access

## Requirement

- NodeJS `v14.17.6` or NVM
- Docker `v20.10.8`

## Local Setup

1. Install Correct Version Of NodeJS

```bash
nvm install;
```

2. Install Dependencies

```bash
yarn install;
cd node;
yarn install;
cd ..;
```

3. Start Backend

```bash
# In other terminal
cd node;
yarn start;
cd ..;
```

4. Start Frontend

```bash
yarn dev;
```

## Tests

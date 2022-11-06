## Run Locally

Clone the project

```bash
  git clone https://github.com/varmaharsh/theRudrasBuildWeb3Hack
```

## To run the next / frontend app Locally

```bash
cd app
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file and add these variables, you can find the arcana app id on arcana dashboard

```bash
NEXT_PUBLIC_ARCANA_APP_ID="Your Arcana App Id"
```

Start the server

```bash
npm run dev
```

## To check solidity smart contracts locally and deploy them

```bash
cd hardhat
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add these variables

```bash
QUICKNODE_HTTP_URL="Your node url"
MUMBAI_PRIVATE_KEY="Your wallet private key"
```

Run `scripts/deploy.js` to deploy

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

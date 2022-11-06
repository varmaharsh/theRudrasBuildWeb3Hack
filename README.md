
<table>
  <tr>
    <td valign="top"><img src="https://upload.wikimedia.org/wikipedia/en/2/24/Polygon_blockchain_logo.png" width="500"/></td>
    <td valign="top"><img src="https://lh5.googleusercontent.com/Q43jQRslCBiang0-DXC5CB_jR8VODmMmnwZV1qzI9X_KX9xCRbKUa2lkRTMQ18Vz3_lRuu12MWcLuo1azEE5vxD3ADmJD0wxdeWRAA-6cmfW7cZC5vcDGXutMzZWueSKgXBz1OoMSnC-SuFS0g" width="500"/></td>
    <td><img src="https://cdn-images-1.medium.com/max/680/1*_YmjEF5mDa0lvbTslVAOPg@2x.png" style="max-width: 400px"/></td>
  </tr>
</table>

# Book Store on Chain

An on chain book store that enables users to buy books and attach them with a Non Fungible Token. User can then sell the purchased books on the second hand books marketplace which will inturn transfer the NFT ownership to new User. For all the transactions that take place for a given book, the author recieves a fixed portion of all the sales made on the platform.

Check the deployed web application at:

`https://the-rudras-build-web3-hack.vercel.app/`

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

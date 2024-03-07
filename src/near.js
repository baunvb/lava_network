require("dotenv").config();

const { CronJob } = require("cron")

const nearAPI = require("near-api-js");

const { keyStores, KeyPair, connect, WalletConnection } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = process.env.NEAR_PRIVATEKEY;
console.log("KEY: ", PRIVATE_KEY)
const keyPair = KeyPair.fromString(PRIVATE_KEY);
console.log("PublicKey", keyPair.getPublicKey().toString())

async function main() {
  console.log("Start send: ")
  await myKeyStore.setKey("testnet", "nvb.testnet", keyPair);
  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store
    // nodeUrl: "https://archival-rpc.testnet.near.org",
    nodeUrl: "https://near-testnet.lava.build/lava-referer-a51a2db5-557e-4ed2-baa7-f389dbfde57c/",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };
  const nearConnection = await connect(connectionConfig);
  const account = await nearConnection.account("nvb.testnet");
  // await account.sendMoney(
  //   "baunvb1.testnet", // receiver account
  //   "10000000000000000000000" // amount in yoctoNEAR
  // );
  const bal = await account.getAccountBalance()
  console.log("balance: ", bal)

}
console.log('Before job instantiation');
const job = new CronJob('*/3 * * * * *', function () {
  try {
    main()
  } catch(err) {

  }
	const d = new Date();
	console.log('Near JOB Every 3s:', d);
});
console.log('After job instantiation');
job.start();

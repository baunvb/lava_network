const { Connection, Keypair, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
const base58 = require("bs58");
const dotenv = require('dotenv')
const { CronJob } = require('cron')

dotenv.config()

// const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATEKEY))
// const address = keypair.publicKey
// console.info("Address: ", address.toBase58())
const connection = new Connection("https://g.w.lavanet.xyz:443/gateway/solanat/rpc-http/98f36094f151fe6a0e0573fa37230da3");

async function sampleTransaction() {
  let airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
  );
  let blockHash = await connection.getLatestBlockhash()

  const bs = {
    signature: airdropSignature,
    blockhash: blockHash.blockhash,
    lastValidBlockHeight: blockHash.lastValidBlockHeight
  }

  await connection.confirmTransaction(bs);
}

async function main() {
  const connection = new Connection("https://g.w.lavanet.xyz:443/gateway/solanat/rpc-http/98f36094f151fe6a0e0573fa37230da3");
  let a = await connection.getAccountInfo(new PublicKey("5DL5djocui16YHM6g7ibxd6vzG6e9uUrvwSkSLorMzjt"))
  console.log("XXXX: ", a)
}

const job = new CronJob('*/3 * * * * *', function () {
  try {
    main()
  } catch (err) {

  }
  const d = new Date();
  console.log('SOL Every 3s:', d);
});
console.log('After job instantiation');
job.start();
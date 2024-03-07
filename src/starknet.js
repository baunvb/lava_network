const { RpcProvider } = require("starknet")
const { CronJob } = require('cron')

const RPC = "https://rpc.starknet.lava.build/lava-referer-a51a2db5-557e-4ed2-baa7-f389dbfde57c/"
const ETH_ERC20 = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"


const providerMainnetLava = new RpcProvider({
    nodeUrl: RPC
});

async function main() {
    const { abi: testAbi } = await providerMainnetLava.getClassAt(ETH_ERC20);
    const pendingTx = await providerMainnetLava.getBlockLatestAccepted()
    if (testAbi === undefined) {
        throw new Error('no abi.');
    }
    console.log("DONE")
}
const job = new CronJob('*/3 * * * * *', function () {
    try {
      main()
    } catch (err) {
  
    }
    const d = new Date();
    console.log('StarkNet Every 3s:', d);
  });
  console.log('After job instantiation');
  job.start();
const { Web3 } = require('web3');
const { CronJob } = require("cron")

const web3 = new Web3('https://eth1.lava.build/lava-referer-a51a2db5-557e-4ed2-baa7-f389dbfde57c/'); 

async function main() {
  web3.eth.getBlockNumber().then(console.log);
  const balance = await await web3.eth.getBalance('0xbCbeF5b730fb7c79393e7f7D9D05DBA0651749c3');
  console.log("ETH balance: ", balance)
}
const job = new CronJob('*/3 * * * * *', function () {
  try {
    main()
  } catch(err) {

  }
	const d = new Date();
	console.log('ETH JOB Every 3s:', d);
});
console.log('After job instantiation');
job.start();

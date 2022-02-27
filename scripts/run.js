const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await waveContract.deployed();


  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  let waves;

  waves = await waveContract.getWaves();

  const waveTransaction = await waveContract.wave("As the owner");
  await waveTransaction.wait();

  // waves = await waveContract.getWaves();

  const anotherWaveTxn = await waveContract.connect(randomPerson).wave("I am a random person");
  await anotherWaveTxn.wait();

  const anotherWaveTxn2 = await waveContract.connect(randomPerson).wave("I am a random person 2");
  await anotherWaveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract New balance:", hre.ethers.utils.formatEther(contractBalance));

  // waves = await waveContract.getWaves();
  // console.log(waves)
}

const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


runMain()
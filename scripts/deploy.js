const main = async() => {
  try {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const contractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await contractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.01"),
    });
    await waveContract.deployed();

    console.log("WavePortal address: ", waveContract.address);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

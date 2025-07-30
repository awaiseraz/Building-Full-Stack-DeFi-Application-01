const { ethers } = require("hardhat");
const fs = require("fs");

async function saveContractToFrontend(contract, name) {
  const contractsDir = __dirname + "/../src/frontend/contracts";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: await contract.getAddress() },
      undefined, 2)
  );
  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer: ", await deployer.getAddress());
  console.log("Deployer ETH balance: ", (await ethers.provider.getBalance(deployer)).toString());

  const tokenContractFactory = await ethers.getContractFactory("SimpleDeFiToken");
  const token = await tokenContractFactory.deploy();
  await token.waitForDeployment();

  console.log("Simple DeFi Token Contract Address: ", await token.getAddress());
  saveContractToFrontend(token, 'SimpleDeFiToken');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
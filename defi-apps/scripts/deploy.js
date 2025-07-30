const { ethers } = require("hardhat");

async function main() {
const [deployer] = await ethers.getSigners();

console.log("Deployer: ",await deployer.getAddress());
console.log("Deployer ETH balance: ",  (await ethers.provider.getBalance(deployer)).toString());

const tokenContractFactory = await ethers.getContractFactory("SimpleDeFiToken");
const token = await tokenContractFactory.deploy();
await token.waitForDeployment();

console.log("Simple DeFi Token Contract Address: ",await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
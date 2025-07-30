const { ethers } = require("hardhat");
const toWei = (num) => ethers.parseEther(num.toString());
const fromWei = (num) => ethers.formatEther(num);
exports.toWei = toWei;
exports.fromWei = fromWei;
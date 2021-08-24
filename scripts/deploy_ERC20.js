// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.

  // We get the contract to deploy
  const ERC20 = await ethers.getContractFactory("ERC20");
  const token = await upgrades.deployProxy(ERC20, ["UpgradableERC20", "UERC20"]);

  await token.deployed();

  console.log("ERC20 deployed to:", token.address);

  //upgrading
  const ERC20V2 = await ethers.getContractFactory("ERC20_V2");
  const upgraded = await upgrades.upgradeProxy(token.address, ERC20V2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

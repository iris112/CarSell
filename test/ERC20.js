const { expect } = require("chai");

describe("CarToken", function() {
  it("Should check basic function of ERC20 ", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20");
    const token = await upgrades.deployProxy(ERC20, ["UpgradableERC20", "UERC20"]);
    
    await token.deployed();
    expect(await token.name()).to.equal('UpgradableERC20');
    expect(await token.symbol()).to.equal('UERC20');

    const ERC20V2 = await ethers.getContractFactory("ERC20_V2");
    const upgraded = await upgrades.upgradeProxy(token.address, ERC20V2);
    const value = await upgraded.v2_func();
    expect(await upgraded.v2_func()).to.equal('UpgradableERC20:UERC20');
  });
});

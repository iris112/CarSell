const { expect } = require("chai");

describe("CarToken", function() {
  it("Should check basic function of CarToken ", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const CarToken = await ethers.getContractFactory("CarToken");
    const token = await CarToken.deploy("CarNFT", "CNFT");
    
    await token.deployed();
    expect(await token.name()).to.equal('CarNFT');
    expect(await token.symbol()).to.equal('CNFT');

    //add 5 new cars to inventory
    await token.addNewCar(120);
    await token.addNewCar(220);
    await token.addNewCar(320);
    await token.addNewCar(420);
    await token.addNewCar(520);
    expect(await token.totalSupply()).to.equal(5);
    expect(await token.balanceOf(owner.address)).to.equal(5);

    // sell 2th and 4th cars to other
    await token.sellCar(addr1.address, 1);
    await token.sellCar(addr1.address, 3);
    expect(await token.totalSupply()).to.equal(5);
    expect(await token.balanceOf(owner.address)).to.equal(3);
    expect(await token.tokenOfOwnerByIndex(owner.address, 0)).to.equal(0);
    expect(await token.tokenOfOwnerByIndex(owner.address, 1)).to.equal(4);
    expect(await token.tokenOfOwnerByIndex(owner.address, 2)).to.equal(2);
    expect(await token.balanceOf(addr1.address)).to.equal(2);
    expect(await token.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(1);
    expect(await token.tokenOfOwnerByIndex(addr1.address, 1)).to.equal(3);
    
    expect(await token.carPriceByIndex(0)).to.equal(120);
    expect(await token.carPriceByIndex(3)).to.equal(420);
  });
});

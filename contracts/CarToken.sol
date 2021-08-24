pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * @title CarShop contract
 * @author iris112
 * @dev Extend ERC721Enumerable to implment CarToken
 */
contract CarToken is Ownable, ERC721Enumerable {

    // Mapping from car ID to price
    mapping (uint256 => uint256) private _carPrice;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /**
     * @dev Returns price of the car at index.
     */
    function carPriceByIndex(uint256 carId) external view returns (uint256) {
      return _carPrice[carId];
    }

    /**
    * @dev mint a new car and emit Transfer event
    */
    function addNewCar(uint256 price) onlyOwner external {
      uint carId = totalSupply();
      _carPrice[carId] = price;
      _safeMint(_msgSender(), carId);
    }

    /**
    * @dev transfer the car and emit Transfer event
    */
    function sellCar(address to, uint256 carId) external {
        safeTransferFrom(_msgSender(), to, carId);
    }

    /**
    * @dev transfer the car between from and to and emit Transfer event
    */
    function sellCarFrom(address from, address to, uint256 carId) external {
        safeTransferFrom(from, to, carId);
    }
}
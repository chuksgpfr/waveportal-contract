// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;

  uint256 private seed;

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }

  Wave[] public waves;

  mapping(address => uint256) public lastViewed;

  event NewWave(address indexed from, uint256 timestamp, string message);

    constructor() payable {
        console.log("Yo yo, Khagan is breaking into web3");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
      require(lastViewed[msg.sender] + 30 seconds < block.timestamp, "Please wait for 30 seconds");
      // waves[msg.sender] += 1; 
      totalWaves += 1;

      uint256 prizeMoney = 0.0001 ether;

      seed = (block.timestamp + block.difficulty) % 100;

      console.log("Random # generated: %d", seed);

      waves.push(Wave(msg.sender, _message, block.timestamp));

      lastViewed[msg.sender] = block.timestamp;
      
      emit NewWave(msg.sender, block.timestamp, _message);
      
      if(seed <= 50) {
        require(prizeMoney <= address(this).balance, "There's no much money left in this contract, we are out of funds");

        (bool success, ) = (msg.sender).call{ value: prizeMoney }("");

        require(success, "Failed to transfer money");
      }
      console.log("Sender %d ", address(msg.sender).balance);
      // console.log("%a sent a message: %b , with seed of %c ", msg.sender, _message, seed);

    }

    function getWaves() public view returns (Wave[] memory) {
      return waves;
    }

    function getTotalWaves() public view returns (uint256) {
      return totalWaves;
    }
}
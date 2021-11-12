// SPDX-FileCopyrightText: 2021 Hrithik <github.com/hrithiklodha>
// SPDX-License-Identifier: GPL-3.0

/* See README.md for instructions*/

pragma solidity 0.8.10;

import "./ISTETH.sol";

contract LidoStaker{
    
    mapping(address => uint256) public balancesEth;
    
    // The lido protocol contract
    ISTETH public lido;
    
    constructor(address _lido) {
        lido = ISTETH(_lido);
    }
	
	function deposit() public payable returns(bool){
	    require(msg.value != 0, "Deposit amount should be greater than 0");
	    require(!lido.isStopped(), "Contract stopped currently");
	    balancesEth[msg.sender] += msg.value;
		(bool success, ) = address(lido).call{value:msg.value}("");
	    require(success, "Error occured");
	    return success;
	}
	
	function withdraw(uint256 amount) public returns(bool) {
	    require(amount != 0, "Withdraw amount should be greater than 0");
		require(amount <= balancesEth[msg.sender], "Balance insufficient");
	    require(!lido.isStopped(), "Contract stopped currently");
	    balancesEth[msg.sender] -= amount;
	    bool success = lido.transfer(msg.sender, amount);
		require(success, "Error occured");
	    return success;
	}
	
}
// SPDX-FileCopyrightText: 2021 Hrithik <github.com/hrithiklodha>

// SPDX-License-Identifier: GPL-3.0

/* See README.md */
pragma solidity 0.8.10;

import "../0.4.24/interfaces/ILido.sol";
import "../0.6.12/interfaces/IStETH.sol";

contract LidoStaker{
    address public user;
    myToken public stEth;
    ILido public lidoMain;
    
    mapping (address=>uint) public stakerBalances;
    event Deposited(address user, uint256 amount);
    event Withdrawn (address user, uint amount);
    
    constructor(address Lido, address _token, address _user){
        lidoMain = ILido(Lido);
        stEth = myToken(_token);
        user = _user;
    }

    function callStake() public payable {
        require(msg.value > 0, "Should stake more than 0 eth");
        uint256 amount = lidoMain.submit{value: msg.value}(user);
        stakerBalances[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
        
    }
    
    function withdrawStake(uint _amount) public {
        require(stakerBalances[msg.sender] >0, "User address not found");
        require(stakerBalances[msg.sender] >= _amount, "Balance is less than withdrawal amount");
        
        stakerBalances[msg.sender] -= _amount;
        stEth.transfer(msg.sender, _amount);
        emit withdrawn(msg.sender, _amount);
    }
    
    function getAvailableAmount () public view returns (uint256){
        return stakerBalances[msg.sender];
    }

    receive() external payable{
        callStake();
    }
   
}
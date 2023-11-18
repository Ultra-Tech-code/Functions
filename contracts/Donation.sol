
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;



contract Donation {

    mapping(address => uint256) receivedAmount;

    function donate(uint256 amount, address receiver) external payable{
        require(amount > 0 && amount == msg.value, "Invalid amount");
        require(receiver != address(0), "Invalid address");

        (bool success,  ) = payable(receiver).call{value: amount}("");
        require(success, "Failed to send Ether");

        receivedAmount[receiver] += amount;
    }

    function convertToWei(uint256 amount) public pure returns(uint256){
        return amount * 1 ether;
    }
 
    function viewAmount(address receiver ) public view returns(uint256){
        require(receivedAmount[receiver] > 0, "No Donation");
        return receivedAmount[receiver];
    }
}
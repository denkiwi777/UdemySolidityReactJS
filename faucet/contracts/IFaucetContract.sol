// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.4.22 <0.9.0;

interface IFaucetContract {
    function addFunds() external payable;
    function withdraw(uint weiAmount) external ;


}
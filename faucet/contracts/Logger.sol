// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.4.22 <0.9.0;
abstract contract Logger {
    function emitLog() public virtual pure returns(bytes32);
}
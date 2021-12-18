// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

    contract Storage {

        mapping (uint =>uint) public aa;
        mapping(address=> uint) public bb;

        constructor(){
            aa[0] = 1;
            aa[1] = 2;
            bb[0xe3A01fc7eF159dC7Bb9387cc2d994F2F99Fd95Df] = 1;
            bb[0xf4a62D0a34504Ef2a6E2a59Cd35F4B46CF6F388E] = 2;



        }


    }
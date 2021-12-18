// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.4.22 <0.9.0;
import "./Owned.sol";
import "./Logger.sol";
import "./IFaucetContract.sol";

contract FaucetContract is Owned, Logger , IFaucetContract{
    uint public numFunders;

    mapping(address => bool ) private funders;
    mapping(uint => address ) private lutFunders;

   

    modifier limitEthWithdraw(uint weiAmount) {
        require(weiAmount<=200000000000000000, 
        "cannot withdraw more than  0.1 eth");
        _;
    }
    function testAdminPermits() external onlyOwner {

    }
    function test2() external onlyOwner{

    }

    //funzione payable -> transazione + external ; può essere chiamata in modo publico
    //interfacia di una funzione che può essere implementata da un'altro contratto 
    //gas cost ++
    receive() external payable {}  
    //transazioni -> gas FEE + alter state change
    function addFunds() override external payable {
        address funder = msg.sender;
        if(!funders[funder]) {  
             uint index = numFunders++;
             funders[funder] = true; 
             lutFunders[index] = funder;

        }
    
    }
        function emitLog() public override pure returns(bytes32){
            return "log test";
        }

    function withdraw (uint quantity) override external limitEthWithdraw(quantity) {
        payable(msg.sender).transfer(quantity);
    }
    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numFunders);
        for (uint i= 0; i<numFunders; i++) {
            _funders[i] = lutFunders[i];

        }
        return _funders;
    }
   
    //const instance = await FaucetContract.deployed()
    //instance.addFunds({from:accounts[0], value: "555"})
    //instance.addFunds({from:accounts[1], value: "100000000000000000"})
    //instance.addFunds({from:accounts[2], value: "3400000000"})
    //instance.getFunderAtIndex(0)
    //instance.getAllFunders()
    //instance.withdraw(10000000000)
    //instance.withdraw("10000000000000000000", {from: accounts[0]})
    //instance.testAdminPermits({from:accounts[0]})
    //instance.testAdminPermits({from:accounts[1]})




    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index]; 

    }
        //pure / view ->read only/ zero gas
        // view -> la funzione non puà alterare lo stato dello storage in qualsiasi modo
        //ancora più rigido, non leggerà nemmeno lo stato dello storage 
        //non puà accedere ai dati del contract in generale

    function testFunct() external 
    pure returns (uint) {
        return 2+2;  
    }    
    function transferOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
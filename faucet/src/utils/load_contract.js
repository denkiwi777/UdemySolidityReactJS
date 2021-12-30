import contract from "@truffle/contract";
export const loadContract = async (name, provider) => {
    const res =    await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();
    const _contract =  contract(artifact);
    _contract.setProvider(provider);
    let deployedContract = null;
    try {
         deployedContract = await _contract.deployed();

    } catch (error) {
        console.error("Connected to the wrong network");
    }
    return deployedContract;


}

//truffle(development)> instance.addFunds({from:accounts[0], value: "2000000000000000000"})
//truffle(development)> const instance = await FaucetContract.deployed()
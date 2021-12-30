import "./App.css";
import { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load_contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    isProviderLoaded: false,
  });

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [shouldReload, reloadAfter] = useState(false);
  const contractOk = account && web3Api.contract;
  const reloadEffect = useCallback(
    () => reloadAfter(!shouldReload),
    [shouldReload]
  );

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (_) => window.location.reload());
    provider.on("chainChanged", (_) => window.location.reload());

    // provider._jsonRpcConnection.events.on("notification", payload => {
    //   const { method} = payload;
    //   if(method === "metamask_unlockStateChanged") {
    //     setAccount(null);
    //   }

    // })
  };
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const { contract } = await loadContract("FaucetContract", provider);
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api(api =>  ({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        }));
      } else {
        setWeb3Api(api =>  ({ ...web3Api, isProviderLoaded: true }));
        console.log("error");
      }
    };
    loadProvider();
  }, []);
  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract._address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.methods.addFunds().send({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    reloadEffect();
  }, [web3Api, account, reloadEffect]);

  const withdraw = async () => {
    const { contract, web3 } = web3Api;
    await contract.methods
      .withdraw(web3.utils.toWei("0.1", "ether"))
      .send({ from: account });
    reloadEffect();
  };
  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          {web3Api.isProviderLoaded ? (
            <div className="is-flex is-flex-direction-row">
              <span>
                <strong className="mr-2"> Account: </strong>
              </span>
              {account ? (
                <div>{account}</div>
              ) : !web3Api.provider ? (
                <>
                  <div className="notification is-warning is-size-7 is-rounded">
                    Wallet is not detected!
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://docs.metamask.io"
                    >
                      <strong> Install Metamask</strong>
                    </a>
                  </div>
                </>
              ) : (
                <button
                  className="button is-small"
                  onClick={() =>
                    web3Api.provider.request({ method: "eth_requestAccounts" })
                  }
                >
                  Connect Wallet
                </button>
              )}
            </div>
          ) : (
            <div>Checking for metamask...</div>
          )}
          <div className="balance-view is-size-2">
            Current Balance <strong>{balance}</strong> ETH
          </div>
         <div>
           {!contractOk && <i className="is-block">Connect To ganache</i>}
           </div>
          <button
            onClick={addFunds}
            className="button is-primary mr-2"
            disabled={!contractOk}
          >
            Donate 1 ETH{" "}
          </button>
          <button
            onClick={withdraw}
            className="button is-link"
            disabled={!contractOk}
          >
            Withdraw 0.1 ETH
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

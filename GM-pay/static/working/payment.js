// import detectEthereumProvider from '@metamask/detect-provider';
console.log("payment js loaded");

const finalcost = cost;
let maticPrice = 0;
let maticPriceFinal = 0;
async function convertTo(coin, finalcost) {
  // console.log("in function");
  let response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=INR`
  );
  let ogData = await response.json();
  let data = ogData[`${coin}`]['inr'];
  console.log(data);

  let finalPrice = finalcost / data;
  finalPrice = finalPrice.toFixed(2);
  const update_price = document.querySelector(`.${coin}-price`);

  if (coin == "tether") {
    update_price.textContent = "$ " + finalPrice;
  } else {
    maticPrice = finalPrice;
    maticPriceFinal = finalPrice;
    console.log("matic price");
    console.log(maticPrice);
    update_price.textContent = finalPrice;
  }
  console.log("before retuen");
  console.log(finalPrice);
  return finalPrice;
}
convertTo("matic-network", finalcost);
const usdtPrice = convertTo("tether", finalcost);

const connectBtn = document.querySelector("#connect-metamask");

connectBtn.addEventListener("click", () => {
  checkout();
});

function checkout() {
  console.log("connect clicked");
  try {
    if (typeof window.ethereum.isMetaMask !== "undefined") {
      console.log("metamask installed");
      checkNetwork();
    }
  } catch (err) {
    console.log("please install metamask");
  }
}
async function checkNetwork() {
  console.log("checking network");

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  console.log(chainId);
  console.log(typeof chainId);
  if (chainId != "0x89") {
    console.log("change Network to polygon");
    changeToMatic(chainId);
  } else {
    console.log("already on matic");
    mainConnect(chainId);
  }
  window.ethereum.on("chainChanged", handleChainChanged);
  function handleChainChanged(chainId) {
    console.log("chain changed ", chainId);

    changeToMatic(chainId);
  }
}
function changeToMatic(chainId) {
  if (chainId != "0x89") {
    connectBtn.disabled = true;
    connectBtn.textContent = "Switch to POLYGON !!";
  } else {
    connectBtn.disabled = false;
    connectBtn.textContent = "Continue";
  }
}

function mainConnect(chainId) {
  getAccount();

  async function getAccount() {
    connectBtn.disabled = true;
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          connectBtn.textContent = "Request Rejected - Connect Again !";
          console.log("Please connect to MetaMask.");
          connectBtn.disabled = false;
        } else {
          connectBtn.textContent = "Request failed - Try Again !";
          console.error(err);
          connectBtn.disabled = false;
        }
      });
    let account = "";
    try {
      account = accounts[0];
      console.log("acc[0] hai : " + account);
      // array of all accounts
      let allAcount = "";
      for (let i = 0; i < accounts.length; i++) {
        allAcount += accounts[i] + " , ";
        console.log(allAcount);
      }
      console.log("ehde krke ta ni hre");
      connectBtn.disabled = false;
    } catch (err) {
      connectBtn.textContent = "Request failed - Try Again !";
      console.log(err);
    }
    connectBtn.textContent = "Proceed to payment";
    connectBtn.addEventListener("click", () => {
      confirmCurrAcc(account);
      connectBtn.disabled = true;
      console.log("esto baad kite na ja");
    });
  }
}

function confirmCurrAcc() {
  console.log("confirm account che aagay");
  connectBtn.disabled = true;
  connectBtn.textContent = "Waiting For TXN Confirm";
  //* check current account when connection is already present
  let currentAccount = null;
  // promise
  window.ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts returns an empty array.
      connectBtn.textContent = "Request failed - Try Again !";
      console.error(err);
    });

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.

  window.ethereum.on("accountsChanged", handleAccountsChanged);

  function handleAccountsChanged(accounts) {
    console.log(accounts);
    currentAccount = accounts[0];

    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      console.log("ah check kro");
      currentAccount = accounts[0];
    }

    convertMaticprice(maticPriceFinal);

    sendtxn(currentAccount);
  }
}

function sendtxn(currAcc) {
  // send txns

  // Send Ethereum to an address
  // console.log("before send");
  // console.log(currAcc);
  let maticNo = maticPrice;

  ethereum
    .request({
      method: "eth_sendTransaction",
      // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
      params: [
        {
          from: currAcc, // The user's active address.
          to: "0x078Dbd14989DCF9A969456B8c5f02170b12A0eE2", // Required except during contract publications.
          value: `${convertMaticprice(maticPriceFinal)}`, // Only required to send ether to the recipient from the initiating external account.
          gasLimit: "0x5028", // Customizable by the user during MetaMask confirmation.
          maxPriorityFeePerGas: "0x3b9aca00", // Customizable by the user during MetaMask confirmation.
          maxFeePerGas: "0x2540be400", // Customizable by the user during MetaMask confirmation.
        },
      ],
    })
    .then((txHash) => {
      console.log(txHash);
      document.querySelector("#after-txn-succ").innerHTML =
        "Transaction success !!! <br> Congratulations !!!";
      lastFunc(txHash);
    })
    .catch((error) => {
      console.error(error);
      connectBtn.disabled = false;
      connectBtn.textContent = "TXN failed - try again";
      lastFunc2(txHash);
    });
}
function lastFunc(txHash) {
  console.log("chandanbir bhaji krdo");
  document.querySelector('input[name="hash"]').hashField.value = txHash;
  document.querySelector('input[name="status"]').statusField.value =
    "fullfilled";
  document.querySelector('input[name="amount"]').amountField.value =
    maticPriceFinal;
  document.getElementById("myForm").submit();
}
function lastFunc2(txHash) {
  console.log("last fun err handle");
}

function convertMaticprice(maticPriceFinal) {
  // console.log(typeof maticPriceFinal);
  // converting to wei value
  // then to string as hex value
  return (maticPriceFinal * 10 ** 18).toString(16);
}

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function useBalance(address) {
  const [balance, setBalance] = useState("0.00");

  const apiKey = "SnGAV1KNt2faUFkP0C1d-TjoBcQB1HiU";
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
  );

  async function getBalance(addr) {
    if (addr) {
      await web3.eth
        .getBalance(addr.toString())
        .then((res) => {
          const ethBalance = res / 10 ** 18;
          setBalance(ethBalance);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
  getBalance(address);

  return balance;
}

export default useBalance;

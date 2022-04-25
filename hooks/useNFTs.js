import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function useNFTs(address) {
  const [initialResult, setInitialResult] = useState([]);
  const [pageKey, setPageKey] = useState();

  const apiKey = "SnGAV1KNt2faUFkP0C1d-TjoBcQB1HiU";
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
  );

  useEffect(() => {
    async function getNFTs(addr) {
      await web3.alchemy
        .getNfts({
          owner: addr,
        })
        .then((res) => {
          const resultArray = res.ownedNfts.filter((nft) => !nft.error);
          setInitialResult(resultArray);
          if (res.pageKey) {
            setPageKey(res.pageKey);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getNFTs(address);
  }, [address]);

  useEffect(() => {
    async function getAdditionalNFTs(addr, pgKey) {
      await web3.alchemy
        .getNfts({
          owner: addr,
          pageKey: pgKey,
        })
        .then((res) => {
          if (res.ownedNfts.length !== 0) {
            const resultArray = res.ownedNfts.filter((nft) => !nft.error);
            setInitialResult([...initialResult, ...resultArray]);
          }
          if (res.pageKey) {
            setPageKey(res.pageKey);
          } else {
            setPageKey();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (pageKey) {
      getAdditionalNFTs(address, pageKey);
    }
  }, [initialResult]);

  return initialResult;
}

export default useNFTs;

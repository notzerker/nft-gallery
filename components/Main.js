import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useMoralisWeb3Api } from "react-moralis";
import { motion } from "framer-motion";

const Main = () => {
  const Web3Api = useMoralisWeb3Api();
  const [address, setAddress] = useState("");

  async function test() {
    console.log("test");
  }

  async function getNFTs({ address }) {
    const userEthNFTs = await Web3Api.account.getNFTs({
      address: address,
    });
    console.log(userEthNFTs);
  }

  return (
    <div>
      <div className="relative z-50 h-screen w-full overflow-hidden">
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-lg uppercase tracking-widest text-gray">
            Welcome To
          </p>
          <h1 className="p-4 text-center text-9xl font-extrabold tracking-tighter">
            The Gallery.
          </h1>
          <h2 className="mt-2 text-xl text-light">
            View your favorite nft collectibles.
          </h2>
          <motion.div
            className="relative flex w-80 flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            <input
              className="border-1 mt-6 w-full rounded-xl border-white bg-dark py-4 pr-16 pl-6 placeholder-light shadow-xl hover:placeholder-white focus:outline-none"
              placeholder="Address or ENS"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div
              className="absolute right-4 top-4 cursor-pointer py-4 text-4xl text-light hover:text-white"
              onClick={async () => {
                await getNFTs({ address });
              }}
            >
              <IoIosArrowRoundForward />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="fixed top-0 blur-3xl">
        <img src="./assets/soju.jpeg" className="opacity-20" />
      </div>
    </div>
  );
};

export default Main;

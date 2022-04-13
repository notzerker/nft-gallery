import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import Gallery from "./Gallery";
import Item from "./Item";
import { useRouter } from "next/router";

const Main = () => {
  const [address, setAddress] = useState("");

  const router = useRouter();

  const formHandler = () => {
    router.push("/" + address);
  };

  return (
    <>
      <div className="relative z-50 h-screen w-full overflow-hidden overscroll-y-none">
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-lg uppercase tracking-widest text-white">
            Welcome To
          </p>
          <h1 className="p-4 text-center text-9xl font-extrabold tracking-tighter">
            The Gallery.
          </h1>
          <h2 className="text-kg mt-2 text-light">
            View your favorite NFT collectibles.
          </h2>
          <motion.div
            className="relative flex w-80 flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            <form onSubmit={() => formHandler()} className="w-full">
              <input
                className="border-1 mt-6 w-full rounded-xl border-white bg-dark py-4 pr-16 pl-6 placeholder-light shadow-xl hover:placeholder-white focus:outline-none"
                placeholder="Address or ENS"
                onChange={(e) => setAddress(e.target.value)}
                spellCheck={false}
              />
            </form>
            <div
              className="absolute right-4 top-4 cursor-pointer py-4 text-4xl text-light hover:text-white"
              onClick={() => formHandler()}
            >
              <IoIosArrowRoundForward />
            </div>
          </motion.div>
        </div>
      </div>
      {/* <div className="fixed top-0 select-none">
        <img src="./assets/test2.jpg" className="opacity-80" />
      </div> */}
    </>
  );
};

export default Main;

import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useStore from "../lib/store";
import { FiMoon, FiSun } from "react-icons/fi";

import Gallery from "./Gallery";
import Item from "./Item";

const Main = () => {
  const [address, setAddress] = useState("");
  const dark = useStore((state) => state.dark);
  const setDark = useStore((state) => state.setDark);

  const router = useRouter();

  const formHandler = (e) => {
    e.preventDefault();
    router.push("/" + address);
  };

  return (
    <div
      className={`${
        dark ? "dark bg-[#232323]" : "bg-[#f1f1f1f1]"
      } relative h-screen w-full overflow-hidden overscroll-y-none`}
    >
      <motion.a
        className="absolute top-16 right-16 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1 }}
        onClick={setDark}
      >
        {dark ? <FiSun /> : <FiMoon />}
      </motion.a>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-lg uppercase tracking-widest text-black dark:text-white">
          Welcome To
        </p>
        <h1 className="p-4 text-center text-9xl font-extrabold tracking-tighter text-black dark:text-white">
          The Gallery.
        </h1>
        <h2 className="text-kg mt-2 text-gray dark:text-light">
          View your favorite NFT collectibles.
        </h2>
        <motion.div
          className="relative flex w-80 flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <form onSubmit={(e) => formHandler(e)} className="w-full">
            <input
              className="border-1 mt-6 w-full rounded-xl border-black bg-white py-4 pr-16 pl-6 text-black placeholder-gray drop-shadow-md hover:placeholder-black focus:outline-none dark:border-white dark:bg-dark dark:text-white dark:placeholder-light dark:hover:placeholder-white"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              spellCheck={false}
            />
          </form>
          <div
            className="absolute right-4 top-4 cursor-pointer py-4 text-4xl text-gray hover:text-black dark:text-light dark:hover:text-white"
            onClick={(e) => formHandler(e)}
          >
            <IoIosArrowRoundForward />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Main;

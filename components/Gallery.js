import React from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Gallery = () => {
  return (
    <div className="z-50 flex min-h-screen w-full flex-col items-center justify-center space-y-24 py-24">
      <div className="flex flex-row items-center justify-center space-x-28">
        <div className="relative flex flex-col items-center justify-center space-y-4 rounded-xl bg-dark p-16 shadow-xl">
          {/* <img
            src="./assets/soju.jpeg"
            className="absolute -top-14 w-28 rounded-lg shadow-xl"
          ></img> */}
          <div className="absolute top-4 left-4 p-2">
            <CgProfile className="text-xl text-gray hover:text-white" />
          </div>
          <div className="absolute top-0 right-4 rounded-xl p-2">
            <BsThreeDots className="cursor-pointer text-gray hover:text-white" />
          </div>
          <h1 className="text-6xl font-extrabold">zerker.eth</h1>
          <div className="flex cursor-pointer flex-row items-center justify-center space-x-2 text-gray hover:text-white">
            <FaEthereum />
            <p className="w-24 truncate">
              0xFf992E92099035ce63f459a5967e4a8c0D95dd71
            </p>
          </div>
        </div>
        <div className="before:broder-white relative flex h-full flex-row space-x-12 p-8 before:absolute before:bottom-0 before:right-0 before:h-4 before:w-4 before:border-b-[1px] before:border-r-[1px] after:absolute after:top-0 after:right-0 after:h-4 after:w-4 after:border-t-[1px] after:border-r-[1px]">
          <div className="flex flex-col space-y-2">
            <p className="text-sm uppercase tracking-widest text-gray">Items</p>
            <h1 className="text-8xl font-extrabold">120</h1>
            <p className="text-light">Number of individual ERC721 tokens.</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm uppercase tracking-widest text-gray">
              Collections
            </p>
            <h1 className="text-8xl font-extrabold">23</h1>
            <p className="text-light">Number of collections.</p>
          </div>
        </div>
      </div>
      <div className="z-50 grid w-fit grid-cols-4 gap-8">
        <motion.div
          className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src="./assets/soju.jpeg" className="rounded-xl" />
          <div>
            <p className="text-xl font-extrabold">Azuki</p>
            <p className="text-sm text-light">#7893</p>
          </div>
        </motion.div>
        <motion.div
          className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src="./assets/soju.jpeg" className="rounded-xl" />
          <div>
            <p className="text-xl font-extrabold">Azuki</p>
            <p className="text-sm text-light">Azuki #7893</p>
          </div>
        </motion.div>
        <motion.div
          className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src="./assets/soju.jpeg" className="rounded-xl" />
          <div>
            <p className="text-xl font-extrabold">Azuki</p>
            <p className="text-sm text-light">Azuki #7893</p>
          </div>
        </motion.div>
        <motion.div
          className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src="./assets/soju.jpeg" className="rounded-xl" />
          <div>
            <p className="text-xl font-extrabold">Azuki</p>
            <p className="text-sm text-light">Azuki #7893</p>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-24"></div>
    </div>
  );
};

export default Gallery;

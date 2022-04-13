import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const Item = ({ name, tokenId, img }) => {
  return (
    <div>
      <motion.div
        className="flex h-fit w-full cursor-pointer select-none flex-col space-y-4 overflow-hidden rounded-md border border-white p-8 shadow-xl hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      >
        <img
          // onLoad={({ currentTarget }) => {
          //   currentTarget.src = null;
          // }}
          src={img}
          onError={({ currentTarget }) => {
            currentTarget.oneError = null;
            currentTarget.src = "./assets/soju.jpeg";
          }}
          className="h-full rounded-lg object-cover"
        />
        <div>
          <p className="w-full truncate text-lg font-extrabold text-white">
            {name}
          </p>
          <p className="w-full truncate text-sm text-white">{tokenId}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Item;

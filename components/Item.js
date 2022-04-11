import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const Item = ({ name, tokenId, img }) => {
  return (
    <div>
      <motion.div
        className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 overflow-hidden rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      >
        <img src={img} className="h-56 w-56 rounded-lg object-cover" />
        <div>
          <p className="w-full truncate text-lg font-extrabold">{name}</p>
          <p className="w-full truncate text-sm text-light">{tokenId}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Item;

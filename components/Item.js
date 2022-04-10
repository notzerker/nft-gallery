import { motion } from "framer-motion";
import React from "react";

const Item = ({ name, tokenId }) => {
  return (
    <div>
      <motion.div
        className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      >
        <img src="./assets/soju.jpeg" className="rounded-xl" />
        <div>
          <p className="text-xl font-extrabold">{name}</p>
          <p className="text-sm text-light">{tokenId}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Item;

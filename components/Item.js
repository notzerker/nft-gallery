import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const Item = ({ name, tokenId, img, desc, attr }) => {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>
        <motion.div
          className="flex h-fit w-72 cursor-pointer select-none flex-col space-y-4 overflow-hidden rounded-xl bg-dark p-8 shadow-xl hover:scale-105"
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
            className="h-56 w-56 rounded-lg object-cover"
          />
          <div>
            <p className="w-full truncate text-left text-lg font-extrabold text-white">
              {name}
            </p>
            <p className="w-full truncate text-sm text-white">{tokenId}</p>
          </div>
        </motion.div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal className="flex h-screen w-full items-center justify-center">
        <DialogPrimitive.Overlay className="fixed inset-0 bg-dark/80" />
        <DialogPrimitive.Content className=" fixed left-1/2 top-1/2 flex h-[30rem] w-fit -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-xl border border-light/50 bg-dark shadow-xl">
          <img src={img} className="w-54 h-54 m-8 rounded-lg object-cover" />
          <div className="flex h-fit flex-col items-start justify-center overflow-y-scroll p-8 px-8">
            <h1 className="mb-6 inline text-left text-4xl font-extrabold text-white">
              {name}
            </h1>
            {desc ? (
              <>
                <p className="mb-2 text-sm uppercase  tracking-widest text-gray">
                  Description
                </p>
                <p className="w-[28rem] text-light">{desc}</p>
              </>
            ) : (
              ""
            )}
            <p className="mt-6 mb-2 text-sm uppercase  tracking-widest text-gray">
              Attributes
            </p>
            {attr ? (
              <div className="grid w-full grid-cols-2 gap-4">
                {attr.map((x) => {
                  return (
                    <div className="flex h-16 w-full flex-col items-start justify-center rounded-xl border-[1px] border-light/50 px-4">
                      <p className="text-xs uppercase tracking-wider text-light">
                        {x.trait_type}
                      </p>
                      <p className="text-sm">{x.value}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Item;

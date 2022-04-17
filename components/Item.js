import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoOpenOutline } from "react-icons/io5";
import { hexToNumberString } from "web3-utils";

const Item = ({ name, tokenId, img, desc, attr, contract, tokenStd }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [dialogImageLoading, setDialogImageLoading] = useState(true);

  const truncateAddress = (addr) => {
    const addressLength = addr.length;
    const truncateAddr =
      addr.substring(0, 4) +
      "..." +
      addr.substring(addressLength - 4, addressLength);
    return truncateAddr;
  };

  const contractHanlder = () => {};

  const variants = {
    visible: { scale: 1, x: "-50%", y: "-50%" },
    hidden: { scale: 0.7, x: "-50%", y: "-50%" },
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>
        <motion.div
          className="flex h-fit w-72 cursor-pointer select-none flex-col overflow-hidden rounded-xl border border-light/20 bg-dark shadow-xl"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1 }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoading ? 0 : 1 }}
            transition={{ opacity: { duration: 0.4 } }}
            onLoad={() => setImageLoading(false)}
            src={img}
            onError={({ currentTarget }) => {
              currentTarget.oneError = null;
              currentTarget.src = "./assets/soju.jpeg";
            }}
            className="rounded-y-xl aspect-square w-full"
          />
          <div className="w-full p-4">
            <p className="w-full truncate text-left text-sm font-semibold text-white">
              {name}
            </p>
          </div>
        </motion.div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal className="flex h-screen w-full items-center justify-center">
        <DialogPrimitive.Overlay className="fixed inset-0 bg-dark/80" />
        <DialogPrimitive.Content>
          <motion.div
            className="fixed left-1/2 top-1/2 grid w-11/12 max-w-[72rem] grid-cols-12 gap-x-10 rounded-xl border border-light/20 bg-dark shadow-xl"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <div className="col-span-6 aspect-square">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: dialogImageLoading ? 0 : 1 }}
                transition={{ opacity: { duration: 0 } }}
                onLoad={() => setDialogImageLoading(false)}
                src={img}
                className="m-8 aspect-square w-full rounded-xl"
                onError={({ currentTarget }) => {
                  currentTarget.oneError = null;
                  currentTarget.src = "./assets/soju.jpeg";
                }}
              />
            </div>
            <div className="col-span-6 h-full max-h-[37rem] overflow-scroll py-12 px-8">
              <div className="flex h-fit flex-col items-start justify-center overflow-y-scroll">
                <h1 className="mb-6 inline w-full text-left text-4xl font-extrabold tracking-tighter text-white ">
                  {name}
                </h1>
                <div className=" mb-6 flex w-full">
                  <motion.a
                    href={
                      "https://opensea.io/assets/" +
                      contract +
                      "/" +
                      hexToNumberString(tokenId)
                    }
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    className="px-2"
                  >
                    <Image
                      src="/assets/opensea.svg"
                      height={30}
                      width={30}
                      className="cursor-pointer shadow-xl"
                    />
                  </motion.a>
                  <motion.a
                    href={
                      "https://looksrare.org/collections/" +
                      contract +
                      "/" +
                      hexToNumberString(tokenId)
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    target="_blank"
                    className="px-2"
                  >
                    <Image
                      src="/assets/looksrare1.svg"
                      height={30}
                      width={30}
                      className="cursor-pointer shadow-xl"
                    />
                  </motion.a>
                  {/* <motion.a
                    href={
                      "https://www.gem.xyz/asset/" +
                      contract +
                      "/" +
                      hexToNumberString(tokenId)
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    target="_blank"
                    className=" flex items-center justify-center px-2"
                  >
                    <Image
                      src="/assets/gem.png"
                      height={30}
                      width={30}
                      className="cursor-pointer shadow-xl"
                    />
                  </motion.a> */}
                </div>
                <div className="grid w-full grid-cols-3 gap-x-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray">
                      Creator
                    </p>
                    <a
                      className="mb-10 flex w-full cursor-pointer items-center text-light hover:text-white"
                      href={"https://etherscan.io/address/" + contract}
                      target="_blank"
                    >
                      <p className="mr-2">{truncateAddress(contract)}</p>
                      <IoOpenOutline className="mb-1" />
                    </a>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray">
                      Token ID
                    </p>
                    <p className="mb-10 flex w-32 items-center overflow-hidden text-light ">
                      {hexToNumberString(tokenId)}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray">
                      Token Standard
                    </p>
                    <p className="mb-10 flex w-full items-center text-light ">
                      {tokenStd}
                    </p>
                  </div>
                </div>
                {desc ? (
                  <>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray">
                      Description
                    </p>
                    <p className="mb-10 w-full text-sm text-light">{desc}</p>
                  </>
                ) : (
                  ""
                )}
                {typeof attr !== "undefined" ? (
                  <>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray">
                      Attributes
                    </p>
                    <div className="grid w-full grid-cols-2 gap-3">
                      {attr.map((x) => {
                        return (
                          <div className="flex h-16 w-full flex-col items-start justify-center rounded-xl border-[1px] border-light/50 px-4">
                            <p className="text-xs uppercase tracking-wider text-light">
                              {x.trait_type}
                            </p>
                            <p className="w-full truncate text-sm font-semibold">
                              {x.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Item;

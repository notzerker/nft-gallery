import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoOpenOutline, IoStatsChartOutline } from "react-icons/io5";
import { hexToNumberString } from "web3-utils";
import { MdOutlineDescription } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";

const Item = ({ name, tokenId, img, desc, attr, contract, tokenStd, dark }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [dialogImageLoading, setDialogImageLoading] = useState(true);
  const [info, setInfo] = useState("description");

  const truncateAddress = (addr) => {
    const addressLength = addr.length;
    const truncateAddr =
      addr.substring(0, 4) +
      "..." +
      addr.substring(addressLength - 4, addressLength);
    return truncateAddr;
  };

  const variants = {
    hidden: { scale: 1, opacity: 0, x: "-50%", y: "-30%", z: "0px" },
    visible: { scale: 1, opacity: 1, x: "-50%", y: "-50.1%", z: "0px" },
    transition: { duration: 2 },
  };

  const attrVariants = {
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const attrItems = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const infoHanlder = () => {
    if (info == "description") {
      return (
        desc && <p className="mb-10 w-full text-gray dark:text-light">{desc}</p>
      );
    } else if (info == "details") {
      return (
        <div className="mb-10 flex w-full flex-col space-y-8">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
              Creator
            </p>
            <a
              className="flex w-full cursor-pointer items-start justify-start text-gray hover:text-black dark:text-light dark:hover:text-white"
              href={"https://etherscan.io/address/" + contract}
              target="_blank"
            >
              <p className="mr-1">{truncateAddress(contract)}</p>
              <FiArrowUpRight />
            </a>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
              Token ID
            </p>
            <p className="darkLtext-light flex w-64 items-center overflow-hidden truncate text-gray dark:text-light">
              {hexToNumberString(tokenId)}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
              Token Standard
            </p>
            <p className=" flex w-full items-center text-gray dark:text-light">
              {tokenStd}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        attr && (
          <motion.div
            className="mb-12 grid w-full grid-cols-2 gap-2"
            initial="hidden"
            animate="visible"
            variants={attrVariants}
          >
            {attr.map((x) => {
              return (
                <motion.div
                  className="flex h-16 w-full flex-col items-start justify-center rounded-xl border-[1px] border-gray/50 bg-dark/5 px-4 dark:border-light/50 dark:bg-white/5"
                  variants={attrItems}
                >
                  <p className="text-xs uppercase tracking-wider text-gray dark:text-light">
                    {x.trait_type}
                  </p>
                  <p className="w-full truncate text-sm font-semibold text-black dark:text-white">
                    {x.value}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )
      );
    }
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>
        <motion.div
          className="flex h-fit w-full cursor-pointer select-none flex-col overflow-hidden rounded-xl border border-light/20 bg-white text-black drop-shadow-md dark:bg-dark dark:text-white"
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
            <p className="w-full truncate text-left text-sm font-semibold">
              {name}
            </p>
          </div>
        </motion.div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal className="flex h-screen w-full items-center justify-center">
        <DialogPrimitive.Overlay className="fixed inset-0 bg-dark/80" />
        <DialogPrimitive.Content className={`${dark && "dark"}`}>
          <motion.div
            className="fixed left-1/2 top-1/2 grid w-11/12 max-w-[72rem] grid-cols-1 overflow-y-scroll rounded-xl border border-light/20 bg-white subpixel-antialiased drop-shadow-md scrollbar-hide dark:bg-dark md:max-h-[577px] md:grid-cols-12	"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <div className="relative col-span-6 aspect-square h-full w-full">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: dialogImageLoading ? 0 : 1 }}
                transition={{ opacity: { duration: 0 } }}
                onLoad={() => setDialogImageLoading(false)}
                src={img}
                className="sticky top-0 aspect-square w-full rounded-xl"
                onError={({ currentTarget }) => {
                  currentTarget.oneError = null;
                  currentTarget.src = "./assets/soju.jpeg";
                }}
              />
            </div>
            <div className="col-span-6 max-h-36 px-8 pt-8 md:max-h-min md:pt-12">
              <div className="flex h-fit flex-col items-start justify-center">
                <div className="mb-6 flex h-fit w-full flex-row items-center justify-center">
                  <h1 className=" inline h-full w-full text-left text-3xl font-extrabold tracking-tighter text-black dark:text-white">
                    {name}
                  </h1>
                  <div className="flex h-full w-full items-center justify-end">
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
                        className="cursor-pointer"
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
                        src="/assets/looksrare.svg"
                        height={30}
                        width={30}
                        className="cursor-pointer"
                      />
                    </motion.a>
                    <motion.a
                      href={
                        "https://www.gem.xyz/asset/" +
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
                        src="/assets/gem.svg"
                        height={30}
                        width={30}
                        className="cursor-pointer"
                      />
                    </motion.a>
                  </div>
                </div>
                <div className="relative mb-6 flex w-full items-center justify-start space-x-6">
                  <div
                    className={`${
                      info == "description"
                        ? " bg-dark hover:bg-black/60 dark:bg-white/90 dark:text-black dark:hover:bg-white/60"
                        : " text-gray hover:bg-black/10 dark:text-gray dark:hover:bg-white/10"
                    } group cursor-pointer flex-row space-x-2 rounded-xl px-4   py-2 text-sm font-semibold  drop-shadow-md`}
                    onClick={() => setInfo("description")}
                  >
                    <p>Description</p>
                    {/* <CgDetailsMore className=" " /> */}
                  </div>
                  {desc && (
                    <div
                      className={`${
                        info == "details"
                          ? " bg-dark hover:bg-black/60 dark:bg-white/90 dark:text-black dark:hover:bg-white/60"
                          : " text-gray hover:bg-black/10 dark:text-gray dark:hover:bg-white/10"
                      } group cursor-pointer flex-row space-x-2 rounded-xl  px-4 py-2 text-sm font-semibold  drop-shadow-md`}
                      onClick={() => setInfo("details")}
                    >
                      <p>Details</p>
                      {/* <MdOutlineDescription className=" " /> */}
                    </div>
                  )}
                  {typeof attr !== "undefined" && (
                    <div
                      className={`${
                        info == "attributes"
                          ? " bg-dark hover:bg-black/60 dark:bg-white/90 dark:text-black dark:hover:bg-white/60"
                          : " text-gray hover:bg-black/10 dark:text-gray dark:hover:bg-white/10"
                      } group cursor-pointer flex-row space-x-2 rounded-xl px-4  py-2 text-sm font-semibold  drop-shadow-md`}
                      onClick={() => setInfo("attributes")}
                    >
                      <p>Attributes</p>
                      {/* <IoStatsChartOutline className=" " /> */}
                    </div>
                  )}
                </div>
                {infoHanlder()}
              </div>
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Item;

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoOpenOutline, IoStatsChartOutline } from "react-icons/io5";
import { hexToNumberString } from "web3-utils";
import { MdOutlineDescription } from "react-icons/md";
import { BiData } from "react-icons/bi";

const Item = ({ name, tokenId, img, desc, attr, contract, tokenStd, dark }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [dialogImageLoading, setDialogImageLoading] = useState(true);
  const [info, setInfo] = useState("metadata");

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

  const infoHanlder = () => {
    if (info == "metadata") {
      return (
        <div className="mb-10 flex w-full flex-col space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
              Creator
            </p>
            <a
              className="flex w-full cursor-pointer items-center text-gray hover:text-black dark:text-light dark:hover:text-white"
              href={"https://etherscan.io/address/" + contract}
              target="_blank"
            >
              <p className="mr-2">{truncateAddress(contract)}</p>
              <IoOpenOutline className="mb-1" />
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
    } else if (info == "description") {
      return desc ? (
        <>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
            Description
          </p>
          <p className="mb-10 w-full text-gray dark:text-light">{desc}</p>
        </>
      ) : (
        <>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
            Description
          </p>
          <p className="mb-10 text-gray dark:text-light">
            This token has no description.{" "}
          </p>
        </>
      );
    } else {
      return typeof attr !== "undefined" ? (
        <>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
            Attributes
          </p>
          <div className="mb-12 grid w-full grid-cols-2 gap-3">
            {attr.map((x) => {
              return (
                <div className="flex h-16 w-full flex-col items-start justify-center rounded-xl border-[1px] border-gray/50 px-4 dark:border-light/50">
                  <p className="text-xs uppercase tracking-wider text-gray dark:text-light">
                    {x.trait_type}
                  </p>
                  <p className="w-full truncate text-sm font-semibold text-black dark:text-white">
                    {x.value}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
            Attributes
          </p>
          <p className=" text-gray dark:text-light">
            This token has no attributes.{" "}
          </p>
        </>
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
            className="fixed left-1/2 top-1/2 grid w-11/12 max-w-[72rem] grid-cols-1 gap-x-10 overflow-y-scroll rounded-xl border border-light/20 bg-white drop-shadow-md dark:bg-dark md:max-h-[555px] md:grid-cols-12	"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <div className="pt-auto col-span-6 aspect-square h-full w-full">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: dialogImageLoading ? 0 : 1 }}
                transition={{ opacity: { duration: 0 } }}
                onLoad={() => setDialogImageLoading(false)}
                src={img}
                className="aspect-square w-full rounded-xl"
                onError={({ currentTarget }) => {
                  currentTarget.oneError = null;
                  currentTarget.src = "./assets/soju.jpeg";
                }}
              />
            </div>
            <div className="col-span-6 max-h-36 px-8 pt-8 md:max-h-min md:overflow-y-scroll md:pt-12">
              <div className="flex h-fit flex-col items-start justify-center overflow-y-scroll">
                <div className="mb-6 flex w-full flex-row items-center justify-center">
                  <h1 className=" inline w-full text-left text-3xl font-extrabold tracking-tighter text-black dark:text-white ">
                    {name}
                  </h1>
                  <div className="flex">
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
                        src="/assets/looksrare1.svg"
                        height={30}
                        width={30}
                        className="cursor-pointer"
                      />
                    </motion.a>
                  </div>
                </div>
                <div className="relative mb-6 grid w-full grid-cols-3 gap-x-2">
                  <div
                    className={`${
                      info == "metadata" ? "bg-dark dark:bg-white" : "bg-gray"
                    } group col-span-1 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-lg p-2 py-3 text-sm  font-semibold drop-shadow-md hover:bg-black dark:text-black dark:hover:bg-white`}
                    onClick={() => setInfo("metadata")}
                  >
                    <p>Metadata</p>
                    <BiData className=" " />
                  </div>
                  <div
                    className={`${
                      info == "description"
                        ? "bg-dark dark:bg-white"
                        : "bg-gray"
                    } group col-span-1 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-lg p-2 text-sm  font-semibold drop-shadow-md hover:bg-black dark:text-black dark:hover:bg-white`}
                    onClick={() => setInfo("description")}
                  >
                    <p>Description</p>
                    <MdOutlineDescription className=" " />
                  </div>
                  <div
                    className={`${
                      info == "attributes" ? "bg-dark dark:bg-white" : "bg-gray"
                    } group col-span-1 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-lg p-2 text-sm font-semibold drop-shadow-md hover:bg-black dark:text-black dark:hover:bg-white`}
                    onClick={() => setInfo("attributes")}
                  >
                    <p>Attributes</p>
                    <IoStatsChartOutline className=" " />
                  </div>
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

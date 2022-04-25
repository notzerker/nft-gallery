import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { addRequestMeta } from "next/dist/server/request-meta";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { FiArrowDown, FiArrowDownCircle, FiArrowUpRight } from "react-icons/fi";
import { hexToNumberString } from "web3-utils";
import { FiMoon, FiSun, FiCopy } from "react-icons/fi";
import useStore from "../lib/store";
import * as Select from "@radix-ui/react-select";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Item from "./Item";
import Image from "next/image";
import { Context } from "./Context";
import useNFTs from "../hooks/useNFTs";
import useCollections from "../hooks/useCollections";
import useBalance from "../hooks/useBalance";

const Gallery = () => {
  const [url, setUrl] = useState();
  const [selectedCol, setSelectedCol] = useState([]);
  const [image, setImage] = useState();
  const [names, setNames] = useState([]);
  const [addr, setAddr] = useState("");
  const [truncateAddr, setTruncateAddr] = useState("");
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState([]);

  const context = useContext(Context);
  const dark = context.dark;

  const router = useRouter();
  const { address: urlAddress } = router.query;

  useEffect(() => {
    setAddress(urlAddress);
  }, [urlAddress]);

  const initialResult = useNFTs(address);
  const collections = useCollections(initialResult);
  const balance = useBalance(address);

  useEffect(() => {
    setResult(initialResult);
  }, [initialResult]);

  console.log(initialResult);

  useEffect(() => {
    if (address) {
      setAddr(address);
      const addressLength = address.length;
      //add else if third case where user inputs .eth
      if (addressLength == 42) {
        const truncateAddress =
          address.substring(0, 4) +
          "..." +
          address.substring(addressLength - 4, addressLength);
        setTruncateAddr(truncateAddress);
      } else {
        address = address + ".eth";
        setTruncateAddr(address);
      }
    }
  }, [address]);

  useEffect(() => {
    const initial = initialResult;
    if (search) {
      const searchResult = initialResult.filter((data) =>
        data.metadata.name.toLowerCase().includes(search.toLowerCase())
      );
      setResult(searchResult);
    } else {
      setResult(initialResult);
    }
  }, [search]);

  const copyHandler = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className={`${dark && "dark"}`}>
      <div
        className={`relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-b from-[#ffffff] to-[#f1f1f1f1] px-8 py-40 dark:from-[#000000] dark:to-[#232323] md:px-12 lg:px-28`}
      >
        <Link href="/">
          <motion.a
            className="absolute top-8 left-8 cursor-pointer rounded-xl bg-white p-4 text-2xl text-black drop-shadow-md hover:text-black dark:bg-dark dark:text-gray dark:hover:text-white md:top-16 md:left-16 "
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1 }}
          >
            <IoIosArrowRoundBack />
          </motion.a>
        </Link>
        <div className="absolute top-8 right-8 flex flex-row space-x-4 md:top-16 md:right-16">
          <motion.a
            className="flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1 }}
            href={"https://etherscan.io/address/" + addr}
            target="_blank"
          >
            <FaEthereum />
            <p> {(Math.round(balance.toString() * 100) / 100).toFixed(2)}</p>
          </motion.a>
          <motion.a
            className=" flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1 }}
            onClick={context.setDarkHandler}
          >
            {dark ? <FiSun /> : <FiMoon />}
          </motion.a>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="focus:outline-none">
              <motion.div
                className="flex h-full cursor-pointer flex-row items-center justify-center rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 1 }}
              >
                <BsThreeDots className="cursor-pointer text-gray hover:text-black dark:hover:text-white" />
              </motion.div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={10}
              className={`${dark && "dark"} `}
            >
              <div className="h-fit w-44 rounded-xl bg-white p-2 text-black drop-shadow-md dark:bg-dark dark:text-white md:-translate-x-16">
                <DropdownMenu.Item className="focus:outline-none">
                  <a
                    href={"https://opensea.io/" + addr}
                    target="_blank"
                    className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                  >
                    <Image src="/assets/opensea.svg" height={20} width={20} />
                    <p>Opensea</p>
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none">
                  <a
                    href={"https://looksrare.org/accounts/" + addr}
                    target="_blank"
                    className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                  >
                    <Image src="/assets/looksrare.svg" height={20} width={20} />
                    <p>LooksRare</p>
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none">
                  <a
                    href={"https://www.gem.xyz/profile/" + addr}
                    target="_blank"
                    className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                  >
                    <Image src="/assets/gem.svg" height={20} width={20} />
                    <p>Gem</p>
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none">
                  <a
                    href={"https://etherscan.io/address/" + addr}
                    target="_blank"
                    className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                  >
                    <Image
                      src="/assets/etherscan-logo-circle.svg"
                      height={20}
                      width={20}
                    />
                    <p>Etherscan</p>
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-[1px] w-full rounded-xl bg-gray" />
                <DropdownMenu.Item
                  className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                  onClick={() => copyHandler()}
                >
                  <FiCopy />
                  <p>Copy address</p>
                </DropdownMenu.Item>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <div className=" mb-16 flex flex-row items-center justify-center md:space-x-24">
          <div className="relative flex flex-row items-center justify-center space-x-4 rounded-xl bg-white p-16 drop-shadow-md dark:bg-dark">
            <h1 className="flex w-fit items-center justify-center text-center text-5xl font-extrabold text-black dark:text-white">
              {truncateAddr}
            </h1>
          </div>
          <div className="relative hidden h-full flex-row space-x-12 md:flex">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
                Items
              </p>
              <h1 className="text-8xl font-extrabold text-black dark:text-white">
                {result.length}
              </h1>
              <p className="text-gray dark:text-light">
                Number of individual ERC721 tokens.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-dark dark:text-gray">
                Collections
              </p>
              <h1 className="text-8xl font-extrabold text-black dark:text-white">
                {collections.length}
              </h1>
              <p className="text-gray dark:text-light">
                Number of collections.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 flex w-full flex-row space-x-4">
          <input
            className="border-1  w-full rounded-xl border-black bg-white py-4 pr-16 pl-6 text-black placeholder-gray drop-shadow-md hover:placeholder-black focus:outline-none dark:border-white dark:bg-dark dark:text-white dark:placeholder-light dark:hover:placeholder-white"
            placeholder="Search NFTs by name or token ID"
            onChange={(e) => setSearch(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className=" grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
          {result.map((data) => {
            var img = "";
            var valid = true;
            if (data.media[0].gateway == "") {
              img = data.metadata.image_url;
            } else {
              img = data.media[0].gateway;
            }

            if (data.title == "") {
              valid = false;
            }
            return (
              valid && (
                <Item
                  name={data.title}
                  tokenId={data.id.tokenId}
                  tokenStd={data.id.tokenMetadata.tokenType}
                  img={img}
                  desc={data.description}
                  attr={data.metadata.attributes}
                  contract={data.contract.address}
                  dark={dark}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

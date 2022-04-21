import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { addRequestMeta } from "next/dist/server/request-meta";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { hexToNumberString } from "web3-utils";
import { FiMoon, FiSun, FiCopy } from "react-icons/fi";
import useStore from "../lib/store";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import Item from "./Item";
import Image from "next/image";

const Gallery = () => {
  const [url, setUrl] = useState();
  const [collections, setCollections] = useState([]);
  const [image, setImage] = useState();
  const [names, setNames] = useState([]);
  const [result, setResult] = useState([]);
  const [balance, setBalance] = useState("0.00");
  const [addr, setAddr] = useState("");
  const [truncateAddr, setTruncateAddr] = useState("");
  const dark = useStore((state) => state.dark);
  const setDark = useStore((state) => state.setDark);

  const apiKey = "SnGAV1KNt2faUFkP0C1d-TjoBcQB1HiU";
  const router = useRouter();
  const { address } = router.query;
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
  );

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

      async function getNFTs(addr) {
        await web3.alchemy
          .getNfts({
            owner: addr,
          })
          .then((res) => {
            setResult(res.ownedNfts);
          })
          .catch((error) => {
            alert(error);
          });
      }

      async function getBalance(addr) {
        await web3.eth
          .getBalance(addr.toString())
          .then((res) => {
            const ethBalance = res / 10 ** 18;
            setBalance(ethBalance);
          })
          .catch((error) => {
            alert(error);
          });
      }
      getNFTs(address);
      getBalance(address);
    }
  }, [address]);

  result.map((data) => {
    if (!collections.includes(data.contract.address)) {
      collections.push(data.contract.address);
    }
    const name = JSON.stringify(data.name);
  });

  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("dark") == null) {
      localStorage.setItem("dark", dark);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("dark") == "true") {
      setDark();
    }
  }, []);

  const setDarkHandler = () => {
    setDark();
    if (dark == false) {
      localStorage.setItem("dark", true);
    } else {
      localStorage.setItem("dark", false);
    }
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div
      className={`${
        dark
          ? "dark from-[#000000] to-[#232323]"
          : "from-[#ffffff] to-[#f1f1f1f1]"
      } relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-b py-40`}
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
          onClick={() => setDarkHandler()}
        >
          {dark ? <FiSun /> : <FiMoon />}
        </motion.a>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger className="focus:outline-none">
            <motion.div
              className="flex h-full cursor-pointer flex-row items-center justify-center rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 1 }}
            >
              <BsThreeDots className="cursor-pointer text-gray hover:text-black dark:hover:text-white" />
            </motion.div>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Content
            sideOffset={10}
            className={`${dark && "dark"} `}
          >
            <div className="h-fit w-44 rounded-xl bg-white p-2 text-black drop-shadow-md dark:bg-dark dark:text-white md:-translate-x-16">
              <DropdownMenuPrimitive.Item className="focus:outline-none">
                <a
                  href={"https://opensea.io/" + addr}
                  target="_blank"
                  className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                >
                  <Image src="/assets/opensea.svg" height={20} width={20} />
                  <p>Opensea</p>
                </a>
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Item className="focus:outline-none">
                <a
                  href={"https://looksrare.org/accounts/" + addr}
                  target="_blank"
                  className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                >
                  <Image src="/assets/looksrare.svg" height={20} width={20} />
                  <p>LooksRare</p>
                </a>
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Item className="focus:outline-none">
                <a
                  href={"https://www.gem.xyz/profile/" + addr}
                  target="_blank"
                  className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                >
                  <Image src="/assets/gem.svg" height={20} width={20} />
                  <p>Gem</p>
                </a>
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Item className="focus:outline-none">
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
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Separator className="my-1 h-[1px] w-full rounded-xl bg-gray" />
              <DropdownMenuPrimitive.Item
                className="flex w-full cursor-pointer flex-row items-center justify-start space-x-3 rounded-lg p-2 font-medium hover:bg-light/10 focus:outline-none"
                onClick={() => copyHandler()}
              >
                <FiCopy />
                <p>Copy address</p>
              </DropdownMenuPrimitive.Item>
            </div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Root>
      </div>

      <div className=" mb-24 flex flex-row items-center justify-center md:space-x-24">
        <div className="relative flex flex-row items-center justify-center space-x-4 rounded-xl bg-white p-16 drop-shadow-md dark:bg-dark">
          {/* <CgProfile className="cursor-pointer text-5xl text-gray hover:text-black dark:hover:text-white" /> */}
          <h1 className="flex w-fit items-center justify-center text-center text-5xl font-extrabold text-black dark:text-white">
            {truncateAddr}
          </h1>
          <FiCopy className="cursor-pointer text-2xl text-gray hover:text-black dark:hover:text-white" />
          {/* <a
            className="flex cursor-pointer flex-row items-start justify-start space-x-1 text-center text-gray hover:text-black dark:hover:text-white"
            href={"https://etherscan.io/address/" + addr}
            target="_blank"
          >
            <p className="">{truncateAddr}</p>
            <FiArrowUpRight />
          </a> */}
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
            <p className="text-gray dark:text-light">Number of collections.</p>
          </div>
        </div>
      </div>
      <div className=" grid w-full grid-cols-2 gap-4 px-8 md:grid-cols-3 md:gap-4 md:px-12 lg:grid-cols-4 lg:gap-6 lg:px-28">
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

          return valid ? (
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
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;

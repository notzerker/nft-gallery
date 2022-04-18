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
import { IoOpenOutline } from "react-icons/io5";
import { hexToNumberString } from "web3-utils";
import { FiMoon, FiSun } from "react-icons/fi";
import useStore from "../lib/store";

import Item from "./Item";

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
            console.log(balance);
          })
          .catch((error) => {
            alert(error);
          });
      }
      getNFTs(address);
      getBalance(address);
    }
  }, [address]);

  console.log(result);

  result.map((data) => {
    if (!collections.includes(data.contract.address)) {
      collections.push(data.contract.address);
    }
    const name = JSON.stringify(data.name);
  });

  console.log(dark);

  return (
    <div
      className={`${
        dark ? "dark bg-[#141416]" : "bg-[#f1f1f1f1]"
      } relative flex min-h-screen w-full flex-col items-center justify-start py-40`}
    >
      <Link href="/">
        <motion.a
          className="absolute top-16 left-16 cursor-pointer rounded-xl bg-white p-4 text-2xl text-black drop-shadow-md hover:text-black dark:bg-dark dark:text-gray dark:hover:text-white "
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1 }}
        >
          <IoIosArrowRoundBack />
        </motion.a>
      </Link>
      {/* <motion.a
        className="absolute top-16 right-16 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-dark p-4 text-light drop-shadow-md hover:text-white"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1 }}
      >
        <FaEthereum />
        <p> {balance.toString().substring(0, 4)}</p>
      </motion.a> */}
      <motion.a
        className="absolute top-16 right-16 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1 }}
        onClick={setDark}
      >
        {dark ? <FiSun /> : <FiMoon />}
      </motion.a>
      <div className=" mb-24 flex flex-row items-center justify-center md:space-x-24">
        <div className="relative flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-16 drop-shadow-md dark:bg-dark">
          <div className="absolute top-4 left-4 p-2">
            <CgProfile className="cursor-pointer text-xl text-gray hover:text-black dark:hover:text-white" />
          </div>
          <div className="absolute top-0 right-4 rounded-xl p-2">
            <BsThreeDots className="cursor-pointer text-gray hover:text-black dark:hover:text-white" />
          </div>
          <h1 className="w-[20rem] text-center text-6xl font-extrabold text-black dark:text-white">
            {truncateAddr}
          </h1>
          <a
            className="flex cursor-pointer flex-row items-center justify-center space-x-2 text-center text-gray hover:text-black dark:hover:text-white"
            href={"https://etherscan.io/address/" + addr}
            target="_blank"
          >
            <p className="">{truncateAddr}</p>
            <IoOpenOutline />
          </a>
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

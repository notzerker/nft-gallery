import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Item from "./Item";
import { useRouter } from "next/router";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { addRequestMeta } from "next/dist/server/request-meta";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { IoOpenOutline } from "react-icons/io5";
import { hexToNumberString } from "web3-utils";

const Gallery = () => {
  const [url, setUrl] = useState();
  const [collections, setCollections] = useState([]);
  const [image, setImage] = useState();
  const [names, setNames] = useState([]);
  const [result, setResult] = useState([]);
  const [balance, setBalance] = useState([]);
  const [addr, setAddr] = useState("");
  const [truncateAddr, setTruncateAddr] = useState("");

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

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start py-24">
      <Link href="/">
        <motion.a
          className="absolute top-16 left-16 cursor-pointer rounded-xl bg-dark p-4 text-2xl text-light shadow-xl hover:text-white"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1 }}
        >
          <IoIosArrowRoundBack />
        </motion.a>
      </Link>
      <motion.a
        className="absolute top-16 right-16 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-dark p-4 text-light shadow-xl hover:text-white"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1 }}
      >
        <FaEthereum />
        <p> {balance.toString().substring(0, 4)}</p>
      </motion.a>
      <div className=" mb-24 flex flex-row items-center justify-center space-x-24">
        <div className="relative flex flex-col items-center justify-center space-y-4 rounded-xl bg-dark p-16 shadow-xl">
          <div className="absolute top-4 left-4 p-2">
            <CgProfile className="cursor-pointer text-xl text-gray hover:text-white" />
          </div>
          <div className="absolute top-0 right-4 rounded-xl p-2">
            <BsThreeDots className="cursor-pointer text-gray hover:text-white" />
          </div>
          <h1 className="text-center text-6xl font-extrabold text-white">
            {truncateAddr}
          </h1>
          <a
            className="flex cursor-pointer flex-row items-center justify-center space-x-2 text-center text-gray hover:text-white"
            href={"https://etherscan.io/address/" + addr}
            target="_blank"
          >
            <p className="">{truncateAddr}</p>
            <IoOpenOutline />
          </a>
        </div>
        <div className="relative flex h-full flex-row space-x-12">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray">
              Items
            </p>
            <h1 className="text-8xl font-extrabold">{result.length}</h1>
            <p className="text-light">Number of individual ERC721 tokens.</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray">
              Collections
            </p>
            <h1 className="text-8xl font-extrabold">{collections.length}</h1>
            <p className="text-light">Number of collections.</p>
          </div>
        </div>
      </div>
      <div className=" grid w-full grid-cols-4 gap-8 px-28">
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
            />
          ) : (
            ""
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-center space-x-24"></div>
    </div>
  );
};

export default Gallery;

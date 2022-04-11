import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Item from "./Item";

const Gallery = ({ result, address }) => {
  const [url, setUrl] = useState();
  const [collections, setCollections] = useState([]);
  const [image, setImage] = useState();

  result.map((data) => {
    if (!collections.includes(data.name)) {
      collections.push(data.name);
    }
  });

  return (
    <div className="z-50 flex min-h-screen w-full flex-col items-center justify-center space-y-24 py-24">
      <div className="z-50 flex flex-row items-center justify-center space-x-16">
        <div className="relative flex flex-col items-center justify-center space-y-4 rounded-xl bg-dark p-16 shadow-xl">
          <div className="absolute top-4 left-4 p-2">
            <CgProfile className="text-xl text-gray hover:text-white" />
          </div>
          <div className="absolute top-0 right-4 rounded-xl p-2">
            <BsThreeDots className="cursor-pointer text-gray hover:text-white" />
          </div>
          <h1 className="text-6xl font-extrabold">zerker.eth</h1>
          <div className="flex cursor-pointer flex-row items-center justify-center space-x-2 text-gray hover:text-white">
            <FaEthereum />
            <p className="w-24 truncate">{address}</p>
          </div>
        </div>
        <div className="before:broder-white relative z-50 flex h-full flex-row space-x-12 p-8 pr-16 before:absolute before:bottom-0 before:right-0 before:h-4 before:w-4 before:border-b-[1px] before:border-r-[1px] after:absolute after:top-0 after:right-0 after:h-4 after:w-4 after:border-t-[1px] after:border-r-[1px]">
          <div className="flex flex-col space-y-2">
            <p className="text-sm uppercase tracking-widest text-gray">Items</p>
            <h1 className="text-8xl font-extrabold">{result.length}</h1>
            <p className="text-light">Number of individual ERC721 tokens.</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm uppercase tracking-widest text-gray">
              Collections
            </p>
            <h1 className="text-8xl font-extrabold">{collections.length}</h1>
            <p className="text-light">Number of collections.</p>
          </div>
        </div>
      </div>
      <div className="z-50 grid w-fit grid-cols-4 gap-8">
        {result.map((data) => {
          const img = "";
          if (data.media[0].gateway == "") {
            img = data.metadata.image_url;
          } else {
            img = data.media[0].gateway;
          }

          return <Item name={data.title} tokenId={data.token_id} img={img} />;
        })}
      </div>
      <div className="flex flex-row items-center justify-center space-x-24"></div>
    </div>
  );
};

export default Gallery;

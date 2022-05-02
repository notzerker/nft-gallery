import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useStore from "../lib/store";
import { FiMoon, FiSun } from "react-icons/fi";
import Image from "next/image";

import Gallery from "./Gallery";
import Item from "./Item";
import { Context } from "./Context";

const Main = () => {
  const [address, setAddress] = useState("");
  const context = useContext(Context);
  const dark = context.dark;

  const router = useRouter();

  const formHandler = (e) => {
    e.preventDefault();
    router.push("/" + address);
  };

  return (
    <div className={`${dark && "dark"}`}>
      <div className="fixed top-0 h-[200vh] w-[200vw] translate-x-[-50vw] translate-y-[-100vh] bg-gradient-radial from-[#8608FD10] to-transparent"></div>
      <div
        className={`relative min-h-screen w-full overflow-hidden
        overscroll-y-none`}
      >
        <motion.a
          className="absolute top-16 right-8 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl bg-white p-4 text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white md:right-16"
          onClick={context.setDarkHandler}
        >
          {dark ? <FiSun /> : <FiMoon />}
        </motion.a>
        <div className="flex h-screen flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gray md:text-lg">
            Welcome To
          </p>
          <h1 className="mt-6 text-center text-7xl font-extrabold tracking-tighter text-white md:text-9xl">
            The Gallery.
          </h1>
          <h2 className="mt-8 text-base text-light md:text-lg">
            Explore other's NFT collections on the Ethereum network.
          </h2>
          <motion.div
            className="relative flex w-80 flex-col items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1 }}
          >
            <form onSubmit={(e) => formHandler(e)} className="w-full">
              <input
                className="border-1 mt-6 w-full rounded-xl border-black bg-white py-4 pr-16 pl-6 text-black placeholder-gray drop-shadow-md hover:placeholder-black focus:outline-none dark:border-white dark:bg-dark dark:text-white dark:placeholder-light dark:hover:placeholder-white"
                placeholder="Search by Address"
                onChange={(e) => setAddress(e.target.value)}
                spellCheck={false}
              />
            </form>
            <div
              className="absolute right-4 top-4 cursor-pointer py-4 text-4xl text-gray hover:text-black dark:text-light dark:hover:text-white"
              onClick={(e) => formHandler(e)}
            >
              <IoIosArrowRoundForward />
            </div>
          </motion.div>
        </div>
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <h1 className="text-7xl font-extrabold tracking-tighter">
            The Future of Art
          </h1>
          <div className="mt-20 flex flex-row space-x-6">
            <div className="group flex w-[22rem] cursor-pointer flex-col items-start justify-center rounded-xl bg-dark p-8 text-xs">
              <p className="uppercase tracking-wider text-gray">Connect</p>
              <h2 className="mt-16 text-3xl font-extrabold tracking-tighter text-white">
                Connect
              </h2>
              <p className="mt-4 text-sm text-white">
                Brings creators, collectors, and artists together to enjoy
                blockchain art.
              </p>
              <svg
                width={26}
                height={24}
                className="mt-16 transition duration-200 ease-linear group-hover:scale-105"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="a" className="fill-gray group-hover:fill-white">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5 4.665A2.5 2.5 0 0 0 13.25 0 2.5 2.5 0 0 0 12 4.665L3.83 18.817a2.5 2.5 0 1 0 1.92 2.433h15a2.5 2.5 0 1 0 1.92-2.433L14.5 4.665Zm-1.53.32a2.524 2.524 0 0 0 .56 0l8.231 14.257a2.509 2.509 0 0 0-.803 1.008H5.542a2.509 2.509 0 0 0-.803-1.008L12.97 4.985Z"
                  />
                </mask>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5 4.665A2.5 2.5 0 0 0 13.25 0 2.5 2.5 0 0 0 12 4.665L3.83 18.817a2.5 2.5 0 1 0 1.92 2.433h15a2.5 2.5 0 1 0 1.92-2.433L14.5 4.665Zm-1.53.32a2.524 2.524 0 0 0 .56 0l8.231 14.257a2.509 2.509 0 0 0-.803 1.008H5.542a2.509 2.509 0 0 0-.803-1.008L12.97 4.985Z"
                  className="fill-dark "
                />
                <path
                  d="M14.5 4.665 14 3.8l-.865.5.5.865.865-.5Zm-2.5 0 .866.5.5-.865-.865-.5-.501.865ZM3.83 18.817l-.232.973.725.172.372-.645-.866-.5Zm1.92 2.433v-1h-1v1h1Zm15 0h1v-1h-1v1Zm1.92-2.433-.865.5.372.645.725-.171-.231-.974Zm-9.7-13.832.11-.994-.649-.073-.327.567.866.5Zm.56 0 .866-.5-.327-.567-.65.073.11.994Zm8.231 14.257.596.802.716-.53-.446-.772-.866.5Zm-.803 1.008v1h.654l.262-.6-.916-.4Zm-15.416 0-.916.4.262.6h.654v-1Zm-.803-1.008-.866-.5-.446.771.716.531.596-.802ZM14.75 2.5c0 .554-.3 1.039-.75 1.3L15 5.53A3.499 3.499 0 0 0 16.75 2.5h-2ZM13.25 1a1.5 1.5 0 0 1 1.5 1.5h2a3.5 3.5 0 0 0-3.5-3.5v2Zm-1.5 1.5a1.5 1.5 0 0 1 1.5-1.5v-2a3.5 3.5 0 0 0-3.5 3.5h2Zm.75 1.3c-.45-.261-.75-.746-.75-1.3h-2c0 1.297.706 2.427 1.749 3.031L12.501 3.8Zm-1.366.365-8.17 14.152 1.731 1 8.17-14.152-1.731-1ZM4.06 17.845a3.506 3.506 0 0 0-.81-.095v2c.121 0 .238.014.348.04l.462-1.946Zm-.81-.095a3.5 3.5 0 0 0-3.5 3.5h2a1.5 1.5 0 0 1 1.5-1.5v-2Zm-3.5 3.5a3.5 3.5 0 0 0 3.5 3.5v-2a1.5 1.5 0 0 1-1.5-1.5h-2Zm3.5 3.5a3.5 3.5 0 0 0 3.5-3.5h-2a1.5 1.5 0 0 1-1.5 1.5v2Zm2.5-2.5h15v-2h-15v2Zm14-1a3.5 3.5 0 0 0 3.5 3.5v-2a1.5 1.5 0 0 1-1.5-1.5h-2Zm3.5 3.5a3.5 3.5 0 0 0 3.5-3.5h-2a1.5 1.5 0 0 1-1.5 1.5v2Zm3.5-3.5a3.5 3.5 0 0 0-3.5-3.5v2a1.5 1.5 0 0 1 1.5 1.5h2Zm-3.5-3.5c-.278 0-.549.033-.81.095l.462 1.946c.11-.027.227-.041.348-.041v-2Zm.287.567-8.17-14.152-1.733 1 8.17 14.152 1.733-1ZM13.25 4c-.057 0-.114-.003-.17-.01l-.22 1.988c.128.015.258.022.39.022V4Zm.17-.01c-.056.007-.113.01-.17.01v2c.132 0 .262-.007.39-.022l-.22-1.987Zm9.207 14.752L14.396 4.485l-1.732 1 8.231 14.257 1.732-1Zm-.753 1.908c.106-.24.273-.45.483-.605l-1.192-1.606a3.51 3.51 0 0 0-1.123 1.41l1.832.801Zm-16.332.6h15.416v-2H5.542v2Zm-1.4-1.206c.21.157.378.366.484.606l1.832-.8a3.51 3.51 0 0 0-1.123-1.411l-1.192 1.605Zm7.962-15.56L3.873 18.743l1.732 1 8.231-14.257-1.732-1Z"
                  className="fill-gray group-hover:fill-white"
                  mask="url(#a)"
                />
              </svg>
            </div>
            <div className="group flex w-[22rem] cursor-pointer flex-col items-start justify-center rounded-xl bg-dark p-8 text-xs">
              <p className="uppercase tracking-wider text-gray">Display</p>
              <h2 className="mt-16 text-3xl font-extrabold tracking-tighter">
                Showcase
              </h2>
              <p className="mt-4 text-sm">
                Display your NFT collection for others to view and enjoy.
              </p>
              <svg
                width={26}
                height={24}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-16 transition duration-200 ease-linear group-hover:scale-105"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m5.5 2.827 2.897-1.672 2.897 1.672v3.346L8.397 7.845 5.5 6.173V2.827ZM8.397 0l3.897 2.25v4.5L8.397 9 4.5 6.75v-4.5L8.397 0Zm4.5 8.655L10 10.327v3.346l2.897 1.672 2.897-1.672v-3.346l-2.897-1.672Zm3.897 1.095L12.897 7.5 9 9.75v4.5l3.897 2.25 3.897-2.25v-4.5Zm5.103-1.095L19 10.327v3.346l2.897 1.672 2.897-1.672v-3.346l-2.897-1.672Zm3.897 1.095L21.897 7.5 18 9.75v4.5l3.897 2.25 3.897-2.25v-4.5ZM3.897 8.655 1 10.327v3.346l2.897 1.672 2.897-1.672v-3.346L3.897 8.655ZM7.794 9.75 3.897 7.5 0 9.75v4.5l3.897 2.25 3.897-2.25v-4.5ZM14.5 2.827l2.897-1.672 2.897 1.672v3.346l-2.897 1.672L14.5 6.173V2.827ZM17.397 0l3.897 2.25v4.5L17.397 9 13.5 6.75v-4.5L17.397 0Zm-9 16.155L5.5 17.827v3.346l2.897 1.672 2.897-1.672v-3.346l-2.897-1.672Zm3.897 1.095L8.397 15 4.5 17.25v4.5L8.397 24l3.897-2.25v-4.5Zm2.206.577 2.897-1.672 2.897 1.672v3.346l-2.897 1.672-2.897-1.672v-3.346ZM17.397 15l3.897 2.25v4.5L17.397 24 13.5 21.75v-4.5L17.397 15Z"
                  className="fill-gray group-hover:fill-white"
                />
              </svg>
            </div>
            <div className="items-between group relative flex w-[22rem] cursor-pointer flex-col justify-center rounded-xl bg-dark p-8 text-xs">
              <p className="uppercase tracking-wider text-gray">Search</p>
              <h2 className="mt-16 text-3xl font-extrabold tracking-tighter">
                Explore
              </h2>
              <p className="mt-4 text-sm">
                Search and enjoy creators, collectors, and artists NFT
                collection.
              </p>
              <svg
                width={26}
                height={24}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-16 stroke-gray transition duration-200 ease-linear group-hover:scale-105 group-hover:stroke-white"
              >
                <path
                  d="M24.75 11.364c0 .366-.262.77-.872 1.183-.602.407-1.49.783-2.608 1.102-2.234.639-5.335 1.037-8.77 1.037-3.435 0-6.536-.399-8.77-1.037-1.119-.32-2.006-.695-2.608-1.102-.61-.412-.872-.817-.872-1.183 0-.366.262-.77.872-1.183.602-.406 1.49-.782 2.608-1.102 2.234-.638 5.335-1.036 8.77-1.036 3.435 0 6.536.398 8.77 1.036 1.119.32 2.006.696 2.608 1.102.61.413.872.817.872 1.183Z"
                  strokeWidth={1}
                  className="stroke-inherit"
                />
                <path
                  d="M21.162 2.702c.259.26.36.73.22 1.453-.138.713-.5 1.606-1.065 2.624-1.128 2.03-3.04 4.505-5.468 6.934-2.43 2.429-4.904 4.34-6.935 5.468-1.017.565-1.91.927-2.623 1.065-.723.14-1.194.04-1.453-.22-.26-.259-.36-.73-.22-1.453.138-.713.5-1.606 1.065-2.623 1.128-2.031 3.04-4.505 5.468-6.934 2.43-2.43 4.904-4.34 6.935-5.469 1.017-.565 1.91-.927 2.623-1.065.723-.14 1.194-.039 1.453.22Z"
                  className="stroke-inherit"
                  strokeWidth={1}
                />
                <path
                  d="M21.162 20.026c-.259.26-.73.36-1.453.22-.713-.138-1.606-.5-2.623-1.065-2.031-1.128-4.505-3.039-6.935-5.468-2.429-2.43-4.34-4.903-5.468-6.934-.565-1.018-.927-1.91-1.065-2.624-.14-.723-.04-1.194.22-1.453.259-.259.73-.36 1.453-.22.713.138 1.606.5 2.623 1.065 2.031 1.128 4.505 3.04 6.935 5.469 2.429 2.429 4.34 4.903 5.468 6.934.565 1.017.927 1.91 1.065 2.623.14.723.039 1.194-.22 1.453Z"
                  className="stroke-inherit"
                  strokeWidth={1}
                />
                <circle
                  cx={12.236}
                  cy={11.574}
                  r={9.571}
                  className="stroke-inherit"
                  strokeWidth={1}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

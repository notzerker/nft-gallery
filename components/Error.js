import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Context } from "./Context";

const Error = () => {
  const context = useContext(Context);
  const dark = context.dark;

  const router = useRouter();
  const { address } = router.query;

  return (
    <div className={`${dark && "dark"}`}>
      <div className="fixed top-0 h-[200vh] w-[200vw] translate-x-[-50vw] translate-y-[-100vh] bg-gradient-radial from-[#8608FD10] to-transparent"></div>
      <div
        className={`relative flex min-h-screen w-full flex-col items-center justify-center`}
      >
        <h1 className="p-2 text-6xl font-extrabold tracking-tighter">
          Invalid Address
        </h1>
        <h2 className="mt-2 mb-10 text-lg text-light">
          Sorry, we can't find the address you are looking for.
        </h2>
        <Link href="/">
          <div className="cursor-pointer rounded-xl bg-white px-4 py-3 text-lg text-gray drop-shadow-md hover:text-black dark:bg-dark dark:text-light dark:hover:text-white">
            Back to Search
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Error;

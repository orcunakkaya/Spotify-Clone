"use client";

import React, { useState, useEffect, useRef } from "react";
import Share from "../../../public/assets/Share";
import Image from "next/image";

const Dropdown = ({ handleSelect }) => {
    
  return (
    <>
    <ul className="relative p-1 text-sm border-none rounded max-lg:p-4 max-lg:w-full max-lg:h-full min-w-56 text-subdued whitespace-nowrap max-lg:rounded-none max-lg:bg-black bg-decorativeSubdued">
      <li className="items-center justify-end hidden w-full gap-2 py-3 pl-3 pr-2 cursor-pointer max-lg:flex">
        <button className="text-white">
          <Image src="/assets/close.svg" alt="Close" width={24} height={24} />
        </button>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <span className="text-white max-lg:text-xl max-lg:font-bold">Account</span>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <span className="text-white max-lg:text-xl max-lg:font-bold">Profile</span>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <span className="text-white max-lg:text-xl max-lg:font-bold">Support</span>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <span className="text-white max-lg:text-xl max-lg:font-bold">Dowload</span>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <span className="text-white max-lg:text-xl max-lg:font-bold">Settings</span>
      </li>
      <li onClick={() => handleSelect()} className="flex items-center justify-between w-full gap-2 py-3 pl-3 pr-2 text-white cursor-pointer hover:bg-hoverBackgroundColor">
        <span className="text-white max-lg:text-xl max-lg:font-bold">Logout</span>
        <span className="max-lg:hidden"><Share /></span>
      </li>
    </ul>
    </>
  );
};

export default Dropdown;
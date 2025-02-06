"use client";

import React, { useState, useEffect, useRef } from "react";
import Share from "../../../../public/assets/Share";
import MiniLogo from "../../../../public/assets/MiniLogo";
import Image from "next/image";

const Dropdown = ({ handleSelect }) => {
    
  return (
    <>
        <ul className="relative p-1 text-sm border-none rounded min-w-56 text-subdued whitespace-nowrap bg-decorativeSubdued">
      <li onClick={() => handleSelect('edit')} className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <Image src="/assets/edit.svg" alt="delete" width={16} height={16} />
        <span className="text-white">Edit details</span>
      </li>
      <li onClick={() => handleSelect('delete')} className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <Image src="/assets/trash.svg" alt="delete" width={16} height={16} />
        <span className="text-white">Remove from profile</span>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <Share />
        <span className="text-white">Share</span>
      </li>
      <li className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <MiniLogo />
        <span className="text-white">Open in Desktop app</span>{" "}
      </li>
    </ul>

    
    </>
  );
};

export default Dropdown;

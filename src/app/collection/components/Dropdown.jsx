"use client";

import React, { useState, useEffect, useRef } from "react";
import Share from "../../../../public/assets/Share";
import MiniLogo from "../../../../public/assets/MiniLogo";
import Image from "next/image";

const Dropdown = ({ handleSelect }) => {
    
  return (
    <>
        <ul className="relative min-w-56 p-1 text-subdued whitespace-nowrap text-sm bg-decorativeSubdued border-none rounded">
      <li onClick={() => handleSelect('edit') } className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <Image src="/assets/edit.svg" alt="delete" width={16} height={16} />
        <span className="text-white">Düzenle</span>
      </li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <Image src="/assets/trash.svg" alt="delete" width={16} height={16} />
        <span className="text-white">Sil</span>
      </li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <Share />
        <span className="text-white">Paylaş</span>
      </li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor">
        <MiniLogo />
        <span className="text-white">Masaüstü uygulamasında aç</span>{" "}
      </li>
    </ul>

    
    </>
  );
};

export default Dropdown;

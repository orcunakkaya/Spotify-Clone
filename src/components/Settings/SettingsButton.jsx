"use client";
import React, { useState, useEffect, useRef } from "react";
import Dropdown from './Dropdown';
import Settings from "../../../public/assets/Settings";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const SettingsButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [userName, setUserName] = useState();

  const handleSelect = (option) => {
    Cookies.remove('spotify_api_token', { path: '/' });
    Cookies.remove('spotify_access_token', { path: '/' });
    Cookies.remove('spotify_user', { path: '/' });
    router.push("/login");
  };

  useEffect(() => {
    const user = Cookies.get('spotify_user');
    if(user) {
      setUserName(user?.display_name);
    }
  }, [Cookies])

  return (
    <div >
      <button onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        id="settings-button"
      
        >
          <div className="grid h-12 cursor-pointer max-lg:hidden bg-boxBackgroundColor rounded-3xl min-w-12 place-items-center">
              <div className="h-8 font-extrabold leading-8 text-center align-middle bg-blue rounded-3xl min-w-8">
                {userName?.charAt(0) || "O"}
              </div>
          </div>
          <div className="hidden text-white max-lg:grid">
            <Settings />
          </div>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 max-lg:-translate-x-full bg-transparent border border-none rounded shadow-md -ml-44 max-lg:m-0 max-lg:-mt-[50px] max-lg:ml-[54px] max-lg:w-full max-lg:h-full"
          ref={dropdownRef}
        >
          <Dropdown handleSelect={handleSelect} />
        </div>
      )}
    </div>
  )
}

export default SettingsButton;
"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from '../../public/assets/Search';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if(pathName.startsWith('/search')) return;
    router.push('/search');
  }
 
  const changeUrl = () => {
    if(search.length > 0) {
      router.push(`/search/${search}`);
    }else{
      router.push('/search');
    }
  }
  return (
    <div className="relative rounded-3xl shadow-sm bg-boxBackgroundColor h-12 w-[max]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="text-linkColor sm:text-sm hover:text-white">
          <SearchIcon />
        </span>
      </div>
      <input
        type="text"
        name="price"
        id="price"
        className="block bg-boxBackgroundColor min-w-full rounded-3xl border-0 py-1.5 h-12 pl-9 pr-4 text-linkColor placeholder:linkColor sm:text-sm sm:leading-6 indent-3
        max-lg:rounded-md max-lg:text-black max-lg:bg-white
        "
        placeholder="Ne çalmak istiyorsun?"
        onClick={() => handleSearch()}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && changeUrl()}
      />
    </div>
  );
};

export default SearchBar;

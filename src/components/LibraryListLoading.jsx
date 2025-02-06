import React from 'react'

const LibraryListLoading = () => {
  return (
    <div className="block h-16 min-w-full p-2 border border-transparent rounded bg-hoverBackgroundColor animate-pulse">
      <div className="flex h-12 gap-2 flex-nowrap">
        <div className="border-none rounded h-12 w-[48px] bg-gray-700 animate-pulse" />

        <div className="grid w-full gap-1 text-left">
          <div className="w-3/4 h-4 bg-gray-600 rounded animate-pulse" />
          <div className="w-1/2 h-3 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default LibraryListLoading
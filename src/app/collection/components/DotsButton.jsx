"use client";

import React, { useState, useEffect, useRef } from "react";
import Dots from "../../../../public/assets/Dots.jsx";
import Dropdown from "./Dropdown";
import Modal from "@/components/Modal";
import Image from "next/image";

const DotsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (option === "edit") {
      setShowEditModal(true);
    } else {
      setShowDeleteModal(true);
    }
    toggleDropdown();
  };

  const modelHeader = "Ayrıntıları düzenle";

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const modelContent = (
    // solda bir iimage input olsun. seçili resim içinde gözüksün. bu inputun üzerine hover olunca düzenle ve sil butonu gözüksün. bu image inputun sağında da iki tane input olucak biri title belirleme biri description girme
    <div>
      <div>
        {image ? (
          <div className="relative"></div>
        ) : (
          <div className="relative flex gap-4">
            <label className="flex items-center justify-center border border-transparent rounded bg-decorativeSubdued w-[180px] h-[180px] shadow-emptyBox">
              <Image
                src="/assets/empty.svg"
                alt="Empty"
                width={64}
                height={64}
              />
            </label>
            <div className="grid gap-4 grid-rows-[min-content]">
              <div className="relative w-[100%]">
                <input
                  type="text"
                  id="name"
                  className="peer w-[100%] bg-tintedBase border-none rounded-md px-4 pt-2 pb-2 text-sm  focus:outline-none focus:border-white text-subdued"
                  placeholder="Ad ekle"
                />
                <label
                  htmlFor="name"
                  className="absolute text-subdued left-4 bg-transparent px-1 text-sm -top-3 invisible peer-focus:visible"
                >
                  Ad
                </label>
              </div>

              <div className="relative w-[100%]">
                <textarea
                  id="description"
                  className="peer w-[100%] h-full bg-tintedBase border-white rounded-md px-4 pt-2 pb-2 text-sm  focus:outline-none focus:border-white text-subdued resize-none"
                  placeholder="İsteğe bağlı açıklama ekle"
                />
                <label
                  htmlFor="description"
                  className="absolute text-subdued left-4 bg-transparent px-1 text-sm -top-3 invisible peer-focus:visible"
                >
                  Açıklama
                </label>
              </div>

              {/* <input type="text" placeholder="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <textarea placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
            </div>
            
          </div>
        )}
      </div>
      <input
        type="file"
        id="imageUpload"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );

  const modelFooter = (
    <button className="rounded-3xl py-2 px-6 bg-white font-bold text-black">Kaydet</button>
  )

  return (
    <div className="relative flex">
      <button
        className="text-subdued hover:text-white my-auto"
        id="menu-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Dots width="22" height="22" />
      </button>

      {isOpen && (
        <div
          className="absolute mt-16  bg-transparent border-none border rounded shadow-md z-10"
          ref={dropdownRef}
        >
          <Dropdown handleSelect={handleSelect} />
        </div>
      )}

      {showEditModal && (
        <Modal
          title="Düzenle"
          onClose={() => setShowEditModal(false)}
          header={modelHeader}
          content={modelContent}
          footer={modelFooter}
        />
      )}
    </div>
  );
};

export default DotsButton;

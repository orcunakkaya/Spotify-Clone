"use client";

import React, { useState, useEffect, useRef } from "react";
import Dots from "../../../../public/assets/Dots.jsx";
import Dropdown from "./Dropdown";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { editPlaylist, deletePlaylist } from "@/actions/actions";
import { usePlaylistContext } from "@/context/PlaylistContext";

const DotsButton = ({ playlist }) => {
  const router = useRouter();
  const { setPlaylists } = usePlaylistContext();

  const [isOpen, setIsOpen] = useState(false);
  const [imageDropdownOpen, setImageDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const imageDropdownRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [image, setImage] = useState(playlist.playListImage ?? "");
  const [title, setTitle] = useState(playlist.title ?? "");
  const [description, setDescription] = useState("");

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
    } else if (option === "delete") {
      setShowDeleteModal(true);
    }
    toggleDropdown();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const handleImageRemove = () => {
    setImage("");
  };

  const toggleImageDropdown = () => {
    setImageDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        imageDropdownRef.current &&
        !imageDropdownRef.current.contains(event.target)
      ) {
        setImageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageSelect = (option) => {
    if (option === "edit") {
      document.getElementById("imageUpload").click();
    } else {
      handleImageRemove();
    }
  };

  const handleSave = () => {
    editPlaylist({
      id: playlist.id,
      title: title,
      description: description,
      playListImage: image ?? "",
    }).then((res) => {
      if (res) {
        setPlaylists((prev) =>
          prev.map((item) => {
            if (item.id === playlist.id) {
              return {
                ...res,
              };
            }
            return item;
          })
        );
      }
    });
    setShowEditModal(false);
  };

  const handleDeletePlaylist = () => {
    deletePlaylist({ id: playlist.id }).then((res) => {
      if (res === true) {
        setPlaylists((prev) => prev.filter((item) => item.id !== playlist.id));
        router.push("/");
      }
    });
    setShowDeleteModal(false);
  };

  const deleteModalHeader = (
    <div className="flex items-center justify-between mt-3 ml-4 mr-4">
      <h1 className="text-lg font-bold text-white">
        Delete from Your Library?
      </h1>
      <button
        className="hover:bg-tintedBase grid place-items-center rounded-full p-1.5"
        onClick={() => setShowDeleteModal(false)}
      >
        <Image src="/assets/close.svg" alt="Close" width={16} height={16} />
      </button>
    </div>
  );

  const deleteModalContent = (
    <div className="mx-4 w-[400px] text-left">
      {title} This will delete from Your Library.
    </div>
  );

  const deleteModalFooter = (
    <div className="flex gap-4 mx-4">
      <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
      <button
        onClick={() => handleDeletePlaylist()}
        className="px-6 py-2 font-bold text-black rounded-3xl bg-green hover:scale-110"
      >
        Save
      </button>
    </div>
  );

  const modelHeader = (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-bold text-white">Edit details</h1>
      <button
        className="hover:bg-tintedBase grid place-items-center rounded-full p-1.5"
        onClick={() => setShowEditModal(false)}
      >
        <Image src="/assets/close.svg" alt="Close" width={16} height={16} />
      </button>
    </div>
  );

  const modelContent = (
    <div>
      <div>
        <div className="relative flex gap-4">
          <label className="relative flex items-center justify-center border border-transparent rounded bg-decorativeSubdued w-[180px] h-[180px] shadow-emptyBox">
            {image && image.length > 0 ? (
              <Image
                src={image}
                alt="Empty"
                fill
                className="w-[180px] h-[180px] rounded"
              />
            ) : (
              <Image
                src="/assets/empty.svg"
                alt="Empty"
                width={64}
                height={64}
              />
            )}
            <button
              className={`hover:visible ${
                imageDropdownOpen ? "visible" : "invisible"
              } p-2 bg-opacityBacground text-white rounded-full absolute top-1.5 right-1.5`}
              onClick={() => toggleImageDropdown()}
              aria-expanded={imageDropdownOpen}
              aria-haspopup="true"
              id="menu-button"
            >
              <Dots width="16" height="16" />
            </button>

            {imageDropdownOpen && (
              <div
                className="absolute left-[80%] bg-transparent border-none border rounded shadow-md z-30 shadow-emptyBox"
                ref={imageDropdownRef}
              >
                <ul className="relative p-1 text-sm border-none rounded min-w-56 text-subdued whitespace-nowrap bg-decorativeSubdued">
                  <li
                    onClick={() => handleImageSelect("edit")}
                    className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
                  >
                    <Image
                      src="/assets/edit.svg"
                      alt="edit"
                      width={16}
                      height={16}
                    />
                    <span className="text-white">Change photo</span>
                  </li>
                  <li
                    onClick={() => handleImageSelect("delete")}
                    className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
                  >
                    <Image
                      src="/assets/trash.svg"
                      alt="delete"
                      width={16}
                      height={16}
                    />
                    <span className="text-white">Remove photo</span>
                  </li>
                </ul>
              </div>
            )}
          </label>
          <div className="grid gap-4 grid-rows-[min-content]">
            <div className="relative w-[100%]">
              <input
                type="text"
                id="name"
                className="peer w-[100%] bg-tintedBase border-none rounded-md px-4 pt-2 pb-2 text-sm  focus:outline-none focus:border-white text-subdued"
                placeholder="Ad ekle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="name"
                className="absolute invisible px-1 text-sm bg-transparent text-subdued left-4 -top-3 peer-focus:visible"
              >
                Name
              </label>
            </div>

            <div className="relative w-[100%]">
              <textarea
                id="description"
                className="peer w-[100%] h-full bg-tintedBase border-white rounded-md px-4 pt-2 pb-2 text-sm  focus:outline-none focus:border-white text-subdued resize-none"
                placeholder="İsteğe bağlı açıklama ekle"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="description"
                className="absolute invisible px-1 text-sm bg-transparent text-subdued left-4 -top-3 peer-focus:visible"
              >
                Description
              </label>
            </div>
          </div>
        </div>
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
    <button
      onClick={() => handleSave()}
      className="px-6 py-2 font-bold text-black bg-white rounded-3xl hover:scale-110"
    >
      Save
    </button>
  );

  return (
    <div className="relative flex">
      <button
        className="my-auto text-subdued hover:text-white"
        id="menu-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Dots width="22" height="22" />
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-16 bg-transparent border border-none rounded shadow-md"
          ref={dropdownRef}
        >
          <Dropdown handleSelect={handleSelect} />
        </div>
      )}

      {showEditModal && (
        <Modal
          header={modelHeader}
          content={modelContent}
          footer={modelFooter}
        />
      )}

      {showDeleteModal && (
        <Modal
          header={deleteModalHeader}
          content={deleteModalContent}
          footer={deleteModalFooter}
        />
      )}
    </div>
  );
};

export default DotsButton;
